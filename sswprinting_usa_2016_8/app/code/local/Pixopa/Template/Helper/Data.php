<?php

class Pixopa_Template_Helper_Data extends Mage_Core_Helper_Abstract
{
	const SOLR_HOST = 'dol/system_setting/solr_hostname';
	const SOLR_PORT = 'dol/system_setting/solr_port';
	const SOLR_CORE = 'dol/system_setting/solr_core';
	const SOLR_PATH = 'dol/system_setting/solr_path';
	
	public function drawItem($category,$level,$selected){
		$html = '';
		
		if($selected<>'' && $category->getId()==$selected){
			$sel='selected="selected"';
		}else{
			$sel='';
		}		
		$html.='<option value='.$category->getId().$sel.'>'.$level.' '.$category->getName().'</option>';
		
		$subcategory_collection = Mage::getModel('catalog/category')->getCollection()->addFieldToFilter('parent_id', array('eq'=>$category->getId()))->addAttributeToSort('name', 'ASC');
		$subcategory_collection->addAttributeToSelect('*')->setStoreId(Mage::app()->getStore()->getId())->load();
		
		if($subcategory_collection->count() > 0 ){
			$level.='--';
			foreach ($subcategory_collection as $subcat) {
				//Mage::log('In getCategoryHierarchy. Adding to subcategory - '.$subcat->getId());
	
				//recurse through all subcats
				$html.=$this->drawItem($subcat,$level,$selected);
			}
		}
		return $html;
	}


	public function getCategoryHierarchy($selected){

		//Mage::log('In getCategoryHierarchy');

		$cache = Mage::getSingleton('core/cache');

		$option_val = $cache->load("category_hierarchy".'_'.Mage::app()->getStore()->getId());

		if($option_val == false){
				
			//Mage::log('In getCategoryHierarchy. Cache is empty!');
				
			//$categories_collection = Mage::getModel('catalog/category')->getCollection()->addFieldToFilter('parent_id', array('eq'=>2))->addAttributeToSort('name', 'ASC');
			$categories_collection = Mage::getModel('catalog/category')->getCollection()->addFieldToFilter('parent_id', array('eq'=>0))->addAttributeToSort('name', 'ASC');
			$categories_collection->addAttributeToSelect('*')->setStoreId(Mage::app()->getStore()->getId())->load();
			$option_val='';
	   
			foreach($categories_collection as $category){
				$option_val.= $this->drawItem($category,'',$selected);
			}
				
			$cache->save($option_val, "category_hierarchy".'_'.Mage::app()->getStore()->getId(), array("px_cache"), 60*60*24*30);
				
			//Mage::log('In getCategoryHierarchy. Cache is loaded!');
		}else{
			//Mage::log('In getCategoryHierarchy. Found data from cache!');
		}
		return $option_val;
	}
	
	
	public function getSubCategoryChilds($category, &$category_childs){
		
		if(!in_array($category->getId(), $category_childs)){
			$category_childs[] = $category->getId();
		}
		
		$subcategory_collection = Mage::getModel('catalog/category')->getCollection()->addFieldToFilter('parent_id', array('eq'=>$category->getId()))->addAttributeToSort('name', 'ASC');
		$subcategory_collection->addFieldToFilter('is_active', array('eq'=>'1'))->addAttributeToSelect('id')->setStoreId(Mage::app()->getStore()->getId())->load();
		
		if($subcategory_collection->count() > 0 ){
			foreach ($subcategory_collection as $subcat) {
				$this->getSubCategoryChilds($subcat, $category_childs);
			}
		}
	}


	public function getCategoryChilds($category_id){

		$cache = Mage::getSingleton('core/cache');
		$category_childs = $cache->load("category_childs_".$category_id.'_'.Mage::app()->getStore()->getId());

		if($category_childs == false){
				
			$categories_collection = Mage::getModel('catalog/category')->getCollection()->addFieldToFilter('parent_id', array('eq'=>$category_id))->addAttributeToSort('name', 'ASC');
			$categories_collection->addAttributeToSelect('id')->setStoreId(Mage::app()->getStore()->getId())->load();
			$category_childs = array();
	   
			foreach($categories_collection as $category){
				$this->getSubCategoryChilds($category, $category_childs);
			}
				
			$cache->save(json_encode($category_childs), "category_childs_".$category_id.'_'.Mage::app()->getStore()->getId(), array("px_cache"), 60*60*24*30);
				
			return $category_childs;
		}else{
			return json_decode($category_childs, true);
		}
	}
	
	public function getSingleLevelCategoryChilds($category_id){

		$cache = Mage::getSingleton('core/cache');
		$category_childs = $cache->load("single_level_category_childs_".$category_id.'_'.Mage::app()->getStore()->getId());
		$_helper    = Mage::helper('catalog/output');

		if($category_childs == false){
				
			$categories_collection = Mage::getModel('catalog/category')->getCollection()->addAttributeToSort('position', 'asc')->addFieldToFilter('parent_id', array('eq'=>$category_id))->addAttributeToSelect('name');
			$categories_collection->addFieldToFilter('is_active', array('eq'=>'1'))->addAttributeToSelect('id')->addAttributeToSelect('image')->addAttributeToSelect('thumbnail')->setStoreId(Mage::app()->getStore()->getId())->load();
			$category_childs = array();
			
			foreach($categories_collection as $category){
				$category_child['name'] = $category->getName();
				$category_child['id'] = $category->getId();
				
				$url = $category->getUrl();
				$url = str_replace('http://', '', $url);
				$url = str_replace('https://', '', $url);
				//$url = str_replace('?___SID=U', '', $url);
				
				$slash_position = strpos($url, '/');
				$url = substr($url,$slash_position, (strlen($url)-$slash_position));
				
				$category_child['url'] = $url;

				$_imgHtml   = '';
			    if ($category->getThumbnail() && $_imgUrl = Mage::getBaseUrl('media', false).'catalog/category/'.$category->getThumbnail()) {
			        $_imgHtml = '<p class="category-image"><img src="'.$_imgUrl.'" alt="'.$this->htmlEscape($category->getName()).'" title="'.$this->htmlEscape($category->getName()).'" /></p>';
			        $_imgHtml = $_helper->categoryAttribute($category, $_imgHtml, 'image');
			    }
			    $category_child['image'] = $category->getImageUrl();
			    $category_child['thumbnail'] = Mage::getBaseUrl('media').'catalog/category/'.$category->getThumbnail();
			    
			    $category_childs[] = $category_child;
			}
			$cache->save(json_encode($category_childs), "single_level_category_childs_".$category_id.'_'.Mage::app()->getStore()->getId(), array("px_cache"), 60*60*24*30);
			return $category_childs;
		}else{
			return json_decode($category_childs, true);
		}
	}
	
	public function getSingleCategory($category_id){

		$cache = Mage::getSingleton('core/cache');
		$category_child = $cache->load("single_category_".$category_id.'_'.Mage::app()->getStore()->getId());
		$_helper    = Mage::helper('catalog/output');

		if($category_child == false){
				
			$categories_collection = Mage::getModel('catalog/category')->getCollection()->addFieldToFilter('entity_id', array('eq'=>$category_id))->addAttributeToSelect('name');
			$categories_collection->addAttributeToSelect('id')->addAttributeToSelect('description')->addAttributeToSelect('image')->addAttributeToSelect('thumbnail')->setStoreId(Mage::app()->getStore()->getId())->load();
			$category_child = array();
			
			foreach($categories_collection as $category){
				$category_child['name'] = $category->getName();
				$category_child['id'] = $category->getId();
				
				$url = $category->getUrl();
				$url = str_replace('http://', '', $url);
				$url = str_replace('https://', '', $url);
				//$url = str_replace('?___SID=U', '', $url);
				
				$slash_position = strpos($url, '/');
				$url = substr($url,$slash_position, (strlen($url)-$slash_position));
				
				$category_child['url'] = $url;
			    $category_child['image'] = $category->getImageUrl();
			    $category_child['thumbnail'] = Mage::getBaseUrl('media').'catalog/category/'.$category->getThumbnail();
			    $category_child['description'] = $category->getDescription();
			}
			$cache->save(json_encode($category_child), "single_category_".$category_id.'_'.Mage::app()->getStore()->getId(), array("px_cache"), 60*60*24*30);
			return $category_child;
		}else{
			return json_decode($category_child, true);
		}
	}
	
