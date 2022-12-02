/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.26
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[25],{11:function(t,r,e){"use strict";function n(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}e.d(r,"a",(function(){return n}))},12:function(t,r,e){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");e.p=window["__wpackIo".concat(n)]},17:function(t,r,e){"use strict";e.d(r,"a",(function(){return o}));var n=e(11);function o(t,r){if(t){if("string"==typeof t)return Object(n.a)(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?Object(n.a)(t,r):void 0}}},182:function(t,r){t.exports=window.wp.hooks},2:function(t,r){t.exports=window.wp.i18n},41:function(t,r,e){"use strict";e.d(r,"a",(function(){return i}));var n=e(11);var o=e(42),c=e(17);function i(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||Object(o.a)(t)||Object(c.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},42:function(t,r,e){"use strict";function n(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}e.d(r,"a",(function(){return n}))},503:function(t,r,e){e(12),t.exports=e(823)},7:function(t,r){t.exports=window.wp.blocks},823:function(t,r,e){"use strict";e.r(r);var n=e(41),o=e(2),c=e(7),i=e(182);Object(i.addFilter)("blocks.registerBlockType","prc-block-library/heading",(function(t,r){if("core/heading"!==r)return t;var e=t;return e.attributes.level.default=4,e.transforms.from=[].concat(Object(n.a)(e.transforms.from),[{type:"block",blocks:["prc-block/chapter"],transform:function(t){var r=t.value,e=t.level;return Object(c.createBlock)("core/heading",{content:r,level:e,isChapter:!0})}}]),e})),Object(c.registerBlockVariation)("core/heading",{name:"section-header",title:Object(o.__)("Section Header"),description:Object(o.__)('A heading styled for "section headings".'),attributes:{className:"is-style-section-header",level:3}})}},[[503,0]]]);
//# sourceMappingURL=heading-7e8928e4.js.map