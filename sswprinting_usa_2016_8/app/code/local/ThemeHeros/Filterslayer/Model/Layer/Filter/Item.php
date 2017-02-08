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
 */

/**
 * Catalog layer price filter
 *
 * @category   ThemeHeros
 * @package    ThemeHeros_Filterslayer
 * @author     ThemeHeros Developer <soncp@arrowhitech.com>
 */
class ThemeHeros_Filterslayer_Model_Layer_Filter_Item extends Mage_Catalog_Model_Layer_Filter_Item
{
    public function getAttributeValues($attributecode){
        $model = Mage::getModel('filterslayer/filterslayer');
        $collection = $model->getCollection()->addFieldToFilter('attribute_code',$attributecode);
        return  $collection->getFirstItem();
    }
    
    public function _itemInfo()
    {
        $thePath = Mage::getBaseDir('media') . DS . 'filterlayer' . DS . 'media' . DS;
        $mediaUrl = Mage::getBaseUrl('media').'filterlayer/media/';
        $placeholder =  Mage::getBaseUrl('media').'filterlayer/media/empty.jpg';
        $attributevalues = $this->getAttributeValues($this->getFilter()->getAttributeModel()->getAttributeCode())->getAttributeValue();
        $attributevalues = Mage::helper('core')->jsonDecode($attributevalues);
        if(is_array($attributevalues)){
            if (array_key_exists($this->getValueString(), $attributevalues)) {
                if(file_exists($thePath.$attributevalues[$this->getValueString()])){
                    return $mediaUrl.= $attributevalues[$this->getValueString()];
                }else{
                    return $placeholder;
                }
            }else{
                return $placeholder;
            }
         }
     }
     
     public function isSelected(){
         if(is_array($this->getFilter()->getSelectValues())){
              if(in_array($this->getValueString(),$this->getFilter()->getSelectValues())){
                    return true;
              }
         }
         return false;
     }
     
    public function getAttributeModel(){
        return Mage::getModel('filterslayer/layer_filter_attribute');
    }
     
    public function getUrl()
    {
        $values = $this->getFilter()->getSelectValues(); 
    	if (!$values) $values = array();
    	if (!in_array($this->getValue(), $values)) $values[] = $this->getValue();
    	$query = array(
            $this->getFilter()->getRequestVar()=>implode('_', $values),
            Mage::getBlockSingleton('page/html_pager')->getPageVarName() => null // exclude current page from urls
        );
        $params = array('_current'=>true, '_use_rewrite'=>true, '_query'=>$query, '_secure' => Mage::app()->getFrontController()->getRequest()->isSecure());
        return $this->createLayerUrl(Mage::getUrl('*/*/*', $params), '*/*/*', $params);
    }
    
    
    public function createLayerUrl($url, $routePath, $routeParams) {
	    $request = Mage::app()->getRequest();
	    $url .= (strpos($url, '?') === false) ? '' : '';
        return $url;
     }
     
     
     public function getRemoveUrl()
    {
        if ($this->hasData('remove_url')) {
    	    return $this->getData('remove_url');
    	}

    	$values = $this->getFilter()->getSelectValues(); 
    	if (!$values) $values = array();
    	unset($values[array_search($this->getValue(), $values)]);
    	if (count($values) > 0) {
	    	$query = array(
	            $this->getFilter()->getRequestVar()=>implode('_', $values),
	            Mage::getBlockSingleton('page/html_pager')->getPageVarName() => null 
	        );
    	}
    	else {
    		$query = array($this->getFilter()->getRequestVar()=>$this->getFilter()->getResetValue());
    	}
    	
    	$params = array('_secure' => Mage::app()->getFrontController()->getRequest()->isSecure());
        $params['_current']     = true;
        $params['_use_rewrite'] = true;
        $params['_query']       = $query;
        return $this->createLayerUrl(Mage::getUrl('*/*/*', $params), '*/*/*', $params);
    }
}

