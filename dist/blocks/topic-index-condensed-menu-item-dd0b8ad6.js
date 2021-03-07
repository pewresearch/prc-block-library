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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[12],{1:function(e,t){e.exports=wp.element},11:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n},124:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-menu-item","category":"layout","attributes":{},"supports":{"html":false,"align":false},"usesContext":["prc-block/topic-index-condensed-view"],"parent":["prc-block/topic-index-condensed-menu"]}')},14:function(e,t,n){var o,r=n(11);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)&&n.length){var s=i.apply(null,n);s&&e.push(s)}else if("object"===o)for(var l in n)c.call(n,l)&&n[l]&&e.push(l)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===r(n(16))&&n(16)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},16:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=wp.i18n},21:function(e,t,n){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},212:function(e,t,n){n(21),e.exports=n(234)},234:function(e,t,n){"use strict";n.r(t);var o=n(5),r=n(8),c=n(2),i=n(124),s=n(14),l=n.n(s),u=n(1),a=n(3),p=n(4),f=n(6),b=function(e){e.attributes,e.setAttributes;var t=e.className,n=e.clientId,o=e.isSelected;Object(f.useDispatch)("core/block-editor").updateBlockAttributes,Object(f.useSelect)((function(e){return{rootClientId:(0,e("core/block-editor").getBlockRootClientId)(n)}}),[n]).rootClientId;Object(u.useEffect)((function(){}),[o]);var r=Object(a.useBlockProps)({className:l()(t)});return React.createElement(u.Fragment,null,React.createElement(a.BlockControls,null,"Toolbar Shit Here For Links and Such"),React.createElement(a.InspectorControls,null,React.createElement(p.PanelBody,{title:Object(c.__)("Menu settings")},React.createElement(u.Fragment,null,React.createElement("p",null,"Yep")))),React.createElement("div",r,"Menu item here"))},d=function(){return React.createElement(a.InnerBlocks.Content,null)};function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var O=i.name,k={title:Object(c.__)("Topic Index - Condensed Menu Item"),description:Object(c.__)("A sub block of Menu block, a sub block of the Topic Index - Condensed View block."),edit:b,save:d};Object(r.registerBlockType)(O,m(m({},i),k))},3:function(e,t){e.exports=wp.blockEditor},4:function(e,t){e.exports=wp.components},5:function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return o}))},6:function(e,t){e.exports=wp.data},8:function(e,t){e.exports=wp.blocks}},[[212,0]]]);
//# sourceMappingURL=topic-index-condensed-menu-item-dd0b8ad6.js.map