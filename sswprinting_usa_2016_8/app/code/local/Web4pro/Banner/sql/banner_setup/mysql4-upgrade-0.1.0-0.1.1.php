<?php
$installer = $this;
$installer->startSetup();

$setup = new Mage_Catalog_Model_Resource_Setup('core_setup');

$setup->addAttribute(Mage_Catalog_Model_Category::ENTITY, 'banner_id', array(
    'input'             => 'multiselect',
    'type'              => 'varchar',
    'backend'           => 'eav/entity_attribute_backend_array',
    'source'            => 'banner/source_banners',
    'label'             => 'Banner',
    'class'             => '',
    'global'            => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_STORE,
    'visible'           => true,
    'required'          => false,
    'sort_order'        => 85,
    'group'             => 'General Information'
));

$installer->endSetup();