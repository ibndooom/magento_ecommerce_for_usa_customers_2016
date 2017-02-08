<?php
/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 */

/**
 * Catalog layer price filter
 *
 * @category   ThemeHeros
 * @package    ThemeHeros_Filterslayer
 * @author     ThemeHeros Developer <soncp@arrowhitech.com>
 */
class ThemeHeros_Filterslayer_Block_Layer_Filter_Attribute extends Mage_Catalog_Block_Layer_Filter_Abstract
{
    protected $_filters = array();
    
    public function __construct()
    {
        parent::__construct();
        $this->_filterModelName = 'catalog/layer_filter_attribute';
        if(Mage::getStoreConfig('filterslayer/general/enabled')){
             $this->setTemplate('filterslayer/layer/filter.phtml');
        }
        
    }
    
    protected function _prepareFilter() {
    	if ($this->getAttributeModel()) {
        	$this->_filter->setAttributeModel($this->getAttributeModel());
    	}
    	
    }

    public function getItems()
    {
        return $this->_filter->getItems();
    }
    
    
    protected function _initFilter()
    {
        if(!Mage::getStoreConfig('filterslayer/general/enabled')){
             return parent::_initFilter();
        }
        
        if (!$this->_filterModelName) {
            Mage::throwException(Mage::helper('catalog')->__('Filter model name must be declared.'));
        }
        $this->_filter = Mage::getModel($this->_filterModelName)
            ->setLayer($this->getLayer());
        $this->_prepareFilter();
        $this->_filter->apply($this->getRequest(), $this);
        return $this;
    }
    
    public function getModelFilter(){
        return Mage::getModel('filterslayer/layer_filter_item');
    }
    
    public function isFilterImage(){
       $attributeCode = $this->getModelFilter()->getAttributeValues($this->_filter->getAttributeModel()->getAttributeCode());
       if($attributeCode->getLayerImage()==1){
            if($attributeCode->getId()){
                    return true;
            }else{
                    return false;
            }    
       }
       return false;
    }
    
    public function isFilterCheckbox(){
       $attributeCode = $this->getModelFilter()->getAttributeValues($this->_filter->getAttributeModel()->getAttributeCode());
       if($attributeCode->getLayerCheckbox()==1){
            if($attributeCode->getId()){
                    return true;
            }else{
                    return false;
            }    
       }
	   
	   if($attributeCode->getLayerCheckbox()==2){
			return false;
       }
       return true;
    }
    
    
    public function getFilter($name) {
        return isset($this->_filters[$name]) ? $this->_filters[$name] : null;
    }

    public function setFilter($name, $filter) {
        $this->_filters[$name] = $filter;
    }
   
}
