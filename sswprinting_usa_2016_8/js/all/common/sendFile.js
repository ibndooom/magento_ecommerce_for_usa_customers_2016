var sendFile = 36700160; // maximum allowed file size
                        // should be smaller or equal to the size accepted in the server for each file
var ua = navigator.userAgent.toLowerCase(); 
var isWebkit = false;

if (ua.indexOf('safari')!=-1){ 
	if(ua.indexOf('chrome')  > -1){
		isWebkit = false;
	}else{
		isWebkit = true;
	}
}
// function to upload a single file via handler
sendFile = (function(toString, maxSize){
    var isFunction = function(Function){return  toString.call(Function) === "[object Function]";},
        split = "onabort.onerror.onloadstart.onprogress".split("."),
        length = split.length;
    return  function(handler){
    	
    	if(handler.file.fileSize!=undefined){
    		isWebkit = true;
    		size = handler.file.fileSize;
    	}else{
    		size = handler.file.size;
    		isWebkit = false;
    	}
    	
    	if(handler.file.fileName!=undefined){
    		name = handler.file.fileName;
    	}else{
    		name = handler.file.name;
    	}
		
        if(maxSize && maxSize < size){
            if(isFunction(handler.onerror))
                handler.onerror();
            return;
        };
        var xhr = new XMLHttpRequest,
            upload = xhr.upload;
        for(var xhr = new XMLHttpRequest, upload = xhr.upload, i = 0; i < length; i++ ){
            upload[split[i]] = (function(event){
            	return function(rpe){
                    if(isFunction(handler[event]))
                        handler[event].call(handler, rpe, xhr);
                	};
            })(split[i]);
        }
        upload.onload = function(rpe){
        	
            if(handler.onreadystatechange === false){
                if(isFunction(handler.onload))
                    handler.onload(rpe, xhr);
            } else {
                setTimeout(function(){
                    if(xhr.readyState === 4){
                        if(isFunction(handler.onload)){
                            handler.onload(rpe, xhr);                            
							var json = $j.parseJSON(xhr.responseText);							
                            if(json != null){ 
                            	$$('form.myimages_login')[0].style.display = 'none';
	                    		$$('div.myimages_div')[0].style.display = 'block';
	                    		var  listEl = "<li class='high_resol'><div class='overlay'><div class='bt1' title='הוסף תמונה'><img draggable='false' src='/js/all/editor/images/add-image.png'/></div></div><a href='"+json.imageUrl+"'  target='_blank'> " +
                	    		"<img src='"+json.thumbUrl+"' class='ui-draggable' style='cursor:move;' rel='"+json.imageUrl+"' width='"+json.thumb_width+"' height='"+json.thumb_height+"'> </a>" +
                	    				"<span style='opacity:1;'></span></li>";
	                    	   var oldhtml = $j("ul#colorSet").html();
	                    	   if($j(".myimages_div ul#colorSet li:first").length>0){
	                    		   $j(listEl).insertBefore($j(".myimages_div ul#colorSet li:first"));
	                    	   }else{
	                    		   $j(".myimages_div ul#colorSet").html(listEl);
	                    	   }
	                    	  // $j(".myimages_div ul#colorSet li:first").fadeIn("fast");
	                    	   //$j('#colorSet').append(listEl);

	                    	   getImageDims(json.is_low_res);
	                    		/*$j('#colorSet img').draggable({appendTo: "body",helper:"clone"});*/
	                    		
	                    	//	if($j('.myimages_div .ui-draggable').length/2 == 1)
	                    	//	{
	                    	   var img_path = $j('#colorSet li a .ui-draggable').attr('rel');
	                    			if(handler.files.length == 1)
	                    			{
	                    				if(window.svgEditor){
	                    					if($j('#tool_image').attr('placeholder') =="" || $j('#tool_image').attr('placeholder') == undefined){
	                    							
													   svgEditor.addGalleryImage(img_path,true);
							                    		$j(".myimages_div").mCustomScrollbar("update");
							                    		$j(".myimages_div ul#colorSet img").load(function(){
							        						$j(".myimages_div").mCustomScrollbar("update");
							        						width = $j(".myimages_div .mCSB_container").width();
							        						$j(".myimages_div .mCSB_container").css("width",width+4);
							        					});
							                    		$j('#vtab').dialog("close");
							                    		$j(new Image()).load(function() {
							                    			$j(".myimages_div").mCustomScrollbar("update");
							        						width = $j(".myimages_div .mCSB_container").width();
							        						$j(".myimages_div .mCSB_container").css("width",width+4);
							                    		}).attr('src', json.thumbUrl);
													   return;
												
	                    					}
	                    				}
	                    					   				$j("#container").dialog("open");
	                    									$j('#updating_crop').show();
	                    									$j('.rotate').attr('rel', 0);
	                    									$j(".jcrop-holder img").rotate(0);
	                    									$j(".preview-container img").rotate(0);
	                    									var img_path = $j('#colorSet li a .ui-draggable').attr('rel');
	                    							     	$j.ajax({
	                    											'url': '/dol/ajax/getImageDpi?image_url='+img_path,
	                    											'dataType': 'json',
	                    											type: "GET",						
	                    											success: function(json) {					
	                    												dpi = json.dpi;
	                    												width = json.width;
	                    												height = json.height;
	                    												image = json.img_url;
	                    												if(width<500 && height<500){
	                    														image  = json.img_url.replace('_sized', '');
	                    												}
	                    												$j("#cropimage").attr("src",image);
	                    												$j('.jcrop-preview').attr("src",image);
	                    												replaceImage = $j('.button-change-image.selectedImage');
	                    												if(window.svgEditor){
	                    													if($j('#tool_image').attr('placeholder') =="" || $j('#tool_image').attr('placeholder') == undefined){	                    														
	                    														svgEditor.addGalleryImage(url,true);
	                    														imageaspect = 0;
	                    														$j('.jcrop-preview').hide();
	                    													}else{
	                    														selects = svgCanvas.getSelectedElems();	                    														
	                    														if(selects == undefined || selects == null) return;	                    															    	
	                    												      	imageaspect = $j(selects[0]).attr('orig_w')/$j(selects[0]).attr('orig_h');
	                    												      	if($j('#tool_crop').attr('crop')=="true"){imageaspect = 0;$j('.jcrop-preview').hide();}else{$j('.jcrop-preview').show();}     	
	                    											      	}
	                    											      }else{      
	                    											      	replaceImage = $j('.button-change-image.selectedImage');
	                    													imageaspect = replaceImage.attr('rel-aspectratio');
	                    											      }
	                    												zoom_factor = json.zoom_factor	
	                    												
	                    												$j(new Image()).load(function(){	                    													
	                    													$j('#cropimage').Jcrop({	
	                    														onChange:   showCoords1,
	                    														onSelect:   showCoords1,
	                    														aspectRatio : imageaspect,
	                    														boxWidth : (window.innerWidth > 299 && window.innerWidth < 998) ? 308 : 500,
	                    														boxWidth : (window.innerWidth > 299 && window.innerWidth < 998) ? 308 : 500																		
	                    													},function(){						
	                    													  bounds = this.getBounds();
	                    												      boundx = bounds[0];
	                    												      boundy = bounds[1];
	                    												      // Store the API in the jcrop_api variable
	                    												      jcrop_api = this;
	                    												
	                    												      // Move the preview into the jcrop container for css positioning
	                    												      //$preview.appendTo(jcrop_api.ui.holder);	  
	                    													})
	                    													jcrop_api.setImage(image,$j('.jcrop-preview').attr("src",image)); 
	                    													//$j('.jcrop-holder').css('top',$j('.photoEdit').outerHeight()/2-$j('.jcrop-holder').outerHeight()/2)
	                    													//jcrop_api.setSelect([0,0,500,500]);	
	                    													
	                    													/*DOL design for mobile*/
	                    									                if(window.innerWidth > 299 && window.innerWidth < 998){
	                    									                	jcrop_api.setSelect([0,0,308,308]);	
	                    									            	}else{
	                    									            		jcrop_api.setSelect([0,0,500,500]);	
	                    									            	}	
	                    													
	                    													$j('#updating_box').hide();
	                    													$j('#updating_crop').hide();
	                    													$j(".myimages_div ul#colorSet img").load(function(){	                    			
	            	                    		        						$j(".myimages_div").mCustomScrollbar("update");
	            	                    		        						width = $j(".myimages_div .mCSB_container").width();
	            	                    		        						$j(".myimages_div .mCSB_container").css("width",width+4);
	            	                    		        					});
	                    												}).attr("src",image);
	                    												
	                    							     	}
	                    						});
	                    							     	
	                    					
	                    			}
	                    		//}
	                    		//var div_img = $j('#colorSet img').length;
	                    		//var div_w = parseInt($j('.myimages_photos').css('width').replace('px',""));
	                    		/*if(div_img == 1){
	                    			div_w = 0;
	                    		}					                    		
	                    		var len = div_w + json.thumb_width+25;*/
	                    		//$j('.myimages_photos').css('width',len);
	                    		//$j('.myimages_photos').css('top','13px');
	                    		
	                    		$j(new Image()).load(function() {
	                    			$j(".myimages_div").mCustomScrollbar("update");
	        						width = $j(".myimages_div .mCSB_container").width();
	        						$j(".myimages_div .mCSB_container").css("width",width+4);
	                  		}).attr('src', json.thumbUrl);
	                    	    
			                   // svgCanvas.setMode('select');
                            }	
                        }
                    } else
                    	setTimeout(arguments.callee, 15);
                }, 15);
            }
        };
        
        xhr.open("post", "/dol/index/multiupload?upload=true", true);
        xhr.setRequestHeader("If-Modified-Since", "Mon, 26 Jul 1997 05:00:00 GMT");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("X-File-Name", encodeURIComponent(name));
        xhr.setRequestHeader("X-File-Size", size);
        //xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.send(handler.file);
       
        /*code to be reviewed*/
       /* $j('.overlay').css({'background-color': 'rgba(0, 0, 0, 0.65)','cursor': 'pointer','display': 'block','height': '75px','margin': '0 !important','width': '100%'});
        $j('.bt1').css({'background': 'none repeat scroll 0 0 rgba(0, 0, 0, 0)','overflow': 'visible','text-indent': '50%'});
        setTimeout(function(){
        	$j('.overlay').attr('style','');
        	$j('.bt1').attr('style','')
        	},10000);*/
        
        
        return  handler;
    };

})(Object.prototype.toString, sendFile);



