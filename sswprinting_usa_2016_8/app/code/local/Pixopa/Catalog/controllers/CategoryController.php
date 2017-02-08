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
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    Mage
 * @package     Mage_Catalog
 * @copyright   Copyright (c) 2013 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * Category controller
 *
 * @category   Mage
 * @package    Mage_Catalog
 * @author     Magento Core Team <core@magentocommerce.com>
 */

require_once Mage::getModuleDir('controllers', 'Mage_Catalog') . DS . 'CategoryController.php';

class Pixopa_Catalog_CategoryController extends Mage_Catalog_CategoryController
{
    
    /**
     * Category view action
     */
    public function ajaxlistAction()
    {
    	    	
        if ($category = $this->_initCatagory()) {
            $design = Mage::getSingleton('catalog/design');
            $settings = $design->getDesignSettings($category);

            // apply custom design
            if ($settings->getCustomDesign()) {
                $design->applyCustomDesign($settings->getCustomDesign());
            }

            Mage::getSingleton('catalog/session')->setLastViewedCategoryId($category->getId());

            $update = $this->getLayout()->getUpdate();
            $update->addHandle('default');

            if (!$category->hasChildren()) {
                $update->addHandle('catalog_category_layered_nochildren');
            }

            $this->addActionLayoutHandles();
            $update->addHandle($category->getLayoutUpdateHandle());
            $update->addHandle('CATEGORY_' . $category->getId());
            $this->loadLayoutUpdates();

            // apply custom layout update once layout is loaded
            if ($layoutUpdates = $settings->getLayoutUpdates()) {
                if (is_array($layoutUpdates)) {
                    foreach($layoutUpdates as $layoutUpdate) {
                        $update->addUpdate($layoutUpdate);
                    }
                }
            }

            $this->generateLayoutXml()->generateLayoutBlocks();
            // apply custom layout (page) template once the blocks are generated
            if ($settings->getPageLayout()) {
                $this->getLayout()->helper('page/layout')->applyTemplate($settings->getPageLayout());
            }

            if ($root = $this->getLayout()->getBlock('root')) {
                $root->addBodyClass('categorypath-' . $category->getUrlPath())
                    ->addBodyClass('category-' . $category->getUrlKey());
            }

            $this->_initLayoutMessages('catalog/session');
            $this->_initLayoutMessages('checkout/session');
            $this->getLayout()->getBlock('root')->setTemplate('page/empty.phtml');
            $this->getLayout()->getBlock('head')->setData('is_dol', '1');
            $this->renderLayout();
        }
        elseif (!$this->getResponse()->isRedirect()) {
            $this->_forward('noRoute');
        }
    }
    
    public function ajaxlistnavAction()
    {
    	    	 
    	if ($category = $this->_initCatagory()) {
    		$design = Mage::getSingleton('catalog/design');
    		$settings = $design->getDesignSettings($category);
    
    		// apply custom design
    		if ($settings->getCustomDesign()) {
    			$design->applyCustomDesign($settings->getCustomDesign());
    		}
    
    		Mage::getSingleton('catalog/session')->setLastViewedCategoryId($category->getId());
    
    		$update = $this->getLayout()->getUpdate();
    		$update->addHandle('default');
    
    		if (!$category->hasChildren()) {
    			$update->addHandle('catalog_category_layered_nochildren');
    		}
    
    		$this->addActionLayoutHandles();
    		$update->addHandle($category->getLayoutUpdateHandle());
    		$update->addHandle('CATEGORY_' . $category->getId());
    		$this->loadLayoutUpdates();
    
    		$this->generateLayoutXml()->generateLayoutBlocks();
    		echo $this->getLayout()->getBlock('top_nav')->toHtml();
    		
    		/*
    		// apply custom layout (page) template once the blocks are generated
    		if ($settings->getPageLayout()) {
    			$this->getLayout()->helper('page/layout')->applyTemplate($settings->getPageLayout());
    		}
    
    		if ($root = $this->getLayout()->getBlock('root')) {
    			$root->addBodyClass('categorypath-' . $category->getUrlPath())
    			->addBodyClass('category-' . $category->getUrlKey());
    		}
    
    		$this->_initLayoutMessages('catalog/session');
    		$this->_initLayoutMessages('checkout/session');
    		$this->getLayout()->getBlock('root')->setTemplate('page/empty.phtml');
    		$this->getLayout()->getBlock('head')->setData('is_dol', '1');
    		$this->renderLayout();
    		$this->getLayout()->getBlock('head')->setCanLoadExtJs(true);
    		*/
    		
    	}
    	elseif (!$this->getResponse()->isRedirect()) {
    		$this->_forward('noRoute');
    	}
    }
}
