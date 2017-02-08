<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Block_Product_Options extends Mage_Adminhtml_Block_Template
{
    public function __construct()
    {
        parent::__construct();
        $this->setTemplate('web4pro/fourover/product_options.phtml');
    }

    public function getProduct()
    {
        return Mage::registry('fover_product');
    }
} 