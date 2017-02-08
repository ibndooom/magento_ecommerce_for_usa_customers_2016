<?php

class Web4pro_Banner_Block_Adminhtml_Banner_Edit_Tab_Category extends Web4pro_Article_Block_Adminhtml_Article_Edit_Tab_Category
{
    public function getBanner()
    {
        return Mage::registry('current_banner');
    }

    protected function getCategoryIds()
    {
        if($this->getBanner()->getId() === null){
            return '';
        }
        return $this->getBanner()->getLinkedCategories()->getAllIds();
    }

}
