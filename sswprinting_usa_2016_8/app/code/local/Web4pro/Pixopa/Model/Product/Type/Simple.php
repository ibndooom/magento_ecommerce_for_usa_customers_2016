<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Pixopa
 */

if (Mage::helper('core')->isModuleEnabled('OrganicInternet_SimpleConfigurableProducts')) {
    class Web4pro_Pixopa_Model_Product_Type_Simple_Proxy extends OrganicInternet_SimpleConfigurableProducts_Catalog_Model_Product_Type_Simple {}
} else {
    class Web4pro_Pixopa_Model_Product_Type_Simple_Proxy extends Mage_Catalog_Model_Product_Type_Simple {}
}

class Web4pro_Pixopa_Model_Product_Type_Simple extends Web4pro_Pixopa_Model_Product_Type_Simple_Proxy
{
    public function getSku($product = null)
    {
        $sku = $this->getProduct($product)->getData('sku');
        if (!$this->getProduct($product)->getCustomOption('design_id')
                && $this->getProduct($product)->getCustomOption('option_ids')) {
            $sku = $this->getOptionSku($product,$sku);
        }
        return $sku;
    }
}