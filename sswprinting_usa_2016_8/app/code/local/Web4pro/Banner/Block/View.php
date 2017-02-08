<?php

class Web4pro_Banner_Block_View extends Web4pro_Banner_Block_View_Abstract implements Mage_Widget_Block_Interface
{

    protected function _prepareBlockData()
    {
        if($groupName = $this->getGroup()) {
            $config = Mage::helper('banner')->getGroupConfig($groupName);
            if($config['is_grouped']) {
                if(isset($config['is_accordion'])&&$config['is_accordion']) {
                    $this->setTemplate('web4pro/banner/view/accordion.phtml');
                } elseif(isset($config['is_set'])&&$config['is_set']) {
                    $this->setTemplate('web4pro/banner/view/set.phtml');
                } elseif(isset($config['is_under_breadcrumb'])&&$config['is_under_breadcrumb']) {
                    $this->setTemplate('web4pro/banner/view/under_breadcrumb.phtml');
                } elseif(isset($config['is_under_breadcrumb_multi'])&&($config['is_under_breadcrumb_multi'])) {
                    $this->setTemplate('web4pro/banner/view/under_breadcrumb_multi.phtml');
                } else {
                    $this->setTemplate('web4pro/banner/view/tabs.phtml');
                }
            } else {
                $this->setTemplate('web4pro/banner/view/single.phtml');
            }
        }

        return parent::_prepareBlockData();
    }

    protected function _prepareCollection()
    {
        parent::_prepareCollection();
        
        $category = Mage::registry('current_category');
        if($this->getFiteredByCategory() && $category !== null && ($category instanceof Mage_Catalog_Model_Category)
        ) {
            
            // Check if category has banners
            $banners_id = $category->getBannerId();
            
            if($banners_id) $banners_id = explode (',', $banners_id);
            
            // Try search banners in parent categories
            if(!$banners_id) {
                $banners_id = $this->findParrentcategoryBanners($category);
            }
            
            $this->getCollection()->addFieldToFilter('banner_id', array('in'=> $banners_id));
        }
        
        $this->getCollection()->setOrder('sort_order', 'ASC');

        return $this;
    }
    
    /**
     * Find recursively banners from parent categories
     * @param \Mage_Catalog_Model_Category $category
     * @return array|boolean
     */
    protected function findParrentcategoryBanners($category) {
        
        if(($category instanceof Mage_Catalog_Model_Category) == false) return false;
        
        $currentCategory = $category->getParentCategory();
        
        $banners_id = $currentCategory->getBannerId();
        
        if($banners_id) {
            return explode(',', $banners_id);
        } elseif($currentCategory->hasParentCatagory()) {
            return $this->findParrentcategoryBanners($currentCategory);
        }
        
        return false;
    }

    public function getContainerClass()
    {
        if(!$this->hasData('container_class')) {
            $this->setContainerClass('single-banner');
        }

        return $this->getData('container_class');
    }
    
    protected function _toHtml()
    {
        if($this->_canShow) {
            return $this->renderView();
        }

        return '';
    }

    public function getRotateTime()
    {  
        return Mage::helper('banner')->getConfigRotateTime();
    }

}
