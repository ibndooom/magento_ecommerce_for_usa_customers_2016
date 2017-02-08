<?php

class Pixopa_Template_Model_Template extends Mage_Core_Model_Abstract
{
    protected function _construct(){

       $this->_init("template/template");

    }
	public function getDesignerArray()
    {
    	$opts = array();
    	//$opts[] = array('value' => '', 'label' => '');
    	$collection = Mage::getModel('designer/designer')->getCollection();

    	foreach ($collection as $brand) {
    		$opts[] = array('value' => $brand->getdesigner_id(), 'label' => $brand->getname());
    	}
    	return $opts;
    }
}
	 