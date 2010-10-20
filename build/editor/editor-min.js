YUI.add("frame",function(b){var a=function(){a.superclass.constructor.apply(this,arguments);};b.extend(a,b.Base,{_ready:null,_rendered:null,_iframe:null,_instance:null,_create:function(c){var i,h,e,g;this._iframe=b.Node.create(a.HTML);this._iframe.setStyle("visibility","hidden");this._iframe.set("src",this.get("src"));this.get("container").append(this._iframe);this._iframe.set("height","99%");var d="",f=((this.get("extracss"))?'<style id="extra_css">'+this.get("extracss")+"</style>":"");d=b.substitute(a.PAGE_HTML,{DIR:this.get("dir"),LANG:this.get("lang"),TITLE:this.get("title"),META:a.META,LINKED_CSS:this.get("linkedcss"),CONTENT:this.get("content"),BASE_HREF:this.get("basehref"),DEFAULT_CSS:a.DEFAULT_CSS,EXTRA_CSS:f});if(b.config.doc.compatMode!="BackCompat"){d=a.DOC_TYPE+"\n"+d;}else{}e=this._resolveWinDoc();e.doc.open();e.doc.write(d);e.doc.close();if(this.get("designMode")){e.doc.designMode="on";}if(!e.doc.documentElement){var j=b.later(1,this,function(){if(e.doc&&e.doc.documentElement){c(e);j.cancel();}},null,true);}else{c(e);}},_resolveWinDoc:function(e){var d=(e)?e:{};d.win=b.Node.getDOMNode(this._iframe.get("contentWindow"));d.doc=b.Node.getDOMNode(this._iframe.get("contentWindow.document"));if(!d.doc){d.doc=b.config.doc;}if(!d.win){d.win=b.config.win;}return d;},_onDomEvent:function(f){var d,c;f.frameX=f.frameY=0;if(f.pageX>0||f.pageY>0){if(f.type.substring(0,3)!=="key"){c=this._instance.one("win");d=this._iframe.getXY();f.frameX=d[0]+f.pageX-c.get("scrollLeft");f.frameY=d[1]+f.pageY-c.get("scrollTop");}}f.frameTarget=f.target;f.frameCurrentTarget=f.currentTarget;f.frameEvent=f;this.fire("dom:"+f.type,f);},initializer:function(){this.publish("ready",{emitFacade:true,defaultFn:this._defReadyFn});},destructor:function(){var c=this.getInstance();c.one("doc").detachAll();c=null;this._iframe.remove();},_DOMPaste:function(g){var d=this.getInstance(),c="",f=d.config.win;if(g._event.originalTarget){c=g._event.originalTarget;}if(g._event.clipboardData){c=g._event.clipboardData.getData("Text");}if(f.clipboardData){c=f.clipboardData.getData("Text");if(c===""){if(!f.clipboardData.setData("Text",c)){c=null;}}}g.frameTarget=g.target;g.frameCurrentTarget=g.currentTarget;g.frameEvent=g;if(c){g.clipboardData={data:c,getData:function(){return c;}};}else{g.clipboardData=null;}this.fire("dom:paste",g);},_defReadyFn:function(){var e=this.getInstance(),c=b.bind(this._onDomEvent,this),d=((b.UA.ie)?b.throttle(c,200):c);e.Node.DOM_EVENTS.activate=1;e.Node.DOM_EVENTS.focusin=1;e.Node.DOM_EVENTS.deactivate=1;e.Node.DOM_EVENTS.focusout=1;b.each(a.DOM_EVENTS,function(g,f){if(g===1){if(f!=="focus"&&f!=="blur"&&f!=="paste"){if(f.substring(0,3)==="key"){e.on(f,d,e.config.doc);}else{e.on(f,c,e.config.doc);}}}},this);e.Node.DOM_EVENTS.paste=1;e.on("paste",b.bind(this._DOMPaste,this),e.one("body"));e.on("focus",c,e.config.win);e.on("blur",c,e.config.win);e._use=e.use;e.use=b.bind(this.use,this);this._iframe.setStyles({visibility:"inherit"});e.one("body").setStyle("display","block");},_onContentReady:function(f){if(!this._ready){this._ready=true;var d=this.getInstance(),c=b.clone(this.get("use"));this.fire("contentready");if(f){d.config.doc=b.Node.getDOMNode(f.target);}c.push(b.bind(function(){if(d.Selection){d.Selection.DEFAULT_BLOCK_TAG=this.get("defaultblock");}this.fire("ready");},this));d.use.apply(d,c);d.one("doc").get("documentElement").addClass("yui-js-enabled");}},_resolveBaseHref:function(c){if(!c||c===""){c=b.config.doc.location.href;if(c.indexOf("?")!==-1){c=c.substring(0,c.indexOf("?"));}c=c.substring(0,c.lastIndexOf("/"))+"/";}return c;},_getHTML:function(c){if(this._ready){var d=this.getInstance();c=d.one("body").get("innerHTML");}return c;},_setHTML:function(c){if(this._ready){var d=this.getInstance();d.one("body").set("innerHTML",c);}else{this.on("contentready",b.bind(function(f,h){var g=this.getInstance();g.one("body").set("innerHTML",f);},this,c));}return c;},_getLinkedCSS:function(c){if(!b.Lang.isArray(c)){c=[c];}var d="";if(!this._ready){b.each(c,function(e){if(e!==""){d+='<link rel="stylesheet" href="'+e+'" type="text/css">';}});}else{d=c;}return d;},_setLinkedCSS:function(c){if(this._ready){var d=this.getInstance();d.Get.css(c);}return c;},_setExtraCSS:function(c){if(this._ready){var e=this.getInstance(),d=e.get("#extra_css");d.remove();e.one("head").append('<style id="extra_css">'+c+"</style>");}return c;},_instanceLoaded:function(d){this._instance=d;this._onContentReady();var e=this._instance.config.doc;if(this.get("designMode")){if(!b.UA.ie){try{e.execCommand("styleWithCSS",false,false);e.execCommand("insertbronreturn",false,false);}catch(c){}}}},use:function(){var e=this.getInstance(),d=b.Array(arguments),c=false;if(b.Lang.isFunction(d[d.length-1])){c=d.pop();}if(c){d.push(function(){c.apply(e,arguments);});}e._use.apply(e,d);},delegate:function(e,d,c,g){var f=this.getInstance();if(!f){return false;}if(!g){g=c;c="body";}return f.delegate(e,d,c,g);},getInstance:function(){return this._instance;},render:function(c){if(this._rendered){return this;}this._rendered=true;if(c){this.set("container",c);}this._create(b.bind(function(g){var i,j,d=b.bind(function(k){this._instanceLoaded(k);},this),f=b.clone(this.get("use")),e={debug:false,win:g.win,doc:g.doc},h=b.bind(function(){e=this._resolveWinDoc(e);i=YUI(e);try{i.use("node-base",d);if(j){clearInterval(j);}}catch(k){j=setInterval(function(){h();},350);}},this);f.push(h);b.use.apply(b,f);},this));return this;},_handleFocus:function(){var e=this.getInstance(),d=new e.Selection();if(d.anchorNode){var g=d.anchorNode,f=g.get("childNodes");if(f.size()==1){if(f.item(0).test("br")){d.selectNode(g,true,false);}}}},focus:function(c){if(b.UA.ie){try{b.one("win").focus();this.getInstance().one("win").focus();}catch(e){}if(c===true){this._handleFocus();}if(b.Lang.isFunction(c)){c();}}else{try{b.one("win").focus();b.later(100,this,function(){this.getInstance().one("win").focus();if(c===true){this._handleFocus();}if(b.Lang.isFunction(c)){c();}});}catch(d){}}return this;
},show:function(){this._iframe.setStyles({position:"static",left:""});if(b.UA.gecko){try{this._instance.config.doc.designMode="on";}catch(c){}this.focus();}return this;},hide:function(){this._iframe.setStyles({position:"absolute",left:"-999999px"});return this;}},{DOM_EVENTS:{dblclick:1,click:1,paste:1,mouseup:1,mousedown:1,keyup:1,keydown:1,keypress:1,activate:1,deactivate:1,focusin:1,focusout:1},DEFAULT_CSS:"body { background-color: #fff; font: 13px/1.22 arial,helvetica,clean,sans-serif;*font-size:small;*font:x-small; } a, a:visited, a:hover { color: blue !important; text-decoration: underline !important; cursor: text !important; } img { cursor: pointer !important; border: none; }",HTML:'<iframe border="0" frameBorder="0" marginWidth="0" marginHeight="0" leftMargin="0" topMargin="0" allowTransparency="true" width="100%" height="99%"></iframe>',PAGE_HTML:'<html dir="{DIR}" lang="{LANG}"><head><title>{TITLE}</title>{META}<base href="{BASE_HREF}"/>{LINKED_CSS}<style id="editor_css">{DEFAULT_CSS}</style>{EXTRA_CSS}</head><body>{CONTENT}</body></html>',DOC_TYPE:'<!DOCTYPE HTML PUBLIC "-/'+"/W3C/"+"/DTD HTML 4.01/"+'/EN" "http:/'+'/www.w3.org/TR/html4/strict.dtd">',META:'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>',NAME:"frame",ATTRS:{title:{value:"Blank Page"},dir:{value:"ltr"},lang:{value:"en-US"},src:{value:"javascript"+((b.UA.ie)?":false":":")+";"},designMode:{writeOnce:true,value:false},content:{value:"<br>",setter:"_setHTML",getter:"_getHTML"},basehref:{value:false,getter:"_resolveBaseHref"},use:{writeOnce:true,value:["substitute","node","node-style","selector-css3"]},container:{value:"body",setter:function(c){return b.one(c);}},id:{writeOnce:true,getter:function(c){if(!c){c="iframe-"+b.guid();}return c;}},linkedcss:{value:"",getter:"_getLinkedCSS",setter:"_setLinkedCSS"},extracss:{value:"",setter:"_setExtraCSS"},host:{value:false},defaultblock:{value:"p"}}});b.Frame=a;},"@VERSION@",{skinnable:false,requires:["base","node","selector-css3","substitute"]});YUI.add("selection",function(b){var a="textContent",d="innerHTML",c="fontFamily";if(b.UA.ie){a="nodeValue";}b.Selection=function(k){var l,j,e,g,f,h;if(b.config.win.getSelection){l=b.config.win.getSelection();}else{if(b.config.doc.selection){l=b.config.doc.selection.createRange();}}this._selection=l;if(l.pasteHTML){this.isCollapsed=(l.compareEndPoints("StartToEnd",l))?false:true;if(this.isCollapsed){this.anchorNode=this.focusNode=b.one(l.parentElement());if(k){e=b.config.doc.elementFromPoint(k.clientX,k.clientY);}if(!e){j=l.parentElement();g=j.childNodes;f=l.duplicate();for(h=0;h<g.length;h++){if(f.inRange(l)){e=g[h];}}}this.ieNode=e;if(e){if(e.nodeType!==3){if(e.firstChild){e=e.firstChild;}}this.anchorNode=this.focusNode=b.Selection.resolve(e);this.anchorOffset=this.focusOffset=(this.anchorNode.nodeValue)?this.anchorNode.nodeValue.length:0;this.anchorTextNode=this.focusTextNode=b.one(e);}}}else{this.isCollapsed=l.isCollapsed;this.anchorNode=b.Selection.resolve(l.anchorNode);this.focusNode=b.Selection.resolve(l.focusNode);this.anchorOffset=l.anchorOffset;this.focusOffset=l.focusOffset;this.anchorTextNode=b.one(l.anchorNode);this.focusTextNode=b.one(l.focusNode);}if(b.Lang.isString(l.text)){this.text=l.text;}else{if(l.toString){this.text=l.toString();}else{this.text="";}}};b.Selection.filter=function(e){var h=(new Date()).getTime();var g=b.all(b.Selection.ALL),k=b.all("strong,em"),n=b.config.doc,p=n.getElementsByTagName("hr"),f={},i="",l;var j=(new Date()).getTime();g.each(function(r){var q=b.Node.getDOMNode(r);if(q.style[c]){f["."+r._yuid]=q.style[c];r.addClass(r._yuid);q.style[c]="inherit";q.removeAttribute("face");if(q.getAttribute("style")===""){q.removeAttribute("style");}if(q.getAttribute("style")){if(q.getAttribute("style").toLowerCase()==="font-family: "){q.removeAttribute("style");}}}});var o=(new Date()).getTime();b.all(".hr").addClass("yui-skip").addClass("yui-non");b.each(p,function(r){var q=n.createElement("div");q.className="hr yui-non yui-skip";q.setAttribute("style","border: 1px solid #ccc; line-height: 0; font-size: 0;margin-top: 5px; margin-bottom: 5px;");q.setAttribute("readonly",true);q.setAttribute("contenteditable",false);if(r.parentNode){r.parentNode.replaceChild(q,r);}});b.each(f,function(r,q){i+=q+" { font-family: "+r.replace(/"/gi,"")+"; }";});b.StyleSheet(i,"editor");k.each(function(u,q){var r=u.get("tagName").toLowerCase(),s="i";if(r==="strong"){s="b";}b.Selection.prototype._swap(k.item(q),s);});l=b.all("ol,ul");l.each(function(r,q){var s=r.all("li");if(!s.size()){r.remove();}});if(e){b.Selection.filterBlocks();}var m=(new Date()).getTime();};b.Selection.filterBlocks=function(){var f=(new Date()).getTime();var n=b.config.doc.body.childNodes,h,g,q=false,k=true,e,r,t,p,m,o,u;if(n){for(h=0;h<n.length;h++){g=b.one(n[h]);if(!g.test(b.Selection.BLOCKS)){k=true;if(n[h].nodeType==3){o=n[h][a].match(b.Selection.REG_CHAR);u=n[h][a].match(b.Selection.REG_NON);if(o===null&&u){k=false;}}if(k){if(!q){q=[];}q.push(n[h]);}}else{q=b.Selection._wrapBlock(q);}}q=b.Selection._wrapBlock(q);}r=b.all(b.Selection.DEFAULT_BLOCK_TAG);if(r.size()===1){t=r.item(0).all("br");if(t.size()===1){t.item(0).remove();var j=r.item(0).get("innerHTML");if(j===""||j===" "){r.set("innerHTML",b.Selection.CURSOR);e=new b.Selection();e.focusCursor(true,true);}}}else{r.each(function(s){var i=s.get("innerHTML");if(i===""){s.remove();}});}if(!b.UA.ie){}var l=(new Date()).getTime();};b.Selection.REG_CHAR=/[a-zA-Z-0-9_]/gi;b.Selection.REG_NON=/[\s\S|\n|\t]/gi;b.Selection.REG_NOHTML=/<\S[^><]*>/g;b.Selection._wrapBlock=function(f){if(f){var e=b.Node.create("<"+b.Selection.DEFAULT_BLOCK_TAG+"></"+b.Selection.DEFAULT_BLOCK_TAG+">"),h=b.one(f[0]),g;for(g=1;g<f.length;g++){e.append(f[g]);}h.replace(e);e.prepend(h);}return false;};b.Selection.unfilter=function(){var g=b.all("body [class]"),h="",f,i,e=b.one("body");g.each(function(j){if(j.hasClass(j._yuid)){j.setStyle(c,j.getStyle(c));j.removeClass(j._yuid);if(j.getAttribute("class")===""){j.removeAttribute("class");
}}});f=b.all(".yui-non");f.each(function(j){if(!j.hasClass("yui-skip")&&j.get("innerHTML")===""){j.remove();}else{j.removeClass("yui-non").removeClass("yui-skip");}});i=b.all("body [id]");i.each(function(j){if(j.get("id").indexOf("yui_3_")===0){j.removeAttribute("id");j.removeAttribute("_yuid");}});if(e){h=e.get("innerHTML");}b.all(".hr").addClass("yui-skip").addClass("yui-non");g.each(function(j){j.addClass(j._yuid);j.setStyle(c,"");if(j.getAttribute("style")===""){j.removeAttribute("style");}});return h;};b.Selection.resolve=function(e){if(e&&e.nodeType===3){e=e.parentNode;}return b.one(e);};b.Selection.getText=function(f){var e=f.get("innerHTML").replace(b.Selection.REG_NOHTML,"");e=e.replace("<span><br></span>","").replace("<br>","");return e;};b.Selection.DEFAULT_BLOCK_TAG="p";b.Selection.ALL="[style],font[face]";b.Selection.BLOCKS="p,div,ul,ol,table,style";b.Selection.TMP="yui-tmp";b.Selection.DEFAULT_TAG="span";b.Selection.CURID="yui-cursor";b.Selection.CUR_WRAPID="yui-cursor-wrapper";b.Selection.CURSOR='<span id="'+b.Selection.CURID+'"><br class="yui-cursor"></span>';b.Selection.hasCursor=function(){var e=b.all("#"+b.Selection.CUR_WRAPID);return e.size();};b.Selection.cleanCursor=function(){var e=b.all("br.yui-cursor");if(e.size()){e.each(function(f){var g=f.get("parentNode.parentNode.childNodes");if(g.size()>1){f.remove();}});}};b.Selection.prototype={text:null,isCollapsed:null,anchorNode:null,anchorOffset:null,anchorTextNode:null,focusNode:null,focusOffset:null,focusTextNode:null,_selection:null,_wrap:function(g,e){var f=b.Node.create("<"+e+"></"+e+">");f.set(d,g.get(d));g.set(d,"");g.append(f);return b.Node.getDOMNode(f);},_swap:function(g,e){var f=b.Node.create("<"+e+"></"+e+">");f.set(d,g.get(d));g.replace(f,g);return b.Node.getDOMNode(f);},getSelected:function(){b.Selection.filter();b.config.doc.execCommand("fontname",null,b.Selection.TMP);var f=b.all(b.Selection.ALL),e=[];f.each(function(h,g){if(h.getStyle(c)==b.Selection.TMP){h.setStyle(c,"");h.removeAttribute("face");if(h.getAttribute("style")===""){h.removeAttribute("style");}if(!h.test("body")){e.push(b.Node.getDOMNode(f.item(g)));}}});return b.all(e);},insertContent:function(e){return this.insertAtCursor(e,this.anchorTextNode,this.anchorOffset,true);},insertAtCursor:function(l,g,i,o){var q=b.Node.create("<"+b.Selection.DEFAULT_TAG+' class="yui-non"></'+b.Selection.DEFAULT_TAG+">"),f,j,h,p,k=this.createRange(),n;if(g&&g.test("body")){n=b.Node.create("<span></span>");g.append(n);g=n;}if(k.pasteHTML){p=b.Node.create(l);try{k.pasteHTML('<span id="rte-insert"></span>');}catch(m){}f=b.one("#rte-insert");if(f){f.set("id","");f.replace(p);return p;}else{b.on("available",function(){f.set("id","");f.replace(p);},"#rte-insert");}}else{if(i>0){f=g.get(a);j=b.one(b.config.doc.createTextNode(f.substr(0,i)));h=b.one(b.config.doc.createTextNode(f.substr(i)));g.replace(j,g);p=b.Node.create(l);if(p.get("nodeType")===11){n=b.Node.create("<span></span>");n.append(p);p=n;}j.insert(p,"after");if(h){p.insert(q,"after");q.insert(h,"after");this.selectNode(q,o);}}else{if(g.get("nodeType")===3){g=g.get("parentNode");}p=b.Node.create(l);l=g.get("innerHTML").replace(/\n/gi,"");if(l===""||l==="<br>"){g.append(p);}else{g.insert(p,"before");}if(g.get("firstChild").test("br")){g.get("firstChild").remove();}}}return p;},wrapContent:function(f){f=(f)?f:b.Selection.DEFAULT_TAG;if(!this.isCollapsed){var h=this.getSelected(),k=[],g,i,j,e;h.each(function(o,l){var m=o.get("tagName").toLowerCase();if(m==="font"){k.push(this._swap(h.item(l),f));}else{k.push(this._wrap(h.item(l),f));}},this);g=this.createRange();j=k[0];i=k[k.length-1];if(this._selection.removeAllRanges){g.setStart(k[0],0);g.setEnd(i,i.childNodes.length);this._selection.removeAllRanges();this._selection.addRange(g);}else{g.moveToElementText(b.Node.getDOMNode(j));e=this.createRange();e.moveToElementText(b.Node.getDOMNode(i));g.setEndPoint("EndToEnd",e);g.select();}k=b.all(k);return k;}else{return b.all([]);}},replace:function(k,i){var f=this.createRange(),j,e,g,h;if(f.getBookmark){g=f.getBookmark();e=this.anchorNode.get("innerHTML").replace(k,i);this.anchorNode.set("innerHTML",e);f.moveToBookmark(g);h=b.one(f.parentElement());}else{j=this.anchorTextNode;e=j.get(a);g=e.indexOf(k);e=e.replace(k,"");j.set(a,e);h=this.insertAtCursor(i,j,g,true);}return h;},remove:function(){this._selection.removeAllRanges();return this;},createRange:function(){if(b.config.doc.selection){return b.config.doc.selection.createRange();}else{return b.config.doc.createRange();}},selectNode:function(i,k,f){f=f||0;i=b.Node.getDOMNode(i);var g=this.createRange();if(g.selectNode){g.selectNode(i);this._selection.removeAllRanges();this._selection.addRange(g);if(k){try{this._selection.collapse(i,f);}catch(h){this._selection.collapse(i,0);}}}else{if(i.nodeType===3){i=i.parentNode;}try{g.moveToElementText(i);}catch(j){}if(k){g.collapse(((f)?false:true));}g.select();}return this;},setCursor:function(){this.removeCursor(false);return this.insertContent(b.Selection.CURSOR);},getCursor:function(){return b.all("#"+b.Selection.CURID);},removeCursor:function(e){var f=this.getCursor();if(f){if(e){f.removeAttribute("id");f.set("innerHTML",'<br class="yui-cursor">');}else{f.remove();}}return f;},focusCursor:function(g,e){if(g!==false){g=true;}if(e!==false){e=true;}var f=this.removeCursor(true);if(f){f.each(function(h){this.selectNode(h,g,e);},this);}},toString:function(){return"Selection Object";}};},"@VERSION@",{skinnable:false,requires:["node"]});YUI.add("exec-command",function(b){var a=function(){a.superclass.constructor.apply(this,arguments);};b.extend(a,b.Base,{_lastKey:null,_inst:null,command:function(e,d){var c=a.COMMANDS[e];if(c){return c.call(this,e,d);}else{return this._command(e,d);}},_command:function(f,d){var c=this.getInstance();try{c.config.doc.execCommand(f,null,d);}catch(g){}},getInstance:function(){if(!this._inst){this._inst=this.get("host").getInstance();}return this._inst;},initializer:function(){b.mix(this.get("host"),{execCommand:function(d,c){return this.exec.command(d,c);
},_execCommand:function(d,c){return this.exec._command(d,c);}});this.get("host").on("dom:keypress",b.bind(function(c){this._lastKey=c.keyCode;},this));}},{NAME:"execCommand",NS:"exec",ATTRS:{host:{value:false}},COMMANDS:{wrap:function(e,c){var d=this.getInstance();return(new d.Selection()).wrapContent(c);},inserthtml:function(e,c){var d=this.getInstance();if(d.Selection.hasCursor()||b.UA.ie){return(new d.Selection()).insertContent(c);}else{this._command("inserthtml",c);}},insertandfocus:function(g,d){var f=this.getInstance(),c,e;if(f.Selection.hasCursor()){d+=f.Selection.CURSOR;c=this.command("inserthtml",d);e=new f.Selection();e.focusCursor(true,true);}else{this.command("inserthtml",d);}return c;},insertbr:function(e){var d=this.getInstance(),f,c=new d.Selection();c.setCursor();f=c.getCursor();f.insert("<br>","before");c.focusCursor(true,false);return f.previous();},insertimage:function(d,c){return this.command("inserthtml",'<img src="'+c+'">');},addclass:function(e,c){var d=this.getInstance();return(new d.Selection()).getSelected().addClass(c);},removeclass:function(e,c){var d=this.getInstance();return(new d.Selection()).getSelected().removeClass(c);},forecolor:function(e,f){var d=this.getInstance(),c=new d.Selection(),g;if(!b.UA.ie){this._command("useCSS",false);}if(d.Selection.hasCursor()){if(c.isCollapsed){if(c.anchorNode&&(c.anchorNode.get("innerHTML")==="&nbsp;")){c.anchorNode.setStyle("color",f);g=c.anchorNode;}else{g=this.command("inserthtml",'<span style="color: '+f+'">'+d.Selection.CURSOR+"</span>");c.focusCursor(true,true);}return g;}else{return this._command(e,f);}}else{this._command(e,f);}},backcolor:function(e,f){var d=this.getInstance(),c=new d.Selection(),g;if(b.UA.gecko||b.UA.opera){e="hilitecolor";}if(!b.UA.ie){this._command("useCSS",false);}if(d.Selection.hasCursor()){if(c.isCollapsed){if(c.anchorNode&&(c.anchorNode.get("innerHTML")==="&nbsp;")){c.anchorNode.setStyle("backgroundColor",f);g=c.anchorNode;}else{g=this.command("inserthtml",'<span style="background-color: '+f+'">'+d.Selection.CURSOR+"</span>");c.focusCursor(true,true);}return g;}else{return this._command(e,f);}}else{this._command(e,f);}},hilitecolor:function(){return a.COMMANDS.backcolor.apply(this,arguments);},fontname:function(e,f){this._command("fontname",f);var d=this.getInstance(),c=new d.Selection();if(c.isCollapsed&&(this._lastKey!=32)){if(c.anchorNode.test("font")){c.anchorNode.set("face",f);}}},fontsize:function(e,g){this._command("fontsize",g);var d=this.getInstance(),c=new d.Selection();if(c.isCollapsed&&c.anchorNode&&(this._lastKey!=32)){if(b.UA.webkit){if(c.anchorNode.getStyle("lineHeight")){c.anchorNode.setStyle("lineHeight","");}}if(c.anchorNode.test("font")){c.anchorNode.set("size",g);}else{if(b.UA.gecko){var f=c.anchorNode.ancestor("p");if(f){f.setStyle("fontSize","");}}}}}}});b.namespace("Plugin");b.Plugin.ExecCommand=a;},"@VERSION@",{skinnable:false,requires:["frame"]});YUI.add("editor-tab",function(c){var b=function(){b.superclass.constructor.apply(this,arguments);},a="host";c.extend(b,c.Base,{_onNodeChange:function(f){var d="indent";if(f.changedType==="tab"){if(!f.changedNode.test("li, li *")){f.changedEvent.halt();f.preventDefault();if(f.changedEvent.shiftKey){d="outdent";}this.get(a).execCommand(d,"");}}},initializer:function(){this.get(a).on("nodeChange",c.bind(this._onNodeChange,this));}},{NAME:"editorTab",NS:"tab",ATTRS:{host:{value:false}}});c.namespace("Plugin");c.Plugin.EditorTab=b;},"@VERSION@",{skinnable:false,requires:["editor-base"]});YUI.add("createlink-base",function(b){var a={};a.STRINGS={PROMPT:"Please enter the URL for the link to point to:",DEFAULT:"http://"};b.namespace("Plugin");b.Plugin.CreateLinkBase=a;b.mix(b.Plugin.ExecCommand.COMMANDS,{createlink:function(h){var g=this.get("host").getInstance(),e,c,f,d=prompt(a.STRINGS.PROMPT,a.STRINGS.DEFAULT);if(d){this.get("host")._execCommand(h,d);f=new g.Selection();e=f.getSelected();if(!f.isCollapsed&&e.size()){c=e.item(0).one("a");if(c){e.item(0).replace(c);}if(b.UA.gecko){if(c.get("parentNode").test("span")){if(c.get("parentNode").one("br.yui-cursor")){c.get("parentNode").insert(c,"before");}}}}else{this.get("host").execCommand("inserthtml",'<a href="'+d+'">'+d+"</a>");}}return c;}});},"@VERSION@",{skinnable:false,requires:["editor-base"]});YUI.add("editor-base",function(d){var c=function(){c.superclass.constructor.apply(this,arguments);},b=":last-child",a="body";d.extend(c,d.Base,{frame:null,initializer:function(){var e=new d.Frame({designMode:true,title:c.STRINGS.title,use:c.USE,dir:this.get("dir"),extracss:this.get("extracss"),linkedcss:this.get("linkedcss"),defaultblock:this.get("defaultblock"),host:this}).plug(d.Plugin.ExecCommand);e.after("ready",d.bind(this._afterFrameReady,this));e.addTarget(this);this.frame=e;this.publish("nodeChange",{emitFacade:true,bubbles:true,defaultFn:this._defNodeChangeFn});this.plug(d.Plugin.EditorPara);},destructor:function(){this.frame.destroy();this.detachAll();},copyStyles:function(h,g){if(h.test("a")){return;}var e=["color","fontSize","fontFamily","backgroundColor","fontStyle"],f={};d.each(e,function(i){f[i]=h.getStyle(i);});if(h.ancestor("b,strong")){f.fontWeight="bold";}if(h.ancestor("u")){if(!f.textDecoration){f.textDecoration="underline";}}g.setStyles(f);},_lastBookmark:null,_resolveChangedNode:function(i){var h=this.getInstance();if(h&&i.test("html")){var f=h.one(a).one(b),g,e;while(!g){if(f){e=f.one(b);if(e){f=e;}else{g=true;}}else{g=true;}}if(f){if(f.test("br")){if(f.previous()){f=f.previous();}else{f=f.get("parentNode");}}if(f){i=f;}}}return i;},_defNodeChangeFn:function(z){var q=(new Date()).getTime();var h=this.getInstance(),x,g,r=h.Selection.DEFAULT_BLOCK_TAG;if(d.UA.ie){try{x=h.config.doc.selection.createRange();if(x.getBookmark){this._lastBookmark=x.getBookmark();}}catch(s){}}z.changedNode=this._resolveChangedNode(z.changedNode);switch(z.changedType){case"keydown":h.later(100,h,h.Selection.cleanCursor);break;case"tab":if(!z.changedNode.test("li, li *")&&!z.changedEvent.shiftKey){z.changedEvent.frameEvent.preventDefault();
if(d.UA.webkit){this.execCommand("inserttext","\t");}else{x=new h.Selection();x.setCursor();g=x.getCursor();g.insert(c.TABKEY,"before");x.focusCursor();h.Selection.cleanCursor();}}break;case"enter-up":var f=((this._lastPara)?this._lastPara:z.changedNode),B=f.one("br.yui-cursor");if(this._lastPara){delete this._lastPara;}if(B){if(B.previous()||B.next()){B.remove();}}if(!f.test(r)){var o=f.ancestor(r);if(o){f=o;o=null;}}if(f.test(r)){var t=f.previous(),w,k,m=false;if(t){w=t.one(b);while(!m){if(w){k=w.one(b);if(k){w=k;}else{m=true;}}else{m=true;}}if(w){this.copyStyles(w,f);}}}break;}if(d.UA.gecko){if(z.changedNode&&!z.changedNode.test(r)){var u=z.changedNode.ancestor(r);if(u){this._lastPara=u;}}}var j=this.getDomPath(z.changedNode,false),v={},y,n,A=[],l="",C="";if(z.commands){v=z.commands;}d.each(j,function(G){var p=G.tagName.toLowerCase(),H=c.TAG2CMD[p];if(H){v[H]=1;}var F=G.currentStyle||G.style;if((""+F.fontWeight)=="bold"){v.bold=1;}if(F.fontStyle=="italic"){v.italic=1;}if(F.textDecoration=="underline"){v.underline=1;}if(F.textDecoration=="line-through"){v.strikethrough=1;}var I=h.one(G);if(I.getStyle("fontFamily")){var E=I.getStyle("fontFamily").split(",")[0].toLowerCase();if(E){y=E;}if(y){y=y.replace(/'/g,"").replace(/"/g,"");}}n=c.NORMALIZE_FONTSIZE(I);var D=G.className.split(" ");d.each(D,function(J){if(J!==""&&(J.substr(0,4)!=="yui_")){A.push(J);}});l=c.FILTER_RGB(I.getStyle("color"));var e=c.FILTER_RGB(F.backgroundColor);if(e!=="transparent"){if(e!==""){C=e;}}});z.dompath=h.all(j);z.classNames=A;z.commands=v;if(!z.fontFamily){z.fontFamily=y;}if(!z.fontSize){z.fontSize=n;}if(!z.fontColor){z.fontColor=l;}if(!z.backgroundColor){z.backgroundColor=C;}var i=(new Date()).getTime();},getDomPath:function(g,e){var i=[],f,h=this.frame.getInstance();f=h.Node.getDOMNode(g);while(f!==null){if((f===h.config.doc.documentElement)||(f===h.config.doc)||!f.tagName){f=null;break;}if(!h.DOM.inDoc(f)){f=null;break;}if(f.nodeName&&f.nodeType&&(f.nodeType==1)){i.push(f);}if(f==h.config.doc.body){f=null;break;}f=f.parentNode;}if(i.length===0){i[0]=h.config.doc.body;}if(e){return h.all(i.reverse());}else{return i.reverse();}},_afterFrameReady:function(){var e=this.frame.getInstance();this.frame.on("dom:mouseup",d.bind(this._onFrameMouseUp,this));this.frame.on("dom:mousedown",d.bind(this._onFrameMouseDown,this));this.frame.on("dom:keydown",d.bind(this._onFrameKeyDown,this));if(d.UA.ie){this.frame.on("dom:activate",d.bind(this._onFrameActivate,this));this.frame.on("dom:keyup",d.throttle(d.bind(this._onFrameKeyUp,this),800));this.frame.on("dom:keypress",d.throttle(d.bind(this._onFrameKeyPress,this),800));}else{this.frame.on("dom:keyup",d.bind(this._onFrameKeyUp,this));this.frame.on("dom:keypress",d.bind(this._onFrameKeyPress,this));}e.Selection.filter();this.fire("ready");},_onFrameActivate:function(){if(this._lastBookmark){try{var h=this.getInstance(),g=h.config.doc.selection.createRange(),f=g.moveToBookmark(this._lastBookmark);g.select();this._lastBookmark=null;}catch(i){}}},_onFrameMouseUp:function(f){this.fire("nodeChange",{changedNode:f.frameTarget,changedType:"mouseup",changedEvent:f.frameEvent});},_onFrameMouseDown:function(f){this.fire("nodeChange",{changedNode:f.frameTarget,changedType:"mousedown",changedEvent:f.frameEvent});},_currentSelection:null,_currentSelectionTimer:null,_currentSelectionClear:null,_onFrameKeyDown:function(h){var g,f;if(!this._currentSelection){if(this._currentSelectionTimer){this._currentSelectionTimer.cancel();}this._currentSelectionTimer=d.later(850,this,function(){this._currentSelectionClear=true;});g=this.frame.getInstance();f=new g.Selection(h);this._currentSelection=f;}else{f=this._currentSelection;}g=this.frame.getInstance();f=new g.Selection();this._currentSelection=f;if(f&&f.anchorNode){this.fire("nodeChange",{changedNode:f.anchorNode,changedType:"keydown",changedEvent:h.frameEvent});if(c.NC_KEYS[h.keyCode]){this.fire("nodeChange",{changedNode:f.anchorNode,changedType:c.NC_KEYS[h.keyCode],changedEvent:h.frameEvent});this.fire("nodeChange",{changedNode:f.anchorNode,changedType:c.NC_KEYS[h.keyCode]+"-down",changedEvent:h.frameEvent});}}},_onFrameKeyPress:function(g){var f=this._currentSelection;if(f&&f.anchorNode){this.fire("nodeChange",{changedNode:f.anchorNode,changedType:"keypress",changedEvent:g.frameEvent});if(c.NC_KEYS[g.keyCode]){this.fire("nodeChange",{changedNode:f.anchorNode,changedType:c.NC_KEYS[g.keyCode]+"-press",changedEvent:g.frameEvent});}}},_onFrameKeyUp:function(g){var f=this._currentSelection;if(f&&f.anchorNode){this.fire("nodeChange",{changedNode:f.anchorNode,changedType:"keyup",selection:f,changedEvent:g.frameEvent});if(c.NC_KEYS[g.keyCode]){this.fire("nodeChange",{changedNode:f.anchorNode,changedType:c.NC_KEYS[g.keyCode]+"-up",selection:f,changedEvent:g.frameEvent});}}if(this._currentSelectionClear){this._currentSelectionClear=this._currentSelection=null;}},execCommand:function(j,l){var g=this.frame.execCommand(j,l),i=this.frame.getInstance(),h=new i.Selection(),f={},k={changedNode:h.anchorNode,changedType:"execcommand",nodes:g};switch(j){case"forecolor":k.fontColor=l;break;case"backcolor":k.backgroundColor=l;break;case"fontsize":k.fontSize=l;break;case"fontname":k.fontFamily=l;break;}f[j]=1;k.commands=f;this.fire("nodeChange",k);return g;},getInstance:function(){return this.frame.getInstance();},render:function(e){this.frame.set("content",this.get("content"));this.frame.render(e);return this;},focus:function(e){this.frame.focus(e);return this;},show:function(){this.frame.show();return this;},hide:function(){this.frame.hide();return this;},getContent:function(){var e="",f=this.getInstance();if(f&&f.Selection){e=f.Selection.unfilter();}e=e.replace(/ _yuid="([^>]*)"/g,"");return e;}},{NORMALIZE_FONTSIZE:function(g){var e=g.getStyle("fontSize"),f=e;switch(e){case"-webkit-xxx-large":e="48px";break;case"xx-large":e="32px";break;case"x-large":e="24px";break;case"large":e="18px";break;case"medium":e="16px";break;case"small":e="13px";break;case"x-small":e="10px";
break;}if(f!==e){g.setStyle("fontSize",e);}return e;},TABKEY:'<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>',FILTER_RGB:function(h){if(h.toLowerCase().indexOf("rgb")!=-1){var k=new RegExp("(.*?)rgb\\s*?\\(\\s*?([0-9]+).*?,\\s*?([0-9]+).*?,\\s*?([0-9]+).*?\\)(.*?)","gi");var f=h.replace(k,"$1,$2,$3,$4,$5").split(",");if(f.length==5){var j=parseInt(f[1],10).toString(16);var i=parseInt(f[2],10).toString(16);var e=parseInt(f[3],10).toString(16);j=j.length==1?"0"+j:j;i=i.length==1?"0"+i:i;e=e.length==1?"0"+e:e;h="#"+j+i+e;}}return h;},TAG2CMD:{"b":"bold","strong":"bold","i":"italic","em":"italic","u":"underline","sup":"superscript","sub":"subscript","img":"insertimage","a":"createlink","ul":"insertunorderedlist","ol":"insertorderedlist"},NC_KEYS:{8:"backspace",9:"tab",13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",46:"delete"},USE:["substitute","node","selector-css3","selection","stylesheet"],NAME:"editorBase",STRINGS:{title:"Rich Text Editor"},ATTRS:{content:{value:"<br>",setter:function(e){if(e.substr(0,1)==="\n"){e=e.substr(1);}if(e===""){e="<br>";}return this.frame.set("content",e);},getter:function(){return this.frame.get("content");}},dir:{writeOnce:true,value:"ltr"},linkedcss:{value:"",setter:function(e){if(this.frame){this.frame.set("linkedcss",e);}return e;}},extracss:{value:false,setter:function(e){if(this.frame){this.frame.set("extracss",e);}return e;}},defaultblock:{value:"p"}}});d.EditorBase=c;},"@VERSION@",{skinnable:false,requires:["base","frame","node","exec-command"]});YUI.add("editor-lists",function(f){var e=function(){e.superclass.constructor.apply(this,arguments);},b="li",c="ol",d="ul",a="host";f.extend(e,f.Base,{_onNodeChange:function(l){var j=this.get(a).getInstance(),g,o,p,h,i,m,n=false,q,k=false;if(f.UA.ie&&l.changedType==="enter"){if(l.changedNode.test(b+", "+b+" *")){l.changedEvent.halt();l.preventDefault();o=l.changedNode;p=j.Node.create("<"+b+">"+e.NON+"</"+b+">");if(!o.test(b)){o=o.ancestor(b);}o.insert(p,"after");g=new j.Selection();g.selectNode(p.get("firstChild"),true,false);}}if(l.changedType==="tab"){if(l.changedNode.test(b+", "+b+" *")){l.changedEvent.halt();l.preventDefault();o=l.changedNode;i=l.changedEvent.shiftKey;m=o.ancestor(c+","+d);q=d;if(m.get("tagName").toLowerCase()===c){q=c;}if(!o.test(b)){o=o.ancestor(b);}if(i){if(o.ancestor(b)){o.ancestor(b).insert(o,"after");n=true;k=true;}}else{if(o.previous(b)){h=j.Node.create("<"+q+"></"+q+">");o.previous(b).append(h);h.append(o);n=true;}}}if(n){if(!o.test(b)){o=o.ancestor(b);}o.all(e.REMOVE).remove();if(f.UA.ie){o=o.append(e.NON).one(e.NON_SEL);}(new j.Selection()).selectNode(o,true,k);}}},initializer:function(){this.get(a).on("nodeChange",f.bind(this._onNodeChange,this));}},{NON:'<span class="yui-non">&nbsp;</span>',NON_SEL:"span.yui-non",REMOVE:"br",NAME:"editorLists",NS:"lists",ATTRS:{host:{value:false}}});f.namespace("Plugin");f.Plugin.EditorLists=e;f.mix(f.Plugin.ExecCommand.COMMANDS,{insertunorderedlist:function(i){var h=this.get("host").getInstance(),g;this.get("host")._execCommand(i,"");},insertorderedlist:function(i){var h=this.get("host").getInstance(),g;this.get("host")._execCommand(i,"");}});},"@VERSION@",{skinnable:false,requires:["editor-base"]});YUI.add("editor-bidi",function(h){var g=function(){g.superclass.constructor.apply(this,arguments);},c="host",b="dir",d="BODY",a="nodeChange",f="bidiContextChange",e=d+" > p";h.extend(g,h.Base,{lastDirection:null,firstEvent:null,_checkForChange:function(){var j=this.get(c),l=j.getInstance(),k=new l.Selection(),i,m;if(k.isCollapsed){i=g.blockParent(k.focusNode);m=i.getStyle("direction");if(m!==this.lastDirection){j.fire(f,{changedTo:m});this.lastDirection=m;}}else{j.fire(f,{changedTo:"select"});this.lastDirection=null;}},_afterNodeChange:function(i){if(this.firstEvent||g.EVENTS[i.changedType]){this._checkForChange();this.firstEvent=false;}},_afterMouseUp:function(i){this._checkForChange();this.firstEvent=false;},initializer:function(){var i=this.get(c);this.firstEvent=true;i.after(a,h.bind(this._afterNodeChange,this));i.after("dom:mouseup",h.bind(this._afterMouseUp,this));}},{EVENTS:{"backspace-up":true,"pageup-up":true,"pagedown-down":true,"end-up":true,"home-up":true,"left-up":true,"up-up":true,"right-up":true,"down-up":true,"delete-up":true},BLOCKS:h.Selection.BLOCKS+",LI,HR,"+d,DIV_WRAPPER:"<DIV></DIV>",blockParent:function(k,j){var i=k,m,l;if(!i){i=h.one(d);}if(!i.test(g.BLOCKS)){i=i.ancestor(g.BLOCKS);}if(j&&i.test(d)){m=h.Node.create(g.DIV_WRAPPER);i.get("children").each(function(o,n){if(n===0){l=o;}else{m.append(o);}});l.replace(m);m.prepend(l);i=m;}return i;},_NODE_SELECTED:"bidiSelected",addParents:function(m){var j,l,k;for(j=0;j<m.length;j+=1){m[j].setData(g._NODE_SELECTED,true);}for(j=0;j<m.length;j+=1){l=m[j].get("parentNode");if(!l.test(d)&&!l.getData(g._NODE_SELECTED)){k=true;l.get("children").some(function(i){if(!i.getData(g._NODE_SELECTED)){k=false;return true;}});if(k){m.push(l);l.setData(g._NODE_SELECTED,true);}}}for(j=0;j<m.length;j+=1){m[j].clearData(g._NODE_SELECTED);}return m;},NAME:"editorBidi",NS:"editorBidi",ATTRS:{host:{value:false}}});h.namespace("Plugin");h.Plugin.EditorBidi=g;h.Plugin.ExecCommand.COMMANDS.bidi=function(m,n){var l=this.getInstance(),k=new l.Selection(),j,p,i,o;l.Selection.filterBlocks();if(k.isCollapsed){p=g.blockParent(k.anchorNode);p.setAttribute(b,n);j=p;}else{i=k.getSelected();o=[];i.each(function(q){if(!q.test(d)){o.push(g.blockParent(q));}});o=l.all(g.addParents(o));o.setAttribute(b,n);j=o;}this.get(c).get(c).editorBidi.checkForChange();return j;};},"@VERSION@",{skinnable:false,requires:["editor-base","selection"]});YUI.add("editor-para",function(g){var c=function(){c.superclass.constructor.apply(this,arguments);},b="host",d="body",a="nodeChange",f=d+" > p",e="p";g.extend(c,g.Base,{_fixFirstPara:function(){var h=this.get(b),j=h.getInstance(),i;j.one("body").set("innerHTML","<"+e+">"+j.Selection.CURSOR+"</"+e+">");i=new j.Selection();i.focusCursor(true,false);
},_onNodeChange:function(q){var v=this.get(b),o=v.getInstance();switch(q.changedType){case"enter":if(g.UA.webkit){if(q.changedEvent.shiftKey){v.execCommand("insertbr");q.changedEvent.preventDefault();}}if(g.UA.gecko&&v.get("defaultblock")!=="p"){var s=q.changedNode,r,j,l=o.Selection.DEFAULT_BLOCK_TAG;if(!s.test(l)){s=s.ancestor(l);}r=o.Node.create("<"+l+">"+o.Selection.CURSOR+"</"+l+">");j=new o.Selection();s.insert(r,"after");j.focusCursor(true,false);q.changedEvent.preventDefault();}break;case"keydown":if(o.config.doc.childNodes.length<2){var w=o.config.doc.body.innerHTML;if(w&&w.length<5&&w.toLowerCase()=="<br>"){this._fixFirstPara();}}break;case"backspace-up":case"backspace-down":case"delete-up":if(!g.UA.ie){var h=o.all(f),u,t,n,k,i,m;t=o.one(d);if(h.item(0)){t=h.item(0);}u=t.one("br");if(u){u.removeAttribute("id");u.removeAttribute("class");}k=o.Selection.getText(t);k=k.replace(/ /g,"").replace(/\n/g,"");m=t.all("img");if(k.length===0&&!m.size()){if(!t.test(e)){this._fixFirstPara();}i=null;if(q.changedNode&&q.changedNode.test(e)){i=q.changedNode;}if(!i&&v._lastPara&&v._lastPara.inDoc()){i=v._lastPara;}if(i&&!i.test(e)){i=i.ancestor(e);}if(i){if(!i.previous()&&i.get("parentNode").test(d)){q.changedEvent.frameEvent.halt();}}}if(g.UA.webkit){if(q.changedNode){t=q.changedNode;if(t.test("li")&&(!t.previous()&&!t.next())){n=t.get("innerHTML").replace("<br>","");if(n===""){if(t.get("parentNode")){t.get("parentNode").replace(o.Node.create("<br>"));q.changedEvent.frameEvent.halt();q.preventDefault();o.Selection.filterBlocks();}}}}}}break;}},_afterEditorReady:function(){var i=this.get(b),j=i.getInstance(),h;if(j){j.Selection.filterBlocks();h=j.Selection.DEFAULT_BLOCK_TAG;f=d+" > "+h;e=h;}},_afterContentChange:function(){var h=this.get(b),i=h.getInstance();if(i&&i.Selection){i.Selection.filterBlocks();}},_afterPaste:function(){var h=this.get(b),j=h.getInstance(),i=new j.Selection();g.later(50,h,function(){j.Selection.filterBlocks();});},initializer:function(){var h=this.get(b);h.on(a,g.bind(this._onNodeChange,this));h.after("ready",g.bind(this._afterEditorReady,this));h.after("contentChange",g.bind(this._afterContentChange,this));if(g.Env.webkit){h.after("dom:paste",g.bind(this._afterPaste,this));}}},{NAME:"editorPara",NS:"editorPara",ATTRS:{host:{value:false}}});g.namespace("Plugin");g.Plugin.EditorPara=c;},"@VERSION@",{skinnable:false,requires:["editor-base","selection"]});YUI.add("editor",function(a){},"@VERSION@",{use:["frame","selection","exec-command","editor-base"],skinnable:false});