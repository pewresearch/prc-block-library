/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[15],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=React},125:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-categorized","category":"layout","attributes":{"heading":{"type":"string"}},"supports":{"html":false}}')},2:function(e,t){e.exports=wp.i18n},218:function(e,t,r){r(16),e.exports=r(248)},248:function(e,t,r){"use strict";r.r(t);var n=r(5),o=r(2),c=r(6),a=r(125),i=r(9),l=r.n(i),s=(r(0),r(4)),p=r(3),u=r(134),b=["prc-block/taxonomy-tree"],m=function(e){var t=e.attributes,r=e.className,n=e.setAttributes,o=t.heading,c=Object(p.useBlockProps)({className:l()(r)}),a=Object(p.__experimentalUseInnerBlocksProps)({},{allowedBlocks:b,orientation:"vertical",templateLock:!1});return React.createElement("div",c,React.createElement(s.Flex,null,React.createElement(s.FlexItem,null,React.createElement(p.RichText,{tagName:"h2",value:o,onChange:function(e){return n({heading:e})},placeholder:"Heading...",formattingControls:["link"],keepPlaceholderOnFocus:!0,className:"sans-serif"})),React.createElement(s.FlexBlock,null,React.createElement(u.a,{name:"chevron right",size:"large",style:{marginLeft:"0.5em"}}))),React.createElement("div",a))},f=function(){return React.createElement(p.InnerBlocks.Content,null)};function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=a.name,y={title:Object(o.__)("Topic Index Categorized"),description:"A collapsible list that allows taxonomy trees to be inserted.",category:"layout",keywords:[Object(o.__)("Topic Index"),Object(o.__)("Categorized"),Object(o.__)("Topic")],edit:m,save:f};Object(c.registerBlockType)(g,d(d({},a),y))},3:function(e,t){e.exports=wp.blockEditor},4:function(e,t){e.exports=wp.components},6:function(e,t){e.exports=wp.blocks}},[[218,0,1]]]);
//# sourceMappingURL=topic-index-categorized-dc01897b.js.map