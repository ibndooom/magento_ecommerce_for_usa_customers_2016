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
 * Product attribute add/edit form main tab
 *
 * @category   Mage
 * @package    Mage_Adminhtml
 * @author     Magento Core Team <core@magentocommerce.com>
 */
class ThemeHeros_Filterslayer_Block_Adminhtml_Catalog_Product_Attribute_Edit_Tab_Layer extends Mage_Adminhtml_Block_Widget_Form
{
    protected function _prepareForm()
    {
       
      $form = new Varien_Data_Form();
      $fieldset = $form->addFieldset('filterslayer_form', array('legend'=>Mage::helper('filterslayer')->__('Properties')));


      $fieldset->addField('layer_image', 'select', array(
          'label'     => Mage::helper('filterslayer')->__('Show Image Filters'),
          'name'      => 'layer_image',
          'note'  => Mage::helper('catalog')->__('Yes For show images filter in left navigation <br /> No for hidden and use option default'),
          'values'    => array(
              

              array(
                  'value'     => 2,
                  'label'     => Mage::helper('filterslayer')->__('No'),
              ),
			  
			  array(
                  'value'     => 1,
                  'label'     => Mage::helper('filterslayer')->__('Yes'),
              ),
          ),
          'value' =>$this->getValueSetting('layer_image')
      ));
      
      $fieldset->addField('layer_checkbox', 'select', array(
          'label'     => Mage::helper('filterslayer')->__('Show Checkbox Filters'),
          'name'      => 'layer_checkbox',
          'note'  => Mage::helper('catalog')->__('Yes For show Checkbox filter in left navigation <br /> No for hidden and use option default'),
          'values'    => array(
              array(
                  'value'     => 1,
                  'label'     => Mage::helper('filterslayer')->__('Yes'),
              ),

              array(
                  'value'     => 2,
                  'label'     => Mage::helper('filterslayer')->__('No'),
              ),
          ),
          'value' =>$this->getValueSetting('layer_checkbox')
      ));
       
      $this->setForm($form);
     return parent::_prepareForm();
    }
    public function getValueSetting($attribute){
        $filterslayer = Mage::getModel('filterslayer/filterslayer');
        $model = Mage::getModel('catalog/resource_eav_attribute');
        $id = $this->getRequest()->getParam('attribute_id');
        if($id) {
          $model->load($id);
          $attributecode = $model->getAttributeCode();
          $collection = $filterslayer->getCollection()->addFieldToFilter('attribute_code',$attributecode);
          return $collection->getFirstItem()->getData($attribute);
        }
        return 1;
    }
}
