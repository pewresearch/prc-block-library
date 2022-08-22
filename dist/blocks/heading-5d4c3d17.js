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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[21],{1098:function(e,t,r){"use strict";r.r(t);var n=r(57),o=r(2),c=r(8),a=r(89);Object(a.addFilter)("blocks.registerBlockType","prc-block-library/heading",(function(e,t){if("core/heading"!==t)return e;var r=e;return r.attributes.level.default=4,r.transforms.from=[].concat(Object(n.a)(r.transforms.from),[{type:"block",blocks:["prc-block/chapter"],transform:function(e){var t=e.value,r=e.level;return Object(c.createBlock)("core/heading",{content:t,level:r,isChapter:!0})}}]),r})),Object(c.registerBlockStyle)("core/heading",[{name:"section-header",label:"Section Header"},{name:"sub-header",label:"Sub Header"},{name:"hidden",label:"Hidden"}]),Object(c.registerBlockVariation)("core/heading",{name:"section-header",title:Object(o.__)("Section Header"),description:Object(o.__)('A heading styled for "section headings".'),attributes:{className:"is-style-section-header",level:3}})},19:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,"a",(function(){return n}))},2:function(e,t){e.exports=window.wp.i18n},21:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},26:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(19);function o(e,t){if(e){if("string"==typeof e)return Object(n.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(e,t):void 0}}},57:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r(19);var o=r(62),c=r(26);function a(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||Object(o.a)(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},62:function(e,t,r){"use strict";function n(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}r.d(t,"a",(function(){return n}))},8:function(e,t){e.exports=window.wp.blocks},89:function(e,t){e.exports=window.wp.hooks},951:function(e,t,r){r(21),e.exports=r(1098)}},[[951,0]]]);
//# sourceMappingURL=heading-5d4c3d17.js.map