var dialogEditorPopup;

jQuery().ready(function(){
    jQuery('a.btn-edit-option').click(function(){
       jQuery.ajax(this.href,{
               dataType:'json',
               success:function(data){
                   if(data.messages!=''){
                       alert(data.messages);
                   }else{
                       dialogEditorPopup = jQuery.fancybox(data.html,{type : 'html'});
                   }
                  jcf.setOptions('Select', {
                      "wrapNative": false,
                      "wrapNativeOnMobile": false,
                      "useCustomScroll": false,
                      "multipleCompactStyle": true
                  });
                  jcf.replaceAll();
               }
           });
        return false;
    });
    jQuery('a.btn-view').click(function(){
        jQuery.ajax(this.href,{
            dataType:'json',
            success:function(data){
                jQuery('#design_view').html(data.html);
                jQuery('#design_view a.fancybox').fancybox({
                    hideOnContentClick: true,
                    loop: false
                });
                jQuery('#design_view a.fancybox:first-child').trigger('click');
            }
        });
        return false;
    });

});
