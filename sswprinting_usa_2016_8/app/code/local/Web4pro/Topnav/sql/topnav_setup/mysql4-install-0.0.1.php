<?php

$installer = $this;
$installer->startSetup();

$setup = new Mage_Eav_Model_Entity_Setup('core_setup');
 
$entityTypeId     = $setup->getEntityTypeId('catalog_product');
$attributeSetId   = $setup->getDefaultAttributeSetId($entityTypeId);
$attributeGroupId = $setup->getDefaultAttributeGroupId($entityTypeId, $attributeSetId);

$setup->addAttribute('catalog_category', 'nav_menu_new_column_after', array(
		'group'         => 'Additional Nav Menu Settings',
		'input'         => 'select',
		'source'        => 'eav/entity_attribute_source_boolean',
		'type'          => 'int',
		'label'         => 'Nav Menu New Column After',
		'backend'       => '',
		'visible'       => 1,
		'required'      => 0,
		'user_defined'  => 1,
		'default'       => '0',
		'global'        => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_STORE,
));

$setup->addAttributeToGroup($entityTypeId, $attributeSetId, $attributeGroupId, 'nav_menu_new_column_after', '1');

$setup->addAttribute('catalog_category', 'nav_menu_output_link', array(
		'group'         => 'Additional Nav Menu Settings',
		'input'         => 'select',
		'source'        => 'eav/entity_attribute_source_boolean',
		'type'          => 'int',
		'label'         => 'Nav Menu Output Link',
		'backend'       => '',
		'visible'       => 1,
		'required'      => 0,
		'user_defined'  => 1,
		'global'        => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_STORE,
));

$setup->addAttributeToGroup($entityTypeId, $attributeSetId, $attributeGroupId, 'nav_menu_output_link', '2');

$setup->addAttribute('catalog_category', 'nav_menu_additional_item_cls', array(
		'group'         => 'Additional Nav Menu Settings',
		'input'         => 'text',
		'type'          => 'text',
		'label'         => 'Nav Menu Additional Item Classes',
		'backend'       => '',
		'visible'       => 1,
		'required'      => 0,
		'user_defined'  => 1,
		'global'        => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_STORE,
));

$setup->addAttributeToGroup($entityTypeId, $attributeSetId, $attributeGroupId, 'nav_menu_additional_item_cls', '3');

$setup->addAttribute('catalog_category', 'nav_menu_additional_link', array(
		'group'         => 'Additional Nav Menu Settings',
		'input'         => 'text',
		'type'          => 'text',
		'label'         => 'Nav Menu Additional Link',
		'backend'       => '',
		'class'         => 'validate-clean-url',
		'visible'       => 1,
		'required'      => 0,
		'user_defined'  => 1,
		'global'        => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_STORE,
));

$setup->addAttributeToGroup($entityTypeId, $attributeSetId, $attributeGroupId, 'nav_menu_additional_link', '4');

$setup->addAttribute('catalog_category', 'nav_menu_replacement_content', array(
		'group'         => 'Additional Nav Menu Settings',
		'input'         => 'textarea',
		'type'          => 'text',
		'label'         => 'Nav Menu Replacement Content',
		'backend'       => '',
		'visible'       => 1,
		'required'      => 0,
		'user_defined'  => 1,
		'global'        => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_STORE,
));

$setup->addAttributeToGroup($entityTypeId, $attributeSetId, $attributeGroupId, 'nav_menu_replacement_content', '5');

$setup->updateAttribute('catalog_category', 'nav_menu_replacement_content', 'is_wysiwyg_enabled', 1);

$installer->endSetup();