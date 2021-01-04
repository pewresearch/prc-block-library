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
(window.wpackioprcBlocksLibrarycolumnJsonp=window.wpackioprcBlocksLibrarycolumnJsonp||[]).push([[0],[,function(e,t){e.exports=wp.element},function(e,t){e.exports=React},function(e,t){e.exports=wp.blockEditor},function(e,t){e.exports=wp.i18n},,function(e,t){e.exports=wp.components},,,,function(e,t){e.exports=wp.blocks},function(e,t){e.exports=wp.data},,,,,function(e,t,n){n(17),e.exports=n(28)},,,,,,,,,,,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(15),l=n(10),o=n(4),r=n(33),a=n(3),i=n(6),u=n(1),s=n(11),d=n(12),p=n.n(d),m=function(e){var t=e.width;return React.createElement(a.InspectorControls,null,React.createElement(i.PanelBody,{title:Object(o.__)("Column Settings")},React.createElement("div",null,React.createElement(i.TextControl,{label:"Width",value:t,disabled:!0}))))},b=Object(s.withSelect)((function(e,t){var n=t.clientId;return{hasChildBlocks:0<(0,e("core/block-editor").getBlockOrder)(n).length}}))((function(e){var t=e.attributes,n=e.clientId,c=e.hasChildBlocks,l=t.width,o=t.items;Object(u.useEffect)((function(){var e=p()(l);document.querySelector('div[data-block="'.concat(n,'"]')).setAttribute("data-width",e)}));var r=function(){return React.createElement(a.InnerBlocks,{templateLock:!1,renderAppender:c?void 0:function(){return React.createElement(a.InnerBlocks.ButtonBlockAppender,null)}})};return React.createElement(u.Fragment,null,React.createElement(m,{width:l}),!0===o&&React.createElement("div",{className:"ui divided items"},React.createElement(r,null)),!1===o&&React.createElement(r,null))})),k=n(32),w=function(e){var t=e.attributes,n=t.width,c=t.items,l=n;return 0===n&&(l=!1),React.createElement(k.a.Column,{width:l},!0===c&&React.createElement("div",{className:"ui divided items"},React.createElement(a.InnerBlocks.Content,null)),!1===c&&React.createElement(a.InnerBlocks.Content,null))},f=["prc-block/column",{title:Object(o.__)("PRC Column"),description:Object(o.__)("A single column within a columns block."),category:"layout",icon:r.a,keywords:[Object(o.__)("Column")],supports:{html:!1,align:!1},attributes:{width:{type:"integer",default:0},items:{type:"boolean",default:!1}},parent:["prc-block/columns"],edit:b,save:w}];n(27);l.registerBlockType.apply(void 0,Object(c.a)(f))}],[[16,1,2]]]);
//# sourceMappingURL=main-6c423ef4.js.map