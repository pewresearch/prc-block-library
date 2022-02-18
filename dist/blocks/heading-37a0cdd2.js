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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[17],{101:function(e,t){e.exports=window.wp.compose},1014:function(e,t,r){"use strict";r.r(t);var n=r(14),o=r(2),c=r(101),a=r(3),i=r(11),l=r(5),s=r(4),p=r(96);function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var b=Object(c.createHigherOrderComponent)((function(e){return function(t){var r=t.name,c=t.attributes,i=t.setAttributes;if("core/heading"!==r)return React.createElement(e,t);var p=c.isChapter,b=c.altTocText,d=c.content,w=c.anchor;return React.createElement(a.Fragment,null,React.createElement(l.BlockControls,null,React.createElement(s.ToolbarGroup,null,React.createElement(s.ToolbarButton,{icon:"editor-ol",label:"Is Chapter?",isActive:p,onClick:function(){var e={anchor:!0==!p?"CHAPTER-".concat(w):w.replace(/CHAPTER-/,""),isChapter:!p};i(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e))}}))),React.createElement(l.InspectorAdvancedControls,null,React.createElement(s.TextControl,{label:Object(o.__)("Alternate TOC Text","prc-block-library"),value:b,placeholder:d,onChange:function(e){return i({altTocText:e})}})),React.createElement(e,t))}}),"withChapterControls");Object(p.addFilter)("editor.BlockEdit","prc-block/heading",b,21),Object(p.addFilter)("blocks.registerBlockType","prc-block-library/heading",(function(e,t){return"core/heading"!==t||(e.attributes.level.default=4,e.attributes.isChapter={type:"boolean",default:!1}),e})),Object(i.registerBlockStyle)("core/heading",[{name:"section-header",label:"Section Header"},{name:"sub-header",label:"Sub Header"}]),Object(i.registerBlockVariation)("core/heading",{name:"section-header",title:Object(o.__)("Section Header"),description:Object(o.__)('A heading styled for "section headings".'),attributes:{className:"is-style-section-header",level:3}})},11:function(e,t){e.exports=window.wp.blocks},14:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},2:function(e,t){e.exports=window.wp.i18n},24:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},3:function(e,t){e.exports=window.wp.element},4:function(e,t){e.exports=window.wp.components},5:function(e,t){e.exports=window.wp.blockEditor},896:function(e,t,r){r(24),e.exports=r(1014)},96:function(e,t){e.exports=window.wp.hooks}},[[896,0]]]);
//# sourceMappingURL=heading-37a0cdd2.js.map