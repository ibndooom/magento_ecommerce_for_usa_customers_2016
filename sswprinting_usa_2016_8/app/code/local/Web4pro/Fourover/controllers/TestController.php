<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_TestController extends Mage_Core_Controller_Front_Action
{
    /**
     * Tests reading 4over job status
     */
    public function getJobStatusAction()
    {
        $jobCode = $this->getRequest()->getParam('id');
        if ($jobCode) {
            $foverApi = Mage::getSingleton('web4pro_4over/api');
            echo '<pre>' . print_r($foverApi->getJobStatus($jobCode), 1) . '</pre>';
         }
    }

    /**
     * Tests sending order to 4over service
     */
    public function sendOrderAction()
    {
        $order = Mage::getModel('sales/order')->load($this->getRequest()->getParam('id'));
        if ($order->getId()) {
            $foverApi = Mage::getSingleton('web4pro_4over/api');
            $foverOrder = $foverApi->sendOrder($order, true);
            echo '<pre>' . print_r($foverOrder->getJobs(), 1) . '</pre>';
        }
    }

    /**
     * Tests forming payment data for 4over API request
     */
    public function getPaymentConfigAction()
    {
        $helper = Mage::helper('web4pro_4over');
        echo '<pre>' . print_r(json_encode($helper->getPaymentBillingInformation(), JSON_PRETTY_PRINT), 1) . '</pre>';
        echo '<pre>' . print_r(json_encode($helper->getShipFromAddress(), JSON_PRETTY_PRINT), 1). '</pre>';
        echo '<pre>' . print_r(json_encode($helper->getShipper(), JSON_PRETTY_PRINT), 1). '</pre>';
    }

    /**
      Tests forming 4over product's options for 4over API request
     */
    public function getProductsDataByOrderAction()
    {
        $helper = Mage::helper('web4pro_4over');
        $order = Mage::getModel('sales/order')->load($this->getRequest()->getParam('id'));
        if ($order->getId()) {
            foreach($order->getAllItems() as $orderItem) {
                echo '<pre>' . print_r($helper->appendProductsDataToPostByOrderItem($orderItem), 1) . '</pre>';
            }
        }
    }

    /**
     * Tests base products info retrieval from 4over service
     */
    public function getProductsAction()
    {
        $api = Mage::getModel('web4pro_4over/api');
        echo "<pre>";
        var_dump($api->getProducts($this->getRequest()->getParam('max')));
        echo "</pre>";
    }

    /**
     * Tests single product full info retrival from 4over service
     */
    public function getProductInfoAction()
    {
        $api = Mage::getModel('web4pro_4over/api');
        $id = $this->getRequest()->getParam('id');
        echo "<pre>";
        var_dump($api->getProductInfo($id));
        echo "</pre>";
    }

    /**
     * Test single step of products full info retrieval from 4over service
     */
    public function updateProductInfoAction()
    {
        Mage::getSingleton('web4pro_4over/product')->updateProductsOptions();
    }

    /**
     * Gets HTML document with table that represents 4over products
     */
    public function getProductsHtmlAction()
    {
        $html = Mage::helper('web4pro_4over/test')->getProductsTableHtml();
        if ($html) {
            $this->_prepareDownloadResponse('4over_products.html', $html);
        } else {
            echo 'No data to show';
        }
    }

    /**
     * Gets pricelist html
     */
    public function getPricelistHtmlAction()
    {
        $html = Mage::helper('web4pro_4over/test')->getPricelistTableHtml();
        if ($html) {
            $this->_prepareDownloadResponse('4over_baseprices.html', $html);
        } else {
            echo 'No data to show';
        }
    }

    public function getPricelistAction()
    {
        $csv = Mage::helper('web4pro_4over/test')->getPricelistCsv();
        if ($csv) {
            $this->_prepareDownloadResponse('4over_baseprices.csv', $csv);
        } else {
            echo 'No data to show';
        }
    }

    public function getPriceAction()
    {
        $api = Mage::getModel('web4pro_4over/api');
        $id = $this->getRequest()->getParam('id');
        echo "<pre>";
        var_dump($api->getPrice($id));
        echo "</pre>";
    }

    public function getOptionsAction()
    {
        $api = Mage::getModel('web4pro_4over/api');
        $productUuid = $this->getRequest()->getParam('id');
        echo "<pre>";
        var_dump($api->getProductOptions($productUuid));
        echo "</pre>";
    }

    /**
     * Gets 4over uuids read from product options sku
     */
    public function getFoverQuoteUuidsAction()
    {
        $quote = Mage::getSingleton('checkout/session')->getQuote();
        $helper = Mage::helper('web4pro_4over');
        foreach ($quote->getAllVisibleItems() as $item) {
            echo '<pre>' . print_r($helper->getProductUuidsBySalesItem($item), 1) . '</pre>';
        }
    }

    public function getFoverOrderUuidsAction()
    {
        $order = Mage::getModel('sales/order')->load($this->getRequest()->getParam('id'));
        $helper = Mage::helper('web4pro_4over');
        foreach ($order->getAllVisibleItems() as $item) {
            echo '<pre>' . print_r($helper->getProductUuidsBySalesItem($item), 1) . '</pre>';
        }
    }

    public function getFoverOrderProductsAction()
    {
        $order = Mage::getModel('sales/order')->load($this->getRequest()->getParam('id'));
        $helper = Mage::helper('web4pro_4over');
        foreach ($order->getAllVisibleItems() as $item) {
            echo '<pre>' . print_r($helper->getProductInfoBySalesItem($item), 1) . '</pre>';
        }
    }
}
