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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[17],{1:function(e,t){e.exports=window.React},1017:function(e,t,n){"use strict";n.r(t);var o=n(14),r=n(46),c=n(2),i=n(103),a=n(4),l=n(11),p=n(5),s=n(3),d=n(97);function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}var w=Object(i.createHigherOrderComponent)((function(e){return function(t){var n=t.name,i=t.attributes,l=t.setAttributes;if("core/heading"!==n)return React.createElement(e,t);var d=i.isChapter,w=i.icon,b=i.altTocText,f=i.content,h=i.anchor;return React.createElement(a.Fragment,null,React.createElement(p.BlockControls,null,React.createElement(s.ToolbarGroup,null,React.createElement(s.ToolbarButton,{icon:"editor-ol",label:"Is Chapter?",isActive:d,onClick:function(){var e={anchor:!0==!d?"CHAPTER-".concat(h):h.replace(/CHAPTER-/,""),isChapter:!d};l(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e))}}))),React.createElement(p.InspectorAdvancedControls,null,d&&React.createElement(a.Fragment,null,React.createElement(s.TextControl,{label:Object(c.__)("Alternate TOC Text","prc-block-library"),value:b,placeholder:f,onChange:function(e){return l({altTocText:e})}}),React.createElement(r.e,{attachmentId:w,mediaType:["image"],mediaSize:"heading-block--chapter-icon",onUpdate:function(e){console.log("IMAGE",e),l({icon:e.id})}}))),React.createElement(e,t))}}),"withChapterControls");Object(d.addFilter)("editor.BlockEdit","prc-block/heading",w,21),Object(d.addFilter)("blocks.registerBlockType","prc-block-library/heading",(function(e,t){return"core/heading"!==t||(e.attributes.level.default=4,e.attributes.isChapter={type:"boolean",default:!1}),e})),Object(l.registerBlockStyle)("core/heading",[{name:"section-header",label:"Section Header"},{name:"sub-header",label:"Sub Header"}]),Object(l.registerBlockVariation)("core/heading",{name:"section-header",title:Object(c.__)("Section Header"),description:Object(c.__)('A heading styled for "section headings".'),attributes:{className:"is-style-section-header",level:3}}),Object(l.registerBlockVariation)("core/heading",{name:"chapter",title:Object(c.__)("Chapter"),description:Object(c.__)("A chapter heading."),icon:"editor-ol",attributes:{isChapter:!0}})},103:function(e,t){e.exports=window.wp.compose},11:function(e,t){e.exports=window.wp.blocks},12:function(e,t){e.exports=window.wp.data},2:function(e,t){e.exports=window.wp.i18n},25:function(e,t){e.exports=window.wp.primitives},29:function(e,t){e.exports=window.wp.apiFetch},3:function(e,t){e.exports=window.wp.components},36:function(e,t){e.exports=window.wp.url},38:function(e,t){e.exports=window.wp.htmlEntities},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},52:function(e,t){e.exports=window.ReactDOM},61:function(e,t){e.exports=regeneratorRuntime},64:function(e,t){e.exports=window.wp.mediaUtils},65:function(e,t){e.exports=window.wp.keycodes},897:function(e,t,n){n(24),e.exports=n(1017)},97:function(e,t){e.exports=window.wp.hooks}},[[897,0,1,2]]]);
//# sourceMappingURL=heading-17b91e14.js.map