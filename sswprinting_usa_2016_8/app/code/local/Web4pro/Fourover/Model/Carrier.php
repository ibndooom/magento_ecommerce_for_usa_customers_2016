<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Carrier
    extends Mage_Shipping_Model_Carrier_Abstract
    implements Mage_Shipping_Model_Carrier_Interface
{
    const XPATH_RATE_PERCENT_ADD = 'carrier/fourover/rateadd';

    /**
     * Carrier's code
     *
     * @var string
     */
    protected $_code = 'fourover';

    /**
     * Whether this carrier has fixed rates calculation
     *
     * @var bool
     */
    protected $_isFixed = true;

    /**
     * FreeShipping Rates Collector
     *
     * @param Mage_Shipping_Model_Rate_Request $request
     * @return Mage_Shipping_Model_Rate_Result
     */
    public function collectRates(Mage_Shipping_Model_Rate_Request $request)
    {
        if (!$this->getConfigFlag('active')) {
            return false;
        }

        //getting shipping address info
        $addresses = explode("\n", $request->getDestStreet());
        //$state = $request->getDestRegionId() ? (string)$request->getDestRegionId() : (string)$request->getDestRegionCode();
        $state = (string)$request->getDestRegionCode();
        $shippingAddress = array(
                'address'  => !empty($addresses[0]) ? $addresses[0] : '',
                'address2' => !empty($addresses[1]) ? $addresses[1] : '',
                'city'     => (string)$request->getDestCity(),
                'state'    => $state,
                'country'  => (string)$request->getDestCountryId(),
                'zipcode'  => (string)$request->getDestPostcode()
            );

        //getting products information
        $printableItems = $ordinaryItems = array();
        $helper = Mage::helper('web4pro_4over');
        $api    = Mage::getSingleton('web4pro_4over/api');
        foreach ($request->getAllItems() as $item) {
            //checking item option to determine if product has design
            $options = $item->getOptions();
            $isPrintable = false;
            foreach ($options as $option) {
                if ($option->getCode() == 'design_id') {
                    $isPrintable = true;
                    break;
                }
            }
            //preparing 4over data for printable item
            if ($isPrintable) {
                $productInfo = $helper->getProductInfoBySalesItem($item);
                unset($productInfo['dropship']);
                $printableItems[] = $productInfo;
            } else { //collecting ordinary items
                $ordinaryItems[] = $item;
            }
        }

        $shippingOptions = array();
        //getting quotes via API
        foreach ($printableItems as $_item) {
            $productQuoteInfo = array(
                    'product_info'     => $_item,
                    'shipping_address' => $shippingAddress,
                );

            $quoteResponse = $api->getShippingQuote($productQuoteInfo);
            if (isset($quoteResponse['job']['facilities']) && is_array($quoteResponse['job']['facilities'])) {
                //taking shipping rates of the first facility
                $_shippingOptions = current($quoteResponse['job']['facilities']);
                if (isset($_shippingOptions['shipping_options'])) {
                    $_shippingOptions = $_shippingOptions['shipping_options'];
                    foreach ($_shippingOptions as $option) {
                        $serviceCode = $option['service_code'];
                        if (isset($shippingOptions[$serviceCode])) {
                            $_option = $shippingOptions[$serviceCode];
                            $matchCount = $_option['match_count'] + 1;
                            $servicePrice = $_option['service_price'] + $option['service_price'];
                        } else {
                            $matchCount = 1;
                            $servicePrice = $option['service_price'];
                        }
    
                        $shippingOptions[$serviceCode] = array (
                                'service_name'  => $option['service_name'],
                                'service_price' => $servicePrice,
                                'match_count'   => $matchCount
                            );
                    }
                }
            } elseif (isset($quoteResponse['candidates'])) {
                try {
                    //saving candidates data to registry to have an ability to draw their selection dialog later
                    Mage::register('fover_shipping_address_candidates', $quoteResponse['candidates']);
                    break;
                } catch (Exception $e) {
                    Mage::logException($e);
                }
            } else {
                //leaving ability to provide UPS Free Ground Shipping in case of error since pro
                $shippingOptions = array('03' => array('match_count' => count($printableItems)));
                //@TODO. Send email message with quote items list
            }
        }

        $result = Mage::getModel('shipping/rate_result');
        $rateMult = $this->getShippingRateMult();
        foreach ($shippingOptions as $serviceCode => $_method) {
            //the only intersecting options can be send
            if ($_method['match_count'] != count($printableItems)) {
                continue;
            }
            if ($serviceCode == '03') {
                $_method['service_name']  = 'Free Ground';
                $_method['service_price'] = 0.0;
            }
            $method = Mage::getModel('shipping/rate_result_method');
            $method->setCarrier('fourover');
            $method->setCarrierTitle($this->getConfigData('title'));
            $method->setMethod('fourover_' . $serviceCode);
            $method->setMethodTitle($_method['service_name']);
            $method->setPrice($_method['service_price'] * $rateMult);
            $method->setCost($_method['service_price']);
            $result->append($method);
        }

        return $result;
    }

    /**
     * Get allowed shipping methods
     *
     * @return array
     */
    public function getAllowedMethods()
    {
        return array('fourover' => $this->getConfigData('name'));
    }

    /**
     * Gets rate multiplier (addition for 4over rates)
     *
     * return float
     */
    public function getShippingRateMult()
    {
        $percents = Mage::getStoreConfig(self::XPATH_RATE_PERCENT_ADD);
        if ($percents) {
            $rateMult = (100 + (int)$percents) / 100;
        } else {
            $rateMult = 1;
        }

        return (float)$rateMult;
    }
}
