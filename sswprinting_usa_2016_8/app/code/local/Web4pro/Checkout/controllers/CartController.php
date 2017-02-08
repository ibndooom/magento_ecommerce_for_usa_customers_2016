<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 06.07.15
 * Time: 15:52
 */
require_once Mage::getModuleDir('controllers', 'Pixopa_Checkout') . DS . 'CartController.php';

class Web4pro_Checkout_CartController extends Pixopa_Checkout_CartController {

    public function edititemAction(){
        $id = (int) $this->getRequest()->getParam('id');
        $quoteItem = null;
        $cart = $this->_getCart();
        if ($id) {
            $quoteItem = $cart->getQuote()->getItemById($id);
        }

        if (!$quoteItem) {
            $this->_getSession()->addError($this->__('Quote item is not found.'));

        }else{
            try {
                $params = new Varien_Object();
                $params->setCategoryId(false);
                $params->setConfigureMode(true);
                $params->setBuyRequest($quoteItem->getBuyRequest());

                $options = new Varien_Object();
                $opts = array();
                if($optionIds = $quoteItem->getOptionByCode('option_ids')){
                    $optionIds = explode(',',$optionIds->getValue());
                    foreach($optionIds as $opt){
                        $opts[$opt]=$quoteItem->getOptionByCode('option_'.$opt)->getValue();
                    }
                }
                $options->setOptions($opts);
                Mage::register('preconfiguration',$options);
                $html = $this->prepareAndRender($quoteItem->getProduct()->getId(), $this, $params);

            } catch (Exception $e) {
                $this->_getSession()->addError($this->__('Cannot configure product.'));
                Mage::logException($e);

            }
        }


        $this->initLayoutMessages(array('catalog/session', 'tag/session', 'checkout/session'));
        $result = array(
            'messages'=>$this->getLayout()->getBlock('global_messages')->toHtml(),
            'html'=>$html
        );
        $this->getResponse()->setBody(json_encode($result));

    }

    public function prepareAndRender($productId,$controller,$params){
        $productHelper = Mage::helper('catalog/product');
        if (!$params) {
            $params = new Varien_Object();
        }

        // Standard algorithm to prepare and rendern product view page
        $product = $productHelper->initProduct($productId, $controller, $params);
        if (!$product) {
            throw new Mage_Core_Exception($this->__('Product is not loaded'), $this->ERR_NO_PRODUCT_LOADED);
        }

        $buyRequest = $params->getBuyRequest();
        if ($buyRequest) {
            $productHelper->prepareProductOptions($product, $buyRequest);
        }

        if ($params->hasConfigureMode()) {
            $product->setConfigureMode($params->getConfigureMode());
        }

        Mage::dispatchEvent('catalog_controller_product_view', array('product' => $product));

        if ($params->getSpecifyOptions()) {
            $notice = $product->getTypeInstance(true)->getSpecifyOptionMessage();
            Mage::getSingleton('catalog/session')->addNotice($notice);
        }

        Mage::getSingleton('catalog/session')->setLastViewedProductId($product->getId());
        $this->getLayout()->getUpdate()->addHandle('checkout_cart_configure');
        Mage::helper('catalog/product_view')->initProductLayout($product, $controller);

        $productInfo=$this->getLayout()->getBlock('product.info')->setTemplate('web4pro/pixopa/configure.phtml');
        $product->setPreconfiguredValues(Mage::registry('preconfiguration'));
        if($productId!=$product->getId()){
           $childProduct = Mage::getModel('catalog/product')->load($productId);
           $childProduct->setPreconfiguredValues(Mage::registry('preconfiguration'));
           $productInfo->getLayout()->getBlock('product.info.options')->setProduct($childProduct);
        }
        $productInfo->setSubmitRouteData(array(
            'route' => 'web4procheckout/cart/updateItem',
            'params' => array('id' => $this->getRequest()->getParam('id'))
        ));
        return $productInfo->toHtml();



    }


