<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Adminhtml_ProductController extends Mage_Adminhtml_Controller_Action {
    public function indexAction()
    {
        $this->loadLayout();
        $this->renderLayout();
    }

    public function optionsAction()
    {
        $this->_initProduct();
        $this->loadLayout();
        $this->renderLayout();
        //$block = $this->getLayout()->createBlock('web4pro_4over/product_options');
        //$this->getResponse()->setBody($block->toHtml());
    }

    protected function _initProduct()
    {
        $productUuid = $this->getRequest()->getParam('id');
        $_product = Mage::getModel('web4pro_4over/product')->load($productUuid);
        if ($_product->getId()) {
            Mage::register('fover_product', $_product);
        }
    }

    public function downloadAction(){
        try{
            set_time_limit(0);
            Mage::getSingleton('web4pro_4over/product')->updateProducts();
            $this->_getSession()->addSuccess($this->__('Products are successfully downloaded'));
        }catch(Exception $e){
            Mage::logException($e);
            $this->_getSession()->addError($this->__('Unexpected error occurs'));
        }
        $this->_redirect('*/*/');
    }

    protected function _isAllowed()
    {
        return Mage::getSingleton('admin/session')->isAllowed('fourover');
    }
} 