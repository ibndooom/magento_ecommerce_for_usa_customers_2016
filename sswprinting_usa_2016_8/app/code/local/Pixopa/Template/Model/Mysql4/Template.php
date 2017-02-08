<?php

class Pixopa_Template_Model_Mysql4_Template extends Mage_Core_Model_Mysql4_Abstract
{
	protected function _construct()
	{
		$this->_init("template/template", "template_id");
	}
        
    /**
     * Perform operations after object load
     *
     * @param Mage_Core_Model_Abstract $object
     * @return Mage_Cms_Model_Resource_Page
     */
    protected function _afterLoad(Mage_Core_Model_Abstract $object)
    {
        if ($object->getId()) {
            $stores = $object->getStoreId();
            $stores = explode(',', $stores);
            $object->setData('store_id', $stores);
        }
        return parent::_afterLoad($object);
    }
}	 