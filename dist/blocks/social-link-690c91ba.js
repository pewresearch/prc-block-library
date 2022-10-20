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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[55],{2:function(e,t){e.exports=window.wp.i18n},21:function(e,t,n){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},73:function(e,t){e.exports=window.wp.compose},755:function(e,t,n){n(21),e.exports=n(756)},756:function(e,t,n){"use strict";n.r(t);var o=n(2),r=n(4),c=n(73),i=n(76),l=n(5),a=n(3),s=Object(c.createHigherOrderComponent)((function(e){return function(t){var n=t.name,c=t.attributes,i=t.setAttributes;if("core/social-links"!==n)return React.createElement(e,t);var s=c.title,p=c.description,u=c.url;return React.createElement(r.Fragment,null,React.createElement(l.InspectorControls,null,React.createElement(a.PanelBody,{title:Object(o.__)("Social Meta Info")},React.createElement(a.TextControl,{label:Object(o.__)("Title"),value:s,onChange:function(e){return i({title:e})}}),React.createElement(a.TextControl,{label:Object(o.__)("Description"),value:p,onChange:function(e){return i({description:e})}}),React.createElement(a.TextControl,{label:Object(o.__)("URL"),help:Object(o.__)("Setting a url here will override any selections on the individual social links."),value:u,onChange:function(e){return i({url:e})}}))),React.createElement(e,t))}}),"withSocialLinksExtraControls");Object(i.addFilter)("editor.BlockEdit","prc-block/social-links",s,21)},76:function(e,t){e.exports=window.wp.hooks}},[[755,0]]]);
//# sourceMappingURL=social-link-690c91ba.js.map