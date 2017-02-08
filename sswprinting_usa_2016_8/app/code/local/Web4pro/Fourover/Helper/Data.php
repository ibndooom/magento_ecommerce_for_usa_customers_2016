<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Helper_Data extends Mage_Core_Helper_Abstract {
    protected $_options;
    protected $_runsizes;
    protected $_colorspec;

    const RUNSIZE_LABELS_CONFIG_PATH    = 'fover_product_options/mapping/runsize_labels';
    const COLORSPEC_LABELS_CONFIG_PATH  = 'fover_product_options/mapping/colorspec_labels';
    const TURNAROUND_LABELS_CONFIG_PATH = 'fover_product_options/mapping/turnaround_labels';

    const MERCHANT_BILLING_CONFIG_PATH = 'fover_merchant/ship_from_billing_address';
    const MERCHANT_PAYMENT_CONFIG_PATH = 'fover_merchant/payment_information';
    const MERCHANT_SHIPPER_CONFIG_PATH = 'fover_merchant/shipper';

    /*
     * Gets PDF snapshots of designs assigned to order items
     * @param $order Order
     * @param $orderItemsToSkip list of order items that should be skiped in snapshot process
     *
     * @return array 
     */
    public function getOrderPdfsSnapshot(Mage_Sales_Model_Order $order, $orderItemsToSkip = array()) {
        $pdfFiles = array();
        //getting design packages for all order items
        foreach($order->getAllItems() as $orderItem) {
            $orderItemdId = $orderItem->getId();
            //checking if item should be skipped accroding to given list
            if (in_array($orderItemdId, $orderItemsToSkip)) {
                continue;
            }

            //retriving info_ByRerquest of order item to get design options of it
            $buyRequest = $orderItem->getBuyRequest();
            //loading design model
            $design =  Mage::getModel('template/customerdesign')->load($buyRequest->getDesignId());
            //storing design object into quote item
            if (!$orderItem->hasData('design')) {
                $orderItem->setDesign($design);
            }

            if ($design->getId()) {
                //getting list of SVG data(documents) that represent given customer design
                //array is keyed by design's porsition property 
                $svgData = array();
                    //getting first item of svgs' set
                $svgDesign = Mage::getModel('template/customersvgdesign')->load($design->getPrimaryContentId());
                $svgData[$svgDesign->getPosition()] = $svgDesign->getSvgData();
                    //getting child elements(the rest of the sides for design) of pointed design
                $svgDesignChilds = Mage::getModel('template/customersvgdesign')
                    ->getCollection()
                    ->addFieldToFilter('parent_design_id', array('eq' => $design->getPrimaryContentId()))
                    ->addFieldToSelect('svg_data')
                    ->setOrder('position', 'asc' );
                foreach ($svgDesignChilds  as $_design) {
                    $svgData[$_design->getPosition()] = $_design->getSvgData();
                }
                
                //turning SVG data into PDF snapshots(files)
                foreach ($svgData as $_svg) {
                    //getting full URL of vector PDF-file according to given svg-data
                    $pdfUrl = Mage::helper( 'dol' )->getProcessedSVGPdfURL(array($_svg), false, false, 0, array(), null, 1, 'vector_pdf');
                    //building filesystem path to file from its URL
                    $pdfPath = str_replace(Mage::getBaseUrl(), '', $pdfUrl);
                    $pdfPath = MAGENTO_ROOT . DS . str_replace('/', DS, $pdfPath);
                    $pdfFiles[$orderItemdId]['path'][] = $pdfPath;
                    $pdfFiles[$orderItemdId]['url'][] = $pdfUrl;
                }

                //storing sides count into order item
                $orderItem->setPrintSidesCount(count($svgData));
            }
        }

        return $pdfFiles;
    }

    /**
     * Gets a list of order items which PDF snapshots were successfuly posted to server
     * @param $order
     *
     * return array 
     */
    public function getOrderItemsToSkip(Web4pro_Fourover_Model_Order $order)
    {
        return array();
    }

    /**
     * Gets 4over specification of product by given order item.
     * Pixopa puts only simple product items 
     * @param Mage_Sales_Model_Quote_Item|Mage_Sales_Model_Order_Item
     * 
     * @return array
     */
    public function getProductInfoBySalesItem($item)
    {
        //default options values 
        $productOptions = array(
                'runsize_uuid' => '',
                'dropship'     => 'false',
                'option_uuids' => array()
            );
        if ($item->getProductType() != Mage_Catalog_Model_Product_Type::TYPE_SIMPLE) {
            return $productOptions;
        }

        $options = $this->getProductUuidsBySalesItem($item);
        $product = $item->getProduct();
        //setting runsize and colorspec option
        $runsizes = $this->getRunsizes();
        $runsizeLabels = explode(',', (string)Mage::getStoreConfig(self::RUNSIZE_LABELS_CONFIG_PATH));
        $colorSpecLabels = explode(',', (string)Mage::getStoreConfig(self::COLORSPEC_LABELS_CONFIG_PATH));
        $turnaroundLabels = explode(',', (string)Mage::getStoreConfig(self::TURNAROUND_LABELS_CONFIG_PATH));
        foreach ($options as $optionTypeId => $option) {
            $label = $option['label'];
            $value = $option['value'];

            if (in_array($label, $runsizeLabels) && !empty($runsizes[$value])) {
                $productOptions['runsize_uuid'] = $runsizes[$value];
                $productOptions['product_uuid'] = $option['uuid'];
                unset($options[$optionTypeId]);
            } elseif (in_array($label, $colorSpecLabels)) {
                $productOptions['colorspec_uuid'] = $option['uuid'];
                unset($options[$optionTypeId]);
            } elseif (in_array($label, $turnaroundLabels)) {
                $productOptions['turnaroundtime_uuid'] = $option['uuid'];
                unset($options[$optionTypeId]);
            }
        }

        //setting product options left
        $optionUuids = &$productOptions['option_uuids'];
        foreach ($options as $option) {
            $optionUuids[] = $option['uuid'];
        }

        return $productOptions;
    }

    /**
     * Gets product UUID and its options UUID by given sales item
     * @param Mage_Sales_Model_Quote_Item|Mage_Sales_Model_Order_Item
     * 
     * @return array
     */
    public function getProductUuidsBySalesItem($item)
    {
        $optionIds = array();
        if ($item instanceof Mage_Sales_Model_Quote_Item) {
            $_options = $item->getOptions();
            foreach ($_options as $option) {
                //bypassing non custom options
                if (!preg_match('/option_\d+/', $option->getCode())) {
                    continue;
                }
                $optionIds[] = $option->getValue();
            }
        } elseif ($item instanceof Mage_Sales_Model_Order_Item) {
            $_options = $item->getProductOptions();
            if (isset($_options['options'])) {
                foreach ($_options['options'] as $option) {
                    $optionIds[] = $option['option_value'];
                }
            }
        }

        $optionValues = Mage::getResourceModel('catalog/product_option_value_collection');
        $labelsTable  = $optionValues->getResource()->getTable('catalog/product_option_title');
        $titlesTable  = $optionValues->getResource()->getTable('catalog/product_option_type_title');
        $optionValues->getSelect()
            ->join(
                array('l' => $labelsTable),
                'l.option_id = main_table.option_id AND l.store_id=' . Mage_Core_Model_App::ADMIN_STORE_ID,
                array('label' => 'l.title'))
            ->join(
                array('t' => $titlesTable),
                't.option_type_id = main_table.option_type_id AND t.store_id=' . Mage_Core_Model_App::ADMIN_STORE_ID,
                array('t.title'))
            ->where('main_table.option_type_id IN(?)', $optionIds);
        $options = array();
        foreach ($optionValues as $option) {
            $optionId = $option->getOptionId();
            $sku = trim($option->getSku());
            if ($sku) {
                $options[$optionId]['uuid']  = $sku;
                $options[$optionId]['label'] = trim($option->getlabel());
                $options[$optionId]['value'] = trim($option->getTitle());
            }
        }

        return $options;
    }

    /**
     * Gets Runsizes options list
     *
     * @return array
     */
    public function getRunsizes()
    {
        if (!$this->_runsizes) {
            $this->_runsizes = $this->getOptionsByType(Web4pro_Fourover_Model_Option::RUN_SIZE);
        }

        return $this->_runsizes;
    }

    /**
     * Gets ColorSpec options list
     *
     * @return array
     */
    public function getColorSpecs()
    {
        if (!$this->_colorspecs) {
            $this->_colorspecs = $this->getOptionsByType(Web4pro_Fourover_Model_Option::COLOR_SPEC);
        }

        return $this->_colorspecs;
    }
    
    /**
     * Gets options list by pointed type
     * @param $type int
     *
     * @return array
     */
    public function getOptionsByType($type) {
        $_options = $this->getAllOptions();
        $options = array();
        foreach ($_options as $option) {
            if ($option->getType() == $type) {
                //options are keyed with values
                $options[$option->getValue()] = $option->getUuid();
            }
        }

        return $options;
    }

    /**
     * Gets runsizes and color options list so far
     *
     * @return array 
     */
    public function getAllOptions()
    {
        if (!$this->_options) {
            $collection = Mage::getResourceModel('web4pro_4over/option_collection');
            $this->_options = $collection->getItems();
        }

        return $this->_options;
    }

    /**
     * Gets 4over client's payment information pointed in system configuration section in admin
     *
     * @TODO Implement system configuration form for payment data.
     * Replace hardcoded data with one read from configuration data
     */
    public function getPaymentBillingInformation($orderId)
    {
        $paymentInfo = array('payment_provider' => array(), 'requested_currency' => array());

        //retriving payment method's information from config data
        $_payment = (array)Mage::getStoreConfig(self::MERCHANT_PAYMENT_CONFIG_PATH);
        $_payment = new Varien_Object($_payment);
        $paymentInfo['payment_provider']['payment_provider_uuid'] = $_payment->getUuid();
        $paymentInfo['requested_currency']['currency_code'] = $_payment->getCurrencyCode();
        if ($paymentJSON = json_decode($_payment->getInfoJson(), true)) {
            $paymentInfo = array_merge($paymentInfo, $paymentJSON);
        }

        //retriving billing information from config data
        $_billing = (array)Mage::getStoreConfig(self::MERCHANT_BILLING_CONFIG_PATH);
        $_billing = new Varien_Object($_billing);
        $billing = array();
        $fieldsMap = $this->_getBillingAddressConfigToFoverFields();
        foreach ($fieldsMap as $mageField => $foverField) {
            $billing[$foverField] = $_billing->getData($mageField);
        }
        $paymentInfo['billing_info'] = $billing;
        $paymentInfo['order_id'] = $orderId;
        $paymentInfo['comments'] = $this->__('Order placed with Magento store');
        
        return $paymentInfo;
    }
 
    /**
     * Returns billing address' field names(codes) mapped from Magento config to 4over
     *
     * @return array
     */
    protected function _getBillingAddressConfigToFoverFields()
    {
        return  array(
            'firstname' => 'first_name',
            'lastname'  => 'last_name',
            'address'   => 'address1',
            'address2'  => 'address2',
            'city'      => 'city',
            'state'     => 'state',
            'zipcode'   => 'zip',
            'country'   => 'country',
        );
    }
    
    /**
     * Returns ship from address' field names(codes)
     *
     * @return array
     */
    protected function _getShipFromFields() {
        return array('company', 'firstname', 'lastname', 'email', 'phone', 'address',
                     'address2', 'city', 'state', 'zipcode', 'country');
    }

    /**
     * Gets 4over client's payment information pointed in system configuration section in admin
     *
     */
    public function getShipFromAddress()
    {
        //retriving billing information from config data
        $shipFrom = array();
        $_shipFrom = (array)Mage::getStoreConfig(self::MERCHANT_BILLING_CONFIG_PATH);
        $_shipFrom = new Varien_Object($_shipFrom);
        foreach ($this->_getShipFromFields() as $field) {
            $shipFrom[$field] = $_shipFrom->getData($field) ? $_shipFrom->getData($field) : NULL;
        }

        return $shipFrom;
    }
    
    /**
     * Gets 4over client's payment information pointed in system configuration section in admin
     *
     * @return array 
     */
    public function getShipper()
    {
        return (array)Mage::getStoreConfig(self::MERCHANT_SHIPPER_CONFIG_PATH);
    }

    /**
     * Gets 4over status history for order
     */
    public function getHistoryStatuses($order){

        $orders = Mage::getModel('sales/order')->getCollection();

        $orders->join(array('o'=>'web4pro_4over/order'),'main_table.entity_id=o.order_id','o.jobs')
            ->addFieldToFilter('entity_id',array('in'=>$order->getId()));
        $order = $orders->getFirstItem();
        $jobs = unserialize($order->getJobs());

        return $jobs;
    }
    
    /**
     * Gets 
     */
    public function getPrintSidesColorCoding()
    {
        return array (
                1 => '4/0',
                2 => '4/4',
            );
    }
}
