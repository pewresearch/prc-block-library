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
(window["wpackioprcBlocksLibraryfact-sheet-collectionJsonp"]=window["wpackioprcBlocksLibraryfact-sheet-collectionJsonp"]||[]).push([[3],{11:function(e,t){e.exports=window.wp.components},110:function(e,t){e.exports=window.wp.apiFetch},118:function(e){e.exports=JSON.parse('{"name":"prc-block/fact-sheet-collection","apiVersion":2,"category":"layout","attributes":{"altPostLabel":{"type":"string"},"enableFlags":{"type":"boolean","default":false},"pdfId":{"type":"integer","default":0}},"supports":{"html":false,"multiple":false},"styles":[{"name":"dropdown","label":"Dropdown","isDefault":true},{"name":"list","label":"List"}]}')},127:function(e,t){e.exports=window.wp.keycodes},131:function(e,t){e.exports=moment},150:function(e,t,n){n(120),e.exports=n(166)},166:function(e,t,n){"use strict";n.r(t);var o=n(126),r=n(17),c=n(79),a=n(118),l=n(102),i=n(135),s=n(9),u=n(29),p=n(11),d=n(68),b=function(e){var t=e.label,n=e.setAttributes;return React.createElement(s.Fragment,null,React.createElement(p.TextControl,{label:"Alternate Post Label",value:t,onChange:function(e){return n({altPostLabel:e})}}))},f=function(e){var t=e.termId,n=e.enableFlags,o=e.setAttributes,r=Object(s.useState)(!1),c=Object(l.a)(r,2),a=c[0],u=c[1],b=Object(d.useDispatch)("core/editor").editPost;return Object(s.useEffect)((function(){Object(i.a)("collection").then((function(e){u(e)}))}),[]),React.createElement(s.Fragment,null,!1!==a&&React.createElement("div",{style:{display:"flex",flexDirection:"row",alignItems:"flex-end"}},React.createElement("div",{style:{flexGrow:1}},React.createElement(p.TreeSelect,{label:"Select Collection",noOptionLabel:"No Collection",onChange:function(e){return b({collection:parseFloat(e)})},selectedId:t,tree:a})),React.createElement("div",{style:{paddingLeft:"1em"}},React.createElement(p.ToggleControl,{label:"Enable Flags",checked:n,onChange:function(){return o({enableFlags:!n})}}))))},m=function(e){var t=e.attachmentId,n=e.setAttributes;return React.createElement(u.MediaUploadCheck,null,React.createElement(u.MediaUpload,{title:"Upload PDF",allowedTypes:["application/pdf"],value:t,onSelect:function(e){return n({pdfId:e.id})},render:function(e){var o=e.open;return React.createElement(p.ButtonGroup,null,React.createElement(p.Button,{isPrimary:!0,onClick:o},0===t?"Upload PDF":"Change PDF"),0!==t&&React.createElement(p.Button,{isSecondary:!0,onClick:function(){return n({pdfId:0})}},"Clear PDF"))}}))},w=function(e){var t=e.attributes,n=e.className,o=e.setAttributes,c=Object(u.useBlockProps)({className:n}),a=t.altPostLabel,l=t.enableFlags,i=t.pdfId,s=Object(d.useSelect)((function(e){return{termId:e("core/editor").getEditedPostAttribute("collection")}}),[]).termId;return React.createElement("div",c,React.createElement(p.Placeholder,{label:Object(r.__)("Configure Fact Sheet Collection"),isColumnLayout:!0},!isNaN(s)&&React.createElement(b,{label:a,setAttributes:o}),React.createElement(f,{termId:s,enableFlags:l,setAttributes:o}),React.createElement(m,{attachmentId:i,setAttributes:o})))},O=function(){var e=u.useBlockProps.save();return React.createElement(s.Fragment,e)};function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var j=a.name,h={title:Object(r.__)("Fact Sheet Collection"),icon:"format-aside",description:Object(r.__)("Set and display a collection of Fact Sheets. Set a report PDF or label for an alternat language post."),keywords:[Object(r.__)("prc"),Object(r.__)("factsheet"),Object(r.__)("fact sheet"),Object(r.__)("collection")],example:{attributes:{altLangPostId:61623,collectionId:12812,reportPdfUrl:""}},edit:w,save:O};Object(c.registerBlockType)(j,y(y({},a),h))},17:function(e,t){e.exports=window.wp.i18n},29:function(e,t){e.exports=window.wp.blockEditor},68:function(e,t){e.exports=window.wp.data},73:function(e,t){e.exports=window.wp.url},79:function(e,t){e.exports=window.wp.blocks},9:function(e,t){e.exports=window.wp.element}},[[150,0,1,5]]]);
//# sourceMappingURL=main-8dc8ca63.js.map