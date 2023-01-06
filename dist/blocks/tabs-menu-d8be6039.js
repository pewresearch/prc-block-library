/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.27
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2023 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[66],{12:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},16:function(e,t){e.exports=window.wp.primitives},338:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/tabs-menu","title":"Tabs Menu","description":"A sub block of tabs, this block contains all menu items.","category":"layout","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false,"spacing":{"padding":true,"blockGap":true},"typography":{"fontSize":true,"fontAppearance":true,"__experimentalFontStyle":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalLetterSpacing":true,"__experimentalTextTransform":true,"__experimentalDefaultControls":{"fontSize":true,"fontAppearance":true,"__experimentalFontFamily":true}}},"parent":["prc-block/tabs"],"usesContext":["prc-block/tabs/layout"]}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},699:function(e,t,r){"use strict";var n=r(4),o=r(16),c=Object(n.createElement)(o.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(n.createElement)(o.Path,{d:"M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.5c-3.6 0-6.5-2.9-6.5-6.5S8.4 5.5 12 5.5s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5zM9 16l4.5-3L15 8.4l-4.5 3L9 16z"}));t.a=c},7:function(e,t){e.exports=window.wp.blocks},731:function(e,t,r){r(12),e.exports=r(810)},8:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},810:function(e,t,r){"use strict";r.r(t);var n=r(8),o=r(7),c=r(699),a=r(338),i=r(5),s=["prc-block/tabs-menu-item"],l=[["prc-block/tabs-menu-item",{}]];var p=function(e){e.className;var t=e.context["prc-block/tabs/layout"],r=Object(i.useBlockProps)({}),n=Object(i.useInnerBlocksProps)(r,{allowedBlocks:s,orientation:t?"vertical":"horizontal",template:l,templateLock:!1});return React.createElement("div",n)},u=function(){return React.createElement(i.InnerBlocks.Content,null)};function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m=a.name,w={icon:c.a,edit:p,save:u};Object(o.registerBlockType)(m,f(f({},a),w))}},[[731,0]]]);
//# sourceMappingURL=tabs-menu-d8be6039.js.map