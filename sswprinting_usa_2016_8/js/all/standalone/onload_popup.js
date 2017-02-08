$j( window ).load(function() {
	
	$j("#nextframe_choose").hide();
	
	$j("#upload_content").show();
	$j("#selectproduct_content").show();
	$j("#choose_content").show();
	$j("#browsetemp_content").show();
	
		
	/*Pop-up*/
	$j("#frame_selectproduct").dialog({ 
		autoOpen: true,
		modal: true,
		width: 960,
		height: 600,
		dialogClass:'fixedpos',
		zIndex:'10000',
		resizable:'false',
		show:'slide',
		closeOnEscape: false,
		close: function(ev, ui) {parent.window.location.reload();}
	});
	});