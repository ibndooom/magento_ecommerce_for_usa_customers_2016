<?php

class Web4pro_Banner_Block_Adminhtml_Banner_Edit_Tabs extends Mage_Adminhtml_Block_Widget_Tabs
{
	public function __construct()
	{
		parent::__construct();
		$this->setId('banner_tabs');
		$this->setDestElementId('edit_form');
		$this->setTitle($this->__('Banners / Banner'));
	}
	
	protected function _beforeToHtml()
	{
		$this->addTab('general',
			array(
				'label' => $this->__('General'),
				'title' => $this->__('General'),
				'content' => $this->getLayout()->createBlock('banner/adminhtml_banner_edit_tab_form')->toHtml(),
			)
		);
//		$this->addTab('categories',
//			array(
//				'label' => $this->__('Linked Categories'),
//				'title' => $this->__('Linked Categories'),
//				'content' => $this->getLayout()->createBlock('banner/adminhtml_banner_edit_tab_category')->toHtml(),
//			)
//		);
		
		return parent::_beforeToHtml();
	}
}
