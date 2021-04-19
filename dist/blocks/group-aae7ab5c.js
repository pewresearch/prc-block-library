/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[7],{1:function(e,r){e.exports=wp.i18n},11:function(e,r,t){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");t.p=window["__wpackIo".concat(o)]},209:function(e,r,t){t(11),e.exports=t(210)},210:function(e,r,t){"use strict";t.r(r);var o=t(6),c=t(1),n=t(84),l=t(5);t(211);function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){Object(o.a)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}Object(l.registerBlockStyle)("core/group",[{name:"fluid",label:"Fluid",isDefault:!0},{name:"200-wide",label:"200px Wide"},{name:"300-wide",label:"300px Wide"},{name:"420-wide",label:"420px Wide"},{name:"640-wide",label:"640px Wide"}]),Object(l.registerBlockVariation)("core/group",{name:"callout",title:Object(c.__)("Callout"),description:Object(c.__)('A Group block in the "Callout" style with a oatmeal background and pre-set innerblocks'),attributes:{className:"is-style-callout",style:{color:{background:"#f7f7f1"}}},innerBlocks:[["core/heading"],["core/paragraph"]]}),Object(l.registerBlockVariation)("core/group",{name:"card",title:Object(c.__)("Card"),description:Object(c.__)('A Group block in the "Card" format with a heading with a border, image, text, and read more link.'),attributes:{className:"is-style-card"},innerBlocks:[["core/heading",{className:"is-style-section-header",level:3,placeholder:"Signature Reports..."}],["core/image"],["prc-block/story-item"]]}),Object(n.addFilter)("blocks.registerBlockType","prc-block/group",(function(e){return"core/group"!==e.name||(void 0!==e.supports.align&&(e.supports.align=["left","right","wide","full"]),e.transforms={from:[{type:"block",blocks:["core/group","prc-block/callout"],transform:function(e,r){return Object(l.createBlock)("core/group",i({className:"is-style-callout",style:{color:{background:"#f7f7f1"}}},e),r)}}],to:[{type:"block",blocks:["core/group","prc-block/callout"],transform:function(e,r){return Object(l.createBlock)("core/group",i({className:"is-style-callout",style:{color:{background:"#f7f7f1"}}},e),r)}}]}),e}))},211:function(e,r,t){},5:function(e,r){e.exports=wp.blocks},6:function(e,r,t){"use strict";function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}t.d(r,"a",(function(){return o}))},84:function(e,r){e.exports=wp.hooks}},[[209,0]]]);
//# sourceMappingURL=group-aae7ab5c.js.map