	public function getAllConfigurableProducts(){
		
		$px_simple_products_only = Mage::getStoreConfig('dol/catalog_setting/px_simple_products_only');
            
        if($px_simple_products_only){
        	
        	$product_collection = Mage::getModel('catalog/product')->getCollection()
								->addFieldToFilter('type_id', array('eq'=>'simple'))
								->addAttributeToFilter('status', Mage_Catalog_Model_Product_Status::STATUS_ENABLED)
								->addAttributeToFilter('enable_custom_design', '1')
								->addAttributeToSelect('name')
								->addAttributeToSort('name', 'ASC')
								->addStoreFilter(Mage::app()->getStore()->getId())
								->addAttributeToSort('id', 'ASC');
        }else{
            
        	$visibility = array(Mage_Catalog_Model_Product_Visibility::VISIBILITY_BOTH, Mage_Catalog_Model_Product_Visibility::VISIBILITY_IN_CATALOG);
        	
			$product_collection = Mage::getModel('catalog/product')->getCollection()
								->addAttributeToFilter('visibility', $visibility)
								->addAttributeToFilter('status', Mage_Catalog_Model_Product_Status::STATUS_ENABLED)
								->addAttributeToSelect('name')
								->addAttributeToSort('name', 'ASC')
								->addStoreFilter(Mage::app()->getStore()->getId())
								->addAttributeToSort('id', 'ASC');
        }

		return $product_collection;
	}
	
	
	public function getAllConfigurableProductsList(){
		
		$configurable_list = Mage::helper('template')->getAllConfigurableProducts();
		$product_array = array();
		
		foreach($configurable_list as $product){
			$product_array[$product->getId()] = $product->getName();
		}
		
		return $product_array;
	}
	
	public function getAllColorsList(){
		
		$color_collection = Mage::getModel('color/color')->getCollection()->setOrder('name', 'asc');

		$color_array = array();
		
		foreach($color_collection as $color){
			$color_array[$color->getId()] = $color->getName();
		}
		
		return $color_array;
	}
	
	public function getColorArray()
    {
    	$opts = array();
    	$collection = Mage::getModel('color/color')->getCollection()->setOrder('name', 'asc');

    	foreach ($collection as $brand) {
    		$opts[] = array('value' => $brand->getcolor_id(), 'label' => $brand->getname());
    	}
    	return $opts;
    }
    
	public function getAllTextFieldsList(){
		
		$text_collection = Mage::getModel('textfields/textfields')->getCollection()->addFieldToFilter('type', '1')->setOrder('seq_num', 'asc');

		$text_array = array();
		
		foreach($text_collection as $text){
			$text_array[$text->getValue()] = $text->getName();
		}
		return $text_array;
	}
	
