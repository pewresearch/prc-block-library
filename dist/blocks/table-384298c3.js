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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[33],{119:function(e,t){e.exports=window.wp.compose},120:function(e,t){e.exports=window.wp.hooks},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},610:function(e,t,n){n(23),e.exports=n(611)},611:function(e,t,n){"use strict";n.r(t);var o=n(18),r=n(119),c=n(4),a=n(5),l=n(3),i=n(120),u=n(403),s=n.n(u),p=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"td";return e.map((function(e){return{content:e,tag:t}}))},d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"td";return console.log("convertJSONToAttributes",t,e),"th"===t?p(e,t):e.map((function(e){return{cells:p(e,t)}}))},w=function(e){e.attributes;var t=e.setAttributes,n=Object(c.useState)(!1),r=Object(o.a)(n,2),i=(r[0],r[1]);return React.createElement(c.Fragment,null,React.createElement(a.InspectorControls,null,React.createElement(l.PanelBody,{title:"CSV Import"},React.createElement(l.PanelRow,null,React.createElement(l.DropZoneProvider,null,React.createElement(l.Button,{isPrimary:!0},"Upload CSV"),React.createElement(l.DropZone,{onFilesDrop:function(n){var o,r;console.log("onFilesDrop",n),o=n,(r=new FileReader).onload=function(){s.a.parse(r.result,(function(n,o){console.log("onDropCSV Result...",o,e.attributes);var r=d(o.shift(),"th"),c=d(o);t({body:c}),t({head:[{cells:r}]}),console.log("...data...",c,r)}))},o.forEach((function(e){return r.readAsBinaryString(e)})),i(!0)},onDrop:function(e){console.log("onDrop",e),i(!0)}}))))))},f=Object(r.createHigherOrderComponent)((function(e){return function(t){return"core/table"!==t.name?React.createElement(e,t):React.createElement(c.Fragment,null,React.createElement(e,t),React.createElement(w,t))}}),"withInspectorControl");Object(i.addFilter)("editor.BlockEdit","prc-block/table",f,21)},615:function(e,t){},617:function(e,t){}},[[610,0,51]]]);
//# sourceMappingURL=table-384298c3.js.map