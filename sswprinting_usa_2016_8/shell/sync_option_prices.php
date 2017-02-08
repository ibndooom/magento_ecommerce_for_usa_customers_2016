<?php
/**
 * @author     Web4pro Magento Team
 * @category   Web4pro
 * @package    Fourover
 */

require_once 'abstract.php';
class Web4pro_Fourover_Printable_Product_Prices extends Mage_Shell_Abstract
{
    protected $_helper;
    protected $_connection;
    protected $_resource;

    protected $_sourceProducts;
    protected $_targetProducts;
    protected $_sourceProductConfigs = array();

    protected $_coatingLabels = array('Coating', 'UV Coating');
    protected $_stockLabels = array('Paper Stock', 'Card Stock');

    /**
     * Run script
     */
    public function run()
    {
        $sourceProduct = Mage::getModel('catalog/product')->load($this->getArg('source_product_id'));
        $targetProduct = Mage::getModel('catalog/product')->load($this->getArg('target_product_id'));
        //checking if given product IDы fits corresponding product
        if (!$sourceProduct->getId() || !$targetProduct->getId()) {
            echo "The pointed product IDs doesn't correspond the products";
            return;
        }
        $this->_sourceProduct = $sourceProduct;
        $this->_targetProduct = $targetProduct;
        //get admin store ID
        $store = Mage::getModel('core/store')->load('admin', 'code');
        $this->_adminStoreId = $store->getId();
        //asking if customer wants to proceed import with the product
        printf(
            "The prices will be syncronized from the product '%s' into '%s'.\n",
            $sourceProduct->getName(),
            $targetProduct->getName()
        );
        $c = $this->_readchar('Continue? [Y/N] ');
        if (!in_array($c, array('Y', 'y'))) {
            echo "\nPrice syncronization stopped\n";
            return;
        }
        echo "\nSyncronizing prices\n";

        $this->_resource = Mage::getSingleton('core/resource');
        $this->_connection = $this->_resource->getConnection('core_write');
        $this->_runsizeLabels = explode(',', (string)Mage::getStoreConfig(Web4pro_Fourover_Helper_Data::RUNSIZE_LABELS_CONFIG_PATH));
        //using transactions to keep DB options schema consistancy
        $this->_connection->beginTransaction();
        try {
            //reads product extistinsg printable options configuration
            $this->_prepareSourceProductConfiguration()
                ->_syncronizeTargetProductConfiguration();
            $this->_connection->commit();
        } catch (Exception $e) {
            $this->_connection->rollback();
        }
    }

    /**
     * Prepares source product 'Quantity' option prices
     */
    protected function _prepareSourceProductConfiguration()
    {
        $select = $this->getNewSelect();
        $select->from(array('oq' => $this->getTableName('w4p_fover_product_quote')))
            ->join(
                array('op' => 'catalog_product_option_type_price'),
                'oq.option_type_id = op.option_type_id',
                array('price')
            )
            ->where('oq.product_id = ?', intval($this->_sourceProduct->getId()));

        $this->_sourceProductConfigs = array();
        Mage::getSingleton('core/resource_iterator')->walk(
            $select,
            array(array($this, 'processSourceProductItem')),
            array()
        );

        return $this;
    }

    /**
     * Select iterrator walk callback to process source product option row
     *
     * @param array $args
     */
    public function processSourceProductItem($args)
    {
        $quote = new Varien_Object($args['row']);

        $options = array();
        try {
            $options = unserialize($quote->getOptions());
            $quote->setOptions($options);
        } catch (Exception $e) {}
        if (!$options || !is_array($options)) {
            return;
        }
        $hash = $this->_getOptionsHash($quote);

        $this->_sourceProductConfigs[$hash] = array(
            'option_type_id' => $quote->getOptionTypeId(),
            'price' => $quote->getPrice()
        );
    }

    /**
     * Updates target product option prices that matches source product's ones
     */
    protected function _syncronizeTargetProductConfiguration()
    {
        $select = $this->getNewSelect();
        $select->from(array('oq' => $this->getTableName('w4p_fover_product_quote')))
            ->where('oq.product_id = ?', intval($this->_targetProduct->getId()));

        Mage::getSingleton('core/resource_iterator')->walk(
            $select,
            array(array($this, 'processTargetProductItem')),
            array()
        );

        return $this;
    }

    /**
     * Select iterrator walk callback to process target product option row
     *
     * @param array $args
     */
    public function processTargetProductItem($args)
    {
        $quote = new Varien_Object($args['row']);

        $options = array();
        try {
            $options = unserialize($quote->getOptions());
            $quote->setOptions($options);
        } catch (Exception $e) {}
        if (!$options || !is_array($options)) {
            return;
        }

        $hash = $this->_getOptionsHash($quote);
        if (!isset($this->_sourceProductConfigs[$hash])) {
            return;
        }

        $price = $this->_sourceProductConfigs[$hash]['price'];
        if (!$price) {
            return;
        }
        $optionTypeId = $quote->getOptionTypeId();
        $this->_connection->update(
            $this->getTableName('catalog_product_option_type_price'),
            array('price' => $price),
            array('option_type_id = ?' => $optionTypeId)
        );
        $this->_connection->update(
            $this->getTableName('w4p_fover_product_quote'),
            array('processed' => 3),
            array('option_type_id = ?' => $optionTypeId)
        );
    }

    /**
     * Gets request params hash
     *
     * @param array $request
     * @return string
     */
    protected function _getOptionsHash($quote)
    {
        $hash = array();
        foreach ($quote->getOptions() as $option) {
            if ($this->_optionCanBeUsed($option)) {
                $hash[] = trim($option['uuid']);
            }
        }
        $hash = array_unique($hash); asort($hash);
        $hash[] = trim($quote->getQty());
        $hash[] = trim($quote->getProdUuid());

        $hash = implode('|', array_values($hash));
        return base64_encode($hash);
    }

    /**
     * Tests if option isn't hardly bound to product UUID
     */
    protected function _optionCanBeUsed($option)
    {
        $usable = true;
        if (in_array($option['label'], $this->_coatingLabels)) {
            $usable = false;
        }
        if (in_array($option['label'], $this->_stockLabels)) {
            $usable = false;
        }

        return $usable;
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

    protected function _parseArgs()
    {
        //getting ID of the source product
        if (isset($_SERVER['argv'][1])) {
            $this->_args['source_product_id'] = $_SERVER['argv'][1];
        }
        //getting ID of the target product
        if (isset($_SERVER['argv'][2])) {
            $this->_args['target_product_id'] = $_SERVER['argv'][2];
        }

        parent::_parseArgs();
    }

    protected function _readchar($prompt)
    {
        readline_callback_handler_install($prompt, function() {});
        $char = stream_get_contents(STDIN, 1);
        readline_callback_handler_remove();
        return $char;
    }
}

$shell = new Web4pro_Fourover_Printable_Product_Prices();
$shell->run();
echo "\n";
