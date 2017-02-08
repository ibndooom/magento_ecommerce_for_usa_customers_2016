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
}  //
// LESS - Leaner CSS v1.2.2
// http://lesscss.org
// 
// Copyright (c) 2009-2011, Alexis Sellier
// Licensed under the Apache 2.0 License.
//
(function(a,b){function c(b){return a.less[b.split("/")[1]]}function m(){var a=document.getElementsByTagName("style");for(var b=0;b<a.length;b++)a[b].type.match(k)&&(new d.Parser).parse(a[b].innerHTML||"",function(c,d){var e=d.toCSS(),f=a[b];f.type="text/css",f.styleSheet?f.styleSheet.cssText=e:f.innerHTML=e})}function n(a,b){for(var c=0;c<d.sheets.length;c++)o(d.sheets[c],a,b,d.sheets.length-(c+1))}function o(b,c,e,f){var g=a.location.href.replace(/[#?].*$/,""),i=b.href.replace(/\?.*$/,""),j=h&&h.getItem(i),k=h&&h.getItem(i+":timestamp"),l={css:j,timestamp:k};/^(https?|file):/.test(i)||(i.charAt(0)=="/"?i=a.location.protocol+"//"+a.location.host+i:i=g.slice(0,g.lastIndexOf("/")+1)+i);var m=i.match(/([^\/]+)$/)[1];s(b.href,b.type,function(a,g){if(!e&&l&&g&&(new Date(g)).valueOf()===(new Date(l.timestamp)).valueOf())r(l.css,b),c(null,null,a,b,{local:!0,remaining:f});else try{(new d.Parser({optimization:d.optimization,paths:[i.replace(/[\w\.-]+$/,"")],mime:b.type,filename:m})).parse(a,function(d,e){if(d)return w(d,i);try{c(d,e,a,b,{local:!1,lastModified:g,remaining:f}),u(document.getElementById("less-error-message:"+q(i)))}catch(d){w(d,i)}})}catch(h){w(h,i)}},function(a,b){throw new Error("Couldn't load "+b+" ("+a+")")})}function q(a){return a.replace(/^[a-z]+:\/\/?[^\/]+/,"").replace(/^\//,"").replace(/\?.*$/,"").replace(/\.[^\.\/]+$/,"").replace(/[^\.\w-]+/g,"-").replace(/\./g,":")}function r(a,b,c){var d,e=b.href?b.href.replace(/\?.*$/,""):"",f="less:"+(b.title||q(e));(d=document.getElementById(f))===null&&(d=document.createElement("style"),d.type="text/css",d.media=b.media||"screen",d.id=f,document.getElementsByTagName("head")[0].appendChild(d));if(d.styleSheet)try{d.styleSheet.cssText=a}catch(g){throw new Error("Couldn't reassign styleSheet.cssText.")}else(function(a){d.childNodes.length>0?d.firstChild.nodeValue!==a.nodeValue&&d.replaceChild(a,d.firstChild):d.appendChild(a)})(document.createTextNode(a));c&&h&&(v("saving "+e+" to cache."),h.setItem(e,a),h.setItem(e+":timestamp",c))}function s(a,b,c,e){function i(b,c,d){b.status>=200&&b.status<300?c(b.responseText,b.getResponseHeader("Last-Modified")):typeof d=="function"&&d(b.status,a)}var f=t(),h=g?!1:d.async;typeof f.overrideMimeType=="function"&&f.overrideMimeType("text/css"),f.open("GET",a,h),f.setRequestHeader("Accept",b||"text/x-less, text/css; q=0.9, */*; q=0.5"),f.send(null),g?f.status===0||f.status>=200&&f.status<300?c(f.responseText):e(f.status,a):h?f.onreadystatechange=function(){f.readyState==4&&i(f,c,e)}:i(f,c,e)}function t(){if(a.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("MSXML2.XMLHTTP.3.0")}catch(b){return v("browser doesn't support AJAX."),null}}function u(a){return a&&a.parentNode.removeChild(a)}function v(a){d.env=="development"&&typeof console!="undefined"&&console.log("less: "+a)}function w(a,b){var c="less-error-message:"+q(b),e='<li><label>{line}</label><pre class="{class}">{content}</pre></li>',f=document.createElement("div"),g,h,i=[],j=a.filename||b;f.id=c,f.className="less-error-message",h="<h3>"+(a.message||"There is an error in your .less file")+"</h3>"+'<p>in <a href="'+j+'">'+j+"</a> ";var k=function(a,b,c){a.extract[b]&&i.push(e.replace(/\{line\}/,parseInt(a.line)+(b-1)).replace(/\{class\}/,c).replace(/\{content\}/,a.extract[b]))};a.stack?h+="<br/>"+a.stack.split("\n").slice(1).join("<br/>"):a.extract&&(k(a,0,""),k(a,1,"line"),k(a,2,""),h+="on line "+a.line+", column "+(a.column+1)+":</p>"+"<ul>"+i.join("")+"</ul>"),f.innerHTML=h,r([".less-error-message ul, .less-error-message li {","list-style-type: none;","margin-right: 15px;","padding: 4px 0;","margin: 0;","}",".less-error-message label {","font-size: 12px;","margin-right: 15px;","padding: 4px 0;","color: #cc7777;","}",".less-error-message pre {","color: #dd6666;","padding: 4px 0;","margin: 0;","display: inline-block;","}",".less-error-message pre.line {","color: #ff0000;","}",".less-error-message h3 {","font-size: 20px;","font-weight: bold;","padding: 15px 0 5px 0;","margin: 0;","}",".less-error-message a {","color: #10a","}",".less-error-message .error {","color: red;","font-weight: bold;","padding-bottom: 2px;","border-bottom: 1px dashed red;","}"].join("\n"),{title:"error-message"}),f.style.cssText=["font-family: Arial, sans-serif","border: 1px solid #e00","background-color: #eee","border-radius: 5px","-webkit-border-radius: 5px","-moz-border-radius: 5px","color: #e00","padding: 15px","margin-bottom: 15px"].join(";"),d.env=="development"&&(g=setInterval(function(){document.body&&(document.getElementById(c)?document.body.replaceChild(f,document.getElementById(c)):document.body.insertBefore(f,document.body.firstChild),clearInterval(g))},10))}typeof define=="function"&&define.amd&&define("less",[],function(){return d}),Array.isArray||(Array.isArray=function(a){return Object.prototype.toString.call(a)==="[object Array]"||a instanceof Array}),Array.prototype.forEach||(Array.prototype.forEach=function(a,b){var c=this.length>>>0;for(var d=0;d<c;d++)d in this&&a.call(b,this[d],d,this)}),Array.prototype.map||(Array.prototype.map=function(a){var b=this.length>>>0,c=new Array(b),d=arguments[1];for(var e=0;e<b;e++)e in this&&(c[e]=a.call(d,this[e],e,this));return c}),Array.prototype.filter||(Array.prototype.filter=function(a){var b=[],c=arguments[1];for(var d=0;d<this.length;d++)a.call(c,this[d])&&b.push(this[d]);return b}),Array.prototype.reduce||(Array.prototype.reduce=function(a){var b=this.length>>>0,c=0;if(b===0&&arguments.length===1)throw new TypeError;if(arguments.length>=2)var d=arguments[1];else do{if(c in this){d=this[c++];break}if(++c>=b)throw new TypeError}while(!0);for(;c<b;c++)c in this&&(d=a.call(null,d,this[c],c,this));return d}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a){var b=this.length,c=arguments[1]||0;if(!b)return-1;if(c>=b)return-1;c<0&&(c+=b);for(;c<b;c++){if(!Object.prototype.hasOwnProperty.call(this,c))continue;if(a===this[c])return c}return-1}),Object.keys||(Object.keys=function(a){var b=[];for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b}),String.prototype.trim||(String.prototype.trim=function(){return String(this).replace(/^\s\s*/,"").replace(/\s\s*$/,"")});var d,f;typeof environment=="object"&&{}.toString.call(environment)==="[object Environment]"?(typeof a=="undefined"?d={}:d=a.less={},f=d.tree={},d.mode="rhino"):typeof a=="undefined"?(d=exports,f=c("./tree"),d.mode="node"):(typeof a.less=="undefined"&&(a.less={}),d=a.less,f=a.less.tree={},d.mode="browser"),d.Parser=function(b){function t(){j=m[i],k=h,n=h}function u(){m[i]=j,h=k,n=h}function v(){h>n&&(m[i]=m[i].slice(h-n),n=h)}function w(a){var b,c,d,e,f,j,k,l;if(a instanceof Function)return a.call(o.parsers);if(typeof a=="string")b=g.charAt(h)===a?a:null,d=1,v();else{v();if(!(b=a.exec(m[i])))return null;d=b[0].length}if(b){l=h+=d,j=h+m[i].length-d;while(h<j){e=g.charCodeAt(h);if(e!==32&&e!==10&&e!==9)break;h++}return m[i]=m[i].slice(d+(h-l)),n=h,m[i].length===0&&i<m.length-1&&i++,typeof b=="string"?b:b.length===1?b[0]:b}}function x(a,b){var c=w(a);if(!!c)return c;y(b||(typeof a=="string"?"expected '"+a+"' got '"+g.charAt(h)+"'":"unexpected token"))}function y(a,b){throw{index:h,type:b||"Syntax",message:a}}function z(a){return typeof a=="string"?g.charAt(h)===a:a.test(m[i])?!0:!1}function A(a){return d.mode==="node"?c("path").basename(a):a.match(/[^\/]+$/)[0]}function B(a,b){return a.filename&&b.filename&&a.filename!==b.filename?o.imports.contents[A(a.filename)]:g}function C(a,b){for(var c=a,d=-1;c>=0&&b.charAt(c)!=="\n";c--)d++;return{line:typeof a=="number"?(b.slice(0,a).match(/\n/g)||"").length:null,column:d}}function D(a,b){var c=B(a,b),d=C(a.index,c),e=d.line,f=d.column,g=c.split("\n");this.type=a.type||"Syntax",this.message=a.message,this.filename=a.filename||b.filename,this.index=a.index,this.line=typeof e=="number"?e+1:null,this.callLine=a.call&&C(a.call,c)+1,this.callExtract=g[C(a.call,c)],this.stack=a.stack,this.column=f,this.extract=[g[e-1],g[e],g[e+1]]}var g,h,i,j,k,l,m,n,o,q=this,r=function(){},s=this.imports={paths:b&&b.paths||[],queue:[],files:{},contents:{},mime:b&&b.mime,error:null,push:function(a,c){var e=this;this.queue.push(a),d.Parser.importer(a,this.paths,function(b,d,f){e.queue.splice(e.queue.indexOf(a),1),e.files[a]=d,e.contents[a]=f,b&&!e.error&&(e.error=b),c(b,d),e.queue.length===0&&r()},b)}};return this.env=b=b||{},this.optimization="optimization"in this.env?this.env.optimization:1,this.env.filename=this.env.filename||null,o={imports:s,parse:function(a,e){var j,k,p,q,s,t,u=[],v,x=null;h=i=n=l=0,g=a.replace(/\r\n/g,"\n"),m=function(a){var c=0,d=/[^"'`\{\}\/\(\)\\]+/g,e=/\/\*(?:[^*]|\*+[^\/*])*\*+\/|\/\/.*/g,f=/"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'|`((?:[^`\\\r\n]|\\.)*)`/g,h=0,i,j=a[0],k;for(var l=0,m,n;l<g.length;l++){d.lastIndex=l,(i=d.exec(g))&&i.index===l&&(l+=i[0].length,j.push(i[0])),m=g.charAt(l),e.lastIndex=f.lastIndex=l,(i=f.exec(g))&&i.index===l&&(l+=i[0].length,j.push(i[0]),m=g.charAt(l)),!k&&m==="/"&&(n=g.charAt(l+1),(n==="/"||n==="*")&&(i=e.exec(g))&&i.index===l&&(l+=i[0].length,j.push(i[0]),m=g.charAt(l)));switch(m){case"{":if(!k){h++,j.push(m);break};case"}":if(!k){h--,j.push(m),a[++c]=j=[];break};case"(":if(!k){k=!0,j.push(m);break};case")":if(k){k=!1,j.push(m);break};default:j.push(m)}}return h>0&&(x=new D({index:l,type:"Parse",message:"missing closing `}`",filename:b.filename},b)),a.map(function(a){return a.join("")})}([[]]);if(x)return e(x);try{j=new f.Ruleset([],w(this.parsers.primary)),j.root=!0}catch(y){return e(new D(y,b))}j.toCSS=function(a){var e,g,h;return function(e,g){var h=[],i;e=e||{},typeof g=="object"&&!Array.isArray(g)&&(g=Object.keys(g).map(function(a){var b=g[a];return b instanceof f.Value||(b instanceof f.Expression||(b=new f.Expression([b])),b=new f.Value([b])),new f.Rule("@"+a,b,!1,0)}),h=[new f.Ruleset(null,g)]);try{var j=a.call(this,{frames:h}).toCSS([],{compress:e.compress||!1})}catch(k){throw new D(k,b)}if(i=o.imports.error)throw i instanceof D?i:new D(i,b);return e.yuicompress&&d.mode==="node"?c("./cssmin").compressor.cssmin(j):e.compress?j.replace(/(\s)+/g,"$1"):j}}(j.eval);if(h<g.length-1){h=l,t=g.split("\n"),s=(g.slice(0,h).match(/\n/g)||"").length+1;for(var z=h,A=-1;z>=0&&g.charAt(z)!=="\n";z--)A++;x={type:"Parse",message:"Syntax Error on line "+s,index:h,filename:b.filename,line:s,column:A,extract:[t[s-2],t[s-1],t[s]]}}this.imports.queue.length>0?r=function(){e(x,j)}:e(x,j)},parsers:{primary:function(){var a,b=[];while((a=w(this.mixin.definition)||w(this.rule)||w(this.ruleset)||w(this.mixin.call)||w(this.comment)||w(this.directive))||w(/^[\s\n]+/))a&&b.push(a);return b},comment:function(){var a;if(g.charAt(h)!=="/")return;if(g.charAt(h+1)==="/")return new f.Comment(w(/^\/\/.*/),!0);if(a=w(/^\/\*(?:[^*]|\*+[^\/*])*\*+\/\n?/))return new f.Comment(a)},entities:{quoted:function(){var a,b=h,c;g.charAt(b)==="~"&&(b++,c=!0);if(g.charAt(b)!=='"'&&g.charAt(b)!=="'")return;c&&w("~");if(a=w(/^"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'/))return new f.Quoted(a[0],a[1]||a[2],c)},keyword:function(){var a;if(a=w(/^[_A-Za-z-][_A-Za-z0-9-]*/))return f.colors.hasOwnProperty(a)?new f.Color(f.colors[a].slice(1)):new f.Keyword(a)},call:function(){var a,c,d=h;if(!(a=/^([\w-]+|%|progid:[\w\.]+)\(/.exec(m[i])))return;a=a[1].toLowerCase();if(a==="url")return null;h+=a.length;if(a==="alpha")return w(this.alpha);w("("),c=w(this.entities.arguments);if(!w(")"))return;if(a)return new f.Call(a,c,d,b.filename)},arguments:function(){var a=[],b;while(b=w(this.entities.assignment)||w(this.expression)){a.push(b);if(!w(","))break}return a},literal:function(){return w(this.entities.dimension)||w(this.entities.color)||w(this.entities.quoted)},assignment:function(){var a,b;if((a=w(/^\w+(?=\s?=)/i))&&w("=")&&(b=w(this.entity)))return new f.Assignment(a,b)},url:function(){var a;if(g.charAt(h)!=="u"||!w(/^url\(/))return;return a=w(this.entities.quoted)||w(this.entities.variable)||w(this.entities.dataURI)||w(/^[-\w%@$\/.&=:;#+?~]+/)||"",x(")"),new f.URL(a.value||a.data||a instanceof f.Variable?a:new f.Anonymous(a),s.paths)},dataURI:function(){var a;if(w(/^data:/)){a={},a.mime=w(/^[^\/]+\/[^,;)]+/)||"",a.charset=w(/^;\s*charset=[^,;)]+/)||"",a.base64=w(/^;\s*base64/)||"",a.data=w(/^,\s*[^)]+/);if(a.data)return a}},variable:function(){var a,c=h;if(g.charAt(h)==="@"&&(a=w(/^@@?[\w-]+/)))return new f.Variable(a,c,b.filename)},color:function(){var a;if(g.charAt(h)==="#"&&(a=w(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/)))return new f.Color(a[1])},dimension:function(){var a,b=g.charCodeAt(h);if(b>57||b<45||b===47)return;if(a=w(/^(-?\d*\.?\d+)(px|%|em|rem|pc|ex|in|deg|s|ms|pt|cm|mm|rad|grad|turn)?/))return new f.Dimension(a[1],a[2])},javascript:function(){var a,b=h,c;g.charAt(b)==="~"&&(b++,c=!0);if(g.charAt(b)!=="`")return;c&&w("~");if(a=w(/^`([^`]*)`/))return new f.JavaScript(a[1],h,c)}},variable:function(){var a;if(g.charAt(h)==="@"&&(a=w(/^(@[\w-]+)\s*:/)))return a[1]},shorthand:function(){var a,b;if(!z(/^[@\w.%-]+\/[@\w.-]+/))return;if((a=w(this.entity))&&w("/")&&(b=w(this.entity)))return new f.Shorthand(a,b)},mixin:{call:function(){var a=[],c,d,e,i=h,j=g.charAt(h),k=!1;if(j!=="."&&j!=="#")return;while(c=w(/^[#.](?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+/))a.push(new f.Element(d,c,h)),d=w(">");w("(")&&(e=w(this.entities.arguments))&&w(")"),w(this.important)&&(k=!0);if(a.length>0&&(w(";")||z("}")))return new f.mixin.Call(a,e,i,b.filename,k)},definition:function(){var a,b=[],c,d,e,i,j;if(g.charAt(h)!=="."&&g.charAt(h)!=="#"||z(/^[^{]*(;|})/))return;t();if(c=w(/^([#.](?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+)\s*\(/)){a=c[1];while(e=w(this.entities.variable)||w(this.entities.literal)||w(this.entities.keyword)){e instanceof f.Variable?w(":")?(i=x(this.expression,"expected expression"),b.push({name:e.name,value:i})):b.push({name:e.name}):b.push({value:e});if(!w(","))break}x(")"),w(/^when/)&&(j=x(this.conditions,"expected condition")),d=w(this.block);if(d)return new f.mixin.Definition(a,b,d,j);u()}}},entity:function(){return w(this.entities.literal)||w(this.entities.variable)||w(this.entities.url)||w(this.entities.call)||w(this.entities.keyword)||w(this.entities.javascript)||w(this.comment)},end:function(){return w(";")||z("}")},alpha:function(){var a;if(!w(/^\(opacity=/i))return;if(a=w(/^\d+/)||w(this.entities.variable))return x(")"),new f.Alpha(a)},element:function(){var a,b,c,d;c=w(this.combinator),a=w(/^(?:\d+\.\d+|\d+)%/)||w(/^(?:[.#]?|:*)(?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+/)||w("*")||w(this.attribute)||w(/^\([^)@]+\)/),a||w("(")&&(d=w(this.entities.variable))&&w(")")&&(a=new f.Paren(d));if(a)return new f.Element(c,a,h);if(c.value&&c.value.charAt(0)==="&")return new f.Element(c,null,h)},combinator:function(){var a,b=g.charAt(h);if(b===">"||b==="+"||b==="~"){h++;while(g.charAt(h)===" ")h++;return new f.Combinator(b)}if(b==="&"){a="&",h++,g.charAt(h)===" "&&(a="& ");while(g.charAt(h)===" ")h++;return new f.Combinator(a)}if(b===":"&&g.charAt(h+1)===":"){h+=2;while(g.charAt(h)===" ")h++;return new f.Combinator("::")}return g.charAt(h-1)===" "?new f.Combinator(" "):new f.Combinator(null)},selector:function(){var a,b,c=[],d,e;while(b=w(this.element)){d=g.charAt(h),c.push(b);if(d==="{"||d==="}"||d===";"||d===",")break}if(c.length>0)return new f.Selector(c)},tag:function(){return w(/^[a-zA-Z][a-zA-Z-]*[0-9]?/)||w("*")},attribute:function(){var a="",b,c,d;if(!w("["))return;if(b=w(/^[a-zA-Z-]+/)||w(this.entities.quoted))(d=w(/^[|~*$^]?=/))&&(c=w(this.entities.quoted)||w(/^[\w-]+/))?a=[b,d,c.toCSS?c.toCSS():c].join(""):a=b;if(!w("]"))return;if(a)return"["+a+"]"},block:function(){var a;if(w("{")&&(a=w(this.primary))&&w("}"))return a},ruleset:function(){var a=[],b,c,d;t();while(b=w(this.selector)){a.push(b),w(this.comment);if(!w(","))break;w(this.comment)}if(a.length>0&&(c=w(this.block)))return new f.Ruleset(a,c);l=h,u()},rule:function(){var a,b,c=g.charAt(h),d,e;t();if(c==="."||c==="#"||c==="&")return;if(a=w(this.variable)||w(this.property)){a.charAt(0)!="@"&&(e=/^([^@+\/'"*`(;{}-]*);/.exec(m[i]))?(h+=e[0].length-1,b=new f.Anonymous(e[1])):a==="font"?b=w(this.font):b=w(this.value),d=w(this.important);if(b&&w(this.end))return new f.Rule(a,b,d,k);l=h,u()}},"import":function(){var a,b,c=h;if(w(/^@import\s+/)&&(a=w(this.entities.quoted)||w(this.entities.url))){b=w(this.mediaFeatures);if(w(";"))return new f.Import(a,s,b,c)}},mediaFeature:function(){var a=[];do if(e=w(this.entities.keyword))a.push(e);else if(w("(")){p=w(this.property),e=w(this.entity);if(!w(")"))return null;if(p&&e)a.push(new f.Paren(new f.Rule(p,e,null,h,!0)));else{if(!e)return null;a.push(new f.Paren(e))}}while(e);if(a.length>0)return new f.Expression(a)},mediaFeatures:function(){var a,b=[];while(a=w(this.mediaFeature)){b.push(a);if(!w(","))break}return b.length>0?b:null},media:function(){var a;if(w(/^@media/)){a=w(this.mediaFeatures);if(rules=w(this.block))return new f.Directive("@media",rules,a)}},directive:function(){var a,b,c,d,e,i;if(g.charAt(h)!=="@")return;if(b=w(this["import"])||w(this.media))return b;if(a=w(/^@page|@keyframes/)||w(/^@(?:-webkit-|-moz-|-o-|-ms-)[a-z0-9-]+/)){d=(w(/^[^{]+/)||"").trim();if(c=w(this.block))return new f.Directive(a+" "+d,c)}else if(a=w(/^@[-a-z]+/))if(a==="@font-face"){if(c=w(this.block))return new f.Directive(a,c)}else if((b=w(this.entity))&&w(";"))return new f.Directive(a,b)},font:function(){var a=[],b=[],c,d,e,g;while(g=w(this.shorthand)||w(this.entity))b.push(g);a.push(new f.Expression(b));if(w(","))while(g=w(this.expression)){a.push(g);if(!w(","))break}return new f.Value(a)},value:function(){var a,b=[],c;while(a=w(this.expression)){b.push(a);if(!w(","))break}if(b.length>0)return new f.Value(b)},important:function(){if(g.charAt(h)==="!")return w(/^! *important/)},sub:function(){var a;if(w("(")&&(a=w(this.expression))&&w(")"))return a},multiplication:function(){var a,b,c,d;if(a=w(this.operand)){while(!z(/^\/\*/)&&(c=w("/")||w("*"))&&(b=w(this.operand)))d=new f.Operation(c,[d||a,b]);return d||a}},addition:function(){var a,b,c,d;if(a=w(this.multiplication)){while((c=w(/^[-+]\s+/)||g.charAt(h-1)!=" "&&(w("+")||w("-")))&&(b=w(this.multiplication)))d=new f.Operation(c,[d||a,b]);return d||a}},conditions:function(){var a,b,c=h,d;if(a=w(this.condition)){while(w(",")&&(b=w(this.condition)))d=new f.Condition("or",d||a,b,c);return d||a}},condition:function(){var a,b,c,d,e=h,g=!1;w(/^not/)&&(g=!0),x("(");if(a=w(this.addition)||w(this.entities.keyword)||w(this.entities.quoted))return(d=w(/^(?:>=|=<|[<=>])/))?(b=w(this.addition)||w(this.entities.keyword)||w(this.entities.quoted))?c=new f.Condition(d,a,b,e,g):y("expected expression"):c=new f.Condition("=",a,new f.Keyword("true"),e,g),x(")"),w(/^and/)?new f.Condition("and",c,w(this.condition)):c},operand:function(){var a,b=g.charAt(h+1);g.charAt(h)==="-"&&(b==="@"||b==="(")&&(a=w("-"));var c=w(this.sub)||w(this.entities.dimension)||w(this.entities.color)||w(this.entities.variable)||w(this.entities.call);return a?new f.Operation("*",[new f.Dimension(-1),c]):c},expression:function(){var a,b,c=[],d;while(a=w(this.addition)||w(this.entity))c.push(a);if(c.length>0)return new f.Expression(c)},property:function(){var a;if(a=w(/^(\*?-?[-a-z_0-9]+)\s*:/))return a[1]}}}};if(d.mode==="browser"||d.mode==="rhino")d.Parser.importer=function(a,b,c,d){!/^([a-z]+:)?\//.test(a)&&b.length>0&&(a=b[0]+a),o({href:a,title:a,type:d.mime},function(e){e&&typeof d.errback=="function"?d.errback.call(null,a,b,c,d):c.apply(null,arguments)},!0)};(function(a){function b(b){return a.functions.hsla(b.h,b.s,b.l,b.a)}function c(b){if(b instanceof a.Dimension)return parseFloat(b.unit=="%"?b.value/100:b.value);if(typeof b=="number")return b;throw{error:"RuntimeError",message:"color functions take numbers as parameters"}}function d(a){return Math.min(1,Math.max(0,a))}a.functions={rgb:function(a,b,c){return this.rgba(a,b,c,1)},rgba:function(b,d,e,f){var g=[b,d,e].map(function(a){return c(a)}),f=c(f);return new a.Color(g,f)},hsl:function(a,b,c){return this.hsla(a,b,c,1)},hsla:function(a,b,d,e){function h(a){return a=a<0?a+1:a>1?a-1:a,a*6<1?g+(f-g)*a*6:a*2<1?f:a*3<2?g+(f-g)*(2/3-a)*6:g}a=c(a)%360/360,b=c(b),d=c(d),e=c(e);var f=d<=.5?d*(b+1):d+b-d*b,g=d*2-f;return this.rgba(h(a+1/3)*255,h(a)*255,h(a-1/3)*255,e)},hue:function(b){return new a.Dimension(Math.round(b.toHSL().h))},saturation:function(b){return new a.Dimension(Math.round(b.toHSL().s*100),"%")},lightness:function(b){return new a.Dimension(Math.round(b.toHSL().l*100),"%")},alpha:function(b){return new a.Dimension(b.toHSL().a)},saturate:function(a,c){var e=a.toHSL();return e.s+=c.value/100,e.s=d(e.s),b(e)},desaturate:function(a,c){var e=a.toHSL();return e.s-=c.value/100,e.s=d(e.s),b(e)},lighten:function(a,c){var e=a.toHSL();return e.l+=c.value/100,e.l=d(e.l),b(e)},darken:function(a,c){var e=a.toHSL();return e.l-=c.value/100,e.l=d(e.l),b(e)},fadein:function(a,c){var e=a.toHSL();return e.a+=c.value/100,e.a=d(e.a),b(e)},fadeout:function(a,c){var e=a.toHSL();return e.a-=c.value/100,e.a=d(e.a),b(e)},fade:function(a,c){var e=a.toHSL();return e.a=c.value/100,e.a=d(e.a),b(e)},spin:function(a,c){var d=a.toHSL(),e=(d.h+c.value)%360;return d.h=e<0?360+e:e,b(d)},mix:function(b,c,d){var e=d.value/100,f=e*2-1,g=b.toHSL().a-c.toHSL().a,h=((f*g==-1?f:(f+g)/(1+f*g))+1)/2,i=1-h,j=[b.rgb[0]*h+c.rgb[0]*i,b.rgb[1]*h+c.rgb[1]*i,b.rgb[2]*h+c.rgb[2]*i],k=b.alpha*e+c.alpha*(1-e);return new a.Color(j,k)},greyscale:function(b){return this.desaturate(b,new a.Dimension(100))},e:function(b){return new a.Anonymous(b instanceof a.JavaScript?b.evaluated:b)},escape:function(b){return new a.Anonymous(encodeURI(b.value).replace(/=/g,"%3D").replace(/:/g,"%3A").replace(/#/g,"%23").replace(/;/g,"%3B").replace(/\(/g,"%28").replace(/\)/g,"%29"))},"%":function(b){var c=Array.prototype.slice.call(arguments,1),d=b.value;for(var e=0;e<c.length;e++)d=d.replace(/%[sda]/i,function(a){var b=a.match(/s/i)?c[e].value:c[e].toCSS();return a.match(/[A-Z]$/)?encodeURIComponent(b):b});return d=d.replace(/%%/g,"%"),new a.Quoted('"'+d+'"',d)},round:function(a){return this._math("round",a)},ceil:function(a){return this._math("ceil",a)},floor:function(a){return this._math("floor",a)},_math:function(b,d){if(d instanceof a.Dimension)return new a.Dimension(Math[b](c(d)),d.unit);if(typeof d=="number")return Math[b](d);throw{type:"Argument",message:"argument must be a number"}},argb:function(b){return new a.Anonymous(b.toARGB())},percentage:function(b){return new a.Dimension(b.value*100,"%")},color:function(b){if(b instanceof a.Quoted)return new a.Color(b.value.slice(1));throw{type:"Argument",message:"argument must be a string"}},iscolor:function(b){return this._isa(b,a.Color)},isnumber:function(b){return this._isa(b,a.Dimension)},isstring:function(b){return this._isa(b,a.Quoted)},iskeyword:function(b){return this._isa(b,a.Keyword)},isurl:function(b){return this._isa(b,a.URL)},ispixel:function(b){return b instanceof a.Dimension&&b.unit==="px"?a.True:a.False},ispercentage:function(b){return b instanceof a.Dimension&&b.unit==="%"?a.True:a.False},isem:function(b){return b instanceof a.Dimension&&b.unit==="em"?a.True:a.False},_isa:function(b,c){return b instanceof c?a.True:a.False}}})(c("./tree")),function(a){a.colors={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgrey:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",grey:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"}}(c("./tree")),function(a){a.Alpha=function(a){this.value=a},a.Alpha.prototype={toCSS:function(){return"alpha(opacity="+(this.value.toCSS?this.value.toCSS():this.value)+")"},eval:function(a){return this.value.eval&&(this.value=this.value.eval(a)),this}}}(c("../tree")),function(a){a.Anonymous=function(a){this.value=a.value||a},a.Anonymous.prototype={toCSS:function(){return this.value},eval:function(){return this}}}(c("../tree")),function(a){a.Assignment=function(a,b){this.key=a,this.value=b},a.Assignment.prototype={toCSS:function(){return this.key+"="+(this.value.toCSS?this.value.toCSS():this.value)},eval:function(a){return this.value.eval&&(this.value=this.value.eval(a)),this}}}(c("../tree")),function(a){a.Call=function(a,b,c,d){this.name=a,this.args=b,this.index=c,this.filename=d},a.Call.prototype={eval:function(b){var c=this.args.map(function(a){return a.eval(b)});if(!(this.name in a.functions))return new a.Anonymous(this.name+"("+c.map(function(a){return a.toCSS()}).join(", ")+")");try{return a.functions[this.name].apply(a.functions,c)}catch(d){throw{type:d.type||"Runtime",message:"error evaluating function `"+this.name+"`"+(d.message?": "+d.message:""),index:this.index,filename:this.filename}}},toCSS:function(a){return this.eval(a).toCSS()}}}(c("../tree")),function(a){a.Color=function(a,b){Array.isArray(a)?this.rgb=a:a.length==6?this.rgb=a.match(/.{2}/g).map(function(a){return parseInt(a,16)}):this.rgb=a.split("").map(function(a){return parseInt(a+a,16)}),this.alpha=typeof b=="number"?b:1},a.Color.prototype={eval:function(){return this},toCSS:function(){return this.alpha<1?"rgba("+this.rgb.map(function(a){return Math.round(a)}).concat(this.alpha).join(", ")+")":"#"+this.rgb.map(function(a){return a=Math.round(a),a=(a>255?255:a<0?0:a).toString(16),a.length===1?"0"+a:a}).join("")},operate:function(b,c){var d=[];c instanceof a.Color||(c=c.toColor());for(var e=0;e<3;e++)d[e]=a.operate(b,this.rgb[e],c.rgb[e]);return new a.Color(d,this.alpha+c.alpha)},toHSL:function(){var a=this.rgb[0]/255,b=this.rgb[1]/255,c=this.rgb[2]/255,d=this.alpha,e=Math.max(a,b,c),f=Math.min(a,b,c),g,h,i=(e+f)/2,j=e-f;if(e===f)g=h=0;else{h=i>.5?j/(2-e-f):j/(e+f);switch(e){case a:g=(b-c)/j+(b<c?6:0);break;case b:g=(c-a)/j+2;break;case c:g=(a-b)/j+4}g/=6}return{h:g*360,s:h,l:i,a:d}},toARGB:function(){var a=[Math.round(this.alpha*255)].concat(this.rgb);return"#"+a.map(function(a){return a=Math.round(a),a=(a>255?255:a<0?0:a).toString(16),a.length===1?"0"+a:a}).join("")}}}(c("../tree")),function(a){a.Comment=function(a,b){this.value=a,this.silent=!!b},a.Comment.prototype={toCSS:function(a){return a.compress?"":this.value},eval:function(){return this}}}(c("../tree")),function(a){a.Condition=function(a,b,c,d,e){this.op=a.trim(),this.lvalue=b,this.rvalue=c,this.index=d,this.negate=e},a.Condition.prototype.eval=function(a){var b=this.lvalue.eval(a),c=this.rvalue.eval(a),d=this.index,e,e=function(a){switch(a){case"and":return b&&c;case"or":return b||c;default:if(b.compare)e=b.compare(c);else{if(!c.compare)throw{type:"Type",message:"Unable to perform comparison",index:d};e=c.compare(b)}switch(e){case-1:return a==="<"||a==="=<";case 0:return a==="="||a===">="||a==="=<";case 1:return a===">"||a===">="}}}(this.op);return this.negate?!e:e}}(c("../tree")),function(a){a.Dimension=function(a,b){this.value=parseFloat(a),this.unit=b||null},a.Dimension.prototype={eval:function(){return this},toColor:function(){return new a.Color([this.value,this.value,this.value])},toCSS:function(){var a=this.value+this.unit;return a},operate:function(b,c){return new a.Dimension(a.operate(b,this.value,c.value),this.unit||c.unit)},compare:function(b){return b instanceof a.Dimension?b.value>this.value?-1:b.value<this.value?1:0:-1}}}(c("../tree")),function(a){a.Directive=function(b,c,d){this.name=b,this.features=d&&new a.Value(d),Array.isArray(c)?(this.ruleset=new a.Ruleset([],c),this.ruleset.allowImports=!0):this.value=c},a.Directive.prototype={toCSS:function(a,b){var c=this.features?" "+this.features.toCSS(b):"";return this.ruleset?(this.ruleset.root=!0,this.name+c+(b.compress?"{":" {\n  ")+this.ruleset.toCSS(a,b).trim().replace(/\n/g,"\n  ")+(b.compress?"}":"\n}\n")):this.name+" "+this.value.toCSS()+";\n"},eval:function(a){return this.features=this.features&&this.features.eval(a),a.frames.unshift(this),this.ruleset=this.ruleset&&this.ruleset.eval(a),a.frames.shift(),this},variable:function(b){return a.Ruleset.prototype.variable.call(this.ruleset,b)},find:function(){return a.Ruleset.prototype.find.apply(this.ruleset,arguments)},rulesets:function(){return a.Ruleset.prototype.rulesets.apply(this.ruleset)}}}(c("../tree")),function(a){a.Element=function(b,c,d){this.combinator=b instanceof a.Combinator?b:new a.Combinator(b),typeof c=="string"?this.value=c.trim():c?this.value=c:this.value="",this.index=d},a.Element.prototype.eval=function(b){return new a.Element(this.combinator,this.value.eval?this.value.eval(b):this.value,this.index)},a.Element.prototype.toCSS=function(a){return this.combinator.toCSS(a||{})+(this.value.toCSS?this.value.toCSS(a):this.value)},a.Combinator=function(a){a===" "?this.value=" ":a==="& "?this.value="& ":this.value=a?a.trim():""},a.Combinator.prototype.toCSS=function(a){return{"":""," ":" ","&":"","& ":" ",":":" :","::":"::","+":a.compress?"+":" + ","~":a.compress?"~":" ~ ",">":a.compress?">":" > "}[this.value]}}(c("../tree")),function(a){a.Expression=function(a){this.value=a},a.Expression.prototype={eval:function(b){return this.value.length>1?new a.Expression(this.value.map(function(a){return a.eval(b)})):this.value.length===1?this.value[0].eval(b):this},toCSS:function(a){return this.value.map(function(b){return b.toCSS?b.toCSS(a):""}).join(" ")}}}(c("../tree")),function(a){a.Import=function(b,c,d,e){var f=this;this.index=e,this._path=b,this.features=d&&new a.Value(d),b instanceof a.Quoted?this.path=/\.(le?|c)ss(\?.*)?$/.test(b.value)?b.value:b.value+".less":this.path=b.value.value||b.value,this.css=/css(\?.*)?$/.test(this.path),this.css||c.push(this.path,function(b,c){b&&(b.index=e),f.root=c||new a.Ruleset([],[])})},a.Import.prototype={toCSS:function(a){var b=this.features?" "+this.features.toCSS(a):"";return this.css?"@import "+this._path.toCSS()+b+";\n":""},eval:function(b){var c,d=this.features&&this.features.eval(b);if(this.css)return this;c=new a.Ruleset([],this.root.rules.slice(0));for(var e=0;e<c.rules.length;e++)c.rules[e]instanceof a.Import&&Array.prototype.splice.apply(c.rules,[e,1].concat(c.rules[e].eval(b)));return this.features?new 
a.Directive("@media",c.rules,this.features.value):c.rules}}}(c("../tree")),function(a){a.JavaScript=function(a,b,c){this.escaped=c,this.expression=a,this.index=b},a.JavaScript.prototype={eval:function(b){var c,d=this,e={},f=this.expression.replace(/@\{([\w-]+)\}/g,function(c,e){return a.jsify((new a.Variable("@"+e,d.index)).eval(b))});try{f=new Function("return ("+f+")")}catch(g){throw{message:"JavaScript evaluation error: `"+f+"`",index:this.index}}for(var h in b.frames[0].variables())e[h.slice(1)]={value:b.frames[0].variables()[h].value,toJS:function(){return this.value.eval(b).toCSS()}};try{c=f.call(e)}catch(g){throw{message:"JavaScript evaluation error: '"+g.name+": "+g.message+"'",index:this.index}}return typeof c=="string"?new a.Quoted('"'+c+'"',c,this.escaped,this.index):Array.isArray(c)?new a.Anonymous(c.join(", ")):new a.Anonymous(c)}}}(c("../tree")),function(a){a.Keyword=function(a){this.value=a},a.Keyword.prototype={eval:function(){return this},toCSS:function(){return this.value},compare:function(b){return b instanceof a.Keyword?b.value===this.value?0:1:-1}},a.True=new a.Keyword("true"),a.False=new a.Keyword("false")}(c("../tree")),function(a){a.mixin={},a.mixin.Call=function(b,c,d,e,f){this.selector=new a.Selector(b),this.arguments=c,this.index=d,this.filename=e,this.important=f},a.mixin.Call.prototype={eval:function(a){var b,c,d=[],e=!1;for(var f=0;f<a.frames.length;f++)if((b=a.frames[f].find(this.selector)).length>0){c=this.arguments&&this.arguments.map(function(b){return b.eval(a)});for(var g=0;g<b.length;g++)if(b[g].match(c,a))try{Array.prototype.push.apply(d,b[g].eval(a,this.arguments,this.important).rules),e=!0}catch(h){throw{message:h.message,index:h.index,filename:this.filename,stack:h.stack,call:this.index}}if(e)return d;throw{type:"Runtime",message:"No matching definition was found for `"+this.selector.toCSS().trim()+"("+this.arguments.map(function(a){return a.toCSS()}).join(", ")+")`",index:this.index,filename:this.filename}}throw{type:"Name",message:this.selector.toCSS().trim()+" is undefined",index:this.index,filename:this.filename}}},a.mixin.Definition=function(b,c,d,e){this.name=b,this.selectors=[new a.Selector([new a.Element(null,b)])],this.params=c,this.condition=e,this.arity=c.length,this.rules=d,this._lookups={},this.required=c.reduce(function(a,b){return!b.name||b.name&&!b.value?a+1:a},0),this.parent=a.Ruleset.prototype,this.frames=[]},a.mixin.Definition.prototype={toCSS:function(){return""},variable:function(a){return this.parent.variable.call(this,a)},variables:function(){return this.parent.variables.call(this)},find:function(){return this.parent.find.apply(this,arguments)},rulesets:function(){return this.parent.rulesets.apply(this)},evalParams:function(b,c){var d=new a.Ruleset(null,[]);for(var e=0,f;e<this.params.length;e++)if(this.params[e].name){if(!(f=c&&c[e]||this.params[e].value))throw{type:"Runtime",message:"wrong number of arguments for "+this.name+" ("+c.length+" for "+this.arity+")"};d.rules.unshift(new a.Rule(this.params[e].name,f.eval(b)))}return d},eval:function(b,c,d){var e=this.evalParams(b,c),f,g=[],h;for(var i=0;i<Math.max(this.params.length,c&&c.length);i++)g.push(c[i]||this.params[i].value);return e.rules.unshift(new a.Rule("@arguments",(new a.Expression(g)).eval(b))),h=d?this.rules.map(function(b){return new a.Rule(b.name,b.value,"!important",b.index)}):this.rules.slice(0),(new a.Ruleset(null,h)).eval({frames:[this,e].concat(this.frames,b.frames)})},match:function(a,b){var c=a&&a.length||0,d,e;if(c<this.required)return!1;if(this.required>0&&c>this.params.length)return!1;if(this.condition&&!this.condition.eval({frames:[this.evalParams(b,a)].concat(b.frames)}))return!1;d=Math.min(c,this.arity);for(var f=0;f<d;f++)if(!this.params[f].name&&a[f].eval(b).toCSS()!=this.params[f].value.eval(b).toCSS())return!1;return!0}}}(c("../tree")),function(a){a.Operation=function(a,b){this.op=a.trim(),this.operands=b},a.Operation.prototype.eval=function(b){var c=this.operands[0].eval(b),d=this.operands[1].eval(b),e;if(c instanceof a.Dimension&&d instanceof a.Color){if(this.op!=="*"&&this.op!=="+")throw{name:"OperationError",message:"Can't substract or divide a color from a number"};e=d,d=c,c=e}return c.operate(this.op,d)},a.operate=function(a,b,c){switch(a){case"+":return b+c;case"-":return b-c;case"*":return b*c;case"/":return b/c}}}(c("../tree")),function(a){a.Paren=function(a){this.value=a},a.Paren.prototype={toCSS:function(a){return"("+this.value.toCSS(a)+")"},eval:function(b){return new a.Paren(this.value.eval(b))}}}(c("../tree")),function(a){a.Quoted=function(a,b,c,d){this.escaped=c,this.value=b||"",this.quote=a.charAt(0),this.index=d},a.Quoted.prototype={toCSS:function(){return this.escaped?this.value:this.quote+this.value+this.quote},eval:function(b){var c=this,d=this.value.replace(/`([^`]+)`/g,function(d,e){return(new a.JavaScript(e,c.index,!0)).eval(b).value}).replace(/@\{([\w-]+)\}/g,function(d,e){var f=(new a.Variable("@"+e,c.index)).eval(b);return"value"in f?f.value:f.toCSS()});return new a.Quoted(this.quote+d+this.quote,d,this.escaped,this.index)}}}(c("../tree")),function(a){a.Rule=function(b,c,d,e,f){this.name=b,this.value=c instanceof a.Value?c:new a.Value([c]),this.important=d?" "+d.trim():"",this.index=e,this.inline=f||!1,b.charAt(0)==="@"?this.variable=!0:this.variable=!1},a.Rule.prototype.toCSS=function(a){return this.variable?"":this.name+(a.compress?":":": ")+this.value.toCSS(a)+this.important+(this.inline?"":";")},a.Rule.prototype.eval=function(b){return new a.Rule(this.name,this.value.eval(b),this.important,this.index,this.inline)},a.Shorthand=function(a,b){this.a=a,this.b=b},a.Shorthand.prototype={toCSS:function(a){return this.a.toCSS(a)+"/"+this.b.toCSS(a)},eval:function(){return this}}}(c("../tree")),function(a){a.Ruleset=function(a,b){this.selectors=a,this.rules=b,this._lookups={}},a.Ruleset.prototype={eval:function(b){var c=this.selectors&&this.selectors.map(function(a){return a.eval(b)}),d=new a.Ruleset(c,this.rules.slice(0));d.root=this.root,d.allowImports=this.allowImports,b.frames.unshift(d);if(d.root||d.allowImports)for(var e=0;e<d.rules.length;e++)d.rules[e]instanceof a.Import&&Array.prototype.splice.apply(d.rules,[e,1].concat(d.rules[e].eval(b)));for(var e=0;e<d.rules.length;e++)d.rules[e]instanceof a.mixin.Definition&&(d.rules[e].frames=b.frames.slice(0));for(var e=0;e<d.rules.length;e++)d.rules[e]instanceof a.mixin.Call&&Array.prototype.splice.apply(d.rules,[e,1].concat(d.rules[e].eval(b)));for(var e=0,f;e<d.rules.length;e++)f=d.rules[e],f instanceof a.mixin.Definition||(d.rules[e]=f.eval?f.eval(b):f);return b.frames.shift(),d},match:function(a){return!a||a.length===0},variables:function(){return this._variables?this._variables:this._variables=this.rules.reduce(function(b,c){return c instanceof a.Rule&&c.variable===!0&&(b[c.name]=c),b},{})},variable:function(a){return this.variables()[a]},rulesets:function(){return this._rulesets?this._rulesets:this._rulesets=this.rules.filter(function(b){return b instanceof a.Ruleset||b instanceof a.mixin.Definition})},find:function(b,c){c=c||this;var d=[],e,f,g=b.toCSS();return g in this._lookups?this._lookups[g]:(this.rulesets().forEach(function(e){if(e!==c)for(var g=0;g<e.selectors.length;g++)if(f=b.match(e.selectors[g])){b.elements.length>e.selectors[g].elements.length?Array.prototype.push.apply(d,e.find(new a.Selector(b.elements.slice(1)),c)):d.push(e);break}}),this._lookups[g]=d)},toCSS:function(b,c){var d=[],e=[],f=[],g=[],h,i;this.root||(b.length===0?g=this.selectors.map(function(a){return[a]}):this.joinSelectors(g,b,this.selectors));for(var j=0;j<this.rules.length;j++)i=this.rules[j],i.rules||i instanceof a.Directive?f.push(i.toCSS(g,c)):i instanceof a.Comment?i.silent||(this.root?f.push(i.toCSS(c)):e.push(i.toCSS(c))):i.toCSS&&!i.variable?e.push(i.toCSS(c)):i.value&&!i.variable&&e.push(i.value.toString());return f=f.join(""),this.root?d.push(e.join(c.compress?"":"\n")):e.length>0&&(h=g.map(function(a){return a.map(function(a){return a.toCSS(c)}).join("").trim()}).join(c.compress?",":",\n"),d.push(h,(c.compress?"{":" {\n  ")+e.join(c.compress?"":"\n  ")+(c.compress?"}":"\n}\n"))),d.push(f),d.join("")+(c.compress?"\n":"")},joinSelectors:function(a,b,c){for(var d=0;d<c.length;d++)this.joinSelector(a,b,c[d])},joinSelector:function(b,c,d){var e=[],f=[],g=[],h=[],i=!1,j;for(var k=0;k<d.elements.length;k++)j=d.elements[k],j.combinator.value.charAt(0)==="&"&&(i=!0),i?h.push(j):g.push(j);i||(h=g,g=[]),g.length>0&&e.push(new a.Selector(g)),h.length>0&&f.push(new a.Selector(h));for(var l=0;l<c.length;l++)b.push(e.concat(c[l]).concat(f))}}}(c("../tree")),function(a){a.Selector=function(a){this.elements=a,this.elements[0].combinator.value===""&&(this.elements[0].combinator.value=" ")},a.Selector.prototype.match=function(a){var b=this.elements.length,c=a.elements.length,d=Math.min(b,c);if(b<c)return!1;for(var e=0;e<d;e++)if(this.elements[e].value!==a.elements[e].value)return!1;return!0},a.Selector.prototype.eval=function(b){return new a.Selector(this.elements.map(function(a){return a.eval(b)}))},a.Selector.prototype.toCSS=function(a){return this._css?this._css:this._css=this.elements.map(function(b){return typeof b=="string"?" "+b.trim():b.toCSS(a)}).join("")}}(c("../tree")),function(b){b.URL=function(b,c){b.data?this.attrs=b:(typeof a!="undefined"&&!/^(?:https?:\/\/|file:\/\/|data:|\/)/.test(b.value)&&c.length>0&&(b.value=c[0]+(b.value.charAt(0)==="/"?b.value.slice(1):b.value)),this.value=b,this.paths=c)},b.URL.prototype={toCSS:function(){return"url("+(this.attrs?"data:"+this.attrs.mime+this.attrs.charset+this.attrs.base64+this.attrs.data:this.value.toCSS())+")"},eval:function(a){return this.attrs?this:new b.URL(this.value.eval(a),this.paths)}}}(c("../tree")),function(a){a.Value=function(a){this.value=a,this.is="value"},a.Value.prototype={eval:function(b){return this.value.length===1?this.value[0].eval(b):new a.Value(this.value.map(function(a){return a.eval(b)}))},toCSS:function(a){return this.value.map(function(b){return b.toCSS(a)}).join(a.compress?",":", ")}}}(c("../tree")),function(a){a.Variable=function(a,b,c){this.name=a,this.index=b,this.file=c},a.Variable.prototype={eval:function(b){var c,d,e=this.name;e.indexOf("@@")==0&&(e="@"+(new a.Variable(e.slice(1))).eval(b).value);if(c=a.find(b.frames,function(a){if(d=a.variable(e))return d.value.eval(b)}))return c;throw{type:"Name",message:"variable "+e+" is undefined",filename:this.file,index:this.index}}}}(c("../tree")),function(a){a.find=function(a,b){for(var c=0,d;c<a.length;c++)if(d=b.call(a,a[c]))return d;return null},a.jsify=function(a){return Array.isArray(a.value)&&a.value.length>1?"["+a.value.map(function(a){return a.toCSS(!1)}).join(", ")+"]":a.toCSS(!1)}}(c("./tree"));var g=location.protocol==="file:"||location.protocol==="chrome:"||location.protocol==="chrome-extension:"||location.protocol==="resource:";d.env=d.env||(location.hostname=="127.0.0.1"||location.hostname=="0.0.0.0"||location.hostname=="localhost"||location.port.length>0||g?"development":"production"),d.async=!1,d.poll=d.poll||(g?1e3:1500),d.watch=function(){return this.watchMode=!0},d.unwatch=function(){return this.watchMode=!1},d.env==="development"?(d.optimization=0,/!watch/.test(location.hash)&&d.watch(),d.watchTimer=setInterval(function(){d.watchMode&&n(function(a,b,c,d,e){b&&r(b.toCSS(),d,e.lastModified)})},d.poll)):d.optimization=3;var h;try{h=typeof a.localStorage=="undefined"?null:a.localStorage}catch(i){h=null}var j=document.getElementsByTagName("link"),k=/^text\/(x-)?less$/;d.sheets=[];for(var l=0;l<j.length;l++)(j[l].rel==="stylesheet/less"||j[l].rel.match(/stylesheet/)&&j[l].type.match(k))&&d.sheets.push(j[l]);d.refresh=function(a){var b,c;b=c=new Date,n(function(a,d,e,f,g){g.local?v("loading "+f.href+" from cache."):(v("parsed "+f.href+" successfully."),r(d.toCSS(),f,g.lastModified)),v("css for "+f.href+" generated in "+(new Date-c)+"ms"),g.remaining===0&&v("css generated in "+(new Date-b)+"ms"),c=new Date},a),m()},d.refreshStyles=m,d.refresh(d.env==="development")})(window);/*
 * jQuery UI Multilevel Accordion v.1
 * 
 * Copyright (c) 2011 Pieter Pareit
 *
 * http://www.scriptbreaker.com
 *
 */

//plugin definition
(function($){
    $.fn.extend({

    //pass the options variable to the function
    accordion: function(options) {
        
		var defaults = {
			accordion: 'false',
			speed: 300,
			closedSign: '[+]',
			openedSign: '[-]'
		};

		// Extend our default options with those provided.
		var opts = $.extend(defaults, options);
		//Assign current element to variable, in this case is UL element
 		var $this = $(this);
 		
 		//add a mark [+] to a multilevel menu
 		$this.find("li").each(function() {
 			if($(this).find("ul").size() != 0){
 				//add the multilevel sign next to the link
 				$(this).find("a:first").after("<em>"+ opts.closedSign +"</em>");
 				
 				//avoid jumping to the top of the page when the href is an #
 				if($(this).find("a:first").attr('href') == "#"){
 		  			$(this).find("a:first").click(function(){return false;});
 		  		}
 			}
 		});

 		//open active level
 	//	$this.find("li.active").each(function() {
 //			$(this).parents("ul").slideDown(opts.speed);
 //			$(this).parents("ul").parent("li").find("em:first").html(opts.openedSign);
 //		});

  		$this.find("li em").click(function() {
  			if($(this).parent().find("ul").size() != 0){
  				if(opts.accordion){
  					//Do nothing when the list is open
  					if(!$(this).parent().find("ul").is(':visible')){
  						parents = $(this).parent().parents("ul");
  						visible = $this.find("ul:visible");
  						visible.each(function(visibleIndex){
  							var close = true;
  							parents.each(function(parentIndex){
  								if(parents[parentIndex] == visible[visibleIndex]){
  									close = false;
  									return false;
  								}
  							});
  							if(close){
  								if($(this).parent().find("ul") != visible[visibleIndex]){
  									$(visible[visibleIndex]).slideUp(opts.speed, function(){
  										$(this).parent("li").find("em:first").html(opts.closedSign);
  									});
  									
  								}
  							}
  						});
  					}
  				}
  				if($(this).parent().find("ul:first").is(":visible")){
  					$(this).parent().find("ul:first").slideUp(opts.speed, function(){
  						$(this).parent("li").find("em:first").delay(opts.speed).html(opts.closedSign);
  					});
  					
  					
  				}else{
  					$(this).parent().find("ul:first").slideDown(opts.speed, function(){
  						$(this).parent("li").find("em:first").delay(opts.speed).html(opts.openedSign);
  					});
  				}
  			}
  		});
    }
});
})(jQuery);/*!
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */

(function(g){var q={vertical:!1,rtl:!1,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,setupCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,animationStepCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click", buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},m=!1;g(window).bind("load.jcarousel",function(){m=!0});g.jcarousel=function(a,c){this.options=g.extend({},q,c||{});this.autoStopped=this.locked=!1;this.buttonPrevState=this.buttonNextState=this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!c||c.rtl===void 0)this.options.rtl=(g(a).attr("dir")||g("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical? this.options.rtl?"right":"left":"top";for(var b="",d=a.className.split(" "),f=0;f<d.length;f++)if(d[f].indexOf("jcarousel-skin")!=-1){g(a).removeClass(d[f]);b=d[f];break}a.nodeName.toUpperCase()=="UL"||a.nodeName.toUpperCase()=="OL"?(this.list=g(a),this.clip=this.list.parents(".jcarousel-clip"),this.container=this.list.parents(".jcarousel-container")):(this.container=g(a),this.list=this.container.find("ul,ol").eq(0),this.clip=this.container.find(".jcarousel-clip"));if(this.clip.size()===0)this.clip= this.list.wrap("<div></div>").parent();if(this.container.size()===0)this.container=this.clip.wrap("<div></div>").parent();b!==""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1&&this.container.wrap('<div class=" '+b+'"></div>');this.buttonPrev=g(".jcarousel-prev",this.container);if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null)this.buttonPrev=g(this.options.buttonPrevHTML).appendTo(this.container);this.buttonPrev.addClass(this.className("jcarousel-prev"));this.buttonNext= g(".jcarousel-next",this.container);if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null)this.buttonNext=g(this.options.buttonNextHTML).appendTo(this.container);this.buttonNext.addClass(this.className("jcarousel-next"));this.clip.addClass(this.className("jcarousel-clip")).css({position:"relative"});this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jcarousel-container")).css({position:"relative"}); !this.options.vertical&&this.options.rtl&&this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl");var j=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null,b=this.list.children("li"),e=this;if(b.size()>0){var h=0,i=this.options.offset;b.each(function(){e.format(this,i++);h+=e.dimension(this,j)});this.list.css(this.wh,h+100+"px");if(!c||c.size===void 0)this.options.size=b.size()}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display", "block");this.funcNext=function(){e.next()};this.funcPrev=function(){e.prev()};this.funcResize=function(){e.resizeTimer&&clearTimeout(e.resizeTimer);e.resizeTimer=setTimeout(function(){e.reload()},100)};this.options.initCallback!==null&&this.options.initCallback(this,"init");!m&&g.browser.safari?(this.buttons(!1,!1),g(window).bind("load.jcarousel",function(){e.setup()})):this.setup()};var f=g.jcarousel;f.fn=f.prototype={jcarousel:"0.2.8"};f.fn.extend=f.extend=g.extend;f.fn.extend({setup:function(){this.prevLast= this.prevFirst=this.last=this.first=null;this.animating=!1;this.tail=this.resizeTimer=this.timer=null;this.inTail=!1;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var a=this.pos(this.options.start,!0);this.prevFirst=this.prevLast=null;this.animate(a,!1);g(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize);this.options.setupCallback!==null&&this.options.setupCallback(this)}},reset:function(){this.list.empty();this.list.css(this.lt, "0px");this.list.css(this.wh,"10px");this.options.initCallback!==null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!==null&&this.inTail&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=!1;this.options.reloadCallback!==null&&this.options.reloadCallback(this);if(this.options.visible!==null){var a=this,c=Math.ceil(this.clipping()/this.options.visible),b=0,d=0;this.list.children("li").each(function(f){b+=a.dimension(this, c);f+1<a.first&&(d=b)});this.list.css(this.wh,b+"px");this.list.css(this.lt,-d+"px")}this.scroll(this.first,!1)},lock:function(){this.locked=!0;this.buttons()},unlock:function(){this.locked=!1;this.buttons()},size:function(a){if(a!==void 0)this.options.size=a,this.locked||this.buttons();return this.options.size},has:function(a,c){if(c===void 0||!c)c=a;if(this.options.size!==null&&c>this.options.size)c=this.options.size;for(var b=a;b<=c;b++){var d=this.get(b);if(!d.length||d.hasClass("jcarousel-item-placeholder"))return!1}return!0}, get:function(a){return g(">.jcarousel-item-"+a,this.list)},add:function(a,c){var b=this.get(a),d=0,p=g(c);if(b.length===0)for(var j,e=f.intval(a),b=this.create(a);;){if(j=this.get(--e),e<=0||j.length){e<=0?this.list.prepend(b):j.after(b);break}}else d=this.dimension(b);p.get(0).nodeName.toUpperCase()=="LI"?(b.replaceWith(p),b=p):b.empty().append(c);this.format(b.removeClass(this.className("jcarousel-item-placeholder")),a);p=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible): null;d=this.dimension(b,p)-d;a>0&&a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))-d+"px");this.list.css(this.wh,f.intval(this.list.css(this.wh))+d+"px");return b},remove:function(a){var c=this.get(a);if(c.length&&!(a>=this.first&&a<=this.last)){var b=this.dimension(c);a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+b+"px");c.remove();this.list.css(this.wh,f.intval(this.list.css(this.wh))-b+"px")}},next:function(){this.tail!==null&&!this.inTail?this.scrollTail(!1): this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.tail!==null&&this.inTail?this.scrollTail(!0):this.scroll((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(!this.locked&&!this.animating&&this.tail){this.pauseAuto();var c=f.intval(this.list.css(this.lt)), c=!a?c-this.tail:c+this.tail;this.inTail=!a;this.prevFirst=this.first;this.prevLast=this.last;this.animate(c)}},scroll:function(a,c){!this.locked&&!this.animating&&(this.pauseAuto(),this.animate(this.pos(a),c))},pos:function(a,c){var b=f.intval(this.list.css(this.lt));if(this.locked||this.animating)return b;this.options.wrap!="circular"&&(a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a);for(var d=this.first>a,g=this.options.wrap!="circular"&&this.first<=1?1:this.first,j=d?this.get(g): this.get(this.last),e=d?g:g-1,h=null,i=0,k=!1,l=0;d?--e>=a:++e<a;){h=this.get(e);k=!h.length;if(h.length===0&&(h=this.create(e).addClass(this.className("jcarousel-item-placeholder")),j[d?"before":"after"](h),this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)));j=h;l=this.dimension(h);k&&(i+=l);if(this.first!==null&&(this.options.wrap=="circular"||e>=1&&(this.options.size===null||e<= this.options.size)))b=d?b+l:b-l}for(var g=this.clipping(),m=[],o=0,n=0,j=this.get(a-1),e=a;++o;){h=this.get(e);k=!h.length;if(h.length===0){h=this.create(e).addClass(this.className("jcarousel-item-placeholder"));if(j.length===0)this.list.prepend(h);else j[d?"before":"after"](h);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)))}j=h;l=this.dimension(h);if(l===0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting..."); this.options.wrap!="circular"&&this.options.size!==null&&e>this.options.size?m.push(h):k&&(i+=l);n+=l;if(n>=g)break;e++}for(h=0;h<m.length;h++)m[h].remove();i>0&&(this.list.css(this.wh,this.dimension(this.list)+i+"px"),d&&(b-=i,this.list.css(this.lt,f.intval(this.list.css(this.lt))-i+"px")));i=a+o-1;if(this.options.wrap!="circular"&&this.options.size&&i>this.options.size)i=this.options.size;if(e>i){o=0;e=i;for(n=0;++o;){h=this.get(e--);if(!h.length)break;n+=this.dimension(h);if(n>=g)break}}e=i-o+ 1;this.options.wrap!="circular"&&e<1&&(e=1);if(this.inTail&&d)b+=this.tail,this.inTail=!1;this.tail=null;if(this.options.wrap!="circular"&&i==this.options.size&&i-o+1>=1&&(d=f.intval(this.get(i).css(!this.options.vertical?"marginRight":"marginBottom")),n-d>g))this.tail=n-g-d;if(c&&a===this.options.size&&this.tail)b-=this.tail,this.inTail=!0;for(;a-- >e;)b+=this.dimension(this.get(a));this.prevFirst=this.first;this.prevLast=this.last;this.first=e;this.last=i;return b},animate:function(a,c){if(!this.locked&& !this.animating){this.animating=!0;var b=this,d=function(){b.animating=!1;a===0&&b.list.css(b.lt,0);!b.autoStopped&&(b.options.wrap=="circular"||b.options.wrap=="both"||b.options.wrap=="last"||b.options.size===null||b.last<b.options.size||b.last==b.options.size&&b.tail!==null&&!b.inTail)&&b.startAuto();b.buttons();b.notify("onAfterAnimation");if(b.options.wrap=="circular"&&b.options.size!==null)for(var c=b.prevFirst;c<=b.prevLast;c++)c!==null&&!(c>=b.first&&c<=b.last)&&(c<1||c>b.options.size)&&b.remove(c)}; this.notify("onBeforeAnimation");if(!this.options.animation||c===!1)this.list.css(this.lt,a+"px"),d();else{var f=!this.options.vertical?this.options.rtl?{right:a}:{left:a}:{top:a},d={duration:this.options.animation,easing:this.options.easing,complete:d};if(g.isFunction(this.options.animationStepCallback))d.step=this.options.animationStepCallback;this.list.animate(f,d)}}},startAuto:function(a){if(a!==void 0)this.options.auto=a;if(this.options.auto===0)return this.stopAuto();if(this.timer===null){this.autoStopped= !1;var c=this;this.timer=window.setTimeout(function(){c.next()},this.options.auto*1E3)}},stopAuto:function(){this.pauseAuto();this.autoStopped=!0},pauseAuto:function(){if(this.timer!==null)window.clearTimeout(this.timer),this.timer=null},buttons:function(a,c){if(a==null&&(a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size===null||this.last<this.options.size),!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!==null&& this.last>=this.options.size))a=this.tail!==null&&!this.inTail;if(c==null&&(c=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1),!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1))c=this.tail!==null&&this.inTail;var b=this;this.buttonNext.size()>0?(this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext),a&&this.buttonNext.bind(this.options.buttonNextEvent+".jcarousel",this.funcNext), this.buttonNext[a?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",a?!1:!0),this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){b.options.buttonNextCallback(b,this,a)}).data("jcarouselstate",a)):this.options.buttonNextCallback!==null&&this.buttonNextState!=a&&this.options.buttonNextCallback(b,null,a);this.buttonPrev.size()>0?(this.buttonPrev.unbind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev), c&&this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev),this.buttonPrev[c?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",c?!1:!0),this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=c&&this.buttonPrev.each(function(){b.options.buttonPrevCallback(b,this,c)}).data("jcarouselstate",c)):this.options.buttonPrevCallback!==null&&this.buttonPrevState!=c&&this.options.buttonPrevCallback(b,null,c);this.buttonNextState= a;this.buttonPrevState=c},notify:function(a){var c=this.prevFirst===null?"init":this.prevFirst<this.first?"next":"prev";this.callback("itemLoadCallback",a,c);this.prevFirst!==this.first&&(this.callback("itemFirstInCallback",a,c,this.first),this.callback("itemFirstOutCallback",a,c,this.prevFirst));this.prevLast!==this.last&&(this.callback("itemLastInCallback",a,c,this.last),this.callback("itemLastOutCallback",a,c,this.prevLast));this.callback("itemVisibleInCallback",a,c,this.first,this.last,this.prevFirst, this.prevLast);this.callback("itemVisibleOutCallback",a,c,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(a,c,b,d,f,j,e){if(!(this.options[a]==null||typeof this.options[a]!="object"&&c!="onAfterAnimation")){var h=typeof this.options[a]=="object"?this.options[a][c]:this.options[a];if(g.isFunction(h)){var i=this;if(d===void 0)h(i,b,c);else if(f===void 0)this.get(d).each(function(){h(i,this,d,b,c)});else for(var a=function(a){i.get(a).each(function(){h(i,this,a,b,c)})},k=d;k<=f;k++)k!== null&&!(k>=j&&k<=e)&&a(k)}}},create:function(a){return this.format("<li></li>",a)},format:function(a,c){for(var a=g(a),b=a.get(0).className.split(" "),d=0;d<b.length;d++)b[d].indexOf("jcarousel-")!=-1&&a.removeClass(b[d]);a.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+c)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",c);return a},className:function(a){return a+" "+a+(!this.options.vertical?"-horizontal":"-vertical")}, dimension:function(a,c){var b=g(a);if(c==null)return!this.options.vertical?b.outerWidth(!0)||f.intval(this.options.itemFallbackDimension):b.outerHeight(!0)||f.intval(this.options.itemFallbackDimension);else{var d=!this.options.vertical?c-f.intval(b.css("marginLeft"))-f.intval(b.css("marginRight")):c-f.intval(b.css("marginTop"))-f.intval(b.css("marginBottom"));g(b).css(this.wh,d+"px");return this.dimension(b)}},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-f.intval(this.clip.css("borderLeftWidth"))- f.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-f.intval(this.clip.css("borderTopWidth"))-f.intval(this.clip.css("borderBottomWidth"))},index:function(a,c){if(c==null)c=this.options.size;return Math.round(((a-1)/c-Math.floor((a-1)/c))*c)+1}});f.extend({defaults:function(a){return g.extend(q,a||{})},intval:function(a){a=parseInt(a,10);return isNaN(a)?0:a},windowLoaded:function(){m=!0}});g.fn.jcarousel=function(a){if(typeof a=="string"){var c=g(this).data("jcarousel"),b=Array.prototype.slice.call(arguments, 1);return c[a].apply(c,b)}else return this.each(function(){var b=g(this).data("jcarousel");b?(a&&g.extend(b.options,a),b.reload()):g(this).data("jcarousel",new f(this,a))})}})(jQuery);

// Multi-Zoom Script (c)2012 John Davenport Scheuer
// as first seen in http://www.dynamicdrive.com/forums/
// username: jscheuer1 - This Notice Must Remain for Legal Use
// requires: a modified version of Dynamic Drive's Featured Image Zoomer (w/ adjustable power) (included)

/*Featured Image Zoomer (May 8th, 2010)
* This notice must stay intact for usage 
* Author: Dynamic Drive at http://www.dynamicdrive.com/
* Visit http://www.dynamicdrive.com/ for full source code
*/

// Feb 21st, 2011: Script updated to v1.5, which now includes new feature by jscheuer1 (http://www.dynamicdrive.com/forums/member.php?u=2033) to show optional "magnifying lens" while over thumbnail image.
// March 1st, 2011: Script updated to v1.51. Minor improvements to inner workings of script.
// July 9th, 12': Script updated to v1.5.1, which fixes mouse wheel issue with script when used with a more recent version of jQuery.
// Nov 5th, 2012: Unofficial update to v1.5.1m for integration with multi-zoom (adds multiple images to be zoomed via thumbnail activated image swapping)
// Nov 28th, 2012: Version 2.1 w/Multi Zoom, updates - new features and bug fixes

var featuredimagezoomer = { // the two options for Featured Image Zoomer:
	loadinggif: 'spinningred.gif', // full path or URL to "loading" gif
	magnifycursor: 'crosshair' // value for CSS's 'cursor' property when over the zoomable image
};

	//////////////// No Need To Edit Beyond Here ////////////////

jQuery.noConflict();

(function($){

	$('head').append('<style type="text/css">.featuredimagezoomerhidden {visibility: hidden!important;}</style>');

	$.fn.multizoomhide = function(){
		return $('<style type="text/css">' + this.selector + ' {visibility: hidden;}<\/style>').appendTo('head');
	};

	$.fn.addmultizoom = function(options){

		var indoptions = {largeimage: options.largeimage}, $imgObj = $(options.imgObj + ':not(".thumbs")'),
		$descArea = $(options.descArea), first = true, splitre = /, ?/;

		options = $.extend({
				speed: 'slow',
				initzoomablefade: true,
				zoomablefade: true
			}, options);

		function loadfunction(){
			var lnk = this, styleobj1 = {}, styleobj2 = {}, $nim, lnkd, lnkt, lnko, w, h;
			if((lnkd = lnk.getAttribute('data-dims'))){
				lnkd = lnkd.split(splitre);
				w = lnkd[0]; h = lnkd[1];
			}
			$(new Image()).error(function(){
				if(lnk.tagName && !options.notmulti){
					alert("Error: I couldn't find the image:\n\n" + lnk.href + ((lnkt = lnk.getAttribute('data-title'))? '\n\n"' + lnkt + '"' : ''));
					if((lnko = $imgObj.data('last-trigger'))){
						first = true;
						$(lnko).trigger('click');
					}
				}
			}).load(function(){
				var opacity = $imgObj.css('opacity'), combinedoptions = {}, $parent;
				if(isNaN(opacity)){opacity = 1;}
				if(options.notmulti || !indoptions.largeimage){
					w = options.width || $imgObj.width(); h = options.height || $imgObj.height();
				}
				$imgObj.attr('src', this.src).css({width: w || options.width || this.width, height: (h = +(h || options.height || this.height))});
				if($imgObj.data('added')) {$imgObj.data('added').remove()};
				$imgObj.data('last-trigger', lnk);
				if(options.imagevertcenter){styleobj1 = {top: ($imgObj.parent().innerHeight() - h) / 2};}
				$imgObj.css(styleobj1).addimagezoom($.extend(combinedoptions, options, indoptions))
					.data('added', $('.magnifyarea:last' + (combinedoptions.cursorshade? ', .cursorshade:last' : '') + ', .zoomstatus:last, .zoomtracker:last'));
				if(options.magvertcenter){
					$('.magnifyarea:last').css({marginTop: (h - $('.magnifyarea:last').height()) / 2});
				}
				if(options.descpos){
					$parent = $imgObj.parent();
					styleobj2 = {left: $parent.offset().left + ($parent.outerWidth() - $parent.width()) / 2, top: h + $imgObj.offset().top};
				}
				if(options.notmulti){
					$descArea.css(styleobj2);
				} else {
					$descArea.css(styleobj2).empty().append(lnk.getAttribute('data-title') || '');
				}
				if(+opacity < 1){$imgObj.add($descArea).animate({opacity: 1}, options.speed);}
			}).attr('src', $imgObj.data('src'));
		}

		this.click(function(e){
			e.preventDefault();
			var src = $imgObj.attr('src'), ms, zr, cs, opacityObj = {opacity: 0};
			if(!first && (src === this.href || src === this.getAttribute('href'))){return;}
			if(first && !options.initzoomablefade || !options.zoomablefade){opacityObj = {};}
			first = false;
			indoptions.largeimage = this.getAttribute('data-large') || options.largeimage || '';
			if(indoptions.largeimage === 'none'){indoptions.largeimage = '';}
			if((ms = this.getAttribute('data-magsize')) || options.magnifiersize){
				indoptions.magnifiersize = (ms? ms.split(splitre) : '') || options.magnifiersize;
			} else {delete indoptions.magnifiersize;}
			indoptions.zoomrange = ((zr = this.getAttribute('data-zoomrange'))? (zr = zr.split(splitre)) : '') || options.zoomrange || '';
			if(zr){zr[0] = +zr[0]; zr[1] = +zr[1];}
			indoptions.cursorshade = ((cs = this.getAttribute('data-lens'))? cs : '') || options.cursorshade || '';
			if(cs){indoptions.cursorshade = eval(cs);}
			$imgObj.data('added') &&
				$imgObj.stop(true, true).data('added').not('.zoomtracker').remove().end()
					.css({background: 'url(' + featuredimagezoomer.loadinggif + ') center no-repeat'});
			$imgObj.css($.extend({visibility: 'visible'}, ($imgObj.data('added')? options.zoomablefade? {opacity: 0.25} : opacityObj : opacityObj))).data('src', this.href);
			$descArea.css($.extend({visibility: 'visible'}, opacityObj));
			loadfunction.call(this);
		}).eq(0).trigger('click');

		return this;
	};

	// Featured Image Zoomer main code:

	$.extend(featuredimagezoomer, {

		dsetting: { //default settings
				magnifierpos: 'right',
				magnifiersize:[200, 200],
				cursorshadecolor: '#fff',
				cursorshadeopacity: 0.3,
				cursorshadeborder: '1px solid black',
				cursorshade: false,
				leftoffset: 15, //offsets here are used (added to) the width of the magnifyarea when
				rightoffset: 10 //calculating space requirements and to position it visa vis any drop shadow
			},

		isie: (function(){/*@cc_on @*//*@if(@_jscript_version >= 5)return true;@end @*/return false;})(), //is this IE?

		showimage: function($tracker, $mag, showstatus){
			var specs=$tracker.data('specs'), d=specs.magpos, fiz=this;
			var coords=$tracker.data('specs').coords //get coords of tracker (from upper corner of document)
			specs.windimensions={w:$(window).width(), h:$(window).height()}; //remember window dimensions
			var magcoords={} //object to store coords magnifier DIV should move to
			magcoords.left = coords.left + (d === 'left'? -specs.magsize.w - specs.lo : $tracker.width() + specs.ro);
			//switch sides for magnifiers that don't have enough room to display on the right if there's room on the left:
			if(d!=='left' && magcoords.left + specs.magsize.w + specs.lo >= specs.windimensions.w && coords.left - specs.magsize.w >= specs.lo){
				magcoords.left = coords.left - specs.magsize.w - specs.lo;
			} else if(d==='left' && magcoords.left < specs.ro) { //if there's no room on the left, move to the right
				magcoords.left = coords.left + $tracker.width() + specs.ro;
			}
			$mag.css({left: magcoords.left, top:coords.top}).show(); //position magnifier DIV on page
			specs.$statusdiv.html('Current Zoom: '+specs.curpower+'<div style="font-size:80%">Use Mouse Wheel to Zoom In/Out</div>');
			if (showstatus) //show status DIV? (only when a range of zoom is defined)
				fiz.showstatusdiv(specs, 400, 2000);
		},

		hideimage: function($tracker, $mag, showstatus){
			var specs=$tracker.data('specs');
			$mag.hide();
			if (showstatus)
				this.hidestatusdiv(specs);
		},

		showstatusdiv: function(specs, fadedur, showdur){
			clearTimeout(specs.statustimer)
			specs.$statusdiv.css({visibility: 'visible'}).fadeIn(fadedur) //show status div
			specs.statustimer=setTimeout(function(){featuredimagezoomer.hidestatusdiv(specs)}, showdur) //hide status div after delay
		},

		hidestatusdiv: function(specs){
			specs.$statusdiv.stop(true, true).hide()
		},

		getboundary: function(b, val, specs){ //function to set x and y boundaries magnified image can move to (moved outside moveimage for efficiency)
			if (b=="left"){
				var rb=-specs.imagesize.w*specs.curpower+specs.magsize.w
				return (val>0)? 0 : (val<rb)? rb : val
			}
			else{
				var tb=-specs.imagesize.h*specs.curpower+specs.magsize.h
				return (val>0)? 0 : (val<tb)? tb : val
			}
		},

		moveimage: function($tracker, $maginner, $cursorshade, e){
			var specs=$tracker.data('specs'), csw = Math.round(specs.magsize.w/specs.curpower), csh = Math.round(specs.magsize.h/specs.curpower),
			csb = specs.csborder, fiz = this, imgcoords=specs.coords, pagex=(e.pageX || specs.lastpagex), pagey=(e.pageY || specs.lastpagey),
			x=pagex-imgcoords.left, y=pagey-imgcoords.top;
			$cursorshade.css({ // keep shaded area sized and positioned proportionately to area being magnified
				visibility: '',
				width: csw,
				height: csh,
				top: Math.min(specs.imagesize.h-csh-csb, Math.max(0, y-(csb+csh)/2)) + imgcoords.top,
				left: Math.min(specs.imagesize.w-csw-csb, Math.max(0, x-(csb+csw)/2)) + imgcoords.left
			});
			var newx=-x*specs.curpower+specs.magsize.w/2 //calculate x coord to move enlarged image
			var newy=-y*specs.curpower+specs.magsize.h/2
			$maginner.css({left:fiz.getboundary('left', newx, specs), top:fiz.getboundary('top', newy, specs)})
			specs.$statusdiv.css({left:pagex-10, top:pagey+20})
			specs.lastpagex=pagex //cache last pagex value (either e.pageX or lastpagex), as FF1.5 returns undefined for e.pageX for "DOMMouseScroll" event
			specs.lastpagey=pagey
		},

		magnifyimage: function($tracker, e, zoomrange){
			if (!e.detail && !e.wheelDelta){e = e.originalEvent;}
			var delta=e.detail? e.detail*(-120) : e.wheelDelta //delta returns +120 when wheel is scrolled up, -120 when scrolled down
			var zoomdir=(delta<=-120)? "out" : "in"
			var specs=$tracker.data('specs')
			var magnifier=specs.magnifier, od=specs.imagesize, power=specs.curpower
			var newpower=(zoomdir=="in")? Math.min(power+1, zoomrange[1]) : Math.max(power-1, zoomrange[0]) //get new power
			var nd=[od.w*newpower, od.h*newpower] //calculate dimensions of new enlarged image within magnifier
			magnifier.$image.css({width:nd[0], height:nd[1]})
			specs.curpower=newpower //set current power to new power after magnification
			specs.$statusdiv.html('Current Zoom: '+specs.curpower)
			this.showstatusdiv(specs, 0, 500)
			$tracker.trigger('mousemove')
		},

		highestzindex: function($img){
			var z = 0, $els = $img.parents().add($img), elz;
			$els.each(function(){
				elz = $(this).css('zIndex');
				elz = isNaN(elz)? 0 : +elz;
				z = Math.max(z, elz);
			});
			return z;
		},

		init: function($img, options){
			var setting=$.extend({}, this.dsetting, options), w = $img.width(), h = $img.height(), o = $img.offset(),
			fiz = this, $tracker, $cursorshade, $statusdiv, $magnifier, lastpage = {pageX: 0, pageY: 0},
			basezindex = setting.zIndex || this.highestzindex($img);
			if(h === 0 || w === 0){
				$(new Image()).load(function(){
					featuredimagezoomer.init($img, options);
				}).attr('src', $img.attr('src'));
				return;
			}
			$img.css({visibility: 'visible'});
			setting.largeimage = setting.largeimage || $img.get(0).src;
			$magnifier=$('<div class="magnifyarea" style="position:absolute;z-index:'+basezindex+';width:'+setting.magnifiersize[0]+'px;height:'+setting.magnifiersize[1]+'px;left:-10000px;top:-10000px;visibility:hidden;overflow:hidden;border:1px solid black;" />')
				.append('<div style="position:relative;left:0;top:0;z-index:'+basezindex+';" />')
				.appendTo(document.body) //create magnifier container
			//following lines - create featured image zoomer divs, and absolutely positioned them for placement over the thumbnail and each other:
			if(setting.cursorshade){
				$cursorshade = $('<div class="cursorshade" style="visibility:hidden;position:absolute;left:0;top:0;z-index:'+basezindex+';" />')
					.css({border: setting.cursorshadeborder, opacity: setting.cursorshadeopacity, backgroundColor: setting.cursorshadecolor})
					.appendTo(document.body);
			} else { 
				$cursorshade = $('<div />'); //dummy shade div to satisfy $tracker.data('specs')
			}
			$statusdiv = $('<div class="zoomstatus preloadevt" style="position:absolute;visibility:hidden;left:0;top:0;z-index:'+basezindex+';" />')
				.html('<img src="'+this.loadinggif+'" />')
				.appendTo(document.body); //create DIV to show "loading" gif/ "Current Zoom" info
			$tracker = $('<div class="zoomtracker" style="cursor:progress;position:absolute;z-index:'+basezindex+';left:'+o.left+'px;top:'+o.top+'px;height:'+h+'px;width:'+w+'px;" />')
				.css({backgroundImage: (this.isie? 'url(cannotbe)' : 'none')})
				.appendTo(document.body);
			$(window).bind('load resize', function(){ //in case resizing the window repostions the image or description
					var o = $img.offset(), $parent;
					$tracker.css({left: o.left, top: o.top});
					if(options.descpos && options.descArea){
						$parent = $img.parent();
						$(options.descArea).css({left: $parent.offset().left + ($parent.outerWidth() - $parent.width()) / 2, top: $img.height() + o.top});
					}
				});

			function getspecs($maginner, $bigimage){ //get specs function
				var magsize={w:$magnifier.width(), h:$magnifier.height()}
				var imagesize={w:w, h:h}
				var power=(setting.zoomrange)? setting.zoomrange[0] : ($bigimage.width()/w).toFixed(5)
				$tracker.data('specs', {
					$statusdiv: $statusdiv,
					statustimer: null,
					magnifier: {$outer:$magnifier, $inner:$maginner, $image:$bigimage},
					magsize: magsize,
					magpos: setting.magnifierpos,
					imagesize: imagesize,
					curpower: power,
					coords: getcoords(),
					csborder: $cursorshade.outerWidth(),
					lo: setting.leftoffset,
					ro: setting.rightoffset
				})
			}

			function getcoords(){ //get coords of thumb image function
				var offset=$tracker.offset() //get image's tracker div's offset from document
				return {left:offset.left, top:offset.top}
			}

			$tracker.mouseover(function(e){
						$cursorshade.add($magnifier).add($statusdiv).removeClass('featuredimagezoomerhidden');
						$tracker.data('premouseout', false);
				}).mouseout(function(e){
						$cursorshade.add($magnifier).add($statusdiv.not('.preloadevt')).addClass('featuredimagezoomerhidden');
						$tracker.data('premouseout', true);
				}).mousemove(function(e){ //save tracker mouse position for initial magnifier appearance, if needed
					lastpage.pageX = e.pageX;
					lastpage.pageY = e.pageY;
				});

			$tracker.one('mouseover', function(e){
				var $maginner=$magnifier.find('div:eq(0)')
				var $bigimage=$('<img src="'+setting.largeimage+'"/>').appendTo($maginner)
				var largeloaded = featuredimagezoomer.loaded[$('<a href="'+setting.largeimage+'"></a>').get(0).href];
				var showstatus=setting.zoomrange && setting.zoomrange[1]>setting.zoomrange[0]
				var imgcoords=getcoords()
				if(!largeloaded){
					$img.stop(true, true).css({opacity:0.1}) //"dim" image while large image is loading
					$statusdiv.css({left:imgcoords.left+w/2-$statusdiv.width()/2, top:imgcoords.top+h/2-$statusdiv.height()/2, visibility:'visible'})
				}
				$bigimage.bind('loadevt', function(event, e){ //magnified image ONLOAD event function (to be triggered later)
					if(e.type === 'error'){
						$img.css({opacity: 1}).data('added').remove();
						var src = $('<a href="' + $bigimage.attr('src') + '"></a>').get(0).href;
						if(window.console && console.error){
							console.error('Cannot find Featured Image Zoomer larger image: ' + src);
						} else {
							alert('Cannot find Featured Image Zoomer larger image:\n\n' + src);
						}
						return;
					}
					featuredimagezoomer.loaded[this.src] = true;
					$img.css({opacity:1}) //restore thumb image opacity
					$statusdiv.empty().css({border:'1px solid black', background:'#C0C0C0', padding:'4px', font:'bold 13px Arial', opacity:0.8}).hide().removeClass('preloadevt');
					if($tracker.data('premouseout')){
						$statusdiv.addClass('featuredimagezoomerhidden');
					}
					if (setting.zoomrange){ //if set large image to a specific power
						var nd=[w*setting.zoomrange[0], h*setting.zoomrange[0]] //calculate dimensions of new enlarged image
						$bigimage.css({width:nd[0], height:nd[1]})
					}
					getspecs($maginner, $bigimage) //remember various info about thumbnail and magnifier
					$magnifier.css({display:'none', visibility:'visible'})
					$tracker.mouseover(function(e){ //image onmouseover
						$tracker.data('specs').coords=getcoords() //refresh image coords (from upper left edge of document)
						fiz.showimage($tracker, $magnifier, showstatus)
					})
					$tracker.mousemove(function(e){ //image onmousemove
						fiz.moveimage($tracker, $maginner, $cursorshade, e)
					})
					if (!$tracker.data('premouseout')){
						fiz.showimage($tracker, $magnifier, showstatus);
						fiz.moveimage($tracker, $maginner, $cursorshade, lastpage);
					}
					$tracker.mouseout(function(e){ //image onmouseout
						fiz.hideimage($tracker, $magnifier, showstatus)
					}).css({cursor: fiz.magnifycursor});
					if (setting.zoomrange && setting.zoomrange[1]>setting.zoomrange[0]){ //if zoom range enabled
						$tracker.bind('DOMMouseScroll mousewheel', function(e){
							fiz.magnifyimage($tracker, e, setting.zoomrange);
							e.preventDefault();
						});
					} else if(setting.disablewheel){
						$tracker.bind('DOMMouseScroll mousewheel', function(e){e.preventDefault();});
					}
				})	//end $bigimage onload
				if ($bigimage.get(0).complete){ //if image has already loaded (account for IE, Opera not firing onload event if so)
					$bigimage.trigger('loadevt', {type: 'load'})
				}
				else{
					$bigimage.bind('load error', function(e){$bigimage.trigger('loadevt', e)})
				}
			})
		},

		iname: (function(){var itag = $('<img />'), iname = itag.get(0).tagName; itag.remove(); return iname;})(),

		loaded: {},

		hashre: /^#/
	});

	$.fn.addimagezoom = function(options){
		var sel = this.selector, $thumbs = $(sel.replace(featuredimagezoomer.hashre, '.') + '.thumbs a');
		options = options || {};
		if(options.multizoom !== null && ($thumbs).size()){
			$thumbs.addmultizoom($.extend(options, {imgObj: sel, multizoom: null}));
			return this;
		} else if(options.multizoom){
			$(options.multizoom).addmultizoom($.extend(options, {imgObj: sel, multizoom: null}));
			return this;
		} else if (options.multizoom !== null){
			return this.each(function(){
				if (this.tagName !== featuredimagezoomer.iname)
					return true; //skip to next matched element
				$('<a href="' + this.src + '"></a>').addmultizoom($.extend(options, {imgObj: sel, multizoom: null, notmulti: true}));
			});
		}
		return this.each(function(){ //return jQuery obj
			if (this.tagName !== featuredimagezoomer.iname)
				return true; //skip to next matched element
			featuredimagezoomer.init($(this), options);
		});
	};

})(jQuery);
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright å© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright å© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 *//*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
window.matchMedia=window.matchMedia||(function(e,f){var c,a=e.documentElement,b=a.firstElementChild||a.firstChild,d=e.createElement("body"),g=e.createElement("div");g.id="mq-test-1";g.style.cssText="position:absolute;top:-100em";d.style.background="none";d.appendChild(g);return function(h){g.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width: 42px; }</style>';a.insertBefore(d,b);c=g.offsetWidth==42;a.removeChild(d);return{matches:c,media:h}}})(document);

/*! Respond.js v1.1.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
(function(e){e.respond={};respond.update=function(){};respond.mediaQueriesSupported=e.matchMedia&&e.matchMedia("only all").matches;if(respond.mediaQueriesSupported){return}var w=e.document,s=w.documentElement,i=[],k=[],q=[],o={},h=30,f=w.getElementsByTagName("head")[0]||s,g=w.getElementsByTagName("base")[0],b=f.getElementsByTagName("link"),d=[],a=function(){var D=b,y=D.length,B=0,A,z,C,x;for(;B<y;B++){A=D[B],z=A.href,C=A.media,x=A.rel&&A.rel.toLowerCase()==="stylesheet";if(!!z&&x&&!o[z]){if(A.styleSheet&&A.styleSheet.rawCssText){m(A.styleSheet.rawCssText,z,C);o[z]=true}else{if((!/^([a-zA-Z:]*\/\/)/.test(z)&&!g)||z.replace(RegExp.$1,"").split("/")[0]===e.location.host){d.push({href:z,media:C})}}}}u()},u=function(){if(d.length){var x=d.shift();n(x.href,function(y){m(y,x.href,x.media);o[x.href]=true;u()})}},m=function(I,x,z){var G=I.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),J=G&&G.length||0,x=x.substring(0,x.lastIndexOf("/")),y=function(K){return K.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+x+"$2$3")},A=!J&&z,D=0,C,E,F,B,H;if(x.length){x+="/"}if(A){J=1}for(;D<J;D++){C=0;if(A){E=z;k.push(y(I))}else{E=G[D].match(/@media *([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1;k.push(RegExp.$2&&y(RegExp.$2))}B=E.split(",");H=B.length;for(;C<H;C++){F=B[C];i.push({media:F.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&RegExp.$2||"all",rules:k.length-1,hasquery:F.indexOf("(")>-1,minw:F.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:F.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}}j()},l,r,v=function(){var z,A=w.createElement("div"),x=w.body,y=false;A.style.cssText="position:absolute;font-size:1em;width:1em";if(!x){x=y=w.createElement("body");x.style.background="none"}x.appendChild(A);s.insertBefore(x,s.firstChild);z=A.offsetWidth;if(y){s.removeChild(x)}else{x.removeChild(A)}z=p=parseFloat(z);return z},p,j=function(I){var x="clientWidth",B=s[x],H=w.compatMode==="CSS1Compat"&&B||w.body[x]||B,D={},G=b[b.length-1],z=(new Date()).getTime();if(I&&l&&z-l<h){clearTimeout(r);r=setTimeout(j,h);return}else{l=z}for(var E in i){var K=i[E],C=K.minw,J=K.maxw,A=C===null,L=J===null,y="em";if(!!C){C=parseFloat(C)*(C.indexOf(y)>-1?(p||v()):1)}if(!!J){J=parseFloat(J)*(J.indexOf(y)>-1?(p||v()):1)}if(!K.hasquery||(!A||!L)&&(A||H>=C)&&(L||H<=J)){if(!D[K.media]){D[K.media]=[]}D[K.media].push(k[K.rules])}}for(var E in q){if(q[E]&&q[E].parentNode===f){f.removeChild(q[E])}}for(var E in D){var M=w.createElement("style"),F=D[E].join("\n");M.type="text/css";M.media=E;f.insertBefore(M,G.nextSibling);if(M.styleSheet){M.styleSheet.cssText=F}else{M.appendChild(w.createTextNode(F))}q.push(M)}},n=function(x,z){var y=c();if(!y){return}y.open("GET",x,true);y.onreadystatechange=function(){if(y.readyState!=4||y.status!=200&&y.status!=304){return}z(y.responseText)};if(y.readyState==4){return}y.send(null)},c=(function(){var x=false;try{x=new XMLHttpRequest()}catch(y){x=new ActiveXObject("Microsoft.XMLHTTP")}return function(){return x}})();a();respond.update=a;function t(){j(true)}if(e.addEventListener){e.addEventListener("resize",t,false)}else{if(e.attachEvent){e.attachEvent("onresize",t)}}})(this);/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.4
 *
 */
(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null
        };

        function update() {
            var counter = 0;
      
            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit; 
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed; 
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function(event) {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {
                            $self
                                .hide()
                                .attr("src", $self.data(settings.data_attribute))
                                [settings.effect](settings.effect_speed);
                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.data(settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function(event) {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function(event) {
            update();
        });
              
        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(window).load(function() {
            update();
        });
        
        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.height() + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };
    
    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };
        
    $.abovethetop = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };
    
    $.leftofbegin = function(element, settings) {
        var fold;
        
        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[':'], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */

;(function (window, document, $, undefined) {
	"use strict";

	var H = $("html"),
		W = $(window),
		D = $(document),
		F = $.fancybox = function () {
			F.open.apply( this, arguments );
		},
		IE =  navigator.userAgent.match(/msie/i),
		didUpdate	= null,
		isTouch		= document.createTouch !== undefined,

		isQuery	= function(obj) {
			return obj && obj.hasOwnProperty && obj instanceof $;
		},
		isString = function(str) {
			return str && $.type(str) === "string";
		},
		isPercentage = function(str) {
			return isString(str) && str.indexOf('%') > 0;
		},
		isScrollable = function(el) {
			return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
		},
		getScalar = function(orig, dim) {
			var value = parseInt(orig, 10) || 0;

			if (dim && isPercentage(orig)) {
				value = F.getViewport()[ dim ] / 100 * value;
			}

			return Math.ceil(value);
		},
		getValue = function(value, dim) {
			return getScalar(value, dim) + 'px';
		};

	$.extend(F, {
		// The current version of fancyBox
		version: '2.1.5',

		defaults: {
			padding : 15,
			margin  : 20,

			width     : 800,
			height    : 600,
			minWidth  : 100,
			minHeight : 100,
			maxWidth  : 9999,
			maxHeight : 9999,
			pixelRatio: 1, // Set to 2 for retina display support

			autoSize   : true,
			autoHeight : false,
			autoWidth  : false,

			autoResize  : true,
			autoCenter  : !isTouch,
			fitToView   : true,
			aspectRatio : false,
			topRatio    : 0.5,
			leftRatio   : 0.5,

			scrolling : 'auto', // 'auto', 'yes' or 'no'
			wrapCSS   : '',

			arrows     : true,
			closeBtn   : true,
			closeClick : false,
			nextClick  : false,
			mouseWheel : true,
			autoPlay   : false,
			playSpeed  : 3000,
			preload    : 3,
			modal      : false,
			loop       : true,

			ajax  : {
				dataType : 'html',
				headers  : { 'X-fancyBox': true }
			},
			iframe : {
				scrolling : 'auto',
				preload   : true
			},
			swf : {
				wmode: 'transparent',
				allowfullscreen   : 'true',
				allowscriptaccess : 'always'
			},

			keys  : {
				next : {
					13 : 'left', // enter
					34 : 'up',   // page down
					39 : 'left', // right arrow
					40 : 'up'    // down arrow
				},
				prev : {
					8  : 'right',  // backspace
					33 : 'down',   // page up
					37 : 'right',  // left arrow
					38 : 'down'    // up arrow
				},
				close  : [27], // escape key
				play   : [32], // space - start/stop slideshow
				toggle : [70]  // letter "f" - toggle fullscreen
			},

			direction : {
				next : 'left',
				prev : 'right'
			},

			scrollOutside  : true,

			// Override some properties
			index   : 0,
			type    : null,
			href    : null,
			content : null,
			title   : null,

			// HTML templates
			tpl: {
				wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image    : '<img class="fancybox-image" src="{href}" alt="" />',
				iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
				error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
				prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
			},

			// Properties for each animation type
			// Opening fancyBox
			openEffect  : 'fade', // 'elastic', 'fade' or 'none'
			openSpeed   : 250,
			openEasing  : 'swing',
			openOpacity : true,
			openMethod  : 'zoomIn',

			// Closing fancyBox
			closeEffect  : 'fade', // 'elastic', 'fade' or 'none'
			closeSpeed   : 250,
			closeEasing  : 'swing',
			closeOpacity : true,
			closeMethod  : 'zoomOut',

			// Changing next gallery item
			nextEffect : 'elastic', // 'elastic', 'fade' or 'none'
			nextSpeed  : 250,
			nextEasing : 'swing',
			nextMethod : 'changeIn',

			// Changing previous gallery item
			prevEffect : 'elastic', // 'elastic', 'fade' or 'none'
			prevSpeed  : 250,
			prevEasing : 'swing',
			prevMethod : 'changeOut',

			// Enable default helpers
			helpers : {
				overlay : true,
				title   : true
			},

			// Callbacks
			onCancel     : $.noop, // If canceling
			beforeLoad   : $.noop, // Before loading
			afterLoad    : $.noop, // After loading
			beforeShow   : $.noop, // Before changing in current item
			afterShow    : $.noop, // After opening
			beforeChange : $.noop, // Before changing gallery item
			beforeClose  : $.noop, // Before closing
			afterClose   : $.noop  // After closing
		},

		//Current state
		group    : {}, // Selected group
		opts     : {}, // Group options
		previous : null,  // Previous element
		coming   : null,  // Element being loaded
		current  : null,  // Currently loaded element
		isActive : false, // Is activated
		isOpen   : false, // Is currently open
		isOpened : false, // Have been fully opened at least once

		wrap  : null,
		skin  : null,
		outer : null,
		inner : null,

		player : {
			timer    : null,
			isActive : false
		},

		// Loaders
		ajaxLoad   : null,
		imgPreload : null,

		// Some collections
		transitions : {},
		helpers     : {},

		/*
		 *	Static methods
		 */

		open: function (group, opts) {
			if (!group) {
				return;
			}

			if (!$.isPlainObject(opts)) {
				opts = {};
			}

			// Close if already active
			if (false === F.close(true)) {
				return;
			}

			// Normalize group
			if (!$.isArray(group)) {
				group = isQuery(group) ? $(group).get() : [group];
			}

			// Recheck if the type of each element is `object` and set content type (image, ajax, etc)
			$.each(group, function(i, element) {
				var obj = {},
					href,
					title,
					content,
					type,
					rez,
					hrefParts,
					selector;

				if ($.type(element) === "object") {
					// Check if is DOM element
					if (element.nodeType) {
						element = $(element);
					}

					if (isQuery(element)) {
						obj = {
							href    : element.data('fancybox-href') || element.attr('href'),
							title   : $('<div/>').text( element.data('fancybox-title') || element.attr('title') ).html(),
							isDom   : true,
							element : element
						};

						if ($.metadata) {
							$.extend(true, obj, element.metadata());
						}

					} else {
						obj = element;
					}
				}

				href  = opts.href  || obj.href || (isString(element) ? element : null);
				title = opts.title !== undefined ? opts.title : obj.title || '';

				content = opts.content || obj.content;
				type    = content ? 'html' : (opts.type  || obj.type);

				if (!type && obj.isDom) {
					type = element.data('fancybox-type');

					if (!type) {
						rez  = element.prop('class').match(/fancybox\.(\w+)/);
						type = rez ? rez[1] : null;
					}
				}

				if (isString(href)) {
					// Try to guess the content type
					if (!type) {
						if (F.isImage(href)) {
							type = 'image';

						} else if (F.isSWF(href)) {
							type = 'swf';

						} else if (href.charAt(0) === '#') {
							type = 'inline';

						} else if (isString(element)) {
							type    = 'html';
							content = element;
						}
					}

					// Split url into two pieces with source url and content selector, e.g,
					// "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
					if (type === 'ajax') {
						hrefParts = href.split(/\s+/, 2);
						href      = hrefParts.shift();
						selector  = hrefParts.shift();
					}
				}

				if (!content) {
					if (type === 'inline') {
						if (href) {
							content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7

						} else if (obj.isDom) {
							content = element;
						}

					} else if (type === 'html') {
						content = href;

					} else if (!type && !href && obj.isDom) {
						type    = 'inline';
						content = element;
					}
				}

				$.extend(obj, {
					href     : href,
					type     : type,
					content  : content,
					title    : title,
					selector : selector
				});

				group[ i ] = obj;
			});

			// Extend the defaults
			F.opts = $.extend(true, {}, F.defaults, opts);

			// All options are merged recursive except keys
			if (opts.keys !== undefined) {
				F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
			}

			F.group = group;

			return F._start(F.opts.index);
		},

		// Cancel image loading or abort ajax request
		cancel: function () {
			var coming = F.coming;

			if (coming && false === F.trigger('onCancel')) {
				return;
			}

			F.hideLoading();

			if (!coming) {
				return;
			}

			if (F.ajaxLoad) {
				F.ajaxLoad.abort();
			}

			F.ajaxLoad = null;

			if (F.imgPreload) {
				F.imgPreload.onload = F.imgPreload.onerror = null;
			}

			if (coming.wrap) {
				coming.wrap.stop(true, true).trigger('onReset').remove();
			}

			F.coming = null;

			// If the first item has been canceled, then clear everything
			if (!F.current) {
				F._afterZoomOut( coming );
			}
		},

		// Start closing animation if is open; remove immediately if opening/closing
		close: function (event) {
			F.cancel();

			if (false === F.trigger('beforeClose')) {
				return;
			}

			F.unbindEvents();

			if (!F.isActive) {
				return;
			}

			if (!F.isOpen || event === true) {
				$('.fancybox-wrap').stop(true).trigger('onReset').remove();

				F._afterZoomOut();

			} else {
				F.isOpen = F.isOpened = false;
				F.isClosing = true;

				$('.fancybox-item, .fancybox-nav').remove();

				F.wrap.stop(true, true).removeClass('fancybox-opened');

				F.transitions[ F.current.closeMethod ]();
			}
		},

		// Manage slideshow:
		//   $.fancybox.play(); - toggle slideshow
		//   $.fancybox.play( true ); - start
		//   $.fancybox.play( false ); - stop
		play: function ( action ) {
			var clear = function () {
					clearTimeout(F.player.timer);
				},
				set = function () {
					clear();

					if (F.current && F.player.isActive) {
						F.player.timer = setTimeout(F.next, F.current.playSpeed);
					}
				},
				stop = function () {
					clear();

					D.unbind('.player');

					F.player.isActive = false;

					F.trigger('onPlayEnd');
				},
				start = function () {
					if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
						F.player.isActive = true;

						D.bind({
							'onCancel.player beforeClose.player' : stop,
							'onUpdate.player'   : set,
							'beforeLoad.player' : clear
						});

						set();

						F.trigger('onPlayStart');
					}
				};

			if (action === true || (!F.player.isActive && action !== false)) {
				start();
			} else {
				stop();
			}
		},

		// Navigate to next gallery item
		next: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.next;
				}

				F.jumpto(current.index + 1, direction, 'next');
			}
		},

		// Navigate to previous gallery item
		prev: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.prev;
				}

				F.jumpto(current.index - 1, direction, 'prev');
			}
		},

		// Navigate to gallery item by index
		jumpto: function ( index, direction, router ) {
			var current = F.current;

			if (!current) {
				return;
			}

			index = getScalar(index);

			F.direction = direction || current.direction[ (index >= current.index ? 'next' : 'prev') ];
			F.router    = router || 'jumpto';

			if (current.loop) {
				if (index < 0) {
					index = current.group.length + (index % current.group.length);
				}

				index = index % current.group.length;
			}

			if (current.group[ index ] !== undefined) {
				F.cancel();

				F._start(index);
			}
		},

		// Center inside viewport and toggle position type to fixed or absolute if needed
		reposition: function (e, onlyAbsolute) {
			var current = F.current,
				wrap    = current ? current.wrap : null,
				pos;

			if (wrap) {
				pos = F._getPosition(onlyAbsolute);

				if (e && e.type === 'scroll') {
					delete pos.position;

					wrap.stop(true, true).animate(pos, 200);

				} else {
					wrap.css(pos);

					current.pos = $.extend({}, current.dim, pos);
				}
			}
		},

		update: function (e) {
			var type = (e && e.originalEvent && e.originalEvent.type),
				anyway = !type || type === 'orientationchange';

			if (anyway) {
				clearTimeout(didUpdate);

				didUpdate = null;
			}

			if (!F.isOpen || didUpdate) {
				return;
			}

			didUpdate = setTimeout(function() {
				var current = F.current;

				if (!current || F.isClosing) {
					return;
				}

				F.wrap.removeClass('fancybox-tmp');

				if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
					F._setDimension();
				}

				if (!(type === 'scroll' && current.canShrink)) {
					F.reposition(e);
				}

				F.trigger('onUpdate');

				didUpdate = null;

			}, (anyway && !isTouch ? 0 : 300));
		},

		// Shrink content to fit inside viewport or restore if resized
		toggle: function ( action ) {
			if (F.isOpen) {
				F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;

				// Help browser to restore document dimensions
				if (isTouch) {
					F.wrap.removeAttr('style').addClass('fancybox-tmp');

					F.trigger('onUpdate');
				}

				F.update();
			}
		},

		hideLoading: function () {
			D.unbind('.loading');

			$('#fancybox-loading').remove();
		},

		showLoading: function () {
			var el, viewport;

			F.hideLoading();

			el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');

			// If user will press the escape-button, the request will be canceled
			D.bind('keydown.loading', function(e) {
				if ((e.which || e.keyCode) === 27) {
					e.preventDefault();

					F.cancel();
				}
			});

			if (!F.defaults.fixed) {
				viewport = F.getViewport();

				el.css({
					position : 'absolute',
					top  : (viewport.h * 0.5) + viewport.y,
					left : (viewport.w * 0.5) + viewport.x
				});
			}

			F.trigger('onLoading');
		},

		getViewport: function () {
			var locked = (F.current && F.current.locked) || false,
				rez    = {
					x: W.scrollLeft(),
					y: W.scrollTop()
				};

			if (locked && locked.length) {
				rez.w = locked[0].clientWidth;
				rez.h = locked[0].clientHeight;

			} else {
				// See http://bugs.jquery.com/ticket/6724
				rez.w = isTouch && window.innerWidth  ? window.innerWidth  : W.width();
				rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
			}

			return rez;
		},

		// Unbind the keyboard / clicking actions
		unbindEvents: function () {
			if (F.wrap && isQuery(F.wrap)) {
				F.wrap.unbind('.fb');
			}

			D.unbind('.fb');
			W.unbind('.fb');
		},

		bindEvents: function () {
			var current = F.current,
				keys;

			if (!current) {
				return;
			}

			// Changing document height on iOS devices triggers a 'resize' event,
			// that can change document height... repeating infinitely
			W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);

			keys = current.keys;

			if (keys) {
				D.bind('keydown.fb', function (e) {
					var code   = e.which || e.keyCode,
						target = e.target || e.srcElement;

					// Skip esc key if loading, because showLoading will cancel preloading
					if (code === 27 && F.coming) {
						return false;
					}

					// Ignore key combinations and key events within form elements
					if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
						$.each(keys, function(i, val) {
							if (current.group.length > 1 && val[ code ] !== undefined) {
								F[ i ]( val[ code ] );

								e.preventDefault();
								return false;
							}

							if ($.inArray(code, val) > -1) {
								F[ i ] ();

								e.preventDefault();
								return false;
							}
						});
					}
				});
			}

			if ($.fn.mousewheel && current.mouseWheel) {
				F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
					var target = e.target || null,
						parent = $(target),
						canScroll = false;

					while (parent.length) {
						if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
							break;
						}

						canScroll = isScrollable( parent[0] );
						parent    = $(parent).parent();
					}

					if (delta !== 0 && !canScroll) {
						if (F.group.length > 1 && !current.canShrink) {
							if (deltaY > 0 || deltaX > 0) {
								F.prev( deltaY > 0 ? 'down' : 'left' );

							} else if (deltaY < 0 || deltaX < 0) {
								F.next( deltaY < 0 ? 'up' : 'right' );
							}

							e.preventDefault();
						}
					}
				});
			}
		},

		trigger: function (event, o) {
			var ret, obj = o || F.coming || F.current;

			if (obj) {
				if ($.isFunction( obj[event] )) {
					ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
				}

				if (ret === false) {
					return false;
				}

				if (obj.helpers) {
					$.each(obj.helpers, function (helper, opts) {
						if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
							F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
						}
					});
				}
			}

			D.trigger(event);
		},

		isImage: function (str) {
			return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
		},

		isSWF: function (str) {
			return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
		},

		_start: function (index) {
			var coming = {},
				obj,
				href,
				type,
				margin,
				padding;

			index = getScalar( index );
			obj   = F.group[ index ] || null;

			if (!obj) {
				return false;
			}

			coming = $.extend(true, {}, F.opts, obj);

			// Convert margin and padding properties to array - top, right, bottom, left
			margin  = coming.margin;
			padding = coming.padding;

			if ($.type(margin) === 'number') {
				coming.margin = [margin, margin, margin, margin];
			}

			if ($.type(padding) === 'number') {
				coming.padding = [padding, padding, padding, padding];
			}

			// 'modal' propery is just a shortcut
			if (coming.modal) {
				$.extend(true, coming, {
					closeBtn   : false,
					closeClick : false,
					nextClick  : false,
					arrows     : false,
					mouseWheel : false,
					keys       : null,
					helpers: {
						overlay : {
							closeClick : false
						}
					}
				});
			}

			// 'autoSize' property is a shortcut, too
			if (coming.autoSize) {
				coming.autoWidth = coming.autoHeight = true;
			}

			if (coming.width === 'auto') {
				coming.autoWidth = true;
			}

			if (coming.height === 'auto') {
				coming.autoHeight = true;
			}

			/*
			 * Add reference to the group, so it`s possible to access from callbacks, example:
			 * afterLoad : function() {
			 *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
			 * }
			 */

			coming.group  = F.group;
			coming.index  = index;

			// Give a chance for callback or helpers to update coming item (type, title, etc)
			F.coming = coming;

			if (false === F.trigger('beforeLoad')) {
				F.coming = null;

				return;
			}

			type = coming.type;
			href = coming.href;

			if (!type) {
				F.coming = null;

				//If we can not determine content type then drop silently or display next/prev item if looping through gallery
				if (F.current && F.router && F.router !== 'jumpto') {
					F.current.index = index;

					return F[ F.router ]( F.direction );
				}

				return false;
			}

			F.isActive = true;

			if (type === 'image' || type === 'swf') {
				coming.autoHeight = coming.autoWidth = false;
				coming.scrolling  = 'visible';
			}

			if (type === 'image') {
				coming.aspectRatio = true;
			}

			if (type === 'iframe' && isTouch) {
				coming.scrolling = 'scroll';
			}

			// Build the neccessary markup
			coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo( coming.parent || 'body' );

			$.extend(coming, {
				skin  : $('.fancybox-skin',  coming.wrap),
				outer : $('.fancybox-outer', coming.wrap),
				inner : $('.fancybox-inner', coming.wrap)
			});

			$.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
				coming.skin.css('padding' + v, getValue(coming.padding[ i ]));
			});

			F.trigger('onReady');

			// Check before try to load; 'inline' and 'html' types need content, others - href
			if (type === 'inline' || type === 'html') {
				if (!coming.content || !coming.content.length) {
					return F._error( 'content' );
				}

			} else if (!href) {
				return F._error( 'href' );
			}

			if (type === 'image') {
				F._loadImage();

			} else if (type === 'ajax') {
				F._loadAjax();

			} else if (type === 'iframe') {
				F._loadIframe();

			} else {
				F._afterLoad();
			}
		},

		_error: function ( type ) {
			$.extend(F.coming, {
				type       : 'html',
				autoWidth  : true,
				autoHeight : true,
				minWidth   : 0,
				minHeight  : 0,
				scrolling  : 'no',
				hasError   : type,
				content    : F.coming.tpl.error
			});

			F._afterLoad();
		},

		_loadImage: function () {
			// Reset preload image so it is later possible to check "complete" property
			var img = F.imgPreload = new Image();

			img.onload = function () {
				this.onload = this.onerror = null;

				F.coming.width  = this.width / F.opts.pixelRatio;
				F.coming.height = this.height / F.opts.pixelRatio;

				F._afterLoad();
			};

			img.onerror = function () {
				this.onload = this.onerror = null;

				F._error( 'image' );
			};

			img.src = F.coming.href;

			if (img.complete !== true) {
				F.showLoading();
			}
		},

		_loadAjax: function () {
			var coming = F.coming;

			F.showLoading();

			F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
				url: coming.href,
				error: function (jqXHR, textStatus) {
					if (F.coming && textStatus !== 'abort') {
						F._error( 'ajax', jqXHR );

					} else {
						F.hideLoading();
					}
				},
				success: function (data, textStatus) {
					if (textStatus === 'success') {
						coming.content = data;

						F._afterLoad();
					}
				}
			}));
		},

		_loadIframe: function() {
			var coming = F.coming,
				iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
					.attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
					.attr('src', coming.href);

			// This helps IE
			$(coming.wrap).bind('onReset', function () {
				try {
					$(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
				} catch (e) {}
			});

			if (coming.iframe.preload) {
				F.showLoading();

				iframe.one('load', function() {
					$(this).data('ready', 1);

					// iOS will lose scrolling if we resize
					if (!isTouch) {
						$(this).bind('load.fb', F.update);
					}

					// Without this trick:
					//   - iframe won't scroll on iOS devices
					//   - IE7 sometimes displays empty iframe
					$(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

					F._afterLoad();
				});
			}

			coming.content = iframe.appendTo( coming.inner );

			if (!coming.iframe.preload) {
				F._afterLoad();
			}
		},

		_preloadImages: function() {
			var group   = F.group,
				current = F.current,
				len     = group.length,
				cnt     = current.preload ? Math.min(current.preload, len - 1) : 0,
				item,
				i;

			for (i = 1; i <= cnt; i += 1) {
				item = group[ (current.index + i ) % len ];

				if (item.type === 'image' && item.href) {
					new Image().src = item.href;
				}
			}
		},

		_afterLoad: function () {
			var coming   = F.coming,
				previous = F.current,
				placeholder = 'fancybox-placeholder',
				current,
				content,
				type,
				scrolling,
				href,
				embed;

			F.hideLoading();

			if (!coming || F.isActive === false) {
				return;
			}

			if (false === F.trigger('afterLoad', coming, previous)) {
				coming.wrap.stop(true).trigger('onReset').remove();

				F.coming = null;

				return;
			}

			if (previous) {
				F.trigger('beforeChange', previous);

				previous.wrap.stop(true).removeClass('fancybox-opened')
					.find('.fancybox-item, .fancybox-nav')
					.remove();
			}

			F.unbindEvents();

			current   = coming;
			content   = coming.content;
			type      = coming.type;
			scrolling = coming.scrolling;

			$.extend(F, {
				wrap  : current.wrap,
				skin  : current.skin,
				outer : current.outer,
				inner : current.inner,
				current  : current,
				previous : previous
			});

			href = current.href;

			switch (type) {
				case 'inline':
				case 'ajax':
				case 'html':
					if (current.selector) {
						content = $('<div>').html(content).find(current.selector);

					} else if (isQuery(content)) {
						if (!content.data(placeholder)) {
							content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter( content ).hide() );
						}

						content = content.show().detach();

						current.wrap.bind('onReset', function () {
							if ($(this).find(content).length) {
								content.hide().replaceAll( content.data(placeholder) ).data(placeholder, false);
							}
						});
					}
				break;

				case 'image':
					content = current.tpl.image.replace(/\{href\}/g, href);
				break;

				case 'swf':
					content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
					embed   = '';

					$.each(current.swf, function(name, val) {
						content += '<param name="' + name + '" value="' + val + '"></param>';
						embed   += ' ' + name + '="' + val + '"';
					});

					content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
				break;
			}

			if (!(isQuery(content) && content.parent().is(current.inner))) {
				current.inner.append( content );
			}

			// Give a chance for helpers or callbacks to update elements
			F.trigger('beforeShow');

			// Set scrolling before calculating dimensions
			current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

			// Set initial dimensions and start position
			F._setDimension();

			F.reposition();

			F.isOpen = false;
			F.coming = null;

			F.bindEvents();

			if (!F.isOpened) {
				$('.fancybox-wrap').not( current.wrap ).stop(true).trigger('onReset').remove();

			} else if (previous.prevMethod) {
				F.transitions[ previous.prevMethod ]();
			}

			F.transitions[ F.isOpened ? current.nextMethod : current.openMethod ]();

			F._preloadImages();
		},

		_setDimension: function () {
			var viewport   = F.getViewport(),
				steps      = 0,
				canShrink  = false,
				canExpand  = false,
				wrap       = F.wrap,
				skin       = F.skin,
				inner      = F.inner,
				current    = F.current,
				width      = current.width,
				height     = current.height,
				minWidth   = current.minWidth,
				minHeight  = current.minHeight,
				maxWidth   = current.maxWidth,
				maxHeight  = current.maxHeight,
				scrolling  = current.scrolling,
				scrollOut  = current.scrollOutside ? current.scrollbarWidth : 0,
				margin     = current.margin,
				wMargin    = getScalar(margin[1] + margin[3]),
				hMargin    = getScalar(margin[0] + margin[2]),
				wPadding,
				hPadding,
				wSpace,
				hSpace,
				origWidth,
				origHeight,
				origMaxWidth,
				origMaxHeight,
				ratio,
				width_,
				height_,
				maxWidth_,
				maxHeight_,
				iframe,
				body;

			// Reset dimensions so we could re-check actual size
			wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');

			wPadding = getScalar(skin.outerWidth(true)  - skin.width());
			hPadding = getScalar(skin.outerHeight(true) - skin.height());

			// Any space between content and viewport (margin, padding, border, title)
			wSpace = wMargin + wPadding;
			hSpace = hMargin + hPadding;

			origWidth  = isPercentage(width)  ? (viewport.w - wSpace) * getScalar(width)  / 100 : width;
			origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

			if (current.type === 'iframe') {
				iframe = current.content;

				if (current.autoHeight && iframe.data('ready') === 1) {
					try {
						if (iframe[0].contentWindow.document.location) {
							inner.width( origWidth ).height(9999);

							body = iframe.contents().find('body');

							if (scrollOut) {
								body.css('overflow-x', 'hidden');
							}

							origHeight = body.outerHeight(true);
						}

					} catch (e) {}
				}

			} else if (current.autoWidth || current.autoHeight) {
				inner.addClass( 'fancybox-tmp' );

				// Set width or height in case we need to calculate only one dimension
				if (!current.autoWidth) {
					inner.width( origWidth );
				}

				if (!current.autoHeight) {
					inner.height( origHeight );
				}

				if (current.autoWidth) {
					origWidth = inner.width();
				}

				if (current.autoHeight) {
					origHeight = inner.height();
				}

				inner.removeClass( 'fancybox-tmp' );
			}

			width  = getScalar( origWidth );
			height = getScalar( origHeight );

			ratio  = origWidth / origHeight;

			// Calculations for the content
			minWidth  = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
			maxWidth  = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);

			minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
			maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);

			// These will be used to determine if wrap can fit in the viewport
			origMaxWidth  = maxWidth;
			origMaxHeight = maxHeight;

			if (current.fitToView) {
				maxWidth  = Math.min(viewport.w - wSpace, maxWidth);
				maxHeight = Math.min(viewport.h - hSpace, maxHeight);
			}

			maxWidth_  = viewport.w - wMargin;
			maxHeight_ = viewport.h - hMargin;

			if (current.aspectRatio) {
				if (width > maxWidth) {
					width  = maxWidth;
					height = getScalar(width / ratio);
				}

				if (height > maxHeight) {
					height = maxHeight;
					width  = getScalar(height * ratio);
				}

				if (width < minWidth) {
					width  = minWidth;
					height = getScalar(width / ratio);
				}

				if (height < minHeight) {
					height = minHeight;
					width  = getScalar(height * ratio);
				}

			} else {
				width = Math.max(minWidth, Math.min(width, maxWidth));

				if (current.autoHeight && current.type !== 'iframe') {
					inner.width( width );

					height = inner.height();
				}

				height = Math.max(minHeight, Math.min(height, maxHeight));
			}

			// Try to fit inside viewport (including the title)
			if (current.fitToView) {
				inner.width( width ).height( height );

				wrap.width( width + wPadding );

				// Real wrap dimensions
				width_  = wrap.width();
				height_ = wrap.height();

				if (current.aspectRatio) {
					while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
						if (steps++ > 19) {
							break;
						}

						height = Math.max(minHeight, Math.min(maxHeight, height - 10));
						width  = getScalar(height * ratio);

						if (width < minWidth) {
							width  = minWidth;
							height = getScalar(width / ratio);
						}

						if (width > maxWidth) {
							width  = maxWidth;
							height = getScalar(width / ratio);
						}

						inner.width( width ).height( height );

						wrap.width( width + wPadding );

						width_  = wrap.width();
						height_ = wrap.height();
					}

				} else {
					width  = Math.max(minWidth,  Math.min(width,  width  - (width_  - maxWidth_)));
					height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
				}
			}

			if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
				width += scrollOut;
			}

			inner.width( width ).height( height );

			wrap.width( width + wPadding );

			width_  = wrap.width();
			height_ = wrap.height();

			canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
			canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));

			$.extend(current, {
				dim : {
					width	: getValue( width_ ),
					height	: getValue( height_ )
				},
				origWidth  : origWidth,
				origHeight : origHeight,
				canShrink  : canShrink,
				canExpand  : canExpand,
				wPadding   : wPadding,
				hPadding   : hPadding,
				wrapSpace  : height_ - skin.outerHeight(true),
				skinSpace  : skin.height() - height
			});

			if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
				inner.height('auto');
			}
		},

		_getPosition: function (onlyAbsolute) {
			var current  = F.current,
				viewport = F.getViewport(),
				margin   = current.margin,
				width    = F.wrap.width()  + margin[1] + margin[3],
				height   = F.wrap.height() + margin[0] + margin[2],
				rez      = {
					position: 'absolute',
					top  : margin[0],
					left : margin[3]
				};

			if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
				rez.position = 'fixed';

			} else if (!current.locked) {
				rez.top  += viewport.y;
				rez.left += viewport.x;
			}

			rez.top  = getValue(Math.max(rez.top,  rez.top  + ((viewport.h - height) * current.topRatio)));
			rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width)  * current.leftRatio)));

			return rez;
		},

		_afterZoomIn: function () {
			var current = F.current;

			if (!current) {
				return;
			}

			F.isOpen = F.isOpened = true;

			F.wrap.css('overflow', 'visible').addClass('fancybox-opened').hide().show(0);

			F.update();

			// Assign a click event
			if ( current.closeClick || (current.nextClick && F.group.length > 1) ) {
				F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
					if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
						e.preventDefault();

						F[ current.closeClick ? 'close' : 'next' ]();
					}
				});
			}

			// Create a close button
			if (current.closeBtn) {
				$(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
					e.preventDefault();

					F.close();
				});
			}

			// Create navigation arrows
			if (current.arrows && F.group.length > 1) {
				if (current.loop || current.index > 0) {
					$(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
				}

				if (current.loop || current.index < F.group.length - 1) {
					$(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
				}
			}

			F.trigger('afterShow');

			// Stop the slideshow if this is the last item
			if (!current.loop && current.index === current.group.length - 1) {

				F.play( false );

			} else if (F.opts.autoPlay && !F.player.isActive) {
				F.opts.autoPlay = false;

				F.play(true);
			}
		},

		_afterZoomOut: function ( obj ) {
			obj = obj || F.current;

			$('.fancybox-wrap').trigger('onReset').remove();

			$.extend(F, {
				group  : {},
				opts   : {},
				router : false,
				current   : null,
				isActive  : false,
				isOpened  : false,
				isOpen    : false,
				isClosing : false,
				wrap   : null,
				skin   : null,
				outer  : null,
				inner  : null
			});

			F.trigger('afterClose', obj);
		}
	});

	/*
	 *	Default transitions
	 */

	F.transitions = {
		getOrigPosition: function () {
			var current  = F.current,
				element  = current.element,
				orig     = current.orig,
				pos      = {},
				width    = 50,
				height   = 50,
				hPadding = current.hPadding,
				wPadding = current.wPadding,
				viewport = F.getViewport();

			if (!orig && current.isDom && element.is(':visible')) {
				orig = element.find('img:first');

				if (!orig.length) {
					orig = element;
				}
			}

			if (isQuery(orig)) {
				pos = orig.offset();

				if (orig.is('img')) {
					width  = orig.outerWidth();
					height = orig.outerHeight();
				}

			} else {
				pos.top  = viewport.y + (viewport.h - height) * current.topRatio;
				pos.left = viewport.x + (viewport.w - width)  * current.leftRatio;
			}

			if (F.wrap.css('position') === 'fixed' || current.locked) {
				pos.top  -= viewport.y;
				pos.left -= viewport.x;
			}

			pos = {
				top     : getValue(pos.top  - hPadding * current.topRatio),
				left    : getValue(pos.left - wPadding * current.leftRatio),
				width   : getValue(width  + wPadding),
				height  : getValue(height + hPadding)
			};

			return pos;
		},

		step: function (now, fx) {
			var ratio,
				padding,
				value,
				prop       = fx.prop,
				current    = F.current,
				wrapSpace  = current.wrapSpace,
				skinSpace  = current.skinSpace;

			if (prop === 'width' || prop === 'height') {
				ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

				if (F.isClosing) {
					ratio = 1 - ratio;
				}

				padding = prop === 'width' ? current.wPadding : current.hPadding;
				value   = now - padding;

				F.skin[ prop ](  getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) ) );
				F.inner[ prop ]( getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) - (skinSpace * ratio) ) );
			}
		},

		zoomIn: function () {
			var current  = F.current,
				startPos = current.pos,
				effect   = current.openEffect,
				elastic  = effect === 'elastic',
				endPos   = $.extend({opacity : 1}, startPos);

			// Remove "position" property that breaks older IE
			delete endPos.position;

			if (elastic) {
				startPos = this.getOrigPosition();

				if (current.openOpacity) {
					startPos.opacity = 0.1;
				}

			} else if (effect === 'fade') {
				startPos.opacity = 0.1;
			}

			F.wrap.css(startPos).animate(endPos, {
				duration : effect === 'none' ? 0 : current.openSpeed,
				easing   : current.openEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomIn
			});
		},

		zoomOut: function () {
			var current  = F.current,
				effect   = current.closeEffect,
				elastic  = effect === 'elastic',
				endPos   = {opacity : 0.1};

			if (elastic) {
				endPos = this.getOrigPosition();

				if (current.closeOpacity) {
					endPos.opacity = 0.1;
				}
			}

			F.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : current.closeSpeed,
				easing   : current.closeEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomOut
			});
		},

		changeIn: function () {
			var current   = F.current,
				effect    = current.nextEffect,
				startPos  = current.pos,
				endPos    = { opacity : 1 },
				direction = F.direction,
				distance  = 200,
				field;

			startPos.opacity = 0.1;

			if (effect === 'elastic') {
				field = direction === 'down' || direction === 'up' ? 'top' : 'left';

				if (direction === 'down' || direction === 'right') {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) - distance);
					endPos[ field ]   = '+=' + distance + 'px';

				} else {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) + distance);
					endPos[ field ]   = '-=' + distance + 'px';
				}
			}

			// Workaround for http://bugs.jquery.com/ticket/12273
			if (effect === 'none') {
				F._afterZoomIn();

			} else {
				F.wrap.css(startPos).animate(endPos, {
					duration : current.nextSpeed,
					easing   : current.nextEasing,
					complete : F._afterZoomIn
				});
			}
		},

		changeOut: function () {
			var previous  = F.previous,
				effect    = previous.prevEffect,
				endPos    = { opacity : 0.1 },
				direction = F.direction,
				distance  = 200;

			if (effect === 'elastic') {
				endPos[ direction === 'down' || direction === 'up' ? 'top' : 'left' ] = ( direction === 'up' || direction === 'left' ? '-' : '+' ) + '=' + distance + 'px';
			}

			previous.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : previous.prevSpeed,
				easing   : previous.prevEasing,
				complete : function () {
					$(this).trigger('onReset').remove();
				}
			});
		}
	};

	/*
	 *	Overlay helper
	 */

	F.helpers.overlay = {
		defaults : {
			closeClick : true,      // if true, fancyBox will be closed when user clicks on the overlay
			speedOut   : 200,       // duration of fadeOut animation
			showEarly  : true,      // indicates if should be opened immediately or wait until the content is ready
			css        : {},        // custom CSS properties
			locked     : !isTouch,  // if true, the content will be locked into overlay
			fixed      : true       // if false, the overlay CSS position property will not be set to "fixed"
		},

		overlay : null,      // current handle
		fixed   : false,     // indicates if the overlay has position "fixed"
		el      : $('html'), // element that contains "the lock"

		// Public methods
		create : function(opts) {
			var parent;

			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.close();
			}

			parent = F.coming ? F.coming.parent : opts.parent;

			this.overlay = $('<div class="fancybox-overlay"></div>').appendTo( parent && parent.lenth ? parent : 'body' );
			this.fixed   = false;

			if (opts.fixed && F.defaults.fixed) {
				this.overlay.addClass('fancybox-overlay-fixed');

				this.fixed = true;
			}
		},

		open : function(opts) {
			var that = this;

			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.overlay.unbind('.overlay').width('auto').height('auto');

			} else {
				this.create(opts);
			}

			if (!this.fixed) {
				W.bind('resize.overlay', $.proxy( this.update, this) );

				this.update();
			}

			if (opts.closeClick) {
				this.overlay.bind('click.overlay', function(e) {
					if ($(e.target).hasClass('fancybox-overlay')) {
						if (F.isActive) {
							F.close();
						} else {
							that.close();
						}

						return false;
					}
				});
			}

			this.overlay.css( opts.css ).show();
		},

		close : function() {
			W.unbind('resize.overlay');

			if (this.el.hasClass('fancybox-lock')) {
				$('.fancybox-margin').removeClass('fancybox-margin');

				this.el.removeClass('fancybox-lock');

				W.scrollTop( this.scrollV ).scrollLeft( this.scrollH );
			}

			$('.fancybox-overlay').remove().hide();

			$.extend(this, {
				overlay : null,
				fixed   : false
			});
		},

		// Private, callbacks

		update : function () {
			var width = '100%', offsetWidth;

			// Reset width/height so it will not mess
			this.overlay.width(width).height('100%');

			// jQuery does not return reliable result for IE
			if (IE) {
				offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

				if (D.width() > offsetWidth) {
					width = D.width();
				}

			} else if (D.width() > W.width()) {
				width = D.width();
			}

			this.overlay.width(width).height(D.height());
		},

		// This is where we can manipulate DOM, because later it would cause iframes to reload
		onReady : function (opts, obj) {
			var overlay = this.overlay;

			$('.fancybox-overlay').stop(true, true);

			if (!overlay) {
				this.create(opts);
			}

			if (opts.locked && this.fixed && obj.fixed) {
				obj.locked = this.overlay.append( obj.wrap );
				obj.fixed  = false;
			}

			if (opts.showEarly === true) {
				this.beforeShow.apply(this, arguments);
			}
		},

		beforeShow : function(opts, obj) {
			if (obj.locked && !this.el.hasClass('fancybox-lock')) {
				if (this.fixPosition !== false) {
					$('*').filter(function(){
						return ($(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap") );
					}).addClass('fancybox-margin');
				}

				this.el.addClass('fancybox-margin');

				this.scrollV = W.scrollTop();
				this.scrollH = W.scrollLeft();

				this.el.addClass('fancybox-lock');

				W.scrollTop( this.scrollV ).scrollLeft( this.scrollH );
			}

			this.open(opts);
		},

		onUpdate : function() {
			if (!this.fixed) {
				this.update();
			}
		},

		afterClose: function (opts) {
			// Remove overlay if exists and fancyBox is not opening
			// (e.g., it is not being open using afterClose callback)
			if (this.overlay && !F.coming) {
				this.overlay.fadeOut(opts.speedOut, $.proxy( this.close, this ));
			}
		}
	};

	/*
	 *	Title helper
	 */

	F.helpers.title = {
		defaults : {
			type     : 'float', // 'float', 'inside', 'outside' or 'over',
			position : 'bottom' // 'top' or 'bottom'
		},

		beforeShow: function (opts) {
			var current = F.current,
				text    = current.title,
				type    = opts.type,
				title,
				target;

			if ($.isFunction(text)) {
				text = text.call(current.element, current);
			}

			if (!isString(text) || $.trim(text) === '') {
				return;
			}

			title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

			switch (type) {
				case 'inside':
					target = F.skin;
				break;

				case 'outside':
					target = F.wrap;
				break;

				case 'over':
					target = F.inner;
				break;

				default: // 'float'
					target = F.skin;

					title.appendTo('body');

					if (IE) {
						title.width( title.width() );
					}

					title.wrapInner('<span class="child"></span>');

					//Increase bottom margin so this title will also fit into viewport
					F.current.margin[2] += Math.abs( getScalar(title.css('margin-bottom')) );
				break;
			}

			title[ (opts.position === 'top' ? 'prependTo'  : 'appendTo') ](target);
		}
	};

	// jQuery plugin initialization
	$.fn.fancybox = function (options) {
		var index,
			that     = $(this),
			selector = this.selector || '',
			run      = function(e) {
				var what = $(this).blur(), idx = index, relType, relVal;

				if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
					relType = options.groupAttr || 'data-fancybox-group';
					relVal  = what.attr(relType);

					if (!relVal) {
						relType = 'rel';
						relVal  = what.get(0)[ relType ];
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						what = selector.length ? $(selector) : that;
						what = what.filter('[' + relType + '="' + relVal + '"]');
						idx  = what.index(this);
					}

					options.index = idx;

					// Stop an event from bubbling if everything is fine
					if (F.open(what, options) !== false) {
						e.preventDefault();
					}
				}
			};

		options = options || {};
		index   = options.index || 0;

		if (!selector || options.live === false) {
			that.unbind('click.fb-start').bind('click.fb-start', run);

		} else {
			D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
		}

		this.filter('[data-fancybox-start=1]').trigger('click');

		return this;
	};

	// Tests that need a body at doc ready
	D.ready(function() {
		var w1, w2;

		if ( $.scrollbarWidth === undefined ) {
			// http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
			$.scrollbarWidth = function() {
				var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
					child  = parent.children(),
					width  = child.innerWidth() - child.height( 99 ).innerWidth();

				parent.remove();

				return width;
			};
		}

		if ( $.support.fixedPosition === undefined ) {
			$.support.fixedPosition = (function() {
				var elem  = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
					fixed = ( elem[0].offsetTop === 20 || elem[0].offsetTop === 15 );

				elem.remove();

				return fixed;
			}());
		}

		$.extend(F.defaults, {
			scrollbarWidth : $.scrollbarWidth(),
			fixed  : $.support.fixedPosition,
			parent : $('body')
		});

		//Get real width of page scroll-bar
		w1 = $(window).width();

		H.addClass('fancybox-lock-test');

		w2 = $(window).width();

		H.removeClass('fancybox-lock-test');

		$("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
	});

}(window, document, jQuery));var $jQ = jQuery.noConflict();