//Resolution checking
getImageDims = function(is_low_res, elem) {
	if(is_low_res=='false'){
		$j('.high_resol').find("span").remove();
		return false; 
	}else{
		$j('.high_resol').removeClass();
	 	$j('#colorSet li').addClass("lowres");
	}
 }
// function to upload multiple files via handler
function sendMultipleFiles(handler){
    var length = handler.files.length,
        i = 0,
        onload = handler.onload;
    
    handler.current = 0;
    handler.total = 0;
    handler.sent = 0;
    while(handler.current < length){
    	if(handler.files[handler.current].fileSize!=undefined){
    		handler.total += handler.files[handler.current++].fileSize;
    		isWebkit = true;
    	}else{
    		handler.total += handler.files[handler.current++].size;
    		isWebkit = false;
    	}
    }
    
    handler.current = 0;
    if(length){
        handler.file = handler.files[handler.current];
       
        sendFile(handler).onload = function(rpe, xhr){
            if(++handler.current < length){
                handler.sent += isWebkit?handler.files[handler.current - 1].fileSize:handler.files[handler.current - 1].size;
                handler.file = handler.files[handler.current];
                sendFile(handler).onload = arguments.callee;
            } else if(onload) {
                handler.onload = onload;
                handler.onload(rpe, xhr);
            }
        };
    }
    
    if(handler.files.length == 1)
	{
    
	}
	   
    return  handler;
    
  
};

