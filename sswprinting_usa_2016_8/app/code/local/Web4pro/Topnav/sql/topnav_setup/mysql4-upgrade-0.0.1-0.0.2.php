<?php

$installer = $this;
$installer->startSetup();

$setup = new Mage_Eav_Model_Entity_Setup('core_setup');
$setup->updateAttribute('catalog_category', 'nav_menu_output_link', 'frontend_label', 'Nav Menu Disable Link Output'); 

$installer->endSetup();