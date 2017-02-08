<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Baseprice extends Mage_Core_Model_Abstract {
    const BUNCH_SIZE = 400;
    const UPDATE_PLAN_FLAG_PATH = 'web4pro_fover/baseprice/update_planned';

    protected function _construct(){
        $this->_init('web4pro_4over/baseprice');
    }

    /**
     * Retrieves base prices for products marked to be updated.
     * Procedure is splited into bunches
     */
    public function updatePrices(){
        //determine if price update is enabled
        if (!$this->priceUpdateIsActive()) {
            return;
        }

        $helper = Mage::helper('web4pro_4over');
        $api = Mage::getSingleton('web4pro_4over/api');        
        $products = Mage::getModel('web4pro_4over/product')->getCollection()
            ->addFieldToFilter('is_baseprices_updated', 0)
            ->setPageSize(self::BUNCH_SIZE);

        //determining end of pirces update procedure
        if (!count($products)) {
            $this->clearUpdateFlag();
        }

        $connection = Mage::getSingleton('core/resource')->getConnection('core_write');
        //retrieving product base prices from api and moving recieved data to DB
        foreach($products as $product){
            //determining price options length
            $prices = $api->getPrice($product->getId());
            //retrieving all prices
            $prices = $api->getPrice($product->getId(),$prices['totalResults']);
            $connection->beginTransaction();
            try {
                $insert = array();
                foreach($prices['entities'] as $price) {
                    $priceUuid = $price['base_price_uuid'];
                    $insert[$priceUuid]  = $price; 
                }
                if (!count($insert)) {
                    Mage::throwException(sprintf('Base prices are absent for product with %s UUID', $product->getData('uuid')));
                }

                $product->setData('is_baseprices_updated', 1);
                $product->save();
                //$insert must be keyed with 'base_price_uuid' values
                $this->getResource()->insertMultiple($insert);
                $connection->commit();
            } catch(Exception $e) {
                $connection->rollback();
                Mage::logException($e);
            }
        }
    }

    public function prepareEnvironmentForUpdate()
    {
        $resource   = Mage::getSingleton('core/resource');
        $connection = $resource->getConnection('core_write');
        $connection->update(
                $resource->getTableName('web4pro_4over/product'),
                array('is_baseprices_updated' => 0)
            );

        Mage::getConfig()->saveConfig(self::UPDATE_PLAN_FLAG_PATH, true);
    }

    public function clearUpdateFlag()
    {
        Mage::getConfig()->saveConfig(self::UPDATE_PLAN_FLAG_PATH, false);
    }

    public function priceUpdateIsActive()
    {
        return Mage::getStoreConfig(self::UPDATE_PLAN_FLAG_PATH);
    }
} 