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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[10],{119:function(e,t){e.exports=window.wp.hooks},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t,o){var i="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(i)]},575:function(e,t,o){o(22),e.exports=o(680)},680:function(e,t,o){"use strict";o.r(t);var i=o(2),r=o(9),c=o(119);Object(c.addFilter)("blocks.registerBlockType","prc-block-library/heading",(function(e,t){return"core/heading"!==t||(e.attributes.level.default=4,e.attributes.isChapter={type:"boolean",default:!1}),e})),Object(r.registerBlockStyle)("core/heading",[{name:"section-header",label:"Section Header"},{name:"sub-header",label:"Sub Header"}]),Object(r.registerBlockVariation)("core/heading",{name:"section-header",title:Object(i.__)("Section Header"),description:Object(i.__)('A heading styled for "section headings".'),attributes:{className:"is-style-section-header",level:3}})},9:function(e,t){e.exports=window.wp.blocks}},[[575,0]]]);
//# sourceMappingURL=heading-14fb5ea2.js.map