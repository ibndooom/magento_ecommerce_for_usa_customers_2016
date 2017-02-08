<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */
class Web4pro_Fourover_Model_Resource_Baseprice extends Mage_Core_Model_Resource_Db_Abstract {
    protected function _construct(){
        $this->_init('web4pro_4over/baseprice','base_price_uuid');
        $this->_isPkAutoIncrement = false;
    }
    
    /**
     * Insert multiple base_price data
     * @param $uuid array Data array keyed with id fields
     */
    public function insertMultiple($data)
    {
        $write = $this->_getWriteAdapter();
        $priceUuids = array_keys($data);
        //deleting previosly set data by given base prices
        $write->delete($this->getMainTable(), array($this->getIdFieldName() . ' IN(?)' => $priceUuids));
        //inserting updated via API prices
        $write->insertMultiple($this->getMainTable(), $data);
    }
} 