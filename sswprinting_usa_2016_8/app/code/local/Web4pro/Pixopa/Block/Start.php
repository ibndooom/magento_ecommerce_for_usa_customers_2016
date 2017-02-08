<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 03.07.15
 * Time: 16:12
 */

class Web4pro_Pixopa_Block_Start extends Mage_Core_Block_Template {

    public function getTitle(){
        return $this->__('Start File');
    }

    public function canShow(){
        return true;
    }

    public function getFileTypeSelect(){
        $options = array(array('value'=>'pdf','label'=>$this->__('PDF Document')),
                         array('value'=>'jpeg','label'=>$this->__('JPEG Images')));
        return $this->getLayout()->createBlock('core/html_select')->setName('ftype')->setId('ftype')->setClass('ftype')
                    ->setOptions($options)->toHtml();

    }
} 