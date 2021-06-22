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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[21],{14:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},15:function(e,t,r){var n,o=r(16);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)){if(r.length){var a=i.apply(null,r);a&&e.push(a)}}else if("object"===n)if(r.toString===Object.prototype.toString)for(var s in r)c.call(r,s)&&r[s]&&e.push(s);else e.push(r.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===o(r(19))&&r(19)?void 0===(n=function(){return i}.apply(t,[]))||(e.exports=n):window.classNames=i}()},16:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},19:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},23:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},281:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/responsive-container-view","category":"layout","attributes":{"min":{"type":"integer","default":0},"max":{"type":"integer","default":640}},"parent":["prc-block/responsive-container-controller"],"supports":{"html":false}}')},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},589:function(e,t,r){r(23),e.exports=r(654)},6:function(e,t){e.exports=window.wp.blockEditor},654:function(e,t,r){"use strict";r.r(t);var n=r(14),o=r(2),c=r(9),i=r(281),a=r(15),s=r.n(a),l=(r(4),r(6)),p=r(3),u=function(e){var t=e.attributes,r=e.setAttributes,n=t.min,c=t.max;return React.createElement(p.Flex,null,React.createElement(p.FlexItem,null,React.createElement(p.__experimentalNumberControl,{label:Object(o.__)("Min Width"),value:n,onChange:function(e){r({min:parseInt(e)})}})),React.createElement(p.FlexItem,null,React.createElement(p.__experimentalNumberControl,{label:Object(o.__)("Max Width"),value:c,onChange:function(e){r({max:parseInt(e)})}})))},f=function(e){var t=e.attributes,r=e.className,n=e.setAttributes,o=(t.min,t.max,Object(l.useBlockProps)({className:s()(r)})),c=Object(l.__experimentalUseInnerBlocksProps)({},{orientation:"vertical",templateLock:!1});return React.createElement("div",o,React.createElement(u,{attributes:t,setAttributes:n}),React.createElement("div",c))},b=function(){return React.createElement(l.InnerBlocks.Content,null)};function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var w=i.name,d={title:Object(o.__)("Responsive View"),description:"A block of blocks that appears and hides at specific viewport widths.",icon:"art",category:"layout",keywords:[Object(o.__)("ai2html"),Object(o.__)("Illustrator"),Object(o.__)("Responsive")],edit:f,save:b};Object(c.registerBlockType)(w,y(y({},i),d))},9:function(e,t){e.exports=window.wp.blocks}},[[589,0]]]);
//# sourceMappingURL=responsive-container-view-b42bf61b.js.map