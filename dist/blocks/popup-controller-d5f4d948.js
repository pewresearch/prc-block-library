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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[28],{11:function(e,t){e.exports=window.wp.blocks},14:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},2:function(e,t){e.exports=window.wp.i18n},24:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},329:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/popup-controller","title":"Popup Controller","icon":"playlist-video","description":"Display content in a popup.","category":"media","keywords":["video","vimeo","popup","modal"],"attributes":{},"supports":{"html":false,"anchor":true}}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},907:function(e,t,r){r(24),e.exports=r(981)},981:function(e,t,r){"use strict";r.r(t);var o=r(14),c=r(2),p=r(11),n=r(329),a=r(4),i=r(5),l=[["prc-block/popup-content",{}],["prc-block/popup-modal",{}]],s=function(e){e.attributes,e.className,e.setAttributes;var t=Object(i.useBlockProps)(),r=Object(i.useInnerBlocksProps)(t,{orientation:"vertical",template:l,templateLock:"all"});return React.createElement(a.Fragment,null,React.createElement("div",r))},u=function(){return React.createElement(i.InnerBlocks.Content,null)},b=[{name:"popup-standard",isDefault:!0,title:Object(c.__)("Popup Standard","prc-block-library"),excerpt:Object(c.__)("A standard popup.","prc-block-library"),attributes:{},innerBlocks:[["prc-block/popup-content",{},[["core/paragraph",{placeholder:Object(c.__)("Add content to trigger your popup here.","prc-block-library")}]]],["prc-block/popup-modal",{className:"is-style-standard"},[["core/paragraph",{placeholder:Object(c.__)("Add content inside the modal here.","prc-block-library")}]]]]},{name:"popup-video",title:Object(c.__)("Popup Video","prc-block-library"),excerpt:Object(c.__)("A video popup.","prc-block-library"),attributes:{},innerBlocks:[["prc-block/popup-content",{},[["core/paragraph",{placeholder:Object(c.__)("Add content to trigger your video popup here.","prc-block-library")}]]],["prc-block/popup-modal",{className:"is-style-video"},[["vimeo/create",{}]]]]}];function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function k(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var y=n.name,O={edit:s,save:u,variations:b};Object(p.registerBlockType)(y,k(k({},n),O))}},[[907,0]]]);
//# sourceMappingURL=popup-controller-d5f4d948.js.map