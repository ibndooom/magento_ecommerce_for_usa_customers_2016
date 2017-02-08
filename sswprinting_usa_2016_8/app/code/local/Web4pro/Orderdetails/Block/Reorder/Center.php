<?php
/**
 * Created by PhpStorm.
 * User: liliia
 * Date: 17.07.15
 * Time: 11:55
 */

class Web4pro_Orderdetails_Block_Reorder_Center extends Mage_Core_Block_Template
{
    protected function _construct()
    {
        parent::_construct();
        $this->setTemplate('web4pro/orderdetails/center.phtml');
    }


     public function getFormAction($order){
         return $this->getUrl('*/*/reorder',array('order_id'=>$order->getId()));
     }

    /**
     * Retrieve current order model instance
     *
     * @return Mage_Sales_Model_Order
     */
    public function getOrder()
    {
        return Mage::registry('current_order');
    }

    /**
     * Return back url for logged in and guest users
     *
     * @return string
     */
    public function getBackUrl()
    {
        if (Mage::getSingleton('customer/session')->isLoggedIn()) {
            return Mage::getUrl('*/*/history');
        }
        return Mage::getUrl('*/*/form');
    }

    /**
     * Return back title for logged in and guest users
     *
     * @return string
     */
    public function getBackTitle()
    {
        if (Mage::getSingleton('customer/session')->isLoggedIn()) {
            return Mage::helper('sales')->__('Back');
        }
        return Mage::helper('sales')->__('View Another Order');
    }

}