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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[16],{10:function(e,t){e.exports=window.wp.blocks},108:function(e,t){e.exports=window.wp.hooks},24:function(e,t,o){var i="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(i)]},3:function(e,t){e.exports=window.wp.i18n},861:function(e,t,o){o(24),e.exports=o(971)},971:function(e,t,o){"use strict";o.r(t);var i=o(3),r=o(10),c=o(108);Object(c.addFilter)("blocks.registerBlockType","prc-block-library/heading",(function(e,t){return"core/heading"!==t||(e.attributes.level.default=4,e.attributes.isChapter={type:"boolean",default:!1}),e})),Object(r.registerBlockStyle)("core/heading",[{name:"section-header",label:"Section Header"},{name:"sub-header",label:"Sub Header"}]),Object(r.registerBlockVariation)("core/heading",{name:"section-header",title:Object(i.__)("Section Header"),description:Object(i.__)('A heading styled for "section headings".'),attributes:{className:"is-style-section-header",level:3}})}},[[861,0]]]);
//# sourceMappingURL=heading-e0bad77d.js.map