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
(window.wpackioprcBlocksLibrarycollapsibleJsonp=window.wpackioprcBlocksLibrarycollapsibleJsonp||[]).push([[3],{0:function(t,e){t.exports=React},120:function(t,e,n){n(70),t.exports=n(238)},22:function(t,e){t.exports=wp.element},238:function(t,e,n){"use strict";n.r(e);var o=n(32);var r=n(46);var a,c=n(47),l=n(34),i=n(48),s=n(33),p=n(22),u=n(68),b=n(239),d=function(t){var e=t.attributes,n=(t.className,t.setAttributes),o=e.title,r=Object(p.useState)(!0),a=Object(i.a)(r,2),c=a[0],l=a[1],d=c?"down":"right";return React.createElement(u.a,{styled:!0},React.createElement(u.a.Title,{active:!0===c,index:0},React.createElement(b.a,{name:"caret "+d,onClick:function(){return l(!c)}}),React.createElement(s.RichText,{tagName:"div",value:o,onChange:function(t){return n({title:t})},placeholder:"How we did this",formattingControls:[],keepPlaceholderOnFocus:!0,style:{display:"inline-block"}})),React.createElement(u.a.Content,{active:!0===c},React.createElement(s.InnerBlocks,null)))},f=function(t){var e=t.attributes.title;return React.createElement("div",{className:"js-react-collapsible","data-title":e},React.createElement(s.InnerBlocks.Content,null))},m=["prc-block/collapsible",{title:Object(l.__)("PRC Collapsible"),description:Object(l.__)("Add a block that displays content in a single accordion."),category:"layout",keywords:[Object(l.__)("Collapsible"),Object(l.__)("Accordion"),_("How we did this")],supports:{html:!1,align:!1},attributes:{title:{type:"string",default:"How we did this"}},transforms:{to:[{type:"block",blocks:["prc-block/callout"],transform:function(t,e){return Object(c.createBlock)("prc-block/callout",t,e)}}]},edit:d,save:f}];c.registerBlockType.apply(void 0,function(t){if(Array.isArray(t))return Object(o.a)(t)}(a=m)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(a)||Object(r.a)(a)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())},33:function(t,e){t.exports=wp.blockEditor},34:function(t,e){t.exports=wp.i18n},47:function(t,e){t.exports=wp.blocks}},[[120,0,1]]]);
//# sourceMappingURL=main-402be18c.js.map