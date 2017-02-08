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
class ThemeHeros_Filterslayer_Model_Layer_Filter_Attribute extends Mage_Catalog_Model_Layer_Filter_Abstract
{
    const OPTIONS_ONLY_WITH_RESULTS = 1;

    protected $_resource;

    public function __construct()
    {
        parent::__construct();
        $this->_requestVar = 'attribute';
    }

    protected function _getResource()
    {
        if (is_null($this->_resource)) {
            $this->_resource = Mage::getResourceModel('catalog/layer_filter_attribute');
        }
        return $this->_resource;
    }

    protected function _getOptionText($optionId)
    {
        return $this->getAttributeModel()->getFrontend()->getOption($optionId);
    }
    public function apply(Zend_Controller_Request_Abstract $request, $filterBlock)
    {
        if(!Mage::getStoreConfig('filterslayer/general/enabled')){
            $filter = $request->getParam($this->_requestVar);
            if (is_array($filter)) {
                return $this;
            }
            $text = $this->_getOptionText($filter);
            if ($filter && strlen($text)) {
                $this->_getResource()->applyFilterToCollection($this, $filter);
                $this->getLayer()->getState()->addFilter($this->_createItem($text, $filter));
                $this->_items = array();
            }
            return $this;
        }
        
        $filter = $request->getParam($this->_requestVar);
        if (is_array($filter)) {
            return $this;
        }
        $text = array();
        foreach ($this->getSelectValues() as $optionId) {
        	$text[$optionId] = $this->getAttributeModel()->getFrontend()->getOption($optionId);
        }
       if ($filter && $text) {
            $this->_getResource()->applyFilterToCollection($this, $filter);
                foreach ($this->getSelectValues() as $optionId) {
            	$this->getLayer()->getState()->addFilter($this->_addItem(array(
            		'label' => $text[$optionId], 
            		'value' => $optionId,
                    )));
	       }
        }
        return $this;
    }
    
    protected function _addItem($data)
    {
        return Mage::getModel('catalog/layer_filter_item')
            ->setData($data)
            ->setFilter($this);
    }
    
    public function getSelectValues() {
    	$values = Mage::app()->getRequest()->getParam($this->_requestVar);
		return $values ? explode('_', $values) : array();    
    }
    
   
    protected function _getIsFilterableAttribute($attribute)
    {
        return $attribute->getIsFilterable();
    }

    protected function _getItemsData()
    {
        $attribute = $this->getAttributeModel();
        $this->_requestVar = $attribute->getAttributeCode();
        $key = $this->getLayer()->getStateKey().'_'.$this->_requestVar;
        $data = $this->getLayer()->getAggregator()->getCacheData($key);
        if ($data === null) {
            $options = $attribute->getFrontend()->getSelectOptions();
            $optionsCount = $this->_getResource()->getCount($this);
            $data = array();
            foreach ($options as $option) {
                if (is_array($option['value'])) {
                    continue;
                }
                if (Mage::helper('core/string')->strlen($option['value'])) {
                    if ($this->_getIsFilterableAttribute($attribute) == self::OPTIONS_ONLY_WITH_RESULTS) {
                        if (!empty($optionsCount[$option['value']])) {
                            $data[] = array(
                                'label' => $option['label'],
                                'value' => $option['value'],
                                'count' => $optionsCount[$option['value']],
                            );
                        }
                    }
                    else {
                        $data[] = array(
                            'label' => $option['label'],
                            'value' => $option['value'],
                            'count' => isset($optionsCount[$option['value']]) ? $optionsCount[$option['value']] : 0,
                        );
                    }
                }
            }
            $layertags = array(Mage_Eav_Model_Entity_Attribute::CACHE_TAG.':'.$attribute->getId());
            $layertags = $this->getLayer()->getStateTags($layertags);
            $this->getLayer()->getAggregator()->saveCacheData($data, $key, $layertags);
        }
        return $data;
    }
    public function isApplied()
    {
        $appliedValues = $this->getSelectValues();
        return !empty($appliedValues);
    }
}
