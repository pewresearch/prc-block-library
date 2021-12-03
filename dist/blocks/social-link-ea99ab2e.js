/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.9
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[30],{1:function(e,t){e.exports=window.React},14:function(e,t){e.exports=window.wp.data},19:function(e,t){e.exports=window.wp.primitives},2:function(e,t){e.exports=window.wp.i18n},3:function(e,t){e.exports=window.wp.components},300:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/social-link","category":"layout","attributes":{"description":{"type":"string"},"label":{"type":"string"},"title":{"type":"string"},"icon":{"type":"string","default":"facebook"},"url":{"type":"string"},"asButton":{"type":"boolean","default":false}},"usesContext":["prc-block/menu"],"supports":{"reusable":false,"html":false}}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},619:function(e,t,n){n(23),e.exports=n(690)},690:function(e,t,n){"use strict";n.r(t);var o=n(10),r=n(2),c=n(4),i=n(19),l=Object(c.createElement)(i.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(c.createElement)(i.Path,{d:"M9 11.8l6.1-4.5c.1.4.4.7.9.7h2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v.4l-6.4 4.8c-.2-.1-.4-.2-.6-.2H6c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h2c.2 0 .4-.1.6-.2l6.4 4.8v.4c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1h-2c-.5 0-.8.3-.9.7L9 12.2v-.4z"})),a=n(9),s=n(300),p=n(16),u=n.n(p),b=n(117),f=n(14),w=n(3),d=n(5),m=function(e){var t=e.attributes,n=e.setAttributes,o=e.className,i=e.isSelected,l=t.description,a=t.title,s=t.icon,p=Object(d.useBlockProps)({className:u()("item",o,{"is-selected":i})}),m=Object(f.useSelect)((function(e){console.log("Getting things");var t=e("core/editor").getEditedPostAttribute("meta"),n=!1;void 0!==t&&t.hasOwnProperty("bitly")&&(n=t.bitly);var o=e("core/editor").getEditedPostAttribute("title");return{postTitle:o||!1,shortUrl:n||!1}})),O=m.postTitle,v=m.shortUrl;return Object(c.useEffect)((function(){!1!==O&&!1!==v&&n({url:v,title:O})}),[O,v]),React.createElement(c.Fragment,null,React.createElement(d.InspectorControls,null,React.createElement(w.PanelBody,{title:Object(r.__)("Link settings")},React.createElement(w.TextareaControl,{value:l||"",onChange:function(e){n({description:e})},label:Object(r.__)("Description"),help:Object(r.__)("The description will be displayed in the menu if the current theme supports it.")}),React.createElement(w.TextControl,{value:a||"",onChange:function(e){n({title:e})},label:Object(r.__)("Link title"),autoComplete:"off"}),React.createElement(w.SelectControl,{label:"Select Icon",value:s,options:[{label:"(Click to select icon)",value:""},{label:"Facebook",value:"facebook"},{label:"Twitter",value:"twitter"},{label:"LinkedIn",value:"linkedin"},{label:"Print",value:"print"}],onChange:function(e){return n({icon:e})}}))),React.createElement("div",p,React.createElement(b.a,{name:s})))};function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g=s.name,h={title:Object(r.__)("Social Link"),icon:l,description:Object(r.__)("Add a link to a social network to a profile or to share the current post."),__experimentalLabel:function(e){return e.label},merge:function(e,t){var n=t.label,o=void 0===n?"":n;return v(v({},e),{},{label:e.label+o})},edit:m,save:function(){return React.createElement(c.Fragment,null)}};Object(a.registerBlockType)(g,v(v({},s),h))},9:function(e,t){e.exports=window.wp.blocks}},[[619,0,1]]]);
//# sourceMappingURL=social-link-ea99ab2e.js.map