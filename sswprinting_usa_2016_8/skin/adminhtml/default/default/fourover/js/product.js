foverProduct = {
    
    optionsPopup: function(grid, evt) {
        var trElement = Event.findElement(evt, 'tr');
        var url = trElement.title;
 
        if ($('browser_window') && typeof(Windows) != 'undefined') {
            Windows.focus('browser_window');
            return;
        }
        var dialogWindow = Dialog.info(null, {
            closable:true,
            resizable:false,
            draggable:true,
            className:'magento',
            windowClassName:'popup-window',
            title:'Product Options',
            top:50,
            width:640,
            height:500,
            zIndex:1000,
            recenterAuto:false,
            hideEffect:Element.hide,
            showEffect:Element.show,
            id:'browser_window',
            url:url
        });
    }
}