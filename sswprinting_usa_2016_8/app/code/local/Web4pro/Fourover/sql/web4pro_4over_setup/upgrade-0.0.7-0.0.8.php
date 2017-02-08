<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

$installer = $this;
$installer->startSetup();

$installer->run('
        CREATE TABLE IF NOT EXISTS '.$this->getTable('web4pro_4over/baseprice').'(
        base_price_uuid VARCHAR(40) PRIMARY KEY,
        product_baseprice DECIMAL(12,4),
        runsize_uuid VARCHAR(40),
        runsize VARCHAR(32),
        colorspec_uuid VARCHAR(40),
        colorspec VARCHAR(32),
        product_uuid VARCHAR(40),
        can_group_ship TINYINT(1),
        INDEX fover_base_price_product_uuid (product_uuid),
        INDEX fover_base_price_can_group_ship (can_group_ship)
    )');

$productTable = $this->getTable('web4pro_4over/product');
$installer->run("
    ALTER TABLE $productTable ADD is_baseprices_updated TINYINT(1) NOT NULL DEFAULT 0;
    CREATE INDEX web4pro_fover_product_is_baseprices_updated ON $productTable (is_baseprices_updated);
");

$installer->endSetup();
