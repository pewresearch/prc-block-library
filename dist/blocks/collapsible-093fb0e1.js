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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[5],{1:function(e,t){e.exports=window.React},2:function(e,t){e.exports=window.wp.i18n},259:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/collapsible","category":"layout","attributes":{"title":{"type":"string","default":"How we did this"}},"styles":[{"name":"default","label":"Default","isDefault":true},{"name":"alternate","label":"Plus Icon"}],"supports":{"html":false,"align":false}}')},4:function(e,t){e.exports=window.wp.element},421:function(e,t,n){n(23),e.exports=n(663)},6:function(e,t){e.exports=window.wp.blockEditor},663:function(e,t,n){"use strict";n.r(t);var c=n(14),r=n(2),o=n(9),a=n(259),i=n(20),l=n(15),s=n.n(l),p=n(707),u=n(114),b=n(4),d=n(6),w=["core/paragraph","core/heading","core/image","core/table","core/list","prc-block/menu-link"],f=[["core/paragraph",{}]],m=function(e){var t=e.attributes,n=e.setAttributes,c=t.title,r=t.className,o=void 0!==r?r.split(" "):[],a=Object(d.useBlockProps)({className:s()(r)}),l=Object(d.__experimentalUseInnerBlocksProps)({},{allowedBlocks:w,orientation:"vertical",templateLock:!1,template:f}),m=Object(b.useState)(!0),O=Object(i.a)(m,2),y=O[0],k=O[1];return React.createElement("div",a,React.createElement(p.a,{styled:!0},React.createElement(p.a.Title,{active:!0===y,index:0,onClick:function(){}},React.createElement(b.Fragment,null,!o.includes("is-style-alternate")&&React.createElement(u.a,{name:y?"caret down":"caret right",onClick:function(){k(!y)}}),React.createElement(d.RichText,{tagName:"div",value:c,onChange:function(e){return n({title:e})},placeholder:"How we did this",formattingControls:[],keepPlaceholderOnFocus:!0,style:{display:"inline-block"}}),o.includes("is-style-alternate")&&React.createElement(u.a,{name:y?"minus":"plus",style:{marginLeft:"0.5em"},onClick:function(){k(!y)}}))),React.createElement(p.a.Content,{active:!0===y},React.createElement("div",l))))},O=function(){return React.createElement(d.InnerBlocks.Content,null)};function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,c)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g=a.name,j={title:Object(r.__)("PRC Collapsible"),description:Object(r.__)("Add a block that displays content in a single accordion."),keywords:[Object(r.__)("Collapsible"),Object(r.__)("Accordion"),Object(r.__)("How we did this")],edit:m,save:O};Object(o.registerBlockType)(g,k(k({},a),j))},9:function(e,t){e.exports=window.wp.blocks}},[[421,0,1,44]]]);
//# sourceMappingURL=collapsible-093fb0e1.js.map