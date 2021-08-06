/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.0.0
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[20],{14:function(t,e,o){"use strict";function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}o.d(e,"a",(function(){return r}))},16:function(t,e){function o(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(t.exports=o=function(t){return typeof t},t.exports.default=t.exports,t.exports.__esModule=!0):(t.exports=o=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.default=t.exports,t.exports.__esModule=!0),o(e)}t.exports=o,t.exports.default=t.exports,t.exports.__esModule=!0},17:function(t,e,o){var r,n=o(16);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var o=arguments[e];if(o){var r=n(o);if("string"===r||"number"===r)t.push(o);else if(Array.isArray(o)){if(o.length){var s=i.apply(null,o);s&&t.push(s)}}else if("object"===r)if(o.toString===Object.prototype.toString)for(var p in o)c.call(o,p)&&o[p]&&t.push(p);else t.push(o.toString())}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===n(o(24))&&o(24)?void 0===(r=function(){return i}.apply(e,[]))||(t.exports=r):window.classNames=i}()},2:function(t,e){t.exports=window.wp.i18n},23:function(t,e,o){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},24:function(t,e){(function(e){t.exports=e}).call(this,{})},281:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/responsive-container-controller","category":"layout","attributes":{},"supports":{"html":false,"align":["left","right","wide","full"]}}')},3:function(t,e){t.exports=window.wp.components},4:function(t,e){t.exports=window.wp.element},593:function(t,e,o){o(23),t.exports=o(673)},6:function(t,e){t.exports=window.wp.blockEditor},673:function(t,e,o){"use strict";o.r(e);var r=o(14),n=o(2),c=o(9),i=o(281),s=o(17),p=o.n(s),l=(o(4),o(6)),a=(o(3),["prc-block/responsive-container-view"]),u=function(t){t.attributes;var e=t.className,o=(t.setAttributes,Object(l.useBlockProps)({className:p()(e)})),r=Object(l.__experimentalUseInnerBlocksProps)(o,{allowedBlocks:a,orientation:"vertical",templateLock:!1});return React.createElement("div",r)},f=function(){return React.createElement(l.InnerBlocks.Content,null)};function b(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function y(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?b(Object(o),!0).forEach((function(e){Object(r.a)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):b(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var w=i.name,d={title:Object(n.__)("Responsive Container"),description:"A set of blocks to display content at specific viewport widths.",icon:"art",category:"layout",keywords:[Object(n.__)("ai2html"),Object(n.__)("Illustrator"),Object(n.__)("Responsive")],edit:u,save:f};Object(c.registerBlockType)(w,y(y({},i),d))},9:function(t,e){t.exports=window.wp.blocks}},[[593,0]]]);
//# sourceMappingURL=responsive-container-controller-caedf01f.js.map