	public function getAllImageFieldsList(){
		
		$text_collection = Mage::getModel('textfields/textfields')->getCollection()->addFieldToFilter('type', '2')->setOrder('seq_num', 'asc');

		$text_array = array();
		
		foreach($text_collection as $text){
			$text_array[$text->getValue()] = $text->getName();
		}
		return $text_array;
	}
	
	
	public function getAttributeOptionsOfConfigurableProduct($productId, $attributetype)
	{
		$result_data = array();
		$store_ids = array();
		$added_ids = array();
		
		$all_stores = Mage::app()->getStores();
		foreach ($all_stores as $each_store_id => $val){
			$store_ids[] = Mage::app()->getStore($each_store_id)->getId();
		}	
		
		if($productId<>'' && $attributetype<>'') {
			$availableValues = array();
			$product = Mage::getModel('catalog/product')->load($productId);
			
			$product_type = $product->getTypeId();
			
			if($product_type=='configurable'){
			
				$allProductsIds = array();
				$table_name = Mage::getSingleton("core/resource")->getTableName('catalog_product_super_link');
				
				//enable all products from full feed
				$query = 'SELECT product_id from '.$table_name.' where parent_id ='.$productId;
				$w = Mage::getSingleton('core/resource')->getConnection('core_read');
				$result = $w->query($query);
	
				$row = $result->fetch(PDO::FETCH_ASSOC);
	
				while($row):
					$allProductsIds[$row['product_id']] = $row['product_id'];
					$row = $result->fetch(PDO::FETCH_ASSOC);
				endwhile;
				
				$website_ids = Mage::getModel('core/website')->getCollection()->getAllIds();
				
				if(count($store_ids)>1 && count($website_ids)>1){
					
					foreach($store_ids as $store_id){
						foreach($website_ids as $website_id){
				            $products = Mage::getModel('catalog/product')->getCollection()
				                        		->addAttributeToSelect('size')
				                        		->addAttributeToSelect('sku')
				                        		->addIdFilter($allProductsIds)
				                        		->setStore($store_id)
				                        		->addStoreFilter($store_id)
				                        		->addWebsiteFilter($website_id)
				                       			->load();
				                     
							// get all available color from all subproducts
							foreach ($products as $subproduct) {
								if($subproduct->getStatus() == Mage_Catalog_Model_Product_Status::STATUS_ENABLED){
									if(!in_array($subproduct->getId(), $added_ids)){
										if($subproduct->getData($attributetype)){
							    			$availableValues[$subproduct->getAttributeText($attributetype)] = $subproduct->getData($attributetype);
								    		$result_data[][$subproduct->getData($attributetype)] = $subproduct->getData('sku');
										}
							    		$added_ids[] = $subproduct->getId();
									}
								}
							}
						}
					}
				}else{
					$products = Mage::getModel('catalog/product')->getCollection()
			                        		->addAttributeToSelect('size')
			                        		->addAttributeToSelect('sku')
			                        		->addIdFilter($allProductsIds)
			                       			->load();
			                     
					// get all available color from all subproducts
					foreach ($products as $subproduct) {
						if($subproduct->getStatus() == Mage_Catalog_Model_Product_Status::STATUS_ENABLED){
							if($subproduct->getData($attributetype)){
					    		$availableValues[$subproduct->getAttributeText($attributetype)] = $subproduct->getData($attributetype);
					    		$result_data[][$subproduct->getData($attributetype)] = $subproduct->getData('sku');
							}
						}
					}
				}
				
				
			}
			
			if($product_type=='simple'){
				foreach ($product->getOptions() as $opt) {
					
					$optionType = $opt->getType();
					$option_id = $opt->getId();
					
		        	$values = $opt->getValues();  
			        foreach ($values as $v) {
			        		
		        		$title = $opt->getTitle();
		        		$title = strtolower($title);
		        		$size_pos = strpos($title, 'size');
		        		
		        		if($size_pos!==false){
		        			$availableValues[$v->getTitle()] = $v->getId();
		        		}
		        	}
				}
				
				
				if(!$availableValues){
				
					$attribute_set_id = $product->getAttributeSetId();
					$attribute_set = Mage::getModel('eav/entity_attribute_set')->load($attribute_set_id);
					$size_attribute = '';
					
					$attributesInfo = Mage::getResourceModel('eav/entity_attribute_collection')
					->setAttributeSetFilter($attribute_set_id)
					->addSetInfo()
					->getData();
					
					$configurable_attributes = array();
						
					foreach($attributesInfo as $attribute){
					
						$catalog_attribute = Mage::getModel('catalog/entity_attribute')->load($attribute['attribute_id']);
						$attribute = Mage::getModel('eav/entity_attribute')->load($catalog_attribute['attribute_id']);
						$configurable_attributes[] = $attribute;
					}
					
					foreach($configurable_attributes as $configurable_attribute){
							
						$attribute_code = $configurable_attribute->getData('attribute_code');
						$attribute_code = strtolower($attribute_code);
							
						if(strpos($attribute_code, 'size')!==false){
							$size_attribute = $product->getAttributeText($attribute_code);
					
							if(strpos($size_attribute, '(') !==false){
								$size_attribute = substr($size_attribute, 0, strpos($size_attribute, '('));
							}
						}
						if($size_attribute){
							$availableValues[$size_attribute] = $product->getData($attribute_code);
							break;
						}
					}
				}
			}
			
			$product_dimensions = $product->getProductDimensions();
			
			if($product_dimensions){
				$availableValues = array();
				$availableValues[$product_dimensions] = $productId;
			}

			$res = array($attributetype => $availableValues,'products'=>$result_data);
			
			if(sizeof($availableValues)>0) {
				return $res; 
			} else {
				return false;	
			}
		}	
	}
	
	
	public function getConfigurableProductAttributes($product_id, $size_value_id)
	{
		Mage::log('Inside getConfigurableProductAttributes');
		
		$product = Mage::getModel('catalog/product')->load($product_id);
		$product_type = $product->getTypeId();
		
		$store_ids = array();
		$added_ids = array();
		$attributes_data = array();
		
		$all_stores = Mage::app()->getStores();
		foreach ($all_stores as $each_store_id => $val){
			$store_ids[] = Mage::app()->getStore($each_store_id)->getId();
		}
		
		if($product_type=='configurable'){
			$res = Mage::helper('template')->getConfigurableAttributes($product->getAttributeSetId(), false);
			
			$configurable_attributes = array();
			$size_exists = false;
			
			if($res){
				foreach($res as $configurable_attribute){
					$configurable_attributes[$configurable_attribute->getData('attribute_code')] = $configurable_attribute->getData('attribute_code');
					if($configurable_attribute->getData('attribute_code')=='size'){
						$size_exists = true;
					}
				}
			}
			
			$allProductsIds = array();
			$table_name = Mage::getSingleton("core/resource")->getTableName('catalog_product_super_link');
			
			//enable all products from full feed
			$query = 'SELECT product_id from '.$table_name.' where parent_id ='.$product_id;
			$w = Mage::getSingleton('core/resource')->getConnection('core_read');
			$result = $w->query($query);
	
			$row = $result->fetch(PDO::FETCH_ASSOC);
	
			while($row):
				$allProductsIds[$row['product_id']] = $row['product_id'];
				$row = $result->fetch(PDO::FETCH_ASSOC);
			endwhile;
				
			$website_ids = Mage::getModel('core/website')->getCollection()->getAllIds();
				
			if(count($store_ids)>1 && count($website_ids)>1){
				
				$filtered_products = array();
				foreach($store_ids as $store_id){
					foreach($website_ids as $website_id){
						
						if($size_exists){
							$products = Mage::getModel('catalog/product')->getCollection()
								->addAttributeToSelect($configurable_attributes)
								->addIdFilter($allProductsIds)
								->addAttributeToFilter('size', $size_value_id)
								->setStore($store_id)
								->addStoreFilter($store_id)
								->addWebsiteFilter($website_id)
								->load();
						}else{
							$products = Mage::getModel('catalog/product')->getCollection()
								->addAttributeToSelect($configurable_attributes)
								->addIdFilter($allProductsIds)
								->setStore($store_id)
								->addStoreFilter($store_id)
								->addWebsiteFilter($website_id)
								->load();
						}
						
	                       			
						// get all available color from all subproducts
						foreach ($products as $subproduct) {
							if($subproduct->getStatus() == Mage_Catalog_Model_Product_Status::STATUS_ENABLED){
								if(!in_array($subproduct->getId(), $added_ids)){
									$filtered_products[] = $subproduct;
						    		$added_ids[] = $subproduct->getId();
								}
							}
						}
	                       			
					}
				}
				$products = $filtered_products;
				
			}else{
				if($size_exists){
					$products = Mage::getModel('catalog/product')->getCollection()
						->addAttributeToSelect($configurable_attributes)
						->addIdFilter($allProductsIds)
						->addAttributeToFilter('size', $size_value_id)
						->load();
				}else{
					$products = Mage::getModel('catalog/product')->getCollection()
						->addAttributeToSelect($configurable_attributes)
						->addIdFilter($allProductsIds)
						->load();
				}
			}
	                       			
			$attributes_data = array();
		
			foreach ($products as $subproduct) {
				
				if($subproduct->getStatus() == Mage_Catalog_Model_Product_Status::STATUS_ENABLED){
					
			    	if($subproduct->getData('size')==$size_value_id || !$size_exists){
			    		
						foreach ($res as $productAttribute) {
							
							$attribute_code = $productAttribute->getAttributeCode();
							
							if($productAttribute->getAttributeCode()!='size'){
								$attributes_data[$productAttribute->getAttributeId()]['Name'] = $productAttribute->getFrontendLabel();
								$attributes_data[$productAttribute->getAttributeId()]['Values'][$subproduct->getData($attribute_code)] = $subproduct->getAttributeText($attribute_code);
							}
						}
						
						
				    	$is_scp_enabled = Mage::getStoreConfig('dol/catalog_setting/scp_enabled');
			
						if($is_scp_enabled){
							
							$subproduct->load($subproduct->getId());
							foreach ($subproduct->getOptions() as $opt) {
				
								$optionType = $opt->getType();
								$option_id = $opt->getId();
								$option_title = $opt->getTitle();
								$option_type = $opt->getType();
								
								$title = $opt->getTitle();
					        	$title = strtolower($title);
					        	$size_pos = strpos($title, 'size');
					        	
					        	if($size_pos!==false || $title=='upload' || ($option_type!='drop_down' && $option_type!='radio' && $option_type!='multiple')){
					        		continue;
					        	}
								
								$attributes_data['options_'.$option_id]['Name'] = $option_title;
								
					        	$values = $opt->getValues();  
						        foreach ($values as $v) {
					        		$attributes_data['options_'.$option_id]['Values'][$v->getId()] = $v->getTitle();
					        	}
							}
						}
			    	}
				}
			}
		}
		
		
		foreach ($product->getOptions() as $opt) {
				
			$optionType = $opt->getType();
			$option_id = $opt->getId();
			$option_title = $opt->getTitle();
			$option_type = $opt->getType();
			
			$title = $opt->getTitle();
        	$title = strtolower($title);
        	$size_pos = strpos($title, 'size');
        	
        	if($size_pos!==false || $title=='upload' || ($option_type!='drop_down' && $option_type!='radio' && $option_type!='multiple')){
        		continue;
        	}
			
			$attributes_data['options_'.$option_id]['Name'] = $option_title;
			
        	$values = $opt->getValues();  
	        foreach ($values as $v) {
        		$attributes_data['options_'.$option_id]['Values'][$v->getId()] = $v->getTitle();
        	}
		}

		return $attributes_data;
	}
	
	
	public function getAllOtherAttributeValuesForEdit($product_id, $size_id, $count_id, $content){
    	
    	$size_data = array();
    	$html = '';
    	
    	if($product_id){
    		
    		$attributes_data = Mage::helper('template')->getConfigurableProductAttributes($product_id, $size_id);
    		
    		$set_attributes = json_decode($content->getData('other_attributes'), true);
    		$set_custom_options = json_decode($content->getData('custom_options'), true);
    		
    		$html .= '<table cellspacing="10px" class="form-template form-list"><tr>';
                       
    		if($set_attributes || $set_custom_options){
    			
    			if(!$set_attributes){
    				$set_attributes = $set_custom_options;
    			}
    			
	    		foreach ($attributes_data as $key => $attribute){
	    			
		    		if(!array_key_exists('Values', $attribute)){
	    				continue;
	    			}
	    			
	    			$html .= '<td><h4>'.$attribute['Name'].'</h4>';
	    			
	    			$html.= '<select multiple="multiple" size="5" name="'.$key.'_'.$count_id.'[]" onchange="getMatchingProductLayout('.$product_id.','.$size_id.','.$count_id.')">';
	    			
	    			$attribute_values = $attribute['Values'];
	    			
		    		$option_pos = strpos($key, 'options_');
		        		
		        	if($option_pos!==false && $set_custom_options){
		        		$key = str_replace('options_', '', $key);
		        		if(array_key_exists($key, $set_custom_options)){
		        			$set_attribute_data = $set_custom_options[$key];
		        		}else{
	    					$set_attribute_data = array();
	    				}
	    			}else{
	    				if(array_key_exists($key, $set_attributes)){
	    					$set_attribute_data = $set_attributes[$key];
	    				}else{
	    					$set_attribute_data = array();
	    				}
	    			}
	    			
	    			foreach ($attribute_values as $value_key => $attribute_value){
	    				
	    				if($set_attribute_data && in_array($value_key, $set_attribute_data)){
							$html.= '<option value="'.$value_key.'" selected=selected>'.$attribute_value.'</option>';
	    				}else{
	    					$html.= '<option value="'.$value_key.'">'.$attribute_value.'</option>';
	    				}
	    			}
	    			$html.= '</select></td>';
	    		}
    		}
    		$html.= '</tr></table>';
    		
    	}
    	return $html;
    }

    
	public function getConfigurableAttributes($attribute_set_id, $get_all){
		
		$attribute_set = Mage::getModel('eav/entity_attribute_set')->load($attribute_set_id);
		
        $attributeGroupId = Mage::getModel('eav/entity_attribute_group')
                    					->getCollection()
                    					->addFieldToFilter('attribute_set_id', $attribute_set_id)
                    					->addFieldToFilter('attribute_group_name', $attribute_set->getAttributeSetName().' Attributes')
                   			 			->getFirstItem()
                    					->getAttributeGroupId();
		
		$attributesInfo = Mage::getResourceModel('eav/entity_attribute_collection')
										->setEntityTypeFilter('4') 
										->setAttributeSetFilter($attribute_set_id) 
										->setAttributeGroupFilter($attributeGroupId)
										->addSetInfo()
										->getData();
                    						
    	$configurable_attributes = array();
    	
		foreach($attributesInfo as $attribute){

			$catalog_attribute = Mage::getModel('catalog/entity_attribute')->load($attribute['attribute_id']);
			
			if($get_all || $catalog_attribute->getIsConfigurable()){
				
				$attribute = Mage::getModel('eav/entity_attribute')->load($catalog_attribute['attribute_id']);
				$configurable_attributes[] = $attribute;
			}
		}
		
		return $configurable_attributes;
	}
	
