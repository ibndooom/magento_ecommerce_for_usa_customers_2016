<?php

#The methods in there have become a bit convoluted, so it could benefit from a tidy,
#...though the logic is not that simple any more.

class OrganicInternet_SimpleConfigurableProducts_Catalog_Model_Product_Type_Configurable_Price
    extends Mage_Catalog_Model_Product_Type_Configurable_Price
{
    #We don't want to show a separate 'minimal' price for configurable products.
    public function getMinimalPrice($product)
    {
        return $this->getPrice($product);
    }

    public function getMaxPossibleFinalPrice($product) {
        #Indexer calculates max_price, so if this value's been loaded, use it
        $price = $product->getMaxPrice();
        if ($price !== null) {
            return $price;
        }

        $childProduct = $this->getChildProductWithHighestPrice($product, "finalPrice");
        #If there aren't any salable child products we return the highest price
        #of all child products, including any ones not currently salable.

        if (!$childProduct) {
            $childProduct = $this->getChildProductWithHighestPrice($product, "finalPrice", false);
        }

        if ($childProduct) {
            return $childProduct->getFinalPrice();
        }
        return false;
    }

    #If there aren't any salable child products we return the lowest price
    #of all child products, including any ones not currently salable.
    public function getFinalPrice($qty=null, $product)
    {
/*
        #calculatedFinalPrice seems not to be set in this version (1.4.0.1)
        if (is_null($qty) && !is_null($product->getCalculatedFinalPrice())) {
            #Doesn't usually get this far as Product.php checks first.
            #Mage::log("returning calculatedFinalPrice for product: " . $product->getId());
            return $product->getCalculatedFinalPrice();
        }
*/
        $childProduct = $this->getChildProductWithLowestPrice($product, "finalPrice");
        if (!$childProduct) {
            $childProduct = $this->getChildProductWithLowestPrice($product, "finalPrice", false);
        }

        if ($childProduct) {
            $fp = $childProduct->getFinalPrice();
        } else {
            return false;
        }

        $product->setFinalPrice($fp);
        return $fp;
    }

    public function getPrice($product)
    {
        #Just return indexed_price, if it's been fetched already
        #(which it will have been for collections, but not on product page)
        $price = $product->getIndexedPrice();
        if ($price !== null) {
            return $price;
        }

        $childProduct = $this->getChildProductWithLowestPrice($product, "finalPrice");
        #If there aren't any salable child products we return the lowest price
        #of all child products, including any ones not currently salable.
        if (!$childProduct) {
            $childProduct = $this->getChildProductWithLowestPrice($product, "finalPrice", false);
        }

        if ($childProduct) {
            return $childProduct->getPrice();
        }

        return false;
    }

    public function getChildProducts($product, $checkSalable=true)
    {
        static $childrenCache = array();
        $cacheKey = $product->getId() . ':' . $checkSalable;

        if (isset($childrenCache[$cacheKey])) {
            return $childrenCache[$cacheKey];
        }

        $childProducts = $product->getTypeInstance(true)->getUsedProductCollection($product);
        $childProducts->addAttributeToSelect(array('price', 'special_price', 'status', 'special_from_date', 'special_to_date'));

        if ($checkSalable) {
            $salableChildProducts = array();
            foreach($childProducts as $childProduct) {
                if($childProduct->isSalable()) {
                    $salableChildProducts[] = $childProduct;
                }
            }
            $childProducts = $salableChildProducts;
        }

        $childrenCache[$cacheKey] = $childProducts;
        return $childProducts;
    }

/*
    public function getLowestChildPrice($product, $priceType, $checkSalable=true)
    {
        $childProduct = $this->getChildProductWithLowestPrice($product, $priceType, $checkSalable);
        if ($childProduct) {
            if ($priceType == "finalPrice") {
                $childPrice = $childProduct->getFinalPrice();
            } else {
                $childPrice = $childProduct->getPrice();
            }
        } else {
            $childPrice = false;
        }
        return $childPrice;
    }
*/
    #Could no doubt add highest/lowest as param to save 2 near-identical functions
    public function getChildProductWithHighestPrice($product, $priceType, $checkSalable=true)
    {
        $childProducts = $this->getChildProducts($product, $checkSalable);
        if (count($childProducts) == 0) { #If config product has no children
            return false;
        }
        $maxPrice = 0;
        $maxProd = false;
        foreach($childProducts as $childProduct) {
            if ($priceType == "finalPrice") {
                $thisPrice = $childProduct->getFinalPrice();
            } else {
                $thisPrice = $childProduct->getPrice();
            }
            if($thisPrice > $maxPrice) {
                $maxPrice = $thisPrice;
                $maxProd = $childProduct;
            }
        }
        return $maxProd;
    }

    public function getChildProductWithLowestPrice($product, $priceType, $checkSalable=true)
    {
        $childProducts = $this->getChildProducts($product, $checkSalable);
        if (count($childProducts) == 0) { #If config product has no children
            return false;
        }
        $minPrice = PHP_INT_MAX;
        $minProd = false;
        foreach($childProducts as $childProduct) {
            if ($priceType == "finalPrice") {
                $thisPrice = $childProduct->getFinalPrice();
            } else {
                $thisPrice = $childProduct->getPrice();
            }
            if($thisPrice < $minPrice) {
                $minPrice = $thisPrice;
                $minProd = $childProduct;
            }
        }
        return $minProd;
    }

    //Force tier pricing to be empty for configurable products:
    public function getTierPrice($qty=null, $product)
    {
        return array();
    }
    
    /*
    //Advanced Product Options
    protected function _applyOptionsPrice($product, $qty, $finalPrice) {

        if ($optionIds = $product->getCustomOption('option_ids')) {
            $basePrice = $finalPrice;
            //$finalPrice = 0;
            foreach (explode(',', $optionIds->getValue()) as $optionId) {
                if ($option = $product->getOptionById($optionId)) {
                    $optionQty = null;
                    $quoteItemOptionInfoBuyRequest = unserialize($product->getCustomOption('info_buyRequest')->getValue());
                    switch ($option->getType()) {
                        case 'checkbox':
                            if (isset($quoteItemOptionInfoBuyRequest['options'][$optionId])) {                                                                
                                $optionValues = array();
                                $optionQtyArr = array();
                                foreach ($option->getValues() as $key=>$itemV) {                                    
                                    if (isset($quoteItemOptionInfoBuyRequest['options_'.$optionId.'_'.$itemV->getOptionTypeId().'_qty'])) $optionQty = intval($quoteItemOptionInfoBuyRequest['options_'.$optionId.'_'.$itemV->getOptionTypeId().'_qty']); else $optionQty = 1;
                                    $optionQtyArr[$itemV->getOptionTypeId()] = $optionQty;
                                }
                                $optionQty = $optionQtyArr;
                                break;                                
                            }
                            break;
                        case 'drop_down':
                        case 'radio':                            
                            if (isset($quoteItemOptionInfoBuyRequest['options_'.$optionId.'_qty'])) $optionQty = intval($quoteItemOptionInfoBuyRequest['options_'.$optionId.'_qty']); else $optionQty = 1;
                        case 'multiple':
                            if (!isset($optionQty)) $optionQty = 1;
                            break;
                        case 'field':
                        case 'area':
                        case 'file':
                        case 'date':
                        case 'date_time':
                        case 'time':
                            break;
                    }

                    switch ($option->getType()) {
                        case 'field':
                        case 'area':
                        case 'file':
                        case 'date':
                        case 'date_time':
                        case 'time':
                            $finalPrice += $this->_getCustomOptionsChargableOptionPrice($option->getPrice(), $option->getPriceType() == 'percent', $basePrice, $qty, $option->getCustomoptionsIsOnetime());
                            break;                        
                        default: //multiple
                            $optionQty = 1;
                        case 'drop_down':
                        case 'radio':
                        case 'checkbox':
                            $quoteItemOption = $product->getCustomOption('option_' . $option->getId());
                            $group = $option->groupFactory($option->getType())->setOption($option)->setQuoteItemOption($quoteItemOption);
                            $finalPrice += $group->getOptionPrice($quoteItemOption->getValue(), $finalPrice, $qty, $optionQty);                            
                    }
                }
            }
            //if (!Mage::helper('customoptions')->getProductAbsolutePrice($product) || $finalPrice==0) $finalPrice += $basePrice;
        }        
        return $finalPrice;
    }

    protected function _getCustomOptionsChargableOptionPrice($price, $isPercent, $basePrice, $qty = 1, $customoptionsIsOnetime = 0) {
        $sub = 1;
        if ($customoptionsIsOnetime) {
            $sub = $qty;
        }
        if ($isPercent) {
            return ($basePrice * $price / 100) / $sub;
        } else {
            return $price / $sub;
        }
    }
    */
    
}
