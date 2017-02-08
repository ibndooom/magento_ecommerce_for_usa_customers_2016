<?php
$installer = $this;
$installer->startSetup();

$installer->getConnection()
            ->addColumn($installer->getTable('banner/banner'), 
                        'sort_order', 
                        "tinyint(4) NOT NULL default '0'");

$installer->endSetup();