/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.0.0
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2021 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[40],{1:function(e,t){e.exports=window.React},16:function(e,t){e.exports=window.wp.data},2:function(e,t){e.exports=window.wp.i18n},3:function(e,t){e.exports=window.wp.components},301:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-categorized","category":"layout","attributes":{"heading":{"type":"string"},"url":{"type":"string"}},"supports":{"html":false}}')},34:function(e,t){e.exports=window.wp.apiFetch},4:function(e,t){e.exports=window.wp.element},47:function(e,t){e.exports=moment},5:function(e,t){e.exports=window.wp.blockEditor},54:function(e,t){e.exports=window.wp.url},62:function(e,t){e.exports=window.wp.keycodes},63:function(e,t){e.exports=window.ReactDOM},641:function(e,t,o){o(21),e.exports=o(685)},685:function(e,t,o){"use strict";o.r(t);var n=o(13),r=o(2),c=o(9),i=o(301),s=o(15),p=o.n(s),a=o(33),l=o(5),u=["prc-block/taxonomy-tree"],w=function(e){var t=e.attributes,o=e.className,n=e.setAttributes,c=e.clientId,i=t.heading,s=t.url,w=Object(l.useBlockProps)({className:p()(o)}),b=Object(l.__experimentalUseInnerBlocksProps)({},{allowedBlocks:u,orientation:"vertical",templateLock:!1,renderAppender:function(){return React.createElement(a.a,{label:Object(r.__)("Add New Tree List"),blockName:"prc-block/taxonomy-tree",clientId:c})}});return React.createElement("div",w,React.createElement(a.b,{url:s,heading:i,setAttributes:n}),React.createElement("div",b))},b=function(){return React.createElement(l.InnerBlocks.Content,null)};function d(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function f(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?d(Object(o),!0).forEach((function(t){Object(n.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):d(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var O=i.name,y={title:Object(r.__)("Topic Index Categorized"),description:"A collapsible list that allows taxonomy trees to be inserted.",category:"layout",keywords:[Object(r.__)("Topic Index"),Object(r.__)("Categorized"),Object(r.__)("Topic")],edit:w,save:b};Object(c.registerBlockType)(O,f(f({},i),y))},9:function(e,t){e.exports=window.wp.blocks}},[[641,0,1,2]]]);
//# sourceMappingURL=topic-index-categorized-0c843441.js.map