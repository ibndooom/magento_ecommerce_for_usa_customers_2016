<?php
/**
 * Product list
 *
 * @category   Mage
 * @package    Mage_Catalog
 * @author     Magento Core Team <core@magentocommerce.com>
 */
class Pixopa_Catalog_Block_Product_List extends Mage_Catalog_Block_Product_List
{
	
	/**
     * Render pagination HTML
     *
     * @return string
     */
    public function getPagerHtml($limit, $number_found, $results_count)
    {
        $pagerBlock = $this->getLayout()->getBlock('product_list_toolbar_pager');

        if ($pagerBlock instanceof Varien_Object) {

            /* @var $pagerBlock Mage_Page_Block_Html_Pager */
            $pagerBlock->setAvailableLimit($this->getChild('toolbar')->getAvailableLimit());

            $pagerBlock->setUseContainer(true)
                ->setShowPerPage(true)
                ->setShowAmounts(true)
                ->setLimitVarName('limit')
                ->setPageVarName('p')
                ->setLimit($limit)
                ->setFrameLength(Mage::getStoreConfig('design/pagination/pagination_frame'))
                ->setJump(Mage::getStoreConfig('design/pagination/pagination_frame_skip'))
                ->setTotalNum($number_found)
                ->setResultsCount($results_count)
                ->setTemplate('pixopa/page/html/pager.phtml');

            return $pagerBlock->toHtml();
        }

        return '';
    }
    
	public function getUltimoPagerHtml($limit, $number_found, $results_count)
    {
        $pagerBlock = $this->getChild('product_list_toolbar_pager');

        if ($pagerBlock instanceof Varien_Object) {

            /* @var $pagerBlock Mage_Page_Block_Html_Pager */
            $pagerBlock->setAvailableLimit($this->getChild('toolbar')->getAvailableLimit());

            $pagerBlock->setUseContainer(true)
                ->setShowPerPage(false)
                ->setShowAmounts(false)
                ->setLimitVarName('limit')
                ->setPageVarName('p')
                ->setLimit($limit)
                ->setFrameLength(Mage::getStoreConfig('design/pagination/pagination_frame'))
                ->setJump(Mage::getStoreConfig('design/pagination/pagination_frame_skip'))
                ->setTotalNum($number_found)
                ->setResultsCount($results_count);

            return $pagerBlock->toHtml();
        }

        return '';
    }
    
	public function getPagerBlock($limit, $number_found, $results_count)
    {
        $pagerBlock = $this->getChild('product_list_toolbar_pager');

        if ($pagerBlock instanceof Varien_Object) {

            /* @var $pagerBlock Mage_Page_Block_Html_Pager */
            $pagerBlock->setAvailableLimit($this->getChild('toolbar')->getAvailableLimit());

            $pagerBlock->setUseContainer(true)
                ->setShowPerPage(true)
                ->setShowAmounts(true)
                ->setLimitVarName('limit')
                ->setPageVarName('p')
                ->setLimit($limit)
                ->setFrameLength(Mage::getStoreConfig('design/pagination/pagination_frame'))
                ->setJump(Mage::getStoreConfig('design/pagination/pagination_frame_skip'))
                ->setTotalNum($number_found)
                ->setResultsCount($results_count);

            return $pagerBlock;
        }

        return '';
    }
    
	/**
     * Return current URL with rewrites and additional parameters
     *
     * @param array $params Query parameters
     * @return string
     */
    public function getLeftNavUrl($params=array())
    {
        $urlParams = array();
        $urlParams['_current']  = true;
        $urlParams['_escape']   = true;
        $urlParams['_use_rewrite']   = true;
        $urlParams['_query']    = $params;
        return $this->getUrl('*/*/*', $urlParams);
    }
	
   
	/**
     * Retrieve No Result or Minimum query length Text
     *
     * @return string
     */
    public function getNoResultText()
    {
        if (Mage::helper('catalogsearch')->isMinQueryLength()) {
            return Mage::helper('catalogsearch')->__('Minimum Search query length is %s', $this->_getQuery()->getMinQueryLength());
        }
        return $this->_getData('no_result_text');
    }

    /**
     * Retrieve Note messages
     *
     * @return array
     */
    public function getNoteMessages()
    {
        return Mage::helper('catalogsearch')->getNoteMessages();
    }
    
	/**
     * Render Terms HTML
     *
     * @return string
     */
    public function getTermsHtml()
    {
        $termsBlock = $this->getChild('seo_searchterm');
        if ($termsBlock instanceof Varien_Object) {
            return $termsBlock->toHtml();
        }
        return '';
    }
    
	/**
     * Retrieve loaded category collection
     *
     * @return Mage_Eav_Model_Entity_Collection_Abstract
     */
    protected function _getProductCollection()
    {
        if (is_null($this->_productCollection)) {
            $layer = $this->getLayer();
            /* @var $layer Mage_Catalog_Model_Layer */
            if ($this->getShowRootCategory()) {
                $this->setCategoryId(Mage::app()->getStore()->getRootCategoryId());
            }

            // if this is a product view page
            if (Mage::registry('product')) {
                // get collection of categories this product is associated with
                $categories = Mage::registry('product')->getCategoryCollection()
                    ->setPage(1, 1)
                    ->load();
                // if the product is associated with any category
                if ($categories->count()) {
                    // show products from this category
                    $this->setCategoryId(current($categories->getIterator()));
                }
            }

            $origCategory = null;
            if ($this->getCategoryId()) {
            	
            	$variable_type = gettype($this->getCategoryId());
            	
            	if($variable_type=='object'){
	            	$category_class = get_class($this->getCategoryId());
	            	
	            	if($category_class=='Pixopa_Catalog_Model_Category'){
	            		$this->setCategoryId($this->getCategoryId()->getId());
	            	}
            	}
            	
                $category = Mage::getModel('catalog/category')->load($this->getCategoryId());
                if ($category->getId()) {
                    $origCategory = $layer->getCurrentCategory();
                    $layer->setCurrentCategory($category);
                }
            }
            $this->_productCollection = $layer->getProductCollection();

            $this->prepareSortableFieldsByCategory($layer->getCurrentCategory());

            if ($origCategory) {
                $layer->setCurrentCategory($origCategory);
            }
        }

        return $this->_productCollection;
    }
}
