<?php

class Web4pro_Banner_Model_Observer 
{
    
    public function web4pro_banner_save_after($observer) 
    {
        $banner = $observer->getEvent()->getBanner();        
        if($banner->getCategoryIds()){
            if(!is_array($banner->getCategoryIds())){
                $categoryIds = explode(',', $banner->getCategoryIds());
            }else{
                $categoryIds = $banner->getCategoryIds();
            }            
            $this->_saveLinkedCategories($banner, $categoryIds);
        }
        return $this;
    }
    
    protected function _saveLinkedCategories($banner, $categoryIds)
    {
        $tableName = $banner->getResource()->getTable('banner/catalog_category');        
        Mage::helper('banner')->getWriteConnection()->delete($tableName, array(
            'banner_id =?'      => $banner->getId()
        ));
        foreach ($categoryIds as $categoryId) {
            $tableData[] = array(
                'banner_id'     => $banner->getId(),                
                'category_id'   => $categoryId,
            );
        }
        Mage::helper('banner')
            ->getWriteConnection()
            ->insertOnDuplicate($tableName, $tableData, array('category_id'));
        return $this;
    }
}
