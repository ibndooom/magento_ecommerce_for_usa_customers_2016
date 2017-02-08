<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

$installer = $this;
$installer->startSetup();

$installer->run('create table ' . $this->getTable('web4pro_4over/product_quote') . '(
    option_type_id INT(11) UNSIGNED,
    product_id INT(11) UNSIGNED,
    option_type_hash VARCHAR(64),
    prod_uuid VARCHAR(40),
    qty VARCHAR(10),
    options TEXT DEFAULT \'\',
    request TEXT DEFAULT \'\',
    response TEXT DEFAULT \'\',
    total_price DECIMAL(12,4) NULL DEFAULT NULL,
    processed TINYINT DEFAULT 0,
    UNIQUE(option_type_id),
    INDEX(product_id),
    INDEX(option_type_hash),
    INDEX(total_price)
)');

$installer->endSetup();