	public function createTemplateFeed()
	{

		$base_dir = Mage::getBaseDir();
		$filename = "template.csv";
		$core_path = Mage::getStoreConfig(self::SOLR_CORE);
		$core_path = str_replace('pixopa_', '', $core_path);
		$solr_path = Mage::getStoreConfig(self::SOLR_PATH);
		
		if(!$solr_path || $solr_path=='base'){
			$filepath = Mage::getBaseDir().'/../../solr/pixopa/solr/'.$core_path.'/feed/';
		}else if($solr_path=='dev'){
			$filepath = Mage::getBaseDir().'/../solr/pixopa/solr/'.$core_path.'/feed/';
		}else{
			$filepath = $solr_path.'/solr/pixopa/solr/'.$core_path.'/feed/';
		}

		$this->io =  new Varien_Io_File();
		
		$this->io->checkAndCreateFolder($filepath);
        $this->io->cd($filepath);
        $this->io->streamOpen($filename, 'w+');
        $this->io->streamLock();
		
		$colArray = array('id','name','templateDescription','productId','productName','productNameSearch','productDescription','tid','topic','oid','occassion','rid','recipient','price','keywords','cid','color','color_hex','sid','sizeLabel','size','sizesCount','thumb','image','url','allText','isCyo','storeIds','customerGroupIds','customerIds','sequenceNum');
		$fieldArray = array();		
		
		foreach ($colArray as $key=>$val) {		
			$fieldArray[$key] = $val;		
		}		
		$this->io->streamWriteCsv($fieldArray, ',');

		$start_mem = memory_get_usage();
		Mage::log('Start Memory - '.$start_mem);

		//Update Template URLs
		Mage::log('Refreshing Template Rewrites');
		Mage::getSingleton('catalog/url')->refreshAllTemplateRewrites();
		Mage::log('Refreshing Template Rewrites Done!');
		
		$template_collection = Mage::getModel("template/template")->getCollection()->addFieldToFilter('enabled', '1');
		
		/*
		$product_collection = Mage::getModel('catalog/product')->getCollection()
								->addAttributeToSelect('product_id')
								->addAttributeToSelect('sku')
								->addAttributeToSelect('product_url')
								->addAttributeToSelect(array('name', 'description', 'image', 'price', 'adr_brand'), 'inner')
								->joinField('is_in_stock',
						                'cataloginventory/stock_item',
						                'is_in_stock',
						                'product_id=entity_id',
						                '{{table}}.stock_id=1',
						                'left');
						                
		$query = "SELECT category_id from catalog_category_product where product_id=".$item->getId();
		
		$w = Mage::getSingleton('core/resource')->getConnection('core_read');
		$result = $w->query($query);		
		$row = $result->fetch(PDO::FETCH_ASSOC);
		
		while($row):
			$category_ids[] = $row['category_id'];
			$row = $result->fetch(PDO::FETCH_ASSOC);
		endwhile;
		*/
		
		$active_categories = array();
		Mage::getSingleton('core/resource_iterator')->walk($template_collection->getSelect(), array(array($this, 'insertTemplateFeedRecord')), array('active_categories' => &$active_categories));
		
		$this->io->streamUnlock();
		$this->io->streamClose();
		
		unset($template_collection);
		unset($this->io);

		
		//Make Request to Solr to clear all indexes first
		$fields = array(
            'commit'=>urlencode('true'),
            'stream.body'=>urlencode('<delete><query>*:*</query></delete>')
        );
		
        $fields_string = '';
        
        //url-ify the data for the POST
		foreach($fields as $key=>$value) {
			$fields_string .= $key.'='.$value.'&'; 
		}
		rtrim($fields_string,'&');

		$hostname = Mage::getStoreConfig(self::SOLR_HOST);
        $port = Mage::getStoreConfig(self::SOLR_PORT);
        $core = Mage::getStoreConfig(self::SOLR_CORE);
        
        $url = 'http://'.$hostname.':'.$port.'/solr/'.$core.'/update';
		
        ob_start();
		$ch = curl_init();
		curl_setopt($ch,CURLOPT_URL, $url);
		curl_setopt($ch,CURLOPT_POST,count($fields));
		curl_setopt($ch,CURLOPT_POSTFIELDS,$fields_string);
		curl_exec($ch);
		curl_close($ch);
		ob_end_clean();
		
		
		//Post new template data to Solr
		$fields = array(
            'commit'=>urlencode('true'),
            'stream.file'=>urlencode('solr/'.$core_path.'/feed/template.csv'),
			'f.topic.split'=>urlencode('true'),
			'f.topic.separator'=>urlencode('|'),
			'f.topic.encapsulator'=>urlencode('~'),
			'f.occassion.split'=>urlencode('true'),
			'f.occassion.separator'=>urlencode('|'),
			'f.occassion.encapsulator'=>urlencode('~'),
			'f.recipient.split'=>urlencode('true'),
			'f.recipient.separator'=>urlencode('|'),
			'f.recipient.encapsulator'=>urlencode('~'),
			'f.tid.split'=>urlencode('true'),
			'f.tid.separator'=>urlencode('|'),
			'f.tid.encapsulator'=>urlencode('~'),
			'f.oid.split'=>urlencode('true'),
			'f.oid.separator'=>urlencode('|'),
			'f.oid.encapsulator'=>urlencode('~'),
			'f.rid.split'=>urlencode('true'),
			'f.rid.separator'=>urlencode('|'),
			'f.rid.encapsulator'=>urlencode('~'),
			'f.sid.split'=>urlencode('true'),
			'f.sid.separator'=>urlencode('|'),
			'f.sid.encapsulator'=>urlencode('~'),
			'f.sizeLabel.split'=>urlencode('true'),
			'f.sizeLabel.encapsulator'=>urlencode('~'),
			'f.size.split'=>urlencode('true'),
			'f.size.separator'=>urlencode('|'),
			'f.size.encapsulator'=>urlencode('~'),
			'f.allText.split'=>urlencode('true'),
			'f.allText.separator'=>urlencode('|'),
			'f.allText.encapsulator'=>urlencode('~')
        );
		
        $fields_string = '';
        
        //url-ify the data for the POST
		foreach($fields as $key=>$value) {
			$fields_string .= $key.'='.$value.'&'; 
		}
		rtrim($fields_string,'&');

		$hostname = Mage::getStoreConfig(self::SOLR_HOST);
        $port = Mage::getStoreConfig(self::SOLR_PORT);
        $core = Mage::getStoreConfig(self::SOLR_CORE);
        
        $url = 'http://'.$hostname.':'.$port.'/solr/'.$core.'/update/csv';
        
        ob_start();
		$ch = curl_init();
		curl_setopt($ch,CURLOPT_URL,$url);
		curl_setopt($ch,CURLOPT_POST,count($fields));
		curl_setopt($ch,CURLOPT_POSTFIELDS,$fields_string);
		curl_exec($ch);
		curl_close($ch);
		ob_end_clean();
		
		
		//Update categories
		$show_empty_category = Mage::getStoreConfig('dol/catalog_setting/show_empty_category');
		$is_active_attribute_id = Mage::getStoreConfig('dol/catalog_setting/is_active_attribute_id');
		
		if(!$show_empty_category){
			$TOPIC_CATEGORY_ID = Mage::getStoreConfig('dol/catalog_setting/topic_category_id');
			$EVENTS_AND_OCCASSION_CATEGORY_ID = Mage::getStoreConfig('dol/catalog_setting/occassions_category_id');
			$RECIPIENT_CATEGORY_ID = Mage::getStoreConfig('dol/catalog_setting/recipient_category_id');
			
			$topic_childs = $this->getCategoryChilds($TOPIC_CATEGORY_ID);
			$event_childs = $this->getCategoryChilds($EVENTS_AND_OCCASSION_CATEGORY_ID);
			$recipient_childs = $this->getCategoryChilds($RECIPIENT_CATEGORY_ID);
			
			
			$deactivate_list = array();
			foreach($topic_childs as $topic_child_id){
				$deactivate_list[] = $topic_child_id;
			}
			foreach($event_childs as $event_child_id){
				$deactivate_list[] = $event_child_id;
			}
			foreach($recipient_childs as $recipient_child_id){
				$deactivate_list[] = $recipient_child_id;
			}
			$deactivate_list = implode(',',$deactivate_list);
			
			Mage::log('Deactivating all categories!');
			
			$table_name = Mage::getSingleton("core/resource")->getTableName('catalog_category_entity_int');
			$sql = "UPDATE ".$table_name." set value='0' where attribute_id='".$is_active_attribute_id."' and entity_id in (".$deactivate_list.")"; 
			$data = Mage::getSingleton('core/resource')->getConnection('core_write')->query($sql);
			Mage::log('Deactivating all categories done!');
			
			Mage::log('Activating all categories!');
			
			//$topic_category_is_active = Mage::getModel('catalog/category')->load($TOPIC_CATEGORY_ID)->getIsActive();
			$event_category_is_active = Mage::getModel('catalog/category')->load($EVENTS_AND_OCCASSION_CATEGORY_ID)->getIsActive();
			$recipient_category_is_active = Mage::getModel('catalog/category')->load($RECIPIENT_CATEGORY_ID)->getIsActive();
			
			if($active_categories && $event_category_is_active==1 && $recipient_category_is_active==1){
				$active_categories = implode(',',$active_categories);
				$sql = "UPDATE ".$table_name." set value='1' where attribute_id='".$is_active_attribute_id."' and entity_id in (".$active_categories.")"; 
				$data = Mage::getSingleton('core/resource')->getConnection('core_write')->query($sql);
				Mage::log('Activating all categories done!');
			}else{
				Mage::log('No categories to activate!');
			}
		}else{
			Mage::log('Activating all categories!');
			$table_name = Mage::getSingleton("core/resource")->getTableName('catalog_category_entity_int');
			//TODO: $sql = "UPDATE ".$table_name." set value='1' where attribute_id='".$is_active_attribute_id."'"; 
			//$data = Mage::getSingleton('core/resource')->getConnection('core_write')->query($sql);
			Mage::log('Activating all categories done TBD!');
		}
		
		$end_mem = memory_get_usage();
		$total_memory_used = $end_mem - $start_mem;
		Mage::log('Total memory taken to reindex - '.($total_memory_used/1048576).' MB');
		
		return $this;
	}
	
	
	