$jQ(document).ready(function(){	

var isiPhone = (navigator.userAgent.match(/iPhone/i) != null);
if (isiPhone == true){
	$jQ('#multizoom1').attr('id','multizoom');
}

	//Homepage
	$jQ('#featured-products').jcarousel({
        horizontal: true,
        scroll: 1,
    });
		
	$jQ('.categories-slide .products-slide').jcarousel({
        scroll: 1,
		wrap: 'circular'
    });
	
	//Category List
	$jQ('.products-grid li').hover(function(e){
		e.preventDefault();
		$jQ(this).find('.catalog-image a').toggleClass('hover');
		$jQ(this).toggleClass('hover');
		$jQ(this).find('.product-info').fadeToggle(100);
	});

	$jQ('.products-grid li').each(function() {
		var view = $jQ(this).find('.product-actions');
		$jQ('.catalog-image', this).hover(function() {
			view.stop().css('display','block').animate({
				opacity: 1
			}, 200);
		}, function() {
			view.stop().animate({
				opacity: 0
			}, 200, function() {
				$jQ(this).css('display','none');
			});
		});
		view.hide();
	});
	
	// Tooltip
	$jQ('.link-wishlist, .link-compare, .efriend a').mouseenter(function(){
        $jQ(this).next('.tip').fadeIn('fast');
    }).mouseleave(function(){
        $jQ(this).next('.tip').fadeOut('fast');
    });
	
	$jQ('#multizoom1').addimagezoom({ // multi-zoom: options same as for previous Featured Image Zoomer's addimagezoom unless noted as '- new'
		descArea: '#description', // description selector (optional - but required if descriptions are used) - new
		speed: 1500, // duration of fade in for new zoomable images (in milliseconds, optional) - new
		descpos: true, // if set to true - description position follows image position at a set distance, defaults to false (optional) - new
		imagevertcenter: true, // zoomable image centers vertically in its container (optional) - new
		magvertcenter: true, // magnified area centers vertically in relation to the zoomable image (optional) - new
		zoomrange: [3, 10],
		magnifiersize: [250,250],
		magnifierpos: 'right',
		cursorshadecolor: '#fdffd5',
		cursorshade: true //<-- No comma after last option!
	});
	
	$jQ(".clickMobile").click(function() {
		$jQ(".mob-top-links .links").slideToggle();
		$jQ(this).toggleClass('active');
		$jQ("#search_mini_form").hide();
		$jQ('.clickSearch').removeClass('active');
	}); 
	
	$jQ(".clickSearch").click(function() {
		$jQ("#search_mini_form").slideToggle();
		$jQ(this).toggleClass('active');
		$jQ(".mob-top-links .links").hide();
		$jQ('.clickMobile').removeClass('active');
	}); 
	
	//Top Cart
	$jQ('.cart-top-container').mouseenter(function(){
		$jQ(this).find('.details-cart').slideDown(100);
		$jQ(this).addClass('active');
	}).mouseleave(function(){
		$jQ(this).find('.details-cart').slideUp(100);
		$jQ(this).removeClass('active');
	});
	

	$jQ('#narrow-by-list dt').click(function(){
		$jQ(this).toggleClass('active');
		$jQ(this).next('dd').slideToggle('medium');
	});
	
	$jQ('#narrow-by-list dt:contains("Color")').next('dd').find('.colour').css('display','block');
	
	$jQ('.add-to-links').after($jQ('.efriend.options'));
	
	//Mini Login
	$jQ('.top-login').mouseenter(function(){
		$jQ('.top-login .mini-login').slideDown(100);
		$jQ(this).addClass('active');
	}).mouseleave(function(){
		$jQ('.top-login .mini-login').slideUp(100);
		$jQ(this).removeClass('active');
	});
	
	//My Account
	$jQ('.account-create .fieldset:last').css('margin-right','0');
	
	//Vertical Navigation
	$jQ(".category span").click(function() {
		var open = $jQ(this).parent('.category').attr('lang');
		$jQ(".subcategory_" + open).slideToggle('medium');
		$jQ(".subcategory_" + open).parent().prev().toggleClass('openn');
	}); 
	
	$jQ("#left-nav li.category, #left-nav li.cate").mouseenter(function() {
		$jQ(this).addClass('over');
	}).mouseleave(function() {
		$jQ(this).removeClass('over');
	}); 
	
	$jQ('.block-account a:contains("My Wishlist")').addClass('wishlist-link');
	$jQ('.block-account a:contains("My Orders")').addClass('orders-link');
	
	
	$jQ('#left-nav .cate.active').parents('#left-nav').find('.category.active a').css({'background': 'none repeat scroll 0 -2px transparent', 'color': '#999999'});
	$jQ('#left-nav .cat.active').parents('#left-nav').find('.category.active a').css({'background': 'none repeat scroll 0 -2px transparent', 'color': '#999999'})
	$jQ('#left-nav .cat.active').parents('#left-nav').find('.cate.active a').css({'background': 'none repeat scroll 0 -2px transparent', 'color': '#666666'})
	
	//$jQ('.more-views  a').lightBox();
	
	var select = $jQ('.store-switch li.selected').html();
	$jQ('.selectSwitch').append(select);
	$jQ(".store-switch").mouseenter(function() {
		$jQ('.currency-selector .options').hide();
		$jQ(this).next('.currency-selector .options').hide();
		$jQ('.selectSwitch').html('');
		var select = $jQ('.store-switch li.selected').html();
		$jQ('.selectSwitch').append(select);
		$jQ('.ulSelect').slideDown(100);
		$jQ(this).addClass('active');
	}).mouseleave(function() {
		$jQ('.ulSelect').slideUp(100);
		$jQ(this).removeClass('active');
	});  
	
	$jQ('.currency-selector').mouseenter(function(){
		$jQ('.currency-selector .options').slideDown(100);
		$jQ(this).addClass('active');
		$jQ('.store-switch .ulSelect').hide();
	}).mouseleave(function(){
		$jQ('.currency-selector .options').slideUp(100);
		$jQ(this).removeClass('active');
	});

	$jQ("ul#nav li").find('ul').append('<span class="arrow"></span>');

	/*function layered_nav () {
		$jQ('.block-layered-nav dt').each(function(){
			$jQ(this).addClass('hover');
			$jQ(this).toggle(function(){
				$jQ(this).removeClass('hover').next().slideUp(200);
			},function(){
				$jQ(this).addClass('hover').next().slideDown(200);
			})
		});                        		
	}	
	
	layered_nav ();	*/	


});

