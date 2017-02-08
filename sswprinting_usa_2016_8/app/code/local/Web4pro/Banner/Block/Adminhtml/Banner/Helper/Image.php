<?php
/**
 * @category    Fishpig
 * @package     Fishpig_iBanners
 * @license     http://fishpig.co.uk/license.txt
 * @author      Ben Tideswell <help@fishpig.co.uk>
 */

class Web4pro_Banner_Block_Adminhtml_Banner_Helper_Image extends Varien_Data_Form_Element_Image
{
    protected function _getUrl()
    {
        if ($this->getValue() && !is_array($this->getValue())) {
            return Mage::helper('banner/image')->getImageUrl($this->getValue());
        }
        
        return null;
    }
}