	function insertTemplateFeedRecord($args)
	{
	    $item = Mage::getModel('template/template');
	    $item->setData($args['row']);
	    
	    $active_categories = &$args['active_categories'];
	    
		Mage::log('Adding template id - '.$item->getTemplateId());
		
		$cateName = '';
		$category_ids = array();
		
		$topic_data = $item->getTopicId();
		$event_data = $item->getEventId();
		$recipient_data = $item->getRecipientId();
		
		$topic_names = '';
		$event_names = '';
		$recipient_names = '';
		
		$topic_labels = '';
		$event_labels = '';
		$recipient_labels = '';
		
		$topic_ids = '';
		$event_ids = '';
		$recipient_ids = '';
		
		$category_name_attribute_id = Mage::getStoreConfig('dol/catalog_setting/category_name_attribute_id');
		
		$table_name = Mage::getSingleton("core/resource")->getTableName('catalog_category_entity_varchar');
		
		if($topic_data){
			$topic_list = explode('|', $topic_data);
			$level = 1;

			foreach($topic_list as $categoryId) {
		    	
				if(!$categoryId){
					continue;
				}
				
		    	$name = Mage::getSingleton('core/resource')->getConnection('core_read')->fetchOne("select value from ".$table_name." where attribute_id='".$category_name_attribute_id."' and entity_id='$categoryId'");
	
	    		if($name!='Default Category'){
		    		if($topic_names){
			    		$topic_names .= '|';
			    	}
			    	$topic_names .= '~'.$categoryId.'----'.$name.'-level'.$level.'~';
			    	$level++;
			    	
			    	if($topic_labels){
			    		$topic_labels .= '|';
			    	}
			    	$topic_labels .= '~'.$name.'~';
			    	
			    	if($topic_ids){
			    		$topic_ids .= '|';
			    	}
			    	$topic_ids .= '~'.$categoryId.'~';
			    	
	    			if(!in_array($categoryId, $active_categories)){
			    		$active_categories[] = $categoryId;
			    	}
	    		}
			}
		}
		
		if($event_data){
			$event_list = explode('|', $event_data);
			$level = 1;

			foreach($event_list as $categoryId) {
		    	
				if(!$categoryId){
					continue;
				}
				
		    	$name = Mage::getSingleton('core/resource')->getConnection('core_read')->fetchOne("select value from ".$table_name." where attribute_id='".$category_name_attribute_id."' and entity_id='$categoryId'");
	
	    		if($name!='Default Category'){
		    		if($event_names){
			    		$event_names .= '|';
			    	}
			    	$event_names .= '~'.$categoryId.'----'.$name.'-level'.$level.'~';
			    	$level++;
			    	
			    	if($event_labels){
			    		$event_labels .= '|';
			    	}
			    	$event_labels .= '~'.$name.'~';
			    	
			    	if($event_ids){
			    		$event_ids .= '|';
			    	}
			    	$event_ids .= '~'.$categoryId.'~';
			    	
	    			if(!in_array($categoryId, $active_categories)){
			    		$active_categories[] = $categoryId;
			    	}
	    		}
			}
		}
		
		if($recipient_data){
			$recipient_list = explode('|', $recipient_data);
			$level = 1;

			foreach($recipient_list as $categoryId) {
		    	
				if(!$categoryId){
					continue;
				}
				
		    	$name = Mage::getSingleton('core/resource')->getConnection('core_read')->fetchOne("select value from ".$table_name." where attribute_id='".$category_name_attribute_id."' and entity_id='$categoryId'");
	
	    		if($name!='Default Category'){
		    		if($recipient_names){
			    		$recipient_names .= '|';
			    	}
			    	$recipient_names .= '~'.$categoryId.'----'.$name.'-level'.$level.'~';
			    	$level++;
			    	
			    	if($recipient_labels){
			    		$recipient_labels .= '|';
			    	}
			    	$recipient_labels .= '~'.$name.'~';
			    	
			    	if($recipient_ids){
			    		$recipient_ids .= '|';
			    	}
			    	$recipient_ids .= '~'.$categoryId.'~';
			    	
			    	if(!in_array($categoryId, $active_categories)){
			    		$active_categories[] = $categoryId;
			    	}
	    		}
			}
		}

	 	$template_id = $item->getTemplateId();
	 	$name = $item->getName();
	 	$description = $item->getdescription();
	 	$keywords = $item->getKeywords();
	 	$color_id = $item->getColorId();
		$product_id = $item->getProductId();
		$thumb = $item->getThumbnailPath();
		$image = $item->getImagePath();
		$sequenceNum = $item->getSequenceNum();; 
		
		$custom_image = $item->getCustomImageThumbPath();
		if($custom_image){
			$thumb = $custom_image;
		}
		
		$url = $item->getUrlPath();
		$is_cyo = $item->getIsCyo();
		$store_ids = $item->getStoreIds();
		$customer_group_ids = $item->getCustomerGroupIds();
		$customer_ids = $item->getCustomerIds();
		
		if(!$is_cyo || $is_cyo==2){
			$is_cyo = 0;
		}
		
		if(!$sequenceNum){
			$sequenceNum = 1000000000 - (int)$template_id;
		}
		
		if($store_ids){
			$store_ids = explode(',', $store_ids);
			if(is_array($store_ids)){
				$store_ids = implode('|', $store_ids);
			}
			$store_ids = '|'.$store_ids.'|';
		}else{
			$store_ids = '|0|';
		}
		
		if($customer_group_ids){
			$customer_group_ids = explode(',', $customer_group_ids);
			if(is_array($customer_group_ids)){
				$customer_group_ids = implode('|', $customer_group_ids);
			}
			$customer_group_ids = '|'.$customer_group_ids.'|';
		}else{
			$customer_group_ids = '|-1|';
		}
		
		if($customer_ids){
			$customer_ids = explode('|', $customer_ids);
			if(is_array($customer_ids)){
				$customer_ids = implode('|', $customer_ids);
			}
			$customer_ids = '|'.$customer_ids.'|';
		}else{
			$customer_ids = '|-1|';
		}
		
		
        $product = Mage::getModel('catalog/product')->getCollection()
		                        		->addAttributeToSelect('sku')
		                        		->addAttributeToSelect(array('name', 'description', 'price', 'special_price', 'type_id'), 'inner')
		                        		->addIdFilter($product_id)
		                        		->joinField('is_in_stock',
						                'cataloginventory/stock_item',
						                'is_in_stock',
						                'product_id=entity_id',
						                '{{table}}.stock_id=1',
						                'left')
		                        		->getFirstItem();

        $product_name = $product->getName();
        $product_description = $product->getDescription();
		$product_sku = $product->getSku();
		$price = $product->getPrice();
		$final_price = $product->getFinalPrice();
		$special_price = $product->getSpecialPrice();
		
		if($final_price && $final_price < $price){
			$price = $final_price;
		}
		
		if($special_price && $special_price < $price){
			$price = $special_price;
		}

		$size_count = 0;
		
		$color_name = '';
		$color_hex = '';
		
		if($color_id){
			$table_name = Mage::getSingleton("core/resource")->getTableName('px_color');
			$color_name = Mage::getSingleton('core/resource')->getConnection('core_read')->fetchOne("select name from ".$table_name." where color_id='$color_id'");
			$color_hex = Mage::getSingleton('core/resource')->getConnection('core_read')->fetchOne("select hex_value from ".$table_name." where color_id='$color_id'");
		}
		
		$content_list = Mage::getModel('template/content')->getCollection()
							->addFieldToSelect('size_id')
							->addFieldToFilter('template_id', array('eq'=>$template_id))
							->load();
							
		$size_values = '';
		$size_label = '';
		$size_ids = '';
		
		if($content_list->count()>0){
			
			$sizes = array();
			
			foreach($content_list as $content){
				
				$size_id = $content->getSizeId();
				
				if(!$sizes || !in_array($size_id, $sizes)){
					$sizes[] = $size_id;
				}else{
					continue;
				}
				
				$size_value = '';
				$product_type_id = $product->getTypeId();
				
				if($product_type_id=='configurable'){
					$table_name = Mage::getSingleton("core/resource")->getTableName('eav_attribute_option_value');
					$size_value = Mage::getSingleton('core/resource')->getConnection('core_read')->fetchOne("select value from ".$table_name." where option_id='$size_id'");
					$size_value = Mage::helper('template')->filterSizeLabel($size_value);
				}
				
				if($product_type_id=='simple'){
					
					$size_value = '';
					$product->load($product_id);
					foreach ($product->getOptions() as $opt) {
						$title = $opt->getTitle();
		        		$title = strtolower($title);
		        		$size_pos = strpos($title, 'size');
		        		
		        		if($size_pos!==false){
				        	$values = $opt->getValues();  
					        foreach ($values as $v) {
					        	if($v->getId()==$size_id){
				    	      		$size_value = $v->getTitle();
				    	      		break;
					        	}
				        	}
						}
					}
					if(!$size_value){
						$size_value = 'Custom';
					}
				}
				
	    		if($size_values){
		    		$size_values .= '|';
		    	}
		    	$size_values .= '~'.$size_id.'----'.$size_value.'~';
		    	
		    	if(!$size_label){
		    		$size_label = '~'.$size_value.'~';
		    	}
		    	
		    	if($size_ids){
		    		$size_ids .= '|';
		    	}
		    	$size_ids .= '~'.$size_id.'~';
		    	$size_count++;
			}
		}
		
		unset($content_list);
		
		$keywords_all = '';
		if($keywords){
			$keywords_all = str_replace(' ,', ',', $keywords);
			$keywords_all = str_replace(', ', ',', $keywords_all);
			$keywords_all = str_replace(',', '~|~', $keywords_all);
		}
		
		$all_text = '~'.$name .'~|~'. $product_name .'~|'. $topic_labels .'|'. $event_labels .'|'. $recipient_labels .'|~'. $keywords_all.'~|~'. $color_name.'~|'. $size_label;
		
		$dataArray = array($template_id, $name, $description, $product_id, $product_id.'----'.$product_name, $product_name, $product_description, $topic_ids, $topic_names, $event_ids, $event_names, $recipient_ids, $recipient_names, $price, $keywords, $color_id, $color_id.'----'.$color_name.'----'.$color_hex, $color_hex, $size_ids, $size_label, $size_values, $size_count, $thumb, $image, $url, $all_text, $is_cyo, $store_ids, $customer_group_ids, $customer_ids, $sequenceNum);
		$this->io->streamWriteCsv($dataArray, ',');
	
		Mage::log('Total memory now - '.memory_get_usage());
		
		unset($product);
		unset($item);
	}
	
	
	public function getMatchingProductLayout($product_id, $size_id, $other_attributes, $params = null, $custom_options_encoded_data = null){
		
		$matching_layout = array('image' => '', 'thumb' => '', 'fg_image' => '', 'fg_thumb' => '', 'bg_image' => '', 'bg_thumb' => '', 'layout_childs' => '', 'layout_childs_count' => '');
		$other_attributes = json_decode($other_attributes);
		$custom_options = array();
		$mixed_attributes = false;
		
		if($custom_options_encoded_data){
			$custom_options = json_decode($custom_options_encoded_data);
		}
		
		if($other_attributes && $custom_options){
			$mixed_attributes = true;
		}
		
		if(!$size_id){
			$content_list = Mage::getModel('blueprint/content')->getCollection()
								->addFieldToFilter('product_id', array('eq'=>$product_id));
		}else{
			$content_list = Mage::getModel('blueprint/content')->getCollection()
								->addFieldToFilter('product_id', array('eq'=>$product_id))
								->addFieldToFilter('size_id', array('eq'=>$size_id));
			
		}
		
		if($content_list->count()>0){
									
			if($other_attributes || $custom_options){
				
				$match_found = false; 
				$option_match_found = false;
				
				foreach($content_list as $content){
					
					$blueprint_other_attributes = $content->getOtherAttributes();
					
					if(!json_decode($blueprint_other_attributes)){
						$blueprint_other_attributes = $content->getCustomOptions();
						$other_attributes = $custom_options;
						$mixed_attributes = false;
					}
					$blueprint_other_attributes = json_decode($blueprint_other_attributes);
							
					foreach($blueprint_other_attributes as $blueprint_key => $blueprint_other_attribute){
								
						foreach($blueprint_other_attribute as $blueprint_other_attribute_value){
							
							foreach($other_attributes as $key => $other_attribute){
							
								if($blueprint_key==$key){
									$match_found = false;
									if(count($other_attribute)==1){
										$other_attribute = explode(',', $other_attribute[0]);
									}
									foreach($other_attribute as $other_attribute_value){
									
										if($blueprint_other_attribute_value==$other_attribute_value){
											$match_found = true;
											break;
										}
									}
									if($match_found){
										break;
									}
								}
							}
							if($match_found){
								break;
							}
						}
						if(!$match_found){
							break;
						}
					}
					
					if($mixed_attributes && $match_found){
						$blueprint_other_attributes = $content->getCustomOptions();
						$other_attributes = $custom_options;
					
						$blueprint_other_attributes = json_decode($blueprint_other_attributes);
								
						foreach($other_attributes as $key => $other_attribute){
									
							if(count($other_attribute)==1){
								$other_attribute = explode(',', $other_attribute[0]);
							}
							foreach($other_attribute as $other_attribute_value){
								
								foreach($blueprint_other_attributes as $blueprint_key => $blueprint_other_attribute){
								
									if($blueprint_key==$key){
										$option_match_found = false;
										
										foreach($blueprint_other_attribute as $blueprint_other_attribute_value){
										
											if($blueprint_other_attribute_value==$other_attribute_value){
												$option_match_found = true;
												break;
											}
										}
										if($option_match_found){
											break;
										}
									}
								}
								if($option_match_found){
									break;
								}
							}
							if(!$option_match_found){
								break;
							}
						}
					}else{
						$option_match_found = true;
					}
					
					if($match_found && $option_match_found){
						$matching_layout['image'] = $content->getImagePath();
						$matching_layout['thumb'] = $content->getThumbnailPath();
						$matching_layout['fg_image'] = $content->getFgImagePath();
						$matching_layout['fg_thumb'] = $content->getFgThumbnailPath();
						$matching_layout['bg_image'] = $content->getBgImagePath();
						$matching_layout['bg_thumb'] = $content->getBgThumbnailPath();
						$matching_layout['print_layout'] = $content->getPrintLayoutPath();
						$matching_layout['margin_layout'] = $content->getMarginLayoutPath();
						
						$design_id = $content->getDesignId();
						$svg_design_childs = array();
						
						$svg_design_childs_collection = Mage::getModel('template/svgdesign')->getCollection()
																			->addFieldToFilter('parent_design_id', array('eq' => $design_id))
																			->addFieldToSelect('fg_image_path')
																			->addFieldToSelect('fg_thumbnail_path')
																			->addFieldToSelect('bg_image_path')
																			->addFieldToSelect('bg_thumbnail_path')
																			->addFieldToSelect('print_layout_path')
																			->addFieldToSelect('margin_layout_path')
																			->setOrder('position', 'asc');
			
						if($svg_design_childs_collection && $svg_design_childs_collection->count()>0){
							foreach($svg_design_childs_collection as $svg_design_childs_collection_item){
								
								$svg_design_child['fg_image_path'] = $svg_design_childs_collection_item->getFgImagePath();
								$svg_design_child['fg_thumbnail_path'] = $svg_design_childs_collection_item->getFgThumbnailPath();
								$svg_design_child['bg_image_path'] = $svg_design_childs_collection_item->getBgImagePath();
								$svg_design_child['bg_thumbnail_path'] = $svg_design_childs_collection_item->getBgThumbnailPath();
								$svg_design_child['print_layout'] = $svg_design_childs_collection_item->getPrintLayoutPath();
								$svg_design_child['margin_layout'] = $svg_design_childs_collection_item->getMarginLayoutPath();
								
								$svg_design_childs[] = $svg_design_child;
							}
						}
						
						$matching_layout['layout_childs'] = $svg_design_childs;
						$matching_layout['layout_childs_count'] = count($svg_design_childs);
						
						return $matching_layout;
					}
				}
			}else{
				$content = $content_list->getFirstItem();
				$matching_layout['image'] = $content->getImagePath();
				$matching_layout['thumb'] = $content->getThumbnailPath();
				$matching_layout['fg_image'] = $content->getFgImagePath();
				$matching_layout['fg_thumb'] = $content->getFgThumbnailPath();
				$matching_layout['bg_image'] = $content->getBgImagePath();
				$matching_layout['bg_thumb'] = $content->getBgThumbnailPath();
				$matching_layout['print_layout'] = $content->getPrintLayoutPath();
				$matching_layout['margin_layout'] = $content->getMarginLayoutPath();
				
				$design_id = $content->getDesignId();
				$svg_design_childs = array();
				
				$svg_design_childs_collection = Mage::getModel('template/svgdesign')->getCollection()
																	->addFieldToFilter('parent_design_id', array('eq' => $design_id))
																	->addFieldToSelect('fg_image_path')
																	->addFieldToSelect('fg_thumbnail_path')
																	->addFieldToSelect('bg_image_path')
																	->addFieldToSelect('bg_thumbnail_path')
																	->addFieldToSelect('print_layout_path')
																	->addFieldToSelect('margin_layout_path')
																	->setOrder('position', 'asc');
	
				if($svg_design_childs_collection && $svg_design_childs_collection->count()>0){
					foreach($svg_design_childs_collection as $svg_design_childs_collection_item){
						
						$svg_design_child['fg_image_path'] = $svg_design_childs_collection_item->getFgImagePath();
						$svg_design_child['fg_thumbnail_path'] = $svg_design_childs_collection_item->getFgThumbnailPath();
						$svg_design_child['bg_image_path'] = $svg_design_childs_collection_item->getBgImagePath();
						$svg_design_child['bg_thumbnail_path'] = $svg_design_childs_collection_item->getBgThumbnailPath();
						$svg_design_child['print_layout'] = $svg_design_childs_collection_item->getPrintLayoutPath();
						$svg_design_child['margin_layout'] = $svg_design_childs_collection_item->getMarginLayoutPath();
						
						$svg_design_childs[] = $svg_design_child;
					}
				}
				$matching_layout['layout_childs'] = $svg_design_childs;
				$matching_layout['layout_childs_count'] = count($svg_design_childs);
				
				return $matching_layout;
			}
		}
							
		return $matching_layout;
	}
	
	
	public function getMatchingProductTemplate($template_id, $size_id, $other_attributes, $custom_options_encoded_data = null){
		
		$matching_layout = array('image' => '', 'thumb' => '', 'svg_design_id' => '', 'content' => '', 'zoom_factor' => '1');
		$other_attributes = json_decode($other_attributes);
		$custom_options = array();
		$mixed_attributes = false;
		
		if($custom_options_encoded_data){
			$custom_options = json_decode($custom_options_encoded_data);
		}
		
		if($other_attributes && $custom_options){
			$mixed_attributes = true;
		}
		
		if(!$size_id){
			$content_list = Mage::getModel('template/content')->getCollection()
								->addFieldToFilter('template_id', array('eq'=>$template_id));
		}else{
			$content_list = Mage::getModel('template/content')->getCollection()
								->addFieldToFilter('template_id', array('eq'=>$template_id))
								->addFieldToFilter('size_id', array('eq'=>$size_id));			
		}
		
		if($content_list->count()>0){
									
			if($other_attributes || $custom_options){
				
				$match_found = false; 
				$option_match_found = false;
				
				foreach($content_list as $content){
					
					$template_other_attributes = $content->getOtherAttributes();
					
					if(!json_decode($template_other_attributes)){
						$template_other_attributes = $content->getCustomOptions();
						$other_attributes = $custom_options;
						$mixed_attributes = false;
					}
					$template_other_attributes = json_decode($template_other_attributes);
							
					foreach($template_other_attributes as $template_key => $template_other_attribute){
								
						foreach($template_other_attribute as $template_other_attribute_value){
							
							foreach($other_attributes as $key => $other_attribute){
							
								if($template_key==$key){
									$match_found = false;
									if(count($other_attribute)==1){
										$other_attribute = explode(',', $other_attribute[0]);
									}
									foreach($other_attribute as $other_attribute_value){
									
										if($template_other_attribute_value==$other_attribute_value){
											$match_found = true;
											break;
										}
									}
									if($match_found){
										break;
									}
								}
							}
							if($match_found){
								break;
							}
						}
						if(!$match_found){
							break;
						}
					}
					
					if($mixed_attributes && $match_found){
						$template_other_attributes = $content->getCustomOptions();
						$other_attributes = $custom_options;
						
						$template_other_attributes = json_decode($template_other_attributes);
								
						foreach($other_attributes as $key => $other_attribute){
								
							if(count($other_attribute)==1){
								$other_attribute = explode(',', $other_attribute[0]);
							}
							foreach($other_attribute as $other_attribute_value){
								
								foreach($template_other_attributes as $template_key => $template_other_attribute){
								
									if($template_key==$key){
										$option_match_found = false;
										
										foreach($template_other_attribute as $template_other_attribute_value){
											if($template_other_attribute_value==$other_attribute_value){
												$option_match_found = true;
												break;
											}
										}
										if($option_match_found){
											break;
										}
									}
								}
								if($option_match_found){
									break;
								}
							}
							if(!$option_match_found){
								break;
							}
						}
					}else{
						$option_match_found = true;
					}
					
					if($match_found && $option_match_found){
						$matching_layout['image'] = $content->getImagePath();
						$matching_layout['thumb'] = $content->getThumbnailPath();
						$matching_layout['svg_design_id'] = $content->getDesignId();
						$matching_layout['content'] = $content;
						$matching_layout['zoom_factor'] = $content->getZoomFactor();
			
						return $matching_layout;
					}
				}
			}else{
				$content = $content_list->getFirstItem();
				$matching_layout['image'] = $content->getImagePath();
				$matching_layout['thumb'] = $content->getThumbnailPath();
				$matching_layout['svg_design_id'] = $content->getDesignId();
				$matching_layout['content'] = $content;
				$matching_layout['zoom_factor'] = $content->getZoomFactor();
				
				return $matching_layout;
			}
		}
		return $matching_layout;
	}
	
