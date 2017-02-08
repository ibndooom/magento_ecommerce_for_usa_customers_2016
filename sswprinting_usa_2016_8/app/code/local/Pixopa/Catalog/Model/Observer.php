<?php

class Pixopa_Catalog_Model_Observer {

    public function quoteItemSetProduct($observer) {
    
        $quoteItem = $observer->getEvent()->getQuoteItem();
        if (!$quoteItem || !$quoteItem->getProductId() || !$quoteItem->getQuote() || $quoteItem->getQuote()->getIsSuperMode()) return $this;
        
        // prepare post data
        $post = $quoteItem->getProduct()->getCustomOption('info_buyRequest')->getValue();
        if ($post) $post = unserialize ($post); else $post = array();
        if (isset($post['options'])) $options = $post['options']; else $options = false;    

        if ($options) {
            $customer = Mage::getSingleton('customer/session')->getCustomer();
            if ($customer->getId()) $customerGroupId = $customer->getGroupId(); else $customerGroupId = 0;

            $optionsWeight = 0;
            foreach ($options as $optionId => $option) {                     
                $productOption = Mage::getModel('catalog/product_option')->load($optionId);
                
                // set options weight
                $optionType = $productOption->getType();                    
                if ($optionType!='drop_down' && $optionType!='multiple' && $optionType!='radio' && $optionType!='checkbox') continue;
                if (!is_array($option)) $option = array($option);
                
                //product Qty
                $qty = intval($quoteItem->getQty());
                
                foreach ($option as $optionTypeId) {
                    
                	if (!$optionTypeId) continue;
                    
                    $productOptionValueModel = Mage::getModel('catalog/product_option_value')->load($optionTypeId);
                    $weight_value = $productOptionValueModel->getWeight();
                    
                    if (isset($weight_value) && $weight_value>0) {

                        switch ($optionType) {
                            case 'checkbox':                            
                                if (isset($post['options_'.$optionId.'_'.$optionTypeId.'_qty'])) $optionQty = intval($post['options_'.$optionId.'_'.$optionTypeId.'_qty']); else $optionQty = 1;
                                break;
                            case 'drop_down':
                            case 'radio':                                                    
                                if (isset($post['options_'.$optionId.'_qty'])) $optionQty = intval($post['options_'.$optionId.'_qty']); else $optionQty = 1;
                                break;
                            case 'multiple':
                                $optionQty = 1;                            
                                break;                       
                        } 
                        
                        // get option weight
                        $weight = floatval($weight_value);
                        //if ($productOption->getCustomoptionsIsOnetime()) $weight = $weight / $qty;
                        $optionsWeight += $weight * $optionQty;                        
                    }
                }
            }
            
            if ($optionsWeight>0) {
                // check absolute weight
                // $product = $observer->getEvent()->getProduct();
                $optionsWeight += $quoteItem->getWeight();
                // set weight for qty=1
                $quoteItem->setWeight($optionsWeight);
            }
        }
        return $this;
    }
    
    public function clearProductCache($observer) {
    	
    	$product = $observer->getEvent()->getProduct();
    	Mage::app()->removeCache("selected_attributes_info_".$product->getSku());
    	Mage::app()->removeCache("used_products_data_".$product->getSku());
    	
    	return $this;
    }

}