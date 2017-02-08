<?php

class Web4pro_Banner_Model_Source_Banners 
    extends Mage_Eav_Model_Entity_Attribute_Source_Abstract
{
    public function getAllOptions($withEmpty = true)
    {
        
        $groups = Mage::getModel('banner/banner')->getCollection()
                    ->addFieldToFilter('is_enabled', 1)
                    ->addFieldToFilter('group_name', 'catalog_tabs')
                    ->setOrder('title', 'ASC');
        
        $collectionArray = array();
        foreach($groups as $groupName => $groupData) {
            $collectionArray[] = array(
                'label' => $groupData['title'],
                'value' => $groupData['banner_id']
            );
        }
        return $collectionArray;
    }
   
}
