<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Resource_Turnaround extends Mage_Core_Model_Resource_Db_Abstract {
    protected function _construct()
    {
        $this->_init('web4pro_4over/turnaround', 'combo_id');
        $this->_isPkAutoIncrement = false;
    }
    
    /**
     * Insert multiple turnaround data
     * @param $data array
     */
    public function insertMultiple($data)
    {
        $this->_getWriteAdapter()->insertMultiple($this->getMainTable(), $data);
    }
    
    public function upadateMultiple($data)
    {
        $this->_getWriteAdapter()->insertMultiple($this->getMainTable(), $data);
    }
    
    /**
     * Delete turnarounds by given product UUIDs
     * @param $productUuids array
     */
    public function deleteItemsByProducts($productUuids)
    {
        $condition = array('product_uuid IN(?)' => $productUuids);
        $this->_getWriteAdapter()->delete(
                $this->getMainTable(),
                $condition
            );
    }
}