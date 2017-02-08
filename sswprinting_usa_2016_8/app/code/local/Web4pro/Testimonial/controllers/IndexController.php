<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 13.07.15
 * Time: 14:36
 */

class Web4pro_Testimonial_IndexController extends Mage_Core_Controller_Front_Action {

    public function indexAction(){
        $result = '';
        if($page = $this->getRequest()->getPost('page')){
            $result = $this->getLayout()->createBlock('web4pro_testimonial/testimonial')->setPageSize(1)->setPage($page)
                           ->setTemplate('web4pro/testimonial/child.phtml')->toHtml();
        }
        $this->getResponse()->setBody($result);
    }
} 