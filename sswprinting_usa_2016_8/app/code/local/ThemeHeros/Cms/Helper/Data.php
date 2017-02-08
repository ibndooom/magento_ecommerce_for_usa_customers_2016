<?php

/**
 * Created by ThemeHeros.
 * @author Sergey Gozhedrianov
 */
class ThemeHeros_Cms_Helper_Data extends Mage_Core_Helper_Abstract
{

    public function isAdmin()
    {
        if (Mage::app()->getStore()->isAdmin()) {
            return true;
        }

        if (Mage::app()->getRequest()->getModuleName() == 'adminhtml') {
            return true;
        }

        return false;
    }

}