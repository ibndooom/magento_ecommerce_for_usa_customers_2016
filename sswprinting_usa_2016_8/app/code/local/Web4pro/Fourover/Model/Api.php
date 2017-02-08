<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Api extends Mage_Core_Model_Abstract {
    protected $_connector;

    //email templates
    const ORDER_ERROR_EMAIL_TPL = "web4pro_4over_order_send_fail_template";
    
    //API entry points
    const POST_ORDERS       = 'orders';
    const POST_FILES        = 'files';
    const GET_DEL_FILES     = 'files/%s';
    const GET_JOB_STATUS    = 'orders/%s/status';
    const GET_PRODUCTS      = 'printproducts/products';
    const GET_PRODUCT_QUOTE = 'printproducts/productquote';
    const GET_PRODUCT_INFO  = 'printproducts/products/%s';
    const GET_PRICE         = 'printproducts/products/%s/baseprices';
    const GET_OPTIONS       = 'printproducts/products/%s/productoptiongroups';
    const POST_SHIP_QUOTE   = 'shippingquote';

    const ORDERS_CALL_TITLE = 'Post order API call';
    const LOG_FILE          = 'fover_api.log';

    //order states
    const ORDER_UNLOCKED       = 0;
    const ORDER_PROCESSED      = 1;
    const ORDER_LOCKED_ON_FAIL = 2;
    const NONE_FOVER_ORDER     = 4;
    

    public function _construct()
    {
        //initializing API connector
        $this->_connector = Mage::getModel('web4pro_4over/connector');
    }

    public function getConnector()
    {
        return $this->_connector;
    }

    /**
     * Posts order to 4over print service
     * @param $order
     *
     * @return array 4over jobs complex information with mapping to magento order items
     */
    public function sendOrder(Mage_Sales_Model_Order $order, $testOrder = false)
    {
        $foverOrder = Mage::getModel('web4pro_4over/order');
        $foverOrder->load($order->getId());
        if (!$foverOrder->getId()) $foverOrder->setId($order->getId());

        $errors = array();
        $helper = Mage::helper('web4pro_4over');
        $sideCodes = $this->_sideCodes();

        $orderToPost = array();
        //populating order post data with common values
        $orderToPost['order_id'] = 'mage' . $order->getIncrementId();
        if ($testOrder) $orderToPost['is_test_order'] = 'true';
        $orderToPost['skip_conformation'] = 'true';

        //preparing ship_to information from customer's shipping address 
        $shipAddress = $order->getShippingAddress();
        foreach ($this->_getAddressFieldsMap() as $origField => $foverField) {
            if (empty($shipTo[$foverField]))
                $shipTo[$foverField] = $shipAddress->getData($origField);
        }
        list($shipTo['address'], $shipTo['address2']) = (array)$shipAddress->getStreet();

        //getting PDF-files sets keyed by order item ID
        $skipSnapshotsItemIds = $helper->getOrderItemsToSkip($foverOrder);
        $pdfSnapshots = $helper->getOrderPdfsSnapshot($order, $skipSnapshotsItemIds);
        //preparing jobs' information
        $jobs = $_jobs = array();
        $jobIndex = 1;
        if ($pdfSnapshots) {
            foreach($order->getAllVisibleItems() as $orderItem) {
                $orderItemId =  $orderItem->getId();
                $_job = array();
                if (!array_key_exists($orderItemId, $pdfSnapshots)) {
                    continue;
                }
                //keeping snapshot creating history
                $_job['files']['local'] = $pdfSnapshots[$orderItemId];
    
                //posting job files to 4over server
                $_path = array('path' => $pdfSnapshots[$orderItemId]['url']);
                $postedFiles = $this->getConnector()->sendPostRequest(self::POST_FILES, $_path);
                
                //@TODO results validation
                if (isset($postedFiles['files'])) {
                    $job = array();
                    //adding 4over product's properties
                    $job = array_merge($job, $helper->getProductInfoBySalesItem($orderItem));
                    $job['job_name'] = sprintf("job%'.03d-001", $jobIndex); 
                    //preparing posted files for a job
                    $files = array();
                    $fileNum = 0;
                    foreach ($postedFiles['files'] as $_file) {
                        if (!array_key_exists($fileNum, $sideCodes)) {
                            continue;
                        }
    
                        $sideCode = $sideCodes[$fileNum];
                        $files[$sideCode] = $_file['file_uuid'];
                        $fileNum++;
                    }
                    $job['files'] = $files;
                    $_job['files']['service'] = $files;
    
                    //adding shipping information for a job
                    $job['ship_to'] = $shipTo;
                    $job['ship_from'] = $helper->getShipFromAddress();
                    $job['shipper'] = $helper->getShipper();
    
                    $jobs[] = $job;
                    $jobIndex++;
                } else {
                    $errors[] = sprintf('Posting files error for item "%s":', $orderItem->getName());
                    if ($orderItem->hasData('design')) {
                        $errors[] = '<img src="' . $orderItem->getDesign()->getThumbnailPath() . '" />';
                    }
                    $errors[] = '<pre>' . json_encode($postedFiles, JSON_PRETTY_PRINT) . '</pre><br>';
                }
    
                $_jobs[$orderItemId] = $_job;
            }
    
            //posting order data if no error occured on posting files
            if (!$errors) {
                $orderToPost['jobs'] = $jobs;
                $orderToPost['payment'] = $helper->getPaymentBillingInformation($orderToPost['order_id']);
                //echo '<pre>' . print_r($orderToPost, 1) . '</pre>';
                $orderResponse = $this->getConnector()->sendPostRequest(self::POST_ORDERS, $orderToPost);
    
                if (isset($orderResponse['order_status']) && $orderResponse['order_status'] == 'Success'
                    && isset($orderResponse['job_ids']) && count($orderResponse['job_ids']) == count($_jobs)) {
                    //mapping jobs to order item. Concidering jobs stack in response has the same jobs order as in request
                    $jobs = $orderResponse['job_ids'];
                    foreach ($_jobs as $orderItemId => $_job) {
                        $_jobs[$orderItemId]['job_id'] = array_shift($jobs);
                        $_jobs[$orderItemId]['status_history'] = array();
                    }
                } else {
                    $errors[] = 'Posting order error:';
                    $errors[] = json_encode($orderResponse, JSON_PRETTY_PRINT) . '<br>';
                }
            }

            //saving information aboot successfuly posted orders if no errors
            if (!$errors) {
                $foverOrder->setJobs($_jobs);
                $foverOrder->setProcessedFlag(self::ORDER_PROCESSED);
            } else {
                $foverOrder->setProcessedFlag(self::ORDER_LOCKED_ON_FAIL);
                $this->_cleanJobsEnv($_jobs);
                $this->_logErrors(self::ORDERS_CALL_TITLE, $errors);
                $this->_sendOrderErrorEmail($errors, $order);
            }
        } else {
            $foverOrder->setProcessedFlag(self::NONE_FOVER_ORDER);
        }
        $foverOrder->save();

        return $foverOrder;
    }
    
    /**
     * Posts file to 4over print service
     *
     * @return array API response on print files posted/sent.
     *    Contains error status explanation or list of posted files' uuids
     */
    public function sendPrintFile($fileUrl)
    {
        $post = array('path' => $fileUrl);
        return $this->getConnector()->sendPostRequest(self::POST_FILES, $path);
    }
    
    /**
     * Gets job status history
     *
     * @return array Hstory of a job status changes
     */
    public function getJobStatus($jobCode) {
        $uri = sprintf(self::GET_JOB_STATUS, $jobCode);
        return $this->getConnector()->sendGetRequest($uri);
    }
    
    /**
     * Gets shipping quote for given product configuration
     * @param array 4over prepared product info + shipping address
     * @return array
     */
    public function getShippingQuote($productInfo)
    {
        return $this->getConnector()->sendPostRequest(self::POST_SHIP_QUOTE, $productInfo);
    }

    /**
     * Magento to 4over address fields mapping
     */
    protected function _getAddressFieldsMap()
    {
        return array(
            'company' => 'company',
            'firstname' => 'firstname',
            'lastname' => 'lastname',
            'email' => 'email',
            'telephone' => 'phone',
            'address' => 'address',
            'address2' => 'address2',
            'city' => 'city',
            'region' => 'state',
            'region_id' => 'state',
            'postcode' => 'zipcode',
            'country_id' => 'country',
        );
    }

    /**
     * Cleans local and posted PDFs if job wasn't posted correctly
     * 
     */
    public function _cleanJobsEnv($jobs)
    {
        $foverOrder = Mage::getModel('web4pro_4over/order');
        $foverOrder->setJobs($jobs);
        //deleting PDF snapshots on local enviroment
        foreach ($foverOrder->getJobsFiles() as $file) {
            @unlink($file);
        }
        //delete posted files from 4over server
        foreach ($foverOrder->getJobsFilesUuids() as $uuid) {
            $uri = sprintf(self::GET_DEL_FILES, $uuid);
            $this->getConnector()->sendDeleteRequest($uri);
        }
    }

    /**
     * Logs errors in dedicated file
     */
    public function _logErrors($callTitle, $errors)
    {
        array_unshift($error, $callTitle);
        Mage::log($errors, null, self::LOG_FILE, true);
    }
    
    /**
     * 4over sides mapping
     *
     * @return array
     */
    protected function _sideCodes()
    {
        return array('fr', 'bk');
    }

    /**
     * Gets products infromation from 4over print service
     *
     * @param int $max
     * @return array 
     */
    public function getProducts($max = 0){
        $result = $this->getConnector()->sendGetRequest(self::GET_PRODUCTS, $max ? array('max' => $max) : array());
        return $result;
    }

    /**
     * Gets pirce options of the runsizes of product according to its uuid
     *
     * @param string $uuid
     * @param int $max
     * @return array
     */
    public function getPrice($uuid, $max = 0){
        $result = $this->getConnector()->sendGetRequest(sprintf(self::GET_PRICE,$uuid), $max ? array('max' => $max) : array());
        return $result;
    }

    /**
     * Gets product's option groups
     *
     * @param string $uuid
     * @return array
     */
    public function getProductOptions($uuid)
    {
        $result = $this->getConnector()->sendGetRequest(sprintf(self::GET_OPTIONS, $uuid));
        return $result;
    }

    /**
     * Gets product's full info
     *
     * @param string $uuid
     * @return array
     */
    public function getProductInfo($uuid){
        $result = $this->getConnector()->sendGetRequest(sprintf(self::GET_PRODUCT_INFO, $uuid));
        return $result;
    }

    /**
     * Gets product quote by given product config
     *
     * @param array $productConfig
     * @return array
     */
    public function getProductQuote($quote)
    {
        $result = $this->getConnector()->sendGetRequest(self::GET_PRODUCT_QUOTE, $quote);
        return $result;
    }

    /**
     * Sends email to inform store owner about order post failure
     */
    protected function _sendOrderErrorEmail($errors, $order)
    {
        //sending notification to store owner
        $sender = $recipient = array(
            'name'  => Mage::app()->getStore()->getFrontendName(),
            'email' => Mage::getStoreConfig('trans_email/ident_general/email'),
        );
        $template = 'web4procitation_to_modarate_notification_email';

        //pretty print for errors messages
        $messages = '';
        foreach ($errors as $error) {
            $messages .= '<p>' . $error . '</p>';
        }

        $variables = array();
        $variables['messages'] = $messages;
        $variables['increment_id'] = $order->getData('increment_id');
        $variables['order'] = $order;

        $email = Mage::getModel('core/email_template');
        $email->sendTransactional(self::ORDER_ERROR_EMAIL_TPL, $sender, $sender['email'], $sender['name'], $variables);
    }
}
