<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 03.07.15
 * Time: 12:34
 */

class Web4pro_Pixopa_Model_Backend_Example extends Mage_Eav_Model_Entity_Attribute_Backend_Abstract {

    protected $_moduleName = 'pixopa';

    public function beforeSave($object)
    {
        $this->_prepareUploadFile($object);
        return $this;
    }

    protected function _prepareUploadFile($object)
    {
        $attrCode = $this->getAttribute()->getAttributeCode();
        if($data = Mage::app()->getRequest()->getPost()){
            if(isset($data[$attrCode])){
                if(is_array($data[$attrCode]) && isset($data[$attrCode]['delete'])){
                    if($data[$attrCode]['delete']){
                        if($object->getOrigData($attrCode)){
                            $file = $this->getMediaPath($object->getOrigData($attrCode));
                            $path = pathinfo($file);
                            unlink($file);
                            unlink($path['dirname'].DS.$path['filename'].'.jpeg');
                            unlink($path['dirname'].DS.$path['filename'].'.zip');
                            $object->setData($attrCode,'');
                        }
                    }
                }
            }
        }

        if(isset($_FILES[$attrCode]['name']) && (file_exists($_FILES[$attrCode]['tmp_name']))) {
            $uploader = new Varien_File_Uploader($attrCode);
            $uploader->setAllowedExtensions(array('pdf')); // or pdf or anything
            $uploader->setAllowRenameFiles(true);
            $uploader->setFilesDispersion(true);

            $path = $this->getBaseMediaPath();
            $result = $uploader->save($path);
            $pdf = $result['file'];
            $im_path = Mage::getStoreConfig('dol/system_setting/im_path');

            if($im_path){
                $eps_pdf_dpi = Mage::getStoreConfig('dol/system_setting/eps_pdf_dpi');
                $original = $this->getBaseMediaPath().DS.$pdf;
                $path  = pathinfo($original);
                $original_new = $path['dirname'].DS.$path['filename'].'.jpeg';
                exec($im_path.' -quality 100 -background transparent -density '.$eps_pdf_dpi.' -trim -resize 3000 '.$original.' '.$original_new);
                if(is_file($path['dirname'].DS.$path['filename'].'-0.jpeg')){
                    $i = 0;
                    $arc = new ZipArchive();
                    $arc->open($path['dirname'].DS.$path['filename'].'.zip',ZIPARCHIVE::CREATE||ZIPARCHIVE::OVERWRITE);
                    while(is_file($path['dirname'].DS.$path['filename'].'-'.$i.'.jpeg')){
                        $arc->addFile($path['dirname'].DS.$path['filename'].'-'.$i.'.jpeg',$path['filename'].'-'.$i.'.jpeg');
                        $i++;
                    }
                    $arc->close();
                    for($j=0;$j<=$i;$j++){
                        unlink($path['dirname'].DS.$path['filename'].'-'.$j.'.jpeg');
                    }
                }
            }

            $object->setData($attrCode,$pdf);
        }
    }

    public function getBaseMediaPathAddition()
    {
        return $this->_moduleName;
    }

    public function getBaseMediaUrlAddition()
    {
        return  $this->_moduleName;
    }

    public function getBaseMediaPath()
    {
        return Mage::getBaseDir('media') . DS . $this->getBaseMediaPathAddition();
    }

    public function getBaseMediaUrl()
    {
        return Mage::getBaseUrl('media') . $this->getBaseMediaUrlAddition();
    }

    public function afterSave($object){
        $attrCode = $this->getAttribute()->getAttributeCode();
        if($object->getOrigData($attrCode)&&($object->getOrigData($attrCode)!=$object->getData($attrCode))){
            $file = $this->getMediaPath($object->getOrigData($attrCode));
            $path = pathinfo($file);
            unlink($file);
            unlink($path['dirname'].DS.$path['filename'].'.jpeg');
            unlink($path['dirname'].DS.$path['filename'].'.zip');
        }
        return parent::afterSave($object);
    }

    public function getMediaPath($file){
        return $this->getBaseMediaPath().DS.$file;
    }
} 