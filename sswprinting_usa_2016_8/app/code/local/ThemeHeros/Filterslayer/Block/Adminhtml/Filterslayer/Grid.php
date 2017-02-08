<?php

class ThemeHeros_Filterslayer_Block_Adminhtml_Filterslayer_Grid extends Mage_Adminhtml_Block_Widget_Grid
{
  public function __construct()
  {
      parent::__construct();
      $this->setId('filterslayerGrid');
      $this->setDefaultSort('filterslayer_id');
      $this->setDefaultDir('ASC');
      $this->setSaveParametersInSession(true);
  }

  protected function _prepareCollection()
  {
      $collection = Mage::getModel('filterslayer/filterslayer')->getCollection();
      $this->setCollection($collection);
      return parent::_prepareCollection();
  }

  protected function _prepareColumns()
  {
      $this->addColumn('filterslayer_id', array(
          'header'    => Mage::helper('filterslayer')->__('ID'),
          'align'     =>'right',
          'width'     => '50px',
          'index'     => 'filterslayer_id',
      ));

      $this->addColumn('title', array(
          'header'    => Mage::helper('filterslayer')->__('Title'),
          'align'     =>'left',
          'index'     => 'title',
      ));

	  /*
      $this->addColumn('content', array(
			'header'    => Mage::helper('filterslayer')->__('Item Content'),
			'width'     => '150px',
			'index'     => 'content',
      ));
	  */

      $this->addColumn('status', array(
          'header'    => Mage::helper('filterslayer')->__('Status'),
          'align'     => 'left',
          'width'     => '80px',
          'index'     => 'status',
          'type'      => 'options',
          'options'   => array(
              1 => 'Enabled',
              2 => 'Disabled',
          ),
      ));
	  
        $this->addColumn('action',
            array(
                'header'    =>  Mage::helper('filterslayer')->__('Action'),
                'width'     => '100',
                'type'      => 'action',
                'getter'    => 'getId',
                'actions'   => array(
                    array(
                        'caption'   => Mage::helper('filterslayer')->__('Edit'),
                        'url'       => array('base'=> '*/*/edit'),
                        'field'     => 'id'
                    )
                ),
                'filter'    => false,
                'sortable'  => false,
                'index'     => 'stores',
                'is_system' => true,
        ));
		
		$this->addExportType('*/*/exportCsv', Mage::helper('filterslayer')->__('CSV'));
		$this->addExportType('*/*/exportXml', Mage::helper('filterslayer')->__('XML'));
	  
      return parent::_prepareColumns();
  }

    protected function _prepareMassaction()
    {
        $this->setMassactionIdField('filterslayer_id');
        $this->getMassactionBlock()->setFormFieldName('filterslayer');

        $this->getMassactionBlock()->addItem('delete', array(
             'label'    => Mage::helper('filterslayer')->__('Delete'),
             'url'      => $this->getUrl('*/*/massDelete'),
             'confirm'  => Mage::helper('filterslayer')->__('Are you sure?')
        ));

        $statuses = Mage::getSingleton('filterslayer/status')->getOptionArray();

        array_unshift($statuses, array('label'=>'', 'value'=>''));
        $this->getMassactionBlock()->addItem('status', array(
             'label'=> Mage::helper('filterslayer')->__('Change status'),
             'url'  => $this->getUrl('*/*/massStatus', array('_current'=>true)),
             'additional' => array(
                    'visibility' => array(
                         'name' => 'status',
                         'type' => 'select',
                         'class' => 'required-entry',
                         'label' => Mage::helper('filterslayer')->__('Status'),
                         'values' => $statuses
                     )
             )
        ));
        return $this;
    }

  public function getRowUrl($row)
  {
      return $this->getUrl('*/*/edit', array('id' => $row->getId()));
  }

}