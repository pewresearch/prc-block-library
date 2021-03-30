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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[18],{0:function(t,e){t.exports=wp.element},1:function(t,e){t.exports=wp.i18n},12:function(t,e){(function(e){t.exports=e}).call(this,{})},13:function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=r=function(t){return typeof t}:t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(e)}t.exports=r},140:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs-pane","category":"layout","attributes":{"uuid":{"type":"string"}},"supports":{"html":false,"align":false,"inserter":false},"usesContext":["prc-block/tabs-active","prc-block/tabs-vertical","prc-block/tabs-panes-style","prc-block/tabs-style"],"parent":["prc-block/tabs-panes"]}')},15:function(t,e,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},255:function(t,e,r){r(15),t.exports=r(287)},287:function(t,e,r){"use strict";r.r(e);var n=r(5),o=r(6),c=r(1),s=r(140),a=r(8),i=r.n(a),p=r(0),l=r(3),u=function(t){var e=t.attributes,r=t.className,n=t.context;if(!(e.uuid===n["prc-block/tabs-active"]))return React.createElement(p.Fragment,null);var o=Object(l.useBlockProps)({className:i()(r)}),c=Object(l.__experimentalUseInnerBlocksProps)({},{});return React.createElement("div",o,React.createElement("div",c))},b=function(){return React.createElement(l.InnerBlocks.Content,null)};function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function y(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?f(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var O=s.name,m={title:Object(c.__)("Pane"),description:Object(c.__)("A tab pane, contains tab content."),edit:u,save:b};Object(o.registerBlockType)(O,y(y({},s),m))},3:function(t,e){t.exports=wp.blockEditor},5:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},6:function(t,e){t.exports=wp.blocks},8:function(t,e,r){var n,o=r(13);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var n=o(r);if("string"===n||"number"===n)t.push(r);else if(Array.isArray(r)&&r.length){var a=s.apply(null,r);a&&t.push(a)}else if("object"===n)for(var i in r)c.call(r,i)&&r[i]&&t.push(i)}}return t.join(" ")}t.exports?(s.default=s,t.exports=s):"object"===o(r(12))&&r(12)?void 0===(n=function(){return s}.apply(e,[]))||(t.exports=n):window.classNames=s}()}},[[255,0]]]);
//# sourceMappingURL=tabs-pane-aea825ea.js.map