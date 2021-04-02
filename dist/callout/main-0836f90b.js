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
(window.wpackioprcBlocksLibrarycalloutJsonp=window.wpackioprcBlocksLibrarycalloutJsonp||[]).push([[0],{10:function(e,t){e.exports=wp.components},15:function(e,t){e.exports=wp.element},2:function(e,t){e.exports=React},3:function(e,t){e.exports=wp.i18n},33:function(e,t,n){n(34),e.exports=n(38)},38:function(e,t,n){"use strict";n.r(t);var c=n(18),l=n(7),a=n(3),o=n(5),r=n(10),i=n(40),s=n(15),u=n(16),p=n.n(u),b=function(e,t){return parseInt(e)===parseInt(t)},m=function(e,t){return p()(e,{"size-200":b(200,t),"size-310":b(310,t),"size-420":b(420,t),"size-640":b(640,t)})},d=["core/image","core/paragraph","core/heading","core/list","prc-block/button"],f=[["core/heading",{content:"Heading Here",level:4}]],k=function(e){var t=e.size,n=e.setSize;return React.createElement(o.InspectorControls,null,React.createElement(r.PanelBody,{title:Object(a.__)("Callout Options")},React.createElement("div",null,React.createElement(r.SelectControl,{label:"Size",value:t,options:[{label:"200",value:200},{label:"310",value:310},{label:"420",value:420},{label:"640",value:640}],onChange:function(e){n(e)}}))))},g=function(e){var t=e.attributes,n=e.className,c=e.setAttributes,l=t.size;return React.createElement(s.Fragment,null,React.createElement(k,{size:l,setSize:function(e){return c({size:e})}}),React.createElement(i.a,{inverted:!0,className:m("".concat(n," beige"),l)},React.createElement(o.InnerBlocks,{allowedBlocks:d,template:f})))},v=function(e){var t=e.className,n=e.attributes.size;return React.createElement(i.a,{inverted:!0,className:m("".concat(t," beige"),n)},React.createElement(o.InnerBlocks.Content,null))},w=["prc-block/callout",{title:Object(a.__)("PRC Callout"),description:Object(a.__)("Add a block that displays content in a oatmeal callout."),category:"layout",keywords:[Object(a.__)("Callout"),Object(a.__)("Segment")],supports:{html:!1,align:["left","right"]},transforms:{to:[{type:"block",blocks:["prc-block/collapsible"],transform:function(e,t){return Object(l.createBlock)("prc-block/collapsible",e,t)}}]},attributes:{width:{type:"integer",default:310}},edit:g,save:v}];l.registerBlockType.apply(void 0,Object(c.a)(w))},5:function(e,t){e.exports=wp.blockEditor},7:function(e,t){e.exports=wp.blocks}},[[33,1,2]]]);
//# sourceMappingURL=main-0836f90b.js.map