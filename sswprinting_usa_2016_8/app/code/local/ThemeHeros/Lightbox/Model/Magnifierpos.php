<?php


class ThemeHeros_Lightbox_Model_Magnifierpos{
    protected $_options;
	const MAGNIFIERPOS_RIGHT = 'right';
    const MAGNIFIERPOS_LEFT  = 'left';
    const MAGNIFIERPOS_TOP	= 'top';
    const MAGNIFIERPOS_BOTTOM = 'bottom';
    
    public function toOptionArray(){
        if (!$this->_options) {
			$this->_options[] = array(
			   'value'=>self::MAGNIFIERPOS_RIGHT,
			   'label'=>Mage::helper('lightbox')->__('Right')
			);
			$this->_options[] = array(
			   'value'=>self::MAGNIFIERPOS_LEFT,
			   'label'=>Mage::helper('lightbox')->__('Left')
			);
			$this->_options[] = array(
			   'value'=>self::MAGNIFIERPOS_TOP,
			   'label'=>Mage::helper('lightbox')->__('Top')
			);
			$this->_options[] = array(
			   'value'=>self::MAGNIFIERPOS_BOTTOM,
			   'label'=>Mage::helper('lightbox')->__('Bottom')
			);
		}
		return $this->_options;
	}
}
