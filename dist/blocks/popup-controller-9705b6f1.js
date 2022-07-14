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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[33],{10:function(e,o){e.exports=window.wp.data},1039:function(e,o,t){"use strict";t.r(o);var c=t(13),r=t(2),n=t(8),l=t(399),i=t(4),p=t(5),a=t(10),d=t(176),s=[["prc-block/popup-content",{}],["prc-block/popup-modal",{}]],u=function(e){e.attributes,e.className,e.setAttributes;var o=e.clientId,t=Object(p.useBlockProps)(),c=Object(a.useSelect)((function(e){return{modalClientId:e("core/block-editor").getBlock(o).innerBlocks.filter((function(e){return"prc-block/popup-modal"===e.name})).pop().clientId}})).modalClientId,r=Object(a.useDispatch)("core/block-editor").selectBlock,n=Object(p.useInnerBlocksProps)(t,{orientation:"vertical",template:s,templateLock:"all"});return Object(i.useEffect)((function(){!function(){var e=document.querySelector(".edit-post-visual-editor__content-area");if(null===document.getElementById("prc-block-modal-background")){var o=document.createElement("div");o.setAttribute("id","prc-block-modal-background"),o.addEventListener("click",(function(){console.log(window.prcBlocks.modal);var e=window.prcBlocks.modal.clientId;window.prcBlocks.modal.isOpen=!1,window.prcBlocks.modal.clientId=!1,Object(a.dispatch)("core/block-editor").selectBlock(e)})),console.log("modalBackground",o),e.appendChild(o)}}()}),[o]),Object(i.useEffect)((function(){r(c)}),[window.prcBlocks.modal.isOpen]),React.createElement(d.a,{controllerClientId:o},React.createElement("div",n))},b=function(){return React.createElement(p.InnerBlocks.Content,null)},k=[{name:"popup-standard",isDefault:!0,title:Object(r.__)("Popup Standard","prc-block-library"),excerpt:Object(r.__)("A standard popup.","prc-block-library"),attributes:{},innerBlocks:[["prc-block/popup-content",{},[["core/paragraph",{placeholder:Object(r.__)("Add content to trigger your popup here.","prc-block-library")}]]],["prc-block/popup-modal",{className:"is-style-standard"},[["core/paragraph",{placeholder:Object(r.__)("Add content inside the modal here.","prc-block-library")}]]]]},{name:"popup-video",title:Object(r.__)("Popup Video","prc-block-library"),excerpt:Object(r.__)("A video popup.","prc-block-library"),attributes:{},innerBlocks:[["prc-block/popup-content",{},[["core/paragraph",{placeholder:Object(r.__)("Add content to trigger your video popup here.","prc-block-library")}]]],["prc-block/popup-modal",{className:"is-style-video"},[["vimeo/create",{}]]]]}];function w(e,o){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);o&&(c=c.filter((function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable}))),t.push.apply(t,c)}return t}function m(e){for(var o=1;o<arguments.length;o++){var t=null!=arguments[o]?arguments[o]:{};o%2?w(Object(t),!0).forEach((function(o){Object(c.a)(e,o,t[o])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):w(Object(t)).forEach((function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))}))}return e}var f=l.name,O={edit:u,save:b,variations:k};Object(n.registerBlockType)(f,m(m({},l),O))},13:function(e,o,t){"use strict";function c(e,o,t){return o in e?Object.defineProperty(e,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[o]=t,e}t.d(o,"a",(function(){return c}))},176:function(e,o,t){"use strict";t.d(o,"a",(function(){return p}));var c=t(2),r=t(4),n=t(5),l=t(3),i=t(10);function p(e){var o=e.controllerClientId,t=e.children,p=Object(i.useSelect)((function(e){return{modalClientId:e("core/block-editor").getBlock(o).innerBlocks.filter((function(e){return"prc-block/popup-modal"===e.name})).pop().clientId}})).modalClientId,a=Object(i.useDispatch)("core/block-editor").selectBlock;return React.createElement(r.Fragment,null,React.createElement(n.BlockControls,null,React.createElement(l.ToolbarGroup,null,React.createElement(l.ToolbarButton,{icon:Object(c.sprintf)("editor-%s",p===window.prcBlocks.modal.isOpen?"contract":"expand"),label:Object(c.sprintf)("%s Modal",p===window.prcBlocks.modal.isOpen?"Close":"Open"),onClick:function(){p===window.prcBlocks.modal.isOpen?(window.prcBlocks.modal.isOpen=!1,window.prcBlocks.modal.clientId=!1,a(o)):(window.prcBlocks.modal.isOpen=o,window.prcBlocks.modal.clientId=o,a(p))},isActive:o===window.prcBlocks.modal.isOpen}))),t)}window.hasOwnProperty("prcBlocks")||(window.prcBlocks={}),window.prcBlocks.modal={isOpen:!1,clientId:!1}},2:function(e,o){e.exports=window.wp.i18n},23:function(e,o,t){var c="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");t.p=window["__wpackIo".concat(c)]},3:function(e,o){e.exports=window.wp.components},399:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/popup-controller","title":"Popup Controller","icon":"playlist-video","description":"Display content in a popup.","category":"media","keywords":["video","vimeo","popup","modal"],"attributes":{},"supports":{"html":false,"align":["full","wide","left","right","center"],"anchor":true}}')},4:function(e,o){e.exports=window.wp.element},5:function(e,o){e.exports=window.wp.blockEditor},8:function(e,o){e.exports=window.wp.blocks},953:function(e,o,t){t(23),e.exports=t(1039)}},[[953,0]]]);
//# sourceMappingURL=popup-controller-9705b6f1.js.map