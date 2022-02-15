/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.9
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[13],{1:function(t,e,n){t.exports=n(267)()},10:function(t,e){t.exports=window.wp.blocks},136:function(t,e){t.exports=window.wp.compose},139:function(t,e,n){"use strict";function r(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}n.d(e,"a",(function(){return r}))},14:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return r}))},15:function(t,e){function n(e){return t.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,n(e)}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports},16:function(t,e,n){var r,o=n(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var r=o(n);if("string"===r||"number"===r)t.push(n);else if(Array.isArray(n)){if(n.length){var a=i.apply(null,n);a&&t.push(a)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var u in n)c.call(n,u)&&n[u]&&t.push(u);else t.push(n.toString())}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===o(n(18))&&n(18)?void 0===(r=function(){return i}.apply(e,[]))||(t.exports=r):window.classNames=i}()},17:function(t,e,n){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}n.d(e,"a",(function(){return r}))},18:function(t,e){(function(e){t.exports=e}).call(this,{})},2:function(t,e){t.exports=window.wp.element},20:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(30);var o=n(28),c=n(31);function i(t,e){return Object(r.a)(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,c=[],i=!0,a=!1;try{for(n=n.call(t);!(i=(r=n.next()).done)&&(c.push(r.value),!e||c.length!==e);i=!0);}catch(t){a=!0,o=t}finally{try{i||null==n.return||n.return()}finally{if(a)throw o}}return c}}(t,e)||Object(o.a)(t,e)||Object(c.a)()}},21:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},225:function(t,e,n){"use strict";function r(t,e){return(r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}n.d(e,"a",(function(){return r}))},231:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/github-gist","category":"embed","attributes":{"url":{"type":"string"},"file":{"type":"string"},"meta":{"type":"boolean","default":true},"caption":{"type":"string","source":"html","selector":"figcaption"}},"supports":{"html":false,"align":["wide","left","right","center"]}}')},24:function(t,e,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},267:function(t,e,n){"use strict";var r=n(268);function o(){}function c(){}c.resetWarningCache=o,t.exports=function(){function t(t,e,n,o,c,i){if(i!==r){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function e(){return t}t.isRequired=t;var n={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:c,resetWarningCache:o};return n.PropTypes=n,n}},268:function(t,e,n){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},28:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(21);function o(t,e){if(t){if("string"==typeof t)return Object(r.a)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(t,e):void 0}}},3:function(t,e){t.exports=window.wp.i18n},30:function(t,e,n){"use strict";function r(t){if(Array.isArray(t))return t}n.d(e,"a",(function(){return r}))},31:function(t,e,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(e,"a",(function(){return r}))},4:function(t,e){t.exports=window.wp.components},6:function(t,e){t.exports=window.wp.blockEditor},873:function(t,e,n){n(24),t.exports=n(941)},941:function(t,e,n){"use strict";n.r(e);var r=n(14),o=n(3),c=n(10),i=n(231),a=n(20),u=n(16),l=n.n(u),s=n(136),p=n(6),f=n(4),b=n(2);function y(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var d=n(139),h=n(225);var v=n(17);function O(t,e){if(e&&("object"===Object(v.a)(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return Object(d.a)(t)}function g(t){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function w(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=g(t);if(e){var o=g(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return O(this,n)}}var j=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&Object(h.a)(t,e)}(i,t);var e,n,r,c=w(i);function i(){var t;return y(this,i),(t=c.apply(this,arguments)).updateURL=t.updateURL.bind(Object(d.a)(t)),t.updateFile=t.updateFile.bind(Object(d.a)(t)),t}return e=i,(n=[{key:"updateURL",value:function(t){void 0!==t&&t.trim()||this.props.setState({preview:!1}),this.props.setAttributes({url:t})}},{key:"updateFile",value:function(t){this.props.setAttributes({file:t})}},{key:"getGistMetaHelp",value:function(t){return t?Object(o.__)("Showing gist meta data.","coblocks"):Object(o.__)("Toggle to show the gist meta data.","coblocks")}},{key:"render",value:function(){var t=this.props,e=t.attributes,n=t.setAttributes,r=e.url,c=e.file,i=e.meta;return React.createElement(b.Fragment,null,React.createElement(p.InspectorControls,null,React.createElement(f.PanelBody,{title:Object(o.__)("Gist settings","coblocks")},React.createElement(f.TextControl,{label:Object(o.__)("Gist URL","coblocks"),value:r,onChange:this.updateURL}),React.createElement(f.TextControl,{label:Object(o.__)("Gist File","coblocks"),value:c,onChange:this.updateFile}),React.createElement(f.ToggleControl,{label:Object(o.__)("Gist Meta","coblocks"),checked:!!i,onChange:function(){return n({meta:!i})},help:this.getGistMetaHelp}))))}}])&&m(e.prototype,n),r&&m(e,r),Object.defineProperty(e,"prototype",{writable:!1}),i}(b.Component),_=n(1),E=n.n(_),x=function(){return React.createElement("svg",{width:"24",height:"24",fill:"none","view-box":"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"m12 3c-4.9725 0-9 4.13206-9 9.2285 0 4.0782 2.5785 7.5366 6.15375 8.7556.45.0869.615-.1985.615-.4438 0-.2192-.0075-.7998-.01125-1.5688-2.5035.5568-3.0315-1.2382-3.0315-1.2382-.4095-1.0651-1.00125-1.3497-1.00125-1.3497-.81525-.5721.063-.5606.063-.5606.90375.0646 1.3785.9505 1.3785.9505.8025 1.4112 2.10675 1.0036 2.62125.7676.081-.5968.3128-1.0036.57-1.2344-1.99875-.2307-4.0995-1.0243-4.0995-4.5604 0-1.0074.34875-1.8303.92625-2.4763-.10125-.23302-.405-1.17125.07875-2.44248 0 0 .75375-.24763 2.475.94593.72-.20534 1.485-.30685 2.25-.31147.765.00462 1.53.10613 2.25.31147 1.71-1.19356 2.4638-.94593 2.4638-.94593.4837 1.27123.18 2.20946.09 2.44248.5737.646.9225 1.4689.9225 2.4763 0 3.5453-2.1038 4.3259-4.1063 4.5527.315.2769.6075.8429.6075 1.7073 0 1.2351-.0112 2.2272-.0112 2.5271 0 .2422.1575.5306.6187.4383 3.6008-1.2104 6.177-4.6711 6.177-8.7432 0-5.09644-4.0297-9.2285-9-9.2285",fill:"currentColor"}))},R=function(t){var e=Object(b.useState)(!0),n=Object(a.a)(e,2),r=n[0],c=n[1],i=Object(b.useState)(""),u=Object(a.a)(i,2),l=u[0],s=u[1],p=Object(b.useState)(!1),y=Object(a.a)(p,2),m=y[0],d=y[1],h=t.url,v=t.file,O=t.callbackId;Object(b.useEffect)((function(){g()}),[]);var g=function(){window[O]=function(t){!function(t){if(!m){var e=document.createElement("link");e.type="text/css",e.rel="stylesheet",e.href=t,document.head.appendChild(e),d(!0)}}(t.stylesheet),c(!1),s(t.div)};var t=document.createElement("script");t.type="text/javascript";var e=j(O);e&&(t.src=e,t.onerror=function(){w()},document.head.appendChild(t))},w=function(){var e=t.onError;c(!1),e()},j=function(t){var e=function(){if(null!==h.match(/(\.com\/)(.*?)([^#]+)/))return h.match(/(\.com\/)(.*?)([^#]+)/).pop();w()}();if(!e)return!1;var n=function(){if(void 0!==v)return"&file=".concat(v);var t=h.split("#").pop();return null!==t.match(/file*/)?"&file=".concat(t.replace("file-","").replace("-",".")):""}();return"https://gist.github.com/".concat(e,".json?callback=").concat(t).concat(n)};return r?React.createElement(f.Placeholder,{key:"placeholder",icon:React.createElement(f.Icon,{icon:x}),label:Object(o.__)("Loading Gist")},React.createElement(f.Spinner,null)):l?React.createElement("div",{dangerouslySetInnerHTML:{__html:l}}):""},k=R;R.propTypes={file:E.a.string,onError:E.a.func,url:E.a.string.isRequired};var S=function t(e){var n=e.attributes,r=e.setAttributes,c=e.className,i=e.clientId,u=e.isSelected,s=e.noticeOperations,f=e.noticeUI,y=n.url,m=n.file,d=n.meta,h=n.caption,v=(s.setNotice,s.removeNotice,Object(b.useState)(!!n.preview&&n.preview)),O=Object(a.a)(v,2),g=O[0],w=O[1],_=Object(b.useState)(""),E=Object(a.a)(_,2),x=E[0],R=E[1];Object(b.useEffect)((function(){!1==!!x&&R(t.__nextGist())}),[x]),Object(b.useEffect)((function(){n.url&&w(!0)}),[]);var S=function(){e.noticeOperations.removeAllNotices()},P=Object(p.useBlockProps)({className:l()(c,d?null:"no-meta")});return React.createElement("div",P,y&&y.length>0&&u&&React.createElement(j,e),g?y&&React.createElement(b.Fragment,null,React.createElement(k,{url:y,file:m,callbackId:x,onError:function(){s.removeAllNotices(),s.createErrorNotice("Sorry, this URL is not a GitHub Gist."),w(!1)}}),(!p.RichText.isEmpty(h)||u)&&React.createElement(p.RichText,{tagName:"figcaption",placeholder:Object(o.__)("Write caption…"),value:h,onChange:function(t){return r({caption:t})},keepPlaceholderOnFocus:!0,inlineToolbar:!0})):React.createElement(b.Fragment,null,f,React.createElement("label",{htmlFor:"gist-url-input-".concat(i)},Object(o.__)("Gist URL")),React.createElement(p.PlainText,{id:"gist-url-input-".concat(i),className:"input-control",value:y,placeholder:Object(o.__)("Add GitHub Gist URL…"),onChange:function(t){if(r({url:t,file:""}),void 0!==t&&t.trim()){n.url||w(!0);var e=t.split("#file-").pop();if(null!==t.match(/#file-*/)){var o=t.replace(e,"").replace("#file-","");r({url:o}),r({file:e.replace(/-([^-]*)$/,".$1")})}S()}else w(!1)}})))};S.__gistCallbackId=0,S.__nextGist=function(){return"embed_gist_callback_"+S.__gistCallbackId++};var P=Object(s.compose)(f.withNotices)(S),T=function(t){var e=t.attributes,n=e.url,r=e.caption;if(void 0!==n)return React.createElement(b.Fragment,null,!p.RichText.isEmpty(r)&&React.createElement(p.RichText.Content,{tagName:"figcaption",value:r}))},C={from:[{type:"raw",priority:1,isMatch:function(t){return"P"===t.nodeName&&/^\s*(https?:\/\/\S+)\s*$/i.test(t.textContent)&&t.textContent.match(/^https?:\/\/(www\.)?gist\.github\.com\/.+/i)},transform:function(t){var e=t.textContent.trim().split("#").pop(),n=e.replace("file-","#file-").replace("-",".");return Object(c.createBlock)("prc-block/github-gist",{url:t.textContent.trim(),file:null!==e.match(/file*/)?n:void 0})}},{type:"prefix",prefix:":gist",transform:function(t){return Object(c.createBlock)(i.name,{content:t})}}]};function A(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function G(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?A(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):A(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var I=i.name,L={title:Object(o.__)("Gist","prc-block"),description:Object(o.__)("Embed a GitHub Gist.","prc-block"),icon:x,keywords:["github","gist"],transforms:C,edit:P,save:T};Object(c.registerBlockType)(I,G(G({},i),L))}},[[873,0]]]);
//# sourceMappingURL=github-gist-bd134830.js.map