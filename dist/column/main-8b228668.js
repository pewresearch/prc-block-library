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
(window.wpackioprcBlocksLibrarycolumnJsonp=window.wpackioprcBlocksLibrarycolumnJsonp||[]).push([[0],{1:function(t,e){t.exports=React},10:function(t,e){t.exports=wp.blockEditor},17:function(t,e){t.exports=wp.i18n},26:function(t,e){t.exports=wp.blocks},27:function(t,e){t.exports=wp.element},35:function(t,e,o){o(36),t.exports=o(94)},93:function(t,e,o){},94:function(t,e,o){"use strict";o.r(e);var c=o(34),n=o(26),r=o(17),i=o(10),l=o(27),a=o(28),u=o.n(a),s=function(t){var e=t.attributes,o=t.clientId,c=(t.setAttributes,e.width);return Object(l.useEffect)((function(){var t=u()(c);document.querySelector('div[data-block="'+o+'"]').setAttribute("data-width",t)})),React.createElement("div",{className:"prc blocks column"},React.createElement(i.InnerBlocks,{templateLock:!1}))},p=o(96),d=function(t){var e=t.attributes.width,o=e;return 0===e&&(o=!1),React.createElement(p.a.Column,{width:o},React.createElement(i.InnerBlocks.Content,null))},b=["prc-block/column",{title:Object(r.__)("Column"),description:".",category:"layout",icon:"grid",keywords:[Object(r.__)("Column")],supports:{html:!1,align:!1},attributes:{width:{type:"integer",default:0},items:{type:"boolean",default:!1},divided:{type:"boolean",default:!1}},parent:["prc-block/columns","prc-block/lede-layout"],edit:s,save:d}];o(93);n.registerBlockType.apply(void 0,Object(c.a)(b))}},[[35,1,2]]]);
//# sourceMappingURL=main-8b228668.js.map