<?php

//require_once Mage::getModuleDir('Helper', 'Mage_Customer') . DS . 'Helper/Data.php';

class Pixopa_Customer_Helper_Data extends Mage_Customer_Helper_Data
{
	
	public function getCustomerAccountImages($customer){
		
		Mage::log('Inside getCustomerImages');
		$images = array();
		
		if($customer){
			$customer_id = $customer->getId();
			$image_collection = Mage::getModel('customer/image')->getCollection()
																->addFieldToFilter('customer_id', array('eq' => $customer_id))
																->addFieldToFilter('status', array('eq' => '1'))
																->setOrder('image_id');
			
			foreach($image_collection as $image){
				$images[] = $image;
			}													
		}
		return $images;
	}
	
	
	public function getCustomerAccountDesigns($customer){
		
		Mage::log('Inside getCustomerAccountDesigns');
		$designs = array();
		$product_ids = array();
		$products = array();
		
		if($customer){
			$customer_id = $customer->getId();
			$design_collection = Mage::getModel('template/customerdesign')->getCollection()
																->addFieldToFilter('customer_id', array('eq' => $customer_id))
																->addFieldToFilter('status', array('eq' => '1'))
																->addFieldToFilter('is_saved', array('eq' => '1'))
																->setOrder('px_design_id');
			
			foreach($design_collection as $design){
				$designs[] = $design;
				if(!in_array($design->getProductId(), $product_ids)){
					$product_ids[] = $design->getProductId();
				}
			}						

			$product_collection = Mage::getModel('catalog/product')->getCollection()
																->addFieldToFilter('entity_id', array('in' => $product_ids))
																->addAttributeToSelect('name')
																->setOrder('px_design_id');

			foreach($product_collection as $product){
				$products[$product->getId()] = $product->getName();
			}
		}
		$result['designs'] = $designs;
		$result['products'] = $products;
		
		return $result;
	}
	

	public function getCustomerAccountTemplates($customer){
		
		Mage::log('Inside getCustomerAccountDesigns');
		$templates = array();
		
		if($customer){
			$customer_id = $customer->getId();
			$template_collection = Mage::getModel('template/template')->getCollection()
																->addFieldToFilter('customer_ids', array('like' => '%|'.$customer_id.'|%'))
																->addFieldToFilter('enabled', array('eq' => '1'))
																->setOrder('template_id');
			
			foreach($template_collection as $template){
				$templates[] = $template;
			}						
		}
		$result['templates'] = $templates;
		
		return $result;
	}
	
	
	public function assignCartDesignsToCustomer(){
		
		$design_ids = array();
		$customer = Mage::getSingleton('customer/session')->getCustomer();
		if($customer && $customer->getId()){
			$customer_id = $customer->getId();
		}
	
		if($customer_id){
			
			$session= Mage::getSingleton('checkout/session');
			foreach($session->getQuote()->getAllItems() as $item){
				$option = $item->getOptionByCode('design_id');
				if ($option) {
					$value = $option->getValue();
					if ($value) {
						$design_ids[] = nl2br($this->escapeHtml($value));
					}
				}
			}
			
			if($design_ids){
				$design_collection = Mage::getModel('template/customerdesign')->getCollection()
																->addFieldToFilter('customer_id', array('neq' => $customer_id))
																->addFieldToFilter('px_design_id', array('in' => $design_ids))
																->addFieldToFilter('status', array('eq' => '1'))
																->setOrder('px_design_id');
																
				foreach($design_collection as $design){
					$design->setCustomerId($customer_id);
					$design->save();
				}													
			}
		}
	}
        
}