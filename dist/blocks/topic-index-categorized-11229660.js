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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[47],{1:function(e,t){e.exports=window.React},11:function(e,t){e.exports=window.wp.blocks},15:function(e,t){e.exports=window.wp.data},2:function(e,t){e.exports=window.wp.i18n},3:function(e,t){e.exports=window.wp.element},33:function(e,t){e.exports=window.wp.apiFetch},330:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-categorized","category":"layout","attributes":{"heading":{"type":"string"},"url":{"type":"string"}},"supports":{"html":false}}')},4:function(e,t){e.exports=window.wp.components},43:function(e,t){e.exports=window.wp.url},53:function(e,t){e.exports=moment},55:function(e,t){e.exports=window.ReactDOM},6:function(e,t){e.exports=window.wp.blockEditor},87:function(e,t){e.exports=window.wp.keycodes},908:function(e,t,o){o(24),e.exports=o(955)},955:function(e,t,o){"use strict";o.r(t);var n=o(13),r=o(2),c=o(11),i=o(330),s=o(16),p=o.n(s),a=o(47),l=o(6),u=["prc-block/taxonomy-tree"],w=function(e){var t=e.attributes,o=e.className,n=e.setAttributes,c=e.clientId,i=t.heading,s=t.url,w=Object(l.useBlockProps)({className:p()(o)}),b=Object(l.useInnerBlocksProps)({},{allowedBlocks:u,orientation:"vertical",templateLock:!1,renderAppender:function(){return React.createElement(a.a,{label:Object(r.__)("Add New Tree List"),blockName:"prc-block/taxonomy-tree",clientId:c})}});return React.createElement("div",w,React.createElement(a.b,{url:s,heading:i,setAttributes:n}),React.createElement("div",b))},b=function(){return React.createElement(l.InnerBlocks.Content,null)};function d(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function f(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?d(Object(o),!0).forEach((function(t){Object(n.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):d(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var O=i.name,y={title:Object(r.__)("Topic Index Categorized"),description:"A collapsible list that allows taxonomy trees to be inserted.",category:"layout",keywords:[Object(r.__)("Topic Index"),Object(r.__)("Categorized"),Object(r.__)("Topic")],edit:w,save:b};Object(c.registerBlockType)(O,f(f({},i),y))}},[[908,0,1,2]]]);
//# sourceMappingURL=topic-index-categorized-11229660.js.map