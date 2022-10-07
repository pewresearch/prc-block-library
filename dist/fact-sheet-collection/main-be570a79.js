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
(window["wpackioprcBlocksLibraryfact-sheet-collectionJsonp"]=window["wpackioprcBlocksLibraryfact-sheet-collectionJsonp"]||[]).push([[2],{105:function(e,t){e.exports=window.wp.blocks},11:function(e,t){e.exports=window.wp.i18n},136:function(e,t){e.exports=window.wp.coreData},145:function(e){e.exports=JSON.parse('{"name":"prc-block/fact-sheet-collection","apiVersion":2,"category":"layout","attributes":{"altPostLabel":{"type":"string"},"enableFlags":{"type":"boolean","default":false},"pdfId":{"type":"integer","default":0}},"supports":{"html":false,"multiple":false},"styles":[{"name":"dropdown","label":"Dropdown","isDefault":true},{"name":"list","label":"List"}]}')},146:function(e,t){e.exports=regeneratorRuntime},147:function(e,t){e.exports=window.wp.primitives},149:function(e,t){e.exports=window.wp.date},164:function(e,t){e.exports=window.wp.mediaUtils},194:function(e,t,n){n(140),e.exports=n(214)},2:function(e,t){e.exports=window.wp.element},20:function(e,t){e.exports=window.wp.data},203:function(e,t){e.exports=window.wp.keycodes},214:function(e,t,n){"use strict";n.r(t);var o=n(160),r=n(11),a=n(105),c=n(145),l=n(96),i=(n(23),n(15),n(50)),s=(n(236),n(161),n(82)),u=n(20),d=n(2),p=n(9),b=(n(6),n(29),n(60)),m=n.n(b);n(162),n(14),n(146);var f,h=n(43),w=n(66);Object(s.a)(p.Button)(f||(f=Object(i.a)(["\n\t&:hover {\n\t\t/* Add opacity background to support future color changes */\n\t\t/* Reduce background from #ddd to 0.05 for text contrast  */\n\t\tbackground-color: rgba(0, 0, 0, 0.05);\n\n\t\t.block-editor-link-control__search-item-type {\n\t\t\tcolor: black;\n\t\t}\n\t}\n\n\t.block-editor-link-control__search-item-type {\n\t\tbackground-color: rgba(0, 0, 0, 0.05);\n\t}\n"])));var g,v,O=n(90),y=Object(O.c)((function(){return React.createElement("svg",{style:{marginRight:"5px",cursor:"grab",flexShrink:0},width:"18",height:"18",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M5 4h2V2H5v2zm6-2v2h2V2h-2zm-6 8h2V8H5v2zm6 0h2V8h-2v2zm-6 6h2v-2H5v2zm6 0h2v-2h-2v2z"}))})),k=Object(s.a)("div")(g||(g=Object(i.a)(["\n\tbutton {\n\t\tdisplay: block;\n\t\tpadding: 2px 8px 6px 8px;\n\t\tmargin-left: auto;\n\t\tfont-size: 2em;\n\t\tcursor: pointer;\n\t\tborder: none;\n\t\tbackground-color: transparent;\n\n\t\t&:hover {\n\t\t\tbackground-color: #ccc;\n\t\t}\n\t}\n"]))),j=function(e){var t=e.item,n=e.isOrderable,o=void 0!==n&&n,a=e.handleItemDelete,c=e.mode,l="post"===c?"postType":"taxonomy",i=Object(u.useSelect)((function(e){var n=e("core"),o=n.getEntityRecord,r=n.hasFinishedResolution,a=[l,t.type,t.id],i=o.apply(void 0,a);if(i){console.log("Has Item",i);var s={title:"post"===c?i.title.rendered:i.name,url:i.link,id:i.id};return t.uuid&&(s.uuid=t.uuid),s}if(r("getEntityRecord",a))return null}),[t.id,l]);return Object(d.useEffect)((function(){null===i&&a(t)}),[t,a,i]),i?React.createElement(k,{style:{border:"2px dashed #ddd",paddingTop:"10px",paddingBottom:"10px",paddingLeft:o?"3px":"8px"},className:"block-editor-link-control__search-item is-entity"},o?React.createElement(y,null):"",React.createElement("span",{className:"block-editor-link-control__search-item-header"},React.createElement("span",{className:"block-editor-link-control__search-item-title"},Object(w.decodeEntities)(i.title)),React.createElement("span",{"aria-hidden":!0,className:"block-editor-link-control__search-item-info"},Object(h.filterURLForDisplay)(Object(h.safeDecodeURI)(i.url))||"")),React.createElement("button",{type:"button",onClick:function(){a(i)},"aria-label":Object(r.__)("Delete item","10up-block-components")},"×")):React.createElement("div",null)};Object(O.a)((function(e){var t=e.items,n=e.isOrderable,o=e.handleItemDelete,r=e.mode,a=e.ChildComponent,c=void 0!==a&&a,l=!1!==c?n?Object(O.b)(c):c:n?Object(O.b)(j):j;return React.createElement("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'}},t.map((function(e,a){var c=e.uuid?e.uuid:e.id;return React.createElement(l,{isOrderable:!!(n&&1<t.length)&&n,key:"item-".concat(c),index:a,handleItemDelete:o,sortIndex:a,item:e,mode:r,totalItems:t.length})})))})),Object(s.a)("div")(v||(v=Object(i.a)(["\n\t& .block-editor-link-control__search-item {\n\t\tborder: none !important;\n\t\tcursor: default;\n\n\t\t&:hover {\n\t\t\tbackground: transparent;\n\t\t}\n\t}\n"])));n(229);var E=n(35);n(232);n(203);n(151),n(164);n(149),n(136);function x(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25;return new Promise((function(n){var o={};m()({path:"/wp/v2/".concat(e,"?per_page=").concat(t)}).then((function(t){for(var r=0;r<t.length;r++){var a=t[r].slug.replace("".concat(e.toLowerCase(),"_"),"");o[t[r].id]={id:t[r].id,name:t[r].name,parent:t[r].parent,slug:a}}n(o)}))}))}function R(e){var t=e.label,n=e.setAttributes;return React.createElement(p.TextControl,{label:"Alternate Post Label",value:t,onChange:function(e){return n({altPostLabel:e})}})}function _(e){var t=e.termId,n=e.enableFlags,o=e.setAttributes,r=Object(d.useState)(!1),a=Object(l.a)(r,2),c=a[0],i=a[1],s=Object(u.useDispatch)("core/editor").editPost;return Object(d.useEffect)((function(){var e;(e="collection",new Promise((function(t){x(e).then((function(e){var n=[],o=Object.keys(e).map((function(t){return e[t]}));o.filter((function(e){return 0===e.parent})).forEach((function(e){var t=o.filter((function(t){return t.parent===e.id})),r=[];t.forEach((function(e){r.push({name:e.name,id:e.id})})),n.push({name:e.name,id:e.id,children:r})})),t(n)}))}))).then((function(e){i(e)}))}),[]),React.createElement(d.Fragment,null,!1!==c&&React.createElement("div",{style:{display:"flex",flexDirection:"row",alignItems:"flex-end"}},React.createElement("div",{style:{flexGrow:1}},React.createElement(p.TreeSelect,{label:"Select Collection",noOptionLabel:"No Collection",onChange:function(e){return s({collection:parseFloat(e)})},selectedId:t,tree:c})),React.createElement("div",{style:{paddingLeft:"1em"}},React.createElement(p.ToggleControl,{label:"Enable Flags",checked:n,onChange:function(){return o({enableFlags:!n})}}))))}function P(e){var t=e.attachmentId,n=e.setAttributes;return React.createElement(E.MediaUploadCheck,null,React.createElement(E.MediaUpload,{title:"Upload PDF",allowedTypes:["application/pdf"],value:t,onSelect:function(e){return n({pdfId:e.id})},render:function(e){var o=e.open;return React.createElement(p.ButtonGroup,null,React.createElement(p.Button,{isPrimary:!0,onClick:o},0===t?"Upload PDF":"Change PDF"),0!==t&&React.createElement(p.Button,{isSecondary:!0,onClick:function(){return n({pdfId:0})}},"Clear PDF"))}}))}var F=function(e){var t=e.attributes,n=e.className,o=e.setAttributes,a=Object(E.useBlockProps)({className:n}),c=t.altPostLabel,l=t.enableFlags,i=t.pdfId,s=Object(u.useSelect)((function(e){return{termId:e("core/editor").getEditedPostAttribute("collection")}}),[]).termId;return React.createElement("div",a,React.createElement(p.Placeholder,{label:Object(r.__)("Configure Fact Sheet Collection"),isColumnLayout:!0},!isNaN(s)&&React.createElement(R,{label:c,setAttributes:o}),React.createElement(_,{termId:s,enableFlags:l,setAttributes:o}),React.createElement(P,{attachmentId:i,setAttributes:o})))},I=function(){var e=E.useBlockProps.save();return React.createElement(d.Fragment,e)};function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var S=c.name,L={title:Object(r.__)("Fact Sheet Collection"),icon:"format-aside",description:Object(r.__)("Set and display a collection of Fact Sheets. Set a report PDF or label for an alternat language post."),keywords:[Object(r.__)("prc"),Object(r.__)("factsheet"),Object(r.__)("fact sheet"),Object(r.__)("collection")],example:{attributes:{altLangPostId:61623,collectionId:12812,reportPdfUrl:""}},edit:F,save:I};Object(a.registerBlockType)(S,D(D({},c),L))},35:function(e,t){e.exports=window.wp.blockEditor},43:function(e,t){e.exports=window.wp.url},60:function(e,t){e.exports=window.wp.apiFetch},66:function(e,t){e.exports=window.wp.htmlEntities},9:function(e,t){e.exports=window.wp.components}},[[194,0,4]]]);
//# sourceMappingURL=main-be570a79.js.map