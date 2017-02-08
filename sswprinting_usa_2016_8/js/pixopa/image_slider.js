var cross_domain = '';

$j(function() {
	var $items = $j('#vtab>ul>li');
	$items.click(function() {			
		$items.removeClass('selected');		
		$j(this).addClass('selected');			
		var index = $items.index($j(this));			
		$j('#vtab>div').hide().eq(index).show();
		$j(".flickr_div").mCustomScrollbar("update");
		width = $j(".flickr_div .mCSB_container").width();
		//$j(".flickr_div .mCSB_container").css("width",width+4);		
		$j(".picasa_div").mCustomScrollbar("update");
		width = $j(".picasa_div .mCSB_container").width();
		//$j(".picasa_div .mCSB_container").css("width",width+4);
		
		$j(".instagram_div").mCustomScrollbar("update");
		width = $j(".instagram_div .mCSB_container").width();
		//$j(".instagram_div .mCSB_container").css("width",width+4);
		
		$j(".facebook_div").mCustomScrollbar("update");
		width = $j(".facebook_div .mCSB_container").width();
		//$j(".facebook_div .mCSB_container").css("width",width+4);
		
		$j(".myimages_div").mCustomScrollbar("update");
		width = $j(".myimages_div .mCSB_container").width();
		$j(".myimages_div .mCSB_container").css("width",width+4);
	}).eq(0).click();	
	
	/*var $items1 = $j('#fontview .vtab>ul>li');
	$items1.click(function() {
		$items1.removeClass('selected');
		$j(this).addClass('selected');

		var index = $items1.index($j(this));
		$j('#fontview .vtab>div').hide().eq(index).show();
	}).eq(0).click();*/
		
		/*$j('.flickr_div').tinyscrollbar({axis:'x'});	
		$j('.picasa_div').tinyscrollbar({axis:'x'});
		$j('.myimages_div').tinyscrollbar({axis:'x'});
		$j('.instagram_div').tinyscrollbar({axis:'x'});
		$j('.facebook_div').tinyscrollbar({axis:'x'});*/
});

function show1(e,div,width,height) {
		var content_div = $j(div);
  		var zoom_width  = width;
		var zoom_height = height;

		var width       = window.innerWidth || (window.document.documentElement.clientWidth || window.document.body.clientWidth);
  		var height      = window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight);
  		var x           = window.pageXOffset || (window.document.documentElement.scrollLeft || window.document.body.scrollLeft);
  		var y           = window.pageYOffset || (window.document.documentElement.scrollTop || window.document.body.scrollTop);
  		var window_size = {'width':width, 'height':height, 'x':x, 'y':y}

		var width              = (zoom_width || content_div.width()) + 60;
		var height             = (zoom_height || content_div.height()) + 60;
		var d                  = window_size;

		// ensure that newTop is at least 0 so it doesn't hide close button
		var newTop             = Math.max((d.height/2) - (height/2) + y, 0);
		var newLeft            = (d.width/2) - (width/2);
		var curTop             = e.pageY;
		var curLeft            = e.pageX;	
   
    $j(div).animate({
      top     : newTop + 'px',
      left    : newLeft + 'px',
      opacity : "show",
      width   : width,
      height  : height
    }, 500, null, function() {})
    return false;
}

function getFlickrImages(){
	flickr_username = document.getElementById('flickr_username').value;
	if(flickr_username == ""){
		$$('label.flickr_error')[0].innerHTML = 'Please enter a flickr username';
		
	}else if(flickr_username!=undefined){
		$$('p.flickr_loading')[0].innerHTML = '<img src="/js/all/niko/niko_css/icons/slider_progress.gif"/>';
		$$('label.flickr_error')[0].innerHTML = '';
		url = '/dol/images/getFlickrImages';
		$j('.flickr_login').hide();
		$j('.flickr_loading').show();
		$j('.flickr_logo').hide();
		$j('.flickr_div').hide();
		if(cross_domain == "" || cross_domain == undefined){
	        new Ajax.Request(url, {
	        	method:     'POST',
	        	dataType: 'json',
	        	parameters : {'flickr_username':flickr_username},
	        	onSuccess: function(transport){
	        		response = transport.responseText.evalJSON();
	        		$j('.flickr_login').show();
	        		$j('.flickr_loading').hide();	
	        		$j('.flickr_div').show();	        		
	        		if (response.error) {
	        			$j('.flickr_logo').show();
	            		$$('label.flickr_error')[0].innerHTML = response.error;
	            		
	            	} else {
	        			$j('.flickr_div ul#colorSet').html(response['images']);
	            		$$('div.flickr_div')[0].style.display = 'block';
	            		$$('form.flickr_login')[0].style.display = 'none';
	            		$$('.flickr_hdr')[0].innerHTML = response['hdr'];
	            		$$('label.flickr_error')[0].innerHTML = '';	            		 		
	            		//$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
	            		/*$j('.flickr_div').tinyscrollbar({axis:'x'});
	            		var len = $j('.flickr_div .draggable img').length*100;
	            		if(len==0){
	            			len = $j('.flickr_div img').length*100;
	            		}
	            		$j('.flickr_photos').css('width',len);
	            		$j('.flickr_photos').css('top','13px');
	            		$j('.flickr_div').tinyscrollbar_update();*/
	            		$j(".flickr_div ul#colorSet img").load(function(){
							$j(".flickr_div").mCustomScrollbar("update");
							width = $j(".flickr_div .mCSB_container").width();
							$j(".flickr_div .mCSB_container").css("width",width+4);
						});
	            	}
	        	},
	  			onFailure:function(response){
	    			return '';
	      		}
	   		});
		}else{
			$j.ajax({url:"http://"+cross_domain+"/dol/images/getFlickrImages", 
				type:     'POST',	        	
	    		jsonpCallback: 'jsonCallback',
	    		contentType: "application/json",
	        	dataType: 'jsonp',
	        	crossDomain:true,
	        	data : {'flickr_username':flickr_username,'callback':'?'},
	        	success: function(transport){
	        		
	        		response = transport;
	        		$j('.flickr_login').show();
	        		if (response.error) {
	            		$$('label.flickr_error')[0].innerHTML = response.error;
	            		
	            	} else {
	        			$j('.flickr_div ul#colorSet').html(response.images);
	            		$$('div.flickr_div')[0].style.display = 'block';
	            		$$('form.flickr_login')[0].style.display = 'none';
	            		$$('.flickr_hdr')[0].innerHTML = response.hdr;
	            		$$('label.flickr_error')[0].innerHTML = '';
	            		  		
	            		//$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
	            		/*$j('.flickr_div').tinyscrollbar({axis:'x'});
	            		var len = $j('.flickr_div .draggable img').length*100;
	            		if(len==0){
	            			len = $j('.flickr_div img').length*100;
	            		}
	            		$j('.flickr_photos').css('width',len);
	            		$j('.flickr_photos').css('top','13px');
	            		$j('.flickr_div').tinyscrollbar_update();*/
	            		$j(".flickr_div ul#colorSet img").load(function(){
							$j(".flickr_div").mCustomScrollbar("update");
							width = $j(".flickr_div .mCSB_container").width();
							$j(".flickr_div .mCSB_container").css("width",width+4);
						});
	            	}
	        	},
	  			onFailure:function(response){
	    			return '';
	      		}
	   		});
		}
   	}
}

