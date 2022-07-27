/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.17
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[31],{1:function(t,e){t.exports=window.React},10:function(t,e){t.exports=window.wp.data},1046:function(t,e,r){"use strict";r.r(e);var n=r(9),o=r(2),c=r(8),i=r(4),a=r(24),u=Object(i.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(i.createElement)(a.Path,{d:"M3.445 16.505a.75.75 0 001.06.05l5.005-4.55 4.024 3.521 4.716-4.715V14h1.5V8.25H14v1.5h3.19l-3.724 3.723L9.49 9.995l-5.995 5.45a.75.75 0 00-.05 1.06z"})),l=r(403),s=r(5),p=r(10),b=r(21),f=r(45),d=r(137);function w(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function m(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?w(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var g=function(t){var e=t.setAttributes,r=t.blockProps,n=Object(i.useState)(!1),c=Object(b.a)(n,2),a=c[0],u=c[1];return React.createElement(f.c,{onChange:function(t){var r;0<t.length&&void 0!==t[0].id&&(u(!0),r=t[0].id,Object(d.b)({postId:r,setAttributes:e,isRefresh:!1}))},onSkip:function(){e({postId:0})},label:Object(o.__)("Search for a popular post","prc-block-library"),blockProps:m(m({},r),{},{style:{marginBottom:"16px"}}),loadingComponent:a})},O=function(t){var e=t.attributes,r=t.setAttributes,n=t.isSelected,o=t.clientId,c=e.title,a=e.postId,u=Object(s.useBlockProps)(),l=Object(p.useSelect)((function(t){var e,r=t("core/block-editor").getBlockRootClientId(o);return null==r||"string"==typeof r&&0===r.length?{blockIndex:null,numberEnabled:!1}:("core/group"===t("core/block-editor").getBlock(r).name&&(e=t("core/block-editor").getBlockIndex(o,r)),{blockIndex:e,numberEnabled:!0})}),[o]),b=l.blockIndex,f=l.numberEnabled;return Object(i.useEffect)((function(){r({blockIndexAttr:b}),r(!0===f?{enableNumber:!0}:{enableNumber:!1})}),[b]),void 0===a?React.createElement(g,{setAttributes:r,blockProps:u}):React.createElement("div",u,f&&0<=b&&React.createElement("span",{className:"big-number"},b+1),!0!==n&&React.createElement(s.RichText.Content,{className:"title",tagName:"h2",value:c}),!0===n&&React.createElement(s.RichText,{tagName:"h2",value:c,allowedFormats:["core/bold","core/italic"],onChange:function(t){return r({title:t})},placeholder:"Joe Biden does something about climate change...",keepPlaceholderOnFocus:!0,className:"title",multiline:!1}))},y=function(){return React.createElement(i.Fragment,null)};function h(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function v(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?h(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var j=l.name,x={icon:u,edit:O,save:y};Object(c.registerBlockType)(j,v(v({},l),x))},137:function(t,e,r){"use strict";r.d(e,"a",(function(){return i})),r.d(e,"b",(function(){return a}));var n=r(162),o=r(31),c=r.n(o),i=function(t,e,r){0!==e&&!1!==r&&c()({path:"/prc-api/v2/get-art/?postId=".concat(e)}).then((function(e){!1!==e&&void 0!==e[t]&&!1!==r&&r({image:e[t].rawUrl,isChartArt:e[t].chartArt})}))},a=function(t){var e=t.setAttributes,r=t.postId,o=void 0!==r&&r,i=t.imageSize,a=void 0===i?"A1":i,u=t.isRefresh,l=void 0!==u&&u;!1!==o&&void 0!==e&&c()({path:"/wp/v2/stub/".concat(o),method:"GET"}).then((function(t){if(console.log("setPostAttributes -> by id:",o,t),!1!==t){var r=function t(e){var r=e.post,o=e.imageSize,c=e.isRefresh,i=void 0!==c&&c;console.log(t,r);var a=new Date(r.date),u=n(a).format("MMM D, YYYY"),l={title:r.title.hasOwnProperty("rendered")?r.title.rendered:r.title,excerpt:r.excerpt.hasOwnProperty("rendered")?r.excerpt.rendered:r.excerpt,url:r.link,label:r.hasOwnProperty("label")?r.label:"Report",date:u,postId:r.id};if(!0!==i&&(l.extra=""),r.art){var s=r.art;l.image=s[o].rawUrl,l.isChartArt=s[o].chartArt}return console.log("getAttributesFromPost",r,l),l}({post:t,imageSize:a,isRefresh:l});e(r)}})).catch((function(t){return console.error(t)}))}},162:function(t,e){t.exports=moment},19:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},2:function(t,e){t.exports=window.wp.i18n},21:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(28);var o=r(26),c=r(29);function i(t,e){return Object(n.a)(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,c=[],i=!0,a=!1;try{for(r=r.call(t);!(i=(n=r.next()).done)&&(c.push(n.value),!e||c.length!==e);i=!0);}catch(t){a=!0,o=t}finally{try{i||null==r.return||r.return()}finally{if(a)throw o}}return c}}(t,e)||Object(o.a)(t,e)||Object(c.a)()}},24:function(t,e){t.exports=window.wp.primitives},26:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(19);function o(t,e){if(t){if("string"==typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},28:function(t,e,r){"use strict";function n(t){if(Array.isArray(t))return t}r.d(e,"a",(function(){return n}))},29:function(t,e,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(e,"a",(function(){return n}))},3:function(t,e){t.exports=window.wp.components},31:function(t,e){t.exports=window.wp.apiFetch},33:function(t,e){t.exports=window.wp.url},39:function(t,e){t.exports=window.wp.htmlEntities},4:function(t,e){t.exports=window.wp.element},403:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/popular-listing","description":"A popular post, must be placed in a group block for numbers to appear.","title":"Popular Listing","category":"content-curation","attributes":{"title":{"type":"string"},"url":{"type":"string"},"postId":{"type":"integer"},"blockIndexAttr":{"type":"integer"},"enableNumber":{"type":"boolean"}},"supports":{"html":false}}')},47:function(t,e){t.exports=window.ReactDOM},49:function(t,e){t.exports=regeneratorRuntime},5:function(t,e){t.exports=window.wp.blockEditor},58:function(t,e){t.exports=window.wp.keycodes},64:function(t,e){t.exports=window.wp.mediaUtils},8:function(t,e){t.exports=window.wp.blocks},9:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},963:function(t,e,r){r(22),t.exports=r(1046)}},[[963,0,1,2]]]);
//# sourceMappingURL=popular-listing-2d4e9883.js.map