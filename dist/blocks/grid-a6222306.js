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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[8],{14:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},15:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},16:function(e,t,r){var o,c=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=c(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var l=i.apply(null,r);l&&e.push(l)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var s in r)n.call(r,s)&&r[s]&&e.push(s);else e.push(r.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===c(r(19))&&r(19)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},18:function(e,t){e.exports=window.wp.data},19:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},23:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},270:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/grid","category":"layout","attributes":{"container":{"type":"boolean","default":true}},"supports":{"html":false,"align":false}}')},3:function(e,t){e.exports=window.wp.components},38:function(e,t){e.exports=window.lodash},4:function(e,t){e.exports=window.wp.element},574:function(e,t,r){r(23),e.exports=r(646)},6:function(e,t){e.exports=window.wp.blockEditor},646:function(e,t,r){"use strict";r.r(t);var o=r(14),c=r(9),n=r(2),i=r(270),l=r(16),s=r.n(l),a=(r(38),r(4)),p=(r(3),r(6)),u=r(18),b=["prc-block/row"],f=function(e){var t=e.clientId,r=Object(u.useSelect)((function(e){var r=e("core/block-editor").hasSelectedInnerBlock(t),o=e("core/block-editor").isBlockSelected(t);return{count:e("core/block-editor").getBlockCount(t),displayBlockAppender:r||o}}),[t]),o=r.count,c=r.displayBlockAppender,n=Object(p.useBlockProps)({className:s()({"ui container":o>1})}),i=Object(p.__experimentalUseInnerBlocksProps)({className:s()({"ui grid":o>1})},{allowedBlocks:b,orientation:"vertical",template:[["prc-block/row",{}]],renderAppender:!!c&&p.InnerBlocks.ButtonBlockAppender});return React.createElement(a.Fragment,null,React.createElement("div",n,React.createElement("div",i)))},d=function(){return React.createElement(p.InnerBlocks.Content,null)};function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var O=function(e){return e.map((function(e){return console.log("inner column block - ",e),e.attributes.className="",m(m({},e),{},{innerBlocks:e.innerBlocks.map((function(e){if("prc-block/columns"===e.name){var t=e.attributes.className.split(" ");console.log("classNames?",t);var r=t.includes("equal"),o=t.includes("divided");return Object(c.createBlock)("prc-block/grid",{className:""},[Object(c.createBlock)("prc-block/row",{equal:r,divided:o,className:""},e.innerBlocks)])}return e}))})}))},y={title:Object(n.__)("PRC Columns"),description:Object(n.__)("LEGACY, DO NOT USE. USE prc-block/grid, instead"),icon:React.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4.1 1.5v10H10v-10h4.9zM5.5 17V8c0-.3.2-.5.5-.5h2.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2.6v-10H19c.3 0 .5.2.5.5v9z"})),attribues:{equal:{type:"boolean",default:!1}},edit:function(e){var t=e.clientId,r=e.isSelected;return Object(a.useEffect)((function(){!function(e,t,r){console.log("in...",e);var o=e.innerBlocks;e.attributes;if(!0===r){var n=Object(c.createBlock)("prc-block/grid",{className:""},[Object(c.createBlock)("prc-block/row",{className:""},O(o))]);Object(u.dispatch)("core/block-editor").replaceBlock(t,n),console.log("out...",n)}}(Object(u.select)("core/block-editor").getBlock(t),t,r)}),[t]),React.createElement(p.InnerBlocks,null)},save:function(){return React.createElement(p.InnerBlocks.Content,null)},supports:{inserter:!1}};function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}Object(c.registerBlockType)("prc-block/columns",y);var g=i.name,j={title:Object(n.__)("PRC Grid"),description:Object(n.__)("Add a block that displays content in rows divided by multiple columns."),icon:React.createElement("svg",{width:"24",height:"24",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",role:"img","aria-hidden":"true",focusable:"false",size:"24"},React.createElement("path",{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7.5 11.5H6c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h5.5v10zm4 0H13v-10h2.5v10zm4-.5c0 .3-.2.5-.5.5h-2v-10h2c.3 0 .5.2.5.5v9z"})),keywords:[Object(n.__)("Columns"),Object(n.__)("Column"),Object(n.__)("Grid")],edit:f,save:d};Object(c.registerBlockType)(g,v(v({},i),j))},9:function(e,t){e.exports=window.wp.blocks}},[[574,0]]]);
//# sourceMappingURL=grid-a6222306.js.map