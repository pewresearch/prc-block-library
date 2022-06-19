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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[46],{2:function(e,t){e.exports=window.wp.i18n},23:function(e,t,n){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},25:function(e,t){e.exports=window.wp.primitives},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},87:function(e,t){e.exports=window.wp.compose},9:function(e,t){e.exports=window.wp.blocks},95:function(e,t){e.exports=window.wp.hooks},965:function(e,t,n){n(23),e.exports=n(966)},966:function(e,t,n){"use strict";n.r(t);var o=n(2),c=n(4),r=n(87),i=n(95),a=n(5),l=n(3);n(9),n(25);function s(e,t){var n=e.name,r=e.attributes,i=e.setAttributes;if("core/social-links"!==n)return React.createElement(t,e);var s=r.title,p=r.description;return React.createElement(c.Fragment,null,React.createElement(a.InspectorControls,null,React.createElement(l.PanelBody,{title:Object(o.__)("Title and Description")},React.createElement(l.TextControl,{label:Object(o.__)("Title"),value:s,onChange:function(e){return i({title:e})}}),React.createElement(l.TextControl,{label:Object(o.__)("Description"),value:p,onChange:function(e){return i({description:e})}}))),React.createElement(t,e))}var p=Object(r.createHigherOrderComponent)((function(e){return React.createElement(s,e)}),"withSocialLinksExtraControls");Object(i.addFilter)("editor.BlockEdit","prc-block/social-links",p,21)}},[[965,0]]]);
//# sourceMappingURL=social-link-6251e488.js.map