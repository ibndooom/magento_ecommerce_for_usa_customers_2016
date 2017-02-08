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
class ThemeHeros_Filterslayer_Block_Layer_Filter_Price extends Mage_Catalog_Block_Layer_Filter_Abstract
{
    /**
     * Initialize Price filter module
     *
     */
    public function __construct()
    {
        parent::__construct();
        if(Mage::getStoreConfig('filterslayer/general/price_slide')){
            $this->setTemplate('filterslayer/layer/price.phtml');
        }
        $this->_filterModelName = 'catalog/layer_filter_price';
    }
    
    protected function _prepareFilter()
    {
        $this->_filter->setAttributeModel($this->getAttributeModel());
        return $this;
    }
    
    protected function _getResource(){
        return  Mage::getModel('filterslayer/resource_eav_mysql4_layer_filter_price');
    }
    
    public function getMaxPriceInt()
    {
        return $this->_getResource()->getMaxPrice($this->_filter);
    }
    
    public function getSelectValues() {
    	$values = Mage::app()->getRequest()->getParam('price');
		return $values ? explode('-', $values) : array();    
    }
    
    public function getCurrentPrice($case){
        $selections = $this->getSelectValues();
        if (count($selections) > 0) {
            switch ($case){
                case 'min':
                    return  $selections[0]; 
                    break;
                case 'max':
                    return $selections[1]; 
                    break;
                default :
                    return;
                    break;
            }
        }else{
            switch ($case){
                case 'min':
                    return  0;
                    break;
                case 'max':
                    return $this->getMaxPriceInt();
                    break;
                default :
                    return;
                    break;
            }
        }
       
    }
}
