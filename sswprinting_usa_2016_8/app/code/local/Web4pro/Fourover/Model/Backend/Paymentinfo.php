<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Backend_Paymentinfo extends Mage_Core_Model_Config_Data
{
    /**
     * Check  info_json is Json format
     *
     */
    protected function _beforeSave()
    {
        $jsonData = $this->getValue(); //get the value from our config

        if (is_string($jsonData) && is_object(json_decode($jsonData))){
            return $this;
        } else {
           Mage::throwException(Mage::helper('adminhtml')->__('The entered format is not supported (only json format)!'));
        }
    }
}