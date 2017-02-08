<?php
/**
 * @author     Web4pro Magento Team
 * @category   Web4pro
 * @package    Fourover
 */

require_once 'abstract.php';
class Web4pro_Fourover_Printable_Configurations_Import extends Mage_Shell_Abstract
{
    const LOG_FILE = 'printable_config_import.log';

    protected $_helper;
    protected $_connection;
    protected $_resource;
    protected $_runsizeLabels;

    protected $_productImportHistory = array();

    protected $_product;
    protected $_sizeLabel;
    protected $_baseConfigs;
    protected $_ugBaseConfigs;
    protected $_configsToAdd;

    protected $_inGroupIdPointer;
    protected $_qtyOptionSortOrder;
    protected $_adminStoreId;
    protected $_qtyOptionId;
    protected $_optionsGuideLine = '';

    const IMPORTED_CONFIGURATIONS_TABLE = 'w4p_imported_printable_configs';

    const PRODUCT_SIZE_ATTR_CODE = 'size';
    const DPENDENCY_AND_FLAG = 2;
    const QUANTITY_OPTION_TITLE = 'Quantity';
    CONST QUANTITY_OPTION_SORT_ORDER = 1000;
    CONST QUANTITY_OPTION_TYPE = 'drop_down';
    const OPTION_INGROUP_VALUE = 64000;
    const OPTION_PRICE_TYPE = 'fixed';
    const OPTION_DUMMY_PRICE_START = 5.0;

    /**
     * Run script
     */
    public function run()
    {
        //checking if product exsists
        $product = Mage::getModel('catalog/product')->load($this->getArg('product_id'));
        //checking if given product ID fits corresponding product
        if (!$product->getId()) {
            echo "The pointed product ID doesn't correspond any product";
            return;
        }
        $this->_product = $product;
        //getting size label
        $sizeLabel = $product->getResource()->getAttribute(self::PRODUCT_SIZE_ATTR_CODE)->getFrontend()->getValue($product);
        $this->_sizeLabel = preg_replace('/\s/', '', $sizeLabel);
        //get admin store ID
        $store = Mage::getModel('core/store')->load('admin', 'code');
        $this->_adminStoreId = $store->getId();
        //asking if customer wants to proceed import with the product
        printf("The options for the product '%s' will be imported.\n", $product->getName());
        $c = $this->_readchar('Continue? [Y/N] ');
        if (!in_array($c, array('Y', 'y'))) {
            echo "\nConfigurations import stopped\n";
            return;
        }
        echo "\nProcessing imported configuration\n";

        $this->_resource = Mage::getSingleton('core/resource');
        $this->_connection = $this->_resource->getConnection('core_write');
        $this->_helper = Mage::helper('web4pro_4over');
        $this->_runsizeLabels = explode(',', (string)Mage::getStoreConfig(Web4pro_Fourover_Helper_Data::RUNSIZE_LABELS_CONFIG_PATH));

        //prepares import history table if it's needed
        $this->_prepareImportTable();
        $this->_readProductImportHistory();
        //reads product extistinsg printable options configuration
        $this->_prepareProductConfiguration()
            ->_readCreateQtyOption();

        //using transactions to keep DB options schema consistancy
        $this->_connection->beginTransaction();
        try {
            $lineIndex = 1;
            $importedRowsCount = 0;
            $csv = new Mage_ImportExport_Model_Import_Adapter_Csv($this->getArg('file'));
            while ($csv->current()) {
                $isGuideLineRow = false;
                //reading row and remaps specific row fields
                $row = $this->_remapRowFields($csv->current());
                if (!$this->_doesRowFitSize($row)) {
                    $lineIndex++;
                    $csv->next();
                    $logMessage = sprintf('Option size doesn\'t fit the product(line %d)', $lineIndex);
                    Mage::log($logMessage, null, self::LOG_FILE, true);
                    continue;
                }

                //processing and expanding row data
                    //preparing guideline for better user experience in admin
                $guideLine = $this->_getGuideline($row);
                if ($guideLine != $this->_optionsGuideLine) {
                        //preparing guide line row
                    $this->_optionsGuideLine = $guideLine;
                    $row = $this->_prepareGuidelineRow($row);
                    $isGuideLineRow = true;
                } else {
                    //processing row itself
                    $row = $this->_prepareRow($row);
                    $lineIndex++;
                    $csv->next();
                    //checking if prepared row has already been imported to skip storing procedure
                    if ($this->_isRowAlreadyImported($row)) {
                        $logMessage = sprintf('Product option, line %d, has been already imported', $lineIndex);
                        Mage::log($logMessage, null, self::LOG_FILE, true);
                        continue;
                    }
                }

                //save option from the data of new row
                $this->_createRunsizeOptionValue($row)
                    ->_createRunsizeOptionTitle($row)
                    ->_createRunsizeOptionPrice($row);
                //saving import history for non-guideline options
                if (!$isGuideLineRow) {
                    $this->_saveRowToImportHistory($row);
                    $importedRowsCount++;
                }
            }
            $this->_updateProductDependencies();
            $logMessage = sprintf('%d options(option) have(has) been successfuly imported for product \'%s\'', $importedRowsCount, $product->getName());
            Mage::log($logMessage, null, self::LOG_FILE, true);
            //committing changes if all amount of the data has been succesfully imported
            $this->_connection->commit();
        } catch (Exception $e) {
            $logMessage = sprintf('%s', $e->getMessage());
            Mage::log($logMessage, null, self::LOG_FILE, true);
            $logMessage = sprintf('Process failed on the line %d', $lineIndex);
            Mage::log($logMessage, null, self::LOG_FILE, true);
            $this->_connection->rollback();
        }
    }

