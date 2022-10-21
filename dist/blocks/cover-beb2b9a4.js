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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[14],{1:function(e,t){e.exports=window.React},10:function(e,t){e.exports=window.wp.data},2:function(e,t){e.exports=window.wp.i18n},26:function(e,t){e.exports=window.wp.primitives},3:function(e,t){e.exports=window.wp.components},30:function(e,t){e.exports=window.wp.apiFetch},32:function(e,t){e.exports=window.wp.url},39:function(e,t){e.exports=window.wp.htmlEntities},4:function(e,t){e.exports=window.wp.element},46:function(e,t){e.exports=window.ReactDOM},5:function(e,t){e.exports=window.wp.blockEditor},53:function(e,t){e.exports=regeneratorRuntime},58:function(e,t){e.exports=window.wp.keycodes},63:function(e,t){e.exports=window.wp.mediaUtils},712:function(e,t,o){o(21),e.exports=o(872)},73:function(e,t){e.exports=window.wp.compose},76:function(e,t){e.exports=window.wp.hooks},8:function(e,t){e.exports=window.wp.blocks},872:function(e,t,o){"use strict";o.r(t);var n=o(48),i=o(8),r=o(2),c=o(76),w=o(73),l=o(4),p=o(5),s=o(3);Object(i.registerBlockStyle)("core/cover",[{name:"disable-mobile-collapse",label:"Disable Mobile Collapse"}]),Object(c.addFilter)("editor.BlockEdit","prc-block/cover",Object(w.createHigherOrderComponent)((function(e){return function(t){var o=t.name,i=t.attributes,c=t.setAttributes;if("core/cover"!==o)return React.createElement(e,t);var w=i.mobileId;return React.createElement(l.Fragment,null,React.createElement(p.InspectorControls,null,React.createElement(s.PanelBody,{title:Object(r.__)("Media (mobile) settings")},React.createElement(n.e,{attachmentId:w,label:Object(r.__)("Set Mobile Background"),onUpdate:function(e){c({mobileId:e.id,mobileUrl:e.source_url})}}))),React.createElement(e,t))}}),"withCoverMobileMediaControls"),21)}},[[712,0,1,2]]]);
//# sourceMappingURL=cover-beb2b9a4.js.map