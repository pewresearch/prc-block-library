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
(window.wpackioprcBlocksLibrarycolumnJsonp=window.wpackioprcBlocksLibrarycolumnJsonp||[]).push([[0],{0:function(e,t){e.exports=wp.element},14:function(e,t){e.exports=wp.components},28:function(e,t){e.exports=wp.blocks},29:function(e,t){e.exports=wp.data},3:function(e,t){e.exports=React},37:function(e,t,n){n(38),e.exports=n(96)},4:function(e,t){e.exports=wp.blockEditor},6:function(e,t){e.exports=wp.i18n},95:function(e,t,n){},96:function(e,t,n){"use strict";n.r(t);var c=n(36),l=n(28),o=n(6),r=n(101),i=n(4),a=n(14),s=n(0),u=n(29),d=n(30),m=n.n(d),p=function(e){var t=e.width,n=e.items,c=e.setAttributes;return React.createElement(i.InspectorControls,null,React.createElement(a.PanelBody,{title:Object(o.__)("Column Settings")},React.createElement("div",null,React.createElement(a.TextControl,{label:"Width",value:t,disabled:!0})),React.createElement("div",null,React.createElement("p",null,"Toggle divided story items:"),React.createElement(a.ToggleControl,{label:n?"Contains Story Items":"Does Not Contain Story Items",checked:n,onChange:function(){c({items:!n})}}))))},b=Object(u.withSelect)((function(e,t){var n=t.clientId;return{hasChildBlocks:(0,e("core/block-editor").getBlockOrder)(n).length>0}}))((function(e){var t=e.attributes,n=e.clientId,c=e.hasChildBlocks,l=e.setAttributes,o=t.width,r=t.items;Object(s.useEffect)((function(){var e=m()(o);document.querySelector('div[data-block="'+n+'"]').setAttribute("data-width",e)}));var a=function(){return React.createElement(i.InnerBlocks,{templateLock:!1,renderAppender:c?void 0:function(){return React.createElement(i.InnerBlocks.ButtonBlockAppender,null)}})};return React.createElement(s.Fragment,null,React.createElement(p,{width:o,items:r,setAttributes:l}),!0===r&&React.createElement("div",{className:"ui divided items"},React.createElement(a,null)),!1===r&&React.createElement(a,null))})),k=n(100),f=function(e){var t=e.attributes,n=t.width,c=t.items,l=n;return 0===n&&(l=!1),React.createElement(k.a.Column,{width:l},!0===c&&React.createElement("div",{className:"ui divided items"},React.createElement(i.InnerBlocks.Content,null)),!1===c&&React.createElement(i.InnerBlocks.Content,null))},w=["prc-block/column",{title:Object(o.__)("PRC Column"),description:Object(o.__)("A single column within a columns block."),category:"layout",icon:r.a,keywords:[Object(o.__)("Column")],supports:{html:!1,align:!1},attributes:{width:{type:"integer",default:0},items:{type:"boolean",default:!1}},parent:["prc-block/columns","prc-block/lede-layout"],edit:b,save:f}];n(95);l.registerBlockType.apply(void 0,Object(c.a)(w))}},[[37,1,2]]]);
//# sourceMappingURL=main-e2825c65.js.map