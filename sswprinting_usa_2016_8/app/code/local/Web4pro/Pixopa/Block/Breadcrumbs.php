<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 27.07.15
 * Time: 17:17
 */

class Web4pro_Pixopa_Block_Breadcrumbs extends Mage_Catalog_Block_Breadcrumbs {

    protected function _prepareLayout(){
        if($pid = $this->getRequest()->getPost('pid')){
            $product = Mage::getModel('catalog/product')->load($pid);
            Mage::register('current_product',$product);
        }else{
            if($pid = $this->getRequest()->getPost('cpid')){
                $product = Mage::getModel('catalog/product')->load($pid);
                Mage::register('current_product',$product);
            }else{
                if($design_id = $this->getRequest()->getParam('design_id')){
                    $design = Mage::getModel('template/customerdesign')->load($design_id);
                    $product = Mage::getModel('catalog/product')->load($design->getProductId());
                    Mage::register('current_product',$product);
                }
            }
         }
        return parent::_prepareLayout();
    }
} 