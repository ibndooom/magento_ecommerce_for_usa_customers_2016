<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Observer
{
    const CRON_LOG_FILE = 'fover_crons.log';
    const ORDERS_TO_POST = 5;

    /**
     * Posts new orders to 4over service
     */
    public function postOrders()
    {
        //selecting all orders that haven't been sent to pixopa
        $orders = Mage::getResourceModel('sales/order_collection');
        $orders->addFieldToFilter('status',array('nin'=>array('complete','canceled','closed')));
        $foverOrderTable = $orders->getResource()->getTable('web4pro_4over/order');
        $select = $orders->getSelect();
        $select->joinLeft(
                array('fod' => $foverOrderTable),
                'main_table.entity_id=fod.order_id',
                array()
            )->where('fod.processed_flag NOT IN(' . Web4pro_Fourover_Model_Api::ORDER_LOCKED_ON_FAIL
                     . ',' . Web4pro_Fourover_Model_Api::ORDER_PROCESSED
                     . ',' . Web4pro_Fourover_Model_Api::NONE_FOVER_ORDER . ')' 
                     . 'or fod.order_id IS NULL');
        $orders->setPageSize(self::ORDERS_TO_POST);
        $orders->load();

        $foverApi = Mage::getSingleton('web4pro_4over/api');
        foreach ($orders as $order) {
            try {
                $foverOrder = $foverApi->sendOrder($order, true);
            } catch(Exception $e) {
                Mage::log($e->getMessage(), null, self::CRON_LOG_FILE, true);
            }
        }
    }

    /**
     * Updates statuses of posted 4over jobs. Jobs are grouped within an order 
     */
    public function updateJobStatuses()
    {
        $foverOrders = Mage::getResourceModel('web4pro_4over/order_collection');
        $foverOrders->join(array('o'=>'sales/order'),'o.entity_id=main_table.order_id and o.status not in ("complete","closed","canceled")','*');

        $orders = Mage::getModel('sales/order')->getCollection();
        $orders->join(array('o'=>'web4pro_4over/order'),'main_table.entity_id=o.order_id','o.jobs')
               ->addFieldToFilter('status',array('nin'=>array('complete','canceled','closed')));
        $select = $orders->getSelect();
        $select->where('o.processed_flag=?', Web4pro_Fourover_Model_Api::ORDER_PROCESSED);

        $foverApi = Mage::getSingleton('web4pro_4over/api');
        foreach ($orders as $_order) {
            $jobs = unserialize($_order->getJobs());
            $qtysToShip = array();
            foreach($jobs as $item_id=>$job)
                try{
                    $res = $foverApi->getJobStatus($job['job_id']);

                    if($res['status']=='error'){
                        Mage::log(var_export($res,true), null, self::CRON_LOG_FILE, true);
                        continue;
                    }
                    $jobs[$item_id]['status_history'] = $res;
                    if(isset($res['entities'][0])){
                        $orderItem = $_order->getItemById($item_id);
                        $status = $res['entities'][0]['status'];
                        if($orderItem->getStatusText()!=$status){
                            $orderItem->setStatusText($status)->save();
                            if($status=='Complete: Delivered'){
                                $qtysToShip[$item_id]=$qtysToShip->getQtyOrdered();
                            }
                        }
                    }
                }catch(Exception $e){
                    Mage::log($e->getMessage(), null, self::CRON_LOG_FILE, true);
                }
            if(count($qtysToShip)){
                try{
                    $shipment = Mage::getModel('sales/service_order',$_order)->prepareShipment($qtysToShip);
                    $transactionSave = Mage::getModel('core/resource_transaction')
                        ->addObject($shipment)
                        ->addObject($shipment->getOrder())
                        ->save();
                }catch(Exception $e){
                    Mage::log($e->getMessage(), null, self::CRON_LOG_FILE, true);
                }

            }
            $foverOrders->getItemById($_order->getId())->setJobs(serialize($jobs))->save();
        }

    }

    public function updateOptions(){
        Mage::getSingleton('web4pro_4over/option')->updateOptions();
        return $this;
    }

    /**
     * Adds input renderer to product_uuid attribute.
     * Observes adminhtml_catalog_product_edit_prepare_form event
     */
    public function addProductUuidRender($observer)
    {
        $form = $observer->getForm();
        $productUuid = $form->getElement('product_uuid');
        if ($productUuid) {
            $productUuid->setRenderer(
                Mage::app()->getLayout()->createBlock('web4pro_4over/renderer_productuuid')
            );
        }
    }
    
    /**
     * Adds 4over order unlock button onto order view page in admin
     * Observes core_layout_block_create_after event
     */
    public function addOrderUnlockButton($observer)
    {
        $block = $observer->getBlock();
        if ($block->getNameInLayout() == 'sales_order_edit') {
            $orderId = Mage::registry('sales_order')->getId();
            $foverOrder = Mage::getModel('web4pro_4over/order')->load($orderId);

            if ($foverOrder->getProcessedFlag() == Web4pro_Fourover_Model_Api::ORDER_LOCKED_ON_FAIL) {
                $message = Mage::helper('web4pro_4over')->__('Confirm unlocking order after 4over post failure');
                $url = $block->getUrl('fourover_admin/adminhtml_order/unlock', array('id' => $orderId));
                $block->addButton('fover_order_ublock', array(
                    'label'     => Mage::helper('web4pro_4over')->__('4over Unlock'),
                    'onclick'   => 'confirmSetLocation(\''.$message.'\', \'' . $url . '\')',
                ));
            }
        }
    }
    
    /**
     * Triggers retrieval of full products info (splited into bunches)
     */
    public function updateProductsInfo($observer)
    {
        Mage::getSingleton('web4pro_4over/product')->updateProductsOptions();
    }

    /**
     * Prepares environment for base prices import
     */
    public function initiateUpdateProductsPricelist($observer)
    {
        Mage::getSingleton('web4pro_4over/baseprice')->prepareEnvironmentForUpdate();
    }

    /**
     * Triggers base prices retrieval (splitted into bunches)
     */
    public function updateProductsPricelist()
    {
        Mage::getSingleton('web4pro_4over/baseprice')->updatePrices();
    }

    /**
     * Triggers turnaround info moving into separate resource/DB table (splited into bunches)
     */
    public function retrieveProductTurnaround()
    {
        Mage::getSingleton('web4pro_4over/turnaround')->retrieveProductTurnaround();
    }

    /**
     * Triggers shipping rates for turnarrounds with base options(splitted into bunches)
     */
    public function updateUpsGroundRates() {
        Mage::getSingleton('web4pro_4over/turnaround')->updateUpsGroundRates();
    }

    /**
     * Collects and saves product quotes map
     */
    public function prepareSaveProductQuotesMap()
    {
        Mage::getSingleton('web4pro_4over/price_updater')->prepareSaveProductQuotesMap();
    }

    /**
     * Collects and saves product quotes map
     */
    public function retrieveProductPricesByQuotesMap()
    {
        Mage::getSingleton('web4pro_4over/price_updater')->retrieveProductPricesByQuotesMap();
    }

    public function updateOptionPricesFromRequestedQuotes()
    {
        Mage::getSingleton('web4pro_4over/price_updater')->updateOptionPricesFromRequestedQuotes();
    }
}
