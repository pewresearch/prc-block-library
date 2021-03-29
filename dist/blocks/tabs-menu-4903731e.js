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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[16],{1:function(t,e){t.exports=wp.i18n},12:function(t,e){(function(e){t.exports=e}).call(this,{})},13:function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=r=function(t){return typeof t}:t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(e)}t.exports=r},137:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs-menu","category":"layout","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/tabs"],"usesContext":["prc-block/tabs-vertical","prc-block/tabs-style"]}')},15:function(t,e,r){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},252:function(t,e,r){r(15),t.exports=r(284)},284:function(t,e,r){"use strict";r.r(e);var o=r(5),n=r(6),c=r(1),s=r(137),i=r(8),l=r.n(i),a=r(3),p=["prc-block/tabs-menu-item"],u=[["prc-block/tabs-menu-item",{}]],b=function(t){var e=t.className,r=t.context,o=r["prc-block/tabs-vertical"],n=r["prc-block/tabs-style"],c=Object(a.useBlockProps)({className:l()(e,{"column four wide":o}),style:{marginBottom:o||"is-style-tabular"!==n?null:"-1px!important"}}),s=Object(a.__experimentalUseInnerBlocksProps)({className:l()("ui fluid menu",{vertical:o,pointing:"is-style-pointing"===n,secondary:"is-style-secondary"===n,tabular:"is-style-tabular"===n,text:"is-style-text"===n})},{allowedBlocks:p,orientation:o?"vertical":"horizontal",template:u,templateLock:!1});return React.createElement("div",c,React.createElement("div",s))},f=function(){return React.createElement(a.InnerBlocks.Content,null)};function y(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function m(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?y(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var k=s.name,O={title:Object(c.__)("Menu"),description:Object(c.__)("A sub block of Topic Index - Condensed View, this block controls the left sidebar menu."),edit:b,save:f};Object(n.registerBlockType)(k,m(m({},s),O))},3:function(t,e){t.exports=wp.blockEditor},5:function(t,e,r){"use strict";function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return o}))},6:function(t,e){t.exports=wp.blocks},8:function(t,e,r){var o,n=r(13);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=n(r);if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r)&&r.length){var i=s.apply(null,r);i&&t.push(i)}else if("object"===o)for(var l in r)c.call(r,l)&&r[l]&&t.push(l)}}return t.join(" ")}t.exports?(s.default=s,t.exports=s):"object"===n(r(12))&&r(12)?void 0===(o=function(){return s}.apply(e,[]))||(t.exports=o):window.classNames=s}()}},[[252,0]]]);
//# sourceMappingURL=tabs-menu-4903731e.js.map