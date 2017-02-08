<?php

class Web4pro_Banner_Block_Adminhtml_Banner_Edit  extends Mage_Adminhtml_Block_Widget_Form_Container
{
	public function __construct()
	{
		parent::__construct();
        $this->_objectId = 'id';
		$this->_controller = 'adminhtml_banner';
		$this->_blockGroup = 'banner';
		$this->_headerText = $this->_getHeaderText();
		
		$this->_addButton('save_and_edit_button', array(
			'label'     => Mage::helper('catalog')->__('Save and Continue Edit'),
			'onclick'   => 'editForm.submit(\''.$this->getSaveAndContinueUrl().'\')',
			'class' => 'save'
		));
	}
	
	public function getSaveAndContinueUrl()
	{
		return $this->getUrl('*/*/save', array(
			'_current'   => true,
			'back'       => 'edit',
		));
	}
    
	protected function _getHeaderText()
	{
		if ($banner = Mage::registry('current_banner')) {
			if ($displayName = $banner->getTitle()) {
				return $displayName;
			}
		}	
		return $this->__('Edit Banner');
	}
        
}
