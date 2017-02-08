<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Sales_Order_Item extends Mage_Sales_Model_Order_Item {

    public function getStatus(){
        return $this->getStatusText()?$this->getStatusText():parent::getStatus();
    }
} 