<?php

$installer = $this;
/* @var $installer Mage_Core_Model_Resource_Setup */

$installer->startSetup();
$installer->run("
    ALTER TABLE {$this->getTable('px_template_content')} MODIFY other_attributes TEXT NULL;
    ALTER TABLE {$this->getTable('px_blueprint_content')} MODIFY other_attributes TEXT NULL;
    ALTER TABLE {$this->getTable('px_customer_design')} MODIFY custom_options TEXT NULL;
    ALTER TABLE {$this->getTable('px_template_content')} MODIFY custom_options TEXT NULL;
    ALTER TABLE {$this->getTable('px_blueprint_content')} MODIFY custom_options TEXT NULL;
");
$installer->endSetup();
