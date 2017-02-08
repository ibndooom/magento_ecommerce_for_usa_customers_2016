<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

$installer = $this;
$installer->startSetup();

try {
    $installer->run("
        ALTER TABLE `{$this->getTable('web4pro_4over/turnaround')}` ADD ups_rates TEXT;
    ");
} catch (Exception $e) {}

$installer->endSetup();