    public function updateItemAction()
    {
        Mage::log('Inside updateItemAction');

        $cart   = $this->_getCart();
        $id = (int) $this->getRequest()->getParam('id');
        $cpid = (int) $this->getRequest()->getParam('cpid');
        $params = $this->getRequest()->getParams();

        $item_id = $params['id'];
        $super_attribute_id = $this->getRequest()->getParam('super_attribute_id');
        $super_attribute_value = $this->getRequest()->getParam('super_attribute_value');

        $options = $this->getRequest()->getParam('options');
        $super_attributes = array();
        $custom_options = array();
        $configurable_update = false;
        $options_update = false;

        $item =	Mage::getSingleton('checkout/session')->getQuote()->getItemById($item_id);
        $buyRequest = unserialize($item->getOptionByCode('info_buyRequest')->getValue());
        $product_id = $item->getProduct()->getId();

        if(array_key_exists('super_attribute', $buyRequest)){
            $super_attributes = $buyRequest['super_attribute'];
        }

        if(array_key_exists('options', $buyRequest)){
            $custom_options = $buyRequest['options'];
        }

        
        if(is_array($options)){
            foreach($options as $option_id=>$option_value){
                $custom_options[$option_id] = $option_value;
                $options_update = true;
            }
            foreach($custom_options as $option_id=>$option_value){
                if(!isset($options[$option_id])){
                    unset($custom_options[$option_id]);
                }
            }
        }


        $buyRequest['options'] = $custom_options;

        if (!isset($buyRequest['options'])) {
            $buyRequest['options'] = array();
        }

        try {
            if (isset($buyRequest['qty'])) {
                $filter = new Zend_Filter_LocalizedToNormalized(
                    array('locale' => Mage::app()->getLocale()->getLocaleCode())
                );
                $buyRequest['qty'] = $filter->filter($buyRequest['qty']);
            }

            $quoteItem = $cart->getQuote()->getItemById($id);
            if (!$quoteItem) {
                Mage::throwException($this->__('Quote item is not found.'));
            }

            if($options_update){
                $item = $cart->updateItem($id, new Varien_Object($buyRequest));
                if (is_string($item)) {
                    Mage::throwException($item);
                }
                if ($item->getHasError()) {
                    Mage::throwException($item->getMessage());
                }

                $related = $this->getRequest()->getParam('related_product');
                if (!empty($related)) {
                    $cart->addProductsByIds(explode(',', $related));
                }
            }

            if($configurable_update && $cpid){

                $configurable_product = Mage::getModel('catalog/product')->load($cpid);

                $childProduct = Mage::getModel('catalog/product_type_configurable')->getProductByAttributes($super_attributes, $configurable_product);

                if(!$childProduct){
                    $this->_redirect('*/*');
                    return;
                }

                $childProduct = Mage::getModel('catalog/product')
                    ->setStoreId(Mage::app()->getStore()->getId())
                    ->load($childProduct->getId());

                $buyRequest['product'] = $childProduct->getId();


                $helper = Mage::helper('catalog/product_configuration');
                $current_options = $helper->getCustomOptions($item);

                //Sync Product Custom Options
                $new_custom_options = array();

                foreach ($childProduct->getOptions() as $opt) {

                    $optionType = $opt->getType();
                    $option_id = $opt->getId();

                    foreach($current_options as $current_option){

                        if($current_option['label']!=$opt->getTitle()){
                            continue;
                        }

                        $values = $opt->getValues();
                        $option_type = $opt->getType();

                        if($option_type=='drop_down' || $option_type=='radio'){
                            foreach ($values as $v) {
                                if(strpos($current_option['value'], htmlentities($v->getTitle()))!==false){
                                    $new_custom_options[$opt->getId()] = $v->getId();
                                    break;
                                }
                            }
                        }

                        if($option_type=='field' || $option_type=='area'){
                            $new_custom_options[$opt->getId()] = $buyRequest['options'][$current_option['option_id']];
                        }

                        if($option_type=='file'){
                            $new_custom_options[$opt->getId()]['type'] = $buyRequest['options'][$current_option['option_id']]['type'];
                            $new_custom_options[$opt->getId()]['title'] = $buyRequest['options'][$current_option['option_id']]['title'];
                            $new_custom_options[$opt->getId()]['quote_path'] = $buyRequest['options'][$current_option['option_id']]['quote_path'];
                            $new_custom_options[$opt->getId()]['order_path'] = $buyRequest['options'][$current_option['option_id']]['order_path'];
                            $new_custom_options[$opt->getId()]['fullpath'] = $buyRequest['options'][$current_option['option_id']]['fullpath'];
                            $new_custom_options[$opt->getId()]['size'] = $buyRequest['options'][$current_option['option_id']]['size'];
                            $new_custom_options[$opt->getId()]['width'] = $buyRequest['options'][$current_option['option_id']]['width'];
                            $new_custom_options[$opt->getId()]['height'] = $buyRequest['options'][$current_option['option_id']]['height'];
                            $new_custom_options[$opt->getId()]['secret_key'] = $buyRequest['options'][$current_option['option_id']]['secret_key'];
                        }

                        if($option_type=='multiple' || $option_type=='checkbox'){

                            $current_field_values = explode(', ', $current_option['value']);

                            foreach ($values as $v) {
                                foreach($current_field_values as $current_field_value){
                                    if(strpos($current_field_value, htmlentities($v->getTitle()))!==false){
                                        $new_custom_options[$opt->getId()][] = $v->getId();
                                    }
                                }
                            }
                        }
                    }
                }

                $buyRequest['options'] = $new_custom_options;

                $resultItem = $cart->addProduct($childProduct, $buyRequest);

                if ($resultItem->getId() != $item_id) {
                    $cart->removeItem($item_id);
                }
            }

            $cart->save();
            $this->_getSession()->setCartWasUpdated(true);

            //update customer design
            if(array_key_exists('design_id', $buyRequest)){
                $customer_design = Mage::getModel('template/customerdesign')->load($buyRequest['design_id']);
                if($super_attributes){
                    $customer_design->setData('super_attributes', json_encode($super_attributes));
                }
                if($custom_options){
                    $customer_design->setData('custom_options', json_encode($custom_options));
                }
                $customer_design->save();
            }

            Mage::dispatchEvent('checkout_cart_update_item_complete',
                array('item' => $item, 'request' => $this->getRequest(), 'response' => $this->getResponse())
            );
            if (!$this->_getSession()->getNoCartRedirect(true)) {
                if (!$cart->getQuote()->getHasError()) {
                    $message = $this->__('%s was updated in your shopping cart.', Mage::helper('core')->escapeHtml($item->getProduct()->getName()));
                    $this->_getSession()->addSuccess($message);
                }
                $this->_goBack();
            }
        } catch (Mage_Core_Exception $e) {
            if ($this->_getSession()->getUseNotice(true)) {
                $this->_getSession()->addNotice($e->getMessage());
            } else {
                $messages = array_unique(explode("\n", $e->getMessage()));
                foreach ($messages as $message) {
                    $this->_getSession()->addError($message);
                }
            }

            $url = $this->_getSession()->getRedirectUrl(true);
            if ($url) {
                $this->getResponse()->setRedirect($url);
            } else {
                $this->_redirectReferer(Mage::helper('checkout/cart')->getCartUrl());
            }
        } catch (Exception $e) {
            $this->_getSession()->addException($e, $this->__('Cannot update the item.'));
            Mage::logException($e);
            $this->_goBack();
        }
        $this->_redirectUrl(Mage::helper('checkout/cart')->getCartUrl());
    }

