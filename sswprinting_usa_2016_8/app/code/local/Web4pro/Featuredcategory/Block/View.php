<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 22.06.15
 * Time: 16:16
 */

class Web4pro_Featuredcategory_Block_View extends Mage_Core_Block_Template {

    public function getCategories(){
        if(!$this->getData('categories')){
            $categories = Mage::getModel('catalog/category')->getCollection()->addAttributeToFilter('featured',1)
                                             ->setPageSize(Mage::getStoreConfig('featured/general/categories_in_block'))
                                             ->addAttributeToSelect('*');
            $this->setCategories($categories);
        }
        return $this->getData('categories');
    }

    public function canShow(){
       return $this->getCategories()->getSize()>0;
    }
} 