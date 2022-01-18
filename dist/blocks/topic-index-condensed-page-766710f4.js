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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[51],{1:function(e,t){e.exports=window.React},11:function(e,t){e.exports=window.wp.blocks},15:function(e,t){e.exports=window.wp.data},2:function(e,t){e.exports=window.wp.i18n},3:function(e,t){e.exports=window.wp.element},33:function(e,t){e.exports=window.wp.apiFetch},334:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-page","category":"layout","attributes":{"heading":{"type":"string"},"uuid":{"type":"string"},"url":{"type":"string"}},"supports":{"html":false,"align":false,"inserter":false},"usesContext":["prc-block/topic-index-condensed-active"],"parent":["prc-block/topic-index-condensed-pages"]}')},4:function(e,t){e.exports=window.wp.components},43:function(e,t){e.exports=window.wp.url},53:function(e,t){e.exports=moment},55:function(e,t){e.exports=window.ReactDOM},6:function(e,t){e.exports=window.wp.blockEditor},87:function(e,t){e.exports=window.wp.keycodes},912:function(e,t,n){n(24),e.exports=n(938)},938:function(e,t,n){"use strict";n.r(t);var o=n(13),r=n(11),c=n(2),i=n(334),s=n(16),p=n.n(s),a=n(47),l=n(6),u=n(15),d=function(e){var t=e.attributes,n=e.className,o=e.clientId,r=e.context,c=e.setAttributes,i=t.heading,s=t.url,d=t.uuid,w=r["prc-block/topic-index-condensed-active"],b=Object(u.useSelect)((function(e){return{hasChildBlocks:0<(0,e("core/block-editor").getBlockOrder)(o).length}}),[o]).hasChildBlocks,f=Object(l.useBlockProps)({className:p()(n,{active:d===w})}),k=Object(l.useInnerBlocksProps)({className:"pages"},{renderAppender:b?l.InnerBlocks.DefaultBlockAppender:l.InnerBlocks.ButtonBlockAppender});return React.createElement("div",f,React.createElement(a.b,{url:s,heading:i,setAttributes:c,disableIcon:!0}),React.createElement("div",k))},w=function(){return React.createElement(l.InnerBlocks.Content,null)};function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var k=i.name,O={title:Object(c.__)("Page"),description:Object(c.__)("A sub block of Topic Index - Condensed View, this block controls the right side pages of content corresponding to an item from the menu."),edit:d,save:w};Object(r.registerBlockType)(k,f(f({},i),O))}},[[912,0,1,2]]]);
//# sourceMappingURL=topic-index-condensed-page-766710f4.js.map