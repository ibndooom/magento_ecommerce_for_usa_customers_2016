<?php

abstract class Web4pro_Banner_Block_View_Abstract extends Mage_Core_Block_Template
{
    protected $_canShow = true;
    protected $_bannerCollection;
    protected $_banner;
    protected $_singleTabMode = false;
    
    protected function _prepareBlockData()
    {      
        $this->_prepareCollection();
        if($this->getCollection()->getSize() == 1){
            $this->_singleTabMode = true;
        }elseif($this->getCollection()->getSize() == 0){
            $this->_canShow = false;
        }
        return $this;
    }
    
    protected function _prepareCollection()
    {
        $collection = Mage::getModel('banner/banner')
                ->getBannerCollectionByGroup($this->getGroup());
        if(Mage::helper('banner')->isRandomizeBannerOrder()){
            $collection->addOrderByRandom();
        }            
        return $this->setCollection($collection);
    }

    public function getBanner()
    {
        if(!isset($this->_banner)){
            $this->_banner = $this->getCollection()->fetchItem();
        }
        return $this->_banner;
    }

    public function isSingleTabMode()
    {
        return $this->_singleTabMode;
    }
    
    public function getGroup()
    {
        if(!$this->hasData('group')){            
            $this->_canShow = false;
            return false;
        }
        if($config = Mage::helper('banner')->getGroupConfig($this->getData('group'))){
            if(!$config['enabled']){            
                $this->_canShow = false;
                return false;            
            }
        }
        return $this->getData('group');
    }
        
    public function canShow()
    {
        return $this->_canShow;
    }

    public function getCollection() 
    {
        return $this->_bannerCollection;
    }

    public function setCollection($collection)
    {
        $this->_bannerCollection = $collection;
        return $this;
    }
    
    public function getTargetWindow()
    {
        return Mage::helper('banner')->getOpenWindowRule();
    }
    
    
    protected function _beforeToHtml() 
    {
        $this->_prepareBlockData();
        parent::_beforeToHtml();
    }
    
    public function getRotateTime()
    {
        return Mage::helper('banner')->getConfigRotateTime();
    }
}
