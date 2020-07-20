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
(window.wpackioprcBlocksLibrarycolumnJsonp=window.wpackioprcBlocksLibrarycolumnJsonp||[]).push([[0],{0:function(t,e){t.exports=wp.element},19:function(t,e){t.exports=wp.components},28:function(t,e){t.exports=wp.blocks},29:function(t,e){t.exports=wp.data},3:function(t,e){t.exports=React},37:function(t,e,n){n(38),t.exports=n(96)},5:function(t,e){t.exports=wp.i18n},6:function(t,e){t.exports=wp.blockEditor},95:function(t,e,n){},96:function(t,e,n){"use strict";n.r(e);var c=n(36),o=n(28),r=n(5),l=n(101),a=n(6),i=n(19),u=n(0),s=n(29),p=n(30),d=n.n(p),m=function(t){var e=t.width;return React.createElement(a.InspectorControls,null,React.createElement(i.PanelBody,{title:Object(r.__)("Column Settings")},React.createElement("div",null,React.createElement(i.TextControl,{label:"Width",value:e,disabled:!0}))))},b=Object(s.withSelect)((function(t,e){var n=e.clientId;return{hasChildBlocks:0<(0,t("core/block-editor").getBlockOrder)(n).length}}))((function(t){var e=t.attributes,n=t.clientId,c=t.hasChildBlocks,o=e.width;Object(u.useEffect)((function(){var t=d()(o);document.querySelector('div[data-block="'.concat(n,'"]')).setAttribute("data-width",t)}));var r=function(){return React.createElement(a.InnerBlocks,{templateLock:!1,renderAppender:c?void 0:function(){return React.createElement(a.InnerBlocks.ButtonBlockAppender,null)}})};return React.createElement(u.Fragment,null,React.createElement(m,{width:o}),React.createElement(r,null))})),w=n(100),k=function(t){var e=t.attributes.width,n=e;return 0===e&&(n=!1),React.createElement(w.a.Column,{width:n},React.createElement(a.InnerBlocks.Content,null))},f=["prc-block/column",{title:Object(r.__)("PRC Column"),description:Object(r.__)("A single column within a columns block."),category:"layout",icon:l.a,keywords:[Object(r.__)("Column")],supports:{html:!1,align:!1},attributes:{width:{type:"integer",default:0}},parent:["prc-block/columns"],edit:b,save:k}];n(95);o.registerBlockType.apply(void 0,Object(c.a)(f))}},[[37,1,2]]]);
//# sourceMappingURL=main-f12e6170.js.map