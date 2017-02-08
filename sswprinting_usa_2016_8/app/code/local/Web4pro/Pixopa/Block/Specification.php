<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 25.06.15
 * Time: 14:25
 */

class Web4pro_Pixopa_Block_Specification extends Mage_Core_Block_Template {

    public function canShow(){
        $product = Mage::getModel('catalog/product')->load(Mage::registry('product_id'));
        $this->setSpecification($product->getSpecification());
        return strlen($this->getSpecification());
    }

    public function getTitle(){
        return $this->__('Specification');
    }
} 