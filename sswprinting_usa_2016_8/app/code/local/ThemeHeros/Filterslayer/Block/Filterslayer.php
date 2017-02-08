<?php
class ThemeHeros_Filterslayer_Block_Filterslayer extends Mage_Core_Block_Template
{
	public function _prepareLayout()
    {
		return parent::_prepareLayout();
    }
    
     public function getFilterslayer()     
     { 
        if (!$this->hasData('filterslayer')) {
            $this->setData('filterslayer', Mage::registry('filterslayer'));
        }
        return $this->getData('filterslayer');
        
    }
}