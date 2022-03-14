/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.9
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[42],{2:function(e,t){e.exports=window.wp.i18n},24:function(e,t,n){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},74:function(e,t){e.exports=window.wp.hooks},85:function(e,t){e.exports=window.wp.compose},925:function(e,t,n){n(24),e.exports=n(926)},926:function(e,t,n){"use strict";n.r(t);var o=n(2),c=n(4),r=n(85),i=n(74),a=n(5),l=n(3),s=Object(r.createHigherOrderComponent)((function(e){return function(t){var n=t.name,r=t.attributes,i=t.setAttributes;if("core/social-links"!==n)return React.createElement(e,t);var s=r.title,p=r.description;return React.createElement(c.Fragment,null,React.createElement(a.InspectorControls,null,React.createElement(l.PanelBody,{title:Object(o.__)("Title and Description")},React.createElement(l.TextControl,{label:Object(o.__)("Title"),value:s,onChange:function(e){return i({title:e})}}),React.createElement(l.TextControl,{label:Object(o.__)("Description"),value:p,onChange:function(e){return i({description:e})}}))),React.createElement(e,t))}}),"withSocialLinksExtraControls");Object(i.addFilter)("editor.BlockEdit","prc-block/social-links",s,21)}},[[925,0]]]);
//# sourceMappingURL=social-link-7c0c67d9.js.map