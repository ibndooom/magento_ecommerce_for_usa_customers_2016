<?php 
class ThemeHeros_Imageslider_Block_Imageslider extends Mage_Core_Block_Template {

	public function getImageCollection() {
		$collection = Mage::getModel('imageslider/imageslider')->getCollection()
			->addFieldToFilter('status',1);		
		$banners = array();
		foreach ($collection as $banner) {			
				$banners[] = $banner;
		}
		return $banners;
	}
	
} 