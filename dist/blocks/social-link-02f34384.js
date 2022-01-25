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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[34],{0:function(e,t){e.exports=window.React},10:function(e,t){e.exports=window.wp.blocks},12:function(e,t){e.exports=window.wp.data},2:function(e,t){e.exports=window.wp.element},23:function(e,t){e.exports=window.wp.primitives},3:function(e,t){e.exports=window.wp.i18n},330:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/social-link","category":"layout","attributes":{"description":{"type":"string"},"label":{"type":"string"},"title":{"type":"string"},"icon":{"type":"string","default":"facebook"},"url":{"type":"string"},"asButton":{"type":"boolean","default":false}},"usesContext":["prc-block/menu"],"supports":{"reusable":false,"html":false}}')},4:function(e,t){e.exports=window.wp.components},413:function(e,t,n){"use strict";var o=n(2),r=n(23),c=Object(o.createElement)(r.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(o.createElement)(r.Path,{d:"M9 11.8l6.1-4.5c.1.4.4.7.9.7h2c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v.4l-6.4 4.8c-.2-.1-.4-.2-.6-.2H6c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h2c.2 0 .4-.1.6-.2l6.4 4.8v.4c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1h-2c-.5 0-.8.3-.9.7L9 12.2v-.4z"}));t.a=c},6:function(e,t){e.exports=window.wp.blockEditor},879:function(e,t,n){n(24),e.exports=n(953)},953:function(e,t,n){"use strict";n.r(t);var o=n(14),r=n(3),c=n(413),i=n(10),l=n(330),a=n(17),s=n.n(a),p=n(83),u=n(12),b=n(4),f=n(6),w=n(2),d=function(e){var t=e.attributes,n=e.setAttributes,o=e.className,c=e.isSelected,i=t.description,l=t.title,a=t.icon,d=Object(f.useBlockProps)({className:s()("item",o,{"is-selected":c})}),m=Object(u.useSelect)((function(e){console.log("Getting things");var t=e("core/editor").getEditedPostAttribute("meta"),n=!1;void 0!==t&&t.hasOwnProperty("bitly")&&(n=t.bitly);var o=e("core/editor").getEditedPostAttribute("title");return{postTitle:o||!1,shortUrl:n||!1}})),O=m.postTitle,v=m.shortUrl;return Object(w.useEffect)((function(){!1!==O&&!1!==v&&n({url:v,title:O})}),[O,v]),React.createElement(w.Fragment,null,React.createElement(f.InspectorControls,null,React.createElement(b.PanelBody,{title:Object(r.__)("Link settings")},React.createElement(b.TextareaControl,{value:i||"",onChange:function(e){n({description:e})},label:Object(r.__)("Description"),help:Object(r.__)("The description will be displayed in the menu if the current theme supports it.")}),React.createElement(b.TextControl,{value:l||"",onChange:function(e){n({title:e})},label:Object(r.__)("Link title"),autoComplete:"off"}),React.createElement(b.SelectControl,{label:"Select Icon",value:a,options:[{label:"(Click to select icon)",value:""},{label:"Facebook",value:"facebook"},{label:"Twitter",value:"twitter"},{label:"LinkedIn",value:"linkedin"},{label:"Print",value:"print"}],onChange:function(e){return n({icon:e})}}))),React.createElement("div",d,React.createElement(p.a,{name:a})))};function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var v=l.name,g={title:Object(r.__)("Social Link"),icon:c.a,description:Object(r.__)("Add a link to a social network to a profile or to share the current post."),__experimentalLabel:function(e){return e.label},merge:function(e,t){var n=t.label,o=void 0===n?"":n;return O(O({},e),{},{label:e.label+o})},edit:d,save:function(){return React.createElement(w.Fragment,null)}};Object(i.registerBlockType)(v,O(O({},l),g))}},[[879,0,1]]]);
//# sourceMappingURL=social-link-02f34384.js.map