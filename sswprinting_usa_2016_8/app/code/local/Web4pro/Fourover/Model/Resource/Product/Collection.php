<?php
/**
 * @category   Web4pro
 * @package    Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Resource_Product_Collection extends Mage_Core_Model_Resource_Db_Collection_Abstract {
    protected  function _construct(){
        $this->_init('web4pro_4over/product');
        return parent::_construct();
    }

    protected function _afterLoad()
    {
        parent::_afterLoad();
        foreach ($this->_items as $item) {
            $item->getResource()->unserializeFields($item);
        }
    }
} 