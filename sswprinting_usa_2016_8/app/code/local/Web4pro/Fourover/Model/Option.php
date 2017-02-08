<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Option extends Mage_Core_Model_Abstract {

    const RUN_SIZE = 1;
    const COLOR_SPEC = 2;

    protected function _construct(){
        $this->_init('web4pro_4over/option');
    }

    public function updateOptions(){

           $this->getResource()->clearTempTable();
           $helper = Mage::helper('web4pro_4over');
           $api = Mage::getSingleton('web4pro_4over/api');
           $products = Mage::getModel('web4pro_4over/product')->getCollection();
           foreach($products as $entity){
              $prices = $api->getPrice($entity->getId());
              $prices = $api->getPrice($entity->getId(),$prices['totalResults']);
              $insert = array();
              foreach($prices['entities'] as $price){
                  $insert[]=array('uuid'=>$price['runsize_uuid'],'value'=>$price['runsize'],'type'=>self::RUN_SIZE);
                  $insert[]=array('uuid'=>$price['colorspec_uuid'],'value'=>$price['colorspec'],'type'=>self::COLOR_SPEC);
              }
              if(count($insert))
                        $this->getResource()->insertTempTable($insert);
               }
               $this->getResource()->updateMainTable();
           }


    public function toOptionArray(){
        $helper = Mage::helper('web4pro_4over');
        return array(
                self::RUN_SIZE   => $helper->__('Run size'),
                self::COLOR_SPEC => $helper->__('ColorSpec')
            );
    }
} 