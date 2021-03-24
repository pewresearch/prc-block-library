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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[3],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=wp.i18n},122:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/collapsible","category":"layout","attributes":{"title":{"type":"string","default":"How we did this"}},"styles":[{"name":"default","label":"Default","isDefault":true},{"name":"alternate","label":"Plus Icon"}],"supports":{"html":false,"align":false}}')},187:function(e,t,n){n(21),e.exports=n(257)},2:function(e,t){e.exports=React},257:function(e,t,n){"use strict";n.r(t);var c=n(5),r=n(1),a=n(6),o=n(122),l=n(12),i=n(9),s=n.n(i),p=n(280),u=n(146),b=n(0),d=n(4),f=["core/paragraph","core/heading","core/image","core/table","core/list","prc-block/menu-link"],m=[["core/paragraph",{}]],O=function(e){var t=e.attributes,n=e.setAttributes,c=t.title,r=t.className,a=void 0!==r?r.split(" "):[],o=Object(d.useBlockProps)({className:s()(r)}),i=Object(d.__experimentalUseInnerBlocksProps)({},{allowedBlocks:f,orientation:"vertical",templateLock:!1,template:m}),O=Object(b.useState)(!0),y=Object(l.a)(O,2),k=y[0],w=y[1];return React.createElement("div",o,React.createElement(p.a,{styled:!0},React.createElement(p.a.Title,{active:!0===k,index:0,onClick:function(){}},React.createElement(b.Fragment,null,!a.includes("is-style-alternate")&&React.createElement(u.a,{name:k?"caret down":"caret right",onClick:function(){w(!k)}}),React.createElement(d.RichText,{tagName:"div",value:c,onChange:function(e){return n({title:e})},placeholder:"How we did this",formattingControls:[],keepPlaceholderOnFocus:!0,style:{display:"inline-block"}}),a.includes("is-style-alternate")&&React.createElement(u.a,{name:k?"minus":"plus",style:{marginLeft:"0.5em"},onClick:function(){w(!k)}}))),React.createElement(p.a.Content,{active:!0===k},React.createElement("div",i))))},y=function(){return React.createElement(d.InnerBlocks.Content,null)};function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,c)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g=o.name,j={title:Object(r.__)("PRC Collapsible"),description:Object(r.__)("Add a block that displays content in a single accordion."),keywords:[Object(r.__)("Collapsible"),Object(r.__)("Accordion"),Object(r.__)("How we did this")],edit:O,save:y};Object(a.registerBlockType)(g,w(w({},o),j))},4:function(e,t){e.exports=wp.blockEditor},6:function(e,t){e.exports=wp.blocks}},[[187,0,1,24]]]);
//# sourceMappingURL=collapsible-d14b2d6e.js.map