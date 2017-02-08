<?php

/**
 * BelVG LLC.
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the EULA
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://store.belvg.com/BelVG-LICENSE-COMMUNITY.txt
 *
  /***************************************
 *         MAGENTO EDITION USAGE NOTICE *
 * *************************************** */
/* This package designed for Magento COMMUNITY edition
 * BelVG does not guarantee correct work of this extension
 * on any other Magento edition except Magento COMMUNITY edition.
 * BelVG does not provide extension support in case of
 * incorrect edition usage.
  /***************************************
 *         DISCLAIMER   *
 * *************************************** */
/* Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future.
 * ****************************************************
 * @category   Belvg
 * @package    Belvg_FacebookFree
 * @copyright  Copyright (c) 2010 - 2011 BelVG LLC. (http://www.belvg.com)
 * @license    http://store.belvg.com/BelVG-LICENSE-COMMUNITY.txt
 */

require_once("lib/Facebook/src/Facebook.php");

class Belvg_FacebookFree_CustomerController extends Mage_Core_Controller_Front_Action {

    public function LoginAction()
    {
        $me = null;
        
        $facebook = new Facebook(array(
		  'appId'  => Mage::getStoreConfig('facebookfree/settings/appid'),
		  'secret' => Mage::getStoreConfig('facebookfree/settings/secret'),
		));

		$me = $facebook->getUser();
		$access_token = $facebook->getAccessToken();
		
        $me = json_decode($this->getFbData('https://graph.facebook.com/me?access_token=' . $access_token));

        if (!is_null($me)) {
			$me = (array)$me;
            $session = Mage::getSingleton('customer/session');

            $db_read = Mage::getSingleton('core/resource')->getConnection('facebookfree_read');
            $tablePrefix = (string) Mage::getConfig()->getTablePrefix();
            $sql = 'SELECT `customer_id`
					FROM `' . $tablePrefix . 'belvg_facebook_customer`
					WHERE `fb_id` = ' . $me['id'] . '
					LIMIT 1';
            $data = $db_read->fetchRow($sql);

            if ($data) {
                $session->loginById($data['customer_id']);
            } else {
                $sql = 'SELECT `entity_id`
						FROM `' . $tablePrefix . 'customer_entity`
						WHERE email = "' . $me['email'] . '"
						AND store_id = "'.Mage::app()->getStore()->getStoreId().'"
						AND website_id = "'.Mage::getModel('core/store')->load(Mage::app()->getStore()->getStoreId())->getWebsiteId().'"
						LIMIT 1';
                $r = $db_read->fetchRow($sql);

                if ($r) {
                    $db_write = Mage::getSingleton('core/resource')->getConnection('facebookfree_write');
                    $sql = 'INSERT INTO `' . $tablePrefix . 'belvg_facebook_customer`
                                                    VALUES (' . $r['entity_id'] . ', ' . $me['id'] . ')';
                    $db_write->query($sql);
                    $session->loginById($r['entity_id']);
                } else {
                    $this->_registerCustomer($me, $session);
                }
            }
            $this->_loginPostRedirect($session);
        }
    }

    public function LogoutAction()
    {
        $session = Mage::getSingleton('customer/session');
        $session->logout()
                ->setBeforeAuthUrl(Mage::getUrl());

        $this->_redirect('customer/account/logoutSuccess');
    }

    private function _registerCustomer($data, &$session)
    {
        $customer = Mage::getModel('customer/customer')->setId(null);
        $customer->setData('firstname', $data['first_name']);
        $customer->setData('lastname', $data['last_name']);
        $customer->setData('email', $data['email']);
        $customer->setData('password', md5(time() . $data['id'] . $data['locale']));
        $customer->setData('is_active', 1);
        $customer->setData('confirmation', null);
        $customer->setConfirmation(null);
        $customer->getGroupId();
        $customer->save();

        Mage::getModel('customer/customer')->load($customer->getId())->setConfirmation(null)->save();
        $customer->setConfirmation(null);
        $session->setCustomerAsLoggedIn($customer);
        $customer_id = $session->getCustomerId();
        $db_write = Mage::getSingleton('core/resource')->getConnection('facebookfree_write');
        $tablePrefix = (string) Mage::getConfig()->getTablePrefix();
        $sql = 'INSERT INTO `' . $tablePrefix . 'belvg_facebook_customer`
				VALUES (' . $customer_id . ', ' . $data['id'] . ')';
        $db_write->query($sql);
    }

