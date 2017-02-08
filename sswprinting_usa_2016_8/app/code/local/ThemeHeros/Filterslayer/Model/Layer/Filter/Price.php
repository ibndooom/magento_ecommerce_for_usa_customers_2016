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


class ThemeHeros_Filterslayer_Model_Layer_Filter_Price extends Mage_Catalog_Model_Layer_Filter_Price
{
    protected function _getItemsData()
    {
        if(!Mage::getStoreConfig('filterslayer/general/price_slide')){
             return parent::_getItemsData();
        }
        $key = $this->_getCacheKey();
        $data = $this->getLayer()->getAggregator()->getCacheData($key);
        if ($data === null) {
            $dbRanges   = $this->getRangeItemCounts($this->getMaxPriceInt());
            foreach ($dbRanges as $index=>$count) {
                $data[] = array(
                    'label' => $this->_renderItemLabel(0, $this->getMaxPriceInt()),
                    'value' => 0 . ',' . $this->getMaxPriceInt(),
                    'count' => $count,
                );
            }
            $tags = array(
                Mage_Catalog_Model_Product_Type_Price::CACHE_TAG,
            );
            $tags = $this->getLayer()->getStateTags($tags);
            $this->getLayer()->getAggregator()->saveCacheData($data, $key, $tags);
        }
        return $data;
    }
    
     protected function _renderRangeLabel($fromPrice, $toPrice)
    {
        $store      = Mage::app()->getStore();
        $formattedFromPrice  = $store->formatPrice($fromPrice);
        if ($toPrice === '') {
            return Mage::helper('catalog')->__('%s and above', $formattedFromPrice);
        } elseif ($fromPrice == $toPrice && Mage::app()->getStore()->getConfig(self::XML_PATH_ONE_PRICE_INTERVAL)) {
            return $formattedFromPrice;
        } else {
            return Mage::helper('catalog')->__('%s - %s', $formattedFromPrice, $store->formatPrice($toPrice));
        }
    }
    
    public function apply(Zend_Controller_Request_Abstract $request, $filterBlock)
    {
        $filter = $request->getParam($this->getRequestVar());
        if (!$filter) {
            return $this;
        }

        //validate filter
        $filterParams = explode(',', $filter);
        $filter = $this->_validateFilter($filterParams[0]);
        if (!$filter) {
            return $this;
        }

        list($from, $to) = $filter;
        $this->setInterval(array($from, $to+0.01));

        $priorFilters = array();
        for ($i = 1; $i < count($filterParams); ++$i) {
            $priorFilter = $this->_validateFilter($filterParams[$i]);
            if ($priorFilter) {
                $priorFilters[] = $priorFilter;
            } else {
                $priorFilters = array();
                break;
            }
        }
        if ($priorFilters) {
            $this->setPriorIntervals($priorFilters);
        }

        $this->_applyPriceRange();
        $this->getLayer()->getState()->addFilter($this->_createItem(
            $this->_renderRangeLabel(empty($from) ? 0 : $from, $to),
            $filter
        ));

        return $this;
    }
}

