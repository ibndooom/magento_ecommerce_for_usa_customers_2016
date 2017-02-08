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
 * Catalog product attribute controller
 *
 * @category   Mage
 * @package    Mage_Adminhtml
 * @author      Magento Core Team <core@magentocommerce.com>
 */
include_once('Mage/Adminhtml/controllers/Catalog/Product/AttributeController.php');
class ThemeHeros_Filterslayer_Adminhtml_Catalog_Product_AttributeController extends Mage_Adminhtml_Catalog_Product_AttributeController
{
    public function saveAction()
    {
        $data = $this->getRequest()->getPost();
        if ($data) {
            /** @var $session Mage_Admin_Model_Session */
            $session = Mage::getSingleton('adminhtml/session');

            $redirectBack   = $this->getRequest()->getParam('back', false);
            /* @var $model Mage_Catalog_Model_Entity_Attribute */
            $model = Mage::getModel('catalog/resource_eav_attribute');
            /* @var $helper Mage_Catalog_Helper_Product */
            $helper = Mage::helper('catalog/product');

            $id = $this->getRequest()->getParam('attribute_id');

            //validate attribute_code
            if (isset($data['attribute_code'])) {
                $validatorAttrCode = new Zend_Validate_Regex(array('pattern' => '/^[a-z][a-z_0-9]{1,254}$/'));
                if (!$validatorAttrCode->isValid($data['attribute_code'])) {
                    $session->addError(
                        Mage::helper('catalog')->__('Attribute code is invalid. Please use only letters (a-z), numbers (0-9) or underscore(_) in this field, first character should be a letter.')
                    );
                    $this->_redirect('*/*/edit', array('attribute_id' => $id, '_current' => true));
                    return;
                }
            }


            //validate frontend_input
            if (isset($data['frontend_input'])) {
                /** @var $validatorInputType Mage_Eav_Model_Adminhtml_System_Config_Source_Inputtype_Validator */
                $validatorInputType = Mage::getModel('eav/adminhtml_system_config_source_inputtype_validator');
                if (!$validatorInputType->isValid($data['frontend_input'])) {
                    foreach ($validatorInputType->getMessages() as $message) {
                        $session->addError($message);
                    }
                    $this->_redirect('*/*/edit', array('attribute_id' => $id, '_current' => true));
                    return;
                }
            }

            if ($id) {
                $model->load($id);

                if (!$model->getId()) {
                    $session->addError(
                        Mage::helper('catalog')->__('This Attribute no longer exists'));
                    $this->_redirect('*/*/');
                    return;
                }

                // entity type check
                if ($model->getEntityTypeId() != $this->_entityTypeId) {
                    $session->addError(
                        Mage::helper('catalog')->__('This attribute cannot be updated.'));
                    $session->setAttributeData($data);
                    $this->_redirect('*/*/');
                    return;
                }

                $data['attribute_code'] = $model->getAttributeCode();
                $data['is_user_defined'] = $model->getIsUserDefined();
                $data['frontend_input'] = $model->getFrontendInput();
            } else {
                /**
                * @todo add to helper and specify all relations for properties
                */
                $data['source_model'] = $helper->getAttributeSourceModelByInputType($data['frontend_input']);
                $data['backend_model'] = $helper->getAttributeBackendModelByInputType($data['frontend_input']);
            }

            if (!isset($data['is_configurable'])) {
                $data['is_configurable'] = 0;
            }
            if (!isset($data['is_filterable'])) {
                $data['is_filterable'] = 0;
            }
            if (!isset($data['is_filterable_in_search'])) {
                $data['is_filterable_in_search'] = 0;
            }

            if (is_null($model->getIsUserDefined()) || $model->getIsUserDefined() != 0) {
                $data['backend_type'] = $model->getBackendTypeByInput($data['frontend_input']);
            }

            $defaultValueField = $model->getDefaultValueByInput($data['frontend_input']);
            if ($defaultValueField) {
                $data['default_value'] = $this->getRequest()->getParam($defaultValueField);
            }

            if(!isset($data['apply_to'])) {
                $data['apply_to'] = array();
            }

            //filter
            $data = $this->_filterPostData($data);
            $model->addData($data);
            
            
            if (!$id) {
                $model->setEntityTypeId($this->_entityTypeId);
                $model->setIsUserDefined(1);
            }


            if ($this->getRequest()->getParam('set') && $this->getRequest()->getParam('group')) {
                // For creating product attribute on product page we need specify attribute set and group
                $model->setAttributeSetId($this->getRequest()->getParam('set'));
                $model->setAttributeGroupId($this->getRequest()->getParam('group'));
            }

            try {
                $this->_uploadImages($data['attribute_code']);
                $model->save();
                $session->addSuccess(
                    Mage::helper('catalog')->__('The product attribute has been saved.'));

                /**
                 * Clear translation cache because attribute labels are stored in translation
                 */
                Mage::app()->cleanCache(array(Mage_Core_Model_Translate::CACHE_TAG));
                $session->setAttributeData(false);
                if ($this->getRequest()->getParam('popup')) {
                    $this->_redirect('adminhtml/catalog_product/addAttribute', array(
                        'id'       => $this->getRequest()->getParam('product'),
                        'attribute'=> $model->getId(),
                        '_current' => true
                    ));
                } elseif ($redirectBack) {
                    $this->_redirect('*/*/edit', array('attribute_id' => $model->getId(),'_current'=>true));
                } else {
                    $this->_redirect('*/*/', array());
                }
                return;
            } catch (Exception $e) {
                $session->addError($e->getMessage());
                $session->setAttributeData($data);
                $this->_redirect('*/*/edit', array('attribute_id' => $id, '_current' => true));
                return;
            }
        }
        $this->_redirect('*/*/');
    }
    
