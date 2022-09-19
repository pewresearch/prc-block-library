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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[74],{10:function(e,t,o){"use strict";function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}o.d(t,"a",(function(){return r}))},1057:function(e,t,o){"use strict";o.r(t);var r=o(10),n=o(8),c=o(2),i=o(420),s=o(14),p=o.n(s),l=o(5),a=["prc-block/topic-index-condensed-page"],u=function(e){var t=e.className,o=Object(l.useBlockProps)({className:p()(t,"column eleven wide")}),r=Object(l.useInnerBlocksProps)(o,{allowedBlocks:a,orientation:"vertical",templateLock:!1,renderAppender:!1});return React.createElement("div",r)},f=function(){return React.createElement(l.InnerBlocks.Content,null)};function b(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function d(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?b(Object(o),!0).forEach((function(t){Object(r.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):b(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var y=i.name,w={title:Object(c.__)("Pages"),description:Object(c.__)("A sub block of Topic Index - Condensed View, this block controls the right side pages."),edit:u,save:f};Object(n.registerBlockType)(y,d(d({},i),w))},12:function(e,t){function o(t){return e.exports=o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,o(t)}e.exports=o,e.exports.__esModule=!0,e.exports.default=e.exports},14:function(e,t,o){var r,n=o(12);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var o=arguments[t];if(o){var r=n(o);if("string"===r||"number"===r)e.push(o);else if(Array.isArray(o)){if(o.length){var s=i.apply(null,o);s&&e.push(s)}}else if("object"===r)if(o.toString===Object.prototype.toString)for(var p in o)c.call(o,p)&&o[p]&&e.push(p);else e.push(o.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===n(o(15))&&o(15)?void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r):window.classNames=i}()},15:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t,o){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},420:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-pages","category":"layout","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/topic-index-condensed-controller"]}')},5:function(e,t){e.exports=window.wp.blockEditor},8:function(e,t){e.exports=window.wp.blocks},985:function(e,t,o){o(20),e.exports=o(1057)}},[[985,0]]]);
//# sourceMappingURL=topic-index-condensed-pages-5c7cb65b.js.map