<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 13.07.15
 * Time: 13:53
 */

class Web4pro_Testimonial_Block_Testimonial extends Mage_Core_Block_Template {

    protected $_testimonials;

    protected function _prepareLayout(){
        $this->_testimonials = Mage::getModel('testimonial/testimonial')->getCollection()->addFieldToFilter('status',1)
                                                                        ->setPageSize($this->getPageSize())
                                                                        ->setOrder('sort_order','DESC')
                                                                        ->setOrder('testimonial_id','DESC');
        if($this->getPage()){
            $this->_testimonials->setCurPage($this->getPage());
        }
        return parent::_prepareLayout();
    }

    public function canShow(){
        return $this->_testimonials->getSize()>0;
    }

    public function getTestimonials(){
        return $this->_testimonials;
    }

    protected function _toHtml(){
        if($this->getPage()&&$this->getPage()>$this->_testimonials->getSize())
            return '';
        return parent::_toHtml();
    }

    public function getImageUrl($testimonial){
        $file = Mage::getBaseDir('media').DS.'magebuzz/avatar/'.$testimonial->getAvatarName();
        if(is_file($file)){
            return Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_MEDIA).DS.'magebuzz/avatar/'.$testimonial->getAvatarName();
        }
        return Mage::getDesign()->getSkinUrl('images/img-photo.png');
    }

    public function getTitle(){
        return $this->__('Testimonials');
    }


} 