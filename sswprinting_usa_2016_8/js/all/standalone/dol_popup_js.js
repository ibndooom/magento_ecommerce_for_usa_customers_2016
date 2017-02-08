if(!$j){
	var $j = jQuery.noConflict();
}
var productId;
function getProductId(product_id){
	productId = product_id
}

$j(document).ready(function(){
	
	/**/
	$j(".catalog-category-view .category-image.options1").prepend("<div class='pricing_head'>Get Started Here</div>");
	 
	/*Scroll bar*/
	if($j(".select_content_1").length>0){
		$j(".select_content_1, #frame_content_upload").mCustomScrollbar({
			scrollButtons:{enable:true},
			mouseWheel:{enable:true},
			theme:"dark-thick"
		});
	}
	
	/*$j('div#frame_selectproduct').bind('dialogclose', function(event) {
	     parent.window.location.reload();
	 });
	    
	$j('div#alone').bind('dialogclose', function(event) {
	     parent.window.location.reload();
	 });*/
		
	/* step2 prev step */
	$j("#prevframe_select").click(function(){
		  $j(".step1").show();
		  $j(".step2").hide();
		  $j("#upload_own").hide();
		  $j("#design_upload_prevframe").hide();
		  $j("#upload_prevframe").hide();
		  $j("#design_own").hide();
		  $j(".sp_selector").removeClass("sp_selector");
		  $j("#change_product").hide();
		  $j("#nextframe_choose").hide();
		  $j(".ui-dialog-titlebar .ui-dialog-title").text("Lets get started...");
		  $j(".select_product .sbHolder .sbSelector").text("Choose one product...");
		  $j(".select_content_1 h2").slideDown("slow");
		  //$j(".select_content_1 h3").hide();
		  $j(".select_product").slideDown("slow");
		  $j(".select_content_1").css({"border-bottom":"none"});
		  $j(".instant_pricing_container").hide();
		 }); 
	
	/*Change Product Link*/
	$j(document).on('click','#change_product', function() {
		  $j(".step1").show();
		  $j("#frame_content_upload").hide();
		  $j("#frame_content_browse").hide();
		  $j("#frame_content_choose").hide();
		  $j(".frame_footer").hide();
		  $j("#upload_own").hide();
		  $j("#design_own").hide();
		  $j("#design_upload_prevframe").hide();	
		  $j(".sp_selector").removeClass("sp_selector");
		  $j("#change_product").hide();
		  $j("#nextframe_choose").hide();
		  $j(".ui-dialog-titlebar .ui-dialog-title").text("Lets get started...");
		  $j(".select_product .sbHolder .sbSelector").text("Choose one product...");
		  $j(".select_content_1 h2").slideDown("slow");
		 // $j(".select_content_1 h3").hide();
		  $j(".select_product").slideDown("slow");
		  $j(".select_content_1").css({"border-bottom":"none"});
		  $j(".instant_pricing_container").hide();	
		  $j(".upload_frame_footer").hide();	
		 }); 	
	
	
	$j("#choose_browse").click(function(){ 
		$j("#frame_content_browse").show();
		$j("#browse_prevframe").show();		
		var nav = $j('.browse_content_1').attr('rel');
		choose = nav + '/pid/' + productId;
		  $j.ajax({
	      type: 'GET',
	      url: choose ,
	      success: function(data){
	    	 $j('.browse_content_1').html(data);	    	
	      }
	    });			  
	    	 var frame1  = document.getElementById("demo-frame").src;
	    	 $j(".descLoader").show();	   
			 var selection = frame1 + '/pid/' + productId;
			 $j('.browse_content_2 iframe').load(function(){
				 $j(".descLoader").hide();
				 $j('.browse_content_2 iframe').show();
				 //$j("#demo-frame").contents().find(".category-title").css("display","none");
				// $j("#demo-frame").contents().find(".sorting").css("display","none");
			 });
			 $j('.browse_content_2 iframe').attr('src',selection);
			 
		/*Browse template reset*/
		//browsetemplate_reset1();
		$j("#upload_content").hide();
		$j(".step2").hide();
		$j("#browsetemp_content").show();
	});
	
		
	/*Back to Choose Option*/
	$j("#browse_prevframe").click(function(){
		/*Browse template reset*/
		//browsetemplate_reset2();
		$j("#change_product").show();
		$j("#browsetemp_content").hide();
		$j("#upload_content").hide();
		$j(".step2").show();
	});
			
	var refine_arr = [];
	$j(function () {
		$j("#refine_by_list li .refine_by").selectbox({
					onOpen:function(){
						$j(this).css({"padding-bottom":"15px" , "border":"none"});
						$j("#refine_by_list .sbOptions").css({"top":"50px"});
					},
					onClose:function(){
						$j(this).css({"padding-bottom":"10px" , "border":"1px solid #ddd"});
						$j("#refine_by_list .sbOptions").css({"top":"36px"});
					},
					onChange:function(){
						var refined_val = $j(this).val();
						refine_arr.push(refined_val);			   
					    var x = refine_arr.join("");
						
					    var change_nav = $j('.browse_content_1').attr('rel');
					    
						url2 = change_nav + x;
						$j('.browse_content_1').attr('ref',url2);
						  $j.ajax({
					      type: 'GET',
					      url: url2 ,
					      success: function(data){
					    	 $j('.browse_content_1').html(data);
					      }
					    });	
						  
						 var frame  = document.getElementById("demo-frame").src;
						 var url1 = frame + x;						 
						 $j('.browse_content_2 iframe').attr('src',url1);
					}			
		});
	});
	
	/*Reset the Top navigation anad iframe*/
	
	$j("#frame_selectproduct .reset_wrapper").click(function(){
		 url = $j('.browse_content_1').attr('rel');	
		    $j.ajax({
		      type: 'GET',
		      url: url,
		      data:{'pid':productId},
		      complete: function(data){				      		       
		        $j('.browse_content_1').html(data.responseText);
		      }
		    });	
		    var emptysrc = $j('.browse_content_2 iframe').attr('src',"");
		    iframe_reset = $j("#demo-frame").attr('value');
			//document.getElementById("demo-frame").src = iframe_reset;
			var applysrc = iframe_reset + '/pid/' + productId;
		    $j('.browse_content_2 iframe').attr('src',applysrc);
	});
	
	$j("#browse_templates .reset_wrapper").click(function(){
		$j('.browse_content_1').removeAttr('ref');
		productId = $j('input[name="product"]').val();
		
		if($j('input[name="cpid"]').length>0){
			productId = $j('input[name="cpid"]').val();
		}
		
		 url =  $j('.browse_content_1').attr('rel');
		    $j.ajax({
		      type: 'GET',
		      url: url + "/pid="+productId,
		      complete: function(data){				      		       
		        $j('.browse_content_1').html(data.responseText);
		      }
		    });	
		    var browse_emptysrc = $j('.browse_content_2 iframe').attr('src',"");
		    frameset = $j("#demo-frame").attr('value');
		    //document.getElementById("demo-frame").src = frameset;
		    //var newsrc = document.getElementById("demo-frame").src;
		    framesrc = frameset + '/pid/' + productId;
		    $j('.browse_content_2 iframe').attr('src',framesrc);
		    $j('.browse_content_2 iframe').attr('data-rel',framesrc);
	});
	
	/*Grid & List View*/
	$j(".list_view").hide();
	$j(".grid").click(function(){
		$j(".list_view").fadeOut();
		$j(".grid_view").fadeIn('slow');
	});
	$j(".list").click(function(){
		$j(".grid_view").fadeOut();
		$j(".list_view").fadeIn('slow');
	});
	
	/*Upload File*/
	$j("#browsefile").click(function(){
		$j("input[type=file]").trigger('click');
		return true;
	});
		
	
	/*Functions*/
	function browsetemplate_reset1(){
		$j(".ui-dialog-titlebar .ui-dialog-title").css({"height":"50px"});
		$j("#frame_content_browse").css({"height":"485px"});
		$j(".browse_content_2").css({"height":"476px"});
	}
	function browsetemplate_reset2(){
		$j(".ui-dialog-titlebar .ui-dialog-title").css({"height":"50px"});
	}
	
		
});		