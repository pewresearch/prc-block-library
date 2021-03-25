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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[24],{1:function(e,t){e.exports=wp.i18n},10:function(e,t,r){var n,o=r(17);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)&&r.length){var s=i.apply(null,r);s&&e.push(s)}else if("object"===n)for(var p in r)c.call(r,p)&&r[p]&&e.push(p)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===o(r(20))&&r(20)?void 0===(n=function(){return i}.apply(t,[]))||(e.exports=n):window.classNames=i}()},146:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-pages","category":"layout","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/topic-index-condensed-controller"]}')},17:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=r=function(e){return typeof e}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(t)}e.exports=r},19:function(e,t,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},20:function(e,t){(function(t){e.exports=t}).call(this,{})},257:function(e,t,r){r(19),e.exports=r(281)},281:function(e,t,r){"use strict";r.r(t);var n=r(5),o=r(6),c=r(1),i=r(146),s=r(10),p=r.n(s),l=r(4),a=["prc-block/topic-index-condensed-page"],u=function(e){var t=e.className,r=Object(l.useBlockProps)({className:p()(t,"column eleven wide")}),n=Object(l.__experimentalUseInnerBlocksProps)(r,{allowedBlocks:a,orientation:"vertical",templateLock:!1,renderAppender:!1});return React.createElement("div",n)},f=function(){return React.createElement(l.InnerBlocks.Content,null)};function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d=i.name,O={title:Object(c.__)("Pages"),description:Object(c.__)("A sub block of Topic Index - Condensed View, this block controls the right side pages."),edit:u,save:f};Object(o.registerBlockType)(d,y(y({},i),O))},4:function(e,t){e.exports=wp.blockEditor},5:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},6:function(e,t){e.exports=wp.blocks}},[[257,0]]]);
//# sourceMappingURL=topic-index-condensed-pages-7b5e21b0.js.map