$j('.high_resol img').mouseenter(function(){
	$j(this).parent().prev().children().css('width','40%');
})
$j('.high_resol img').mouseleave(function(){
	$j(this).parent().prev().children().css('width','100%');
})




sendFile1 = (function(toString, maxSize){	
    var isFunction = function(Function){return  toString.call(Function) === "[object Function]";},
        split = "onabort.onerror.onloadstart.onprogress".split("."),
        length = split.length;
    return  function(handler){
    	if(handler.file.fileSize!=undefined){
    		isWebkit = true;
    		size = handler.file.fileSize;
    	}else{
    		size = handler.file.size;
    		isWebkit = false;
    	}
    	
    	if(handler.file.fileName!=undefined){
    		name = handler.file.fileName;
    	}else{
    		name = handler.file.name;
    	}
    	
        if(maxSize && maxSize < size){
            if(isFunction(handler.onerror))
                handler.onerror();
            return;
        };
        var xhr = new XMLHttpRequest,
            upload = xhr.upload;
        for(var xhr = new XMLHttpRequest, upload = xhr.upload, i = 0; i < length; i++ ){
            upload[split[i]] = (function(event){
            	return function(rpe){
                    if(isFunction(handler[event]))
                        handler[event].call(handler, rpe, xhr);
                	};
            })(split[i]);
        }
        upload.onload = function(rpe){        	
            if(handler.onreadystatechange === false){
                if(isFunction(handler.onload))
                    handler.onload(rpe, xhr);
            } else {
                setTimeout(function(){
                    if(xhr.readyState === 4){
                        if(isFunction(handler.onload)){
                            handler.onload(rpe, xhr);                            
							var json = $j.parseJSON(xhr.responseText);							
                            if(json != null){
                            	svgCanvas.addBackgroundImage(json)                            	
			                   // svgCanvas.setMode('select');
                            }	
                        }
                    } else
                        setTimeout(arguments.callee, 15);
                }, 15);
            }
        };
        xhr.open("post", "/dol/index/multiupload?upload=true", true);
        xhr.setRequestHeader("If-Modified-Since", "Mon, 26 Jul 1997 05:00:00 GMT");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("X-File-Name", encodeURIComponent(name));
        xhr.setRequestHeader("X-File-Size", size);
        //xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.send(handler.file);
        return  handler;
    };
})(Object.prototype.toString, sendFile);


function sendMultipleFiles1(handler){
	
    var length = handler.files.length,
        i = 0,
        onload = handler.onload;
    
    handler.current = 0;
    handler.total = 0;
    handler.sent = 0;
    while(handler.current < length){
        if(handler.files[handler.current].fileSize!=undefined){
    		handler.total += handler.files[handler.current++].fileSize;
    		isWebkit = true;
    	}else{
    		handler.total += handler.files[handler.current++].size;
    		isWebkit = false;
    	}
	}
    handler.current = 0;
    if(length){
        handler.file = handler.files[handler.current];
       
        sendFile1(handler).onload = function(rpe, xhr){
        	
            if(++handler.current < length){
                handler.sent += isWebkit?handler.files[handler.current - 1].fileSize:handler.files[handler.current - 1].size;
                handler.file = handler.files[handler.current];
                sendFile1(handler).onload = arguments.callee;
            } else if(onload) {
                handler.onload = onload;
                handler.onload(rpe, xhr);
            }
        };
    }
    return  handler;
};

