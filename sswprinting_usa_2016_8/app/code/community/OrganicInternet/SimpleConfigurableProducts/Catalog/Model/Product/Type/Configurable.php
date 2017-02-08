<?php class OrganicInternet_SimpleConfigurableProducts_Catalog_Model_Product_Type_Configurable
    extends Mage_Catalog_Model_Product_Type_Configurable
{
    #Copied from Magento v1.3.1 code.
    #Only need to comment out addFilterByRequiredOptions but there's no
    #nice way of doing that without cutting and pasting the method into my own
    #derived class. Boo.
    /*
    public function getUsedProducts($requiredAttributeIds = null, $product = null)
    {
        Varien_Profiler::start('CONFIGURABLE:'.__METHOD__);
        if (!$this->getProduct($product)->hasData($this->_usedProducts)) {
            if (is_null($requiredAttributeIds)
                and is_null($this->getProduct($product)->getData($this->_configurableAttributes))) {
                // If used products load before attributes, we will load attributes.
                $this->getConfigurableAttributes($product);
                // After attributes loading products loaded too.
                Varien_Profiler::stop('CONFIGURABLE:'.__METHOD__);
                return $this->getProduct($product)->getData($this->_usedProducts);
            }

            $usedProducts = array();
            $collection = $this->getUsedProductCollection($product)
                ->addAttributeToSelect('*');
            // ->addFilterByRequiredOptions();

            if (is_array($requiredAttributeIds)) {
                foreach ($requiredAttributeIds as $attributeId) {
                    $attribute = $this->getAttributeById($attributeId, $product);
                    if (!is_null($attribute))
                        $collection->addAttributeToFilter($attribute->getAttributeCode(), array('notnull'=>1));
                }
            }

            foreach ($collection as $item) {
                $usedProducts[] = $item;
            }

            $this->getProduct($product)->setData($this->_usedProducts, $usedProducts);
        }
        Varien_Profiler::stop('CONFIGURABLE:'.__METHOD__);
        return $this->getProduct($product)->getData($this->_usedProducts);
    }
    */
    
    
    //From Pixopa
	/**
     * Prepare product and its configuration to be added to some products list.
     * Perform standard preparation process and then add Configurable specific options.
     *
     * @param Varien_Object $buyRequest
     * @param Mage_Catalog_Model_Product $product
     * @param string $processMode
     * @return array|string
     */
    protected function _prepareProduct(Varien_Object $buyRequest, $product, $processMode)
    {
    	$product->addCustomOption('design_id', $buyRequest->getDesignId(), $product);
    	$product->addCustomOption('zoom_factor', $buyRequest->getZoomFactor(), $product);
    	return parent::_prepareProduct($buyRequest, $product, $processMode);
    }

    /**
     * Prepare selected options for configurable product
     *
     * @param  Mage_Catalog_Model_Product $product
     * @param  Varien_Object $buyRequest
     * @return array
     */
    public function processBuyRequest($product, $buyRequest)
    {
        $superAttribute = $buyRequest->getSuperAttribute();
        $superAttribute = (is_array($superAttribute)) ? array_filter($superAttribute, 'intval') : array();

        $options = array('super_attribute' => $superAttribute, 'design_id' => $buyRequest->getDesignId(), 'zoom_factor' => $buyRequest->getZoomFactor());

        return $options;
    }
    
    
	/**
     * Retrieve configurable attributes data
     *
     * @param  Mage_Catalog_Model_Product $product
     * @return array
     */
    public function getConfigurableAttributes($product = null)
    {
        Varien_Profiler::start('CONFIGURABLE:'.__METHOD__);
        
        $start = microtime(true);
        
        if (!$this->getProduct($product)->hasData($this->_configurableAttributes)) {
        	
        	$cache = Mage::getSingleton('core/cache');
        
        	$attributes_data = false;
	        if($product){
	        	Mage::log('Inside getConfigurableAttributes - '.$product->getSku());
				$attributes_data = $cache->load("configurable_attributes_data_".$product->getSku());
	        }
	        
	        $end = microtime(true);
			Mage::log('It took: '.round($end - $start, 3)." secs to load cache!");
	        
	        if(1==1 /*&& $attributes_data == false*/){
	            $configurableAttributes = $this->getConfigurableAttributeCollection($product)
	                ->orderByPosition()
	                ->load();
	                
	            try{
	            	//$serialized_data = @serialize($configurableAttributes);
	            }catch(Exception $e){
	            	//$serialized_data = @serialize($configurableAttributes);
	            }
	            if($product){
	            	//$cache->save($serialized_data, "configurable_attributes_data_".$product->getSku(), array("px_cache"), 60*60*24*30);
	            }
		        Mage::log('getConfigurableAttributes data NOT found in cache');
		            
	        }else{
	        	Mage::log('getConfigurableAttributes data found in cache');
	        	
	        	$configurableAttributes = unserialize($attributes_data);
	        	$end = microtime(true);
				Mage::log('It took: '.round($end - $start, 3)." secs to unserialize!");
				
	        	$product->getTypeInstance(true)
            		->getUsedProducts($configurableAttributes->getColumnValues('attribute_id'), $product);
	        }
            
            $this->getProduct($product)->setData($this->_configurableAttributes, $configurableAttributes);
        }
        Varien_Profiler::stop('CONFIGURABLE:'.__METHOD__);
        
        $end = microtime(true);
		Mage::log('It took: '.round($end - $start, 3)." secs to getConfigurableAttributes!");
		
        return $this->getProduct($product)->getData($this->_configurableAttributes);
    }
    
    
	/**
     * Retrieve array of "subproducts"
     *
     * @param  array
     * @param  Mage_Catalog_Model_Product $product
     * @return array
     */
    public function getUsedProducts($requiredAttributeIds = null, $product = null)
    {
        Varien_Profiler::start('CONFIGURABLE:'.__METHOD__);
        $start = microtime(true);
        
        if (!$this->getProduct($product)->hasData($this->_usedProducts)) {
            if (is_null($requiredAttributeIds)
                and is_null($this->getProduct($product)->getData($this->_configurableAttributes))) {
                // If used products load before attributes, we will load attributes.
                $this->getConfigurableAttributes($product);
                // After attributes loading products loaded too.
                Varien_Profiler::stop('CONFIGURABLE:'.__METHOD__);
                return $this->getProduct($product)->getData($this->_usedProducts);
            }

            $usedProducts = array();
            
        	$cache = Mage::getSingleton('core/cache');
        	$used_products_data = false;
        	
	        if($product){
				$used_products_data = $cache->load("used_products_data_".$product->getSku());
	        }
            
	        if($used_products_data == false){
	        	
	            $collection = $this->getUsedProductCollection($product)
	                ->addAttributeToSelect('*');
	                //->addFilterByRequiredOptions();
	
	            if (is_array($requiredAttributeIds)) {
	                foreach ($requiredAttributeIds as $attributeId) {
	                    $attribute = $this->getAttributeById($attributeId, $product);
	                    if (!is_null($attribute))
	                        $collection->addAttributeToFilter($attribute->getAttributeCode(), array('notnull'=>1));
	                }
	            }
	
	            foreach ($collection as $item) {
	                $usedProducts[] = $item;
	            }
	            if($product){
	            	$cache->save(@serialize($usedProducts), "used_products_data_".$product->getSku(), array("px_cache"), 60*60*24*30);
	            }
		        Mage::log('getUsedProducts data NOT found in cache');
	            
	        }else{
	        	Mage::log('getUsedProducts data found in cache');
	        	$usedProducts = unserialize($used_products_data);
	        }

            $this->getProduct($product)->setData($this->_usedProducts, $usedProducts);
        }
        Varien_Profiler::stop('CONFIGURABLE:'.__METHOD__);
        
        $end = microtime(true);
		//Mage::log('It took: '.round($end - $start, 3)." secs to getUsedProducts!");
		
        return $this->getProduct($product)->getData($this->_usedProducts);
    }
    
    
	/**
     * Retrieve Selected Attributes info
     *
     * @param  Mage_Catalog_Model_Product $product
     * @return array
     */
    public function getSelectedAttributesInfo($product = null)
    {
    	$start = microtime(true);
        $attributes = array();
        $attributes_data = false;
        Varien_Profiler::start('CONFIGURABLE:'.__METHOD__);
        
        $cache = Mage::getSingleton('core/cache');
        
        if($product){
        	Mage::log('Inside getSelectedAttributesInfo - '. $product->getSku());
			$attributes_data = $cache->load("selected_attributes_info_".$product->getSku());
        }

		if($attributes_data == false){
			
	        if ($attributesOption = $this->getProduct($product)->getCustomOption('attributes')) {
	            $data = unserialize($attributesOption->getValue());
	            $this->getUsedProductAttributeIds($product);
	
	            $usedAttributes = $this->getProduct($product)->getData($this->_usedAttributes);
	
	            foreach ($data as $attributeId => $attributeValue) {
	                if (isset($usedAttributes[$attributeId])) {
	                    $attribute = $usedAttributes[$attributeId];
	                    $label = $attribute->getLabel();
	                    $value = $attribute->getProductAttribute();
	                    if ($value->getSourceModel()) {
	                        $value = $value->getSource()->getOptionText($attributeValue);
	                    }
	                    else {
	                        $value = '';
	                    }
	
	                    $attributes[] = array('label'=>$label, 'value'=>$value);
	                }
	            }
	            if($product){
	            	$cache->save(@json_encode($attributes), "selected_attributes_info_".$product->getSku(), array("px_cache"), 60*60*24*30);
	            }
	            Mage::log('getSelectedAttributesInfo data NOT found in cache');
	        }
		}else{
			Mage::log('getSelectedAttributesInfo data found in cache');
			$attributes = json_decode($attributes_data, true);
		}
		
        Varien_Profiler::stop('CONFIGURABLE:'.__METHOD__);
        $end = microtime(true);
		Mage::log('It took: '.round($end - $start, 3)." secs to getSelectedAttributesInfo!");
        return $attributes;
    }
}
