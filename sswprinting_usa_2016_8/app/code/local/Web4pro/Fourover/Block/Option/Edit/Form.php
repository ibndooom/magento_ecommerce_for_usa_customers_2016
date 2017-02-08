<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 12.08.15
 * Time: 13:24
 */

class Web4pro_Fourover_Block_Option_Edit_Form extends Mage_Adminhtml_Block_Widget_Form {

    protected function _prepareForm(){
        $option = Mage::registry('current_option');
        $form = new Varien_Data_Form(
            array(
                'id' => 'edit_form',
                'action' => $this->getUrl('*/*/save', array('id' => $this->getRequest()->getParam('id'))),
                'method' => 'post',
                'enctype' => 'multipart/form-data'
            )
        );

        $fieldset = $form->addFieldset('option', array('legend'=> $this->__('General Information')));
        $this->_addElementTypes($fieldset);
        if(!$option->getId()){
            $fieldset->addField('uuid', 'text', array(
			    'name' 		=> 'uuid',
			    'label' 	=> $this->__('UUID'),
			    'title' 	=> $this->__('UUID'),
			    'required'	=> true,
			    'class'		=> 'required-entry',
		    ));
        }else{
            $fieldset->addField('uuid', 'hidden', array(
                'name' 		=> 'uuid',
                'label' 	=> $this->__('UUID'),
                'title' 	=> $this->__('UUID'),
                'required'	=> true,
                'class'		=> 'required-entry',
            ));
        }

        $fieldset->addField('value','text',array(
            'name' 		=> 'value',
            'label' 	=> $this->__('Value'),
            'title' 	=> $this->__('Value'),
            'required'	=> true,
            'class'		=> 'required-entry',
        ));

        $fieldset->addField('type','select',array(
            'name' 		=> 'type',
            'label' 	=> $this->__('Type'),
            'title' 	=> $this->__('Type'),
            'required'	=> true,
            'class'		=> 'required-entry',
            'options'   => $option->toOptionArray()
        ));
        $form->setValues($option->getData());
        $form->setUseContainer(true);
        $this->setForm($form);

        return parent::_prepareForm();

    }

} 