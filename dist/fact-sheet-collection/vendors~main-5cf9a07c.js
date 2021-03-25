/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2021 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window["wpackioprcBlocksLibraryfact-sheet-collectionJsonp"]=window["wpackioprcBlocksLibraryfact-sheet-collectionJsonp"]||[]).push([[5],{117:function(e,t,r){e.exports=r(158)},119:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(0),a=r(135),i=r.n(a);function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function s(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}var o=function(e){var t,a;function o(){return e.apply(this,arguments)||this}a=e,(t=o).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a;var u=o.prototype;return u.componentDidMount=function(){var e;try{e=r(156)}catch(e){return}e&&e()},u.renderSources=function(){var e=i.a&&document.documentMode?document.documentMode:-1,t=this.props.sources;if(null==t)return null;var r=t.map((function(e,t){return null==e.srcSet?null:n.createElement("source",{key:"sources-"+t,srcSet:e.srcSet,media:e.media,type:e.type})}));return 9===e?n.createElement("video",{style:{display:"none"}},r):r},u.renderImage=function(e,t){void 0===t&&(t=!1);var r=e.alt,a=void 0===r?"":r,i=e.src,o=void 0===i?"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==":i,u=e.sizes,l=s(e,["alt","src","sizes"]),f=t?null:{sizes:u};return n.createElement("img",c({alt:a,srcSet:o},f,l))},u.render=function(){var e=this.props,t=e.sources,r=s(e,["sources"]);return null!=t?n.createElement("picture",null,this.renderSources(),this.renderImage(r,!0)):this.renderImage(r)},o}(n.PureComponent),u=r(117),l=r.n(u);l()("div")({width:"100%",height:"100%",position:"relative"}),l()("div")({overflow:"hidden",top:0,left:0,right:0,bottom:0,position:"absolute"}),l()(o)((function(e){var t=e.cover,r=void 0===t?"both":t,n=e.center,a=void 0===n||n;return{position:"absolute",top:a?"50%":0,left:a?"50%":0,transform:a?"translate(-50%, -50%)":"none",width:"width"===r?"100%":"auto",height:"height"===r?"100%":"auto",minHeight:"both"===r?"100%":"none",minWidth:"both"===r?"100%":"none"}}))},135:function(e,t){var r=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=r},139:function(e,t,r){"use strict";r.d(t,"a",(function(){return l}));var n=r(18),a=r(79);var i=r(86);function c(e){return function(e){if(Array.isArray(e))return Object(a.a)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(i.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var s=r(24),o=r(12);function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window,t=e.navigator.platform;return-1!==t.indexOf("Mac")||Object(s.includes)(["iPad","iPhone"],t)}var l=40,f="alt",d="ctrl",p="meta",m="shift",h={primary:function(e){return e()?[p]:[d]},primaryShift:function(e){return e()?[m,p]:[d,m]},primaryAlt:function(e){return e()?[f,p]:[d,f]},secondary:function(e){return e()?[m,f,p]:[d,m,f]},access:function(e){return e()?[d,f]:[m,f]},ctrl:function(){return[d]},alt:function(){return[f]},ctrlShift:function(){return[d,m]},shift:function(){return[m]},shiftAlt:function(){return[m,f]}},v=(Object(s.mapValues)(h,(function(e){return function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u;return[].concat(c(e(r)),[t.toLowerCase()]).join("+")}})),Object(s.mapValues)(h,(function(e){return function(t){var r,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u,i=a(),o=(r={},Object(n.a)(r,f,i?"⌥":"Alt"),Object(n.a)(r,d,i?"⌃":"Ctrl"),Object(n.a)(r,p,"⌘"),Object(n.a)(r,m,i?"⇧":"Shift"),r),l=e(a).reduce((function(e,t){var r=Object(s.get)(o,t,t);return[].concat(c(e),i?[r]:[r,"+"])}),[]),h=Object(s.capitalize)(t);return[].concat(c(l),[h])}})));Object(s.mapValues)(v,(function(e){return function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u;return e(t,r).join("")}})),Object(s.mapValues)(h,(function(e){return function(t){var r,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u,i=a(),l=(r={},Object(n.a)(r,m,"Shift"),Object(n.a)(r,p,i?"Command":"Control"),Object(n.a)(r,d,"Control"),Object(n.a)(r,f,i?"Option":"Alt"),Object(n.a)(r,",",Object(o.__)("Comma")),Object(n.a)(r,".",Object(o.__)("Period")),Object(n.a)(r,"`",Object(o.__)("Backtick")),r);return[].concat(c(e(a)),[t]).map((function(e){return Object(s.capitalize)(Object(s.get)(l,e,e))})).join(i?" ":" + ")}}));function A(e){return[f,d,p,m].filter((function(t){return e["".concat(t,"Key")]}))}Object(s.mapValues)(h,(function(e){return function(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:u,a=e(n),i=A(t);return!Object(s.xor)(a,i).length&&(r?t.key===r:Object(s.includes)(a,t.key.toLowerCase()))}}))},156:function(e,t,r){(function(e){var n,a=r(28);
/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
/*! Gecko-Picture - v1.0
 * https://github.com/scottjehl/picturefill/tree/3.0/src/plugins/gecko-picture
 * Firefox's early picture implementation (prior to FF41) is static and does
 * not react to viewport changes. This tiny module fixes this.
 */
!function(e){var t,r,n,a,i,c,s,o=navigator.userAgent;e.HTMLPictureElement&&/ecko/.test(o)&&o.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",(r=document.createElement("source"),n=function(e){var t,n,a=e.parentNode;"PICTURE"===a.nodeName.toUpperCase()?(t=r.cloneNode(),a.insertBefore(t,a.firstElementChild),setTimeout((function(){a.removeChild(t)}))):(!e._pfLastSize||e.offsetWidth>e._pfLastSize)&&(e._pfLastSize=e.offsetWidth,n=e.sizes,e.sizes+=",100vw",setTimeout((function(){e.sizes=n})))},a=function(){var e,t=document.querySelectorAll("picture > img, img[srcset][sizes]");for(e=0;e<t.length;e++)n(t[e])},i=function(){clearTimeout(t),t=setTimeout(a,99)},c=e.matchMedia&&matchMedia("(orientation: landscape)"),s=function(){i(),c&&c.addListener&&c.addListener(i)},r.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?s():document.addEventListener("DOMContentLoaded",s),i))}(window),
/*! Picturefill - v3.0.2
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;
 *  License: MIT
 */
function(i,c,s){"use strict";var o,u,l;c.createElement("picture");var f={},d=!1,p=function(){},m=c.createElement("img"),h=m.getAttribute,v=m.setAttribute,A=m.removeAttribute,b=c.documentElement,g={},y={algorithm:""},j=navigator.userAgent,O=/rident/.test(j)||/ecko/.test(j)&&j.match(/rv\:(\d+)/)&&RegExp.$1>35,w="currentSrc",x=/\s+\+?\d+(e\d+)?w/,E=/(\([^)]+\))?\s*(.+)/,S=i.picturefillCFG,N="font-size:100%!important;",T=!0,z={},C={},P=i.devicePixelRatio,k={px:1,in:96},L=c.createElement("a"),R=!1,M=/^[ \t\n\r\u000c]+/,B=/^[, \t\n\r\u000c]+/,I=/^[^ \t\n\r\u000c]+/,D=/[,]+$/,G=/^\d+$/,$=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,U=function(e,t,r,n){e.addEventListener?e.addEventListener(t,r,n||!1):e.attachEvent&&e.attachEvent("on"+t,r)},W=function(e){var t={};return function(r){return r in t||(t[r]=e(r)),t[r]}};function _(e){return" "===e||"\t"===e||"\n"===e||"\f"===e||"\r"===e}var H,Q,K,V,F,q,J,X,Z,Y,ee,te,re,ne,ae,ie,ce=(H=/^([\d\.]+)(em|vw|px)$/,Q=W((function(e){return"return "+function(){for(var e=arguments,t=0,r=e[0];++t in e;)r=r.replace(e[t],e[++t]);return r}((e||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"})),function(e,t){var r;if(!(e in z))if(z[e]=!1,t&&(r=e.match(H)))z[e]=r[1]*k[r[2]];else try{z[e]=new Function("e",Q(e))(k)}catch(e){}return z[e]}),se=function(e,t){return e.w?(e.cWidth=f.calcListLength(t||"100vw"),e.res=e.w/e.cWidth):e.res=e.d,e},oe=function(e){if(d){var t,r,n,a=e||{};if(a.elements&&1===a.elements.nodeType&&("IMG"===a.elements.nodeName.toUpperCase()?a.elements=[a.elements]:(a.context=a.elements,a.elements=null)),n=(t=a.elements||f.qsa(a.context||c,a.reevaluate||a.reselect?f.sel:f.selShort)).length){for(f.setupRun(a),R=!0,r=0;r<n;r++)f.fillImg(t[r],a);f.teardownRun(a)}}};function ue(e,t){return e.res-t.res}function le(e,t){var r,n,a;if(e&&t)for(a=f.parseSet(t),e=f.makeUrl(e),r=0;r<a.length;r++)if(e===f.makeUrl(a[r].url)){n=a[r];break}return n}i.console&&console.warn,w in m||(w="src"),g["image/jpeg"]=!0,g["image/gif"]=!0,g["image/png"]=!0,g["image/svg+xml"]=c.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),f.ns=("pf"+(new Date).getTime()).substr(0,9),f.supSrcset="srcset"in m,f.supSizes="sizes"in m,f.supPicture=!!i.HTMLPictureElement,f.supSrcset&&f.supPicture&&!f.supSizes&&(K=c.createElement("img"),m.srcset="data:,a",K.src="data:,a",f.supSrcset=m.complete===K.complete,f.supPicture=f.supSrcset&&f.supPicture),f.supSrcset&&!f.supSizes?(V="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",F=c.createElement("img"),q=function(){2===F.width&&(f.supSizes=!0),u=f.supSrcset&&!f.supSizes,d=!0,setTimeout(oe)},F.onload=q,F.onerror=q,F.setAttribute("sizes","9px"),F.srcset=V+" 1w,data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw== 9w",F.src=V):d=!0,f.selShort="picture>img,img[srcset]",f.sel=f.selShort,f.cfg=y,f.DPR=P||1,f.u=k,f.types=g,f.setSize=p,f.makeUrl=W((function(e){return L.href=e,L.href})),f.qsa=function(e,t){return"querySelector"in e?e.querySelectorAll(t):[]},f.matchesMedia=function(){return i.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?f.matchesMedia=function(e){return!e||matchMedia(e).matches}:f.matchesMedia=f.mMQ,f.matchesMedia.apply(this,arguments)},f.mMQ=function(e){return!e||ce(e)},f.calcLength=function(e){var t=ce(e,!0)||!1;return t<0&&(t=!1),t},f.supportsType=function(e){return!e||g[e]},f.parseSize=W((function(e){var t=(e||"").match(E);return{media:t&&t[1],length:t&&t[2]}})),f.parseSet=function(e){return e.cands||(e.cands=function(e,t){function r(t){var r,n=t.exec(e.substring(u));if(n)return r=n[0],u+=r.length,r}var n,a,i,c,s,o=e.length,u=0,l=[];function f(){var e,r,i,c,s,o,u,f,d,p=!1,m={};for(c=0;c<a.length;c++)o=(s=a[c])[s.length-1],u=s.substring(0,s.length-1),f=parseInt(u,10),d=parseFloat(u),G.test(u)&&"w"===o?((e||r)&&(p=!0),0===f?p=!0:e=f):$.test(u)&&"x"===o?((e||r||i)&&(p=!0),d<0?p=!0:r=d):G.test(u)&&"h"===o?((i||r)&&(p=!0),0===f?p=!0:i=f):p=!0;p||(m.url=n,e&&(m.w=e),r&&(m.d=r),i&&(m.h=i),i||r||e||(m.d=1),1===m.d&&(t.has1x=!0),m.set=t,l.push(m))}function d(){for(r(M),i="",c="in descriptor";;){if(s=e.charAt(u),"in descriptor"===c)if(_(s))i&&(a.push(i),i="",c="after descriptor");else{if(","===s)return u+=1,i&&a.push(i),void f();if("("===s)i+=s,c="in parens";else{if(""===s)return i&&a.push(i),void f();i+=s}}else if("in parens"===c)if(")"===s)i+=s,c="in descriptor";else{if(""===s)return a.push(i),void f();i+=s}else if("after descriptor"===c)if(_(s));else{if(""===s)return void f();c="in descriptor",u-=1}u+=1}}for(;;){if(r(B),u>=o)return l;n=r(I),a=[],","===n.slice(-1)?(n=n.replace(D,""),f()):d()}}(e.srcset,e)),e.cands},f.getEmValue=function(){var e;if(!o&&(e=c.body)){var t=c.createElement("div"),r=b.style.cssText,n=e.style.cssText;t.style.cssText="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",b.style.cssText=N,e.style.cssText=N,e.appendChild(t),o=t.offsetWidth,e.removeChild(t),o=parseFloat(o,10),b.style.cssText=r,e.style.cssText=n}return o||16},f.calcListLength=function(e){if(!(e in C)||y.uT){var t=f.calcLength(function(e){var t,r,n,a,i,c,s,o=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,u=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(n=(r=function(e){var t,r="",n=[],a=[],i=0,c=0,s=!1;function o(){r&&(n.push(r),r="")}function u(){n[0]&&(a.push(n),n=[])}for(;;){if(""===(t=e.charAt(c)))return o(),u(),a;if(s){if("*"===t&&"/"===e[c+1]){s=!1,c+=2,o();continue}c+=1}else{if(_(t)){if(e.charAt(c-1)&&_(e.charAt(c-1))||!r){c+=1;continue}if(0===i){o(),c+=1;continue}t=" "}else if("("===t)i+=1;else if(")"===t)i-=1;else{if(","===t){o(),u(),c+=1;continue}if("/"===t&&"*"===e.charAt(c+1)){s=!0,c+=2;continue}}r+=t,c+=1}}}(e)).length,t=0;t<n;t++)if(i=(a=r[t])[a.length-1],s=i,o.test(s)&&parseFloat(s)>=0||u.test(s)||"0"===s||"-0"===s||"+0"===s){if(c=i,a.pop(),0===a.length)return c;if(a=a.join(" "),f.matchesMedia(a))return c}return"100vw"}(e));C[e]=t||k.width}return C[e]},f.setRes=function(e){var t;if(e)for(var r=0,n=(t=f.parseSet(e)).length;r<n;r++)se(t[r],e.sizes);return t},f.setRes.res=se,f.applySetCandidate=function(e,t){if(e.length){var r,n,a,i,c,s,o,u,l,d,p,m,h,v,A,b,g=t[f.ns],j=f.DPR;if(s=g.curSrc||t[w],(o=g.curCan||function(e,t,r){var n;return!r&&t&&(r=(r=e[f.ns].sets)&&r[r.length-1]),(n=le(t,r))&&(t=f.makeUrl(t),e[f.ns].curSrc=t,e[f.ns].curCan=n,n.res||se(n,n.set.sizes)),n}(t,s,e[0].set))&&o.set===e[0].set&&((l=O&&!t.complete&&o.res-.1>j)||(o.cached=!0,o.res>=j&&(c=o))),!c)for(e.sort(ue),c=e[(i=e.length)-1],n=0;n<i;n++)if((r=e[n]).res>=j){c=e[a=n-1]&&(l||s!==f.makeUrl(r.url))&&(d=e[a].res,p=r.res,m=j,h=e[a].cached,v=void 0,A=void 0,b=void 0,"saveData"===y.algorithm?d>2.7?b=m+1:(A=(p-m)*(v=Math.pow(d-.6,1.5)),h&&(A+=.1*v),b=d+A):b=m>1?Math.sqrt(d*p):d,b>m)?e[a]:r;break}c&&(u=f.makeUrl(c.url),g.curSrc=u,g.curCan=c,u!==s&&f.setSrc(t,c),f.setSize(t))}},f.setSrc=function(e,t){var r;e.src=t.url,"image/svg+xml"===t.set.type&&(r=e.style.width,e.style.width=e.offsetWidth+1+"px",e.offsetWidth+1&&(e.style.width=r))},f.getSet=function(e){var t,r,n,a=!1,i=e[f.ns].sets;for(t=0;t<i.length&&!a;t++)if((r=i[t]).srcset&&f.matchesMedia(r.media)&&(n=f.supportsType(r.type))){"pending"===n&&(r=n),a=r;break}return a},f.parseSets=function(e,t,r){var n,a,i,c,s=t&&"PICTURE"===t.nodeName.toUpperCase(),o=e[f.ns];(void 0===o.src||r.src)&&(o.src=h.call(e,"src"),o.src?v.call(e,"data-pfsrc",o.src):A.call(e,"data-pfsrc")),(void 0===o.srcset||r.srcset||!f.supSrcset||e.srcset)&&(n=h.call(e,"srcset"),o.srcset=n,c=!0),o.sets=[],s&&(o.pic=!0,function(e,t){var r,n,a,i,c=e.getElementsByTagName("source");for(r=0,n=c.length;r<n;r++)(a=c[r])[f.ns]=!0,(i=a.getAttribute("srcset"))&&t.push({srcset:i,media:a.getAttribute("media"),type:a.getAttribute("type"),sizes:a.getAttribute("sizes")})}(t,o.sets)),o.srcset?(a={srcset:o.srcset,sizes:h.call(e,"sizes")},o.sets.push(a),(i=(u||o.src)&&x.test(o.srcset||""))||!o.src||le(o.src,a)||a.has1x||(a.srcset+=", "+o.src,a.cands.push({url:o.src,d:1,set:a}))):o.src&&o.sets.push({srcset:o.src,sizes:null}),o.curCan=null,o.curSrc=void 0,o.supported=!(s||a&&!f.supSrcset||i&&!f.supSizes),c&&f.supSrcset&&!o.supported&&(n?(v.call(e,"data-pfsrcset",n),e.srcset=""):A.call(e,"data-pfsrcset")),o.supported&&!o.srcset&&(!o.src&&e.src||e.src!==f.makeUrl(o.src))&&(null===o.src?e.removeAttribute("src"):e.src=o.src),o.parsed=!0},f.fillImg=function(e,t){var r,n=t.reselect||t.reevaluate;e[f.ns]||(e[f.ns]={}),r=e[f.ns],(n||r.evaled!==l)&&(r.parsed&&!t.reevaluate||f.parseSets(e,e.parentNode,t),r.supported?r.evaled=l:function(e){var t,r=f.getSet(e),n=!1;"pending"!==r&&(n=l,r&&(t=f.setRes(r),f.applySetCandidate(t,e))),e[f.ns].evaled=n}(e))},f.setupRun=function(){R&&!T&&P===i.devicePixelRatio||(T=!1,P=i.devicePixelRatio,z={},C={},f.DPR=P||1,k.width=Math.max(i.innerWidth||0,b.clientWidth),k.height=Math.max(i.innerHeight||0,b.clientHeight),k.vw=k.width/100,k.vh=k.height/100,l=[k.height,k.width,P].join("-"),k.em=f.getEmValue(),k.rem=k.em)},f.supPicture?(oe=p,f.fillImg=p):(re=i.attachEvent?/d$|^c/:/d$|^c|^i/,ne=function e(){var t=c.readyState||"";ae=setTimeout(e,"loading"===t?200:999),c.body&&(f.fillImgs(),(J=J||re.test(t))&&clearTimeout(ae))},ae=setTimeout(ne,c.body?9:99),ie=b.clientHeight,U(i,"resize",(X=function(){T=Math.max(i.innerWidth||0,b.clientWidth)!==k.width||b.clientHeight!==ie,ie=b.clientHeight,T&&f.fillImgs()},Z=99,te=function e(){var t=new Date-ee;t<Z?Y=setTimeout(e,Z-t):(Y=null,X())},function(){ee=new Date,Y||(Y=setTimeout(te,Z))})),U(c,"readystatechange",ne)),f.picturefill=oe,f.fillImgs=oe,f.teardownRun=p,oe._=f,i.picturefillCFG={pf:f,push:function(e){var t=e.shift();"function"==typeof f[t]?f[t].apply(f,e):(y[t]=e[0],R&&f.fillImgs({reselect:!0}))}};for(;S&&S.length;)i.picturefillCFG.push(S.shift());i.picturefill=oe,"object"===a(e)&&"object"===a(e.exports)?e.exports=oe:void 0===(n=function(){return oe}.call(t,r,t,e))||(e.exports=n),f.supPicture||(g["image/webp"]=function(e,t){var r=new i.Image;return r.onerror=function(){g[e]=!1,oe()},r.onload=function(){g[e]=1===r.width,oe()},r.src=t,"pending"}("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document)}).call(this,r(157)(e))},157:function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},158:function(e,t,r){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}var a=r(0).createElement,i=r(6),c=r(159);e.exports=function(e){return function(){for(var t=arguments.length,r=Array(t),s=0;s<t;s++)r[s]=arguments[s];var o=function t(i){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=[].concat(n(Object.keys(t.propTypes||{})),["css"]),u=Object.assign({theme:s.theme||{}},i),l={};for(var f in i)o.includes(f)||(l[f]=i[f]);return l.className=[l.className].concat(n(r.map((function(e){return"function"==typeof e?e(u):e})).filter((function(e){return!!e})).map((function(e){return c(e)}))),[c(i.css||{})]).join(" ").trim(),a(e,l)};return o.contextTypes={theme:i.oneOfType([i.object,i.func])},o}},e.exports.css=c.css,e.exports.reset=c.reset},159:function(e,t,r){"use strict";var n=r(28),a={},i="x",c=[],s=function(e){return c.push(e)},o=function(e,t){return t?t+"{"+e+"}":e},u=function(e,t,r){return"."+e+"{"+(t.replace(/[A-Z]|^ms/g,"-$&").toLowerCase()+":")+r+"}"},l=function(e){return e.replace(/&/g,"")},f=function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",f=arguments[2];return Object.keys(t).map((function(d){var p=t[d];if(null===p)return"";if("object"===n(p)){var m=/^@/.test(d)?d:null;return e(p,m?r:r+d,m||f)}var h=d+p+r+f;if(a[h])return a[h];var v=i+c.length.toString(36);return s(o(u(v+l(r),d,p),f)),a[h]=v,v})).join(" ")};if(e.exports=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.map((function(e){return f(e)})).join(" ").trim()},e.exports.css=function(){return c.sort().join("")},e.exports.reset=function(){for(a={};c.length;)c.pop()},e.exports.prefix=function(e){return i=e},"undefined"!=typeof document){var d=document.head.appendChild(document.createElement("style")).sheet;s=function(e){c.push(e),d.insertRule(e,d.cssRules.length)}}},177:function(e,t,r){"use strict";var n=r(1),a=r(3),i=(r(6),r(0)),c=r.n(i),s=r(92),o=r(93),u=r(2),l=r(19),f=r(124);function d(e){var t=e.children,r=e.className,i=e.content,l=Object(a.a)("header",r),f=Object(s.a)(d,e),p=Object(o.a)(d,e);return c.a.createElement(p,Object(n.a)({},f,{className:l}),u.a.isNil(t)?i:t)}d.handledProps=["as","children","className","content"],d.propTypes={},d.create=Object(f.b)(d,(function(e){return{content:e}}));var p=d;function m(e){var t=e.children,r=e.className,i=e.content,l=Object(a.a)("description",r),f=Object(s.a)(m,e),d=Object(o.a)(m,e);return c.a.createElement(d,Object(n.a)({},f,{className:l}),u.a.isNil(t)?i:t)}m.handledProps=["as","children","className","content"],m.propTypes={},m.create=Object(f.b)(m,(function(e){return{content:e}}));var h=m;function v(e){var t=e.children,r=e.className,i=e.content,l=Object(a.a)("extra",r),f=Object(s.a)(v,e),d=Object(o.a)(v,e);return c.a.createElement(d,Object(n.a)({},f,{className:l}),u.a.isNil(t)?i:t)}v.handledProps=["as","children","className","content"],v.propTypes={},v.create=Object(f.b)(v,(function(e){return{content:e}}));var A=v;function b(e){var t=e.children,r=e.className,i=e.content,l=Object(a.a)("meta",r),f=Object(s.a)(b,e),d=Object(o.a)(b,e);return c.a.createElement(d,Object(n.a)({},f,{className:l}),u.a.isNil(t)?i:t)}b.handledProps=["as","children","className","content"],b.propTypes={},b.create=Object(f.b)(b,(function(e){return{content:e}}));var g=b;function y(e){var t=e.children,r=e.className,i=e.content,f=e.description,d=e.extra,m=e.header,v=e.meta,b=e.verticalAlign,j=Object(a.a)(Object(l.d)(b),"content",r),O=Object(s.a)(y,e),w=Object(o.a)(y,e);return u.a.isNil(t)?c.a.createElement(w,Object(n.a)({},O,{className:j}),p.create(m,{autoGenerateKey:!1}),g.create(v,{autoGenerateKey:!1}),h.create(f,{autoGenerateKey:!1}),A.create(d,{autoGenerateKey:!1}),i):c.a.createElement(w,Object(n.a)({},O,{className:j}),t)}y.handledProps=["as","children","className","content","description","extra","header","meta","verticalAlign"],y.propTypes={};var j=y,O=r(108),w=r(34);function x(e){var t=e.children,r=e.className,i=e.content,f=e.divided,d=e.items,p=e.link,m=e.relaxed,h=e.unstackable,v=Object(a.a)("ui",Object(l.a)(f,"divided"),Object(l.a)(p,"link"),Object(l.a)(h,"unstackable"),Object(l.b)(m,"relaxed"),"items",r),A=Object(s.a)(x,e),b=Object(o.a)(x,e);if(!u.a.isNil(t))return c.a.createElement(b,Object(n.a)({},A,{className:v}),t);if(!u.a.isNil(i))return c.a.createElement(b,Object(n.a)({},A,{className:v}),i);var g=Object(w.a)(d,(function(e){var t=e.childKey,r=Object(O.a)(e,["childKey"]),a=t||[r.content,r.description,r.header,r.meta].join("-");return c.a.createElement(C,Object(n.a)({},r,{key:a}))}));return c.a.createElement(b,Object(n.a)({},A,{className:v}),g)}x.handledProps=["as","children","className","content","divided","items","link","relaxed","unstackable"],x.propTypes={};var E=x,S=r(138);function N(e){var t=e.size,r=Object(s.a)(N,e);return c.a.createElement(S.a,Object(n.a)({},r,{size:t,ui:!!t,wrapped:!0}))}N.handledProps=["size"],N.propTypes={},N.create=Object(f.b)(N,(function(e){return{src:e}}));var T=N;function z(e){var t=e.children,r=e.className,i=e.content,l=e.description,f=e.extra,d=e.header,p=e.image,m=e.meta,h=Object(a.a)("item",r),v=Object(s.a)(z,e),A=Object(o.a)(z,e);return u.a.isNil(t)?c.a.createElement(A,Object(n.a)({},v,{className:h}),T.create(p,{autoGenerateKey:!1}),c.a.createElement(j,{content:i,description:l,extra:f,header:d,meta:m})):c.a.createElement(A,Object(n.a)({},v,{className:h}),t)}z.handledProps=["as","children","className","content","description","extra","header","image","meta"],z.Content=j,z.Description=h,z.Extra=A,z.Group=E,z.Header=p,z.Image=T,z.Meta=g,z.propTypes={};var C=t.a=z},18:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},32:function(e,t,r){var n,a=r(28);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=a(r);if("string"===n||"number"===n)e.push(this&&this[r]||r);else if(Array.isArray(r))e.push(c.apply(this,r));else if("object"===n)for(var s in r)i.call(r,s)&&r[s]&&e.push(this&&this[s]||s)}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===a(r(84))&&r(84)?void 0===(n=function(){return c}.apply(t,[]))||(e.exports=n):window.classNames=c}()}}]);
//# sourceMappingURL=vendors~main-5cf9a07c.js.map