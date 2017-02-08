<?php

/**
 * Catalog advanced search model
 *
 * @method Mage_CatalogSearch_Model_Resource_Fulltext _getResource()
 * @method Mage_CatalogSearch_Model_Resource_Fulltext getResource()
 * @method int getProductId()
 * @method Mage_CatalogSearch_Model_Fulltext setProductId(int $value)
 * @method int getStoreId()
 * @method Mage_CatalogSearch_Model_Fulltext setStoreId(int $value)
 * @method string getDataIndex()
 * @method Mage_CatalogSearch_Model_Fulltext setDataIndex(string $value)
 *
 * @category    Mage
 * @package     Mage_CatalogSearch
 * @author      Magento Core Team <core@magentocommerce.com>
 */
class Pixopa_Search_Model_Fulltext extends Mage_CatalogSearch_Model_Fulltext
{
   
    /**
     * Regenerate all Stores index
     *
     * Examples:
     * (null, null) => Regenerate index for all stores
     * (1, null)    => Regenerate index for store Id=1
     * (1, 2)       => Regenerate index for product Id=2 and its store view Id=1
     * (null, 2)    => Regenerate index for all store views of product Id=2
     *
     * @param int|null $storeId Store View Id
     * @param int|array|null $productIds Product Entity Id
     *
     * @return Mage_CatalogSearch_Model_Fulltext
     */
    public function rebuildIndex($storeId = null, $productIds = null)
    {
        Mage::dispatchEvent('catalogsearch_index_process_start', array(
            'store_id'      => $storeId,
            'product_ids'   => $productIds
        ));

        Mage::helper('template')->createTemplateFeed();
        
        $allow_products_indexing = Mage::getStoreConfig('dol/system_setting/allow_products_indexing');
        if($allow_products_indexing){
        	$this->getResource()->rebuildIndex($storeId, $productIds);
        }

        Mage::dispatchEvent('catalogsearch_index_process_complete', array());

        return $this;
    }

    /**
     * Delete index data
     *
     * Examples:
     * (null, null) => Clean index of all stores
     * (1, null)    => Clean index of store Id=1
     * (1, 2)       => Clean index of product Id=2 and its store view Id=1
     * (null, 2)    => Clean index of all store views of product Id=2
     *
     * @param int $storeId Store View Id
     * @param int $productId Product Entity Id
     * @return Mage_CatalogSearch_Model_Fulltext
     */
    public function cleanIndex($storeId = null, $productId = null)
    {
        $this->getResource()->cleanIndex($storeId, $productId);
        return $this;
    }
   
}
