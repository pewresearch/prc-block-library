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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[46],{10:function(t,e){t.exports=window.wp.blocks},12:function(t,e){t.exports=window.wp.data},14:function(t,e,r){"use strict";function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return o}))},2:function(t,e){t.exports=window.wp.i18n},24:function(t,e,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},347:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/table-of-contents","title":"Table of Contents","description":"Displays a list of all heading blocks set to chapter headings.","keywords":["toc","chapter","table of contents"],"category":"design","attributes":{},"supports":{"align":["left","right"],"html":false,"multiple":false},"styles":[{"name":"default","label":"Default","isDefault":true},{"name":"mobile-icons","label":"Mobile Icons"}],"usesContext":["queryId","query","postId","postType","prc-block/column/width","prc-block/row/isEqual"]}')},4:function(t,e){t.exports=window.wp.element},5:function(t,e){t.exports=window.wp.blockEditor},949:function(t,e,r){r(24),t.exports=r(989)},989:function(t,e,r){"use strict";r.r(e);var o=r(14),n=r(2),c=r(10),a=r(347),i=r(4),s=r(5),l=r(12),u=function(t){t.attributes,t.className,t.setAttributes;var e=t.clientId,r=Object(s.useBlockProps)(),o=Object(l.useSelect)((function(t){var e=t("core/block-editor").getBlocks().filter((function(t){return"core/heading"===t.name&&t.attributes.isChapter}));return{chapters:0===e.length?[{attributes:{content:"Chapter 1..."}},{attributes:{content:"Chapter 2..."}},{attributes:{content:"Chapter 3..."}}]:e}}),[e]).chapters,n=void 0===o?[]:o;return React.createElement("div",r,React.createElement("ul",null,0!==n.length&&n.map((function(t,e){return React.createElement("li",null,t.attributes.content)}))))},b=function(){return React.createElement(i.Fragment,null)};function p(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?p(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var d=a.name,w={edit:u,save:b};Object(c.registerBlockType)(d,f(f({},a),w)),Object(c.registerBlockVariation)("core/group",{name:"toc",title:Object(n.__)("Table of Contents Sidebar"),description:Object(n.__)('A Group block in the "alt-card" format with a table of contents list.'),attributes:{className:"is-style-card-alt"},innerBlocks:[["core/heading",{className:"is-style-sub-header",level:3,content:"Table of Contents",backgroundColor:"slate",textColor:"white"}],["prc-block/table-of-contents",{}]]}),Object(c.registerBlockVariation)("core/group",{name:"toc-sticky",title:Object(n.__)("Table of Contents Sticky Sidebar"),description:Object(n.__)('A Group block in the "alt-card" format with a table of contents list.'),attributes:{className:"is-style-card-alt",isSticky:!0},innerBlocks:[["core/heading",{className:"is-style-sub-header",level:3,content:"Table of Contents",backgroundColor:"slate",textColor:"white"}],["prc-block/table-of-contents",{}]]})}},[[949,0]]]);
//# sourceMappingURL=table-of-contents-5fce3bad.js.map