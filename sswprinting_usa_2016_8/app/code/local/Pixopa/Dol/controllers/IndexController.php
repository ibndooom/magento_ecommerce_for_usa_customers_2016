<?php

class Pixopa_Dol_IndexController extends Mage_Core_Controller_Front_Action{

	var $totalFileInEachFolder = 60000;
	var $magick = "/usr/local/bin/convert";  
	const IM_ENABLED = 'dol/system_setting/im_enabled';
	const IM_PATH = 'dol/system_setting/im_path';
	const BLEED_MARGIN = 'dol/dol_setting/bleed_margin';
	const CONVERTER_PATH = 'dol/system_setting/converter_path';
	const EPS_PDF_DPI = 'dol/system_setting/eps_pdf_dpi';
	
	public function indexAction() {
      
	  $this->loadLayout();   
      $this->renderLayout(); 
    }
    
    public function aloneAction() {
    
    	$this->loadLayout();
    	$this->renderLayout();
    }
    
    public function personalizeAction() {
    
    	$this->loadLayout();
    	$this->renderLayout();
    }
    
    public function templateAction() {
    
    	$this->loadLayout();
    	$this->renderLayout();
    }
    
    public function pricingAction() {
    
    	$this->loadLayout();
    	$this->renderLayout();
    }
    
    public function jqueryuploadAction() {
    
    	$this->loadLayout();
    	$this->renderLayout();
    } 
    
	public function uploadRemoteFileAction(){
    	
		$image_url = $this->getRequest()->getParam('image_url');
		$zoom_factor = $this->getRequest()->getParam('zoom_factor');
		
		if(!$image_url){
			$response['error'] = 'Remote File URL is empty!';
			$result = json_encode($response);
			
			if($this->getRequest()->getParam("callback")) {
				if(Mage::helper('dol')->validateRequestOrigin()){
					echo 'jsonCallback('.$result.')';
				}else{
					echo '';
				}
			}else{
				echo $result;
			}
			return;
		}
		
		$uploads_dir = Mage::getBaseDir('media').'/uploads/dol';
    	
		$num_dir_arr = glob($uploads_dir."/*", GLOB_ONLYDIR);  
		$numDir = count($num_dir_arr);
		
		if($numDir > 0 ){
			foreach($num_dir_arr as $key=>$folder){
				
				$num_file_arr =	glob($folder."/*", GLOB_BRACE);
				$numFile = count($num_file_arr);
				$folder = $key+1;

				if($numFile < $this->totalFileInEachFolder){
					$this->uploadRemoteFile($uploads_dir."/".$key += 1, $image_url, $zoom_factor);
					return;
				}	
			}
			$this->createDirectory($uploads_dir."/".$folder +=1); 
			$this->uploadRemoteFile($uploads_dir."/".$folder, $image_url, $zoom_factor);
			
		}else{
			$this->createDirectory($uploads_dir."/1");
			$this->uploadRemoteFile($uploads_dir."/1", $image_url, $zoom_factor);
		}
    	
    }
    
