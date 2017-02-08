<?php
class Web4pro_Checkout_Block_Cart_Item_Renderer extends OrganicInternet_SimpleConfigurableProducts_Checkout_Block_Cart_Item_Renderer{
	
	public function getProductSize() {
		$option = false;

        if (Mage::getStoreConfig('SCP_options/cart/show_config_product_options')) {
        	$attribute =   Mage::getModel('eav/entity_attribute')->loadByCode('catalog_product', 'size');
        	if($attribute){
        		$option['label'] = $attribute->getFrontendLabel();
        		$option['value'] = $this->getProduct()->getAttributeText($attribute->getAttributeCode());
        		$option['option_id'] = $attribute->getId();
        	}
        }
        return $option;
	}
}