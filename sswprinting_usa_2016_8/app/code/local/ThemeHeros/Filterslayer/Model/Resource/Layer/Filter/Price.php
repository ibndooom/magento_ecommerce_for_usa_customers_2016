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

class ThemeHeros_Filterslayer_Model_Resource_Layer_Filter_Price extends Mage_Catalog_Model_Resource_Layer_Filter_Price
{
    const MIN_POSSIBLE_PRICE = 0;
    
    public function applyFilterToCollection($filter, $range, $index)
    {
        $select = $filter->getLayer()->getProductCollection()->getSelect();
        $priceExpr = $this->_getPriceExpression($filter, $select);
        $filter->getLayer()->getProductCollection()
            ->getSelect()
            ->where($priceExpr . ' >= ' . $this->_getComparingValue(($range * ($index - 1)), $filter))
            ->where($priceExpr . ' <= ' . $this->_getComparingValue(($range * $index), $filter));

        return $this;
    }
   
}
