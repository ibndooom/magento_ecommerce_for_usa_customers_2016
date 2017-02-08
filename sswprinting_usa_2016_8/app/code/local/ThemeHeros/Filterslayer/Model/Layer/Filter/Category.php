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


class ThemeHeros_Filterslayer_Model_Layer_Filter_Category extends Mage_Catalog_Model_Layer_Filter_Category
{
    public function apply(Zend_Controller_Request_Abstract $request, $filterBlock)
    {
        $filter = (int) $request->getParam($this->getRequestVar());
        if (!$filter) {
            return $this;
        }
        $this->_categoryId = $filter;
        $category   = $this->getCategory();
        Mage::register('current_category_filter', $category, true);
        $this->_appliedCategory = Mage::getModel('catalog/category')
            ->setStoreId(Mage::app()->getStore()->getId())
            ->load($filter);

        if ($this->_isValidCategory($this->_appliedCategory)) {
            $this->getLayer()->getProductCollection()
                ->addCategoryFilter($this->_appliedCategory);
            $this->getLayer()->getState()->addFilter($this->_createItemFilter(array(
            	'label' => $this->_appliedCategory->getName(), 
            	'value' => $filter,
            )));
        }

        return $this;
    }
    
    protected function _createItemFilter($data)
    {
        return Mage::getModel('catalog/layer_filter_item')
            ->setData($data)
            ->setFilter($this);
    }
    
    protected function _initItems()
    {
        $data = $this->_getItemsData();
        $items=array();
        foreach ($data as $itemData) {
            $items[] = $this->_createItemFilter($itemData);
        }
        $items = $this->processFilterItems($items);
        $this->_items = $items;
        return $this;
    }
    
    public function processFilterItems($items) {
            $filerItems = new Varien_Object;
            $filerItems->setItems($items);
            return $filerItems->getItems();
    }
    
    protected function _categoryItems($category, $products, $categories = null)
    {
    	if (!$categories) {
            $categories = $category->getChildrenCategories();
            $products->addCountToCategories($categories);
    	}
        $data = array();
        foreach ($categories as $category) {
        	if ($category->getIsActive() && $category->getProductCount()) {
            	$data[] = array(
                    'label' => Mage::helper('core')->htmlEscape($category->getName()),
                    'value' => $category->getId(),
                    'count' => $category->getProductCount(),
                );
            }
        }
        return $data;
    }
    
    protected function _getItemsData()
    {
        $key = $this->getLayer()->getStateKey().'_SUBCATEGORIES';
        $data = $this->getLayer()->getAggregator()->getCacheData($key);

        if ($data === null) {
            $categoty   = $this->getCategory();
            $categories = $categoty->getChildrenCategories();

            $this->getLayer()->getProductCollection()
                ->addCountToCategories($categories);

            $data = array();
            foreach ($categories as $category) {
                if ($category->getIsActive() && $category->getProductCount()) {
                    $data[] = array(
                        'label' => Mage::helper('core')->htmlEscape($category->getName()),
                        'value' => $category->getId(),
                        'count' => $category->getProductCount(),
                    );
                }
            }
            $data = $this->_categoryItems($this->getCategory(), $this->getLayer()->getProductCollection(), $categories);
            $tags = $this->getLayer()->getStateTags();
            $this->getLayer()->getAggregator()->saveCacheData($data, $key, $tags);
        }
        return $data;
    }
}
