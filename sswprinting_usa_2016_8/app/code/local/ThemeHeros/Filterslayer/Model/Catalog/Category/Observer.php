<?php
/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 */

/**
 * Catalog layer price filter
 *
 * @category   ThemeHeros
 * @package    ThemeHeros_Filterslayer
 * @author     ThemeHeros Developer <soncp@arrowhitech.com>
 */

    class ThemeHeros_Filterslayer_Model_Catalog_Category_Observer
    {
       private $_observer;
       
       public function __construct()
       {
            //nothing to do; 
       }
       public function renderlayout($observer)
       {
           $this->_observer = $observer;
           Mage::app()->getRequest()->isAjax() ? $this->updateTemplate() : $this->isnAjax();
       }
        
       public function getLayout(){
           return  Mage::getSingleton('core/layout');
       }
       
       public function updateTemplate(){
           
           $layout = Mage::getSingleton('core/layout');
           $layout->getBlock('root')->setTemplate('filterslayer/page/wraper.phtml');
       }
        
       public function isnAjax(){
           //nothing to do;
           return true;
       }
    }
?>