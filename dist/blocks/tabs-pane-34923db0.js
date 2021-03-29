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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[18],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=wp.i18n},12:function(e,t){(function(t){e.exports=t}).call(this,{})},13:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=r=function(e){return typeof e}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(t)}e.exports=r},139:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs-pane","category":"layout","attributes":{"uuid":{"type":"string"}},"supports":{"html":false,"align":false,"inserter":false},"usesContext":["prc-block/tabs-active","prc-block/tabs-vertical","prc-block/tabs-panes-style","prc-block/tabs-style"],"parent":["prc-block/tabs-panes"]}')},15:function(e,t,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},254:function(e,t,r){r(15),e.exports=r(286)},286:function(e,t,r){"use strict";r.r(t);var n=r(5),o=r(6),c=r(1),s=r(139),i=r(8),a=r.n(i),p=r(0),l=r(3),u=r(7),b=function(e){var t=e.attributes,r=e.className,n=e.clientId,o=e.context;if(!(t.uuid===o["prc-block/tabs-active"]))return React.createElement(p.Fragment,null);var c=Object(u.useSelect)((function(e){return{hasChildBlocks:0<(0,e("core/block-editor").getBlockOrder)(n).length}}),[n]).hasChildBlocks,s=Object(l.useBlockProps)({className:a()(r)}),i=Object(l.__experimentalUseInnerBlocksProps)({},{renderAppender:c?l.InnerBlocks.DefaultBlockAppender:l.InnerBlocks.ButtonBlockAppender});return React.createElement("div",s,React.createElement("div",i))},f=function(){return React.createElement(l.InnerBlocks.Content,null)};function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function k(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d=s.name,O={title:Object(c.__)("Pane"),description:Object(c.__)("A tab pane, contains tab content."),edit:b,save:f};Object(o.registerBlockType)(d,k(k({},s),O))},3:function(e,t){e.exports=wp.blockEditor},5:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},6:function(e,t){e.exports=wp.blocks},7:function(e,t){e.exports=wp.data},8:function(e,t,r){var n,o=r(13);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)&&r.length){var i=s.apply(null,r);i&&e.push(i)}else if("object"===n)for(var a in r)c.call(r,a)&&r[a]&&e.push(a)}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):"object"===o(r(12))&&r(12)?void 0===(n=function(){return s}.apply(t,[]))||(e.exports=n):window.classNames=s}()}},[[254,0]]]);
//# sourceMappingURL=tabs-pane-34923db0.js.map