// Twitter
(function(a){function u(a){var c='<li><div class="tweet">';return c+='<div class="vcard"><a href="http://twitter.com/'+a.user.screen_name+'" class="url"><img style="height: 48px; width: 48px;" alt="'+a.user.name+'" class="photo fn" height="48" src="'+a.user.profile_image_url+'" width="48" /></a></div>',c+='<div class="hentry"><strong><a href="http://twitter.com/',c+=a.user.screen_name+'" ',c+='title="'+a.user.name+'">'+a.user.screen_name+"</a></strong> ",c+='<span class="entry-content">',c+=b.ify.clean(b.expandLinks(a)),c+='</span> <span class="meta entry-meta"><a href="http://twitter.com/'+a.user.screen_name,c+="/status/"+a.id_str+'" class="entry-date" rel="bookmark"><span class="published" title="',c+=b.time.datetime(a.created_at)+'">'+b.time.relative(a.created_at)+"</span></a>",a.source&&(c+=" <span>from "+a.source+"</span>"),a.retweetedby&&(c+=" <span>retweeted by "+a.retweetedby.screen_name+"</span>"),c+="</span></div></div></li>",c}function v(a){var c=g.getElementById(b+a);c&&h.removeChild(g.getElementById(b+a)),delete j[b+a],f[b+a]=o;try{delete f[b+a]}catch(d){}}function w(a,c,d){var i=g.createElement("script"),k=null;c==o&&(c={}),e++,j["twitterlib"+e]=!0,f["twitterlib"+e]=function(a,c){return function(e){var f=0,g=[];if(e.results){e=e.results,f=e.length;while(f--)e[f].user={id:e[f].from_user_id,screen_name:e[f].from_user,profile_image_url:e[f].profile_image_url},e[f].source=b.ify.entities(e[f].source),g=e[f].created_at.split(" "),e[f].created_at=[g[0],g[2],g[1],g[4],g[5],g[3]].join(" ").replace(/,/,"")}else if(e.length&&e[0].sender){f=e.length;while(f--)e[f].user=e[f].sender,e[f].originalText=e[f].text,e[f].text="@"+e[f].recipient_screen_name+" "+e[f].text}else if(c.rts==1||c.rts=="t"||c.rts==1){f=e.length;while(f--)e[f].retweeted_status&&(e[f].retweeted_status.retweetedby=e[f].user,e[f]=e[f].retweeted_status)}c.originalTweets=e,c.filter&&(e=t.matchTweets(e,c.filter)),c.limit&&c.limit<e.length&&(e=e.splice(0,c.limit));if(p&&c.page>1)try{sessionStorage.setItem("twitterlib.page"+c.page+".tweets",JSON.stringify(e)),sessionStorage.setItem("twitterlib.page"+c.page+".originalTweets",JSON.stringify(c.originalTweets)),sessionStorage.setItem("twitterlib.page"+c.page,"true")}catch(h){}c.cached=!1,d.call(b,e,c),v(a)}}(e,c),k=a.match(/callback=(.*)/),k!=null&&k.length>1?f[k[1]]=f["twitterlib"+e]:a+="&callback=twitterlib"+e;if(!p||c.page<=1||p&&sessionStorage.getItem("twitterlib.page"+c.page)==null)i.src=a,i.id="twitterlib"+e,h.appendChild(i);else if(p){v(e),c.cached=!0,c.originalTweets=JSON.parse(sessionStorage.getItem("twitterlib.page"+c.page+".originalTweets"));var l=JSON.parse(sessionStorage.getItem("twitterlib.page"+c.page+".tweets")||"[]");c.filter&&(l=t.matchTweets(l,c.filter)),c.limit&&c.limit<l.length&&(l=l.splice(0,c.limit)),d.call(b,l,c)}}function x(a,b){return n[a].replace(/(\b.*?)%(.*?)(\|.*?)?%/g,function(a,c,d,e){if(e&&e.substr(1)=="remove"&&b[d]==o)return"";var f=d=="limit"?b[d]+10:b[d];return c+(b[d]===o&&e!==o?e.substr(1):f)})}function y(a,b){return typeof a=="function"&&(b=a,a={}),a===o&&(a={}),a.page=a.page||1,a.callback=b,a.limit===0&&delete a.limit,a}function z(a,b,c){i={method:a,arg:b,options:c,callback:c.callback,page:c.page||1},c.method=a;if(p){var d=JSON.parse(sessionStorage.getItem("twitterlib.last_request")||"{}");if(i.method!=d.method||i.arg!=d.arg)A(),sessionStorage.setItem("twitterlib.last_request",JSON.stringify(i))}}function A(){var a=sessionStorage.length;while(a--)sessionStorage.key(a).substr(0,"twitterlib".length)=="twitterlib"&&sessionStorage.removeItem(sessionStorage.key(a))}function B(a,b,c){return b&&n[a]==o&&(n[a]=b),this[a]==o&&(this[a]=function(b,c,d){return typeof b=="function"?(d=b,b=""):b.toString()=="[Object object]"&&(d=c,c=b,b=""),c=y(c,d),z(a,b,c),c[a]=c.user=b,c.search=encodeURIComponent(b),c.callback&&w(x(a,c),c,c.callback),this}),this[a]}var b={};if(typeof exports!="undefined"&&typeof require=="function"){var c=require("url").parse,d=require("http");this.document={location:{protocol:"http:"},head:{appendChild:function(a){if(!a.src)return;var b=c(a.src,!0),e=d.createClient(80,b.host).request("GET",b.pathname+b.search,{host:b.host}),g="",h=f[b.query.callback];e.on("response",function(a){a.setEncoding("utf8"),a.on("data",function(a){g+=a}).on("end",function(){switch(a.statusCode){case 200:g=g.replace(new RegExp("^"+b.query.callback+"\\("),"").replace(/\);*$/,""),j[b.query.callback]&&h(JSON.parse(g));break;case 304:break;case 401:}})}).end()}},getElementById:function(){},createElement:function(a){return{type:a,id:null,src:""}}}}var e=+(new Date),f=this,g=f.document,h=g.head||g.getElementsByTagName("head")[0],i={},j={},k={"&quot;":'"',"&lt;":"<","&gt;":">"},l=g.location.protocol.substr(0,4)=="http"?g.location.protocol:"http:",m={search:l+"//search.twitter.com/search.json?q=%search%&page=%page|1%&rpp=%limit|100%&since_id=%since|remove%&result_type=recent&include_entities=true",timeline:l+"//api.twitter.com/1/statuses/user_timeline.json?screen_name=%user%&count=%limit|200%&page=%page|1%&since_id=%since|remove%include_rts=%rts|false%&include_entities=true",list:l+"//api.twitter.com/1/%user%/lists/%list%/statuses.json?page=%page|1%&per_page=%limit|200%&since_id=%since|remove%&include_entities=true&include_rts=%rts|false%",favs:l+"//api.twitter.com/1/favorites/%user%.json?include_entities=true&skip_status=true&page=%page|1%&since_id=%since|remove%",retweets:l+"//api.twitter.com/1/statuses/retweeted_by_user.json?screen_name=%user%&include_entities=true&count=%limit|200%&since_id=%since|remove%&page=%page|1%"},n=m,o,p=!1,q=function(){return{entities:function(a){return a.replace(/(&[a-z0-9]+;)/g,function(a){return k[a]})},link:function(a){return a.replace(/[a-z]+:\/\/([a-z0-9-_]+\.[a-z0-9-_:~\+#%&\?\/.=]+[^:\.,\)\s*$])/ig,function(a,b){return'<a title="'+a+'" href="'+a+'">'+(b.length>36?b.substr(0,35)+"&hellip;":b)+"</a>"})},at:function(a){return a.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15}(\/[a-zA-Z0-9-_]+)*)/g,function(a,b,c){return b+'<a href="http://twitter.com/'+c+'">@'+c+"</a>"})},hash:function(a){return a.replace(/(^|[^&\w'"]+)\#([a-zA-Z0-9_^"^<]+)/g,function(a,b,c){return a.substr(-1)==='"'||a.substr(-1)=="<"?a:b+'<a href="http://search.twitter.com/search?q=%23'+c+'">#'+c+"</a>"})},clean:function(a){return this.hash(this.at(this.link(a)))}}}(),r=function(a){if(a===o)return"";var b=a.text,c=0;if(a.entities){if(a.entities.urls&&a.entities.urls.length)for(c=0;c<a.entities.urls.length;c++)a.entities.urls[c].expanded_url&&(b=b.replace(a.entities.urls[c].url,a.entities.urls[c].expanded_url));if(a.entities.media&&a.entities.media.length)for(c=0;c<a.entities.media.length;c++)if(a.entities.media[c].media_url||a.entities.media[c].expanded_url)b=b.replace(a.entities.media[c].url,a.entities.media[c].media_url?a.entities.media[c].media_url:a.entities.media[c].expanded_url)}return b},s=function(){var a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return{time:function(a){var b=a.getHours(),c=a.getMinutes()+"",d="AM";return b==0?b=12:b==12?d="PM":b>12&&(b-=12,d="PM"),c.length==1&&(c="0"+c),b+":"+c+" "+d},date:function(b){var c=a[b.getMonth()],d=b.getDate()+"",e=~~d,f=b.getFullYear(),g=(new Date).getFullYear(),h="th";return e%10==1&&d.substr(0,1)!="1"?h="st":e%10==2&&d.substr(0,1)!="1"?h="nd":e%10==3&&d.substr(0,1)!="1"&&(h="rd"),d.substr(0,1)=="0"&&(d=d.substr(1)),c+" "+d+h+(g!=f?", "+f:"")},shortdate:function(b){var c=b.split(" "),d=Date.parse(c[1]+" "+c[2]+", "+c[5]+" "+c[3]),e=new Date(d),f=a[e.getMonth()],g=e.getDate()+"",h=e.getFullYear(),i=(new Date).getFullYear();return i===h?g+" "+f:g+" "+f+(h+"").substr(2,2)},datetime:function(a){var b=a.split(" "),c=new Date(Date.parse(b[1]+" "+b[2]+", "+b[5]+" "+b[3]));return this.time(c)+" "+this.date(c)},relative:function(a){var b=a.split(" "),c=Date.parse(b[1]+" "+b[2]+", "+b[5]+" "+b[3]),d=new Date(c),e=arguments.length>1?arguments[1]:new Date,f=~~((e.getTime()-c)/1e3),g="";return f+=e.getTimezoneOffset()*60,f<=1?g="1 second ago":f<60?g=f+" seconds ago":f<120?g="1 minute ago":f<2700?g=~~(f/60)+" minutes ago":f<10800?g="1 hour ago":f<86400?g=~~(f/3600)+" hours ago":g=this.shortdate(a),g}}}(),t=function(){return{match:function(a,b,c){var d=0,e="",f=a.text.toLowerCase(),g=(!b.and||!b.and.length)&&(!b.or||!b.or.length);typeof b=="string"&&(b=this.format(b));if(b.not&&b.not.length){for(d=0;d<b.not.length;d++)if(f.indexOf(b.not[d])!==-1)return!1;if(g)return!0}else if({}.toString.call(b.not)!=="[object Array]"){if(b.not.test(f))return!1;if(g)return!0}if(b.and&&b.and.length)for(d=0;d<b.and.length;d++){e=b.and[d];if(e.substr(0,3)==="to:"){if(!RegExp("^@"+e.substr(3)).test(f))return!1}else if(e.substr(0,5)=="from:"){if(a.user.screen_name!==e.substr(5))return!1}else if(f.indexOf(e)===-1)return!1}else if(typeof b["and"]=="function"&&b.and.test(f))return!0;if(b.or&&b.or.length)for(d=0;d<b.or.length;d++){e=b.or[d];if(e.substr(0,3)==="to:"){if(RegExp("^@"+e.substr(3)).test(f))return!0}else if(e.substr(0,5)=="from:"){if(a.user.screen_name===e.substr(5))return!0}else if(f.indexOf(b.or[d])!==-1)return!0}else if(typeof b["or"]=="function"){if(b.or.test(f))return!0}else if(b.and&&b.and.length)return!0;return!1},format:function(a,b){var c=[],d=[],e=[],f=0,g=[],h="",i="";a.replace(/(-?["'](.*?)["']|\S+)/g,function(a){var b=!1;a.substr(0,1)=="-"&&(b=!0),a=a.replace(/["']+|["']+$/g,""),b?g.push(a.substr(1).toLowerCase()):c.push(a)});for(f=0;f<c.length;f++)c[f]=="OR"&&c[f+1]?(d.push(c[f-1].toLowerCase()),d.push(c[f+1].toLowerCase()),f++,e.pop()):e.push(c[f].toLowerCase());return{or:d,and:e,not:g}},matchTweets:function(a,b,c){var d=[],e,f=0;typeof b=="string"&&(b=this.format(b));for(f=0;f<a.length;f++)this.match(a[f],b,c)&&d.push(a[f]);return d}}}();b={custom:B,status:function(a,b,c){return b=y(b,c),b.limit=1,z("status",a,b),this.timeline(a,b,b.callback)},list:function(a,b,c){var d=a.split("/");return b=y(b,c),z("list",a,b),b.user=d[0],b.list=d[1],b.callback&&w(x("list",b),b,b.callback),this},next:function(){return i.method&&(i.page++,i.options.page=i.page,this[i.method](i.arg,i.options,i.callback)),this},refresh:function(){return i.method&&this[i.method](i.arg,i.options,i.callback),this},time:s,ify:q,filter:t,expandLinks:r,cancel:function(){for(var a in j)f[a]=function(){return function(a){v(a)}}(a.replace("twitterlib",""));return j={},this},reset:function(){n=m,i.method=""},render:u,debug:function(a){for(var b in a)n[b]=a[b];return this},cache:function(a){p=a==o?!0:a;if(!f.JSON||!f.sessionStorage)p=!1}},b.custom("search"),b.custom("timeline"),b.custom("favs"),b.custom("retweets"),typeof exports!="undefined"&&(module.exports=b),a.twitterlib=b})(this);

function getTweets(el, utils){
    if( !utils.username ){
        el.twitterList.find("li").eq(0).html("You need to specify a username");
    }else{
        jQuery.ajax({
            url			: "//api.twitter.com/1/statuses/user_timeline.json?screen_name="+utils.username,
            dataType	: "jsonp",
            timeout		: 15000,
            success		: function(data){
                var li = '';
                for( i=0; i<utils.tweetNum; i++ ){
                    if ( data[i] === undefined ) break;
                    var text = data[i].text;
                    text = text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url){return '<a href="'+url+'" target="_blank">'+url+'</a>'});
                    text = text.replace(/@(\w+)/g, function(url){return '<a href="http://www.twitter.com/'+url.substring(1)+'" target="_blank">'+url+'</a>'});
                    text = text.replace(/#(\w+)/g, function(url){return '<a href="http://twitter.com/search?q=%23'+url.substring(1)+'" target="_blank">'+url+'</a>'});
                    li += '<li><span class="tweet-icon"></span><p>'+text+'<span class="time-ago">'+twitterlib.time.relative(data[i].created_at)+'</span>'+'</p></li>';

                }
                li += '<li class="follow">Follow us <a href="https://twitter.com/'+utils.username+'">on Twitter</a></li>';
                el.twitterList.html( li );
            },
            error : function(){
                el.twitterList.find("li").eq(0).html("There was an error connecting to your Twitter account");
            }
        });
    }
}ï»¿(function (a) { function g(a, b) { var c = a.data("ddslick"); var d = a.find(".dd-selected"), e = d.siblings(".dd-selected-value"), f = a.find(".dd-options"), g = d.siblings(".dd-pointer"), h = a.find(".dd-option").eq(b), k = h.closest("li"), l = c.settings, m = c.settings.data[b]; a.find(".dd-option").removeClass("dd-option-selected"); h.addClass("dd-option-selected"); c.selectedIndex = b; c.selectedItem = k; c.selectedData = m; if (l.showSelectedHTML) { d.html((m.imageSrc ? '<img class="dd-selected-image' + (l.imagePosition == "right" ? " dd-image-right" : "") + '" src="' + m.imageSrc + '" />' : "") + (m.text ? '<label class="dd-selected-text">' + m.text + "</label>" : "") + (m.description ? '<small class="dd-selected-description dd-desc' + (l.truncateDescription ? " dd-selected-description-truncated" : "") + '" >' + m.description + "</small>" : "")) } else d.html(m.text); e.val(m.value); c.original.val(m.value); a.data("ddslick", c); i(a); j(a); if (typeof l.onSelected == "function") { l.onSelected.call(this, c) } } function h(b) { var c = b.find(".dd-select"), d = c.siblings(".dd-options"), e = c.find(".dd-pointer"), f = d.is(":visible"); a(".dd-click-off-close").not(d).slideUp(50); a(".dd-pointer").removeClass("dd-pointer-up"); if (f) { d.slideUp("fast"); e.removeClass("dd-pointer-up") } else { d.slideDown("fast"); e.addClass("dd-pointer-up") } k(b) } function i(a) { a.find(".dd-options").slideUp(50); a.find(".dd-pointer").removeClass("dd-pointer-up").removeClass("dd-pointer-up") } function j(a) { var b = a.find(".dd-select").css("height"); var c = a.find(".dd-selected-description"); var d = a.find(".dd-selected-image"); if (c.length <= 0 && d.length > 0) { a.find(".dd-selected-text").css("lineHeight", b) } } function k(b) { b.find(".dd-option").each(function () { var c = a(this); var d = c.css("height"); var e = c.find(".dd-option-description"); var f = b.find(".dd-option-image"); if (e.length <= 0 && f.length > 0) { c.find(".dd-option-text").css("lineHeight", d) } }) } a.fn.ddslick = function (c) { if (b[c]) { return b[c].apply(this, Array.prototype.slice.call(arguments, 1)) } else if (typeof c === "object" || !c) { return b.init.apply(this, arguments) } else { a.error("Method " + c + " does not exists.") } }; var b = {}, c = { data: [], keepJSONItemsOnTop: false, width: 260, height: null, background: "#eee", selectText: "", defaultSelectedIndex: null, truncateDescription: true, imagePosition: "left", showSelectedHTML: true, clickOffToClose: true, onSelected: function () { } }, d = '<div class="dd-select"><input class="dd-selected-value" type="hidden" /><a class="dd-selected"></a><span class="dd-pointer dd-pointer-down"></span></div>', e = '<ul class="dd-options"></ul>', f = '<style id="css-ddslick" type="text/css">' + ".dd-select{ border-radius:2px; border:solid 1px #ccc; position:relative; cursor:pointer;}" + ".dd-desc { color:#aaa; display:block; overflow: hidden; font-weight:normal; line-height: 1.4em; }" + ".dd-selected{ overflow:hidden; display:block; padding:10px; font-weight:bold;}" + ".dd-pointer{ width:0; height:0; position:absolute; right:10px; top:50%; margin-top:-3px;}" + ".dd-pointer-down{ border:solid 5px transparent; border-top:solid 5px #000; }" + ".dd-pointer-up{border:solid 5px transparent !important; border-bottom:solid 5px #000 !important; margin-top:-8px;}" + ".dd-options{ border:solid 1px #ccc; border-top:none; list-style:none; box-shadow:0px 1px 5px #ddd; display:none; position:absolute; z-index:2000; margin:0; padding:0;background:#fff; overflow:auto;}" + ".dd-option{ padding:10px; display:block; border-bottom:solid 1px #ddd; overflow:hidden; text-decoration:none; color:#333; cursor:pointer;-webkit-transition: all 0.25s ease-in-out; -moz-transition: all 0.25s ease-in-out;-o-transition: all 0.25s ease-in-out;-ms-transition: all 0.25s ease-in-out; }" + ".dd-options > li:last-child > .dd-option{ border-bottom:none;}" + ".dd-option:hover{ background:#f3f3f3; color:#000;}" + ".dd-selected-description-truncated { text-overflow: ellipsis; white-space:nowrap; }" + ".dd-option-selected { background:#f6f6f6; }" + ".dd-option-image, .dd-selected-image { vertical-align:middle; float:left; margin-right:5px; max-width:64px;}" + ".dd-image-right { float:right; margin-right:15px; margin-left:5px;}" + ".dd-container{ position:relative;}â€‹ .dd-selected-text { font-weight:bold}â€‹</style>"; if (a("#css-ddslick").length <= 0) { a(f).appendTo("head") } b.init = function (b) { var b = a.extend({}, c, b); return this.each(function () { var c = a(this), f = c.data("ddslick"); if (!f) { var i = [], j = b.data; c.find("option").each(function () { var b = a(this), c = b.data(); i.push({ text: a.trim(b.text()), value: b.val(), selected: b.is(":selected"), description: c.description, imageSrc: c.imagesrc }) }); if (b.keepJSONItemsOnTop) a.merge(b.data, i); else b.data = a.merge(i, b.data); var k = c, l = a('<div id="' + c.attr("id") + '"></div>'); c.replaceWith(l); c = l; c.addClass("dd-container").append(d).append(e); var i = c.find(".dd-select"), m = c.find(".dd-options"); m.css({ width: b.width }); i.css({ width: b.width, background: b.background }); c.css({ width: b.width }); if (b.height != null) m.css({ height: b.height, overflow: "auto" }); a.each(b.data, function (a, c) { if (c.selected) b.defaultSelectedIndex = a; m.append("<li>" + '<a class="dd-option">' + (c.value ? ' <input class="dd-option-value" type="hidden" value="' + c.value + '" />' : "") + (c.imageSrc ? ' <img class="dd-option-image' + (b.imagePosition == "right" ? " dd-image-right" : "") + '" src="' + c.imageSrc + '" />' : "") + (c.text ? ' <label class="dd-option-text">' + c.text + "</label>" : "") + (c.description ? ' <small class="dd-option-description dd-desc">' + c.description + "</small>" : "") + "</a>" + "</li>") }); var n = { settings: b, original: k, selectedIndex: -1, selectedItem: null, selectedData: null }; c.data("ddslick", n); if (b.selectText.length > 0 && b.defaultSelectedIndex == null) { c.find(".dd-selected").html(b.selectText) } else { var o = b.defaultSelectedIndex != null && b.defaultSelectedIndex >= 0 && b.defaultSelectedIndex < b.data.length ? b.defaultSelectedIndex : 0; g(c, o) } c.find(".dd-select").on("click.ddslick", function () { h(c) }); c.find(".dd-option").on("click.ddslick", function () { g(c, a(this).closest("li").index()) }); if (b.clickOffToClose) { m.addClass("dd-click-off-close"); c.on("click.ddslick", function (a) { a.stopPropagation() }); a("body").on("click", function () { a(".dd-click-off-close").slideUp(50).siblings(".dd-select").find(".dd-pointer").removeClass("dd-pointer-up") }) } } }) }; b.select = function (b) { return this.each(function () { if (b.index) g(a(this), b.index) }) }; b.open = function () { return this.each(function () { var b = a(this), c = b.data("ddslick"); if (c) h(b) }) }; b.close = function () { return this.each(function () { var b = a(this), c = b.data("ddslick"); if (c) i(b) }) }; b.destroy = function () { return this.each(function () { var b = a(this), c = b.data("ddslick"); if (c) { var d = c.original; b.removeData("ddslick").unbind(".ddslick").replaceWith(d) } }) } })(jQuery)