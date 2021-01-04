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
(window.wpackioprcBlocksLibrarycolumnsJsonp=window.wpackioprcBlocksLibrarycolumnsJsonp||[]).push([[0],[function(e,t){e.exports=wp.i18n},function(e,t){e.exports=wp.components},,function(e,t){e.exports=React},function(e,t){e.exports=wp.blockEditor},,,function(e,t){e.exports=wp.blocks},function(e,t){e.exports=wp.element},function(e,t){e.exports=lodash},,function(e,t){e.exports=wp.data},,,,,,,,function(e,t,c){c(20),e.exports=c(25)},,,,,function(e,t,c){},function(e,t,c){"use strict";c.r(t);var l=c(17),o=c(7),n=c(0),i=c(18),a=c(4),r=c(1),s=c(11),d=c(8),u=c(9),m=c(15),h=c.n(m),p=["prc-block/column"],b=function e(t){return Object(u.map)(t,(function(t){var c=Object(i.a)(t,3),l=c[0],n=c[1],a=c[2],r=void 0===a?[]:a;return Object(o.createBlock)(l,n,e(r))}))},w=function(e){var t=e.divided,c=e.setAttributes;return React.createElement(a.InspectorControls,null,React.createElement(r.PanelBody,{title:Object(n.__)("Columns Settings")},React.createElement("div",null,React.createElement(r.ToggleControl,{label:t?"Divided":"Not Divided",checked:t,onChange:function(){c({divided:!t})}}))))},v=function(e){var t=e.attributes,c=e.className,l=e.clientId,o=e.name,n=e.setAttributes,i=(t.equal,t.divided),r=Object(s.useSelect)((function(e){var t=e("core/blocks"),c=t.getBlockVariations,n=t.getBlockType,i=t.getDefaultBlockVariation;return{blockType:n(o),defaultVariation:i(o,"block"),hasInnerBlocks:e("core/block-editor").getBlocks(l).length>0,variations:c(o,"block")}}),[l,o]),m=r.blockType,v=r.defaultVariation,k=r.hasInnerBlocks,V=r.variations,g=Object(s.useDispatch)("core/block-editor").replaceInnerBlocks;return k?React.createElement(d.Fragment,null,React.createElement(w,{divided:i,setAttributes:n}),React.createElement("div",{className:h()(c,{divided:i})},React.createElement(a.InnerBlocks,{allowedBlocks:p,templateLock:"insert",renderAppender:!1}))):React.createElement(a.__experimentalBlockVariationPicker,{icon:Object(u.get)(m,["icon","src"]),label:Object(u.get)(m,["title"]),variations:V,onSelect:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v;e.attributes&&n(e.attributes),e.innerBlocks&&g(l,b(e.innerBlocks))},allowSkip:!0})},k=c(27),V=function(e){var t=e.attributes,c=e.className,l=t.equal,o=t.divided;return React.createElement(d.Fragment,null,!0===l&&React.createElement(k.a,{className:c,columns:"equal",divided:o,stackable:!0,padded:"vertically"},React.createElement(a.InnerBlocks.Content,null)),!1===l&&React.createElement(k.a,{className:c,divided:o,padded:"vertically"},React.createElement(a.InnerBlocks.Content,null)))},g=[{name:"two-columns-equal",title:Object(n.__)("1/2 | 1/2"),description:Object(n.__)("Two columns; equal split"),icon:React.createElement(r.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(r.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z"})),isDefault:!0,attributes:{equal:!0},innerBlocks:[["prc-block/column"],["prc-block/column"]],scope:["block"]},{name:"two-columns-one-third-two-thirds",title:Object(n.__)("1/3 | 2/3"),description:Object(n.__)("Two columns; one-third, two-thirds split"),icon:React.createElement(r.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(r.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z"})),innerBlocks:[["prc-block/column",{width:5}],["prc-block/column",{width:11}]],scope:["block"]},{name:"two-columns-two-thirds-one-third",title:Object(n.__)("2/3 | 1/3"),description:Object(n.__)("Two columns; two-thirds, one-third split"),icon:React.createElement(r.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(r.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z"})),innerBlocks:[["prc-block/column",{width:11}],["prc-block/column",{width:5}]],scope:["block"]},{name:"three-columns-equal",title:Object(n.__)("1/3 | 1/3 | 1/3"),description:Object(n.__)("Three columns; equal split"),icon:React.createElement(r.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(r.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"})),attributes:{equal:!0},innerBlocks:[["prc-block/column"],["prc-block/column"],["prc-block/column"]],scope:["block"]},{name:"three-columns-wider-center",title:Object(n.__)("1/4 | 1/2 | 1/4"),description:Object(n.__)("Three columns; wide center column"),icon:React.createElement(r.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(r.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM31 34H17V14h14v20zm2 0V14h6v20h-6zm-18 0H9V14h6v20z"})),innerBlocks:[["prc-block/column",{width:4}],["prc-block/column",{width:8}],["prc-block/column",{width:4}]],scope:["block"]},{name:"three-columns-two-thirds-one-third-one-third",title:Object(n.__)("2/4 - 1/4 - 1/4"),description:Object(n.__)("Three columns; 2/3 - 1/3 - 1/3"),icon:React.createElement(r.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(r.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM31 34H17V14h14v20zm2 0V14h6v20h-6zm-18 0H9V14h6v20z"})),innerBlocks:[["prc-block/column",{width:8}],["prc-block/column",{width:4}],["prc-block/column",{width:4}]],scope:["block"]},{name:"four-columns-equal",title:Object(n.__)("1/4 | 1/4 | 1/4"),description:Object(n.__)("Four columns; equal split"),icon:React.createElement(r.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(r.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"})),attributes:{equal:!0},innerBlocks:[["prc-block/column"],["prc-block/column"],["prc-block/column"],["prc-block/column"]],scope:["block"]}],R=["prc-block/columns",{title:Object(n.__)("PRC Columns"),description:Object(n.__)("Add a block that displays content in multiple columns, then add whatever content blocks you’d like."),category:"layout",icon:React.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4.1 1.5v10H10v-10h4.9zM5.5 17V8c0-.3.2-.5.5-.5h2.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2.6v-10H19c.3 0 .5.2.5.5v9z"})),keywords:[Object(n.__)("Columns"),Object(n.__)("Column")],supports:{html:!1,align:!1},variations:g,attributes:{size:{type:"string",default:""},equal:{type:"boolean",default:!1},divided:{type:"boolean",default:!1},doubling:{type:"boolean",default:!0},stackable:{type:"boolean",default:!0}},edit:v,save:V}];c(24);o.registerBlockType.apply(void 0,Object(l.a)(R))}],[[19,1,2]]]);
//# sourceMappingURL=main-55016cf8.js.map