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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[11],{1:function(t,e){t.exports=wp.i18n},13:function(t,e){t.exports=moment},133:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/promo-rotator","category":"layout"}')},14:function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=r=function(t){return typeof t}:t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(e)}t.exports=r},15:function(t,e){(function(e){t.exports=e}).call(this,{})},16:function(t,e,r){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},217:function(t,e,r){r(16),t.exports=r(282)},282:function(t,e,r){"use strict";r.r(e);var o=r(5),n=(r(13),r(1)),c=r(6),i=r(133),p=(r(8),r(3)),s=["prc-block/promo","prc-block/card"],a=function(t){t.className;var e=Object(p.useBlockProps)(),r=Object(p.__experimentalUseInnerBlocksProps)(e,{allowedBlocks:s,orientation:"vertical",templateLock:!1,renderAppender:p.InnerBlocks.ButtonBlockAppender});return React.createElement("div",r)},l=function(){return React.createElement(p.InnerBlocks.Content,null)};function u(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?u(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var b=i.name,y={title:Object(n.__)("Promo Rotator"),description:Object(n.__)("Rotates through each block once on page load."),keywords:[Object(n.__)("promo"),Object(n.__)("experiment"),Object(n.__)("rotator"),Object(n.__)("ad rotator")],edit:a,save:l};Object(c.registerBlockType)(b,f(f({},i),y))},3:function(t,e){t.exports=wp.blockEditor},5:function(t,e,r){"use strict";function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return o}))},6:function(t,e){t.exports=wp.blocks},8:function(t,e,r){var o,n=r(14);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=n(r);if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r)&&r.length){var p=i.apply(null,r);p&&t.push(p)}else if("object"===o)for(var s in r)c.call(r,s)&&r[s]&&t.push(s)}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===n(r(15))&&r(15)?void 0===(o=function(){return i}.apply(e,[]))||(t.exports=o):window.classNames=i}()}},[[217,0]]]);
//# sourceMappingURL=promo-rotator-98cd5fb7.js.map