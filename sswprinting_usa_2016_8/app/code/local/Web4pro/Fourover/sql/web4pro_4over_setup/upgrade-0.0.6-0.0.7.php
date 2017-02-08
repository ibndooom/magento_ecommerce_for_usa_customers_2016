<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

$installer = $this;

$installer->startSetup();
$productTable = $this->getTable('web4pro_4over/product');
$installer->run("
    ALTER TABLE $productTable ADD categories TEXT;
    ALTER TABLE $productTable ADD product_option_groups TEXT;
    ALTER TABLE $productTable ADD product_option_formatted_description TEXT;
    ALTER TABLE $productTable ADD options_uploaded TINYINT(1) NOT NULL DEFAULT 0;
    CREATE INDEX web4pro_fover_product_options_uploaded ON $productTable (options_uploaded);
");

$installer->endSetup();