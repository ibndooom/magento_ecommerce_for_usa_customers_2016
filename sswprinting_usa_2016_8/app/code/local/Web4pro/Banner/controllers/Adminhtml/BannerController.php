<?php

class Web4pro_Banner_Adminhtml_BannerController extends Mage_Adminhtml_Controller_Action
{
    protected function _initBanner()
	{
        $banner = Mage::getModel('banner/banner');
		if ($bannerId = $this->getRequest()->getParam('id')) {
			$banner->load($bannerId);
		}
        Mage::register('current_banner', $banner);
		return $banner;
	}

	public function indexAction()
	{
		$this->loadLayout();
		$this->_setActiveMenu('cms/banner');
		$this->renderLayout();
	}
	
	public function gridAction()
	{
		$this->getResponse()
			->setBody($this->getLayout()->createBlock('banner/adminhtml_banner_grid')->toHtml());
	}
	
	public function newAction()
	{
		$this->_forward('edit');
	}
	
	public function editAction()
	{
		$this->_initBanner();
		$this->loadLayout();
		$this->renderLayout();
	}
	
	public function saveAction()
	{
		if ($data = $this->getRequest()->getPost('banner')) {            
			$banner = Mage::getModel('banner/banner')->load($this->getRequest()->getParam('id'));
            $banner->addData($data)
                ->setId($this->getRequest()->getParam('id'));            
            $banner->setCategoryIds($this->getRequest()->getPost('category_ids'));
			try {
				$this->_handleImageUpload($banner);
                $this->_handleImageUpload($banner,'small_image');
                if(!$banner->getImage()||!$banner->getSmallImage()){
                   Mage::throwException($this->__("Image or Small Image isn't specified"));
                }
				$banner->save();
				$this->_getSession()->addSuccess($this->__('Banner was saved'));
			}
			catch (Exception $e) {
				$this->_getSession()->addError($e->getMessage());
				Mage::logException($e);
			}
			
			if ($this->getRequest()->getParam('back') && $banner->getId()) {
				$this->_redirect('*/*/edit', array('id' => $banner->getId()));
				return;
			}
		}else {
			$this->_getSession()->addError($this->__('There was no data to save'));
		}
		
		$this->_redirect('*/*/index');
	}

	protected function _handleImageUpload($banner, $field = 'image')
	{
		$data = $banner->getData($field);

		if (isset($data['value'])) {
			$banner->setData($field, $data['value']);
		}

		if (isset($data['delete']) && $data['delete'] == '1') {
			$banner->setData($field, '');
		}
        
		if ($filename = Mage::helper('banner/image')->uploadImage($field)) {
			$banner->setData($field, $filename);
		}
	}
	
	public function deleteAction()
	{
		if ($bannerId = $this->getRequest()->getParam('id')) {
			$banner = Mage::getModel('banner/banner')->load($bannerId);
			
			if ($banner->getId()) {
				try {
					$banner->delete();
					$this->_getSession()->addSuccess($this->__('The banner was deleted'));
				}
				catch (Exception $e) {
					$this->_getSession()->addError($e->getMessage());
				}
			}
		}		
		$this->_redirect('*/*');
	}
	
	public function massDeleteAction()
	{
		$bannerIds = $this->getRequest()->getParam('banner_ids');
		if (!is_array($bannerIds)) {
			$this->_getSession()->addError($this->__('Please select some banners'));
		}
		else {
			if (!empty($bannerIds)) {
				try {
					foreach ($bannerIds as $bannerId) {
						$banner = Mage::getModel('banner/banner')->load($bannerId);
						Mage::dispatchEvent('banner_controller_banner_delete', array('banner' => $banner));	
						$banner->delete();
					}					
					$this->_getSession()->addSuccess($this->__('Total of %d record(s) have been deleted.', count($bannerIds)));
				}
				catch (Exception $e) {
					$this->_getSession()->addError($e->getMessage());
				}
			}
		}		
		$this->_redirect('*/*/index');
	}	
    
    public function massStatusAction() 
    {        
        $bannerIds = $this->getRequest()->getParam('banner_ids');
        $status = $this->getRequest()->getParam('status');
        if (!is_array($bannerIds)) {
            Mage::getSingleton('adminhtml/session')->addError(Mage::helper('adminhtml')->__('Please select some banners.'));
        } else {
            try {
                foreach ($bannerIds as $bannerId) {
                    $banner = Mage::getModel('banner/banner')
                            ->load($bannerId)
                            ->setIsEnabled($status)
                            ->save();
                }
                $this->_getSession()->addSuccess(
                        $this->__('Total of %d record(s) were successfully updated', count($bannerIds))
                );
            } catch (Exception $e) {
                $this->_getSession()->addError($e->getMessage());
            }
        }
        $this->_redirect('*/*/index');
    }
    
    public function categoriesJsonAction()
    {
        $banner = $this->_initBanner();
        $this->getResponse()->setBody(
            $this->getLayout()->createBlock('banner/adminhtml_banner_edit_tab_category')
                ->getCategoryChildrenJson($this->getRequest()->getParam('category'))
        );
    }

}