    public function duplicateAction(){
        $id = (int) $this->getRequest()->getParam('id');
        $quoteItem = null;
        $cart = $this->_getCart();
        if ($id) {
            $quoteItem = $cart->getQuote()->getItemById($id);
        }

        if (!$quoteItem) {
            $this->_getSession()->addError($this->__('Quote item is not found.'));

        }else{
        try{
            $newItem = clone $quoteItem;
            $newItem->setId(null);
            $options = $newItem->getOptions();
            foreach($options as $option){
                $option->setId(null);
            }
            $design = Mage::getModel('template/customerdesign')->load($newItem->getOptionByCode('design_id')
                ->getValue());
            if($design->getId()){
                $newDesign = clone $design;
                $newDesign->setId(null)->save();
                $newItem->getOptionByCode('design_id')->setValue($newDesign->getId());
                $infoBuyRequest = $newItem->getOptionByCode('info_buyRequest');
                $val = unserialize($infoBuyRequest->getValue());
                $val['design_id'] = $newDesign->getId();
                $infoBuyRequest->setValue(serialize($val));
            }
            $this->_getQuote()->addItem($newItem);
            $this->_getQuote()->collectTotals();
            $this->_getQuote()->save();
            $this->_getSession()->addSuccess($this->__('Item is duplicated successfully'));
        }catch(Exception $e){
            Mage::logException($e);
            $this->_getSession()->addError($this->__('Unexpected error'));
        }
        }
        $this->_redirectUrl(Mage::helper('checkout/cart')->getCartUrl());

    }

    public function viewAction(){
        $id = (int) $this->getRequest()->getParam('id');
        $quoteItem = null;
        $cart = $this->_getCart();
        if ($id) {
            $quoteItem = $cart->getQuote()->getItemById($id);
        }

        if (!$quoteItem) {
            $this->_getSession()->addError($this->__('Quote item is not found.'));
        }else{
            $html = '';
            $this->loadLayout();
            if($designOption = $quoteItem->getOptionByCode('design_id')){
                $design = Mage::getModel('template/customerdesign')->load($designOption->getValue());
                if ($design->getId()) {
                    //getting list of SVG data(documents) that represent given customer design
                    //array is keyed by design's porsition property
                    $svgData = array();
                    //getting first item of svgs' set
                    $svgDesign = Mage::getModel('template/customersvgdesign')->load($design->getPrimaryContentId());
                    $svgData[$svgDesign->getPosition()] = $svgDesign->getSvgData();
                    //getting child elements(the rest of the sides for design) of pointed design
                    $svgDesignChilds = Mage::getModel('template/customersvgdesign')
                        ->getCollection()
                        ->addFieldToFilter('parent_design_id', array('eq' => $design->getPrimaryContentId()))
                        ->addFieldToSelect('svg_data')
                        ->setOrder('position', 'asc' );
                    foreach ($svgDesignChilds  as $_design) {
                        $svgData[$_design->getPosition()] = $_design->getSvgData();
                    }
                    $html = $this->getLayout()->createBlock('core/template')->setSvgData($svgData)
                                 ->setTemplate('pixopa/checkout/cart/popup_view.phtml')->toHtml();

                }
            }
        }
        $this->initLayoutMessages(array('catalog/session', 'tag/session', 'checkout/session'));
        $result = array(
            'messages'=>$this->getLayout()->getBlock('global_messages')->toHtml(),
            'html'=>$html
        );
        $this->getResponse()->setBody(json_encode($result));
    }

} 