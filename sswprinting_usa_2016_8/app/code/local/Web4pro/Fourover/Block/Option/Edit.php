<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Block_Option_Edit extends Mage_Adminhtml_Block_Widget_Form_Container {

    public function __construct(){
        $this->_blockGroup = 'web4pro_4over';
        $this->_controller = 'option';
        $this->_mode = 'edit';
        $this->_headerText = $this->__('Edit 4over Option');
        parent::__construct();
    }
} 