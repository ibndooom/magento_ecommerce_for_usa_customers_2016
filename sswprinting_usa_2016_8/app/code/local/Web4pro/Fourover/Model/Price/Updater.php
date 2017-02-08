<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Price_Updater
{
    const UNPROCESSED_MAP_ITEM_STATUS = 0;
    const PROCESSED_MAP_ITEM_STATUS = 1;
    const UPDATED_MAP_ITEM_STATUS = 2;
    const EXCEPTION_MAP_ITEM_STATUS = 3;

    const MAP_ITEMS_PROCESS_LIMIT = 300;

    const XPATH_MARGIN_PERCENT_ADD = 'fover_product_update/prices/margin';

    protected $_resource;
    protected $_connection;
    protected $_api;
    protected $_helper;

    protected $_runsizes;
    protected $_runsizeLabels;
    protected $_colorSpecLabels;
    protected $_turnaroundLabels;

    protected $_dependencies = array();
    protected $_products = array();
    protected $_quotes = array();

    /**
     * Initializes price updater environment
     */
    public function __construct()
    {
        $this->_resource = Mage::getModel('core/resource');
        $this->_connection = $this->_resource->getConnection('core_read');
        $this->_helper = Mage::helper('web4pro_4over');
        $this->_api = Mage::getSingleton('web4pro_4over/api');

        $this->_runsizes = $this->_helper->getRunsizes();
        $this->_runsizeLabels = explode(',', (string)Mage::getStoreConfig(Web4pro_Fourover_Helper_Data::RUNSIZE_LABELS_CONFIG_PATH));
        $this->_colorSpecLabels = explode(',', (string)Mage::getStoreConfig(Web4pro_Fourover_Helper_Data::COLORSPEC_LABELS_CONFIG_PATH));
        $this->_turnaroundLabels = explode(',', (string)Mage::getStoreConfig(Web4pro_Fourover_Helper_Data::TURNAROUND_LABELS_CONFIG_PATH));
    }

    /**
     * Clears dependent options storage
     */
    protected function _clearDependencies()
    {
        $this->_dependencies = array();
        return $this;
    }

    /**
     * Clears product descriptors storage
     */
    protected function _clearProductDescriptors()
    {
        $this->_products = array();
        return $this;
    }

    /**
     * Reads products custom options and turns them into 4over quotes
     */
    public function prepareSaveProductQuotesMap()
    {
        //selecting all options data
        $select = $this->getNewSelect();
        $select->from(array('o' => $this->getTableName('catalog_product_option')),
            array('product_id', 'option_id'))
            ->join(array('ot' => $this->getTableName('catalog_product_option_title')),
                'o.option_id=ot.option_id', array('label' => 'title'))
            ->join(array('tv' => $this->getTableName('catalog_product_option_type_value')),
                'o.option_id=tv.option_id',
                array('option_type_id', 'in_group_id', 'sku', 'dependent_ids'))
            ->join(array('tt' => $this->getTableName('catalog_product_option_type_title')),
                'tv.option_type_id=tt.option_type_id', array('title'))
            ->where('tv.sku<>\'\'')
            ->group('tv.option_type_id')
            ->order(array('o.product_id ASC', 'tv.sort_order ASC'));

        //collecting dependencies
        $this->_clearDependencies();
        Mage::getSingleton('core/resource_iterator')->walk(
            $select,
            array(array($this, 'collectDependencies')),
            array()
        );
        //building import map
        $this->_clearProductDescriptors();
        Mage::getSingleton('core/resource_iterator')->walk(
            $select,
            array(array($this, 'buildProductDescriptor')),
            array()
        );
        //saving product quotes map to DB
        $this->_saveProductQuotesMap();

        return $this;
    }

    /**
     * Saves product quotes into Database
     */
    public function _saveProductQuotesMap()
    {
        $connection = $this->getConnection();
        $tableName = $this->getTableName('web4pro_4over/product_quote');
        $connection->delete($tableName, 'processed<>' . self::EXCEPTION_MAP_ITEM_STATUS);
        foreach ($this->_products as $product) {
            $product['options'] = serialize($product['options']);
            //try for exceptioned items left in table
            try {
                $connection->insert($tableName, $product);
            } catch(Exception $e) {}
        }

        return $this;
    }

    /**
     * Builds 4over descriptor of the product configuration based on 'Quantity' option and its dependecies(parent options)
     * It's a walk callback for DB response iterator
     * 
     * @param array $args
     */
    public function collectDependencies($args)
    {
        $option = new Varien_Object($args['row']);
        if (!$option->getDependentIds()) {
            return;
        }

        $dependentIds = explode(',', $option->getDependentIds());
        $productId = $option->getProductId();
        foreach ($dependentIds as $id) {
            if (!isset($this->_dependencies[$id])) {
                $this->_dependencies[$id] = array();
            }

            $_id = $id . '_' . $productId;
            $this->_dependencies[$_id][] = $option;
        }
    }

    /**
     * Builds 4over descriptor of the product configuration based on 'Quantity' option and its dependecies(parent options)
     * It's a walk callback for DB response iterator
     *
     * @param array $args
     */
    public function buildProductDescriptor($args)
    {
        $option = new Varien_Object($args['row']);
        $_id = $option->getInGroupId() . '_' . $option->getProductId();
        if (!$this->isQuantityOption($option) || !isset($this->_dependencies[$_id])) {
            return;
        }

        $productOptions = $this->_dependencies[$_id];
        $optionId = $option->getOptionTypeId();
        $options = array();
        $product = array(
            'option_type_id' => $optionId,
            'product_id' => $option->getProductId(),
            'prod_uuid' => $option->getSku(),
            'qty' => (int)$option->getTitle()
        );
        $hash = array('prod_uuid' => $option->getSku(), 'qty' => (int)$option->getTitle());
        foreach ($productOptions as $_option) {
            $options[] = array(
                'label' => $_option->getLabel(),
                'title' => $_option->getTitle(),
                'uuid' => $_option->getSku()
            );
            $hash[] = $_option->getSku();
        }
        $product['options'] = $options;
        $product['option_type_hash'] = hash('sha256', implode('|', $hash));

        $this->_products[$optionId] = $product;
    }

    /**
     * Checks if option is qty/product one
     *
     * @param Varien_Object $option
     * @return bool
     */
    public function isQuantityOption(Varien_Object $option)
    {
        return in_array($option->getLabel(), $this->_runsizeLabels);
    }

    /**
     * 
     */
    public function retrieveProductPricesByQuotesMap()
    {
        $select = $this->getNewSelect();
        $select->from(array('pm' => $this->getTableName('web4pro_4over/product_quote')), array('*'))
            ->where('pm.processed=?', self::UNPROCESSED_MAP_ITEM_STATUS)
            ->group('pm.option_type_hash')
            ->order(array('pm.product_id ASC', 'pm.option_type_id ASC'))
            ->limit(self::MAP_ITEMS_PROCESS_LIMIT, 0);
        //process
        Mage::getSingleton('core/resource_iterator')->walk(
            $select,
            array(array($this, 'processProductQuote')),
            array()
        );

        return $this;
    }

    /**
     * Updates given product's configuration price
     * 
     * @params array $args
     */
    public function processProductQuote($args)
    {
        $_quote = $args['row'];
        $_quote['options'] = unserialize($_quote['options']);
        $helper = $this->getHelper();

        $quote = array();
        $quote['product_uuid'] = $_quote['prod_uuid'];
        //retrieving options
        $qty = $_quote['qty'];
        $quote['runsize_uuid'] = !empty($this->_runsizes[$qty]) ? $this->_runsizes[$qty] : '';
        //retrieving options
        $options = array();
        foreach ($_quote['options'] as $option) {
            //reading color spec(sides information)
            if (in_array($option['label'], $this->_colorSpecLabels)) {
                $quote['colorspec_uuid'] = $option['uuid'];
            //reading turnaround time
            } elseif (in_array($option['label'], $this->_turnaroundLabels)) {
                $quote['turnaroundtime_uuid'] = $option['uuid'];
            //other options
            } else {
                $options[] = $option['uuid'];
            }
        }
        $quote['options'] = $options;

        //sending quote request
        $result = $this->_api->getProductQuote($quote);
        //processing quote result
        $data = array(
            'processed' => self::PROCESSED_MAP_ITEM_STATUS,
            'request' => serialize($quote),
            'response' => serialize($result)
        );
        if (isset($result['total_price'])) {
            $data['total_price'] = $result['total_price'];
        } else {
            $data['total_price'] = 0.0;   
        }
        $this->getConnection()->update(
            $this->getTableName('web4pro_4over/product_quote'),
            $data,
            array(
                'option_type_hash=?' => $_quote['option_type_hash'],
                'processed<>?' => self::EXCEPTION_MAP_ITEM_STATUS
            )
        );
    }

    /**
     * Clears quotes to request from 4over
     * Can be run once in 30 minutes durring 2 days
     */
    protected function _clearQuotesToRequest()
    {
        $this->_quotes = array();
        return $this;
    }

    /**
     * Updates qty option prices at once after all quotes were requested
     */
    public function updateOptionPricesFromRequestedQuotes()
    {
        if ($this->hasUnrequestedQuotes()) {
            return;
        }

        $select = $this->getNewSelect();
        $select->from(
                array('pm' => $this->getTableName('web4pro_4over/product_quote')),
                array('option_type_id', 'total_price')
            )
            ->where('pm.processed=?', self::PROCESSED_MAP_ITEM_STATUS)
            ->where('pm.total_price IS NOT NULL');

        Mage::getSingleton('core/resource_iterator')->walk(
            $select,
            array(array($this, 'updateOptionPriceFromRequestedQuote')),
            array()
        );

        return $this;
        //@TODO last development point
    }

    /**
     * Updates option price and marks quote map item as used
     *
     * @param array $args
     */
    public function updateOptionPriceFromRequestedQuote($args)
    {
        $_quote = $args['row'];
        $totalPrice = $this->getMarginedPrice($_quote['total_price']);

        $this->getConnection()->update(
            $this->getTableName('web4pro_4over/product_quote'),
            array('processed' => self::UPDATED_MAP_ITEM_STATUS),
            array('option_type_id=?' => $_quote['option_type_id'])
        );

        $this->getConnection()->update(
            $this->getTableName('catalog_product_option_type_price'),
            array('price' => $totalPrice),
            array('option_type_id=?' => $_quote['option_type_id'])
        );
    }

    /**
     * Gets margined price
     *
     * @param float $price
     * @return float
     */
    public function getMarginedPrice($price)
    {
        return ceil($price * $this->getPriceMarginMult());
    }

    /**
     * Gets rate multiplier (addition for 4over rates)
     *
     * return float
     */
    public function getPriceMarginMult()
    {
        $percents = Mage::getStoreConfig(self::XPATH_MARGIN_PERCENT_ADD);
        if ($percents) {
            $rateMult = (100 + (int)$percents) / 100;
        } else {
            $rateMult = 1;
        }

        return (float)$rateMult;
    }

    /**
     * Checks if all options requested
     */
    public function hasUnrequestedQuotes()
    {
        $select = $this->getNewSelect();
        $select->from(array('pm' => $this->getTableName('web4pro_4over/product_quote')), array('COUNT(*)'))
            ->where('pm.processed=?', self::UNPROCESSED_MAP_ITEM_STATUS);
        return (bool)$this->getConnection()->fetchOne($select, array());
    }

    /**
     * Gets table name by given name or resource name
     *
     * @param string $tableName
     * @return bool
     */
    public function getTableName($tableName)
    {
        return $this->_resource->getTableName($tableName);
    }

    /**
     * Prepares new select object
     *
     * @return Varien_Db_Select
     */
    public function getNewSelect()
    {
        return $this->_connection->select();
    }

    public function getConnection()
    {
        return $this->_connection;
    }

    public function getHelper()
    {
        return $this->_helper;
    }
}