	public function uploadRemoteFile($uploadPath, $image_url, $zoom_factor){
    	
		$image_url = urldecode($image_url);
		$extension = strtolower($this->getExtension($image_url));
		$rand_number = mt_rand(5, 100);
		$rand_number = $rand_number.mt_rand(100, 999);
		$imgName =  time().date("his").$rand_number;
		
		$is_cmyk = strpos($image_url,'-pixopa-rgb');
		if($is_cmyk !== false){
			$image_url =  str_replace('-pixopa-rgb', '', $image_url);
		}
		
		$original = $uploadPath."/".$imgName.".".$extension;
		$original_rgb = $uploadPath."/".$imgName."-pixopa-rgb.".$extension;
		    	
        if (!@file_put_contents($original, file_get_contents($image_url))) {
            $response['error'] = 'Uploading Remote File Failed!';
        	$result = json_encode($response);
			
			if($this->getRequest()->getParam("callback")) {
				if(Mage::helper('dol')->validateRequestOrigin()){
					echo 'jsonCallback('.$result.')';
				}else{
					echo '';
				}
			}else{
				echo $result;
			}
			return;
        }
        
        $im_enabled = Mage::getStoreConfig(self::IM_ENABLED);
		$im_path = Mage::getStoreConfig(self::IM_PATH);
		
		if($im_enabled){
			if($is_cmyk !== false){
				$pixopa_path = Mage::getStoreConfig(self::CONVERTER_PATH);
				exec($im_path.' '.$original.' -profile '.$pixopa_path.'/profiles/icc/cmyk/SWOP2006_Coated3v2.icc  -profile '.$pixopa_path.'/profiles/icc/rgb/sRGB_IEC61966-2-1_no_black_scaling.icc '. $original_rgb);
			}else{
				$original_rgb = $original;
			}
		}else{
			$original_rgb = $original;
		}
		
		list($width, $height) = getimagesize($original_rgb);
		
		$base_media_url = Mage::getBaseUrl('media', false);
		$base_media_dir = Mage::getBaseDir('media');
		
		$image_path = substr($original_rgb,strlen($base_media_dir)+1);
		$image_url = $base_media_url.$image_path;
		
		if($zoom_factor && $extension!='svg'){
			
			$new_height = $height/$zoom_factor;
			$new_width = $width/$zoom_factor;
			
			if($zoom_factor<=2){
				$max_canvas_width = 1000;
				$max_canvas_height = 1000;
			}
			
			if($zoom_factor>2 && $zoom_factor<=4){
				$max_canvas_width = 1500;
				$max_canvas_height = 1500;
			}
			
			if($zoom_factor>4){
				$max_canvas_width = 2000;
				$max_canvas_height = 2000;
			}
			
			if($new_height > $new_width || $new_height==$new_width){
				if($new_height>$max_canvas_height){
					$zoom_factor = $new_height / $max_canvas_height;
					$new_height = $new_height / $zoom_factor;
					$new_width = $new_width / $zoom_factor;
				}
			}else{
				if($new_width>$max_canvas_width){
					$zoom_factor = $new_width / $max_canvas_width;
					$new_height = $new_height / $zoom_factor;
					$new_width = $new_width / $zoom_factor;
				}
			}
			
			if($new_height!=$height || $new_width!=$width){
				$resized_image_name = str_replace($imgName, $imgName.'_sized', $original_rgb);
			
				$image_data = Mage::helper('dol')->resizeImage('', $original_rgb, false, false, $new_width, $new_height, false, false, $resized_image_name);
				$image_url = $image_data['url'];
				$width = $new_width;
				$height = $new_height;
			}
		}
		
		$uploaded_item = array();
		$uploaded_item['width']    = $width;
		$uploaded_item['height']   = $height;
		$uploaded_item['imageUrl'] = $image_url;
		$uploaded_item['status']   = 1;
		
		$result = json_encode($uploaded_item);
			
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.$result.')';
			}else{
				echo '';
			}
		}else{
			echo $result;
		}
	}
	
    public function uploadAction(){
    	
    	$uploads_dir = Mage::getBaseDir('media').'/uploads/dol';
    	$zoom_factor = $this->getRequest()->getParam('upload_zoom_factor');
    	
		$num_dir_arr = glob($uploads_dir."/*", GLOB_ONLYDIR);  
		$numDir = count($num_dir_arr);
		
		if($numDir > 0 ){
			foreach($num_dir_arr as $key=>$folder){
				
				$num_file_arr =	glob($folder."/*", GLOB_BRACE);
				$numFile = count($num_file_arr);
				$folder = $key+1;

				if($numFile < $this->totalFileInEachFolder){
					$this->uploadFileToDir($uploads_dir."/".$key += 1, $zoom_factor);
					return;
				}	
			}
			$this->createDirectory($uploads_dir."/".$folder +=1); 
			$this->uploadFileToDir($uploads_dir."/".$folder, $zoom_factor);
			
		}else{
			$this->createDirectory($uploads_dir."/1");
			$this->uploadFileToDir($uploads_dir."/1", $zoom_factor);
		}
	}
	
	function uploadFileToDir($uploadPath, $zoom_factor = null) {
		
		$fileName	 = $_FILES['Filedata']['name'];
		$file_tmp    = $_FILES['Filedata']['tmp_name'];
		$file_type   = $_FILES['Filedata']['type'];
		$file_size	 = $_FILES['Filedata']['size'];
		
		$extension = strtolower($this->getExtension($fileName));
		
		if($extension && $extension!='png' && $extension!='jpg' && $extension!='jpeg' && $extension!='pdf' && $extension!='eps' && $extension!='tif' && $extension!='tiff' && $extension!='gif' && $extension!='svg'){
			$uploaded_item['status'] = 0;
			$uploaded_item['error'] = 'Unsupported file format. Please upload a valid JPG, PNG, PDF, EPS, GIF, TIFF or SVG file.';
			 
			$result = json_encode($uploaded_item);
			
			if($this->getRequest()->getParam("callback")) {
				if(Mage::helper('dol')->validateRequestOrigin()){
					echo 'jsonCallback('.$result.')';
				}else{
					echo '';
				}
			}else{
				echo $result;
			}
			return;
		}
		
		$rand_number = mt_rand(10, 999);
		$rand_number = $rand_number.mt_rand(100, 999);
		$imgName =  time().date("his").$rand_number;
		
		$original = $uploadPath."/".$imgName.".".$extension;
		$original_rgb = $uploadPath."/".$imgName."-pixopa-rgb.".$extension;
		
		$res = move_uploaded_file($file_tmp,$original);
		
		$im_enabled = Mage::getStoreConfig(self::IM_ENABLED);
		$im_path = Mage::getStoreConfig(self::IM_PATH);
		
		if($im_enabled){
			
			if($extension=='pdf' || $extension=='eps'){
				$original_new = $uploadPath.'/'.$imgName.'.jpeg';
				$eps_pdf_dpi = Mage::getStoreConfig(self::EPS_PDF_DPI);
				exec($im_path.' -quality 100 -background transparent -density '.$eps_pdf_dpi.' -trim -resize 3000 '.$original.' '.$original_new);
				$original = $original_new;
				$original_rgb = $uploadPath."/".$imgName."-pixopa-rgb.jpeg";
			}
			
			$orientation = exec('identify -format \'%[EXIF:Orientation]\' '.$original);
			if($orientation && ($orientation=='3' || $orientation=='6' || $orientation=='8')){
				exec($im_path.' -auto-orient '.$original.' '.$original);
			}
			
			$colorspace = exec('identify -format %r '.$original);
			if($colorspace){
				$colorspace = strtolower($colorspace);
				$cmyk_pos = strpos($colorspace, 'cmyk');
    			if($cmyk_pos !== false){
	    			$pixopa_path = Mage::getStoreConfig(self::CONVERTER_PATH);
					exec($im_path.' '.$original.' -profile '.$pixopa_path.'/profiles/icc/cmyk/SWOP2006_Coated3v2.icc  -profile '.$pixopa_path.'/profiles/icc/rgb/sRGB_IEC61966-2-1_no_black_scaling.icc '. $original_rgb);
    			}else{
    				$original_rgb = $original;
    			}
    		}else{
    			$original_rgb = $original;
    		}
		}else{
    		$original_rgb = $original;
    	}
		
		if($extension=='svg'){
			$width = 100;
			$height = 100;	    
    	}else{
			list($width, $height) = getimagesize($original_rgb);
    	}
		
		$base_media_url = Mage::getBaseUrl('media', false);
		$base_media_dir = Mage::getBaseDir('media');
		
		$image_path = substr($original_rgb,strlen($base_media_dir)+1);
		$image_url = $base_media_url.$image_path;
		
		if($zoom_factor && $extension!='svg'){
			
			$new_height = $height/$zoom_factor;
			$new_width = $width/$zoom_factor;
			
			if($zoom_factor<=2){
				$max_canvas_width = 1000;
				$max_canvas_height = 1000;
			}
				
			if($zoom_factor>2 && $zoom_factor<=4){
				$max_canvas_width = 1500;
				$max_canvas_height = 1500;
			}
				
			if($zoom_factor>4){
				$max_canvas_width = 2000;
				$max_canvas_height = 2000;
			}
				
			if($new_height > $new_width || $new_height==$new_width){
				if($new_height>$max_canvas_height){
					$zoom_factor = $new_height / $max_canvas_height;
					$new_height = $new_height / $zoom_factor;
					$new_width = $new_width / $zoom_factor;
				}
			}else{
				if($new_width>$max_canvas_width){
					$zoom_factor = $new_width / $max_canvas_width;
					$new_height = $new_height / $zoom_factor;
					$new_width = $new_width / $zoom_factor;
				}
			}
			
			if($new_height!=$height || $new_width!=$width){
				$resized_image_name = str_replace($imgName, $imgName.'_sized', $original_rgb);
			
				$image_data = Mage::helper('dol')->resizeImage('', $original_rgb, false, false, $new_width, $new_height, false, false, $resized_image_name);
				$image_url = $image_data['url'];
				$width = $new_width;
				$height = $new_height;
			}
		}
		
		$uploaded_item = array();
		$uploaded_item['width']    = $width;
		$uploaded_item['height']   = $height;
		$uploaded_item['imageUrl'] = $image_url;
		$uploaded_item['status']   = 1;
		$uploaded_item['thumb_width'] = $width;
		$uploaded_item['thumb_height'] = $height;
		
		if($height>75){
			$aspect_ratio = $width / $height;
			$desired_width = 75 * $aspect_ratio;
			$thumb_width = $desired_width;
			
			$uploaded_item['thumb_width'] = $thumb_width;
			$uploaded_item['thumb_height'] = '75';
		}

		if($width>$height){
			$aspect_ratio = $width / $height;
			$desired_width = 75 * $aspect_ratio;
			$resize_dimension = $desired_width;
		}else{
			$resize_dimension = 75;
		}
		
		if($extension=='svg'){
			Mage::helper('dol')->processSVGDecoding($base_media_dir.'/'.$image_path);
		}
		
		if(Mage::helper('dol')->isImageResolutionLow($width, $height) && $extension!='svg'){
			$uploaded_item['is_low_res'] = 'true';
		}else{
			$uploaded_item['is_low_res'] = 'false';
		}
		
		$customer = Mage::getSingleton('customer/session')->getCustomer();
		
		if($customer && $customer->getId()){
			
			if($extension!='svg'){
				$thumbnail_data = Mage::helper('dol')->getThumbnailImage('', $original_rgb, true, true);
				$small_thumb_data = Mage::helper('dol')->getThumbnailImage($customer->getId(), $original_rgb, true, true, $resize_dimension);
			}else{
				$thumbnail_data['url'] = $image_url;
				$small_thumb_data['url'] = $image_url;
				$width = 75;
				$height = 75;
			}
			
			$image_model = Mage::getModel('customer/image');
			$image_model->setData('customer_id', $customer->getId());
			$image_model->setData('image_path', $image_url);
			$image_model->setData('thumbnail_path', $thumbnail_data['url']);
			$image_model->setData('small_thumb_path', $small_thumb_data['url']);
			$image_model->setData('width', $width);
			$image_model->setData('height', $height);
			$image_model->setData('status', '1');
			$image_model->save();
		}
		
		$result = json_encode($uploaded_item);
			
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.$result.')';
			}else{
				echo '';
			}
		}else{
			echo $result;
		}
	}
	
	
	public function multiuploadAction(){
		
		$valid_origin = Mage::helper('dol')->validateRequestOrigin();
		
		$upload = $this->getRequest()->getParam('upload');
		
		if($valid_origin){
			header('Access-Control-Allow-Origin: *');
			header('Access-Control-Allow-Methods: POST');
			header('Access-Control-Max-Age: 1000');
		}
		
		if($upload){
		    $headers = $this->fetch_request_headers();
		    
		    if(
		        // basic checks
		        isset(
		            $headers['X-FILE-SIZE'],
		            $headers['X-FILE-NAME']
		        ) 
		    ){
		        
		    	$uploads_dir = Mage::getBaseDir('media').'/uploads/dol';
    	
				$num_dir_arr = glob($uploads_dir."/*", GLOB_ONLYDIR);  
				$numDir = count($num_dir_arr);
				
				if($numDir > 0 ){
					foreach($num_dir_arr as $key=>$folder){
						
						$num_file_arr =	glob($folder."/*", GLOB_BRACE);
						$numFile = count($num_file_arr);
						$folder = $key+1;
		
						if($numFile < $this->totalFileInEachFolder){
							$this->multiuploadFileToDir($uploads_dir."/".$key += 1);
							return;
						}	
					}
					$this->createDirectory($uploads_dir."/".$folder +=1); 
					$this->multiuploadFileToDir($uploads_dir."/".$folder);
					
				}else{
					$this->createDirectory($uploads_dir."/1");
					$this->multiuploadFileToDir($uploads_dir."/1");
				}
		    }
		    
		    // if there is an error this will be the output instead of "OK"
		    //exit('Error');
		}
	}
	
	function multiuploadFileToDir($uploadPath) {
		
		$headers = $this->fetch_request_headers();
		
       	$file_name = basename($headers['X-FILE-NAME']);
        $file_size = $headers['X-FILE-SIZE'];
        $file_content = file_get_contents("php://input");
        
		//http://progphp.com/progress.phps
		//http://www.johnboy.com/php-upload-progress-bar/
		
		$extension = strtolower($this->getExtension($file_name));
		
		if($extension && $extension!='png' && $extension!='jpg' && $extension!='jpeg' && $extension!='pdf' && $extension!='eps' && $extension!='tif' && $extension!='tiff' && $extension!='gif' && $extension!='svg'){
			$uploaded_item['status'] = 0;
			$uploaded_item['error'] = 'Unsupported file format. Please upload a valid JPEG, PNG, PDF, EPS, GIF, TIFF or SVG file.';
			 
			$result = json_encode($uploaded_item);
			
			if($this->getRequest()->getParam("callback")) {
				if(Mage::helper('dol')->validateRequestOrigin()){
					echo 'jsonCallback('.$result.')';
				}else{
					echo '';
				}
			}else{
				echo $result;
			}
			return;
		}
		
		$rand_number = mt_rand(10, 999);
		$rand_number = $rand_number.mt_rand(100, 999);
		
		$imgName =  time().date("his").$rand_number;
		$original = $uploadPath."/".$imgName.".".$extension;
		$original_rgb = $uploadPath."/".$imgName."-pixopa-rgb.".$extension;
		
		if(file_put_contents($original, $file_content));
		
		$im_enabled = Mage::getStoreConfig(self::IM_ENABLED);
		$im_path = Mage::getStoreConfig(self::IM_PATH);
		
		if($im_enabled){
			
			if($extension=='pdf' || $extension=='eps'){
				$original_new = $uploadPath.'/'.$imgName.'.jpeg';
				$eps_pdf_dpi = Mage::getStoreConfig(self::EPS_PDF_DPI);
				//convert -colorspace RGB -background transparent -resize 1000 -density 300 -gravity center joy.ai joy.png
				exec($im_path.' -quality 100 -background transparent -density '.$eps_pdf_dpi.' -trim -resize 3000 '.$original.' '.$original_new);
				$original = $original_new;
				$original_rgb = $uploadPath."/".$imgName."-pixopa-rgb.jpeg";
			}
			
			$orientation = exec('identify -format \'%[EXIF:Orientation]\' '.$original);
			if($orientation && ($orientation=='3' || $orientation=='6' || $orientation=='8')){
				exec($im_path.' -auto-orient '.$original.' '.$original);
			}
			
			$colorspace = exec('identify -format %r '.$original);
			if($colorspace){
				$colorspace = strtolower($colorspace);
				$cmyk_pos = strpos($colorspace, 'cmyk');
    			if($cmyk_pos !== false){
	    			$pixopa_path = Mage::getStoreConfig(self::CONVERTER_PATH);
					exec($im_path.' '.$original.' -profile '.$pixopa_path.'/profiles/icc/cmyk/SWOP2006_Coated3v2.icc  -profile '.$pixopa_path.'/profiles/icc/rgb/sRGB_IEC61966-2-1_no_black_scaling.icc '. $original_rgb);
    			}else{
    				$original_rgb = $original;
    			}
    		}else{
    			$original_rgb = $original;
    		}
		}else{
    		$original_rgb = $original;
    	}
    	
    	if($extension=='svg'){
			$width = 100;
			$height = 100;	    
    	}else{
			list($width, $height) = getimagesize($original_rgb);
    	}
		
		$base_media_url = Mage::getBaseUrl('media', false);
		$base_media_dir = Mage::getBaseDir('media');
		
		$image_path = substr($original_rgb,strlen($base_media_dir)+1);
		$image_url = $base_media_url.$image_path;
		
		$uploaded_item = array();
		$uploaded_item['width']    = $width;
		$uploaded_item['height']   = $height;
		$uploaded_item['imageUrl'] = $image_url;
		$uploaded_item['status']   = 1;
		$uploaded_item['thumb_width'] = $width;
		$uploaded_item['thumb_height'] = $height;
		$uploaded_item['thumbUrl'] = $image_url;
		
		if($height>75){
			$aspect_ratio = $width / $height;
			$desired_width = 75 * $aspect_ratio;
			$thumb_width = $desired_width;
			
			$uploaded_item['thumb_width'] = $thumb_width;
			$uploaded_item['thumb_height'] = '75';
			
			$thumb_url = $base_media_url.$image_path;
			$thumb_image_path = str_replace($imgName, $imgName.'_thumb', $image_path);
			$thumb_image_path = str_replace('svg', 'png', $thumb_image_path);
			
			$optipng_enabled = Mage::getStoreConfig('dol/system_setting/optipng_enabled');
			
			if($im_enabled){
				Mage::helper('dol')->getConverter()->resizeImage($base_media_dir.'/'.$image_path, $base_media_dir.'/'.$thumb_image_path, $thumb_width, '75', $optipng_enabled);
				
				$thumb_url = $base_media_url.$thumb_image_path;
			}
			
			$uploaded_item['thumbUrl'] = $thumb_url;
		}
		
		if($width>$height){
			$aspect_ratio = $width / $height;
			$desired_width = 75 * $aspect_ratio;
			$resize_dimension = $desired_width;
		}else{
			$resize_dimension = 75;
		}
		
		if($extension=='svg'){
			Mage::helper('dol')->processSVGDecoding($base_media_dir.'/'.$image_path);
		}
		
		if(Mage::helper('dol')->isImageResolutionLow($width, $height) && $extension!='svg'){
			$uploaded_item['is_low_res'] = 'true';
		}else{
			$uploaded_item['is_low_res'] = 'false';
		}
		
		$customer = Mage::getSingleton('customer/session')->getCustomer();
		
		if($customer && $customer->getId()){
			
			if($extension!='svg'){
				$thumbnail_data = Mage::helper('dol')->getThumbnailImage('', $original_rgb, true, true);
				$small_thumb_data = Mage::helper('dol')->getThumbnailImage($customer->getId(), $original_rgb, true, true, $resize_dimension);
			}else{
				$thumbnail_data['url'] = $image_url;
				$small_thumb_data['url'] = $image_url;
				$width = 75;
				$height = 75;
			}

			$image_model = Mage::getModel('customer/image');
			$image_model->setData('customer_id', $customer->getId());
			$image_model->setData('image_path', $image_url);
			$image_model->setData('thumbnail_path', $thumbnail_data['url']);
			$image_model->setData('small_thumb_path', $small_thumb_data['url']);
			$image_model->setData('width', $width);
			$image_model->setData('height', $height);
			$image_model->setData('status', '1');
			$image_model->save();
		}
		$result = json_encode($uploaded_item);
			
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.$result.')';
			}else{
				echo '';
			}
		}else{
			echo $result;
		}
	}
	
	
	public function uploadQRCodeAction(){
	
		Mage::helper('dol')->validateRequestOrigin();
	
		$qrcode = $this->getRequest()->getParam('qrcode');

		if($qrcode){
		    $qrcode = str_replace('data:image/png;base64,', '', $qrcode);
			$extension = 'png';
			
			$extension_pos = strpos($qrcode, 'jpg');
			if($extension_pos!==false){
				$extension = 'jpg';
				$qrcode = str_replace('data:image/jpg;base64,', '', $qrcode);
			}
			
			$extension_pos = strpos($qrcode, 'jpeg');
			if($extension_pos!==false){
				$extension = 'jpeg';
				$qrcode = str_replace('data:image/jpeg;base64,', '', $qrcode);
			}
			
			$base_media_url = Mage::getBaseUrl('media', false);
			$base_media_dir = Mage::getBaseDir('media');
			
			$uploads_dir = Mage::getBaseDir('media').'/uploads/dol';
			$image_path = Mage::helper('dol')->getDirectory($uploads_dir).'/';
			
			$rand_number = mt_rand(10, 999);
			$rand_number = $rand_number.mt_rand(100, 999);
			
			$imgName =  time().date("his").$rand_number;
			$image_path = $image_path.$imgName.".".$extension;
			
			file_put_contents($image_path, base64_decode($qrcode));
			
			$image_path = substr($image_path, strlen($base_media_dir)+1);
			$image_url = $base_media_url.$image_path;
			
			if($this->getRequest()->getParam("callback")) {
				if(Mage::helper('dol')->validateRequestOrigin()){
					echo 'jsonCallback('.$image_url.')';
				}else{
					echo '';
				}
			}else{
				echo $image_url;
			}
		}
	}
	
	
	public function uploadDraggedFileAction(){
		
		Mage::helper('dol')->validateRequestOrigin();
	
		$base64_data = $this->getRequest()->getParam('base64_data');

		if(!$base64_data){
			$uploaded_item['status'] = 0;
			$uploaded_item['error'] = 'Unsupported file format. Please drag n drop a valid JPEG, PNG, GIF or TIFF file.';
			 
			$result = json_encode($uploaded_item);
			
			if($this->getRequest()->getParam("callback")) {
				if(Mage::helper('dol')->validateRequestOrigin()){
					echo 'jsonCallback('.$result.')';
				}else{
					echo '';
				}
			}else{
				echo $result;
			}
			return;
		}
		
		$extension_pos = strpos($base64_data, 'png;base64,');
		if($extension_pos!==false){
			$extension = 'png';
			$base64_data = str_replace('data:image/png;base64,', '', $base64_data);
		}
		
		$extension_pos = strpos($base64_data, 'jpg;base64,');
		if($extension_pos!==false){
			$extension = 'jpg';
			$base64_data = str_replace('data:image/jpg;base64,', '', $base64_data);
		}
		
		$extension_pos = strpos($base64_data, 'jpeg;base64,');
		if($extension_pos!==false){
			$extension = 'jpeg';
			$base64_data = str_replace('data:image/jpeg;base64,', '', $base64_data);
		}
		
		$extension_pos = strpos($base64_data, 'gif;base64,');
		if($extension_pos!==false){
			$extension = 'gif';
			$base64_data = str_replace('data:image/gif;base64,', '', $base64_data);
		}
		
		$extension_pos = strpos($base64_data, 'tiff;base64,');
		if($extension_pos!==false){
			$extension = 'tiff';
			$base64_data = str_replace('data:image/tiff;base64,', '', $base64_data);
		}
		
		$extension_pos = strpos($base64_data, 'tif;base64,');
		if($extension_pos!==false){
			$extension = 'tif';
			$base64_data = str_replace('data:image/tif;base64,', '', $base64_data);
		}
		
		if(!$extension || ($extension!='png' && $extension!='jpg' && $extension!='jpeg' && $extension!='tif' && $extension!='tiff' && $extension!='gif')){
			$uploaded_item['status'] = 0;
			$uploaded_item['error'] = 'Unsupported file format. Please upload a valid JPG, PNG, GIF or TIFF file.';
			 
			$result = json_encode($uploaded_item);
			
			if($this->getRequest()->getParam("callback")) {
				if(Mage::helper('dol')->validateRequestOrigin()){
					echo 'jsonCallback('.$result.')';
				}else{
					echo '';
				}
			}else{
				echo $result;
			}
			return;
		}
		
		
		$base_media_url = Mage::getBaseUrl('media', false);
		$base_media_dir = Mage::getBaseDir('media');
		
		
		$uploads_dir = Mage::getBaseDir('media').'/uploads/dol';
		$image_path = Mage::helper('dol')->getDirectory($uploads_dir).'/';
		
		$rand_number = mt_rand(10, 999);
		$rand_number = $rand_number.mt_rand(100, 999);
		
		$imgName =  time().date("his").$rand_number;
		$original = $image_path.$imgName.".".$extension;
		$original_rgb = $image_path.$imgName."-pixopa-rgb.".$extension;
		
		
		file_put_contents($original, base64_decode($base64_data));
		
		$im_enabled = Mage::getStoreConfig(self::IM_ENABLED);
		$im_path = Mage::getStoreConfig(self::IM_PATH);
		
		if($im_enabled){
			$orientation = exec('identify -format \'%[EXIF:Orientation]\' '.$original);
			if($orientation && ($orientation=='3' || $orientation=='6' || $orientation=='8')){
				exec($im_path.' -auto-orient '.$original.' '.$original);
			}
			
			$colorspace = exec('identify -format %r '.$original);
			if($colorspace){
				$colorspace = strtolower($colorspace);
				$cmyk_pos = strpos($colorspace, 'cmyk');
    			if($cmyk_pos !== false){
	    			$pixopa_path = Mage::getStoreConfig(self::CONVERTER_PATH);
					exec($im_path.' '.$original.' -profile '.$pixopa_path.'/profiles/icc/cmyk/SWOP2006_Coated3v2.icc  -profile '.$pixopa_path.'/profiles/icc/rgb/sRGB_IEC61966-2-1_no_black_scaling.icc '. $original_rgb);
    			}else{
    				$original_rgb = $original;
    			}
    		}else{
    			$original_rgb = $original;
    		}
		}else{
    		$original_rgb = $original;
    	}
    	
    	if($extension=='svg'){
			$width = 100;
			$height = 100;	    
    	}else{
			list($width, $height) = getimagesize($original_rgb);
    	}
		
		$base_media_url = Mage::getBaseUrl('media', false);
		$base_media_dir = Mage::getBaseDir('media');
		
		$image_path = substr($original_rgb,strlen($base_media_dir)+1);
		$image_url = $base_media_url.$image_path;
		
		$uploaded_item = array();
		$uploaded_item['width']    = $width;
		$uploaded_item['height']   = $height;
		$uploaded_item['imageUrl'] = $image_url;
		$uploaded_item['status']   = 1;
		$uploaded_item['thumb_width'] = $width;
		$uploaded_item['thumb_height'] = $height;
		$uploaded_item['thumbUrl'] = $image_url;
		
		if($height>75){
			$aspect_ratio = $width / $height;
			$desired_width = 75 * $aspect_ratio;
			$thumb_width = $desired_width;
			
			$uploaded_item['thumb_width'] = $thumb_width;
			$uploaded_item['thumb_height'] = '75';
			
			$thumb_url = $base_media_url.$image_path;
			$thumb_image_path = str_replace($imgName, $imgName.'_thumb', $image_path);
			$thumb_image_path = str_replace('svg', 'png', $thumb_image_path);
			
			$optipng_enabled = Mage::getStoreConfig('dol/system_setting/optipng_enabled');
			
			if($im_enabled){
				Mage::helper('dol')->getConverter()->resizeImage($base_media_dir.'/'.$image_path, $base_media_dir.'/'.$thumb_image_path, $thumb_width, '75', $optipng_enabled);
				
				$thumb_url = $base_media_url.$thumb_image_path;
			}
			
			$uploaded_item['thumbUrl'] = $thumb_url;
		}
		
		if($width>$height){
			$aspect_ratio = $width / $height;
			$desired_width = 75 * $aspect_ratio;
			$resize_dimension = $desired_width;
		}else{
			$resize_dimension = 75;
		}
		
		if($extension=='svg'){
			Mage::helper('dol')->processSVGDecoding($base_media_dir.'/'.$image_path);
		}
		
		if(Mage::helper('dol')->isImageResolutionLow($width, $height) && $extension!='svg'){
			$uploaded_item['is_low_res'] = 'true';
		}else{
			$uploaded_item['is_low_res'] = 'false';
		}
		
		$customer = Mage::getSingleton('customer/session')->getCustomer();
		
		if($customer && $customer->getId()){
			
			if($extension!='svg'){
				$thumbnail_data = Mage::helper('dol')->getThumbnailImage('', $original_rgb, true, true);
				$small_thumb_data = Mage::helper('dol')->getThumbnailImage($customer->getId(), $original_rgb, true, true, $resize_dimension);
			}else{
				$thumbnail_data['url'] = $image_url;
				$small_thumb_data['url'] = $image_url;
				$width = 75;
				$height = 75;
			}
			
			$image_model = Mage::getModel('customer/image');
			$image_model->setData('customer_id', $customer->getId());
			$image_model->setData('image_path', $image_url);
			$image_model->setData('thumbnail_path', $thumbnail_data['url']);
			$image_model->setData('small_thumb_path', $small_thumb_data['url']);
			$image_model->setData('width', $width);
			$image_model->setData('height', $height);
			$image_model->setData('status', '1');
			$image_model->save();
		}
		$result = json_encode($uploaded_item);
			
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.$result.')';
			}else{
				echo '';
			}
		}else{
			echo $result;
		}
	}
	
	
	public function readSVGAction(){
		
		Mage::helper('dol')->validateRequestOrigin();
	
		$svg_url = $this->getRequest()->getParam('svg_url');
		
		$base_media_url = Mage::getBaseUrl('media', false);
		$base_media_dir = Mage::getBaseDir('media');
		
		if($base_media_url){
			$base_media_url = str_replace('https', 'http', $base_media_url);
		}
		
		$svg_file_path = substr(str_replace('https', 'http', $svg_url), strlen($base_media_url)-1);
		$svg_file_path = $base_media_dir.$svg_file_path;
		
		$filename = file_exists($svg_file_path) ? htmlentities($svg_file_path) : die('Image file name does not exist');
		$svg_raw_data = fread(fopen($filename, "r"), filesize($filename));

		$result['svg_data'] = $svg_raw_data;
		$result = json_encode($result);
		
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.$result.')';
			}else{
				echo '';
			}
		}else{
			echo $svg_raw_data;
		}
	}
	
	function getExtension($str) {
		$i = strrpos($str,".");
		if (!$i) {
			return "";
		}
		$l = strlen($str) - $i;
		$ext = substr($str,$i+1,$l);
		
		$i = strrpos($ext,"?");
		if (!$i) {
			return $ext;
		}
		
		$ext = substr($ext,0,$i);
		
		return $ext;
	}
	
	function createDirectory($dirName) {
		if(!is_dir($dirName)) {
			mkdir($dirName);
			@chmod($dirName,0777);
		}
	} 
	
	public function getTextfieldsAction(){
	
		$text_list = Mage::helper('template')->getAllTextFieldsList();
		$result = json_encode($text_list);
		
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.$result.')';
			}else{
				echo '';
			}
		}else{
			echo $result;
		}
	}
	
	public function getImagefieldsAction(){
	
		$text_list = Mage::helper('template')->getAllImageFieldsList();
		$result = json_encode($text_list);
		
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.$result.')';
			}else{
				echo '';
			}
		}else{
			echo $result;
		}
	}
	
	public function getPersonalizeFieldsAction(){
	
		$template_id = $this->getRequest()->getParam('template_id');
		
		$text_list = Mage::helper('dol')->getPersonalizeFields($template_id);
		$result = json_encode($text_list);
		
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.$result.')';
			}else{
				echo '';
			}
		}else{
			echo $result;
		}
	}
	
	public function cropAction(){
    	
    	$crop_dir = Mage::getBaseDir('media').'/dol/crop';

    	$num_dir_arr = glob($crop_dir."/*");  
		$numDir = count($num_dir_arr);
		
		if($numDir > 0 ){
			foreach($num_dir_arr as $key=>$folder){
				
				$num_file_arr =	glob($folder."/*", GLOB_BRACE);
				$numFile = count($num_file_arr);
				$folder = $key+1;

				if($numFile < $this->totalFileInEachFolder){
					$this->saveCropFileToDir($crop_dir."/".$key += 1);
					return;
				}	
			}
			$this->createDirectory($crop_dir."/".$folder +=1); 
			$this->saveCropFileToDir($crop_dir."/".$folder);
			
		}else{
			$this->createDirectory($crop_dir."/1");
			$this->saveCropFileToDir($crop_dir."/1");
		}
	}
	
	function saveCropFileToDir($cropPath) {
		
		$original_image = $this->getRequest()->getParam('image');
    	$width = $this->getRequest()->getParam('width');
    	$height = $this->getRequest()->getParam('height');
    	$x = $this->getRequest()->getParam('x');
    	$y = $this->getRequest()->getParam('y');
    	
    	if($x<0){
    		$x = 0;
    	}
    	
    	if($y<0){
    		$y = 0;
    	}
    	
    	$resize = $this->getRequest()->getParam('resize');
    	$resize_width = $this->getRequest()->getParam('rwidth');
    	$resize_height = $this->getRequest()->getParam('rheight');
    	$rotate = $this->getRequest()->getParam('rotate');
    	
    	$zoom_factor = $this->getRequest()->getParam('zoom_factor');
    	$start = microtime(true);
    	
    	$base_media_url = Mage::getBaseUrl('media', false);
		$base_media_dir = Mage::getBaseDir('media');
    	$uploaded_item = array();
    	
		$ts_pos = strpos($original_image, '?ts');
		if($ts_pos!==false){
			$original_image = substr($original_image, 0, $ts_pos);
		}
		
		$pos = strpos($original_image, 'media/');
		if($pos === false){
			
			$uploaded_item['status'] = 0;
			$uploaded_item['error'] = 'Invalid file';
			 
			$result = json_encode($uploaded_item);
			
			if($this->getRequest()->getParam("callback")) {
				if(Mage::helper('dol')->validateRequestOrigin()){
					echo 'jsonCallback('.$result.')';
				}else{
					echo '';
				}
			}else{
				echo $result;
			}
			return;
		}
		
    	$original_path = $base_media_dir.'/'.substr($original_image,$pos+6);
    	
    	list($original_width, $original_height) = getimagesize($original_path);
    	
    	$crop_zoom_factor = $original_width / $resize_width;
    	
		if($crop_zoom_factor && $crop_zoom_factor!=1){
			$x = $x*$crop_zoom_factor;
    		$y = $y*$crop_zoom_factor;
    		$width = $width*$crop_zoom_factor;
    		$height = $height*$crop_zoom_factor;
    	}
    	
    	$is_sized = strpos($original_path, '_sized');
    	
		if($is_sized!==false && $zoom_factor && $zoom_factor!=1){
			$x = $x*$zoom_factor;
    		$y = $y*$zoom_factor;
    		$width = $width*$zoom_factor;
    		$height = $height*$zoom_factor;
    		$resize_width = $resize_width*$zoom_factor;
    		$resize_height = $resize_height*$zoom_factor;
    		$original_path = str_replace('_sized', '', $original_path);
    	}
    	
		$imgName =  time().date("his");
		$crop_image = $cropPath."/".$imgName.".png";
		$rotated_image = $cropPath."/".$imgName."_rotated.png";
		
		$im_enabled = Mage::getStoreConfig(self::IM_ENABLED);
		$im_path = Mage::getStoreConfig(self::IM_PATH);
		
		if($im_enabled){
			
			if($rotate && $rotate!='0'){
				
				$command = $im_path.' '.$original_path.' -virtual-pixel white -distort SRT '.$rotate.' -quality 100 '.$rotated_image;
				exec($command);
				$original_path = $rotated_image;
			}
			
			if($resize && $resize=='true'){
				
				$command = $im_path.' '.$original_path.' -resize '.$resize_width.'x'.$resize_height.' -quality 100 '.$crop_image;
				exec($command);
				
				$command = $im_path.' '.$crop_image.' -crop '.$width.'x'.$height.'+'.$x.'+'.$y.' +repage '.$crop_image;
				exec($command);
			
			}else{

				$command = $im_path.' '.$original_path.' -crop '.$width.'x'.$height.'+'.$x.'+'.$y.' +repage '.$crop_image;
				exec($command);
			}
Mage::log($command);
			list($width, $height) = getimagesize($crop_image);
			
			$image_path = substr($crop_image,strlen($base_media_dir)+1);
			$image_url = $base_media_url.$image_path;
			
			if($zoom_factor){
				
				$new_height = $height/$zoom_factor;
				$new_width = $width/$zoom_factor;
				
				if($zoom_factor<=2){
					$max_canvas_width = 1000;
					$max_canvas_height = 1000;
				}
					
				if($zoom_factor>2 && $zoom_factor<=4){
					$max_canvas_width = 1500;
					$max_canvas_height = 1500;
				}
					
				if($zoom_factor>4){
					$max_canvas_width = 2000;
					$max_canvas_height = 2000;
				}
					
				if($new_height > $new_width || $new_height==$new_width){
					if($new_height>$max_canvas_height){
						$zoom_factor = $new_height / $max_canvas_height;
						$new_height = $new_height / $zoom_factor;
						$new_width = $new_width / $zoom_factor;
					}
				}else{
					if($new_width>$max_canvas_width){
						$zoom_factor = $new_width / $max_canvas_width;
						$new_height = $new_height / $zoom_factor;
						$new_width = $new_width / $zoom_factor;
					}
				}
				
				if($new_height!=$height || $new_width!=$width){
					$resized_image_name = str_replace($imgName, $imgName.'_sized', $crop_image);
				
					$image_data = Mage::helper('dol')->resizeImage('', $crop_image, false, false, $new_width, $new_height, false, false, $resized_image_name);
					$image_url = $image_data['url'];
					$width = $new_width;
					$height = $new_height;
				}
			}
			
			$uploaded_item['width']    = $width;
			$uploaded_item['height']   = $height;
			$uploaded_item['imageUrl'] = $image_url;
			$uploaded_item['status']   = 1;
			
		}else{
			$uploaded_item['width']    = $original_width;
			$uploaded_item['height']   = $original_height;
			$uploaded_item['imageUrl'] = $original_image;
			$uploaded_item['status']   = 1;
			
		}
		
		$result = json_encode($uploaded_item);
		
		$end = microtime(true);
		Mage::log('It took: '.round($end - $start, 3)." secs to Crop Image!");
			
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.$result.')';
			}else{
				echo '';
			}
		}else{
			echo $result;
		}
	}
	
	
	public function processDesignImageAction(){
		
		$params = $this->getRequest()->getParams();
		$template_id = $this->getRequest()->getParam('template_id');
		$product_id = $this->getRequest()->getParam('product');
		$product_bleed = $this->getRequest()->getParam('product_bleed');
		$current_page = $this->getRequest()->getParam('current_page');
		$cpid = $this->getRequest()->getParam('cpid');
		
		if(!$cpid){
			$cpid = $product_id;
		}
		
		$image_data = array();
		
		if(!$template_id){
			$error_data['status'] = 0;
			$error_data['error'] = 'Template Id is not valid';
			$result = json_encode($error_data);
				
			if($this->getRequest()->getParam("callback")) {
				if(Mage::helper('dol')->validateRequestOrigin()){
					echo 'jsonCallback('.$result.')';
				}else{
					echo '';
				}
			}else{
				echo $result;
			}
			return;
		}
		
		if(!is_numeric($product_bleed)){
			$product_bleed = Mage::getStoreConfig(self::BLEED_MARGIN);
		}
		
		$result = Mage::helper('dol')->updatePersonalizationFields($template_id, $params);
		$new_svg = $result['svg'];
		$has_personalization = $result['has_personalization'];
		$content = $result['content'];
		$svg_child_images = array();
		$custom_options_data = array();
		$attributes_data = array();
		
		if($params && array_key_exists('super_attribute', $params)){
				
			$super_attributes = $params['super_attribute'];
			$attributes_data = array();
				
			if($super_attributes){
				$size_attribute_id = Mage::getStoreConfig('dol/catalog_setting/size_attribute_id');
		
				if(array_key_exists($size_attribute_id, $super_attributes)){
					$size_id = $super_attributes[$size_attribute_id];
				}
					
				foreach($super_attributes as $key => $super_attribute){
					if($super_attribute && $super_attribute != $size_id){
						$attributes_data[$key][] = $super_attribute;
					}
				}
			}
		}
		
		if($params && array_key_exists('options', $params)){
				
			$custom_options = $params['options'];
			$product_id = $params['product'];
				
			$product = Mage::getModel('catalog/product')->load($product_id);
			$size_option_id = '';
			$not_dropdown_types = array();
				
			foreach ($product->getOptions() as $opt) {
					
				$option_title = $opt->getTitle();
				$option_type = $opt->getType();
		
				$title = $opt->getTitle();
				$title = strtolower($title);
				$size_pos = strpos($title, 'size');
				 
				if($size_pos!==false){
					$size_option_id = $opt->getId();
				}
		
				if($option_type!='drop_down' && $option_type!='radio'){
					$not_dropdown_types[] = $opt->getId();
				}
			}
		
			foreach($custom_options as $key => $custom_option){
				if($custom_option!=$size_option_id && !in_array($key, $not_dropdown_types)){
					if(!is_array($custom_option)){
						$custom_options_data[$key][] = $custom_option;
					}else{
						$custom_options_data[$key][] = $custom_option[0];
					}
				}
			}
		}
		
		$attributes_data = json_encode($attributes_data);
		$custom_options_data = json_encode($custom_options_data);
		
		if($has_personalization){
			
			$svg_processing_v2 = Mage::getStoreConfig('dol/system_setting/svg_processing_v2');
			if($svg_processing_v2){
				
				$content = $result['content'];
				$matching_layout = Mage::helper('template')->getMatchingProductLayout($cpid, $content->getSizeId(), $attributes_data, null, $custom_options_data);
				
				$layout_fg_pg1 = $matching_layout['fg_image'];
				$layout_bg_pg1 = $matching_layout['bg_image'];
				
				$zoom_factor = $result['zoom_factor'];
				$original_bleed_margin = $product_bleed / $zoom_factor;
				
				$scaled_svg_data = Mage::helper('dol')->scaleSVG($new_svg, $zoom_factor, $original_bleed_margin);
				$new_svg = $scaled_svg_data['svg'];
				$bleed_margin = $scaled_svg_data['bleed_margin'];
				
				$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $new_svg, false, false, false, $layout_fg_pg1, $layout_bg_pg1, $bleed_margin);
				
				list($width, $height) = getimagesize($image_data['path']);
				if($width > 1000 || $height > 1000){
					Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
				}
				
			}else{
				$content = $result['content'];
				$matching_layout = Mage::helper('template')->getMatchingProductLayout($cpid, $content->getSizeId(), $attributes_data, null, $custom_options_data);
				
				$layout_fg_pg1 = $matching_layout['fg_image'];
				$layout_bg_pg1 = $matching_layout['bg_image'];
				
				$zoom_factor = $result['zoom_factor'];
				$original_bleed_margin = $product_bleed / $zoom_factor;
				
				$scaled_svg_data = Mage::helper('dol')->scaleSVG($new_svg, $zoom_factor, $original_bleed_margin);
				$new_svg = $scaled_svg_data['svg'];
				$bleed_margin = $scaled_svg_data['bleed_margin'];
				
				if(is_null($current_page) || $current_page=='0'){
					$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $new_svg, false, false, false, $layout_fg_pg1, $layout_bg_pg1, $bleed_margin);
					
					list($width, $height) = getimagesize($image_data['path']);
					if($width > 1000 || $height > 1000){
						Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
					}
				}else{
					$image_data['url'] = $content->getImagePath();
				}
			}
			
			$svg_childs = $result['child_svg_data'];
			
			if($svg_childs && count($svg_childs)>0){
				
				$child_count = 0;
				$layout_childs = $matching_layout['layout_childs'];
				$count = 1;
				
				$svg_child_images[] = $image_data['url'];
				
				foreach($svg_childs as $svg_child){
					
					if(is_null($current_page) || $current_page==$count){
					
						if($layout_childs && count($layout_childs)>=$child_count){
							$layout_fg_pg1 = $layout_childs[$child_count]['fg_image_path'];
							$layout_bg_pg1 = $layout_childs[$child_count]['bg_image_path'];
						}else{
							$layout_fg_pg1 = null;
							$layout_bg_pg1 = null;
						}
						
						$scaled_svg_data = Mage::helper('dol')->scaleSVG($svg_child, $zoom_factor, $original_bleed_margin);
						$svg_child = $scaled_svg_data['svg'];
						$bleed_margin = $scaled_svg_data['bleed_margin'];
						
						$child_image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $svg_child, false, false, false, $layout_fg_pg1, $layout_bg_pg1, $bleed_margin);
						
						list($width, $height) = getimagesize($child_image_data['path']);
						if($width > 1000 || $height > 1000){
							Mage::helper('dol')->resizeImage('', $child_image_data['path'], false, false, 1000, 1000, false, true);
						}
					
						$svg_child_images[] = $child_image_data['url'];
					}else{
						$svg_child_images[] = '';
					}
					$count++;
					$child_count++;
				}
			}
		}else{
			$image_data['url'] = $content->getImagePath();
		}
		
		
		//$thumbnail_data = Mage::helper('dol')->getThumbnailImage('', $image_data['path'], false);
		
		$images_data = array();
		$images_data['main'] = $image_data['url'];
		$images_data['child_images'] = $svg_child_images;
		
		if(array_key_exists('replacement_image', $params)){
			$thumb_url = Mage::helper('dol')->getThumbnailOfDesignImage($params['replacement_image'], '');
			
			foreach($params as $key => $value){
				
				$pos = strpos($key, '_img_checkbox');
    			if ($pos === false) {
				}else{
					$image_type = substr($key,0,(strlen($key)-strlen('_img_checkbox')));
					$images_data['images'][$image_type] = $params['replacement_image'];
					$images_data['thumbs'][$image_type] = $thumb_url;
				}
			}
		}
		$result = json_encode($images_data);
				
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.$result.')';
			}else{
				echo '';
			}
		}else{
			echo $result;
		}
	}
	
	public function processSVGPdfAction(){
		
		Mage::log('Inside processSVGPdf');
		
		Mage::helper('dol')->validateRequestOrigin();
		
		$svg_xml = $this->getRequest()->getParam('svg_data');
		$layout_fg = $this->getRequest()->getParam('layout_fg_pg1');
		$layout_bg = $this->getRequest()->getParam('layout_bg_pg1');
		$zoom_factor = $this->getRequest()->getParam('zoom_factor');
		$layout_fg_list = array();
		$layout_bg_list = array();
		
		$svg_xml_list = array();
		$svg_xml_final_list = array();
		
		for($i=1; $i<100; $i++) {
			
			$textsvg = $this->getRequest()->getParam('textsvg_'.$i);
			if(!$textsvg){
				continue;
			}
			$svg_xml_list[] = $textsvg;
		}
		
		$layout_fg_list[] = $layout_fg;
		$layout_bg_list[] = $layout_bg;
		
		for($i=2; $i<100; $i++) {
			
			$blueprint_fg = $this->getRequest()->getParam('blueprint_fg_'.$i);
			$blueprint_bg = $this->getRequest()->getParam('blueprint_bg_'.$i);
			
			if($blueprint_fg){
				$layout_fg_list[] = $blueprint_fg;
			}
			if($blueprint_bg){
				$layout_bg_list[] = $blueprint_bg;
			}
		}
		
		if(empty($svg_xml_list)){
			$svg_xml_list[] = $svg_xml;
		}
		
		foreach($svg_xml_list as $svg_xml_item){
			
			if($zoom_factor && $zoom_factor!=1){
				$svg_data = simplexml_load_string($svg_xml_item, 'SimpleXMLElement');
				
				$attribs = $svg_data->attributes();
				$attributes_data = (array) $attribs;
				$svg_attributes = $attributes_data['@attributes'];
				
				$width = $svg_attributes['width'];
				$height = $svg_attributes['height'];
						
				$new_width = $width * $zoom_factor;
				$new_height = $height * $zoom_factor;
				
				$attribs->width = $new_width;
				$attribs->height = $new_height;
				$svg_data->addAttribute('viewBox', '0 0 '.$width.' '.$height);
				
				$svg_xml_item = $svg_data->asXML();
				$svg_xml_final_list[] = $svg_xml_item;
			
			}else{
				$svg_xml_final_list[] = $svg_xml_item;
			}
		}
		
		$pdf_url = Mage::helper('dol')->getProcessedSVGPdfURL($svg_xml_final_list, true, false, 0, $layout_fg_list, $layout_bg_list, $zoom_factor);
		
		if(!$pdf_url){
			$error_data['status'] = 0;
			$result = json_encode($error_data);
					
			if($this->getRequest()->getParam("callback")) {
				if(Mage::helper('dol')->validateRequestOrigin()){
					echo 'jsonCallback('.$result.')';
				}else{
					echo '';
				}
			}else{
				echo $result;
			}
		}
		
 		$pdf_data = array();
		$pdf_data['url'] = $pdf_url;
		
		$result = json_encode($pdf_data);
					
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.$result.')';
			}else{
				echo '';
			}
		}else{
			echo $result;
		}
	}
	
	
	public function applyImageFilterAction(){
		
		Mage::log('Inside applyImageFilterAction');
		
		$original_image = $this->getRequest()->getParam('src');
		$filter_type = $this->getRequest()->getParam('filter');
		$zoom_factor = $this->getRequest()->getParam('zoom_factor');
		
		$base_media_dir = Mage::getBaseDir('media');
    	$uploaded_item = array();
    	
		$pos = strpos($original_image, 'media/');
		if($pos === false){
			
			$uploaded_item['status'] = 0;
			$uploaded_item['error'] = 'Invalid file';
			 
			$result = json_encode($uploaded_item);
						
			if($this->getRequest()->getParam("callback")) {
				if(Mage::helper('dol')->validateRequestOrigin()){
					echo 'jsonCallback('.$result.')';
				}else{
					echo '';
				}
			}else{
				echo $result;
			}
			return;
		}
		
		$original_image = str_replace('_filtered_light', '', $original_image);
		$original_image = str_replace('_filtered_med', '', $original_image);
		$original_image = str_replace('_filtered_dark', '', $original_image);
		$original_image = str_replace('_filterpng.png', '', $original_image);
		
		$original_image_name = substr($original_image,$pos+6);
    	$original_path = $base_media_dir.'/'.$original_image_name;
    	
		$im_enabled = Mage::getStoreConfig(self::IM_ENABLED);
		$im_path = Mage::getStoreConfig(self::IM_PATH);
		
		$extension = strtolower($this->getExtension($original_path));
		
		if($im_enabled && $filter_type){
			
			if($filter_type=='filter_lighten'){
				
				$filtered_path = str_replace('.'.$extension, '_filtered_light.'.$extension, $original_path);
		    	$filtered_image_name = str_replace('.'.$extension, '_filtered_light.'.$extension, $original_image_name);
		    	$filtered_image = str_replace($original_image_name, $filtered_image_name, $original_image);
		    	
		    	exec($im_path.' '.$original_path.' '. $filtered_path.'_filterpng.png');
				exec($im_path.' '.$filtered_path.'_filterpng.png'.' -threshold 35% -transparent white '. $filtered_path.'_filterpng.png');
				
			}else if($filter_type=='filter_medium'){
				
				$filtered_path = str_replace('.'.$extension, '_filtered_med.'.$extension, $original_path);
    			$filtered_image_name = str_replace('.'.$extension, '_filtered_med.'.$extension, $original_image_name);
    			$filtered_image = str_replace($original_image_name, $filtered_image_name, $original_image);
    			
    			exec($im_path.' '.$original_path.' '. $filtered_path.'_filterpng.png');
				exec($im_path.' '.$filtered_path.'_filterpng.png'.' -threshold 45% -transparent white '. $filtered_path.'_filterpng.png');
				
			}else if($filter_type=='filter_darken'){
				
				$filtered_path = $original_path;
    			$filtered_image_name = $original_image_name;
				$filtered_image = str_replace($original_image_name, $filtered_image_name, $original_image);
    	
    			//exec($im_path.' '.$original_path.' '. $filtered_path.'_filterpng.png');
				//For Lumilia - exec($im_path.' '.$filtered_path.'_filterpng.png'.' -threshold 55% -transparent white '. $filtered_path.'_filterpng.png');
				//exec($im_path.' '.$filtered_path.'_filterpng.png'.' -colorspace gray -negate -ordered-dither o8x8 '. $filtered_path.'_filterpng.png');
				exec($im_path.' '.$original_path.' -resize 3000000@ -unsharp 0x20+1.0+0 -unsharp 0x5+3.0+0 -level 20%,87%\!,1.0 -colorspace gray -ordered-dither h8x8a -resize 3855250@ -type bilevel -transparent black -write '. $filtered_path.'_filterpng.png');
				
				$main_image_path = str_replace('_sized', '', $original_path);
				$filtered_path = str_replace('_sized', '', $filtered_path);
				exec($im_path.' '.$main_image_path.' -resize 3000000@ -unsharp 0x20+1.0+0 -unsharp 0x5+3.0+0 -level 20%,87%\!,1.0 -colorspace gray -ordered-dither h8x8a -resize 3855250@ -type bilevel -transparent black -write -negate '. $filtered_path.'_filterpng_pos.png');
			}
		}
			
		$result = $filtered_image.'_filterpng.png';
						
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.$result.')';
			}else{
				echo '';
			}
		}else{
			echo $result;
		}
	}
	
	
	public function chromeAction() {
      
	  $this->loadLayout();   
      $this->renderLayout(); 
    }
    
    
	public function uploadtestAction() {
      
	  $this->loadLayout();   
      $this->renderLayout(); 
    }
    
	public function fetch_request_headers() {
	  $arh = array();
	  $rx_http = '/\AHTTP_/';
	  foreach($_SERVER as $key => $val) {
	    if( preg_match($rx_http, $key) ) {
	      $arh_key = preg_replace($rx_http, '', $key);
	      $rx_matches = array();
	      // do some nasty string manipulations to restore the original letter case
	      // this should work in most cases
	      $rx_matches = explode('_', $arh_key);
	      if( count($rx_matches) > 0 and strlen($arh_key) > 2 ) {
	        foreach($rx_matches as $ak_key => $ak_val) $rx_matches[$ak_key] = ucfirst($ak_val);
	        $arh_key = implode('-', $rx_matches);
	      }
	      $arh[$arh_key] = $val;
	    }
	  }
	  return( $arh );
	}
	
	
	public function createNikoSpritesAction() {
      
		$map_icon_color = $this->getRequest()->getParam('map_icon_color');
		$dol_right_icon_color = $this->getRequest()->getParam('dol_right_icon_color');
		$left_tool_back_color = $this->getRequest()->getParam('left_tool_back_color');
		$left_tool_color = $this->getRequest()->getParam('left_tool_color');
		
		$base_dir = Mage::getBaseDir();
		
		$map_icon = $base_dir.'/js/all/niko/niko_css/icons/map_blue.png';
		$right_options = $base_dir.'/js/all/niko/niko_images/right_options.png';
		$top_options = $base_dir.'/js/all/niko/niko_images/top_options.png';
		$sprite = $base_dir.'/js/all/niko/niko_images/icons_sprite_black.png';
		$sprite_temp = $base_dir.'/js/all/niko/niko_images/icons_sprite_temp.png';
		$transparent_sprite = $base_dir.'/js/all/niko/niko_images/icons_sprite_transparent.png';
		$upload_icon = $base_dir.'/js/all/niko/niko_css/icons/upload_large.png';
		$close_icon = $base_dir.'/js/all/niko/niko_css/icons/popup-close.png';
		$left_arrow_icon = $base_dir.'/js/all/niko/niko_css/icons/left_arrow_square.png';
		$right_arrow_icon = $base_dir.'/js/all/niko/niko_css/icons/right_arrow_square.png';
		
		$all_stores = Mage::app()->getStores();
		foreach ($all_stores as $each_store_id => $val){
			$store_id = Mage::app()->getStore($each_store_id)->getId();
		
			if(!$map_icon_color || !$dol_right_icon_color || !$left_tool_back_color || !$left_tool_color){
				$map_icon_color = Mage::getStoreConfig('doldesign/others/pages_tab', $store_id);
				$dol_right_icon_color = Mage::getStoreConfig('doldesign/dolright/dol_right_icon', $store_id);
				$left_tool_back_color = Mage::getStoreConfig('doldesign/upperleft/tool_color', $store_id);
				$left_tool_color = Mage::getStoreConfig('doldesign/upperleft/top_tool', $store_id);
			}
			
			$map_icon_color = strtolower($map_icon_color);
			$dol_right_icon_color = strtolower($dol_right_icon_color);
			$left_tool_back_color = strtolower($left_tool_back_color);
			$left_tool_color = strtolower($left_tool_color);
			
			$sprite_replacement = str_replace('.png', '_'.$left_tool_color.'.png', $sprite);
			$top_options_replacement = str_replace('.png', '_'.$left_tool_back_color.'.png', $top_options);
			$right_options_replacement = str_replace('.png', '_'.$dol_right_icon_color.'.png', $right_options);
			$map_icon_replacement = str_replace('.png', '_'.$map_icon_color.'.png', $map_icon);
			$upload_icon_replacement = str_replace('.png', '_'.$dol_right_icon_color.'.png', $upload_icon);
			$close_icon_replacement = str_replace('.png', '_'.$dol_right_icon_color.'.png', $close_icon);
			$left_arrow_icon_replacement = str_replace('.png', '_'.$map_icon_color.'.png', $left_arrow_icon);
			$right_arrow_icon_replacement = str_replace('.png', '_'.$map_icon_color.'.png', $right_arrow_icon);
			
			$sprite_replacement = str_replace('#', '', $sprite_replacement);
			$sprite_replacement = str_replace('_black', '', $sprite_replacement);
			$top_options_replacement = str_replace('#', '', $top_options_replacement);
			$right_options_replacement = str_replace('#', '', $right_options_replacement);
			$map_icon_replacement = str_replace('#', '', $map_icon_replacement);
			$map_icon_replacement = str_replace('_blue', '', $map_icon_replacement);
			$upload_icon_replacement = str_replace('#', '', $upload_icon_replacement);
			$close_icon_replacement = str_replace('#', '', $close_icon_replacement);
			$left_arrow_icon_replacement = str_replace('#', '', $left_arrow_icon_replacement);
			$right_arrow_icon_replacement = str_replace('#', '', $right_arrow_icon_replacement);
			
			exec('convert '.$sprite.' -fuzz 30% -fill "'.$left_tool_color.'" -opaque "#000" '.$sprite_temp);
			exec('composite -compose Dst_over '.$sprite_temp.' '.$transparent_sprite.' '.$sprite_replacement);
			
			exec('convert '.$top_options.' -fuzz 40% -fill "'.$left_tool_back_color.'" -opaque "#366697" '.$top_options_replacement);
			exec('convert '.$right_options.' -fuzz 40% -fill "'.$dol_right_icon_color.'" -opaque "#379FF5" '.$right_options_replacement);
			exec('convert '.$map_icon.' -fuzz 40% -fill "'.$map_icon_color.'" -opaque "#366697" '.$map_icon_replacement);
			exec('convert '.$upload_icon.' -fuzz 100% -fill "'.$dol_right_icon_color.'" -opaque "#41ABE0" '.$upload_icon_replacement);
			exec('convert '.$close_icon.' -fuzz 60% -fill "'.$dol_right_icon_color.'" -opaque "#000000" '.$close_icon_replacement);
			exec('convert '.$left_arrow_icon.' -fuzz 40% -fill "'.$map_icon_color.'" -opaque "#366697" '.$left_arrow_icon_replacement);
			exec('convert '.$right_arrow_icon.' -fuzz 40% -fill "'.$map_icon_color.'" -opaque "#366697" '.$right_arrow_icon_replacement);
			
			$map_icon_color = null;
			$dol_right_icon_color = null;
			$left_tool_back_color = null;
			$left_tool_color = null;
		}
		
		echo 'Images created successfully. Please close this window!';
    }
	
	public function savePersonalizedDesignAction(){
		
		$params = $this->getRequest()->getParams();
		$template_id = $this->getRequest()->getParam('template_id');
		$product_id = $this->getRequest()->getParam('product');
		$product_bleed = $this->getRequest()->getParam('product_bleed');
		
		$design_id = $this->getRequest()->getParam('design_id');
		$super_attributes = $this->getRequest()->getParam('super_attribute');
		$custom_options = $this->getRequest()->getParam('options');
		$qty = $this->getRequest()->getParam('qty');
		$addedAt = Varien_Date::toTimestamp(true);
		$number_of_pages = $this->getRequest()->getParam('product_number_of_pages');
		
		$image_data = array();
		
		if (!Mage::getSingleton('customer/session')->isLoggedIn()) {
		 	$response['error'] = $this->__('User not logged in. Please try saving again.');
			$result = json_encode($response);
				
			if($this->getRequest()->getParam("callback")) {
				if(Mage::helper('dol')->validateRequestOrigin()){
					echo 'jsonCallback('.$result.')';
				}else{
					echo '';
				}
			}else{
				echo $result;
			}
        	return;
		}
		
		if(!$template_id){
			$error_data['status'] = 0;
			$error_data['error'] = 'Template Id is not valid';
			$result = json_encode($error_data);
				
			if($this->getRequest()->getParam("callback")) {
				if(Mage::helper('dol')->validateRequestOrigin()){
					echo 'jsonCallback('.$result.')';
				}else{
					echo '';
				}
			}else{
				echo $result;
			}
			return;
		}
		
		if(!$number_of_pages){
			$number_of_pages = 1;
		}
		
		$is_scp_enabled = Mage::getStoreConfig('dol/catalog_setting/scp_enabled');
		if($is_scp_enabled){
            $parentId = $this->getRequest()->getParam('cpid');
            if($parentId){
            	$product_id = $parentId;
        	}
		}
		
		$result = Mage::helper('dol')->updatePersonalizationFields($template_id, $params);
		$svg_data = $result['svg'];
		$has_personalization = $result['has_personalization'];
		$content = $result['content'];
		$svg_child_images = array();
		
		$custom_options_data = array();
		$attributes_data = array();
		
		if($params && array_key_exists('super_attribute', $params)){
		
			$super_attributes = $params['super_attribute'];
			$attributes_data = array();
		
			if($super_attributes){
				$size_attribute_id = Mage::getStoreConfig('dol/catalog_setting/size_attribute_id');
		
				if(array_key_exists($size_attribute_id, $super_attributes)){
					$size_id = $super_attributes[$size_attribute_id];
				}
					
				foreach($super_attributes as $key => $super_attribute){
					if($super_attribute && $super_attribute != $size_id){
						$attributes_data[$key][] = $super_attribute;
					}
				}
			}
		}
		
		if($params && array_key_exists('options', $params)){
		
			$custom_options = $params['options'];
			$product_id = $params['product'];
		
			$product = Mage::getModel('catalog/product')->load($product_id);
			$size_option_id = '';
			$not_dropdown_types = array();
		
			foreach ($product->getOptions() as $opt) {
					
				$option_title = $opt->getTitle();
				$option_type = $opt->getType();
		
				$title = $opt->getTitle();
				$title = strtolower($title);
				$size_pos = strpos($title, 'size');
					
				if($size_pos!==false){
					$size_option_id = $opt->getId();
				}
		
				if($option_type!='drop_down' && $option_type!='radio'){
					$not_dropdown_types[] = $opt->getId();
				}
			}
		
			foreach($custom_options as $key => $custom_option){
				if($custom_option!=$size_option_id && !in_array($key, $not_dropdown_types)){
					if(!is_array($custom_option)){
						$custom_options_data[$key][] = $custom_option;
					}else{
						$custom_options_data[$key][] = $custom_option[0];
					}
				}
			}
		}
		
		$attributes_data = json_encode($attributes_data);
		$custom_options_data = json_encode($custom_options_data);
		
		$content = $result['content'];
		$matching_layout = Mage::helper('template')->getMatchingProductLayout($product_id, $content->getSizeId(), $attributes_data, null, $custom_options_data);
		
		$layout_fg_pg1 = $matching_layout['fg_image'];
		$layout_bg_pg1 = $matching_layout['bg_image'];
		
		$zoom_factor = $result['zoom_factor'];
		$bleed_margin = $product_bleed / $zoom_factor;
		
		$customer_id = '';
		$customer = Mage::getSingleton('customer/session')->getCustomer();
		
		if($customer && $customer->getId()){
			$customer_id = $customer->getId();
		}
		
		$image_data = Mage::helper('dol')->getProcessedSVGImageURL('', $svg_data, true, true, false, $layout_fg_pg1, $layout_bg_pg1, $bleed_margin);
		
		list($width, $height) = getimagesize($image_data['path']);
		if($width > 1000 || $height > 1000){
			Mage::helper('dol')->resizeImage('', $image_data['path'], false, false, 1000, 1000, false, true);
		}
		
		$thumbnail_data = Mage::helper('dol')->getThumbnailImage('', $image_data['path'], true, true);
		
		$image_path = $image_data['url'];
		$thumbnail_path = $thumbnail_data['url'];
		
		$svg_design = Mage::getModel('template/customersvgdesign');
		
		$svg_design->setData('svg_data', $svg_data);
		$svg_design->save();
		
		$svg_childs = $result['child_svg_data'];
		
		if($svg_childs && count($svg_childs)>0){
			
			$child_count = 0;
			$layout_childs = $matching_layout['layout_childs'];
			$count = 1;
			
			$svg_child_images[] = $image_data['url'];
			$i = 2;
			
			foreach($svg_childs as $svg_child){
			
				if(!$svg_child){
					continue;
				}
				$svg_design_child = Mage::getModel('template/customersvgdesign');
			
				$svg_design_child->setData('svg_data', Mage::helper('dol')->validateSVG($svg_child));
				$svg_design_child->setData('parent_design_id', $svg_design->getId());
				$svg_design_child->setData('position', $i);
				$svg_design_child->save();
				$i++;
			}
		}
		
		$customer_design = Mage::getModel('template/customerdesign');
		$customer_design->setData('parent_template_id', $template_id);
		$customer_design->setData('product_id', $product_id);
		$customer_design->setData('primary_content_id', $svg_design->getId());
		if($super_attributes){
			$customer_design->setData('super_attributes', json_encode($super_attributes));
		}
		if($custom_options){
			$customer_design->setData('custom_options', json_encode($custom_options));
		}
		$customer_design->setData('qty', $qty);
		$customer_design->setData('customer_id', $customer_id);
		$customer_design->setData('image_path', $image_path);
		$customer_design->setData('thumbnail_path', $thumbnail_path);
		$customer_design->setData('is_saved', '1');
		$customer_design->setData('is_personalized', '1');
		$customer_design->setData('created_at', Varien_Date::formatDate($addedAt));
		$customer_design->setData('zoom_factor', $zoom_factor);
		$customer_design->save();
		
		$customer_design_id = $customer_design->getId();
		
		$response['success'] = $this->__('Design Saved Successfully!');
		$result = json_encode($response);
			
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.$result.')';
			}else{
				echo '';
			}
		}else{
			echo $result;
		}
        
        return;
	}
	
	
	public function getFilterThumbsAction(){
		
		Mage::helper('dol')->validateRequestOrigin();
	
		$filter_names = $this->getRequest()->getParam('filter_name');
		$image_url = $this->getRequest()->getParam('image_url');
		
		$ts_pos = strpos($image_url, '?ts');
		if($ts_pos!==false){
			$image_url = substr($image_url, 0, $ts_pos);
		}
		
		$start = microtime(true);
		
		$result = array();
	
		if($filter_names){
			
			$base_media_url = Mage::getBaseUrl('media', false);
			$base_media_dir = Mage::getBaseDir('media');
			
			$im_enabled = Mage::getStoreConfig(self::IM_ENABLED);
			$im_path = Mage::getStoreConfig(self::IM_PATH);
			
			$rand_number = mt_rand(10, 999);
			$rand_number = $rand_number.mt_rand(100, 999);
			
			$uploads_dir = Mage::getBaseDir('media').'/dol/temp';
			$filter_image_path = Mage::helper('dol')->getDirectory($uploads_dir).'/';
				
			$imgName =  time().date("his").$rand_number;
			
			$original_image_resized_path =  $filter_image_path.$imgName."_temp.png";
			
			$side_pos = strpos(str_replace('https', 'http', $image_url), str_replace('https', 'http', $base_media_url));
			
			if($side_pos!==false){
				$original_image_path = substr(str_replace('https', 'http', $image_url),strlen(str_replace('https', 'http', $base_media_url)));
			}else{
				$default_media_url = Mage::app()->getStore('default')->getBaseUrl('media');
				
				$side_pos = strpos(str_replace('https', 'http', $image_url), str_replace('https', 'http', $default_media_url));
				if($side_pos!==false){
					$original_image_path = substr(str_replace('https', 'http', $image_url),strlen(str_replace('https', 'http', $default_media_url)));
				}else{
					$side_pos = strpos($image_url, '/media');
					$original_image_path = substr($image_url, $side_pos+7);
				}
			}
			
			$original_image_path = $base_media_dir.'/'.$original_image_path;
			
			if($im_enabled){
				Mage::helper('dol')->resizeImage('', $original_image_path, false, false, 500, 440, false, false, $original_image_resized_path);
			}else{
				$original_image_resized_path = $original_image_path;
			}
	
			$filter_names = json_decode($filter_names, true);
			
			
			foreach($filter_names as $key => $filter){
			
				$rand_number = mt_rand(10, 999);
				$rand_number = $rand_number.mt_rand(100, 999);
					
				$imgName =  time().date("his").$rand_number;
				$thumb_path = $filter_image_path.$imgName."_thumb".$key.".png";
				$main_path = $filter_image_path.$imgName."_main".$key.".png";
				$command = '';
				
				switch($filter){
					case "vivid" : $command = '-color-matrix \'3x3:1.2 -0.1 -0.1 -0.1 1.2 -0.1 -0.1 -0.1  1.2\''; break;
					case "invert" : $command = '-color-matrix \'6x3:-1 0 0 0 0 1 0 -1 0 0 0 1 0 0 -1 0 0 1\''; break;
					case "polaroid" : $command = '-color-matrix \'6x3:1.438 -0.122 -0.016 0 0 -0.03 -0.062 1.378 -0.016 0 0 0.05 -0.062 -0.122 1.483 0 0 -0.02\''; break;
					case "lemonchiffon" : $command = '+level-colors navy,lemonchiffon'; break;
					case "sigmoidal" : $command = '-sigmoidal-contrast 4,10%'; break;
					case "sharpen" : $command = '-sharpen 0x1'; break;
					case "posterize" : $command = '+dither -posterize 7'; break;
					case "solarize" : $command = '-solarize 50%'; break;
					case "threshold" : $command = '-threshold 50%'; break;
					case "gamma" : $command = '-gamma 0.7'; break;
					case "sinusoid" : $command = '-function Sinusoid 3,-10,.7,.9'; break;
					case "fuzz" : $command = '-fuzz 50% -transparent white -alpha extract -negate'; break;
					case "charcoal" : $command = '-charcoal 5'; break;
					case "sketch" : $command = '-colorspace gray -sketch 0x20+120'; break;
					case "darken" : $command = '-level 25%'; break;
					case "sepia" : $command = '-color-matrix \'5x5:0.39, 0.77, 0.19, 0, 0, 0.35, 0.68, 0.17, 0, 0, 0.27, 0.53, 0.13, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0\''; break;
					case "grayscale" : $command = '-color-matrix \'5x5:0.30,0.30,0.30,0,0,0.30,0.30,0.30,0,0,0.30,0.30,0.30,0,0,0,0,0,1,0,0,0,0,0,0\''; break;
				}
				
				
				if($im_enabled){
					
					$filter_start = microtime(true);
					
					exec($im_path.' '.$original_image_resized_path.' -quality 100 '.$command.' -resize 70 '.$thumb_path);
					exec($im_path.' '.$original_image_resized_path.' -quality 100 '.$command.' '.$main_path);
					
					$filter_end = microtime(true);
					Mage::log('It took: '.round($filter_end - $filter_start, 3)." secs to generate ".$filter." Filter Thumb of Image!");
						
					
					//Mage::log($im_path.' '.$original_image_resized_path.' -quality 100 '.$command.' -resize 70 '.$thumb_path);
					//Mage::log($im_path.' '.$original_image_resized_path.' -quality 100 '.$command.' '.$main_path);
					
				}else{
					$thumb_path = $original_image_resized_path;
					$main_path = $original_image_resized_path;
				}
				
				$main_path = substr($main_path, strlen($base_media_dir)+1);
				$main_url = $base_media_url.$main_path;
				
				$thumb_path = substr($thumb_path, strlen($base_media_dir)+1);
				$thumb_url = $base_media_url.$thumb_path;
				
				$matrix_data['thumb'] = $main_url;
				$matrix_data['main'] = $thumb_url; 
				$matrix_data['filter_name'] = $filter; 
				
				$result['filter'][] = $matrix_data;
			}
		}
		
		$original_image_resized_path = substr($original_image_resized_path, strlen($base_media_dir)+1);
		$original_image_resized_url = $base_media_url.$original_image_resized_path;
		
		$result['main'] = $original_image_resized_url;
			
		$end = microtime(true);
		Mage::log('It took: '.round($end - $start, 3)." secs to generate Filter Thumbs of Image!");
		
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.json_encode($result).')';
			}else{
				echo '';
			}
		}else{
			echo json_encode($result);
		}
	}
	
	public function generateFilteredImageAction(){
	
		Mage::helper('dol')->validateRequestOrigin();
	
		$filter_name = $this->getRequest()->getParam('filter_name');
		$image_url = $this->getRequest()->getParam('image_url');
		$r = $this->getRequest()->getParam('r');
		$g = $this->getRequest()->getParam('g');
		$b = $this->getRequest()->getParam('b');
		$contrast = $this->getRequest()->getParam('contrast');
		$brightness = $this->getRequest()->getParam('brightness');
		$saturation = $this->getRequest()->getParam('saturation');
		$hue = $this->getRequest()->getParam('hue');
		$blur = $this->getRequest()->getParam('blr');
	
		$result_url = $image_url;
		
		$start = microtime(true);
		
		$ts_pos = strpos($image_url, '?ts');
		if($ts_pos!==false){
			$image_url = substr($image_url, 0, $ts_pos);
		}
	
		if($filter_name=='default'){
			$filter_name = '';
		}
		if($r && $r=='1'){
			$r = null;
		}
		if($g && $g=='1'){
			$g = null;
		}
		if($b && $b=='1'){
			$b = null;
		}
	
		if($filter_name || isset($r) || isset($g) || isset($b) || $contrast || $brightness || $saturation || $hue || $blur){
				
			$base_media_url = Mage::getBaseUrl('media', false);
			$base_media_dir = Mage::getBaseDir('media');
	
			$im_enabled = Mage::getStoreConfig(self::IM_ENABLED);
			$im_path = Mage::getStoreConfig(self::IM_PATH);
			
			$side_pos = strpos(str_replace('https', 'http', $image_url), str_replace('https', 'http', $base_media_url));
			
			if($side_pos!==false){
				$original_image_path = substr(str_replace('https', 'http', $image_url),strlen(str_replace('https', 'http', $base_media_url)));
			}else{
				$default_media_url = Mage::app()->getStore('default')->getBaseUrl('media');
				
				$side_pos = strpos(str_replace('https', 'http', $image_url), str_replace('https', 'http', $default_media_url));
				if($side_pos!==false){
					$original_image_path = substr(str_replace('https', 'http', $image_url),strlen(str_replace('https', 'http', $default_media_url)));
				}else{
					$side_pos = strpos($image_url, '/media');
					$original_image_path = substr($image_url, $side_pos+7);
				}
			}
				
			$original_image_path = $base_media_dir.'/'.$original_image_path;
				
			$extension = strtolower($this->getExtension($image_url));
			
			$fitered_image_path = str_replace('.'.$extension, '_filtered.'.$extension, $original_image_path);
			
			$core_image_path = str_replace('-pixopa-rgb', '', $original_image_path);
			$core_image_path = str_replace('_sized', '', $core_image_path);
			
			$core_filtered_image_path = str_replace('.'.$extension, '_filtered.'.$extension, $core_image_path);
			
			$command = '';
			
			switch($filter_name){
				case "vivid" : $command = '-color-matrix  \'3x3:1.2 -0.1 -0.1 -0.1  1.2 -0.1 -0.1 -0.1  1.2\''; break;
				case "invert" : $command = '-color-matrix  \'6x3: -1  0  0 0 0 1 0 -1  0 0 0 1 0  0 -1 0 0 1\''; break;
				case "polaroid" : $command = '-color-matrix  \'6x3: 1.438 -0.122 -0.016  0 0 -0.03 -0.062  1.378 -0.016  0 0  0.05 -0.062 -0.122 1.483 0 0 -0.02\''; break;
				case "lemonchiffon" : $command = '+level-colors navy,lemonchiffon'; break;
				case "sigmoidal" : $command = '-sigmoidal-contrast 4,10%'; break;
				case "sharpen" : $command = '-sharpen 0x1'; break;
				case "posterize" : $command = '+dither -posterize 7'; break;
				case "solarize" : $command = '-solarize 50%'; break;
				case "threshold" : $command = '-threshold 50%'; break;
				case "gamma" : $command = '-gamma 0.7'; break;
				case "sinusoid" : $command = '-function Sinusoid 3,-10,.7,.9'; break;
				case "fuzz" : $command = '-fuzz 50% -transparent white -alpha extract -negate'; break;
				case "charcoal" : $command = '-charcoal 5'; break;
				case "sketch" : $command = '-colorspace gray -sketch 0x20+120'; break;
				case "darken" : $command = '-level 25%'; break;
				case "sepia" : $command = '-color-matrix  \'5x5:0.39, 0.77, 0.19, 0, 0, 0.35, 0.68, 0.17, 0, 0, 0.27, 0.53, 0.13, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0\''; break;
				case "grayscale" : $command = '-color-matrix  \'5x5:0.30,0.30,0.30,0,0, 0.30,0.30,0.30,0,0, 0.30,0.30,0.30,0,0, 0,0,0,1,0,0,0,0,0,0\''; break;
			}
	
			if($im_enabled){
				
				$image_is_filtered = false;
				
				if($command){
					exec($im_path.' '.$original_image_path.' -quality 100 '.$command.' '.$fitered_image_path);
					//Mage::log($im_path.' '.$original_image_path.' -quality 100 '.$command.' '.$fitered_image_path);
					exec($im_path.' '.$core_image_path.' -quality 100 '.$command.' '.$core_filtered_image_path);
					$image_is_filtered = true;
				}
				
				$filter_command = '';
				if(isset($r) && $r!='1'){
					$filter_command = ' -channel R -evaluate multiply '.$r;
				}
				if(isset($g) && $g!='1'){
					$filter_command .= ' -channel G -evaluate multiply '.$g;
				}
				if(isset($b) && $b!='1'){
					$filter_command .= ' -channel B -evaluate multiply '.$b;
				}
				if($contrast){
					$filter_command .= ' -color-matrix \''.$contrast.'\'';
				}
				if($brightness){
					$filter_command .= ' -brightness-contrast '.$brightness.'x0';
				}
				if($saturation){
					$filter_command .= ' -color-matrix \''.$saturation.'\'';
				}
				if($hue){
					$filter_command .= ' -color-matrix \''.$hue.'\'';
				}
				if($blur){
					$filter_command .= '  -channel RGBA -blur 0x'.$blur;
				}
				
				if($filter_command){
					if(!$image_is_filtered){
						exec($im_path.' '.$original_image_path.' -quality 100 '.$filter_command.' '.$fitered_image_path);
						//Mage::log($im_path.' '.$original_image_path.' -quality 100 '.$filter_command.' '.$fitered_image_path);
						exec($im_path.' '.$core_image_path.' -quality 100 '.$filter_command.' '.$core_filtered_image_path);
					}else{
						exec($im_path.' '.$fitered_image_path.' -quality 100 '.$filter_command.' '.$fitered_image_path);
						//Mage::log($im_path.' '.$fitered_image_path.' -quality 100 '.$filter_command.' '.$fitered_image_path);
						exec($im_path.' '.$core_filtered_image_path.' -quality 100 '.$filter_command.' '.$core_filtered_image_path);
					}
				}
			}else{
				$fitered_image_path = $original_image_path;
			}

			$fitered_image_path = substr($fitered_image_path, strlen($base_media_dir)+1);
			$result_url = $base_media_url.$fitered_image_path;
			$result_url = $result_url.'?ts='.time().date("his");
		}
		
		$end = microtime(true);
		Mage::log('It took: '.round($end - $start, 3)." secs to Apply Filter on Image!");
	
		if($this->getRequest()->getParam("callback")) {
			if(Mage::helper('dol')->validateRequestOrigin()){
				echo 'jsonCallback('.$result_url.')';
			}else{
				echo '';
			}
		}else{
			echo $result_url;
		}
	}
	
	public function streamFileAction(){

		$url = $this->getRequest()->getParam('url');
		$filename = 'Design';
		
		header("Cache-Control: must-revalidate");
		header('Pragma: public');

		$extension = strpos($url, 'zip');
		
		if($extension!==false){
			header("Content-Disposition: attachment; filename=".$filename.".zip");
		}else{
			header("Content-Disposition: attachment; filename=".$filename.".pdf");
		}
		
		header('Content-Type: application/octet-stream');
		header("Content-Transfer-Encoding: binary");
		header('Expires: 0');
		
		$ob_get_status = ob_get_status();
		if(array_key_exists('name', $ob_get_status) && $ob_get_status['name']!='zlib output compression')ob_clean();
		flush();
		readfile($url);
		
	}
	
	
	public function getProductDetailsAction(){
		
		$product_id = $this->getRequest()->getParam('product_id');
		$product = Mage::getModel('catalog/product')->load($product_id);
		$attribute_set_id = $product->getAttributeSetId();
		$side = 1;
		
		$attribute_set = Mage::getModel('eav/entity_attribute_set')->load($attribute_set_id);
		
		$attributeGroupId = Mage::getModel('eav/entity_attribute_group')
		->getCollection()
		->addFieldToFilter('attribute_set_id', $attribute_set_id)
		->addFieldToFilter('attribute_group_name', 'ProductSelector')
		->getFirstItem()
		->getAttributeGroupId();
		
		$attributesInfo = Mage::getResourceModel('eav/entity_attribute_collection')
		->setAttributeSetFilter($attribute_set_id)
		->setAttributeGroupFilter($attributeGroupId)
		->addSetInfo()
		->getData();
		
		$configurable_attributes = array();
		 
		foreach($attributesInfo as $attribute){
		
			$catalog_attribute = Mage::getModel('catalog/entity_attribute')->load($attribute['attribute_id']);
			$attribute = Mage::getModel('eav/entity_attribute')->load($catalog_attribute['attribute_id']);
			$configurable_attributes[] = $attribute;
		}
		
		foreach($configurable_attributes as $configurable_attribute){
			
			$attribute_code = $configurable_attribute->getData('attribute_code');
			$attribute_code = strtolower($attribute_code);
			
			if(strpos($attribute_code, 'size')!==false){
				
				$size = $product->getResource()->getAttribute($attribute_code)->setStoreId(0)->getFrontend()->getValue($product);
				//$size = $product->getAttributeText($attribute_code);
				
				if(strpos($size, '(') !==false){
					$size = substr($size, 0, strpos($size, '('));
				}
				
				if(strpos($size, '’') !==false){
					$size = str_replace(' ', '', $size);
					$size = strtolower($size);
					
					$sizes = explode('x', $size);
					$height = $sizes[0];
					$width = $sizes[1];
					
					$height = str_replace('’', '', $height);
					$width = str_replace('’', '', $width);
					
					$height = 12 * intval($height);
					$width = 12 * intval($width);

					$size = $width.'"x'.$height.'"';
				
				}else if(strpos($size, '') !==false){
					$size = str_replace(' ', '', $size);
					$size = strtolower($size);
					
					$sizes = explode('x', $size);
					$height = $sizes[0];
					$width = $sizes[1];
					
					$height = str_replace('', '', $height);
					$width = str_replace('', '', $width);
					
					$height = 12 * intval($height);
					$width = 12 * intval($width);

					$size = $width.'"x'.$height.'"';
				}
			}
			
			if(strpos($attribute_code, 'side')!==false){
				//$side = $product->getAttributeText($attribute_code);
				$side = $product->getResource()->getAttribute($attribute_code)->setStoreId(0)->getFrontend()->getValue($product);
				
				if($side=='Double sided' || $side=='Double Sided'){
					$side = 2;
				}else{
					$side = 1;
				}
			}
		}
		
		if($size){
			echo '/dol?product='.$product_id.'&product_dimensions='.$size.'&product_number_of_pages='.$side;
		}else{
			echo '/dol?product='.$product_id.'&product_dimensions=4x4&product_number_of_pages='.$side;
		}
	}
	
	
	public function getSelectedProductDataAction(){
		
		$size_attribute_id = Mage::getStoreConfig('dol/catalog_setting/size_attribute_id');
		$orientation_attribute_id = Mage::getStoreConfig('dol/catalog_setting/orientation_attribute_id');
		$thickness_attribute_id = Mage::getStoreConfig('dol/catalog_setting/thickness_attribute_id');
		
		$params = $this->getRequest()->getParams();
		
		$super_attributes = $params['super_attribute'];
		$custom_options = $params['options'];
		
		$product = $this->getRequest()->getParam('product');
		$template_id = $this->getRequest()->getParam('template_id');
		$cpid = $this->getRequest()->getParam('cpid');
		$spid = '';
		$product_dimensions = '';
		$product_bleed = '';
		$product_safe_margin = '';
		
		if($cpid){
			$spid = $product;
			$product = $cpid;
		}
		
		$configurable_product = Mage::getModel('catalog/product')->load($product);
		$childProduct = Mage::getModel('catalog/product_type_configurable')->getProductByAttributes($this->getRequest()->getParam('super_attribute'), $configurable_product);
		
		if($childProduct->getId()){
			$spid = $childProduct->getId();
		}
		
		if(!$product_bleed){
			$product_bleed = $configurable_product->getData('bleed');
	
			if($product_bleed || $product_bleed=='0'){
				$product_bleed = $product_bleed * 96;
			}else{
				$product_bleed = '';
			}
		}
	
		if(!$product_safe_margin){
			$product_safe_margin = $configurable_product->getData('safe_margin');
	
			if($product_safe_margin){
				$product_safe_margin = $product_safe_margin * 96;
			}else{
				$product_safe_margin = '';
			}
		}
			
		$product_number_of_pages = $configurable_product->getData('product_number_of_pages');
		$product_dimensions = $configurable_product->getData('product_dimensions');
			
		if($product_bleed || $product_bleed=='0'){
			$bleed_margin = $product_bleed;
		}else{
			$bleed_margin = Mage::getStoreConfig('dol/dol_setting/bleed_margin');
		}
		
		$product_safe_margin = $this->getRequest()->getParam('product_safe_margin');
		if($product_safe_margin){
			$safe_margin = $product_safe_margin;
		}else{
			$safe_margin = $bleed_margin*2;
		}
		
		
		$config_data = Mage::helper('dol')->getConfigDisplayData($super_attributes, $custom_options, $product, $spid);
		
		if($cpid){
			$number_of_pages = Mage::helper('dol')->getNumberOfPages($super_attributes, $product_number_of_pages, $custom_options, $spid);
		}else{
			$number_of_pages = Mage::helper('dol')->getNumberOfPages($super_attributes, $product_number_of_pages, $custom_options, $product);
		}
		
		$pages_count = $number_of_pages['pages_count'];
		$pages_labels = $number_of_pages['page_labels'];
		
		$size_option_value_id = '';
		$size_label = '';
		
		if($super_attributes && $size_attribute_id && array_key_exists($size_attribute_id, $super_attributes)){
			$size_option_value_id = $super_attributes[$size_attribute_id];
			$size_label = $config_data['options'][$size_option_value_id];
		}
		
		$layout_custom_options = $custom_options;
		
		if($custom_options && !$size_label){
			if(array_key_exists('canvas_size',$config_data['custom_options_data'])){
				$size_label = $config_data['custom_options_data']['canvas_size'];
				$size_option_value_id = $config_data['custom_options_data']['size_id'];
				$size_option_id = $config_data['custom_options_data']['size_option_id'];
				unset($layout_custom_options[$size_option_id]);
			}
		}
		
		$matching_layout = Mage::helper('dol')->getMatchingProductLayout($product, $size_option_value_id, $super_attributes, $layout_custom_options);
		
		if($matching_layout && array_key_exists('image', $matching_layout) && array_key_exists('fg_image', $matching_layout) && array_key_exists('bg_image', $matching_layout) && $matching_layout['fg_image'] && $matching_layout['bg_image']){
			$bleed_margin = 0;
			$safe_margin = 0;
		}
		
		if($cpid){
			$canvas_pid = $spid;
		}else{
			$canvas_pid = $product;
		}
		
		Mage::log('$bleed_margin - '.$bleed_margin);
		
		$canvas_dimensions = Mage::helper('dol')->getProductCanvasDimensions($size_label, null, $bleed_margin, $product_dimensions, $custom_options, $canvas_pid);
		
		Mage::log($canvas_dimensions);
		Mage::log('$size_label - '.$size_label);
		
		if(($super_attributes && $orientation_attribute_id && array_key_exists($orientation_attribute_id, $super_attributes)) || $canvas_dimensions['orientation']){
			
			if(!$canvas_dimensions['orientation']){
				$orientation_option_id = $super_attributes[$orientation_attribute_id];
				$orientation_label = $config_data['options'][$orientation_option_id];
			}else{
				$orientation_label = $canvas_dimensions['orientation'];
			}
			
			$orientation_label = trim($orientation_label);
			
			if($orientation_label){
				$pos = strpos($orientation_label, '{');
				$endpos = strpos($orientation_label, '}');
					 
				if ($pos !== false && $endpos !== false) {
					$endpos = $endpos - strlen($orientation_label);
					$orientation_label = substr($orientation_label, $pos+1, $endpos);
				}
			}
		
			if($orientation_label=='landscape' || $orientation_label=='Landscape' || $orientation_label=='horizontal' || $orientation_label=='Horizontal' || $orientation_label=='manzara'){
				$reverse_height = $canvas_dimensions['height'];
				$reverse_width = $canvas_dimensions['width'];
		
				if($reverse_height>$reverse_width){
					$canvas_dimensions['height'] = $reverse_width;
					$canvas_dimensions['width'] = $reverse_height;
				}
			}
			
			if($orientation_label=='portrait' || $orientation_label=='Portrait' || $orientation_label=='vertical' || $orientation_label=='Vertical' || $orientation_label=='portre'){
				$reverse_height = $canvas_dimensions['height'];
				$reverse_width = $canvas_dimensions['width'];
		
				if($reverse_height<$reverse_width){
					$canvas_dimensions['height'] = $reverse_width;
					$canvas_dimensions['width'] = $reverse_height;
				}
			}
		}
		
		if($thickness_attribute_id){
		
			if(array_key_exists($thickness_attribute_id, $super_attributes)){
		
				$thickness_option_id = $super_attributes[$thickness_attribute_id];
				$thickness_label = $config_data['options'][$thickness_option_id];
			}else{
		
				if($spid){
					$simple_product_id = $spid;
				}
		
				$thickness_label = Mage::helper('dol')->getProductThickness($custom_options, $simple_product_id);
			}
		
			if($thickness_label){
				$mm_pos = strpos($thickness_label, 'mm');
		
				if($mm_pos !== false){
					$thickness = str_replace('mm', '', $thickness_label);
					$thickness = $thickness * 96 * 0.0393701;
				}
		
				$inch_pos = strpos($thickness_label, 'inch');
		
				if($inch_pos !== false){
					$thickness = str_replace('inch', '', $thickness_label);
					$thickness = $thickness * 96;
				}
				$canvas_dimensions['width'] = $canvas_dimensions['width'] + $thickness;
			}
		}
		
		$height = $canvas_dimensions['height'];
		$width = $canvas_dimensions['width'];
		$zoom_factor = 1;
		
		$enable_zoom_factor = Mage::getStoreConfig('dol/dol_setting/enable_zoom_factor');
		if($enable_zoom_factor){
		
			$max_canvas_width = 540;
			$max_canvas_height = 540;
			
			if($height > $width || $height==$width){
				if($height>$max_canvas_height){
					$zoom_factor = $height / $max_canvas_height;
					$canvas_dimensions['height'] = $height / $zoom_factor;
					$canvas_dimensions['width'] = $width / $zoom_factor;
				}
			}else{
				if($width>$max_canvas_width){
					$zoom_factor = $width / $max_canvas_width;
					$canvas_dimensions['height'] = $height / $zoom_factor;
					$canvas_dimensions['width'] = $width / $zoom_factor;
				}
			}
		}
		
		for($i=0; $i<$pages_count; $i++){
			
			$pages['pagename'] = $pages_labels[$i];
			$pages['width'] = $canvas_dimensions['width'];
			$pages['height'] = $canvas_dimensions['height'];
			
			if($matching_layout && array_key_exists('image', $matching_layout)){
				
				if($i==0){
					
					if(array_key_exists('fg_image', $matching_layout) && $matching_layout['fg_image']){
						$pages['layout_front'] = $matching_layout['fg_image'];
					}
					
					if(array_key_exists('bg_image', $matching_layout) && $matching_layout['bg_image']){
						$pages['layout_back'] = $matching_layout['bg_image'];
					}
					
					if(array_key_exists('margin_layout', $matching_layout) && $matching_layout['margin_layout']){
						$pages['layout_margin'] = $matching_layout['margin_layout'];
					}
				}else{
				
					if(array_key_exists('layout_childs', $matching_layout) && $matching_layout['layout_childs']){
						$layout_childs = $matching_layout['layout_childs'];
						
						if(array_key_exists('fg_image_path', $layout_childs[$i-1]) && $layout_childs[$i-1]['fg_image_path']){
							$pages['layout_front'] = $layout_childs[$i-1]['fg_image_path'];
						}
							
						if(array_key_exists('bg_image_path', $layout_childs[$i-1]) && $layout_childs[$i-1]['bg_image_path']){
							$pages['layout_back'] = $layout_childs[$i-1]['bg_image_path'];
						}
							
						if(array_key_exists('margin_layout', $layout_childs[$i-1]) && $layout_childs[$i-1]['margin_layout']){
							$pages['layout_margin'] = $layout_childs[$i-1]['margin_layout'];
						}
					}
				}
			}
			
			$pages_data[] = $pages;
		}
		
		$result['pages'] = $pages_data;
		$result['zoom'] = $zoom_factor;
		echo json_encode($result);
	}
	
}
