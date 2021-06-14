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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[25],{175:function(e,t){e.exports=window.wp.hooks},176:function(e,t){e.exports=window.wp.compose},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},591:function(e,t,n){n(23),e.exports=n(592)},592:function(e,t,n){"use strict";n.r(t);var o=n(20),r=n(176),c=n(4),l=n(6),a=n(3),i=n(175),u=n(391),s=n.n(u),p=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"td";return e.map((function(e){return{content:e,tag:t}}))},d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"td";return console.log("convertJSONToAttributes",t,e),"th"===t?p(e,t):e.map((function(e){return{cells:p(e,t)}}))},w=function(e){console.log("<TableBlockEdit/>",e);e.attributes;var t=e.setAttributes,n=Object(c.useState)(!1),r=Object(o.a)(n,2),i=(r[0],r[1]);return React.createElement(c.Fragment,null,React.createElement(l.InspectorControls,null,React.createElement(a.PanelBody,{title:"CSV Import"},React.createElement(a.PanelRow,null,React.createElement(a.DropZoneProvider,null,React.createElement(a.Button,{isPrimary:!0},"Upload CSV"),React.createElement(a.DropZone,{onFilesDrop:function(n){var o,r;console.log("onFilesDrop",n),o=n,(r=new FileReader).onload=function(){s.a.parse(r.result,(function(n,o){console.log("onDropCSV Result...",o,e.attributes);var r=d(o.shift(),"th"),c=d(o);t({body:c}),t({head:[{cells:r}]}),console.log("...data...",c,r)}))},o.forEach((function(e){return r.readAsBinaryString(e)})),i(!0)},onDrop:function(e){console.log("onDrop",e),i(!0)}}))))))},f=Object(r.createHigherOrderComponent)((function(e){return function(t){return"core/table"!==t.name?React.createElement(e,t):React.createElement(c.Fragment,null,React.createElement(e,t),React.createElement(w,t))}}),"withInspectorControl");Object(i.addFilter)("editor.BlockEdit","prc-block/table",f,21)},596:function(e,t){},598:function(e,t){},6:function(e,t){e.exports=window.wp.blockEditor}},[[591,0,43]]]);
//# sourceMappingURL=table-bc870a5a.js.map