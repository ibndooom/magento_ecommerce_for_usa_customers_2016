<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 * Creates the attribute, creates groups inside of them
 */

$installer = $this;

$installer->startSetup();

//product entity type
$entityTypeId = Mage::getModel('catalog/product')
    ->getResource()
    ->getEntityType()
    ->getId();

//get all attribute sets
$sets = Mage::getModel('eav/entity_attribute_set')
    ->getResourceCollection()
    //filter only sets for products - that's why you needed the product type ID
    ->addFilter('entity_type_id', $entityTypeId);

//adding attributes
$attributes = array();
$attributes['product_uuid'] = array(
        'type'                       => 'varchar',
        'label'                      => 'product_uuid',
        'apply_to'                   => Mage_Catalog_Model_Product_Type::TYPE_SIMPLE,
        'required'                   => false,
        'global'                     => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_GLOBAL,
        'visible'                    => 1,
        'required'                   => 0,
        'user_defined'               => 1,
        'is_configurable'            => false
    );
$attributes['turnaroundtime_uuid'] = array(
        'type'                       => 'varchar',
        'label'                      => 'turnaroundtime_uuid',
        'apply_to'                   => Mage_Catalog_Model_Product_Type::TYPE_SIMPLE,
        'required'                   => false,
        'global'                     => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_GLOBAL,
        'visible'                    => 1,
        'required'                   => 0,
        'user_defined'               => 1,
        'is_configurable'            => false
    
    );
$attributes['colorspec_uuid'] = array(
        'type'                       => 'varchar',
        'label'                      => 'colorspec_uuid',
        'apply_to'                   => Mage_Catalog_Model_Product_Type::TYPE_SIMPLE,
        'required'                   => false,
        'global'                     => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_GLOBAL,
        'visible'                    => 1,
        'required'                   => 0,
        'user_defined'               => 1,
        'is_configurable'            => false
    );
foreach ($attributes as $attrCode => $attrConfig) {
    $installer->addAttribute('catalog_product', $attrCode, $attrConfig);
}

//attaching attributes to all available attribute sets and newly created '4over options' in them
foreach ($sets as $set){
    $attributeSetId = $set->getAttributeSetId();
    //create an attribute group instance
    $attributeGroup = Mage::getModel('eav/entity_attribute_group')
        ->setEntityTypeId($entityTypeId)
        ->setAttributeGroupName('4over options')
        //link to the current set
        ->setAttributeSetId($attributeSetId)
        //set the order in the set
        ->setSortOrder(100);
    //save the new group
    $attributeGroup->save();

    $attributeGroupId = $attributeGroup->getAttributeGroupId();
    foreach ($attributes as $attrCode => $attrConfig) {
        $attribute = $installer->getAttribute('catalog_product', $attrCode);
        //add attributes to group
        $installer->addAttributeToSet('catalog_product', $attributeSetId, $attributeGroupId, $attribute['attribute_id']);
    }
}

$installer->endSetup();
