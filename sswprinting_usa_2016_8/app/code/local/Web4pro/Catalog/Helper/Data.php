<?php
    class Web4pro_Catalog_Helper_Data extends Mage_Core_Helper_Abstract {

        public function getImage(Pixopa_Template_Model_Template $item){
            $item_image = strlen($item->getCustomImageThumbPath()) ? $item->getCustomImageThumbPath() : $item->getThumbailPath();
            if(!strlen($item_image)){
                $item_image =  strlen($item->getCustomImagePath()) ? $item->getCustomImagePath() : $item->getImagePath();
            }
            return $item_image;
        }

        public function getTemplateUrl(Pixopa_Template_Model_Template $item){
            $product = Mage::getModel('catalog/product' )->load($item->getProductId());
            return Mage::getBaseUrl() . Mage::getSingleton('catalog/url')->generateTemplatePath('target', $product, $item);
        }
    }
