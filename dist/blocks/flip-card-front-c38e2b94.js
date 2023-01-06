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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[17],{12:function(e,t,r){var c="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(c)]},16:function(e,t){e.exports=window.wp.primitives},2:function(e,t){e.exports=window.wp.i18n},3:function(e,t){e.exports=window.wp.components},304:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/flip-card-front","title":"Flip Card Front","description":"Front of the flip card block","category":"layout","attributes":{},"parent":["prc-block/flip-card"],"supports":{"color":{"background":true,"link":true,"text":true},"html":false,"spacing":{"padding":true,"margin":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true},"__experimentalBorder":{"color":true,"width":true}},"usesContext":["prc-block/flip-card/flipped"]}')},4:function(e,t){e.exports=window.wp.element},410:function(e,t,r){"use strict";var c=r(4),o=r(16),n=Object(c.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(o.Path,{d:"M2 11.2v1.5h20v-1.5H2zM5.5 6c0-.3.2-.5.5-.5h12c.3 0 .5.2.5.5v3H20V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3h1.5V6zm2 14h2v-1.5h-2V20zm3.5 0h2v-1.5h-2V20zm7-1.5V20c1.1 0 2-.9 2-2h-1.5c0 .3-.2.5-.5.5zm.5-2H20V15h-1.5v1.5zM5.5 18H4c0 1.1.9 2 2 2v-1.5c-.3 0-.5-.2-.5-.5zm0-3H4v1.5h1.5V15zm9 5h2v-1.5h-2V20z"}));t.a=n},5:function(e,t){e.exports=window.wp.blockEditor},685:function(e,t,r){r(12),e.exports=r(804)},7:function(e,t){e.exports=window.wp.blocks},8:function(e,t,r){"use strict";function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return c}))},804:function(e,t,r){"use strict";r.r(t);var c=r(8),o=r(7),n=r(410),i=r(304),l=r(4),a=r(5),p=r(99),u=[["core/paragraph",{}]],s=function(e){var t=e.clientId,r=e.context["prc-block/flip-card/flipped"],c=Object(a.useBlockProps)({style:{display:r?"none":"block"}}),o=Object(a.useInnerBlocksProps)(c,{allowedBlocks:p.a,orientation:"vertical",templateLock:!1,template:u});return React.createElement(l.Fragment,null,React.createElement(p.b,{clientId:t}),React.createElement("div",o))},b=function(){return React.createElement(a.InnerBlocks.Content,null)};function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,c)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(c.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d=i.name,w={icon:n.a,edit:s,save:b};Object(o.registerBlockType)(d,m(m({},i),w))},9:function(e,t){e.exports=window.wp.data},99:function(e,t,r){"use strict";r.d(t,"a",(function(){return f})),r.d(t,"b",(function(){return m}));var c=r(8),o=r(2),n=r(5),i=r(4),l=r(16),a=Object(i.createElement)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(i.createElement)(l.Path,{d:"M4 6v12c0 1.1.9 2 2 2h3v-1.5H6c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h3V4H6c-1.1 0-2 .9-2 2zm7.2 16h1.5V2h-1.5v20zM15 5.5h1.5V4H15v1.5zm3.5.5H20c0-1.1-.9-2-2-2v1.5c.3 0 .5.2.5.5zm0 10.5H20v-2h-1.5v2zm0-3.5H20v-2h-1.5v2zm-.5 5.5V20c1.1 0 2-.9 2-2h-1.5c0 .3-.2.5-.5.5zM15 20h1.5v-1.5H15V20zm3.5-10.5H20v-2h-1.5v2z"})),p=r(3),u=r(9);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,c)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){Object(c.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var f=["core/paragraph","core/heading","core/list","core/image","core/quote","core/separator","core/spacer","core/table","core/verse","core/preformatted","core/pullquote","core/button","core/buttons","core/more","core/nextpage","core/file","core/media-text","core/social-links","core/social-link","core/group"];function m(e){var t=e.clientId,r=Object(u.useSelect)((function(e){var r=e("core/block-editor"),c=r.getBlockName,o=r.getBlockRootClientId,n=r.getBlockAttributes,i="prc-block/flip-card"===c(t)?t:o(t);return b(b({},n(i)),{},{controllerClientId:i})}),[t]),c=r.controllerClientId,l=r.flipped,s=Object(u.useDispatch)("core/block-editor").updateBlockAttributes,f=function(){s(c,{flipped:!l})},m=l?Object(o.__)("Flip to Front"):Object(o.__)("Flip to Back");return React.createElement(i.Fragment,null,React.createElement(n.BlockControls,null,React.createElement(p.ToolbarGroup,null,React.createElement(p.ToolbarButton,{icon:a,label:m,f:!0,onClick:function(){f()}}))),React.createElement(n.InspectorControls,null,React.createElement(p.PanelBody,{title:m},React.createElement(p.PanelRow,null,React.createElement(p.Button,{variant:"primary",onClick:function(){f()}},"Flip to ",React.createElement("strong",null,l?" Front":" Back"))))))}}},[[685,0]]]);
//# sourceMappingURL=flip-card-front-c38e2b94.js.map