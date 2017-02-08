<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Resource_Order extends Mage_Core_Model_Resource_Db_Abstract
{
     /**
     * Primery key has no auto increment flag
     *
     * @var bool
     */
    protected $_isPkAutoIncrement = false;
    
    protected $_serializableFields = array('jobs' => array(array(), array()));

    /**
     * Initializes resource model
     */
    protected function _construct()
    {
        $this->_init('web4pro_4over/order', 'order_id');
    }
}
