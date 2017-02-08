<?php

class Web4pro_FooterUpdate_Block_Contacts extends Mage_Core_Block_Template
{
    /**
     * Gets store phone
     *
     * @return string
     */
    public function getStorePhone()

    {
        return Mage::getStoreConfig('general/store_information/phone');
    }

    /**
     * Gets customer support email
     *
     * @return string
     */
    public function getStoreEmail()
    {
        return Mage::getStoreConfig('trans_email/ident_support/email');
    }
}
