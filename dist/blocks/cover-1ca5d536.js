/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.17
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2022 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[14],{1:function(e,t){e.exports=window.React},10:function(e,t){e.exports=window.wp.data},1099:function(e,t,o){"use strict";o.r(t);var n=o(45),i=o(8),r=o(2),c=o(78),w=o(74),l=o(4),p=o(5),s=o(3);Object(i.registerBlockStyle)("core/cover",[{name:"disable-mobile-collapse",label:"Disable Mobile Collapse"}]),Object(c.addFilter)("editor.BlockEdit","prc-block/cover",Object(w.createHigherOrderComponent)((function(e){return function(t){var o=t.name,i=t.attributes,c=t.setAttributes;if("core/cover"!==o)return React.createElement(e,t);var w=i.mobileId;return React.createElement(l.Fragment,null,React.createElement(p.InspectorControls,null,React.createElement(s.PanelBody,{title:Object(r.__)("Media (mobile) settings")},React.createElement(n.e,{attachmentId:w,label:Object(r.__)("Set Mobile Background"),onUpdate:function(e){c({mobileId:e.id,mobileUrl:e.source_url})}}))),React.createElement(e,t))}}),"withCoverMobileMediaControls"),21)},2:function(e,t){e.exports=window.wp.i18n},24:function(e,t){e.exports=window.wp.primitives},3:function(e,t){e.exports=window.wp.components},31:function(e,t){e.exports=window.wp.apiFetch},32:function(e,t){e.exports=window.wp.url},39:function(e,t){e.exports=window.wp.htmlEntities},4:function(e,t){e.exports=window.wp.element},47:function(e,t){e.exports=window.ReactDOM},49:function(e,t){e.exports=regeneratorRuntime},5:function(e,t){e.exports=window.wp.blockEditor},58:function(e,t){e.exports=window.wp.keycodes},64:function(e,t){e.exports=window.wp.mediaUtils},74:function(e,t){e.exports=window.wp.compose},78:function(e,t){e.exports=window.wp.hooks},8:function(e,t){e.exports=window.wp.blocks},944:function(e,t,o){o(20),e.exports=o(1099)}},[[944,0,1,2]]]);
//# sourceMappingURL=cover-1ca5d536.js.map