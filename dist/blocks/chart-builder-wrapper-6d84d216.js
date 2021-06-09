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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[4],{11:function(t,e){t.exports=window.wp.blocks},15:function(t,e,r){"use strict";function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return a}))},2:function(t,e){t.exports=window.wp.i18n},23:function(t,e,r){var a="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(a)]},280:function(t){t.exports=JSON.parse('{"name":"prc-block/chart-builder-data-wrapper","category":"layout","textdomain":"chart-builder-data-wrapper","attributes":{"transformed":{"type":"boolean","default":false},"tableHead":{"type":"array","default":[{"cells":[{"content":"x","tag":"th"},{"content":"y","tag":"th"}]}]},"tableBody":{"type":"array","default":[{"cells":[{"content":"","tag":"td"},{"content":"","tag":"td"}]},{"cells":[{"content":"","tag":"td"},{"content":"","tag":"td"}]}]}}}')},577:function(t,e,r){r(23),t.exports=r(664)},6:function(t,e){t.exports=window.wp.blockEditor},664:function(t,e,r){"use strict";r.r(e);var a=r(15),c=r(2),o=r(11),n=r(6),l=function(t){var e=t.attributes;console.log(e);var r=[["core/table",{className:"chart-builder-data-table",head:e.tableHead,body:e.tableBody}],["prc-block/chart-builder",{}]];return React.createElement(n.InnerBlocks,{template:r,templateLock:"all"})};var i=r(280);function b(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function s(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?b(Object(r),!0).forEach((function(e){Object(a.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var p=i.name,u={title:Object(c.__)("PRC Chart Builder"),description:Object(c.__)("Create a custom data-driven chart."),category:"widgets",icon:"chart-area",keywords:[Object(c.__)("chart")],supports:{html:!1},example:{attributes:{chartType:"bar",className:"is-style-bar"}},transforms:{from:[{type:"block",blocks:["core/table"],transform:function(t){return Object(o.createBlock)("prc-block/chart-builder-data-wrapper",{transformed:!0,tableHead:t.head,tableBody:t.body})}}],to:[{type:"block",blocks:["core/table"],transform:function(t,e){var r=e.filter((function(t){return"core/table"===t.name}));return Object(o.createBlock)("core/table",r.attributes)}}]},edit:l,save:function(t){return React.createElement(n.InnerBlocks.Content,null)}};console.log("wwatching"),Object(o.registerBlockType)(p,s(s({},i),u))}},[[577,0]]]);
//# sourceMappingURL=chart-builder-wrapper-6d84d216.js.map