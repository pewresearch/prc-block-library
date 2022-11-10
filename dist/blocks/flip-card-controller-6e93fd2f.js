/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.23
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[16],{109:function(e,t,r){"use strict";r.d(t,"a",(function(){return f})),r.d(t,"b",(function(){return d}));var c=r(8),o=r(2),n=r(5),a=r(4),l=r(16),i=Object(a.createElement)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(a.createElement)(l.Path,{d:"M4 6v12c0 1.1.9 2 2 2h3v-1.5H6c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h3V4H6c-1.1 0-2 .9-2 2zm7.2 16h1.5V2h-1.5v20zM15 5.5h1.5V4H15v1.5zm3.5.5H20c0-1.1-.9-2-2-2v1.5c.3 0 .5.2.5.5zm0 10.5H20v-2h-1.5v2zm0-3.5H20v-2h-1.5v2zm-.5 5.5V20c1.1 0 2-.9 2-2h-1.5c0 .3-.2.5-.5.5zM15 20h1.5v-1.5H15V20zm3.5-10.5H20v-2h-1.5v2z"})),p=r(3),u=r(9);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,c)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){Object(c.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var f=["core/paragraph","core/heading","core/list","core/image","core/quote","core/separator","core/spacer","core/table","core/verse","core/preformatted","core/pullquote","core/button","core/buttons","core/more","core/nextpage","core/file","core/media-text","core/social-links","core/social-link","core/group"];function d(e){var t=e.clientId,r=Object(u.useSelect)((function(e){var r=e("core/block-editor"),c=r.getBlockName,o=r.getBlockRootClientId,n=r.getBlockAttributes,a="prc-block/flip-card"===c(t)?t:o(t);return b(b({},n(a)),{},{controllerClientId:a})}),[t]),c=r.controllerClientId,l=r.flipped,s=Object(u.useDispatch)("core/block-editor").updateBlockAttributes,f=function(){s(c,{flipped:!l})},d=l?Object(o.__)("Flip to Front"):Object(o.__)("Flip to Back");return React.createElement(a.Fragment,null,React.createElement(n.BlockControls,null,React.createElement(p.ToolbarGroup,null,React.createElement(p.ToolbarButton,{icon:i,label:d,f:!0,onClick:function(){f()}}))),React.createElement(n.InspectorControls,null,React.createElement(p.PanelBody,{title:d},React.createElement(p.PanelRow,null,React.createElement(p.Button,{variant:"primary",onClick:function(){f()}},"Flip to ",React.createElement("strong",null,l?" Front":" Back"))))))}},12:function(e,t,r){var c="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(c)]},16:function(e,t){e.exports=window.wp.primitives},2:function(e,t){e.exports=window.wp.i18n},3:function(e,t){e.exports=window.wp.components},350:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/flip-card","title":"Flip Card","description":"A card that can be flipped","category":"layout","attributes":{"flipped":{"type":"boolean","default":false}},"supports":{"align":["left","right"],"color":{"link":true,"text":true},"html":false,"spacing":{"margin":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true}},"providesContext":{"prc-block/flip-card/flipped":"flipped"}}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},537:function(e,t,r){"use strict";var c=r(4),o=r(16),n=Object(c.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(o.Path,{d:"M2 11.2v1.5h20v-1.5H2zM5.5 6c0-.3.2-.5.5-.5h12c.3 0 .5.2.5.5v3H20V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3h1.5V6zm2 14h2v-1.5h-2V20zm3.5 0h2v-1.5h-2V20zm7-1.5V20c1.1 0 2-.9 2-2h-1.5c0 .3-.2.5-.5.5zm.5-2H20V15h-1.5v1.5zM5.5 18H4c0 1.1.9 2 2 2v-1.5c-.3 0-.5-.2-.5-.5zm0-3H4v1.5h1.5V15zm9 5h2v-1.5h-2V20z"}));t.a=n},7:function(e,t){e.exports=window.wp.blocks},8:function(e,t,r){"use strict";function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return c}))},9:function(e,t){e.exports=window.wp.data},907:function(e,t,r){r(12),e.exports=r(998)},998:function(e,t,r){"use strict";r.r(t);var c=r(8),o=r(7),n=r(537),a=r(350),l=r(2),i=r(4),p=r(5),u=r(109),s=["prc-block/flip-card-front","prc-block/flip-card-back"],b=[["prc-block/flip-card-front",{},[["core/paragraph",{placeholder:Object(l.__)("Front of the card...","prc-block-library")}]]],["prc-block/flip-card-back",{},[["core/paragraph",{placeholder:Object(l.__)("Back of the card...","prc-block-library")}]]]],f=function(e){var t=e.clientId,r=Object(p.useBlockProps)(),c=Object(p.useInnerBlocksProps)(r,{allowedBlocks:s,orientation:"vertical",templateLock:"insert",template:b,__experimentalCaptureToolbars:!0,renderAppender:!1});return React.createElement(i.Fragment,null,React.createElement(u.b,{clientId:t}),React.createElement("div",c))},d=function(){return React.createElement(p.InnerBlocks.Content,null)};function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,c)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){Object(c.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var h=a.name,v={icon:n.a,edit:f,save:d};Object(o.registerBlockType)(h,w(w({},a),v))}},[[907,0]]]);
//# sourceMappingURL=flip-card-controller-6e93fd2f.js.map