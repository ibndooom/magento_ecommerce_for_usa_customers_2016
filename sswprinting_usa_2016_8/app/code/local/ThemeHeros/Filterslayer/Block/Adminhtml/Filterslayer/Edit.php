<?php

class ThemeHeros_Filterslayer_Block_Adminhtml_Filterslayer_Edit extends Mage_Adminhtml_Block_Widget_Form_Container
{
    public function __construct()
    {
        parent::__construct();
                 
        $this->_objectId = 'id';
        $this->_blockGroup = 'filterslayer';
        $this->_controller = 'adminhtml_filterslayer';
        
        $this->_updateButton('save', 'label', Mage::helper('filterslayer')->__('Save Item'));
        $this->_updateButton('delete', 'label', Mage::helper('filterslayer')->__('Delete Item'));
		
        $this->_addButton('saveandcontinue', array(
            'label'     => Mage::helper('adminhtml')->__('Save And Continue Edit'),
            'onclick'   => 'saveAndContinueEdit()',
            'class'     => 'save',
        ), -100);

        $this->_formScripts[] = "
            function toggleEditor() {
                if (tinyMCE.getInstanceById('filterslayer_content') == null) {
                    tinyMCE.execCommand('mceAddControl', false, 'filterslayer_content');
                } else {
                    tinyMCE.execCommand('mceRemoveControl', false, 'filterslayer_content');
                }
            }

            function saveAndContinueEdit(){
                editForm.submit($('edit_form').action+'back/edit/');
            }
        ";
    }

    public function getHeaderText()
    {
        if( Mage::registry('filterslayer_data') && Mage::registry('filterslayer_data')->getId() ) {
            return Mage::helper('filterslayer')->__("Edit Item '%s'", $this->htmlEscape(Mage::registry('filterslayer_data')->getTitle()));
        } else {
            return Mage::helper('filterslayer')->__('Add Item');
        }
    }
}