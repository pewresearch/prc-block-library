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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[1],[function(e,t){e.exports=wp.i18n},function(e,t){e.exports=wp.element},function(e,t){e.exports=wp.components},function(e,t){e.exports=wp.blockEditor},function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},,function(e,t){e.exports=wp.data},,function(e,t){e.exports=wp.blocks},function(e,t,r){var n,o=r(18);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)&&r.length){var l=i.apply(null,r);l&&e.push(l)}else if("object"===n)for(var a in r)c.call(r,a)&&r[a]&&e.push(a)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===o(r(14))&&r(14)?void 0===(n=function(){return i}.apply(t,[]))||(e.exports=n):window.classNames=i}()},,,,,function(e,t){(function(t){e.exports=t}).call(this,{})},function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return p}));var n=r(4),o=r(17),c=r(9),i=r.n(c),l=r(1);function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var s=function(e){return Object(l.createElement)("path",e)},p=function(e){var t=e.className,r=e.isPressed,n=u(u({},Object(o.a)(e,["className","isPressed"])),{},{className:i()(t,{"is-pressed":r})||void 0,role:"img","aria-hidden":!0,focusable:!1});return Object(l.createElement)("svg",n)}},function(e,t,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},function(e,t,r){"use strict";function n(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}r.d(t,"a",(function(){return n}))},function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=r=function(e){return typeof e}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(t)}e.exports=r},,,,,,,,function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/column","category":"layout","attributes":{"width":{"type":"integer","default":0},"verticalAlignment":{"type":"string"},"templateLock":{"type":"string"}},"parent":["prc-block/row"],"supports":{"html":false,"align":false}}')},,,,,,,,,,,,,,function(e,t,r){var n=r(58),o=["","one ","two ","three ","four ","five ","six ","seven ","eight ","nine ","ten ","eleven ","twelve ","thirteen ","fourteen ","fifteen ","sixteen ","seventeen ","eighteen ","nineteen "],c=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],i=/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/,l=function(e){return o[Number(e)]},a=function(e){return c[e[0]]+" "+o[e[1]]};e.exports=function(e){var t=Number(e);if(isNaN(t))return"";if(0===t)return"zero";var r=t.toString();if(r.length>9)throw new Error("overflow");var o=("000000000"+r).substr(-9).match(i),c=n(o,6),u=c[1],s=c[2],p=c[3],f=c[4],b=c[5],y="";return y+=0!=u?(l(u)||a(u))+"crore ":"",y+=0!=s?(l(s)||a(s))+"lakh ":"",y+=0!=p?(l(p)||a(p))+"thousand ":"",y+=0!=f?l(f)+"hundred ":"",y+=0!=b&&""!=y?"and ":"",(y+=0!=b?l(b)||a(b):"").trim()}},,,,,,,,,,,,,,,,,function(e,t,r){r(16),e.exports=r(77)},function(e,t,r){var n=r(59),o=r(60),c=r(61),i=r(63);e.exports=function(e,t){return n(e)||o(e,t)||c(e,t)||i()}},function(e,t){e.exports=function(e){if(Array.isArray(e))return e}},function(e,t){e.exports=function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,c=void 0;try{for(var i,l=e[Symbol.iterator]();!(n=(i=l.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,c=e}finally{try{n||null==l.return||l.return()}finally{if(o)throw c}}return r}}},function(e,t,r){var n=r(62);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}},function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},,,,,,,,,,,,,,function(e,t,r){"use strict";r.r(t);var n=r(4),o=r(8),c=r(0),i=r(1),l=r(15),a=Object(i.createElement)(l.b,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(i.createElement)(l.a,{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM6 17.5c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h3v10H6zm13.5-.5c0 .3-.2.5-.5.5h-3v-10h3c.3 0 .5.2.5.5v9z"})),u=r(26),s=r(9),p=r.n(s),f=r(40),b=r.n(f),y=r(3),d=r(2),m=r(6),v=function(e){var t=e.attributes,r=t.verticalAlignment,n=void 0!==r&&r,o=t.width,l=t.templateLock,a=void 0!==l&&l,u=e.setAttributes,s=e.className,f=e.clientId,v=Object(m.useSelect)((function(e){var t=e("core/block-editor"),r=t.getBlockOrder,n=t.getBlockRootClientId,o=t.getBlockAttributes,c=n(f),i=o(c).equal;return{hasChildBlocks:0<r(f).length,rootClientId:c,isEqual:i}}),[f]),O=v.hasChildBlocks,g=v.isEqual,h=(v.rootClientId,Object(m.useDispatch)("core/block-editor").updateBlockAttributes,Object(y.useBlockProps)({className:p()(s,!0===g?null:"".concat(b()(o)," wide"),"column",function(){if(!1===n)return null;var e=n;return"center"===n&&(e="middle"),"".concat(e," aligned")}())})),w=Object(y.__experimentalUseInnerBlocksProps)(h,{templateLock:a,renderAppender:O?void 0:y.InnerBlocks.ButtonBlockAppender});return React.createElement(i.Fragment,null,React.createElement(y.BlockControls,null,React.createElement(y.BlockVerticalAlignmentToolbar,{onChange:function(e){console.log("updateAlignment",e),u({verticalAlignment:e})},value:n})),React.createElement(y.InspectorControls,null,React.createElement(d.PanelBody,{title:Object(c.__)("Column settings")},React.createElement(d.RangeControl,{label:Object(c.__)("Width"),value:o,onChange:function(e){var t=0>parseFloat(e)?"0":e;u({width:t})},min:1,max:16,withInputField:!0,disabled:g}))),React.createElement("div",w))},O=function(){return React.createElement(y.InnerBlocks.Content,null)};function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var w=u.name,j={title:Object(c.__)("PRC Column"),description:Object(c.__)("A single column within a row."),icon:a,edit:v,save:O};Object(o.registerBlockType)(w,h(h({},u),j))}],[[57,0]]]);
//# sourceMappingURL=column-cc2b2c80.js.map