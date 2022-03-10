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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[29],{11:function(e,t){e.exports=window.wp.data},12:function(e,t){e.exports=window.wp.blocks},14:function(e,t,o){"use strict";function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}o.d(t,"a",(function(){return n}))},160:function(e,t,o){"use strict";o.d(t,"a",(function(){return p}));var n=o(2),r=o(4),c=o(5),i=o(3),l=o(11);window.hasOwnProperty("prcBlocks")||(window.prcBlocks={}),window.prcBlocks.modal={isOpen:!1,clientId:!1};var p=function(e){var t=e.controllerClientId,o=e.children,p=Object(l.useSelect)((function(e){return{modalClientId:e("core/block-editor").getBlock(t).innerBlocks.filter((function(e){return"prc-block/popup-modal"===e.name})).pop().clientId}})).modalClientId,s=Object(l.useDispatch)("core/block-editor").selectBlock;return React.createElement(r.Fragment,null,React.createElement(c.BlockControls,null,React.createElement(i.ToolbarGroup,null,React.createElement(i.ToolbarButton,{icon:Object(n.sprintf)("editor-%s",p===window.prcBlocks.modal.isOpen?"contract":"expand"),label:Object(n.sprintf)("%s Modal",p===window.prcBlocks.modal.isOpen?"Close":"Open"),onClick:function(){p===window.prcBlocks.modal.isOpen?(window.prcBlocks.modal.isOpen=!1,window.prcBlocks.modal.clientId=!1,s(t)):(window.prcBlocks.modal.isOpen=t,window.prcBlocks.modal.clientId=t,s(p))},isActive:t===window.prcBlocks.modal.isOpen}))),o)}},2:function(e,t){e.exports=window.wp.i18n},24:function(e,t,o){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(n)]},3:function(e,t){e.exports=window.wp.components},335:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/popup-content","title":"Popup Content","icon":"playlist-video","description":"The content here is the clickable trigger to display the modal.","category":"media","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/popup-controller"]}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},915:function(e,t,o){o(24),e.exports=o(990)},990:function(e,t,o){"use strict";o.r(t);var n=o(14),r=(o(2),o(12)),c=o(335),i=o(5),l=o(11),p=o(160),s=function(e){e.attributes,e.className,e.setAttributes;var t=e.clientId,o=Object(l.useSelect)((function(e){return{rootClientId:e("core/block-editor").getBlockRootClientId(t)}})).rootClientId,n=Object(i.useBlockProps)(),r=Object(i.useInnerBlocksProps)(n,{orientation:"vertical",templateLock:!1});return React.createElement(p.a,{controllerClientId:o},React.createElement("div",r))},a=function(){return React.createElement(i.InnerBlocks.Content,null)};function u(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function d(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?u(Object(o),!0).forEach((function(t){Object(n.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):u(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var w=c.name,b={edit:s,save:a};Object(r.registerBlockType)(w,d(d({},c),b))}},[[915,0]]]);
//# sourceMappingURL=popup-content-698d0f69.js.map