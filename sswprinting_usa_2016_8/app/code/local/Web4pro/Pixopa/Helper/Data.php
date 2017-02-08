<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 24.06.15
 * Time: 11:59
 */

class Web4pro_Pixopa_Helper_Data extends Mage_Core_Helper_Abstract {

    const categoryVar = 'catData';

    public function getOptionsWithTemplate($options){
        $result = array();
        $optionIds = array_keys($options);
        $optionsLeft = $options;
        $groups = Mage::getModel('catalog/product_option')->getCollection();
        $groups->addFieldToFilter('main_table.option_id',array('in'=>$optionIds))
               ->join(array('r'=>'customoptions/relation'),'r.option_id=main_table.option_id',array('r.group_id'))
               ->setOrder('r.group_id','ASC');

        $groups->getSelect()
               ->join(array('g'=>$groups->getTable('customoptions/group')),'r.group_id=g.group_id','g.title as title');

        foreach($groups as $group){
            if(!isset($result[$group->getGroupId()])){
                $result[$group->getGroupId()]=array('title'=>$group->getTitle(),'options'=>array());
            }
            $result[$group->getGroupId()]['options'][$group->getOptionId()]=$options[$group->getOptionId()];
            unset($optionsLeft[$group->getOptionId()]);
        }
        if(count($optionsLeft)){
            $result['empty_group']['options']=$optionsLeft;
        }
        return $result;
    }

    public function processCategoryPage($category){
        if($post = $this->_getRequest()->getPost()){
            Mage::getSingleton('catalog/session')->setData(self::categoryVar.'_'.$category->getId(),$post);
        } else{
            if(!$this->_getRequest()->getParam('sid')){
                Mage::getSingleton('catalog/session')->setData(self::categoryVar.'_'.$category->getId(),array());
            }
        }
        return $this;
    }

    public function getCategoryAdvancedData($category){
        return Mage::getSingleton('catalog/session')->getData(self::categoryVar.'_'.$category->getId());
    }
} 