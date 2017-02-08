<?php
require_once Mage::getModuleDir('controllers', 'Mage_Checkout') . DS . 'CartController.php';

class Pixopa_Checkout_CartController extends Mage_Checkout_CartController
{
	const FLATTEN_PDF = 'dol/system_setting/flatten_pdf_type';
	
	public function indexAction(){
		
		$start = microtime(true);		
		parent::indexAction();
		$end = microtime(true);
		Mage::log('It took: '.round($end - $start, 3)." secs to render cart!");
		
		return;
	}
	
	
	public function addAction()
	{
		Mage::log('Inside addAction');
		
		$cart   = $this->_getCart();
		$params = $this->getRequest()->getParams();
		
		$product_id = $this->getRequest()->getParam('product');
		$super_attributes = $this->getRequest()->getParam('super_attribute');
		$custom_options = $this->getRequest()->getParam('options');
		$qty = $this->getRequest()->getParam('qty');
		$customer_design_id = $this->getRequest()->getParam('design_id');
		$template_id = $this->getRequest()->getParam('template_id');
		$svg_data = $this->getRequest()->getParam('svg_data');
		$addedAt = Varien_Date::toTimestamp(true);
		$from_dol = $this->getRequest()->getParam('from_dol');
		$plain_product = $this->getRequest()->getParam('plain_product');
		$number_of_pages = $this->getRequest()->getParam('number_of_pages');
		$textsvg_1 = $this->getRequest()->getParam('textsvg_1');
		$zoom_factor = $this->getRequest()->getParam('zoom_factor');
		$bleed_margin = $this->getRequest()->getParam('bleed_margin');
		$product_bleed = $this->getRequest()->getParam('product_bleed');
		$is_personalized = $this->getRequest()->getParam('is_personalized');
		$stand_alone_mode = $this->getRequest()->getParam('stand_alone_mode');
		$download_pdf_mode = $this->getRequest()->getParam('download_pdf_mode');
		
		if($textsvg_1){
			$svg_data = $textsvg_1;
		}
		
		if(!$number_of_pages){
			$number_of_pages = 1;
		}
		
		if(!$zoom_factor){
			$zoom_factor = 1;
		}
		
		if($stand_alone_mode){
			$stand_alone_mode = true;
		}else{
			$stand_alone_mode = false;
		}
		
		if($download_pdf_mode){
			$download_pdf_mode = true;
		}else{
			$download_pdf_mode = false;
		}
		
		$is_scp_enabled = Mage::getStoreConfig('dol/catalog_setting/scp_enabled');
		$create_image_for_each_side = Mage::getStoreConfig('dol/system_setting/create_image_for_each_side');
		
		if(!$plain_product){
			
			if($is_scp_enabled){
            	$parentId = $this->getRequest()->getParam('cpid');
            	if($parentId){
            		$params['product'] = $parentId;
            		$product_id = $parentId;
            	}
			}
			
			$result = array();
			$svg_childs = array();
			
			if(!$svg_data && !$from_dol && !$customer_design_id && $template_id){
				$result = Mage::helper('dol')->updatePersonalizationFields($template_id, $params);
				$svg_data = $result['svg'];
				$svg_childs = $result['child_svg_data'];
				$content = $result['content'];
				if($content->getZoomFactor()){
					$zoom_factor = $content->getZoomFactor();
					if($product_bleed){
						$bleed_margin = $product_bleed / $zoom_factor;
					}
				}
			}
			
			if(!$svg_data && $from_dol && !$customer_design_id){
				$this->_getSession()->addError(Mage::helper('core')->escapeHtml('No Design Data was set!'));
	            Mage::logException($e);
	            $this->_goBack();
			}
			
			if($customer_design_id && !$svg_data){
				
				$saved_customer_design = Mage::getModel('template/customerdesign')->load($customer_design_id);
				$saved_svg_design = Mage::getModel('template/customersvgdesign')->load($saved_customer_design->getPrimaryContentId());
				
				$svg_design = Mage::getModel('template/customersvgdesign');
				$svg_design->setData('svg_data', $saved_svg_design->getSvgData());
				$svg_design->save();
				
				if($saved_customer_design->getZoomFactor()){
					$zoom_factor = $saved_customer_design->getZoomFactor();
				}
				
				$svg_design_childs_collection = Mage::getModel('template/customersvgdesign')->getCollection()
																	->addFieldToFilter('parent_design_id', array('eq' => $saved_customer_design->getPrimaryContentId()))
																	->addFieldToSelect('svg_data')
																	->addFieldToSelect('position')
																	->setOrder('position', 'asc');
	
				if($svg_design_childs_collection && $svg_design_childs_collection->count()>0){
					foreach($svg_design_childs_collection as $svg_design_childs_collection_item){
						
						$svg_design_child = Mage::getModel('template/customersvgdesign');
			
						$svg_design_child->setData('svg_data', Mage::helper('dol')->validateSVG($svg_design_childs_collection_item->getSvgData()));
						$svg_design_child->setData('parent_design_id', $svg_design->getId());
						$svg_design_child->setData('position', $svg_design_childs_collection_item->getPosition());
						$svg_design_child->save();
						
					}
				}
				
				$customer_id = '';
				$customer = Mage::getSingleton('customer/session')->getCustomer();
				
				if($customer && $customer->getId()){
					$customer_id = $customer->getId();
				}
				
				$customer_design = Mage::getModel('template/customerdesign');
				
				$customer_design->setData('parent_template_id', $saved_customer_design->getParentTemplateId());
				$customer_design->setData('product_id', $saved_customer_design->getProductId());
				$customer_design->setData('primary_content_id', $svg_design->getId());
				$customer_design->setData('super_attributes', $saved_customer_design->getSuperAttributes());
				$customer_design->setData('qty', $saved_customer_design->getQty());
				$customer_design->setData('customer_id', $customer_id);
				$customer_design->setData('image_path', $saved_customer_design->getImagePath());
				$customer_design->setData('thumbnail_path', $saved_customer_design->getThumbnailPath());
				$customer_design->setData('created_at', Varien_Date::formatDate($addedAt));
				$customer_design->setData('zoom_factor', $zoom_factor);
				if($is_personalized){
					$customer_design->setData('is_personalized', $is_personalized);
				}
				$customer_design->save();
				
				$customer_design_id = $customer_design->getId();
				
			}else if($svg_data){
				
				$svg_processing_v2 = Mage::getStoreConfig('dol/system_setting/svg_processing_v2');
				if($svg_processing_v2){
				
					$layout_fg_pg1 = $this->getRequest()->getParam('layout_fg_pg1');
					$layout_bg_pg1 = $this->getRequest()->getParam('layout_bg_pg1');
					
					
					if(!$layout_fg_pg1 && !$layout_bg_pg1){
						$size_attribute_id = Mage::getStoreConfig('dol/catalog_setting/size_attribute_id');
						$size_option_id = '';
						if($super_attributes && array_key_exists($size_attribute_id, $super_attributes)){
							$size_option_id = $super_attributes[$size_attribute_id];
						}
						
						$matching_layout = Mage::helper('dol')->getMatchingProductLayout($product_id, $size_option_id, $super_attributes, $custom_options);
						
						$layout_fg_pg1 = $matching_layout['fg_image'];
						$layout_bg_pg1 = $matching_layout['bg_image'];
					}
					
					$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $svg_data, true, true, false, $layout_fg_pg1, $layout_bg_pg1, $bleed_margin);
					
					list($width, $height) = getimagesize($image_data['path']);
					if($width > 1000 || $height > 1000){
						Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
					}
				
				}else{
					
					$layout_fg_pg1 = $this->getRequest()->getParam('layout_fg_pg1');
					$layout_bg_pg1 = $this->getRequest()->getParam('layout_bg_pg1');
					
					
					if(!$layout_fg_pg1 && !$layout_bg_pg1){
						$size_attribute_id = Mage::getStoreConfig('dol/catalog_setting/size_attribute_id');
						$size_option_id = '';
						if($super_attributes && array_key_exists($size_attribute_id, $super_attributes)){
							$size_option_id = $super_attributes[$size_attribute_id];
						}
						
						$matching_layout = Mage::helper('dol')->getMatchingProductLayout($product_id, $size_option_id, $super_attributes, $custom_options);
						
						$layout_fg_pg1 = $matching_layout['fg_image'];
						$layout_bg_pg1 = $matching_layout['bg_image'];
					}
					
					$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $svg_data, true, true, false, $layout_fg_pg1, $layout_bg_pg1, $bleed_margin);
					
					list($width, $height) = getimagesize($image_data['path']);
					if($width > 1000 || $height > 1000){
						Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
					}
				}
					
				$thumbnail_data = Mage::helper('dol')->getThumbnailImage('', $image_data['path'], true, true);
				
				$image_path = $image_data['url'];
				$thumbnail_path = $thumbnail_data['url'];
				
				$svg_design = Mage::getModel('template/customersvgdesign');
				
				$svg_design->setData('svg_data', Mage::helper('dol')->validateSVG($svg_data));
				$svg_design->save();
				
				
				if(!$svg_childs){
					for($i=2; $i<=$number_of_pages; $i++) {
					
						$textsvg = $this->getRequest()->getParam('textsvg_'.$i);
						if(!$textsvg){
							continue;
						}
						
						if($create_image_for_each_side){
						
							$layout_fg_pg = $this->getRequest()->getParam('layout_fg_pg'.$i);
							$layout_bg_pg = $this->getRequest()->getParam('layout_bg_pg'.$i);
							
							$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $textsvg, true, true, false, $layout_fg_pg, $layout_bg_pg, $bleed_margin);
								
							list($width, $height) = getimagesize($image_data['path']);
							if($width > 1000 || $height > 1000){
								Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
							}
							
							$thumbnail_data = Mage::helper('dol')->getThumbnailImage('', $image_data['path'], true, true);
						}
						
						$svg_design_child = Mage::getModel('template/customersvgdesign');
					
						$svg_design_child->setData('svg_data', Mage::helper('dol')->validateSVG($textsvg));
						$svg_design_child->setData('parent_design_id', $svg_design->getId());
						$svg_design_child->setData('position', $i);
						if($create_image_for_each_side){
							$svg_design_child->setData('image_path', $image_data['url']);
							$svg_design_child->setData('thumbnail_path', $thumbnail_data['url']);
						}
						$svg_design_child->save();
					}
				}else{
					
					$position = 2;
					foreach($svg_childs as $svg_child_svg_data) {
					
						if($create_image_for_each_side){
						
							$layout_fg_pg = $this->getRequest()->getParam('layout_fg_pg'.$position);
							$layout_bg_pg = $this->getRequest()->getParam('layout_bg_pg'.$position);
							
							$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $svg_child_svg_data, true, true, false, $layout_fg_pg, $layout_bg_pg, $bleed_margin);
								
							list($width, $height) = getimagesize($image_data['path']);
							if($width > 1000 || $height > 1000){
								Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
							}
							
							$thumbnail_data = Mage::helper('dol')->getThumbnailImage('', $image_data['path'], true, true);
						}
						
						$textsvg = $svg_child_svg_data;
						$svg_design_child = Mage::getModel('template/customersvgdesign');
					
						$svg_design_child->setData('svg_data', Mage::helper('dol')->validateSVG($textsvg));
						$svg_design_child->setData('parent_design_id', $svg_design->getId());
						$svg_design_child->setData('position', $position);
						if($create_image_for_each_side){
							$svg_design_child->setData('image_path', $image_data['url']);
							$svg_design_child->setData('thumbnail_path', $thumbnail_data['url']);
						}
						$svg_design_child->save();
						
						$position++;
					}
				}
				
				
				$customer_id = '';
				$customer = Mage::getSingleton('customer/session')->getCustomer();
				
				if($customer && $customer->getId()){
					$customer_id = $customer->getId();
				}
				
				$customer_design = Mage::getModel('template/customerdesign');
				
				$customer_design->setData('parent_template_id', $template_id);
				$customer_design->setData('product_id', $product_id);
				$customer_design->setData('primary_content_id', $svg_design->getId());
				if($super_attributes){
					$customer_design->setData('super_attributes', json_encode($super_attributes));
				}
				if($custom_options){
					$customer_design->setData('custom_options', json_encode($custom_options));
				}
				$customer_design->setData('qty', $qty);
				$customer_design->setData('customer_id', $customer_id);
				$customer_design->setData('image_path', $image_path);
				$customer_design->setData('thumbnail_path', $thumbnail_path);
				$customer_design->setData('zoom_factor', $zoom_factor);
				$customer_design->setData('created_at', Varien_Date::formatDate($addedAt));
				if($is_personalized){
					$customer_design->setData('is_personalized', $is_personalized);
				}
				$customer_design->save();
				
				$customer_design_id = $customer_design->getId();
			}
			$params['design_id'] = $customer_design_id;
			$params['zoom_factor'] = $zoom_factor;
		}
		
		if($stand_alone_mode || $download_pdf_mode){
			$result = array();

			$customer_design = Mage::getModel('template/customerdesign')->load($params['design_id']);
			
			$result['design_id'] = $params['design_id'];
			$result['zoom_factor'] = $customer_design->getZoomFactor();
			$result['design_image_url'] = $customer_design->getImagePath();
			$result['edit_design_url'] = '/dol?design_id='. $params['design_id'].'&key='.$customer_design->getParentTemplateId().'&item=123';
			
			echo json_encode($result);
			return;
		}

		// Add to cart
		$cart   = $this->_getCart();
        try {
            if (isset($params['qty'])) {
                $filter = new Zend_Filter_LocalizedToNormalized(
                    array('locale' => Mage::app()->getLocale()->getLocaleCode())
                );
                $params['qty'] = $filter->filter($params['qty']);
            }

            $product = $this->_initProduct();
            $related = $this->getRequest()->getParam('related_product');
            
            if($is_scp_enabled){
            	
            	$type = $product->getTypeId();
            	if($type=='configurable'){
		            $childProduct = Mage::getModel('catalog/product_type_configurable')->getProductByAttributes($this->getRequest()->getParam('super_attribute'), $product);
		            $childProduct->load($childProduct->getId());
		            
		            //set corresponding custom options of simple product
		            if($custom_options){
		            	$custom_options_data = array();
		            	foreach ($product->getOptions() as $opt) {
				
							$option_id = $opt->getId();
							
							if(array_key_exists($option_id, $custom_options)){
					        	$values = $opt->getValues();  
						        foreach ($values as $v) {
						        	if($v->getId()==$custom_options[$option_id]){
					    	      		$custom_options_data[$opt->getTitle()] = $v->getTitle();
					    	      		break;
						        	}
					        	}
							}
						}
						
						if($custom_options_data && $childProduct){
							
							foreach ($childProduct->getOptions() as $opt) {
								$option_title = $opt->getTitle();

								if(array_key_exists($option_title, $custom_options_data)){
						        	$values = $opt->getValues();  
							        foreach ($values as $v) {
							        	if($v->getTitle()==$custom_options_data[$option_title]){
						    	      		$params['options'][$opt->getId()] = $v->getId();
						    	      		break;
							        	}
						        	}
								}
							}
						}
		            }
		            
            		if($childProduct){
			            $product = $childProduct;
					
						$params['cpid'] = $product_id;
						$params['product'] = $childProduct->getId();
		            }
            	}
            	
            	if($type=='simple'){
            		$params['product'] = $this->getRequest()->getParam('product');
            	}
            }

            /**
             * Check product availability
             */
            if (!$product) {
                $this->_goBack();
                return;
            }
            
            $params['svg_data'] = '';
            $params['textsvg_1'] = '';
            
            for($i=2; $i<=$number_of_pages; $i++) {
				$params['textsvg_'.$i] = '';
            }
            
            $cart->addProduct($product, $params);
            if (!empty($related)) {
                $cart->addProductsByIds(explode(',', $related));
            }

            $cart->save();

            $this->_getSession()->setCartWasUpdated(true);

            /**
             * @todo remove wishlist observer processAddToCart
             */
            Mage::dispatchEvent('checkout_cart_add_product_complete',
                array('product' => $product, 'request' => $this->getRequest(), 'response' => $this->getResponse())
            );

            if (!$this->_getSession()->getNoCartRedirect(true)) {
                if (!$cart->getQuote()->getHasError()){
                    $message = $this->__('%s was added to your shopping cart.', Mage::helper('core')->escapeHtml($product->getName()));
                    $this->_getSession()->addSuccess($message);
                }
                $this->_goBack();
            }
        } catch (Mage_Core_Exception $e) {
            if ($this->_getSession()->getUseNotice(true)) {
                $this->_getSession()->addNotice(Mage::helper('core')->escapeHtml($e->getMessage()));
            } else {
                $messages = array_unique(explode("\n", $e->getMessage()));
                foreach ($messages as $message) {
                    $this->_getSession()->addError(Mage::helper('core')->escapeHtml($message));
                }
            }

            $url = $this->_getSession()->getRedirectUrl(true);
            if ($url) {
                $this->getResponse()->setRedirect($url);
            } else {
                $this->_redirectReferer(Mage::helper('checkout/cart')->getCartUrl());
            }
        } catch (Exception $e) {
            $this->_getSession()->addException($e, $this->__('Cannot add the item to shopping cart.'));
            Mage::logException($e);
            $this->_goBack();
        }
	}
	
	
	public function saveDesignAction()
	{
		Mage::log('Inside saveDesignAction');
		
		$cart   = $this->_getCart();
		$params = $this->getRequest()->getParams();
		
		$design_id = $this->getRequest()->getParam('design_id');
		$product_id = $this->getRequest()->getParam('product');
		$super_attributes = $this->getRequest()->getParam('super_attribute');
		$custom_options = $this->getRequest()->getParam('options');
		$qty = $this->getRequest()->getParam('qty');
		$template_id = $this->getRequest()->getParam('template_id');
		$svg_data = $this->getRequest()->getParam('svg_data');
		$addedAt = Varien_Date::toTimestamp(true);
		$update_saved = $this->getRequest()->getParam('update_saved');
		$number_of_pages = $this->getRequest()->getParam('number_of_pages');
		$textsvg_1 = $this->getRequest()->getParam('textsvg_1');
		$zoom_factor = $this->getRequest()->getParam('zoom_factor');
		$bleed_margin = $this->getRequest()->getParam('bleed_margin');
		
		$create_image_for_each_side = Mage::getStoreConfig('dol/system_setting/create_image_for_each_side');
		
		if($textsvg_1){
			$svg_data = $textsvg_1;
		}
		
		if(!$number_of_pages){
			$number_of_pages = 1;
		}
		
		if(!$svg_data){
			$response['error'] = $this->__('No Design Data set!');
			$result = json_encode($response);
				
			if($this->getRequest()->getParam("callback")) {
				if(Mage::helper('dol')->validateRequestOrigin()){
					echo 'jsonCallback('.$result.')';
				}else{
					echo '';
				}
			}else{
				echo $result;
			}
        	return;
		}
		
		if(!$zoom_factor){
			$zoom_factor = 1;
		}
		
		$is_scp_enabled = Mage::getStoreConfig('dol/catalog_setting/scp_enabled');
		if($is_scp_enabled){
            $parentId = $this->getRequest()->getParam('cpid');
            if($parentId){
            	$product_id = $parentId;
        	}
		}
		
		if(!$update_saved){
			$customer_id = '';
			$customer = Mage::getSingleton('customer/session')->getCustomer();
			
			if($customer && $customer->getId()){
				$customer_id = $customer->getId();
			}
			
			$last_svg_data = '';
			if($customer_id){
				$design_collection = Mage::getModel('template/customerdesign')->getCollection()
																	->addFieldToFilter('customer_id', array('eq' => $customer_id))
																	->addFieldToFilter('status', array('eq' => '1'))
																	->addFieldToSelect('primary_content_id')
																	->setOrder('px_design_id');
				
				if($design_collection->count()>0){													
					$last_design = $design_collection->getFirstItem();
					$primary_content_id = $last_design->getPrimaryContentId();
					$svg_design = Mage::getModel('template/customersvgdesign')->load($primary_content_id);
					$last_svg_data = $svg_design->getSvgData();
				}
			}
			
			$svg_data = Mage::helper('dol')->validateSVG($svg_data);
			if($svg_data==$last_svg_data && $number_of_pages==1){
				$response['success'] = $this->__('Design Saved Successfully!');
				$result = json_encode($response);
				
				if($this->getRequest()->getParam("callback")) {
					if(Mage::helper('dol')->validateRequestOrigin()){
						echo 'jsonCallback('.$result.')';
					}else{
						echo '';
					}
				}else{
					echo $result;
				}
	        	return;
			}
			
			$svg_processing_v2 = Mage::getStoreConfig('dol/system_setting/svg_processing_v2');
			if($svg_processing_v2){
			
				$layout_fg_pg1 = $this->getRequest()->getParam('layout_fg_pg1');
				$layout_bg_pg1 = $this->getRequest()->getParam('layout_bg_pg1');
				
				$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $svg_data, true, true, false, $layout_fg_pg1, $layout_bg_pg1, $bleed_margin);
				
				list($width, $height) = getimagesize($image_data['path']);
				if($width > 1000 || $height > 1000){
					Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
				}
			
			}else{
			
				$layout_fg_pg1 = $this->getRequest()->getParam('layout_fg_pg1');
				$layout_bg_pg1 = $this->getRequest()->getParam('layout_bg_pg1');
				
				$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $svg_data, true, true, false, $layout_fg_pg1, $layout_bg_pg1, $bleed_margin);
				
				list($width, $height) = getimagesize($image_data['path']);
				if($width > 1000 || $height > 1000){
					Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
				}
			}
			
			$thumbnail_data = Mage::helper('dol')->getThumbnailImage('', $image_data['path'], true, true);
			
			$image_path = $image_data['url'];
			$thumbnail_path = $thumbnail_data['url'];
			
			$svg_design = Mage::getModel('template/customersvgdesign');
			
			$svg_design->setData('svg_data', $svg_data);
			$svg_design->save();
			
			for($i=2; $i<=$number_of_pages; $i++) {
				
				$textsvg = $this->getRequest()->getParam('textsvg_'.$i);
				if(!$textsvg){
					continue;
				}
				
				if($create_image_for_each_side){
				
					$layout_fg_pg = $this->getRequest()->getParam('layout_fg_pg'.$i);
					$layout_bg_pg = $this->getRequest()->getParam('layout_bg_pg'.$i);
					
					$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $textsvg, true, true, false, $layout_fg_pg, $layout_bg_pg, $bleed_margin);
						
					list($width, $height) = getimagesize($image_data['path']);
					if($width > 1000 || $height > 1000){
						Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
					}
					
					$thumbnail_data = Mage::helper('dol')->getThumbnailImage('', $image_data['path'], true, true);
				}
				
				$svg_design_child = Mage::getModel('template/customersvgdesign');
			
				$svg_design_child->setData('svg_data', Mage::helper('dol')->validateSVG($textsvg));
				$svg_design_child->setData('parent_design_id', $svg_design->getId());
				$svg_design_child->setData('position', $i);
				if($create_image_for_each_side){
					$svg_design_child->setData('image_path', $image_data['url']);
					$svg_design_child->setData('thumbnail_path', $thumbnail_data['url']);
				}
				$svg_design_child->save();
			}
			
			$customer_design = Mage::getModel('template/customerdesign');
			$customer_design->setData('parent_template_id', $template_id);
			$customer_design->setData('product_id', $product_id);
			$customer_design->setData('primary_content_id', $svg_design->getId());
			if($super_attributes){
				$customer_design->setData('super_attributes', json_encode($super_attributes));
			}
			if($custom_options){
				$customer_design->setData('custom_options', json_encode($custom_options));
			}
			$customer_design->setData('qty', $qty);
			$customer_design->setData('customer_id', $customer_id);
			$customer_design->setData('image_path', $image_path);
			$customer_design->setData('thumbnail_path', $thumbnail_path);
			$customer_design->setData('is_saved', '1');
			$customer_design->setData('created_at', Varien_Date::formatDate($addedAt));
			$customer_design->setData('zoom_factor', $zoom_factor);
			$customer_design->save();
			
			$customer_design_id = $customer_design->getId();
			
		}else{
			
			$svg_data = Mage::helper('dol')->validateSVG($svg_data);
		
			$svg_processing_v2 = Mage::getStoreConfig('dol/system_setting/svg_processing_v2');
			if($svg_processing_v2){
			
				$layout_fg_pg1 = $this->getRequest()->getParam('layout_fg_pg1');
				$layout_bg_pg1 = $this->getRequest()->getParam('layout_bg_pg1');
				
				$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $svg_data, true, true, false, $layout_fg_pg1, $layout_bg_pg1, $bleed_margin);
				
				list($width, $height) = getimagesize($image_data['path']);
				if($width > 1000 || $height > 1000){
					Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
				}
			
			}else{
			
				$layout_fg_pg1 = $this->getRequest()->getParam('layout_fg_pg1');
				$layout_bg_pg1 = $this->getRequest()->getParam('layout_bg_pg1');
				
				$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $svg_data, true, true, false, $layout_fg_pg1, $layout_bg_pg1, $bleed_margin);
				
				list($width, $height) = getimagesize($image_data['path']);
				if($width > 1000 || $height > 1000){
					Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
				}
			}
			
			$thumbnail_data = Mage::helper('dol')->getThumbnailImage('', $image_data['path'], true, true);
			
			$image_path = $image_data['url'];
			$thumbnail_path = $thumbnail_data['url'];
			
			$customer_design = Mage::getModel('template/customerdesign')->load($design_id);
			$customer_design->setData('image_path', $image_path);
			$customer_design->setData('thumbnail_path', $thumbnail_path);
			$customer_design->setData('zoom_factor', $zoom_factor);
			$customer_design->save();
	
			$svg_design = Mage::getModel('template/customersvgdesign')->load($customer_design->getPrimaryContent_id());
			$svg_design->setData('svg_data', $svg_data);
			$svg_design->save();
			
			$con = Mage::getSingleton('core/resource')->getConnection('core_write');
			$table_name = Mage::getSingleton("core/resource")->getTableName('px_customer_svg_design');
			try {
				$sql="delete from ".$table_name." where parent_design_id =".$customer_design->getPrimaryContent_id();
				$con->query($sql);
			} catch (Exception $e){
				Mage::getSingleton('adminhtml/session')->addError($e->getMessage());
				$this->_redirect('*//*/edit', array('id' => $this->getRequest()->getParam('id')));
			}
			
			for($i=2; $i<=$number_of_pages; $i++) {
					
				$textsvg = $this->getRequest()->getParam('textsvg_'.$i);
				if(!$textsvg){
					continue;
				}
				
				if($create_image_for_each_side){
					
					$layout_fg_pg = $this->getRequest()->getParam('layout_fg_pg'.$i);
					$layout_bg_pg = $this->getRequest()->getParam('layout_bg_pg'.$i);
					
					$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $textsvg, true, true, false, $layout_fg_pg, $layout_bg_pg, $bleed_margin);
						
					list($width, $height) = getimagesize($image_data['path']);
					if($width > 1000 || $height > 1000){
						Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
					}
					
					$thumbnail_data = Mage::helper('dol')->getThumbnailImage('', $image_data['path'], true, true);
				}
				
				$svg_design_child = Mage::getModel('template/customersvgdesign');
				
				$svg_design_child->setData('svg_data', Mage::helper('dol')->validateSVG($textsvg));
				$svg_design_child->setData('parent_design_id', $svg_design->getId());
				$svg_design_child->setData('position', $i);
				if($create_image_for_each_side){
					$svg_design_child->setData('image_path', $image_data['url']);
					$svg_design_child->setData('thumbnail_path', $thumbnail_data['url']);
				}
				$svg_design_child->save();
			}
		}
		
		$response['success'] = $this->__('Design Saved Successfully!');
		$result = json_encode($response);
			
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.$result.')';
			}else{
				echo '';
			}
		}else{
			echo $result;
		}
        
        return;
	}
	
	
	public function updateDesignAction()
	{
		Mage::log('Inside updateDesignAction');
		
		$cart   = $this->_getCart();
		$params = $this->getRequest()->getParams();
		
		$design_id = $this->getRequest()->getParam('design_id');
		$svg_data = $this->getRequest()->getParam('svg_data');
		$number_of_pages = $this->getRequest()->getParam('number_of_pages');
		$textsvg_1 = $this->getRequest()->getParam('textsvg_1');
		$zoom_factor = $this->getRequest()->getParam('zoom_factor');
		$bleed_margin = $this->getRequest()->getParam('bleed_margin');
		
		$create_image_for_each_side = Mage::getStoreConfig('dol/system_setting/create_image_for_each_side');
		
		if($textsvg_1){
			$svg_data = $textsvg_1;
		}
		
		if(!$number_of_pages){
			$number_of_pages = 1;
		}
		
		if(!$zoom_factor){
			$zoom_factor = 1;
		}
		
		if(!$svg_data){
			$this->_getSession()->addError('Design was not updated due to unexpected error. Please try again.');
			$this->getResponse()->setRedirect(Mage::helper('checkout/cart')->getCartUrl());
			return;
		}
		
		$svg_data = Mage::helper('dol')->validateSVG($svg_data);
		
		$svg_processing_v2 = Mage::getStoreConfig('dol/system_setting/svg_processing_v2');
		if($svg_processing_v2){
		
			$layout_fg_pg1 = $this->getRequest()->getParam('layout_fg_pg1');
			$layout_bg_pg1 = $this->getRequest()->getParam('layout_bg_pg1');
			
			$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $svg_data, true, true, false, $layout_fg_pg1, $layout_bg_pg1, $bleed_margin);
			
			list($width, $height) = getimagesize($image_data['path']);
			if($width > 1000 || $height > 1000){
				Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
			}
		
		}else{
		
			$layout_fg_pg1 = $this->getRequest()->getParam('layout_fg_pg1');
			$layout_bg_pg1 = $this->getRequest()->getParam('layout_bg_pg1');
			
			$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $svg_data, true, true, false, $layout_fg_pg1, $layout_bg_pg1, $bleed_margin);
			
			list($width, $height) = getimagesize($image_data['path']);
			if($width > 1000 || $height > 1000){
				Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
			}
		}
		
		$thumbnail_data = Mage::helper('dol')->getThumbnailImage('', $image_data['path'], true, true);
		
		$image_path = $image_data['url'];
		$thumbnail_path = $thumbnail_data['url'];
		
		$customer_design = Mage::getModel('template/customerdesign')->load($design_id);
		$customer_design->setData('image_path', $image_path);
		$customer_design->setData('thumbnail_path', $thumbnail_path);
		$customer_design->setData('zoom_factor', $zoom_factor);
		$customer_design->save();

		$svg_design = Mage::getModel('template/customersvgdesign')->load($customer_design->getPrimaryContent_id());
		$svg_design->setData('svg_data', $svg_data);
		$svg_design->save();
		
		$con = Mage::getSingleton('core/resource')->getConnection('core_write');
		$table_name = Mage::getSingleton("core/resource")->getTableName('px_customer_svg_design');
		try {
			$sql="delete from ".$table_name." where parent_design_id =".$customer_design->getPrimaryContent_id();
			$con->query($sql);
		} catch (Exception $e){
			Mage::getSingleton('adminhtml/session')->addError($e->getMessage());
			$this->_redirect('*//*/edit', array('id' => $this->getRequest()->getParam('id')));
		}
		
		for($i=2; $i<=$number_of_pages; $i++) {
				
			$textsvg = $this->getRequest()->getParam('textsvg_'.$i);
			if(!$textsvg){
				continue;
			}
			
			if($create_image_for_each_side){
				$layout_fg_pg = $this->getRequest()->getParam('layout_fg_pg'.$i);
				$layout_bg_pg = $this->getRequest()->getParam('layout_bg_pg'.$i);
				
				$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $textsvg, true, true, false, $layout_fg_pg, $layout_bg_pg, $bleed_margin);
					
				list($width, $height) = getimagesize($image_data['path']);
				if($width > 1000 || $height > 1000){
					Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
				}
				
				$thumbnail_data = Mage::helper('dol')->getThumbnailImage('', $image_data['path'], true, true);
			}
			
			$svg_design_child = Mage::getModel('template/customersvgdesign');
			
			$svg_design_child->setData('svg_data', Mage::helper('dol')->validateSVG($textsvg));
			$svg_design_child->setData('parent_design_id', $svg_design->getId());
			$svg_design_child->setData('position', $i);
			if($create_image_for_each_side){
				$svg_design_child->setData('image_path', $image_data['url']);
				$svg_design_child->setData('thumbnail_path', $thumbnail_data['url']);
			}
			$svg_design_child->save();
		}
		
		$this->getResponse()->setRedirect(Mage::helper('checkout/cart')->getCartUrl());
	}
	
	
	public function updateItemAction()
	{
		Mage::log('Inside updateItemAction');
	
		$cart   = $this->_getCart();
		$id = (int) $this->getRequest()->getParam('id');
		$cpid = (int) $this->getRequest()->getParam('cpid');
		$params = $this->getRequest()->getParams();
		
		$item_id = $params['id'];
		$super_attribute_id = $this->getRequest()->getParam('super_attribute_id');
		$super_attribute_value = $this->getRequest()->getParam('super_attribute_value');
		$option_id = $this->getRequest()->getParam('option_id');
		$option_value = $this->getRequest()->getParam('option_value');
		$super_attributes = array();
		$custom_options = array();
		$configurable_update = false;
		$options_update = false;
		
	    $item =	Mage::getSingleton('checkout/session')->getQuote()->getItemById($item_id);
	    $buyRequest = unserialize($item->getOptionByCode('info_buyRequest')->getValue());
	    $product_id = $item->getProduct()->getId();
	    
	    if(array_key_exists('super_attribute', $buyRequest)){
	    	$super_attributes = $buyRequest['super_attribute'];
	    }
	    
	    if(array_key_exists('options', $buyRequest)){
	    	$custom_options = $buyRequest['options'];
	    }
	    
	    if($super_attribute_id && $super_attribute_value){
	    	$super_attributes[$super_attribute_id] = $super_attribute_value;
	    	$configurable_update = true;
	    }
	    
	    if($option_id && $option_value){
	    	$custom_options[$option_id] = $option_value;
	    	$options_update = true;
	    }
	    
	    $buyRequest['super_attribute'] = $super_attributes;
	    $buyRequest['options'] = $custom_options;
	    
	    if (!isset($buyRequest['options'])) {
	    	$buyRequest['options'] = array();
	    }
	    
	    try {
	    	if (isset($buyRequest['qty'])) {
	    		$filter = new Zend_Filter_LocalizedToNormalized(
	    				array('locale' => Mage::app()->getLocale()->getLocaleCode())
	    		);
	    		$buyRequest['qty'] = $filter->filter($buyRequest['qty']);
	    	}
	    
	    	$quoteItem = $cart->getQuote()->getItemById($id);
	    	if (!$quoteItem) {
	    		Mage::throwException($this->__('Quote item is not found.'));
	    	}
	    	
	    	if($options_update){
		    	$item = $cart->updateItem($id, new Varien_Object($buyRequest));
		    	if (is_string($item)) {
		    		Mage::throwException($item);
		    	}
		    	if ($item->getHasError()) {
		    		Mage::throwException($item->getMessage());
		    	}
		    
		    	$related = $this->getRequest()->getParam('related_product');
		    	if (!empty($related)) {
		    		$cart->addProductsByIds(explode(',', $related));
		    	}
	    	}
	    	
	    	if($configurable_update && $cpid){
	    		
	    		$configurable_product = Mage::getModel('catalog/product')->load($cpid);
	    		
	    		$childProduct = Mage::getModel('catalog/product_type_configurable')->getProductByAttributes($super_attributes, $configurable_product);
	    		
	    		if(!$childProduct){
	    			$this->_redirect('*/*');
	    			return;
	    		}
	    		
	    		$childProduct = Mage::getModel('catalog/product')
	    			->setStoreId(Mage::app()->getStore()->getId())
	    			->load($childProduct->getId());
	    		
	    		$buyRequest['product'] = $childProduct->getId();
	    		
	    		
	    		$helper = Mage::helper('catalog/product_configuration');
	    		$current_options = $helper->getCustomOptions($item);
	    		
	    		//Sync Product Custom Options
	    		$new_custom_options = array();
	    		
	    		foreach ($childProduct->getOptions() as $opt) {
	    				
	    			$optionType = $opt->getType();
	    			$option_id = $opt->getId();
	    				
	    			foreach($current_options as $current_option){
	    				
	    				if($current_option['label']!=$opt->getTitle()){
	    					continue;
	    				}
	    			
	    				$values = $opt->getValues();
	    				$option_type = $opt->getType();
	    		
	    				if($option_type=='drop_down' || $option_type=='radio'){
	    					foreach ($values as $v) {
	    						if(strpos($current_option['value'], htmlentities($v->getTitle()))!==false){
	    							$new_custom_options[$opt->getId()] = $v->getId();
	    							break;
	    						}
	    					}
	    				}
	    				
	    				if($option_type=='field' || $option_type=='area'){
	    					$new_custom_options[$opt->getId()] = $buyRequest['options'][$current_option['option_id']];
	    				}
	    				
	    				if($option_type=='file'){
	    					$new_custom_options[$opt->getId()]['type'] = $buyRequest['options'][$current_option['option_id']]['type'];
	    					$new_custom_options[$opt->getId()]['title'] = $buyRequest['options'][$current_option['option_id']]['title'];
	    					$new_custom_options[$opt->getId()]['quote_path'] = $buyRequest['options'][$current_option['option_id']]['quote_path'];
	    					$new_custom_options[$opt->getId()]['order_path'] = $buyRequest['options'][$current_option['option_id']]['order_path'];
	    					$new_custom_options[$opt->getId()]['fullpath'] = $buyRequest['options'][$current_option['option_id']]['fullpath'];
	    					$new_custom_options[$opt->getId()]['size'] = $buyRequest['options'][$current_option['option_id']]['size'];
	    					$new_custom_options[$opt->getId()]['width'] = $buyRequest['options'][$current_option['option_id']]['width'];
	    					$new_custom_options[$opt->getId()]['height'] = $buyRequest['options'][$current_option['option_id']]['height'];
	    					$new_custom_options[$opt->getId()]['secret_key'] = $buyRequest['options'][$current_option['option_id']]['secret_key'];
	    				}
	    				
	    				if($option_type=='multiple' || $option_type=='checkbox'){
	    					
	    					$current_field_values = explode(', ', $current_option['value']);
	    					
	    					foreach ($values as $v) {
	    						foreach($current_field_values as $current_field_value){
		    						if(strpos($current_field_value, htmlentities($v->getTitle()))!==false){
		    							$new_custom_options[$opt->getId()][] = $v->getId();
		    						}
	    						}
	    					}
	    				}
	    			}
	    		}
	    		
	    		$buyRequest['options'] = $new_custom_options;
	    		
	    		$resultItem = $cart->addProduct($childProduct, $buyRequest);
	    		
	    		if ($resultItem->getId() != $item_id) {
	    			$cart->removeItem($item_id);
	    		}	    		
	    	}
	    	
	    	$cart->save();
	    	$this->_getSession()->setCartWasUpdated(true);
	    	
	    	//update customer design
	    	if(array_key_exists('design_id', $buyRequest)){
	    		$customer_design = Mage::getModel('template/customerdesign')->load($buyRequest['design_id']);
	    		if($super_attributes){
	    			$customer_design->setData('super_attributes', json_encode($super_attributes));
	    		}
	    		if($custom_options){
	    			$customer_design->setData('custom_options', json_encode($custom_options));
	    		}
	    		$customer_design->save();
	    	}
	    
	    	Mage::dispatchEvent('checkout_cart_update_item_complete',
	    	array('item' => $item, 'request' => $this->getRequest(), 'response' => $this->getResponse())
	    	);
	    	if (!$this->_getSession()->getNoCartRedirect(true)) {
	    		if (!$cart->getQuote()->getHasError()) {
	    			$message = $this->__('%s was updated in your shopping cart.', Mage::helper('core')->escapeHtml($item->getProduct()->getName()));
	    			$this->_getSession()->addSuccess($message);
	    		}
	    		$this->_goBack();
	    	}
	    } catch (Mage_Core_Exception $e) {
	    	if ($this->_getSession()->getUseNotice(true)) {
	    		$this->_getSession()->addNotice($e->getMessage());
	    	} else {
	    		$messages = array_unique(explode("\n", $e->getMessage()));
	    		foreach ($messages as $message) {
	    			$this->_getSession()->addError($message);
	    		}
	    	}
	    
	    	$url = $this->_getSession()->getRedirectUrl(true);
	    	if ($url) {
	    		$this->getResponse()->setRedirect($url);
	    	} else {
	    		$this->_redirectReferer(Mage::helper('checkout/cart')->getCartUrl());
	    	}
	    } catch (Exception $e) {
	    	$this->_getSession()->addException($e, $this->__('Cannot update the item.'));
	    	Mage::logException($e);
	    	$this->_goBack();
	    }
	    $this->_redirect('*/*');
	}
	
	
	public function add1Action(){
		
		Mage::log('Inside addAction');
		
		$cart   = $this->_getCart();
		$params = $this->getRequest()->getParams();
		
		$product_id = $this->getRequest()->getParam('product');
		$super_attributes = $this->getRequest()->getParam('super_attribute');
		$custom_options = $this->getRequest()->getParam('options');
		$qty = $this->getRequest()->getParam('qty');
		$customer_design_id = $this->getRequest()->getParam('design_id');
		$template_id = $this->getRequest()->getParam('template_id');
		$svg_data = $this->getRequest()->getParam('svg_data');
		$addedAt = Varien_Date::toTimestamp(true);
		$from_dol = $this->getRequest()->getParam('from_dol');
		$plain_product = $this->getRequest()->getParam('plain_product');
		$number_of_pages = $this->getRequest()->getParam('number_of_pages');
		$textsvg_1 = $this->getRequest()->getParam('textsvg_1');
		$zoom_factor = $this->getRequest()->getParam('zoom_factor');
		$bleed_margin = $this->getRequest()->getParam('bleed_margin');
		$product_bleed = $this->getRequest()->getParam('product_bleed');
		
		if($textsvg_1){
			$svg_data = $textsvg_1;
		}
		
		if(!$number_of_pages){
			$number_of_pages = 1;
		}
		
		if(!$zoom_factor){
			$zoom_factor = 1;
		}
		
		$is_scp_enabled = Mage::getStoreConfig('dol/catalog_setting/scp_enabled');
		
		if(!$plain_product){
			
			if($is_scp_enabled){
            	$parentId = $this->getRequest()->getParam('cpid');
            	if($parentId){
            		$params['product'] = $parentId;
            		$product_id = $parentId;
            	}
			}
			
			$result = array();
			$svg_childs = array();
			
			if(!$svg_data && !$from_dol && !$customer_design_id && $template_id){
				$result = Mage::helper('dol')->updatePersonalizationFields($template_id, $params);
				$svg_data = $result['svg'];
				$svg_childs = $result['child_svg_data'];
				$content = $result['content'];
				if($content->getZoomFactor()){
					$zoom_factor = $content->getZoomFactor();
					if($product_bleed){
						$bleed_margin = $product_bleed / $zoom_factor;
					}
				}
			}
			
			if(!$svg_data && $from_dol && !$customer_design_id){
				$this->_getSession()->addError(Mage::helper('core')->escapeHtml('No Design Data was set!'));
	            Mage::logException($e);
	            $this->_goBack();
			}
			
			if($customer_design_id){
				
				$saved_customer_design = Mage::getModel('template/customerdesign')->load($customer_design_id);
				$saved_svg_design = Mage::getModel('template/customersvgdesign')->load($saved_customer_design->getPrimaryContentId());
				
				$svg_design = Mage::getModel('template/customersvgdesign');
				$svg_design->setData('svg_data', $saved_svg_design->getSvgData());
				$svg_design->save();
				
				if($saved_customer_design->getZoomFactor()){
					$zoom_factor = $saved_customer_design->getZoomFactor();
				}
				
				$svg_design_childs_collection = Mage::getModel('template/customersvgdesign')->getCollection()
																	->addFieldToFilter('parent_design_id', array('eq' => $saved_customer_design->getPrimaryContentId()))
																	->addFieldToSelect('svg_data')
																	->addFieldToSelect('position')
																	->setOrder('position', 'asc');
	
				if($svg_design_childs_collection && $svg_design_childs_collection->count()>0){
					foreach($svg_design_childs_collection as $svg_design_childs_collection_item){
						
						$svg_design_child = Mage::getModel('template/customersvgdesign');
			
						$svg_design_child->setData('svg_data', Mage::helper('dol')->validateSVG($svg_design_childs_collection_item->getSvgData()));
						$svg_design_child->setData('parent_design_id', $svg_design->getId());
						$svg_design_child->setData('position', $svg_design_childs_collection_item->getPosition());
						$svg_design_child->save();
						
					}
				}
				
				$customer_id = '';
				$customer = Mage::getSingleton('customer/session')->getCustomer();
				
				if($customer && $customer->getId()){
					$customer_id = $customer->getId();
				}
				
				$customer_design = Mage::getModel('template/customerdesign');
				
				$customer_design->setData('parent_template_id', $saved_customer_design->getParentTemplateId());
				$customer_design->setData('product_id', $saved_customer_design->getProductId());
				$customer_design->setData('primary_content_id', $svg_design->getId());
				$customer_design->setData('super_attributes', $saved_customer_design->getSuperAttributes());
				$customer_design->setData('qty', $saved_customer_design->getQty());
				$customer_design->setData('customer_id', $customer_id);
				$customer_design->setData('image_path', $saved_customer_design->getImagePath());
				$customer_design->setData('thumbnail_path', $saved_customer_design->getThumbnailPath());
				$customer_design->setData('created_at', Varien_Date::formatDate($addedAt));
				$customer_design->setData('zoom_factor', $zoom_factor);
				$customer_design->save();
				
				$customer_design_id = $customer_design->getId();
				
			}else if($svg_data){
				
				$layout_fg_pg1 = $this->getRequest()->getParam('layout_fg_pg1');
				$layout_bg_pg1 = $this->getRequest()->getParam('layout_bg_pg1');
					
				if(!$layout_fg_pg1 && !$layout_bg_pg1){
					$size_attribute_id = Mage::getStoreConfig('dol/catalog_setting/size_attribute_id');
					$size_option_id = '';
					if($super_attributes && array_key_exists($size_attribute_id, $super_attributes)){
						$size_option_id = $super_attributes[$size_attribute_id];
					}
					
					$matching_layout = Mage::helper('dol')->getMatchingProductLayout($product_id, $size_option_id, $super_attributes, $custom_options);
					
					$layout_fg_pg1 = $matching_layout['fg_image'];
					$layout_bg_pg1 = $matching_layout['bg_image'];
				}
				
				$svg_design = Mage::getModel('template/customersvgdesign');
				
				$svg_design->setData('svg_data', Mage::helper('dol')->validateSVG($svg_data));
				$svg_design->save();
				
				if(!$svg_childs){
					for($i=2; $i<=$number_of_pages; $i++) {
					
						$textsvg = $this->getRequest()->getParam('textsvg_'.$i);
						if(!$textsvg){
							continue;
						}
						$svg_design_child = Mage::getModel('template/customersvgdesign');
					
						$svg_design_child->setData('svg_data', Mage::helper('dol')->validateSVG($textsvg));
						$svg_design_child->setData('parent_design_id', $svg_design->getId());
						$svg_design_child->setData('position', $i);
						$svg_design_child->save();
					}
				}else{
					
					$position = 2;
					foreach($svg_childs as $svg_child_svg_data) {
					
						$textsvg = $svg_child_svg_data;
						$svg_design_child = Mage::getModel('template/customersvgdesign');
					
						$svg_design_child->setData('svg_data', Mage::helper('dol')->validateSVG($textsvg));
						$svg_design_child->setData('parent_design_id', $svg_design->getId());
						$svg_design_child->setData('position', $position);
						$svg_design_child->save();
						
						$position++;
					}
				}
				
				
				$customer_id = '';
				$customer = Mage::getSingleton('customer/session')->getCustomer();
				
				if($customer && $customer->getId()){
					$customer_id = $customer->getId();
				}
				
				$customer_design = Mage::getModel('template/customerdesign');
				
				$customer_design->setData('parent_template_id', $template_id);
				$customer_design->setData('product_id', $product_id);
				$customer_design->setData('primary_content_id', $svg_design->getId());
				if($super_attributes){
					$customer_design->setData('super_attributes', json_encode($super_attributes));
				}
				if($custom_options){
					$customer_design->setData('custom_options', json_encode($custom_options));
				}
				$customer_design->setData('qty', $qty);
				$customer_design->setData('customer_id', $customer_id);
				$customer_design->setData('zoom_factor', $zoom_factor);
				$customer_design->setData('created_at', Varien_Date::formatDate($addedAt));
				$customer_design->save();
				
				$customer_design_id = $customer_design->getId();
			}
			$params['design_id'] = $customer_design_id;
			$params['zoom_factor'] = $zoom_factor;
		}
		
		
		Mage::log('Inside processDesignPDFAction');
		
		$design_id = $params['design_id'];
		$zoom_factor = $params['zoom_factor'];
		$output_type = 'pdf';
		$filename = 'My_Zumibox_'.$design_id.'.pdf';
		
		$svg_xml_list = array();
		$svg_xml_final_list = array();
		
		
		$customer_design = Mage::getModel('template/customerdesign')->load($design_id);
		$svg_design = Mage::getModel('template/customersvgdesign')->load($customer_design->getPrimaryContentId());
		
		$svg_xml = $svg_design->getSvgData();
		
		$svg_xml_list[] = $svg_xml;
		
		$svg_design_childs_collection = Mage::getModel('template/customersvgdesign')->getCollection()
																->addFieldToFilter('parent_design_id', array('eq' => $customer_design->getPrimaryContentId()))
																->addFieldToSelect('svg_data')
																->setOrder('position', 'asc');

		if($svg_design_childs_collection && $svg_design_childs_collection->count()>0){
			foreach($svg_design_childs_collection as $svg_design_childs_collection_item){
				$svg_xml_list[] = $svg_design_childs_collection_item->getSvgData();
			}
		}
		
		$enable_zoom_factor = Mage::getStoreConfig('dol/dol_setting/enable_zoom_factor');

		if($enable_zoom_factor && (!$zoom_factor || $zoom_factor==1)){
	
			$product = $customer_design->getProductId();
			$design_id = $customer_design->getPxDesignId();
			$template_id = $customer_design->getParentTemplateId();
			$qty = $customer_design->getQty();
			$super_attributes = $customer_design->getSuperAttributes();
			$super_attributes = json_decode($super_attributes, true);
			
			$size_attribute_id = Mage::getStoreConfig('dol/catalog_setting/size_attribute_id');
			$config_data = Mage::helper('dol')->getConfigDisplayData($super_attributes);
			
			$size_option_id = $super_attributes[$size_attribute_id];
			$size_label = $config_data['options'][$size_option_id];
			
			$bleed_info = Mage::helper('dol')->getProductBleed($product);
			$bleed_margin = $bleed_info['bleed_margin'];
			
			$canvas_dimensions = Mage::helper('dol')->getProductCanvasDimensions($size_label, $bleed_margin);
			
			$height = $canvas_dimensions['height'];
			$width = $canvas_dimensions['width'];
			
			$svg_data = simplexml_load_string($svg_xml, 'SimpleXMLElement');
			
			$attribs = $svg_data->attributes();
			$attributes_data = (array) $attribs;
			$svg_attributes = $attributes_data['@attributes'];
			
			$design_width = $svg_attributes['width'];
			$design_height = $svg_attributes['height'];
			
			$zoom_factor = $width / $design_width;
			
			if($zoom_factor<1){
				$zoom_factor = 1;
			}
		}
		
		foreach($svg_xml_list as $svg_xml_item){
			
			if($zoom_factor && $zoom_factor!=1){
				$svg_data = simplexml_load_string($svg_xml_item, 'SimpleXMLElement');
				
				$attribs = $svg_data->attributes();
				$attributes_data = (array) $attribs;
				$svg_attributes = $attributes_data['@attributes'];
				
				$width = $svg_attributes['width'];
				$height = $svg_attributes['height'];
						
				$new_width = $width * $zoom_factor;
				$new_height = $height * $zoom_factor;
				
				$attribs->width = $new_width;
				$attribs->height = $new_height;
				$svg_data->addAttribute('viewBox', '0 0 '.$width.' '.$height);
				
				$svg_xml_item = $svg_data->asXML();
				//$svg_xml_item = html_entity_decode($svg_xml_item, ENT_NOQUOTES, 'UTF-8');
				$svg_xml_final_list[] = $svg_xml_item;
			}else{
				
				$svg_xml_final_list[] = $svg_xml_item;
			}
		}
		
		$layout_fg_list = null;
		
		if($layout_bg_pg1){
			
			$layout_fg_list[] = $layout_bg_pg1;
			
			for($i=2; $i<5; $i++) {
				
				$blueprint_bg = $this->getRequest()->getParam('blueprint_bg_'.$i);
				
				if($blueprint_bg){
					$layout_fg_list[] = $blueprint_bg;
				}
			}
		}
		
		
		/*
		$product_id = $customer_design->getProductId();
		
		$main_product = Mage::getModel('catalog/product')->load($product_id);
		$attribute_set_name = Mage::getModel('eav/entity_attribute_set')->load($main_product->getAttributeSetId())->getAttributeSetName(); 
		
		if($attribute_set_name='Business Cards'){
			$layout_fg = 'http://orientalpress.pixopa.com/media/uploads/dol/1/1387885848115048796670.png';
		}
		*/
		
		$single_side_png = strpos($output_type, 'png_');

		if(!$output_type || $output_type=='pdf'){
			$pdf_url = Mage::helper('dol')->getProcessedSVGPdfURL($svg_xml_final_list, false, false, 0, $layout_fg_list);
			
			Mage::getSingleton('customer/session')->setData('pdf_url', $pdf_url);
		}
		
		$this->getResponse()->setRedirect(Mage::helper('checkout/cart')->getCartUrl());
	}
	
	
	public function downloadPDFAction(){
		
		$pdf_url = $this->getRequest()->getParam('pdf_url');
		
		if(!$pdf_url){
			echo 'Invalid PDF file!';
			return;
		}
		
		$is_zip = strpos($pdf_url, '.zip');
		
		if($is_zip!==false){
			$filename = 'my_zumibox.zip';	
		}else{
			$filename = 'my_zumibox.pdf';
		}
		
		header("Cache-Control: must-revalidate");
		header('Pragma: public');
			
		header("Content-Disposition: attachment; filename=".$filename);
		header('Content-Type: application/octet-stream');
		header("Content-Transfer-Encoding: binary");
		header('Expires: 0');
		
		$ob_get_status = ob_get_status();
		if($ob_get_status['name']!='zlib output compression')ob_clean();
		flush();
		readfile($pdf_url);
	}
}
