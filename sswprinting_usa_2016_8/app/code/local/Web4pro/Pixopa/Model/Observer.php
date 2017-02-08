<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Pixopa
 */

class Web4pro_Pixopa_Model_Observer {
    /**
     * Switches catagory page layout handles to display product list or design configuration dialog 
     */
    public function updateLayout(Varien_Event_Observer $observer)
    {
        if($action = $observer->getEvent()->getAction()){
            if($action->getFullActionName() =='catalog_category_view'){
                $category = Mage::registry('current_category');
                if($category->getDesignCategory()){
                    Mage::helper('web4pro_pixopa')->processCategoryPage($category);
                    $update = $observer->getEvent()->getLayout()->getUpdate();
                    $product_ids=explode('|',$action->getRequest()->getParam('productIds'));
                    $show_designs = true;
                    $topic_id = $action->getRequest()->getParam('tid');
                    if(!$topic_id){
                        $topic_id = $action->getRequest()->getParam('tid1');
                    }
                    if(!$topic_id&&$product_ids&&count($product_ids)==1)
                        $show_designs=false;

                    if(($sid = Mage::app()->getRequest()->getParam('sid'))||$show_designs){
                        $update->addHandle('web4pro_pixopa_designs');
                    }else{
                        $update->addHandle('web4pro_pixopa_category');
                    }
                }
            }
        }
    }

    /**
     * Limits printed/design products qty to 1.
     * Observes 'checkout_cart_save_before'
     */
    public function limitDesignProductQty(Varien_Event_Observer $observer)
    {
        $cart = $observer->getCart();
        $session = $cart->getCheckoutSession();
        $messageFactory = Mage::getSingleton('core/message');

        foreach ($cart->getItems() as $item) {
            $request = $item->getBuyRequest();
            if ((int)$request->getDesignId() && $item->getQty() > 1) {
                $item->setQty(1);
                $message = $messageFactory->warning(Mage::helper('checkout')->__('Printed product\'s quantity can be set only via its \'Quantity\' option'));
                $session->addQuoteItemMessage($item->getId(), $message);
            }
        }
    }

    /**
     * Observes 'checkout_cart_save_before'
     * @param Varien_Event_Observer $observer
     */
    public function checkItemPrice(Varien_Event_Observer $observer) {
        $cart = $observer->getCart();
        foreach($cart->getItems() as $item) {
            $request = $item->getBuyRequest();
            $price = Mage::app()->getStore()->roundPrice($item->getPrice());
            if($request->getDesignId() && $price == 0) {
                $cart->removeItem($item->getId());
                $message = Mage::helper('checkout')->__('The configuration can\'t be requested(no pricing)');
                Mage::getSingleton('core/session')->addError($message);
                Mage::app()->getResponse()->setRedirect($this->getRedirectUrl());
            }
        }
    }

    /**
     * @return string
     */
    protected function getRedirectUrl() {
        if($this->getAction() == 'web4procheckout_cart_updateItem') {
            return Mage::getUrl('checkout/cart/');
        } else {
            return Mage::getBaseUrl();
        }
    }

    /**
     * @return mixed
     */
    protected function getAction() {
        return Mage::app()->getFrontController()->getAction()->getFullActionName();
    }

} 