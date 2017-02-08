<?php
/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    Mage
 * @package     Mage_Adminhtml
 * @copyright   Copyright (c) 2012 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * Adminhtml product attribute edit page tabs
 *
 * @category   Mage
 * @package    Mage_Adminhtml
 * @author      Magento Core Team <core@magentocommerce.com>
 */
class ThemeHeros_Filterslayer_Block_Adminhtml_Catalog_Product_Attribute_Edit_Tabs extends Mage_Adminhtml_Block_Widget_Tabs
{

    public function __construct()
    {
        parent::__construct();
        $this->setId('product_attribute_tabs');
        $this->setDestElementId('edit_form');
        $this->setTitle(Mage::helper('catalog')->__('Attribute Information'));
    }

    protected function _beforeToHtml()
    {
        $this->addTab('main', array(
            'label'     => Mage::helper('catalog')->__('Properties'),
            'title'     => Mage::helper('catalog')->__('Properties'),
            'content'   => $this->getLayout()->createBlock('adminhtml/catalog_product_attribute_edit_tab_main')->toHtml(),
            'active'    => true
        ));

        $model = Mage::registry('entity_attribute');

        $this->addTab('labels', array(
            'label'     => Mage::helper('catalog')->__('Manage Label / Options'),
            'title'     => Mage::helper('catalog')->__('Manage Label / Options'),
            'content'   => $this->getLayout()->createBlock('adminhtml/catalog_product_attribute_edit_tab_options')->toHtml(),
        ));
        
        if($this->getRequest()->getParam('attribute_id')){
            if($this->_canShow()){
                $this->addTab('navigation', array(
                    'label'     => Mage::helper('catalog')->__('Layered Navigation'),
                    'title'     => Mage::helper('catalog')->__('Layered Navigation'),
                    'content'   => $this->getLayout()->createBlock('filterslayer/adminhtml_catalog_product_attribute_edit_tab_layer')->toHtml(),
                ));

                $this->addTab('assign', array(
                    'label'     => Mage::helper('catalog')->__('Assign Image Option'),
                    'title'     => Mage::helper('catalog')->__('Assign Image Option'),
                    'content'   => $this->getLayout()->createBlock('filterslayer/adminhtml_catalog_product_attribute_edit_tab_assign')->toHtml(),
                ));
            }
        }
        
        //ThemeHeros_Filterslayer_Block_Adminhtml_Catalog_Product_Attribute_Edit_Tab_Layer
        
        /*if ('select' == $model->getFrontendInput()) {
            $this->addTab('options_section', array(
                'label'     => Mage::helper('catalog')->__('Options Control'),
                'title'     => Mage::helper('catalog')->__('Options Control'),
                'content'   => $this->getLayout()->createBlock('adminhtml/catalog_product_attribute_edit_tab_options')->toHtml(),
            ));
        }*/

        return parent::_beforeToHtml();
    }
    
    public function _canShow(){
       
        $model = Mage::getModel('catalog/resource_eav_attribute');
        $id = $this->getRequest()->getParam('attribute_id');
        if($id) {
          $attribute = $model->load($id);
          if($attribute->getFrontendInput()=='multiselect' || $attribute->getFrontendInput()=='select'){
              return true;
          }
          return false;
        }
       return false;
    }

}
