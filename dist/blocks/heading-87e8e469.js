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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[18],{1:function(e,t){e.exports=window.React},1019:function(e,t,r){"use strict";r.r(t);var n=r(64),o=r(14),c=(r(58),r(45)),i=r(2),a=r(85),l=r(4),s=r(11),u=r(5),p=r(3),b=r(74);function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var f=Object(a.createHigherOrderComponent)((function(e){return function(t){var r=t.name,n=t.attributes,a=t.setAttributes;if("core/heading"!==r)return React.createElement(e,t);var s=n.isChapter,b=n.icon,f=n.altTocText,w=n.content,h=n.anchor;return React.createElement(l.Fragment,null,React.createElement(u.BlockControls,null,React.createElement(p.ToolbarGroup,null,React.createElement(p.ToolbarButton,{icon:"book-alt",label:"Is Chapter?",isActive:s,onClick:function(){var e={anchor:!0==!s?"CHAPTER-".concat(h):h.replace(/CHAPTER-/,""),isChapter:!s};a(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e))}}))),React.createElement(u.InspectorAdvancedControls,null,s&&React.createElement(l.Fragment,null,React.createElement(p.TextControl,{label:Object(i.__)("Alternate TOC Text","prc-block-library"),value:f,placeholder:w,onChange:function(e){return a({altTocText:e})}}),React.createElement(p.BaseControl,{label:Object(i.__)("Chapter Icon","prc-block-library")},React.createElement(c.e,{attachmentId:0!==b&&b,mediaType:["image"],mediaSize:"heading-block--chapter-icon",onUpdate:function(e){console.log("settingAttributes...",e),a({icon:e.id})}})))),React.createElement(e,t))}}),"withChapterControls");Object(b.addFilter)("editor.BlockEdit","prc-block/heading",f,21),Object(b.addFilter)("blocks.registerBlockType","prc-block-library/heading",(function(e,t){return"core/heading"!==t||(e.attributes.level.default=4,e.attributes.isChapter={type:"boolean",default:!1},e.transforms.from=[].concat(Object(n.a)(e.transforms.from),[{type:"block",blocks:["prc-block/chapter"],transform:function(e){var t=e.value,r=e.level;return Object(s.createBlock)("core/heading",{content:t,level:r,isChapter:!0})}}])),e})),Object(s.registerBlockStyle)("core/heading",[{name:"section-header",label:"Section Header"},{name:"sub-header",label:"Sub Header"}]),Object(s.registerBlockVariation)("core/heading",{name:"section-header",title:Object(i.__)("Section Header"),description:Object(i.__)('A heading styled for "section headings".'),attributes:{className:"is-style-section-header",level:3}}),Object(s.registerBlockVariation)("core/heading",{name:"chapter",title:Object(i.__)("Chapter"),description:Object(i.__)("A chapter heading."),icon:"editor-ol",attributes:{isChapter:!0}})},11:function(e,t){e.exports=window.wp.blocks},12:function(e,t){e.exports=window.wp.data},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,"a",(function(){return n}))},25:function(e,t){e.exports=window.wp.primitives},27:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(20);function o(e,t){if(e){if("string"==typeof e)return Object(n.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(e,t):void 0}}},29:function(e,t){e.exports=window.wp.apiFetch},3:function(e,t){e.exports=window.wp.components},36:function(e,t){e.exports=window.wp.url},38:function(e,t){e.exports=window.wp.htmlEntities},4:function(e,t){e.exports=window.wp.element},49:function(e,t){e.exports=window.ReactDOM},5:function(e,t){e.exports=window.wp.blockEditor},50:function(e,t){e.exports=regeneratorRuntime},58:function(e,t){e.exports=window.lodash},63:function(e,t){e.exports=window.wp.mediaUtils},64:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r(20);var o=r(67),c=r(27);function i(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||Object(o.a)(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},65:function(e,t){e.exports=window.wp.keycodes},67:function(e,t,r){"use strict";function n(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}r.d(t,"a",(function(){return n}))},74:function(e,t){e.exports=window.wp.hooks},85:function(e,t){e.exports=window.wp.compose},898:function(e,t,r){r(24),e.exports=r(1019)}},[[898,0,1,2]]]);
//# sourceMappingURL=heading-87e8e469.js.map