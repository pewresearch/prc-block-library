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
(window.wpackioprcBlocksLibrarycollapsibleJsonp=window.wpackioprcBlocksLibrarycollapsibleJsonp||[]).push([[3],{0:function(e,t){e.exports=React},120:function(e,t,a){a(70),e.exports=a(239)},22:function(e,t){e.exports=wp.element},23:function(e,t){e.exports=wp.i18n},236:function(e,t,a){},239:function(e,t,a){"use strict";a.r(t);var n=a(33);var c=a(46);var o,r=a(47),l=a(23),i=a(48),s=a(34),u=a(22),p=a(68),b=a(240),d=["core/paragraph","core/heading","core/list","prc-block/button"],m=function(e){var t=e.attributes,a=e.setAttributes,n=t.title,c=t.className,o=Object(u.useState)(!0),r=Object(i.a)(o,2),l=r[0],m=r[1],y=l?"caret down":"caret right";return"is-style-secondary"===c&&(y=l?"minus":"plus"),React.createElement(p.a,{styled:!0},React.createElement(p.a.Title,{active:!0===l,index:0,className:c},"is-style-secondary"!==c&&React.createElement(b.a,{name:y,onClick:function(){return m(!l)}}),React.createElement(s.RichText,{tagName:"div",value:n,onChange:function(e){return a({title:e})},placeholder:"How we did this",formattingControls:[],keepPlaceholderOnFocus:!0,style:{display:"inline-block"}}),"is-style-secondary"===c&&React.createElement(b.a,{name:y,onClick:function(){return m(!l)},style:{marginLeft:"1em"}})),React.createElement(p.a.Content,{active:!0===l},React.createElement(s.InnerBlocks,{allowedBlocks:d})))},y=function(e){var t=e.attributes.title;return React.createElement("div",{className:"js-react-collapsible","data-title":t},React.createElement(s.InnerBlocks.Content,null))},f=["prc-block/collapsible",{title:Object(l.__)("PRC Collapsible"),description:Object(l.__)("Add a block that displays content in a single accordion."),category:"layout",keywords:[Object(l.__)("Collapsible"),Object(l.__)("Accordion"),_("How we did this")],supports:{html:!1,align:!1},styles:[{name:"default",label:Object(l.__)("Default"),isDefault:!0},{name:"secondary",label:Object(l.__)('Secondary "How We Did This"')}],attributes:{title:{type:"string",default:"How we did this"}},transforms:{to:[{type:"block",blocks:["prc-block/callout"],transform:function(e,t){return Object(r.createBlock)("prc-block/callout",e,t)}}]},edit:m,save:y}];a(236);r.registerBlockType.apply(void 0,function(e){if(Array.isArray(e))return Object(n.a)(e)}(o=f)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(o)||Object(c.a)(o)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())},34:function(e,t){e.exports=wp.blockEditor},47:function(e,t){e.exports=wp.blocks}},[[120,0,1]]]);
//# sourceMappingURL=main-02a9fa3e.js.map