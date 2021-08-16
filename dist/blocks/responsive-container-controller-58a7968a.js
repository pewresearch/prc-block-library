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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[22],{14:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},16:function(e,t,r){var o,n=r(17);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var s=i.apply(null,r);s&&e.push(s)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var p in r)c.call(r,p)&&r[p]&&e.push(p);else e.push(r.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===n(r(23))&&r(23)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},17:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},23:function(e,t){(function(t){e.exports=t}).call(this,{})},284:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/responsive-container-controller","category":"layout","attributes":{},"supports":{"html":false,"align":["left","right","wide","full"]}}')},5:function(e,t){e.exports=window.wp.blockEditor},593:function(e,t,r){r(22),e.exports=r(662)},662:function(e,t,r){"use strict";r.r(t);var o=r(14),n=r(2),c=r(9),i=r(284),s=r(16),p=r.n(s),l=r(5),a=["prc-block/responsive-container-view"],u=[["prc-block/responsive-container-view",{min:980,max:0}],["prc-block/responsive-container-view",{min:480,max:979}],["prc-block/responsive-container-view",{min:0,max:479}]],f=function(e){var t=e.className,r=e.isSelected,o=Object(l.useBlockProps)({className:p()(t)}),n=Object(l.__experimentalUseInnerBlocksProps)(o,{allowedBlocks:a,orientation:"vertical",templateLock:!1,template:u,renderAppender:!!r&&l.InnerBlocks.ButtonBlockAppender});return React.createElement("div",n)},b=function(){return React.createElement(l.InnerBlocks.Content,null)};function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d=i.name,v={title:Object(n.__)("Responsive Container"),description:"A set of blocks to display content at specific viewport widths.",icon:"art",category:"layout",keywords:[Object(n.__)("ai2html"),Object(n.__)("Illustrator"),Object(n.__)("Responsive")],edit:f,save:b};Object(c.registerBlockType)(d,w(w({},i),v))},9:function(e,t){e.exports=window.wp.blocks}},[[593,0]]]);
//# sourceMappingURL=responsive-container-controller-58a7968a.js.map