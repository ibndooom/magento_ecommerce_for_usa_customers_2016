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

class ThemeHeros_Filterslayer_IndexController extends Mage_Core_Controller_Front_Action
{
    public function indexAction()
    {
    	
    	/*
    	 * Load an object by id 
    	 * Request looking like:
    	 * http://site.com/filterslayer?id=15 
    	 *  or
    	 * http://site.com/filterslayer/id/15 	
    	 */
    	/* 
		$filterslayer_id = $this->getRequest()->getParam('id');

  		if($filterslayer_id != null && $filterslayer_id != '')	{
			$filterslayer = Mage::getModel('filterslayer/filterslayer')->load($filterslayer_id)->getData();
		} else {
			$filterslayer = null;
		}	
		*/
		
		 /*
    	 * If no param we load a the last created item
    	 */ 
    	/*
    	if($filterslayer == null) {
			$resource = Mage::getSingleton('core/resource');
			$read= $resource->getConnection('core_read');
			$filterslayerTable = $resource->getTableName('filterslayer');
			
			$select = $read->select()
			   ->from($filterslayerTable,array('filterslayer_id','title','content','status'))
			   ->where('status',1)
			   ->order('created_time DESC') ;
			   
			$filterslayer = $read->fetchRow($select);
		}
		Mage::register('filterslayer', $filterslayer);
		*/

			
		$this->loadLayout();     
		$this->renderLayout();
    }
}