    /**
     * Gets guide line on specific options  for given row
     *
     * @param array $row
     * @return string
     */
    protected function _getGuideline($row)
    {
        $guideLineParts = array();
        foreach ($this->getGuideLineFields() as $field) {
            if (!empty($row[$field])) {
                $guideLineParts[] = $row[$field];
            }
        }
        return '*** ' . implode(' - ', $guideLineParts) . ' ***';
    }

    /**
     * Preparing guideline row
     */
    protected function _prepareGuidelineRow($row)
    {
        $row['runsize'] = $this->_optionsGuideLine;
        $row['product_uuid'] = '';
        $row['dependent_ids'] = array();
        return $row;
    }

    /**
     * Checks if row size information fits current size
     */
    protected function _doesRowFitSize($row)
    {
        if (!isset($row['size'])) {
            return false;
        }
        $size = preg_replace('/\s/', '', $row['size']);
        if (strpos($this->_sizeLabel, $size) !== false) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Imported row preprocessing
     * @TODO Made extra check with more complex configurations(tested with 1,5x7)
     * 
     * @param array $row
     * @return array
     */
    protected function _prepareRow($row)
    {
        $candidates = array();
        $dependencies = array();

        //getting all candidates from the row
        foreach ($row as $_name => $_value) {
            $name = trim($_name);
            $value = trim($_value);
            if (!isset($this->_baseConfigs[$name]) || !$value) {
                continue;
            }

            $baseConfig = $this->_baseConfigs[$name];
            $hasCandidates = false;
            foreach ($baseConfig as $inGroupId => $option) {
                $title = trim($option->getTitle());
                if ($title != $value) {
                    continue;
                }
                $candidates[$inGroupId] = $option;
                $hasCandidates = true;
            }

            if (!$hasCandidates) {
                throw new Exception(sprintf('No corresponding candidates were found for %s option', $name));
            }
        }

        //getting dependencies from master options for the candidates
        foreach ($candidates as $inGroupId => $option) {
            $_dependencies = $option->getDependentIds();
            foreach ($_dependencies as $_inGroupId) {
                if (!isset($candidates[$_inGroupId])){
                    continue;
                }
                if (!isset($dependencies[$_inGroupId])) {
                    $dependencies[$_inGroupId] = array();
                }
                $dependencies[$_inGroupId][] = $inGroupId;
            }
        }

        //getting final options 
        $groupedCandidates = array();
        foreach ($candidates as $inGroupId => $candidate) {
            $label = $candidate->getLabel();
            if (!isset($groupedCandidates[$label])) {
                $groupedCandidates[$label] = array('top_weight' => 0);
            }
            if (!$candidate->getIsDependent()) {
                $groupedCandidates[$label]['option'] = $candidate;
            } elseif (isset($dependencies[$inGroupId])) {
                $topWeight = $groupedCandidates[$label]['top_weight'];
                $candidateWeight = $this->_getDependencyChainWeight($dependencies, $dependencies[$inGroupId]);
                if ($candidateWeight > $topWeight) {
                    $groupedCandidates[$label]['option'] = $candidate;
                    $groupedCandidates[$label]['top_weight'] = $candidateWeight;
                }
            }
        }

        //moving dependencies information into given row
        $dependentIds = array();
        foreach ($groupedCandidates as $label => $candidate) {
            if (!isset($candidate['option'])) {
                throw new Exception(sprintf('Option \'%s\' has no dependency', $label));
            }
            $dependentIds[] = $candidate['option']->getInGroupId();
        }
        $row['dependent_ids'] = $dependentIds;

        return $row;
    }

    /**
     * Recursively determines depence chain length/weight for given candidate($initialDependency)
     *
     * @param array $dependencies
     * 
     */
    protected function _getDependencyChainWeight($dependencies, $initialDependency)
    {
        $weight = count($initialDependency);
        foreach ($initialDependency as $inGroupId) {
            if (isset($dependencies[$inGroupId])) {
                $weight += $this->_getDependencyChainWeight($dependencies, $dependencies[$inGroupId]);
            }
        }

        return $weight;
    }

    /**
     * Remaps given row specific fields into more machine like keys
     *
     * @param array $row
     * @return array
     */
    protected function _remapRowFields($row)
    {
        foreach ($this->_getImportRowFieldsMap() as $orig => $mapped){
            $_orig = trim($orig);
            if (isset($row[$_orig])) {
                $row[$mapped] = $row[$_orig];
            }
        }

        return $row;
    }

    /**
     * Gets option type fields map
     *
     * @return array
     */
    protected function _getImportRowFieldsMap()
    {
        return array(
            'Product UUID' => 'product_uuid',
            'Quantity' => 'runsize',
            'Size' => 'size'
        );
    }

    /**
     * Determines if row is imported
     *
     * @return bool
     */
    protected function _isRowAlreadyImported($row)
    {
        $hash = $this->_getRowHash($row);
        return (bool)isset($this->_productImportHistory[$hash]);
    }

    /**
     * Clears dependent options storage
     */
    protected function _clearBaseConfigs()
    {
        $this->_baseConfigs = array();
        return $this;
    }

    /**
     * Clears product descriptors storage
     */
    protected function _clearConfigsToAdd()
    {
        $this->_configsToAdd = array();
        return $this;
    }

    /**
     * Reads defining options configuration to track the chain for a new 'Qty' option.
     * Restructuring read data to have option and dependecies indexes
     */
    protected function _prepareProductConfiguration()
    {
        //clearing options environment
        $this->_clearBaseConfigs()
            ->_clearConfigsToAdd();

        //aggregating base options data
        $baseSelect = $this->getNewSelect();
        $baseSelect->from(array('o' => $this->getTableName('catalog_product_option')),
            array('product_id', 'option_id', 'is_dependent'))
            ->join(array('ot' => $this->getTableName('catalog_product_option_title')),
                'o.option_id=ot.option_id', array('label' => 'title'))
            ->join(array('tv' => $this->getTableName('catalog_product_option_type_value')),
                'o.option_id=tv.option_id',
                array('option_type_id', 'in_group_id', 'sku', 'dependent_ids'))
            ->join(array('tt' => $this->getTableName('catalog_product_option_type_title')),
                'tv.option_type_id=tt.option_type_id', array('title'))
            ->where('o.product_id=?', $this->_product->getid())
            ->where('ot.title NOT IN(?)', $this->_runsizeLabels)
            ->where('ot.store_id=?', $this->_adminStoreId)
            ->where('tt.store_id=?', $this->_adminStoreId)
            ->group('tv.option_type_id')
            ->order(array('o.sort_order ASC', 'tv.sort_order ASC'));
            //walk through data processing
        Mage::getSingleton('core/resource_iterator')->walk(
            $baseSelect,
            array(array($this, 'processBaseConfigOptionItem')),
            array()
        );

        //determining top in group ID pointer
        $inGroupSelect = $this->getNewSelect();
        $inGroupSelect->from(array('o' => $this->getTableName('catalog_product_option')), array())
            ->join(array('tv' => $this->getTableName('catalog_product_option_type_value')),
                'o.option_id=tv.option_id', array('top_ingroup_id' => 'MAX(tv.in_group_id)'))
            ->where('o.product_id=?', $this->_product->getId());
        $this->_inGroupIdPointer = (int)$this->_connection->fetchOne($inGroupSelect);

        //determine top sort order of 'Qty' option
        $sortSelect = $this->getNewSelect();
        $sortSelect->from(array('o' => $this->getTableName('catalog_product_option')), array())
            ->join(array('ot' => $this->getTableName('catalog_product_option_title')),
                'o.option_id=ot.option_id', array())
            ->join(array('tv' => $this->getTableName('catalog_product_option_type_value')),
                'o.option_id=tv.option_id', array('top_ingroup_id' => 'MAX(tv.sort_order)'))
            ->where('o.product_id=?', $this->_product->getId())
            ->where('ot.title=?', self::QUANTITY_OPTION_TITLE)
            ->where('ot.store_id=?', $this->_adminStoreId);
        $this->_qtyOptionSortOrder = (int)$this->_connection->fetchOne($sortSelect);

        return $this;
    }

    /**
     * Processes single option type row.
     * It's a walk callback.
     *
     * @param array $args
     */
    public function processBaseConfigOptionItem($args)
    {
        $optionType = new Varien_Object($args['row']);
        $optionType->setDependentIds(explode(',', $optionType->getDependentIds()));
        $optionTitle = $optionType->getLabel();
        if (!isset($this->_baseConfigs[$optionTitle])) {
            $this->_baseConfigs[$optionTitle] = array();
        }

        //marking option with its title
        $baseConfig = &$this->_baseConfigs[$optionTitle];
        $inGroupId = $optionType->getInGroupId();
        //adding new option value to option group with in group ID key
        $baseConfig[$inGroupId] = $optionType;
        //adding new option value to flatterned storage with in group ID key
        $this->_ugBaseConfigs[$inGroupId] = $optionType;
    }

    /**
     * Reads or creates ''option.
     * Table 'catalog_product_option'
     */
    protected function _readCreateQtyOption()
    {
        //reading existign 'Qty' option for product to have an ability to append option values to it
        $qtyOptionSelect = $this->getNewSelect();
        $qtyOptionSelect->from(array('o' => $this->getTableName('catalog_product_option')), array('option_id'))
            ->join(array('ot' => $this->getTableName('catalog_product_option_title')),
                'o.option_id=ot.option_id', array('title'))
            ->where('o.product_id=?', $this->_product->getid())
            ->where('ot.title=?', self::QUANTITY_OPTION_TITLE)
            ->where('ot.store_id=?', $this->_adminStoreId);

        $this->_qtyOptionId = (int)$this->_connection->fetchOne($qtyOptionSelect);
        if ($this->_qtyOptionId) {
            return $this;
        }

        //creating 'Qty' option 
        $_option = $this->getOptionTemplate();
        $this->_connection->insert(
            $this->getTableName('catalog_product_option'),
            $_option
        );
        $this->_qtyOptionId = $this->_connection->lastInsertId($this->getTableName('catalog_product_option'));
        //creatin option title for admin store
        $_optionTitle = $this->getOptionTitleTemplate();
        $_optionTitle['option_id'] = $this->_qtyOptionId;
        $this->_connection->insert(
            $this->getTableName('catalog_product_option_title'),
            $_optionTitle
        );

        return $this;
    }

    /**
     * Creates runsize option type value from CSV-read and processed row
     */
    protected function _createRunsizeOptionValue(&$row)
    {
        if (!$this->_qtyOptionId) {
            return $this;
        }

        $optionValue = $this->getOptionTypeValueTemplate();
        $optionValue['option_id'] = $this->_qtyOptionId;
        $optionValue['in_group_id'] = ++$this->_inGroupIdPointer;
        $this->_qtyOptionSortOrder += 10;
        $optionValue['sort_order'] = $this->_qtyOptionSortOrder;
        $optionValue['sku'] = $row['product_uuid'];

        //saving option type item's value to DB
        $this->_connection->insert(
            $this->getTableName('catalog_product_option_type_value'),
            $optionValue
        );
        //adding option id data to use it in option type title item insertion
        $row['option_type_id'] = $this->_connection->lastInsertId($this->getTableName('catalog_product_option_type_value'));

        //updating master options
        foreach ($row['dependent_ids'] as $inGroupId) {
            if (!isset($this->_ugBaseConfigs[$inGroupId])) {
                continue;
            }
            $masterDependencies = $this->_ugBaseConfigs[$inGroupId]->getDependentIds();
            $masterDependencies[] = $this->_inGroupIdPointer;
            $this->_ugBaseConfigs[$inGroupId]->setDependentIds(array_unique($masterDependencies));
        }

        return $this;
    }

    /**
     * Creates runsize option type title(500, 1000, etc.) from CSV-read and processed row 
     */
    protected function _createRunsizeOptionTitle(&$row)
    {
        if (!isset($row['option_type_id'])) {
            return $this;
        }

        $optionTitle = $this->getOptionTypeTitleTemplate();
        $optionTitle['option_type_id'] = $row['option_type_id'];
        $optionTitle['title'] = trim($row['runsize']);
        //saving option type item's title to DB
        $this->_connection->insert(
            $this->getTableName('catalog_product_option_type_title'),
            $optionTitle
        );

        return $this;
    }

    /**
     * Creates runsize option type price(dummy value to replace by API) from CSV-read and processed row 
     */
    protected function _createRunsizeOptionPrice(&$row)
    {
         if (!isset($row['option_type_id'])) {
            return $this;
        }

        $optionPrice = $this->getOptionTypePriceTemplate();
        $optionPrice['option_type_id'] = $row['option_type_id'];
        $optionPrice['price'] = self::OPTION_DUMMY_PRICE_START + $this->_inGroupIdPointer * 0.01;
        //saving option type item's title to DB
        $this->_connection->insert(
            $this->getTableName('catalog_product_option_type_price'),
            $optionPrice
        );

        return $this;
    }

    /**
     * Gets prepopulated row to create 'Quantity' option
     * 'catalog_product_option' table item
     *
     * @return array
     */
    public function getOptionTemplate()
    {
        return array(
            'product_id' => $this->_product->getId(),
            'type' => self::QUANTITY_OPTION_TYPE,
            'sort_order' => self::QUANTITY_OPTION_SORT_ORDER,
            'is_dependent' => self::DPENDENCY_AND_FLAG,
            'in_group_id' => self::OPTION_INGROUP_VALUE,
            'image_path' => '',
            'customer_groups' => '',
            'div_class' => '',
            'store_views' => ''
        );
    }

    /**
     * Gets prepopulated row to create 'Quantity' option title
     * 'catalog_product_option_title' table item
     *
     * @return array
     */
    public function getOptionTitleTemplate()
    {
        return array(
            'option_id' => 0, //must be updated after option created in 'catalog_product_option' table
            'store_id' => $this->_adminStoreId,
            'title' => self::QUANTITY_OPTION_TITLE
        );
    }

    /**
     * Gets prepopulated row to create 'Quantity' option value
     * 'catalog_product_option_type_value' table item
     *
     * @return array
     */
    public function getOptionTypeValueTemplate()
    {
        return array(
            'option_id' => 0, //must be updated after option created in 'catalog_product_option' table
            'sku' => 'product_uuid', // must be upadted
            'sort_order' => 0, //must be updated. Values should go with step of value 10
            'in_group_id' => 0, //must be updated corresponding to in group ID counter
            'dependent_ids' => '',
            'customoptions_qty' => ''
        );
    }

    /**
     * Gets prepopulated row to create 'Quantity' option title
     * 'catalog_product_option_type_title' table item
     *
     * @return array
     */
    public function getOptionTypeTitleTemplate()
    {
        return array(
            'option_type_id' => 0, //must be updated after option created in 'catalog_product_option_type_value' table
            'store_id' => $this->_adminStoreId,
            'title' => 'runsize_value' // 500, 1000 etc.
        );
    }

    /**
     * Gets prepopulated row to create 'Quantity' option title
     * 'catalog_product_option_type_price' table item
     *
     * @return array
     */
    public function getOptionTypePriceTemplate()
    {
        return array(
            'option_type_id' => 0, //must be updated after option created in 'catalog_product_option_type_value' table
            'store_id' => $this->_adminStoreId,
            'price' => 0.0, //to replace with dummy value before its upadate via API
            'price_type' => self::OPTION_PRICE_TYPE
        );
    }

    /**
     * Updates base options dependencies agreegated after runsize options import
     */
    protected function _updateProductDependencies()
    {
        $tableName = $this->getTableName('catalog_product_option_type_value');
        foreach ($this->_ugBaseConfigs as $optionType) {
            $data = array('dependent_ids' => implode(',', $optionType->getDependentIds()));
            $condition = array('option_type_id=?' => $optionType->getOptionTypeId());
            $this->_connection->update($tableName, $data, $condition);
        }

        return $this;
    }

    /**
     * Gets row hash to prevent same 'Qty' option import
     *
     * @param array
     * @return string
     */
    protected function _getRowHash($row) {
        //rebuiling row to avoid space characters in key and value
        $_row = array();
        foreach ($row as $field => $value) {
            $_field = is_string($field) ? trim($field) : $field;
            $_value = is_string($value) ? trim($value) : $value;
            $_row[$_field] = $_value;
        }
        sort($_row);

        return hash('sha256', serialize($_row));
    }

    /**
     * Creates order import history table if it doesn't not exists
     */
    protected function _prepareImportTable()
    {
        $importTable = $this->getTableName(self::IMPORTED_CONFIGURATIONS_TABLE);
        $referenceTable = $this->getTableName('catalog_product_option_type_value');
        $result = $this->_connection->query('SHOW TABLES LIKE \'' . $importTable . '\'');
        if (!$result->fetch()) {
            $this->_connection->query("
                CREATE TABLE `$importTable` (
                    `record_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
                    `product_id` INT(11) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Product ID',
                    `option_type_id` INT(11) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Magento option type ID',
                    `import_row_hash` VARCHAR(64) NOT NULL DEFAULT '0' COMMENT 'Imported row SH-2 hash',
                    `row_data` TEXT NULL COMMENT 'Imported row serialized data',
                    PRIMARY KEY (`record_id`),
                    UNIQUE INDEX `product_id_import_row_hash` (`product_id`, `import_row_hash`),
                    INDEX `option_type_id` (`option_type_id`),
                    CONSTRAINT `option_type_id` FOREIGN KEY (`option_type_id`) REFERENCES `$referenceTable` (`option_type_id`) ON UPDATE CASCADE ON DELETE CASCADE
                )
                ENGINE=InnoDB;");
        }

        return $this;
    }

    /**
     * Reads import history for the current product
     */
    protected function _readProductImportHistory()
    {
        $importHistorySelect = $this->getNewSelect();
        $importHistorySelect->from(
                array('h' => $this->getTableName(self::IMPORTED_CONFIGURATIONS_TABLE)),
                array('import_row_hash')
            )
            ->where('h.product_id=?', $this->_product->getid());
        $this->_productImportHistory = (array)$this->_connection->fetchAssoc($importHistorySelect);

        return $this;
    }

    /**
     * Saves processed row to import history
     */
    protected function _saveRowToImportHistory($row)
    {
        if (!isset($row['option_type_id'])) {
            return;
        }

        $optionTypeId = $row['option_type_id'];
        unset($row['option_type_id']);
        $data = array(
            'product_id' => $this->_product->getId(),
            'import_row_hash' => $this->_getRowHash($row),
            'option_type_id' => $optionTypeId,
            'row_data' => serialize($row)
        );
        $this->_connection->insert(
            $this->getTableName(self::IMPORTED_CONFIGURATIONS_TABLE),
            $data
        );

        return $this;
    }

    public function getGuideLineFields()
    {
        return array('Paper Stock', 'Coating', 'Corners');
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
        //getting filename
        if (isset($_SERVER['argv'][1])) {
            $this->_args['file'] = $_SERVER['argv'][1];
        }
        //getting ID of the product to configure
        if (isset($_SERVER['argv'][2])) {
            $this->_args['product_id'] = $_SERVER['argv'][2];
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

$shell = new Web4pro_Fourover_Printable_Configurations_Import();
Mage::log('Prinatable products configuartions import started', null, Web4pro_Fourover_Printable_Configurations_Import::LOG_FILE, true);
$shell->run();
Mage::log('Prinatable products configuartions import ended' . "\n", null, Web4pro_Fourover_Printable_Configurations_Import::LOG_FILE, true);
echo 'Done. See var/log/' . Web4pro_Fourover_Printable_Configurations_Import::LOG_FILE . ".\n";
