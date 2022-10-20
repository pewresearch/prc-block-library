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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[8],{10:function(e,t){e.exports=window.wp.data},20:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},404:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/carousel-slide","title":"Slide","description":"A slide for use in the carousel block.","category":"essay","attributes":{},"supports":{"html":false,"__experimentalMetadata":true,"color":true,"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true}},"parent":["prc-block/carousel"],"styles":[{"name":"box-shadow","label":"Box Shadow"}]}')},5:function(e,t){e.exports=window.wp.blockEditor},8:function(e,t){e.exports=window.wp.blocks},804:function(e,t,r){r(20),e.exports=r(850)},850:function(e,t,r){"use strict";r.r(t);var n=r(9),o=r(8),c=r(404),i=r(5),a=r(10),s=function(e){var t=e.attributes,r=(e.className,e.setAttributes,e.clientId),n=t.direction,o=Object(i.useBlockProps)(),c=(Object(a.useSelect)((function(e){return 0<e(i.store).getBlocks(r).length}),[r]),Object(i.useInnerBlocksProps)({},{orientation:n,templateLock:!1,template:[["core/paragraph",{placeholder:"You can use any blocks inside this carousel slide."}]]}));return React.createElement("div",o,React.createElement("div",c))},l=function(){return React.createElement(i.InnerBlocks.Content,null)};function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var b=c.name,w={icon:function(){return React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",width:"24",height:"24"},React.createElement("path",{d:"M512 448C512 483.3 483.3 512 448 512H64C28.65 512 0 483.3 0 448V224C0 188.7 28.65 160 64 160H448C483.3 160 512 188.7 512 224V448zM440 80C453.3 80 464 90.75 464 104C464 117.3 453.3 128 440 128H72C58.75 128 48 117.3 48 104C48 90.75 58.75 80 72 80H440zM392 0C405.3 0 416 10.75 416 24C416 37.25 405.3 48 392 48H120C106.7 48 96 37.25 96 24C96 10.75 106.7 0 120 0H392z"}))},edit:s,save:l};Object(o.registerBlockType)(b,u(u({},c),w))},9:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))}},[[804,0]]]);
//# sourceMappingURL=carousel-slide-a88d1e21.js.map