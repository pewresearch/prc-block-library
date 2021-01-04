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
(window.wpackioprcBlocksLibrarycollapsibleJsonp=window.wpackioprcBlocksLibrarycollapsibleJsonp||[]).push([[3],{1:function(e,t){e.exports=React},15:function(e,t){e.exports=wp.element},18:function(e,t){e.exports=wp.blockEditor},31:function(e,t){e.exports=wp.i18n},45:function(e,t,a){"use strict";var n=a(62),l=a(18),c=a(15),r=a(43),o=a(67),i=["core/paragraph","core/heading","core/image","core/table","core/list","prc-block/button"],s=[["core/paragraph",{}]];t.a=function(e){var t=e.title,a=e.className,u=e.children,p=e.setAttributes,b=void 0!==p&&p,d=e.defaultOpen,m=void 0!==d&&d,f=Object(c.useState)(m),y=Object(n.a)(f,2),k=y[0],w=y[1],h=k?"caret down":"caret right";return"is-style-alternate"===a&&(h=k?"minus":"plus"),React.createElement(r.a,{styled:!0},React.createElement(r.a.Title,{active:!0===k,index:0,onClick:function(){!1===b&&w(!k)}},React.createElement(c.Fragment,null,"is-style-alternate"!==a&&React.createElement(o.a,{name:h,onClick:function(){!1!==b&&w(!k)}}),!1!==b&&React.createElement(l.RichText,{tagName:"div",value:t,onChange:function(e){return b({title:e})},placeholder:"How we did this",formattingControls:[],keepPlaceholderOnFocus:!0,style:{display:"inline-block"}}),!1===b&&React.createElement("span",null,t),"is-style-alternate"===a&&React.createElement(o.a,{name:h,style:{marginLeft:"0.5em"},onClick:function(){!1!==b&&w(!k)}}))),React.createElement(r.a.Content,{active:!0===k},!1!==b&&React.createElement(l.InnerBlocks,{allowedBlocks:i,template:s}),!1===b&&React.createElement(c.RawHTML,null,u)))}},50:function(e,t){e.exports=wp.blocks},88:function(e,t,a){a(69),e.exports=a(96)},93:function(e,t,a){},96:function(e,t,a){"use strict";a.r(t);var n=a(46);var l=a(49);var c,r=a(50),o=a(31),i=a(45),s=function(e){var t=e.attributes,a=e.setAttributes,n=t.title,l=t.className;return React.createElement(i.a,{title:n,className:l,defaultOpen:!0,setAttributes:a})},u=a(18),p=function(e){var t=e.attributes,a=t.title,n=t.className;return React.createElement("div",{className:"js-react-collapsible","data-title":a,"data-style":n},React.createElement(u.InnerBlocks.Content,null))},b=["prc-block/collapsible",{title:Object(o.__)("PRC Collapsible"),description:Object(o.__)("Add a block that displays content in a single accordion."),category:"layout",keywords:[Object(o.__)("Collapsible"),Object(o.__)("Accordion"),_("How we did this")],supports:{html:!1,align:!1},styles:[{name:"default",label:Object(o.__)("Default"),isDefault:!0},{name:"alternate",label:Object(o.__)("Plus Icon")}],attributes:{title:{type:"string",default:"How we did this"}},transforms:{to:[{type:"block",blocks:["prc-block/callout"],transform:function(e,t){return Object(r.createBlock)("prc-block/callout",e,t)}}]},edit:s,save:p}];a(93);r.registerBlockType.apply(void 0,function(e){if(Array.isArray(e))return Object(n.a)(e)}(c=b)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(c)||Object(l.a)(c)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())}},[[88,0,1]]]);
//# sourceMappingURL=main-8030e3b4.js.map