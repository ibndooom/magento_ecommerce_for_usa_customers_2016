<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

$installer = $this;
$installer->startSetup();

$installer->run('
        CREATE TABLE IF NOT EXISTS ' . $this->getTable('web4pro_4over/turnaround') . '(
        combo_id VARCHAR(40) PRIMARY KEY,
        turnaround_uuid VARCHAR(40),
        turnaround VARCHAR(128),
        runsize_uuid VARCHAR(40),
        runsize VARCHAR(32),
        colorspec_uuid VARCHAR(40),
        colorspec VARCHAR(32),
        product_uuid VARCHAR(40),
        ups_ground DECIMAL(12,4),
        ups_updated TINYINT(1) NOT NULL DEFAULT 0,
        INDEX fover_turnaround_product_uuid (product_uuid),
        INDEX fover_turnaround_ups_updated (ups_updated),
        CONSTRAINT `fover_turnaround_product_uuid`
            FOREIGN KEY (`product_uuid`)
            REFERENCES `' . $this->getTable('web4pro_4over/product') .'` (`product_uuid`)
            ON DELETE CASCADE
    )');

$installer->run('
    ALTER TABLE `' . $this->getTable('web4pro_4over/baseprice') .'`
        ADD CONSTRAINT `fover_base_price_product_uuid`
        FOREIGN KEY (`product_uuid`) REFERENCES `' . $this->getTable('web4pro_4over/product') . '` (`product_uuid`)
        ON DELETE CASCADE
');

$installer->endSetup();
