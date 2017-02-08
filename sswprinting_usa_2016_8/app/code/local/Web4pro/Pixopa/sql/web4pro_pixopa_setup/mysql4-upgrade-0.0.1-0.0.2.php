<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 03.07.15
 * Time: 12:14
 */


$installer = $this;
$installer->startSetup();

$setup = new Mage_Catalog_Model_Resource_Setup('core_setup');

$setup->addAttribute('catalog_product','design_example',array(
    'group'=>'Pixopa Attributes',
    'input'=> 'file',
    'type' => 'varchar',
    'backend'=>'web4pro_pixopa/backend_example',
    'input_renderer'=>'web4pro_pixopa/design_renderer',
    'label' => 'Design Example',
    'visible'=> 1,
    'required'=> 0,
    'user_defined'=> 0,
    'system'=>1,
    'frontend_input'=> '',
    'global'        => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_GLOBAL,
    'visible_on_front'=> 1,
    'default'         => 0,
    'sort_order'=>200
));

$installer->endSetup();