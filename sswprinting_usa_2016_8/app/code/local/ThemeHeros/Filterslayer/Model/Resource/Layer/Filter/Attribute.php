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


class ThemeHeros_Filterslayer_Model_Resource_Layer_Filter_Attribute extends Mage_Catalog_Model_Resource_Layer_Filter_Attribute
  {
    protected function _construct()
    {
      $this->_init('catalog/product_index_eav', 'entity_id');
    }
    
    public function applyFilterToCollection($filter, $value)
    {
        $collection = $filter->getLayer()->getProductCollection();
        $collection->getSelect()->distinct(true);
        $attribute  = $filter->getAttributeModel();
        $connection = $this->_getReadAdapter();
        $tableAlias = $attribute->getAttributeCode() . '_idx';
        $conditions = array(
            "{$tableAlias}.entity_id = e.entity_id",
            $connection->quoteInto("{$tableAlias}.attribute_id = ?", $attribute->getAttributeId()),
            $connection->quoteInto("{$tableAlias}.store_id = ?", $collection->getStoreId()),
                "{$tableAlias}.value in (".implode(',', explode('_', $value)).")"
        );

        $collection->getSelect()->join(
            array($tableAlias => $this->getMainTable()),
            join(' AND ', $conditions),
            array()
        );

        return $this;
    }
    
    /**
      * Retrieve array with products counts per attribute option
      *
      * @param Mage_Catalog_Model_Layer_Filter_Attribute $filter
      * @return array
    */
    public function getCount($filter)
    {
        $select = clone $filter->getLayer()->getProductCollection()->getSelect();
        $select->reset(Zend_Db_Select::COLUMNS);
        $select->reset(Zend_Db_Select::ORDER);
        $select->reset(Zend_Db_Select::LIMIT_COUNT);
        $select->reset(Zend_Db_Select::LIMIT_OFFSET);

        $connection = $this->_getReadAdapter();
        $attribute  = $filter->getAttributeModel();
        $tableAlias = $attribute->getAttributeCode() . '_idx';
        $from = array();
	    foreach ($select->getPart(Zend_Db_Select::FROM) as $key => $value) {
			if ($key != $tableAlias) {
                        	$from[$key] = $value;
			}
		}
	$select->setPart(Zend_Db_Select::FROM, $from);
        $conditions = array(
            "{$tableAlias}.entity_id = e.entity_id",
            $connection->quoteInto("{$tableAlias}.attribute_id = ?", $attribute->getAttributeId()),
            $connection->quoteInto("{$tableAlias}.store_id = ?", $filter->getStoreId()),
        );
        $select
            ->join(
                array($tableAlias => $this->getMainTable()),
                join(' AND ', $conditions),
                array('value', 'count' => "COUNT({$tableAlias}.entity_id)"))
            ->group("{$tableAlias}.value");

        return $connection->fetchPairs($select);
    }
  }
  
  ?>