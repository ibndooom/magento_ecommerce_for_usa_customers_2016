<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Resource_Product extends Mage_Core_Model_Resource_Db_Abstract {
    protected $_tempTable;
    protected $_serializableFields = array(
            'categories' => array(array(), array()),
            'product_option_groups' => array(array(), array()),
        );

    protected function _construct(){
        $this->_init('web4pro_4over/product','product_uuid');
        $this->_isPkAutoIncrement = false;
        $this->_tempTable = $this->getTable('web4pro_4over/product_temp');
    }

    public function clearTempTable(){
        $this->_getWriteAdapter()->delete($this->_tempTable);
        return $this;
    }

    public function insertTempTable($insert){
        $this->_getWriteAdapter()->insertOnDuplicate($this->_tempTable,$insert,array('product_description'));
        return $this;
    }

    public function updateMainTable(){
        $this->_getWriteAdapter()->delete($this->getMainTable());
        $this->_getWriteAdapter()->query('insert into '.$this->getMainTable().' (product_uuid, product_code, product_description) select * from '.$this->_tempTable);
        return $this;
    }
} 