    private function _loginPostRedirect(&$session)
    {

        if ($referer = $this->getRequest()->getParam(Mage_Customer_Helper_Data::REFERER_QUERY_PARAM_NAME)) {
            $referer = Mage::helper('core')->urlDecode($referer);
            if ((strpos($referer, Mage::app()->getStore()->getBaseUrl()) === 0)
                    || (strpos($referer, Mage::app()->getStore()->getBaseUrl(Mage_Core_Model_Store::URL_TYPE_LINK, true)) === 0)) {
                $session->setBeforeAuthUrl($referer);
            } else {
                $session->setBeforeAuthUrl(Mage::helper('customer')->getDashboardUrl());
            }
        } else {
            $session->setBeforeAuthUrl(Mage::helper('customer')->getDashboardUrl());
        }
        $this->_redirectUrl($session->getBeforeAuthUrl(true));
    }

    private function get_facebook_cookie($app_id, $app_secret)
    {
        if ($_COOKIE['fbsr_' . $app_id] != '') {
            return $this->get_new_facebook_cookie($app_id, $app_secret);
        } else {
            return $this->get_old_facebook_cookie($app_id, $app_secret);
        }
    }

    private function get_old_facebook_cookie($app_id, $app_secret)
    {
        $args = array();
        parse_str(trim($_COOKIE['fbs_' . $app_id], '\\"'), $args);
        ksort($args);
        $payload = '';
        foreach ($args as $key => $value) {
            if ($key != 'sig') {
                $payload .= $key . '=' . $value;
            }
        }
        if (md5($payload . $app_secret) != $args['sig']) {
            return array();
        }
        return $args;
    }

    private function get_new_facebook_cookie($app_id, $app_secret)
    {
        $signed_request = $this->parse_signed_request($_COOKIE['fbsr_' . $app_id], $app_secret);
        // $signed_request should now have most of the old elements
        $signed_request['uid'] = $signed_request['user_id']; // for compatibility 
        if (!is_null($signed_request)) {
            // the cookie is valid/signed correctly
            // lets change "code" into an "access_token"
            $url = 'https://graph.facebook.com/oauth/access_token?client_id='.$app_id.'&redirect_uri=&client_secret='.$app_secret.'&code='.$signed_request['code'];
			$access_token_response = $this->getFbData($url);
			$access_token = '';
			parse_str($access_token_response);
			Mage::log('Facebook Access token - '.$access_token);
			if(!$access_token){
				Mage::log('Facebook Access token not found. $access_token_response - '.$access_token_response.' for URL - '.$url);
				return '';
			}
			$signed_request['access_token'] = $access_token;
			$signed_request['expires'] = time() + $expires;
        }
        return $signed_request;
    }

    private function parse_signed_request($signed_request, $secret)
    {
        list($encoded_sig, $payload) = explode('.', $signed_request, 2);

        // decode the data
        $sig = $this->base64_url_decode($encoded_sig);
        $data = json_decode($this->base64_url_decode($payload), true);

        if (strtoupper($data['algorithm']) !== 'HMAC-SHA256') {
            error_log('Unknown algorithm. Expected HMAC-SHA256');
            return null;
        }

        // check sig
        $expected_sig = hash_hmac('sha256', $payload, $secret, $raw = true);
        if ($sig !== $expected_sig) {
            error_log('Bad Signed JSON signature!');
            return null;
        }

        return $data;
    }

    private function base64_url_decode($input)
    {
        return base64_decode(strtr($input, '-_', '+/'));
    }
	
