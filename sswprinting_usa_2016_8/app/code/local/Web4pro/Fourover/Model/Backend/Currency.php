<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Backend_Currency extends Mage_Adminhtml_Model_System_Config_Backend_Currency_Abstract
{
    /**
     * Check currency code is available in installed currencies
     *
     */
    protected function _beforeSave()
    {
        if (!in_array($this->getValue(), $this->_getInstalledCurrencies())) {
            Mage::throwException(Mage::helper('adminhtml')->__('Selected currency code is not available in installed currencies.'));
        }
        return $this;
    }
}