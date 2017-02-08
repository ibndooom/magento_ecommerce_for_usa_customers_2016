<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */
/* @var $installer Mage_Core_Model_Resource_Setup */
$installer = $this;
$installer->startSetup();

/**
 * Create table 'web4pro_4over/order'
 */
$table = $installer->getConnection()
    ->newTable($installer->getTable('web4pro_4over/order'))
    ->addColumn('order_id', Varien_Db_Ddl_Table::TYPE_INTEGER, null, array(
        'nullable'  => false,
        'primary'   => true,
        ), 'Magento order ID')
    ->addColumn('processed_flag', Varien_Db_Ddl_Table::TYPE_BOOLEAN, null, array(
        'nullable'  => false,
        ), 'Determines if all printable order items was successfuly posted to 4over')
    ->addColumn('jobs', Varien_Db_Ddl_Table::TYPE_TEXT, '2M', array(
        'nullable'  => false,
        ), 'Jobs/order items complex information');
$installer->getConnection()->createTable($table);

$installer->endSetup();
