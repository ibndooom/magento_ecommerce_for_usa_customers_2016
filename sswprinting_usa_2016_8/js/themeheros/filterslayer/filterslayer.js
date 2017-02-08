(function($) {
    $.FiltersLayer = function() {
      
       var plugin = this;
       
       var _title;
        /*
         * __init__
         */
        this.init = function() {
            initFilers();
        }
           
       /*
        *   Init Filter;
        *   return 
        */
        var initFilers = function(){
           _filterbyPrice(); 
        }
        
        /*
         * Ajax request to server
         * param min and max price
         */
        var _filterbyPrice = function(){
            var _params, url, temp;
            var _price = 'price=';
            if(plugin.url.indexOf('?') == -1) temp = '?'; 
            if(plugin.url.indexOf('?') != -1){
                plugin.url.indexOf('?price') == -1 ? temp = '&': temp = '?';
            }
             _price = temp+_price;
            plugin.min == plugin.max ? _params = _price+String(plugin.max): _params = _price+String(plugin.min).concat('-'+String(plugin.max));
            
            if(plugin.url.indexOf('price=') == -1){
                url = plugin.url+_params;
            }else{
                var _newUrl = $('.currently ol li a.price').attr('href');
                    url = window.decodeURIComponent(_newUrl+_params);
            }
            sendRequest(url,null);
        }
        
        
        /*
         * Function send Ajax Request
         */
        this.filterAttribute = function(){
            $.each($('#narrow-by-list li a, .block-layered-nav .currently ol li a.btn-remove, .block-layered-nav .actions a'),function(){
                $(this).click(function(event){
                    event.preventDefault();
                    if($(this).hasClass('checked_box')){
                        jQuery(this).removeClass('checked_box');
                    }else{
                        $(this).addClass('checked_box');
                    }
                    sendRequest($(this).attr('href'),null);
                });
            })
            
        }
        
        
        /*
         * Function send Ajax Request
         * return HTML
         * Param URL, Data
         */
        var sendRequest = function(url, data){
            $.ajax({
                type: "GET",
                url : url,
                data: data,
                timeout: 10000,
                async: true,
                cache: true,
                beforeSend: function() {
                      _title = document.title;
                      document.title = 'Connecting..';
                      var _height = $(document).height();
                      if($('.products-loader').length == 0){
                          $("body").append("<div class=\"imgage-loader\" style=\"z-index:9600; position: absolute;\" ><center><img style="+'position:fixed;top:50%;left:50%'+"  src='"+IMG_LOADING_PAGE+"' /></center></div><div style="+'height:'+_height+'px'+" class=\"products-loader\"></div>");
                      }else{
                          $('.products-loader').show();
                          $('.imgage-loader').show();
                      }
                },
                error: function(error) {
                     $('.products-loader').hide();
                     $('.imgage-loader').hide();
                },
                complete: function() {
                    $('.products-loader').hide();
                    $('.imgage-loader').hide();

                },
                success: function(result) {
                   plugin.wraper = result;
                   updateHTML();
                   updateTitle(url);
                   if(IS_AJAX_FILTER){
                    plugin.filterAttribute();
                   }
                   if(typeof(createSliderPrice) == 'function'){
                       createSliderPrice();
                   }
                }
            })
            
        }
        
        /*
         * update HTML in category page
         * retun void
         */
        var updateHTML = function(){
            var els = $("<div />").append(plugin.wraper);
            $(".col-main").html(els.find('.col-main').html());
            $(".block-layered-nav").html(els.find('.block-layered-nav').html());
            $(".block-cart").html(els.find('.block-cart').html())
        }
        
        
        var updateTitle = function(url){
            var locationUrl = window.decodeURIComponent(url);
            if (window.History && window.History.enabled) {
            	window.History.pushState(null,_title,locationUrl);
		return false;
             }
            document.title = _title;
        }
        
      }
    
     $.fn.FiltersLayer = function(minprice,maxprice,url) {
        /*
         * Set Slider with min price and max price
         * 
         */
        var plugin = new $.FiltersLayer();
            plugin.min = minprice;
            plugin.max = maxprice;
            plugin.url = url;
            plugin.init();
     }
     
     $.fn.applyFilter = function(){
           if(IS_AJAX_FILTER){
                var applyfilter = new $.FiltersLayer();
                applyfilter.filterAttribute();
           }
     }
})(jQuery);



 jQuery(document).ready(function() {
    jQuery().applyFilter();
 });