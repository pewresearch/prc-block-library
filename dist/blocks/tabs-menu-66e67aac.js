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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[16],{1:function(t,e){t.exports=wp.i18n},12:function(t,e){(function(e){t.exports=e}).call(this,{})},13:function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=r=function(t){return typeof t}:t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(e)}t.exports=r},137:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs-menu","category":"layout","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/tabs"],"usesContext":["prc-block/tabs-vertical","prc-block/tabs-style"]}')},15:function(t,e,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},252:function(t,e,r){r(15),t.exports=r(284)},284:function(t,e,r){"use strict";r.r(e);var n=r(5),o=r(6),c=r(1),s=r(137),i=r(8),l=r.n(i),a=r(3),p=["prc-block/tabs-menu-item"],u=function(t){var e=t.className,r=(t.clientId,t.context),n=r["prc-block/tabs-vertical"],o=r["prc-block/tabs-style"],c=Object(a.useBlockProps)({className:l()(e,{"column four wide":n}),style:{marginBottom:n||"is-style-tabular"!==o?null:"-1px!important"}}),s=Object(a.__experimentalUseInnerBlocksProps)({className:l()("ui fluid menu",{vertical:n,pointing:"is-style-pointing"===o,secondary:"is-style-secondary"===o,tabular:"is-style-tabular"===o,text:"is-style-text"===o})},{allowedBlocks:p,orientation:n?"vertical":"horizontal",templateLock:!1});return React.createElement("div",c,React.createElement("div",s))},b=function(){return React.createElement(a.InnerBlocks.Content,null)};function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function y(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?f(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var m=s.name,d={title:Object(c.__)("Menu"),description:Object(c.__)("A sub block of Topic Index - Condensed View, this block controls the left sidebar menu."),edit:u,save:b};Object(o.registerBlockType)(m,y(y({},s),d))},3:function(t,e){t.exports=wp.blockEditor},5:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},6:function(t,e){t.exports=wp.blocks},8:function(t,e,r){var n,o=r(13);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var n=o(r);if("string"===n||"number"===n)t.push(r);else if(Array.isArray(r)&&r.length){var i=s.apply(null,r);i&&t.push(i)}else if("object"===n)for(var l in r)c.call(r,l)&&r[l]&&t.push(l)}}return t.join(" ")}t.exports?(s.default=s,t.exports=s):"object"===o(r(12))&&r(12)?void 0===(n=function(){return s}.apply(e,[]))||(t.exports=n):window.classNames=s}()}},[[252,0]]]);
//# sourceMappingURL=tabs-menu-66e67aac.js.map