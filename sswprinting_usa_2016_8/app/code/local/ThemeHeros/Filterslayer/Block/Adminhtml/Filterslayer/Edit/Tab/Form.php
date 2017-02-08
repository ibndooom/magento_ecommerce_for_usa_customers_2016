<?php

class ThemeHeros_Filterslayer_Block_Adminhtml_Filterslayer_Edit_Tab_Form extends Mage_Adminhtml_Block_Widget_Form
{
  protected function _prepareForm()
  {
      $form = new Varien_Data_Form();
      $this->setForm($form);
      $fieldset = $form->addFieldset('filterslayer_form', array('legend'=>Mage::helper('filterslayer')->__('Item information')));
     
      $fieldset->addField('title', 'text', array(
          'label'     => Mage::helper('filterslayer')->__('Title'),
          'class'     => 'required-entry',
          'required'  => true,
          'name'      => 'title',
      ));

      $fieldset->addField('filename', 'file', array(
          'label'     => Mage::helper('filterslayer')->__('File'),
          'required'  => false,
          'name'      => 'filename',
	  ));
		
      $fieldset->addField('status', 'select', array(
          'label'     => Mage::helper('filterslayer')->__('Status'),
          'name'      => 'status',
          'values'    => array(
              array(
                  'value'     => 1,
                  'label'     => Mage::helper('filterslayer')->__('Enabled'),
              ),

              array(
                  'value'     => 2,
                  'label'     => Mage::helper('filterslayer')->__('Disabled'),
              ),
          ),
      ));
     
      $fieldset->addField('content', 'editor', array(
          'name'      => 'content',
          'label'     => Mage::helper('filterslayer')->__('Content'),
          'title'     => Mage::helper('filterslayer')->__('Content'),
          'style'     => 'width:700px; height:500px;',
          'wysiwyg'   => false,
          'required'  => true,
      ));
     
      if ( Mage::getSingleton('adminhtml/session')->getFilterslayerData() )
      {
          $form->setValues(Mage::getSingleton('adminhtml/session')->getFilterslayerData());
          Mage::getSingleton('adminhtml/session')->setFilterslayerData(null);
      } elseif ( Mage::registry('filterslayer_data') ) {
          $form->setValues(Mage::registry('filterslayer_data')->getData());
      }
      return parent::_prepareForm();
  }
}