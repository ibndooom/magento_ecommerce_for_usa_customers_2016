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
class ThemeHeros_Filterslayer_Block_Adminhtml_Catalog_Product_Attribute_Edit_Tab_Assign extends ThemeHeros_Filterslayer_Block_Adminhtml_Catalog_Product_Attribute_Edit_Tab_Options
{
    public function __construct()
    {
        parent::__construct();
        $this->setTemplate('filterslayer/catalog/product/attribute/options.phtml');
    }
    
    public function getOptionImage($_image_id){
        $mediaUrl = Mage::getBaseUrl('media').'filterlayer/media/';
        $model = Mage::getModel('catalog/resource_eav_attribute');
        $id = $this->getRequest()->getParam('attribute_id');
        if ($id) {
            $model->load($id);
            $attributecode =  $model->getAttributeCode();
            $modelFilter = Mage::getModel('filterslayer/filterslayer');
            $collection = $modelFilter->getCollection()->addFieldToFilter('attribute_code',$attributecode);
            $data = $collection->getFirstItem();
            $attributeval = Mage::helper('core')->jsonDecode($data->getAttributeValue());
            if(is_array($attributeval)){
                if (array_key_exists($_image_id, $attributeval)) {
                    $mediaUrl.= $attributeval[$_image_id];
                    return  '_innerImageOption('.$_image_id.',"'.$mediaUrl.'");'; 
                }
            }
        } 
    }
}
