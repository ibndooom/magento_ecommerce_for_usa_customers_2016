<?php

class Web4pro_Banner_Model_Source_Topbanner 
    extends Web4pro_Banner_Model_Source_Abstract
{   
    protected function _getCollectionArray() {
        $groups = Mage::getModel('banner/banner')->getCollection()
                    ->addFieldToFilter('is_enabled', 1)
                    ->addFieldToFilter('group_name', 'under_breadcrumb_multi')
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
