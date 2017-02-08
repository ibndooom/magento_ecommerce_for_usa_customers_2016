<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 24.06.15
 * Time: 12:10
 */

$installer = $this;
$installer->startSetup();

$setup = new Mage_Catalog_Model_Resource_Setup('core_setup');

$setup->addAttribute('catalog_category','design_category',array(
    'group'=>'General Information',
    'input'=> 'select',
    'type' => 'int',
    'source'=>'eav/entity_attribute_source_boolean',
    'label' => 'Design Category',
    'visible'=> 1,
    'required'=> 1,
    'user_defined'=> 1,
    'frontend_input'=> '',
    'global'        => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_GLOBAL,
    'visible_on_front'=> 1,
    'default'         => 0,
    'sort_order'=>110
));

$installer->endSetup();