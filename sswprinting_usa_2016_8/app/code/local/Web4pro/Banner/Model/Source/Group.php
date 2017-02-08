<?php
class Web4pro_Banner_Model_Source_Group
    extends Web4pro_Banner_Model_Source_Abstract
{
    protected $_filterByEnabled = false;
    
    protected function _getCollectionArray()
    {
        $groups = Mage::helper('banner')->getConfigGroupsArray();               
        $collectionArray = array();
        foreach($groups as $groupName => $groupData){
            if($this->_filterByEnabled && !$groupData['enabled']){
                continue;
            }
            $collectionArray[] = array(
                'label' => $groupData['label'],
                'value' => $groupName,
            );
        }
        return $collectionArray;
    }
    
    public function filterByEnabled()
    {
        $this->_filterByEnabled = true;
        return $this;
    } 
    
}
