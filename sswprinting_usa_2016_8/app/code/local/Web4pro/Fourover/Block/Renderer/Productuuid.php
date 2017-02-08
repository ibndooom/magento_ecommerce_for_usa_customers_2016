<?php 
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Block_Renderer_ProductUuid
    extends Mage_Adminhtml_Block_Widget
    implements Varien_Data_Form_Element_Renderer_Interface
{
    protected $_template = 'web4pro/product_edit/uuid_renderer.phtml';

    /**
     * Form element instance
     *
     * @var Varien_Data_Form_Element_Abstract
     */
    protected $_element;

    /**
     * Customer groups cache
     *
     * @var array
     */
    protected $_customerGroups;

    /**
     * Websites cache
     *
     * @var array
     */
    protected $_websites;

    protected function _prepareLayout()
    {
        //adding product option button
        $button = $this->getLayout()->createBlock('adminhtml/widget_button')
            ->setData(array(
                'label' => Mage::helper('catalog')->__('Add Product UUID'),
                'onclick' => 'return foverProduct.addUuid()',
                'class' => 'add',
                'style' => 'width:300px; margin: 0 0 1em 82px'
            ));
        $button->setName('add_product_uuid');
        $this->setChild('add_uuid', $button);

        //adding product option button
        $button = $this->getLayout()->createBlock('adminhtml/widget_button')
            ->setData(array(
                'label' => Mage::helper('catalog')->__('Add Option'),
                'onclick' => 'return foverProduct.addOption(event)',
                'class' => 'add'
            ));
        $button->setName('add_product_uuid');
        $this->setChild('add_uuid_option', $button);

        return parent::_prepareLayout();
    }
    
    /**
     * Retrieve current product instance
     *
     * @return Mage_Catalog_Model_Product
     */
    public function getProduct()
    {
        return Mage::registry('product');
    }

    /**
     * Render HTML
     *
     * @param Varien_Data_Form_Element_Abstract $element
     * @return string
     */
    public function render(Varien_Data_Form_Element_Abstract $element)
    {
        $this->setElement($element);
        return $this->toHtml();
    }

    /**
     * Set form element instance
     *
     * @param Varien_Data_Form_Element_Abstract $element
     * @return Mage_Adminhtml_Block_Catalog_Product_Edit_Tab_Price_Group_Abstract
     */
    public function setElement(Varien_Data_Form_Element_Abstract $element)
    {
        $this->_element = $element;
        return $this;
    }

    /**
     * Retrieve form element instance
     *
     * @return Varien_Data_Form_Element_Abstract
     */
    public function getElement()
    {
        return $this->_element;
    }

    /**
     * Prepare group price values
     *
     * @return array
     */
    public function getValues()
    {
        $values = $this->getElement()->getValue();
        if (!is_array($values)) {
            $values = array();
        }

        return $values;
    }

    /**
     * Retrieve 'add group price item' button HTML
     *
     * @return string
     */
    public function getAddProductButtonHtml()
    {
        return $this->getChildHtml('add_uuid');
    }

    public function getAddProductOptionButtonHtml()
    {
        return $this->getChildHtml('add_uuid_option');
    }
}