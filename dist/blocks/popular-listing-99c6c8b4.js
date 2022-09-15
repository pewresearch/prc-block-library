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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[31],{1:function(e,t){e.exports=window.React},1007:function(e,t,r){"use strict";r.r(t);var n=r(10),o=r(2),i=r(8),c=r(4),a=r(23),s=Object(c.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(a.Path,{d:"M3.445 16.505a.75.75 0 001.06.05l5.005-4.55 4.024 3.521 4.716-4.715V14h1.5V8.25H14v1.5h3.19l-3.724 3.723L9.49 9.995l-5.995 5.45a.75.75 0 00-.05 1.06z"})),l=r(389),u=r(5),p=r(9),b=r(22),f=r(45),d=r(98);function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var h=function(e){var t=e.setAttributes,r=e.blockProps,n=Object(c.useState)(!1),i=Object(b.a)(n,2),a=i[0],s=i[1];return React.createElement(f.c,{onChange:function(e){var r;0<e.length&&void 0!==e[0].id&&(s(!0),r=e[0].id,Object(d.b)({postId:r,setAttributes:t,isRefresh:!1}))},onSkip:function(){t({postId:0})},label:Object(o.__)("Search for a popular post","prc-block-library"),blockProps:m(m({},r),{},{style:{marginBottom:"16px"}}),loadingComponent:a})},g=function(e){var t=e.attributes,r=e.setAttributes,n=e.isSelected,o=e.clientId,i=t.title,a=t.postId,s=Object(u.useBlockProps)(),l=Object(p.useSelect)((function(e){var t,r=e("core/block-editor").getBlockRootClientId(o);return null==r||"string"==typeof r&&0===r.length?{blockIndex:null,numberEnabled:!1}:("core/group"===e("core/block-editor").getBlock(r).name&&(t=e("core/block-editor").getBlockIndex(o,r)),{blockIndex:t,numberEnabled:!0})}),[o]),b=l.blockIndex,f=l.numberEnabled;return Object(c.useEffect)((function(){r({blockIndexAttr:b}),r(!0===f?{enableNumber:!0}:{enableNumber:!1})}),[b]),void 0===a?React.createElement(h,{setAttributes:r,blockProps:s}):React.createElement("div",s,f&&0<=b&&React.createElement("span",{className:"big-number"},b+1),!0!==n&&React.createElement(u.RichText.Content,{className:"title",tagName:"h2",value:i}),!0===n&&React.createElement(u.RichText,{tagName:"h2",value:i,allowedFormats:["core/bold","core/italic"],onChange:function(e){return r({title:e})},placeholder:"Joe Biden does something about climate change...",keepPlaceholderOnFocus:!0,className:"title",multiline:!1}))},y=function(){return React.createElement(c.Fragment,null)};function O(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?O(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var j=l.name,x={icon:s,edit:g,save:y};Object(i.registerBlockType)(j,v(v({},l),x))},148:function(e,t){e.exports=moment},15:function(e,t){(function(t){e.exports=t}).call(this,{})},18:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,"a",(function(){return n}))},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(29);var o=r(24),i=r(30);function c(e,t){return Object(n.a)(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i=[],c=!0,a=!1;try{for(r=r.call(e);!(c=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);c=!0);}catch(e){a=!0,o=e}finally{try{c||null==r.return||r.return()}finally{if(a)throw o}}return i}}(e,t)||Object(o.a)(e,t)||Object(i.a)()}},23:function(e,t){e.exports=window.wp.primitives},24:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(18);function o(e,t){if(e){if("string"==typeof e)return Object(n.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(e,t):void 0}}},28:function(e,t){e.exports=window.wp.apiFetch},29:function(e,t,r){"use strict";function n(e){if(Array.isArray(e))return e}r.d(t,"a",(function(){return n}))},3:function(e,t){e.exports=window.wp.components},30:function(e,t,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(t,"a",(function(){return n}))},32:function(e,t){e.exports=window.wp.url},389:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/popular-listing","description":"A popular post, must be placed in a group block for numbers to appear.","title":"Popular Listing","category":"content-curation","attributes":{"title":{"type":"string"},"url":{"type":"string"},"postId":{"type":"integer"},"blockIndexAttr":{"type":"integer"},"enableNumber":{"type":"boolean"}},"supports":{"html":false}}')},4:function(e,t){e.exports=window.wp.element},40:function(e,t){e.exports=window.wp.htmlEntities},49:function(e,t){e.exports=regeneratorRuntime},5:function(e,t){e.exports=window.wp.blockEditor},56:function(e,t){e.exports=window.wp.keycodes},57:function(e,t){e.exports=window.ReactDOM},59:function(e,t){e.exports=window.wp.mediaUtils},8:function(e,t){e.exports=window.wp.blocks},89:function(e,t,r){var n,o=r(12);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(this&&this[r]||r);else if(Array.isArray(r))e.push(c.apply(this,r));else if("object"===n)if(r.toString===Object.prototype.toString)for(var a in r)i.call(r,a)&&r[a]&&e.push(this&&this[a]||a);else e.push(r.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===o(r(15))&&r(15)?void 0===(n=function(){return c}.apply(t,[]))||(e.exports=n):window.classNames=c}()},9:function(e,t){e.exports=window.wp.data},950:function(e,t,r){r(19),e.exports=r(1007)},98:function(e,t,r){"use strict";r.d(t,"a",(function(){return l})),r.d(t,"b",(function(){return p})),r.d(t,"c",(function(){return b}));var n=r(89),o=r.n(n),i=r(148),c=r(28),a=r.n(c),s=r(5),l=function(e,t,r){0!==t&&!1!==r&&a()({path:"/prc-api/v2/get-art/?postId=".concat(t)}).then((function(t){!1!==t&&void 0!==t[e]&&!1!==r&&r({image:t[e].rawUrl,isChartArt:t[e].chartArt})}))},u=function e(t){var r=t.post,n=t.imageSize,o=t.isRefresh,c=void 0!==o&&o;console.log(e,r);var a=new Date(r.date),s=i(a).format("MMM D, YYYY"),l={title:r.title.hasOwnProperty("rendered")?r.title.rendered:r.title,excerpt:r.excerpt.hasOwnProperty("rendered")?r.excerpt.rendered:r.excerpt,url:r.link,label:r.hasOwnProperty("label")?r.label:"Report",date:s,postId:r.id};if(!0!==c&&(l.extra=""),r.art){var u=r.art;l.image=u[n].rawUrl,l.isChartArt=u[n].chartArt}return console.log("getAttributesFromPost",r,l),l},p=function(e){var t=e.setAttributes,r=e.postId,n=void 0!==r&&r,o=e.imageSize,i=void 0===o?"A1":o,c=e.isRefresh,s=void 0!==c&&c;!1!==n&&void 0!==t&&a()({path:"/wp/v2/stub/".concat(n),method:"GET"}).then((function(e){if(console.log("setPostAttributes -> by id:",n,e),!1!==e){var r=u({post:e,imageSize:i,isRefresh:s});t(r)}})).catch((function(e){return console.error(e)}))},b=function(e){var t=e.imageSlot,r=e.imageSize,n=(e.isChartArt,e.postId,e.headerSize,e.enableEmphasis),i=(e.enableHeader,e.enableExcerpt,e.enableExcerptBelow),c=(e.enableExtra,e.enableBreakingNews,e.enableMeta,e.metaTaxonomy,e.inLoop,e.isPreview,e.className),a={bordered:n,"alt-excerpt":i};"disbaled"!==t&&(a[t]=!0,a.aligned=!0);var l={className:o()("story item",c,a)};return"disabled"!==t&&""!==r&&(l["data-image-size"]=r),Object(s.useBlockProps)(l)}}},[[950,0,1,2]]]);
//# sourceMappingURL=popular-listing-99c6c8b4.js.map