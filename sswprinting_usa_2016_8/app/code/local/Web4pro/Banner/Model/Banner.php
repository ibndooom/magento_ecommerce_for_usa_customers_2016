<?php

class Web4pro_Banner_Model_Banner extends Mage_Core_Model_Abstract {

    protected $_linkedCategories;
    protected $_eventPrefix = 'web4pro_banner';
    protected $_eventObject = 'banner';

    public function __construct() 
    {
        parent::__construct();
        $this->_init('banner/banner');
    }

    public function getGroup() 
    {
        if (!$this->hasGroup()) {
            $this->setGroup($this->getResource()->getGroup($this));
        }
        return $this->getData('group');
    }

    public function hasUrl() 
    {
        return strlen($this->getUrl()) > 1;
    }

    public function getAltText() 
    {
        return $this->getData('alt_text') ? $this->getData('alt_text') : $this->getTitle();
    }

    public function getImageUrl() 
    {
        if (!$this->hasImageUrl()) {
            $this->setImageUrl(Mage::helper('banner/image')->getImageUrl($this->getImage()));
        }

        return $this->getData('image_url');
    }

    public function getSmallImageUrl(){
        if (!$this->hasSmallImageUrl()) {
            $this->setSmallImageUrl(Mage::helper('banner/image')->getImageUrl($this->getSmallImage()));
        }

        return $this->getData('small_image_url');
    }

    public function getUrl() 
    {
        if ($this->_getData('url')) {
            if (strpos($this->_getData('url'), 'http://') === false) {
                $this->setUrl(Mage::getBaseUrl() . ltrim($this->_getData('url'), '/ '));
            }
        }
        return $this->_getData('url');
    }

    public function getBannerCollectionByGroup($groupName) 
    {
        return $this->getCollection()
                        ->addIsEnabledFilter()
                        ->addGroupFilter($groupName);
    }

    public function getLinkedCategories($attributesToSelect = '') 
    {
        if (!isset($this->_linkedCategories)) {
            $this->_linkedCategories = Mage::getResourceSingleton('catalog/category_collection');
            $this->_linkedCategories->getSelect()
                    ->joinInner(
                            array('ban_cat' => $this->getResource()->getTable('banner/catalog_category')), "ban_cat.category_id = e.entity_id AND ban_cat.banner_id = {$this->getId()}", array());
            if ($attributesToSelect) {
                if (is_array($attributesToSelect)) {
                    foreach ($attributesToSelect as $attribute) {
                        $this->_linkedCategories->addAttributeToSelect($attribute, false);
                    }
                } elseif ($attributesToSelect === '*') {
                    $this->_linkedCategories->addAttributeToSelect('*');
                } elseif ($attributesToSelect !== '*' && strlen($attributesToSelect)) {
                    $this->_linkedCategories->addAttributeToSelect($attributesToSelect, false);
                }
            }
        }
        return $this->_linkedCategories;
    }

    public function __getStores() 
    {
        if ($this->getData('stores') === null && !is_array($this->getData('stores'))) {
            $groupConfig = Mage::helper('banner')->getGroupConfig($this->getGroupName());
            $this->setStores(explode(',', $groupConfig['stores']));
        }
        $this->getData('stores');
    }

    protected function _beforeSave() 
    {
        $this->setStores(implode(',', $this->getStores()));
        parent::_beforeSave();
    }

}
