<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Adminhtml_OptionController extends Mage_Adminhtml_Controller_Action {

    public function indexAction(){
        $this->loadLayout();
        $this->renderLayout();
    }

    public function newAction(){
        $this->_forward('edit');
    }

    public function editAction(){
        $option = Mage::getModel('web4pro_4over/option');
        if($id=$this->getRequest()->getParam('id')){
            $option->load($id);
        }
        Mage::register('current_option',$option);
        $this->loadLayout();
        $this->renderLayout();
    }

    public function saveAction(){
       $session = Mage::getSingleton('adminhtml/session');
       try{
           $data = $this->getRequest()->getPost();
           if(!$data){
                Mage::throwException($this->__('No data to save'));
           }
           $option = Mage::getModel('web4pro_4over/option')->load($data['uuid']);
           $option->addData($data);
           $option->save();
           $session->addSuccess($this->__('Option is succesfully saved'));
       }catch(Exception $e){
           Mage::logException($e);
           $option->addError($this->__("Error occurs during saving"));
       }
       $this->_redirect('*/*/');
    }

    public function massDeleteAction()
    {
        $ids = $this->getRequest()->getParam('uuid');
        if (!is_array($ids)) {
            $this->_getSession()->addError($this->__('Please select some banners'));
        }
        else {
            if (!empty($ids)) {
                try {
                    foreach ($ids as $id) {
                        $option = Mage::getModel('web4pro_4over/option')->load($id);
                        $option->delete();
                    }
                    $this->_getSession()->addSuccess($this->__('Total of %d record(s) have been deleted.', count($ids)));
                }
                catch (Exception $e) {
                    $this->_getSession()->addError($e->getMessage());
                }
            }
        }
        $this->_redirect('*/*/index');
    }

    public function downloadAction(){
        try{
            set_time_limit(0);
            Mage::getSingleton('web4pro_4over/option')->updateOptions();
            $this->_getSession()->addSuccess($this->__('Options are successfully downloaded'));
        }catch(Exception $e){
            Mage::logException($e);
            $this->_getSession()->addError($this->__('Unexpected error occurs'));
        }
        $this->_redirect('*/*/');
    }
} 