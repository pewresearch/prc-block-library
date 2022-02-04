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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[30],{10:function(t,e){t.exports=window.wp.blocks},14:function(t,e,o){"use strict";function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}o.d(e,"a",(function(){return r}))},15:function(t,e){function o(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(t.exports=o=function(t){return typeof t},t.exports.default=t.exports,t.exports.__esModule=!0):(t.exports=o=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.default=t.exports,t.exports.__esModule=!0),o(e)}t.exports=o,t.exports.default=t.exports,t.exports.__esModule=!0},16:function(t,e,o){var r,n=o(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var o=arguments[e];if(o){var r=n(o);if("string"===r||"number"===r)t.push(o);else if(Array.isArray(o)){if(o.length){var p=i.apply(null,o);p&&t.push(p)}}else if("object"===r)if(o.toString===Object.prototype.toString)for(var s in o)c.call(o,s)&&o[s]&&t.push(s);else t.push(o.toString())}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===n(o(18))&&o(18)?void 0===(r=function(){return i}.apply(e,[]))||(t.exports=r):window.classNames=i}()},18:function(t,e){(function(e){t.exports=e}).call(this,{})},24:function(t,e,o){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},3:function(t,e){t.exports=window.wp.i18n},326:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/promo-rotator","category":"layout"}')},46:function(t,e){t.exports=moment},6:function(t,e){t.exports=window.wp.blockEditor},875:function(t,e,o){o(24),t.exports=o(955)},955:function(t,e,o){"use strict";o.r(e);var r=o(14),n=(o(46),o(3)),c=o(10),i=o(326),p=(o(16),o(6)),s=["prc-block/promo","prc-block/card"],a=function(t){t.className;var e=Object(p.useBlockProps)(),o=Object(p.useInnerBlocksProps)(e,{allowedBlocks:s,orientation:"vertical",templateLock:!1,renderAppender:p.InnerBlocks.ButtonBlockAppender});return React.createElement("div",o)},u=function(){return React.createElement(p.InnerBlocks.Content,null)};function l(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function f(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?l(Object(o),!0).forEach((function(e){Object(r.a)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):l(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var b=i.name,y={title:Object(n.__)("Promo Rotator"),description:Object(n.__)("Rotates through each block once on page load."),keywords:[Object(n.__)("promo"),Object(n.__)("experiment"),Object(n.__)("rotator"),Object(n.__)("ad rotator")],edit:a,save:u};Object(c.registerBlockType)(b,f(f({},i),y))}},[[875,0]]]);
//# sourceMappingURL=promo-rotator-50c95536.js.map