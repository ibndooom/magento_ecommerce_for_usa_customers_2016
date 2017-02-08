<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Connector extends Mage_Core_Model_Abstract
{
    /*
     * Rerforms GET API calls to 4over
     * @param $entryPoint API URI for specified GET call
     * @param $getParams GET params for API call
     *
     * @return array decoded JSON response from service
     */
    public function sendGetRequest($entryPoint, $getParams = array(), $getMethod = Zend_Http_Client::GET)
    {
        $client = new Zend_Http_Client();
        $getParams['apikey'] = $this->_getPublicKey();
        $getParams['signature'] = $this->_getSignature($getMethod);

        $client->setUri($this->_getApiUrl() . $entryPoint)
            ->setMethod($getMethod)
            ->setParameterGet($getParams);

        try {
            $response = $client->request();
            $result = json_decode($response->getBody(), true);
        } catch(Exception $e){
            Mage::logException($e);
            $result = array();
        }
        return $result;
    }
    
    /*
     * Rerforms DELETE API calls to 4over
     * @param $entryPoint API URI for specified GET call
     * @param $getParams DELETE params for API call
     *
     * @return array decoded JSON response from service
     */
    public function sendDeleteRequest($entryPoint, $getParams = array())
    {
        $this->sendGetRequest($entryPoint, $getParams, Zend_Http_Client::DELETE);
    }

    /*
     * Rerforms POST API calls to 4over
     * @param $entryPoint API URI for specified GET call
     * @param $postData array of data to be converted to JSON string and posted with specified API call
     *
     * @return array decoded JSON response from service
     */
    public function sendPostRequest($entryPoint, $postData = array())
    {
        $client = new Zend_Http_Client();
        $publicKey = $this->_getPublicKey();
        $signature = $this->_getSignature(Zend_Http_Client::POST);

        $client->setUri($this->_getApiUrl() . $entryPoint)
            ->setMethod(Zend_Http_Client::POST)
            ->setRawData(json_encode($postData))
            ->setHeaders("Authorization: API $publicKey:$signature");

        try {
            $response = $client->request();
            $result = json_decode($response->getBody(), true);
        } catch(Exception $e){
            Mage::logException($e);
            $result = array();
        }
        return $result;
    }

    /*
     * Gets private key depending on given method
     */
    protected function _getSignature($method){
        $privateKey = $this->_getPrivateKey();
        return hash_hmac("sha256", $method, hash('sha256', $privateKey));
    }

    protected function _getApiUrl()
    {
        if (Mage::getStoreConfig('fover_connection/mode_settings/is_sandbox')) {
            return Mage::getStoreConfig('fover_connection/api_url/sandbox');
        } else {
            return Mage::getStoreConfig('fover_connection/api_url/live');
        }
    }

    protected function _getPublicKey()
    {
        return Mage::getStoreConfig('fover_connection/credentials/public_key');
    }

    protected function _getPrivateKey()
    {
        return Mage::getStoreConfig('fover_connection/credentials/private_key');
    }
}

