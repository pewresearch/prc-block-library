/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.17
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[64],{1044:function(t,e,r){"use strict";r.r(e);var o=r(8),n=r(7),c=(r(2),r(389)),s=(r(12),r(5)),i=r(9);var p=function(t){var e=t.attributes,r=(t.className,t.context),o=t.clientId,n=e.uuid,c=r["prc-block/tabs/active"],p=Object(i.useSelect)((function(t){return{hasChildBlocks:0<(0,t("core/block-editor").getBlockOrder)(o).length}}),[o]).hasChildBlocks,a=Object(s.useBlockProps)({"aria-hidden":n!==c}),l=Object(s.useInnerBlocksProps)(a,{renderAppender:p?s.InnerBlocks.DefaultBlockAppender:s.InnerBlocks.ButtonBlockAppender});return React.createElement("div",l)},a=function(){return React.createElement(s.InnerBlocks.Content,null)};function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var f=c.name,b={edit:p,save:a};Object(n.registerBlockType)(f,u(u({},c),b))},11:function(t,e){function r(e){return t.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,r(e)}t.exports=r,t.exports.__esModule=!0,t.exports.default=t.exports},12:function(t,e,r){var o,n=r(11);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=n(r);if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r)){if(r.length){var i=s.apply(null,r);i&&t.push(i)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var p in r)c.call(r,p)&&r[p]&&t.push(p);else t.push(r.toString())}}return t.join(" ")}t.exports?(s.default=s,t.exports=s):"object"===n(r(13))&&r(13)?void 0===(o=function(){return s}.apply(e,[]))||(t.exports=o):window.classNames=s}()},13:function(t,e){(function(e){t.exports=e}).call(this,{})},16:function(t,e,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},2:function(t,e){t.exports=window.wp.i18n},389:function(t){t.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/tabs-pane","title":"Pane","category":"layout","attributes":{"uuid":{"type":"string"}},"supports":{"html":false,"align":false,"inserter":false,"typography":{"fontSize":true,"__experimentalFontFamily":true}},"usesContext":["prc-block/tabs/active","prc-block/tabs/layout"],"parent":["prc-block/tabs-panes"]}')},5:function(t,e){t.exports=window.wp.blockEditor},7:function(t,e){t.exports=window.wp.blocks},8:function(t,e,r){"use strict";function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return o}))},9:function(t,e){t.exports=window.wp.data},965:function(t,e,r){r(16),t.exports=r(1044)}},[[965,0]]]);
//# sourceMappingURL=tabs-pane-12848981.js.map