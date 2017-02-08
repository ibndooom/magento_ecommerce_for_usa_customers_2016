<?php
class Web4pro_Customermenu_Model_Observer {

	/**
	 * customer menu building, only 'account', 'account_edit', 'address_book', 'orders' menu items
	 *
	 * @param unknown $observer
	 */
	public function checkMenu($observer) {
		$block = $observer->getBlock( );
		$name = $block->getNameInLayout( );
		$linksArray = array (
				'account',
				'account_edit',
				'address_book',
				'orders'
		);
		$arr = array ();
		if ($name === 'customer_account_navigation') {
			foreach ($block->getLinks( ) as $k => $val) {
				if (in_array($k, $linksArray)) {
					$arr[$k] = $val;
				}
			}
		}
		$block->setLinks($arr);
	}

	/**
	 * user menu left block only customer_account_navigation
	 * @param unknown $observer
	 */
	public function checkLeftMenu($observer){
	    $block = $observer->getBlock();
	    $name = $block->getNameInLayout();
	    $blocks = array (
	        'cart_sidebar',
	        'reorder'
	    );
	    if ($name == 'left') {
	       foreach($blocks as $alias){
	           $block->unsetChild($alias);
	       }
	    }

	}

	/**
	 * breadcrumbs for user account information
	 * @param unknown $observer
	 */

	public function addBreadcrumbs($observer){
	    if($observer->getBlock() instanceof Mage_Customer_Block_Form_Register){
	        $block = $observer->getBlock()->getLayout()->getBlock('breadcrumbs');
	        $block->addCrumb('home',array('label'=>Mage::helper('cms')->__('Home'), 'title'=>Mage::helper('cms')->__('Go to Home Page'), 'link'=>Mage::getBaseUrl()));
	        $block->addCrumb('registration', array('label'=>Mage::helper('cms')->__('Registration'), 'title'=>Mage::helper('cms')->__('Registration')));
	    }
	    if($observer->getBlock() instanceof Mage_Customer_Block_Account_Dashboard
	        || $observer->getBlock() instanceof Mage_Customer_Block_Address_Book
	        || $observer->getBlock() instanceof Mage_Customer_Block_Address_Edit
	        || $observer->getBlock() instanceof Mage_Sales_Block_Order_View
            || $observer->getBlock() instanceof Web4pro_Orderdetails_Block_Reorder_Center){
	        $block = $observer->getBlock()->getLayout()->getBlock('breadcrumbs');
	        $block->addCrumb('home',array('label'=>Mage::helper('cms')->__('Home'), 'title'=>Mage::helper('cms')->__('Go to Home Page'), 'link'=>Mage::getBaseUrl()));
	        $block->addCrumb('myaccount', array('label'=>Mage::helper('cms')->__('My Account'), 'title'=>Mage::helper('cms')->__('My Account')));
	    }
        if($observer->getBlock() instanceof Mage_CatalogSearch_Block_Result){
            $breadcrumbs = $observer->getBlock()->getLayout()->getBlock('breadcrumbs');
            $breadcrumbs->addCrumb('search', array(
                'label' => Mage::helper('cms')->__('Search Result'),
                'title' => Mage::helper('cms')->__('Search Result'),
                'readonly' => true
            ));
        }
        if($observer->getBlock() instanceof IWD_Opc_Block_Onepage_Shipping){
            $block = $observer->getBlock()->getLayout()->getBlock('breadcrumbs');
            $block->addCrumb('home',array('label'=>Mage::helper('cms')->__('Home'), 'title'=>Mage::helper('cms')->__('Go to Home Page'), 'link'=>Mage::getBaseUrl()));
            $block->addCrumb('myaccount', array('label'=>Mage::helper('cms')->__('Checkout'), 'title'=>Mage::helper('cms')->__('Checkout')));
        }
        if($observer->getBlock()->getNameInLayout() == "contactForm"){
            $block = $observer->getBlock()->getLayout()->getBlock('breadcrumbs');
            $block->addCrumb('home',array('label'=>Mage::helper('cms')->__('Home'), 'title'=>Mage::helper('cms')->__('Go to Home Page'), 'link'=>Mage::getBaseUrl()));
            $block->addCrumb('contact_us', array('label'=>Mage::helper('cms')->__('Contact Us'), 'title'=>Mage::helper('cms')->__('Contact Us')));
        }
	}
}
