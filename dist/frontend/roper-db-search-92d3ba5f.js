/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.24
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2022 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[15],{15:function(e,n){function t(n){return e.exports=t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,t(n)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports},20:function(e,n){e.exports=window.wp.domReady},30:function(e,n,t){var i="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");t.p=window["__wpackIo".concat(i)]},548:function(e,n,t){var i,o,r,a=t(15);!function(t){if("undefined"!=typeof window){var s,d=0,c=!1,u=!1,f="message".length,l="[iFrameSizer]",m=l.length,g=null,p=window.requestAnimationFrame,h={max:1,scroll:1,bodyScroll:1,documentElementScroll:1},w={},b=null,y={autoResize:!0,bodyBackground:null,bodyMargin:null,bodyMarginV1:8,bodyPadding:null,checkOrigin:!0,inPageLinks:!1,enablePublicMethods:!0,heightCalculationMethod:"bodyOffset",id:"iFrameResizer",interval:32,log:!1,maxHeight:1/0,maxWidth:1/0,minHeight:0,minWidth:0,mouseEvents:!0,resizeFrom:"parent",scrolling:!1,sizeHeight:!0,sizeWidth:!1,warningTimeout:5e3,tolerance:0,widthCalculationMethod:"scroll",onClose:function(){return!0},onClosed:function(){},onInit:function(){},onMessage:function(){R("onMessage function not defined")},onMouseEnter:function(){},onMouseLeave:function(){},onResized:function(){},onScroll:function(){return!0}},v={};window.jQuery&&((s=window.jQuery).fn?s.fn.iFrameResize||(s.fn.iFrameResize=function(e){return this.filter("iframe").each((function(n,t){V(t,e)})).end()}):O("","Unable to bind to jQuery, it is not fully loaded.")),o=[],void 0===(r="function"==typeof(i=X)?i.apply(n,o):i)||(e.exports=r),window.iFrameResize=window.iFrameResize||X()}function x(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function k(e,n,t){e.addEventListener(n,t,!1)}function M(e,n,t){e.removeEventListener(n,t,!1)}function I(e){return l+"["+function(e){var n="Host page: "+e;return window.top!==window.self&&(n=window.parentIFrame&&window.parentIFrame.getId?window.parentIFrame.getId()+": "+e:"Nested host page: "+e),n}(e)+"]"}function z(e){return w[e]?w[e].log:c}function F(e,n){T("log",e,n,z(e))}function O(e,n){T("info",e,n,z(e))}function R(e,n){T("warn",e,n,!0)}function T(e,n,t,i){!0===i&&"object"===a(window.console)&&console[e](I(n),t)}function E(e){function n(){o("Height"),o("Width"),A((function(){L(E),H(N),p("onResized",E)}),E,"init")}function t(e){return"border-box"!==e.boxSizing?0:(e.paddingTop?parseInt(e.paddingTop,10):0)+(e.paddingBottom?parseInt(e.paddingBottom,10):0)}function i(e){return"border-box"!==e.boxSizing?0:(e.borderTopWidth?parseInt(e.borderTopWidth,10):0)+(e.borderBottomWidth?parseInt(e.borderBottomWidth,10):0)}function o(e){var n=Number(w[N]["max"+e]),t=Number(w[N]["min"+e]),i=e.toLowerCase(),o=Number(E[i]);F(N,"Checking "+i+" is in range "+t+"-"+n),o<t&&(o=t,F(N,"Set "+i+" to min value")),o>n&&(o=n,F(N,"Set "+i+" to max value")),E[i]=""+o}function r(e){return T.substr(T.indexOf(":")+f+e)}function a(e,n){var t,i,o;t=function(){var t,i;B("Send Page Info","pageInfo:"+(t=document.body.getBoundingClientRect(),i=E.iframe.getBoundingClientRect(),JSON.stringify({iframeHeight:i.height,iframeWidth:i.width,clientHeight:Math.max(document.documentElement.clientHeight,window.innerHeight||0),clientWidth:Math.max(document.documentElement.clientWidth,window.innerWidth||0),offsetTop:parseInt(i.top-t.top,10),offsetLeft:parseInt(i.left-t.left,10),scrollTop:window.pageYOffset,scrollLeft:window.pageXOffset,documentHeight:document.documentElement.clientHeight,documentWidth:document.documentElement.clientWidth,windowHeight:window.innerHeight,windowWidth:window.innerWidth})),e,n)},i=32,v[o=n]||(v[o]=setTimeout((function(){v[o]=null,t()}),i))}function s(e){var n=e.getBoundingClientRect();return C(N),{x:Math.floor(Number(n.left)+Number(g.x)),y:Math.floor(Number(n.top)+Number(g.y))}}function d(e){var n=e?s(E.iframe):{x:0,y:0},t={x:Number(E.width)+n.x,y:Number(E.height)+n.y};F(N,"Reposition requested from iFrame (offset x:"+n.x+" y:"+n.y+")"),window.top!==window.self?window.parentIFrame?window.parentIFrame["scrollTo"+(e?"Offset":"")](t.x,t.y):R(N,"Unable to scroll to requested position, window.parentIFrame not found"):(g=t,c(),F(N,"--"))}function c(){!1!==p("onScroll",g)?H(N):j()}function u(e){var n={};if(0===Number(E.width)&&0===Number(E.height)){var t=r(9).split(":");n={x:t[1],y:t[0]}}else n={x:E.width,y:E.height};p(e,{iframe:E.iframe,screenX:Number(n.x),screenY:Number(n.y),type:E.type})}function p(e,n){return S(N,e,n)}var h,b,y,x,I,z,T=e.data,E={},N=null;"[iFrameResizerChild]Ready"===T?function(){for(var e in w)B("iFrame requested init",q(e),w[e].iframe,e)}():l===(""+T).substr(0,m)&&T.substr(m).split(":")[0]in w?(y=T.substr(m).split(":"),x=y[1]?parseInt(y[1],10):0,I=w[y[0]]&&w[y[0]].iframe,z=getComputedStyle(I),E={iframe:I,id:y[0],height:x+t(z)+i(z),width:y[2],type:y[3]},N=E.id,w[N]&&(w[N].loaded=!0),(b=E.type in{true:1,false:1,undefined:1})&&F(N,"Ignoring init message from meta parent page"),!b&&function(e){var n=!0;return w[e]||(n=!1,R(E.type+" No settings for "+e+". Message was: "+T)),n}(N)&&(F(N,"Received: "+T),h=!0,null===E.iframe&&(R(N,"IFrame ("+E.id+") not found"),h=!1),h&&function(){var n,t=e.origin,i=w[N]&&w[N].checkOrigin;if(i&&""+t!="null"&&!(i.constructor===Array?function(){var e=0,n=!1;for(F(N,"Checking connection is from allowed list of origins: "+i);e<i.length;e++)if(i[e]===t){n=!0;break}return n}():(n=w[N]&&w[N].remoteHost,F(N,"Checking connection is from: "+n),t===n)))throw new Error("Unexpected message received from: "+t+" for "+E.iframe.id+". Message was: "+e.data+". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.");return!0}()&&function(){switch(w[N]&&w[N].firstRun&&w[N]&&(w[N].firstRun=!1),E.type){case"close":W(E.iframe);break;case"message":l=r(6),F(N,"onMessage passed: {iframe: "+E.iframe.id+", message: "+l+"}"),p("onMessage",{iframe:E.iframe,message:JSON.parse(l)}),F(N,"--");break;case"mouseenter":u("onMouseEnter");break;case"mouseleave":u("onMouseLeave");break;case"autoResize":w[N].autoResize=JSON.parse(r(9));break;case"scrollTo":d(!1);break;case"scrollToOffset":d(!0);break;case"pageInfo":a(w[N]&&w[N].iframe,N),function(){function e(e,i){function o(){w[t]?a(w[t].iframe,t):n()}["scroll","resize"].forEach((function(n){F(t,e+n+" listener for sendPageInfo"),i(window,n,o)}))}function n(){e("Remove ",M)}var t=N;e("Add ",k),w[t]&&(w[t].stopPageInfo=n)}();break;case"pageInfoStop":w[N]&&w[N].stopPageInfo&&(w[N].stopPageInfo(),delete w[N].stopPageInfo);break;case"inPageLink":e=r(9),i=e.split("#")[1]||"",o=decodeURIComponent(i),(f=document.getElementById(o)||document.getElementsByName(o)[0])?(t=s(f),F(N,"Moving to in page link (#"+i+") at x: "+t.x+" y: "+t.y),g={x:t.x,y:t.y},c(),F(N,"--")):window.top!==window.self?window.parentIFrame?window.parentIFrame.moveToAnchor(i):F(N,"In page link #"+i+" not found and window.parentIFrame not found"):F(N,"In page link #"+i+" not found");break;case"reset":P(E);break;case"init":n(),p("onInit",E.iframe);break;default:0===Number(E.width)&&0===Number(E.height)?R("Unsupported message received ("+E.type+"), this is likely due to the iframe containing a later version of iframe-resizer than the parent page"):n()}var e,t,i,o,f,l}())):O(N,"Ignored: "+T)}function S(e,n,t){var i=null,o=null;if(w[e]){if("function"!=typeof(i=w[e][n]))throw new TypeError(n+" on iFrame["+e+"] is not a function");o=i(t)}return o}function N(e){var n=e.id;delete w[n]}function W(e){var n=e.id;if(!1!==S(n,"onClose",n)){F(n,"Removing iFrame: "+n);try{e.parentNode&&e.parentNode.removeChild(e)}catch(e){R(e)}S(n,"onClosed",n),F(n,"--"),N(e)}else F(n,"Close iframe cancelled by onClose event")}function C(e){null===g&&F(e,"Get page position: "+(g={x:void 0!==window.pageXOffset?window.pageXOffset:document.documentElement.scrollLeft,y:void 0!==window.pageYOffset?window.pageYOffset:document.documentElement.scrollTop}).x+","+g.y)}function H(e){null!==g&&(window.scrollTo(g.x,g.y),F(e,"Set page position: "+g.x+","+g.y),j())}function j(){g=null}function P(e){F(e.id,"Size reset requested by "+("init"===e.type?"host page":"iFrame")),C(e.id),A((function(){L(e),B("reset","reset",e.iframe,e.id)}),e,"reset")}function L(e){function n(n){u||"0"!==e[n]||(u=!0,F(i,"Hidden iFrame detected, creating visibility listener"),function(){function e(){Object.keys(w).forEach((function(e){!function(e){function n(n){return"0px"===(w[e]&&w[e].iframe.style[n])}w[e]&&null!==w[e].iframe.offsetParent&&(n("height")||n("width"))&&B("Visibility change","resize",w[e].iframe,e)}(e)}))}function n(n){F("window","Mutation observed: "+n[0].target+" "+n[0].type),U(e,16)}var t=x();t&&(i=document.querySelector("body"),new t(n).observe(i,{attributes:!0,attributeOldValue:!1,characterData:!0,characterDataOldValue:!1,childList:!0,subtree:!0}));var i}())}function t(t){!function(n){e.id?(e.iframe.style[n]=e[n]+"px",F(e.id,"IFrame ("+i+") "+n+" set to "+e[n]+"px")):F("undefined","messageData id not set")}(t),n(t)}var i=e.iframe.id;w[i]&&(w[i].sizeHeight&&t("height"),w[i].sizeWidth&&t("width"))}function A(e,n,t){t!==n.type&&p&&!window.jasmine?(F(n.id,"Requesting animation frame"),p(e)):e()}function B(e,n,t,i,o){var r,a=!1;i=i||t.id,w[i]&&(t&&"contentWindow"in t&&null!==t.contentWindow?(r=w[i]&&w[i].targetOrigin,F(i,"["+e+"] Sending msg to iframe["+i+"] ("+n+") targetOrigin: "+r),t.contentWindow.postMessage(l+n,r)):R(i,"["+e+"] IFrame("+i+") not found"),o&&w[i]&&w[i].warningTimeout&&(w[i].msgTimeout=setTimeout((function(){!w[i]||w[i].loaded||a||(a=!0,R(i,"IFrame has not responded within "+w[i].warningTimeout/1e3+" seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ignored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning."))}),w[i].warningTimeout)))}function q(e){return e+":"+w[e].bodyMarginV1+":"+w[e].sizeWidth+":"+w[e].log+":"+w[e].interval+":"+w[e].enablePublicMethods+":"+w[e].autoResize+":"+w[e].bodyMargin+":"+w[e].heightCalculationMethod+":"+w[e].bodyBackground+":"+w[e].bodyPadding+":"+w[e].tolerance+":"+w[e].inPageLinks+":"+w[e].resizeFrom+":"+w[e].widthCalculationMethod+":"+w[e].mouseEvents}function V(e,n){function t(e){var n=e.split("Callback");if(2===n.length){var t="on"+n[0].charAt(0).toUpperCase()+n[0].slice(1);this[t]=this[e],delete this[e],R(r,"Deprecated: '"+e+"' has been renamed '"+t+"'. The old method will be removed in the next major version.")}}var i,o,r=function(t){var i;return""===t&&(e.id=(i=n&&n.id||y.id+d++,null!==document.getElementById(i)&&(i+=d++),t=i),c=(n||{}).log,F(t,"Added missing iframe ID: "+t+" ("+e.src+")")),t}(e.id);r in w&&"iFrameResizer"in e?R(r,"Ignored iFrame, already setup."):(!function(n){var i;n=n||{},w[r]={firstRun:!0,iframe:e,remoteHost:e.src&&e.src.split("/").slice(0,3).join("/")},function(e){if("object"!==a(e))throw new TypeError("Options is not an object")}(n),Object.keys(n).forEach(t,n),function(e){for(var n in y)Object.prototype.hasOwnProperty.call(y,n)&&(w[r][n]=Object.prototype.hasOwnProperty.call(e,n)?e[n]:y[n])}(n),w[r]&&(w[r].targetOrigin=!0===w[r].checkOrigin?""===(i=w[r].remoteHost)||null!==i.match(/^(about:blank|javascript:|file:\/\/)/)?"*":i:"*")}(n),function(){switch(F(r,"IFrame scrolling "+(w[r]&&w[r].scrolling?"enabled":"disabled")+" for "+r),e.style.overflow=!1===(w[r]&&w[r].scrolling)?"hidden":"auto",w[r]&&w[r].scrolling){case"omit":break;case!0:e.scrolling="yes";break;case!1:e.scrolling="no";break;default:e.scrolling=w[r]?w[r].scrolling:"no"}}(),function(){function n(n){var t=w[r][n];1/0!==t&&0!==t&&(e.style[n]="number"==typeof t?t+"px":t,F(r,"Set "+n+" = "+e.style[n]))}function t(e){if(w[r]["min"+e]>w[r]["max"+e])throw new Error("Value for min"+e+" can not be greater than max"+e)}t("Height"),t("Width"),n("maxHeight"),n("minHeight"),n("maxWidth"),n("minWidth")}(),"number"!=typeof(w[r]&&w[r].bodyMargin)&&"0"!==(w[r]&&w[r].bodyMargin)||(w[r].bodyMarginV1=w[r].bodyMargin,w[r].bodyMargin=w[r].bodyMargin+"px"),i=q(r),(o=x())&&function(n){e.parentNode&&new n((function(n){n.forEach((function(n){Array.prototype.slice.call(n.removedNodes).forEach((function(n){n===e&&W(e)}))}))})).observe(e.parentNode,{childList:!0})}(o),k(e,"load",(function(){var n,t;B("iFrame.onload",i,e,void 0,!0),n=w[r]&&w[r].firstRun,t=w[r]&&w[r].heightCalculationMethod in h,!n&&t&&P({iframe:e,height:0,width:0,type:"init"})})),B("init",i,e,void 0,!0),w[r]&&(w[r].iframe.iFrameResizer={close:W.bind(null,w[r].iframe),removeListeners:N.bind(null,w[r].iframe),resize:B.bind(null,"Window resize","resize",w[r].iframe),moveToAnchor:function(e){B("Move to anchor","moveToAnchor:"+e,w[r].iframe,r)},sendMessage:function(e){B("Send Message","message:"+(e=JSON.stringify(e)),w[r].iframe,r)}}))}function U(e,n){null===b&&(b=setTimeout((function(){b=null,e()}),n))}function _(){"hidden"!==document.visibilityState&&(F("document","Trigger event: Visiblity change"),U((function(){D("Tab Visable","resize")}),16))}function D(e,n){Object.keys(w).forEach((function(t){(function(e){return w[e]&&"parent"===w[e].resizeFrom&&w[e].autoResize&&!w[e].firstRun})(t)&&B(e,n,w[t].iframe,t)}))}function J(){k(window,"message",E),k(window,"resize",(function(){var e;F("window","Trigger event: "+(e="resize")),U((function(){D("Window "+e,"resize")}),16)})),k(document,"visibilitychange",_),k(document,"-webkit-visibilitychange",_)}function X(){function e(e,t){t&&(!function(){if(!t.tagName)throw new TypeError("Object is not a valid DOM element");if("IFRAME"!==t.tagName.toUpperCase())throw new TypeError("Expected <IFRAME> tag, found <"+t.tagName+">")}(),V(t,e),n.push(t))}var n;return function(){var e,n=["moz","webkit","o","ms"];for(e=0;e<n.length&&!p;e+=1)p=window[n[e]+"RequestAnimationFrame"];p?p=p.bind(window):F("setup","RequestAnimationFrame not supported")}(),J(),function(t,i){switch(n=[],function(e){e&&e.enablePublicMethods&&R("enablePublicMethods option has been removed, public methods are now always available in the iFrame")}(t),a(i)){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(i||"iframe"),e.bind(void 0,t));break;case"object":e(t,i);break;default:throw new TypeError("Unexpected data type ("+a(i)+")")}return n}}}()},628:function(e,n,t){t(30),e.exports=t(664)},664:function(e,n,t){"use strict";t.r(n);var i=t(20),o=t.n(i),r=t(548),a=t.n(r);o()((function(){var e=document.querySelector("#frameSec");e&&(e.style.width="100%",a()({log:!1},"#frameSec"))}))}},[[628,0]]]);
//# sourceMappingURL=roper-db-search-92d3ba5f.js.map