function getFlickrPhotosetImages(flickr_photoset_id){
	if(flickr_photoset_id!=undefined){
		$$('.flickr_loading')[0].innerHTML = '<img src="/js/all/niko/niko_css/icons/slider_progress.gif"/>'; 
		url = '/dol/images/getFlickrPhotosetImages';
		$j('.flickr_login').hide();
		$j('.flickr_div').hide();
		$j('.flickr_loading').show();
        if(cross_domain == "" || cross_domain == undefined){
        		new Ajax.Request(url, {
            	method:     'POST',
            	dataType: 'json',
            	parameters : {'flickr_photoset_id':flickr_photoset_id},
            	onSuccess: function(transport){
            		$j('.flickr_login').show();
            		$j('.flickr_div').show();
            		$j('.flickr_loading').hide();
            		response = transport.responseText.evalJSON();
            		if (response.error) {
                		$$('label.flickr_error')[0].innerHTML = response.error;
                		$$('div.flickr_div')[0].style.display = 'none';
                		$$('form.flickr_login')[0].style.display = 'block';
                		$$('.flickr_hdr')[0].innerHTML = 'Flickr Images';
                		
                	} else {
            			$j('.flickr_div ul#colorSet').html(response['images']);
                		$$('div.flickr_div')[0].style.display = 'block';
                		$$('form.flickr_login')[0].style.display = 'none';
                		$$('.flickr_hdr')[0].innerHTML = response['hdr'];
                		$$('label.flickr_error')[0].innerHTML = '';
                		//$j('.draggable img').draggable({appendTo: "body",helper:"clone",distance:"100",scroll:"true",scrollSensitivity:"50"});
                		/*$j('.flickr_div').tinyscrollbar({axis:'x'}) 
                		var len = $j('.flickr_div .draggable img').length*100;
                		console.log(len);
                		$j('.flickr_photos').css('width',len);
                		$j('.flickr_photos').css('top','13px');
                		$j('.flickr_div').tinyscrollbar_update();*/
                		$j(".flickr_div ul#colorSet img").load(function(){
    						$j(".flickr_div").mCustomScrollbar("update");
    						width = $j(".flickr_div .mCSB_container").width();
    						$j(".flickr_div .mCSB_container").css("width",width+4);
    					});
                  	}
            	},
      			onFailure:function(response){
        			return '';
          		}
       		});
        }else{
        	$j.ajax({url:"http://"+cross_domain+"/dol/images/getFlickrPhotosetImages",
            	type:     'POST',            	
            	jsonpCallback: 'jsonCallback',
            	contentType: "application/json",
            	dataType: 'jsonp',
            	data : {'flickr_photoset_id':flickr_photoset_id,'callback':'?'},
            	success: function(transport){
            		$j('.flickr_login').show();
            		$j('.flickr_div').show();
            		$j('.flickr_loading').hide();
            		response = transport;
            		if (response.error) {
                		$$('label.flickr_error')[0].innerHTML = response.error;
                		$$('div.flickr_div')[0].style.display = 'none';
                		$$('form.flickr_login')[0].style.display = 'block';
                		$$('.flickr_hdr')[0].innerHTML = 'Flickr Images';
                		
                	} else {
            			$j('.flickr_div ul#colorSet').html(response.images);
                		$$('div.flickr_div')[0].style.display = 'block';
                		$$('form.flickr_login')[0].style.display = 'none';
                		$$('.flickr_hdr')[0].innerHTML = response.hdr;
                		$$('label.flickr_error')[0].innerHTML = '';
                		//$j('.draggable img').draggable({appendTo: "body",helper:"clone",distance:"100",scroll:"true",scrollSensitivity:"50"});
                		/*$j('.flickr_div').tinyscrollbar({axis:'x'}) 
                		var len = $j('.flickr_div .draggable img').length*100;
                		console.log(len);
                		$j('.flickr_photos').css('width',len);
                		$j('.flickr_photos').css('top','13px');
                		$j('.flickr_div').tinyscrollbar_update();*/
                		$j(".flickr_div ul#colorSet img").load(function(){
    						$j(".flickr_div").mCustomScrollbar("update");
    						width = $j(".flickr_div .mCSB_container").width();
    						$j(".flickr_div .mCSB_container").css("width",width+4);
    					});
                  	}
            	},
      			onFailure:function(response){
        			return '';
          		}
       		});
        }
   	}
}
function changeFlickrUsername(){
	$$('div.flickr_div')[0].style.display = 'none';
	$$('form.flickr_login')[0].style.display = 'block';
	$$('.flickr_hdr')[0].innerHTML = 'Flickr Images';
	$$('label.flickr_error')[0].innerHTML = '';
	$j('.flickr_logo').show();
	
}
function getPicasaImages(){
	picasa_username = document.getElementById('picasa_username').value;
	if(picasa_username == ""){
		$$('label.picasa_error')[0].innerHTML = "Please enter a picasa username";
		//$$('p.picasa_loading')[0].innerHTML = '<br/>';
	}else if(picasa_username!=undefined){
		
		$$('p.picasa_loading')[0].innerHTML = '<img src="/js/all/niko/niko_css/icons/slider_progress.gif"/>';
		$$('label.picasa_error')[0].innerHTML = '';
		$j('.picasa_login').hide();
		$j('.picasa_loading').show();
		$j('.picasa_div').hide();
		$j('.picasa_logo').hide();
		url = '/dol/images/getPicasaImages';	
		if(cross_domain == "" || cross_domain == undefined){
			new Ajax.Request(url, {
	        	method:     'POST',
	        	dataType: 'json',
	        	parameters : {'picasa_username':picasa_username},
	        	onSuccess: function(transport){
	        		response = transport.responseText.evalJSON();
	        		$j('.picasa_login').show();
	        		$j('.picasa_loading').hide();
	        		$j('.picasa_div').show();
	        		if (response.error) {
	        			$j('.picasa_login').show();
	        			$j('.picasa_logo').show();
	            		$$('label.picasa_error')[0].innerHTML = response.error;
	            		
	            	} else {	            		
	            		$$('label.picasa_error')[0].innerHTML = '';
	        			$$('.picasa_div ul#colorSet')[0].innerHTML = response['images'];
	            		$$('div.picasa_div')[0].style.display = 'block';
	            		$$('form.picasa_login')[0].style.display = 'none';
	            		$$('.picasa_hdr')[0].innerHTML = response['hdr'];
	            		
	            		//$j('.picasa_div').tinyscrollbar({axis:'x'});
	            		/*var len = $j('.picasa_div .draggable img').length*100;
	            		if(len==0){
	            			len = $j('.picasa_div img').length*100;
	            		}
	            		console.log(len);
	            		$j('.picasa_photos').css('width',len);
	            		$j('.picasa_photos').css('top','13px');*/
	            		//$j('.picasa_div').tinyscrollbar_update()
	            		$j(".picasa_div ul#colorSet img").load(function(){
							$j(".picasa_div").mCustomScrollbar("update");
							width = $j(".picasa_div .mCSB_container").width();
							$j(".picasa_div .mCSB_container").css("width",width+4);
						});
	            	}
	        	},
	  			onFailure:function(response){
	    			return '';
	      		}
	   		});
		}else{			
			$j.ajax({url:"http://"+cross_domain+"/dol/images/getPicasaImages", 
	        	type:     'POST',	        	
	        	jsonpCallback: 'jsonCallback',
	        	contentType: "application/json",
	        	dataType: 'jsonp',
	        	data : {'picasa_username':picasa_username,"callback":"?"},
	        	success: function(transport){
	        		$j('.picasa_login').show();
	        		$j('.picasa_loading').hide();
	        		$j('.picasa_div').show();
	        		response = transport;
	        		if (response.error) {
	        			$j('.picasa_logo').show();
	        			$j('.picasa_login').show();
	        			$j('.picasa_loading').hide();
	        			$j('.picasa_div').show();
	            		$$('label.picasa_error')[0].innerHTML = response.error;
	            		
	            	} else {
	            		$$('label.picasa_error')[0].innerHTML = '';
	        			$$('.picasa_div ul#colorSet')[0].innerHTML = response.images;
	            		$$('div.picasa_div')[0].style.display = 'block';
	            		$$('form.picasa_login')[0].style.display = 'none';
	            		$$('.picasa_hdr')[0].innerHTML = response.hdr;
	            		
	            		//$j('.picasa_div').tinyscrollbar({axis:'x'});
	            		/*var len = $j('.picasa_div .draggable img').length*100;
	            		if(len==0){
	            			len = $j('.picasa_div img').length*100;
	            		}
	            		console.log(len);
	            		$j('.picasa_photos').css('width',len);
	            		$j('.picasa_photos').css('top','13px');*/
	            		//$j('.picasa_div').tinyscrollbar_update()
	            		$j(".picasa_div ul#colorSet img").load(function(){
							$j(".picasa_div").mCustomScrollbar("update");
							width = $j(".picasa_div .mCSB_container").width();
							$j(".picasa_div .mCSB_container").css("width",width+4);
						});
	            	}
	        	},
	  			onFailure:function(response){
	    			return '';
	      		}
	   		});
		}
        
   	}
}
function getPicasaAlbumImages(picasa_album_id){
	$$('.picasa_loading')[0].innerHTML = '<img src="/js/all/niko/niko_css/icons/slider_progress.gif"/>'; 
	picasa_username = document.getElementById('picasa_username').value;
	if(picasa_album_id!=undefined){
		url = '/dol/images/getPicasaAlbumImages';
		$j('.picasa_login').hide();
		$j('.picasa_loading').show();
		$j('.picasa_div').hide();
		if(cross_domain == "" || cross_domain == undefined){
			new Ajax.Request(url, {
	        	method:     'POST',
	        	dataType: 'json',
	        	parameters : {'picasa_album_id':picasa_album_id,'picasa_username':picasa_username},
	        	onSuccess: function(transport){
	        		$j('.picasa_login').show();
	        		$j('.picasa_loading').hide();
	        		$j('.picasa_div').hide();
	        		response = transport.responseText.evalJSON();
	        		if (response.error) {
	        			$j('.picasa_login').show();
	        			$j('.picasa_loading').hide();	
	            		$$('label.picasa_error')[0].style.display = 'block';
	            		$$('label.picasa_error')[0].innerHTML = response.error;
	            		$$('div.picasa_div')[0].style.display = 'none';
	            		$$('form.picasa_login')[0].style.display = 'block';
	            		$$('.picasa_hdr')[0].innerHTML = 'Picasa Images';
	            	} else {
	            		$j('.picasa_div').show();
	            		$$('label.picasa_error')[0].innerHTML = '';
	        			$$('.picasa_div ul#colorSet')[0].innerHTML = response['images'];
	            		$$('div.picasa_div')[0].style.display = 'block';
	            		$$('form.picasa_login')[0].style.display = 'none';
	            		$$('.picasa_hdr')[0].innerHTML = response['hdr'];
	            		//$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
	            		/*$j('.picasa_div').tinyscrollbar({axis:'x'});
	            		var len = $j('.picasa_div .draggable img').length*100;
	            		console.log(len);
	            		$j('.picasa_photos').css('width',len);
	            		$j('.picasa_photos').css('top','13px');
	            		$j('.picasa_div').tinyscrollbar_update()*/
	            		$j(".picasa_div ul#colorSet img").load(function(){
							$j(".picasa_div").mCustomScrollbar("update");
							width = $j(".picasa_div .mCSB_container").width();
							$j(".picasa_div .mCSB_container").css("width",width+4);
						});
	            	}
	        	},
	  			onFailure:function(response){
	    			return '';
	      		}
	   		});
		}else{
			$j.ajax({url:"http://"+cross_domain+"/dol/images/getPicasaAlbumImages", 
	        	type:     'POST',	        	
	        	jsonpCallback: 'jsonCallback',
	        	contentType: "application/json",
	        	dataType: 'jsonp',
	        	data : {'picasa_album_id':picasa_album_id,'picasa_username':picasa_username,"callback":"?"},
	        	success: function(transport){
	        		$j('.picasa_login').show();
	        		$j('.picasa_loading').hide();
	        		$j('.picasa_div').show();
	        		response = transport;
	        		if (response.error) {
	        			$j('.picasa_login').show();
	        			$j('.picasa_loading').hide();	
	            		$$('label.picasa_error')[0].style.display = 'block';
	            		$$('label.picasa_error')[0].innerHTML = response.error;
	            		$$('div.picasa_div')[0].style.display = 'none';
	            		$$('form.picasa_login')[0].style.display = 'block';
	            		$$('.picasa_hdr')[0].innerHTML = 'Picasa Images';
	            	} else {
	            		$j('.picasa_div').show();
	            		$$('label.picasa_error')[0].innerHTML = '';
	        			$$('.picasa_div ul#colorSet')[0].innerHTML = response.images;
	            		$$('div.picasa_div')[0].style.display = 'block';
	            		$$('form.picasa_login')[0].style.display = 'none';
	            		$$('.picasa_hdr')[0].innerHTML = response.hdr;
	            		//$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
	            		/*$j('.picasa_div').tinyscrollbar({axis:'x'});
	            		var len = $j('.picasa_div .draggable img').length*100;
	            		console.log(len);
	            		$j('.picasa_photos').css('width',len);
	            		$j('.picasa_photos').css('top','13px');
	            		$j('.picasa_div').tinyscrollbar_update()*/
	            		$j(".picasa_div ul#colorSet img").load(function(){
							$j(".picasa_div").mCustomScrollbar("update");
							width = $j(".picasa_div .mCSB_container").width();
							$j(".picasa_div .mCSB_container").css("width",width+4);
						});
	            	}
	        	},
	  			onFailure:function(response){
	    			return '';
	      		}
	   		});
		}
   	}
}
function changePicasaUsername(){
	$$('div.picasa_div')[0].style.display = 'none';
	$$('form.picasa_login')[0].style.display = 'block';
	$$('.picasa_hdr')[0].innerHTML = 'Picasa Images';
	$$('label.picasa_error')[0].innerHTML = '';
	$j('.picasa_logo').show();
	
}
function loginInstagram(){
	if(cross_domain == "" || cross_domain == undefined){
		window.open('/dol/auth/instagram','','width=600,height=350');
	}else{
		window.open('http://'+cross_domain+'/dol/auth/instagram','','width=600,height=350');
	}
}

