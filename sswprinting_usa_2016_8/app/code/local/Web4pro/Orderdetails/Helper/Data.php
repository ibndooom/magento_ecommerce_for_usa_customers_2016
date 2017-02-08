<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 22.06.15
 * Time: 12:43
 */

class Web4pro_Orderdetails_Helper_Data extends Mage_Core_Helper_Abstract {

    public function getChildBlock()
    {
        $layout = Mage::getSingleton('core/layout');
        $child = $layout->getBlock('order_items')
            ->setTitle('Orders Information')
            ->setTemplate('web4pro/orderdetails/order/items.phtml')
            ->addItemRender('default', 'orderdetails/order_item_renderer_default','web4pro/orderdetails/order/items/renderer/default.phtml');
        return $child;
    }
} 