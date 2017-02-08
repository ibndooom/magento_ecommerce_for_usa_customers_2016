<?php
    class Web4pro_Checkout_Helper_Data extends Mage_Core_Helper_Abstract {

        public function getUserTelephone($address){
            $telephone = $address->getTelephone() ? $address->getTelephone() : "1234";
            return $telephone;
        }
    }