$j(document).on("click", ".instagram_hdr a", function(){
	instagramLogout();
});
function getInstagramImages(){
	$$('p.instagram_loading')[0].innerHTML = '<img src="/js/all/niko/niko_css/icons/slider_progress.gif"/>';
	$$('label.instagram_error')[0].innerHTML = '';
	url = '/dol/images/getInstagramImages';
	$j('.instagram_loading').show();
	$j('.instagram_login').hide();
	$j('.instagram_logo').hide();
	if(cross_domain == "" || cross_domain == undefined){
		new Ajax.Request(url, {
	    	method:     'POST',
	    	dataType: 'json',
	    	parameters : {},
	    	onSuccess: function(transport){
	    		response = transport.responseText.evalJSON();
	    		$j('.instagram_loading').hide();
	    		$j('.instagram_login').show();
	    		if (response.error) {
	    			$j('.instagram_logo').show();
	        		$$('label.instagram_error')[0].style.display = 'block';
	        		$$('label.instagram_error')[0].innerHTML = response.error;
	        		
	        	} else {
	        		$$('label.instagram_error')[0].innerHTML = '';
	    			$$('div.instagram_div ul#colorSet')[0].innerHTML = response['images'];
	        		$$('div.instagram_div')[0].style.display = 'block';
	        		$$('form.instagram_login')[0].style.display = 'none';
	        		$$('.instagram_hdr')[0].innerHTML = response['hdr'];	        		
	        		//$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
	        		/*$j('.instagram_div').tinyscrollbar({axis:'x'});        		
	            	var len = $j('.instagram_div .draggable img').length*100;
	            		console.log(len);
	            		$j('.instagram_photos').css('width',len);
	            		$j('.instagram_photos').css('top','13px');
	        		$j('.instagram_div').tinyscrollbar_update();*/
	        		$j(".instagram_div ul#colorSet img").load(function(){
						$j(".instagram_div").mCustomScrollbar("update");
						width = $j(".instagram_div .mCSB_container").width();
						$j(".instagram_div .mCSB_container").css("width",width+4);
					});
	        	}
	    	},
			onFailure:function(response){
				return '';
	  		}
			});
	}else{
		$j.ajax({url:"http://"+cross_domain+"/dol/images/getInstagramImages?callback=?", 
	    	method:     'POST',
	    	async: false,
	    	jsonpCallback: 'jsonCallback',
	    	contentType: "application/json",
	    	dataType: 'jsonp',
	    	parameters : {},
	    	onSuccess: function(transport){
	    		response = transport.responseText.evalJSON();
	    		$j('.instagram_loading').hide();
	    		$j('.instagram_login').show();
	    		if (response.error) {
	    			$j('.instagram_logo').show();
	        		$$('label.instagram_error')[0].style.display = 'block';
	        		$$('label.instagram_error')[0].innerHTML = response.error;
	        		
	        	} else {
	        		$$('label.instagram_error')[0].innerHTML = '';
	    			$$('div.instagram_div ul#colorSet')[0].innerHTML = response['images'];
	        		$$('div.instagram_div')[0].style.display = 'block';
	        		$$('form.instagram_login')[0].style.display = 'none';
	        		$$('.instagram_hdr')[0].innerHTML = response['hdr'];
	        		
	        		//$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
	        		/*$j('.instagram_div').tinyscrollbar({axis:'x'});        		
	            	var len = $j('.instagram_div .draggable img').length*100;
	            		console.log(len);
	            		$j('.instagram_photos').css('width',len);
	            		$j('.instagram_photos').css('top','13px');
	        		$j('.instagram_div').tinyscrollbar_update();*/
	        		$j(".instagram_div ul#colorSet img").load(function(){
						$j(".instagram_div").mCustomScrollbar("update");
						width = $j(".instagram_div .mCSB_container").width();
						$j(".instagram_div .mCSB_container").css("width",width+4);
					});
	        	}
	    	},
			onFailure:function(response){
				return '';
	  		}
			});
	}
}
function instagramLogout(){
	var popup = window.open('https://instagram.com/accounts/logout/','','width=600,height=350');
	$$('div.instagram_div')[0].style.display = 'none';
	$$('form.instagram_login')[0].style.display = 'block';
	$$('.instagram_hdr span')[0].style.display = 'none';
	setTimeout(function(){popup.close()},3000);
	$j('.instagram_logo').show();
}
var fb_albums = '';
var fb_albums_hdr = '';
function getFacebookAlbums(){
	if(fb_albums==''){
		$$('p.fb_loading')[0].innerHTML = '<img src="/js/all/niko/niko_css/icons/slider_progress.gif"/>'; 
		$$('label.facebook_error')[0].innerHTML = '';
		url = '/facebook/customer/albums';
		$j('.fb_loading').show();
		$j('.facebook_login').hide();
		$j('.facebook_logo').hide();
		if(cross_domain == "" || cross_domain == undefined){
			new Ajax.Request(url, {
		    	method:     'POST',
		    	dataType: 'json',
		    	parameters : {},
		    	onSuccess: function(transport){
		    		response = transport.responseText.evalJSON();
		    		$j('.fb_loading').hide();
		    		$j('.facebook_login').show();
		    		if (response.error) {
		    			$j('.facebook_logo').show();
		        		$$('label.facebook_error')[0].style.display = 'block';
		        		$$('label.facebook_error')[0].innerHTML = response.error;		        		
	            		$$('div.facebook_div')[0].style.display = 'none';
	            		$$('form.facebook_login')[0].style.display = 'block';
	            		$$('.facebook_hdr')[0].innerHTML = 'Facebook Images';
		        	} else {
		        		$$('label.facebook_error')[0].innerHTML = '';
		    			$$('div.facebook_div ul#colorSet')[0].innerHTML = response['images'];
		        		$$('div.facebook_div')[0].style.display = 'block';
		        		$$('form.facebook_login')[0].style.display = 'none';
		        		$$('.facebook_hdr')[0].innerHTML = response['hdr'];		        		
		        		window.fb_albums = response['images'];
		        		window.fb_albums_hdr = response['hdr'];
		        		/*$j('.facebook_div').tinyscrollbar({axis:'x'});	
		        		var len = $j('.facebook_div .draggable img').length*150;
		        		if(len==0){
	            			len = $j('.facebook_div img').length*150;
	            		}            		
	            		$j('.facebook_photos').css('width',len);
	            		$j('.facebook_photos').css('top','13px');
	            		$j('.facebook_div').tinyscrollbar_update();*/
		        		$j(".facebook_div ul#colorSet img").load(function(){
							$j(".facebook_div").mCustomScrollbar("update");
							width = $j(".facebook_div .mCSB_container").width();
							$j(".facebook_div .mCSB_container").css("width",width+4);
						});
		        	}
		    	},
				onFailure:function(response){
					return '';
		  		}
				});
		}else{
			$j.ajax({url:"http://"+cross_domain+"/facebook/customer/albums?callback=?", 
		    	type:     'POST',
		    	
		    	jsonpCallback: 'jsonCallback',
		    	contentType: "application/json",
		    	dataType: 'jsonp',
		    	data : {},
		    	success: function(transport){
		    		response = transport;
		    		$j('.fb_loading').hide();
		    		$j('.facebook_login').show();
		    		if (response.error) {
		    			$j('.facebook_logo').show();
		        		$$('label.facebook_error')[0].style.display = 'block';
		        		$$('label.facebook_error')[0].innerHTML = response.error;
		        		
	            		$$('div.facebook_div')[0].style.display = 'none';
	            		$$('form.facebook_login')[0].style.display = 'block';
	            		$$('.facebook_hdr')[0].innerHTML = 'Facebook Images';
		        	} else {
		        		$$('label.facebook_error')[0].innerHTML = '';
		    			$$('div.facebook_div ul#colorSet')[0].innerHTML = response.images;
		        		$$('div.facebook_div')[0].style.display = 'block';
		        		$$('form.facebook_login')[0].style.display = 'none';
		        		$$('.facebook_hdr')[0].innerHTML = response.hdr;		        		
		        		window.fb_albums = response['images'];
		        		window.fb_albums_hdr = response['hdr'];
		        		/*$j('.facebook_div').tinyscrollbar({axis:'x'});	
		        		var len = $j('.facebook_div .draggable img').length*150;
		        		if(len==0){
	            			len = $j('.facebook_div img').length*150;
	            		}            		
	            		$j('.facebook_photos').css('width',len);
	            		$j('.facebook_photos').css('top','13px');
	            		$j('.facebook_div').tinyscrollbar_update();*/
		        		$j(".facebook_div ul#colorSet img").load(function(){
							$j(".facebook_div").mCustomScrollbar("update");
							width = $j(".facebook_div .mCSB_container").width();
							$j(".facebook_div .mCSB_container").css("width",width+4);
						});
		        	}
		    	},
				onFailure:function(response){
					return '';
		  		}
				});
		}
	}else{
		$$('label.facebook_error')[0].innerHTML = '';
		$$('div.facebook_div ul#colorSet')[0].innerHTML = window.fb_albums;
		$$('div.facebook_div')[0].style.display = 'block';
		$$('form.facebook_login')[0].style.display = 'none';
		$$('.facebook_hdr')[0].innerHTML = window.fb_albums_hdr;		
		/*$j('.facebook_div').tinyscrollbar({axis:'x'});	
		var len = $j('.facebook_div .draggable img').length*150;
		if(len==0){
			len = $j('.facebook_div img').length*150;
		}            		
		$j('.facebook_photos').css('width',len);
		$j('.facebook_photos').css('top','13px');
		$j('.facebook_div').tinyscrollbar_update();*/
		$j(".facebook_div ul#colorSet img").load(function(){
			$j(".facebook_div").mCustomScrollbar("update");
			width = $j(".facebook_div .mCSB_container").width();
			$j(".facebook_div .mCSB_container").css("width",width+4);
		});
	}
}
function getFacebookAlbumImages(facebook_album_id, facebook_album_name){	
	$$('label.facebook_error')[0].innerHTML = '';
	if(facebook_album_id!=undefined){
		url = '/facebook/customer/albumImages';
		$j('.fb_loading').show();
		$j('.facebook_div').hide();
		$j('.facebook_login').hide();
		if(cross_domain == "" || cross_domain == undefined){
			new Ajax.Request(url, {
	        	method:     'POST',
	        	dataType: 'json',
	        	parameters : {'facebook_album_id':facebook_album_id,'facebook_album_name':facebook_album_name},
	        	onSuccess: function(transport){
	        		response = transport.responseText.evalJSON();
	        		$j('.fb_loading').hide();
	        		$j('.facebook_div').show();
	        		$j('.facebook_login').show();
	        		if (response.error) {
	            		$$('label.facebook_error')[0].style.display = 'block';
	            		$$('label.facebook_error')[0].innerHTML = response.error;
	            		
	            		$$('div.facebook_div')[0].style.display = 'none';
	            		$$('form.facebook_login')[0].style.display = 'block';
	            		$$('.facebook_hdr')[0].innerHTML = 'Facebook Images';
	            	} else {
	            		$$('label.facebook_error')[0].innerHTML = '';
	        			$$('div.facebook_div ul#colorSet')[0].innerHTML = response['images'];
	            		$$('div.facebook_div')[0].style.display = 'block';
	            		$$('form.facebook_login')[0].style.display = 'none';
	            		$$('.facebook_hdr')[0].innerHTML = response['hdr'];
	            		
	            		//$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
	            		/*$j('.facebook_div').tinyscrollbar({axis:'x'});	
	            		var len = $j('.facebook_div .draggable img').length*150;
	            		console.log(len);
	            		$j('.facebook_photos').css('width',len);
	            		$j('.facebook_photos').css('top','13px');
	            		$j('.facebook_div').tinyscrollbar_update();*/
	            		$j(".facebook_div ul#colorSet img").load(function(){
	            			$j(".facebook_div").mCustomScrollbar("update");
	            			width = $j(".facebook_div .mCSB_container").width();
							$j(".facebook_div .mCSB_container").css("width",width+4);
	            		});
	            	}
	        	},
	  		onFailure:function(response){
	    			return '';
	      		}
	   		});
		}else{
			$j.ajax({url:"http://"+cross_domain+"/facebook/customer/albumImages", 
	        	type:     'POST',
	        	async: false,
	        	jsonpCallback: 'jsonCallback',
	        	contentType: "application/json",
	        	dataType: 'jsonp',
	        	data : {'facebook_album_id':facebook_album_id,'facebook_album_name':facebook_album_name,"callback":"?"},
	        	success: function(transport){
	        		$j('.fb_loading').hide();
	        		$j('.facebook_div').show();
	        		$j('.facebook_login').show();
	        		response = transport.responseText.evalJSON();
	        		if (response.error) {
	            		$$('label.facebook_error')[0].style.display = 'block';
	            		$$('label.facebook_error')[0].innerHTML = response.error;
	            		$$('p.fb_loading')[0].innerHTML = '<br/>';
	            		$$('div.facebook_div')[0].style.display = 'none';
	            		$$('form.facebook_login')[0].style.display = 'block';
	            		$$('.facebook_hdr')[0].innerHTML = 'Facebook Images';
	            	} else {
	            		$$('label.facebook_error')[0].innerHTML = '';
	        			$$('div.facebook_div ul#colorSet')[0].innerHTML = response.images;
	            		$$('div.facebook_div')[0].style.display = 'block';
	            		$$('form.facebook_login')[0].style.display = 'none';
	            		$$('.facebook_hdr')[0].innerHTML = response.hdr;
	            		$$('p.fb_loading')[0].innerHTML = '<br/>';
	            		//$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
	            		/*$j('.facebook_div').tinyscrollbar({axis:'x'});	
	            		var len = $j('.facebook_div .draggable img').length*150;
	            		console.log(len);
	            		$j('.facebook_photos').css('width',len);
	            		$j('.facebook_photos').css('top','13px');
	            		$j('.facebook_div').tinyscrollbar_update();*/
	            		$j(".facebook_div ul#colorSet img").load(function(){
	            			$j(".facebook_div").mCustomScrollbar("update");
	            			width = $j(".facebook_div .mCSB_container").width();
							$j(".facebook_div .mCSB_container").css("width",width+4);
	            		});
	            	}
	        	},
	  		onFailure:function(response){
	    			return '';
	      		}
	   		});
		}
   	}
}
function loginAndGetMyImages(){	
	px_username = document.getElementById('px_username').value;
	px_password = document.getElementById('px_password').value;
	$$('p.myimages_loading')[0].innerHTML = '<img src="/js/all/niko/niko_css/icons/slider_progress.gif"/>';
	$$('label.myimages_error')[0].innerHTML = '';
	url = '/dol/ajax/loginPost';
	$j('.myimages_loading').show()
	$j('.myimages_login').hide()
	if(cross_domain == "" || cross_domain == undefined){
		new Ajax.Request(url, {
	    	method:     'POST',
	    	dataType: 'json',
	    	parameters : {'username':px_username, 'password':px_password},
	    	onSuccess: function(transport){
	    		$j('.myimages_loading').hide()
	    		$j('.myimages_login').show()
	    		response = transport.responseText.evalJSON();
	    		if (response.error) {
	        		$$('label.myimages_error')[0].style.display = 'block';
	        		$$('label.myimages_error')[0].innerHTML = response.error;
	        		
	        	} else {
	        		getMyImages();
	        	}
	    	},
			onFailure:function(response){
				return '';
	  		}
		});
	}else{
		$j.ajax({url:"http://"+cross_domain+"/dol/ajax/loginPost", 
	    	type:     'POST',
	    	async: false,
	    	jsonpCallback: 'jsonCallback',
	    	contentType: "application/json",
	    	dataType: 'jsonp',
	    	data : {'username':px_username, 'password':px_password,"callback":"?"},
	    	success: function(transport){
	    		$j('.myimages_loading').show()
	    		$j('.myimages_login').hide()
	    		response = transport;
	    		if (response.error) {
	        		$$('label.myimages_error')[0].style.display = 'block';
	        		$$('label.myimages_error')[0].innerHTML = response.error;
	        		
	        	} else {
	        		getMyImages();
	        	}
	    	},
			onFailure:function(response){
				return '';
	  		}
		});
	}
    
}
function isMobile(){
	var agents = ['android', 'webos', 'iPhone', 'iPad', 'blackberry'];				  
    for(i in agents) {		    	
        if(navigator.userAgent.indexOf(agents[i])>-1) {
            input.removeAttribute("multiple");
        	input1.removeAttribute("multiple");
        	$j('#uploaded').hide();
        	$j('#uploaded1').hide();
        	return true;
        	
        }else{
        }
        
    }
    /*$j('#uploaded').hide();
	$j('#uploaded1').hide();
    return true;*/
    return false;
}
function getMyImages(){
	
	if($j('.myimages_loginform').length==0){
		return;
	}
	
	$$('p.myimages_loading')[0].innerHTML = '<img src="/js/all/niko/niko_css/icons/slider_progress.gif"/>';
	$$('label.myimages_error')[0].innerHTML = '';
	url = '/dol/ajax/getMyImages';
	$j('.myimages_loading').show()
	$j('.myimages_login').hide()
	if(cross_domain == "" || cross_domain == undefined){
		 new Ajax.Request(url, {
		    	method:     'POST',
		    	dataType: 'json',
		    	parameters : {},
		    	onSuccess: function(transport){
		    		response = transport.responseText.evalJSON();
		    		$j('.myimages_loading').hide()
		    		$j('.myimages_login').show()
		    		if (response.error) {
		        		$$('label.myimages_error')[0].style.display = 'block';
		        		$$('label.myimages_error')[0].innerHTML = response.error;
		        		
		        	} else {
		        		$$('label.myimages_error')[0].innerHTML = '';
		    			$$('div.myimages_div ul#colorSet')[0].innerHTML = response['images'];
		        		$$('div.myimages_div')[0].style.display = 'block';
		        		$$('form.myimages_login')[0].style.display = 'none';
		        		$$('.myimages_hdr')[0].innerHTML = response['hdr'];		        		
		        		//$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
						$j('.upicon').show();
		        		//$j('.myimages_div').tinyscrollbar({axis:'x'});
		        		var len = $j('.myimages_div .draggable img').length*140;
		            		
		            		//$j('.myimages_photos').css('width',len);
		            		//$j('.myimages_photos').css('top','13px');
		            		$j(".myimages_div ul#colorSet img").load(function(){
								$j(".myimages_div").mCustomScrollbar("update");
								width = $j(".myimages_div .mCSB_container").width();
								$j(".myimages_div .mCSB_container").css("width",width+6);
							});
		            		//$j(".myimages_div").mCustomScrollbar("update");
		        		
		        		isMobile();
			    			
			    		if(cross_domain == "" || cross_domain == undefined){
			    			new Ajax.Request('/dol/ajax/links', {
			        	    	method:     'GET',
			        	    	dataType: 'html',
			        	    	parameters : {},
			        	    	onSuccess: function(transport){
			        	    		
			        	    		if(transport.responseText!='undefined' && transport.responseText!='error'){
			        	        		$$('div.b-right')[0].innerHTML = transport.responseText;
			        	        	}
			        	    		input = document.getElementById("uploaded");
			        	    		
			        	    		var ua = navigator.userAgent.toLowerCase(); 
			        	    		 var Sfwindows = false;
			        	    		 if (ua.indexOf('safari')!=-1){ 
			        	    		   if(ua.indexOf('chrome')  > -1){
			        	    			Sfwindows = false;
			        	    		   }else{
			        	    		   	if(ua.indexOf("windows") !== -1){
			        	    				Sfwindows = true;
			        	    		   	}else{
			        	    		   		Sfwindows = false;
			        	    		   	}
			        	    		   }
			        	    		  }
			        	    		 if(!Sfwindows){
			        	    	        input.setAttribute("multiple", "true");
			        	    	       
			        	    	    }else{
			        	    	    	input.removeAttribute("multiple");
			        	    	       
			        	    	    }
			        	    		
			        	    	},
			        			onFailure:function(response){
			        				return '';
			        	  		}
			        		});
			    		}else{
			    			new Ajax.Request("http://"+cross_domain+"/dol/ajax/links?callback=?", {
			        	    	method:     'GET',
			        	    	async: false,
			        	    	jsonpCallback: 'jsonCallback',
			                	contentType: "application/json",
			                	dataType: 'jsonp',
			        	    	parameters : {},
			        	    	onSuccess: function(transport){
			        	    		if(transport.responseText!='undefined' && transport.responseText!='error'){
			        	        		$$('div.b-right')[0].innerHTML = transport.responseText;
			        	        	}
			        	    		input = document.getElementById("uploaded");
			        	    		
			        	    		var ua = navigator.userAgent.toLowerCase(); 
			        	    		 var Sfwindows = false;
			        	    		 if (ua.indexOf('safari')!=-1){ 
			        	    		   if(ua.indexOf('chrome')  > -1){
			        	    			Sfwindows = false;
			        	    		   }else{
			        	    		   	if(ua.indexOf("windows") !== -1){
			        	    				Sfwindows = true;
			        	    		   	}else{
			        	    		   		Sfwindows = false;
			        	    		   	}
			        	    		   }
			        	    		  }
			        	    		 if(!Sfwindows){
			        	    	        input.setAttribute("multiple", "true");
			        	    	       
			        	    	    }else{
			        	    	    	input.removeAttribute("multiple");
			        	    	       
			        	    	    }
			        	    		
			        	    	},
			        			onFailure:function(response){
			        				return '';
			        	  		}
			        		});
			    		}
		        	}
		    	},
				onFailure:function(response){
					return '';
		  		}
			});
	}else{
		$j.ajax({url:"http://"+cross_domain+"/dol/ajax/getMyImages?callback=?",
		    	type:     'POST',		    	
		    	jsonpCallback: 'jsonCallback',
		    	contentType: "application/json",
		    	dataType: 'jsonp',		    	
		    	success: function(transport){
		    		response = transport;
		    		$j('.myimages_loading').hide()
		    		$j('.myimages_login').show()
		    		if (response.error) {
		        		$$('label.myimages_error')[0].style.display = 'block';
		        		$$('label.myimages_error')[0].innerHTML = response.error;
		        		
		        	} else {
		        		$$('label.myimages_error')[0].innerHTML = '';
		    			$$('div.myimages_div ul#colorSet')[0].innerHTML = response.images;
		        		$$('div.myimages_div')[0].style.display = 'block';
		        		$$('form.myimages_login')[0].style.display = 'none';
		        		$$('.myimages_hdr')[0].innerHTML = response.hdr;
		        		
		        		//$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
		        		$j('.upicon').show();
		        		//$j('.myimages_div').tinyscrollbar({axis:'x'});
		        		var len = $j('.myimages_div .draggable img').length*140;
		            		
		            		//$j('.myimages_photos').css('width',len);
		            		//$j('.myimages_photos').css('top','13px');
		            		$j(".myimages_div ul#colorSet img").load(function(){
								$j(".myimages_div").mCustomScrollbar("update");
								width = $j(".myimages_div .mCSB_container").width();
								$j(".myimages_div .mCSB_container").css("width",width+6);
							});
		            		//$j(".myimages_div").mCustomScrollbar("update");
		        		
		        		 isMobile()
			    		
		        		 
				    			$j.ajax({url:"http://"+cross_domain+"/dol/ajax/links?callback=?",
				        	    	method:     'GET',
				        	    	async: false,
				        	    	jsonpCallback: 'jsonCallback',
				                	contentType: "application/json",
				                	dataType: 'jsonp',
				        	    	parameters : {},
				        	    	onSuccess: function(transport){
				        	    		if(transport!='undefined' && transport!='error'){
				        	        		$$('div.b-right')[0].innerHTML = transport;
				        	        	}
				        	    		input = document.getElementById("uploaded");
				        	    		
				        	    		var ua = navigator.userAgent.toLowerCase(); 
				        	    		 var Sfwindows = false;
				        	    		 if (ua.indexOf('safari')!=-1){ 
				        	    		   if(ua.indexOf('chrome')  > -1){
				        	    			Sfwindows = false;
				        	    		   }else{
				        	    		   	if(ua.indexOf("windows") !== -1){
				        	    				Sfwindows = true;
				        	    		   	}else{
				        	    		   		Sfwindows = false;
				        	    		   	}
				        	    		   }
				        	    		  }
				        	    		 if(!Sfwindows){
				        	    	        input.setAttribute("multiple", "true");
				        	    	       
				        	    	    }else{
				        	    	    	input.removeAttribute("multiple");
				        	    	       
				        	    	    }
				        	    		
				        	    	},
				        			onFailure:function(response){
				        				return '';
				        	  		}
				        		});
				    		
		        	}
		    	},
				onFailure:function(response){
					return '';
		  		}
			});
	}
   
}
function sized(bytes){   // simple function to show a friendly size
    var i = 0;
    while(1023 < bytes){
        bytes /= 1024;
        ++i;
    };
    return  i ? bytes.toFixed(2) + ["", " KB", " MB", " GB", " TB"][i] : bytes + " bytes";
};