	private function getFbData($url)
	{
		$data = null;

		if (ini_get('allow_url_fopen') && function_exists('file_get_contents')) {
			try{
        		$data = file_get_contents($url);
       		}catch(Exception $e){
       			Mage::log($e->getMessage());
				return '';
			}
		} else {
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$data = curl_exec($ch);
		}
		return $data;
	}
	
	
	public function albumsOldAction()
    {
        $me = null;
        $cookie = $this->get_facebook_cookie(Mage::getStoreConfig('facebookfree/settings/appid'), Mage::getStoreConfig('facebookfree/settings/secret'));
        
        if(!$cookie){
        	Mage::log('Facebook Cookie not found!');
        	$response['error'] = 'An unexpected error occurred. Please try again.';
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
        
        $url = 'https://graph.facebook.com/me?access_token='.$cookie['access_token'];
        $me = json_decode($this->getFbData($url));

        if (!is_null($me)) {
			$me = (array)$me;
			$user_id = $me['id'];
			
			$albums_url = 'https://graph.facebook.com/'.$user_id.'/albums/?fields=name,cover_photo&limit=1000&access_token=' . $cookie['access_token'];
			
	        if (ini_get('allow_url_fopen') && function_exists('file_get_contents')) {
				try{
	        		$data = file_get_contents($albums_url);
	       		}catch(Exception $e){
	       			Mage::log($e->getMessage());
					$response['error'] = 'An unexpected error occurred. Please try again.';
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
			} else {
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $albums_url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				$data = curl_exec($ch);
			}
			
			$album_list = json_decode($data,true);
			
			if(count($album_list['data'])>0){
				
				Mage::log('Found '.count($album_list['data']).' Facebook Albums!');
				$album_pictures = array();
				foreach($album_list['data'] as $album){
					
					$album_picture_id = $album['cover_photo'];
					$album_picture['method'] = 'GET'; 
					$album_picture['relative_url'] = $album_picture_id.'/?fields=picture';
					$album_pictures[] = $album_picture;
				}
				
				$album_pictures = json_encode($album_pictures);
				
				Mage::log('Fetching Facebook Cover Photos!');
				
				$url = 'curl -F \'access_token='.$cookie['access_token'].'\' -F \'batch='.$album_pictures.'\' https://graph.facebook.com';
	
		        $output = array();
		        exec($url, $output);
		        
		        $output_pictures = json_decode($output[0], true);
		        
		        $picture_list = array();
		        if($output_pictures && count($output_pictures)>0){
		        	
		        	Mage::log('Fetched '.count($output_pictures).' Facebook Cover Photos!');
		        	foreach($output_pictures as $output_picture){
		        		$body = $output_picture['body'];
		        		$body = json_decode($body, true);
		        		$picture_list[$body['id']] = $body['picture'];
		        	}
		        }else{
		        	Mage::log('No Facebook Cover Photos Found!');
		        }
        
				$images_html = '<ul id="colorSet" class="colorSet">';
				foreach($album_list['data'] as $album){
					
					$album_picture_id = $album['cover_photo'];
				
					$name = str_replace('\'','',$album['name']);
					$images_html .=	'<li>';
					$images_html .=	'<a href="#" title="'.$album['name'].'" onclick="getFacebookAlbumImages(\''.$album['id'].'\',\''.$name.'\');return false;">';
					$images_html .=	'<img id="'.$album['id'].'" alt="" src="'.$picture_list[$album_picture_id].'" height="75px"/><p class="album">'.Mage::helper('cms')->__('Album').'</p></a>';
					$images_html .=	'</li>';
				}
				$images_html .= '</ul>';
				
				$images_data['images'] = $images_html;
				$images_data['hdr'] = Mage::helper('cms')->__('All Facebook Albums').'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a href="#" onclick="return fblogout();">'.Mage::helper('cms')->__('Logout from Facebook').'</a></span>';
		    
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
	    		
			}else{
				Mage::log('No Facebook Albums found!');
				$response['error'] = 'No albums found. Please try again.';
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
        }else{
        	Mage::log('Facebook User response error. URL - '.$url);
        	$response['error'] = 'An unexpected error occurred. Please try again.';
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
    }
    
    
	public function albumImagesOldAction()
    {
        $cookie = $this->get_facebook_cookie(Mage::getStoreConfig('facebookfree/settings/appid'), Mage::getStoreConfig('facebookfree/settings/secret'));

    	if(!$cookie){
    		Mage::log('Facebook Cookie not found!');
        	$response['error'] = 'An unexpected error occurred. Please try again.';
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
        
        if ($cookie) {
			$album_id = $this->getRequest()->getParam('facebook_album_id');
			$album_name = $this->getRequest()->getParam('facebook_album_name');
			$albums_url = 'https://graph.facebook.com/'.$album_id.'/photos/?limit=1000&fields=picture,images,name&access_token=' . $cookie['access_token'];

			if (ini_get('allow_url_fopen') && function_exists('file_get_contents')) {
				try{
					$data = file_get_contents($albums_url);
				}catch(Exception $e){
					Mage::log($e->getMessage());
					$response['error'] = 'An unexpected error occurred. Please try again.';
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
			} else {
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $albums_url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				$data = curl_exec($ch);
			}
			
			$photo_list = json_decode($data,true);
			
			if(count($photo_list['data'])>0){
			
				Mage::log('Found '.count($photo_list['data']).' Facebook Album Photos!');
				
				$images_html = '<ul id="colorSet" class="colorSet draggable">';
				foreach($photo_list['data'] as $photo){
				
					$name = '';
					if(array_key_exists('name', $photo)){
						$name = $photo['name'];
					}
					
					$images_html .=	'<li>';
					$images_html .=	'<a target="_blank" title="'.$name.'" href="'.$photo['images'][0]['source'].'">';
					$images_html .=	'<img id="'.$photo['id'].'" alt="" src="'.$photo['picture'].'" height="75px" rel="'.$photo['images'][0]['source'].'"/></a>';
					$images_html .=	'</li>';
				}
				$images_html .= '</ul>';
				
				$images_data['images'] = $images_html;
		    	$images_data['hdr'] = '<a href="#" onclick="getFacebookAlbums();return false;">'.Mage::helper('cms')->__('Back to All Albums').'</a> / '.Mage::helper('cms')->__('Current Album').': '.$album_name.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a href="#" onclick="return fblogout();">'.Mage::helper('cms')->__('Logout from Facebook').'</a></span>';
	    
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
				
			}else{
				$response['error'] = 'No images found. Please try again.';
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
        }else{
        	$response['error'] = 'An unexpected error occurred. Please try again.';
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
    }
    
    
    
	public function albumsAction()
    {
        $me = null;
        
        $facebook = new Facebook(array(
		  'appId'  => Mage::getStoreConfig('facebookfree/settings/appid'),
		  'secret' => Mage::getStoreConfig('facebookfree/settings/secret'),
		));

		$me = $facebook->getUser();
		$access_token = $facebook->getAccessToken();

        $url = 'https://graph.facebook.com/me?access_token='.$access_token;
        $me = json_decode($this->getFbData($url));

        if (!is_null($me)) {
			$me = (array)$me;
			$user_id = $me['id'];
			
			$albums_url = 'https://graph.facebook.com/'.$user_id.'/albums/?fields=name,cover_photo&limit=1000&access_token=' . $access_token;
			
	        if (ini_get('allow_url_fopen') && function_exists('file_get_contents')) {
				try{
	        		$data = file_get_contents($albums_url);
	       		}catch(Exception $e){
	       			Mage::log($e->getMessage());
					$response['error'] = 'An unexpected error occurred. Please try again.';
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
			} else {
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $albums_url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				$data = curl_exec($ch);
			}
			
			$album_list = json_decode($data,true);
			
			if(count($album_list['data'])>0){
				
				Mage::log('Found '.count($album_list['data']).' Facebook Albums!');
				$album_count = count($album_list['data']);
				
				if($album_count > 30){
					
					$album_loops = ceil($album_count / 30);
					$output_pictures = array();
					
					for($i=1; $i<=$album_loops; $i++){
					
						$album_pictures = array();
						$count = 0;
						$lower_count = $i*30 - 30;
						$upper_count = $i*30;
						
						foreach($album_list['data'] as $album){
							
							if($count >= $lower_count && $count < $upper_count){
								if(array_key_exists('cover_photo', $album)){
									$album_picture_id = $album['cover_photo'];
									$album_picture['method'] = 'GET'; 
									$album_picture['relative_url'] = $album_picture_id.'/?fields=picture';
									$album_pictures[] = $album_picture;
								}
							}
							$count++;
						}
						
						$album_pictures = json_encode($album_pictures);
						
						Mage::log('Fetching Facebook Cover Photos!');
						
						$url = 'curl -F \'access_token='.$access_token.'\' -F \'batch='.$album_pictures.'\' https://graph.facebook.com';
			
				        $output = array();
				        exec($url, $output);
				        
				        $output_pictures = array_merge($output_pictures, json_decode($output[0], true));
					}
			        
				}else{
					$album_pictures = array();
					foreach($album_list['data'] as $album){
					
						if(array_key_exists('cover_photo', $album)){
							$album_picture_id = $album['cover_photo'];
							$album_picture['method'] = 'GET';
							$album_picture['relative_url'] = $album_picture_id.'/?fields=picture';
							$album_pictures[] = $album_picture;
						}
					}
						
					$album_pictures = json_encode($album_pictures);
						
					Mage::log('Fetching Facebook Cover Photos!');
						
					$url = 'curl -F \'access_token='.$access_token.'\' -F \'batch='.$album_pictures.'\' https://graph.facebook.com';
					
					$output = array();
					exec($url, $output);
					 
					$output_pictures = json_decode($output[0], true);
				}
		        
		        $picture_list = array();
		        if($output_pictures && count($output_pictures)>0){
		        	
		        	Mage::log('Fetched '.count($output_pictures).' Facebook Cover Photos!');
		        	foreach($output_pictures as $output_picture){
		        		$body = $output_picture['body'];
		        		$body = json_decode($body, true);
		        		$picture_list[$body['id']] = $body['picture'];
		        	}
		        }else{
		        	Mage::log('No Facebook Cover Photos Found!');
		        	$response['error'] = 'No albums found. Please try again.';
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
        
				$images_html = '<ul id="colorSet" class="colorSet">';
				foreach($album_list['data'] as $album){
					
					if(array_key_exists('cover_photo', $album)){
						$album_picture_id = $album['cover_photo'];
						$album_picture = $picture_list[$album_picture_id];
					}else{
						$album_picture = "/js/all/editor/images/no-fb-cover.png";
					}
				
					$name = str_replace('\'','',$album['name']);
					$images_html .=	'<li>';
					$images_html .=	'<a href="#" title="'.$album['name'].'" onclick="getFacebookAlbumImages(\''.$album['id'].'\',\''.$name.'\');return false;">';
					$images_html .=	'<img id="'.$album['id'].'" alt="" src="'.$album_picture.'" height="75px"/><p class="album">Album</p></a>';
					$images_html .=	'</li>';
				}
				$images_html .= '</ul>';
				
				$images_data['images'] = $images_html;
				$images_data['hdr'] = Mage::helper('cms')->__('All Facebook Albums').'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a href="#" onclick="return fblogout();">'.Mage::helper('cms')->__('Logout from Facebook').'</a></span>';
		    
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
	    		
			}else{
				Mage::log('No Facebook Albums found!');
				$response['error'] = 'No albums found. Please try again.';
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
        }else{
        	Mage::log('Facebook User response error. URL - '.$url);
        	$response['error'] = 'An unexpected error occurred. Please try again.';
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
    }
    
    
	public function albumImagesAction()
    {
        $me = null;
        
        $facebook = new Facebook(array(
		  'appId'  => Mage::getStoreConfig('facebookfree/settings/appid'),
		  'secret' => Mage::getStoreConfig('facebookfree/settings/secret'),
		));

		$me = $facebook->getUser();
		$access_token = $facebook->getAccessToken();

        if ($me && $access_token) {
			$album_id = $this->getRequest()->getParam('facebook_album_id');
			$album_name = $this->getRequest()->getParam('facebook_album_name');
			$albums_url = 'https://graph.facebook.com/'.$album_id.'/photos/?limit=1000&fields=picture,images,name&access_token=' . $access_token;

			if (ini_get('allow_url_fopen') && function_exists('file_get_contents')) {
				try{
					$data = file_get_contents($albums_url);
				}catch(Exception $e){
					Mage::log($e->getMessage());
					$response['error'] = 'An unexpected error occurred. Please try again.';
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
			} else {
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $albums_url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				$data = curl_exec($ch);
			}
			
			$photo_list = json_decode($data,true);
			
			if(count($photo_list['data'])>0){
			
				Mage::log('Found '.count($photo_list['data']).' Facebook Album Photos!');
				
				$images_html = '<ul id="colorSet" class="colorSet draggable">';
				foreach($photo_list['data'] as $photo){
				
					$name = '';
					if(array_key_exists('name', $photo)){
						$name = $photo['name'];
					}
					
					$filename = $photo['images'][0]['source'];
					$not_original = strpos($filename, '_n.jpg');
					
					if($not_original===false){
						$height = $photo['images'][0]['height'];
			    		$width = $photo['images'][0]['width'];
					}else{
						$height = $photo['images'][1]['height'];
			    		$width = $photo['images'][1]['width'];
					}
			    	
		    		if(Mage::helper('dol')->isImageResolutionLow($width, $height)){
						$is_low_res = true;
					}else{
						$is_low_res = false;
					}
					
					if($is_low_res){
						$images_html .=	'<li class="lowres"><div class="overlay"><div class="bt1" title="Add Image"><img src="/js/all/editor/images/add-image.png"/></div></div>';
					}else{
						$images_html .=	'<li class="high_resol"><div class="overlay"><div class="bt1" title="Add Image"><img src="/js/all/editor/images/add-image.png"/></div></div>';
					}
			
					$images_html .=	'<a target="_blank" title="'.$name.'" href="'.$photo['images'][0]['source'].'">';
					$images_html .=	'<img id="'.$photo['id'].'" alt="" style="cursor:move;" src="'.$photo['picture'].'" height="75px" rel="'.$photo['images'][0]['source'].'"/></a><span class="select"></span>';
					if($is_low_res){
						$images_html .=	'<span style="opacity:1;"></span>';
					}
					$images_html .=	'</li>';
				}
				$images_html .= '</ul>';
				
				$images_data['images'] = $images_html;
				$minimum_resolution = Mage::getStoreConfig('dol/dol_setting/minimum_resolution');
		    	$images_data['hdr'] = '<a href="#" onclick="getFacebookAlbums();return false;">'.Mage::helper('cms')->__('Back to All Albums').'</a> / '.Mage::helper('cms')->__('Current Album').': '.$album_name.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a href="#" onclick="return fblogout();">'.Mage::helper('cms')->__('Logout from Facebook').'</a></span><span class="lowres-warning"><img src="/js/all/editor/images/warning-small22.png" style="cursor:help;" width="16px" height="16px"></img> = '.Mage::helper('cms')->__('Low Resolution').'<div class=\'tooltip_full_value\'> <p><b>'.Mage::helper('cms')->__('Image Resolution is Low</b><br/>Required dimensions for each image are '.$minimum_resolution.'x'.$minimum_resolution.'px.').'<br />'.Mage::helper('cms')->__('The quality of final print may get affected.').'</p></div></span>';
	    
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
				
			}else{
				$response['error'] = 'No images found in the album. Please try other album.';
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
        }else{
        	$response['error'] = 'An unexpected error occurred. Please try again.';
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
    }
    
    
    public function factoryalbumImagesAction()
    {
    	$me = null;
    
    	$facebook = new Facebook(array(
    			'appId'  => Mage::getStoreConfig('facebookfree/settings/appid'),
    			'secret' => Mage::getStoreConfig('facebookfree/settings/secret'),
    	));
    
    	$me = $facebook->getUser();
    	$access_token = $facebook->getAccessToken();
    
    	if ($me && $access_token) {
    		$album_id = $this->getRequest()->getParam('facebook_album_id');
    		$album_name = $this->getRequest()->getParam('facebook_album_name');
    		$albums_url = 'https://graph.facebook.com/'.$album_id.'/photos/?limit=1000&fields=picture,images,name&access_token=' . $access_token;
    
    		if (ini_get('allow_url_fopen') && function_exists('file_get_contents')) {
    			try{
    				$data = file_get_contents($albums_url);
    			}catch(Exception $e){
    				Mage::log($e->getMessage());
    				$response['error'] = 'An unexpected error occurred. Please try again.';
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
    		} else {
    			$ch = curl_init();
    			curl_setopt($ch, CURLOPT_URL, $albums_url);
    			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    			$data = curl_exec($ch);
    		}
    			
    		$photo_list = json_decode($data,true);
    			
    		if(count($photo_list['data'])>0){
    				
    			Mage::log('Found '.count($photo_list['data']).' Facebook Album Photos!');
    
    			$images_html = '<ul id="colorSet" class="colorSet draggable">';
    			foreach($photo_list['data'] as $photo){
    
    				$name = '';
    				if(array_key_exists('name', $photo)){
    					$name = $photo['name'];
    				}
    					
    				$filename = $photo['images'][0]['source'];
    				$not_original = strpos($filename, '_n.jpg');
    					
    				if($not_original===false){
    					$height = $photo['images'][0]['height'];
    					$width = $photo['images'][0]['width'];
    				}else{
    					$height = $photo['images'][1]['height'];
    					$width = $photo['images'][1]['width'];
    				}
    
    				if(Mage::helper('dol')->isImageResolutionLow($width, $height)){
    					$is_low_res = true;
    				}else{
    					$is_low_res = false;
    				}
    					
    				if($is_low_res){
    					$images_html .=	'<li class="lowres"><div class="overlay"></div>';
    				}else{
    					$images_html .=	'<li class="high_resol"><div class="overlay"></div>';
    				}
    					
    				$images_html .=	'<a target="_blank" title="'.$name.'" href="'.$photo['images'][0]['source'].'">';
    				$images_html .=	'<img id="'.$photo['id'].'" alt="" style="cursor:move;" src="'.$photo['picture'].'" height="75px" rel="'.$photo['images'][0]['source'].'"/></a><span class="select"></span>';
    				if($is_low_res){
    					$images_html .=	'<span style="opacity:1;"></span>';
    				}
    				$images_html .=	'</li>';
    			}
    			$images_html .= '</ul>';
    
    			$images_data['images'] = $images_html;
    			$minimum_resolution = Mage::getStoreConfig('dol/dol_setting/minimum_resolution');
    			$images_data['hdr'] = '<a href="#" onclick="getFacebookAlbums();return false;">'.Mage::helper('cms')->__('Back to All Albums').'</a> / '.Mage::helper('cms')->__('Current Album').': '.$album_name.'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a href="#" onclick="return fblogout();">'.Mage::helper('cms')->__('Logout from Facebook').'</a></span><span class="lowres-warning"><img src="/js/all/editor/images/warning-small22.png" style="cursor:help;" width="16px" height="16px"></img> = '.Mage::helper('cms')->__('Low Resolution').'<div class=\'tooltip_full_value\'> <p><b>'.Mage::helper('cms')->__('Image Resolution is Low</b><br/>Required dimensions for each image are '.$minimum_resolution.'x'.$minimum_resolution.'px.').'<br />'.Mage::helper('cms')->__('The quality of final print may get affected.').'</p></div></span>';
    			 
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
    
    		}else{
    			$response['error'] = 'No images found in the album. Please try other album.';
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
    	}else{
    		$response['error'] = 'An unexpected error occurred. Please try again.';
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
    }
}