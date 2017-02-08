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
 * @package     Mage_Catalog
 * @copyright   Copyright (c) 2012 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */


/**
 * Catalog url rewrite resource model
 *
 * @category    Mage
 * @package     Mage_Catalog
 * @author      Magento Core Team <core@magentocommerce.com>
 */
class Pixopa_Catalog_Model_Resource_Url extends Mage_Catalog_Model_Resource_Url
{
	
	/**
     * Prepare rewrites for condition
     *
     * @param int $storeId
     * @param int|array $categoryIds
     * @param int|array $productIds
     * @return array
     */
    public function prepareRewrites($storeId, $categoryIds = null, $productIds = null, $templateIds = null)
    {
        $rewrites   = array();
        $adapter    = $this->_getWriteAdapter();
        $select     = $adapter->select()
            ->from($this->getMainTable())
            ->where('store_id = :store_id')
            ->where('is_system = ?', 1);
        $bind = array('store_id' => $storeId);
        if ($categoryIds === null) {
            $select->where('category_id IS NULL');
        } elseif ($categoryIds) {
            $catIds = is_array($categoryIds) ? $categoryIds : array($categoryIds);

            // Check maybe we request products and root category id is within categoryIds,
            // it's a separate case because root category products are stored with NULL categoryId
            if ($productIds) {
                $addNullCategory = in_array($this->getStores($storeId)->getRootCategoryId(), $catIds);
            } else {
                $addNullCategory = false;
            }

            // Compose optimal condition
            if ($addNullCategory) {
                $select->where('category_id IN(?) OR category_id IS NULL', $catIds);
            } else {
                $select->where('category_id IN(?)', $catIds);
            }
        }

        if ($productIds === null) {
            $select->where('product_id IS NULL');
        } elseif ($productIds) {
            $select->where('product_id IN(?)', $productIds);
        }
        
    	if ($templateIds === null) {
            $select->where('template_id IS NULL');
        } elseif ($templateIds) {
            $select->where('template_id IN(?)', $templateIds);
        }

        $rowSet = $adapter->fetchAll($select, $bind);

        foreach ($rowSet as $row) {
            $rewrite = new Varien_Object($row);
            $rewrite->setIdFieldName($this->getIdFieldName());
            $rewrites[$rewrite->getIdPath()] = $rewrite;
        }

        return $rewrites;
    }
}
