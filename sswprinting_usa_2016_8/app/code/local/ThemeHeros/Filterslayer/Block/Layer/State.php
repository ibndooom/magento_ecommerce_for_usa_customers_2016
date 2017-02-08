<?php

class ThemeHeros_Filterslayer_Block_Layer_State extends Mage_Catalog_Block_Layer_State {
    
    public function __construct()
    {
        parent::__construct();
        $this->setTemplate('filterslayer/layer/state.phtml');
    }
}