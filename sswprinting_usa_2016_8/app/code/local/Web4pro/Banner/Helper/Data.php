<?php


class Web4pro_Banner_Helper_Data extends Mage_Core_Helper_Abstract
{
    const DEFAULT_OPEN_WINDOW_RULE = '_blank';
    const DEFAULT_BANNER_RANDOMIZE_ORDER = false;
    const DEFAULT_ROTATE_TIME = 10;
    protected $_groups = array();
    protected $_bannersCollection = NULL;
    public $_pageSize = array('wight' => 1180, 'height' => 79);

    public function getConfigGroupsArray()
    {
        if(empty($this->_groups)){
            $this->_groups = Mage::getStoreConfig('banner/groups');
            foreach($this->_groups as $groupName => &$group){
                if(!isset($group['label'])){
                    $group['label'] = $groupName;
                }
                if(!isset($group['enabled'])){
                    $group['enabled'] = 0;
                }
                if(!isset($group['is_grouped'])){
                    $group['is_grouped'] = 0;
                }
            }
        }
        return $this->_groups;
    }

    public function getGroupConfig($name)
    {
        $data = $this->getConfigGroupsArray();
        if(isset($data[$name])){
            return $data[$name];
        }
        return array();
    }

    protected function _getConnection($type = 'write')
    {
        return Mage::getSingleton('core/resource')->getConnection($type);
    }

    public function getReadConnection()
    {
        return $this->_getConnection('read');
    }

    public function getWriteConnection()
    {
        return $this->_getConnection();
    }

    public function getOpenWindowRule($storeId = null)
    {
        if(!$rule = Mage::getStoreConfig('banner/general/banner_open_page', $storeId)){
            $rule = self::DEFAULT_OPEN_WINDOW_RULE;
        }
        return $rule;
    }

    public function isRandomizeBannerOrder($storeId = null)
    {
        $rule = Mage::getStoreConfig('banner/general/banner_randomize_order', $storeId);
        if($rule === false){
            $rule = self::DEFAULT_BANNER_RANDOMIZE_ORDER;
        }
        return $rule;
    }

    public function getConfigRotateTime()
    {
        $rule = Mage::getStoreConfig('banner/general/rotata_duration');
        if($rule === false){
            $rule = self::DEFAULT_ROTATE_TIME;
        }
        return $rule;

    }

    /* Under Breadcrumbs banner collection filtering according to banners assigned to category*/
    public function getCategoryUBreadcrumbBanners($collection) {
        $category = Mage::registry('current_category');

        $banners_id = null;
        //if it's not catalog's page then take root category object
        if ($category === null || !($category instanceof Mage_Catalog_Model_Category)) {
            $category = Mage::getModel('catalog/category')->load(Mage::app()->getStore()->getRootCategoryId()); 
        }
        // Check if category has banners
        $banners_id = $category->getTopBannerId();
        
        if ($banners_id) $banners_id = explode (',', $banners_id);
		// Try search banners in parent categories
		
        if(!$banners_id) {
            $banners_id = $this->_findParentCategoryUBreadcrumbBanners($category);
        }
        $collection->addFieldToFilter('banner_id', array('in'=> $banners_id));
        return $collection;
    }

    protected function _findParentCategoryUBreadcrumbBanners($category) {
        if (($category instanceof Mage_Catalog_Model_Category) == false){
            return false;
        }

        $currentCategory = $category->getParentCategory();        
        $banners_id = $currentCategory->getTopBannerId();

        if ($banners_id) {
            return explode(',', $banners_id);
        } elseif ($currentCategory->getParentCategory()->getId() !== $currentCategory->getId()) {
            return $this->_findParentCategoryUBreadcrumbBanners($currentCategory);
        }
        return false;
    }
    
    public function getBannersForUnderBreadCrumbs($forBottega = false)
    {
		if(!$forBottega)
		{
			$this->_bannersCollection = Mage::getModel('banner/banner')->getCollection()->addFieldToFilter('is_enabled',1)->addGroupFilter('under_breadcrumb_multi')->setOrder('sort_order','DESC');
		}
		else
		{
			$this->_bannersCollection = Mage::getModel('banner/banner')->getCollection()->addFieldToFilter('is_enabled',1)->addGroupFilter('under_breadcrumb_multi_bottega')->setOrder('sort_order','DESC');
		}
		return $this->_bannersCollection;
	}
	
	public function getImageSizes()
	{
		if(!$this->_bannersCollection)
		{
			$this->getBannersForUnderBreadCrumbs();
		}
		$count = $this->_bannersCollection->count();
		$wight = ($this->_pageSize['wight'] / (float) $count) - 2;
		$height = $this->_pageSize['height'];
		return array('wight' => $wight, 'height' => $height);
	}
	
	
	public function resizeBannersCollection()
	{
		$count = $this->_bannersCollection->count();
		$wight = ($this->_pageSize['wight'] / (float) $count) - 2;
		$height = $this->_pageSize['height'];
		$helper = Mage::helper('banner/image');
		foreach($this->_bannersCollection as $banner)
		{
			$imageFileOld = $banner->getImage();
			//$imageFileNew = $helper->getResizedImageUrl($imageFileOld, $wight,$height);
			$banner->setImageUrl($helper->getResizedImageUrl($imageFileOld, $wight,$height));
		}
	}
    
    
    
    
    
    /* @end */
}
