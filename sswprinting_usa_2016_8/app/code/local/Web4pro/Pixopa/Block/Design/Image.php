<?php
/**
 * Created by PhpStorm.
 * User: dmitriy
 * Date: 09.07.15
 * Time: 14:59
 */

class Web4pro_Pixopa_Block_Design_Image extends Mage_Core_Block_Template {

    protected $_vectorFormats = array('pdf', 'eps', 'ps');
    protected $_canShow = false;

    protected $_file;

    protected function _prepareLayout(){
        if($images = $this->getRequest()->getPost('uploaded_files')){
            $images = json_decode($images,true);
            if(isset($images[0])){
                $p = explode('?',$images[0]);

                if(isset($p[1])){
                    $pathArray = array();
                    $p1 = explode('&',$p[1]);
                    foreach($p1 as $pi){
                        $item = explode('=',$pi);
                        $pathArray[$item[0]]=$item[1];
                    }
                    $file = Mage::getBaseDir().'/uploader/files/'.$pathArray['idk'].'/'.$pathArray['id'].'/'.urldecode($pathArray['file']);
                    if(is_file($file)){

                        $path  = pathinfo($file);
                        $f = basename($file);
                        if(in_array($path['extension'], $this->_vectorFormats)){
                            $im_path = Mage::getStoreConfig('dol/system_setting/im_path');
                            $eps_pdf_dpi = Mage::getStoreConfig('dol/system_setting/eps_pdf_dpi');
                            $file_new = $path['dirname'].DS.$path['filename'].'.png';
                            exec($im_path.' -density '.$eps_pdf_dpi.' '.$file.' '.$file_new);
                            if(is_file($path['dirname'].DS.$path['filename'].'-0.png')){
                                $file = $path['dirname'].DS.$path['filename'].'-0.png';
                                $i = 1;
                                while(is_file($path['dirname'].DS.$path['filename'].'-'.$i.'.png')){
                                    unlink($path['dirname'].DS.$path['filename'].'-'.$i.'.png');
                                    $i++;
                                }

                            }else{
                                $file = $path['dirname'].DS.$path['filename'].'.png';
                            }
                            $f = basename($file);
                        }

                       $dir = Mage::getBaseDir('media').'/uploads/dol/'.substr($pathArray['file'],0,1);
                       if(!is_dir($dir)){
                           mkdir($dir);
                       }
                       copy($file,$dir.'/'.$f);
                       if(is_file($dir.'/'.$f)){
                           $this->_canShow = true;
                           $this->_file = 'uploads/dol/'.substr($pathArray['file'],0,1).'/'.urlencode($f);
                       }
                    }
                }

            }
        }
        return parent::_prepareLayout();
    }

   public function canShow(){
       return $this->_canShow;
   }

   public function getImageUrl(){
       return Mage::getBaseUrl('media').'/'.$this->_file;
   }
} 