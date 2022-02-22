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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[27],{11:function(e,t){e.exports=window.wp.blocks},14:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},2:function(e,t){e.exports=window.wp.i18n},24:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},330:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/popup-content","title":"Popup Content","icon":"playlist-video","description":"The content here is the clickable trigger to display the modal.","category":"media","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/popup-controller"]}')},5:function(e,t){e.exports=window.wp.blockEditor},908:function(e,t,r){r(24),e.exports=r(982)},982:function(e,t,r){"use strict";r.r(t);var n=r(14),o=(r(2),r(11)),c=r(330),i=r(5),p=function(e){e.attributes,e.className,e.setAttributes;var t=Object(i.useBlockProps)(),r=Object(i.useInnerBlocksProps)(t,{orientation:"vertical",templateLock:!1});return React.createElement("div",r)},s=function(){return React.createElement(i.InnerBlocks.Content,null)};function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var u=c.name,b={edit:p,save:s};Object(o.registerBlockType)(u,l(l({},c),b))}},[[908,0]]]);
//# sourceMappingURL=popup-content-f68a9b38.js.map