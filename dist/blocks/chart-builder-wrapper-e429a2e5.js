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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[4],{10:function(e,t,r){"use strict";function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return a}))},14:function(e,t){e.exports=window.wp.data},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t){e.exports=window.wp.primitives},22:function(e,t,r){var a="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(a)]},270:function(e){e.exports=JSON.parse('{"name":"prc-block/chart-builder-data-wrapper","category":"layout","textdomain":"chart-builder-data-wrapper","attributes":{"id":{"type":"string"},"transformed":{"type":"boolean","default":false},"isConvertedChart":{"type":"boolean","default":false},"hideTable":{"type":"boolean","default":false},"chartData":{"type":"array"}},"providesContext":{"prc-chart-builder/id":"id"}}')},3:function(e,t){e.exports=window.wp.components},361:function(e,t,r){"use strict";var a=r(4),c=r(20),n=Object(a.createElement)(c.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(a.createElement)(c.Path,{d:"M2 12C2 6.44444 6.44444 2 12 2C17.5556 2 22 6.44444 22 12C22 17.5556 17.5556 22 12 22C6.44444 22 2 17.5556 2 12ZM13 11V7H11V11H7V13H11V17H13V13H17V11H13Z"}));t.a=n},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},51:function(e,t,r){},819:function(e,t,r){r(22),e.exports=r(910)},9:function(e,t){e.exports=window.wp.blocks},910:function(e,t,r){"use strict";r.r(t);var a=r(10),c=r(2),n=r(9),o=r(14),l=r(5),i=r(3),b=r(361),d=r(51),s=r(4),u=function(e){var t=e.attributes,r=e.setAttributes,a=e.clientId,n=t.id;Object(s.useEffect)((function(){n||r({id:a})}),[]);var u=[["core/table",{className:"chart-builder-data-table",head:[{cells:[{content:"x",tag:"th"},{content:"y",tag:"th"}]}],body:[{cells:[{content:"",tag:"td"},{content:"",tag:"td"}]},{cells:[{content:"",tag:"td"},{content:"",tag:"td"}]}]}],["prc-block/chart-builder",{isConvertedChart:t.isConvertedChart}]];return React.createElement(React.Fragment,null,React.createElement(l.InspectorControls,null,React.createElement(i.PanelBody,null,React.createElement(i.ToggleControl,{label:Object(c.__)("Hide table"),help:t.hideTable?"Table hidden.":"Table visible.",checked:t.hideTable,onChange:function(){var e=Object(o.select)("core/block-editor").getBlocks(a).find((function(e){return"core/table"===e.name}));t.hideTable?Object(o.dispatch)("core/editor").updateBlockAttributes(e.clientId,{className:"chart-builder-data-table"}):Object(o.dispatch)("core/editor").updateBlockAttributes(e.clientId,{className:"chart-builder-data-table--hidden"}),r({hideTable:!t.hideTable})}}))),React.createElement(l.BlockControls,null,React.createElement(i.ToolbarGroup,null,React.createElement(i.ToolbarButton,{name:"hide-table",icon:t.hideTable?b.a:d.minus,title:t.hideTable?Object(c.__)("Show Table"):Object(c.__)("Hide Table"),onClick:function(){var e=Object(o.select)("core/block-editor").getBlocks(a).find((function(e){return"core/table"===e.name}));t.hideTable?Object(o.dispatch)("core/editor").updateBlockAttributes(e.clientId,{className:"chart-builder-data-table"}):Object(o.dispatch)("core/editor").updateBlockAttributes(e.clientId,{className:"chart-builder-data-table--hidden"}),r({hideTable:!t.hideTable})}}))),React.createElement(l.InnerBlocks,{template:u,templateLock:"all"}))};var p=r(270);function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(a.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var w=p.name,m={title:Object(c.__)("PRC Chart Builder"),description:Object(c.__)("Create a custom data-driven chart."),category:"widgets",icon:"chart-area",keywords:[Object(c.__)("chart")],supports:{html:!1},example:{attributes:{chartType:"bar",className:"is-style-bar"}},transforms:{from:[{type:"block",blocks:["core/table"],transform:function(e){return Object(n.createBlock)("prc-block/chart-builder-data-wrapper",{transformed:!0,isConvertedChart:!0,tableHead:e.head,tableBody:e.body})}}],to:[{type:"block",blocks:["core/table"],transform:function(e,t){var r=t.filter((function(e){return"core/table"===e.name}));return Object(n.createBlock)("core/table",r.attributes)}}]},edit:u,save:function(e){return React.createElement(l.InnerBlocks.Content,null)}};Object(n.registerBlockType)(w,h(h({},p),m))}},[[819,0]]]);
//# sourceMappingURL=chart-builder-wrapper-e429a2e5.js.map