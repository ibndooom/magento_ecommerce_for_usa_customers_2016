<?php

class Web4pro_Banner_Model_System_Config_Source_Open_Window 
{
    public function toOptionArray()
    {
        return array(
            array('value' => '_target', 'label' => Mage::helper('banner')->__('In New Window')),
            array('value' => '_self', 'label' => Mage::helper('banner')->__('In Current Window')),
        );
    }
}
