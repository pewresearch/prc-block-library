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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[2],{0:function(t,e){t.exports=wp.element},10:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},100:function(t,e){t.exports=function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,o=!1,c=void 0;try{for(var i,a=t[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,c=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw c}}return n}}},101:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},11:function(t,e){function n(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(e)}t.exports=n},111:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/column","category":"layout","attributes":{"width":{"type":"integer","default":0},"verticalAlignment":{"type":"string"},"templateLock":{"type":"string"}},"parent":["prc-block/columns","prc-block/row"],"supports":{"html":false,"align":false}}')},12:function(t,e){(function(e){t.exports=e}).call(this,{})},154:function(t,e,n){var r=n(77),o=["","one ","two ","three ","four ","five ","six ","seven ","eight ","nine ","ten ","eleven ","twelve ","thirteen ","fourteen ","fifteen ","sixteen ","seventeen ","eighteen ","nineteen "],c=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],i=/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/,a=function(t){return o[Number(t)]},u=function(t){return c[t[0]]+" "+o[t[1]]};t.exports=function(t){var e=Number(t);if(isNaN(e))return"";if(0===e)return"zero";var n=e.toString();if(n.length>9)throw new Error("overflow");var o=("000000000"+n).substr(-9).match(i),c=r(o,6),l=c[1],s=c[2],f=c[3],p=c[4],b=c[5],d="";return d+=0!=l?(a(l)||u(l))+"crore ":"",d+=0!=s?(a(s)||u(s))+"lakh ":"",d+=0!=f?(a(f)||u(f))+"thousand ":"",d+=0!=p?a(p)+"hundred ":"",d+=0!=b&&""!=d?"and ":"",(d+=0!=b?a(b)||u(b):"").trim()}},16:function(t,e,n){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},17:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(10);function o(t,e){if(t){if("string"==typeof t)return Object(r.a)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(t,e):void 0}}},172:function(t,e,n){n(16),t.exports=n(236)},19:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(17);function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,o=!1,c=void 0;try{for(var i,a=t[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,c=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw c}}return n}}(t,e)||Object(r.a)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},2:function(t,e){t.exports=wp.i18n},236:function(t,e,n){"use strict";n.r(e);var r=n(5),o=n(6),c=n(2),i=n(0),a=n(24),u=Object(i.createElement)(a.b,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(i.createElement)(a.a,{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM6 17.5c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h3v10H6zm13.5-.5c0 .3-.2.5-.5.5h-3v-10h3c.3 0 .5.2.5.5v9z"})),l=n(111),s=n(19),f=n(9),p=n.n(f),b=n(154),d=n.n(b),m=n(3),y=n(4),v=n(8),h=function(t){var e=t.attributes,n=e.verticalAlignment,r=void 0!==n&&n,o=e.width,a=e.templateLock,u=void 0!==a&&a,l=t.setAttributes,f=t.className,b=t.clientId,h=Object(i.useState)(16),g=Object(s.a)(h,2),O=g[0],w=g[1],j=Object(v.useDispatch)("core/block-editor").updateBlockAttributes,k=Object(v.useSelect)((function(t){var e=t("core/block-editor"),n=e.getBlocks,r=e.getBlockOrder,o=e.getBlockRootClientId,c=e.getBlockAttributes,i=o(b),a=c(i).equal;return{hasChildBlocks:0<r(b).length,rootClientId:i,isEqual:a,otherColumnsInRow:n(i)}}),[b]),x=k.hasChildBlocks,E=k.isEqual,A=k.rootClientId,S=k.otherColumnsInRow;Object(i.useEffect)((function(){!function(){var t=[];S.forEach((function(e){var n=e.attributes.width;b===e.clientId&&(n=o),t.push(n)}));var e=16-(t=t.reduce((function(t,e){return t+e}),0));console.log("maxWidth",e),w(e)}()}),[o]),Object(i.useEffect)((function(){E&&l({width:null})}),[E]);var P=Object(m.useBlockProps)({className:p()(f,!0===E?null:"".concat(d()(o)," wide"),"column",function(){if(!1===r)return null;var t=r;return"center"===r&&(t="middle"),"".concat(t," aligned")}())}),B=Object(m.__experimentalUseInnerBlocksProps)(P,{templateLock:u,renderAppender:x?void 0:m.InnerBlocks.ButtonBlockAppender});return React.createElement(i.Fragment,null,React.createElement(m.BlockControls,null,React.createElement(m.BlockVerticalAlignmentToolbar,{onChange:function(t){console.log("updateAlignment",t),l({verticalAlignment:t}),j(A,{verticalAlignment:null})},value:r})),React.createElement(m.InspectorControls,null,React.createElement(y.PanelBody,{title:Object(c.__)("Column settings")},React.createElement(i.Fragment,null,E&&React.createElement(y.Notice,{status:"info",isDismissible:!1},"Columns in this row are set to be equal. Setting column widths has been disabled."),1>=O&&React.createElement(y.Notice,{status:-1===Math.sign(O)?"warning":"info",isDismissible:!1},-1===Math.sign(O)?"Exceeding Grid Width!!":"Attention: Approaching Grid Maximum"),React.createElement(y.RangeControl,{label:Object(c.__)("Width"),value:o,onChange:function(t){var e=0>parseFloat(t)?"0":t;l({width:e})},min:1,max:16,withInputField:!0,disabled:E})))),React.createElement("div",B))},g=function(){return React.createElement(m.InnerBlocks.Content,null)};function O(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function w(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?O(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var j=l.name,k={title:Object(c.__)("Column"),description:Object(c.__)("A single column within a row."),icon:u,edit:h,save:g};Object(o.registerBlockType)(j,w(w({},l),k))},24:function(t,e,n){"use strict";n.d(e,"a",(function(){return s})),n.d(e,"b",(function(){return f}));var r=n(5),o=n(27);var c=n(9),i=n.n(c),a=n(0);function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var s=function(t){return Object(a.createElement)("path",t)},f=function(t){var e=t.className,n=t.isPressed,r=l(l({},function(t,e){if(null==t)return{};var n,r,c=Object(o.a)(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(c[n]=t[n])}return c}(t,["className","isPressed"])),{},{className:i()(e,{"is-pressed":n})||void 0,role:"img","aria-hidden":!0,focusable:!1});return Object(a.createElement)("svg",r)}},27:function(t,e,n){"use strict";function r(t,e){if(null==t)return{};var n,r,o={},c=Object.keys(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}n.d(e,"a",(function(){return r}))},3:function(t,e){t.exports=wp.blockEditor},4:function(t,e){t.exports=wp.components},5:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return r}))},6:function(t,e){t.exports=wp.blocks},77:function(t,e,n){var r=n(99),o=n(100),c=n(78),i=n(101);t.exports=function(t,e){return r(t)||o(t,e)||c(t,e)||i()}},78:function(t,e,n){var r=n(79);t.exports=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}},79:function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}},8:function(t,e){t.exports=wp.data},9:function(t,e,n){var r,o=n(11);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var r=o(n);if("string"===r||"number"===r)t.push(n);else if(Array.isArray(n)&&n.length){var a=i.apply(null,n);a&&t.push(a)}else if("object"===r)for(var u in n)c.call(n,u)&&n[u]&&t.push(u)}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===o(n(12))&&n(12)?void 0===(r=function(){return i}.apply(e,[]))||(t.exports=r):window.classNames=i}()},99:function(t,e){t.exports=function(t){if(Array.isArray(t))return t}}},[[172,0]]]);
//# sourceMappingURL=column-4d8fc8e8.js.map