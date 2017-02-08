<?php

/**
 * Product View block
 *
 * @category Mage
 * @package  Mage_Catalog
 * @module   Catalog
 * @author   Magento Core Team <core@magentocommerce.com>
 */
class Pixopa_Catalog_Block_Product_View extends Mage_Catalog_Block_Product_View
{
	
	/**
     * Get JSON encoded configuration array which can be used for JS dynamic
     * price calculation depending on product options
     *
     * @return string
     */
    public function getJsonConfig()
    {
    	
    	$cache = Mage::getSingleton('core/cache');
		$option_values = $cache->load('px_configurable_view_'.$this->getProduct()->getId().'_'.Mage::app()->getStore()->getCurrentCurrency()->getOutputFormat());
		
		if($option_values == false){
			
			Mage::log('Configurable View Data not found in cache!!!!');
			
	        $config = array();
	        if (!$this->hasOptions()) {
	            return Mage::helper('core')->jsonEncode($config);
	        }
	
	        $_request = Mage::getSingleton('tax/calculation')->getRateRequest(false, false, false);
	        /* @var $product Mage_Catalog_Model_Product */
	        $product = $this->getProduct();
	        $_request->setProductClassId($product->getTaxClassId());
	        $defaultTax = Mage::getSingleton('tax/calculation')->getRate($_request);
	
	        $_request = Mage::getSingleton('tax/calculation')->getRateRequest();
	        $_request->setProductClassId($product->getTaxClassId());
	        $currentTax = Mage::getSingleton('tax/calculation')->getRate($_request);
	
	        $_regularPrice = $product->getPrice();
	        $_finalPrice = $product->getFinalPrice();
	        $_priceInclTax = Mage::helper('tax')->getPrice($product, $_finalPrice, true);
	        $_priceExclTax = Mage::helper('tax')->getPrice($product, $_finalPrice);
	        $_tierPrices = array();
	        $_tierPricesInclTax = array();
	        foreach ($product->getTierPrice() as $tierPrice) {
	            $_tierPrices[] = Mage::helper('core')->currency($tierPrice['website_price'], false, false);
	            $_tierPricesInclTax[] = Mage::helper('core')->currency(
	                Mage::helper('tax')->getPrice($product, (int)$tierPrice['website_price'], true),
	                false, false);
	        }
	        $config = array(
	            'productId'           => $product->getId(),
	            'priceFormat'         => Mage::app()->getLocale()->getJsPriceFormat(),
	            'includeTax'          => Mage::helper('tax')->priceIncludesTax() ? 'true' : 'false',
	            'showIncludeTax'      => Mage::helper('tax')->displayPriceIncludingTax(),
	            'showBothPrices'      => Mage::helper('tax')->displayBothPrices(),
	            'productPrice'        => Mage::helper('core')->currency($_finalPrice, false, false),
	            'productOldPrice'     => Mage::helper('core')->currency($_regularPrice, false, false),
	            'priceInclTax'        => Mage::helper('core')->currency($_priceInclTax, false, false),
	            'priceExclTax'        => Mage::helper('core')->currency($_priceExclTax, false, false),
	            /**
	             * @var skipCalculate
	             * @deprecated after 1.5.1.0
	             */
	            'skipCalculate'       => ($_priceExclTax != $_priceInclTax ? 0 : 1),
	            'defaultTax'          => $defaultTax,
	            'currentTax'          => $currentTax,
	            'idSuffix'            => '_clone',
	            'oldPlusDisposition'  => 0,
	            'plusDisposition'     => 0,
	            'plusDispositionTax'  => 0,
	            'oldMinusDisposition' => 0,
	            'minusDisposition'    => 0,
	            'tierPrices'          => $_tierPrices,
	            'tierPricesInclTax'   => $_tierPricesInclTax,
	        );
	
	        $responseObject = new Varien_Object();
	        Mage::dispatchEvent('catalog_product_view_config', array('response_object'=>$responseObject));
	        if (is_array($responseObject->getAdditionalOptions())) {
	            foreach ($responseObject->getAdditionalOptions() as $option=>$value) {
	                $config[$option] = $value;
	            }
	        }
	        $option_values = Mage::helper('core')->jsonEncode($config);
	        $cache->save($option_values, 'px_configurable_view_'.$this->getProduct()->getId().'_'.Mage::app()->getStore()->getCurrentCurrency()->getOutputFormat(), array("px_cache"), 60*60*24*30);
		}

        return $option_values;
    }
	
    
    /**
     * Add meta information from product to head block
     *
     * @return Mage_Catalog_Block_Product_View
     */
    protected function _prepareLayout()
    {
    	
    	$template_name = '';
    	$template_keywords = '';
    	$template_description = '';
    	$template_url = '';
    	
    	$template_id = $this->getProduct()->getTemplate();
    	 
    	if(!$template_id){
    		$template_id = $this->getRequest()->getParam('template');
    	}
    	
    	if($template_id){
	    	$template = Mage::getModel("template/template")->load($template_id);
	      	$template_name = $template->getName();
	      	$template_keywords = $template->getKeywords();
	      	$template_description = $template->getDescription();
	      	$template_url = Mage::getBaseUrl().'/'.$template->getUrlPath();
    	}
    	
    	$this->getLayout()->createBlock('catalog/breadcrumbs');
    	$headBlock = $this->getLayout()->getBlock('head');
    	if ($headBlock) {
    		$product = $this->getProduct();
    		$title = $product->getMetaTitle();
    		if($template_name){
    			$title = $template_name.' - '.$product->getName();
    		}
    		if ($title) {
    			$headBlock->setTitle($title);
    		}
    		$keyword = $product->getMetaKeyword();
    		$currentCategory = Mage::registry('current_category');
    		if(!$template_keywords){
	    		if ($keyword) {
	    			$headBlock->setKeywords($keyword);
	    		} elseif ($currentCategory) {
	    			$headBlock->setKeywords($product->getName());
	    		}
    		}else{
    			$headBlock->setKeywords($template_keywords);
    		}
    		$description = $product->getMetaDescription();
    		if(!$template_description){
	    		if ($description) {
	    			$headBlock->setDescription( ($description) );
	    		} else {
	    			$headBlock->setDescription(Mage::helper('core/string')->substr($product->getDescription(), 0, 255));
	    		}
    		}else{
    			$headBlock->setDescription(($template_description));
    		}
    		if ($this->helper('catalog/product')->canUseCanonicalTag()) {
    			if(!$template_url){
    				$params = array('_ignore_category' => true);
    				$headBlock->addLinkRel('canonical', $product->getUrlModel()->getUrl($product, $params));
    			}else{
    				$headBlock->addLinkRel('canonical', $template_url);
    			}
    		}
    	}
    
    	return Mage_Catalog_Block_Product_Abstract::_prepareLayout();
    }
    
}