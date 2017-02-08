<?php
class ThemeHeros_Imageslider_Block_Adminhtml_Imageslider extends Mage_Adminhtml_Block_Widget_Grid_Container
{
  public function __construct()
  {
    $this->_controller = 'adminhtml_imageslider';
    $this->_blockGroup = 'imageslider';
    $this->_headerText = Mage::helper('imageslider')->__('Banner Manager');
    $this->_addButtonLabel = Mage::helper('imageslider')->__('Add banner image');
    parent::__construct();
  }
}