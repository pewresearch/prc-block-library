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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[13],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=wp.i18n},135:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/social-link","category":"layout","attributes":{"description":{"type":"string"},"label":{"type":"string"},"title":{"type":"string"},"icon":{"type":"string","default":"facebook"},"url":{"type":"string"}},"usesContext":["prc-block/menu"],"supports":{"reusable":false,"html":false}}')},2:function(e,t){e.exports=wp.components},219:function(e,t,r){r(15),e.exports=r(277)},277:function(e,t,r){"use strict";r.r(t);var n=r(7),o=r(1),c=r(0),l=r(95),i=Object(c.createElement)(l.b,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(c.createElement)(l.a,{d:"M9 11.8l6.1-4.5c.1.4.4.7.9.7h2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v.4l-6.4 4.8c-.2-.1-.4-.2-.6-.2H6c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h2c.2 0 .4-.1.6-.2l6.4 4.8v.4c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1h-2c-.5 0-.8.3-.9.7L9 12.2v-.4z"})),a=r(5),s=r(135),u=r(8),p=r.n(u),b=r(154),f=r(6),O=r(2),d=r(3),m=function(e){var t=e.attributes,r=e.setAttributes,n=e.className,l=e.isSelected,i=t.description,a=(t.label,t.title),s=t.icon,u=(t.url,Object(d.useBlockProps)({className:p()("item",n,{"is-selected":l})})),m=Object(f.useSelect)((function(e){var t=e("core/editor").getEditedPostAttribute("meta").bitly;return{postTitle:e("core/editor").getEditedPostAttribute("title"),postId:e("core/editor").getCurrentPostId(),shortUrl:t}})),y=m.postId,j=m.postTitle,g=m.shortUrl;return Object(c.useEffect)((function(){console.log("shortUrl",g,y),r({url:g,title:j})}),[y,j]),React.createElement(c.Fragment,null,React.createElement(d.InspectorControls,null,React.createElement(O.PanelBody,{title:Object(o.__)("Link settings")},React.createElement(O.TextareaControl,{value:i||"",onChange:function(e){r({description:e})},label:Object(o.__)("Description"),help:Object(o.__)("The description will be displayed in the menu if the current theme supports it.")}),React.createElement(O.TextControl,{value:a||"",onChange:function(e){r({title:e})},label:Object(o.__)("Link title"),autoComplete:"off"}),React.createElement(O.SelectControl,{label:"Select Icon",value:s,options:[{label:"(Click to select icon)",value:""},{label:"Facebook",value:"facebook"},{label:"Twitter",value:"twitter"},{label:"LinkedIn",value:"linkedin"},{label:"Print",value:"print"}],onChange:function(e){return r({icon:e})}}))),React.createElement("div",u,React.createElement(b.a,{name:s})))};function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=s.name,v={title:Object(o.__)("Social Link"),icon:i,description:Object(o.__)("Add a link to a social network to a profile or to share the current post."),__experimentalLabel:function(e){return e.label},merge:function(e,t){var r=t.label,n=void 0===r?"":r;return j(j({},e),{},{label:e.label+n})},edit:m,save:function(){return React.createElement(d.InnerBlocks.Content,null)}};Object(a.registerBlockType)(g,j(j({},s),v))},3:function(e,t){e.exports=wp.blockEditor},4:function(e,t){e.exports=React},5:function(e,t){e.exports=wp.blocks},6:function(e,t){e.exports=wp.data},95:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return p}));var c=r(8),l=r.n(c),i=r(0);function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var u=function(e){return Object(i.createElement)("path",e)},p=function(e){var t=e.className,r=e.isPressed,n=s(s({},o(e,["className","isPressed"])),{},{className:l()(t,{"is-pressed":r})||void 0,role:"img","aria-hidden":!0,focusable:!1});return Object(i.createElement)("svg",n)}}},[[219,0,1]]]);
//# sourceMappingURL=social-link-07e94606.js.map