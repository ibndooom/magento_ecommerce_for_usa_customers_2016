<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Adminhtml_OrderController extends Mage_Adminhtml_Controller_Action
{
    /**
     * Unlocks 4over order so it can be posted again
     */
    public function unlockAction()
    {
        $orderId = $this->getRequest()->getParam('order_id');
        $foverOrder = Mage::getModel('web4pro_4over/order')->load($orderId);
        if ($foverOrder->getId()) {
            $foverOrder->setProcessedFlag(Web4pro_Fourover_Model_Api::ORDER_UNLOCKED);
            try {
                $foverOrder->save();
                $this->_getSession()->addSuccess(Mage::helper('web4pro_4over')->__('Order\'s been unlocked for posting to 4over'));
            } catch (Exception $e) {
                $this->_getSession()->addError(Mage::helper('web4pro_4over')->__('Order hasn\'t been unlocked for posting to 4over'));
            }
        }

        $this->_redirectReferer();
    }
} 