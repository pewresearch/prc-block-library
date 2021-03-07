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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[14],{1:function(e,t){e.exports=wp.element},11:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n},122:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-view","category":"layout","attributes":{"map":{"type":"array","default":[{"menuUUID":0,"pageUUID":0}]}},"providesContext":{"prc-block/topic-index-condensed-view":"map"},"supports":{"html":false,"align":false}}')},14:function(e,t,n){var o,r=n(11);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)&&n.length){var s=i.apply(null,n);s&&e.push(s)}else if("object"===o)for(var l in n)c.call(n,l)&&n[l]&&e.push(l)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===r(n(16))&&n(16)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},16:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=wp.i18n},21:function(e,t,n){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},210:function(e,t,n){n(21),e.exports=n(232)},232:function(e,t,n){"use strict";n.r(t);var o=n(5),r=n(8),c=n(2),i=n(122),s=n(14),l=n.n(s),p=n(1),a=n(3),u=n(4),d=n(6),b=[["prc-block/topic-index-condensed-menu",{}],["prc-block/topic-index-condensed-page",{}]],f=["prc-block/topic-index-condensed-menu","prc-block/topic-index-condensed-page"],y=function(e){e.attributes,e.setAttributes;var t=e.className,n=e.clientId,o=(Object(d.useDispatch)("core/block-editor").updateBlockAttributes,Object(d.useSelect)((function(e){var t=e("core/block-editor"),o=t.getBlockOrder,r=(0,t.getBlockRootClientId)(n);return{hasChildBlocks:0<o(n).length,rootClientId:r}}),[n])),r=o.hasChildBlocks,i=(o.rootClientId,Object(a.useBlockProps)({className:l()(t,"ui grid")})),s=Object(a.__experimentalUseInnerBlocksProps)(i,{allowedBlocks:f,orientation:"horizontal",renderAppender:r?void 0:a.InnerBlocks.ButtonBlockAppender,template:b});return React.createElement(p.Fragment,null,React.createElement(a.BlockControls,null),React.createElement(a.InspectorControls,null,React.createElement(u.PanelBody,{title:Object(c.__)("View settings")},React.createElement(p.Fragment,null,React.createElement("p",null,"Yep")))),React.createElement("div",s))},m=function(){return React.createElement(a.InnerBlocks.Content,null)};function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var w=i.name,j={title:Object(c.__)("Topic Index - Condensed View"),description:Object(c.__)('The condensed, or "schwoopy" version of the topic index.'),keywords:[Object(c.__)("Topics"),Object(c.__)("Topic"),Object(c.__)("Index"),Object(c.__)("Schwoopy")],edit:y,save:m};Object(r.registerBlockType)(w,k(k({},i),j))},3:function(e,t){e.exports=wp.blockEditor},4:function(e,t){e.exports=wp.components},5:function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return o}))},6:function(e,t){e.exports=wp.data},8:function(e,t){e.exports=wp.blocks}},[[210,0]]]);
//# sourceMappingURL=topic-index-condensed-view-2c90522f.js.map