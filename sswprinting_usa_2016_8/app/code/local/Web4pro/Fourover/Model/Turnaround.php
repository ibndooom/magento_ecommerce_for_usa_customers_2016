<?php
class Web4pro_Fourover_Model_Turnaround extends Mage_Core_Model_Abstract {
    const RATES_BUNCH_SIZE = 500;
    const TURNS_BUNCH_SIZE = 1000;
    const UPDATE_PLAN_FLAG_PATH = 'web4pro_fover/turnarround/update_planned';
    const RUNSIZE_LIMIT = 5000;
    const UPS_GROUND_SHIPPING_CODE = '03';
    
    protected $_api;
    protected $_shippingAddress;

    protected function _construct(){
        $this->_init('web4pro_4over/turnaround');
    }

    /**
     * Copies turnaround options into separate resource
     */
    public function retrieveProductTurnaround()
    {
        $products = Mage::getResourceModel('web4pro_4over/product_collection')
            ->addFieldToFilter('options_uploaded', 1)
            ->setPageSize(self::TURNS_BUNCH_SIZE);
        $turnaroundTable = $this->_getResource()->getMainTable();
        $products->getSelect()
            ->joinLeft(array('ta' => $turnaroundTable),
                'ta.product_uuid=main_table.product_uuid',
                array('ta.combo_id'))
            ->where('ta.combo_id IS NULL');
        if (!count($products)) {
            return;
        }

        $api = Mage::getSingleton('web4pro_4over/api');
        $taogUuid = $this->getTurnaroundOptionGroupUuid();
        $turnaroundOptions = array();
        foreach ($products as $product) {
            if (!is_array($product->getProductOptionGroups())) {
                continue;
            }
            foreach ($product->getProductOptionGroups() as $optionGroup) {
                //finding turnarround options group
                if (isset($optionGroup['product_option_group_uuid']) &&
                    $optionGroup['product_option_group_uuid'] == $taogUuid) {
                    //walking through turnarrounds
                    foreach ($optionGroup['options'] as $turnaround) {
                        if ((int)$turnaround['runsize'] > self::RUNSIZE_LIMIT) {
                            continue;
                        }

                        $_turnaround = array();
                        $_turnaround['turnaround_uuid'] = $turnaround['option_uuid'];
                        $_turnaround['turnaround'] = $turnaround['option_description'];
                        $_turnaround['runsize_uuid'] = $turnaround['runsize_uuid'];
                        $_turnaround['runsize'] = $turnaround['runsize'];
                        $_turnaround['colorspec_uuid'] = $turnaround['colorspec_uuid'];
                        $_turnaround['colorspec'] = $turnaround['colorspec'];
                        $_turnaround['product_uuid'] = $product->getId();
                        $combo_id = '';
                        foreach ($_turnaround as $fieldName => $value) {
                            if (preg_match('/_uuid$/', $fieldName)) {
                                $combo_id .= $value;
                            }
                        }
                        $combo_id = sha1($combo_id);
                        $_turnaround['combo_id'] = $combo_id;
                        $turnaroundOptions[$combo_id] = $_turnaround;
                    }
                }
            }
        }

        $this->_getResource()->deleteItemsByProducts($products->getAllIds());
        $this->_getResource()->insertMultiple($turnaroundOptions);
    }

    public function getTurnaroundOptionGroupUuid()
    {
        return 'f80e8179-b264-42ce-9f80-bb258a09a1fe';
    }

    /**
     * Requests shipping rates for provided turnarround/product options
     * 
     */
    public function updateUpsGroundRates()
    {
        $turnarounds = $this->getCollection()
            ->addFieldToFilter('ups_updated', 0)
            ->setPageSize(self::RATES_BUNCH_SIZE)
            ->setOrder('product_uuid');
        if (!count($turnarounds)) {
            return;
        }
        $turnarounds->walk(array($this, 'updateTurnaroundShippingQuote'));

        return $this; 
    }

    public function updateTurnaroundShippingQuote($turnaround)
    {
        $api = $this->_getApi();
        $shippingAddress = $this->_getShippingAddress();

        $productInfo = array();
        $productInfo['product_uuid'] = $turnaround['product_uuid'];
        $productInfo['runsize_uuid'] = $turnaround['runsize_uuid'];
        $productInfo['turnaround_uuid'] = $turnaround['turnaround_uuid'];
        $productInfo['colorspec_uuid'] = $turnaround['colorspec_uuid'];
        $productInfo['option_uuids'] = array();
        $params = array(
            'product_info'     => $productInfo,
            'shipping_address' => $shippingAddress,
        );

        $result = $api->getShippingQuote($params);
        //storing shipping quote response for turnaround
        $turnaround->setData('ups_rates', serialize($result));
        //retrieving ground shipping rate
        if (isset($result['job']['facilities']) && is_array($result['job']['facilities'])) {
            //taking shipping rates of the first facility
            $_shippingOptions = current($result['job']['facilities']);
            //checking estimates case
            if (isset($_shippingOptions['shipping_options'])) {
                $_shippingOptions = $_shippingOptions['shipping_options'];
                foreach ($_shippingOptions as $option) {
                    $serviceCode = $option['service_code'];
                    if ($serviceCode == self::UPS_GROUND_SHIPPING_CODE) {
                        $turnaround->setData('ups_ground', $option['service_price']);
                        break;
                    }
                }
            }
        }

        $turnaround->setData('ups_updated', 1);
        $turnaround->save();
    }

    protected function _getApi()
    {
        if (!$this->_api) {
            $this->_api = Mage::getSingleton('web4pro_4over/api');
        }

        return $this->_api;
    }

    protected function _getShippingAddress()
    {
        if (!$this->_shippingAddress) {
            $this->_shippingAddress = array(
                'address'  => '2 MOORE LN',
                'address2' => '',
                'city'     => 'BILLINGS',
                'state'    => 'MT',
                'country'  => 'US',
                'zipcode'  => '59101'
            );
        }

        $this->_shippingAddress;
    }

    public function clearUpdateFlag()
    {
        Mage::getConfig()->saveConfig(self::UPDATE_PLAN_FLAG_PATH, false);
    }

    public function priceUpdateIsActive()
    {
        return Mage::getStoreConfig(self::UPDATE_PLAN_FLAG_PATH);
    }
} 