/**
 * loupe - an image magnifier for jQuery
 * http://github.com/jdbartlett/loupe
 */
$j = jQuery.noConflict();
(function($j) {
	$j.fn.loupe = function(options) {
		if (!this.length) { return this; }
		options = $j.extend({ 'loupe':'loupe', 'width':200, 'height':150 }, options || {});

		this.each(function() {
			var $this = $j(this), loupe = null, big, small = null, time = null,
			hide = function() { loupe.hide(); },
			move = function(e) {
				var os = small.offset(), sW = small.outerWidth(), sH = small.outerHeight(), oW = options.width/2, oH = options.height/2;

				if (e.pageX > sW + os.left + 10 || e.pageX < os.left - 10 ||
					e.pageY > sH + os.top + 10 || e.pageY < os.top - 10) {
					return hide();
				}
				if (time && clearTimeout(time)) { time = null; }
				loupe.css({ 'left':e.pageX - oW, 'top':e.pageY - oH });
				big.css({
					'left':-(((e.pageX - os.left) / sW) * big.width() - oW)|0,
					'top':-(((e.pageY - os.top) / sH) * big.height() - oH)|0
				});
			};

			$this.mouseenter(function(e) {
				if (!small) { small = $this.is('img') ? $this : $this.find('img:first'); }
				loupe = (loupe || (loupe = $j('<div></div>').addClass(options.loupe)
					.css({
						width:options.width, height:options.height,
						position:'absolute', overflow:'hidden'
					})
					.append(big = $j('<img src="' + $this.attr($this.is('img') ? 'src' : 'href') + '" />').css({position:'absolute'}))
					.mousemove(move).appendTo('body')
				)).show(); move(e);
			}).mouseout(function() { time = setTimeout(hide, 10); });
		});

		return this;
	};
})(jQuery);


/*
 * Scripts
 *
 */
var Engine = {
	enhancements : {
		zoom : function(){
			if($j('p.workspace').length>0){
				$j('p.workspace a').loupe({
					'width' : 400,
					'height' : 300
				});
			}
		}
	}
};


//functions initialized on document ready
jQuery(function($) {
	Engine.enhancements.zoom();
});

$j("a.scrolling").click(function(e) {
    e.preventDefault();
    goToByScroll($j(this).attr("data-rel"));
});

function goToByScroll(id) {
    $j('html,body').animate({scrollTop: $j("#"+id).offset().top},'slow');                               
}  

function refreshDesignImage(current_page){
	params = $('product_addtocart_form').serialize();
	url = '/dol/index/processDesignImage';	
	
	if($j('#progress_image').length>0){
		$j('#progress_image').show();
	}else if($j('#updating_box').length>0){
		$j('#updating_box').show();
	}
	
	if(current_page!=undefined){
		params = params + '&current_page='+current_page;
	}
	
	new Ajax.Request(url, {
        method:     'POST',
        dataType: 'json',
        parameters : params,
        onSuccess: function(transport){     	
	        if (transport.responseText.isJSON()) {
	            response = transport.responseText.evalJSON();
	            if($j('#progress_image').length>0){
	        		$j('#progress_image').hide();
	        	}else if($j('#updating_box').length>0){
	        		$j('#updating_box').hide();
	        	}
	            if (response.error) {
	            } else {
		            if($$('.dImage').length>0){
		                if(response['child_images'].length>0){
		                	
		                	if(current_page==undefined){
		                		if($j('#image_zoom').attr('rel')!=10000){
		                			$j('#image').attr('src', response['child_images'][$j('#image_zoom').attr('rel')]);
				                	$j('#image_zoom').attr('href', response['child_images'][$j('#image_zoom').attr('rel')]);
		                		}else{
		                			if($j('#image').length>0){
				                		document.getElementById('image').src = response['main'];
				                	}
				                	if($j('#image_zoom').length>0){
				                		document.getElementById('image_zoom').href = response['main'];
				                		$j('#image_zoom').attr('rel', '0');
				                	}
		                		}
				                
				                for(i=0;i<response['child_images'].length;i++){
				                	$j('.more-views li a[class="imageZoom dImage"]').filter(':eq('+i+')').attr('href',response['child_images'][i]);
				                	$j('.more-views li a img[class="dImage"]').filter(':eq('+i+')').attr('src',response['child_images'][i]);
				                }
		                	}else{
		                		
		                		if(current_page=='0'){
		                			$j('#image').attr('src', response['child_images'][current_page]);
				                	$j('#image_zoom').attr('href', response['child_images'][current_page]);
		                		}
				                
				                i = current_page;
				                $j('.more-views li a[class="imageZoom dImage"]').filter(':eq('+i+')').attr('href',response['child_images'][i]);
				                $j('.more-views li a img[class="dImage"]').filter(':eq('+i+')').attr('src',response['child_images'][i]);
		                	}
		                	
		                }else{
		                	if($j('#image').length>0){
		                		document.getElementById('image').src = response['main'];
		                	}
		                	if($j('#image_zoom').length>0){
		                		document.getElementById('image_zoom').href = response['main'];
		                		$j('#image_zoom').attr('rel', '0');
		                	}

		                	$j('.more-views li a[class="imageZoom dImage"]').filter(':eq(0)').attr('href',response['main']);
			                $j('.more-views li a img[class="dImage"]').filter(':eq(0)').attr('src',response['main']);
			                
			                if($j('.frame-cover').length>0){
			                	url = 'url("'+ response['main'] + '") -0px 0 no-repeat';
			                	$j('.frame-cover').css("background",url);
			                	$j('.frame-cover').css("background-size","130%");
			                	$j('.frame-cover').css("background-position","center");
		                	}
		                }
		        	}else{

		        		if(response['child_images'].length>0){
		                	
		                	if(current_page==undefined){
		                		$j('#image').attr('src', response['child_images'][$j('#image_zoom').attr('rel')]);
				                $j('#image_zoom').attr('href', response['child_images'][$j('#image_zoom').attr('rel')]);
				                
				                for(i=0;i<response['child_images'].length;i++){
				                	$j('.more-views li a').filter(':eq('+i+')').attr('href',response['child_images'][i]);
				                	$j('.more-views li a img').filter(':eq('+i+')').attr('src',response['child_images'][i]);
				                }
		                	}else{
		                		
		                		if(current_page=='0'){
		                			$j('#image').attr('src', response['child_images'][current_page]);
				                	$j('#image_zoom').attr('href', response['child_images'][current_page]);
		                		}
				                
				                i = current_page;
				                $j('.more-views li a').filter(':eq('+i+')').attr('href',response['child_images'][i]);
				                $j('.more-views li a img').filter(':eq('+i+')').attr('src',response['child_images'][i]);
		                	}
		                	
		                }else{
		                	if($j('#image').length>0){
		                		document.getElementById('image').src = response['main'];
		                	}
		                	if($j('#image_zoom').length>0){
		                		document.getElementById('image_zoom').href = response['main'];
		                	}
			                
			                if($j('.frame-cover').length>0){
			                	url = 'url("'+ response['main'] + '") -0px 0 no-repeat';
			                	$j('.frame-cover').css("background",url);
			                	$j('.frame-cover').css("background-size","130%");
			                	$j('.frame-cover').css("background-position","center");
		                	}
		                }
		        	}
	            }
	        }
        },
  		onFailure:function(response){
    		return '';
      	}
   	});
}