/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2020 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibrarycollapsibleJsonp=window.wpackioprcBlocksLibrarycollapsibleJsonp||[]).push([[3],{0:function(e,t){e.exports=React},122:function(e,t,a){a(72),e.exports=a(241)},18:function(e,t){e.exports=wp.blockEditor},238:function(e,t,a){},24:function(e,t){e.exports=wp.i18n},241:function(e,t,a){"use strict";a.r(t);var n=a(36);var l=a(48);var c,r=a(49),o=a(24),i=a(34),s=function(e){var t=e.attributes,a=e.setAttributes,n=t.title,l=t.className;return React.createElement(i.a,{title:n,className:l,defaultOpen:!0,setAttributes:a})},u=a(18),p=function(e){var t=e.attributes,a=t.title,n=t.className;return React.createElement("div",{className:"js-react-collapsible","data-title":a,"data-style":n},React.createElement(u.InnerBlocks.Content,null))},b=["prc-block/collapsible",{title:Object(o.__)("PRC Collapsible"),description:Object(o.__)("Add a block that displays content in a single accordion."),category:"layout",keywords:[Object(o.__)("Collapsible"),Object(o.__)("Accordion"),_("How we did this")],supports:{html:!1,align:!1},styles:[{name:"default",label:Object(o.__)("Default"),isDefault:!0},{name:"alternate",label:Object(o.__)("Plus Icon")}],attributes:{title:{type:"string",default:"How we did this"}},transforms:{to:[{type:"block",blocks:["prc-block/callout"],transform:function(e,t){return Object(r.createBlock)("prc-block/callout",e,t)}}]},edit:s,save:p}];a(238);r.registerBlockType.apply(void 0,function(e){if(Array.isArray(e))return Object(n.a)(e)}(c=b)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(c)||Object(l.a)(c)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())},34:function(e,t,a){"use strict";var n=a(50),l=a(18),c=a(9),r=a(29),o=a(51),i=["core/paragraph","core/heading","core/image","core/list","prc-block/button"],s=[["core/paragraph",{}]];t.a=function(e){var t=e.title,a=e.className,u=e.children,p=e.setAttributes,b=void 0!==p&&p,d=e.defaultOpen,m=void 0!==d&&d,f=Object(c.useState)(m),y=Object(n.a)(f,2),k=y[0],w=y[1],h=k?"caret down":"caret right";return"is-style-alternate"===a&&(h=k?"minus":"plus"),React.createElement(r.a,{styled:!0},React.createElement(r.a.Title,{active:!0===k,index:0,onClick:function(){!1===b&&w(!k)}},React.createElement(c.Fragment,null,"is-style-alternate"!==a&&React.createElement(o.a,{name:h,onClick:function(){!1!==b&&w(!k)}}),!1!==b&&React.createElement(l.RichText,{tagName:"div",value:t,onChange:function(e){return b({title:e})},placeholder:"How we did this",formattingControls:[],keepPlaceholderOnFocus:!0,style:{display:"inline-block"}}),!1===b&&React.createElement("span",null,t),"is-style-alternate"===a&&React.createElement(o.a,{name:h,style:{marginLeft:"0.5em"},onClick:function(){!1!==b&&w(!k)}}))),React.createElement(r.a.Content,{active:!0===k},!1!==b&&React.createElement(l.InnerBlocks,{allowedBlocks:i,template:s}),!1===b&&React.createElement(c.RawHTML,null,u)))}},49:function(e,t){e.exports=wp.blocks},9:function(e,t){e.exports=wp.element}},[[122,0,1]]]);
//# sourceMappingURL=main-04960743.js.map