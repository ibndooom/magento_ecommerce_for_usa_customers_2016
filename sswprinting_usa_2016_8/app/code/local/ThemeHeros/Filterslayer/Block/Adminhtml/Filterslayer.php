<?php
class ThemeHeros_Filterslayer_Block_Adminhtml_Filterslayer extends Mage_Adminhtml_Block_Widget_Grid_Container
{
  public function __construct()
  {
    $this->_controller = 'adminhtml_filterslayer';
    $this->_blockGroup = 'filterslayer';
    $this->_headerText = Mage::helper('filterslayer')->__('Item Manager');
    $this->_addButtonLabel = Mage::helper('filterslayer')->__('Add Item');
    parent::__construct();
  }
}