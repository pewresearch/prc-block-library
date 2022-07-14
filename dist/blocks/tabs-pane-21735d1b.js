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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[58],{10:function(e,t){e.exports=window.wp.data},1001:function(e,t,r){r(23),e.exports=r(1064)},1064:function(e,t,r){"use strict";r.r(t);var n=r(13),o=r(8),c=r(2),s=r(417),i=r(17),a=r.n(i),p=r(4),l=r(5),u=r(10),b=function(e){var t=e.attributes,r=e.className,n=e.context,o=e.clientId;if(!(t.uuid===n["prc-block/tabs-active"]))return React.createElement(p.Fragment,null);var c=Object(u.useSelect)((function(e){return{hasChildBlocks:0<(0,e("core/block-editor").getBlockOrder)(o).length}}),[o]).hasChildBlocks,s=Object(l.useBlockProps)({className:a()(r)}),i=Object(l.useInnerBlocksProps)(s,{renderAppender:c?l.InnerBlocks.DefaultBlockAppender:l.InnerBlocks.ButtonBlockAppender});return React.createElement("div",s,React.createElement("div",i))},f=function(){return React.createElement(l.InnerBlocks.Content,null)};function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var w=s.name,k={title:Object(c.__)("Pane"),description:Object(c.__)("A tab pane, contains tab content."),edit:b,save:f};Object(o.registerBlockType)(w,d(d({},s),k))},13:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},15:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},17:function(e,t,r){var n,o=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)){if(r.length){var i=s.apply(null,r);i&&e.push(i)}}else if("object"===n)if(r.toString===Object.prototype.toString)for(var a in r)c.call(r,a)&&r[a]&&e.push(a);else e.push(r.toString())}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):"object"===o(r(20))&&r(20)?void 0===(n=function(){return s}.apply(t,[]))||(e.exports=n):window.classNames=s}()},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t){(function(t){e.exports=t}).call(this,{})},23:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},4:function(e,t){e.exports=window.wp.element},417:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs-pane","category":"layout","attributes":{"uuid":{"type":"string"}},"supports":{"html":false,"align":false,"inserter":false},"usesContext":["prc-block/tabs-active","prc-block/tabs-vertical","prc-block/tabs-panes-style","prc-block/tabs-style"],"parent":["prc-block/tabs-panes"]}')},5:function(e,t){e.exports=window.wp.blockEditor},8:function(e,t){e.exports=window.wp.blocks}},[[1001,0]]]);
//# sourceMappingURL=tabs-pane-21735d1b.js.map