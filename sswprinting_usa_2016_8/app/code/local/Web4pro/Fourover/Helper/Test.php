<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Helper_Test extends Mage_Core_Helper_Abstract
{
    protected $_pricelistCsv = '';
    
    /**
     * Builds HTML document to represent 4over products
     *
     * @return string
     */
    public function getProductsTableHtml()
    {
        $collection = Mage::getModel('web4pro_4over/product')->getCollection();
        $collection->addFieldToFilter('has_full_info', 1);

        $rowsHtml = '';
        foreach ($collection as $product) {
            $rowsHtml .= $this->_getProductTableRowHtml($product);  
        }

        if ($rowsHtml) {
            return sprintf($this->_getProductHtmlTableDocumentTemplate(), $rowsHtml);
        } else {
            return false;
        }
    }
    
    protected function _getProductTableRowHtml($product)
    {
        $helper = Mage::helper('core');
        $rowTemplate = "
            <tr>
                <td>%s</td>
                <td>%s</td>
                <td>%s</td>
                <td>%s</td>
            </tr>";

        return sprintf($rowTemplate,
                $helper->escapeHtml($product->getProductUuid()),
                $helper->escapeHtml($product->getProductCode()),
                $helper->escapeHtml($product->getProductDescription()),
                str_replace("\n", '<br>', $helper->escapeHtml($product->getProductOptionFormattedDescription()))
            );
    }

    protected function _getProductHtmlTableDocumentTemplate()
    {
        return '
            <html>
              <head>
                <title>4over products</title>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <style type="text/css">
                    thead tr {background-color: ActiveCaption; color: CaptionText;}
                    th, td {vertical-align: top; font-family: "Tahoma", Arial, Helvetica, sans-serif; font-size: 8pt; padding: 3px; }
                    table, td {border: 1px solid silver;}
                    table {border-collapse: collapse;}
                    thead .col0 {width: 280px;}
                    thead .col1 {width: 210px;}
                    thead .col2 {width: 300px;}
                    thead .col3 {width: 260px;}
                </style>
              </head>
              <body>
                <table>
                  <thead>
                    <tr>
                      <th class="col0">Product UUID</th>
                      <th class="col1">Product Code</th>
                      <th class="col2">Product Description</th>
                      <th class="col3">Product Options</th>
                    </tr>
                  </thead>
                  <tbody>%s</tbody>
                </table>
              </body>
            </html>';
    }

    /**
     * Builds HTML document to represent 4over products pricing
     *
     */
    public function getPricelistTableHtml()
    {
        $collection = Mage::getModel('web4pro_4over/product')->getCollection();
        $collection->addFieldToFilter('is_baseprices_updated', 1);

        $rowsHtml = '';
        foreach ($collection as $product) {
            $product->getBasePrices();
            $rowsHtml .= $this->_getPricelistTableRowHtml($product);  
        }

        if ($rowsHtml) {
            return sprintf($this->_getProductHtmlTableDocumentTemplate(), $rowsHtml);
        } else {
            return false;
        }   
    }
    
    protected function _getPricelistTableRowHtml($product)
    {
        $helper = Mage::helper('core');
        $rowTemplate = "
            <tr>
                <td>%s</td>
                <td>%s</td>
                <td>%s</td>
                <td>%s</td>
            </tr>";

        return sprintf($rowTemplate,
                $helper->escapeHtml($product->getProductUuid()),
                $helper->escapeHtml($product->getProductCode()),
                $helper->escapeHtml($product->getProductDescription()),
                $this->_getFormattedProductPrices($product)
            );
    }

    protected function _getFormattedProductPrices($product)
    {
        $basePrices = $product->getBasePrices();
        $cell  = '';
        foreach ($basePrices as $_price){
            $runsize   = (int)$_price->getData('runsize');
            $colorspec = $this->escapeHtml($_price->getData('colorspec'));
            $price     = (float)$_price->getData('product_baseprice');
            $price     = Mage::helper('core')->formatPrice($price);
            //limitting runsize option to 5000
            if ($runsize > 5000) continue;

            $cell .=  sprintf('%s pcs, %s - %s<br>', $runsize, $colorspec, $price);
        }
        
        return $cell;
    }

    protected function _getPricelistTableDocumentTemplate()
    {
        return '
            <html>
              <head>
                <title>4over products</title>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <style type="text/css">
                    thead tr {background-color: ActiveCaption; color: CaptionText;}
                    th, td {vertical-align: top; font-family: "Tahoma", Arial, Helvetica, sans-serif; font-size: 8pt; padding: 3px; }
                    table, td {border: 1px solid silver;}
                    table {border-collapse: collapse;}
                    thead .col0 {width: 280px;}
                    thead .col1 {width: 210px;}
                    thead .col2 {width: 300px;}
                    thead .col3 {width: 260px;}
                </style>
              </head>
              <body>
                <table>
                  <thead>
                    <tr>
                      <th class="col0">Product UUID</th>
                      <th class="col1">Product Code</th>
                      <th class="col2">Product Description</th>
                      <th class="col3">Product Base Prices</th>
                    </tr>
                  </thead>
                  <tbody>%s</tbody>
                </table>
              </body>
            </html>';
    }

    /**
     * Builds CSV document to represent 4over products pricing
     *
     */
    public function getPricelistCsv()
    {
        $collection = Mage::getModel('web4pro_4over/product')->getCollection();
        $collection->addFieldToFilter('is_baseprices_updated', 1);
        //$collection->setPageSize(10);

        $this->_pricelistCsv = '';
        $collection->walk(array($this, 'getProductPriceList'));

        return $this->_getPricelistHeaderRow() . $this->_pricelistCsv;
    }

    protected function _getPricelistHeaderRow()
    {
        $headRow = array('Product UUID', 'Product Code', 'Product Description', 'Quantity', 'Color Spec', 'Cost');
        return $this->getCsvString($headRow);
    }

    public function getProductPriceList($product)
    {
        $basePrices = $product->getBasePrices();

        foreach ($basePrices as $_price){
            $runsize = (int)$_price->getData('runsize');
            //limitting runsize option to 5000
            if ($runsize > 5000) continue;

            $rowData   = array();
            $rowData[] = $product->getProductUuid();
            $rowData[] = $product->getProductCode();
            $rowData[] = $product->getProductDescription();
            $rowData[] = $runsize;
            $rowData[] = $this->escapeHtml($_price->getData('colorspec'));
            $rowData[] = (float)$_price->getData('product_baseprice');
            $this->_pricelistCsv .=  $this->getCsvString($rowData);
        }
    }

    public function getCsvString($rowData = array(), $delimiter = ',', $enclosure = '"')
    {
        $str = '';
        $escape_char = '\\';
        foreach ($rowData as $value) {
            if (strpos($value, $delimiter) !== false ||
                strpos($value, $enclosure) !== false ||
                strpos($value, "\n") !== false ||
                strpos($value, "\r") !== false ||
                strpos($value, "\t") !== false ||
                strpos($value, ' ') !== false) {
                $str2 = $enclosure;
                $escaped = 0;
                $len = strlen($value);
                for ($i=0;$i<$len;$i++) {
                    if ($value[$i] == $escape_char) {
                        $escaped = 1;
                    } else if (!$escaped && $value[$i] == $enclosure) {
                        $str2 .= $enclosure;
                    } else {
                        $escaped = 0;
                    }
                        $str2 .= $value[$i];
                }
                $str2 .= $enclosure;
                $str .= $str2.$delimiter;
            } else {
                $str .= $enclosure.$value.$enclosure.$delimiter;
            }
        }
        $str = substr($str,0,-1);
        $str .= "\n";

        return $str;
    }

    public function getPricelistAction()
    {
        $csv = Mage::helper('web4pro_4over/test')->getPricelistCsv();
        if ($csv) {
            $this->_prepareDownloadResponse('4over_baseprices.csv', $csv);
        } else {
            echo 'No data to show';
        }
    }
}

