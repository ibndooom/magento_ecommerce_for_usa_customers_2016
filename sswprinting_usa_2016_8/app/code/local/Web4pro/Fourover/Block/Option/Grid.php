<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Block_Option_Grid extends Mage_Adminhtml_Block_Widget_Grid {

    protected function _prepareCollection(){
        if(!$this->getCollection()){
            $collection = Mage::getModel('web4pro_4over/option')->getCollection();
            $this->setCollection($collection);
        }
        return parent::_prepareCollection();
    }

    protected function _prepareColumns(){

        $this->addColumn('uuid',array(
            'header'    => $this->__('UUID'),
            'align'     =>'left',
            'width'     => '50px',
            'index'     => 'uuid',
        ));

        $this->addColumn('value',array(
            'header'    => $this->__('Value'),
            'align'     =>'left',
            'width'     => '50px',
            'index'     => 'value',
        ));

        $this->addColumn('type',array(
            'header'    => $this->__('Type'),
            'align'     =>'left',
            'width'     => '50px',
            'index'     => 'type',
            'type'      => 'options',
            'options'   => Mage::getSingleton('web4pro_4over/option')->toOptionArray()
        ));

        $this->addColumn('action',
            array(
                'header'    =>  $this->__('Action'),
                'align'     => 'right',
                'width'     => '100px',
                'type'      => 'action',
                'getter'    => 'getId',
                'actions'   => array(
                    array(
                        'caption'   => $this->__('Edit'),
                        'url'       => array('base'=> '*/*/edit'),
                        'field'     => 'id'
                    )
                )));
        return parent::_prepareColumns();
    }

    protected function _prepareMassaction()
    {
        $this->setMassactionIdField('uuid');
        $this->getMassactionBlock()->setFormFieldName('uuid');

        $this->getMassactionBlock()->addItem('delete', array(
            'label'=> $this->__('Delete'),
            'url'  => $this->getUrl('*/*/massDelete'),
            'confirm' => Mage::helper('catalog')->__('Are you sure?')
        ));


        return $this;

    }
} 