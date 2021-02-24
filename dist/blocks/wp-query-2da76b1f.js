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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[13],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=wp.i18n},13:function(e,t,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},135:function(e,t,r){r(13),e.exports=r(144)},144:function(e,t,r){"use strict";r.r(t);var n=r(4),o=r(7),c=r(1),i=r(62),a=r(0),s=(r(5),r(2)),p=["prc-block/story-item"],u=function(e){e.attributes,e.setAttributes;var t=e.className,r=(e.clientId,Object(s.useBlockProps)({className:t})),n=Object(s.__experimentalUseInnerBlocksProps)(r,{allowedBlocks:p,orientation:"vertical",renderAppender:s.InnerBlocks.ButtonBlockAppender});return React.createElement("div",n)},l=function(e){e.attributes;return React.createElement(a.Fragment,null)};function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var y=i.name,d={title:Object(c.__)("Query"),description:Object(c.__)("Query posts by format, topic, region, and/or date. Posts are displayed as Story Items."),edit:u,save:l};Object(o.registerBlockType)(y,f(f({},i),d))},2:function(e,t){e.exports=wp.blockEditor},4:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},5:function(e,t){e.exports=wp.data},62:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/wp-query","category":"layout","attributes":{"disableImage":{"type":"boolean","default":false},"perPage":{"type":"integer","default":10},"pinned":{"type":"string","default":"[]"},"postType":{"type":"string","default":"stub"},"taxQuery":{"type":"object","default":{"relation":"or","data":[]}}},"providesContext":{"prc-block/wp-query":"pinned"}}')},7:function(e,t){e.exports=wp.blocks}},[[135,0]]]);
//# sourceMappingURL=wp-query-2da76b1f.js.map