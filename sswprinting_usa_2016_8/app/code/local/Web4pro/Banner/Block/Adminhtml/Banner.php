<?php


class Web4pro_Banner_Block_Adminhtml_Banner extends Mage_Adminhtml_Block_Widget_Grid_Container
{
	public function __construct()
	{
        parent::__construct(); 
		$this->_controller = 'adminhtml_banner';
		$this->_blockGroup = 'banner';
		$this->_headerText = $this->__('Banners / Banner');

	}
        
}