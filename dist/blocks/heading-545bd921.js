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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[15],{11:function(e,t){e.exports=window.wp.blocks},120:function(e,t){e.exports=window.wp.hooks},2:function(e,t){e.exports=window.wp.i18n},24:function(e,t,o){var i="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(i)]},858:function(e,t,o){o(24),e.exports=o(963)},963:function(e,t,o){"use strict";o.r(t);var i=o(2),r=o(11),c=o(120);Object(c.addFilter)("blocks.registerBlockType","prc-block-library/heading",(function(e,t){return"core/heading"!==t||(e.attributes.level.default=4,e.attributes.isChapter={type:"boolean",default:!1}),e})),Object(r.registerBlockStyle)("core/heading",[{name:"section-header",label:"Section Header"},{name:"sub-header",label:"Sub Header"}]),Object(r.registerBlockVariation)("core/heading",{name:"section-header",title:Object(i.__)("Section Header"),description:Object(i.__)('A heading styled for "section headings".'),attributes:{className:"is-style-section-header",level:3}})}},[[858,0]]]);
//# sourceMappingURL=heading-545bd921.js.map