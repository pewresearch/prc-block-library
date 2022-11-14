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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[24],{11:function(e,t,r){"use strict";function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}r.d(t,"a",(function(){return o}))},12:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},18:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var o=r(11);function c(e,t){if(e){if("string"==typeof e)return Object(o.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(o.a)(e,t):void 0}}},183:function(e,t){e.exports=window.wp.hooks},2:function(e,t){e.exports=window.wp.i18n},43:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var o=r(11);var c=r(44),a=r(18);function n(e){return function(e){if(Array.isArray(e))return Object(o.a)(e)}(e)||Object(c.a)(e)||Object(a.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},44:function(e,t,r){"use strict";function o(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}r.d(t,"a",(function(){return o}))},501:function(e,t,r){r(12),e.exports=r(822)},7:function(e,t){e.exports=window.wp.blocks},8:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},822:function(e,t,r){"use strict";r.r(t);var o=r(43),c=r(8),a=r(2),n=r(183),i=r(7);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}Object(i.registerBlockVariation)("core/group",{name:"callout",title:Object(a.__)("Callout"),description:Object(a.__)('A Group block in the "Callout" style with a oatmeal background and pre-set innerblocks'),attributes:{className:"is-style-callout",backgroundColor:"beige"},innerBlocks:[["core/heading"],["core/paragraph"]],isActive:function(e,t){return e.className&&e.className===t.className}}),Object(i.registerBlockVariation)("core/group",{name:"card",title:Object(a.__)("Card"),icon:function(){return React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 512"},React.createElement("path",{d:"M300.4 312.6C308.1 308.2 317.9 310.8 322.3 318.5C326.7 326.1 324.1 335.9 316.4 340.3L268.2 368.2C260.6 372.6 250.8 369.1 246.4 362.3C241.1 354.7 244.6 344.9 252.2 340.4L300.4 312.6zM174.5 169.3C176.5 162.1 183.9 157.8 190.8 159.9L299.9 190.1C331.5 200 349.1 234.5 338.8 266.4C330.9 289.4 307.1 302.7 284.3 302C279.6 301.9 274.8 301.2 270.1 299.9L258.8 296.6L256.4 307.8C255.4 311.9 253.9 315.8 252.1 319.4C241.3 341.2 217.8 355.1 192.7 350.7C159.9 344.3 139.3 311 147.2 279.2L174.5 169.3zM178.2 286.9C174.7 301.1 184.1 316.2 198.6 319.2C209.4 320.1 221.6 313.8 225.3 300.4L234.8 256.1L278.9 269.1C292.1 272.9 305.3 265.2 308.5 255.1L308.6 255.8C313.6 241.5 305.2 225.8 291.1 221.7L200.8 196.1L178.2 286.9zM174.8 484.7C174.7 484.5 174.5 484.2 174.3 483.9L7.629 195.2C7.464 194.9 7.302 194.6 7.142 194.3C-7.774 167.8 1.408 134.1 27.85 118.8L220.7 7.468C247.3-7.906 281.4 1.218 296.8 27.85L463.8 317.1C479.1 343.6 470.1 377.5 443.8 392.1C443.6 393.1 443.3 393.2 443.1 393.4L250.8 504.4C250.6 504.5 250.4 504.6 250.1 504.8C223.8 519.7 190.3 510.8 174.8 484.7V484.7zM234.4 476.9C234.5 476.9 234.5 476.8 234.5 476.8L427.4 365.5C427.4 365.5 427.5 365.4 427.5 365.4C438.7 358.7 442.5 344.2 435.9 332.9L269.2 44.13C262.6 32.66 247.9 28.72 236.4 35.35L44.13 146.4C32.8 152.9 28.82 167.3 35.09 178.7C35.12 178.8 35.15 178.8 35.18 178.9L202.2 468.2C202.2 468.2 202.3 468.3 202.3 468.3C208.1 479.3 223.2 483.1 234.4 476.9V476.9zM360 512C346.4 512 333.8 507.1 324.1 498.1L357.3 479.8C358.2 479.9 359.1 480 360 480H584C597.3 480 608 469.3 608 456V119.1C608 106.7 597.3 95.1 584 95.1H373L354.7 64.25C356.5 64.08 358.2 63.1 360 63.1H584C614.9 63.1 640 89.07 640 119.1V456C640 486.9 614.9 512 584 512L360 512zM448.4 138.6C464.9 124.3 487.8 125.3 503.1 136.4C520.2 125.3 542.9 124.4 559.6 138.5L559.8 138.6C580.4 156.5 581.3 188.1 562.8 207.3L520.4 251.2C511.7 259.1 496.7 260.7 487.5 250.9L445.2 207.3C426.7 188.1 427.6 156.5 448.4 138.6L448.4 138.6zM469.3 162.9C462.6 168.6 462.3 178.9 468.2 185.1L504.1 222.1L539.8 185.1C545.7 178.9 545.4 168.6 538.9 162.9C533.9 158.7 525.6 158.9 519.9 164.6L504.4 181.7L488.2 164.7C482.4 158.8 473.9 158.9 469.4 162.8L469.3 162.9z"}))},description:Object(a.__)('A Group block in the "Card" format with a heading with a border, image, text, and read more link.'),attributes:{className:"is-style-card"},innerBlocks:[["core/heading",{className:"is-style-section-header",level:3,placeholder:"Signature Reports..."}],["core/image"],["prc-block/story-item",{className:"is-style-disabled"}]],isActive:function(e,t){return e.className&&e.className===t.className}}),Object(i.registerBlockVariation)("core/group",{name:"card-alt",title:Object(a.__)("Card (Alt)"),icon:function(){return React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 512"},React.createElement("path",{d:"M7.468 194.9C-7.906 168.2 1.218 134.2 27.85 118.8L220.7 7.468C247.3-7.906 281.4 1.218 296.8 27.85L463.8 317.1C479.1 343.8 470 377.8 443.4 393.2L250.5 504.5C223.9 519.9 189.9 510.8 174.5 484.2L7.468 194.9zM196.1 159.6C185.8 156.6 174.4 163.2 171.4 174.3L143.8 277.3C136.9 303.2 152.3 329.1 178.3 336.9C204.3 343.9 230.1 328.5 237.9 302.5L240.3 293.6C240.4 293.3 240.5 292.9 240.6 292.5L258.4 323.2L246.3 330.2C239.6 334 237.4 342.5 241.2 349.2C245.1 355.9 253.6 358.1 260.2 354.3L308.4 326.5C315.1 322.6 317.4 314.1 313.5 307.4C309.7 300.8 301.2 298.5 294.5 302.3L282.5 309.3L264.7 278.6C265.1 278.7 265.5 278.8 265.9 278.9L274.7 281.2C300.7 288.2 327.4 272.8 334.4 246.8C341.3 220.8 325.9 194.1 299.9 187.1L196.1 159.6zM491.5 301.1L354.7 64.25C356.5 64.08 358.2 63.1 360 63.1H584C614.9 63.1 640 89.07 640 119.1V456C640 486.9 614.9 512 584 512H360C346.4 512 333.8 507.1 324.1 498.1L459.4 420.9C501.3 396.7 515.7 343.1 491.5 301.1L491.5 301.1zM533.9 237.6L582 187.6C596 173.1 595.3 149.2 579.8 135.7C565.8 123.9 545.3 126.2 532.9 138.9L528.1 144.2L523.1 138.9C510.6 126.2 489.9 123.9 476.4 135.7C460.7 149.2 459.9 173.1 473.9 187.6L522.4 237.6C525.4 240.8 530.6 240.8 533.9 237.6H533.9z"}))},description:Object(a.__)('A Group block in the "Card" format with a sub header heading in a black background, image, text, and read more link.'),attributes:{className:"is-style-card-alt"},innerBlocks:[["core/heading",{className:"is-style-sub-header",level:3,placeholder:"Most Popular Posts...",backgroundColor:"slate",textColor:"white"}],["prc-block/story-item",{className:"is-style-disabled"}]],isActive:function(e,t){return e.className&&e.className===t.className}}),Object(i.registerBlockVariation)("core/group",{name:"social-group",title:Object(a.__)("Social Group"),icon:"share-alt2",description:Object(a.__)("A Group block that allows you to override the share meta for content inside."),attributes:{className:"is-style-social-group",templateLock:!0},innerBlocks:[["core/group",{templateLock:!1},[["core/paragraph",{placeholder:"Add visual content here..."}]]],["core/social-links",{iconColor:"text-color",iconColorValue:"#2a2a2a",size:"has-small-icon-size",className:"is-style-logos-only"},[["prc-block/social-share-url-field",{}],["core/social-link",{service:"facebook"}],["core/social-link",{service:"twitter"}],["core/social-link",{service:"linkedin"}]]]],isActive:function(e,t){return e.className&&e.className===t.className}}),Object(n.addFilter)("blocks.registerBlockType","prc-block/group",(function(e){return"core/group"!==e.name||(void 0!==e.supports.align&&(e.supports.align=["left","right","center","wide","full"]),void 0!==e.transforms&&void 0!==e.transforms.from&&(e.transforms.from.push({type:"block",blocks:["core/group","prc-block/callout"],transform:function(e,t){return Object(i.createBlock)("core/group",function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){Object(c.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({className:"is-style-callout",backgroundColor:"beige"},e),t)}}),e.transforms.from.push({type:"raw",isMatch:function(e){return e.classList.contains("callout")},transform:function(e){var t=Object(i.rawHandler)({HTML:e.innerHTML}),r={className:"is-style-callout",backgroundColor:"beige"};return e.getAttribute("align")&&(r.align=e.getAttribute("align")),Object(i.createBlock)("core/group",r,Object(o.a)(t))},priority:11}))),e}))}},[[501,0]]]);
//# sourceMappingURL=group-43d85242.js.map