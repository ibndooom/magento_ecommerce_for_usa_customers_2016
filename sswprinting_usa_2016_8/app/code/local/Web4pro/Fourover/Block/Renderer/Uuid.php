<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Block_Renderer_Uuid extends Varien_Data_Form_Element_Abstract {


    public function getElementHtml(){
        $value = $this->getValue();
        $html = '<div id="uuid_block"></div><input type="hidden" id="option-count-check" value="" />';
        $html.= $this->getAddUuidButton()->toHtml();
        /*if(!is_array($value)){
            $html.='<div>';
            $html ='<div><input name="'.$this->getName().'[0][0][option_label]"/>:';
            $html.= '<input name="'.$this->getName().'[0][0][option_value]"/></div>';
            $html.='</div>';
            $html.= '<div>'.$this->getAddOptionButton()->setData('on_click','return addOption(this,0);')->toHtml().'</div>';
            $html.= '<input id="'.$this->getHtmlId().'" name="'.$this->getName().'[0][uuid]'
                .'" value="'.$this->getEscapedValue().'" '.$this->serialize($this->getHtmlAttributes()).'/>'."\n";
        }else{
            foreach($value as $k=>$v){
                $html.='<div>';
                foreach($v as $k1=>$v1){
                    $html.='<div><input name="'.$this->getName().'['.$k.']['.$k1.'][option_label]" value="'.$v1['option_label'].'"/>:';
                    $html.= '<input name="'.$this->getName().'['.$k.']['.$k1.'][option_value]" value="'.$v1['option_label'].'"/></div>';
                }
                $html.='</div>';
                $html.= '<div>'.$this->getAddOptionButton()->toHtml().'</div>';
                $html.= '<input id="'.$this->getHtmlId().'" name="'.$this->getName().'['.$k.'][uuid]'
                    .'" value="'.$value[$k]['uuid'].'" '.$this->serialize($this->getHtmlAttributes()).'/>'."\n";
            }
        }*/
        $html.= $this->getAfterElementHtml();
        return $html;
    }


    public function getAddOptionButton(){
        $block = Mage::app()->getLayout()->createBlock('adminhtml/widget_button')->setType('button')
                            ->setLabel(Mage::helper('web4pro_4over')->__('Add Option'))->setClass('add-option');
        return $block;
    }

    public function getAfterElementHtml(){
        $html = '<script type="text/javascript">
           var templateUUID = "<div><div><input name=\''.$this->getName().'[{{id}}][0][option_label]\'/>:<input name=\''.$this->getName().'[{{id}}][0][option_value]\'/></div>'.
            str_replace('"','\'',$this->getAddOptionButton()->toHtml())
            .'<input name=\''.$this->getName().'[0][uuid]\'/>'.
            str_replace('"','\'',$this->getRemoveUuidButton()).'</div>";
            var templateOption = "<div><input name=\''.$this->getName().'[{{id}}][{{jd}}][option_label]\'/>:<input name=\''.$this->getName().'[{{id}}][{{jd}}][option_value]\'/></div>";
        </script>';
        $html.= Mage::app()->getLayout()->createBlock('core/template')->setTemplate('web4pro/js.phtml')->toHtml();
        return $html;
    }

    public function getAddUuidButton(){
        $block = Mage::app()->getLayout()->createBlock('adminhtml/widget_button')->setType('button')
                            ->setLabel(Mage::helper('web4pro_4over')->__('Add UUID'))->setId('add_new_option_button');
        return $block;
    }

    public function getRemoveUuidButton(){
        $block = Mage::app()->getLayout()->createBlock('adminhtml/widget_button')->setType('button')
                            ->setLabel(Mage::helper('web4pro_4over')->__('Delete UUID'))->setClass('delete-option');
        return $block->toHtml();
    }
} 