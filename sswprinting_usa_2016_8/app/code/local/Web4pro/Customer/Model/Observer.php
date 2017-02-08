<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Customer
 */
class Web4pro_Customer_Model_Observer {
    /**
     * Redirects to refferer due to themeheros -> business-cards-theme uses login popup only
     */
    public function redirectReferer($observer)
    {
        $controller = $observer->getControllerAction();
        $design = Mage::getDesign();
        $themes = array('themeheros_business-cards-theme');

        if (!is_object($design)) return;        
        $_theme = $design->getPackageName() . '_' . $design->getTheme('layout');
        if (!in_array($_theme, $themes)) return;
        
        //getting referer URL
        $refererUrl = $controller->getRequest()->getServer('HTTP_REFERER');
        if ($url = $controller->getRequest()->getParam(Mage_Core_Controller_Varien_Action::PARAM_NAME_REFERER_URL)) {
            $refererUrl = $url;
        }
        if ($url = $controller->getRequest()->getParam(Mage_Core_Controller_Varien_Action::PARAM_NAME_BASE64_URL)) {
            $refererUrl = Mage::helper('core')->urlDecodeAndEscape($url);
        }
        if ($url = $controller->getRequest()->getParam(Mage_Core_Controller_Varien_Action::PARAM_NAME_URL_ENCODED)) {
            $refererUrl = Mage::helper('core')->urlDecodeAndEscape($url);
        }

        if (!$this->_isUrlInternal($refererUrl)) {
            $refererUrl = Mage::app()->getStore()->getBaseUrl();
        }

        //adding customer messages to core session
        $messages = Mage::getSingleton('customer/session')->getMessages(true)->getItems();
        $session = Mage::getSingleton('core/session');
        foreach ($messages as $message) {
            $session->addMessage($message);
        }

        $controller->getResponse()->setRedirect($refererUrl);
    }

    /** 
     * Copies _isUrlInternal method from Mage_Core_Controller_Varien_Action class
     */
    protected function _isUrlInternal($url)
    {
        if (strpos($url, 'http') !== false) {
            /**
             * Url must start from base secure or base unsecure url
             */
            if ((strpos($url, Mage::app()->getStore()->getBaseUrl()) === 0)
                || (strpos($url, Mage::app()->getStore()->getBaseUrl(Mage_Core_Model_Store::URL_TYPE_LINK, true)) === 0)
            ) {
                return true;
            }
        }
        return false;
    }
}
