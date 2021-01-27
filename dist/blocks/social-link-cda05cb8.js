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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[5],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=wp.i18n},14:function(e,t){e.exports=React},3:function(e,t){e.exports=wp.blockEditor},32:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/social-link","category":"layout","attributes":{"description":{"type":"string"},"label":{"type":"string"},"title":{"type":"string"},"icon":{"type":"string","default":"facebook"},"url":{"type":"string"}},"usesContext":["prc-block/menu"],"styles":[{"name":"icon","label":"As Icon","isDefault":true},{"name":"button","label":"As Button"}],"supports":{"reusable":false,"html":false}}')},4:function(e,t){e.exports=wp.components},58:function(e,t,n){n(17),e.exports=n(66)},66:function(e,t,n){"use strict";n.r(t);var r=n(2),o=n(1),c=n(76),l=n(9),i=n(32),a=n(11),s=n.n(a),p=n(77),u=(n(7),n(4)),b=n(3),f=n(0),m=function(e){var t=e.attributes,n=e.setAttributes,r=e.className,c=e.isSelected,l=(e.clientId,e.context,t.description),i=(t.label,t.title),a=t.icon,m=(t.url,Object(b.useBlockProps)({className:s()("item",r,{"is-selected":c})}));return React.createElement(f.Fragment,null,React.createElement(b.InspectorControls,null,React.createElement(u.PanelBody,{title:Object(o.__)("Link settings")},React.createElement(u.TextareaControl,{value:l||"",onChange:function(e){n({description:e})},label:Object(o.__)("Description"),help:Object(o.__)("The description will be displayed in the menu if the current theme supports it.")}),React.createElement(u.TextControl,{value:i||"",onChange:function(e){n({title:e})},label:Object(o.__)("Link title"),autoComplete:"off"}),React.createElement(u.SelectControl,{label:"Select Icon",value:a,options:[{label:"(Click to select icon)",value:""},{label:"Facebook",value:"facebook"},{label:"Twitter",value:"twitter"},{label:"LinkedIn",value:"linkedin"},{label:"Print",value:"print"}],onChange:function(e){return n({icon:e})}}))),React.createElement("div",m,React.createElement(p.a,{name:a})))};function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var d=i.name,y={title:Object(o.__)("Social Link"),icon:c.a,description:Object(o.__)("Add a link to a social network to a profile or to share the current post."),__experimentalLabel:function(e){return e.label},merge:function(e,t){var n=t.label,r=void 0===n?"":n;return k(k({},e),{},{label:e.label+r})},edit:m,save:function(){return React.createElement(b.InnerBlocks.Content,null)}};Object(l.registerBlockType)(d,k(k({},i),y))},7:function(e,t){e.exports=wp.data},9:function(e,t){e.exports=wp.blocks}},[[58,0,7]]]);
//# sourceMappingURL=social-link-cda05cb8.js.map