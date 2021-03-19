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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[16],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=wp.i18n},128:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-categorized","category":"layout","attributes":{"heading":{"type":"string"}},"supports":{"html":false}}')},2:function(e,t){e.exports=React},21:function(e,t){e.exports=moment},22:function(e,t){e.exports=wp.apiFetch},225:function(e,t,n){n(17),e.exports=n(246)},246:function(e,t,n){"use strict";n.r(t);var o=n(5),r=n(1),c=n(6),a=n(128),i=n(9),l=n.n(i),s=(n(0),n(4)),p=n(3),u=n(135),b=n(41),d=["prc-block/taxonomy-tree"],f=function(e){var t=e.attributes,n=e.className,o=e.setAttributes,r=e.clientId,c=t.heading,a=Object(p.useBlockProps)({className:l()(n)}),i=Object(p.__experimentalUseInnerBlocksProps)({},{allowedBlocks:d,orientation:"vertical",templateLock:!1,renderAppender:function(e){return React.createElement(b.a,{label:"Add New Tree List",blockName:"prc-block/taxonomy-tree",clientId:r})}});return React.createElement("div",a,React.createElement(s.Flex,null,React.createElement(s.FlexItem,null,React.createElement(p.RichText,{tagName:"h2",value:c,onChange:function(e){return o({heading:e})},placeholder:"Heading...",formattingControls:["link"],keepPlaceholderOnFocus:!0,className:"sans-serif"})),React.createElement(s.FlexBlock,null,React.createElement(u.a,{name:"chevron right",size:"large",style:{marginLeft:"0.5em"}}))),React.createElement("div",i))},m=function(){return React.createElement(p.InnerBlocks.Content,null)};function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var O=a.name,w={title:Object(r.__)("Topic Index Categorized"),description:"A collapsible list that allows taxonomy trees to be inserted.",category:"layout",keywords:[Object(r.__)("Topic Index"),Object(r.__)("Categorized"),Object(r.__)("Topic")],edit:f,save:m};Object(c.registerBlockType)(O,k(k({},a),w))},3:function(e,t){e.exports=wp.blockEditor},31:function(e,t){e.exports=wp.url},4:function(e,t){e.exports=wp.components},41:function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return p}));n(21);var o=n(22),r=n.n(o),c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25;return new Promise((function(n){var o={};r()({path:"/wp/v2/".concat(e,"?per_page=").concat(t)}).then((function(t){for(var r=0;r<t.length;r++){var c=t[r].slug.replace("".concat(e.toLowerCase(),"_"),"");o[t[r].id]={id:t[r].id,name:t[r].name,parent:t[r].parent,slug:c}}n(o)}))}))},a=(n(5),n(1)),i=n(7),l=n(4),s=n(6),p=function(e){var t=e.label,n=void 0===t?"":t,o=e.blockName,r=e.clientId;return React.createElement(l.Button,{label:Object(a.__)(n),tooltipPosition:"bottom",onClick:function(){var e=Object(i.select)("core/block-editor").getBlock(r);console.log("debug info...",e.innerBlocks.length);var t=e.innerBlocks.length-1,n=Object(s.createBlock)(o,{});Object(i.dispatch)("core/block-editor").insertBlock(n,t,r)},className:"block-editor-button-block-appender"},Object(a.__)(n))};n(14),n(0),n(51),n(265),n(34),n(31),n(3)},48:function(e,t){e.exports=ReactDOM},6:function(e,t){e.exports=wp.blocks},7:function(e,t){e.exports=wp.data}},[[225,0,1,2]]]);
//# sourceMappingURL=topic-index-categorized-128ba275.js.map