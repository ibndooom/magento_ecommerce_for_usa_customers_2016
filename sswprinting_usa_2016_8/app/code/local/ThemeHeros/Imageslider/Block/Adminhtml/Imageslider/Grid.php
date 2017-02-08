<?php

class ThemeHeros_Imageslider_Block_Adminhtml_Imageslider_Grid extends Mage_Adminhtml_Block_Widget_Grid
{
  public function __construct()
  {
      parent::__construct();
      $this->setId('imagesliderGrid');
      $this->setDefaultSort('imageslider_id');
      $this->setDefaultDir('ASC');
      $this->setSaveParametersInSession(true);
  }

  protected function _prepareCollection()
  {
      $collection = Mage::getModel('imageslider/imageslider')->getCollection();
      $this->setCollection($collection);
      return parent::_prepareCollection();
  }

  protected function _prepareColumns()
  {
      $this->addColumn('imageslider_id', array(
          'header'    => Mage::helper('imageslider')->__('ID'),
          'align'     =>'right',
          'width'     => '50px',
          'index'     => 'imageslider_id',
      ));

      $this->addColumn('title', array(
          'header'    => Mage::helper('imageslider')->__('Title'),
          'width'     => '150px',
          'index'     => 'title',
      ));

	  
      $this->addColumn('content', array(
			'header'    => Mage::helper('imageslider')->__('Description'),
			'align'     =>'left',
			'index'     => 'content',
      ));
	  

      $this->addColumn('status', array(
          'header'    => Mage::helper('imageslider')->__('Status'),
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
                'header'    =>  Mage::helper('imageslider')->__('Action'),
                'width'     => '100',
                'type'      => 'action',
                'getter'    => 'getId',
                'actions'   => array(
                    array(
                        'caption'   => Mage::helper('imageslider')->__('Edit'),
                        'url'       => array('base'=> '*/*/edit'),
                        'field'     => 'id'
                    )
                ),
                'filter'    => false,
                'sortable'  => false,
                'index'     => 'stores',
                'is_system' => true,
        ));
		
		$this->addExportType('*/*/exportCsv', Mage::helper('imageslider')->__('CSV'));
		$this->addExportType('*/*/exportXml', Mage::helper('imageslider')->__('XML'));
	  
      return parent::_prepareColumns();
  }

    protected function _prepareMassaction()
    {
        $this->setMassactionIdField('imageslider_id');
        $this->getMassactionBlock()->setFormFieldName('imageslider');

        $this->getMassactionBlock()->addItem('delete', array(
             'label'    => Mage::helper('imageslider')->__('Delete'),
             'url'      => $this->getUrl('*/*/massDelete'),
             'confirm'  => Mage::helper('imageslider')->__('Are you sure?')
        ));

        $statuses = Mage::getSingleton('imageslider/status')->getOptionArray();

        array_unshift($statuses, array('label'=>'', 'value'=>''));
        $this->getMassactionBlock()->addItem('status', array(
             'label'=> Mage::helper('imageslider')->__('Change status'),
             'url'  => $this->getUrl('*/*/massStatus', array('_current'=>true)),
             'additional' => array(
                    'visibility' => array(
                         'name' => 'status',
                         'type' => 'select',
                         'class' => 'required-entry',
                         'label' => Mage::helper('imageslider')->__('Status'),
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