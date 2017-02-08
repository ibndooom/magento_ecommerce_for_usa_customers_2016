<?php
$installer = $this;
$installer->startSetup();
 
$setup = new Mage_Eav_Model_Entity_Setup('core_setup');
 
$entityTypeId     = $setup->getEntityTypeId('catalog_product');
$attributeSetId   = $setup->getDefaultAttributeSetId($entityTypeId);
$attributeGroupId = $setup->getDefaultAttributeGroupId($entityTypeId, $attributeSetId);
 
$setup->addAttribute('catalog_category', 'include_in_home_page', array(
    'type' => 'int',
    'group'     => 'General Information',
    'backend' => '',
    'frontend' => '',
    'label' => 'Include in Home Page',
    'input' => 'select',
    'class' => '',
    'source' => 'eav/entity_attribute_source_boolean',
    'global' => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_GLOBAL,
    'visible' => true,
    'required' => true,
    'user_defined' => false,
    'default' => '0',
    'searchable' => false,
    'filterable' => false,
    'comparable' => false,
    'visible_on_front' => false,
    'unique' => false,
));
 
$setup->addAttributeToGroup(
    $entityTypeId,
    $attributeSetId,
    $attributeGroupId,
    'include_in_home_page',
    '11'
);
 
$installer->endSetup();

?>