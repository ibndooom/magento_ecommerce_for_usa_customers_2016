<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 24.06.15
 * Time: 17:43
 */

class Web4pro_Pixopa_Block_Category extends Mage_Core_Block_Template {

    public function getSizeAttribute(){
        $attribute = Mage::getModel('eav/entity_attribute')->loadByCode('catalog_product','size');
        return $attribute;
    }

    public function canShow(){
        $product_id = Mage::registry('product_id');
        return $product_id;
    }

    public function getCategory(){
        return Mage::registry('current_category');
    }
} 