<?php
/**
 * @category    Fishpig
 * @package     Fishpig_iBanners
 * @license     http://fishpig.co.uk/license.txt
 * @author      Ben Tideswell <help@fishpig.co.uk>
 */

class Web4pro_Banner_Block_Adminhtml_Banner_Edit_Tab_Form extends Mage_Adminhtml_Block_Widget_Form
{

	protected function _getAdditionalElementTypes()
	{
		return array(
			'image' => Mage::getConfig()->getBlockClassName('banner/adminhtml_banner_helper_image')
		);
	}
	
	protected function _prepareForm()
	{
		$form = new Varien_Data_Form();

        $form->setHtmlIdPrefix('banner_');
        $form->setFieldNameSuffix('banner');
        
		$this->setForm($form);
		
		$fieldset = $form->addFieldset('banner_general', array('legend'=> $this->__('General Information')));

		$this->_addElementTypes($fieldset);

		$fieldset->addField('group_name', 'select', array(
			'name'			=> 'group_name',
			'label'			=> $this->__('Group'),
			'title'			=> $this->__('Group'),
			'required'		=> true,
			'class'			=> 'required-entry',
			'values'		=> Mage::getModel('banner/source_group')->filterByEnabled()->getOptionArray()
		));

		$fieldset->addField('title', 'text', array(
			'name' 		=> 'title',
			'label' 	=> $this->__('Title'),
			'title' 	=> $this->__('Title'),
			'required'	=> true,
			'class'		=> 'required-entry',
		));
                
		$fieldset->addField('sort_order', 'text', array(
			'name' 		=> 'sort_order',
			'label' 	=> $this->__('Sort Order'),
			'title' 	=> $this->__('Sort Order'),
			'required'	=> false
		));
		
		$fieldset->addField('url', 'text', array(
			'name' 		=> 'url',
			'label' 	=> $this->__('URL'),
			'title' 	=> $this->__('URL')
		));

        $config = Mage::getSingleton('cms/wysiwyg_config')->getConfig();
        $config->addData(array('hidden' => true,'add_images'=>false,'add_variables'=>false,'add_widgets'=>false,'files_browser_window_url'=>false));

		$fieldset->addField('html', 'editor', array(
			'name' 		=> 'html',
			'label' 	=> $this->__('HTML'),
			'title' 	=> $this->__('HTML'),
			'style'		=> 'height: 120px; width: 98%;',
            'wysiwyg'   => true,
            'required'  => false,
            'config'    =>$config
		));

		$fieldset->addField('image', 'image', array(
			'name' 		=> 'image',
			'label' 	=> $this->__('Image'),
			'title' 	=> $this->__('Image'),
            'required' =>true
		));

        $fieldset->addField('small_image','image',array(
            'name' 		=> 'small_image',
            'label' 	=> $this->__('Small Image'),
            'title' 	=> $this->__('Small Image'),
            'required' =>true
        ));
				
		$fieldset->addField('is_enabled', 'select', array(
			'name' => 'is_enabled',
			'title' => $this->__('Enabled'),
			'label' => $this->__('Enabled'),
			'required' => true,
			'values' => Mage::getModel('adminhtml/system_config_source_yesno')->toOptionArray(),
		));

//        if(!Mage::app()->isSingleStoreMode()){
//            $fieldset->addField('store_id', 'multiselect', array(
//                'name'      => 'stores[]',
//                'label'     => Mage::helper('cms')->__('Store View'),
//                'title'     => Mage::helper('cms')->__('Store View'),
//                'required'  => true,
//                'value'     => $this->getStoreSelectValue(),
//                'values'    => Mage::getSingleton('adminhtml/system_store')->getStoreValuesForForm(false, true),
//            ));
//        }
        
        
		if ($banner = Mage::registry('current_banner')) {
			$form->setValues($banner->getData());
		}

		return parent::_prepareForm();
	}
    
    public function __getStoreSelectValue()
    {
        $banner = Mage::registry('current_banner');
        return $banner->getStores();
    }
}
