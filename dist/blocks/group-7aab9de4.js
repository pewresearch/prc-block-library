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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[9],{119:function(e,t){e.exports=window.wp.hooks},14:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},575:function(e,t,r){r(22),e.exports=r(680)},680:function(e,t,r){"use strict";r.r(t);var o=r(14),c=r(2),a=r(119),i=r(9);function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function n(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}Object(i.registerBlockStyle)("core/group",[{name:"fluid",label:"Fluid",isDefault:!0},{name:"200-wide",label:"200px Wide"},{name:"300-wide",label:"300px Wide"},{name:"420-wide",label:"420px Wide"},{name:"640-wide",label:"640px Wide"}]),Object(i.registerBlockVariation)("core/group",{name:"callout",title:Object(c.__)("Callout"),description:Object(c.__)('A Group block in the "Callout" style with a oatmeal background and pre-set innerblocks'),attributes:{className:"is-style-callout",style:{color:{background:"#f7f7f1"}}},innerBlocks:[["core/heading"],["core/paragraph"]]}),Object(i.registerBlockVariation)("core/group",{name:"card",title:Object(c.__)("Card"),description:Object(c.__)('A Group block in the "Card" format with a heading with a border, image, text, and read more link.'),attributes:{className:"is-style-card"},innerBlocks:[["core/heading",{className:"is-style-section-header",level:3,placeholder:"Signature Reports..."}],["core/image"],["prc-block/story-item",{className:"is-style-disabled"}]]}),Object(i.registerBlockVariation)("core/group",{name:"card-alt",title:Object(c.__)("Card (Alt)"),description:Object(c.__)('A Group block in the "Card" format with a sub header heading in a black background, image, text, and read more link.'),attributes:{className:"is-style-card-alt"},innerBlocks:[["core/heading",{className:"is-style-sub-header",level:3,placeholder:"Most Popular Posts..."}],["prc-block/story-item",{className:"is-style-disabled"}]]}),Object(i.registerBlockVariation)("core/group",{name:"segment",title:Object(c.__)("Segment"),description:Object(c.__)('A Group block in the "segment" format with a heading.'),attributes:{className:"is-style-segment ui segment"},innerBlocks:[["core/heading",{level:4,placeholder:"Subscribe to our topical newsletters..."}]]}),Object(a.addFilter)("blocks.registerBlockType","prc-block/group",(function(e){return"core/group"!==e.name||(void 0!==e.supports.align&&(e.supports.align=["left","right","wide","full"]),e.transforms={from:[{type:"block",blocks:["core/group","prc-block/callout"],transform:function(e,t){return Object(i.createBlock)("core/group",n({className:"is-style-callout",style:{color:{background:"#f7f7f1"}}},e),t)}}],to:[{type:"block",blocks:["core/group","prc-block/callout"],transform:function(e,t){return Object(i.createBlock)("core/group",n({className:"is-style-callout",style:{color:{background:"#f7f7f1"}}},e),t)}}]}),e}))},9:function(e,t){e.exports=window.wp.blocks}},[[575,0]]]);
//# sourceMappingURL=group-7aab9de4.js.map