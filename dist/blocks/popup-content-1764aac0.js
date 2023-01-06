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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[36],{111:function(e,t,o){"use strict";o.d(t,"a",(function(){return s}));var n=o(2),c=o(4),r=o(5),i=o(3),l=o(9);function s(e){var t=e.controllerClientId,o=e.children,s=Object(l.useSelect)((function(e){return{modalClientId:e("core/block-editor").getBlock(t).innerBlocks.filter((function(e){return"prc-block/popup-modal"===e.name})).pop().clientId}})).modalClientId,p=Object(l.useDispatch)("core/block-editor").selectBlock;return React.createElement(c.Fragment,null,React.createElement(r.BlockControls,null,React.createElement(i.ToolbarGroup,null,React.createElement(i.ToolbarButton,{icon:Object(n.sprintf)("editor-%s",s===window.prcBlocks.modal.isOpen?"contract":"expand"),label:Object(n.sprintf)("%s Modal",s===window.prcBlocks.modal.isOpen?"Close":"Open"),onClick:function(){s===window.prcBlocks.modal.isOpen?(window.prcBlocks.modal.isOpen=!1,window.prcBlocks.modal.clientId=!1,p(t)):(window.prcBlocks.modal.isOpen=t,window.prcBlocks.modal.clientId=t,p(s))},isActive:t===window.prcBlocks.modal.isOpen}))),o)}window.hasOwnProperty("prcBlocks")||(window.prcBlocks={}),window.prcBlocks.modal={isOpen:!1,clientId:!1}},12:function(e,t,o){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(n)]},2:function(e,t){e.exports=window.wp.i18n},3:function(e,t){e.exports=window.wp.components},316:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/popup-content","title":"Popup Content","icon":"playlist-video","description":"The content inside this block will act as the clickable trigger to display the modal.","category":"media","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/popup-controller"]}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},706:function(e,t,o){o(12),e.exports=o(784)},784:function(e,t,o){"use strict";o.r(t);var n=o(8),c=(o(2),o(7)),r=o(316),i=o(5),l=o(9),s=o(111),p=function(e){e.attributes,e.className,e.setAttributes;var t=e.clientId,o=Object(l.useSelect)((function(e){return{rootClientId:e("core/block-editor").getBlockRootClientId(t)}})).rootClientId,n=Object(i.useBlockProps)(),c=Object(i.useInnerBlocksProps)(n,{orientation:"vertical",templateLock:!1});return React.createElement(s.a,{controllerClientId:o},React.createElement("div",c))},a=function(){return React.createElement(i.InnerBlocks.Content,null)};function u(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function d(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?u(Object(o),!0).forEach((function(t){Object(n.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):u(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var w=r.name,b={edit:p,save:a};Object(c.registerBlockType)(w,d(d({},r),b))},8:function(e,t,o){"use strict";function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}o.d(t,"a",(function(){return n}))},9:function(e,t){e.exports=window.wp.data}},[[706,0]]]);
//# sourceMappingURL=popup-content-1764aac0.js.map