<?php

class Web4pro_Banner_Block_Adminhtml_Banner_Grid extends Mage_Adminhtml_Block_Widget_Grid
{
	public function __construct()
	{
		parent::__construct();    
		$this->setId('banner_grid');
		$this->setSaveParametersInSession(true);
		$this->setUseAjax(true);
	}

	/**
	 * Initialise and set the collection for the grid
	 *
	 */
	protected function _prepareCollection()
	{
		$collection = Mage::getResourceModel('banner/banner_collection');

		$this->setCollection($collection);
	
		return parent::_prepareCollection();
	}
	
	/**
	 * Add the columns to the grid
	 *
	 */
	protected function _prepareColumns()
	{
		$this->addColumn('banner_id', array(
			'header'	=> $this->__('ID'),
			'align'		=> 'left',
			'width'		=> '60px',
			'index'		=> 'banner_id',
		));

		$this->addColumn('group_name', array(
			'header'	=> $this->__('Group'),
			'align'		=> 'left',
			'index'		=> 'group_name',
			'type'		=> 'options',
            'show_missing_option_values' => true,
			'options' 	=> Mage::getModel('banner/source_group')->getOptionArray(),
		));
			
		$this->addColumn('title', array(
			'header'		=> $this->__('Title'),
			'align'			=> 'left',
			'index'			=> 'title',
		));
                
		$this->addColumn('sort_order', array(
			'header'		=> $this->__('Sort Order'),
			'align'			=> 'center',
			'index'			=> 'sort_order',
			'width'			=> '50px',
		));

		$this->addColumn('is_enabled', array(
			'header'	=> $this->__('Enabled'),
			'width'		=> '90px',
			'index'		=> 'is_enabled',
			'type'		=> 'options',
			'options'	=> array(
				1 => $this->__('Enabled'),
				0 => $this->__('Disabled'),
			),
		));
	
		$this->addColumn('action',
			array(
				'width'     => '50px',
				'type'      => 'action',
				'getter'     => 'getId',
				'actions'   => array(
					array(
						'caption' => Mage::helper('catalog')->__('Edit'),
						'url'     => array(
						'base'=>'*/*/edit',
					),
					'field'   => 'id'
					)
				),
				'filter'    => false,
				'sortable'  => false,
				'align' 	=> 'center',
			));

		return parent::_prepareColumns();
	}
	
	/**
	 * Retrieve the URL used to modify the grid via AJAX
	 *
	 * @return string
	 */
	public function getGridUrl()
	{
		return $this->getUrl('*/*/grid');
	}
	
	/**
	 * Retrieve the URL for the row
	 *
	 */
	public function getRowUrl($row)
	{
		return $this->getUrl('*/*/edit', array('id' => $row->getId()));
	}

	
	protected function _prepareMassaction()
	{
		$this->setMassactionIdField('banner_id');
		$this->getMassactionBlock()->setFormFieldName('banner_ids');
	
		$this->getMassactionBlock()->addItem('delete', array(
			'label'=> $this->__('Delete'),
			'url'  => $this->getUrl('*/*/massDelete'),
			'confirm' => Mage::helper('catalog')->__('Are you sure?')
		));

        $this->getMassactionBlock()->addItem('status', array(
             'label'=> $this->__('Change status'),
             'url'  => $this->getUrl('*/*/massStatus', array('_current'=>true)),
             'additional' => array(
                    'visibility' => array(
                         'name' => 'status',
                         'type' => 'select',
                         'class' => 'required-entry',
                         'label' => $this->__('Status'),
                         'values' => array(                             
                             0 => $this->__('Disabled'),
                             1 => $this->__('Enabled')
                         )
                     )
             )
        ));
        return $this;
        
	}
}