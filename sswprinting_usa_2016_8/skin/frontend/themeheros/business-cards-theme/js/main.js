(function() {
	var phablet = 960;
	var productFormFlag = false;
	jQuery(document).ready(function($) {
		$(window).on('load resize', function(){
			matchHeightInit();
			if($(window).width() > phablet){
				var layared = jQuery('.block-layered-nav');
				var sidebar = jQuery('.sidebar-left');
				layared.slideDown('fast');
			} else {
				var layared = jQuery('.block-layered-nav');
				layared.slideUp('fast');
			}
			if($(window).width() > phablet){
				$(".nav-container").slideDown("fast");
				$(".menu-icon").removeClass('open');
			} else {
				$(".nav-container").slideUp("fast");
				var i = 0;
				$sub_nav = $('#nav > li.parent');
				$('#nav > li.parent').on('click' , '>a', function (e) {
					var $_self = $(this).parent("li.parent");
					if ($_self.hasClass('open_subnav')) {
						$_self.removeClass('open_subnav').find('ul.level0').slideUp('slow').removeClass('show');
						i = 1;
					} else {
						$('#nav > li.parent').removeClass('open_subnav').find('ul.level0').slideUp('slow').removeClass('show');
						if ($_self.find('.show')) {
							if (i == 0) {
								$_self.addClass('open_subnav').find('ul.level0').slideDown('slow').addClass('show');
								e.preventDefault($_self.siblings('>a'));
							} else {
							i++;
							}
						} else {
							$_self.addClass('open_subnav').find('ul.level0').slideDown('slow').addClass('show');
							i = 0;
						}
					}
				});
				$("#nav > li").on('click', function(event) {
					$("#nav > li").toggleClass('menu-active');
				});
			}
		});
		if($("#svg_editor.content").length == 0){
			jcf.setOptions('Select', {
				"wrapNative": false,
				"wrapNativeOnMobile": false,
				"useCustomScroll": false,
				"multipleCompactStyle": true
			});
			jcf.replaceAll();
			$('#attribute133').on('change', function(event) {
				jcf.replaceAll();
			});
			$("#checkout-payment-method-load").on('click', function(event) {
				jcf.replaceAll();
			});
			setTimeout(function() {
				$("#checkout-payment-method-load").trigger('click');
			}, 1500);
		};




		sliderInit();
		matchHeightInit();
		menuIcon();
		initTabs();
		initAccordion();
		layaredVisibility();
		detectSafari();

		var block_input = $('.block-login input');
		var block_login = $('.block-login');
		block_input.focus(function(){
			block_login.css({'display':'block'});
		});
		block_input.blur(function(){
			block_login.css({'display':''});
		});

		$('.postContent img').unwrap().wrap("<div class='post-img-outer f-right bord-light '></div>");

// toggleClass to tr, when you click on element width class="collaps_history"
		$('.collaps_history').click(function(e){
			$(this).parent().toggleClass('collaps_history_decor')
			$(this).parents('tr').addClass('collaps_history_close');
		});

		//bugs with reinit popup form on change on cart page
		var cartInterval;
		var cartFlag = false;
		reinitJSF();
		function reinitJSF(){
			$(".btn-edit-option").on('click', function (e) {
				cartInterval = setInterval(productFormJsf, 200);
				$('.product-cart-remove').addClass('disable');
			});
		}
		function productFormJsf() {
			if($("#product_addtocart_form").length && (!cartFlag)) {
				$('.product-custom-option').trigger('change');
				$("#product_addtocart_form").find("[type='button']").on("click", function() {
					$(".fancybox-close").trigger("click");
				});
				cartFlag = true;
			}
			$("#product_addtocart_form").find('select').on('change', function(){
				jcf.setOptions('Select', {
					"wrapNative": false,
					"wrapNativeOnMobile": false,
					"useCustomScroll": false,
					"multipleCompactStyle": true
				});
				jcf.replaceAll();
			});
			if(!($("#product_addtocart_form").length) && cartFlag) {
				cartFlag = false;
				clearInterval(cartInterval);
				cartInterval = false;
				$(".product-cart-remove").removeClass('disable');
				return;
			}
		};
	});
}());


// detect safari browser
function detectSafari(){
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('safari') != -1) {
		if (ua.indexOf('chrome') > -1) {
			jQuery('body').addClass('chrome');
		} else {
			jQuery('body').addClass('safari');
		}
	}
}

// layared navigation show or hide function
function layaredVisibility(){
	var layaredIco = jQuery('.js-layared-visibility');
	var layared = jQuery('.block-layered-nav');
	var sidebar = jQuery('.sidebar-left');
	layaredIco.on('click', function(event) {
		event.preventDefault();
		layared.slideToggle('slow');
		if(layared.hasClass('show-layared')){
			sidebar.removeClass('show-layared');
		} else {
			sidebar.addClass('show-layared');
		}
	});
}

// accordion menu init
function initAccordion() {
	jQuery('ul.accordion').slideAccordion({
		opener: 'a.opener',
		slider: 'div.slide',
		animSpeed: 300
	});
}

// content tabs init
function initTabs() {
	jQuery('ul.tabset').contentTabs({
		tabLinks: 'a'
	});
}

function menuIcon(){
	var button = document.querySelector('.menu-icon');
	button.addEventListener('click', function (){
		button.classList.toggle('open');
		jQuery(".nav-container").slideToggle("fast");
	});
}

// run same height for block
function matchHeightInit(){
	jQuery('.description h3').matchHeight();
	jQuery('.description .image-outer').matchHeight();
	jQuery('.annotation').matchHeight();
	jQuery('.testimonials .description').matchHeight();
	jQuery('.products-grid .product-image').matchHeight();
	jQuery('.products-grid .product-image').matchHeight();
}

// run slider definition
function sliderInit(){
	jQuery('.multi-banner').slick({
		dots: false,
		arrows: false,
		infinite: false,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true
	});
	jQuery('.home-banner-list').slick({
		dots: false,
		arrows: false,
		infinite: false,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		swipe: false,
		variableWidth: true
	});
	jQuery('.multi-banner').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		jQuery('.home-banner-list').slick('slickGoTo', nextSlide);
		currentPagerShow(nextSlide);
	});
	jQuery('.home-banner-list').on('click', '.slick-slide', function () {
		jQuery('.multi-banner').slick('slickGoTo', jQuery(this).data('slick-index'));
	});
	currentPagerShow();
	function currentPagerShow(elem) {
		var activeBigSlide = jQuery.type( elem ) === "number" ? elem : jQuery('.multi-banner').find('.slick-active').data('slick-index');
		jQuery('.home-banner-list .slick-slide').each(function () {
			(jQuery(this).data('slick-index') == activeBigSlide) ? jQuery(this).addClass('slick-active') : jQuery(this).removeClass('slick-active');
		})
	}





	jQuery('#bottom_testimonials').slick({
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		infinite: false
	});

	jQuery('#home_bottom_testimonials').slick({
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		infinite: false
	});
	jQuery('#home_bottom_testimonials').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		if(nextSlide>currentSlide){
			jQuery.ajax({
				url:testSlideUrl,
				type:"POST",
				data:{
					page:testSlidePage
				},
				success:function(data){
					if(data.length){
						jQuery('#home_bottom_testimonials').slick('slickAdd',data);
						testSlidePage++;
					}
				}
			});
		}
	});
};
