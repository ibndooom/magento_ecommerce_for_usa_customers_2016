/*!
 * jQuery UI 1.8.17
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 * 
 */(function(a,b){function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;if(!b.href||!g||f.nodeName.toLowerCase()!=="map")return!1;h=a("img[usemap=#"+g+"]")[0];return!!h&&d(h)}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}a.ui=a.ui||{};a.ui.version||(a.extend(a.ui,{version:"1.8.17",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a.each(["Width","Height"],function(c,d){function h(b,c,d,f){a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)});return c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){if(c===b)return g["inner"+d].call(this);return this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){if(typeof b!="number")return g["outer"+d].call(this,b);return this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!!d&&!!a.element[0].parentNode)for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;if(b[d]>0)return!0;b[d]=1,e=b[d]>0,b[d]=0;return e},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}}))})(jQuery),function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}});return d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e;if(f&&e.charAt(0)==="_")return h;f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b){h=f;return!1}}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))});return h}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}this._setOptions(e);return this},_setOptions:function(b){var c=this;a.each(b,function(a,b){c._setOption(a,b)});return this},_setOption:function(a,b){this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b);return this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);this.element.trigger(c,d);return!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}}(jQuery),function(a,b){var c=!1;a(document).mouseup(function(a){c=!1}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent")){a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation();return!1}}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(b){if(!c){this._mouseStarted&&this._mouseUp(b),this._mouseDownEvent=b;var d=this,e=b.which==1,f=typeof this.options.cancel=="string"&&b.target.nodeName?a(b.target).closest(this.options.cancel).length:!1;if(!e||f||!this._mouseCapture(b))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=this._mouseStart(b)!==!1;if(!this._mouseStarted){b.preventDefault();return!0}}!0===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),b.preventDefault(),c=!0;return!0}},_mouseMove:function(b){if(a.browser.msie&&!(document.documentMode>=9)&&!b.button)return this._mouseUp(b);if(this._mouseStarted){this._mouseDrag(b);return b.preventDefault()}this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b));return!this._mouseStarted},_mouseUp:function(b){a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b));return!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(a){return this.mouseDelayMet},_mouseStart:function(a){},_mouseDrag:function(a){},_mouseStop:function(a){},_mouseCapture:function(a){return!0}})}(jQuery),function(a,b){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},destroy:function(){if(!!this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy();return this}},_mouseCapture:function(b){var c=this.options;if(this.helper||c.disabled||a(b.target).is(".ui-resizable-handle"))return!1;this.handle=this._getHandle(b);if(!this.handle)return!1;c.iframeFix&&a(c.iframeFix===!0?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(a(this).offset()).appendTo("body")});return!0},_mouseStart:function(b){var c=this.options;this.helper=this._createHelper(b),this._cacheHelperProportions(),a.ui.ddmanager&&(a.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),c.containment&&this._setContainment();if(this._trigger("start",b)===!1){this._clear();return!1}this._cacheHelperProportions(),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this.helper.addClass("ui-draggable-dragging"),this._mouseDrag(b,!0),a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,b);return!0},_mouseDrag:function(b,c){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute");if(!c){var d=this._uiHash();if(this._trigger("drag",b,d)===!1){this._mouseUp({});return!1}this.position=d.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";a.ui.ddmanager&&a.ui.ddmanager.drag(this,b);return!1},_mouseStop:function(b){var c=!1;a.ui.ddmanager&&!this.options.dropBehaviour&&(c=a.ui.ddmanager.drop(this,b)),this.dropped&&(c=this.dropped,this.dropped=!1);if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original")return!1;if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===!0||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){var d=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){d._trigger("stop",b)!==!1&&d._clear()})}else this._trigger("stop",b)!==!1&&this._clear();return!1},_mouseUp:function(b){this.options.iframeFix===!0&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,b);return a.ui.mouse.prototype._mouseUp.call(this,b)},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();return this},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?!0:!1;a(this.options.handle,this.element).find("*").andSelf().each(function(){this==b.target&&(c=!0)});return c},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;d.parents("body").length||d.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo),d[0]!=this.element[0]&&!/(fixed|absolute)/.test(d.css("position"))&&d.css("position","absolute");return d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[b.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,b.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(b.containment=="document"?0:a(window).scrollLeft())+a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(b.containment=="document"?0:a(window).scrollTop())+(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)&&b.containment.constructor!=Array){var c=a(b.containment),d=c[0];if(!d)return;var e=c.offset(),f=a(d).css("overflow")!="hidden";this.containment=[(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0),(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0),(f?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(f?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=c}else b.containment.constructor==Array&&(this.containment=b.containment)},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName),f=b.pageX,g=b.pageY;if(this.originalPosition){var h;if(this.containment){if(this.relative_container){var i=this.relative_container.offset();h=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]}else h=this.containment;b.pageX-this.offset.click.left<h[0]&&(f=h[0]+this.offset.click.left),b.pageY-this.offset.click.top<h[1]&&(g=h[1]+this.offset.click.top),b.pageX-this.offset.click.left>h[2]&&(f=h[2]+this.offset.click.left),b.pageY-this.offset.click.top>h[3]&&(g=h[3]+this.offset.click.top)}if(c.grid){var j=c.grid[1]?this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1]:this.originalPageY;g=h?j-this.offset.click.top<h[1]||j-this.offset.click.top>h[3]?j-this.offset.click.top<h[1]?j+c.grid[1]:j-c.grid[1]:j:j;var k=c.grid[0]?this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0]:this.originalPageX;f=h?k-this.offset.click.left<h[0]||k-this.offset.click.left>h[2]?k-this.offset.click.left<h[0]?k+c.grid[0]:k-c.grid[0]:k:k}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(b,c,d){d=d||this._uiHash(),a.ui.plugin.call(this,b,[c,d]),b=="drag"&&(this.positionAbs=this._convertPositionTo("absolute"));return a.Widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(a){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),a.extend(a.ui.draggable,{version:"1.8.17"}),a.ui.plugin.add("draggable","connectToSortable",{start:function(b,c){var d=a(this).data("draggable"),e=d.options,f=a.extend({},c,{item:d.element});d.sortables=[],a(e.connectToSortable).each(function(){var c=a.data(this,"sortable");c&&!c.options.disabled&&(d.sortables.push({instance:c,shouldRevert:c.options.revert}),c.refreshPositions(),c._trigger("activate",b,f))})},stop:function(b,c){var d=a(this).data("draggable"),e=a.extend({},c,{item:d.element});a.each(d.sortables,function(){this.instance.isOver?(this.instance.isOver=0,d.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(b),this.instance.options.helper=this.instance.options._helper,d.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",b,e))})},drag:function(b,c){var d=a(this).data("draggable"),e=this,f=function(b){var c=this.offset.click.top,d=this.offset.click.left,e=this.positionAbs.top,f=this.positionAbs.left,g=b.height,h=b.width,i=b.top,j=b.left;return a.ui.isOver(e+c,f+d,i,j,g,h)};a.each(d.sortables,function(f){this.instance.positionAbs=d.positionAbs,this.instance.helperProportions=d.helperProportions,this.instance.offset.click=d.offset.click,this.instance._intersectsWith(this.instance.containerCache)?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return c.helper[0]},b.target=this.instance.currentItem[0],this.instance._mouseCapture(b,!0),this.instance._mouseStart(b,!0,!0),this.instance.offset.click.top=d.offset.click.top,this.instance.offset.click.left=d.offset.click.left,this.instance.offset.parent.left-=d.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=d.offset.parent.top-this.instance.offset.parent.top,d._trigger("toSortable",b),d.dropped=this.instance.element,d.currentItem=d.element,this.instance.fromOutside=d),this.instance.currentItem&&this.instance._mouseDrag(b)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",b,this.instance._uiHash(this.instance)),this.instance._mouseStop(b,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),d._trigger("fromSortable",b),d.dropped=!1)})}}),a.ui.plugin.add("draggable","cursor",{start:function(b,c){var d=a("body"),e=a(this).data("draggable").options;d.css("cursor")&&(e._cursor=d.css("cursor")),d.css("cursor",e.cursor)},stop:function(b,c){var d=a(this).data("draggable").options;d._cursor&&a("body").css("cursor",d._cursor)}}),a.ui.plugin.add("draggable","opacity",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("opacity")&&(e._opacity=d.css("opacity")),d.css("opacity",e.opacity)},stop:function(b,c){var d=a(this).data("draggable").options;d._opacity&&a(c.helper).css("opacity",d._opacity)}}),a.ui.plugin.add("draggable","scroll",{start:function(b,c){var d=a(this).data("draggable");d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"&&(d.overflowOffset=d.scrollParent.offset())},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=!1;if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"){if(!e.axis||e.axis!="x")d.overflowOffset.top+d.scrollParent[0].offsetHeight-b.pageY<e.scrollSensitivity?d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop+e.scrollSpeed:b.pageY-d.overflowOffset.top<e.scrollSensitivity&&(d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop-e.scrollSpeed);if(!e.axis||e.axis!="y")d.overflowOffset.left+d.scrollParent[0].offsetWidth-b.pageX<e.scrollSensitivity?d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft+e.scrollSpeed:b.pageX-d.overflowOffset.left<e.scrollSensitivity&&(d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft-e.scrollSpeed)}else{if(!e.axis||e.axis!="x")b.pageY-a(document).scrollTop()<e.scrollSensitivity?f=a(document).scrollTop(a(document).scrollTop()-e.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<e.scrollSensitivity&&(f=a(document).scrollTop(a(document).scrollTop()+e.scrollSpeed));if(!e.axis||e.axis!="y")b.pageX-a(document).scrollLeft()<e.scrollSensitivity?f=a(document).scrollLeft(a(document).scrollLeft()-e.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<e.scrollSensitivity&&(f=a(document).scrollLeft(a(document).scrollLeft()+e.scrollSpeed))}f!==!1&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(d,b)}}),a.ui.plugin.add("draggable","snap",{start:function(b,c){var d=a(this).data("draggable"),e=d.options;d.snapElements=[],a(e.snap.constructor!=String?e.snap.items||":data(draggable)":e.snap).each(function(){var b=a(this),c=b.offset();this!=d.element[0]&&d.snapElements.push({item:this,width:b.outerWidth(),height:b.outerHeight(),top:c.top,left:c.left})})},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=e.snapTolerance,g=c.offset.left,h=g+d.helperProportions.width,i=c.offset.top,j=i+d.helperProportions.height;for(var k=d.snapElements.length-1;k>=0;k--){var l=d.snapElements[k].left,m=l+d.snapElements[k].width,n=d.snapElements[k].top,o=n+d.snapElements[k].height;if(!(l-f<g&&g<m+f&&n-f<i&&i<o+f||l-f<g&&g<m+f&&n-f<j&&j<o+f||l-f<h&&h<m+f&&n-f<i&&i<o+f||l-f<h&&h<m+f&&n-f<j&&j<o+f)){d.snapElements[k].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=!1;continue}if(e.snapMode!="inner"){var p=Math.abs(n-j)<=f,q=Math.abs(o-i)<=f,r=Math.abs(l-h)<=f,s=Math.abs(m-g)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n-d.helperProportions.height,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l-d.helperProportions.width}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m}).left-d.margins.left)}var t=p||q||r||s;if(e.snapMode!="outer"){var p=Math.abs(n-i)<=f,q=Math.abs(o-j)<=f,r=Math.abs(l-g)<=f,s=Math.abs(m-h)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o-d.helperProportions.height,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m-d.helperProportions.width}).left-d.margins.left)}!d.snapElements[k].snapping&&(p||q||r||s||t)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=p||q||r||s||t}}}),a.ui.plugin.add("draggable","stack",{start:function(b,c){var d=a(this).data("draggable").options,e=a.makeArray(a(d.stack)).sort(function(b,c){return(parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0)});if(!!e.length){var f=parseInt(e[0].style.zIndex)||0;a(e).each(function(a){this.style.zIndex=f+a}),this[0].style.zIndex=f+e.length}}}),a.ui.plugin.add("draggable","zIndex",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("zIndex")&&(e._zIndex=d.css("zIndex")),d.css("zIndex",e.zIndex)},stop:function(b,c){var d=a(this).data("draggable").options;d._zIndex&&a(c.helper).css("zIndex",d._zIndex)}})}(jQuery),function(a,b){a.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect"},_create:function(){var b=this.options,c=b.accept;this.isover=0,this.isout=1,this.accept=a.isFunction(c)?c:function(a){return a.is(c)},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},a.ui.ddmanager.droppables[b.scope]=a.ui.ddmanager.droppables[b.scope]||[],a.ui.ddmanager.droppables[b.scope].push(this),b.addClasses&&this.element.addClass("ui-droppable")},destroy:function(){var b=a.ui.ddmanager.droppables[this.options.scope];for(var c=0;c<b.length;c++)b[c]==this&&b.splice(c,1);this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");return this},_setOption:function(b,c){b=="accept"&&(this.accept=a.isFunction(c)?c:function(a){return a.is(c)}),a.Widget.prototype._setOption.apply(this,arguments)},_activate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),c&&this._trigger("activate",b,this.ui(c))},_deactivate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),c&&this._trigger("deactivate",b,this.ui(c))},_over:function(b){var c=a.ui.ddmanager.current;!!c&&(c.currentItem||c.element)[0]!=this.element[0]&&this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",b,this.ui(c)))},_out:function(b){var c=a.ui.ddmanager.current;!!c&&(c.currentItem||c.element)[0]!=this.element[0]&&this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",b,this.ui(c)))},_drop:function(b,c){var d=c||a.ui.ddmanager.current;if(!d||(d.currentItem||d.element)[0]==this.element[0])return!1;var e=!1;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var b=a.data(this,"droppable");if(b.options.greedy&&!b.options.disabled&&b.options.scope==d.options.scope&&b.accept.call(b.element[0],d.currentItem||d.element)&&a.ui.intersect(d,a.extend(b,{offset:b.element.offset()}),b.options.tolerance)){e=!0;return!1}});if(e)return!1;if(this.accept.call(this.element[0],d.currentItem||d.element)){this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",b,this.ui(d));return this.element}return!1},ui:function(a){return{draggable:a.currentItem||a.element,helper:a.helper,position:a.position,offset:a.positionAbs}}}),a.extend(a.ui.droppable,{version:"1.8.17"}),a.ui.intersect=function(b,c,d){if(!c.offset)return!1;var e=(b.positionAbs||b.position.absolute).left,f=e+b.helperProportions.width,g=(b.positionAbs||b.position.absolute).top,h=g+b.helperProportions.height,i=c.offset.left,j=i+c.proportions.width,k=c.offset.top,l=k+c.proportions.height;switch(d){case"fit":return i<=e&&f<=j&&k<=g&&h<=l;case"intersect":return i<e+b.helperProportions.width/2&&f-b.helperProportions.width/2<j&&k<g+b.helperProportions.height/2&&h-b.helperProportions.height/2<l;case"pointer":var m=(b.positionAbs||b.position.absolute).left+(b.clickOffset||b.offset.click).left,n=(b.positionAbs||b.position.absolute).top+(b.clickOffset||b.offset.click).top,o=a.ui.isOver(n,m,k,i,c.proportions.height,c.proportions.width);return o;case"touch":return(g>=k&&g<=l||h>=k&&h<=l||g<k&&h>l)&&(e>=i&&e<=j||f>=i&&f<=j||e<i&&f>j);default:return!1}},a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(b,c){var d=a.ui.ddmanager.droppables[b.options.scope]||[],e=c?c.type:null,f=(b.currentItem||b.element).find(":data(droppable)").andSelf();droppablesLoop:for(var g=0;g<d.length;g++){if(d[g].options.disabled||b&&!d[g].accept.call(d[g].element[0],b.currentItem||b.element))continue;for(var h=0;h<f.length;h++)if(f[h]==d[g].element[0]){d[g].proportions.height=0;continue droppablesLoop}d[g].visible=d[g].element.css("display")!="none";if(!d[g].visible)continue;e=="mousedown"&&d[g]._activate.call(d[g],c),d[g].offset=d[g].element.offset(),d[g].proportions={width:d[g].element[0].offsetWidth,height:d[g].element
[0].offsetHeight}}},drop:function(b,c){var d=!1;a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){!this.options||(!this.options.disabled&&this.visible&&a.ui.intersect(b,this,this.options.tolerance)&&(d=this._drop.call(this,c)||d),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],b.currentItem||b.element)&&(this.isout=1,this.isover=0,this._deactivate.call(this,c)))});return d},dragStart:function(b,c){b.element.parents(":not(body,html)").bind("scroll.droppable",function(){b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c)})},drag:function(b,c){b.options.refreshPositions&&a.ui.ddmanager.prepareOffsets(b,c),a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){if(!(this.options.disabled||this.greedyChild||!this.visible)){var d=a.ui.intersect(b,this,this.options.tolerance),e=!d&&this.isover==1?"isout":d&&this.isover==0?"isover":null;if(!e)return;var f;if(this.options.greedy){var g=this.element.parents(":data(droppable):eq(0)");g.length&&(f=a.data(g[0],"droppable"),f.greedyChild=e=="isover"?1:0)}f&&e=="isover"&&(f.isover=0,f.isout=1,f._out.call(f,c)),this[e]=1,this[e=="isout"?"isover":"isout"]=0,this[e=="isover"?"_over":"_out"].call(this,c),f&&e=="isout"&&(f.isout=0,f.isover=1,f._over.call(f,c))}})},dragStop:function(b,c){b.element.parents(":not(body,html)").unbind("scroll.droppable"),b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c)}}}(jQuery),function(a,b){a.widget("ui.resizable",a.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1e3},_create:function(){var b=this,c=this.options;this.element.addClass("ui-resizable"),a.extend(this,{_aspectRatio:!!c.aspectRatio,aspectRatio:c.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:c.helper||c.ghost||c.animate?c.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(/relative/.test(this.element.css("position"))&&a.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"}),this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("resizable",this.element.data("resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=c.handles||(a(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se");if(this.handles.constructor==String){this.handles=="all"&&(this.handles="n,e,s,w,se,sw,ne,nw");var d=this.handles.split(",");this.handles={};for(var e=0;e<d.length;e++){var f=a.trim(d[e]),g="ui-resizable-"+f,h=a('<div class="ui-resizable-handle '+g+'"></div>');/sw|se|ne|nw/.test(f)&&h.css({zIndex:++c.zIndex}),"se"==f&&h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[f]=".ui-resizable-"+f,this.element.append(h)}}this._renderAxis=function(b){b=b||this.element;for(var c in this.handles){this.handles[c].constructor==String&&(this.handles[c]=a(this.handles[c],this.element).show());if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var d=a(this.handles[c],this.element),e=0;e=/sw|ne|nw|se|n|s/.test(c)?d.outerHeight():d.outerWidth();var f=["padding",/ne|nw|n/.test(c)?"Top":/se|sw|s/.test(c)?"Bottom":/^e$/.test(c)?"Right":"Left"].join("");b.css(f,e),this._proportionallyResize()}if(!a(this.handles[c]).length)continue}},this._renderAxis(this.element),this._handles=a(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){if(!b.resizing){if(this.className)var a=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=a&&a[1]?a[1]:"se"}}),c.autoHide&&(this._handles.hide(),a(this.element).addClass("ui-resizable-autohide").hover(function(){c.disabled||(a(this).removeClass("ui-resizable-autohide"),b._handles.show())},function(){c.disabled||b.resizing||(a(this).addClass("ui-resizable-autohide"),b._handles.hide())})),this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(b){a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){b(this.element);var c=this.element;c.after(this.originalElement.css({position:c.css("position"),width:c.outerWidth(),height:c.outerHeight(),top:c.css("top"),left:c.css("left")})).remove()}this.originalElement.css("resize",this.originalResizeStyle),b(this.originalElement);return this},_mouseCapture:function(b){var c=!1;for(var d in this.handles)a(this.handles[d])[0]==b.target&&(c=!0);return!this.options.disabled&&c},_mouseStart:function(b){var d=this.options,e=this.element.position(),f=this.element;this.resizing=!0,this.documentScroll={top:a(document).scrollTop(),left:a(document).scrollLeft()},(f.is(".ui-draggable")||/absolute/.test(f.css("position")))&&f.css({position:"absolute",top:e.top,left:e.left}),a.browser.opera&&/relative/.test(f.css("position"))&&f.css({position:"relative",top:"auto",left:"auto"}),this._renderProxy();var g=c(this.helper.css("left")),h=c(this.helper.css("top"));d.containment&&(g+=a(d.containment).scrollLeft()||0,h+=a(d.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:g,top:h},this.size=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalSize=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalPosition={left:g,top:h},this.sizeDiff={width:f.outerWidth()-f.width(),height:f.outerHeight()-f.height()},this.originalMousePosition={left:b.pageX,top:b.pageY},this.aspectRatio=typeof d.aspectRatio=="number"?d.aspectRatio:this.originalSize.width/this.originalSize.height||1;var i=a(".ui-resizable-"+this.axis).css("cursor");a("body").css("cursor",i=="auto"?this.axis+"-resize":i),f.addClass("ui-resizable-resizing"),this._propagate("start",b);return!0},_mouseDrag:function(b){var c=this.helper,d=this.options,e={},f=this,g=this.originalMousePosition,h=this.axis,i=b.pageX-g.left||0,j=b.pageY-g.top||0,k=this._change[h];if(!k)return!1;var l=k.apply(this,[b,i,j]),m=a.browser.msie&&a.browser.version<7,n=this.sizeDiff;this._updateVirtualBoundaries(b.shiftKey);if(this._aspectRatio||b.shiftKey)l=this._updateRatio(l,b);l=this._respectSize(l,b),this._propagate("resize",b),c.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"}),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),this._updateCache(l),this._trigger("resize",b,this.ui());return!1},_mouseStop:function(b){this.resizing=!1;var c=this.options,d=this;if(this._helper){var e=this._proportionallyResizeElements,f=e.length&&/textarea/i.test(e[0].nodeName),g=f&&a.ui.hasScroll(e[0],"left")?0:d.sizeDiff.height,h=f?0:d.sizeDiff.width,i={width:d.helper.width()-h,height:d.helper.height()-g},j=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null,k=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;c.animate||this.element.css(a.extend(i,{top:k,left:j})),d.helper.height(d.size.height),d.helper.width(d.size.width),this._helper&&!c.animate&&this._proportionallyResize()}a("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",b),this._helper&&this.helper.remove();return!1},_updateVirtualBoundaries:function(a){var b=this.options,c,e,f,g,h;h={minWidth:d(b.minWidth)?b.minWidth:0,maxWidth:d(b.maxWidth)?b.maxWidth:Infinity,minHeight:d(b.minHeight)?b.minHeight:0,maxHeight:d(b.maxHeight)?b.maxHeight:Infinity};if(this._aspectRatio||a)c=h.minHeight*this.aspectRatio,f=h.minWidth/this.aspectRatio,e=h.maxHeight*this.aspectRatio,g=h.maxWidth/this.aspectRatio,c>h.minWidth&&(h.minWidth=c),f>h.minHeight&&(h.minHeight=f),e<h.maxWidth&&(h.maxWidth=e),g<h.maxHeight&&(h.maxHeight=g);this._vBoundaries=h},_updateCache:function(a){var b=this.options;this.offset=this.helper.offset(),d(a.left)&&(this.position.left=a.left),d(a.top)&&(this.position.top=a.top),d(a.height)&&(this.size.height=a.height),d(a.width)&&(this.size.width=a.width)},_updateRatio:function(a,b){var c=this.options,e=this.position,f=this.size,g=this.axis;d(a.height)?a.width=a.height*this.aspectRatio:d(a.width)&&(a.height=a.width/this.aspectRatio),g=="sw"&&(a.left=e.left+(f.width-a.width),a.top=null),g=="nw"&&(a.top=e.top+(f.height-a.height),a.left=e.left+(f.width-a.width));return a},_respectSize:function(a,b){var c=this.helper,e=this._vBoundaries,f=this._aspectRatio||b.shiftKey,g=this.axis,h=d(a.width)&&e.maxWidth&&e.maxWidth<a.width,i=d(a.height)&&e.maxHeight&&e.maxHeight<a.height,j=d(a.width)&&e.minWidth&&e.minWidth>a.width,k=d(a.height)&&e.minHeight&&e.minHeight>a.height;j&&(a.width=e.minWidth),k&&(a.height=e.minHeight),h&&(a.width=e.maxWidth),i&&(a.height=e.maxHeight);var l=this.originalPosition.left+this.originalSize.width,m=this.position.top+this.size.height,n=/sw|nw|w/.test(g),o=/nw|ne|n/.test(g);j&&n&&(a.left=l-e.minWidth),h&&n&&(a.left=l-e.maxWidth),k&&o&&(a.top=m-e.minHeight),i&&o&&(a.top=m-e.maxHeight);var p=!a.width&&!a.height;p&&!a.left&&a.top?a.top=null:p&&!a.top&&a.left&&(a.left=null);return a},_proportionallyResize:function(){var b=this.options;if(!!this._proportionallyResizeElements.length){var c=this.helper||this.element;for(var d=0;d<this._proportionallyResizeElements.length;d++){var e=this._proportionallyResizeElements[d];if(!this.borderDif){var f=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],g=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];this.borderDif=a.map(f,function(a,b){var c=parseInt(a,10)||0,d=parseInt(g[b],10)||0;return c+d})}if(a.browser.msie&&(!!a(c).is(":hidden")||!!a(c).parents(":hidden").length))continue;e.css({height:c.height()-this.borderDif[0]-this.borderDif[2]||0,width:c.width()-this.borderDif[1]-this.borderDif[3]||0})}}},_renderProxy:function(){var b=this.element,c=this.options;this.elementOffset=b.offset();if(this._helper){this.helper=this.helper||a('<div style="overflow:hidden;"></div>');var d=a.browser.msie&&a.browser.version<7,e=d?1:0,f=d?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+f,height:this.element.outerHeight()+f,position:"absolute",left:this.elementOffset.left-e+"px",top:this.elementOffset.top-e+"px",zIndex:++c.zIndex}),this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(a,b,c){return{width:this.originalSize.width+b}},w:function(a,b,c){var d=this.options,e=this.originalSize,f=this.originalPosition;return{left:f.left+b,width:e.width-b}},n:function(a,b,c){var d=this.options,e=this.originalSize,f=this.originalPosition;return{top:f.top+c,height:e.height-c}},s:function(a,b,c){return{height:this.originalSize.height+c}},se:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},sw:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,c,d]))},ne:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},nw:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,c,d]))}},_propagate:function(b,c){a.ui.plugin.call(this,b,[c,this.ui()]),b!="resize"&&this._trigger(b,c,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),a.extend(a.ui.resizable,{version:"1.8.17"}),a.ui.plugin.add("resizable","alsoResize",{start:function(b,c){var d=a(this).data("resizable"),e=d.options,f=function(b){a(b).each(function(){var b=a(this);b.data("resizable-alsoresize",{width:parseInt(b.width(),10),height:parseInt(b.height(),10),left:parseInt(b.css("left"),10),top:parseInt(b.css("top"),10),position:b.css("position")})})};typeof e.alsoResize=="object"&&!e.alsoResize.parentNode?e.alsoResize.length?(e.alsoResize=e.alsoResize[0],f(e.alsoResize)):a.each(e.alsoResize,function(a){f(a)}):f(e.alsoResize)},resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.originalSize,g=d.originalPosition,h={height:d.size.height-f.height||0,width:d.size.width-f.width||0,top:d.position.top-g.top||0,left:d.position.left-g.left||0},i=function(b,e){a(b).each(function(){var b=a(this),f=a(this).data("resizable-alsoresize"),g={},i=e&&e.length?e:b.parents(c.originalElement[0]).length?["width","height"]:["width","height","top","left"];a.each(i,function(a,b){var c=(f[b]||0)+(h[b]||0);c&&c>=0&&(g[b]=c||null)}),a.browser.opera&&/relative/.test(b.css("position"))&&(d._revertToRelativePosition=!0,b.css({position:"absolute",top:"auto",left:"auto"})),b.css(g)})};typeof e.alsoResize=="object"&&!e.alsoResize.nodeType?a.each(e.alsoResize,function(a,b){i(a,b)}):i(e.alsoResize)},stop:function(b,c){var d=a(this).data("resizable"),e=d.options,f=function(b){a(b).each(function(){var b=a(this);b.css({position:b.data("resizable-alsoresize").position})})};d._revertToRelativePosition&&(d._revertToRelativePosition=!1,typeof e.alsoResize=="object"&&!e.alsoResize.nodeType?a.each(e.alsoResize,function(a){f(a)}):f(e.alsoResize)),a(this).removeData("resizable-alsoresize")}}),a.ui.plugin.add("resizable","animate",{stop:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d._proportionallyResizeElements,g=f.length&&/textarea/i.test(f[0].nodeName),h=g&&a.ui.hasScroll(f[0],"left")?0:d.sizeDiff.height,i=g?0:d.sizeDiff.width,j={width:d.size.width-i,height:d.size.height-h},k=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null,l=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;d.element.animate(a.extend(j,l&&k?{top:l,left:k}:{}),{duration:e.animateDuration,easing:e.animateEasing,step:function(){var c={width:parseInt(d.element.css("width"),10),height:parseInt(d.element.css("height"),10),top:parseInt(d.element.css("top"),10),left:parseInt(d.element.css("left"),10)};f&&f.length&&a(f[0]).css({width:c.width,height:c.height}),d._updateCache(c),d._propagate("resize",b)}})}}),a.ui.plugin.add("resizable","containment",{start:function(b,d){var e=a(this).data("resizable"),f=e.options,g=e.element,h=f.containment,i=h instanceof a?h.get(0):/parent/.test(h)?g.parent().get(0):h;if(!!i){e.containerElement=a(i);if(/document/.test(h)||h==document)e.containerOffset={left:0,top:0},e.containerPosition={left:0,top:0},e.parentData={element:a(document),left:0,top:0,width:a(document).width(),height:a(document).height()||document.body.parentNode.scrollHeight};else{var j=a(i),k=[];a(["Top","Right","Left","Bottom"]).each(function(a,b){k[a]=c(j.css("padding"+b))}),e.containerOffset=j.offset(),e.containerPosition=j.position(),e.containerSize={height:j.innerHeight()-k[3],width:j.innerWidth()-k[1]};var l=e.containerOffset,m=e.containerSize.height,n=e.containerSize.width,o=a.ui.hasScroll(i,"left")?i.scrollWidth:n,p=a.ui.hasScroll(i)?i.scrollHeight:m;e.parentData={element:i,left:l.left,top:l.top,width:o,height:p}}}},resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.containerSize,g=d.containerOffset,h=d.size,i=d.position,j=d._aspectRatio||b.shiftKey,k={top:0,left:0},l=d.containerElement;l[0]!=document&&/static/.test(l.css("position"))&&(k=g),i.left<(d._helper?g.left:0)&&(d.size.width=d.size.width+(d._helper?d.position.left-g.left:d.position.left-k.left),j&&(d.size.height=d.size.width/e.aspectRatio),d.position.left=e.helper?g.left:0),i.top<(d._helper?g.top:0)&&(d.size.height=d.size.height+(d._helper?d.position.top-g.top:d.position.top),j&&(d.size.width=d.size.height*e.aspectRatio),d.position.top=d._helper?g.top:0),d.offset.left=d.parentData.left+d.position.left,d.offset.top=d.parentData.top+d.position.top;var m=Math.abs((d._helper?d.offset.left-k.left:d.offset.left-k.left)+d.sizeDiff.width),n=Math.abs((d._helper?d.offset.top-k.top:d.offset.top-g.top)+d.sizeDiff.height),o=d.containerElement.get(0)==d.element.parent().get(0),p=/relative|absolute/.test(d.containerElement.css("position"));o&&p&&(m-=d.parentData.left),m+d.size.width>=d.parentData.width&&(d.size.width=d.parentData.width-m,j&&(d.size.height=d.size.width/d.aspectRatio)),n+d.size.height>=d.parentData.height&&(d.size.height=d.parentData.height-n,j&&(d.size.width=d.size.height*d.aspectRatio))},stop:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.position,g=d.containerOffset,h=d.containerPosition,i=d.containerElement,j=a(d.helper),k=j.offset(),l=j.outerWidth()-d.sizeDiff.width,m=j.outerHeight()-d.sizeDiff.height;d._helper&&!e.animate&&/relative/.test(i.css("position"))&&a(this).css({left:k.left-h.left-g.left,width:l,height:m}),d._helper&&!e.animate&&/static/.test(i.css("position"))&&a(this).css({left:k.left-h.left-g.left,width:l,height:m})}}),a.ui.plugin.add("resizable","ghost",{start:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.size;d.ghost=d.originalElement.clone(),d.ghost.css({opacity:.25,display:"block",position:"relative",height:f.height,width:f.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof e.ghost=="string"?e.ghost:""),d.ghost.appendTo(d.helper)},resize:function(b,c){var d=a(this).data("resizable"),e=d.options;d.ghost&&d.ghost.css({position:"relative",height:d.size.height,width:d.size.width})},stop:function(b,c){var d=a(this).data("resizable"),e=d.options;d.ghost&&d.helper&&d.helper.get(0).removeChild(d.ghost.get(0))}}),a.ui.plugin.add("resizable","grid",{resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.size,g=d.originalSize,h=d.originalPosition,i=d.axis,j=e._aspectRatio||b.shiftKey;e.grid=typeof e.grid=="number"?[e.grid,e.grid]:e.grid;var k=Math.round((f.width-g.width)/(e.grid[0]||1))*(e.grid[0]||1),l=Math.round((f.height-g.height)/(e.grid[1]||1))*(e.grid[1]||1);/^(se|s|e)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l):/^(ne)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l,d.position.top=h.top-l):/^(sw)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l,d.position.left=h.left-k):(d.size.width=g.width+k,d.size.height=g.height+l,d.position.top=h.top-l,d.position.left=h.left-k)}});var c=function(a){return parseInt(a,10)||0},d=function(a){return!isNaN(parseInt(a,10))}}(jQuery),function(a,b){a.widget("ui.selectable",a.ui.mouse,{options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch"},_create:function(){var b=this;this.element.addClass("ui-selectable"),this.dragged=!1;var c;this.refresh=function(){c=a(b.options.filter,b.element[0]),c.addClass("ui-selectee"),c.each(function(){var b=a(this),c=b.offset();a.data(this,"selectable-item",{element:this,$element:b,left:c.left,top:c.top,right:c.left+b.outerWidth(),bottom:c.top+b.outerHeight(),startselected:!1,selected:b.hasClass("ui-selected"),selecting:b.hasClass("ui-selecting"),unselecting:b.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=c.addClass("ui-selectee"),this._mouseInit(),this.helper=a("<div class='ui-selectable-helper'></div>")},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"),this._mouseDestroy();return this},_mouseStart:function(b){var c=this;this.opos=[b.pageX,b.pageY];if(!this.options.disabled){var d=this.options;this.selectees=a(d.filter,this.element[0]),this._trigger("start",b),a(d.appendTo).append(this.helper),this.helper.css({left:b.clientX,top:b.clientY,width:0,height:0}),d.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var d=a.data(this,"selectable-item");d.startselected=!0,!b.metaKey&&!b.ctrlKey&&(d.$element.removeClass("ui-selected"),d.selected=!1,d.$element.addClass("ui-unselecting"),d.unselecting=!0,c._trigger("unselecting",b,{unselecting:d.element}))}),a(b.target).parents().andSelf().each(function(){var d=a.data(this,"selectable-item");if(d){var e=!b.metaKey&&!b.ctrlKey||!d.$element.hasClass("ui-selected");d.$element.removeClass(e?"ui-unselecting":"ui-selected").addClass(e?"ui-selecting":"ui-unselecting"),d.unselecting=!e,d.selecting=e,d.selected=e,e?c._trigger("selecting",b,{selecting:d.element}):c._trigger("unselecting",b,{unselecting:d.element});return!1}})}},_mouseDrag:function(b){var c=this;this.dragged=!0;if(!this.options.disabled){var d=this.options,e=this.opos[0],f=this.opos[1],g=b.pageX,h=b.pageY;if(e>g){var i=g;g=e,e=i}if(f>h){var i=h;h=f,f=i}this.helper.css({left:e,top:f,width:g-e,height:h-f}),this.selectees.each(function(){var i=a.data(this,"selectable-item");if(!!i&&i.element!=c.element[0]){var j=!1;d.tolerance=="touch"?j=!(i.left>g||i.right<e||i.top>h||i.bottom<f):d.tolerance=="fit"&&(j=i.left>e&&i.right<g&&i.top>f&&i.bottom<h),j?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,c._trigger("selecting",b,{selecting:i.element}))):(i.selecting&&((b.metaKey||b.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),c._trigger("unselecting",b,{unselecting:i.element}))),i.selected&&!b.metaKey&&!b.ctrlKey&&!i.startselected&&(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,c._trigger("unselecting",b,{unselecting:i.element})))}});return!1}},_mouseStop:function(b){var c=this;this.dragged=!1;var d=this.options;a(".ui-unselecting",this.element[0]).each(function(){var d=a.data(this,"selectable-item");d.$element.removeClass("ui-unselecting"),d.unselecting=!1,d.startselected=!1,c._trigger("unselected",b,{unselected:d.element})}),a(".ui-selecting",this.element[0]).each(function(){var d=a.data(this,"selectable-item");d.$element.removeClass("ui-selecting").addClass("ui-selected"),d.selecting=!1,d.selected=!0,d.startselected=!0,c._trigger("selected",b,{selected:d.element})}),this._trigger("stop",b),this.helper.remove();return!1}}),a.extend(a.ui.selectable,{version:"1.8.17"})}(jQuery),function(a,b){a.widget("ui.sortable",a.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3},_create:function(){var a=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?a.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):!1,this.offset=this.element.offset(),this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var a=this.items.length-1;a>=0;a--)this.items[a].item.removeData(this.widgetName+"-item");return this},_setOption:function(b,c){b==="disabled"?(this.options[b]=c,this.widget()[c?"addClass":"removeClass"]("ui-sortable-disabled")):a.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(b,c){var d=this;if(this.reverting)return!1;if(this.options.disabled||this.options.type=="static")return!1;this._refreshItems(b);var e=null,f=this,g=a(b.target).parents().each(function(){if(a.data(this,d.widgetName+"-item")==f){e=a(this);return!1}});a.data(b.target,d.widgetName+"-item")==f&&(e=a(b.target));if(!e)return!1;if(this.options.handle&&!c){var h=!1;a(this.options.handle,e).find("*").andSelf().each(function(){this==b.target&&(h=!0)});if(!h)return!1}this.currentItem=e,this._removeCurrentsFromItems();return!0},_mouseStart:function(b,c,d){var e=this.options,f=this;this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(b),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,e.cursorAt&&this._adjustOffsetFromHelper(e.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!=this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),e.containment&&this._setContainment(),e.cursor&&(a("body").css("cursor")&&(this._storedCursor=a("body").css("cursor")),a("body").css("cursor",e.cursor)),e.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",e.opacity)),e.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",e.zIndex)),this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",b,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions();if(!d)for(var g=this.containers.length-1;g>=0;g--)this.containers[g]._trigger("activate",b,f._uiHash(this));a.ui.ddmanager&&(a.ui.ddmanager.current=this),a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(b);return!0},_mouseDrag:function(b){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs);if(this.options.scroll){var c=this.options,d=!1;this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-b.pageY<c.scrollSensitivity?this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop+c.scrollSpeed:b.pageY-this.overflowOffset.top<c.scrollSensitivity&&(this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop-c.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-b.pageX<c.scrollSensitivity?this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft+c.scrollSpeed:b.pageX-this.overflowOffset.left<c.scrollSensitivity&&(this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft-c.scrollSpeed)):(b.pageY-a(document).scrollTop()<c.scrollSensitivity?d=a(document).scrollTop(a(document).scrollTop()-c.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<c.scrollSensitivity&&(d=a(document).scrollTop(a(document).scrollTop()+c.scrollSpeed)),b.pageX-a(document).scrollLeft()<c.scrollSensitivity?d=a(document).scrollLeft(a(document).scrollLeft()-c.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<c.scrollSensitivity&&(d=a(document).scrollLeft(a(document).scrollLeft()+c.scrollSpeed))),d!==!1&&a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(var e=this.items.length-1;e>=0;e--){var f=this.items[e],g=f.item[0],h=this._intersectsWithPointer(f);if(!h)continue;if(g!=this.currentItem[0]&&this.placeholder[h==1?"next":"prev"]()[0]!=g&&!a.ui.contains(this.placeholder[0],g)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],g):!0)){this.direction=h==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(f))this._rearrange(b,f);else break;this._trigger("change",b,this._uiHash());break}}this._contactContainers(b),a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),this._trigger("sort",b,this._uiHash()),this.lastPositionAbs=this.positionAbs;return!1},_mouseStop:function(b,c){if(!!b){a.ui.ddmanager&&!this.options.dropBehaviour&&a.ui.ddmanager.drop(this,b);if(this.options.revert){var d=this,e=d.placeholder.offset();d.reverting=!0,a(this.helper).animate({left:e.left-this.offset.parent.left-d.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:e.top-this.offset.parent.top-d.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){d._clear(b)})}else this._clear(b,c);return!1}},cancel:function(){var b=this;if(this.dragging){this._mouseUp({target:null}),this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var c=this.containers.length-1;c>=0;c--)this.containers[c]._trigger("deactivate",null,b._uiHash(this)),this.containers[c].containerCache.over&&(this.containers[c]._trigger("out",null,b._uiHash(this)),this.containers[c].containerCache.over=0)}this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),a.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?a(this.domPosition.prev).after(this.currentItem):a(this.domPosition.parent).prepend(this.currentItem));return this},serialize:function(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];b=b||{},a(c).each(function(){var c=(a(b.item||this).attr(b.attribute||"id")||"").match(b.expression||/(.+)[-=_](.+)/);c&&d.push((b.key||c[1]+"[]")+"="+(b.key&&b.expression?c[1]:c[2]))}),!d.length&&b.key&&d.push(b.key+"=");return d.join("&")},toArray:function(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];b=b||{},c.each(function(){d.push(a(b.item||this).attr(b.attribute||"id")||"")});return d},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,d=this.positionAbs.top,e=d+this.helperProportions.height,f=a.left,g=f+a.width,h=a.top,i=h+a.height,j=this.offset.click.top,k=this.offset.click.left,l=d+j>h&&d+j<i&&b+k>f&&b+k<g;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?l:f<b+this.helperProportions.width/2&&c-this.helperProportions.width/2<g&&h<d+this.helperProportions.height/2&&e-this.helperProportions.height/2<i},_intersectsWithPointer:function(b){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top,b.height),d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left,b.width),e=c&&d,f=this._getDragVerticalDirection(),g=this._getDragHorizontalDirection();if(!e)return!1;return this.floating?g&&g=="right"||f=="down"?2:1:f&&(f=="down"?2:1)},_intersectsWithSides:function(b){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top+b.height/2,b.height),d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left+b.width/2,b.width),e=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();return this.floating&&f?f=="right"&&d||f=="left"&&!d:e&&(e=="down"&&c||e=="up"&&!c)},_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;return a!=0&&(a>0?"down":"up")},_getDragHorizontalDirection:function(){var a=this.positionAbs.left-this
.lastPositionAbs.left;return a!=0&&(a>0?"right":"left")},refresh:function(a){this._refreshItems(a),this.refreshPositions();return this},_connectWith:function(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(b){var c=this,d=[],e=[],f=this._connectWith();if(f&&b)for(var g=f.length-1;g>=0;g--){var h=a(f[g]);for(var i=h.length-1;i>=0;i--){var j=a.data(h[i],this.widgetName);j&&j!=this&&!j.options.disabled&&e.push([a.isFunction(j.options.items)?j.options.items.call(j.element):a(j.options.items,j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),j])}}e.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(var g=e.length-1;g>=0;g--)e[g][0].each(function(){d.push(this)});return a(d)},_removeCurrentsFromItems:function(){var a=this.currentItem.find(":data("+this.widgetName+"-item)");for(var b=0;b<this.items.length;b++)for(var c=0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)},_refreshItems:function(b){this.items=[],this.containers=[this];var c=this.items,d=this,e=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],b,{item:this.currentItem}):a(this.options.items,this.element),this]],f=this._connectWith();if(f)for(var g=f.length-1;g>=0;g--){var h=a(f[g]);for(var i=h.length-1;i>=0;i--){var j=a.data(h[i],this.widgetName);j&&j!=this&&!j.options.disabled&&(e.push([a.isFunction(j.options.items)?j.options.items.call(j.element[0],b,{item:this.currentItem}):a(j.options.items,j.element),j]),this.containers.push(j))}}for(var g=e.length-1;g>=0;g--){var k=e[g][1],l=e[g][0];for(var i=0,m=l.length;i<m;i++){var n=a(l[i]);n.data(this.widgetName+"-item",k),c.push({item:n,instance:k,width:0,height:0,left:0,top:0})}}},refreshPositions:function(b){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());for(var c=this.items.length-1;c>=0;c--){var d=this.items[c];if(d.instance!=this.currentContainer&&this.currentContainer&&d.item[0]!=this.currentItem[0])continue;var e=this.options.toleranceElement?a(this.options.toleranceElement,d.item):d.item;b||(d.width=e.outerWidth(),d.height=e.outerHeight());var f=e.offset();d.left=f.left,d.top=f.top}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(var c=this.containers.length-1;c>=0;c--){var f=this.containers[c].element.offset();this.containers[c].containerCache.left=f.left,this.containers[c].containerCache.top=f.top,this.containers[c].containerCache.width=this.containers[c].element.outerWidth(),this.containers[c].containerCache.height=this.containers[c].element.outerHeight()}return this},_createPlaceholder:function(b){var c=b||this,d=c.options;if(!d.placeholder||d.placeholder.constructor==String){var e=d.placeholder;d.placeholder={element:function(){var b=a(document.createElement(c.currentItem[0].nodeName)).addClass(e||c.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];e||(b.style.visibility="hidden");return b},update:function(a,b){if(!e||!!d.forcePlaceholderSize)b.height()||b.height(c.currentItem.innerHeight()-parseInt(c.currentItem.css("paddingTop")||0,10)-parseInt(c.currentItem.css("paddingBottom")||0,10)),b.width()||b.width(c.currentItem.innerWidth()-parseInt(c.currentItem.css("paddingLeft")||0,10)-parseInt(c.currentItem.css("paddingRight")||0,10))}}}c.placeholder=a(d.placeholder.element.call(c.element,c.currentItem)),c.currentItem.after(c.placeholder),d.placeholder.update(c,c.placeholder)},_contactContainers:function(b){var c=null,d=null;for(var e=this.containers.length-1;e>=0;e--){if(a.ui.contains(this.currentItem[0],this.containers[e].element[0]))continue;if(this._intersectsWith(this.containers[e].containerCache)){if(c&&a.ui.contains(this.containers[e].element[0],c.element[0]))continue;c=this.containers[e],d=e}else this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",b,this._uiHash(this)),this.containers[e].containerCache.over=0)}if(!!c)if(this.containers.length===1)this.containers[d]._trigger("over",b,this._uiHash(this)),this.containers[d].containerCache.over=1;else if(this.currentContainer!=this.containers[d]){var f=1e4,g=null,h=this.positionAbs[this.containers[d].floating?"left":"top"];for(var i=this.items.length-1;i>=0;i--){if(!a.ui.contains(this.containers[d].element[0],this.items[i].item[0]))continue;var j=this.items[i][this.containers[d].floating?"left":"top"];Math.abs(j-h)<f&&(f=Math.abs(j-h),g=this.items[i])}if(!g&&!this.options.dropOnEmpty)return;this.currentContainer=this.containers[d],g?this._rearrange(b,g,null,!0):this._rearrange(b,null,this.containers[d].element,!0),this._trigger("change",b,this._uiHash()),this.containers[d]._trigger("change",b,this._uiHash(this)),this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[d]._trigger("over",b,this._uiHash(this)),this.containers[d].containerCache.over=1}},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b,this.currentItem])):c.helper=="clone"?this.currentItem.clone():this.currentItem;d.parents("body").length||a(c.appendTo!="parent"?c.appendTo:this.currentItem[0].parentNode)[0].appendChild(d[0]),d[0]==this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(d[0].style.width==""||c.forceHelperSize)&&d.width(this.currentItem.width()),(d[0].style.height==""||c.forceHelperSize)&&d.height(this.currentItem.height());return d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.currentItem.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)){var c=a(b.containment)[0],d=a(b.containment).offset(),e=a(c).css("overflow")!="hidden";this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(e?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(e?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName);this.cssPosition=="relative"&&(this.scrollParent[0]==document||this.scrollParent[0]==this.offsetParent[0])&&(this.offset.relative=this._getRelativeOffset());var f=b.pageX,g=b.pageY;if(this.originalPosition){this.containment&&(b.pageX-this.offset.click.left<this.containment[0]&&(f=this.containment[0]+this.offset.click.left),b.pageY-this.offset.click.top<this.containment[1]&&(g=this.containment[1]+this.offset.click.top),b.pageX-this.offset.click.left>this.containment[2]&&(f=this.containment[2]+this.offset.click.left),b.pageY-this.offset.click.top>this.containment[3]&&(g=this.containment[3]+this.offset.click.top));if(c.grid){var h=this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1];g=this.containment?h-this.offset.click.top<this.containment[1]||h-this.offset.click.top>this.containment[3]?h-this.offset.click.top<this.containment[1]?h+c.grid[1]:h-c.grid[1]:h:h;var i=this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0];f=this.containment?i-this.offset.click.left<this.containment[0]||i-this.offset.click.left>this.containment[2]?i-this.offset.click.left<this.containment[0]?i+c.grid[0]:i-c.grid[0]:i:i}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_rearrange:function(a,b,c,d){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?b.item[0]:b.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var e=this,f=this.counter;window.setTimeout(function(){f==e.counter&&e.refreshPositions(!d)},0)},_clear:function(b,c){this.reverting=!1;var d=[],e=this;!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var f in this._storedCSS)if(this._storedCSS[f]=="auto"||this._storedCSS[f]=="static")this._storedCSS[f]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!c&&d.push(function(a){this._trigger("receive",a,this._uiHash(this.fromOutside))}),(this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!c&&d.push(function(a){this._trigger("update",a,this._uiHash())});if(!a.ui.contains(this.element[0],this.currentItem[0])){c||d.push(function(a){this._trigger("remove",a,this._uiHash())});for(var f=this.containers.length-1;f>=0;f--)a.ui.contains(this.containers[f].element[0],this.currentItem[0])&&!c&&(d.push(function(a){return function(b){a._trigger("receive",b,this._uiHash(this))}}.call(this,this.containers[f])),d.push(function(a){return function(b){a._trigger("update",b,this._uiHash(this))}}.call(this,this.containers[f])))}for(var f=this.containers.length-1;f>=0;f--)c||d.push(function(a){return function(b){a._trigger("deactivate",b,this._uiHash(this))}}.call(this,this.containers[f])),this.containers[f].containerCache.over&&(d.push(function(a){return function(b){a._trigger("out",b,this._uiHash(this))}}.call(this,this.containers[f])),this.containers[f].containerCache.over=0);this._storedCursor&&a("body").css("cursor",this._storedCursor),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex),this.dragging=!1;if(this.cancelHelperRemoval){if(!c){this._trigger("beforeStop",b,this._uiHash());for(var f=0;f<d.length;f++)d[f].call(this,b);this._trigger("stop",b,this._uiHash())}return!1}c||this._trigger("beforeStop",b,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!=this.currentItem[0]&&this.helper.remove(),this.helper=null;if(!c){for(var f=0;f<d.length;f++)d[f].call(this,b);this._trigger("stop",b,this._uiHash())}this.fromOutside=!1;return!0},_trigger:function(){a.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(b){var c=b||this;return{helper:c.helper,placeholder:c.placeholder||a([]),position:c.position,originalPosition:c.originalPosition,offset:c.positionAbs,item:c.currentItem,sender:b?b.element:null}}}),a.extend(a.ui.sortable,{version:"1.8.17"})}(jQuery),jQuery.effects||function(a,b){function l(b){if(!b||typeof b=="number"||a.fx.speeds[b])return!0;if(typeof b=="string"&&!a.effects[b])return!0;return!1}function k(b,c,d,e){typeof b=="object"&&(e=c,d=null,c=b,b=c.effect),a.isFunction(c)&&(e=c,d=null,c={});if(typeof c=="number"||a.fx.speeds[c])e=d,d=c,c={};a.isFunction(d)&&(e=d,d=null),c=c||{},d=d||c.duration,d=a.fx.off?0:typeof d=="number"?d:d in a.fx.speeds?a.fx.speeds[d]:a.fx.speeds._default,e=e||c.complete;return[b,c,d,e]}function j(a,b){var c={_:0},d;for(d in b)a[d]!=b[d]&&(c[d]=b[d]);return c}function i(b){var c,d;for(c in b)d=b[c],(d==null||a.isFunction(d)||c in g||/scrollbar/.test(c)||!/color/i.test(c)&&isNaN(parseFloat(d)))&&delete b[c];return b}function h(){var a=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,b={},c,d;if(a&&a.length&&a[0]&&a[a[0]]){var e=a.length;while(e--)c=a[e],typeof a[c]=="string"&&(d=c.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),b[d]=a[c])}else for(c in a)typeof a[c]=="string"&&(b[c]=a[c]);return b}function d(b,d){var e;do{e=a.curCSS(b,d);if(e!=""&&e!="transparent"||a.nodeName(b,"body"))break;d="backgroundColor"}while(b=b.parentNode);return c(e)}function c(b){var c;if(b&&b.constructor==Array&&b.length==3)return b;if(c=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))return[parseInt(c[1],10),parseInt(c[2],10),parseInt(c[3],10)];if(c=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b))return[parseFloat(c[1])*2.55,parseFloat(c[2])*2.55,parseFloat(c[3])*2.55];if(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b))return[parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16)];if(c=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b))return[parseInt(c[1]+c[1],16),parseInt(c[2]+c[2],16),parseInt(c[3]+c[3],16)];if(c=/rgba\(0, 0, 0, 0\)/.exec(b))return e.transparent;return e[a.trim(b).toLowerCase()]}a.effects={},a.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(b,e){a.fx.step[e]=function(a){a.colorInit||(a.start=d(a.elem,e),a.end=c(a.end),a.colorInit=!0),a.elem.style[e]="rgb("+Math.max(Math.min(parseInt(a.pos*(a.end[0]-a.start[0])+a.start[0],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[1]-a.start[1])+a.start[1],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[2]-a.start[2])+a.start[2],10),255),0)+")"}});var e={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},f=["add","remove","toggle"],g={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};a.effects.animateClass=function(b,c,d,e){a.isFunction(d)&&(e=d,d=null);return this.queue(function(){var g=a(this),k=g.attr("style")||" ",l=i(h.call(this)),m,n=g.attr("class");a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),m=i(h.call(this)),g.attr("class",n),g.animate(j(l,m),{queue:!1,duration:c,easing:d,complete:function(){a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),typeof g.attr("style")=="object"?(g.attr("style").cssText="",g.attr("style").cssText=k):g.attr("style",k),e&&e.apply(this,arguments),a.dequeue(this)}})})},a.fn.extend({_addClass:a.fn.addClass,addClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{add:b},c,d,e]):this._addClass(b)},_removeClass:a.fn.removeClass,removeClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{remove:b},c,d,e]):this._removeClass(b)},_toggleClass:a.fn.toggleClass,toggleClass:function(c,d,e,f,g){return typeof d=="boolean"||d===b?e?a.effects.animateClass.apply(this,[d?{add:c}:{remove:c},e,f,g]):this._toggleClass(c,d):a.effects.animateClass.apply(this,[{toggle:c},d,e,f])},switchClass:function(b,c,d,e,f){return a.effects.animateClass.apply(this,[{add:c,remove:b},d,e,f])}}),a.extend(a.effects,{version:"1.8.17",save:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.data("ec.storage."+b[c],a[0].style[b[c]])},restore:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.css(b[c],a.data("ec.storage."+b[c]))},setMode:function(a,b){b=="toggle"&&(b=a.is(":hidden")?"show":"hide");return b},getBaseline:function(a,b){var c,d;switch(a[0]){case"top":c=0;break;case"middle":c=.5;break;case"bottom":c=1;break;default:c=a[0]/b.height}switch(a[1]){case"left":d=0;break;case"center":d=.5;break;case"right":d=1;break;default:d=a[1]/b.width}return{x:d,y:c}},createWrapper:function(b){if(b.parent().is(".ui-effects-wrapper"))return b.parent();var c={width:b.outerWidth(!0),height:b.outerHeight(!0),"float":b.css("float")},d=a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),e=document.activeElement;b.wrap(d),(b[0]===e||a.contains(b[0],e))&&a(e).focus(),d=b.parent(),b.css("position")=="static"?(d.css({position:"relative"}),b.css({position:"relative"})):(a.extend(c,{position:b.css("position"),zIndex:b.css("z-index")}),a.each(["top","left","bottom","right"],function(a,d){c[d]=b.css(d),isNaN(parseInt(c[d],10))&&(c[d]="auto")}),b.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"}));return d.css(c).show()},removeWrapper:function(b){var c,d=document.activeElement;if(b.parent().is(".ui-effects-wrapper")){c=b.parent().replaceWith(b),(b[0]===d||a.contains(b[0],d))&&a(d).focus();return c}return b},setTransition:function(b,c,d,e){e=e||{},a.each(c,function(a,c){unit=b.cssUnit(c),unit[0]>0&&(e[c]=unit[0]*d+unit[1])});return e}}),a.fn.extend({effect:function(b,c,d,e){var f=k.apply(this,arguments),g={options:f[1],duration:f[2],callback:f[3]},h=g.options.mode,i=a.effects[b];if(a.fx.off||!i)return h?this[h](g.duration,g.callback):this.each(function(){g.callback&&g.callback.call(this)});return i.call(this,g)},_show:a.fn.show,show:function(a){if(l(a))return this._show.apply(this,arguments);var b=k.apply(this,arguments);b[1].mode="show";return this.effect.apply(this,b)},_hide:a.fn.hide,hide:function(a){if(l(a))return this._hide.apply(this,arguments);var b=k.apply(this,arguments);b[1].mode="hide";return this.effect.apply(this,b)},__toggle:a.fn.toggle,toggle:function(b){if(l(b)||typeof b=="boolean"||a.isFunction(b))return this.__toggle.apply(this,arguments);var c=k.apply(this,arguments);c[1].mode="toggle";return this.effect.apply(this,c)},cssUnit:function(b){var c=this.css(b),d=[];a.each(["em","px","%","pt"],function(a,b){c.indexOf(b)>0&&(d=[parseFloat(c),b])});return d}}),a.easing.jswing=a.easing.swing,a.extend(a.easing,{def:"easeOutQuad",swing:function(b,c,d,e,f){return a.easing[a.easing.def](b,c,d,e,f)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e)==1)return c+d;g||(g=e*.3);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e)==1)return c+d;g||(g=e*.3);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;g||(g=e*.3*1.5);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);if(b<1)return-0.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c;return h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,c,d,e,f,g){g==b&&(g=1.70158);return e*(c/=f)*c*((g+1)*c-g)+d},easeOutBack:function(a,c,d,e,f,g){g==b&&(g=1.70158);return e*((c=c/f-1)*c*((g+1)*c+g)+1)+d},easeInOutBack:function(a,c,d,e,f,g){g==b&&(g=1.70158);if((c/=f/2)<1)return e/2*c*c*(((g*=1.525)+1)*c-g)+d;return e/2*((c-=2)*c*(((g*=1.525)+1)*c+g)+2)+d},easeInBounce:function(b,c,d,e,f){return e-a.easing.easeOutBounce(b,f-c,0,e,f)+d},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*7.5625*b*b+c:b<2/2.75?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:b<2.5/2.75?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(b,c,d,e,f){if(c<f/2)return a.easing.easeInBounce(b,c*2,0,e,f)*.5+d;return a.easing.easeOutBounce(b,c*2-f,0,e,f)*.5+e*.5+d}})}(jQuery),function(a,b){a.effects.blind=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.direction||"vertical";a.effects.save(c,d),c.show();var g=a.effects.createWrapper(c).css({overflow:"hidden"}),h=f=="vertical"?"height":"width",i=f=="vertical"?g.height():g.width();e=="show"&&g.css(h,0);var j={};j[h]=e=="show"?i:0,g.animate(j,b.duration,b.options.easing,function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()})})}}(jQuery),function(a,b){a.effects.bounce=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"effect"),f=b.options.direction||"up",g=b.options.distance||20,h=b.options.times||5,i=b.duration||250;/show|hide/.test(e)&&d.push("opacity"),a.effects.save(c,d),c.show(),a.effects.createWrapper(c);var j=f=="up"||f=="down"?"top":"left",k=f=="up"||f=="left"?"pos":"neg",g=b.options.distance||(j=="top"?c.outerHeight({margin:!0})/3:c.outerWidth({margin:!0})/3);e=="show"&&c.css("opacity",0).css(j,k=="pos"?-g:g),e=="hide"&&(g=g/(h*2)),e!="hide"&&h--;if(e=="show"){var l={opacity:1};l[j]=(k=="pos"?"+=":"-=")+g,c.animate(l,i/2,b.options.easing),g=g/2,h--}for(var m=0;m<h;m++){var n={},p={};n[j]=(k=="pos"?"-=":"+=")+g,p[j]=(k=="pos"?"+=":"-=")+g,c.animate(n,i/2,b.options.easing).animate(p,i/2,b.options.easing),g=e=="hide"?g*2:g/2}if(e=="hide"){var l={opacity:0};l[j]=(k=="pos"?"-=":"+=")+g,c.animate(l,i/2,b.options.easing,function(){c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments)})}else{var n={},p={};n[j]=(k=="pos"?"-=":"+=")+g,p[j]=(k=="pos"?"+=":"-=")+g,c.animate(n,i/2,b.options.easing).animate(p,i/2,b.options.easing,function(){a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments)})}c.queue("fx",function(){c.dequeue()}),c.dequeue()})}}(jQuery),function(a,b){a.effects.clip=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right","height","width"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.direction||"vertical";a.effects.save(c,d),c.show();var g=a.effects.createWrapper(c).css({overflow:"hidden"}),h=c[0].tagName=="IMG"?g:c,i={size:f=="vertical"?"height":"width",position:f=="vertical"?"top":"left"},j=f=="vertical"?h.height():h.width();e=="show"&&(h.css(i.size,0),h.css(i.position,j/2));var k={};k[i.size]=e=="show"?j:0,k[i.position]=e=="show"?0:j/2,h.animate(k,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()}})})}}(jQuery),function(a,b){a.effects.drop=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right","opacity"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.direction||"left";a.effects.save(c,d),c.show(),a.effects.createWrapper(c);var g=f=="up"||f=="down"?"top":"left",h=f=="up"||f=="left"?"pos":"neg",i=b.options.distance||(g=="top"?c.outerHeight({margin:!0})/2:c.outerWidth({margin:!0})/2);e=="show"&&c.css("opacity",0).css(g,h=="pos"?-i:i);var j={opacity:e=="show"?1:0};j[g]=(e=="show"?h=="pos"?"+=":"-=":h=="pos"?"-=":"+=")+i,c.animate(j,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}}(jQuery),function(a,b){a.effects.explode=function(b){return this.queue(function(){var c=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3,d=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3;b.options.mode=b.options.mode=="toggle"?a(this).is(":visible")?"hide":"show":b.options.mode;var e=a(this).show().css("visibility","hidden"),f=e.offset();f.top-=parseInt(e.css("marginTop"),10)||0,f.left-=parseInt(e.css("marginLeft"),10)||0;var g=e.outerWidth(!0),h=e.outerHeight(!0);for(var i=0;i<c;i++)for(var j=0;j<d;j++)e.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-j*(g/d),top:-i*(h/c)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:g/d,height:h/c,left:f.left+j*(g/d)+(b.options.mode=="show"?(j-Math.floor(d/2))*(g/d):0),top:f.top+i*(h/c)+(b.options.mode=="show"?(i-Math.floor(c/2))*(h/c):0),opacity:b.options.mode=="show"?0:1}).animate({left:f.left+j*(g/d)+(b.options.mode=="show"?0:(j-Math.floor(d/2))*(g/d)),top:f.top+i*(h/c)+(b.options.mode=="show"?0:(i-Math.floor(c/2))*(h/c)),opacity:b.options.mode=="show"?1:0},b.duration||500);setTimeout(function(){b.options.mode=="show"?e.css({visibility:"visible"}):e.css({visibility:"visible"}).hide(),b.callback&&b.callback.apply(e[0]),e.dequeue(),a("div.ui-effects-explode").remove()},b.duration||500)})}}(jQuery),function(a,b){a.effects.fade=function(b){return this.queue(function(){var c=a(this),d=a.effects.setMode(c,b.options.mode||"hide");c.animate({opacity:d},{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}}(jQuery),function(a,b){a.effects.fold=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.size||15,g=!!b.options.horizFirst,h=b.duration?b.duration/2:a.fx.speeds._default/2;a.effects.save(c,d),c.show();var i=a.effects.createWrapper(c).css({overflow:"hidden"}),j=e=="show"!=g,k=j?["width","height"]:["height","width"],l=j?[i.width(),i.height()]:[i.height(),i.width()],m=/([0-9]+)%/.exec(f);m&&(f=parseInt(m[1],10)/100*l[e=="hide"?0:1]),e=="show"&&i.css(g?{height:0,width:f}:{height:f,width:0});var n={},p={};n[k[0]]=e=="show"?l[0]:f,p[k[1]]=e=="show"?l[1]:0,i.animate(n,h,b.options.easing).animate(p,h,b.options.easing,function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()})})}}(jQuery),function(a,b){a.effects.highlight=function(b){return this.queue(function(){var c=a(this),d=["backgroundImage","backgroundColor","opacity"],e=a.effects.setMode(c,b.options.mode||"show"),f={backgroundColor:c.css("backgroundColor")};e=="hide"&&(f.opacity=0),a.effects.save(c,d),c.show().css({backgroundImage:"none",backgroundColor:b.options.color||"#ffff99"}).animate(f,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),e=="show"&&!a.support.opacity&&this.style.removeAttribute("filter"),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}}(jQuery),function(a,b){a.effects.pulsate=function(b){return this.queue(function(){var c=a(this),d=a.effects.setMode(c,b.options.mode||"show");times=(b.options.times||5)*2-1,duration=b.duration?b.duration/2:a.fx.speeds._default/2,isVisible=c.is(":visible"),animateTo=0,isVisible||(c.css("opacity",0).show(),animateTo=1),(d=="hide"&&isVisible||d=="show"&&!isVisible)&&times--;for(var e=0;e<times;e++)c.animate({opacity:animateTo},duration,b.options.easing),animateTo=(animateTo+1)%2;c.animate({opacity:animateTo},duration,b.options.easing,function(){animateTo==0&&c.hide(),b.callback&&b.callback.apply(this,arguments)}),c.queue("fx",function(){c.dequeue()}).dequeue()})}}(jQuery),function(a,b){a.effects.puff=function(b){return this.queue(function(){var c=a(this),d=a.effects.setMode(c,b.options.mode||"hide"),e=parseInt(b.options.percent,10)||150,f=e/100,g={height:c.height(),width:c.width()};a.extend(b.options,{fade:!0,mode:d,percent:d=="hide"?e:100,from:d=="hide"?g:{height:g.height*f,width:g.width*f}}),c.effect("scale",b.options,b.duration,b.callback),c.dequeue()})},a.effects.scale=function(b){return this.queue(function(){var c=a(this),d=a.extend(!0,{},b.options
),e=a.effects.setMode(c,b.options.mode||"effect"),f=parseInt(b.options.percent,10)||(parseInt(b.options.percent,10)==0?0:e=="hide"?0:100),g=b.options.direction||"both",h=b.options.origin;e!="effect"&&(d.origin=h||["middle","center"],d.restore=!0);var i={height:c.height(),width:c.width()};c.from=b.options.from||(e=="show"?{height:0,width:0}:i);var j={y:g!="horizontal"?f/100:1,x:g!="vertical"?f/100:1};c.to={height:i.height*j.y,width:i.width*j.x},b.options.fade&&(e=="show"&&(c.from.opacity=0,c.to.opacity=1),e=="hide"&&(c.from.opacity=1,c.to.opacity=0)),d.from=c.from,d.to=c.to,d.mode=e,c.effect("size",d,b.duration,b.callback),c.dequeue()})},a.effects.size=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right","width","height","overflow","opacity"],e=["position","top","bottom","left","right","overflow","opacity"],f=["width","height","overflow"],g=["fontSize"],h=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],i=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],j=a.effects.setMode(c,b.options.mode||"effect"),k=b.options.restore||!1,l=b.options.scale||"both",m=b.options.origin,n={height:c.height(),width:c.width()};c.from=b.options.from||n,c.to=b.options.to||n;if(m){var p=a.effects.getBaseline(m,n);c.from.top=(n.height-c.from.height)*p.y,c.from.left=(n.width-c.from.width)*p.x,c.to.top=(n.height-c.to.height)*p.y,c.to.left=(n.width-c.to.width)*p.x}var q={from:{y:c.from.height/n.height,x:c.from.width/n.width},to:{y:c.to.height/n.height,x:c.to.width/n.width}};if(l=="box"||l=="both")q.from.y!=q.to.y&&(d=d.concat(h),c.from=a.effects.setTransition(c,h,q.from.y,c.from),c.to=a.effects.setTransition(c,h,q.to.y,c.to)),q.from.x!=q.to.x&&(d=d.concat(i),c.from=a.effects.setTransition(c,i,q.from.x,c.from),c.to=a.effects.setTransition(c,i,q.to.x,c.to));(l=="content"||l=="both")&&q.from.y!=q.to.y&&(d=d.concat(g),c.from=a.effects.setTransition(c,g,q.from.y,c.from),c.to=a.effects.setTransition(c,g,q.to.y,c.to)),a.effects.save(c,k?d:e),c.show(),a.effects.createWrapper(c),c.css("overflow","hidden").css(c.from);if(l=="content"||l=="both")h=h.concat(["marginTop","marginBottom"]).concat(g),i=i.concat(["marginLeft","marginRight"]),f=d.concat(h).concat(i),c.find("*[width]").each(function(){child=a(this),k&&a.effects.save(child,f);var c={height:child.height(),width:child.width()};child.from={height:c.height*q.from.y,width:c.width*q.from.x},child.to={height:c.height*q.to.y,width:c.width*q.to.x},q.from.y!=q.to.y&&(child.from=a.effects.setTransition(child,h,q.from.y,child.from),child.to=a.effects.setTransition(child,h,q.to.y,child.to)),q.from.x!=q.to.x&&(child.from=a.effects.setTransition(child,i,q.from.x,child.from),child.to=a.effects.setTransition(child,i,q.to.x,child.to)),child.css(child.from),child.animate(child.to,b.duration,b.options.easing,function(){k&&a.effects.restore(child,f)})});c.animate(c.to,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){c.to.opacity===0&&c.css("opacity",c.from.opacity),j=="hide"&&c.hide(),a.effects.restore(c,k?d:e),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}}(jQuery),function(a,b){a.effects.shake=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"effect"),f=b.options.direction||"left",g=b.options.distance||20,h=b.options.times||3,i=b.duration||b.options.duration||140;a.effects.save(c,d),c.show(),a.effects.createWrapper(c);var j=f=="up"||f=="down"?"top":"left",k=f=="up"||f=="left"?"pos":"neg",l={},m={},n={};l[j]=(k=="pos"?"-=":"+=")+g,m[j]=(k=="pos"?"+=":"-=")+g*2,n[j]=(k=="pos"?"-=":"+=")+g*2,c.animate(l,i,b.options.easing);for(var p=1;p<h;p++)c.animate(m,i,b.options.easing).animate(n,i,b.options.easing);c.animate(m,i,b.options.easing).animate(l,i/2,b.options.easing,function(){a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments)}),c.queue("fx",function(){c.dequeue()}),c.dequeue()})}}(jQuery),function(a,b){a.effects.slide=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"show"),f=b.options.direction||"left";a.effects.save(c,d),c.show(),a.effects.createWrapper(c).css({overflow:"hidden"});var g=f=="up"||f=="down"?"top":"left",h=f=="up"||f=="left"?"pos":"neg",i=b.options.distance||(g=="top"?c.outerHeight({margin:!0}):c.outerWidth({margin:!0}));e=="show"&&c.css(g,h=="pos"?isNaN(i)?"-"+i:-i:i);var j={};j[g]=(e=="show"?h=="pos"?"+=":"-=":h=="pos"?"-=":"+=")+i,c.animate(j,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}}(jQuery),function(a,b){a.effects.transfer=function(b){return this.queue(function(){var c=a(this),d=a(b.options.to),e=d.offset(),f={top:e.top,left:e.left,height:d.innerHeight(),width:d.innerWidth()},g=c.offset(),h=a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({top:g.top,left:g.left,height:c.innerHeight(),width:c.innerWidth(),position:"absolute"}).animate(f,b.duration,b.options.easing,function(){h.remove(),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()})})}}(jQuery),function(a,b){a.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:!0,clearStyle:!1,collapsible:!1,event:"click",fillSpace:!1,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:!1,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var b=this,c=b.options;b.running=0,b.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"),b.headers=b.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){c.disabled||a(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){c.disabled||a(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){c.disabled||a(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){c.disabled||a(this).removeClass("ui-state-focus")}),b.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");if(c.navigation){var d=b.element.find("a").filter(c.navigationFilter).eq(0);if(d.length){var e=d.closest(".ui-accordion-header");e.length?b.active=e:b.active=d.closest(".ui-accordion-content").prev()}}b.active=b._findActive(b.active||c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"),b.active.next().addClass("ui-accordion-content-active"),b._createIcons(),b.resize(),b.element.attr("role","tablist"),b.headers.attr("role","tab").bind("keydown.accordion",function(a){return b._keydown(a)}).next().attr("role","tabpanel"),b.headers.not(b.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide(),b.active.length?b.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}):b.headers.eq(0).attr("tabIndex",0),a.browser.safari||b.headers.find("a").attr("tabIndex",-1),c.event&&b.headers.bind(c.event.split(" ").join(".accordion ")+".accordion",function(a){b._clickHandler.call(b,a,this),a.preventDefault()})},_createIcons:function(){var b=this.options;b.icons&&(a("<span></span>").addClass("ui-icon "+b.icons.header).prependTo(this.headers),this.active.children(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected),this.element.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.children(".ui-icon").remove(),this.element.removeClass("ui-accordion-icons")},destroy:function(){var b=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"),this.headers.find("a").removeAttr("tabIndex"),this._destroyIcons();var c=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");(b.autoHeight||b.fillHeight)&&c.css("height","");return a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments),b=="active"&&this.activate(c),b=="icons"&&(this._destroyIcons(),c&&this._createIcons()),b=="disabled"&&this.headers.add(this.headers.next())[c?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(b){if(!(this.options.disabled||b.altKey||b.ctrlKey)){var c=a.ui.keyCode,d=this.headers.length,e=this.headers.index(b.target),f=!1;switch(b.keyCode){case c.RIGHT:case c.DOWN:f=this.headers[(e+1)%d];break;case c.LEFT:case c.UP:f=this.headers[(e-1+d)%d];break;case c.SPACE:case c.ENTER:this._clickHandler({target:b.target},b.target),b.preventDefault()}if(f){a(b.target).attr("tabIndex",-1),a(f).attr("tabIndex",0),f.focus();return!1}return!0}},resize:function(){var b=this.options,c;if(b.fillSpace){if(a.browser.msie){var d=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}c=this.element.parent().height(),a.browser.msie&&this.element.parent().css("overflow",d),this.headers.each(function(){c-=a(this).outerHeight(!0)}),this.headers.next().each(function(){a(this).height(Math.max(0,c-a(this).innerHeight()+a(this).height()))}).css("overflow","auto")}else b.autoHeight&&(c=0,this.headers.next().each(function(){c=Math.max(c,a(this).height("").height())}).height(c));return this},activate:function(a){this.options.active=a;var b=this._findActive(a)[0];this._clickHandler({target:b},b);return this},_findActive:function(b){return b?typeof b=="number"?this.headers.filter(":eq("+b+")"):this.headers.not(this.headers.not(b)):b===!1?a([]):this.headers.filter(":eq(0)")},_clickHandler:function(b,c){var d=this.options;if(!d.disabled){if(!b.target){if(!d.collapsible)return;this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header),this.active.next().addClass("ui-accordion-content-active");var e=this.active.next(),f={options:d,newHeader:a([]),oldHeader:d.active,newContent:a([]),oldContent:e},g=this.active=a([]);this._toggle(g,e,f);return}var h=a(b.currentTarget||c),i=h[0]===this.active[0];d.active=d.collapsible&&i?!1:this.headers.index(h);if(this.running||!d.collapsible&&i)return;var j=this.active,g=h.next(),e=this.active.next(),f={options:d,newHeader:i&&d.collapsible?a([]):h,oldHeader:this.active,newContent:i&&d.collapsible?a([]):g,oldContent:e},k=this.headers.index(this.active[0])>this.headers.index(h[0]);this.active=i?a([]):h,this._toggle(g,e,f,i,k),j.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header),i||(h.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected),h.next().addClass("ui-accordion-content-active"));return}},_toggle:function(b,c,d,e,f){var g=this,h=g.options;g.toShow=b,g.toHide=c,g.data=d;var i=function(){if(!!g)return g._completed.apply(g,arguments)};g._trigger("changestart",null,g.data),g.running=c.size()===0?b.size():c.size();if(h.animated){var j={};h.collapsible&&e?j={toShow:a([]),toHide:c,complete:i,down:f,autoHeight:h.autoHeight||h.fillSpace}:j={toShow:b,toHide:c,complete:i,down:f,autoHeight:h.autoHeight||h.fillSpace},h.proxied||(h.proxied=h.animated),h.proxiedDuration||(h.proxiedDuration=h.duration),h.animated=a.isFunction(h.proxied)?h.proxied(j):h.proxied,h.duration=a.isFunction(h.proxiedDuration)?h.proxiedDuration(j):h.proxiedDuration;var k=a.ui.accordion.animations,l=h.duration,m=h.animated;m&&!k[m]&&!a.easing[m]&&(m="slide"),k[m]||(k[m]=function(a){this.slide(a,{easing:m,duration:l||700})}),k[m](j)}else h.collapsible&&e?b.toggle():(c.hide(),b.show()),i(!0);c.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur(),b.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()},_completed:function(a){this.running=a?0:--this.running;this.running||(this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""}),this.toHide.removeClass("ui-accordion-content-active"),this.toHide.length&&(this.toHide.parent()[0].className=this.toHide.parent()[0].className),this._trigger("change",null,this.data))}}),a.extend(a.ui.accordion,{version:"1.8.17",animations:{slide:function(b,c){b=a.extend({easing:"swing",duration:300},b,c);if(!b.toHide.size())b.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},b);else{if(!b.toShow.size()){b.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},b);return}var d=b.toShow.css("overflow"),e=0,f={},g={},h=["height","paddingTop","paddingBottom"],i,j=b.toShow;i=j[0].style.width,j.width(j.parent().width()-parseFloat(j.css("paddingLeft"))-parseFloat(j.css("paddingRight"))-(parseFloat(j.css("borderLeftWidth"))||0)-(parseFloat(j.css("borderRightWidth"))||0)),a.each(h,function(c,d){g[d]="hide";var e=(""+a.css(b.toShow[0],d)).match(/^([\d+-.]+)(.*)$/);f[d]={value:e[1],unit:e[2]||"px"}}),b.toShow.css({height:0,overflow:"hidden"}).show(),b.toHide.filter(":hidden").each(b.complete).end().filter(":visible").animate(g,{step:function(a,c){c.prop=="height"&&(e=c.end-c.start===0?0:(c.now-c.start)/(c.end-c.start)),b.toShow[0].style[c.prop]=e*f[c.prop].value+f[c.prop].unit},duration:b.duration,easing:b.easing,complete:function(){b.autoHeight||b.toShow.css("height",""),b.toShow.css({width:i,overflow:d}),b.complete()}})}},bounceslide:function(a){this.slide(a,{easing:a.down?"easeOutBounce":"swing",duration:a.down?1e3:200})}}})}(jQuery),function(a,b){var c=0;a.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var b=this,c=this.element[0].ownerDocument,d;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(c){if(!b.options.disabled&&!b.element.propAttr("readOnly")){d=!1;var e=a.ui.keyCode;switch(c.keyCode){case e.PAGE_UP:b._move("previousPage",c);break;case e.PAGE_DOWN:b._move("nextPage",c);break;case e.UP:b._move("previous",c),c.preventDefault();break;case e.DOWN:b._move("next",c),c.preventDefault();break;case e.ENTER:case e.NUMPAD_ENTER:b.menu.active&&(d=!0,c.preventDefault());case e.TAB:if(!b.menu.active)return;b.menu.select(c);break;case e.ESCAPE:b.element.val(b.term),b.close(c);break;default:clearTimeout(b.searching),b.searching=setTimeout(function(){b.term!=b.element.val()&&(b.selectedItem=null,b.search(null,c))},b.options.delay)}}}).bind("keypress.autocomplete",function(a){d&&(d=!1,a.preventDefault())}).bind("focus.autocomplete",function(){b.options.disabled||(b.selectedItem=null,b.previous=b.element.val())}).bind("blur.autocomplete",function(a){b.options.disabled||(clearTimeout(b.searching),b.closing=setTimeout(function(){b.close(a),b._change(a)},150))}),this._initSource(),this.response=function(){return b._response.apply(b,arguments)},this.menu=a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo||"body",c)[0]).mousedown(function(c){var d=b.menu.element[0];a(c.target).closest(".ui-menu-item").length||setTimeout(function(){a(document).one("mousedown",function(c){c.target!==b.element[0]&&c.target!==d&&!a.ui.contains(d,c.target)&&b.close()})},1),setTimeout(function(){clearTimeout(b.closing)},13)}).menu({focus:function(a,c){var d=c.item.data("item.autocomplete");!1!==b._trigger("focus",a,{item:d})&&/^key/.test(a.originalEvent.type)&&b.element.val(d.value)},selected:function(a,d){var e=d.item.data("item.autocomplete"),f=b.previous;b.element[0]!==c.activeElement&&(b.element.focus(),b.previous=f,setTimeout(function(){b.previous=f,b.selectedItem=e},1)),!1!==b._trigger("select",a,{item:e})&&b.element.val(e.value),b.term=b.element.val(),b.close(a),b.selectedItem=e},blur:function(a,c){b.menu.element.is(":visible")&&b.element.val()!==b.term&&b.element.val(b.term)}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu"),a.fn.bgiframe&&this.menu.element.bgiframe(),b.beforeunloadHandler=function(){b.element.removeAttr("autocomplete")},a(window).bind("beforeunload",b.beforeunloadHandler)},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"),this.menu.element.remove(),a(window).unbind("beforeunload",this.beforeunloadHandler),a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments),b==="source"&&this._initSource(),b==="appendTo"&&this.menu.element.appendTo(a(c||"body",this.element[0].ownerDocument)[0]),b==="disabled"&&c&&this.xhr&&this.xhr.abort()},_initSource:function(){var b=this,d,e;a.isArray(this.options.source)?(d=this.options.source,this.source=function(b,c){c(a.ui.autocomplete.filter(d,b.term))}):typeof this.options.source=="string"?(e=this.options.source,this.source=function(d,f){b.xhr&&b.xhr.abort(),b.xhr=a.ajax({url:e,data:d,dataType:"json",autocompleteRequest:++c,success:function(a,b){this.autocompleteRequest===c&&f(a)},error:function(){this.autocompleteRequest===c&&f([])}})}):this.source=this.options.source},search:function(a,b){a=a!=null?a:this.element.val(),this.term=this.element.val();if(a.length<this.options.minLength)return this.close(b);clearTimeout(this.closing);if(this._trigger("search",b)!==!1)return this._search(a)},_search:function(a){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.source({term:a},this.response)},_response:function(a){!this.options.disabled&&a&&a.length?(a=this._normalize(a),this._suggest(a),this._trigger("open")):this.close(),this.pending--,this.pending||this.element.removeClass("ui-autocomplete-loading")},close:function(a){clearTimeout(this.closing),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.deactivate(),this._trigger("close",a))},_change:function(a){this.previous!==this.element.val()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(b){if(b.length&&b[0].label&&b[0].value)return b;return a.map(b,function(b){if(typeof b=="string")return{label:b,value:b};return a.extend({label:b.label||b.value,value:b.value||b.label},b)})},_suggest:function(b){var c=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(c,b),this.menu.deactivate(),this.menu.refresh(),c.show(),this._resizeMenu(),c.position(a.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(new a.Event("mouseover"))},_resizeMenu:function(){var a=this.menu.element;a.outerWidth(Math.max(a.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(b,c){var d=this;a.each(c,function(a,c){d._renderItem(b,c)})},_renderItem:function(b,c){return a("<li></li>").data("item.autocomplete",c).append(a("<a></a>").text(c.label)).appendTo(b)},_move:function(a,b){if(!this.menu.element.is(":visible"))this.search(null,b);else{if(this.menu.first()&&/^previous/.test(a)||this.menu.last()&&/^next/.test(a)){this.element.val(this.term),this.menu.deactivate();return}this.menu[a](b)}},widget:function(){return this.menu.element}}),a.extend(a.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},filter:function(b,c){var d=new RegExp(a.ui.autocomplete.escapeRegex(c),"i");return a.grep(b,function(a){return d.test(a.label||a.value||a)})}})}(jQuery),function(a){a.widget("ui.menu",{_create:function(){var b=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(c){!a(c.target).closest(".ui-menu-item a").length||(c.preventDefault(),b.select(c))}),this.refresh()},refresh:function(){var b=this,c=this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem");c.children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(c){b.activate(c,a(this).parent())}).mouseleave(function(){b.deactivate()})},activate:function(a,b){this.deactivate();if(this.hasScroll()){var c=b.offset().top-this.element.offset().top,d=this.element.scrollTop(),e=this.element.height();c<0?this.element.scrollTop(d+c):c>=e&&this.element.scrollTop(d+c-e+b.height())}this.active=b.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end(),this._trigger("focus",a,{item:b})},deactivate:function(){!this.active||(this.active.children("a").removeClass("ui-state-hover").removeAttr("id"),this._trigger("blur"),this.active=null)},next:function(a){this.move("next",".ui-menu-item:first",a)},previous:function(a){this.move("prev",".ui-menu-item:last",a)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},move:function(a,b,c){if(!this.active)this.activate(c,this.element.children(b));else{var d=this.active[a+"All"](".ui-menu-item").eq(0);d.length?this.activate(c,d):this.activate(c,this.element.children(b))}},nextPage:function(b){if(this.hasScroll()){if(!this.active||this.last()){this.activate(b,this.element.children(".ui-menu-item:first"));return}var c=this.active.offset().top,d=this.element.height(),e=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c-d+a(this).height();return b<10&&b>-10});e.length||(e=this.element.children(".ui-menu-item:last")),this.activate(b,e)}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))},previousPage:function(b){if(this.hasScroll()){if(!this.active||this.first()){this.activate(b,this.element.children(".ui-menu-item:last"));return}var c=this.active.offset().top,d=this.element.height();result=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c+d-a(this).height();return b<10&&b>-10}),result.length||(result=this.element.children(".ui-menu-item:first")),this.activate(b,result)}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))},hasScroll:function(){return this.element.height()<this.element[a.fn.prop?"prop":"attr"]("scrollHeight")},select:function(a){this._trigger("selected",a,{item:this.active})}})}(jQuery),function(a,b){var c,d,e,f,g="ui-button ui-widget ui-state-default ui-corner-all",h="ui-state-hover ui-state-active ",i="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",j=function(){var b=a(this).find(":ui-button");setTimeout(function(){b.button("refresh")},1)},k=function(b){var c=b.name,d=b.form,e=a([]);c&&(d?e=a(d).find("[name='"+c+"']"):e=a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form}));return e};a.widget("ui.button",{options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",j),typeof this.options.disabled!="boolean"&&(this.options.disabled=this.element.propAttr("disabled")),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var b=this,h=this.options,i=this.type==="checkbox"||this.type==="radio",l="ui-state-hover"+(i?"":" ui-state-active"),m="ui-state-focus";h.label===null&&(h.label=this.buttonElement.html()),this.element.is(":disabled")&&(h.disabled=!0),this.buttonElement.addClass(g).attr("role","button").bind("mouseenter.button",function(){h.disabled||(a(this).addClass("ui-state-hover"),this===c&&a(this).addClass("ui-state-active"))}).bind("mouseleave.button",function(){h.disabled||a(this).removeClass(l)}).bind("click.button",function(a){h.disabled&&(a.preventDefault(),a.stopImmediatePropagation())}),this.element.bind("focus.button",function(){b.buttonElement.addClass(m)}).bind("blur.button",function(){b.buttonElement.removeClass(m)}),i&&(this.element.bind("change.button",function(){f||b.refresh()}),this.buttonElement.bind("mousedown.button",function(a){h.disabled||(f=!1,d=a.pageX,e=a.pageY)}).bind("mouseup.button",function(a){!h.disabled&&(d!==a.pageX||e!==a.pageY)&&(f=!0)})),this.type==="checkbox"?this.buttonElement.bind("click.button",function(){if(h.disabled||f)return!1;a(this).toggleClass("ui-state-active"),b.buttonElement.attr("aria-pressed",b.element[0].checked)}):this.type==="radio"?this.buttonElement.bind("click.button",function(){if(h.disabled||f)return!1;a(this).addClass("ui-state-active"),b.buttonElement.attr("aria-pressed","true");var c=b.element[0];k(c).not(c).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown.button",function(){if(h.disabled)return!1;a(this).addClass("ui-state-active"),c=this,a(document).one("mouseup",function(){c=null})}).bind("mouseup.button",function(){if(h.disabled)return!1;a(this).removeClass("ui-state-active")}).bind("keydown.button",function(b){if(h.disabled)return!1;(b.keyCode==a.ui.keyCode.SPACE||b.keyCode==a.ui.keyCode.ENTER)&&a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(b){b.keyCode===a.ui.keyCode.SPACE&&a(this).click()})),this._setOption("disabled",h.disabled),this._resetButton()},_determineButtonType:function(){this.element.is(":checkbox")?this.type="checkbox":this.element.is(":radio")?this.type="radio":this.element.is("input")?this.type="input":this.type="button";if(this.type==="checkbox"||this.type==="radio"){var a=this.element.parents().filter(":last"),b="label[for='"+this.element.attr("id")+"']";this.buttonElement=a.find(b),this.buttonElement.length||(a=a.length?a.siblings():this.element.siblings(),this.buttonElement=a.filter(b),this.buttonElement.length||(this.buttonElement=a.find(b))),this.element.addClass("ui-helper-hidden-accessible");var c=this.element.is(":checked");c&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.attr("aria-pressed",c)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(g+" "+h+" "+i).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title"),a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);b==="disabled"?c?this.element.propAttr("disabled",!0):this.element.propAttr("disabled",!1):this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b),this.type==="radio"?k(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):this.type==="checkbox"&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if(this.type==="input")this.options.label&&this.element.val(this.options.label);else{var b=this.buttonElement.removeClass(i),c=a("<span></span>",this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),d=this.options.icons,e=d.primary&&d.secondary,f=[];d.primary||d.secondary?(this.options.text&&f.push("ui-button-text-icon"+(e?"s":d.primary?"-primary":"-secondary")),d.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+d.primary+"'></span>"),d.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+d.secondary+"'></span>"),this.options.text||(f.push(e?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||b.attr("title",c))):f.push("ui-button-text-only"),b.addClass(f.join(" "))}}}),a.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(b,c){b==="disabled"&&this.buttons.button("option",b,c),a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){var b=this.element.css("direction")==="rtl";this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(b?"ui-corner-left":"ui-corner-right").end().end()},destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy"),a.Widget.prototype.destroy.call(this)}})}(jQuery),function($,undefined){function isArray(a){return a&&($.browser.safari&&typeof a=="object"&&a.length||a.constructor&&a.constructor.toString().match(/\Array\(\)/))}function extendRemove(a,b){$.extend(a,b);for(var c in b)if(b[c]==null||b[c]==undefined)a[c]=b[c];return a}function bindHover(a){var b="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return a.bind("mouseout",function(a){var c=$(a.target).closest(b);!c.length||c.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")}).bind("mouseover",function(c){var d=$(c.target).closest(b);!$.datepicker._isDisabledDatepicker(instActive.inline?a.parent()[0]:instActive.input[0])&&!!d.length&&(d.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),d.addClass("ui-state-hover"),d.hasClass("ui-datepicker-prev")&&d.addClass("ui-datepicker-prev-hover"),d.hasClass("ui-datepicker-next")&&d.addClass("ui-datepicker-next-hover"))})}function Datepicker(){this.debug=!1,this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},$.extend(this._defaults,this.regional[""]),this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}$.extend($.ui,{datepicker:{version:"1.8.17"}});var PROP_NAME="datepicker"
,dpuuid=(new Date).getTime(),instActive;$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(a){extendRemove(this._defaults,a||{});return this},_attachDatepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase(),inline=nodeName=="div"||nodeName=="span";target.id||(this.uuid+=1,target.id="dp"+this.uuid);var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{}),nodeName=="input"?this._connectDatepicker(target,inst):inline&&this._inlineDatepicker(target,inst)},_newInst:function(a,b){var c=a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return{id:c,input:a,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:b?bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')):this.dpDiv}},_connectDatepicker:function(a,b){var c=$(a);b.append=$([]),b.trigger=$([]);c.hasClass(this.markerClassName)||(this._attachments(c,b),c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(a,c,d){b.settings[c]=d}).bind("getData.datepicker",function(a,c){return this._get(b,c)}),this._autoSize(b),$.data(a,PROP_NAME,b),b.settings.disabled&&this._disableDatepicker(a))},_attachments:function(a,b){var c=this._get(b,"appendText"),d=this._get(b,"isRTL");b.append&&b.append.remove(),c&&(b.append=$('<span class="'+this._appendClass+'">'+c+"</span>"),a[d?"before":"after"](b.append)),a.unbind("focus",this._showDatepicker),b.trigger&&b.trigger.remove();var e=this._get(b,"showOn");(e=="focus"||e=="both")&&a.focus(this._showDatepicker);if(e=="button"||e=="both"){var f=this._get(b,"buttonText"),g=this._get(b,"buttonImage");b.trigger=$(this._get(b,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:g,alt:f,title:f}):$('<button type="button"></button>').addClass(this._triggerClass).html(g==""?f:$("<img/>").attr({src:g,alt:f,title:f}))),a[d?"before":"after"](b.trigger),b.trigger.click(function(){$.datepicker._datepickerShowing&&$.datepicker._lastInput==a[0]?$.datepicker._hideDatepicker():$.datepicker._showDatepicker(a[0]);return!1})}},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");if(c.match(/[DM]/)){var d=function(a){var b=0,c=0;for(var d=0;d<a.length;d++)a[d].length>b&&(b=a[d].length,c=d);return c};b.setMonth(d(this._get(a,c.match(/MM/)?"monthNames":"monthNamesShort"))),b.setDate(d(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())}a.input.attr("size",this._formatDate(a,b).length)}},_inlineDatepicker:function(a,b){var c=$(a);c.hasClass(this.markerClassName)||(c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(a,c,d){b.settings[c]=d}).bind("getData.datepicker",function(a,c){return this._get(b,c)}),$.data(a,PROP_NAME,b),this._setDate(b,this._getDefaultDate(b),!0),this._updateDatepicker(b),this._updateAlternate(b),b.settings.disabled&&this._disableDatepicker(a),b.dpDiv.css("display","block"))},_dialogDatepicker:function(a,b,c,d,e){var f=this._dialogInst;if(!f){this.uuid+=1;var g="dp"+this.uuid;this._dialogInput=$('<input type="text" id="'+g+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>'),this._dialogInput.keydown(this._doKeyDown),$("body").append(this._dialogInput),f=this._dialogInst=this._newInst(this._dialogInput,!1),f.settings={},$.data(this._dialogInput[0],PROP_NAME,f)}extendRemove(f.settings,d||{}),b=b&&b.constructor==Date?this._formatDate(f,b):b,this._dialogInput.val(b),this._pos=e?e.length?e:[e.pageX,e.pageY]:null;if(!this._pos){var h=document.documentElement.clientWidth,i=document.documentElement.clientHeight,j=document.documentElement.scrollLeft||document.body.scrollLeft,k=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[h/2-100+j,i/2-150+k]}this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),f.settings.onSelect=c,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),$.blockUI&&$.blockUI(this.dpDiv),$.data(this._dialogInput[0],PROP_NAME,f);return this},_destroyDatepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);if(!!b.hasClass(this.markerClassName)){var d=a.nodeName.toLowerCase();$.removeData(a,PROP_NAME),d=="input"?(c.append.remove(),c.trigger.remove(),b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):(d=="div"||d=="span")&&b.removeClass(this.markerClassName).empty()}},_enableDatepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);if(!!b.hasClass(this.markerClassName)){var d=a.nodeName.toLowerCase();if(d=="input")a.disabled=!1,c.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""});else if(d=="div"||d=="span"){var e=b.children("."+this._inlineClass);e.children().removeClass("ui-state-disabled"),e.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")}this._disabledInputs=$.map(this._disabledInputs,function(b){return b==a?null:b})}},_disableDatepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);if(!!b.hasClass(this.markerClassName)){var d=a.nodeName.toLowerCase();if(d=="input")a.disabled=!0,c.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"});else if(d=="div"||d=="span"){var e=b.children("."+this._inlineClass);e.children().addClass("ui-state-disabled"),e.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")}this._disabledInputs=$.map(this._disabledInputs,function(b){return b==a?null:b}),this._disabledInputs[this._disabledInputs.length]=a}},_isDisabledDatepicker:function(a){if(!a)return!1;for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return!0;return!1},_getInst:function(a){try{return $.data(a,PROP_NAME)}catch(b){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(a,b,c){var d=this._getInst(a);if(arguments.length==2&&typeof b=="string")return b=="defaults"?$.extend({},$.datepicker._defaults):d?b=="all"?$.extend({},d.settings):this._get(d,b):null;var e=b||{};typeof b=="string"&&(e={},e[b]=c);if(d){this._curInst==d&&this._hideDatepicker();var f=this._getDateDatepicker(a,!0),g=this._getMinMaxDate(d,"min"),h=this._getMinMaxDate(d,"max");extendRemove(d.settings,e),g!==null&&e.dateFormat!==undefined&&e.minDate===undefined&&(d.settings.minDate=this._formatDate(d,g)),h!==null&&e.dateFormat!==undefined&&e.maxDate===undefined&&(d.settings.maxDate=this._formatDate(d,h)),this._attachments($(a),d),this._autoSize(d),this._setDate(d,f),this._updateAlternate(d),this._updateDatepicker(d)}},_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)},_refreshDatepicker:function(a){var b=this._getInst(a);b&&this._updateDatepicker(b)},_setDateDatepicker:function(a,b){var c=this._getInst(a);c&&(this._setDate(c,b),this._updateDatepicker(c),this._updateAlternate(c))},_getDateDatepicker:function(a,b){var c=this._getInst(a);c&&!c.inline&&this._setDateFromField(c,b);return c?this._getDate(c):null},_doKeyDown:function(a){var b=$.datepicker._getInst(a.target),c=!0,d=b.dpDiv.is(".ui-datepicker-rtl");b._keyEvent=!0;if($.datepicker._datepickerShowing)switch(a.keyCode){case 9:$.datepicker._hideDatepicker(),c=!1;break;case 13:var e=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",b.dpDiv);e[0]&&$.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,e[0]);var f=$.datepicker._get(b,"onSelect");if(f){var g=$.datepicker._formatDate(b);f.apply(b.input?b.input[0]:null,[g,b])}else $.datepicker._hideDatepicker();return!1;case 27:$.datepicker._hideDatepicker();break;case 33:$.datepicker._adjustDate(a.target,a.ctrlKey?-$.datepicker._get(b,"stepBigMonths"):-$.datepicker._get(b,"stepMonths"),"M");break;case 34:$.datepicker._adjustDate(a.target,a.ctrlKey?+$.datepicker._get(b,"stepBigMonths"):+$.datepicker._get(b,"stepMonths"),"M");break;case 35:(a.ctrlKey||a.metaKey)&&$.datepicker._clearDate(a.target),c=a.ctrlKey||a.metaKey;break;case 36:(a.ctrlKey||a.metaKey)&&$.datepicker._gotoToday(a.target),c=a.ctrlKey||a.metaKey;break;case 37:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,d?1:-1,"D"),c=a.ctrlKey||a.metaKey,a.originalEvent.altKey&&$.datepicker._adjustDate(a.target,a.ctrlKey?-$.datepicker._get(b,"stepBigMonths"):-$.datepicker._get(b,"stepMonths"),"M");break;case 38:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,-7,"D"),c=a.ctrlKey||a.metaKey;break;case 39:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,d?-1:1,"D"),c=a.ctrlKey||a.metaKey,a.originalEvent.altKey&&$.datepicker._adjustDate(a.target,a.ctrlKey?+$.datepicker._get(b,"stepBigMonths"):+$.datepicker._get(b,"stepMonths"),"M");break;case 40:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,7,"D"),c=a.ctrlKey||a.metaKey;break;default:c=!1}else a.keyCode==36&&a.ctrlKey?$.datepicker._showDatepicker(this):c=!1;c&&(a.preventDefault(),a.stopPropagation())},_doKeyPress:function(a){var b=$.datepicker._getInst(a.target);if($.datepicker._get(b,"constrainInput")){var c=$.datepicker._possibleChars($.datepicker._get(b,"dateFormat")),d=String.fromCharCode(a.charCode==undefined?a.keyCode:a.charCode);return a.ctrlKey||a.metaKey||d<" "||!c||c.indexOf(d)>-1}},_doKeyUp:function(a){var b=$.datepicker._getInst(a.target);if(b.input.val()!=b.lastVal)try{var c=$.datepicker.parseDate($.datepicker._get(b,"dateFormat"),b.input?b.input.val():null,$.datepicker._getFormatConfig(b));c&&($.datepicker._setDateFromField(b),$.datepicker._updateAlternate(b),$.datepicker._updateDatepicker(b))}catch(a){$.datepicker.log(a)}return!0},_showDatepicker:function(a){a=a.target||a,a.nodeName.toLowerCase()!="input"&&(a=$("input",a.parentNode)[0]);if(!$.datepicker._isDisabledDatepicker(a)&&$.datepicker._lastInput!=a){var b=$.datepicker._getInst(a);$.datepicker._curInst&&$.datepicker._curInst!=b&&($.datepicker._curInst.dpDiv.stop(!0,!0),b&&$.datepicker._datepickerShowing&&$.datepicker._hideDatepicker($.datepicker._curInst.input[0]));var c=$.datepicker._get(b,"beforeShow"),d=c?c.apply(a,[a,b]):{};if(d===!1)return;extendRemove(b.settings,d),b.lastVal=null,$.datepicker._lastInput=a,$.datepicker._setDateFromField(b),$.datepicker._inDialog&&(a.value=""),$.datepicker._pos||($.datepicker._pos=$.datepicker._findPos(a),$.datepicker._pos[1]+=a.offsetHeight);var e=!1;$(a).parents().each(function(){e|=$(this).css("position")=="fixed";return!e}),e&&$.browser.opera&&($.datepicker._pos[0]-=document.documentElement.scrollLeft,$.datepicker._pos[1]-=document.documentElement.scrollTop);var f={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos=null,b.dpDiv.empty(),b.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),$.datepicker._updateDatepicker(b),f=$.datepicker._checkOffset(b,f,e),b.dpDiv.css({position:$.datepicker._inDialog&&$.blockUI?"static":e?"fixed":"absolute",display:"none",left:f.left+"px",top:f.top+"px"});if(!b.inline){var g=$.datepicker._get(b,"showAnim"),h=$.datepicker._get(b,"duration"),i=function(){var a=b.dpDiv.find("iframe.ui-datepicker-cover");if(!!a.length){var c=$.datepicker._getBorders(b.dpDiv);a.css({left:-c[0],top:-c[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()})}};b.dpDiv.zIndex($(a).zIndex()+1),$.datepicker._datepickerShowing=!0,$.effects&&$.effects[g]?b.dpDiv.show(g,$.datepicker._get(b,"showOptions"),h,i):b.dpDiv[g||"show"](g?h:null,i),(!g||!h)&&i(),b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus(),$.datepicker._curInst=b}}},_updateDatepicker:function(a){var b=this;b.maxRows=4;var c=$.datepicker._getBorders(a.dpDiv);instActive=a,a.dpDiv.empty().append(this._generateHTML(a));var d=a.dpDiv.find("iframe.ui-datepicker-cover");!d.length||d.css({left:-c[0],top:-c[1],width:a.dpDiv.outerWidth(),height:a.dpDiv.outerHeight()}),a.dpDiv.find("."+this._dayOverClass+" a").mouseover();var e=this._getNumberOfMonths(a),f=e[1],g=17;a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),f>1&&a.dpDiv.addClass("ui-datepicker-multi-"+f).css("width",g*f+"em"),a.dpDiv[(e[0]!=1||e[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi"),a.dpDiv[(this._get(a,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),a==$.datepicker._curInst&&$.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&a.input[0]!=document.activeElement&&a.input.focus();if(a.yearshtml){var h=a.yearshtml;setTimeout(function(){h===a.yearshtml&&a.yearshtml&&a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml),h=a.yearshtml=null},0)}},_getBorders:function(a){var b=function(a){return{thin:1,medium:2,thick:3}[a]||a};return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]},_checkOffset:function(a,b,c){var d=a.dpDiv.outerWidth(),e=a.dpDiv.outerHeight(),f=a.input?a.input.outerWidth():0,g=a.input?a.input.outerHeight():0,h=document.documentElement.clientWidth+$(document).scrollLeft(),i=document.documentElement.clientHeight+$(document).scrollTop();b.left-=this._get(a,"isRTL")?d-f:0,b.left-=c&&b.left==a.input.offset().left?$(document).scrollLeft():0,b.top-=c&&b.top==a.input.offset().top+g?$(document).scrollTop():0,b.left-=Math.min(b.left,b.left+d>h&&h>d?Math.abs(b.left+d-h):0),b.top-=Math.min(b.top,b.top+e>i&&i>e?Math.abs(e+g):0);return b},_findPos:function(a){var b=this._getInst(a),c=this._get(b,"isRTL");while(a&&(a.type=="hidden"||a.nodeType!=1||$.expr.filters.hidden(a)))a=a[c?"previousSibling":"nextSibling"];var d=$(a).offset();return[d.left,d.top]},_hideDatepicker:function(a){var b=this._curInst;if(!(!b||a&&b!=$.data(a,PROP_NAME))&&this._datepickerShowing){var c=this._get(b,"showAnim"),d=this._get(b,"duration"),e=this,f=function(){$.datepicker._tidyDialog(b),e._curInst=null};$.effects&&$.effects[c]?b.dpDiv.hide(c,$.datepicker._get(b,"showOptions"),d,f):b.dpDiv[c=="slideDown"?"slideUp":c=="fadeIn"?"fadeOut":"hide"](c?d:null,f),c||f(),this._datepickerShowing=!1;var g=this._get(b,"onClose");g&&g.apply(b.input?b.input[0]:null,[b.input?b.input.val():"",b]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),$.blockUI&&($.unblockUI(),$("body").append(this.dpDiv))),this._inDialog=!1}},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(a){if(!!$.datepicker._curInst){var b=$(a.target),c=$.datepicker._getInst(b[0]);(b[0].id!=$.datepicker._mainDivId&&b.parents("#"+$.datepicker._mainDivId).length==0&&!b.hasClass($.datepicker.markerClassName)&&!b.hasClass($.datepicker._triggerClass)&&$.datepicker._datepickerShowing&&(!$.datepicker._inDialog||!$.blockUI)||b.hasClass($.datepicker.markerClassName)&&$.datepicker._curInst!=c)&&$.datepicker._hideDatepicker()}},_adjustDate:function(a,b,c){var d=$(a),e=this._getInst(d[0]);this._isDisabledDatepicker(d[0])||(this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):0),c),this._updateDatepicker(e))},_gotoToday:function(a){var b=$(a),c=this._getInst(b[0]);if(this._get(c,"gotoCurrent")&&c.currentDay)c.selectedDay=c.currentDay,c.drawMonth=c.selectedMonth=c.currentMonth,c.drawYear=c.selectedYear=c.currentYear;else{var d=new Date;c.selectedDay=d.getDate(),c.drawMonth=c.selectedMonth=d.getMonth(),c.drawYear=c.selectedYear=d.getFullYear()}this._notifyChange(c),this._adjustDate(b)},_selectMonthYear:function(a,b,c){var d=$(a),e=this._getInst(d[0]);e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c=="M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10),this._notifyChange(e),this._adjustDate(d)},_selectDay:function(a,b,c,d){var e=$(a);if(!$(d).hasClass(this._unselectableClass)&&!this._isDisabledDatepicker(e[0])){var f=this._getInst(e[0]);f.selectedDay=f.currentDay=$("a",d).html(),f.selectedMonth=f.currentMonth=b,f.selectedYear=f.currentYear=c,this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear))}},_clearDate:function(a){var b=$(a),c=this._getInst(b[0]);this._selectDate(b,"")},_selectDate:function(a,b){var c=$(a),d=this._getInst(c[0]);b=b!=null?b:this._formatDate(d),d.input&&d.input.val(b),this._updateAlternate(d);var e=this._get(d,"onSelect");e?e.apply(d.input?d.input[0]:null,[b,d]):d.input&&d.input.trigger("change"),d.inline?this._updateDatepicker(d):(this._hideDatepicker(),this._lastInput=d.input[0],typeof d.input[0]!="object"&&d.input.focus(),this._lastInput=null)},_updateAlternate:function(a){var b=this._get(a,"altField");if(b){var c=this._get(a,"altFormat")||this._get(a,"dateFormat"),d=this._getDate(a),e=this.formatDate(c,d,this._getFormatConfig(a));$(b).each(function(){$(this).val(e)})}},noWeekends:function(a){var b=a.getDay();return[b>0&&b<6,""]},iso8601Week:function(a){var b=new Date(a.getTime());b.setDate(b.getDate()+4-(b.getDay()||7));var c=b.getTime();b.setMonth(0),b.setDate(1);return Math.floor(Math.round((c-b)/864e5)/7)+1},parseDate:function(a,b,c){if(a==null||b==null)throw"Invalid arguments";b=typeof b=="object"?b.toString():b+"";if(b=="")return null;var d=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff;d=typeof d!="string"?d:(new Date).getFullYear()%100+parseInt(d,10);var e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?c.dayNames:null)||this._defaults.dayNames,g=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,h=(c?c.monthNames:null)||this._defaults.monthNames,i=-1,j=-1,k=-1,l=-1,m=!1,n=function(b){var c=s+1<a.length&&a.charAt(s+1)==b;c&&s++;return c},o=function(a){var c=n(a),d=a=="@"?14:a=="!"?20:a=="y"&&c?4:a=="o"?3:2,e=new RegExp("^\\d{1,"+d+"}"),f=b.substring(r).match(e);if(!f)throw"Missing number at position "+r;r+=f[0].length;return parseInt(f[0],10)},p=function(a,c,d){var e=$.map(n(a)?d:c,function(a,b){return[[b,a]]}).sort(function(a,b){return-(a[1].length-b[1].length)}),f=-1;$.each(e,function(a,c){var d=c[1];if(b.substr(r,d.length).toLowerCase()==d.toLowerCase()){f=c[0],r+=d.length;return!1}});if(f!=-1)return f+1;throw"Unknown name at position "+r},q=function(){if(b.charAt(r)!=a.charAt(s))throw"Unexpected literal at position "+r;r++},r=0;for(var s=0;s<a.length;s++)if(m)a.charAt(s)=="'"&&!n("'")?m=!1:q();else switch(a.charAt(s)){case"d":k=o("d");break;case"D":p("D",e,f);break;case"o":l=o("o");break;case"m":j=o("m");break;case"M":j=p("M",g,h);break;case"y":i=o("y");break;case"@":var t=new Date(o("@"));i=t.getFullYear(),j=t.getMonth()+1,k=t.getDate();break;case"!":var t=new Date((o("!")-this._ticksTo1970)/1e4);i=t.getFullYear(),j=t.getMonth()+1,k=t.getDate();break;case"'":n("'")?q():m=!0;break;default:q()}if(r<b.length)throw"Extra/unparsed characters found in date: "+b.substring(r);i==-1?i=(new Date).getFullYear():i<100&&(i+=(new Date).getFullYear()-(new Date).getFullYear()%100+(i<=d?0:-100));if(l>-1){j=1,k=l;for(;;){var u=this._getDaysInMonth(i,j-1);if(k<=u)break;j++,k-=u}}var t=this._daylightSavingAdjust(new Date(i,j-1,k));if(t.getFullYear()!=i||t.getMonth()+1!=j||t.getDate()!=k)throw"Invalid date";return t},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1e7,formatDate:function(a,b,c){if(!b)return"";var d=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,e=(c?c.dayNames:null)||this._defaults.dayNames,f=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,g=(c?c.monthNames:null)||this._defaults.monthNames,h=function(b){var c=m+1<a.length&&a.charAt(m+1)==b;c&&m++;return c},i=function(a,b,c){var d=""+b;if(h(a))while(d.length<c)d="0"+d;return d},j=function(a,b,c,d){return h(a)?d[b]:c[b]},k="",l=!1;if(b)for(var m=0;m<a.length;m++)if(l)a.charAt(m)=="'"&&!h("'")?l=!1:k+=a.charAt(m);else switch(a.charAt(m)){case"d":k+=i("d",b.getDate(),2);break;case"D":k+=j("D",b.getDay(),d,e);break;case"o":k+=i("o",Math.round(((new Date(b.getFullYear(),b.getMonth(),b.getDate())).getTime()-(new Date(b.getFullYear(),0,0)).getTime())/864e5),3);break;case"m":k+=i("m",b.getMonth()+1,2);break;case"M":k+=j("M",b.getMonth(),f,g);break;case"y":k+=h("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;break;case"@":k+=b.getTime();break;case"!":k+=b.getTime()*1e4+this._ticksTo1970;break;case"'":h("'")?k+="'":l=!0;break;default:k+=a.charAt(m)}return k},_possibleChars:function(a){var b="",c=!1,d=function(b){var c=e+1<a.length&&a.charAt(e+1)==b;c&&e++;return c};for(var e=0;e<a.length;e++)if(c)a.charAt(e)=="'"&&!d("'")?c=!1:b+=a.charAt(e);else switch(a.charAt(e)){case"d":case"m":case"y":case"@":b+="0123456789";break;case"D":case"M":return null;case"'":d("'")?b+="'":c=!0;break;default:b+=a.charAt(e)}return b},_get:function(a,b){return a.settings[b]!==undefined?a.settings[b]:this._defaults[b]},_setDateFromField:function(a,b){if(a.input.val()!=a.lastVal){var c=this._get(a,"dateFormat"),d=a.lastVal=a.input?a.input.val():null,e,f;e=f=this._getDefaultDate(a);var g=this._getFormatConfig(a);try{e=this.parseDate(c,d,g)||f}catch(h){this.log(h),d=b?"":d}a.selectedDay=e.getDate(),a.drawMonth=a.selectedMonth=e.getMonth(),a.drawYear=a.selectedYear=e.getFullYear(),a.currentDay=d?e.getDate():0,a.currentMonth=d?e.getMonth():0,a.currentYear=d?e.getFullYear():0,this._adjustInstDate(a)}},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))},_determineDate:function(a,b,c){var d=function(a){var b=new Date;b.setDate(b.getDate()+a);return b},e=function(b){try{return $.datepicker.parseDate($.datepicker._get(a,"dateFormat"),b,$.datepicker._getFormatConfig(a))}catch(c){}var d=(b.toLowerCase().match(/^c/)?$.datepicker._getDate(a):null)||new Date,e=d.getFullYear(),f=d.getMonth(),g=d.getDate(),h=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,i=h.exec(b);while(i){switch(i[2]||"d"){case"d":case"D":g+=parseInt(i[1],10);break;case"w":case"W":g+=parseInt(i[1],10)*7;break;case"m":case"M":f+=parseInt(i[1],10),g=Math.min(g,$.datepicker._getDaysInMonth(e,f));break;case"y":case"Y":e+=parseInt(i[1],10),g=Math.min(g,$.datepicker._getDaysInMonth(e,f))}i=h.exec(b)}return new Date(e,f,g)},f=b==null||b===""?c:typeof b=="string"?e(b):typeof b=="number"?isNaN(b)?c:d(b):new Date(b.getTime());f=f&&f.toString()=="Invalid Date"?c:f,f&&(f.setHours(0),f.setMinutes(0),f.setSeconds(0),f.setMilliseconds(0));return this._daylightSavingAdjust(f)},_daylightSavingAdjust:function(a){if(!a)return null;a.setHours(a.getHours()>12?a.getHours()+2:0);return a},_setDate:function(a,b,c){var d=!b,e=a.selectedMonth,f=a.selectedYear,g=this._restrictMinMax(a,this._determineDate(a,b,new Date));a.selectedDay=a.currentDay=g.getDate(),a.drawMonth=a.selectedMonth=a.currentMonth=g.getMonth(),a.drawYear=a.selectedYear=a.currentYear=g.getFullYear(),(e!=a.selectedMonth||f!=a.selectedYear)&&!c&&this._notifyChange(a),this._adjustInstDate(a),a.input&&a.input.val(d?"":this._formatDate(a))},_getDate:function(a){var b=!a.currentYear||a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return b},_generateHTML:function(a){var b=new Date;b=this._daylightSavingAdjust(new Date(b.getFullYear(),b.getMonth(),b.getDate()));var c=this._get(a,"isRTL"),d=this._get(a,"showButtonPanel"),e=this._get(a,"hideIfNoPrevNext"),f=this._get(a,"navigationAsDateFormat"),g=this._getNumberOfMonths(a),h=this._get(a,"showCurrentAtPos"),i=this._get(a,"stepMonths"),j=g[0]!=1||g[1]!=1,k=this._daylightSavingAdjust(a.currentDay?new Date(a.currentYear,a.currentMonth,a.currentDay):new Date(9999,9,9)),l=this._getMinMaxDate(a,"min"),m=this._getMinMaxDate(a,"max"),n=a.drawMonth-h,o=a.drawYear;n<0&&(n+=12,o--);if(m){var p=this._daylightSavingAdjust(new Date(m.getFullYear(),m.getMonth()-g[0]*g[1]+1,m.getDate()));p=l&&p<l?l:p;while(this._daylightSavingAdjust(new Date(o,n,1))>p)n--,n<0&&(n=11,o--)}a.drawMonth=n,a.drawYear=o;var q=this._get(a,"prevText");q=f?this.formatDate(q,this._daylightSavingAdjust(new Date(o,n-i,1)),this._getFormatConfig(a)):q;var r=this._canAdjustMonth(a,-1,o,n)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._adjustDate('#"+a.id+"', -"+i+", 'M');\""+' title="'+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+q+"</span></a>":e?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+q+"</span></a>",s=this._get(a,"nextText");s=f?this.formatDate(s,this._daylightSavingAdjust(new Date(o,n+i,1)),this._getFormatConfig(a)):s;var t=this._canAdjustMonth(a,1,o,n)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._adjustDate('#"+a.id+"', +"+i+", 'M');\""+' title="'+s+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+s+"</span></a>":e?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+s+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+s+"</span></a>",u=this._get(a,"currentText"),v=this._get(a,"gotoCurrent")&&a.currentDay?k:b;u=f?this.formatDate(u,v,this._getFormatConfig(a)):u;var w=a.inline?"":'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+dpuuid+'.datepicker._hideDatepicker();">'+this._get(a,"closeText")+"</button>",x=d?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?w:"")+(this._isInRange(a,v)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._gotoToday('#"+a.id+"');\""+">"+u+"</button>":"")+(c?"":w)+"</div>":"",y=parseInt(this._get(a,"firstDay"),10);y=isNaN(y)?0:y;var z=this._get(a,"showWeek"),A=this._get(a,"dayNames"),B=this._get(a,"dayNamesShort"),C=this._get(a,"dayNamesMin"),D=this._get(a,"monthNames"),E=this._get(a,"monthNamesShort"),F=this._get(a,"beforeShowDay"),G=this._get(a,"showOtherMonths"),H=this._get(a,"selectOtherMonths"),I=this._get(a,"calculateWeek")||this.iso8601Week,J=this._getDefaultDate(a),K="";for(var L=0;L<g[0];L++){var M="";this.maxRows=4;for(var N=0;N<g[1];N++){var O=this._daylightSavingAdjust(new Date(o,n,a.selectedDay)),P=" ui-corner-all",Q="";if(j){Q+='<div class="ui-datepicker-group';if(g[1]>1)switch(N){case 0:Q+=" ui-datepicker-group-first",P=" ui-corner-"+(c?"right":"left");break;case g[1]-1:Q+=" ui-datepicker-group-last",P=" ui-corner-"+(c?"left":"right");break;default:Q+=" ui-datepicker-group-middle",P=""}Q+='">'}Q+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+P+'">'+(/all|left/.test(P)&&L==0?c?t:r:"")+(/all|right/.test(P)&&L==0?c?r:t:"")+this._generateMonthYearHeader(a,n,o,l,m,L>0||N>0,D,E)+'</div><table class="ui-datepicker-calendar"><thead>'+"<tr>";var R=z?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":"";for(var S=0;S<7;S++){var T=(S+y)%7;R+="<th"+((S+y+6)%7>=5?' class="ui-datepicker-week-end"':"")+">"+'<span title="'+A[T]+'">'+C[T]+"</span></th>"}Q+=R+"</tr></thead><tbody>";var U=this._getDaysInMonth(o,n);o==a.selectedYear&&n==a.selectedMonth&&(a.selectedDay=Math.min(a.selectedDay,U));var V=(this._getFirstDayOfMonth(o,n)-y+7)%7,W=Math.ceil((V+U)/7),X=j?this.maxRows>W?this.maxRows:W:W;this.maxRows=X;var Y=this._daylightSavingAdjust(new Date(o,n,1-V));for(var Z=0;Z<X;Z++){Q+="<tr>";var _=z?'<td class="ui-datepicker-week-col">'+this._get(a,"calculateWeek")(Y)+"</td>":"";for(var S=0;S<7;S++){var ba=F?F.apply(a.input?a.input[0]:null,[Y]):[!0,""],bb=Y.getMonth()!=n,bc=bb&&!H||!ba[0]||l&&Y<l||m&&Y>m;_+='<td class="'+((S+y+6)%7>=5?" ui-datepicker-week-end":"")+(bb?" ui-datepicker-other-month":"")+(Y.getTime()==O.getTime()&&n==a.selectedMonth&&a._keyEvent||J.getTime()==Y.getTime()&&J.getTime()==O.getTime()?" "+this._dayOverClass:"")+(bc?" "+this._unselectableClass+" ui-state-disabled":"")+(bb&&!G?"":" "+ba[1]+(Y.getTime()==k.getTime()?" "+this._currentClass:"")+(Y.getTime()==b.getTime()?" ui-datepicker-today":""))+'"'+((!bb||G)&&ba[2]?' title="'+ba[2]+'"':"")+(bc?"":' onclick="DP_jQuery_'+dpuuid+".datepicker._selectDay('#"+a.id+"',"+Y.getMonth()+","+Y.getFullYear()+', this);return false;"')+">"+(bb&&!G?"&#xa0;":bc?'<span class="ui-state-default">'+Y.getDate()+"</span>":'<a class="ui-state-default'+(Y.getTime()==b.getTime()?" ui-state-highlight":"")+(Y.getTime()==k.getTime()?" ui-state-active":"")+(bb?" ui-priority-secondary":"")+'" href="#">'+Y.getDate()+"</a>")+"</td>",Y.setDate(Y.getDate()+1),Y=this._daylightSavingAdjust(Y)}Q+=_+"</tr>"}n++,n>11&&(n=0,o++),Q+="</tbody></table>"+(j?"</div>"+(g[0]>0&&N==g[1]-1?'<div class="ui-datepicker-row-break"></div>':""):""),M+=Q}K+=M}K+=x+($.browser.msie&&parseInt($.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':""),a._keyEvent=!1;return K},_generateMonthYearHeader:function(a,b,c,d,e,f,g,h){var i=this._get(a,"changeMonth"),j=this._get(a,"changeYear"),k=this._get(a,"showMonthAfterYear"),l='<div class="ui-datepicker-title">',m="";if(f||!i)m+='<span class="ui-datepicker-month">'+g[b]+"</span>";else{var n=d&&d.getFullYear()==c,o=e&&e.getFullYear()==c;m+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+dpuuid+".datepicker._selectMonthYear('#"+a.id+"', this, 'M');\" "+">";for(var p=0;p<12;p++)(!n||p>=d.getMonth())&&(!o||p<=e.getMonth())&&(m+='<option value="'+p+'"'+(p==b?' selected="selected"':"")+">"+h[p]+"</option>");m+="</select>"}k||(l+=m+(f||!i||!j?"&#xa0;":""));if(!a.yearshtml){a.yearshtml="";if(f||!j)l+='<span class="ui-datepicker-year">'+c+"</span>";else{var q=this._get(a,"yearRange").split(":"),r=(new Date).getFullYear(),s=function(a){var b=a.match(/c[+-].*/)?c+parseInt(a.substring(1),10):a.match(/[+-].*/)?r+parseInt(a,10):parseInt(a,10);return isNaN(b)?r:b},t=s(q[0]),u=Math.max(t,s(q[1]||""));t=d?Math.max(t,d.getFullYear()):t,u=e?Math.min(u,e.getFullYear()):u,a.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+dpuuid+".datepicker._selectMonthYear('#"+a.id+"', this, 'Y');\" "+">";for(;t<=u;t++)a.yearshtml+='<option value="'+t+'"'+(t==c?' selected="selected"':"")+">"+t+"</option>";a.yearshtml+="</select>",l+=a.yearshtml,a.yearshtml=null}}l+=this._get(a,"yearSuffix"),k&&(l+=(f||!i||!j?"&#xa0;":"")+m),l+="</div>";return l},_adjustInstDate:function(a,b,c){var d=a.drawYear+(c=="Y"?b:0),e=a.drawMonth+(c=="M"?b:0),f=Math.min(a.selectedDay,this._getDaysInMonth(d,e))+(c=="D"?b:0),g=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(d,e,f)));a.selectedDay=g.getDate(),a.drawMonth=a.selectedMonth=g.getMonth(),a.drawYear=a.selectedYear=g.getFullYear(),(c=="M"||c=="Y")&&this._notifyChange(a)},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min"),d=this._getMinMaxDate(a,"max"),e=c&&b<c?c:b;e=d&&e>d?d:e;return e},_notifyChange:function(a){var b=this._get(a,"onChangeMonthYear");b&&b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])},_getNumberOfMonths:function(a){var b=this._get(a,"numberOfMonths");return b==null?[1,1]:typeof b=="number"?[1,b]:b},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)},_getDaysInMonth:function(a,b){return 32-this._daylightSavingAdjust(new Date(a,b,32)).getDate()},_getFirstDayOfMonth:function(a,b){return(new Date(a,b,1)).getDay()},_canAdjustMonth:function(a,b,c,d){var e=this._getNumberOfMonths(a),f=this._daylightSavingAdjust(new Date(c,d+(b<0?b:e[0]*e[1]),1));b<0&&f.setDate(this._getDaysInMonth(f.getFullYear(),f.getMonth()));return this._isInRange(a,f)},_isInRange:function(a,b){var c=this._getMinMaxDate(a,"min"),d=this._getMinMaxDate(a,"max");return(!c||b.getTime()>=c.getTime())&&(!d||b.getTime()<=d.getTime())},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10);return{shortYearCutoff:b,dayNamesShort:this._get(a,"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}},_formatDate:function(a,b,c,d){b||(a.currentDay=a.selectedDay,a.currentMonth=a.selectedMonth,a.currentYear=a.selectedYear);var e=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(d,c,b)):this._daylightSavingAdjust(new Date
(a.currentYear,a.currentMonth,a.currentDay));return this.formatDate(this._get(a,"dateFormat"),e,this._getFormatConfig(a))}}),$.fn.datepicker=function(a){if(!this.length)return this;$.datepicker.initialized||($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv),$.datepicker.initialized=!0);var b=Array.prototype.slice.call(arguments,1);if(typeof a=="string"&&(a=="isDisabled"||a=="getDate"||a=="widget"))return $.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this[0]].concat(b));if(a=="option"&&arguments.length==2&&typeof arguments[1]=="string")return $.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this[0]].concat(b));return this.each(function(){typeof a=="string"?$.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this].concat(b)):$.datepicker._attachDatepicker(this,a)})},$.datepicker=new Datepicker,$.datepicker.initialized=!1,$.datepicker.uuid=(new Date).getTime(),$.datepicker.version="1.8.17",window["DP_jQuery_"+dpuuid]=$}(jQuery),function(a,b){var c="ui-dialog ui-widget ui-widget-content ui-corner-all ",d={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},e={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},f=a.attrFn||{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0,click:!0};a.widget("ui.dialog",{options:{autoOpen:!0,buttons:{},closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:!1,maxWidth:!1,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",collision:"fit",using:function(b){var c=a(this).css(b).offset().top;c<0&&a(this).css("top",b.top-c)}},resizable:!0,show:null,stack:!0,title:"",width:300,zIndex:1e3},_create:function(){this.originalTitle=this.element.attr("title"),typeof this.originalTitle!="string"&&(this.originalTitle=""),this.options.title=this.options.title||this.originalTitle;var b=this,d=b.options,e=d.title||"&#160;",f=a.ui.dialog.getTitleId(b.element),g=(b.uiDialog=a("<div></div>")).appendTo(document.body).hide().addClass(c+d.dialogClass).css({zIndex:d.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(c){d.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}).attr({role:"dialog","aria-labelledby":f}).mousedown(function(a){b.moveToTop(!1,a)}),h=b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g),i=(b.uiDialogTitlebar=a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),j=a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){j.addClass("ui-state-hover")},function(){j.removeClass("ui-state-hover")}).focus(function(){j.addClass("ui-state-focus")}).blur(function(){j.removeClass("ui-state-focus")}).click(function(a){b.close(a);return!1}).appendTo(i),k=(b.uiDialogTitlebarCloseText=a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j),l=a("<span></span>").addClass("ui-dialog-title").attr("id",f).html(e).prependTo(i);a.isFunction(d.beforeclose)&&!a.isFunction(d.beforeClose)&&(d.beforeClose=d.beforeclose),i.find("*").add(i).disableSelection(),d.draggable&&a.fn.draggable&&b._makeDraggable(),d.resizable&&a.fn.resizable&&b._makeResizable(),b._createButtons(d.buttons),b._isOpen=!1,a.fn.bgiframe&&g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;a.overlay&&a.overlay.destroy(),a.uiDialog.hide(),a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),a.uiDialog.remove(),a.originalTitle&&a.element.attr("title",a.originalTitle);return a},widget:function(){return this.uiDialog},close:function(b){var c=this,d,e;if(!1!==c._trigger("beforeClose",b)){c.overlay&&c.overlay.destroy(),c.uiDialog.unbind("keypress.ui-dialog"),c._isOpen=!1,c.options.hide?c.uiDialog.hide(c.options.hide,function(){c._trigger("close",b)}):(c.uiDialog.hide(),c._trigger("close",b)),a.ui.dialog.overlay.resize(),c.options.modal&&(d=0,a(".ui-dialog").each(function(){this!==c.uiDialog[0]&&(e=a(this).css("z-index"),isNaN(e)||(d=Math.max(d,e)))}),a.ui.dialog.maxZ=d);return c}},isOpen:function(){return this._isOpen},moveToTop:function(b,c){var d=this,e=d.options,f;if(e.modal&&!b||!e.stack&&!e.modal)return d._trigger("focus",c);e.zIndex>a.ui.dialog.maxZ&&(a.ui.dialog.maxZ=e.zIndex),d.overlay&&(a.ui.dialog.maxZ+=1,d.overlay.$el.css("z-index",a.ui.dialog.overlay.maxZ=a.ui.dialog.maxZ)),f={scrollTop:d.element.scrollTop(),scrollLeft:d.element.scrollLeft()},a.ui.dialog.maxZ+=1,d.uiDialog.css("z-index",a.ui.dialog.maxZ),d.element.attr(f),d._trigger("focus",c);return d},open:function(){if(!this._isOpen){var b=this,c=b.options,d=b.uiDialog;b.overlay=c.modal?new a.ui.dialog.overlay(b):null,b._size(),b._position(c.position),d.show(c.show),b.moveToTop(!0),c.modal&&d.bind("keydown.ui-dialog",function(b){if(b.keyCode===a.ui.keyCode.TAB){var c=a(":tabbable",this),d=c.filter(":first"),e=c.filter(":last");if(b.target===e[0]&&!b.shiftKey){d.focus(1);return!1}if(b.target===d[0]&&b.shiftKey){e.focus(1);return!1}}}),a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(),b._isOpen=!0,b._trigger("open");return b}},_createButtons:function(b){var c=this,d=!1,e=a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=a("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);c.uiDialog.find(".ui-dialog-buttonpane").remove(),typeof b=="object"&&b!==null&&a.each(b,function(){return!(d=!0)}),d&&(a.each(b,function(b,d){d=a.isFunction(d)?{click:d,text:b}:d;var e=a('<button type="button"></button>').click(function(){d.click.apply(c.element[0],arguments)}).appendTo(g);a.each(d,function(a,b){a!=="click"&&(a in f?e[a](b):e.attr(a,b))}),a.fn.button&&e.button()}),e.appendTo(c.uiDialog))},_makeDraggable:function(){function f(a){return{position:a.position,offset:a.offset}}var b=this,c=b.options,d=a(document),e;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(d,g){e=c.height==="auto"?"auto":a(this).height(),a(this).height(a(this).height()).addClass("ui-dialog-dragging"),b._trigger("dragStart",d,f(g))},drag:function(a,c){b._trigger("drag",a,f(c))},stop:function(g,h){c.position=[h.position.left-d.scrollLeft(),h.position.top-d.scrollTop()],a(this).removeClass("ui-dialog-dragging").height(e),b._trigger("dragStop",g,f(h)),a.ui.dialog.overlay.resize()}})},_makeResizable:function(c){function h(a){return{originalPosition:a.originalPosition,originalSize:a.originalSize,position:a.position,size:a.size}}c=c===b?this.options.resizable:c;var d=this,e=d.options,f=d.uiDialog.css("position"),g=typeof c=="string"?c:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:d._minHeight(),handles:g,start:function(b,c){a(this).addClass("ui-dialog-resizing"),d._trigger("resizeStart",b,h(c))},resize:function(a,b){d._trigger("resize",a,h(b))},stop:function(b,c){a(this).removeClass("ui-dialog-resizing"),e.height=a(this).height(),e.width=a(this).width(),d._trigger("resizeStop",b,h(c)),a.ui.dialog.overlay.resize()}}).css("position",f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(b){var c=[],d=[0,0],e;if(b){if(typeof b=="string"||typeof b=="object"&&"0"in b)c=b.split?b.split(" "):[b[0],b[1]],c.length===1&&(c[1]=c[0]),a.each(["left","top"],function(a,b){+c[a]===c[a]&&(d[a]=c[a],c[a]=b)}),b={my:c.join(" "),at:c.join(" "),offset:d.join(" ")};b=a.extend({},a.ui.dialog.prototype.options.position,b)}else b=a.ui.dialog.prototype.options.position;e=this.uiDialog.is(":visible"),e||this.uiDialog.show(),this.uiDialog.css({top:0,left:0}).position(a.extend({of:window},b)),e||this.uiDialog.hide()},_setOptions:function(b){var c=this,f={},g=!1;a.each(b,function(a,b){c._setOption(a,b),a in d&&(g=!0),a in e&&(f[a]=b)}),g&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",f)},_setOption:function(b,d){var e=this,f=e.uiDialog;switch(b){case"beforeclose":b="beforeClose";break;case"buttons":e._createButtons(d);break;case"closeText":e.uiDialogTitlebarCloseText.text(""+d);break;case"dialogClass":f.removeClass(e.options.dialogClass).addClass(c+d);break;case"disabled":d?f.addClass("ui-dialog-disabled"):f.removeClass("ui-dialog-disabled");break;case"draggable":var g=f.is(":data(draggable)");g&&!d&&f.draggable("destroy"),!g&&d&&e._makeDraggable();break;case"position":e._position(d);break;case"resizable":var h=f.is(":data(resizable)");h&&!d&&f.resizable("destroy"),h&&typeof d=="string"&&f.resizable("option","handles",d),!h&&d!==!1&&e._makeResizable(d);break;case"title":a(".ui-dialog-title",e.uiDialogTitlebar).html(""+(d||"&#160;"))}a.Widget.prototype._setOption.apply(e,arguments)},_size:function(){var b=this.options,c,d,e=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0}),b.minWidth>b.width&&(b.width=b.minWidth),c=this.uiDialog.css({height:"auto",width:b.width}).height(),d=Math.max(0,b.minHeight-c);if(b.height==="auto")if(a.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();var f=this.element.css("height","auto").height();e||this.uiDialog.hide(),this.element.height(Math.max(f,d))}else this.element.height(Math.max(b.height-c,0));this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}}),a.extend(a.ui.dialog,{version:"1.8.17",uuid:0,maxZ:0,getTitleId:function(a){var b=a.attr("id");b||(this.uuid+=1,b=this.uuid);return"ui-dialog-title-"+b},overlay:function(b){this.$el=a.ui.dialog.overlay.create(b)}}),a.extend(a.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(b){this.instances.length===0&&(setTimeout(function(){a.ui.dialog.overlay.instances.length&&a(document).bind(a.ui.dialog.overlay.events,function(b){if(a(b.target).zIndex()<a.ui.dialog.overlay.maxZ)return!1})},1),a(document).bind("keydown.dialog-overlay",function(c){b.options.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}),a(window).bind("resize.dialog-overlay",a.ui.dialog.overlay.resize));var c=(this.oldInstances.pop()||a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});a.fn.bgiframe&&c.bgiframe(),this.instances.push(c);return c},destroy:function(b){var c=a.inArray(b,this.instances);c!=-1&&this.oldInstances.push(this.instances.splice(c,1)[0]),this.instances.length===0&&a([document,window]).unbind(".dialog-overlay"),b.remove();var d=0;a.each(this.instances,function(){d=Math.max(d,this.css("z-index"))}),this.maxZ=d},height:function(){var b,c;if(a.browser.msie&&a.browser.version<7){b=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),c=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);return b<c?a(window).height()+"px":b+"px"}return a(document).height()+"px"},width:function(){var b,c;if(a.browser.msie){b=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),c=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);return b<c?a(window).width()+"px":b+"px"}return a(document).width()+"px"},resize:function(){var b=a([]);a.each(a.ui.dialog.overlay.instances,function(){b=b.add(this)}),b.css({width:0,height:0}).css({width:a.ui.dialog.overlay.width(),height:a.ui.dialog.overlay.height()})}}),a.extend(a.ui.dialog.overlay.prototype,{destroy:function(){a.ui.dialog.overlay.destroy(this.$el)}})}(jQuery),function(a,b){a.ui=a.ui||{};var c=/left|center|right/,d=/top|center|bottom/,e="center",f={},g=a.fn.position,h=a.fn.offset;a.fn.position=function(b){if(!b||!b.of)return g.apply(this,arguments);b=a.extend({},b);var h=a(b.of),i=h[0],j=(b.collision||"flip").split(" "),k=b.offset?b.offset.split(" "):[0,0],l,m,n;i.nodeType===9?(l=h.width(),m=h.height(),n={top:0,left:0}):i.setTimeout?(l=h.width(),m=h.height(),n={top:h.scrollTop(),left:h.scrollLeft()}):i.preventDefault?(b.at="left top",l=m=0,n={top:b.of.pageY,left:b.of.pageX}):(l=h.outerWidth(),m=h.outerHeight(),n=h.offset()),a.each(["my","at"],function(){var a=(b[this]||"").split(" ");a.length===1&&(a=c.test(a[0])?a.concat([e]):d.test(a[0])?[e].concat(a):[e,e]),a[0]=c.test(a[0])?a[0]:e,a[1]=d.test(a[1])?a[1]:e,b[this]=a}),j.length===1&&(j[1]=j[0]),k[0]=parseInt(k[0],10)||0,k.length===1&&(k[1]=k[0]),k[1]=parseInt(k[1],10)||0,b.at[0]==="right"?n.left+=l:b.at[0]===e&&(n.left+=l/2),b.at[1]==="bottom"?n.top+=m:b.at[1]===e&&(n.top+=m/2),n.left+=k[0],n.top+=k[1];return this.each(function(){var c=a(this),d=c.outerWidth(),g=c.outerHeight(),h=parseInt(a.curCSS(this,"marginLeft",!0))||0,i=parseInt(a.curCSS(this,"marginTop",!0))||0,o=d+h+(parseInt(a.curCSS(this,"marginRight",!0))||0),p=g+i+(parseInt(a.curCSS(this,"marginBottom",!0))||0),q=a.extend({},n),r;b.my[0]==="right"?q.left-=d:b.my[0]===e&&(q.left-=d/2),b.my[1]==="bottom"?q.top-=g:b.my[1]===e&&(q.top-=g/2),f.fractions||(q.left=Math.round(q.left),q.top=Math.round(q.top)),r={left:q.left-h,top:q.top-i},a.each(["left","top"],function(c,e){a.ui.position[j[c]]&&a.ui.position[j[c]][e](q,{targetWidth:l,targetHeight:m,elemWidth:d,elemHeight:g,collisionPosition:r,collisionWidth:o,collisionHeight:p,offset:k,my:b.my,at:b.at})}),a.fn.bgiframe&&c.bgiframe(),c.offset(a.extend(q,{using:b.using}))})},a.ui.position={fit:{left:function(b,c){var d=a(window),e=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft();b.left=e>0?b.left-e:Math.max(b.left-c.collisionPosition.left,b.left)},top:function(b,c){var d=a(window),e=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop();b.top=e>0?b.top-e:Math.max(b.top-c.collisionPosition.top,b.top)}},flip:{left:function(b,c){if(c.at[0]!==e){var d=a(window),f=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft(),g=c.my[0]==="left"?-c.elemWidth:c.my[0]==="right"?c.elemWidth:0,h=c.at[0]==="left"?c.targetWidth:-c.targetWidth,i=-2*c.offset[0];b.left+=c.collisionPosition.left<0?g+h+i:f>0?g+h+i:0}},top:function(b,c){if(c.at[1]!==e){var d=a(window),f=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop(),g=c.my[1]==="top"?-c.elemHeight:c.my[1]==="bottom"?c.elemHeight:0,h=c.at[1]==="top"?c.targetHeight:-c.targetHeight,i=-2*c.offset[1];b.top+=c.collisionPosition.top<0?g+h+i:f>0?g+h+i:0}}}},a.offset.setOffset||(a.offset.setOffset=function(b,c){/static/.test(a.curCSS(b,"position"))&&(b.style.position="relative");var d=a(b),e=d.offset(),f=parseInt(a.curCSS(b,"top",!0),10)||0,g=parseInt(a.curCSS(b,"left",!0),10)||0,h={top:c.top-e.top+f,left:c.left-e.left+g};"using"in c?c.using.call(b,h):d.css(h)},a.fn.offset=function(b){var c=this[0];if(!c||!c.ownerDocument)return null;if(b)return this.each(function(){a.offset.setOffset(this,b)});return h.call(this)}),function(){var b=document.getElementsByTagName("body")[0],c=document.createElement("div"),d,e,g,h,i;d=document.createElement(b?"div":"body"),g={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},b&&jQuery.extend(g,{position:"absolute",left:"-1000px",top:"-1000px"});for(var j in g)d.style[j]=g[j];d.appendChild(c),e=b||document.documentElement,e.insertBefore(d,e.firstChild),c.style.cssText="position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;",h=a(c).offset(function(a,b){return b}).offset(),d.innerHTML="",e.removeChild(d),i=h.top+h.left+(b?2e3:0),f.fractions=i>21&&i<22}()}(jQuery),function(a,b){a.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()}),this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this.oldValue=this._value(),this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove(),a.Widget.prototype.destroy.apply(this,arguments)},value:function(a){if(a===b)return this._value();this._setOption("value",a);return this},_setOption:function(b,c){b==="value"&&(this.options.value=c,this._refreshValue(),this._value()===this.options.max&&this._trigger("complete")),a.Widget.prototype._setOption.apply(this,arguments)},_value:function(){var a=this.options.value;typeof a!="number"&&(a=0);return Math.min(this.options.max,Math.max(this.min,a))},_percentage:function(){return 100*this._value()/this.options.max},_refreshValue:function(){var a=this.value(),b=this._percentage();this.oldValue!==a&&(this.oldValue=a,this._trigger("change")),this.valueDiv.toggle(a>this.min).toggleClass("ui-corner-right",a===this.options.max).width(b.toFixed(0)+"%"),this.element.attr("aria-valuenow",a)}}),a.extend(a.ui.progressbar,{version:"1.8.17"})}(jQuery),function(a,b){var c=5;a.widget("ui.slider",a.ui.mouse,{widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null},_create:function(){var b=this,d=this.options,e=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",g=d.values&&d.values.length||1,h=[];this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(d.disabled?" ui-slider-disabled ui-disabled":"")),this.range=a([]),d.range&&(d.range===!0&&(d.values||(d.values=[this._valueMin(),this._valueMin()]),d.values.length&&d.values.length!==2&&(d.values=[d.values[0],d.values[0]])),this.range=a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(d.range==="min"||d.range==="max"?" ui-slider-range-"+d.range:"")));for(var i=e.length;i<g;i+=1)h.push(f);this.handles=e.add(a(h.join("")).appendTo(b.element)),this.handle=this.handles.eq(0),this.handles.add(this.range).filter("a").click(function(a){a.preventDefault()}).hover(function(){d.disabled||a(this).addClass("ui-state-hover")},function(){a(this).removeClass("ui-state-hover")}).focus(function(){d.disabled?a(this).blur():(a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"),a(this).addClass("ui-state-focus"))}).blur(function(){a(this).removeClass("ui-state-focus")}),this.handles.each(function(b){a(this).data("index.ui-slider-handle",b)}),this.handles.keydown(function(d){var e=!0,f=a(this).data("index.ui-slider-handle"),g,h,i,j;if(!b.options.disabled){switch(d.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:e=!1;if(!b._keySliding){b._keySliding=!0,a(this).addClass("ui-state-active"),g=b._start(d,f);if(g===!1)return}}j=b.options.step,b.options.values&&b.options.values.length?h=i=b.values(f):h=i=b.value();switch(d.keyCode){case a.ui.keyCode.HOME:i=b._valueMin();break;case a.ui.keyCode.END:i=b._valueMax();break;case a.ui.keyCode.PAGE_UP:i=b._trimAlignValue(h+(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.PAGE_DOWN:i=b._trimAlignValue(h-(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(h===b._valueMax())return;i=b._trimAlignValue(h+j);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(h===b._valueMin())return;i=b._trimAlignValue(h-j)}b._slide(d,f,i);return e}}).keyup(function(c){var d=a(this).data("index.ui-slider-handle");b._keySliding&&(b._keySliding=!1,b._stop(c,d),b._change(c,d),a(this).removeClass("ui-state-active"))}),this._refreshValue(),this._animateOff=!1},destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"),this._mouseDestroy();return this},_mouseCapture:function(b){var c=this.options,d,e,f,g,h,i,j,k,l;if(c.disabled)return!1;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),d={x:b.pageX,y:b.pageY},e=this._normValueFromMouse(d),f=this._valueMax()-this._valueMin()+1,h=this,this.handles.each(function(b){var c=Math.abs(e-h.values(b));f>c&&(f=c,g=a(this),i=b)}),c.range===!0&&this.values(1)===c.min&&(i+=1,g=a(this.handles[i])),j=this._start(b,i);if(j===!1)return!1;this._mouseSliding=!0,h._handleIndex=i,g.addClass("ui-state-active").focus(),k=g.offset(),l=!a(b.target).parents().andSelf().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:b.pageX-k.left-g.width()/2,top:b.pageY-k.top-g.height()/2-(parseInt(g.css("borderTopWidth"),10)||0)-(parseInt(g.css("borderBottomWidth"),10)||0)+(parseInt(g.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(b,i,e),this._animateOff=!0;return!0},_mouseStart:function(a){return!0},_mouseDrag:function(a){var b={x:a.pageX,y:a.pageY},c=this._normValueFromMouse(b);this._slide(a,this._handleIndex,c);return!1},_mouseStop:function(a){this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(a,this._handleIndex),this._change(a,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1;return!1},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(a){var b,c,d,e,f;this.orientation==="horizontal"?(b=this.elementSize.width,c=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(b=this.elementSize.height,c=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),d=c/b,d>1&&(d=1),d<0&&(d=0),this.orientation==="vertical"&&(d=1-d),e=this._valueMax()-this._valueMin(),f=this._valueMin()+d*e;return this._trimAlignValue(f)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values());return this._trigger("start",a,c)},_slide:function(a,b,c){var d,e,f;this.options.values&&this.options.values.length?(d=this.values(b?0:1),this.options.values.length===2&&this.options.range===!0&&(b===0&&c>d||b===1&&c<d)&&(c=d),c!==this.values(b)&&(e=this.values(),e[b]=c,f=this._trigger("slide",a,{handle:this.handles[b],value:c,values:e}),d=this.values(b?0:1),f!==!1&&this.values(b,c,!0))):c!==this.value()&&(f=this._trigger("slide",a,{handle:this.handles[b],value:c}),f!==!1&&this.value(c))},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("change",a,c)}},value:function(a){if(arguments.length)this.options.value=this._trimAlignValue(a),this._refreshValue(),this._change(null,0);else return this._value()},values:function(b,c){var d,e,f;if(arguments.length>1)this.options.values[b]=this._trimAlignValue(c),this._refreshValue(),this._change(null,b);else{if(!arguments.length)return this._values();if(!a.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(b):this.value();d=this.options.values,e=arguments[0];for(f=0;f<d.length;f+=1)d[f]=this._trimAlignValue(e[f]),this._change(null,f);this._refreshValue()}},_setOption:function(b,c){var d,e=0;a.isArray(this.options.values)&&(e=this.options.values.length),a.Widget.prototype._setOption.apply(this,arguments);switch(b){case"disabled":c?(this.handles.filter(".ui-state-focus").blur(),this.handles.removeClass("ui-state-hover"),this.handles.propAttr("disabled",!0),this.element.addClass("ui-disabled")):(this.handles.propAttr("disabled",!1),this.element.removeClass("ui-disabled"));break;case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":this._animateOff=!0,this._refreshValue();for(d=0;d<e;d+=1)this._change(null,d);this._animateOff=!1}},_value:function(){var a=this.options.value;a=this._trimAlignValue(a);return a},_values:function(a){var b,c,d;if(arguments.length){b=this.options.values[a],b=this._trimAlignValue(b);return b}c=this.options.values.slice();for(d=0;d<c.length;d+=1)c[d]=this._trimAlignValue(c[d]);return c},_trimAlignValue:function(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b,d=a-c;Math.abs(c)*2>=b&&(d+=c>0?b:-b);return parseFloat(d.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var b=this.options.range,c=this.options,d=this,e=this._animateOff?!1:c.animate,f,g={},h,i,j,k;this.options.values&&this.options.values.length?this.handles.each(function(b,i){f=(d.values(b)-d._valueMin())/(d._valueMax()-d._valueMin())*100,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",a(this).stop(1,1)[e?"animate":"css"](g,c.animate),d.options.range===!0&&(d.orientation==="horizontal"?(b===0&&d.range.stop(1,1)[e?"animate":"css"]({left:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({width:f-h+"%"},{queue:!1,duration:c.animate})):(b===0&&d.range.stop(1,1)[e?"animate":"css"]({bottom:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({height:f-h+"%"},{queue:!1,duration:c.animate}))),h=f}):(i=this.value(),j=this._valueMin(),k=this._valueMax(),f=k!==j?(i-j)/(k-j)*100:0,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",this.handle.stop(1,1)[e?"animate":"css"](g,c.animate),b==="min"&&this.orientation==="horizontal"&&this.range.stop(1,1)[e?"animate":"css"]({width:f+"%"},c.animate),b==="max"&&this.orientation==="horizontal"&&this.range[e?"animate":"css"]({width:100-f+"%"},{queue:!1,duration:c.animate}),b==="min"&&this.orientation==="vertical"&&this.range.stop(1,1)[e?"animate":"css"]({height:f+"%"},c.animate),b==="max"&&this.orientation==="vertical"&&this.range[e?"animate":"css"]({height:100-f+"%"},{queue:!1,duration:c.animate}))}}),a.extend(a.ui.slider,{version:"1.8.17"})}(jQuery),function(a,b){function f(){return++d}function e(){return++c}var c=0,d=0;a.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:!1,cookie:null,collapsible:!1,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(!0)},_setOption:function(a,b){if(a=="selected"){if(this.options.collapsible&&b==this.options.selected)return;this.select(b)}else this.options[a]=b,this._tabify()},_tabId:function(a){return a.title&&a.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+e()},_sanitizeSelector:function(a){return a.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+f());return a.cookie.apply(null,[b].concat(a.makeArray(arguments)))},_ui:function(a,b){return{tab:a,panel:b,index:this.anchors.index(a)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=a(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(c){function m(b,c){b.css("display",""),!a.support.opacity&&c.opacity&&b[0].style.removeAttribute("filter")}var d=this,e=this.options,f=/^#.+/;this.list=this.element.find("ol,ul").eq(0),this.lis=a(" > li:has(a[href])",this.list),this.anchors=this.lis.map(function(){return a("a",this)[0]}),this.panels=a([]),this.anchors.each(function(b,c){var g=a(c).attr("href"),h=g.split("#")[0],i;h&&(h===location.toString().split("#")[0]||(i=a("base")[0])&&h===i.href)&&(g=c.hash,c.href=g);if(f.test(g))d.panels=d.panels.add(d.element.find(d._sanitizeSelector(g)));else if(g&&g!=="#"){a.data(c,"href.tabs",g),a.data(c,"load.tabs",g.replace(/#.*$/,""));var j=d._tabId(c);c.href="#"+j;var k=d.element.find("#"+j);k.length||(k=a(e.panelTemplate).attr("id",j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(d.panels[b-1]||d.list),k.data("destroy.tabs",!0)),d.panels=d.panels.add(k)}else e.disabled.push(b)}),c?(this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"),this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.lis.addClass("ui-state-default ui-corner-top"),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"),e.selected===b?(location.hash&&this.anchors.each(function(a,b){if(b.hash==location.hash){e.selected=a;return!1}}),typeof e.selected!="number"&&e.cookie&&(e.selected=parseInt(d._cookie(),10)),typeof e.selected!="number"&&this.lis.filter(".ui-tabs-selected").length&&(e.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))),e.selected=e.selected||(this.lis.length?0:-1)):e.selected===null&&(e.selected=-1),e.selected=e.selected>=0&&this.anchors[e.selected]||e.selected<0?e.selected:0,e.disabled=a.unique(e.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(a,b){return d.lis.index(a)}))).sort(),a.inArray(e.selected,e.disabled)!=-1&&e.disabled.splice(a.inArray(e.selected,e.disabled),1),this.panels.addClass("ui-tabs-hide"),this.lis.removeClass("ui-tabs-selected ui-state-active"),e.selected>=0&&this.anchors.length&&(d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash)).removeClass("ui-tabs-hide"),this.lis.eq(e.selected).addClass("ui-tabs-selected ui-state-active"),d.element.queue("tabs",function(){d._trigger("show",null,d._ui(d.anchors[e.selected],d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash))[0]))}),this.load(e.selected)),a(window).bind("unload",function(){d.lis.add(d.anchors).unbind(".tabs"),d.lis=d.anchors=d.panels=null})):e.selected=this.lis.index(this.lis.filter(".ui-tabs-selected")),this.element[e.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible"),e.cookie&&this._cookie(e.selected,e.cookie);for(var g=0,h;h=this.lis[g];g++)a(h)[a.inArray(g,e.disabled)!=-1&&!a(h).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");e.cache===!1&&this.anchors.removeData("cache.tabs"),this.lis.add(this.anchors).unbind(".tabs");if(e.event!=="mouseover"){var i=function(a,b){b.is(":not(.ui-state-disabled)")&&b.addClass("ui-state-"+a)},j=function(a,b){b.removeClass("ui-state-"+a)};this.lis.bind("mouseover.tabs",function(){i("hover",a(this))}),this.lis.bind("mouseout.tabs",function(){j("hover",a(this))}),this.anchors.bind("focus.tabs",function(){i("focus",a(this).closest("li"))}),this.anchors.bind("blur.tabs",function(){j("focus",a(this).closest("li"))})}var k,l;e.fx&&(a.isArray(e.fx)?(k=e.fx[0],l=e.fx[1]):k=l=e.fx);var n=l?function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),c.hide().removeClass("ui-tabs-hide").animate(l,l.duration||"normal",function(){m(c,l),d._trigger("show",null,d._ui(b,c[0]))})}:function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),c.removeClass("ui-tabs-hide"),d._trigger("show",null,d._ui(b,c[0]))},o=k?function(a,b){b.animate(k,k.duration||"normal",function(){d.lis.removeClass("ui-tabs-selected ui-state-active"),b.addClass("ui-tabs-hide"),m(b,k),d.element.dequeue("tabs")})}:function(a,b,c){d.lis.removeClass("ui-tabs-selected ui-state-active"),b.addClass("ui-tabs-hide"),d.element.dequeue("tabs")};this.anchors.bind(e.event+".tabs",function(){var b=this,c=a(b).closest("li"),f=d.panels.filter(":not(.ui-tabs-hide)"),g=d.element.find(d._sanitizeSelector(b.hash));if(c.hasClass("ui-tabs-selected")&&!e.collapsible||c.hasClass("ui-state-disabled")||c.hasClass("ui-state-processing"
)||d.panels.filter(":animated").length||d._trigger("select",null,d._ui(this,g[0]))===!1){this.blur();return!1}e.selected=d.anchors.index(this),d.abort();if(e.collapsible){if(c.hasClass("ui-tabs-selected")){e.selected=-1,e.cookie&&d._cookie(e.selected,e.cookie),d.element.queue("tabs",function(){o(b,f)}).dequeue("tabs"),this.blur();return!1}if(!f.length){e.cookie&&d._cookie(e.selected,e.cookie),d.element.queue("tabs",function(){n(b,g)}),d.load(d.anchors.index(this)),this.blur();return!1}}e.cookie&&d._cookie(e.selected,e.cookie);if(g.length)f.length&&d.element.queue("tabs",function(){o(b,f)}),d.element.queue("tabs",function(){n(b,g)}),d.load(d.anchors.index(this));else throw"jQuery UI Tabs: Mismatching fragment identifier.";a.browser.msie&&this.blur()}),this.anchors.bind("click.tabs",function(){return!1})},_getIndex:function(a){typeof a=="string"&&(a=this.anchors.index(this.anchors.filter("[href$="+a+"]")));return a},destroy:function(){var b=this.options;this.abort(),this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"),this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.anchors.each(function(){var b=a.data(this,"href.tabs");b&&(this.href=b);var c=a(this).unbind(".tabs");a.each(["href","load","cache"],function(a,b){c.removeData(b+".tabs")})}),this.lis.unbind(".tabs").add(this.panels).each(function(){a.data(this,"destroy.tabs")?a(this).remove():a(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))}),b.cookie&&this._cookie(null,b.cookie);return this},add:function(c,d,e){e===b&&(e=this.anchors.length);var f=this,g=this.options,h=a(g.tabTemplate.replace(/#\{href\}/g,c).replace(/#\{label\}/g,d)),i=c.indexOf("#")?this._tabId(a("a",h)[0]):c.replace("#","");h.addClass("ui-state-default ui-corner-top").data("destroy.tabs",!0);var j=f.element.find("#"+i);j.length||(j=a(g.panelTemplate).attr("id",i).data("destroy.tabs",!0)),j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"),e>=this.lis.length?(h.appendTo(this.list),j.appendTo(this.list[0].parentNode)):(h.insertBefore(this.lis[e]),j.insertBefore(this.panels[e])),g.disabled=a.map(g.disabled,function(a,b){return a>=e?++a:a}),this._tabify(),this.anchors.length==1&&(g.selected=0,h.addClass("ui-tabs-selected ui-state-active"),j.removeClass("ui-tabs-hide"),this.element.queue("tabs",function(){f._trigger("show",null,f._ui(f.anchors[0],f.panels[0]))}),this.load(0)),this._trigger("add",null,this._ui(this.anchors[e],this.panels[e]));return this},remove:function(b){b=this._getIndex(b);var c=this.options,d=this.lis.eq(b).remove(),e=this.panels.eq(b).remove();d.hasClass("ui-tabs-selected")&&this.anchors.length>1&&this.select(b+(b+1<this.anchors.length?1:-1)),c.disabled=a.map(a.grep(c.disabled,function(a,c){return a!=b}),function(a,c){return a>=b?--a:a}),this._tabify(),this._trigger("remove",null,this._ui(d.find("a")[0],e[0]));return this},enable:function(b){b=this._getIndex(b);var c=this.options;if(a.inArray(b,c.disabled)!=-1){this.lis.eq(b).removeClass("ui-state-disabled"),c.disabled=a.grep(c.disabled,function(a,c){return a!=b}),this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b]));return this}},disable:function(a){a=this._getIndex(a);var b=this,c=this.options;a!=c.selected&&(this.lis.eq(a).addClass("ui-state-disabled"),c.disabled.push(a),c.disabled.sort(),this._trigger("disable",null,this._ui(this.anchors[a],this.panels[a])));return this},select:function(a){a=this._getIndex(a);if(a==-1)if(this.options.collapsible&&this.options.selected!=-1)a=this.options.selected;else return this;this.anchors.eq(a).trigger(this.options.event+".tabs");return this},load:function(b){b=this._getIndex(b);var c=this,d=this.options,e=this.anchors.eq(b)[0],f=a.data(e,"load.tabs");this.abort();if(!f||this.element.queue("tabs").length!==0&&a.data(e,"cache.tabs"))this.element.dequeue("tabs");else{this.lis.eq(b).addClass("ui-state-processing");if(d.spinner){var g=a("span",e);g.data("label.tabs",g.html()).html(d.spinner)}this.xhr=a.ajax(a.extend({},d.ajaxOptions,{url:f,success:function(f,g){c.element.find(c._sanitizeSelector(e.hash)).html(f),c._cleanup(),d.cache&&a.data(e,"cache.tabs",!0),c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.success(f,g)}catch(h){}},error:function(a,f,g){c._cleanup(),c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.error(a,f,b,e)}catch(g){}}})),c.element.dequeue("tabs");return this}},abort:function(){this.element.queue([]),this.panels.stop(!1,!0),this.element.queue("tabs",this.element.queue("tabs").splice(-2,2)),this.xhr&&(this.xhr.abort(),delete this.xhr),this._cleanup();return this},url:function(a,b){this.anchors.eq(a).removeData("cache.tabs").data("load.tabs",b);return this},length:function(){return this.anchors.length}}),a.extend(a.ui.tabs,{version:"1.8.17"}),a.extend(a.ui.tabs.prototype,{rotation:null,rotate:function(a,b){var c=this,d=this.options,e=c._rotate||(c._rotate=function(b){clearTimeout(c.rotation),c.rotation=setTimeout(function(){var a=d.selected;c.select(++a<c.anchors.length?a:0)},a),b&&b.stopPropagation()}),f=c._unrotate||(c._unrotate=b?function(a){t=d.selected,e()}:function(a){a.clientX&&c.rotate(null)});a?(this.element.bind("tabsshow",e),this.anchors.bind(d.event+".tabs",f),e()):(clearTimeout(c.rotation),this.element.unbind("tabsshow",e),this.anchors.unbind(d.event+".tabs",f),delete this._rotate,delete this._unrotate);return this}})}(jQuery);/*!
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function ($j) {

  // Detect touch support
  $j.support.touch = 'ontouchend' in document;

  // Ignore browsers without touch support
  if (!$j.support.touch) {
    return;
  }

  var mouseProto = $j.ui.mouse.prototype,
      _mouseInit = mouseProto._mouseInit,
      touchHandled;

  /**
   * Simulate a mouse event based on a corresponding touch event
   * @param {Object} event A touch event
   * @param {String} simulatedType The corresponding mouse event
   */
  function simulateMouseEvent (event, simulatedType) {

    // Ignore multi-touch events
    if (event.originalEvent.touches.length > 1) {
      return;
    }

    event.preventDefault();

    var touch = event.originalEvent.changedTouches[0],
        simulatedEvent = document.createEvent('MouseEvents');
    
    // Initialize the simulated mouse event using the touch event's coordinates
    simulatedEvent.initMouseEvent(
      simulatedType,    // type
      true,             // bubbles                    
      true,             // cancelable                 
      window,           // view                       
      1,                // detail                     
      touch.screenX,    // screenX                    
      touch.screenY,    // screenY                    
      touch.clientX,    // clientX                    
      touch.clientY,    // clientY                    
      false,            // ctrlKey                    
      false,            // altKey                     
      false,            // shiftKey                   
      false,            // metaKey                    
      0,                // button                     
      null              // relatedTarget              
    );

    // Dispatch the simulated event to the target element
    event.target.dispatchEvent(simulatedEvent);
  }

  /**
   * Handle the jQuery UI widget's touchstart events
   * @param {Object} event The widget element's touchstart event
   */
  mouseProto._touchStart = function (event) {

    var self = this;

    // Ignore the event if another widget is already being handled
    if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
      return;
    }

    // Set the flag to prevent other widgets from inheriting the touch event
    touchHandled = true;

    // Track movement to determine if interaction was a click
    self._touchMoved = false;

    // Simulate the mouseover event
    simulateMouseEvent(event, 'mouseover');

    // Simulate the mousemove event
    simulateMouseEvent(event, 'mousemove');

    // Simulate the mousedown event
    simulateMouseEvent(event, 'mousedown');
  };

  /**
   * Handle the jQuery UI widget's touchmove events
   * @param {Object} event The document's touchmove event
   */
  mouseProto._touchMove = function (event) {

    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Interaction was not a click
    this._touchMoved = true;

    // Simulate the mousemove event
    simulateMouseEvent(event, 'mousemove');
  };

  /**
   * Handle the jQuery UI widget's touchend events
   * @param {Object} event The document's touchend event
   */
  mouseProto._touchEnd = function (event) {

    // Ignore event if not handled
    if (!touchHandled) {
      return;
    }

    // Simulate the mouseup event
    simulateMouseEvent(event, 'mouseup');

    // Simulate the mouseout event
    simulateMouseEvent(event, 'mouseout');

    // If the touch interaction did not move, it should trigger a click
    if (!this._touchMoved) {

      // Simulate the click event
      simulateMouseEvent(event, 'click');
    }

    // Unset the flag to allow other widgets to inherit the touch event
    touchHandled = false;
  };

  /**
   * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
   * This method extends the widget with bound touch event handlers that
   * translate touch events to mouse events and pass them to the widget's
   * original mouse event handling methods.
   */
  mouseProto._mouseInit = function () {
    
    var self = this;

    // Delegate the touch handlers to the widget's element
    self.element
      .bind('touchstart', $j.proxy(self, '_touchStart'))
      .bind('touchmove', $j.proxy(self, '_touchMove'))
      .bind('touchend', $j.proxy(self, '_touchEnd'));

    // Call the original $.ui.mouse init method
    _mouseInit.call(self);
  };

})(jQuery);/**
* jQuery fancyzoom plugin.
* This is an adaptation of the fancyzoom effect as a jQuery plugin
*
* Author: Mathieu Vilaplana <mvilaplana@df-e.com>
* Date: March 2008
* rev 1.0
* rev: 1.1
* Add title if alt in the img
* rev 1.2
* Correction of the image dimension and close button on top right of the image
* rev 1.3
* now fancyzoom can be apply on an image, no need any more link wrapper
* rev 1.4 correct the bug for the overlay in ie6
* rev 1.6 (09/2009), lot of impovement, now image get out of its context.
*/
(function($) {
	
	$.fn.fancyzoom = function(userOptions) {
		//the var to the image box div
	 	var oOverlay = $('<div>').css({
			height: '100%',
			width: '100%',
   			position:'fixed',
   			zIndex:100,
			left: 0,
			top: 0,
			cursor:"wait"
		});
		
		function openZoomBox(imgSrc,o){
			if(o.showoverlay) {
				oOverlay
					.appendTo('body')
					.click(function(){closeZoomBox(o);});
				if( $.browser.msie && $.browser.version < 7 ){
					oOverlay.css({position:'absolute',height:$(document).height(),width:$(document).width()});
				}
			}
			var oImgZoomBox = o.oImgZoomBox;

            //calculate the start point of the animation, it start from the image of the element clicked
            pos=imgSrc.offset();
			o=$.extend(o,{imgSrc:imgSrc,dimOri:{width:imgSrc.outerWidth(),height:imgSrc.outerHeight(),left:pos.left,top:pos.top,'opacity':1}});
			if(!imgSrc.is('img')){
				o.dimOri = $.extend(o.dimOri,{width:0,height:0});
			}

			//calculate the end point of the animaton
			oImgZoomBox.css({'text-align':'center','border':'0px solid red'}).appendTo('body');
			var iWidth = oImgZoomBox.outerWidth();
			var iHeight = oImgZoomBox.outerHeight();
			
			//the target is in the center without the extra margin du to close Image
			dimBoxTarget=$.extend({},{width:iWidth,height:iHeight,'opacity':1}, __posCenter((iWidth),(iHeight+30)));
            
            //place the close button at the right of the zoomed Image
            o.oImgClose.css({left:(dimBoxTarget.left+dimBoxTarget.width-15),top:(dimBoxTarget.top-15)});
            
            var $fctEnd = function(){
            	//end of open, show the shadow
            	if($.fn.shadow && o.shadow && !$.browser.msie){ $('img:first',oImgZoomBox).shadow(o.shadowOpts);}
				if(o.Speed>0 && !$.browser.msie) {o.oImgClose.fadeIn('slow');$('div',oImgZoomBox).fadeIn('slow');}
				else {o.oImgClose.show();$('div',oImgZoomBox).show();}			
            };
            
            
            $('div',oImgZoomBox).hide();//cache le titre
            //cache l'image source
            if(o.imgSrc.is('img')){o.imgSrc.css({'opacity':0});}
            var oImgDisplay = $('img:first', oImgZoomBox).css({'width':'100%','height':'auto'});
  			if(o.Speed > 0) {
  				oImgZoomBox.css(o.dimOri).animate(dimBoxTarget,o.Speed,$fctEnd);
  			}
  			else {
  				oImgZoomBox.css(dimBoxTarget);
  				$fctEnd();
  			}
	 	 }//end openZoomBox
 	 	 
 	 	 /**
 	 	  * First hide the closeBtn, then remove the ZoomBox and the overlay
 	 	  * Animate if Speed > 0 
 	 	  */
 	 	 function closeZoomBox(o){
 	 	 	var oImgZoomBox = o.oImgZoomBox;
	 	 	o.oImgClose.remove();
	 	 	$('div',oImgZoomBox).remove();
	 	 	var endClose = function(){
	 	 		oImgZoomBox.empty().remove();
	 	 		if(o.imgSrc!=undefined){
	 	 			o.imgSrc.css('opacity',1);
	 	 		}
	 	 	};
		 	 if(o.Speed > 0){
		 	 	var pos = oImgZoomBox.offset();
		 	 	var iPercent = 0.15;
		 	 	var oDimPlus = {
		 	 		width:(oImgZoomBox.width()*(1+iPercent)),
		 	 		height:(oImgZoomBox.height()*(1+iPercent)),
		 	 		left:(pos.left-(oImgZoomBox.width()*(iPercent/2))),
		 	 		top:(pos.top-(oImgZoomBox.height()*(iPercent/2)))
		 	 	};
		 	 	oImgZoomBox.animate(oDimPlus,o.Speed*0.2,function(){
			 	 	oImgZoomBox.animate(o.dimOri,o.Speed,function(){endClose();});
					if(o.showoverlay) {oOverlay.animate({'opacity':0},o.Speed,function(){$(this).remove();});}
		 	 	});
	 	 	}else {
			 	endClose();
				if(o.showoverlay) {oOverlay.remove();}
	 	 	}
 	 	 }
    		
		/**
		 * The plugin chain.
		 */
   		return this.each(function() {
   			var $this = $(this);
   			var imgTarget = $this.is('img')?$this:($('img:first',$this).length==0)?$this:$('img:first',$this);
   			var imgTargetSrc=null;
   			if($this.attr('href')) {imgTargetSrc = $this.attr('href');}
		 	var oImgClose = $('<img class="jqfancyzoomclosebox">').css({position:'absolute',top:0,left:0,cursor:'pointer'});

			// build main options before element iteration		
	    	var opts = $.extend({},$.fn.fancyzoom.defaultsOptions, userOptions||{},{dimOri:{},
	    		oImgZoomBoxProp:{position:'absolute',left:0,top:0},
	    		oImgClose:oImgClose
	    	});
	    	
			if(imgTarget.is('img')){
		    	var oImgHover = $("<img src='"+opts.imgDir+"zoom.png'>").css({position:'absolute',top:0,left:0});
				imgTarget.hover(function(){
					if(imgTarget.css('opacity') != 0){
						oImgHover.appendTo(imgTarget.parent()).hide();
						var pos = imgTarget.position();
						var marginLeft = parseInt(imgTarget.css('margin-left').replace(/px/,''));
						var marginTop = parseInt(imgTarget.css('margin-top').replace(/px/,''));
						marginTop = (marginTop)?marginTop:0;
						marginLeft = (marginLeft)?marginLeft:0;
						oImgHover.css({left:(pos.left+marginLeft+12),top:(pos.top+marginTop+12)}).show();
						if($.fn.ifixpng) {oImgHover.ifixpng(opts.imgDir+'blank.gif');}
					}
				},function(){
					oImgHover.remove();
				});
			}
			
   			if($this.is('img')){
   				imgTargetSrc = $this.css('cursor','pointer').attr('src');
   				if(opts.imgResizeScript){
   					if( imgTargetSrc.match(new RegExp("^"+opts.imgResizeScript,"g")) ){
   						imgTargetSrc=imgTargetSrc.replace(/.*img=([^&]*).*/gi,'$1');
   					}
   				}
   			}
	    	oOverlay.css({
				opacity: opts.overlay,
				background:opts.overlayColor
	    	});

   			//make action only on link that point to an image
   			if( !/\.jpg|\.jpeg|\.png|\.gif/i.test(imgTargetSrc) ){
	   			return true;
   			}
   			
   			$this.click(function(){
   				var zoomOpened = $('div.jqfancyzoombox');
   				if( zoomOpened.length > 0  ){
   					//if user click on an other image, cancel the previous loading
					if($('img:first',zoomOpened).attr('src') != imgTargetSrc){
	   					if( oLoading && oLoading.is(':visible') ) {
	   						__cancelLoading();
	   					}
					}
	   				else {//solve the double click pb
	   					return false;
	   				}
   				}
   				var o = $.extend({},opts,userOptions);
   				var closeBtn = $("img.jqfancyzoomclosebox");
   				if(closeBtn.length > 0){
   					var imCurrent = $('img:first',zoomOpened);
   					if(imgTargetSrc == imCurrent.attr('src')){
						//calculate the start point of the animation, it start from the image of the element clicked
						pos=imgTarget.offset();
						o=$.extend(
								o,
								{dimOri:{width:(imgTarget.outerWidth()),height:(imgTarget.outerHeight()),left:pos.left,top:(pos.top),'opacity':0}
							});
						closeZoomBox(o);
						return false;
   					}else {
   						//user click on an other image, close the first one
   						closeBtn.trigger('click');
   						//return false;
   					}
   				}
   				
   				//remove the overlay and Reset
		 	 	if(o.showoverlay && oOverlay) {oOverlay.empty().remove().css({'opacity':o.overlay});}
				//reset the img close and fix png on it if plugin available
				oImgClose.attr('src',o.imgDir+'closebox.png').appendTo('body').hide();
				if($.fn.ifixpng) {$.ifixpng(o.imgDir+'blank.gif');oImgClose.ifixpng(o.imgDir+'blank.gif');}
				oImgClose.unbind('click').click(function(){closeZoomBox(o);});

				//reset zoom box prop and add image zoom with a margin top of 15px = imgclose height / 2
				var oImgZoomBox=$('<div class="jqfancyzoombox"></div>').css(o.oImgZoomBoxProp);
				o = $.extend(o,{oImgZoomBox:oImgZoomBox});

   				var strTitle = imgTarget.attr('alt');
   				if(strTitle){
   					var oTitle = $('<div><center><table height=0 border="0" cellspacing=0 cellpadding=0><tr><td></td><td class="fancyTitle">'+strTitle+'</td><td></td></table></center></div>').css({marginTop:10,marginRight:15});
   					
   					var tdL = oTitle.find('td:first').css({'background':'url('+o.imgDir+'zoom-caption-l.png)',width:'13px',height:'26px'});
   					var tdR = oTitle.find('td:last').css({'background':'url('+o.imgDir+'zoom-caption-r.png)',width:'13px',height:'26px'});
   					var tdC = $('.fancyTitle',oTitle).css({'background':'url('+o.imgDir+'zoom-caption-fill.png)',
   							'padding':'0px 20px',
   							color:'#FFF',
   							'font-size':'14px'
   							});

   					if($.fn.ifixpng){
   						tdL.ifixpng(o.imgDir+'blank.gif');
   						tdR.ifixpng(o.imgDir+'blank.gif');
   						tdC.ifixpng(o.imgDir+'blank.gif');
   					}
   					oTitle.appendTo(oImgZoomBox);   					
   				}
   				var oImgZoom=$('<img />').attr('src',imgTargetSrc).click(function(){closeZoomBox(o);}).prependTo(oImgZoomBox);
				/** Manage zIndex **/
				var imagezindex= opts.imagezindex;
				oOverlay.css('zIndex', imagezindex-1);
				oImgZoomBox.css('zIndex',imagezindex);
				oImgClose.css('zIndex',(imagezindex+10));
				
				//be shure that the image to display is loaded open the zoom box, if not display a loading Image.
   				var imgPreload = new Image();
   				imgPreload.src = imgTargetSrc;
   				var $fctEndLoading = function(){
					if(bCancelLoading) {bCancelLoading=false;}
					else {
						if(__getFileName(imgPreload.src) == __getFileName($('img:first',oImgZoomBox).attr('src')) ){
							fctCalculateImageSize(o.autoresize);
							openZoomBox(imgTarget, o);
							__stoploading();
						}
					}
   				};
   				var fctCalculateImageSize = function (autoresize) {
   					//calcul de la taille de l'image
   					if(autoresize){
	   					var divCalculate = $('<div></div>').css({position:'absolute','top':0,'left':0,opacity:0,'border':'0px solid red'});
	   					var bResize = false;
	   					oImgZoom.appendTo(divCalculate);
						divCalculate.appendTo('body');
						imWidth = oImgZoom.width();
						imHeight = oImgZoom.height();
						maxWidth = $(window).width()*0.9;
						maxHeight = $(window).height()-100;
						if( maxHeight < imHeight ){
							bResize = true;
							oImgZoom.height(maxHeight);
							imWidth= (imWidth*maxHeight)/imHeight;
							oImgZoom.width(imWidth);
							if( maxWidth < imWidth ){
								oImgZoom.width(maxWidth);
								oImgZoom.height(imHeight*maxWidth/imWidth);
							}
						}else if( maxWidth < imWidth ){
							bResize = true;
							oImgZoom.width(maxWidth);
							oImgZoom.height(imHeight*maxWidth/imWidth);
						}
						//because ie do not resize image correctly
						if( bResize && o.imgResizeScript /*&& $.browser.msie*/ ){
							var tWidth = oImgZoom.width();
							var tHeight = oImgZoom.height();
							var finalWidth = tWidth;
							var tabSizes = new Array(1440,1280,1024,800,640,480,360);
							for(i=0;i<tabSizes.length;i++){
								if(tWidth > tabSizes[i]){
									finalWidth = tabSizes[i];
									break;
								}
							}
							oImgZoom.width(finalWidth);
							oImgZoom.height(parseInt(tHeight*finalWidth/tWidth));
							
							var args = "img="+encodeURI(oImgZoom.attr('src'));
							args += "&width="+oImgZoom.width();
							args += "&height="+oImgZoom.height();
							oImgZoom.attr('src',o.imgResizeScript+"?"+args);
						}
						divCalculate.remove();
					}	
	   				oImgZoom.prependTo(oImgZoomBox);
   				};
   				
   				if(imgPreload.complete)	{
   					fctCalculateImageSize(o.autoresize);
   					openZoomBox(imgTarget, o);	
	   				/*__displayLoading(imgPreload);
	   				setTimeout($fctEndLoading,4000);*/
   				}
	   			else {
	   				__displayLoading(o);
	   				imgPreload.onload = function(){
	   					//when loading is finish display the zoombox if user not click on cancel
	   					$fctEndLoading();
	   				};
	   			}
   				return false;		
   			});
   		}
   	);//end return this
    };//end Plugin

    
    //Default Options
    $.fn.fancyzoom.defaultsOptions = {
    	overlayColor: '#000',
    	overlay: 0.6,
    	imagezindex:100,
    	showoverlay:true,
    	Speed:400,
    	shadow:true,
    	shadowOpts:{ color: "#000", offset: 4, opacity: 0.2 },
    	imgDir:'/js/all/common/',
    	imgResizeScript:null,
    	autoresize:true
 	 };
 	 
	function __posCenter(iWidth,iHeight){
		var iLeft = ($(window).width() - iWidth) / 2 + $(window).scrollLeft();
		var iTop = ($(window).height() - iHeight) / 2 + $(window).scrollTop();
		iLeft=(iLeft < 0)?0:iLeft;
		iTop=(iTop < 0)?0:iTop;
	  		return {left:iLeft,top:iTop};
    }
    
    //
    // LOADING MANAGEMENT
    //
    var oLoading =null ;
	var bCancelLoading = false;
	var timerLoadingImg = null;
	function __displayLoading(o){
		if(!oLoading){
			oLoading = $('<div></div>').css({width:50,height:50,position:'absolute','background':'transparent',
			opacity:8/10,color:'#FFF',padding:'5px','font-size':'10px'});
		}
		oLoading.css(__posCenter(50,50)).html('<img src="'+o.imgDir+'blank.gif" />').click(function(){__cancelLoading();}).appendTo('body').show();
		timerLoadingImg=setTimeout(function(){__changeimageLoading(o);},400);
	}
	function __cancelLoading(){
		bCancelLoading=true;
		__stoploading();
	}
	function __stoploading(){
		oLoading.hide().remove();
		if(timerLoadingImg){
			clearTimeout(timerLoadingImg);
			timerLoadingImg=null;
		}
	}
	
	/**
	 * Animate the png loading image.
	 */
	function __changeimageLoading(o){
		if(oLoading && !oLoading.is(':visible')){
			timerLoadingImg=null;
			return;
		}
		
		var $im=$('img',oLoading);
		//First call im.src ="", set it to the fire png zoom spin
		if(!$im.attr('src') || /blank\.gif/.test($im.attr('src'))){
			strImgSrc = o.imgDir+"zoom-spin-1.png";
		}
		//rotate the im src until 12
		else {
			tab = $im.attr('src').split(/[- .]+/);
			iImg = parseInt(tab[2]);
			iImg = (iImg < 12)? (iImg+1):1;
			strImgSrc= tab[0]+"-"+tab[1]+"-"+iImg+"."+tab[3];
		}
		var pLoad = new Image();
		pLoad.src=strImgSrc;
		var $fct = function (){
			
			oLoading && oLoading.css(__posCenter(50,50));
			$im.attr('src',strImgSrc);
			timerLoadingImg = setTimeout(__changeimageLoading,100);
		};
		//to preserve bug if img not exist change it only if load complete.
		if(pLoad.complete){$fct();}
		else{pLoad.onload=$fct;}
	}
 	
 	function __getFileName(strPath){
 		if(!strPath) {return false;}
		var tabPath = strPath.split('/');
		return ((tabPath.length<1)?strPath:tabPath[(tabPath.length-1)]);		
 	}
 	
})(jQuery);var cross_domain = '';

$j(function() {
	var $items = $j('#vtab>ul>li');
	$items.click(function() {			
		$items.removeClass('selected');		
		$j(this).addClass('selected');			
		var index = $items.index($j(this));			
		$j('#vtab>div').hide().eq(index).show();
		$j(".flickr_div").mCustomScrollbar("update");
		width = $j(".flickr_div .mCSB_container").width();
		$j(".flickr_div .mCSB_container").css("width",width+4);
		
		$j(".picasa_div").mCustomScrollbar("update");
		width = $j(".picasa_div .mCSB_container").width();
		$j(".picasa_div .mCSB_container").css("width",width+4);
		
		$j(".instagram_div").mCustomScrollbar("update");
		width = $j(".instagram_div .mCSB_container").width();
		$j(".instagram_div .mCSB_container").css("width",width+4);
		
		$j(".facebook_div").mCustomScrollbar("update");
		width = $j(".facebook_div .mCSB_container").width();
		$j(".facebook_div .mCSB_container").css("width",width+4);
		
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
	if(flickr_username!=undefined){
		$$('p.flickr_loading')[0].innerHTML = 'Please wait while photosets / images are loading....&nbsp;&nbsp;&nbsp;<img src="/skin/frontend/default/default/images/opc-ajax-loader.gif"/>';
		$$('label.flickr_error')[0].innerHTML = '';
		url = '/dol/images/getFlickrImages';
		if(cross_domain == "" || cross_domain == undefined){
	        new Ajax.Request(url, {
	        	method:     'POST',
	        	dataType: 'json',
	        	parameters : {'flickr_username':flickr_username},
	        	onSuccess: function(transport){
	        		response = transport.responseText.evalJSON();
	        		if (response.error) {
	            		$$('label.flickr_error')[0].innerHTML = response.error;
	            		$$('p.flickr_loading')[0].innerHTML = '<br/>';
	            	} else {
	        			$j('.flickr_div ul#colorSet').html(response['images']);
	            		$$('div.flickr_div')[0].style.display = 'block';
	            		$$('form.flickr_login')[0].style.display = 'none';
	            		$$('.flickr_hdr')[0].innerHTML = response['hdr'];
	            		$$('label.flickr_error')[0].innerHTML = '';
	            		$$('p.flickr_loading')[0].innerHTML = '<br/>';            		   		
	            		$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
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
	        		
	        		if (response.error) {
	            		$$('label.flickr_error')[0].innerHTML = response.error;
	            		$$('p.flickr_loading')[0].innerHTML = '<br/>';
	            	} else {
	        			$j('.flickr_div ul#colorSet').html(response.images);
	            		$$('div.flickr_div')[0].style.display = 'block';
	            		$$('form.flickr_login')[0].style.display = 'none';
	            		$$('.flickr_hdr')[0].innerHTML = response.hdr;
	            		$$('label.flickr_error')[0].innerHTML = '';
	            		$$('p.flickr_loading')[0].innerHTML = '<br/>';            		   		
	            		$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
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
		$$('.flickr_hdr')[0].innerHTML = 'Please wait while photoset images are loading....&nbsp;&nbsp;&nbsp;<img src="/skin/frontend/default/default/images/opc-ajax-loader.gif"/>'; 
		url = '/dol/images/getFlickrPhotosetImages';
        if(cross_domain == "" || cross_domain == undefined){
        		new Ajax.Request(url, {
            	method:     'POST',
            	dataType: 'json',
            	parameters : {'flickr_photoset_id':flickr_photoset_id},
            	onSuccess: function(transport){
            		response = transport.responseText.evalJSON();
            		if (response.error) {
                		$$('label.flickr_error')[0].innerHTML = response.error;
                		$$('div.flickr_div')[0].style.display = 'none';
                		$$('form.flickr_login')[0].style.display = 'block';
                		$$('.flickr_hdr')[0].innerHTML = 'Flickr Images';
                		$$('p.flickr_loading')[0].innerHTML = '<br/>';
                	} else {
            			$j('.flickr_div ul#colorSet').html(response['images']);
                		$$('div.flickr_div')[0].style.display = 'block';
                		$$('form.flickr_login')[0].style.display = 'none';
                		$$('.flickr_hdr')[0].innerHTML = response['hdr'];
                		$$('label.flickr_error')[0].innerHTML = '';
                		$j('.draggable img').draggable({appendTo: "body",helper:"clone",distance:"100",scroll:"true",scrollSensitivity:"50"});
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
            		response = transport;
            		if (response.error) {
                		$$('label.flickr_error')[0].innerHTML = response.error;
                		$$('div.flickr_div')[0].style.display = 'none';
                		$$('form.flickr_login')[0].style.display = 'block';
                		$$('.flickr_hdr')[0].innerHTML = 'Flickr Images';
                		$$('p.flickr_loading')[0].innerHTML = '<br/>';
                	} else {
            			$j('.flickr_div ul#colorSet').html(response.images);
                		$$('div.flickr_div')[0].style.display = 'block';
                		$$('form.flickr_login')[0].style.display = 'none';
                		$$('.flickr_hdr')[0].innerHTML = response.hdr;
                		$$('label.flickr_error')[0].innerHTML = '';
                		$j('.draggable img').draggable({appendTo: "body",helper:"clone",distance:"100",scroll:"true",scrollSensitivity:"50"});
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
	$$('p.flickr_loading')[0].innerHTML = '<br/>';
}
function getPicasaImages(){
	picasa_username = document.getElementById('picasa_username').value;
	$$('p.picasa_loading')[0].innerHTML = 'Please wait while albums are loading....&nbsp;&nbsp;&nbsp;<img src="/skin/frontend/default/default/images/opc-ajax-loader.gif"/>';
	$$('label.picasa_error')[0].innerHTML = '';	
	if(picasa_username!=undefined){
		url = '/dol/images/getPicasaImages';	
		if(cross_domain == "" || cross_domain == undefined){
			new Ajax.Request(url, {
	        	method:     'POST',
	        	dataType: 'json',
	        	parameters : {'picasa_username':picasa_username},
	        	onSuccess: function(transport){
	        		response = transport.responseText.evalJSON();
	        		if (response.error) {
	            		$$('label.picasa_error')[0].innerHTML = response.error;
	            		$$('p.picasa_loading')[0].innerHTML = '<br/>';
	            	} else {
	            		$$('label.picasa_error')[0].innerHTML = '';
	        			$$('.picasa_div ul#colorSet')[0].innerHTML = response['images'];
	            		$$('div.picasa_div')[0].style.display = 'block';
	            		$$('form.picasa_login')[0].style.display = 'none';
	            		$$('.picasa_hdr')[0].innerHTML = response['hdr'];
	            		$$('p.picasa_loading')[0].innerHTML = '<br/>';
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
	        		response = transport;
	        		if (response.error) {
	            		$$('label.picasa_error')[0].innerHTML = response.error;
	            		$$('p.picasa_loading')[0].innerHTML = '<br/>';
	            	} else {
	            		$$('label.picasa_error')[0].innerHTML = '';
	        			$$('.picasa_div ul#colorSet')[0].innerHTML = response.images;
	            		$$('div.picasa_div')[0].style.display = 'block';
	            		$$('form.picasa_login')[0].style.display = 'none';
	            		$$('.picasa_hdr')[0].innerHTML = response.hdr;
	            		$$('p.picasa_loading')[0].innerHTML = '<br/>';
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
	$$('.picasa_hdr')[0].innerHTML = 'Please wait while album images are loading....&nbsp;&nbsp;&nbsp;<img src="/skin/frontend/default/default/images/opc-ajax-loader.gif"/>'; 
	picasa_username = document.getElementById('picasa_username').value;
	if(picasa_album_id!=undefined){
		url = '/dol/images/getPicasaAlbumImages';
		
		if(cross_domain == "" || cross_domain == undefined){
			new Ajax.Request(url, {
	        	method:     'POST',
	        	dataType: 'json',
	        	parameters : {'picasa_album_id':picasa_album_id,'picasa_username':picasa_username},
	        	onSuccess: function(transport){
	        		response = transport.responseText.evalJSON();
	        		if (response.error) {
	            		$$('label.picasa_error')[0].style.display = 'block';
	            		$$('label.picasa_error')[0].innerHTML = response.error;
	            		$$('div.picasa_div')[0].style.display = 'none';
	            		$$('form.picasa_login')[0].style.display = 'block';
	            		$$('.picasa_hdr')[0].innerHTML = 'Picasa Images';
	            	} else {
	            		$$('label.picasa_error')[0].innerHTML = '';
	        			$$('.picasa_div ul#colorSet')[0].innerHTML = response['images'];
	            		$$('div.picasa_div')[0].style.display = 'block';
	            		$$('form.picasa_login')[0].style.display = 'none';
	            		$$('.picasa_hdr')[0].innerHTML = response['hdr'];
	            		$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
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
	        		response = transport;
	        		if (response.error) {
	            		$$('label.picasa_error')[0].style.display = 'block';
	            		$$('label.picasa_error')[0].innerHTML = response.error;
	            		$$('div.picasa_div')[0].style.display = 'none';
	            		$$('form.picasa_login')[0].style.display = 'block';
	            		$$('.picasa_hdr')[0].innerHTML = 'Picasa Images';
	            	} else {
	            		$$('label.picasa_error')[0].innerHTML = '';
	        			$$('.picasa_div ul#colorSet')[0].innerHTML = response.images;
	            		$$('div.picasa_div')[0].style.display = 'block';
	            		$$('form.picasa_login')[0].style.display = 'none';
	            		$$('.picasa_hdr')[0].innerHTML = response.hdr;
	            		$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
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
	$$('p.picasa_loading')[0].innerHTML = '<br/>';
}
function loginInstagram(){
	if(cross_domain == "" || cross_domain == undefined){
		window.open('/dol/auth/instagram','','width=600,height=350');
	}else{
		window.open('http://'+cross_domain+'/dol/auth/instagram','','width=600,height=350');
	}
}

$j('.instagram_hdr a').live('click',function(){
	instagramLogout();
});
function getInstagramImages(){
	$$('p.instagram_loading')[0].innerHTML = 'Please wait while images are loading....&nbsp;&nbsp;&nbsp;<img src="/skin/frontend/default/default/images/opc-ajax-loader.gif"/>';
	$$('label.instagram_error')[0].innerHTML = '';
	url = '/dol/images/getInstagramImages';
	if(cross_domain == "" || cross_domain == undefined){
		new Ajax.Request(url, {
	    	method:     'POST',
	    	dataType: 'json',
	    	parameters : {},
	    	onSuccess: function(transport){
	    		response = transport.responseText.evalJSON();
	    		if (response.error) {
	        		$$('label.instagram_error')[0].style.display = 'block';
	        		$$('label.instagram_error')[0].innerHTML = response.error;
	        		$$('p.instagram_loading')[0].innerHTML = '<br/>';
	        	} else {
	        		$$('label.instagram_error')[0].innerHTML = '';
	    			$$('div.instagram_div ul#colorSet')[0].innerHTML = response['images'];
	        		$$('div.instagram_div')[0].style.display = 'block';
	        		$$('form.instagram_login')[0].style.display = 'none';
	        		$$('.instagram_hdr')[0].innerHTML = response['hdr'];
	        		$$('p.instagram_loading')[0].innerHTML = '<br/>';
	        		$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
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
	    		if (response.error) {
	        		$$('label.instagram_error')[0].style.display = 'block';
	        		$$('label.instagram_error')[0].innerHTML = response.error;
	        		$$('p.instagram_loading')[0].innerHTML = '<br/>';
	        	} else {
	        		$$('label.instagram_error')[0].innerHTML = '';
	    			$$('div.instagram_div ul#colorSet')[0].innerHTML = response['images'];
	        		$$('div.instagram_div')[0].style.display = 'block';
	        		$$('form.instagram_login')[0].style.display = 'none';
	        		$$('.instagram_hdr')[0].innerHTML = response['hdr'];
	        		$$('p.instagram_loading')[0].innerHTML = '<br/>';
	        		$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
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
}
var fb_albums = '';
var fb_albums_hdr = '';
function getFacebookAlbums(){
	if(fb_albums==''){
		$$('p.fb_loading')[0].innerHTML = 'Please wait while albums are loading. This might take time depending on number of albums....&nbsp;&nbsp;&nbsp;<img src="/skin/frontend/default/default/images/opc-ajax-loader.gif"/>'; 
		$$('label.facebook_error')[0].innerHTML = '';
		url = '/facebook/customer/albums';
		if(cross_domain == "" || cross_domain == undefined){
			new Ajax.Request(url, {
		    	method:     'POST',
		    	dataType: 'json',
		    	parameters : {},
		    	onSuccess: function(transport){
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
		    			$$('div.facebook_div ul#colorSet')[0].innerHTML = response['images'];
		        		$$('div.facebook_div')[0].style.display = 'block';
		        		$$('form.facebook_login')[0].style.display = 'none';
		        		$$('.facebook_hdr')[0].innerHTML = response['hdr'];
		        		$$('p.fb_loading')[0].innerHTML = '<br/>';
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
		$$('p.fb_loading')[0].innerHTML = '<br/>';
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
	$$('.facebook_hdr')[0].innerHTML = 'Please wait while album images are loading....&nbsp;&nbsp;&nbsp;<img src="/skin/frontend/default/default/images/opc-ajax-loader.gif"/>'; 
	$$('label.facebook_error')[0].innerHTML = '';
	if(facebook_album_id!=undefined){
		url = '/facebook/customer/albumImages';
		if(cross_domain == "" || cross_domain == undefined){
			new Ajax.Request(url, {
	        	method:     'POST',
	        	dataType: 'json',
	        	parameters : {'facebook_album_id':facebook_album_id,'facebook_album_name':facebook_album_name},
	        	onSuccess: function(transport){
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
	        			$$('div.facebook_div ul#colorSet')[0].innerHTML = response['images'];
	            		$$('div.facebook_div')[0].style.display = 'block';
	            		$$('form.facebook_login')[0].style.display = 'none';
	            		$$('.facebook_hdr')[0].innerHTML = response['hdr'];
	            		$$('p.fb_loading')[0].innerHTML = '<br/>';
	            		$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
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
	            		$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
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
	$$('div.myimages_loginform')[0].style.display = 'none';
	px_username = document.getElementById('px_username').value;
	px_password = document.getElementById('px_password').value;
	$$('p.myimages_loading')[0].innerHTML = 'Please wait while images are loading....&nbsp;&nbsp;&nbsp;<img src="/skin/frontend/default/default/images/opc-ajax-loader.gif"/>';
	$$('label.myimages_error')[0].innerHTML = '';
	url = '/dol/ajax/loginPost';
	if(cross_domain == "" || cross_domain == undefined){
		new Ajax.Request(url, {
	    	method:     'POST',
	    	dataType: 'json',
	    	parameters : {'username':px_username, 'password':px_password},
	    	onSuccess: function(transport){
	    		response = transport.responseText.evalJSON();
	    		if (response.error) {
	        		$$('label.myimages_error')[0].style.display = 'block';
	        		$$('label.myimages_error')[0].innerHTML = response.error;
	        		$$('p.myimages_loading')[0].innerHTML = '<br/>';
	        		$$('div.myimages_loginform')[0].style.display = 'block';
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
	    		response = transport;
	    		if (response.error) {
	        		$$('label.myimages_error')[0].style.display = 'block';
	        		$$('label.myimages_error')[0].innerHTML = response.error;
	        		$$('p.myimages_loading')[0].innerHTML = '<br/>';
	        		$$('div.myimages_loginform')[0].style.display = 'block';
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
	$$('p.myimages_loading')[0].innerHTML = 'Please wait while images are loading....&nbsp;&nbsp;&nbsp;<img src="/skin/frontend/default/default/images/opc-ajax-loader.gif"/>';
	$$('label.myimages_error')[0].innerHTML = '';
	url = '/dol/ajax/getMyImages';
	if(cross_domain == "" || cross_domain == undefined){
		 new Ajax.Request(url, {
		    	method:     'POST',
		    	dataType: 'json',
		    	parameters : {},
		    	onSuccess: function(transport){
		    		response = transport.responseText.evalJSON();
		    		if (response.error) {
		        		$$('label.myimages_error')[0].style.display = 'block';
		        		$$('label.myimages_error')[0].innerHTML = response.error;
		        		$$('p.myimages_loading')[0].innerHTML = '<br/>';
		        	} else {
		        		$$('label.myimages_error')[0].innerHTML = '';
		    			$$('div.myimages_div ul#colorSet')[0].innerHTML = response['images'];
		        		$$('div.myimages_div')[0].style.display = 'block';
		        		$$('form.myimages_login')[0].style.display = 'none';
		        		$$('.myimages_hdr')[0].innerHTML = response['hdr'];
		        		$$('p.myimages_loading')[0].innerHTML = '<br/>';
		        		$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
		        		//$j('.myimages_div').tinyscrollbar({axis:'x'});
		        		var len = $j('.myimages_div .draggable img').length*140;
		            		console.log(len);
		            		//$j('.myimages_photos').css('width',len);
		            		//$j('.myimages_photos').css('top','13px');
		            		$j(".myimages_div ul#colorSet img").load(function(){
								$j(".myimages_div").mCustomScrollbar("update");
								width = $j(".myimages_div .mCSB_container").width();
								$j(".myimages_div .mCSB_container").css("width",width+4);
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
			        	    		console.log(input)
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
			        	    		console.log(input)
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
		    		if (response.error) {
		        		$$('label.myimages_error')[0].style.display = 'block';
		        		$$('label.myimages_error')[0].innerHTML = response.error;
		        		$$('p.myimages_loading')[0].innerHTML = '<br/>';
		        	} else {
		        		$$('label.myimages_error')[0].innerHTML = '';
		    			$$('div.myimages_div ul#colorSet')[0].innerHTML = response.images;
		        		$$('div.myimages_div')[0].style.display = 'block';
		        		$$('form.myimages_login')[0].style.display = 'none';
		        		$$('.myimages_hdr')[0].innerHTML = response.hdr;
		        		$$('p.myimages_loading')[0].innerHTML = '<br/>';
		        		$j('.draggable img').draggable({appendTo: "body",helper:"clone"});
		        		//$j('.myimages_div').tinyscrollbar({axis:'x'});
		        		var len = $j('.myimages_div .draggable img').length*140;
		            		console.log(len);
		            		//$j('.myimages_photos').css('width',len);
		            		//$j('.myimages_photos').css('top','13px');
		            		$j(".myimages_div ul#colorSet img").load(function(){
								$j(".myimages_div").mCustomScrollbar("update");
								width = $j(".myimages_div .mCSB_container").width();
								$j(".myimages_div .mCSB_container").css("width",width+4);
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
				        	    		console.log(input)
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
     	if(!input.files[i].name.toLowerCase().match(/(svg|gif|jpg|jpeg|png|tiff|tif)$/)){
     		alert("Unsupported file format. Please upload a valid JEPG, PNG, GIF, TIFF or SVG file.")
     		return;
     	}                	
     }
	 if(input.value!=""){
		 $j('#fileupload_box').dialog('open');
	}
   // disable the input
   //input.setAttribute("disabled", "true");
   console.log($j(this))
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
       	
       	console.log('asdsa');
       	console.log(div);
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
	    	}
	    });
		}else{
	    $j.ajax({url:"http://"+cross_domain+"/dol/ajax/ajaxLogout?callback=?", 
	    	type:     'GET',
	    	async: false,
	    	jsonpCallback: 'jsonCallback',
	    	contentType: "application/json",
	    	dataType: 'jsonp',
	    	parameters : {}
	    });
    }
    $j('.myimages_div')[0].style.display = 'none';
	$j('.myimages_login')[0].style.display = 'block';
	$j('.myimages_loginform')[0].style.display = 'block';
	$j('.loggedin')[0].style.display = 'none';
	content = '<p class="images_drag">Drag and Drop your Uploaded Images</p>&nbsp; &nbsp;<div class="img_upload1" ><button class="button button-new-upload" name="send" title="" type="button"><span><span>Upload More</span></span></button><input type="file" multiple="multiple" class="uploaded" id="uploaded" onchange="uploads()" accept="image/*"/></div><span>&nbsp; &nbsp;|&nbsp; &nbsp; <a type="button" title="Login" name="send" style="cursor:pointer;" class="button button-new-showlogin" id="send2">Login</a></span><span class="lowres-warning"><img width="16px" height="16px" style="cursor:help;" src="/js/all/editor/images/warning-small22.png"> = Low Resolution<div class="tooltip_full_value"> <p><b>Image Resolution is Low</b><br>Required dimensions for each Square Canvas is 1200x1200px.<br>The quality of final print may get affected.</p></div></span>';
	
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
}/**
 * jQuery lightBox plugin
 * This jQuery plugin was inspired and based on Lightbox 2 by Lokesh Dhakar (http://www.huddletogether.com/projects/lightbox2/)
 * and adapted to me for use like a plugin from jQuery.
 * @name jquery-lightbox-0.5.js
 * @author Leandro Vieira Pinho - http://leandrovieira.com
 * @version 0.5
 * @date April 11, 2008
 * @category jQuery plugin
 * @copyright (c) 2008 Leandro Vieira Pinho (leandrovieira.com)
 * @license CCAttribution-ShareAlike 2.5 Brazil - http://creativecommons.org/licenses/by-sa/2.5/br/deed.en_US
 * @example Visit http://leandrovieira.com/projects/jquery/lightbox/ for more informations about this jQuery plugin
 */

// Offering a Custom Alias suport - More info: http://docs.jquery.com/Plugins/Authoring#Custom_Alias
(function($) {
	/**
	 * $ is an alias to jQuery object
	 *
	 */
	$.fn.lightBox = function(settings) {
		// Settings to configure the jQuery lightBox plugin how you like
		settings = jQuery.extend({
			// Configuration related to overlay
			overlayBgColor: 		'#000',		// (string) Background color to overlay; inform a hexadecimal value like: #RRGGBB. Where RR, GG, and BB are the hexadecimal values for the red, green, and blue values of the color.
			overlayOpacity:			0.8,		// (integer) Opacity value to overlay; inform: 0.X. Where X are number from 0 to 9
			// Configuration related to navigation
			fixedNavigation:		false,		// (boolean) Boolean that informs if the navigation (next and prev button) will be fixed or not in the interface.
			// Configuration related to images
			imageLoading:			'js/all/editor/images/lightbox-images/lightbox-ico-loading.gif',		// (string) Path and the name of the loading icon
			imageBtnPrev:			'js/all/editor/images/lightbox-images/lightbox-btn-prev.gif',			// (string) Path and the name of the prev button image
			imageBtnNext:			'js/all/editor/images/lightbox-images/lightbox-btn-next.gif',			// (string) Path and the name of the next button image
			imageBtnClose:			'js/all/editor/images/lightbox-images/lightbox-btn-close.gif',		// (string) Path and the name of the close btn
			imageBlank:				'js/all/editor/images/lightbox-images/lightbox-blank.gif',			// (string) Path and the name of a blank image (one pixel)
			// Configuration related to container image box
			containerBorderSize:	10,			// (integer) If you adjust the padding in the CSS for the container, #lightbox-container-image-box, you will need to update this value
			containerResizeSpeed:	400,		// (integer) Specify the resize duration of container image. These number are miliseconds. 400 is default.
			// Configuration related to texts in caption. For example: Image 2 of 8. You can alter either "Image" and "of" texts.
			txtImage:				'Image',	// (string) Specify text "Image"
			txtOf:					'of',		// (string) Specify text "of"
			// Configuration related to keyboard navigation
			keyToClose:				'c',		// (string) (c = close) Letter to close the jQuery lightBox interface. Beyond this letter, the letter X and the SCAPE key is used to.
			keyToPrev:				'p',		// (string) (p = previous) Letter to show the previous image
			keyToNext:				'n',		// (string) (n = next) Letter to show the next image.
			// Don´t alter these variables in any way
			imageArray:				[],
			activeImage:			0
		},settings);
		// Caching the jQuery object with all elements matched
		var jQueryMatchedObj = this; // This, in this context, refer to jQuery object
		/**
		 * Initializing the plugin calling the start function
		 *
		 * @return boolean false
		 */
		function _initialize() {
			_start(this,jQueryMatchedObj); // This, in this context, refer to object (link) which the user have clicked
			return false; // Avoid the browser following the link
		}
		/**
		 * Start the jQuery lightBox plugin
		 *
		 * @param object objClicked The object (link) whick the user have clicked
		 * @param object jQueryMatchedObj The jQuery object with all elements matched
		 */
		function _start(objClicked,jQueryMatchedObj) {
			// Hime some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
			//$('embed, object, select').css({ 'visibility' : 'hidden' });
			// Call the function to create the markup structure; style some elements; assign events in some elements.
			_set_interface();
			// Unset total images in imageArray
			settings.imageArray.length = 0;
			// Unset image active information
			settings.activeImage = 0;
			// We have an image set? Or just an image? Let´s see it.
			if ( jQueryMatchedObj.length == 1 ) {
				settings.imageArray.push(new Array(objClicked.getAttribute('href'),objClicked.getAttribute('title')));
			} else {
				// Add an Array (as many as we have), with href and title atributes, inside the Array that storage the images references		
				for ( var i = 0; i < jQueryMatchedObj.length; i++ ) {
					settings.imageArray.push(new Array(jQueryMatchedObj[i].getAttribute('href'),jQueryMatchedObj[i].getAttribute('title')));
				}
			}
			while ( settings.imageArray[settings.activeImage][0] != objClicked.getAttribute('href') ) {
				settings.activeImage++;
			}
			// Call the function that prepares image exibition
			_set_image_to_view();
		}
		/**
		 * Create the jQuery lightBox plugin interface
		 *
		 * The HTML markup will be like that:
			<div id="jquery-overlay"></div>
			<div id="jquery-lightbox">
				<div id="lightbox-container-image-box">
					<div id="lightbox-container-image">
						<img src="../fotos/XX.jpg" id="lightbox-image">
						<div id="lightbox-nav">
							<a href="#" id="lightbox-nav-btnPrev"></a>
							<a href="#" id="lightbox-nav-btnNext"></a>
						</div>
						<div id="lightbox-loading">
							<a href="#" id="lightbox-loading-link">
								<img src="../images/lightbox-ico-loading.gif">
							</a>
						</div>
					</div>
				</div>
				<div id="lightbox-container-image-data-box">
					<div id="lightbox-container-image-data">
						<div id="lightbox-image-details">
							<span id="lightbox-image-details-caption"></span>
							<span id="lightbox-image-details-currentNumber"></span>
						</div>
						<div id="lightbox-secNav">
							<a href="#" id="lightbox-secNav-btnClose">
								<img src="../images/lightbox-btn-close.gif">
							</a>
						</div>
					</div>
				</div>
			</div>
		 *
		 */
		function _set_interface() {
			// Apply the HTML markup into body tag
			$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><img id="lightbox-image"><div style="" id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"><img src="' + settings.imageLoading + '"></a></div></div></div><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-image-details"><span id="lightbox-image-details-caption"></span><span id="lightbox-image-details-currentNumber"></span></div><div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose"><img src="' + settings.imageBtnClose + '"></a></div></div></div></div>');	
			// Get page sizes
			var arrPageSizes = ___getPageSize();
			// Style overlay and show it
			$('#jquery-overlay').css({
				backgroundColor:	settings.overlayBgColor,
				opacity:			settings.overlayOpacity,
				width:				arrPageSizes[0],
				height:				arrPageSizes[1]
			}).fadeIn();
			// Get page scroll
			var arrPageScroll = ___getPageScroll();
			// Calculate top and left offset for the jquery-lightbox div object and show it
			$('#jquery-lightbox').css({
				top:	arrPageScroll[1] + (arrPageSizes[3] / 10),
				left:	arrPageScroll[0]
			}).show();
			// Assigning click events in elements to close overlay
			$('#jquery-overlay,#jquery-lightbox').click(function() {
				_finish();									
			});
			// Assign the _finish function to lightbox-loading-link and lightbox-secNav-btnClose objects
			$('#lightbox-loading-link,#lightbox-secNav-btnClose').click(function() {
				_finish();
				return false;
			});
			// If window was resized, calculate the new overlay dimensions
			$(window).resize(function() {
				// Get page sizes
				var arrPageSizes = ___getPageSize();
				// Style overlay and show it
				$('#jquery-overlay').css({
					width:		arrPageSizes[0],
					height:		arrPageSizes[1]
				});
				// Get page scroll
				var arrPageScroll = ___getPageScroll();
				// Calculate top and left offset for the jquery-lightbox div object and show it
				$('#jquery-lightbox').css({
					top:	arrPageScroll[1] + (arrPageSizes[3] / 10),
					left:	arrPageScroll[0]
				});
			});
		}
		/**
		 * Prepares image exibition; doing a image´s preloader to calculate it´s size
		 *
		 */
		function _set_image_to_view() { // show the loading
			// Show the loading
			$('#lightbox-loading').show();
			if ( settings.fixedNavigation ) {
				$('#lightbox-image,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();
			} else {
				// Hide some elements
				$('#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();
			}
			// Image preload process
			var objImagePreloader = new Image();
			objImagePreloader.onload = function() {
				$('#lightbox-image').attr('src',settings.imageArray[settings.activeImage][0]);
				// Perfomance an effect in the image container resizing it
				_resize_container_image_box(objImagePreloader.width,objImagePreloader.height);
				//	clear onLoad, IE behaves irratically with animated gifs otherwise
				objImagePreloader.onload=function(){};
			};
			objImagePreloader.src = settings.imageArray[settings.activeImage][0];
		};
		/**
		 * Perfomance an effect in the image container resizing it
		 *
		 * @param integer intImageWidth The image´s width that will be showed
		 * @param integer intImageHeight The image´s height that will be showed
		 */
		function _resize_container_image_box(intImageWidth,intImageHeight) {
			// Get current width and height
			var intCurrentWidth = $('#lightbox-container-image-box').width();
			var intCurrentHeight = $('#lightbox-container-image-box').height();
			// Get the width and height of the selected image plus the padding
			var intWidth = (intImageWidth + (settings.containerBorderSize * 2)); // Plus the image´s width and the left and right padding value
			var intHeight = (intImageHeight + (settings.containerBorderSize * 2)); // Plus the image´s height and the left and right padding value
			// Diferences
			var intDiffW = intCurrentWidth - intWidth;
			var intDiffH = intCurrentHeight - intHeight;
			// Perfomance the effect
			$('#lightbox-container-image-box').animate({ width: intWidth, height: intHeight },settings.containerResizeSpeed,function() { _show_image(); });
			if ( ( intDiffW == 0 ) && ( intDiffH == 0 ) ) {
				if ( $.browser.msie ) {
					___pause(250);
				} else {
					___pause(100);	
				}
			} 
			$('#lightbox-container-image-data-box').css({ width: intImageWidth });
			$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({ height: intImageHeight + (settings.containerBorderSize * 2) });
		};
		/**
		 * Show the prepared image
		 *
		 */
		function _show_image() {
			$('#lightbox-loading').hide();
			$('#lightbox-image').fadeIn(function() {
				_show_image_data();
				_set_navigation();
			});
			_preload_neighbor_images();
		};
		/**
		 * Show the image information
		 *
		 */
		function _show_image_data() {
			$('#lightbox-container-image-data-box').slideDown('fast');
			$('#lightbox-image-details-caption').hide();
			if ( settings.imageArray[settings.activeImage][1] ) {
				$('#lightbox-image-details-caption').html(settings.imageArray[settings.activeImage][1]).show();
			}
			// If we have a image set, display 'Image X of X'
			if ( settings.imageArray.length > 1 ) {
				$('#lightbox-image-details-currentNumber').html(settings.txtImage + ' ' + ( settings.activeImage + 1 ) + ' ' + settings.txtOf + ' ' + settings.imageArray.length).show();
			}		
		}
		/**
		 * Display the button navigations
		 *
		 */
		function _set_navigation() {
			$('#lightbox-nav').show();

			// Instead to define this configuration in CSS file, we define here. And it´s need to IE. Just.
			$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({ 'background' : 'transparent url(' + settings.imageBlank + ') no-repeat' });
			
			// Show the prev button, if not the first image in set
			if ( settings.activeImage != 0 ) {
				if ( settings.fixedNavigation ) {
					$('#lightbox-nav-btnPrev').css({ 'background' : 'url(' + settings.imageBtnPrev + ') left 15% no-repeat' })
						.unbind()
						.bind('click',function() {
							settings.activeImage = settings.activeImage - 1;
							_set_image_to_view();
							return false;
						});
				} else {
					// Show the images button for Next buttons
					$('#lightbox-nav-btnPrev').unbind().hover(function() {
						$(this).css({ 'background' : 'url(' + settings.imageBtnPrev + ') left 15% no-repeat' });
					},function() {
						$(this).css({ 'background' : 'transparent url(' + settings.imageBlank + ') no-repeat' });
					}).show().bind('click',function() {
						settings.activeImage = settings.activeImage - 1;
						_set_image_to_view();
						return false;
					});
				}
			}
			
			// Show the next button, if not the last image in set
			if ( settings.activeImage != ( settings.imageArray.length -1 ) ) {
				if ( settings.fixedNavigation ) {
					$('#lightbox-nav-btnNext').css({ 'background' : 'url(' + settings.imageBtnNext + ') right 15% no-repeat' })
						.unbind()
						.bind('click',function() {
							settings.activeImage = settings.activeImage + 1;
							_set_image_to_view();
							return false;
						});
				} else {
					// Show the images button for Next buttons
					$('#lightbox-nav-btnNext').unbind().hover(function() {
						$(this).css({ 'background' : 'url(' + settings.imageBtnNext + ') right 15% no-repeat' });
					},function() {
						$(this).css({ 'background' : 'transparent url(' + settings.imageBlank + ') no-repeat' });
					}).show().bind('click',function() {
						settings.activeImage = settings.activeImage + 1;
						_set_image_to_view();
						return false;
					});
				}
			}
			// Enable keyboard navigation
			_enable_keyboard_navigation();
		}
		/**
		 * Enable a support to keyboard navigation
		 *
		 */
		function _enable_keyboard_navigation() {
			$(document).keydown(function(objEvent) {
				_keyboard_action(objEvent);
			});
		}
		/**
		 * Disable the support to keyboard navigation
		 *
		 */
		function _disable_keyboard_navigation() {
			$(document).unbind();
		}
		/**
		 * Perform the keyboard actions
		 *
		 */
		function _keyboard_action(objEvent) {
			// To ie
			if ( objEvent == null ) {
				keycode = event.keyCode;
				escapeKey = 27;
			// To Mozilla
			} else {
				keycode = objEvent.keyCode;
				escapeKey = objEvent.DOM_VK_ESCAPE;
			}
			// Get the key in lower case form
			key = String.fromCharCode(keycode).toLowerCase();
			// Verify the keys to close the ligthBox
			if ( ( key == settings.keyToClose ) || ( key == 'x' ) || ( keycode == escapeKey ) ) {
				_finish();
			}
			// Verify the key to show the previous image
			if ( ( key == settings.keyToPrev ) || ( keycode == 37 ) ) {
				// If we´re not showing the first image, call the previous
				if ( settings.activeImage != 0 ) {
					settings.activeImage = settings.activeImage - 1;
					_set_image_to_view();
					_disable_keyboard_navigation();
				}
			}
			// Verify the key to show the next image
			if ( ( key == settings.keyToNext ) || ( keycode == 39 ) ) {
				// If we´re not showing the last image, call the next
				if ( settings.activeImage != ( settings.imageArray.length - 1 ) ) {
					settings.activeImage = settings.activeImage + 1;
					_set_image_to_view();
					_disable_keyboard_navigation();
				}
			}
		}
		/**
		 * Preload prev and next images being showed
		 *
		 */
		function _preload_neighbor_images() {
			if ( (settings.imageArray.length -1) > settings.activeImage ) {
				objNext = new Image();
				objNext.src = settings.imageArray[settings.activeImage + 1][0];
			}
			if ( settings.activeImage > 0 ) {
				objPrev = new Image();
				objPrev.src = settings.imageArray[settings.activeImage -1][0];
			}
		}
		/**
		 * Remove jQuery lightBox plugin HTML markup
		 *
		 */
		function _finish() {
			$('#jquery-lightbox').remove();
			$('#jquery-overlay').fadeOut(function() { $('#jquery-overlay').remove(); });
			// Show some elements to avoid conflict with overlay in IE. These elements appear above the overlay.
			$('embed, object, select').css({ 'visibility' : 'visible' });
		}
		/**
		 / THIRD FUNCTION
		 * getPageSize() by quirksmode.com
		 *
		 * @return Array Return an array with page width, height and window width, height
		 */
		function ___getPageSize() {
			var xScroll, yScroll;
			if (window.innerHeight && window.scrollMaxY) {	
				xScroll = window.innerWidth + window.scrollMaxX;
				yScroll = window.innerHeight + window.scrollMaxY;
			} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
				xScroll = document.body.scrollWidth;
				yScroll = document.body.scrollHeight;
			} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
				xScroll = document.body.offsetWidth;
				yScroll = document.body.offsetHeight;
			}
			var windowWidth, windowHeight;
			if (self.innerHeight) {	// all except Explorer
				if(document.documentElement.clientWidth){
					windowWidth = document.documentElement.clientWidth; 
				} else {
					windowWidth = self.innerWidth;
				}
				windowHeight = self.innerHeight;
			} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
				windowWidth = document.documentElement.clientWidth;
				windowHeight = document.documentElement.clientHeight;
			} else if (document.body) { // other Explorers
				windowWidth = document.body.clientWidth;
				windowHeight = document.body.clientHeight;
			}	
			// for small pages with total height less then height of the viewport
			if(yScroll < windowHeight){
				pageHeight = windowHeight;
			} else { 
				pageHeight = yScroll;
			}
			// for small pages with total width less then width of the viewport
			if(xScroll < windowWidth){	
				pageWidth = xScroll;		
			} else {
				pageWidth = windowWidth;
			}
			arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
			return arrayPageSize;
		};
		/**
		 / THIRD FUNCTION
		 * getPageScroll() by quirksmode.com
		 *
		 * @return Array Return an array with x,y page scroll values.
		 */
		function ___getPageScroll() {
			var xScroll, yScroll;
			if (self.pageYOffset) {
				yScroll = self.pageYOffset;
				xScroll = self.pageXOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
				yScroll = document.documentElement.scrollTop;
				xScroll = document.documentElement.scrollLeft;
			} else if (document.body) {// all other Explorers
				yScroll = document.body.scrollTop;
				xScroll = document.body.scrollLeft;	
			}
			arrayPageScroll = new Array(xScroll,yScroll);
			return arrayPageScroll;
		};
		 /**
		  * Stop the code execution from a escified time in milisecond
		  *
		  */
		 function ___pause(ms) {
			var date = new Date(); 
			curDate = null;
			do { var curDate = new Date(); }
			while ( curDate - date < ms);
		 };
		// Return the jQuery object for chaining. The unbind method is used to avoid click conflict when the plugin is called more than once
		return this.unbind('click').click(_initialize);
	};
})(jQuery); // Call and execute the function immediately passing the jQuery object/*mousewheel*/
(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);
/*TweenLite*/
(function(a){"use strict";var e,f,g,h,b=a.GreenSockGlobals||a,c=function(a){var e,c=a.split("."),d=b;for(e=0;c.length>e;e++)d[c[e]]=d=d[c[e]]||{};return d},d=c("com.greensock"),i={},j=function(d,e,f,g){this.sc=i[d]?i[d].sc:[],i[d]=this,this.gsClass=null,this.func=f;var h=[];this.check=function(k){for(var n,o,p,q,l=e.length,m=l;--l>-1;)(n=i[e[l]]||new j(e[l],[])).gsClass?(h[l]=n.gsClass,m--):k&&n.sc.push(this);if(0===m&&f)for(o=("com.greensock."+d).split("."),p=o.pop(),q=c(o.join("."))[p]=this.gsClass=f.apply(f,h),g&&(b[p]=q,"function"==typeof define&&define.amd?define((a.GreenSockAMDPath?a.GreenSockAMDPath+"/":"")+d.split(".").join("/"),[],function(){return q}):"undefined"!=typeof module&&module.exports&&(module.exports=q)),l=0;this.sc.length>l;l++)this.sc[l].check()},this.check(!0)},k=a._gsDefine=function(a,b,c,d){return new j(a,b,c,d)},l=d._class=function(a,b,c){return b=b||function(){},k(a,[],function(){return b},c),b},m=[0,0,1,1],n=[],o=l("easing.Ease",function(a,b,c,d){this._func=a,this._type=c||0,this._power=d||0,this._params=b?m.concat(b):m},!0),p=o.map={},q=o.register=function(a,b,c,e){for(var i,j,k,m,f=b.split(","),g=f.length,h=(c||"easeIn,easeOut,easeInOut").split(",");--g>-1;)for(j=f[g],i=e?l("easing."+j,null,!0):d.easing[j]||{},k=h.length;--k>-1;)m=h[k],p[j+"."+m]=p[m+j]=i[m]=a.getRatio?a:a[m]||new a};for(g=o.prototype,g._calcEnd=!1,g.getRatio=function(a){if(this._func)return this._params[0]=a,this._func.apply(null,this._params);var b=this._type,c=this._power,d=1===b?1-a:2===b?a:.5>a?2*a:2*(1-a);return 1===c?d*=d:2===c?d*=d*d:3===c?d*=d*d*d:4===c&&(d*=d*d*d*d),1===b?1-d:2===b?d:.5>a?d/2:1-d/2},e=["Linear","Quad","Cubic","Quart","Quint,Strong"],f=e.length;--f>-1;)g=e[f]+",Power"+f,q(new o(null,null,1,f),g,"easeOut",!0),q(new o(null,null,2,f),g,"easeIn"+(0===f?",easeNone":"")),q(new o(null,null,3,f),g,"easeInOut");p.linear=d.easing.Linear.easeIn,p.swing=d.easing.Quad.easeInOut;var r=l("events.EventDispatcher",function(a){this._listeners={},this._eventTarget=a||this});g=r.prototype,g.addEventListener=function(a,b,c,d,e){e=e||0;var h,i,f=this._listeners[a],g=0;for(null==f&&(this._listeners[a]=f=[]),i=f.length;--i>-1;)h=f[i],h.c===b?f.splice(i,1):0===g&&e>h.pr&&(g=i+1);f.splice(g,0,{c:b,s:c,up:d,pr:e})},g.removeEventListener=function(a,b){var d,c=this._listeners[a];if(c)for(d=c.length;--d>-1;)if(c[d].c===b)return c.splice(d,1),void 0},g.dispatchEvent=function(a){var b=this._listeners[a];if(b)for(var e,c=b.length,d=this._eventTarget;--c>-1;)e=b[c],e.up?e.c.call(e.s||d,{type:a,target:d}):e.c.call(e.s||d)};var s=a.requestAnimationFrame,t=a.cancelAnimationFrame,u=Date.now||function(){return(new Date).getTime()};for(e=["ms","moz","webkit","o"],f=e.length;--f>-1&&!s;)s=a[e[f]+"RequestAnimationFrame"],t=a[e[f]+"CancelAnimationFrame"]||a[e[f]+"CancelRequestAnimationFrame"];l("Ticker",function(b,c){var g,h,i,j,k,d=this,e=u(),f=c!==!1&&s,l=function(){null!=i&&(f&&t?t(i):a.clearTimeout(i),i=null)},m=function(a){d.time=(u()-e)/1e3,(!g||d.time>=k||a===!0)&&(d.frame++,k=d.time>k?d.time+j-(d.time-k):d.time+j-.001,d.time+.001>k&&(k=d.time+.001),d.dispatchEvent("tick")),a!==!0&&(i=h(m))};r.call(d),this.time=this.frame=0,this.tick=function(){m(!0)},this.fps=function(a){return arguments.length?(g=a,j=1/(g||60),k=this.time+j,h=0===g?function(){}:f&&s?s:function(a){return setTimeout(a,1e3*(k-d.time)+1>>0||1)},l(),i=h(m),void 0):g},this.useRAF=function(a){return arguments.length?(l(),f=a,d.fps(g),void 0):f},d.fps(b),setTimeout(function(){f&&!i&&d.useRAF(!1)},1e3)}),g=d.Ticker.prototype=new d.events.EventDispatcher,g.constructor=d.Ticker;var v=l("core.Animation",function(a,b){if(this.vars=b||{},this._duration=this._totalDuration=a||0,this._delay=Number(this.vars.delay)||0,this._timeScale=1,this._active=this.vars.immediateRender===!0,this.data=this.vars.data,this._reversed=this.vars.reversed===!0,I){h||(w.tick(),h=!0);var c=this.vars.useFrames?H:I;c.add(this,c._time),this.vars.paused&&this.paused(!0)}}),w=v.ticker=new d.Ticker;g=v.prototype,g._dirty=g._gc=g._initted=g._paused=!1,g._totalTime=g._time=0,g._rawPrevTime=-1,g._next=g._last=g._onUpdate=g._timeline=g.timeline=null,g._paused=!1,g.play=function(a,b){return arguments.length&&this.seek(a,b),this.reversed(!1),this.paused(!1)},g.pause=function(a,b){return arguments.length&&this.seek(a,b),this.paused(!0)},g.resume=function(a,b){return arguments.length&&this.seek(a,b),this.paused(!1)},g.seek=function(a,b){return this.totalTime(Number(a),b!==!1)},g.restart=function(a,b){return this.reversed(!1),this.paused(!1),this.totalTime(a?-this._delay:0,b!==!1)},g.reverse=function(a,b){return arguments.length&&this.seek(a||this.totalDuration(),b),this.reversed(!0),this.paused(!1)},g.render=function(){},g.invalidate=function(){return this},g._enabled=function(a,b){return this._gc=!a,this._active=a&&!this._paused&&this._totalTime>0&&this._totalTime<this._totalDuration,b!==!0&&(a&&null==this.timeline?this._timeline.add(this,this._startTime-this._delay):a||null==this.timeline||this._timeline._remove(this,!0)),!1},g._kill=function(){return this._enabled(!1,!1)},g.kill=function(a,b){return this._kill(a,b),this},g._uncache=function(a){for(var b=a?this:this.timeline;b;)b._dirty=!0,b=b.timeline;return this},g.eventCallback=function(a,b,c,d){if(null==a)return null;if("on"===a.substr(0,2)){if(1===arguments.length)return this.vars[a];if(null==b)delete this.vars[a];else if(this.vars[a]=b,this.vars[a+"Params"]=c,this.vars[a+"Scope"]=d,c)for(var e=c.length;--e>-1;)"{self}"===c[e]&&(c=this.vars[a+"Params"]=c.concat(),c[e]=this);"onUpdate"===a&&(this._onUpdate=b)}return this},g.delay=function(a){return arguments.length?(this._timeline.smoothChildTiming&&this.startTime(this._startTime+a-this._delay),this._delay=a,this):this._delay},g.duration=function(a){return arguments.length?(this._duration=this._totalDuration=a,this._uncache(!0),this._timeline.smoothChildTiming&&this._time>0&&this._time<this._duration&&0!==a&&this.totalTime(this._totalTime*(a/this._duration),!0),this):(this._dirty=!1,this._duration)},g.totalDuration=function(a){return this._dirty=!1,arguments.length?this.duration(a):this._totalDuration},g.time=function(a,b){return arguments.length?(this._dirty&&this.totalDuration(),a>this._duration&&(a=this._duration),this.totalTime(a,b)):this._time},g.totalTime=function(a,b){if(!arguments.length)return this._totalTime;if(this._timeline){if(0>a&&(a+=this.totalDuration()),this._timeline.smoothChildTiming&&(this._dirty&&this.totalDuration(),a>this._totalDuration&&(a=this._totalDuration),this._startTime=(this._paused?this._pauseTime:this._timeline._time)-(this._reversed?this._totalDuration-a:a)/this._timeScale,this._timeline._dirty||this._uncache(!1),!this._timeline._active))for(var c=this._timeline;c._timeline;)c.totalTime(c._totalTime,!0),c=c._timeline;this._gc&&this._enabled(!0,!1),this._totalTime!==a&&this.render(a,b,!1)}return this},g.startTime=function(a){return arguments.length?(a!==this._startTime&&(this._startTime=a,this.timeline&&this.timeline._sortChildren&&this.timeline.add(this,a-this._delay)),this):this._startTime},g.timeScale=function(a){if(!arguments.length)return this._timeScale;if(a=a||1e-6,this._timeline&&this._timeline.smoothChildTiming){var b=this._pauseTime||0===this._pauseTime?this._pauseTime:this._timeline._totalTime;this._startTime=b-(b-this._startTime)*this._timeScale/a}return this._timeScale=a,this._uncache(!1)},g.reversed=function(a){return arguments.length?(a!=this._reversed&&(this._reversed=a,this.totalTime(this._totalTime,!0)),this):this._reversed},g.paused=function(a){return arguments.length?(a!=this._paused&&this._timeline&&(!a&&this._timeline.smoothChildTiming&&(this._startTime+=this._timeline.rawTime()-this._pauseTime,this._uncache(!1)),this._pauseTime=a?this._timeline.rawTime():null,this._paused=a,this._active=!this._paused&&this._totalTime>0&&this._totalTime<this._totalDuration),this._gc&&(a||this._enabled(!0,!1)),this):this._paused};var x=l("core.SimpleTimeline",function(a){v.call(this,0,a),this.autoRemoveChildren=this.smoothChildTiming=!0});g=x.prototype=new v,g.constructor=x,g.kill()._gc=!1,g._first=g._last=null,g._sortChildren=!1,g.add=function(a,b){var e,f;if(a._startTime=Number(b||0)+a._delay,a._paused&&this!==a._timeline&&(a._pauseTime=a._startTime+(this.rawTime()-a._startTime)/a._timeScale),a.timeline&&a.timeline._remove(a,!0),a.timeline=a._timeline=this,a._gc&&a._enabled(!0,!0),e=this._last,this._sortChildren)for(f=a._startTime;e&&e._startTime>f;)e=e._prev;return e?(a._next=e._next,e._next=a):(a._next=this._first,this._first=a),a._next?a._next._prev=a:this._last=a,a._prev=e,this._timeline&&this._uncache(!0),this},g.insert=g.add,g._remove=function(a,b){return a.timeline===this&&(b||a._enabled(!1,!0),a.timeline=null,a._prev?a._prev._next=a._next:this._first===a&&(this._first=a._next),a._next?a._next._prev=a._prev:this._last===a&&(this._last=a._prev),this._timeline&&this._uncache(!0)),this},g.render=function(a,b){var e,d=this._first;for(this._totalTime=this._time=this._rawPrevTime=a;d;)e=d._next,(d._active||a>=d._startTime&&!d._paused)&&(d._reversed?d.render((d._dirty?d.totalDuration():d._totalDuration)-(a-d._startTime)*d._timeScale,b,!1):d.render((a-d._startTime)*d._timeScale,b,!1)),d=e},g.rawTime=function(){return this._totalTime};var y=l("TweenLite",function(a,b,c){if(v.call(this,b,c),null==a)throw"Cannot tween an undefined reference.";this.target=a="string"!=typeof a?a:y.selector(a)||a,this._overwrite=null==this.vars.overwrite?G[y.defaultOverwrite]:"number"==typeof this.vars.overwrite?this.vars.overwrite>>0:G[this.vars.overwrite];var e,f,d=a.jquery||"function"==typeof a.each&&a[0]&&a[0].nodeType&&a[0].style;if((d||a instanceof Array)&&"number"!=typeof a[0])for(this._targets=d&&!a.slice?A(a):a.slice(0),this._propLookup=[],this._siblings=[],e=0;this._targets.length>e;e++)f=this._targets[e],f?"string"!=typeof f?"function"==typeof f.each&&f[0]&&f[0].nodeType&&f[0].style?(this._targets.splice(e--,1),this._targets=this._targets.concat(A(f))):(this._siblings[e]=J(f,this,!1),1===this._overwrite&&this._siblings[e].length>1&&K(f,this,null,1,this._siblings[e])):(f=this._targets[e--]=y.selector(f),"string"==typeof f&&this._targets.splice(e+1,1)):this._targets.splice(e--,1);else this._propLookup={},this._siblings=J(a,this,!1),1===this._overwrite&&this._siblings.length>1&&K(a,this,null,1,this._siblings);(this.vars.immediateRender||0===b&&0===this._delay&&this.vars.immediateRender!==!1)&&this.render(-this._delay,!1,!0)},!0),z=function(a){return"function"==typeof a.each&&a[0]&&a[0].nodeType&&a[0].style},A=function(a){var b=[];return a.each(function(){b.push(this)}),b},B=function(a,b){var d,c={};for(d in a)F[d]||d in b&&"x"!==d&&"y"!==d&&"width"!==d&&"height"!==d||!(!C[d]||C[d]&&C[d]._autoCSS)||(c[d]=a[d],delete a[d]);a.css=c};g=y.prototype=new v,g.constructor=y,g.kill()._gc=!1,g.ratio=0,g._firstPT=g._targets=g._overwrittenProps=null,g._notifyPluginsOfEnabled=!1,y.version="1.8.4",y.defaultEase=g._ease=new o(null,null,1,1),y.defaultOverwrite="auto",y.ticker=w,y.selector=a.$||a.jQuery||function(b){return a.$?(y.selector=a.$,a.$(b)):a.document?a.document.getElementById("#"===b.charAt(0)?b.substr(1):b):b};var C=y._plugins={},D=y._tweenLookup={},E=0,F={ease:1,delay:1,overwrite:1,onComplete:1,onCompleteParams:1,onCompleteScope:1,useFrames:1,runBackwards:1,startAt:1,onUpdate:1,onUpdateParams:1,onUpdateScope:1,onStart:1,onStartParams:1,onStartScope:1,onReverseComplete:1,onReverseCompleteParams:1,onReverseCompleteScope:1,onRepeat:1,onRepeatParams:1,onRepeatScope:1,easeParams:1,yoyo:1,orientToBezier:1,immediateRender:1,repeat:1,repeatDelay:1,data:1,paused:1,reversed:1,autoCSS:1},G={none:0,all:1,auto:2,concurrent:3,allOnStart:4,preexisting:5,"true":1,"false":0},H=v._rootFramesTimeline=new x,I=v._rootTimeline=new x;I._startTime=w.time,H._startTime=w.frame,I._active=H._active=!0,v._updateRoot=function(){if(I.render((w.time-I._startTime)*I._timeScale,!1,!1),H.render((w.frame-H._startTime)*H._timeScale,!1,!1),!(w.frame%120)){var a,b,c;for(c in D){for(b=D[c].tweens,a=b.length;--a>-1;)b[a]._gc&&b.splice(a,1);0===b.length&&delete D[c]}}},w.addEventListener("tick",v._updateRoot);var J=function(a,b,c){var e,f,d=a._gsTweenID;if(D[d||(a._gsTweenID=d="t"+E++)]||(D[d]={target:a,tweens:[]}),b&&(e=D[d].tweens,e[f=e.length]=b,c))for(;--f>-1;)e[f]===b&&e.splice(f,1);return D[d].tweens},K=function(a,b,c,d,e){var f,g,h,i;if(1===d||d>=4){for(i=e.length,f=0;i>f;f++)if((h=e[f])!==b)h._gc||h._enabled(!1,!1)&&(g=!0);else if(5===d)break;return g}var n,j=b._startTime+1e-10,k=[],l=0,m=0===b._duration;for(f=e.length;--f>-1;)(h=e[f])===b||h._gc||h._paused||(h._timeline!==b._timeline?(n=n||L(b,0,m),0===L(h,n,m)&&(k[l++]=h)):j>=h._startTime&&h._startTime+h.totalDuration()/h._timeScale+1e-10>j&&((m||!h._initted)&&2e-10>=j-h._startTime||(k[l++]=h)));for(f=l;--f>-1;)h=k[f],2===d&&h._kill(c,a)&&(g=!0),(2!==d||!h._firstPT&&h._initted)&&h._enabled(!1,!1)&&(g=!0);return g},L=function(a,b,c){for(var d=a._timeline,e=d._timeScale,f=a._startTime;d._timeline;){if(f+=d._startTime,e*=d._timeScale,d._paused)return-100;d=d._timeline}return f/=e,f>b?f-b:c&&f===b||!a._initted&&2e-10>f-b?1e-10:(f+=a.totalDuration()/a._timeScale/e)>b?0:f-b-1e-10};g._init=function(){var c,d,e,a=this.vars,b=a.ease;if(a.startAt&&(a.startAt.overwrite=0,a.startAt.immediateRender=!0,y.to(this.target,0,a.startAt)),this._ease=b?b instanceof o?a.easeParams instanceof Array?b.config.apply(b,a.easeParams):b:"function"==typeof b?new o(b,a.easeParams):p[b]||y.defaultEase:y.defaultEase,this._easeType=this._ease._type,this._easePower=this._ease._power,this._firstPT=null,this._targets)for(c=this._targets.length;--c>-1;)this._initProps(this._targets[c],this._propLookup[c]={},this._siblings[c],this._overwrittenProps?this._overwrittenProps[c]:null)&&(d=!0);else d=this._initProps(this.target,this._propLookup,this._siblings,this._overwrittenProps);if(d&&y._onPluginEvent("_onInitAllProps",this),this._overwrittenProps&&null==this._firstPT&&"function"!=typeof this.target&&this._enabled(!1,!1),a.runBackwards)for(e=this._firstPT;e;)e.s+=e.c,e.c=-e.c,e=e._next;this._onUpdate=a.onUpdate,this._initted=!0},g._initProps=function(a,b,c,d){var e,f,g,h,i,j,k;if(null==a)return!1;this.vars.css||a.style&&a.nodeType&&C.css&&this.vars.autoCSS!==!1&&B(this.vars,a);for(e in this.vars){if(F[e]){if(("onStartParams"===e||"onUpdateParams"===e||"onCompleteParams"===e||"onReverseCompleteParams"===e||"onRepeatParams"===e)&&(i=this.vars[e]))for(f=i.length;--f>-1;)"{self}"===i[f]&&(i=this.vars[e]=i.concat(),i[f]=this)}else if(C[e]&&(h=new C[e])._onInitTween(a,this.vars[e],this)){for(this._firstPT=j={_next:this._firstPT,t:h,p:"setRatio",s:0,c:1,f:!0,n:e,pg:!0,pr:h._priority},f=h._overwriteProps.length;--f>-1;)b[h._overwriteProps[f]]=this._firstPT;(h._priority||h._onInitAllProps)&&(g=!0),(h._onDisable||h._onEnable)&&(this._notifyPluginsOfEnabled=!0)}else this._firstPT=b[e]=j={_next:this._firstPT,t:a,p:e,f:"function"==typeof a[e],n:e,pg:!1,pr:0},j.s=j.f?a[e.indexOf("set")||"function"!=typeof a["get"+e.substr(3)]?e:"get"+e.substr(3)]():parseFloat(a[e]),k=this.vars[e],j.c="string"==typeof k&&"="===k.charAt(1)?parseInt(k.charAt(0)+"1",10)*Number(k.substr(2)):Number(k)-j.s||0;j&&j._next&&(j._next._prev=j)}return d&&this._kill(d,a)?this._initProps(a,b,c,d):this._overwrite>1&&this._firstPT&&c.length>1&&K(a,this,b,this._overwrite,c)?(this._kill(b,a),this._initProps(a,b,c,d)):g},g.render=function(a,b,c){var e,f,g,d=this._time;if(a>=this._duration)this._totalTime=this._time=this._duration,this.ratio=this._ease._calcEnd?this._ease.getRatio(1):1,this._reversed||(e=!0,f="onComplete"),0===this._duration&&((0===a||0>this._rawPrevTime)&&this._rawPrevTime!==a&&(c=!0),this._rawPrevTime=a);else if(0>=a)this._totalTime=this._time=0,this.ratio=this._ease._calcEnd?this._ease.getRatio(0):0,(0!==d||0===this._duration&&this._rawPrevTime>0)&&(f="onReverseComplete",e=this._reversed),0>a?(this._active=!1,0===this._duration&&(this._rawPrevTime>=0&&(c=!0),this._rawPrevTime=a)):this._initted||(c=!0);else if(this._totalTime=this._time=a,this._easeType){var h=a/this._duration,i=this._easeType,j=this._easePower;(1===i||3===i&&h>=.5)&&(h=1-h),3===i&&(h*=2),1===j?h*=h:2===j?h*=h*h:3===j?h*=h*h*h:4===j&&(h*=h*h*h*h),this.ratio=1===i?1-h:2===i?h:.5>a/this._duration?h/2:1-h/2}else this.ratio=this._ease.getRatio(a/this._duration);if(this._time!==d||c){for(this._initted||(this._init(),!e&&this._time&&(this.ratio=this._ease.getRatio(this._time/this._duration))),this._active||this._paused||(this._active=!0),0===d&&this.vars.onStart&&(0!==this._time||0===this._duration)&&(b||this.vars.onStart.apply(this.vars.onStartScope||this,this.vars.onStartParams||n)),g=this._firstPT;g;)g.f?g.t[g.p](g.c*this.ratio+g.s):g.t[g.p]=g.c*this.ratio+g.s,g=g._next;this._onUpdate&&(b||this._onUpdate.apply(this.vars.onUpdateScope||this,this.vars.onUpdateParams||n)),f&&(this._gc||(e&&(this._timeline.autoRemoveChildren&&this._enabled(!1,!1),this._active=!1),b||this.vars[f]&&this.vars[f].apply(this.vars[f+"Scope"]||this,this.vars[f+"Params"]||n)))}},g._kill=function(a,b){if("all"===a&&(a=null),null==a&&(null==b||b===this.target))return this._enabled(!1,!1);b="string"!=typeof b?b||this._targets||this.target:y.selector(b)||b;var c,d,e,f,g,h,i,j;if((b instanceof Array||z(b))&&"number"!=typeof b[0])for(c=b.length;--c>-1;)this._kill(a,b[c])&&(h=!0);else{if(this._targets){for(c=this._targets.length;--c>-1;)if(b===this._targets[c]){g=this._propLookup[c]||{},this._overwrittenProps=this._overwrittenProps||[],d=this._overwrittenProps[c]=a?this._overwrittenProps[c]||{}:"all";break}}else{if(b!==this.target)return!1;g=this._propLookup,d=this._overwrittenProps=a?this._overwrittenProps||{}:"all"}if(g){i=a||g,j=a!==d&&"all"!==d&&a!==g&&(null==a||a._tempKill!==!0);for(e in i)(f=g[e])&&(f.pg&&f.t._kill(i)&&(h=!0),f.pg&&0!==f.t._overwriteProps.length||(f._prev?f._prev._next=f._next:f===this._firstPT&&(this._firstPT=f._next),f._next&&(f._next._prev=f._prev),f._next=f._prev=null),delete g[e]),j&&(d[e]=1)}}return h},g.invalidate=function(){return this._notifyPluginsOfEnabled&&y._onPluginEvent("_onDisable",this),this._firstPT=null,this._overwrittenProps=null,this._onUpdate=null,this._initted=this._active=this._notifyPluginsOfEnabled=!1,this._propLookup=this._targets?{}:[],this},g._enabled=function(a,b){if(a&&this._gc)if(this._targets)for(var c=this._targets.length;--c>-1;)this._siblings[c]=J(this._targets[c],this,!0);else this._siblings=J(this.target,this,!0);return v.prototype._enabled.call(this,a,b),this._notifyPluginsOfEnabled&&this._firstPT?y._onPluginEvent(a?"_onEnable":"_onDisable",this):!1},y.to=function(a,b,c){return new y(a,b,c)},y.from=function(a,b,c){return c.runBackwards=!0,c.immediateRender!==!1&&(c.immediateRender=!0),new y(a,b,c)},y.fromTo=function(a,b,c,d){return d.startAt=c,c.immediateRender&&(d.immediateRender=!0),new y(a,b,d)},y.delayedCall=function(a,b,c,d,e){return new y(b,0,{delay:a,onComplete:b,onCompleteParams:c,onCompleteScope:d,onReverseComplete:b,onReverseCompleteParams:c,onReverseCompleteScope:d,immediateRender:!1,useFrames:e,overwrite:0})},y.set=function(a,b){return new y(a,0,b)},y.killTweensOf=y.killDelayedCallsTo=function(a,b){for(var c=y.getTweensOf(a),d=c.length;--d>-1;)c[d]._kill(b,a)},y.getTweensOf=function(a){if(null!=a){a="string"!=typeof a?a:y.selector(a)||a;var b,c,d,e;if((a instanceof Array||z(a))&&"number"!=typeof a[0]){for(b=a.length,c=[];--b>-1;)c=c.concat(y.getTweensOf(a[b]));for(b=c.length;--b>-1;)for(e=c[b],d=b;--d>-1;)e===c[d]&&c.splice(b,1)}else for(c=J(a).concat(),b=c.length;--b>-1;)c[b]._gc&&c.splice(b,1);return c}};var M=l("plugins.TweenPlugin",function(a,b){this._overwriteProps=(a||"").split(","),this._propName=this._overwriteProps[0],this._priority=b||0},!0);if(g=M.prototype,M.version=12,M.API=2,g._firstPT=null,g._addTween=function(a,b,c,d,e,f){var g,h;null!=d&&(g="number"==typeof d||"="!==d.charAt(1)?Number(d)-c:parseInt(d.charAt(0)+"1",10)*Number(d.substr(2)))&&(this._firstPT=h={_next:this._firstPT,t:a,p:b,s:c,c:g,f:"function"==typeof a[b],n:e||b,r:f},h._next&&(h._next._prev=h))},g.setRatio=function(a){for(var c,b=this._firstPT;b;)c=b.c*a+b.s,b.r&&(c=c+(c>0?.5:-.5)>>0),b.f?b.t[b.p](c):b.t[b.p]=c,b=b._next},g._kill=function(a){if(null!=a[this._propName])this._overwriteProps=[];else for(var b=this._overwriteProps.length;--b>-1;)null!=a[this._overwriteProps[b]]&&this._overwriteProps.splice(b,1);for(var c=this._firstPT;c;)null!=a[c.n]&&(c._next&&(c._next._prev=c._prev),c._prev?(c._prev._next=c._next,c._prev=null):this._firstPT===c&&(this._firstPT=c._next)),c=c._next;return!1},g._roundProps=function(a,b){for(var c=this._firstPT;c;)(a[this._propName]||null!=c.n&&a[c.n.split(this._propName+"_").join("")])&&(c.r=b),c=c._next},y._onPluginEvent=function(a,b){var d,c=b._firstPT;if("_onInitAllProps"===a){for(var e,f,g,h;c;){for(h=c._next,e=f;e&&e.pr>c.pr;)e=e._next;(c._prev=e?e._prev:g)?c._prev._next=c:f=c,(c._next=e)?e._prev=c:g=c,c=h}c=b._firstPT=f}for(;c;)c.pg&&"function"==typeof c.t[a]&&c.t[a]()&&(d=!0),c=c._next;return d},M.activate=function(a){for(var b=a.length;--b>-1;)a[b].API===M.API&&(y._plugins[(new a[b])._propName]=a[b]);return!0},e=a._gsQueue){for(f=0;e.length>f;f++)e[f]();for(g in i)i[g].func||a.console.log("GSAP encountered missing dependency: com.greensock."+g)}h=!1})(window);
/*CSSPlugin*/
(window._gsQueue||(window._gsQueue=[])).push(function(){"use strict";window._gsDefine("plugins.CSSPlugin",["plugins.TweenPlugin","TweenLite"],function(a){var d,e,f,g,c=function(){a.call(this,"css"),this._overwriteProps.length=0},h={},i=c.prototype=new a("css");i.constructor=c,c.version="1.8.4",c.API=2,c.defaultTransformPerspective=0,i="px",c.suffixMap={top:i,right:i,bottom:i,left:i,width:i,height:i,fontSize:i,padding:i,margin:i,perspective:i};var G,H,I,J,K,L,j=/(?:\d|\-\d|\.\d|\-\.\d)+/g,k=/(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,l=/(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,m=/[^\d\-\.]/g,n=/(?:\d|\-|\+|=|#|\.)*/g,o=/opacity *= *([^)]*)/,p=/opacity:([^;]*)/,q=/alpha\(opacity *=.+?\)/i,r=/([A-Z])/g,s=/-([a-z])/gi,t=/(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,u=function(a,b){return b.toUpperCase()},v=/(?:Left|Right|Width)/i,w=/(M11|M12|M21|M22)=[\d\-\.e]+/gi,x=/progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,y=Math.PI/180,z=180/Math.PI,A={},B=document,C=B.createElement("div"),D=B.createElement("img"),E=c._internals={_specialProps:h},F=navigator.userAgent,M=function(){var c,a=F.indexOf("Android"),b=B.createElement("div");return I=-1!==F.indexOf("Safari")&&-1===F.indexOf("Chrome")&&(-1===a||Number(F.substr(a+8,1))>3),K=I&&6>Number(F.substr(F.indexOf("Version/")+8,1)),J=-1!==F.indexOf("Firefox"),/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(F),L=parseFloat(RegExp.$1),b.innerHTML="<a style='top:1px;opacity:.55;'>a</a>",c=b.getElementsByTagName("a")[0],c?/^0.55/.test(c.style.opacity):!1}(),N=function(a){return o.test("string"==typeof a?a:(a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100:1},O=function(a){window.console&&console.log(a)},P="",Q="",R=function(a,b){b=b||C;var d,e,c=b.style;if(void 0!==c[a])return a;for(a=a.charAt(0).toUpperCase()+a.substr(1),d=["O","Moz","ms","Ms","Webkit"],e=5;--e>-1&&void 0===c[d[e]+a];);return e>=0?(Q=3===e?"ms":d[e],P="-"+Q.toLowerCase()+"-",Q+a):null},S=B.defaultView?B.defaultView.getComputedStyle:function(){},T=c.getStyle=function(a,b,c,d,e){var f;return M||"opacity"!==b?(!d&&a.style[b]?f=a.style[b]:(c=c||S(a,null))?(a=c.getPropertyValue(b.replace(r,"-$1").toLowerCase()),f=a||c.length?a:c[b]):a.currentStyle&&(c=a.currentStyle,f=c[b]),null==e||f&&"none"!==f&&"auto"!==f&&"auto auto"!==f?f:e):N(a)},U=function(a,b,c){var f,g,d={},e=a._gsOverwrittenClassNamePT;if(e&&!c){for(;e;)e.setRatio(0),e=e._next;a._gsOverwrittenClassNamePT=null}if(b=b||S(a,null))if(f=b.length)for(;--f>-1;)d[b[f].replace(s,u)]=b.getPropertyValue(b[f]);else for(f in b)d[f]=b[f];else if(b=a.currentStyle||a.style)for(f in b)d[f.replace(s,u)]=b[f];return M||(d.opacity=N(a)),g=wb(a,b,!1),d.rotation=g.rotation*z,d.skewX=g.skewX*z,d.scaleX=g.scaleX,d.scaleY=g.scaleY,d.x=g.x,d.y=g.y,vb&&(d.z=g.z,d.rotationX=g.rotationX*z,d.rotationY=g.rotationY*z,d.scaleZ=g.scaleZ),d.filters&&delete d.filters,d},V=function(a,b,c,d){var g,h,i,e={},f=a.style;for(h in c)"cssText"!==h&&"length"!==h&&isNaN(h)&&b[h]!==(g=c[h])&&-1===h.indexOf("Origin")&&("number"==typeof g||"string"==typeof g)&&(e[h]=""!==g&&"auto"!==g&&"none"!==g||"string"!=typeof b[h]||""===b[h].replace(m,"")?g:0,void 0!==f[h]&&(i=new jb(f,h,f[h],i)));if(d)for(h in d)"className"!==h&&(e[h]=d[h]);return{difs:e,firstMPT:i}},W={width:["Left","Right"],height:["Top","Bottom"]},X=["marginLeft","marginRight","marginTop","marginBottom"],Y=function(a,b,c){var d=parseFloat("width"===b?a.offsetWidth:a.offsetHeight),e=W[b],f=e.length;for(c=c||S(a,null);--f>-1;)d-=parseFloat(T(a,"padding"+e[f],c,!0))||0,d-=parseFloat(T(a,"border"+e[f]+"Width",c,!0))||0;return d},Z=function(a,b,c,d,e){if("px"===d||!d)return c;if("auto"===d||!c)return 0;var j,f=v.test(b),g=a,h=C.style,i=0>c;return i&&(c=-c),"%"===d&&-1!==b.indexOf("border")?j=c/100*(f?a.clientWidth:a.clientHeight):(h.cssText="border-style:solid; border-width:0; position:absolute; line-height:0;","%"!==d&&"em"!==d&&g.appendChild?h[f?"borderLeftWidth":"borderTopWidth"]=c+d:(g=a.parentNode||B.body,h[f?"width":"height"]=c+d),g.appendChild(C),j=parseFloat(C[f?"offsetWidth":"offsetHeight"]),g.removeChild(C),0!==j||e||(j=Z(a,b,c,d,!0))),i?-j:j},$=function(a,b){(null==a||""===a||"auto"===a||"auto auto"===a)&&(a="0 0");var c=a.split(" "),d=-1!==a.indexOf("left")?"0%":-1!==a.indexOf("right")?"100%":c[0],e=-1!==a.indexOf("top")?"0%":-1!==a.indexOf("bottom")?"100%":c[1];return null==e?e="0":"center"===e&&(e="50%"),("center"===d||isNaN(parseFloat(d)))&&(d="50%"),b&&(b.oxp=-1!==d.indexOf("%"),b.oyp=-1!==e.indexOf("%"),b.oxr="="===d.charAt(1),b.oyr="="===e.charAt(1),b.ox=parseFloat(d.replace(m,"")),b.oy=parseFloat(e.replace(m,""))),d+" "+e+(c.length>2?" "+c[2]:"")},_=function(a,b){return"string"==typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1",10)*parseFloat(a.substr(2)):parseFloat(a)-parseFloat(b)},ab=function(a,b){return null==a?b:"string"==typeof a&&"="===a.charAt(1)?parseInt(a.charAt(0)+"1",10)*Number(a.substr(2))+b:parseFloat(a)},bb=function(a,b){if(null==a)return b;var c=-1===a.indexOf("rad")?y:1,d="="===a.charAt(1);return a=Number(a.replace(m,""))*c,d?a+b:a},cb=function(a,b){var c="number"==typeof a?a*y:bb(a,b),d=(c-b)%(2*Math.PI);return d!==d%Math.PI&&(d+=Math.PI*(0>d?2:-2)),b+d},db={aqua:[0,255,255],lime:[0,255,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,255],navy:[0,0,128],white:[255,255,255],fuchsia:[255,0,255],olive:[128,128,0],yellow:[255,255,0],orange:[255,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[255,0,0],pink:[255,192,203],cyan:[0,255,255],transparent:[255,255,255,0]},eb=function(a){if(!a||""===a)return db.black;if(db[a])return db[a];if("number"==typeof a)return[a>>16,255&a>>8,255&a];if("#"===a.charAt(0)){if(4===a.length){var b=a.charAt(1),c=a.charAt(2),d=a.charAt(3);a="#"+b+b+c+c+d+d}return a=parseInt(a.substr(1),16),[a>>16,255&a>>8,255&a]}return a=a.match(j)||db.transparent,a[0]=Number(a[0]),a[1]=Number(a[1]),a[2]=Number(a[2]),a.length>3&&(a[3]=Number(a[3])),a},fb="(?:\\b(?:(?:rgb|rgba)\\(.+?\\))|\\B#.+?\\b";for(i in db)fb+="|"+i+"\\b";fb=RegExp(fb+")","gi");var gb=function(a,b,c){if(null==a)return function(a){return a};var d=b?(a.match(fb)||[""])[0]:"",e=a.split(d).join("").match(l)||[],f=a.substr(0,a.indexOf(e[0])),g=")"===a.charAt(a.length-1)?")":"",h=-1!==a.indexOf(" ")?" ":",",i=e.length,k=i>0?e[0].replace(j,""):"";return b?function(a){"number"==typeof a&&(a+=k);var b=(a.match(fb)||[d])[0],j=a.split(b).join("").match(l)||[],m=j.length;if(i>m--)for(;i>++m;)j[m]=c?j[(m-1)/2>>0]:e[m];return f+j.join(h)+h+b+g}:function(a){"number"==typeof a&&(a+=k);var b=a.match(l)||[],d=b.length;if(i>d--)for(;i>++d;)b[d]=c?b[(d-1)/2>>0]:e[d];return f+b.join(h)+g}},hb=function(a){return a=a.split(","),function(b,c,d,e,f,g,h){var j,i=(c+"").split(" ");for(h={},j=0;4>j;j++)h[a[j]]=i[j]=i[j]||i[(j-1)/2>>0];return e.parse(b,h,f,g)}},jb=(E._setPluginRatio=function(a){this.plugin.setRatio(a);for(var f,g,h,i,b=this.data,c=b.proxy,d=b.firstMPT,e=1e-6;d;)f=c[d.v],d.r?f=f>0?f+.5>>0:f-.5>>0:e>f&&f>-e&&(f=0),d.t[d.p]=f,d=d._next;if(b.autoRotate&&(b.autoRotate.rotation=c.rotation),1===a)for(d=b.firstMPT;d;){if(g=d.t,g.type){if(1===g.type){for(i=g.xs0+g.s+g.xs1,h=1;g.l>h;h++)i+=g["xn"+h]+g["xs"+(h+1)];g.e=i}}else g.e=g.s+g.xs0;d=d._next}},function(a,b,c,d,e){this.t=a,this.p=b,this.v=c,this.r=e,d&&(d._prev=this,this._next=d)}),lb=(E._parseToProxy=function(a,b,c,d,e,f){var l,m,n,o,p,g=d,h={},i={},j=c._transform,k=A;for(c._transform=null,A=b,d=p=c.parse(a,b,d,e),A=k,f&&(c._transform=j,g&&(g._prev=null,g._prev&&(g._prev._next=null)));d&&d!==g;){if(1>=d.type&&(m=d.p,i[m]=d.s+d.c,h[m]=d.s,f||(o=new jb(d,"s",m,o,d.r),d.c=0),1===d.type))for(l=d.l;--l>0;)n="xn"+l,m=d.p+"_"+n,i[m]=d.data[n],h[m]=d[n],f||(o=new jb(d,n,m,o,d.rxp[n]));d=d._next}return{proxy:h,end:i,firstMPT:o,pt:p}},E.CSSPropTween=function(a,b,c,e,f,h,i,j,k,l,m){this.t=a,this.p=b,this.s=c,this.c=e,this.n=i||"css_"+b,a instanceof lb||g.push(this.n),this.r=j,this.type=h||0,k&&(this.pr=k,d=!0),this.b=void 0===l?c:l,this.e=void 0===m?c+e:m,f&&(this._next=f,f._prev=this)}),mb=c.parseComplex=function(a,b,c,d,e,f,g,h,i,l){g=new lb(a,b,0,0,g,l?2:1,null,!1,h,c,d);var q,r,s,t,u,v,w,x,y,z,A,B,m=c.split(", ").join(",").split(" "),n=(d+"").split(", ").join(",").split(" "),o=m.length,p=G!==!1;for(o!==n.length&&(m=(f||"").split(" "),o=m.length),g.plugin=i,g.setRatio=l,q=0;o>q;q++)if(t=m[q],u=n[q],x=parseFloat(t),x||0===x)g.appendXtra("",x,_(u,x),u.replace(k,""),p&&-1!==u.indexOf("px"),!0);else if(e&&("#"===t.charAt(0)||0===t.indexOf("rgb")||db[t]))t=eb(t),u=eb(u),y=t.length+u.length>6,y&&!M&&0===u[3]?(g["xs"+g.l]+=g.l?" transparent":"transparent",g.e=g.e.split(n[q]).join("transparent")):(M||(y=!1),g.appendXtra(y?"rgba(":"rgb(",t[0],u[0]-t[0],",",!0,!0).appendXtra("",t[1],u[1]-t[1],",",!0).appendXtra("",t[2],u[2]-t[2],y?",":")",!0),y&&(t=4>t.length?1:t[3],g.appendXtra("",t,(4>u.length?1:u[3])-t,")",!1)));else if(v=t.match(j)){if(w=u.match(k),!w||w.length!==v.length)return g;for(s=0,r=0;v.length>r;r++)A=v[r],z=t.indexOf(A,s),g.appendXtra(t.substr(s,z-s),Number(A),_(w[r],A),"",p&&"px"===t.substr(z+A.length,2),0===r),s=z+A.length;g["xs"+g.l]+=t.substr(s)}else g["xs"+g.l]+=g.l?" "+t:t;if(-1!==d.indexOf("=")&&g.data){for(B=g.xs0+g.data.s,q=1;g.l>q;q++)B+=g["xs"+q]+g.data["xn"+q];g.e=B+g["xs"+q]}return g.l||(g.type=-1,g.xs0=g.e),g.xfirst||g},nb=9;for(i=lb.prototype,i.l=i.pr=0;--nb>0;)i["xn"+nb]=0,i["xs"+nb]="";i.xs0="",i._next=i._prev=i.xfirst=i.data=i.plugin=i.setRatio=i.rxp=null,i.appendXtra=function(a,b,c,d,e,f){var g=this,h=g.l;return g["xs"+h]+=f&&h?" "+a:a||"",c||0===h||g.plugin?(g.l++,g.type=g.setRatio?2:1,g["xs"+g.l]=d||"",h>0?(g.data["xn"+h]=b+c,g.rxp["xn"+h]=e,g["xn"+h]=b,g.plugin||(g.xfirst=new lb(g,"xn"+h,b,c,g.xfirst||g,0,g.n,e,g.pr),g.xfirst.xs0=0),g):(g.data={s:b+c},g.rxp={},g.s=b,g.c=c,g.r=e,g)):(g["xs"+h]+=b+(d||""),g)};var ob=function(a,b,c,d,e,f,g){this.p=d?R(a)||a:a,h[a]=h[this.p]=this,this.format=f||gb(b,e),c&&(this.parse=c),this.clrs=e,this.dflt=b,this.pr=g||0},pb=E._registerComplexSpecialProp=function(a,b,c,d,e,f,g){for(var k,h=a.split(","),i=b instanceof Array?b:[b],j=h.length;--j>-1;)k=new ob(h[j],i[j],c,d&&0===j,e,f,g)},qb=function(a){if(!h[a]){var b=a.charAt(0).toUpperCase()+a.substr(1)+"Plugin";pb(a,null,function(a,c,d,e,f,g,i){var j=(window.GreenSockGlobals||window).com.greensock.plugins[b];return j?(j._cssRegister(),h[d].parse(a,c,d,e,f,g,i)):(O("Error: "+b+" js file not loaded."),f)})}};i=ob.prototype,i.parseComplex=function(a,b,c,d,e,f){return mb(a,this.p,b,c,this.clrs,this.dflt,d,this.pr,e,f)},i.parse=function(a,b,c,d,e,g){return this.parseComplex(a.style,this.format(T(a,c,f,!1,this.dflt)),this.format(b),e,g)},c.registerSpecialProp=function(a,b,c){pb(a,null,function(a,d,e,f,g,h){var j=new lb(a,e,0,0,g,2,e,!1,c);return j.plugin=h,j.setRatio=b(a,d,f._tween,e),j},!1,!1,null,c)};var rb=["scaleX","scaleY","scaleZ","x","y","z","skewX","rotation","rotationX","rotationY","perspective"],sb=R("transform"),tb=P+"transform",ub=R("transformOrigin"),vb=null!==R("perspective"),wb=function(a,b,d){var l,m,n,o,p,q,r,s,t,u,v,x,e=d?a._gsTransform||{skewY:0}:{skewY:0},f=0>e.scaleX,g=2e-5,h=1e5,i=-Math.PI+1e-4,j=Math.PI-1e-4,k=vb?parseFloat(T(a,ub,b,!1,"0 0 0").split(" ")[2])||e.zOrigin||0:0;for(sb?l=T(a,tb,b,!0):a.currentStyle&&(l=a.currentStyle.filter.match(w),l=l&&4===l.length?l[0].substr(4)+","+Number(l[2].substr(4))+","+Number(l[1].substr(4))+","+l[3].substr(4)+","+(e?e.x:0)+","+(e?e.y:0):null),m=(l||"").match(/(?:\-|\b)[\d\-\.e]+\b/gi)||[],n=m.length;--n>-1;)o=Number(m[n]),m[n]=(o*h+(0>o?-.5:.5)>>0)/h;if(16===m.length){var y=m[8],z=m[9],A=m[10],B=m[12],C=m[13],D=m[14];if(e.zOrigin&&(D=-e.zOrigin,B=y*D-m[12],C=z*D-m[13],D=A*D+e.zOrigin-m[14]),!d||B!==e.x||C!==e.y||D!==e.z){var P,Q,R,S,U,V,W,X,E=m[0],F=m[1],G=m[2],H=m[3],I=m[4],J=m[5],K=m[6],L=m[7],M=m[11],N=e.rotationX=Math.atan2(K,A),O=i>N||N>j;N&&(U=Math.cos(-N),V=Math.sin(-N),P=I*U+y*V,Q=J*U+z*V,R=K*U+A*V,S=L*U+M*V,y=I*-V+y*U,z=J*-V+z*U,A=K*-V+A*U,M=L*-V+M*U,I=P,J=Q,K=R),N=e.rotationY=Math.atan2(y,E),N&&(W=i>N||N>j,U=Math.cos(-N),V=Math.sin(-N),P=E*U-y*V,Q=F*U-z*V,R=G*U-A*V,S=H*U-M*V,z=F*V+z*U,A=G*V+A*U,M=H*V+M*U,E=P,F=Q,G=R),N=e.rotation=Math.atan2(F,J),N&&(X=i>N||N>j,U=Math.cos(-N),V=Math.sin(-N),E=E*U+I*V,Q=F*U+J*V,J=F*-V+J*U,K=G*-V+K*U,F=Q),X&&O?e.rotation=e.rotationX=0:X&&W?e.rotation=e.rotationY=0:W&&O&&(e.rotationY=e.rotationX=0),e.scaleX=(Math.sqrt(E*E+F*F)*h+.5>>0)/h,e.scaleY=(Math.sqrt(J*J+z*z)*h+.5>>0)/h,e.scaleZ=(Math.sqrt(K*K+A*A)*h+.5>>0)/h,e.skewX=0,e.perspective=M?1/(0>M?-M:M):0,e.x=B,e.y=C,e.z=D}}else if(!vb||0===m.length||e.x!==m[4]||e.y!==m[5]||!e.rotationX&&!e.rotationY){var Y=m.length>=6,Z=Y?m[0]:1,$=m[1]||0,_=m[2]||0,ab=Y?m[3]:1;e.x=m[4]||0,e.y=m[5]||0,p=Math.sqrt(Z*Z+$*$),q=Math.sqrt(ab*ab+_*_),r=Z||$?Math.atan2($,Z):e.rotation||0,s=_||ab?Math.atan2(_,ab)+r:e.skewX||0,t=p-Math.abs(e.scaleX||0),u=q-Math.abs(e.scaleY||0),Math.abs(s)>Math.PI/2&&Math.abs(s)<1.5*Math.PI&&(f?(p*=-1,s+=0>=r?Math.PI:-Math.PI,r+=0>=r?Math.PI:-Math.PI):(q*=-1,s+=0>=s?Math.PI:-Math.PI)),v=(r-e.rotation)%Math.PI,x=(s-e.skewX)%Math.PI,(void 0===e.skewX||t>g||-g>t||u>g||-g>u||v>i&&j>v&&0!==v*h>>0||x>i&&j>x&&0!==x*h>>0)&&(e.scaleX=p,e.scaleY=q,e.rotation=r,e.skewX=s),vb&&(e.rotationX=e.rotationY=e.z=0,e.perspective=parseFloat(c.defaultTransformPerspective)||0,e.scaleZ=1)}e.zOrigin=k;for(n in e)g>e[n]&&e[n]>-g&&(e[n]=0);return d&&(a._gsTransform=e),e},xb=function(a){var l,m,b=this.data,c=-b.rotation,d=c+b.skewX,e=1e5,f=(Math.cos(c)*b.scaleX*e>>0)/e,g=(Math.sin(c)*b.scaleX*e>>0)/e,h=(Math.sin(d)*-b.scaleY*e>>0)/e,i=(Math.cos(d)*b.scaleY*e>>0)/e,j=this.t.style,k=this.t.currentStyle;if(k){m=g,g=-h,h=-m,l=k.filter,j.filter="";var v,w,p=this.t.offsetWidth,q=this.t.offsetHeight,r="absolute"!==k.position,s="progid:DXImageTransform.Microsoft.Matrix(M11="+f+", M12="+g+", M21="+h+", M22="+i,t=b.x,u=b.y;if(null!=b.ox&&(v=(b.oxp?.01*p*b.ox:b.ox)-p/2,w=(b.oyp?.01*q*b.oy:b.oy)-q/2,t+=v-(v*f+w*g),u+=w-(v*h+w*i)),r)v=p/2,w=q/2,s+=", Dx="+(v-(v*f+w*g)+t)+", Dy="+(w-(v*h+w*i)+u)+")";else{var z,A,B,y=8>L?1:-1;for(v=b.ieOffsetX||0,w=b.ieOffsetY||0,b.ieOffsetX=Math.round((p-((0>f?-f:f)*p+(0>g?-g:g)*q))/2+t),b.ieOffsetY=Math.round((q-((0>i?-i:i)*q+(0>h?-h:h)*p))/2+u),nb=0;4>nb;nb++)A=X[nb],z=k[A],m=-1!==z.indexOf("px")?parseFloat(z):Z(this.t,A,parseFloat(z),z.replace(n,""))||0,B=m!==b[A]?2>nb?-b.ieOffsetX:-b.ieOffsetY:2>nb?v-b.ieOffsetX:w-b.ieOffsetY,j[A]=(b[A]=Math.round(m-B*(0===nb||2===nb?1:y)))+"px";s+=", sizingMethod='auto expand')"}j.filter=-1!==l.indexOf("DXImageTransform.Microsoft.Matrix(")?l.replace(x,s):s+" "+l,(0===a||1===a)&&1===f&&0===g&&0===h&&1===i&&(r&&-1===s.indexOf("Dx=0, Dy=0")||o.test(l)&&100!==parseFloat(RegExp.$1)||-1===l.indexOf("gradient(")&&j.removeAttribute("filter"))}},yb=function(){var x,y,z,A,B,C,D,E,F,b=this.data,c=this.t.style,d=b.perspective,e=b.scaleX,f=0,g=0,h=0,i=0,j=b.scaleY,k=0,l=0,m=0,n=0,o=b.scaleZ,p=0,q=0,r=0,s=d?-1/d:0,t=b.rotation,u=b.zOrigin,v=",",w=1e5;J&&(D=T(this.t,"top",null,!1,"0"),E=parseFloat(D)||0,F=D.substr((E+"").length),b._ffFix=!b._ffFix,c.top=(b._ffFix?E+.05:E-.05)+(""===F?"px":F)),(t||b.skewX)&&(z=e*Math.cos(t),A=j*Math.sin(t),t-=b.skewX,f=e*-Math.sin(t),j*=Math.cos(t),e=z,i=A),t=b.rotationY,t&&(x=Math.cos(t),y=Math.sin(t),z=e*x,A=i*x,B=o*-y,C=s*-y,g=e*y,k=i*y,o*=x,s*=x,e=z,i=A,m=B,q=C),t=b.rotationX,t&&(x=Math.cos(t),y=Math.sin(t),z=f*x+g*y,A=j*x+k*y,B=n*x+o*y,C=r*x+s*y,g=f*-y+g*x,k=j*-y+k*x,o=n*-y+o*x,s=r*-y+s*x,f=z,j=A,n=B,r=C),u&&(p-=u,h=g*p,l=k*p,p=o*p+u),h+=b.x,l+=b.y,p=((p+b.z)*w>>0)/w,c[sb]="matrix3d("+(e*w>>0)/w+v+(i*w>>0)/w+v+(m*w>>0)/w+v+(q*w>>0)/w+v+(f*w>>0)/w+v+(j*w>>0)/w+v+(n*w>>0)/w+v+(r*w>>0)/w+v+(g*w>>0)/w+v+(k*w>>0)/w+v+(o*w>>0)/w+v+(s*w>>0)/w+v+(h*w>>0)/w+v+(l*w>>0)/w+v+p+v+(d?1+-p/d:1)+")"},zb=function(){var d,e,f,g,h,i,j,k,b=this.data,c=this.t;J&&(d=T(c,"top",null,!1,"0"),e=parseFloat(d)||0,f=d.substr((e+"").length),b._ffFix=!b._ffFix,c.style.top=(b._ffFix?e+.05:e-.05)+(""===f?"px":f)),b.rotation||b.skewX?(g=b.rotation,h=g-b.skewX,i=1e5,j=b.scaleX*i,k=b.scaleY*i,c.style[sb]="matrix("+(Math.cos(g)*j>>0)/i+","+(Math.sin(g)*j>>0)/i+","+(Math.sin(h)*-k>>0)/i+","+(Math.cos(h)*k>>0)/i+","+b.x+","+b.y+")"):c.style[sb]="matrix("+b.scaleX+",0,0,"+b.scaleY+","+b.x+","+b.y+")"};pb("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective",null,function(a,b,c,d,e,g,h){if(d._transform)return e;var n,o,p,q,r,s,t,i=d._transform=wb(a,f,!0),j=a.style,k=1e-6,l=rb.length,m=h;for("string"==typeof m.transform&&sb?(q=j.cssText,j[sb]=m.transform,j.display="block",n=wb(a,null,!1),j.cssText=q):"object"==typeof m&&(o=null!=m.rotation?m.rotation:null!=m.rotationZ?m.rotationZ:i.rotation*z,n={scaleX:ab(null!=m.scaleX?m.scaleX:m.scale,i.scaleX),scaleY:ab(null!=m.scaleY?m.scaleY:m.scale,i.scaleY),scaleZ:ab(null!=m.scaleZ?m.scaleZ:m.scale,i.scaleZ),x:ab(m.x,i.x),y:ab(m.y,i.y),z:ab(m.z,i.z),perspective:ab(m.transformPerspective,i.perspective)},n.rotation=null!=m.shortRotation||null!=m.shortRotationZ?cb(m.shortRotation||m.shortRotationZ||0,i.rotation):"number"==typeof o?o*y:bb(o,i.rotation),vb&&(n.rotationX=null!=m.shortRotationX?cb(m.shortRotationX,i.rotationX):"number"==typeof m.rotationX?m.rotationX*y:bb(m.rotationX,i.rotationX),n.rotationY=null!=m.shortRotationY?cb(m.shortRotationY,i.rotationY):"number"==typeof m.rotationY?m.rotationY*y:bb(m.rotationY,i.rotationY),k>n.rotationX&&n.rotationX>-k&&(n.rotationX=0),k>n.rotationY&&n.rotationY>-k&&(n.rotationY=0)),n.skewX=null==m.skewX?i.skewX:"number"==typeof m.skewX?m.skewX*y:bb(m.skewX,i.skewX),n.skewY=null==m.skewY?i.skewY:"number"==typeof m.skewY?m.skewY*y:bb(m.skewY,i.skewY),(p=n.skewY-i.skewY)&&(n.skewX+=p,n.rotation+=p),k>n.skewY&&n.skewY>-k&&(n.skewY=0),k>n.skewX&&n.skewX>-k&&(n.skewX=0),k>n.rotation&&n.rotation>-k&&(n.rotation=0)),s=i.z||i.rotationX||i.rotationY||n.z||n.rotationX||n.rotationY||n.perspective,s||null==m.scale||(n.scaleZ=1);--l>-1;)c=rb[l],r=n[c]-i[c],(r>k||-k>r||null!=A[c])&&(t=!0,e=new lb(i,c,i[c],r,e),e.xs0=0,e.plugin=g,d._overwriteProps.push(e.n));return r=m.transformOrigin,(r||vb&&s&&i.zOrigin)&&(sb?(t=!0,r=(r||T(a,c,f,!1,"50% 50%"))+"",c=ub,e=new lb(j,c,0,0,e,-1,"css_transformOrigin"),e.b=j[c],e.plugin=g,vb?(q=i.zOrigin,r=r.split(" "),i.zOrigin=(r.length>2?parseFloat(r[2]):q)||0,e.xs0=e.e=j[c]=r[0]+" "+(r[1]||"50%")+" 0px",e=new lb(i,"zOrigin",0,0,e,-1,e.n),e.b=q,e.xs0=e.e=i.zOrigin):e.xs0=e.e=j[c]=r):$(r+"",i)),t&&(d._transformType=s||3===this._transformType?3:2),e},!0),pb("boxShadow","0px 0px 0px 0px #999",function(a,b,c,d,e,g){var h=-1!==(b+"").indexOf("inset")?" inset":"";return this.parseComplex(a.style,this.format(T(a,this.p,f,!1,this.dflt))+h,this.format(b)+h,e,g)},!0,!0),pb("borderRadius","0px",function(a,b,c,d,g){b=this.format(b);var k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,i=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],j=a.style;for(s=parseFloat(a.offsetWidth),t=parseFloat(a.offsetHeight),k=b.split(" "),l=0;i.length>l;l++)this.p.indexOf("border")&&(i[l]=R(i[l])),o=n=T(a,i[l],f,!1,"0px"),-1!==o.indexOf(" ")&&(n=o.split(" "),o=n[0],n=n[1]),p=m=k[l],q=parseFloat(o),v=o.substr((q+"").length),w="="===p.charAt(1),w?(r=parseInt(p.charAt(0)+"1",10),p=p.substr(2),r*=parseFloat(p),u=p.substr((r+"").length-(0>r?1:0))||""):(r=parseFloat(p),u=p.substr((r+"").length)),""===u&&(u=e[c]||v),u!==v&&(x=Z(a,"borderLeft",q,v),y=Z(a,"borderTop",q,v),"%"===u?(o=100*(x/s)+"%",n=100*(y/t)+"%"):"em"===u?(z=Z(a,"borderLeft",1,"em"),o=x/z+"em",n=y/z+"em"):(o=x+"px",n=y+"px"),w&&(p=parseFloat(o)+r+u,m=parseFloat(n)+r+u)),g=mb(j,i[l],o+" "+n,p+" "+m,!1,"0px",g);return g},!0,!1,gb("0px 0px 0px 0px",!1,!0)),pb("backgroundPosition","0 0",function(a,b,c,d,e,g){var l,m,n,o,p,q,h="background-position",i=f||S(a,null),j=this.format((i?L?i.getPropertyValue(h+"-x")+" "+i.getPropertyValue(h+"-y"):i.getPropertyValue(h):a.currentStyle.backgroundPositionX+" "+a.currentStyle.backgroundPositionY)||"0 0"),k=this.format(b);if(-1!==j.indexOf("%")!=(-1!==k.indexOf("%"))&&(q=T(a,"backgroundImage").replace(t,""),q&&"none"!==q)){for(l=j.split(" "),m=k.split(" "),D.setAttribute("src",q),n=2;--n>-1;)j=l[n],o=-1!==j.indexOf("%"),o!==(-1!==m[n].indexOf("%"))&&(p=0===n?a.offsetWidth-D.width:a.offsetHeight-D.height,l[n]=o?parseFloat(j)/100*p+"px":100*(parseFloat(j)/p)+"%");j=l.join(" ")}return this.parseComplex(a.style,j,k,e,g)},!1,!1,$),pb("backgroundSize","0 0",null,!1,!1,$),pb("perspective","0px",null,!0),pb("perspectiveOrigin","50% 50%",null,!0),pb("transformStyle","preserve-3d",null,!0),pb("backfaceVisibility","visible",null,!0),pb("margin",null,hb("marginTop,marginRight,marginBottom,marginLeft")),pb("padding",null,hb("paddingTop,paddingRight,paddingBottom,paddingLeft")),pb("clip","rect(0px,0px,0px,0px)"),pb("textShadow","0px 0px 0px #999",null,!1,!0),pb("autoRound,strictUnits",null,function(a,b,c,d,e){return e}),pb("border","0px solid #000",function(a,b,c,d,e,g){return this.parseComplex(a.style,this.format(T(a,"borderTopWidth",f,!1,"0px")+" "+T(a,"borderTopStyle",f,!1,"solid")+" "+T(a,"borderTopColor",f,!1,"#000")),this.format(b),e,g)},!1,!0,function(a){var b=a.split(" ");return b[0]+" "+(b[1]||"solid")+" "+(a.match(fb)||["#000"])[0]});var Ab=function(a){var e,b=this.t,c=b.filter,d=this.s+this.c*a>>0;100===d&&(-1===c.indexOf("atrix(")&&-1===c.indexOf("radient(")?(b.removeAttribute("filter"),e=!T(this.data,"filter")):(b.filter=c.replace(q,""),e=!0)),e||(this.xn1&&(b.filter=c=c||"alpha(opacity=100)"),-1===c.indexOf("opacity")?b.filter+=" alpha(opacity="+d+")":b.filter=c.replace(o,"opacity="+d))};pb("opacity,alpha,autoAlpha","1",function(a,b,c,d,e,g){var j,h=parseFloat(T(a,"opacity",f,!1,"1")),i=a.style;return b=parseFloat(b),"autoAlpha"===c&&(j=T(a,"visibility",f),1===h&&"hidden"===j&&0!==b&&(h=0),e=new lb(i,"visibility",0,0,e,-1,null,!1,0,0!==h?"visible":"hidden",0===b?"hidden":"visible"),e.xs0="visible",d._overwriteProps.push(e.n)),M?e=new lb(i,"opacity",h,b-h,e):(e=new lb(i,"opacity",100*h,100*(b-h),e),e.xn1="autoAlpha"===c?1:0,i.zoom=1,e.type=2,e.b="alpha(opacity="+e.s+")",e.e="alpha(opacity="+(e.s+e.c)+")",e.data=a,e.plugin=g,e.setRatio=Ab),e});var Bb=function(a){if(1===a||0===a){this.t.className=1===a?this.e:this.b;for(var b=this.data,c=this.t.style,d=c.removeProperty?"removeProperty":"removeAttribute";b;)b.v?c[b.p]=b.v:c[d](b.p.replace(r,"-$1").toLowerCase()),b=b._next}else this.t.className!==this.b&&(this.t.className=this.b)};pb("className",null,function(a,b,c,e,g,h,i){var l,m,j=a.className,k=a.style.cssText;return g=e._classNamePT=new lb(a,c,0,0,g,2),g.setRatio=Bb,g.pr=-11,d=!0,g.b=j,g.e="="!==b.charAt(1)?b:"+"===b.charAt(0)?j+" "+b.substr(2):j.split(b.substr(2)).join(""),e._tween._duration&&(m=U(a,f,!0),a.className=g.e,l=V(a,m,U(a),i),a.className=j,g.data=l.firstMPT,a.style.cssText=k,g=g.xfirst=e.parse(a,l.difs,g,h)),g});var Cb=function(a){if((1===a||0===a)&&this.data._totalTime===this.data._totalDuration)for(var i,b="all"===this.e,c=this.t.style,d=b?c.cssText.split(";"):this.e.split(","),e=c.removeProperty?"removeProperty":"removeAttribute",f=d.length,g=h.transform.parse;--f>-1;)i=d[f],b&&(i=i.substr(0,i.indexOf(":")).split(" ").join("")),h[i]&&(i=h[i].parse===g?sb:h[i].p),i&&c[e](i.replace(r,"-$1").toLowerCase())};for(pb("clearProps",null,function(a,b,c,e,f){return f=new lb(a,c,0,0,f,2),f.setRatio=Cb,f.e=b,f.pr=-10,f.data=e._tween,d=!0,f}),i="bezier,throwProps,physicsProps,physics2D".split(","),nb=i.length;nb--;)qb(i[nb]);return i=c.prototype,i._firstPT=null,i._onInitTween=function(a,b,h){if(!a.nodeType)return!1;this._target=a,this._tween=h,this._vars=b,G=b.autoRound,d=!1,e=b.suffixMap||c.suffixMap,f=S(a,""),g=this._overwriteProps;var j,k,l,m,n,o,q,r,s,i=a.style;if(H&&""===i.zIndex&&(j=T(a,"zIndex",f),("auto"===j||""===j)&&(i.zIndex=0)),"string"==typeof b&&(m=i.cssText,j=U(a,f),i.cssText=m+";"+b,j=V(a,j,U(a)).difs,!M&&p.test(b)&&(j.opacity=parseFloat(RegExp.$1)),b=j,i.cssText=m),this._firstPT=k=this.parse(a,b,null),this._transformType){for(s=3===this._transformType,sb?I&&(H=!0,""===i.zIndex&&(q=T(a,"zIndex",f),("auto"===q||""===q)&&(i.zIndex=0)),K&&(i.WebkitBackfaceVisibility=this._vars.WebkitBackfaceVisibility||(s?"visible":"hidden"))):i.zoom=1,l=k;l&&l._next;)l=l._next;r=new lb(a,"transform",0,0,null,2),this._linkCSSP(r,null,l),r.setRatio=s&&vb?yb:sb?zb:xb,r.data=this._transform||wb(a,f,!0),g.pop()}if(d){for(;k;){for(o=k._next,l=m;l&&l.pr>k.pr;)l=l._next;(k._prev=l?l._prev:n)?k._prev._next=k:m=k,(k._next=l)?l._prev=k:n=k,k=o}this._firstPT=m}return!0},i.parse=function(a,b,c,d){var i,j,k,l,m,n,o,p,q,r,g=a.style;for(i in b)n=b[i],j=h[i],j?c=j.parse(a,n,i,this,c,d,b):(m=T(a,i,f)+"",q="string"==typeof n,"color"===i||"fill"===i||"stroke"===i||-1!==i.indexOf("Color")||q&&!n.indexOf("rgb")?(q||(n=eb(n),n=(n.length>3?"rgba(":"rgb(")+n.join(",")+")"),c=mb(g,i,m,n,!0,"transparent",c,0,d)):!q||-1===n.indexOf(" ")&&-1===n.indexOf(",")?(k=parseFloat(m),o=k||0===k?m.substr((k+"").length):"",(""===m||"auto"===m)&&("width"===i||"height"===i?(k=Y(a,i,f),o="px"):(k="opacity"!==i?0:1,o="")),r=q&&"="===n.charAt(1),r?(l=parseInt(n.charAt(0)+"1",10),n=n.substr(2),l*=parseFloat(n),p=n.substr((l+"").length-(0>l?1:0))||""):(l=parseFloat(n),p=q?n.substr((l+"").length)||"":""),""===p&&(p=e[i]||o),n=l||0===l?(r?l+k:l)+p:b[i],o!==p&&""!==p&&(l||0===l)&&(k||0===k)&&(k=Z(a,i,k,o),"%"===p?(k/=Z(a,i,100,"%")/100,k>100&&(k=100),b.strictUnits!==!0&&(m=k+"%")):"em"===p?k/=Z(a,i,1,"em"):(l=Z(a,i,l,p),p="px"),r&&(l||0===l)&&(n=l+k+p)),r&&(l+=k),!k&&0!==k||!l&&0!==l?n||"NaN"!=n+""&&null!=n?(c=new lb(g,i,l||k||0,0,c,-1,"css_"+i,!1,0,m,n),c.xs0="display"===i&&"none"===n?m:n):O("invalid "+i+" tween value. "):(c=new lb(g,i,k,l-k,c,0,"css_"+i,G!==!1&&("px"===p||"zIndex"===i),0,m,n),c.xs0=p)):c=mb(g,i,m,n,!0,null,c,0,d)),d&&c&&!c.plugin&&(c.plugin=d);return c},i.setRatio=function(a){var d,e,f,b=this._firstPT,c=1e-6;if(1!==a||this._tween._time!==this._tween._duration&&0!==this._tween._time)if(a||this._tween._time!==this._tween._duration&&0!==this._tween._time||this._tween._rawPrevTime===-1e-6)for(;b;){if(d=b.c*a+b.s,b.r?d=d>0?d+.5>>0:d-.5>>0:c>d&&d>-c&&(d=0),b.type)if(1===b.type)if(f=b.l,2===f)b.t[b.p]=b.xs0+d+b.xs1+b.xn1+b.xs2;else if(3===f)b.t[b.p]=b.xs0+d+b.xs1+b.xn1+b.xs2+b.xn2+b.xs3;else if(4===f)b.t[b.p]=b.xs0+d+b.xs1+b.xn1+b.xs2+b.xn2+b.xs3+b.xn3+b.xs4;else if(5===f)b.t[b.p]=b.xs0+d+b.xs1+b.xn1+b.xs2+b.xn2+b.xs3+b.xn3+b.xs4+b.xn4+b.xs5;else{for(e=b.xs0+d+b.xs1,f=1;b.l>f;f++)e+=b["xn"+f]+b["xs"+(f+1)];b.t[b.p]=e}else-1===b.type?b.t[b.p]=b.xs0:b.setRatio&&b.setRatio(a);else b.t[b.p]=d+b.xs0;b=b._next}else for(;b;)2!==b.type?b.t[b.p]=b.b:b.setRatio(a),b=b._next;else for(;b;)2!==b.type?b.t[b.p]=b.e:b.setRatio(a),b=b._next},i._enableTransforms=function(a){this._transformType=a||3===this._transformType?3:2},i._linkCSSP=function(a,b,c,d){return a&&(b&&(b._prev=a),a._next&&(a._next._prev=a._prev),c?c._next=a:d||null!==this._firstPT||(this._firstPT=a),a._prev?a._prev._next=a._next:this._firstPT===a&&(this._firstPT=a._next),a._next=b,a._prev=c),a},i._kill=function(b){var e,f,g,c=b,d=!1;if(b.css_autoAlpha||b.css_alpha){c={};for(f in b)c[f]=b[f];c.css_opacity=1,c.css_autoAlpha&&(c.css_visibility=1)}return b.css_className&&(e=this._classNamePT)&&(g=e.xfirst,g&&g._prev?this._linkCSSP(g._prev,e._next,g._prev._prev):g===this._firstPT&&(this._firstPT=null),e._next&&this._linkCSSP(e._next,e._next._next,g._prev),this._target._gsOverwrittenClassNamePT=this._linkCSSP(e,this._target._gsOverwrittenClassNamePT),this._classNamePT=null,d=!0),a.prototype._kill.call(this,c)||d},a.activate([c]),c},!0)}),window._gsDefine&&window._gsQueue.pop()();
/*custom scrollbar*/
(function(b){var a={init:function(c){var e={set_width:false,set_height:false,horizontalScroll:false,scrollInertia:950,mouseWheel:true,mouseWheelPixels:"auto",autoDraggerLength:true,autoHideScrollbar:false,scrollButtons:{enable:false,scrollType:"continuous",scrollSpeed:"auto",scrollAmount:40},advanced:{updateOnBrowserResize:true,updateOnContentResize:false,autoExpandHorizontalScroll:false,autoScrollOnFocus:true},callbacks:{onScrollStart:function(){},onScroll:function(){},onTotalScroll:function(){},onTotalScrollBack:function(){},onTotalScrollOffset:0,onTotalScrollBackOffset:0,whileScrolling:function(){}},theme:"light"},c=b.extend(true,e,c);b(document).data("mCS-is-touch-device",false);if(d()){b(document).data("mCS-is-touch-device",true)}function d(){return !!("ontouchstart" in window)?1:0}return this.each(function(){var l=b(this);if(c.set_width){l.css("width",c.set_width)}if(c.set_height){l.css("height",c.set_height)}if(!b(document).data("mCustomScrollbar-index")){b(document).data("mCustomScrollbar-index","1")}else{var s=parseInt(b(document).data("mCustomScrollbar-index"));b(document).data("mCustomScrollbar-index",s+1)}l.wrapInner("<div class='mCustomScrollBox mCS-"+c.theme+"' id='mCSB_"+b(document).data("mCustomScrollbar-index")+"' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_"+b(document).data("mCustomScrollbar-index"));var f=l.children(".mCustomScrollBox");if(c.horizontalScroll){f.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");var j=f.children(".mCSB_h_wrapper");j.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({width:j.children().outerWidth(),position:"relative"}).unwrap()}else{f.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />")}var n=f.children(".mCSB_container");if(b(document).data("mCS-is-touch-device")){n.addClass("mCS_touch")}n.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");var k=f.children(".mCSB_scrollTools"),g=k.children(".mCSB_draggerContainer"),p=g.children(".mCSB_dragger");if(c.horizontalScroll){p.data("minDraggerWidth",p.width())}else{p.data("minDraggerHeight",p.height())}if(c.scrollButtons.enable){if(c.horizontalScroll){k.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>")}else{k.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>")}}f.bind("scroll",function(){if(!l.is(".mCS_disabled")){f.scrollTop(0).scrollLeft(0)}});l.data({mCS_Init:true,mCustomScrollbarIndex:b(document).data("mCustomScrollbar-index"),horizontalScroll:c.horizontalScroll,scrollInertia:c.scrollInertia,scrollEasing:Power4.easeOut,mouseWheel:c.mouseWheel,mouseWheelPixels:c.mouseWheelPixels,autoDraggerLength:c.autoDraggerLength,autoHideScrollbar:c.autoHideScrollbar,scrollButtons_enable:c.scrollButtons.enable,scrollButtons_scrollType:c.scrollButtons.scrollType,scrollButtons_scrollSpeed:c.scrollButtons.scrollSpeed,scrollButtons_scrollAmount:c.scrollButtons.scrollAmount,autoExpandHorizontalScroll:c.advanced.autoExpandHorizontalScroll,autoScrollOnFocus:c.advanced.autoScrollOnFocus,onScrollStart_Callback:c.callbacks.onScrollStart,onScroll_Callback:c.callbacks.onScroll,onTotalScroll_Callback:c.callbacks.onTotalScroll,onTotalScrollBack_Callback:c.callbacks.onTotalScrollBack,onTotalScroll_Offset:c.callbacks.onTotalScrollOffset,onTotalScrollBack_Offset:c.callbacks.onTotalScrollBackOffset,whileScrolling_Callback:c.callbacks.whileScrolling,bindEvent_scrollbar_drag:false,bindEvent_content_touch:false,bindEvent_scrollbar_click:false,bindEvent_mousewheel:false,bindEvent_buttonsContinuous_y:false,bindEvent_buttonsContinuous_x:false,bindEvent_buttonsPixels_y:false,bindEvent_buttonsPixels_x:false,bindEvent_focusin:false,bindEvent_autoHideScrollbar:false,mCSB_buttonScrollRight:false,mCSB_buttonScrollLeft:false,mCSB_buttonScrollDown:false,mCSB_buttonScrollUp:false});if(c.horizontalScroll){if(l.css("max-width")!=="none"){if(!c.advanced.updateOnContentResize){c.advanced.updateOnContentResize=true}}}else{if(l.css("max-height")!=="none"){var r=false,q=parseInt(l.css("max-height"));if(l.css("max-height").indexOf("%")>=0){r=q,q=l.parent().height()*r/100}l.css("overflow","hidden");f.css("max-height",q)}}l.mCustomScrollbar("update");if(c.advanced.updateOnBrowserResize){var h,i=b(window).width(),t=b(window).height();b(window).resize(function(){if(h){clearTimeout(h)}h=setTimeout(function(){if(!l.is(".mCS_disabled")&&!l.is(".mCS_destroyed")){var v=b(window).width(),u=b(window).height();if(i!==v||t!==u){if(l.css("max-height")!=="none"&&r){f.css("max-height",l.parent().height()*r/100)}l.mCustomScrollbar("update");i=v;t=u}}},150)})}if(c.advanced.updateOnContentResize){var o;if(c.horizontalScroll){var m=n.outerWidth()}else{var m=n.outerHeight()}o=setInterval(function(){if(c.horizontalScroll){if(c.advanced.autoExpandHorizontalScroll){n.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:n.outerWidth(),position:"relative"}).unwrap()}var u=n.outerWidth()}else{var u=n.outerHeight()}if(u!=m){l.mCustomScrollbar("update");m=u}},300)}})},update:function(){var l=b(this),i=l.children(".mCustomScrollBox"),o=i.children(".mCSB_container");o.removeClass("mCS_no_scrollbar");l.removeClass("mCS_disabled mCS_destroyed");i.scrollTop(0).scrollLeft(0);var w=i.children(".mCSB_scrollTools"),m=w.children(".mCSB_draggerContainer"),k=m.children(".mCSB_dragger");if(l.data("horizontalScroll")){var y=w.children(".mCSB_buttonLeft"),r=w.children(".mCSB_buttonRight"),d=i.width();if(l.data("autoExpandHorizontalScroll")){o.css({position:"absolute",width:"auto"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:o.outerWidth(),position:"relative"}).unwrap()}var x=o.outerWidth()}else{var u=w.children(".mCSB_buttonUp"),e=w.children(".mCSB_buttonDown"),p=i.height(),g=o.outerHeight()}if(g>p&&!l.data("horizontalScroll")){w.css("display","block");var q=m.height();if(l.data("autoDraggerLength")){var s=Math.round(p/g*q),j=k.data("minDraggerHeight");if(s<=j){k.css({height:j})}else{if(s>=q-10){var n=q-10;k.css({height:n})}else{k.css({height:s})}}k.children(".mCSB_dragger_bar").css({"line-height":k.height()+"px"})}var z=k.height(),v=(g-p)/(q-z);l.data("scrollAmount",v).mCustomScrollbar("scrolling",i,o,m,k,u,e,y,r);var B=Math.abs(o.position().top);l.mCustomScrollbar("scrollTo",B,{scrollInertia:0})}else{if(x>d&&l.data("horizontalScroll")){w.css("display","block");var f=m.width();if(l.data("autoDraggerLength")){var h=Math.round(d/x*f),A=k.data("minDraggerWidth");if(h<=A){k.css({width:A})}else{if(h>=f-10){var c=f-10;k.css({width:c})}else{k.css({width:h})}}}var t=k.width(),v=(x-d)/(f-t);l.data("scrollAmount",v).mCustomScrollbar("scrolling",i,o,m,k,u,e,y,r);var B=Math.abs(o.position().left);l.mCustomScrollbar("scrollTo",B,{scrollInertia:0})}else{i.unbind("mousewheel focusin");if(l.data("horizontalScroll")){k.add(o).css("left",0)}else{k.add(o).css("top",0)}w.css("display","none");o.addClass("mCS_no_scrollbar");l.data({bindEvent_mousewheel:false,bindEvent_focusin:false})}}},scrolling:function(f,n,k,h,u,c,w,t){var i=b(this);if(!i.data("bindEvent_scrollbar_drag")){var l,m;if(window.navigator.msPointerEnabled){h.bind("MSPointerDown",function(F){F.preventDefault();i.data({on_drag:true});h.addClass("mCSB_dragger_onDrag");var E=b(this),H=E.offset(),D=F.originalEvent.pageX-H.left,G=F.originalEvent.pageY-H.top;if(D<E.width()&&D>0&&G<E.height()&&G>0){l=G;m=D}});b(document).bind("MSPointerMove."+i.data("mCustomScrollbarIndex"),function(F){F.preventDefault();if(i.data("on_drag")){var E=h,H=E.offset(),D=F.originalEvent.pageX-H.left,G=F.originalEvent.pageY-H.top;B(l,m,G,D)}}).bind("MSPointerUp."+i.data("mCustomScrollbarIndex"),function(x){x.preventDefault();i.data({on_drag:false});h.removeClass("mCSB_dragger_onDrag")})}else{h.bind("mousedown touchstart",function(F){F.preventDefault();F.stopImmediatePropagation();var E=b(this),I=E.offset(),D,H;if(F.type==="touchstart"){var G=F.originalEvent.touches[0]||F.originalEvent.changedTouches[0];D=G.pageX-I.left;H=G.pageY-I.top}else{i.data({on_drag:true});h.addClass("mCSB_dragger_onDrag");D=F.pageX-I.left;H=F.pageY-I.top}if(D<E.width()&&D>0&&H<E.height()&&H>0){l=H;m=D}}).bind("touchmove",function(F){F.preventDefault();F.stopImmediatePropagation();var I=F.originalEvent.touches[0]||F.originalEvent.changedTouches[0],E=b(this),H=E.offset(),D=I.pageX-H.left,G=I.pageY-H.top;B(l,m,G,D)});b(document).bind("mousemove."+i.data("mCustomScrollbarIndex"),function(F){F.preventDefault();if(i.data("on_drag")){var E=h,H=E.offset(),D=F.pageX-H.left,G=F.pageY-H.top;B(l,m,G,D)}}).bind("mouseup."+i.data("mCustomScrollbarIndex"),function(x){x.preventDefault();i.data({on_drag:false});h.removeClass("mCSB_dragger_onDrag")})}i.data({bindEvent_scrollbar_drag:true})}function B(E,F,G,D){if(i.data("horizontalScroll")){i.mCustomScrollbar("scrollTo",(h.position().left-(F))+D,{moveDragger:true,trigger:"internal"})}else{i.mCustomScrollbar("scrollTo",(h.position().top-(E))+G,{moveDragger:true,trigger:"internal"})}}if(b(document).data("mCS-is-touch-device")){if(!i.data("bindEvent_content_touch")){var j,z,p,q,s,A,C;n.bind("touchstart",function(x){x.stopImmediatePropagation();j=x.originalEvent.touches[0]||x.originalEvent.changedTouches[0];z=b(this);p=z.offset();s=j.pageX-p.left;q=j.pageY-p.top;A=q;C=s});n.bind("touchmove",function(x){x.preventDefault();x.stopImmediatePropagation();j=x.originalEvent.touches[0]||x.originalEvent.changedTouches[0];z=b(this).parent();p=z.offset();s=j.pageX-p.left;q=j.pageY-p.top;if(i.data("horizontalScroll")){i.mCustomScrollbar("scrollTo",C-s,{trigger:"internal"})}else{i.mCustomScrollbar("scrollTo",A-q,{trigger:"internal"})}})}}if(!i.data("bindEvent_scrollbar_click")){k.bind("click",function(D){var x=(D.pageY-k.offset().top)*i.data("scrollAmount"),y=b(D.target);if(i.data("horizontalScroll")){x=(D.pageX-k.offset().left)*i.data("scrollAmount")}if(y.hasClass("mCSB_draggerContainer")||y.hasClass("mCSB_draggerRail")){i.mCustomScrollbar("scrollTo",x,{trigger:"internal"})}});i.data({bindEvent_scrollbar_click:true})}if(i.data("mouseWheel")){if(!i.data("bindEvent_mousewheel")){f.bind("mousewheel",function(F,H){var E,D=i.data("mouseWheelPixels"),x=Math.abs(n.position().top),G=h.position().top,y=k.height()-h.height();if(H<0){H=-1}else{H=1}if(D==="auto"){D=100+Math.round(i.data("scrollAmount")/2)}if(i.data("horizontalScroll")){G=h.position().left;y=k.width()-h.width();x=Math.abs(n.position().left)}if((H>0&&G!==0)||(H<0&&G!==y)){F.preventDefault();F.stopImmediatePropagation()}E=x-(H*D);i.mCustomScrollbar("scrollTo",E,{trigger:"internal"})});i.data({bindEvent_mousewheel:true})}}if(i.data("scrollButtons_enable")){if(i.data("scrollButtons_scrollType")==="pixels"){if(i.data("horizontalScroll")){t.add(w).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend",g,e);i.data({bindEvent_buttonsContinuous_x:false});if(!i.data("bindEvent_buttonsPixels_x")){t.bind("click",function(x){x.preventDefault();o(Math.abs(n.position().left)+i.data("scrollButtons_scrollAmount"))});w.bind("click",function(x){x.preventDefault();o(Math.abs(n.position().left)-i.data("scrollButtons_scrollAmount"))});i.data({bindEvent_buttonsPixels_x:true})}}else{c.add(u).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend",g,e);i.data({bindEvent_buttonsContinuous_y:false});if(!i.data("bindEvent_buttonsPixels_y")){c.bind("click",function(x){x.preventDefault();o(Math.abs(n.position().top)+i.data("scrollButtons_scrollAmount"))});u.bind("click",function(x){x.preventDefault();o(Math.abs(n.position().top)-i.data("scrollButtons_scrollAmount"))});i.data({bindEvent_buttonsPixels_y:true})}}function o(x){if(!h.data("preventAction")){h.data("preventAction",true);i.mCustomScrollbar("scrollTo",x,{trigger:"internal"})}}}else{if(i.data("horizontalScroll")){t.add(w).unbind("click");i.data({bindEvent_buttonsPixels_x:false});if(!i.data("bindEvent_buttonsContinuous_x")){t.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=v();i.data({mCSB_buttonScrollRight:setInterval(function(){i.mCustomScrollbar("scrollTo",Math.abs(n.position().left)+x,{trigger:"internal"})},17)})});var g=function(x){x.preventDefault();clearInterval(i.data("mCSB_buttonScrollRight"))};t.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",g);w.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=v();i.data({mCSB_buttonScrollLeft:setInterval(function(){i.mCustomScrollbar("scrollTo",Math.abs(n.position().left)-x,{trigger:"internal"})},17)})});var e=function(x){x.preventDefault();clearInterval(i.data("mCSB_buttonScrollLeft"))};w.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",e);i.data({bindEvent_buttonsContinuous_x:true})}}else{c.add(u).unbind("click");i.data({bindEvent_buttonsPixels_y:false});if(!i.data("bindEvent_buttonsContinuous_y")){c.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=v();i.data({mCSB_buttonScrollDown:setInterval(function(){i.mCustomScrollbar("scrollTo",Math.abs(n.position().top)+x,{trigger:"internal"})},17)})});var r=function(x){x.preventDefault();clearInterval(i.data("mCSB_buttonScrollDown"))};c.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",r);u.bind("mousedown touchstart MSPointerDown",function(y){y.preventDefault();var x=v();i.data({mCSB_buttonScrollUp:setInterval(function(){i.mCustomScrollbar("scrollTo",Math.abs(n.position().top)-x,{trigger:"internal"})},17)})});var d=function(x){x.preventDefault();clearInterval(i.data("mCSB_buttonScrollUp"))};u.bind("mouseup touchend MSPointerUp mouseout MSPointerOut",d);i.data({bindEvent_buttonsContinuous_y:true})}}function v(){var x=i.data("scrollButtons_scrollSpeed");if(i.data("scrollButtons_scrollSpeed")==="auto"){x=Math.round((i.data("scrollInertia")+100)/20)}return x}}}if(i.data("autoScrollOnFocus")){if(!i.data("bindEvent_focusin")){f.bind("focusin",function(){f.scrollTop(0).scrollLeft(0);var x=b(document.activeElement);if(x.is("input,textarea,select,button,a[tabindex],area,object")){var E=n.position().top,y=x.position().top,D=f.height()-x.outerHeight();if(i.data("horizontalScroll")){E=n.position().left;y=x.position().left;D=f.width()-x.outerWidth()}if(E+y<0||E+y>D){i.mCustomScrollbar("scrollTo",y,{trigger:"internal"})}}});i.data({bindEvent_focusin:true})}}if(i.data("autoHideScrollbar")){if(!i.data("bindEvent_autoHideScrollbar")){f.bind("mouseenter",function(x){f.addClass("mCS-mouse-over").children(".mCSB_scrollTools").stop().animate({opacity:1},"fast")}).bind("mouseleave touchend",function(x){f.removeClass("mCS-mouse-over");if(x.type==="mouseleave"){f.children(".mCSB_scrollTools").stop().animate({opacity:0},"fast")}});i.data({bindEvent_autoHideScrollbar:true})}}},scrollTo:function(c,d){var h=b(this),n={moveDragger:false,trigger:"external",callbacks:true,scrollInertia:h.data("scrollInertia"),scrollEasing:h.data("scrollEasing")},d=b.extend(n,d),o,e=h.children(".mCustomScrollBox"),j=e.children(".mCSB_container"),q=e.children(".mCSB_scrollTools"),i=q.children(".mCSB_draggerContainer"),g=i.children(".mCSB_dragger"),s=draggerSpeed=d.scrollInertia,p,r,l,k;h.data({mCS_trigger:d.trigger});if(d.scrollInertia>0){s=draggerSpeed=d.scrollInertia/1000}if(h.data("mCS_Init")){d.callbacks=false}if(c||c===0){if(typeof(c)==="number"){if(d.moveDragger){o=c;if(h.data("horizontalScroll")){c=g.position().left*h.data("scrollAmount")}else{c=g.position().top*h.data("scrollAmount")}draggerSpeed=0}else{o=c/h.data("scrollAmount")}}else{if(typeof(c)==="string"){var t;if(c==="top"){t=0}else{if(c==="bottom"&&!h.data("horizontalScroll")){t=j.outerHeight()-e.height()}else{if(c==="left"){t=0}else{if(c==="right"&&h.data("horizontalScroll")){t=j.outerWidth()-e.width()}else{if(c==="first"){t=h.find(".mCSB_container").find(":first")}else{if(c==="last"){t=h.find(".mCSB_container").find(":last")}else{t=h.find(c)}}}}}}if(t.length===1){if(h.data("horizontalScroll")){c=t.position().left}else{c=t.position().top}o=c/h.data("scrollAmount")}else{o=c=t}}}if(h.data("horizontalScroll")){if(h.data("onTotalScrollBack_Offset")){r=-h.data("onTotalScrollBack_Offset")}if(h.data("onTotalScroll_Offset")){k=e.width()-j.outerWidth()+h.data("onTotalScroll_Offset")}if(o<0){o=c=0;clearInterval(h.data("mCSB_buttonScrollLeft"));if(!r){p=true}}else{if(o>=i.width()-g.width()){o=i.width()-g.width();c=e.width()-j.outerWidth();clearInterval(h.data("mCSB_buttonScrollRight"));if(!k){l=true}}else{c=-c}}TweenLite.to(g,draggerSpeed,{css:{left:Math.round(o)},overwrite:"all",ease:d.scrollEasing});TweenLite.to(j,s,{css:{left:Math.round(c)},overwrite:"all",ease:d.scrollEasing,onStart:function(){if(d.callbacks&&!h.data("mCS_tweenRunning")){u("onScrollStart")}if(h.data("autoHideScrollbar")){m()}},onUpdate:function(){if(d.callbacks){u("whileScrolling")}},onComplete:function(){if(d.callbacks){u("onScroll");if(p||(r&&j.position().left>=r)){u("onTotalScrollBack")}if(l||(k&&j.position().left<=k)){u("onTotalScroll")}}g.data("preventAction",false);h.data("mCS_tweenRunning",false);if(h.data("autoHideScrollbar")){f()}}})}else{if(h.data("onTotalScrollBack_Offset")){r=-h.data("onTotalScrollBack_Offset")}if(h.data("onTotalScroll_Offset")){k=e.height()-j.outerHeight()+h.data("onTotalScroll_Offset")}if(o<0){o=c=0;clearInterval(h.data("mCSB_buttonScrollUp"));if(!r){p=true}}else{if(o>=i.height()-g.height()){o=i.height()-g.height();c=e.height()-j.outerHeight();clearInterval(h.data("mCSB_buttonScrollDown"));if(!k){l=true}}else{c=-c}}TweenLite.to(g,draggerSpeed,{css:{top:Math.round(o)},overwrite:"all",ease:d.scrollEasing});TweenLite.to(j,s,{css:{top:Math.round(c)},overwrite:"all",ease:d.scrollEasing,onStart:function(){if(d.callbacks&&!h.data("mCS_tweenRunning")){u("onScrollStart")}if(h.data("autoHideScrollbar")){m()}},onUpdate:function(){if(d.callbacks){u("whileScrolling")}},onComplete:function(){if(d.callbacks){u("onScroll");if(p||(r&&j.position().top>=r)){u("onTotalScrollBack")}if(l||(k&&j.position().top<=k)){u("onTotalScroll")}}g.data("preventAction",false);h.data("mCS_tweenRunning",false);if(h.data("autoHideScrollbar")){f()}}})}if(h.data("mCS_Init")){h.data({mCS_Init:false})}}function u(v){this.mcs={top:j.position().top,left:j.position().left,draggerTop:g.position().top,draggerLeft:g.position().left,topPct:Math.round((100*Math.abs(j.position().top))/Math.abs(j.outerHeight()-e.height())),leftPct:Math.round((100*Math.abs(j.position().left))/Math.abs(j.outerWidth()-e.width()))};switch(v){case"onScrollStart":h.data("mCS_tweenRunning",true).data("onScrollStart_Callback").call(h,this.mcs);break;case"whileScrolling":h.data("whileScrolling_Callback").call(h,this.mcs);break;case"onScroll":h.data("onScroll_Callback").call(h,this.mcs);break;case"onTotalScrollBack":h.data("onTotalScrollBack_Callback").call(h,this.mcs);break;case"onTotalScroll":h.data("onTotalScroll_Callback").call(h,this.mcs);break}}function m(){TweenLite.to(q,0.15,{css:{opacity:1},ease:Power2.easeIn})}function f(){if(!e.hasClass("mCS-mouse-over")){TweenLite.to(q,0.15,{css:{opacity:0},ease:Power2.easeIn})}}},stop:function(){var e=b(this),c=e.children().children(".mCSB_container"),d=e.children().children().children().children(".mCSB_dragger");TweenLite.killTweensOf(c);TweenLite.killTweensOf(d)},disable:function(c){var h=b(this),d=h.children(".mCustomScrollBox"),f=d.children(".mCSB_container"),e=d.children(".mCSB_scrollTools"),g=e.children().children(".mCSB_dragger");d.unbind("mousewheel focusin mouseenter mouseleave touchend");f.unbind("touchstart touchmove");if(c){if(h.data("horizontalScroll")){g.add(f).css("left",0)}else{g.add(f).css("top",0)}}e.css("display","none");f.addClass("mCS_no_scrollbar");h.data({bindEvent_mousewheel:false,bindEvent_focusin:false,bindEvent_content_touch:false,bindEvent_autoHideScrollbar:false}).addClass("mCS_disabled")},destroy:function(){var c=b(this);c.removeClass("mCustomScrollbar _mCS_"+c.data("mCustomScrollbarIndex")).addClass("mCS_destroyed").children().children(".mCSB_container").unwrap().children().unwrap().siblings(".mCSB_scrollTools").remove();b(document).unbind("mousemove."+c.data("mCustomScrollbarIndex")+" mouseup."+c.data("mCustomScrollbarIndex")+" MSPointerMove."+c.data("mCustomScrollbarIndex")+" MSPointerUp."+c.data("mCustomScrollbarIndex"))}};b.fn.mCustomScrollbar=function(c){if(a[c]){return a[c].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof c==="object"||!c){return a.init.apply(this,arguments)}else{b.error("Method "+c+" does not exist")}}}})(jQuery);