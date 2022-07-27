/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.17
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[9],{10:function(e,t){e.exports=window.wp.data},1047:function(e,t,r){"use strict";r.r(t);var a=r(9),c=r(2),o=r(8),n=r(10),l=r(5),i=r(3),b=r(4),d=r(24),s=Object(b.createElement)(d.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(b.createElement)(d.Path,{d:"M2 12C2 6.44444 6.44444 2 12 2C17.5556 2 22 6.44444 22 12C22 17.5556 17.5556 22 12 22C6.44444 22 2 17.5556 2 12ZM13 11V7H11V11H7V13H11V17H13V13H17V11H13Z"})),u=Object(b.createElement)(d.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(b.createElement)(d.Path,{d:"M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM15.5303 8.46967C15.8232 8.76256 15.8232 9.23744 15.5303 9.53033L13.0607 12L15.5303 14.4697C15.8232 14.7626 15.8232 15.2374 15.5303 15.5303C15.2374 15.8232 14.7626 15.8232 14.4697 15.5303L12 13.0607L9.53033 15.5303C9.23744 15.8232 8.76256 15.8232 8.46967 15.5303C8.17678 15.2374 8.17678 14.7626 8.46967 14.4697L10.9393 12L8.46967 9.53033C8.17678 9.23744 8.17678 8.76256 8.46967 8.46967C8.76256 8.17678 9.23744 8.17678 9.53033 8.46967L12 10.9393L14.4697 8.46967C14.7626 8.17678 15.2374 8.17678 15.5303 8.46967Z"})),p=function(e){var t=e.attributes,r=e.setAttributes,a=e.clientId,o=t.id;Object(b.useEffect)((function(){o||r({id:a})}),[]);var d=[["core/table",{className:"chart-builder-data-table",head:[{cells:[{content:"x",tag:"th"},{content:"y",tag:"th"}]}],body:[{cells:[{content:"",tag:"td"},{content:"",tag:"td"}]},{cells:[{content:"",tag:"td"},{content:"",tag:"td"}]}]}],["prc-block/chart-builder",{isConvertedChart:t.isConvertedChart}]];return React.createElement(React.Fragment,null,React.createElement(l.InspectorControls,null,React.createElement(i.PanelBody,null,React.createElement(i.ToggleControl,{label:Object(c.__)("Hide table"),help:t.hideTable?"Table hidden.":"Table visible.",checked:t.hideTable,onChange:function(){var e=Object(n.select)("core/block-editor").getBlocks(a).find((function(e){return"core/table"===e.name}));t.hideTable?Object(n.dispatch)("core/editor").updateBlockAttributes(e.clientId,{className:"chart-builder-data-table"}):Object(n.dispatch)("core/editor").updateBlockAttributes(e.clientId,{className:"chart-builder-data-table--hidden"}),r({hideTable:!t.hideTable})}}))),React.createElement(l.BlockControls,null,React.createElement(i.ToolbarGroup,null,React.createElement(i.ToolbarButton,{name:"hide-table",icon:t.hideTable?s:u,title:t.hideTable?Object(c.__)("Show Table"):Object(c.__)("Hide Table"),onClick:function(){var e=Object(n.select)("core/block-editor").getBlocks(a).find((function(e){return"core/table"===e.name}));t.hideTable?Object(n.dispatch)("core/editor").updateBlockAttributes(e.clientId,{className:"chart-builder-data-table"}):Object(n.dispatch)("core/editor").updateBlockAttributes(e.clientId,{className:"chart-builder-data-table--hidden"}),r({hideTable:!t.hideTable})}}))),React.createElement(l.InnerBlocks,{template:d,templateLock:"all"}))};var h=r(390);function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(a.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m=h.name,O={title:Object(c.__)("PRC Chart Builder"),description:Object(c.__)("Create a custom data-driven chart."),category:"widgets",icon:"chart-area",keywords:[Object(c.__)("chart")],supports:{html:!1},example:{attributes:{chartType:"bar",className:"is-style-bar"}},transforms:{from:[{type:"block",blocks:["core/table"],transform:function(e){return e.className="chart-builder-data-table",Object(o.createBlock)("prc-block/chart-builder-data-wrapper",{transformed:!0,isConvertedChart:!0,tableHead:e.head,tableBody:e.body},[Object(o.createBlock)("core/table",w({},e)),Object(o.createBlock)("prc-block/chart-builder",{isConvertedChart:!0})])}}],to:[{type:"block",blocks:["core/table"],transform:function(e,t){var r=t.filter((function(e){return"core/table"===e.name}));return Object(o.createBlock)("core/table",r.attributes)}}]},edit:p,save:function(e){return React.createElement(l.InnerBlocks.Content,null)}};Object(o.registerBlockType)(m,w(w({},h),O))},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t,r){var a="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(a)]},24:function(e,t){e.exports=window.wp.primitives},3:function(e,t){e.exports=window.wp.components},390:function(e){e.exports=JSON.parse('{"name":"prc-block/chart-builder-data-wrapper","category":"layout","textdomain":"chart-builder-data-wrapper","attributes":{"id":{"type":"string"},"transformed":{"type":"boolean","default":false},"isConvertedChart":{"type":"boolean","default":false},"hideTable":{"type":"boolean","default":false},"chartData":{"type":"array"},"chartPreformattedData":{"type":"array"}},"providesContext":{"prc-chart-builder/id":"id"}}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},8:function(e,t){e.exports=window.wp.blocks},9:function(e,t,r){"use strict";function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return a}))},942:function(e,t,r){r(22),e.exports=r(1047)}},[[942,0]]]);
//# sourceMappingURL=chart-builder-data-wrapper-862c3265.js.map