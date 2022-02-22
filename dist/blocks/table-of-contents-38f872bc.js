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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[46],{1003:function(e,t,r){"use strict";r.r(t);var n=r(14),o=(r(2),r(11)),c=r(344),i=r(4),s=r(5),a=r(12),l=function(e){e.attributes,e.className,e.setAttributes;var t=e.clientId,r=Object(s.useBlockProps)(),n=Object(a.useSelect)((function(e){return{chapters:e("core/block-editor").getBlocks().filter((function(e){return"core/heading"===e.name&&e.attributes.isChapter}))}}),[t]).chapters,o=void 0===n?[]:n;return React.createElement("div",r,React.createElement("ul",null,0!==o.length&&o.map((function(e,t){return React.createElement("li",null,e.attributes.content)}))))},p=function(){return React.createElement(i.Fragment,null)};function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var f=c.name,w={edit:l,save:p};Object(o.registerBlockType)(f,b(b({},c),w))},11:function(e,t){e.exports=window.wp.blocks},12:function(e,t){e.exports=window.wp.data},14:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},2:function(e,t){e.exports=window.wp.i18n},24:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},344:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/table-of-contents","title":"Table of Contents","description":"Displays a list of all heading blocks set to chapter headings.","keywords":["toc","chapter","table of contents"],"category":"design","attributes":{},"supports":{"align":["left","right"],"html":false,"multiple":false},"usesContext":["queryId","query","postId","postType","prc-block/column/width","prc-block/row/isEqual"]}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},947:function(e,t,r){r(24),e.exports=r(1003)}},[[947,0]]]);
//# sourceMappingURL=table-of-contents-38f872bc.js.map