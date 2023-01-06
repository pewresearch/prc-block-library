/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.27
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2023 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[67],{12:function(e,t,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},2:function(e,t){e.exports=window.wp.i18n},33:function(e,t){e.exports=window.wp.url},339:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/tabs-menu-item","title":"Menu Item","category":"layout","attributes":{"slug":{"type":"string"},"title":{"type":"string"},"uuid":{"type":"string","default":null}},"supports":{"html":false,"align":false,"color":{"background":true,"text":true},"typography":{"fontSize":true,"fontAppearance":true,"lineHeight":true,"__experimentalFontFamily":true},"spacing":{"padding":true},"__experimentalBorder":{"color":true,"width":true}},"usesContext":["prc-block/tabs/active"],"parent":["prc-block/tabs-menu"]}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},732:function(e,t,n){n(12),e.exports=n(811)},8:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},811:function(e,t,n){"use strict";n.r(t);var r=n(8),o=n(7),c=n(2),i=n(339),l=n(4),a=n(5),u=n(9),s=n(33);var p=function(e){var t=e.attributes,n=e.setAttributes,r=e.clientId,i=e.isSelected,p=e.context,b=t.title,d=t.uuid,f=p["prc-block/tabs/active"],w=Object(u.useDispatch)("core/block-editor"),k=w.insertBlock,g=w.updateBlockAttributes,m=w.updateBlock,O=w.moveBlockToPosition,v=Object(u.useSelect)((function(e){if(void 0!==r){var t=e("core/block-editor"),n=t.getBlock,o=t.getBlockRootClientId,c=t.getAdjacentBlockClientId,i=t.getBlockIndex,l=o(r),a=o(l),u=c(l),s=n(u),p=!1;if(s.hasOwnProperty("innerBlocks")&&1<=s.innerBlocks.length&&null!==d)p=s.innerBlocks.filter((function(e){return e.attributes.uuid===d}))[0].clientId;var b,f,w,k,g=i(r,l),m=i(p,u);return b=p,k=u,(f=g)!==(w=m)&&-1!==w&&(console.log("movePane",b,f,w,k),O(b,k,k,f)),{controllerClientId:a,panesClientId:u,currentPositionIndex:g,panePositionIndex:m,matchingPaneClientId:p}}}),[r]),y=v.controllerClientId,j=v.panesClientId,h=v.currentPositionIndex,x=v.matchingPaneClientId;Object(l.useEffect)((function(){!function(){if(null===d){console.log("onBlockInit",d,h);var e=r;n({uuid:e});var t=Object(o.createBlock)("prc-block/tabs-pane",{uuid:e});k(t,h,j,!1)}}()}),[j,h]),Object(l.useEffect)((function(){null!==d&&void 0!==y&&g(y,{active:d}),x&&m(x,{})}),[r,i]);var B=Object(a.useBlockProps)({"aria-selected":d===f});return React.createElement("div",B,i&&React.createElement(a.RichText,{tagName:"div",value:b,allowedFormats:[],onChange:function(e){return n({title:e,slug:Object(s.cleanForSlug)(e)})},placeholder:Object(c.__)("Tab Title","prc-block-library")}),!i&&React.createElement("div",null,b||"Tab Title"))},b=function(){return React.createElement(l.Fragment,null)};function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var w=i.name,k={__experimentalLabel:function(e){return e.title||"Menu Item"},edit:p,save:b};Object(o.registerBlockType)(w,f(f({},i),k))},9:function(e,t){e.exports=window.wp.data}},[[732,0]]]);
//# sourceMappingURL=tabs-menu-item-45e8de15.js.map