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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[33],{1:function(t,e){t.exports=window.React},14:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},18:function(t,e){t.exports=window.wp.primitives},19:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(23);var o=n(21),c=n(24);function i(t,e){return Object(r.a)(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,c=[],i=!0,a=!1;try{for(n=n.call(t);!(i=(r=n.next()).done)&&(c.push(r.value),!e||c.length!==e);i=!0);}catch(t){a=!0,o=t}finally{try{i||null==n.return||n.return()}finally{if(a)throw o}}return c}}(t,e)||Object(o.a)(t,e)||Object(c.a)()}},2:function(t,e){t.exports=window.wp.i18n},21:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(14);function o(t,e){if(t){if("string"==typeof t)return Object(r.a)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(t,e):void 0}}},23:function(t,e,n){"use strict";function r(t){if(Array.isArray(t))return t}n.d(e,"a",(function(){return r}))},24:function(t,e,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(e,"a",(function(){return r}))},29:function(t,e){t.exports=window.wp.apiFetch},3:function(t,e){t.exports=window.wp.components},31:function(t,e){t.exports=window.wp.url},371:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/popular-listing","description":"A popular post, must be placed in a group block for numbers to appear.","title":"Popular Listing","category":"content-curation","attributes":{"title":{"type":"string"},"url":{"type":"string","default":""},"postId":{"type":"integer"},"blockIndexAttr":{"type":"integer"},"enableNumber":{"type":"boolean"}},"supports":{"html":false}}')},4:function(t,e){t.exports=window.wp.element},43:function(t,e){t.exports=window.wp.htmlEntities},45:function(t,e){t.exports=window.wp.coreData},47:function(t,e){t.exports=window.wp.date},5:function(t,e){t.exports=window.wp.blockEditor},51:function(t,e){t.exports=window.ReactDOM},52:function(t,e){t.exports=regeneratorRuntime},56:function(t,e){t.exports=window.wp.keycodes},57:function(t,e){t.exports=window.wp.mediaUtils},7:function(t,e){t.exports=window.wp.blocks},9:function(t,e){t.exports=window.wp.data},942:function(t,e,n){n(16),t.exports=n(999)},999:function(t,e,n){"use strict";n.r(e);var r=n(8),o=n(7),c=n(4),i=n(18),a=Object(c.createElement)(i.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(i.Path,{d:"M3.445 16.505a.75.75 0 001.06.05l5.005-4.55 4.024 3.521 4.716-4.715V14h1.5V8.25H14v1.5h3.19l-3.724 3.723L9.49 9.995l-5.995 5.45a.75.75 0 00-.05 1.06z"})),l=n(371),u=n(42),s=n(5),p=n(9),b=n(19),f=n(3),d=n(2),w=n(45);function m(t){var e=t.attributes,n=t.setAttributes,r=t.blockProps,o=Object(w.useEntityProp)("root","site","siteId"),c=1===Object(b.a)(o,1)[0]?"stub":"post";return React.createElement("div",r,React.createElement(f.Placeholder,{icon:a,label:Object(d.__)(" Popular Post","prc-block-library"),isColumnLayout:!0,instructions:Object(d.__)("Search for a ".concat(c," or paste url here"),"prc-block-library")},React.createElement(u.d,{attributes:e,setAttributes:n,disableImage:!0,onSelect:function(t){var e=t.title,r=t.url,o=t.postId;n({title:e,url:r,postId:o})}}),React.createElement(f.Button,{isLink:!0,onClick:function(){n({postId:0})},text:Object(d.__)("Skip"),style:{paddingLeft:"9px",marginTop:"10px"}})))}var y=function(t){var e=t.attributes,n=t.setAttributes,r=t.isSelected,o=t.clientId,i=e.title,a=e.postId,l=Object(s.useBlockProps)(),b=Object(p.useSelect)((function(t){var e,n=t("core/block-editor").getBlockRootClientId(o);return null==n||"string"==typeof n&&0===n.length?{blockIndex:null,numberEnabled:!1}:("core/group"===t("core/block-editor").getBlock(n).name&&(e=t("core/block-editor").getBlockIndex(o,n)),{blockIndex:e,numberEnabled:!0})}),[o]),f=b.blockIndex,d=b.numberEnabled;return Object(c.useEffect)((function(){n({blockIndexAttr:f}),n(!0===d?{enableNumber:!0}:{enableNumber:!1})}),[f]),void 0===a?React.createElement(m,{attributes:e,setAttributes:n,blockProps:l}):React.createElement(c.Fragment,null,React.createElement(s.BlockControls,null,React.createElement(u.e,{attributes:e,setAttributes:n,onSelect:function(t){n(t)}})),React.createElement("div",l,d&&0<=f&&React.createElement("span",{className:"big-number"},f+1),!0!==r&&React.createElement(s.RichText.Content,{className:"title",tagName:"h2",value:i}),!0===r&&React.createElement(s.RichText,{tagName:"h2",value:i,allowedFormats:["core/bold","core/italic"],onChange:function(t){return n({title:t})},placeholder:"Political Typology",keepPlaceholderOnFocus:!0,className:"title",multiline:!1})))},g=function(){return React.createElement(c.Fragment,null)};function O(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function k(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?O(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var x=l.name,h={icon:a,edit:y,save:g};Object(o.registerBlockType)(x,k(k({},l),h))}},[[942,0,1,2]]]);
//# sourceMappingURL=popular-listing-8cf070f5.js.map