<?php

class ThemeHeros_Imageslider_Block_Adminhtml_Imageslider_Edit_Tab_Form extends Mage_Adminhtml_Block_Widget_Form
{
  protected function _prepareForm()
  {
      $form = new Varien_Data_Form();
      $this->setForm($form);
      $fieldset = $form->addFieldset('imageslider_form', array('legend'=>Mage::helper('imageslider')->__('Banner information')));
     
      $fieldset->addField('title', 'text', array(
          'label'     => Mage::helper('imageslider')->__('Image Title'),
          'class'     => 'required-entry',
          'required'  => true,
          'name'      => 'title',
      ));	

      $fieldset->addField('filename', 'image', array(
          'label'     => Mage::helper('imageslider')->__('Image'),
          'required'  => false,
          'name'      => 'filename',
	  ));	
	  
	  
      $fieldset->addField('status', 'select', array(
          'label'     => Mage::helper('imageslider')->__('Image Status'),
          'name'      => 'status',
          'values'    => array(
              array(
                  'value'     => 1,
                  'label'     => Mage::helper('imageslider')->__('Enabled'),
              ),

              array(
                  'value'     => 2,
                  'label'     => Mage::helper('imageslider')->__('Disabled'),
              ),
          ),
      ));
			
	  $fieldset->addField('weblink', 'text', array(
          'label'     => Mage::helper('imageslider')->__('Image Url'),
		  'class'     => 'validate-url',
          'required'  => false,
		  'after_element_html' => "<small>Image URL</small>",
          'name'      => 'weblink',
      ));
			
      $fieldset->addField('content', 'editor', array(
          'name'      => 'content',
          'label'     => Mage::helper('imageslider')->__('Description'),
          'title'     => Mage::helper('imageslider')->__('Description'),
          'style'     => 'width:280px; height:100px;',
          'wysiwyg'   => false,
          'required'  => false,
      ));
			
     
      if ( Mage::getSingleton('adminhtml/session')->getImageSliderData() )
      {
          $data = Mage::getSingleton('adminhtml/session')->getImageSliderData();
          Mage::getSingleton('adminhtml/session')->setImageSliderData(null);
      } elseif ( Mage::registry('imageslider_data') ) {
          $data = Mage::registry('imageslider_data')->getData();
      }
	  $data['store_id'] = explode(',',$data['stores']);
	  $form->setValues($data);
	  
      return parent::_prepareForm();
  }
}