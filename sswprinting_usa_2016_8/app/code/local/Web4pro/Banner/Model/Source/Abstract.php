<?php

abstract class Web4pro_Banner_Model_Source_Abstract 
 extends Mage_Eav_Model_Entity_Attribute_Source_Abstract
{
    public function getOptionArray()
    {
        $options = array();
        foreach($this->getAllOptions(false) as $option){
            $options[$option['value']] = $option['label'];
        }
        return $options;
    }
    
    public function getAllOptions($withEmpty = true)
    {
        $options = $this->_getCollectionArray();        
        if($withEmpty){
            array_unshift($options, array(
                'label' => Mage::helper('banner')->__('Select value please'),
                'value' => '',
            ));
        }
        return $options;
    }

    public function toOptionArray()
    {
        return $this->getAllOptions();
    }
    
    abstract protected function _getCollectionArray();
}

