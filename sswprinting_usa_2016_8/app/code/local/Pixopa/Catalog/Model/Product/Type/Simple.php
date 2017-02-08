<?php
class Pixopa_Catalog_Model_Product_Type_Simple extends Mage_Catalog_Model_Product_Type_Simple
{
	protected function _prepareProduct(Varien_Object $buyRequest, $product, $processMode)
    {
    	$product->addCustomOption('design_id', $buyRequest->getDesignId(), $product);
    	$product->addCustomOption('zoom_factor', $buyRequest->getZoomFactor(), $product);
    	return parent::_prepareProduct($buyRequest, $product, $processMode);
    }
    
    public function processBuyRequest($product, $buyRequest)
    {
        $options = array('design_id' => $buyRequest->getDesignId(), 'zoom_factor' => $buyRequest->getZoomFactor());
        return $options;
    }

}
