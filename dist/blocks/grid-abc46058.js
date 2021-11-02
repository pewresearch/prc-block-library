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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[13],{10:function(e,t,o){"use strict";function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}o.d(t,"a",(function(){return r}))},14:function(e,t){e.exports=window.wp.data},16:function(e,t,o){var r,n=o(17);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var o=arguments[t];if(o){var r=n(o);if("string"===r||"number"===r)e.push(o);else if(Array.isArray(o)){if(o.length){var s=i.apply(null,o);s&&e.push(s)}}else if("object"===r)if(o.toString===Object.prototype.toString)for(var l in o)c.call(o,l)&&o[l]&&e.push(l);else e.push(o.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===n(o(22))&&o(22)?void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r):window.classNames=i}()},17:function(e,t){function o(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=o=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=o=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),o(t)}e.exports=o,e.exports.default=e.exports,e.exports.__esModule=!0},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t){(function(t){e.exports=t}).call(this,{})},23:function(e,t,o){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},281:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/grid","category":"layout","attributes":{"container":{"type":"boolean","default":true}},"supports":{"html":false,"align":false}}')},3:function(e,t){e.exports=window.wp.components},38:function(e,t){e.exports=window.lodash},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},597:function(e,t,o){o(23),e.exports=o(680)},680:function(e,t,o){"use strict";o.r(t);var r=o(10),n=o(9),c=o(2),i=o(281),s=o(16),l=o.n(s),p=(o(38),o(4)),a=(o(3),o(5)),u=o(14),f=["prc-block/row"],d=function(e){var t=e.clientId,o=Object(u.useSelect)((function(e){var o=e("core/block-editor").hasSelectedInnerBlock(t),r=e("core/block-editor").isBlockSelected(t);return{count:e("core/block-editor").getBlockCount(t),displayBlockAppender:o||r}}),[t]),r=o.count,n=o.displayBlockAppender,c=Object(a.useBlockProps)({className:l()({"ui container":r>1})}),i=Object(a.__experimentalUseInnerBlocksProps)({className:l()({"ui grid":r>1})},{allowedBlocks:f,orientation:"vertical",template:[["prc-block/row",{}]],renderAppender:!!n&&a.InnerBlocks.ButtonBlockAppender});return React.createElement(p.Fragment,null,React.createElement("div",c,React.createElement("div",i)))},b=function(){return React.createElement(a.InnerBlocks.Content,null)};function w(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function y(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?w(Object(o),!0).forEach((function(t){Object(r.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):w(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var m=i.name,v={title:Object(c.__)("PRC Grid"),description:Object(c.__)("Add a block that displays content in rows divided by multiple columns."),icon:React.createElement("svg",{width:"24",height:"24",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",role:"img","aria-hidden":"true",focusable:"false",size:"24"},React.createElement("path",{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7.5 11.5H6c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h5.5v10zm4 0H13v-10h2.5v10zm4-.5c0 .3-.2.5-.5.5h-2v-10h2c.3 0 .5.2.5.5v9z"})),keywords:[Object(c.__)("Columns"),Object(c.__)("Column"),Object(c.__)("Grid")],edit:d,save:b};Object(n.registerBlockType)(m,y(y({},i),v))},9:function(e,t){e.exports=window.wp.blocks}},[[597,0]]]);
//# sourceMappingURL=grid-abc46058.js.map