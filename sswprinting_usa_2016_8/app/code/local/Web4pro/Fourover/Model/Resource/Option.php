<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Resource_Option extends Mage_Core_Model_Resource_Db_Abstract {

    protected $_tempTable;

    protected function _construct(){
        $this->_init('web4pro_4over/option','uuid');
        $this->_isPkAutoIncrement = false;
        $this->_tempTable = $this->getTable('web4pro_4over/option_temp');
    }

    public function clearTempTable(){
        $this->_getWriteAdapter()->delete($this->_tempTable);
        return $this;
    }

    public function insertTempTable($insert){
        $this->_getWriteAdapter()->insertOnDuplicate($this->_tempTable,$insert,array('value'));
        return $this;
    }

    public function updateMainTable(){
        $this->_getWriteAdapter()->delete($this->getMainTable());
        $this->_getWriteAdapter()->query('insert into '.$this->getMainTable().' select * from '.$this->_tempTable);
        return $this;
    }
} 