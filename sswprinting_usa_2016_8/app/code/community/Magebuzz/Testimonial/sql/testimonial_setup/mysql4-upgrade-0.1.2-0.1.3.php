<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 13.07.15
 * Time: 12:27
 */
$installer = $this;
$installer->startSetup();

$installer->run('alter table '.$this->getTable('testimonial/testimonial').' add sort_order char(4)');

$installer->endSetup();