	public function getCYOTemplate($product_id){
		
		$template_list = Mage::getModel('template/template')->getCollection()
							->addFieldToFilter('product_id', array('eq'=>$product_id))
							->addFieldToFilter('is_cyo', array('eq'=>'1'));
		
		if($template_list->count()>0){
			
			$template = $template_list->getFirstItem();
			return $template->getId();
		}
		
		return '';
	}
	
	public function filterSizeLabel($size_label){
		
		if($size_label){
			
			$mm_pos = strpos($size_label, 'mm');
			
			if($mm_pos!==false){
				return $size_label;
			}
			
    		$pos = strpos($size_label, '(');
    		
    		if ($pos === false) {
    		}else{
    			$endpos = strpos($size_label, ')');
    			
    			if ($endpos === false) {
    			}else{
    				$endpos = $endpos - strlen($size_label);
    				$size_remove_label = substr($size_label, $pos+1, $endpos);
    				$size_label = str_replace('('.$size_remove_label.')', '', $size_label);
    			}
    		}
    		$size_label = str_replace(' W ', '" W ', $size_label);
    		$size_label = str_replace(' H', '" H', $size_label);
    		$size_label = str_replace(' w ', '" W ', $size_label);
    		$size_label = str_replace(' h', '" H', $size_label);
    		$size_label = str_replace('""', '"', $size_label);
    	}
		return $size_label;
	}
}
	 