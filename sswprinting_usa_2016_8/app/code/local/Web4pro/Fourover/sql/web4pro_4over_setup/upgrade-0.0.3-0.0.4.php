<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

$installer = $this;

$installer->startSetup();

$installer->run('create table '.$this->getTable('web4pro_4over/option').'(
        uuid varchar(40) primary key,
        value varchar(30),
        type tinyint,
        UNIQUE(value,type)
)');

$installer->run('create table '.$this->getTable('web4pro_4over/option_temp').'(
        uuid varchar(40) primary key,
        value varchar(30),
        type tinyint,
        UNIQUE(value,type)
)');

$installer->endSetup();
