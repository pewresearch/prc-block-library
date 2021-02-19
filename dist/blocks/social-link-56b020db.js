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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[8],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=wp.i18n},2:function(e,t){e.exports=wp.components},20:function(e,t){e.exports=React},3:function(e,t){e.exports=wp.blockEditor},35:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/social-link","category":"layout","attributes":{"description":{"type":"string"},"label":{"type":"string"},"title":{"type":"string"},"icon":{"type":"string","default":"facebook"},"url":{"type":"string"}},"usesContext":["prc-block/menu"],"supports":{"reusable":false,"html":false}}')},6:function(e,t){e.exports=wp.data},7:function(e,t){e.exports=wp.blocks},71:function(e,t,n){n(16),e.exports=n(82)},82:function(e,t,n){"use strict";n.r(t);var r=n(4),o=n(1),c=n(92),l=n(7),i=n(35),a=n(10),s=n.n(a),p=n(93),u=n(6),b=n(2),f=n(3),d=n(0),m=function(e){var t=e.attributes,n=e.setAttributes,r=e.className,c=e.isSelected,l=t.description,i=(t.label,t.title),a=t.icon,m=(t.url,Object(f.useBlockProps)({className:s()("item",r,{"is-selected":c})})),O=Object(u.useSelect)((function(e){var t=e("core/editor").getEditedPostAttribute("meta").bitly;return{postTitle:e("core/editor").getEditedPostAttribute("title"),postId:e("core/editor").getCurrentPostId(),shortUrl:t}})),k=O.postId,g=O.postTitle,y=O.shortUrl;return Object(d.useEffect)((function(){console.log("shortUrl",y,k),n({url:y,title:g})}),[k,g]),React.createElement(d.Fragment,null,React.createElement(f.InspectorControls,null,React.createElement(b.PanelBody,{title:Object(o.__)("Link settings")},React.createElement(b.TextareaControl,{value:l||"",onChange:function(e){n({description:e})},label:Object(o.__)("Description"),help:Object(o.__)("The description will be displayed in the menu if the current theme supports it.")}),React.createElement(b.TextControl,{value:i||"",onChange:function(e){n({title:e})},label:Object(o.__)("Link title"),autoComplete:"off"}),React.createElement(b.SelectControl,{label:"Select Icon",value:a,options:[{label:"(Click to select icon)",value:""},{label:"Facebook",value:"facebook"},{label:"Twitter",value:"twitter"},{label:"LinkedIn",value:"linkedin"},{label:"Print",value:"print"}],onChange:function(e){return n({icon:e})}}))),React.createElement("div",m,React.createElement(p.a,{name:a})))};function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g=i.name,y={title:Object(o.__)("Social Link"),icon:c.a,description:Object(o.__)("Add a link to a social network to a profile or to share the current post."),__experimentalLabel:function(e){return e.label},merge:function(e,t){var n=t.label,r=void 0===n?"":n;return k(k({},e),{},{label:e.label+r})},edit:m,save:function(){return React.createElement(f.InnerBlocks.Content,null)}};Object(l.registerBlockType)(g,k(k({},i),y))}},[[71,0,10]]]);
//# sourceMappingURL=social-link-56b020db.js.map