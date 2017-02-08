<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 21.08.15
 * Time: 13:21
 */

class Web4pro_Fourover_Block_Product extends Mage_Adminhtml_Block_Widget_Grid_Container {

    public function __construct(){
        $this->_blockGroup = 'web4pro_4over';
        $this->_controller = 'product';
        $this->_headerText = $this->__('4Over products');
        parent::__construct();
        $this->_removeButton('add');
        $this->_addButton('download',array(
                'label'     => $this->__('Download from 4over'),
                'onclick'   => 'setLocation(\'' . $this->getUrl('*/*/download') .'\')',
                'class'     => 'add',
            )
        );
    }
} 