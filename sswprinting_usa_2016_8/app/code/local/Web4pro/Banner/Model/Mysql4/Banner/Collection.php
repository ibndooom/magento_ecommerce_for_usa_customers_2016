<?php

class Web4pro_Banner_Model_Mysql4_Banner_Collection extends Mage_Core_Model_Mysql4_Collection_Abstract 
{

    public function _construct() 
    {
        $this->_init('banner/banner');
    }

    public function addGroupFilter($group) 
    {
        if ($config = Mage::helper('banner')->getGroupConfig($group)) {
            if ($config['enabled']) {
                $this->addFieldToFilter('group_name', array('eq' => $group));
                return $this;
            }
        }

        $this->_totalRecords = 0;
        $this->_setIsLoaded(true);
        return $this;
    }

    public function addIsEnabledFilter($isEnabled = true) 
    {
        return $this->addFieldToFilter('is_enabled', $isEnabled ? 1 : 0);
    }

    public function addOrderByRandom($dir = 'ASC') 
    {
        $this->getSelect()->order('RAND() ' . $dir);
        return $this;
    }

    public function __addStoreFilter($storeId = null) 
    {
        if (!Mage::app()->isSingleStoreMode() && Mage::app()->getStore()->getId() !== 0) {
            if (is_null($storeId)) {
                $storeId = Mage::app()->getStore()->getId();
            }
            $this->getSelect()->joinInner(array('banner_store' => $this->getTable('banner/store')), "banner_store.banner_id = main_table.banner_id 
                 AND banner_store.store_id = {$storeId}", array());
        }
        return $this;
    }

    public function setSelect($select) 
    {
        $this->_select = select;
        return $this;
    }

}