    protected function _uploadImages($attributeCode)
    {
        $thePath = Mage::getBaseDir('media') . DS . 'filterlayer' . DS . 'media' . DS;
        $model = Mage::getModel('filterslayer/filterslayer');
        $id = false;
        if($this->IsExistAttributeCode($attributeCode)->getId()){
            $id = $this->IsExistAttributeCode($attributeCode)->getId();
        }
        $layer_image = (int)$this->getRequest()->getPost('layer_image');
        $layer_checkbox = (int)$this->getRequest()->getPost('layer_checkbox');
        if ($model->getCreatedTime == NULL || $model->getUpdateTime() == NULL) {
                $model->setCreatedTime(now())
                        ->setUpdateTime(now());
        } else {
                $model->setUpdateTime(now());
        }
        if(isset($_FILES['images']['name'])):
            $time = time();
            foreach($_FILES['images']['name'] as $key =>$_image):
                if(isset($_image) && $_image != '') {
                    try {
                        $uploader = new Varien_File_Uploader("images[$key]");
                        $uploader->setAllowedExtensions(array('jpg','jpeg','gif','png'));
                        $uploader->setAllowRenameFiles(false);
                        $uploader->setFilesDispersion(false);
                        $uploader->save($thePath, $time.'_'.$_image);
                    }
                    catch (Exception $e) {
                        Mage::getSingleton('adminhtml/session')->addError($this->__($e->getMessage()));
                    }
                }
        endforeach;
        $json = array();
        if(is_array($_FILES['images']['name'])){
            $tempArray = array();
            foreach(array_filter($_FILES['images']['name']) as $key=>$image){
                $tempArray[$key] = $time.'_'.$image;
            }
            $json = Mage::helper('core')->jsonEncode($tempArray);
        }
        $model->setAttributeCode($attributeCode);
        if($id){
            $jsonImages = $this->ProcessImages($attributeCode,$tempArray);
            if($delete = $this->getRequest()->getPost('images_delete')){
               $jsonImages = Mage::helper('core')->jsonDecode($jsonImages);
               if(is_array($jsonImages)){
                    if(count($jsonImages)!=0){
                       foreach($delete as $key=>$checkbox){
                            unset($jsonImages[$key]);
                       }
                      $jsonImages=  Mage::helper('core')->jsonEncode($jsonImages);
                   }
               }
            }
            $model->setAttributeValue($jsonImages);
            $model->setId($id);
        }else{
            $model->setAttributeValue($json);   
        } 
        $model->setLayerImage($layer_image);
        $model->setLayerCheckbox($layer_checkbox);
        $model->save();
      else:
          if($this->getRequest()->getPost('images_delete')){
            $attrbitevalue = $this->removeImagesOption($attributeCode);
            $model->setAttributeCode($attributeCode);
            $model->setAttributeValue($attrbitevalue);
            $model->setLayerImage($layer_image);
            $model->setLayerCheckbox($layer_checkbox);
            $model->setId($id);
            $model->save();
          }else{
            $model->setAttributeCode($attributeCode);
            $model->setLayerImage($layer_image);
            $model->setLayerCheckbox($layer_checkbox);
            if($id) $model->setId($id);
            $model->save();
          }
      endif;
    }
    
    public function IsExistAttributeCode($attributecode){
        $model = Mage::getModel('filterslayer/filterslayer');
        $collection = $model->getCollection()->addFieldToFilter('attribute_code',$attributecode);
        return  $collection->getFirstItem();
    }
    
    public function ProcessImages($attributeCode,$base){
      $_attributevalue = $this->IsExistAttributeCode($attributeCode)->getAttributeValue();
      $attributevalue = Mage::helper('core')->jsonDecode($_attributevalue);
      if(is_array($attributevalue)){
         if(count($attributevalue)!=0){
             return Mage::helper('core')->jsonEncode(array_replace($attributevalue,$base));
         }
      }
      return Mage::helper('core')->jsonEncode($base);
    }
    
    public function removeImagesOption($attributeCode){
      $data = $this->getRequest()->getPost('images_delete');
      $_attributevalue = $this->IsExistAttributeCode($attributeCode)->getAttributeValue();
      $attributevalue = Mage::helper('core')->jsonDecode($_attributevalue);
        if(is_array($attributevalue)){
            if(count($attributevalue)!=0){
               foreach($data as $key=>$checkbox){
                   unset($attributevalue[$key]);
               }
              return Mage::helper('core')->jsonEncode($attributevalue);
            }
         }
         return Mage::helper('core')->jsonEncode(array());
     }
	 
}

if (!function_exists('array_replace')){ function array_replace(){
    $array=array();   
    $n=func_num_args();
    while ($n-- >0) {
        $array+=func_get_arg($n);
    }
    return $array;
}} 
