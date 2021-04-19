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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[16],{155:function(e,t){e.exports=wp.compose},2:function(e,t){e.exports=wp.element},4:function(e,t){e.exports=wp.components},431:function(e,t){e.exports=wp.hooks},5:function(e,t){e.exports=wp.blockEditor},724:function(e,t,n){n(21),e.exports=n(725)},725:function(e,t,n){"use strict";n.r(t);var o=n(18),r=n(155),c=n(2),l=n(5),a=n(4),i=n(431),u=n(432),s=n.n(u),p=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"td";return e.map((function(e){return{content:e,tag:t}}))},f=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"td";return console.log("convertJSONToAttributes",t,e),"th"===t?p(e,t):e.map((function(e){return{cells:p(e,t)}}))},d=function(e){console.log("<TableBlockEdit/>",e);e.attributes;var t=e.setAttributes,n=Object(c.useState)(!1),r=Object(o.a)(n,2),i=(r[0],r[1]);return React.createElement(c.Fragment,null,React.createElement(l.InspectorControls,null,React.createElement(a.PanelBody,{title:"CSV Import"},React.createElement(a.PanelRow,null,React.createElement(a.DropZoneProvider,null,React.createElement(a.Button,{isPrimary:!0},"Upload CSV"),React.createElement(a.DropZone,{onFilesDrop:function(n){var o,r;console.log("onFilesDrop",n),o=n,(r=new FileReader).onload=function(){s.a.parse(r.result,(function(n,o){console.log("onDropCSV Result...",o,e.attributes);var r=f(o.shift(),"th"),c=f(o);t({body:c}),t({head:[{cells:r}]}),console.log("...data...",c,r)}))},o.forEach((function(e){return r.readAsBinaryString(e)})),i(!0)},onDrop:function(e){console.log("onDrop",e),i(!0)}}))))))},m=Object(r.createHigherOrderComponent)((function(e){return function(t){return"core/table"!==t.name?React.createElement(e,t):React.createElement(c.Fragment,null,React.createElement(e,t),React.createElement(d,t))}}),"withInspectorControl");Object(i.addFilter)("editor.BlockEdit","prc-block/table",m,21)},729:function(e,t){},731:function(e,t){}},[[724,0,34]]]);
//# sourceMappingURL=table-3d56792e.js.map