(function() {	
	var filter_img;
	var blurFilterSlider;
	var blurFilter, hueFilter, constrastFilter, saturationFilter, brightnessFilter;
	var redChannelFilter, greenChannelFilter, blueChannelFilter;
	var colorFilter, prev_url;
	var filter_slideInterval = -1;
	var ChangeElementCommand = svgedit.history.ChangeElementCommand;
	var BatchCommand = svgedit.history.BatchCommand;
	var selectedElement = selectedElement || {};
	svgedit = svgedit || {};
	var data;
	var color_matrix;
	var imageMatrixPath;
	var origData;
	var filter_name = "default";
	
	if (!svgedit.imageFilters) {
		svgedit.imageFilters = {};
	}
	
	svgedit.imageFilters.clickColorFilters = function(imagePath, color_filter){
		filter_name = color_filter;
		$j(".filteredMainImage").hide();
		$j(".canvasLoader").show();
		flagImage = 0;
		$j(".filteredMainImage").attr("src",imagePath);
		setTimeout(function(){
			$j(".brightnessSlider").slider("option", "value", 0);
			$j(".saturationSlider").slider("option", "value", 0);
			$j(".hueSlider").slider("option", "value", 0);
			$j(".blurSlider").slider("option", "value", 0);
			$j(".contrastSlider").slider("option", "value", 0);
			$j(".redChannelSlider").slider("option", "value", 255);
			$j(".greenChannelSlider").slider("option", "value", 255);
			$j(".blueChannelSlider").slider("option", "value", 255);
			
			$j(".right_section").show();
			$j("#canvas").hide();
			$j(".filteredMainImage").show();
			$j(".canvasLoader").hide();
		},200)
	}
	
	svgedit.imageFilters.initFiltersSlider = function(){
		flagImage = 0;
		$j(".brightnessSlider").slider({
			value: 0,
			min: -100,
			max: 100,
			range: "min",
			disabled:false,
			start:function(){
				flagImage++;
				$j(".filteredMainImage").hide();
				$j(".applySlider").hide();
				$j(".right_section").show();
				$j("#canvas").show();
				if(flagImage == 1){
					svgCanvas.initFilters();
				}				
			}
		});
		$j(".saturationSlider").slider({
			value: 0,
			min: -100,
			max: 100,
			range: "min",
			disabled:false,
			start:function(){
				flagImage++;
				$j(".filteredMainImage").hide();
				$j(".applySlider").hide();
				$j(".right_section").show();
				$j("#canvas").show();
				if(flagImage == 1){
					svgCanvas.initFilters();
				}				
			}
		});
		$j(".contrastSlider").slider({
			value: 0,
			min: -50,
			max: 50,
			range: "min",
			disabled:false,
			start:function(){
				flagImage++;
				$j(".filteredMainImage").hide();
				$j(".applySlider").hide();
				$j(".right_section").show();
				$j("#canvas").show();
				if(flagImage == 1){
					svgCanvas.initFilters();
				}				
			}
		});
		$j(".hueSlider").slider({
			value: 0,
			min: -180,
			max: 180,
			range: "min",
			disabled:false,
			start:function(){
				flagImage++;
				$j(".filteredMainImage").hide();
				$j(".applySlider").hide();
				$j(".right_section").show();
				$j("#canvas").show();
				if(flagImage == 1){
					svgCanvas.initFilters();
				}				
			}
		});
		$j(".blurSlider").slider({
			value: 0,
			min: 0,
			max: 10,
			range: "min",
			disabled:false,
			start:function(){
				flagImage++;
				$j(".filteredMainImage").hide();
				$j(".applySlider").hide();
				$j(".right_section").show();
				$j("#canvas").show();
				console.log($j(".blurSlider").slider('value'))
				if(flagImage == 1){
					svgCanvas.initFilters();
				}				
			}
		});
		$j(".redChannelSlider").slider({
			value: 255,
			min: 0,
			max: 255,
			range: "min",
			disabled:false,
			start:function(){
				flagImage++;
				$j(".filteredMainImage").hide();
				$j(".applySlider").hide();
				$j(".right_section").show();
				$j("#canvas").show();
				if(flagImage == 1){
					svgCanvas.initFilters();
				}				
			}
		});
		$j(".greenChannelSlider").slider({
			value: 255,
			min: 0,
			max: 255,
			range: "min",
			disabled:false,
			start:function(){
				flagImage++;
				$j(".filteredMainImage").hide();
				$j(".applySlider").hide();
				$j(".right_section").show();
				$j("#canvas").show();
				if(flagImage == 1){
					svgCanvas.initFilters();
				}				
			}
		});
		$j(".blueChannelSlider").slider({
			value: 255,
			min: 0,
			max: 255,
			range: "min",
			disabled:false,
			start:function(){
				flagImage++;
				$j(".filteredMainImage").hide();
				$j(".applySlider").hide();
				$j(".right_section").show();
				$j("#canvas").show();
				if(flagImage == 1){
					svgCanvas.initFilters();
				}				
			}
		});
	}
	svgedit.imageFilters.thumbClick = function(Curr){
		filter_selected = $j(Curr).parent().width() - $j(Curr).width();
		$j(".selected_filter").removeClass("selected_filter");
		$j(".active_filter").removeClass("active_filter");
		$j(Curr).next().addClass("selected_filter");
		$j(Curr).addClass("active_filter")
		$j(".selected_filter").css("margin-left", Math.round((($j(Curr).parent().width())-11) - filter_selected/2));
	} 
	
	svgedit.imageFilters.initColorFilters = function(colorMatrixId,mainImgPath,origFilteredImg, origFilteredThumb){
		if(!$j('.defaultfilter_btn').hasClass('active_filter')){
			filter_name = "default";
		}
		imageMatrixPath = mainImgPath;
		
		colorMatrixId = colorMatrixId+"Btn";
		
		$j("#"+colorMatrixId).attr("src", origFilteredThumb);
		$j("#"+colorMatrixId).attr("ref", origFilteredImg);
		$j("#"+colorMatrixId).attr("ref_matrix", colorMatrixId);
		
		selectedElement = $j(svgFactory_.getSelectedElements())[0];

		$j("#"+colorMatrixId).next().next().show();
		$j("#"+colorMatrixId).show();
		$j("#"+colorMatrixId).prev().hide()
		$j(".canvasLoader").hide();
	}
	
	svgedit.imageFilters.getImageData = function(data){
		origData = data;
	}
	
	svgedit.imageFilters.initFilters = function() {
		$j(".canvasLoader").show();
		selectedElement = $j(svgFactory_.getSelectedElements())[0];
		if($j(".filteredMainImage").attr("thumbfilter") == "true"){
			canvasMainImgPath = $j(".filteredMainImage").attr("src");
		}else{
			canvasMainImgPath = origData.main;
		}
//		$j(".selected_filter").remove();
		canvasMainImgPath = canvasMainImgPath.replace("cdn-media", "www");
		temp = null;
		temp = new createjs.ColorMatrixFilter([
			1,0,0,0,0, // red component
			0,1,0,0,0, // green component
			0,0,1,0,0, // blue component
			0,0,0,1,0,
			0,0,0,0,0
		]);
		filter_img = new Image();	
		filter_img.onload = createImages;
		filter_img.src = canvasMainImgPath;
	}
	
	var createStage = function(stage,canvas_stage){
		canvasStage = new createjs.Stage(stage)
		return (canvasStage)
	}
	
	var canvasAddChild = function(stage,bmp){
		stage.addChild(bmp);
	}
	
	var stageCache = function(bmp){
		if(s_x > s_y){
			bmp.cache(0,0,filter_img.width,filter_img.height, [scale=s_y-0.1]);
		}else{
			bmp.cache(0,0,filter_img.width,filter_img.height, [scale=s_x-0.1]);
		}
	}
	
	var stageCacheThumbnail = function(bmp){
		bmp.cache(0,0,filter_img.width,filter_img.height, [scale=s_x_thumbnail]);
	}
	
	var updateStageCache = function(bmp){
		bmp.updateCache();
	}
	
	var stageUpdate = function(stage){
		stage.update();
	}
	
	var createBmp = function(bmp){
		return (new createjs.Bitmap(filter_img));
	}
	
	var scaleBmp = function(bmp){
		if(s_x > s_y){
			bmp.scaleX = s_y
			bmp.scaleY = s_y;
		}else{
			bmp.scaleX = s_x
			bmp.scaleY = s_x;
		}
	}
	
	var scaleThumbBmp = function(bmp){
		if(s_x > s_y){
			bmp.scaleX = s_y_thumbnail
			bmp.scaleY = s_y_thumbnail;
		}else{
			bmp.scaleX = s_x_thumbnail
			bmp.scaleY = s_x_thumbnail;
		}
	}
	
	var clearCanvas = function(stage){
		stage.autoClear = true;
		stage.removeAllChildren();
		stageUpdate(stage)
	}	
	
	/*DOL design for mobile*/
	var static_const;
	if(window.innerWidth > 299 && window.innerWidth < 998 && svgEditor.curConfig.mobileActivate){
		static_const = 240;
	}else{
		static_const = 500;
	}
	
	var createImages = function(){
		canvas = document.getElementById("canvas");
		
		orig_width = selectedElement.getAttribute("orig_w");
		orig_height = selectedElement.getAttribute("orig_h");
		aspect_ratio = orig_width / orig_height;
		//var static_const = 500;
		
		if(window.innerWidth > 299 && window.innerWidth < 998 && svgEditor.curConfig.mobileActivate){
			if(orig_width < 250 && orig_height < 450){
				max_val = Math.max(orig_width, orig_height);
				static_const = max_val;
			}
			
			if(aspect_ratio >= 1 && aspect_ratio < 1.11111 && static_const == 250){
				static_const = 450 * aspect_ratio;
			}
			
			if(aspect_ratio < 1 && static_const == 250){
				static_const = 450;
			}
		}else{
			if(orig_width < 500 && orig_height < 450){
				max_val = Math.max(orig_width, orig_height);
				static_const = max_val;
			}
			
			if(aspect_ratio >= 1 && aspect_ratio < 1.11111 && static_const == 500){
				static_const = 450 * aspect_ratio;
			}
			
			if(aspect_ratio < 1 && static_const == 500){
				static_const = 450;
			}
		}
		
//		if(orig_width < 500 && orig_height < 450){
//			max_val = Math.max(orig_width, orig_height);
//			static_const = max_val;
//		}
//		
//		if(aspect_ratio >= 1 && aspect_ratio < 1.11111 && static_const == 500){
//			static_const = 450 * aspect_ratio;
//		}
//		
//		if(aspect_ratio < 1 && static_const == 500){
//			static_const = 450;
//		}
		
		defaultfilterBtn = document.getElementsByClassName("defaultfilter_btn");
		
		if(aspect_ratio > 1){
			canvas.setAttribute("width",static_const)
			c_h = static_const / aspect_ratio;
			canvas.setAttribute("height",c_h);	
		}else if(aspect_ratio <= 1){
			c_w = static_const * aspect_ratio;
			canvas.setAttribute("width",c_w);
			canvas.setAttribute("height",static_const);
		}
						
		canvasTopMargin = ($j(".canvas").height() - $j(".canvas canvas").height())/2;
		$j(".canvas canvas").css("margin-top", canvasTopMargin);
		
		$j(".right_section").css("display","block")
		
		stage = createStage(canvas);		
		
		bmp = createBmp(filter_img);
		
		var bounds = bmp.getBounds();
		s_x = canvas.getAttribute("width")/bounds.width;
		s_y = canvas.getAttribute("height")/bounds.height;
		
		scaleBmp(bmp)
		
		stageCache(bmp);		
		
		canvasAddChild(stage,bmp)
		
		handleImageLoad();
	}
	
	var handleImageLoad = function(){
		brightnessSlide = $j(".brightnessSlider").slider("option", "value");
		saturationSlide = $j(".saturationSlider").slider("option", "value");
		contrastSlide = $j(".contrastSlider").slider("option", "value");
		hueSlide = $j(".hueSlider").slider("option", "value");
		blurSlide = $j(".blurSlider").slider("option", "value");
		redSlide = $j(".redChannelSlider").slider("option", "value");
		greenSlide = $j(".greenChannelSlider").slider("option", "value");
		blueSlide = $j(".blueChannelSlider").slider("option", "value");
		
		$j("#apply_filters").click(function(){
			$j(".apply_filter").css("display","block")
		});
		$j(".defaultfilter_btn").click(function(){
			clearCanvas(stage);
		})
		$j(".brightnessSlider").slider({
			value: brightnessSlide,
			min: -100,
			max: 100,
			range: "min",
			disabled:false,
			change:handleChange,
			slide: handleSlide
		});
		$j(".saturationSlider").slider({
			value: saturationSlide,
			min: -100,
			max: 100,
			range: "min",
			disabled:false,
			change:handleChange,
			slide: handleSlide
		});
		$j(".contrastSlider").slider({
			value: contrastSlide,
			min: -50,
			max: 50,
			range: "min",
			disabled:false,
			change:handleChange,
			slide: handleSlide
		});
		$j(".hueSlider").slider({
			value: hueSlide,
			min: -180,
			max: 180,
			range: "min",
			disabled:false,
			change:handleChange,
			slide: handleSlide
		});
		$j(".blurSlider").slider({
			value: blurSlide,
			min: 0,
			max: 10,
			range: "min",
			disabled:false,
			change:handleChange,
			slide: handleSlide
		});
		$j(".redChannelSlider").slider({
			value: redSlide,
			min: 0,
			max: 255,
			range: "min",
			disabled:false,
			change:handleChange,
			slide: handleSlide
		});
		$j(".greenChannelSlider").slider({
			value: greenSlide,
			min: 0,
			max: 255,
			range: "min",
			disabled:false,
			change:handleChange,
			slide: handleSlide
		});
		$j(".blueChannelSlider").slider({
			value: blueSlide,
			min: 0,
			max: 255,
			range: "min",
			disabled:false,
			change:handleChange,
			slide: handleSlide
		});
		$j("#reset_filters").click(handleReset);
		
		applyEffect();
	}
	
	svgedit.imageFilters.handleImageReset = function() {
		filter_name = "default";
		$j(".selected_filter").removeClass("selected_filter");
		$j(".filteredMainImage").show();
		$j(".filteredMainImage").attr("src",imageMatrixPath);
		$j("#canvas").hide();
		svgCanvas.clickColorFilters(imageMatrixPath, 'default');
	}
	
	var adjustHue = function(value) {
		if (value == 0 || isNaN(value)) { return 0; }
		value = Math.min(180,Math.max(-180,value));
		value = value/180*Math.PI;
		var cosVal = Math.cos(value);
		var sinVal = Math.sin(value);
		var lumR = 0.213;
		var lumG = 0.715;
		var lumB = 0.072;
		var m1 = lumR+cosVal*(1-lumR)+sinVal*(-lumR), m2 = lumG+cosVal*(-lumG)+sinVal*(-lumG), m3 = lumB+cosVal*(-lumB)+sinVal*(1-lumB);
		var m4 = lumR+cosVal*(-lumR)+sinVal*(0.143), m5 = lumG+cosVal*(1-lumG)+sinVal*(0.140), m6 = lumB+cosVal*(-lumB)+sinVal*(-0.283);
		var m7 = lumR+cosVal*(-lumR)+sinVal*(-(1-lumR)), m8 = lumG+cosVal*(-lumG)+sinVal*(lumG), m9 = lumB+cosVal*(1-lumB)+sinVal*(lumB);
		hueMatrix = "5x5:"+m1+","+m2+","+m3+",0,0,"+m4+","+m5+","+m6+",0,0,"+m7+","+m8+","+m9+",0,0,0,0,0,1,0,0,0,0,0,1";
		return hueMatrix;
	};
	
	var adjustSaturation = function(value) {
		if (value == 0 || isNaN(value)) { return 0; }
		var x = 1+((value > 0) ? 3*value/100 : value/100);
		var lumR = 0.3086;
		var lumG = 0.6094;
		var lumB = 0.0820;
		saturationMatrix = "5x5:"+(parseFloat(lumR*(1-x))+parseFloat(x))+","+lumG*(1-x)+","+lumB*(1-x)+",0,0,"+lumR*(1-x)+","+(parseFloat(lumG*(1-x))+parseFloat(x))+","+lumB*(1-x)+",0,0,"+lumR*(1-x)+","+lumG*(1-x)+","+(parseFloat(lumB*(1-x))+parseFloat(x))+",0,0,0,0,0,1,0,0,0,0,0,1";
		return saturationMatrix;
	};
	
	var adjustContrast = function(value) {
		DELTA_INDEX = [
			0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11,
			0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.20, 0.21, 0.22, 0.24,
			0.25, 0.27, 0.28, 0.30, 0.32, 0.34, 0.36, 0.38, 0.40, 0.42,
			0.44, 0.46, 0.48, 0.5, 0.53, 0.56, 0.59, 0.62, 0.65, 0.68,
			0.71, 0.74, 0.77, 0.80, 0.83, 0.86, 0.89, 0.92, 0.95, 0.98,
			1.0, 1.06, 1.12, 1.18, 1.24, 1.30, 1.36, 1.42, 1.48, 1.54,
			1.60, 1.66, 1.72, 1.78, 1.84, 1.90, 1.96, 2.0, 2.12, 2.25,
			2.37, 2.50, 2.62, 2.75, 2.87, 3.0, 3.2, 3.4, 3.6, 3.8,
			4.0, 4.3, 4.7, 4.9, 5.0, 5.5, 6.0, 6.5, 6.8, 7.0,
			7.3, 7.5, 7.8, 8.0, 8.4, 8.7, 9.0, 9.4, 9.6, 9.8,
			10.0
		];
		
		if (value == 0 || isNaN(value)) { return 0; }
		value = Math.min(50,Math.max(-50,value));
		var x;
		if (value<0) {
			x = 127+value/100*127;
		} else {
			x = value%1;
			if (x == 0) {
				x = DELTA_INDEX[value];
			} else {
				x = DELTA_INDEX[(value<<0)]*(1-x)+DELTA_INDEX[(value<<0)+1]*x; // use linear interpolation for more granularity.
			}
			x = x*127+127;
		}
		contrastMatrix = "5x5:"+(x/127)+",0,0,0,"+(0.5*(127-x))+",0,"+(x/127)+",0,0,"+(0.5*(127-x))+",0,0,"+(x/127)+",0,"+(0.5*(127-x))+",0,0,0,1,0,0,0,0,0,1";
		return contrastMatrix;
	};
	
	var adjustBrightness = function(value) {
		if (value == 0 || isNaN(value)) { return 0; }
		brightnessMatrix = [
			1, 0.0, 0.0, 0.0, 0.0, value/255,
			0.0, 1, 0.0, 0.0, 0.0, value/255,
			0.0, 0.0, 1, 0.0, 0.0, value/255,
			0.0, 0.0, 0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 0.0, 1.0,  0.0,
			0.0, 0.0, 0.0, 0.0, 0.0,  1.0
			
		];
		return brightnessMatrix;
	};
	
	svgedit.imageFilters.save_filters = function(e){
		var brightnessValue = $j(".brightnessSlider").slider("option", "value");
		var contrastValue = $j(".contrastSlider").slider("option", "value");
		var saturationValue = $j(".saturationSlider").slider("option", "value");
		var hueValue = $j(".hueSlider").slider("option", "value");
		var blurValue = $j(".blurSlider").slider("option", "value");
		var redChannelvalue = $j(".redChannelSlider").slider("option", "value");
		var greenChannelValue = $j(".greenChannelSlider").slider("option", "value");
		var blueChannelValue = $j(".blueChannelSlider").slider("option", "value");
		
		r = redChannelvalue/255;
		g = greenChannelValue/255;
		b = blueChannelValue/255;	
		brightness = brightnessValue/255*100;
		contrast = adjustContrast(contrastValue);
		hue = adjustHue(hueValue);
		saturation = adjustSaturation(saturationValue);
		blr = (blurValue*3)/2.5;
		console.log(blr)
		undo_redo_url = selectedElement.getAttribute("xlink:href");
		undoMgr = svgCanvas.undoMgr;
		var batchCmd = new BatchCommand();
		$j('#updating_box').show();
		image_url = selectedElement.getAttribute("xlink:href");
		if(selectedElement.getAttribute("filtered_image") == "true"){
			image_url = selectedElement.getAttribute("xlink:href");
			image_url = image_url.replace("_filtered", "");
			if(image_url.indexOf("?ts") > 0){
				image_url = image_url.substring(0, image_url.indexOf("?ts"));
			}
		}
		filter_name = filter_name.split("Btn")[0];
		$j.ajax({url : "/dol/index/generateFilteredImage",					
			data : {'image_url':image_url,'r':r,'g':g,'b':b,'brightness':brightness,
			'saturation':saturation,'blr':blr,'hue':hue,'contrast':contrast,'filter_name':filter_name},
			type : "POST",
			success: function(data){
				selectedElement.setAttribute("filtered_image","true")
				selectedElement.setAttribute("xlink:href",data)
				  $j(new Image()).load(function() {
					  $j('#updating_box .desc-rendering').hide();
					  $j('#updating_box').hide();
				  }).attr('src',data);
					batchCmd.addSubCommand(new ChangeElementCommand(selectedElement, {'xlink:href': undo_redo_url}));
					if(!batchCmd.isEmpty()){
						svgCanvas.undoMgr.addCommandToHistory(batchCmd);
					}
					if (undoMgr.getUndoStackSize() > 0) {
						$j('#tool_undo').removeClass( 'disabled');
					}
					$j(".brightnessSlider").slider("option", "value", 0);
					$j(".saturationSlider").slider("option", "value", 0);
					$j(".hueSlider").slider("option", "value", 0);
					$j(".blurSlider").slider("option", "value", 0);
					$j(".contrastSlider").slider("option", "value", 0);
					$j(".redChannelSlider").slider("option", "value", 255);
					$j(".greenChannelSlider").slider("option", "value", 255);
					$j(".blueChannelSlider").slider("option", "value", 255);
			}
		});
		$j("#imagefilter_wrapper").dialog("close");
		
		clearCanvas(stage)
	}	
	
	svgedit.imageFilters.resetCurrentSlider = function($this){
		if($this.hasClass("resetRGBSlider")){
			$this.prev().slider("option", "value", 255);
		}else{
			$this.prev().slider("option", "value", 0);
		}
	}
	
	var handleSlide = function() {
		if (filter_slideInterval == -1) {
			filter_slideInterval = setInterval(applyEffect, 250);
		}
	}
	var handleChange = function() {
		clearInterval(filter_slideInterval);
		filter_slideInterval = -1;
		applyEffect();
	}
		
	var applyEffect = function() {
		var brightnessValue = $j(".brightnessSlider").slider("option", "value");
		var contrastValue = $j(".contrastSlider").slider("option", "value");
		var saturationValue = $j(".saturationSlider").slider("option", "value");
		var hueValue = $j(".hueSlider").slider("option", "value");
		var blurValue = $j(".blurSlider").slider("option", "value");
		var redChannelvalue = $j(".redChannelSlider").slider("option", "value");
		var greenChannelValue = $j(".greenChannelSlider").slider("option", "value");
		var blueChannelValue = $j(".blueChannelSlider").slider("option", "value");
		filter_cm = new createjs.ColorMatrix();
		var c = filter_cm.adjustColor(brightnessValue, contrastValue, saturationValue, hueValue);
		colorFilter = new createjs.ColorMatrixFilter(filter_cm);
		blurFilter = new createjs.BlurFilter(blurValue, blurValue, 2);
		redChannelFilter = new createjs.ColorFilter(redChannelvalue/255,1,1,1);
		greenChannelFilter = new createjs.ColorFilter(1,greenChannelValue/255,1,1);
		blueChannelFilter = new createjs.ColorFilter(1,1,blueChannelValue/255,1);
		
		if(updateImage()){
			$j(".canvasLoader").hide();
			$j(".default_filters_wrapper").mCustomScrollbar("update");
			canvasLeftMargin_thumb = ($j("#default_filters li").width() - $j(".defaultfilter_btn").width())/2;
			$j(".defaultfilter_btn").css("margin-left",canvasLeftMargin_thumb);	
			
			canvasLoadingLeft_thumb = ($j("#default_filters li").width() - $j(".loadingImg").width())/2;
			canvasLoadingTop_thumb = ($j("#default_filters li").height() - 28 - $j(".loadingImg").height())/2;
		}		
	}
	
	var handleReset = function() {
		filter_name = "default";
		$j(".selected_filter").removeClass("selected_filter");
		$j(".filteredMainImage").show();
		$j(".filteredMainImage").attr("src",imageMatrixPath);
		$j("#canvas").hide();
		$j(".brightnessSlider").slider("option", "value", 0);
		$j(".saturationSlider").slider("option", "value", 0);
		$j(".hueSlider").slider("option", "value", 0);
		$j(".blurSlider").slider("option", "value", 0);
		$j(".contrastSlider").slider("option", "value", 0);
		$j(".redChannelSlider").slider("option", "value", 255);
		$j(".greenChannelSlider").slider("option", "value", 255);
		$j(".blueChannelSlider").slider("option", "value", 255);
		applyEffect();
	}
	
	var updateImage = function() {
		bmp.filters = [colorFilter, blurFilter, redChannelFilter, greenChannelFilter, blueChannelFilter];
		                       
		updateStageCache(bmp);
		stageUpdate(stage)
		
		return true;
	}
	
	svgedit.imageFilters.init = function(config, svgFactory) {
		config_ = config;
		svgFactory_ = svgFactory;
	};
	
})();