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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[41],{106:function(e,t){e.exports=window.wp.hooks},137:function(e,t){e.exports=window.wp.compose},2:function(e,t){e.exports=window.wp.element},4:function(e,t){e.exports=window.wp.components},6:function(e,t){e.exports=window.wp.blockEditor},888:function(e,t,n){n(23),e.exports=n(889)},889:function(e,t,n){"use strict";n.r(t);var o=n(20),r=n(137),c=n(2),l=n(6),a=n(4),i=n(106),s=n(461),u=n.n(s),p=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"td";return e.map((function(e){return{content:e,tag:t}}))},d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"td";return console.log("convertJSONToAttributes",t,e),"th"===t?p(e,t):e.map((function(e){return{cells:p(e,t)}}))},m=function(e){e.attributes;var t=e.setAttributes,n=Object(c.useState)(!1),r=Object(o.a)(n,2),i=(r[0],r[1]);return React.createElement(c.Fragment,null,React.createElement(l.InspectorControls,null,React.createElement(a.PanelBody,{title:"CSV Import"},React.createElement(a.PanelRow,null,React.createElement(a.DropZoneProvider,null,React.createElement(a.Button,{isPrimary:!0},"Upload CSV"),React.createElement(a.DropZone,{onFilesDrop:function(n){var o,r;console.log("onFilesDrop",n),o=n,(r=new FileReader).onload=function(){u.a.parse(r.result,(function(n,o){console.log("onDropCSV Result...",o,e.attributes);var r=d(o.shift(),"th"),c=d(o);t({body:c}),t({head:[{cells:r}]}),console.log("...data...",c,r)}))},o.forEach((function(e){return r.readAsBinaryString(e)})),i(!0)},onDrop:function(e){console.log("onDrop",e),i(!0)}}))))))},f=Object(r.createHigherOrderComponent)((function(e){return function(t){return"core/table"!==t.name?React.createElement(e,t):React.createElement(c.Fragment,null,React.createElement(a.KeyboardShortcuts,{shortcuts:{enter:function(){return console.log("enter pressed",t)}}},React.createElement(e,t),React.createElement(l.BlockControls,null,React.createElement(a.Toolbar,{label:"Test Block Controls"},React.createElement(a.ToolbarGroup,{isCollapsed:!1,controls:[1].map((function(e){return{icon:"admin-settings",title:"Test Control",isActive:!1,onClick:function(){console.log("clicked!",t)}}}))})))),React.createElement(m,t))}}),"withInspectorControl");Object(i.addFilter)("editor.BlockEdit","prc-block/table",f,21)},894:function(e,t){},896:function(e,t){}},[[888,0,60]]]);
//# sourceMappingURL=table-f622f9d6.js.map