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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[14],{10:function(e,t){e.exports=window.wp.blocks},12:function(e,t){e.exports=window.wp.data},14:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},15:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},16:function(e,t,r){var o,n=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var s=i.apply(null,r);s&&e.push(s)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var l in r)c.call(r,l)&&r[l]&&e.push(l);else e.push(r.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===n(r(18))&&r(18)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},18:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.element},24:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},3:function(e,t){e.exports=window.wp.i18n},317:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/grid","category":"layout","attributes":{"useCssGrid":{"type":"boolean","default":false}},"supports":{"html":false,"align":false}}')},4:function(e,t){e.exports=window.wp.components},55:function(e,t){e.exports=window.lodash},6:function(e,t){e.exports=window.wp.blockEditor},877:function(e,t,r){r(24),e.exports=r(953)},953:function(e,t,r){"use strict";r.r(t);var o=r(14),n=r(10),c=r(3),i=r(317),s=r(16),l=r.n(s),a=(r(55),r(2)),p=r(4),u=r(6),d=r(12),f=["prc-block/row"],b=function(e){var t=e.attributes,r=e.setAttributes,o=e.clientId,n=t.useCssGrid,i=Object(d.useSelect)((function(e){var t=e("core/block-editor").hasSelectedInnerBlock(o),r=e("core/block-editor").isBlockSelected(o);return{count:e("core/block-editor").getBlockCount(o),displayBlockAppender:t||r}}),[o]),s=i.count,b=i.displayBlockAppender,w=Object(u.useBlockProps)({className:l()({"ui container":s>1})}),y=Object(u.useInnerBlocksProps)({className:l()({"ui grid":s>1})},{allowedBlocks:f,orientation:"vertical",template:[["prc-block/row",{}]],renderAppender:!!b&&u.InnerBlocks.ButtonBlockAppender});return React.createElement(a.Fragment,null,React.createElement(u.InspectorAdvancedControls,null,React.createElement(p.ToggleControl,{label:Object(c.__)("Use experimental CSS Grid","prc-block-library"),checked:n,onChange:function(){return r({useCssGrid:!n})}})),React.createElement("div",w,React.createElement("div",y)))},w=function(){return React.createElement(u.InnerBlocks.Content,null)};function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var k=i.name,v={title:Object(c.__)("PRC Grid"),description:Object(c.__)("Add a block that displays content in rows divided by multiple columns."),icon:React.createElement("svg",{width:"24",height:"24",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",role:"img","aria-hidden":"true",focusable:"false",size:"24"},React.createElement("path",{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7.5 11.5H6c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h5.5v10zm4 0H13v-10h2.5v10zm4-.5c0 .3-.2.5-.5.5h-2v-10h2c.3 0 .5.2.5.5v9z"})),keywords:[Object(c.__)("Columns"),Object(c.__)("Column"),Object(c.__)("Grid")],edit:b,save:w};Object(n.registerBlockType)(k,m(m({},i),v))}},[[877,0]]]);
//# sourceMappingURL=grid-2adfe729.js.map