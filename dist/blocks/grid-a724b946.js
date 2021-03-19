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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[4],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=wp.i18n},10:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,"a",(function(){return n}))},114:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/grid","category":"layout","attributes":{"container":{"type":"boolean","default":true}},"supports":{"html":false,"align":false}}')},12:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=r=function(e){return typeof e}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(t)}e.exports=r},13:function(e,t){e.exports=lodash},15:function(e,t){(function(t){e.exports=t}).call(this,{})},17:function(e,t,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},173:function(e,t,r){r(17),e.exports=r(237)},18:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(10);function c(e,t){if(e){if("string"==typeof e)return Object(n.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(e,t):void 0}}},237:function(e,t,r){"use strict";r.r(t);var n=r(5),c=r(6),o=r(1),i=r(114),a=r(26),l=(r(9),r(13)),s=r(0),u=r(4),p=r(3),b=r(7),f=["prc-block/row"],d=Object(b.withDispatch)((function(e,t,r){return{updateRows:function(n,o){var i=t.clientId,s=e("core/block-editor").replaceInnerBlocks,u=(0,r.select("core/block-editor").getBlocks)(i);s(i,u=o>n?[].concat(Object(a.a)(u),Object(a.a)(Object(l.times)(o-n,(function(){return Object(c.createBlock)("prc-block/row")})))):Object(l.dropRight)(u,n-o))}}}))((function(e){e.attributes,e.className;var t=e.updateRows,r=e.clientId,n=Object(b.useSelect)((function(e){return{count:e("core/block-editor").getBlockCount(r)}}),[r]).count,c=Object(p.useBlockProps)(),i=Object(p.__experimentalUseInnerBlocksProps)(c,{allowedBlocks:f,orientation:"vertical",renderAppender:p.InnerBlocks.ButtonBlockAppender});return React.createElement(s.Fragment,null,React.createElement(p.InspectorControls,null,React.createElement(u.PanelBody,null,React.createElement(u.RangeControl,{label:Object(o.__)("Rows"),value:n,onChange:function(e){return t(n,e)},min:1,max:Math.max(6,n),withInputField:!0}))),React.createElement("div",i))})),m=function(e){return React.createElement(d,e)},O=function(){return React.createElement(p.InnerBlocks.Content,null)};function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var v=function(e){return e.map((function(e){return console.log("inner column block - ",e),e.attributes.className="",j(j({},e),{},{innerBlocks:e.innerBlocks.map((function(e){if("prc-block/columns"===e.name){var t=e.attributes.className.split(" ");console.log("classNames?",t);var r=t.includes("equal"),n=t.includes("divided");return Object(c.createBlock)("prc-block/grid",{className:""},[Object(c.createBlock)("prc-block/row",{equal:r,divided:n,className:""},e.innerBlocks)])}return e}))})}))},w={title:Object(o.__)("PRC Columns"),description:Object(o.__)("LEGACY, DO NOT USE. USE prc-block/grid, instead"),icon:React.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4.1 1.5v10H10v-10h4.9zM5.5 17V8c0-.3.2-.5.5-.5h2.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2.6v-10H19c.3 0 .5.2.5.5v9z"})),attribues:{equal:{type:"boolean",default:!1}},edit:function(e){var t=e.clientId,r=e.isSelected;return Object(s.useEffect)((function(){!function(e,t,r){console.log("in...",e);var n=e.innerBlocks;e.attributes;if(!0===r){var o=Object(c.createBlock)("prc-block/grid",{className:""},[Object(c.createBlock)("prc-block/row",{className:""},v(n))]);Object(b.dispatch)("core/block-editor").replaceBlock(t,o),console.log("out...",o)}}(Object(b.select)("core/block-editor").getBlock(t),t,r)}),[t]),React.createElement(p.InnerBlocks,null)},save:function(){return React.createElement(p.InnerBlocks.Content,null)},supports:{inserter:!1}};function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function g(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}Object(c.registerBlockType)("prc-block/columns",w);var h=i.name,B={title:Object(o.__)("PRC Grid"),description:Object(o.__)("Add a block that displays content in rows divided by multiple columns."),icon:React.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4.1 1.5v10H10v-10h4.9zM5.5 17V8c0-.3.2-.5.5-.5h2.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2.6v-10H19c.3 0 .5.2.5.5v9z"})),keywords:[Object(o.__)("Columns"),Object(o.__)("Column"),Object(o.__)("Grid")],edit:m,save:O};Object(c.registerBlockType)(h,g(g({},i),B))},26:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(10);var c=r(18);function o(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},3:function(e,t){e.exports=wp.blockEditor},4:function(e,t){e.exports=wp.components},5:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},6:function(e,t){e.exports=wp.blocks},7:function(e,t){e.exports=wp.data},9:function(e,t,r){var n,c=r(12);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var o={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=c(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)&&r.length){var a=i.apply(null,r);a&&e.push(a)}else if("object"===n)for(var l in r)o.call(r,l)&&r[l]&&e.push(l)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===c(r(15))&&r(15)?void 0===(n=function(){return i}.apply(t,[]))||(e.exports=n):window.classNames=i}()}},[[173,0]]]);
//# sourceMappingURL=grid-a724b946.js.map