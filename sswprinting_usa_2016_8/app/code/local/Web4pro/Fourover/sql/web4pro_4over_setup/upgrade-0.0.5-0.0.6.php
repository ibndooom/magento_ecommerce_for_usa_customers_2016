<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

$installer = $this;

$installer->startSetup();

$installer->run('create table '.$this->getTable('web4pro_4over/product').'(
    product_uuid varchar(40) primary key,
    product_code varchar(255),
    product_description varchar(255)
)');

$installer->run('create table '.$this->getTable('web4pro_4over/product_temp').'(
    product_uuid varchar(40) primary key,
    product_code varchar(255),
    product_description varchar(255)
)');

$installer->endSetup();