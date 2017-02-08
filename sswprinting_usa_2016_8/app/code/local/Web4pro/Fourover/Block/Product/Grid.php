<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Block_Product_Grid extends Mage_Adminhtml_Block_Widget_Grid {

    protected function _prepareCollection(){
        if(!$this->getCollection()){
            $collection = Mage::getModel('web4pro_4over/product')->getCollection();
            $this->setCollection($collection);
        }
        return parent::_prepareCollection();
    }

    protected function _prepareColumns(){

        $this->addColumn('product_uuid',array(
            'header'    => $this->__('UUID'),
            'align'     =>'left',
            'width'     => '50px',
            'index'     => 'product_uuid',
        ));

        $this->addColumn('code',array(
            'header'    => $this->__('Code'),
            'align'     =>'left',
            'width'     => '50px',
            'index'     => 'product_code',

        ));

        $this->addColumn('description',array(
            'header'    => $this->__('Description'),
            'align'     =>'left',
            'width'     => '50px',
            'index'     => 'product_description',
            'filter_condition_callback'=>array($this,'filterDescription')
        ));

        return parent::_prepareColumns();
    }

    public function filterDescription($collection,$column){
        $condition = trim($column->getFilter()->getValue());
        $condition = str_replace(' ','%',$condition);
        do{
            $len = strlen($condition);
            $condition = str_replace('%%','%',$condition);
        }
        while($len>strlen($condition));

        $collection->addFieldToFilter('product_description',array('like'=>'%'.$condition.'%'));
        return $this;
    }
    
    public function getRowUrl($row)
    {
        return $this->getUrl('*/*/options', array('id' => $row->getId()));
    }
    
    public function getRowClickCallback()
    {
        return 'foverProduct.optionsPopup';
    }
} 