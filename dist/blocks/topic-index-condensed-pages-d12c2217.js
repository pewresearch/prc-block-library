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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[38],{11:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},15:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},16:function(e,t){e.exports=wp.blocks},2:function(e,t){e.exports=wp.i18n},20:function(e,t){(function(t){e.exports=t}).call(this,{})},22:function(e,t,r){var o,n=r(15);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)&&r.length){var i=s.apply(null,r);i&&e.push(i)}else if("object"===o)for(var p in r)c.call(r,p)&&r[p]&&e.push(p)}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):"object"===n(r(20))&&r(20)?void 0===(o=function(){return s}.apply(t,[]))||(e.exports=o):window.classNames=s}()},29:function(e,t,r){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},312:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-pages","category":"layout","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/topic-index-condensed-controller"]}')},655:function(e,t,r){r(29),e.exports=r(690)},690:function(e,t,r){"use strict";r.r(t);var o=r(11),n=r(16),c=r(2),s=r(312),i=r(22),p=r.n(i),l=r(8),a=["prc-block/topic-index-condensed-page"],u=function(e){var t=e.className,r=Object(l.useBlockProps)({className:p()(t,"column eleven wide")}),o=Object(l.__experimentalUseInnerBlocksProps)(r,{allowedBlocks:a,orientation:"vertical",templateLock:!1,renderAppender:!1});return React.createElement("div",o)},f=function(){return React.createElement(l.InnerBlocks.Content,null)};function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var y=s.name,x={title:Object(c.__)("Pages"),description:Object(c.__)("A sub block of Topic Index - Condensed View, this block controls the right side pages."),edit:u,save:f};Object(n.registerBlockType)(y,d(d({},s),x))},8:function(e,t){e.exports=wp.blockEditor}},[[655,0]]]);
//# sourceMappingURL=topic-index-condensed-pages-d12c2217.js.map