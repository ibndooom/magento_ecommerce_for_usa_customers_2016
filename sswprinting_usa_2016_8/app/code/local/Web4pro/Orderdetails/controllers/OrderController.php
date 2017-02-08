<?php
/**
 * Created by PhpStorm.
 * User: liliia
 * Date: 16.07.15
 * Time: 17:37
 */
require_once Mage::getModuleDir('controllers', 'Mage_Sales') . DS . 'OrderController.php';

class Web4pro_Orderdetails_OrderController extends Mage_Sales_OrderController
{

    /**
     * add order's items to quote
     */
    public function reorderAction()
    {
        $this->initLayoutMessages('core/session');
        $post = $this->getRequest()->getParam('order_items');
        if(empty($post)){
            Mage::getSingleton('core/session')->addError(Mage::helper('orderdetails')->__('Cannot reorder the item(s). You don\'t select anything.'));
            return $this->_redirectReferer('*/*');

        }

        if (!$this->_loadValidOrder()) {
            return;
        }

        $order = Mage::registry('current_order');

        $cart = Mage::getSingleton('checkout/cart');
        $quote = $cart->getQuote();

        $cartTruncated = false;


        foreach ($post as $itemId) {
            $item = $order->getItemsCollection()->getItemById($itemId);

            //add items to quote
            try {
                /* @var $cart Mage_Checkout_Model_Cart */
                $cart->addOrderItem($item);


            } catch (Mage_Core_Exception $e) {
                if (Mage::getSingleton('checkout/session')->getUseNotice(true)) {
                    Mage::getSingleton('checkout/session')->addNotice($e->getMessage());
                } else {
                    Mage::getSingleton('checkout/session')->addError($e->getMessage());
                }
                $this->_redirect('*/*/history');
            } catch (Exception $e) {
                Mage::getSingleton('checkout/session')->addException($e,
                    Mage::helper('checkout')->__('Cannot add the item to shopping cart.')
                );
                $this->_redirect('checkout/cart');
            }
        }
       //get all quote items
        foreach($quote->getAllItems()as $quoteItem){
            if(!$quoteItem->getId()){

            //change design_id for new quote item
            $design = Mage::getModel('template/customerdesign')->load($quoteItem->getOptionByCode('design_id')->getValue());
            if($design->getId()){
                $newDesign = clone $design;
                $newDesign->setId(null)->save();
                $quoteItem->getOptionByCode('design_id')->setValue($newDesign->getId());
                $infoBuyRequest = $quoteItem->getOptionByCode('info_buyRequest');
                $val = unserialize($infoBuyRequest->getValue());
                $val['design_id'] = $newDesign->getId();
                $infoBuyRequest->setValue(serialize($val));
            }
            $cart->getQuote()->addItem($quoteItem);
            $cart->getQuote()->collectTotals();

            }
        }

        $cart->save();
        $this->_redirect('checkout/cart');
    }

    /**
     * init reorder pages
     */
    public function reorderPageAction()
    {
        if (!$this->_loadValidOrder()) {
            return;
        }

        $this->loadLayout();
        $this->_initLayoutMessages('catalog/session');

        $navigationBlock = $this->getLayout()->getBlock('customer_account_navigation');
        if ($navigationBlock) {
            $navigationBlock->setActive('sales/order/history');
        }
        $this->renderLayout();
    }
}