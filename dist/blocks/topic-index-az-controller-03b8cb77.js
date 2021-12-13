/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.9
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[44],{10:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},2:function(e,t){e.exports=window.wp.i18n},23:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},300:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-az-controller","category":"layout","attributes":{},"supports":{"html":false}}')},5:function(e,t){e.exports=window.wp.blockEditor},874:function(e,t,r){r(23),e.exports=r(903)},9:function(e,t){e.exports=window.wp.blocks},903:function(e,t,r){"use strict";r.r(t);var o=r(10),c=r(2),n=r(9),i=r(300),l=r(5),a=function(e){var t=e.className,r=Object(l.useBlockProps)({className:t}),o=Object(l.useInnerBlocksProps)(r,{orientation:"horizontal",template:[["prc-block/grid",{},[["prc-block/row",{equal:!0},[["prc-block/column",{}],["prc-block/column",{}],["prc-block/column",{}]]]]]],templateLock:"all"});return React.createElement("div",o)},p=function(){return React.createElement(l.InnerBlocks.Content,null)};function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var b=i.name,f={title:Object(c.__)("Topic Index A-Z Controller"),description:"Controls the layout and quick select functionality of the topic A-Z index",category:"layout",keywords:[Object(c.__)("Topic Index AZ"),Object(c.__)("A-Z")],edit:a,save:p};Object(n.registerBlockType)(b,u(u({},i),f))}},[[874,0]]]);
//# sourceMappingURL=topic-index-az-controller-03b8cb77.js.map