<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Resource_Option_Collection extends Mage_Core_Model_Resource_Db_Collection_Abstract {

    protected  function _construct(){
        $this->_init('web4pro_4over/option');
        return parent::_construct();
    }
} 