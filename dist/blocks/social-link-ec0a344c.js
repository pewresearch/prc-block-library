/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.13
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[42],{11:function(t,e){t.exports=window.wp.blocks},2:function(t,e){t.exports=window.wp.i18n},24:function(t,e,n){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},25:function(t,e){t.exports=window.wp.primitives},3:function(t,e){t.exports=window.wp.components},4:function(t,e){t.exports=window.wp.element},5:function(t,e){t.exports=window.wp.blockEditor},703:function(t,e,n){n(24),t.exports=n(704)},704:function(t,e,n){"use strict";n.r(e);var o=n(2),c=n(4),i=n(83),r=n(91),a=n(5),l=n(3),s=(n(11),n(25),Object(i.createHigherOrderComponent)((function(t){return function(e){var n=e.name,i=e.attributes,r=e.setAttributes;if("core/social-links"!==n)return React.createElement(t,e);var s=i.title,p=i.description;return React.createElement(c.Fragment,null,React.createElement(a.InspectorControls,null,React.createElement(l.PanelBody,{title:Object(o.__)("Title and Description")},React.createElement(l.TextControl,{label:Object(o.__)("Title"),value:s,onChange:function(t){return r({title:t})}}),React.createElement(l.TextControl,{label:Object(o.__)("Description"),value:p,onChange:function(t){return r({description:t})}}))),React.createElement(t,e))}}),"withSocialLinksExtraControls"));Object(r.addFilter)("editor.BlockEdit","prc-block/social-links",s,21)},83:function(t,e){t.exports=window.wp.compose},91:function(t,e){t.exports=window.wp.hooks}},[[703,0]]]);
//# sourceMappingURL=social-link-ec0a344c.js.map