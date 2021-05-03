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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[15],{13:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},14:function(e,t,r){var o,n=r(13);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function p(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)&&r.length){var s=p.apply(null,r);s&&e.push(s)}else if("object"===o)for(var i in r)c.call(r,i)&&r[i]&&e.push(i)}}return e.join(" ")}e.exports?(p.default=p,e.exports=p):"object"===n(r(16))&&r(16)?void 0===(o=function(){return p}.apply(t,[]))||(e.exports=o):window.classNames=p}()},16:function(e,t){(function(t){e.exports=t}).call(this,{})},173:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/promo-rotator","category":"layout"}')},2:function(e,t){e.exports=wp.i18n},20:function(e,t,r){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},24:function(e,t){e.exports=moment},265:function(e,t,r){r(20),e.exports=r(330)},330:function(e,t,r){"use strict";r.r(t);var o=r(6),n=(r(24),r(2)),c=r(9),p=r(173),s=(r(14),r(5)),i=["prc-block/promo","prc-block/card"],a=function(e){e.className;var t=Object(s.useBlockProps)(),r=Object(s.__experimentalUseInnerBlocksProps)(t,{allowedBlocks:i,orientation:"vertical",templateLock:!1,renderAppender:s.InnerBlocks.ButtonBlockAppender});return React.createElement("div",r)},l=function(){return React.createElement(s.InnerBlocks.Content,null)};function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var b=p.name,y={title:Object(n.__)("Promo Rotator"),description:Object(n.__)("Rotates through each block once on page load."),keywords:[Object(n.__)("promo"),Object(n.__)("experiment"),Object(n.__)("rotator"),Object(n.__)("ad rotator")],edit:a,save:l};Object(c.registerBlockType)(b,f(f({},p),y))},5:function(e,t){e.exports=wp.blockEditor},6:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},9:function(e,t){e.exports=wp.blocks}},[[265,0]]]);
//# sourceMappingURL=promo-rotator-785b47f8.js.map