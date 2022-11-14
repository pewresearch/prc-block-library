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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[43],{12:function(e,r,t){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");t.p=window["__wpackIo".concat(o)]},321:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/promo-rotator","title":"Promo Rotator","description":"Rotates through each block once on page load.","keywords":["promo","rotator","ads","ad"],"category":"marketing"}')},5:function(e,r){e.exports=window.wp.blockEditor},7:function(e,r){e.exports=window.wp.blocks},712:function(e,r,t){t(12),e.exports=t(806)},8:function(e,r,t){"use strict";function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}t.d(r,"a",(function(){return o}))},806:function(e,r,t){"use strict";t.r(r);var o=t(8),n=t(7),c=t(321),a=t(5),i=["prc-block/promo","prc-block/card"];var p=function(){var e=Object(a.useBlockProps)(),r=Object(a.useInnerBlocksProps)(e,{allowedBlocks:i,orientation:"vertical",templateLock:!1,renderAppender:a.InnerBlocks.ButtonBlockAppender});return React.createElement("div",r)},s=function(){return React.createElement(a.InnerBlocks.Content,null)};function l(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function u(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?l(Object(t),!0).forEach((function(r){Object(o.a)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var b=c.name,k={edit:p,save:s};Object(n.registerBlockType)(b,u(u({},c),k))}},[[712,0]]]);
//# sourceMappingURL=promo-rotator-5ed135a6.js.map