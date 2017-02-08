<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

$installer = $this;
$installer->startSetup();
$installer->run('alter table '.$this->getTable('sales/order_item').' add status_text varchar(255)');
$installer->endSetup();