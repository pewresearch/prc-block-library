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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[21],{1:function(e,t){e.exports=window.React},10:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},1098:function(e,t,n){"use strict";n.r(t);var r=n(57),o=n(10),c=(n(51),n(45)),i=n(2),a=n(74),l=n(4),s=n(8),u=n(5),p=n(3),b=n(78);function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var f=Object(a.createHigherOrderComponent)((function(e){return function(t){var n=t.name,r=t.attributes,a=t.setAttributes;if("core/heading"!==n)return React.createElement(e,t);var s=r.isChapter,b=r.icon,f=r.altTocText,w=r.content;return React.createElement(l.Fragment,null,React.createElement(u.BlockControls,null,React.createElement(p.ToolbarGroup,null,React.createElement(p.ToolbarButton,{icon:"book-alt",label:s?"Remove Chapter":"Make Chapter",isActive:s,onClick:function(){a(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},{isChapter:!s}))}}))),React.createElement(u.InspectorAdvancedControls,null,s&&React.createElement(l.Fragment,null,React.createElement(p.TextControl,{label:Object(i.__)("Alternate TOC Text","prc-block-library"),value:f,placeholder:w,onChange:function(e){return a({altTocText:e})}}),React.createElement(p.BaseControl,{label:Object(i.__)("Chapter Icon","prc-block-library")},React.createElement(c.e,{attachmentId:0!==b&&b,mediaType:["image"],mediaSize:"heading-block--chapter-icon",onUpdate:function(e){console.log("settingAttributes...",e),a({icon:e.id})}})))),React.createElement(e,t))}}),"withChapterControls");Object(b.addFilter)("editor.BlockEdit","prc-block/heading",f,21),Object(b.addFilter)("blocks.registerBlockType","prc-block-library/heading",(function(e,t){return"core/heading"!==t||(e.attributes.level.default=4,e.attributes.isChapter={type:"boolean",default:!1},e.transforms.from=[].concat(Object(r.a)(e.transforms.from),[{type:"block",blocks:["prc-block/chapter"],transform:function(e){var t=e.value,n=e.level;return Object(s.createBlock)("core/heading",{content:t,level:n,isChapter:!0})}}])),e})),Object(s.registerBlockStyle)("core/heading",[{name:"section-header",label:"Section Header"},{name:"sub-header",label:"Sub Header"},{name:"hidden",label:"Hidden"}]),Object(s.registerBlockVariation)("core/heading",{name:"section-header",title:Object(i.__)("Section Header"),description:Object(i.__)('A heading styled for "section headings".'),attributes:{className:"is-style-section-header",level:3}}),Object(s.registerBlockVariation)("core/heading",{name:"chapter",title:Object(i.__)("Chapter"),description:Object(i.__)("A chapter heading."),icon:"editor-ol",attributes:{isChapter:!0,level:3}})},19:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},2:function(e,t){e.exports=window.wp.i18n},24:function(e,t){e.exports=window.wp.primitives},26:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(19);function o(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},3:function(e,t){e.exports=window.wp.components},31:function(e,t){e.exports=window.wp.apiFetch},32:function(e,t){e.exports=window.wp.url},39:function(e,t){e.exports=window.wp.htmlEntities},4:function(e,t){e.exports=window.wp.element},47:function(e,t){e.exports=window.ReactDOM},49:function(e,t){e.exports=regeneratorRuntime},5:function(e,t){e.exports=window.wp.blockEditor},51:function(e,t){e.exports=window.lodash},57:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(19);var o=n(62),c=n(26);function i(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||Object(o.a)(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},58:function(e,t){e.exports=window.wp.keycodes},62:function(e,t,n){"use strict";function r(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}n.d(t,"a",(function(){return r}))},64:function(e,t){e.exports=window.wp.mediaUtils},74:function(e,t){e.exports=window.wp.compose},78:function(e,t){e.exports=window.wp.hooks},8:function(e,t){e.exports=window.wp.blocks},9:function(e,t){e.exports=window.wp.data},951:function(e,t,n){n(22),e.exports=n(1098)}},[[951,0,1,2]]]);
//# sourceMappingURL=heading-0dfb418b.js.map