<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Block_Option extends Mage_Adminhtml_Block_Widget_Grid_Container {

    public function __construct(){
        $this->_blockGroup = 'web4pro_4over';
        $this->_controller = 'option';
        $this->_headerText = $this->__('4Over options');
        parent::__construct();
        $this->_addButton('download',array(
                'label'     => $this->__('Download from 4over'),
                'onclick'   => 'setLocation(\'' . $this->getUrl('*/*/download') .'\')',
                'class'     => 'add',
            )
        );
    }

} 