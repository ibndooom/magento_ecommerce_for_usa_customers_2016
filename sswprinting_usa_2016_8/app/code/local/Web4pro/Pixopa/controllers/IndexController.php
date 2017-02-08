<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 03.07.15
 * Time: 16:45
 */

class Web4pro_Pixopa_IndexController extends Mage_Core_Controller_Front_Action {

    public function downloadAction(){
        $data = $this->getRequest()->getPost();
        $session = Mage::getSingleton('catalog/session');
        if(!isset($data['product_id'])||!isset($data['ftype'])||!isset($data['size'])){
            $session->addError($this->__('Request is invalid'));
        }else{
            if(!in_array($data['ftype'],array('pdf','jpeg'))){
                $session->addError($this->__('File type is invalid'));
            }else{
                $product = Mage::getModel('catalog/product')->getCollection()->addAttributeToSelect('design_example')
                    ->joinTable(array('a'=>'catalog/product_super_link'),'product_id=entity_id',array('parent_id'),
                        'a.parent_id='.(int)$data['product_id'])
                    ->addAttributeToFilter('size',$data['size'])->getFirstItem();
                $file = $product->getDesignExample();
                if(!$file){
                    $session->addError($this->__("Design example isn't found"));
                }else{
                    $file = Mage::getBaseDir('media').DS.'pixopa'.DS.$file;
                    switch($data['ftype']){
                        case 'pdf':
                            if(is_file($file)){
                                $this->_prepareDownloadResponse(basename($file),array('type'=>'filename','value'=>$file));
                            }
                            break;
                        case 'jpeg':
                            $path = pathinfo($file);
                            $f = $path['dirname'].DS.$path['filename'].'.zip';
                            if(is_file($f)){
                                $this->_prepareDownloadResponse(basename($f),file_get_contents($f));
                                $this->getResponse()->sendResponse();
                                exit(0);
                            }
                            $f = $path['dirname'].DS.$path['filename'].'.jpeg';
                            if(is_file($f)){
                                $this->_prepareDownloadResponse(basename($f),array('type'=>'filename','value'=>$file));
                            }
                            break;

                    }
                    $session->addError($this->__("Design example isn't found"));
                }
            }
        }
        $this->_redirectReferer();
    }

} 