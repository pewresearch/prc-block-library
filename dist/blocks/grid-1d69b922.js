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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[8],{11:function(e,t,r){"use strict";function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return c}))},15:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},16:function(e,t){e.exports=wp.blocks},17:function(e,t){e.exports=lodash},19:function(e,t){e.exports=wp.data},2:function(e,t){e.exports=wp.i18n},20:function(e,t){(function(t){e.exports=t}).call(this,{})},22:function(e,t,r){var c,o=r(15);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function l(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var c=o(r);if("string"===c||"number"===c)e.push(r);else if(Array.isArray(r)&&r.length){var i=l.apply(null,r);i&&e.push(i)}else if("object"===c)for(var s in r)n.call(r,s)&&r[s]&&e.push(s)}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):"object"===o(r(20))&&r(20)?void 0===(c=function(){return l}.apply(t,[]))||(e.exports=c):window.classNames=l}()},284:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/grid","category":"layout","attributes":{"container":{"type":"boolean","default":true}},"supports":{"html":false,"align":false}}')},29:function(e,t,r){"use strict";var c="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(c)]},4:function(e,t){e.exports=wp.element},5:function(e,t){e.exports=wp.components},585:function(e,t,r){r(29),e.exports=r(665)},586:function(e,t,r){},665:function(e,t,r){"use strict";r.r(t);var c=r(11),o=r(16),n=r(2),l=r(284),i=r(22),s=r.n(i),a=(r(17),r(4)),u=(r(5),r(8)),p=r(19),b=["prc-block/row"],f=function(e){var t=e.clientId,r=Object(p.useSelect)((function(e){var r=e("core/block-editor").hasSelectedInnerBlock(t),c=e("core/block-editor").isBlockSelected(t);return{count:e("core/block-editor").getBlockCount(t),displayBlockAppender:r||c}}),[t]),c=r.count,o=r.displayBlockAppender,n=Object(u.useBlockProps)({className:s()({"ui container":c>1})}),l=Object(u.__experimentalUseInnerBlocksProps)({className:s()({"ui grid":c>1})},{allowedBlocks:b,orientation:"vertical",template:[["prc-block/row",{}]],renderAppender:!!o&&u.InnerBlocks.ButtonBlockAppender});return React.createElement(a.Fragment,null,React.createElement("div",n,React.createElement("div",l)))},d=function(){return React.createElement(u.InnerBlocks.Content,null)};function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,c)}return r}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){Object(c.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var k=function(e){return e.map((function(e){return console.log("inner column block - ",e),e.attributes.className="",O(O({},e),{},{innerBlocks:e.innerBlocks.map((function(e){if("prc-block/columns"===e.name){var t=e.attributes.className.split(" ");console.log("classNames?",t);var r=t.includes("equal"),c=t.includes("divided");return Object(o.createBlock)("prc-block/grid",{className:""},[Object(o.createBlock)("prc-block/row",{equal:r,divided:c,className:""},e.innerBlocks)])}return e}))})}))},y={title:Object(n.__)("PRC Columns"),description:Object(n.__)("LEGACY, DO NOT USE. USE prc-block/grid, instead"),icon:React.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4.1 1.5v10H10v-10h4.9zM5.5 17V8c0-.3.2-.5.5-.5h2.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2.6v-10H19c.3 0 .5.2.5.5v9z"})),attribues:{equal:{type:"boolean",default:!1}},edit:function(e){var t=e.clientId,r=e.isSelected;return Object(a.useEffect)((function(){!function(e,t,r){console.log("in...",e);var c=e.innerBlocks;e.attributes;if(!0===r){var n=Object(o.createBlock)("prc-block/grid",{className:""},[Object(o.createBlock)("prc-block/row",{className:""},k(c))]);Object(p.dispatch)("core/block-editor").replaceBlock(t,n),console.log("out...",n)}}(Object(p.select)("core/block-editor").getBlock(t),t,r)}),[t]),React.createElement(u.InnerBlocks,null)},save:function(){return React.createElement(u.InnerBlocks.Content,null)},supports:{inserter:!1}};Object(o.registerBlockType)("prc-block/columns",y);r(586);function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,c)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(Object(r),!0).forEach((function(t){Object(c.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var j=l.name,g={title:Object(n.__)("PRC Grid"),description:Object(n.__)("Add a block that displays content in rows divided by multiple columns."),icon:React.createElement("svg",{width:"24",height:"24",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",role:"img","aria-hidden":"true",focusable:"false",size:"24"},React.createElement("path",{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7.5 11.5H6c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h5.5v10zm4 0H13v-10h2.5v10zm4-.5c0 .3-.2.5-.5.5h-2v-10h2c.3 0 .5.2.5.5v9z"})),keywords:[Object(n.__)("Columns"),Object(n.__)("Column"),Object(n.__)("Grid")],edit:f,save:d};Object(o.registerBlockType)(j,w(w({},l),g))},8:function(e,t){e.exports=wp.blockEditor}},[[585,0]]]);
//# sourceMappingURL=grid-1d69b922.js.map