<?php
/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magento.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magento.com for more information.
 *
 * @category    Mage
 * @package     Mage_Sales
 * @copyright  Copyright (c) 2006-2014 X.commerce, Inc. (http://www.magento.com)
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * Order item render block
 *
 * @category    Mage
 * @package     Mage_Sales
 * @author      Magento Core Team <core@magentocommerce.com>
 */
class Web4pro_Orderdetails_Block_Order_Item_Renderer_Default extends Mage_Sales_Block_Order_Item_Renderer_Default
{

    protected $_productUrl = null;
    protected $_productThumbnail = null;


    /**
     * Get item product
     *
     * @return Mage_Catalog_Model_Product
     */
    public function getProduct()
    {
        return $this->getOrderItem()->getProduct();
    }

    public function overrideProductThumbnail($productThumbnail)
    {
        $this->_productThumbnail = $productThumbnail;
        return $this;
    }

    /**
     * Get product thumbnail image
     *
     * @return Mage_Catalog_Model_Product_Image
     */
    public function getProductThumbnail()
    {
        if (!is_null($this->_productThumbnail)) {
            return $this->_productThumbnail;
        }
        return $this->helper('catalog/image')->init($this->getProduct(), 'thumbnail');
    }

    public function overrideProductUrl($productUrl)
    {
        $this->_productUrl = $productUrl;
        return $this;
    }

    /**
     * Check Product has URL
     *
     * @return bool
     */
    public function hasProductUrl()
    {
        if ($this->_ignoreProductUrl) {
            return false;
        }
        if ($this->_productUrl || $this->getOrderItem()->getRedirectUrl()) {
            return true;
        }

        $product = $this->getProduct();
        $option  = $this->getOrderItem()->getProductOptionByCode('product_type');
        if ($option) {
            $product = $option->getProduct();
        }
        if ($product->isVisibleInSiteVisibility()) {
            return true;
        }
        return false;
    }

    /**
     * Retrieve URL to item Product
     *
     * @return string
     */
    public function getProductUrl()
    {
        if (!is_null($this->_productUrl)) {
            return $this->_productUrl;
        }
        if ($this->getItem()->getRedirectUrl()) {
            return $this->getOrderItem()->getRedirectUrl();
        }

        $product = $this->getProduct();
        $option  = $this->getOrderItem()->getProductOptionByCode('product_type');

        if ($option) {
            $product = $option->getProduct();
        }

        return $product->getUrlModel()->getUrl($product);
    }

    /**
     * Get item product name
     *
     * @return string
     */
    public function getProductName()
    {
        if ($this->hasProductName()) {
            return $this->getData('product_name');
        }
        return $this->getProduct()->getName();
    }

}
