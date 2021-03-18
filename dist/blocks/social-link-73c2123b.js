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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[10],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=React},119:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/social-link","category":"layout","attributes":{"description":{"type":"string"},"label":{"type":"string"},"title":{"type":"string"},"icon":{"type":"string","default":"facebook"},"url":{"type":"string"}},"usesContext":["prc-block/menu"],"supports":{"reusable":false,"html":false}}')},180:function(e,t,r){r(16),e.exports=r(239)},2:function(e,t){e.exports=wp.i18n},239:function(e,t,r){"use strict";r.r(t);var n=r(5),c=r(2),o=r(0),i=r(24),l=Object(o.createElement)(i.b,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(o.createElement)(i.a,{d:"M9 11.8l6.1-4.5c.1.4.4.7.9.7h2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v.4l-6.4 4.8c-.2-.1-.4-.2-.6-.2H6c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h2c.2 0 .4-.1.6-.2l6.4 4.8v.4c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1h-2c-.5 0-.8.3-.9.7L9 12.2v-.4z"})),a=r(6),s=r(119),u=r(9),p=r.n(u),b=r(134),f=r(8),O=r(4),d=r(3),m=function(e){var t=e.attributes,r=e.setAttributes,n=e.className,i=e.isSelected,l=t.description,a=(t.label,t.title),s=t.icon,u=(t.url,Object(d.useBlockProps)({className:p()("item",n,{"is-selected":i})})),m=Object(f.useSelect)((function(e){var t=e("core/editor").getEditedPostAttribute("meta").bitly;return{postTitle:e("core/editor").getEditedPostAttribute("title"),postId:e("core/editor").getCurrentPostId(),shortUrl:t}})),j=m.postId,y=m.postTitle,v=m.shortUrl;return Object(o.useEffect)((function(){console.log("shortUrl",v,j),r({url:v,title:y})}),[j,y]),React.createElement(o.Fragment,null,React.createElement(d.InspectorControls,null,React.createElement(O.PanelBody,{title:Object(c.__)("Link settings")},React.createElement(O.TextareaControl,{value:l||"",onChange:function(e){r({description:e})},label:Object(c.__)("Description"),help:Object(c.__)("The description will be displayed in the menu if the current theme supports it.")}),React.createElement(O.TextControl,{value:a||"",onChange:function(e){r({title:e})},label:Object(c.__)("Link title"),autoComplete:"off"}),React.createElement(O.SelectControl,{label:"Select Icon",value:s,options:[{label:"(Click to select icon)",value:""},{label:"Facebook",value:"facebook"},{label:"Twitter",value:"twitter"},{label:"LinkedIn",value:"linkedin"},{label:"Print",value:"print"}],onChange:function(e){return r({icon:e})}}))),React.createElement("div",u,React.createElement(b.a,{name:s})))};function j(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?j(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var v=s.name,g={title:Object(c.__)("Social Link"),icon:l,description:Object(c.__)("Add a link to a social network to a profile or to share the current post."),__experimentalLabel:function(e){return e.label},merge:function(e,t){var r=t.label,n=void 0===r?"":r;return y(y({},e),{},{label:e.label+n})},edit:m,save:function(){return React.createElement(d.InnerBlocks.Content,null)}};Object(a.registerBlockType)(v,y(y({},s),g))},24:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return p}));var n=r(5),c=r(27);var o=r(9),i=r.n(o),l=r(0);function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var u=function(e){return Object(l.createElement)("path",e)},p=function(e){var t=e.className,r=e.isPressed,n=s(s({},function(e,t){if(null==e)return{};var r,n,o=Object(c.a)(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}(e,["className","isPressed"])),{},{className:i()(t,{"is-pressed":r})||void 0,role:"img","aria-hidden":!0,focusable:!1});return Object(l.createElement)("svg",n)}},27:function(e,t,r){"use strict";function n(e,t){if(null==e)return{};var r,n,c={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(c[r]=e[r]);return c}r.d(t,"a",(function(){return n}))},3:function(e,t){e.exports=wp.blockEditor},4:function(e,t){e.exports=wp.components},6:function(e,t){e.exports=wp.blocks},8:function(e,t){e.exports=wp.data}},[[180,0,1]]]);
//# sourceMappingURL=social-link-73c2123b.js.map