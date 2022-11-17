/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.24
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[64],{1009:function(t,e,r){"use strict";r.r(e);var o=r(8),n=r(2),c=r(7),a=r(381),s=r(4),i=r(5),l=r(9),p=r(3),u=function(t){var e=t.attributes,r=(t.className,t.setAttributes),o=t.clientId,c=e.showCurrentChapter,a=Object(i.useBlockProps)(),u=Object(l.useSelect)((function(t){var e=t("core/block-editor").getBlocks().filter((function(t){return"core/heading"===t.name&&t.attributes.isChapter}));return{chapters:0===e.length?[{attributes:{content:"Chapter 1..."}},{attributes:{content:"Chapter 2..."}},{attributes:{content:"Chapter 3..."}}]:e}}),[o]).chapters,b=void 0===u?[]:u;return React.createElement(s.Fragment,null,React.createElement(i.InspectorAdvancedControls,null,React.createElement(p.ToggleControl,{label:Object(n.__)("Highlight Current Chapter"),checked:c,onChange:function(t){r({showCurrentChapter:!c})},help:Object(n.__)("Highlight the current chapter in the table of contents when scrolling.","prc-block-library")})),React.createElement("div",a,React.createElement("ul",null,0!==b.length&&b.map((function(t,e){return React.createElement("li",null,t.attributes.content)})))))},b=function(){return React.createElement(s.Fragment,null)};function h(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?h(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var d=a.name,w={edit:u,save:b};Object(c.registerBlockType)(d,f(f({},a),w)),Object(c.registerBlockVariation)("core/group",{name:"toc",title:Object(n.__)("Table of Contents Widget"),description:Object(n.__)('A Group block in the "alt-card" format with a table of contents list set to show the current chapter.'),attributes:{className:"is-style-card-alt",responsiveThreshold:640},innerBlocks:[["core/heading",{className:"is-style-sub-header toc-title",level:3,content:"Table of Contents",backgroundColor:"slate",textColor:"white"}],["prc-block/table-of-contents",{showCurrentChapter:!0}]]}),Object(c.registerBlockVariation)("core/group",{name:"toc-sticky",title:Object(n.__)("Table of Contents Sticky Sidebar"),description:Object(n.__)('A Group block in the "alt-card" format with a table of contents list that is sticky, watches for the current chapter, and collapses at 480px.'),attributes:{className:"is-style-card-alt",isSticky:!0,responsiveThreshold:480,align:"left"},innerBlocks:[["core/heading",{className:"is-style-sub-header toc-title",level:3,content:"Table of Contents",backgroundColor:"slate",textColor:"white"}],["prc-block/table-of-contents",{showCurrentChapter:!0}]]})},12:function(t,e,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},2:function(t,e){t.exports=window.wp.i18n},3:function(t,e){t.exports=window.wp.components},381:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/table-of-contents","title":"Table of Contents","description":"Displays a list of all heading blocks set to chapter headings.","keywords":["toc","chapter","table of contents"],"category":"design","attributes":{"showCurrentChapter":{"type":"boolean","default":false}},"supports":{"align":["left","right"],"html":false,"multiple":false},"usesContext":["queryId","query","postId","postType","prc-block/column/width","prc-block/row/isEqual","core/group/isSticky","core/group/responsiveThreshold"]}')},4:function(t,e){t.exports=window.wp.element},5:function(t,e){t.exports=window.wp.blockEditor},7:function(t,e){t.exports=window.wp.blocks},8:function(t,e,r){"use strict";function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return o}))},9:function(t,e){t.exports=window.wp.data},945:function(t,e,r){r(12),t.exports=r(1009)}},[[945,0]]]);
//# sourceMappingURL=table-of-contents-1732c790.js.map