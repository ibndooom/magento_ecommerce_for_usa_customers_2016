<?php

class ThemeHeros_Filterslayer_Model_Mysql4_Filterslayer_Collection extends Mage_Core_Model_Mysql4_Collection_Abstract
{
    public function _construct()
    {
        parent::_construct();
        $this->_init('filterslayer/filterslayer');
    }
}