$j(document).on("click", ".vclose", function(){
	if($j('#svg_editor').length>0){
		$j( "#vtab" ).animate({							
			height: 0
			}, {
			duration: 500,
			complete: function() {
				$j( "#vtab" ).hide();
			        }
		});
	
		$j('#tool_image').attr('rel','false')
	}else{		
		$j('#vtab').slideUp('slow');
	}
});



uploads = function(){
	
	input = document.getElementById("uploaded");
	document.getElementById("img_progress");
	document.getElementById("progress");
	document.getElementById("total_txt");
	document.getElementById("img_title");
	 var ua = navigator.userAgent.toLowerCase();
	 var isWebkit = false;
	 if (ua.indexOf('safari')!=-1){ 
	   if(ua.indexOf('chrome')  > -1){
		isWebkit = false;
	   }else{
		isWebkit = true;
	   }
	  }
	 for(i=0;i<input.files.length;i++){
     	if(!input.files[i].name.toLowerCase().match(/(svg|gif|jpg|jpeg|pdf|eps|png|tiff|tif)$/)){
     		alert("Unsupported file format. Please upload a valid JPEG, PNG, PDF, EPS, GIF, TIFF or SVG file.")
     		return;
     	}                	
     }
	 if(input.value!=""){
		 $j('#fileupload_box').dialog('open');
	}
   // disable the input
   //input.setAttribute("disabled", "true");
   
   sendMultipleFiles({
   
       // list of files to upload
       files:input.files,
      
       // clear the container 
       onloadstart:function(){
            div.innerHTML = "Init upload ... ";
            //file_bar.style.width = "0px";
            $j("#img_progress" ).progressbar( "option", "value", 0 );
            //total_bar.style.width = "0px";
            $j("#progress" ).progressbar( "option", "value", 0 );
             img_name.innerHTML =  "";
       },
       
       // do something during upload ...
       onprogress:function(rpe){
		   if(this.file.fileName!=undefined){
	       	img_name.innerHTML = this.file.fileName;
	       }else{
	       	img_name.innerHTML = this.file.name;
	       }
       	
       	
       	div.innerHTML = "Total Sent: " + sized(this.sent + rpe.loaded) + " of " + sized(this.total)
         //file_bar.style.width = ((rpe.loaded * 300 / rpe.total) >> 0) + "px";
           $j("#img_progress" ).progressbar( "option", "value", ((rpe.loaded * 300 / rpe.total) >> 0) );
          //total_bar.style.width = (((this.sent + rpe.loaded) * 300 / this.total) >> 0) + "px";
          $j("#progress" ).progressbar( "option", "value", (((this.sent + rpe.loaded) * 300 / this.total) >> 0) );
       },
       
       // fired when last file has been uploaded
       onload:function(rpe, xhr){
           file_bar.style.width = "300px";
           total_bar.style.width = "300px";
           if($j('#fileupload_box').length >0){                        	
           	setTimeout(function(){$j('#fileupload_box').dialog('close');},1000);
           }
           // enable the input again
           input.removeAttribute("disabled");                  
       },
       
       // if something is wrong ... (from native instance or because of size)
       onerror:function(){
    	   if(this.file.fileName!=undefined){
           	img_name = this.file.fileName;
           }else{
           	img_name = this.file.name;
           }
           div.innerHTML = "The file " + img_name + " is too big [" + sized(isWebkit?this.file.fileSize:this.file.size) + "]";
           
           // enable the input again
           input.removeAttribute("disabled");
       }
   });
}
function myImagesLogout(){
	url = '/dol/ajax/ajaxLogout';
	if(cross_domain == "" || cross_domain == undefined){
	    new Ajax.Request(url, {
	    	method:     'POST',
	    	dataType: 'json',
	    	parameters : {},
	    	onSuccess: function(data){
	    		$j('.myimages_div ul.colorSet').empty();
	    	}
	    });
		}else{
	    $j.ajax({url:"http://"+cross_domain+"/dol/ajax/ajaxLogout?callback=?", 
	    	type:     'GET',
	    	async: false,
	    	jsonpCallback: 'jsonCallback',
	    	contentType: "application/json",
	    	dataType: 'jsonp',
	    	parameters : {},
	    	onSuccess: function(data){
	    		$j('.myimages_div ul.colorSet').empty();
	    	}
	    });
    }
    $j('.myimages_div').hide();
	$j('.myimages_login').show();	
	$j('.loggedin').hide();
	$j('.myimages_loginform').show();
	content = '<p class="images_drag">Drag and Drop your Uploaded Images</p>&nbsp; &nbsp;<div class="img_upload1" ><button class="button button-new-upload upicon" name="send" title="" type="button"><i></i><span><span class="uploadicon">Upload More</span></span></button><input type="file" multiple="multiple" class="uploaded" id="uploaded" onchange="uploads()" accept="image/*"/></div><span>&nbsp; &nbsp;|&nbsp; &nbsp; <a type="button" title="Login" name="send" style="cursor:pointer;" class="button button-new-showlogin" id="send2">Login</a></span><span class="lowres-warning"><img width="16px" height="16px" style="cursor:help;" src="/js/all/editor/images/warning-small22.png"> = Low Resolution<div class="tooltip_full_value"> <p><b>Image Resolution is Low</b><br>Required dimensions for each Square Canvas is 1200x1200px.<br>The quality of final print may get affected.</p></div></span>';
	
	$j('.myimages_hdr').html(content);   
	$j(".myimages_photos ul#colorSet").html('');
	input = document.getElementById("uploaded");
	var ua = navigator.userAgent.toLowerCase(); 
	 var Sfwindows = false;
	 if (ua.indexOf('safari')!=-1){ 
	   if(ua.indexOf('chrome')  > -1){
		Sfwindows = false;
	   }else{
	   	if(ua.indexOf("windows") !== -1){
			Sfwindows = true;
	   	}else{
	   		Sfwindows = false;
	   	}
	   }
	  }
	 if(!Sfwindows){
        input.setAttribute("multiple", "true");
       
    }else{
    	input.removeAttribute("multiple");
       
    } 
	 
	isMobile();
	
	if(cross_domain == "" || cross_domain == undefined){
		new Ajax.Request('/dol/ajax/links', {
	    	method:     'GET',
	    	dataType: 'html',
	    	parameters : {},
	    	onSuccess: function(transport){
	    		if(transport.responseText!='undefined' && transport.responseText!='error'){
	        		$$('div.b-right')[0].innerHTML = transport.responseText;
	        	}
	    	},
			onFailure:function(response){
				return '';
	  		}
		});
	}else{
		$j.ajax({url:"http://"+cross_domain+"/dol/ajax/links?callback=?", 
	    	type:     'GET',
	    	async: false,
	    	jsonpCallback: 'jsonCallback',
        	contentType: "application/json",
        	dataType: 'jsonp',
	    	parameters : {},
	    	success: function(transport){
	    		if(transport.responseText!='undefined' && transport.responseText!='error'){
	        		$$('div.b-right')[0].innerHTML = transport;
	        	}
	    	},
			onFailure:function(response){
				return '';
	  		}
		});
	}
	
	$j('.button-new-showlogin').parent().hide();
}
function closeSaveDesignLoginBox(){
	document.getElementById('save_design_login_box').style.display='none';
}
function saveDesign(e){
	document.getElementById('save_design_box').style.display='block';
	//show1(e,'#save_design_box',141,49);
	url = '/dol/ajax/checkLogin';
	if(cross_domain == "" || cross_domain == undefined){
		new Ajax.Request(url, {
	    	method:     'POST',
	    	dataType: 'json',
	    	parameters : {},
	    	onSuccess: function(transport){
	    		response = transport.responseText.evalJSON();
	    		if (response.error) {
	    			document.getElementById('save_design_box').style.display='none';
	    			$$('h2.sd_login_error')[0].innerHTML = '';    			
	    			//document.getElementById('save_design_login_box').style.display='block';
	    			$j('#save_design_login_box').dialog("open");
	        	} else {
	        		saveDesignPost();
	        	}
	    	},
			onFailure:function(response){
				return false;
	  		}
		});
	}else{
		$j.ajax({url:"http://"+cross_domain+"/dol/ajax/checkLogin?callback=?",
	    	type:     'POST',	    	
	    	jsonpCallback: 'jsonCallback',
	    	contentType: "application/json",
	    	dataType: 'jsonp',
	    	data : {},
	    	success: function(transport){
	    		response = transport;
	    		if (response.error) {
	    			document.getElementById('save_design_box').style.display='none';
	    			$$('h2.sd_login_error')[0].innerHTML = '';    			
	    			//document.getElementById('save_design_login_box').style.display='block';
	    			$j('#save_design_login_box').dialog("open");
	        	} else {
	        		saveDesignPost();
	        	}
	    	},
			onFailure:function(response){
				return false;
	  		}
		});
	}
    
}
function saveDesignPost(){
	$j("#svg_data").val(svgCanvas.getSvgString());

	pageno = 1;
	if($j(".page_tab li.active").length>0){
		id = $j(".page_tab li.active").attr('id');	
		pageno = id.replace('page_','');	
	}
	$j('#textsvg_'+pageno).val(svgCanvas.getSvgString())
	params = $j('#product_addtocart_form').serialize();
	url = '/checkout/cart/saveDesign';
	if(cross_domain == "" || cross_domain == undefined){
		new Ajax.Request(url, {
	    	method:     'POST',
	    	dataType: 'json',
	    	parameters : params,
	    	onSuccess: function(transport){
	    		response = transport.responseText.evalJSON();
	    		if (response.error) {
	    			document.getElementById('save_design_box_desc').innerHTML = '<font color="red">'+response.error+'</font>';
	        		timeout = setTimeout(function(){document.getElementById('save_design_box').style.display='none';clearTimeout(timeout);},2000);
	        	} else {
	        		document.getElementById('save_design_box_desc').innerHTML = 'Design Saved Successfully!';
	        		$j('#save_design_box_desc').parent().css({'width':'218px','margin-left':'-109px'});
	        		timeout = setTimeout(function(){
	        			document.getElementById('save_design_box').style.display='none';
	        			document.getElementById('save_design_box_desc').innerHTML = 'Savin Design <img src ='+$j('.desc img').attr('src')+'></img>';
	        			$j('#save_design_box_desc').parent().css({'width':'200px','margin-left':'-100px'});
	        			clearTimeout(timeout);},1000);
	        	}
	    	},
			onFailure:function(response){
				return false;
	  		}
		});
	}else{
		
		function loadXMLDoc(req,cfunc)
		{
		
		  xmlhttp=new XMLHttpRequest();					 
		  xmlhttp.onreadystatechange=cfunc;
		  xmlhttp.open("POST",req,true);
		  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");					  
		  xmlhttp.send(params);
		}
		
		loadXMLDoc("http://"+cross_domain+"/checkout/cart/saveDesign",function(){
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)		    {		
			  response = xmlhttp.responseText.evalJSON();
	    		if (response.error) {
	    			document.getElementById('save_design_box_desc').innerHTML = '<font color="red">'+response.error+'</font>';
	        		timeout = setTimeout(function(){document.getElementById('save_design_box').style.display='none';clearTimeout(timeout);},2000);
	        	} else {
	        		document.getElementById('save_design_box_desc').innerHTML = 'Design Saved Successfully!';
	        		$j('#save_design_box_desc').parent().css({'width':'218px','margin-left':'-109px'});
	        		timeout = setTimeout(function(){
	        			document.getElementById('save_design_box').style.display='none';
	        			document.getElementById('save_design_box_desc').innerHTML = 'Savin Design <img src ='+$j('.desc img').attr('src')+'></img>';
	        			$j('#save_design_box_desc').parent().css({'width':'200px','margin-left':'-100px'});
	        			clearTimeout(timeout);},1000);
	        	}
		    }
		  });		
		
	}
    
}
function isUserLoggedIn(){
	url = '/dol/ajax/checkLogin';
	if(cross_domain == "" || cross_domain == undefined){
		new Ajax.Request(url, {
	    	method:     'POST',
	    	dataType: 'json',
	    	parameters : {},
	    	onSuccess: function(transport){
	    		response = transport.responseText.evalJSON();
	    		if (response.error) {
	        		return false;
	        	} else {
	        		return true;
	        	}
	    	},
			onFailure:function(response){
				return false;
	  		}
		});
	}else{
		$j.ajax({url:"http://"+cross_domain+"/dol/ajax/checkLogin?callback=?",
	    	type:     'POST',
	    	async: false,
	    	jsonpCallback: 'jsonCallback',
	    	contentType: "application/json",
	    	dataType: 'jsonp',
	    	parameters : {},
	    	onSuccess: function(transport){
	    		response = transport;
	    		if (response.error) {
	        		return false;
	        	} else {
	        		return true;
	        	}
	    	},
			onFailure:function(response){
				return false;
	  		}
		});
	}
    
}
function loginAndSaveDesign(){
	px_username = document.getElementById('px_sd_username').value;
	px_password = document.getElementById('px_sd_password').value;
	url = '/dol/ajax/loginPost';
	if(cross_domain == "" || cross_domain == undefined){
		new Ajax.Request(url, {
	    	method:     'POST',
	    	dataType: 'json',
	    	parameters : {'username':px_username, 'password':px_password},
	    	onSuccess: function(transport){
	    		response = transport.responseText.evalJSON();
	    		if (response.error) {
	        		$$('h2.sd_login_error')[0].innerHTML = '<br/><font color="red">'+response.error+'</font><br/>';
	        	} else {
	        		//document.getElementById('save_design_login_box').style.display='none';
	        		$j('#save_design_login_box').dialog("close");
	        		document.getElementById('save_design_box').style.display='block';
	        		saveDesignPost();
	        		
	        		
	        			new Ajax.Request('/dol/ajax/links', {
		        	    	method:     'GET',
		        	    	dataType: 'html',
		        	    	parameters : {},
		        	    	onSuccess: function(transport){
		        	    		if(transport.responseText!='undefined' && transport.responseText!='error'){
		        	        		$$('div.b-right')[0].innerHTML = transport.responseText;
		        	        	}
		        	    	},
		        			onFailure:function(response){
		        				return '';
		        	  		}
		        		});
	        		
	        	}
	    	},
			onFailure:function(response){
				return '';
	  		}
		});
	}else{
		$j.ajax({url:"http://"+cross_domain+"/dol/ajax/loginPost", 
	    	type:     'POST',
	    	async: false,
	    	jsonpCallback: 'jsonCallback',
	    	contentType: "application/json",
	    	dataType: 'jsonp',
	    	data : {'username':px_username, 'password':px_password,"callback":"?"},
	    	success: function(transport){
	    		response = transport;
	    		if (response.error) {
	        		$$('h2.sd_login_error')[0].innerHTML = '<br/><font color="red">'+response.error+'</font><br/>';
	        	} else {
	        		//document.getElementById('save_design_login_box').style.display='none';
	        		$j('#save_design_login_box').dialog("close");
	        		document.getElementById('save_design_box').style.display='block';
	        		saveDesignPost();
	        		
	        			$j.ajax({url:"http://"+cross_domain+"/dol/ajax/links?callback=?",
		        	    	method:     'GET',
		        	    	async: false,
		                    jsonpCallback: 'jsonCallback',
		                    contentType: "application/json",
		                    dataType: 'jsonp',
		        	    	parameters : {},
		        	    	onSuccess: function(transport){
		        	    		if(transport.responseText!='undefined' && transport.responseText!='error'){
		        	        		$$('div.b-right')[0].innerHTML = transport.responseText;
		        	        	}
		        	    	},
		        			onFailure:function(response){
		        				return '';
		        	  		}
		        		});
	        		
	        		
	        	}
	    	},
			onFailure:function(response){
				return '';
	  		}
		});
	}
}
function previewPDF(zoom_factor){
	$j("#svg_data").val(svgCanvas.getSvgString());
	
	pageno = 1;
	if($j(".page_tab li.active").length>0){
		id = $j(".page_tab li.active").attr('id');	
		pageno = id.replace('page_','');
	}
	$j('#textsvg_'+pageno).val(svgCanvas.getSvgString())
	layout_fg_pg1 = document.getElementById('layout_fg_pg1').value;
	layout_bg_pg1 = document.getElementById('layout_bg_pg1').value;
	document.getElementById('review_proof_box').style.display='block';
	params = $('product_addtocart_form').serialize(true);
	
	if(svg_data!=undefined){
		url = '/dol/index/processSVGPdf';
		if(cross_domain == "" || cross_domain == undefined){
        	new Ajax.Request(url, {
            	method:     'POST',
            	dataType: 'json',
            	parameters : params,
            	onSuccess: function(transport){
            		response = transport.responseText.evalJSON();
            		if (response.error) {
                		document.getElementById('review_proof_box_desc').innerHTML = '<font color="red">An unexpected error occurred</font>';
                		timeout = setTimeout(function(){document.getElementById('review_proof_box').style.display='none';clearTimeout(timeout);},2000);
                	} else {

                		url = response['url'];
                		random_number = Math.floor((Math.random()*1000)+1);
                		pdfPopup = window.open('/dol/index/streamFile?url='+url,'pdf'+random_number,'width=400,height=200');

                		if (!pdfPopup){
                			document.getElementById('review_proof_box').style.display='block';
                			document.getElementById('review_proof_box_desc').innerHTML = '<font color="red">Please allow popup in your browser to enable Proof download</font>';
                			timeout = setTimeout(function(){document.getElementById('review_proof_box').style.display='none';
    	            			document.getElementById('review_proof_box_desc').innerHTML ='Processing Proof PDF.... <img src ='+$j('.desc img').attr('src')+'></img>';
    	            			clearTimeout(timeout);},2000);
                		} else {
                			pdfPopup.onload = function() {
                		        setTimeout(function() {
                		            if (pdfPopup.screenX === 0) {
                		            	document.getElementById('review_proof_box').style.display='block';
                            			document.getElementById('review_proof_box_desc').innerHTML = '<font color="red">Please allow popup in your browser to enable Proof download</font>';
                            			timeout = setTimeout(function(){document.getElementById('review_proof_box').style.display='none';
    	        	            			document.getElementById('review_proof_box_desc').innerHTML ='Processing Proof PDF.... <img src ='+$j('.desc img').attr('src')+'></img>';
    	        	            			clearTimeout(timeout);},2000);
                		            }else{
                		            	document.getElementById('review_proof_box').style.display='none';
                		            }
                		        }, 0);
                		    };
                		    document.getElementById('review_proof_box').style.display='none';
                		}
                		//document.getElementById('review_proof_box').style.display='none';
                	}
            	},
      			onFailure:function(response){
        			return '';
          		}
       		});
        }else{
        	
        	params1 = $j('#product_addtocart_form').serialize();
        	function loadXMLDoc(req,cfunc)
    		{
    		  xmlhttp1=new XMLHttpRequest();					 
    		  xmlhttp1.onreadystatechange=cfunc;
    		  xmlhttp1.open("POST",req,true);
    		  xmlhttp1.setRequestHeader("Content-type","application/x-www-form-urlencoded");					  
    		  xmlhttp1.send(params1);
    		}
    		
    		loadXMLDoc("http://"+cross_domain+"/dol/index/processSVGPdf",function(){
    		  if (xmlhttp1.readyState==4 && xmlhttp1.status==200)
    		    {    			  	
    			  response = xmlhttp1.responseText.evalJSON();    			 
          		if (response.error) {
              		document.getElementById('review_proof_box_desc').innerHTML = '<font color="red">An unexpected error occurred</font>';
              		timeout = setTimeout(function(){document.getElementById('review_proof_box').style.display='none';clearTimeout(timeout);},2000);
              	} else {

              		url = response['url'];
              		random_number = Math.floor((Math.random()*1000)+1);
              		pdfPopup = window.open(url,'pdf'+random_number,'width=400,height=200');

              		if (!pdfPopup){
              			document.getElementById('review_proof_box').style.display='block';
              			document.getElementById('review_proof_box_desc').innerHTML = '<font color="red">Please allow popup in your browser to enable Proof download</font>';
              			timeout = setTimeout(function(){document.getElementById('review_proof_box').style.display='none';
  	            			document.getElementById('review_proof_box_desc').innerHTML ='Processing Proof PDF.... <img src ='+$j('.desc img').attr('src')+'></img>';
  	            			clearTimeout(timeout);},2000);
              		} else {
              			pdfPopup.onload = function() {
              		        setTimeout(function() {
              		            if (pdfPopup.screenX === 0) {
              		            	document.getElementById('review_proof_box').style.display='block';
                          			document.getElementById('review_proof_box_desc').innerHTML = '<font color="red">Please allow popup in your browser to enable Proof download</font>';
                          			timeout = setTimeout(function(){document.getElementById('review_proof_box').style.display='none';
  	        	            			document.getElementById('review_proof_box_desc').innerHTML ='Processing Proof PDF.... <img src ='+$j('.desc img').attr('src')+'></img>';
  	        	            			clearTimeout(timeout);},2000);
              		            }else{
              		            	document.getElementById('review_proof_box').style.display='none';
              		            }
              		        }, 0);
              		    };
              		    document.getElementById('review_proof_box').style.display='none';
              		}
              		//document.getElementById('review_proof_box').style.display='none';
              	}

    		    }
    		  });		
        	
        	
        	
        }
   	}
}