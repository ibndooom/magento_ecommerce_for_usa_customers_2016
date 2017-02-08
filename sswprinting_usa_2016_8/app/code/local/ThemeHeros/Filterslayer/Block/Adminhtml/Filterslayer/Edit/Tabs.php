<?php

class ThemeHeros_Filterslayer_Block_Adminhtml_Filterslayer_Edit_Tabs extends Mage_Adminhtml_Block_Widget_Tabs
{

  public function __construct()
  {
      parent::__construct();
      $this->setId('filterslayer_tabs');
      $this->setDestElementId('edit_form');
      $this->setTitle(Mage::helper('filterslayer')->__('Item Information'));
  }

  protected function _beforeToHtml()
  {
      $this->addTab('form_section', array(
          'label'     => Mage::helper('filterslayer')->__('Item Information'),
          'title'     => Mage::helper('filterslayer')->__('Item Information'),
          'content'   => $this->getLayout()->createBlock('filterslayer/adminhtml_filterslayer_edit_tab_form')->toHtml(),
      ));
     
      return parent::_beforeToHtml();
  }
}