<?php
require_once Mage::getModuleDir('controllers', 'Mage_Customer') . DS . 'AccountController.php';

class Pixopa_Customer_AccountController extends Mage_Customer_AccountController
{
	
	
	/**
     * Login post action
     */
    public function loginPostAction()
    {
    	Mage::log('Heress loginPostAction ');
    	
        if ($this->_getSession()->isLoggedIn()) {
        	Mage::helper('customer')->assignCartDesignsToCustomer();
            $this->_redirect('*/*/');
            return;
        }
        $session = $this->_getSession();

        if ($this->getRequest()->isPost()) {
            $login = $this->getRequest()->getPost('login');
            if (!empty($login['username']) && !empty($login['password'])) {
                try {
                    $session->login($login['username'], $login['password']);
                    if ($session->getCustomer()->getIsJustConfirmed()) {
                        $this->_welcomeCustomer($session->getCustomer(), true);
                    }
                    Mage::helper('customer')->assignCartDesignsToCustomer();
                } catch (Mage_Core_Exception $e) {
                    switch ($e->getCode()) {
                        case Mage_Customer_Model_Customer::EXCEPTION_EMAIL_NOT_CONFIRMED:
                            $value = Mage::helper('customer')->getEmailConfirmationUrl($login['username']);
                            $message = Mage::helper('customer')->__('This account is not confirmed. <a href="%s">Click here</a> to resend confirmation email.', $value);
                            break;
                        case Mage_Customer_Model_Customer::EXCEPTION_INVALID_EMAIL_OR_PASSWORD:
                            $message = $e->getMessage();
                            break;
                        default:
                            $message = $e->getMessage();
                    }
                    $session->addError($message);
                    $session->setUsername($login['username']);
                } catch (Exception $e) {
                    // Mage::logException($e); // PA DSS violation: this exception log can disclose customer password
                }
            } else {
                $session->addError($this->__('Login and password are required.'));
            }
        }

        $this->_loginPostRedirect();
    }
    
    
	public function ajaxLogoutAction()
    {
        $this->_getSession()->logout()
            ->setBeforeAuthUrl(Mage::getUrl());

        echo 'success';
    }
    
    
}
