<?php

class ThemeHeros_Filterslayer_Model_Filterslayer extends Mage_Core_Model_Abstract
{
    public function _construct()
    {
        parent::_construct();
        $this->_init('filterslayer/filterslayer');
    }
}