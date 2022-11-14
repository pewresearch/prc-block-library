/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.23
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[68],{1027:function(e,t,r){"use strict";r.r(t);var n=r(8),o=r(7),c=(r(2),r(385)),i=r(5),s=r(9);var a=function(e){var t=e.attributes,r=e.context,n=e.clientId,o=t.uuid,c=r["prc-block/tabs/active"],a=Object(s.useSelect)((function(e){return{hasChildBlocks:0<(0,e("core/block-editor").getBlockOrder)(n).length}}),[n]).hasChildBlocks,p=Object(i.useBlockProps)({"aria-hidden":o!==c}),l=Object(i.useInnerBlocksProps)(p,{renderAppender:a?i.InnerBlocks.DefaultBlockAppender:i.InnerBlocks.ButtonBlockAppender});return React.createElement("div",l)},p=function(){return React.createElement(i.InnerBlocks.Content,null)};function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var b=c.name,f={edit:a,save:p};Object(o.registerBlockType)(b,u(u({},c),f))},12:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},2:function(e,t){e.exports=window.wp.i18n},385:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/tabs-pane","title":"Pane","category":"layout","attributes":{"uuid":{"type":"string"}},"supports":{"html":false,"align":false,"inserter":false,"typography":{"fontSize":true,"__experimentalFontFamily":true}},"usesContext":["prc-block/tabs/active","prc-block/tabs/layout"],"parent":["prc-block/tabs-panes"]}')},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},8:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},9:function(e,t){e.exports=window.wp.data},949:function(e,t,r){r(12),e.exports=r(1027)}},[[949,0]]]);
//# sourceMappingURL=tabs-pane-c29d680d.js.map