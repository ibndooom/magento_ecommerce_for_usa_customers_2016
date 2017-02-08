<?php

class ThemeHeros_Filterslayer_Model_Mysql4_Filterslayer extends Mage_Core_Model_Mysql4_Abstract
{
    public function _construct()
    {    
        // Note that the filterslayer_id refers to the key field in your database table.
        $this->_init('filterslayer/filterslayer', 'filterslayer_id');
    }
}