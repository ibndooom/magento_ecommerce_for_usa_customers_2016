<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Product extends Mage_Core_Model_Abstract {
    const BUNCH_SIZE = 500;
    protected $_basePrices;

    protected function _construct(){
        $this->_init('web4pro_4over/product');
    }

    public function updateProducts(){

        $this->getResource()->clearTempTable();
        $helper = Mage::helper('web4pro_4over');
        $api = Mage::getSingleton('web4pro_4over/api');
        $products = $api->getProducts();
        if(!isset($products['entities'])){
            $api->_logErrors($helper->__("Entities aren't got"),array());
            Mage::throwException($helper->__("Products aren't got"));
        }else{
            $products = $api->getProducts($products['totalResults']);
            foreach($products['entities'] as $entity){

                $insert = array('product_uuid'=>$entity['product_uuid'],'product_code'=>$entity['product_code'],
                                'product_description'=>$entity['product_description']);

                $this->getResource()->insertTempTable($insert);
            }
            $this->getResource()->updateMainTable();
        }
    }
    
    /**
     * Retrieves full product options(info) for previosly retrieved product. 2nd step of the procedure
     * 
     */
    public function updateProductsOptions()
    {
        $helper = Mage::helper('web4pro_4over');
        $api    = Mage::getSingleton('web4pro_4over/api');
        
        //retrieving unfulfilled with options products
        $collection = $this->getCollection();
        $collection->addFieldToFilter('options_uploaded', 0)
            ->setPageSize(self::BUNCH_SIZE);
        if (!$collection->getSize()) return;

        foreach ($collection as $product) {
            $uuid = $product->getProductUuid();
            $productInfo = $api->getProductInfo($uuid);
            if (!$productInfo) continue;

            $categories     = !empty($productInfo['categories']) ? $productInfo['categories'] : array();
            $productOptions = !empty($productInfo['product_option_groups']) ? $productInfo['product_option_groups'] : array();
            $product->setCategories($categories);
            $product->setProductOptionGroups($productOptions);
            $product->prepareFormattedOptionsDescription();
            $product->setHasFullInfo(1);
            $product->save();
        }
    }

    /**
     * Formats product options to be exported to human readable CSV/XLS
     */
    public function prepareFormattedOptionsDescription($product = null)
    {
        if (!$product) {
            $product = $this;
        }

        $options = (array)$product->getProductOptionGroups();
        $formatted = '';
        foreach ($options as $option) {
            $formatted .= $option['product_option_group_name'] . "\n";
            //options itsself
            $optionUids = array();
            foreach ($option['options'] as $_option){
                if (in_array($_option['option_uuid'], $optionUids)) {
                    continue;
                }
                $formatted .= sprintf("  - %s\n", $_option['option_name']);
                $optionUids[] = $_option['option_uuid'];
            }
            $formatted .= "\n";
        }
        $product->setProductOptionFormattedDescription($formatted);

        return $product;
    }

    /**
     * Gets base prices list for product.
     *
     * @return Web4pro_Forbaseprice/collection
     */
    public function getBasePrices()
    {
        if (!$this->_basePrices) {
            $this->_basePrices = Mage::getResourceModel('web4pro_4over/baseprice_collection')
                ->addFieldToFilter('product_uuid', $this->getId());
        }

        return $this->_basePrices;
    }
} 