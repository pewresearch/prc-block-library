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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[18],{0:function(t,e){t.exports=wp.element},1:function(t,e){t.exports=wp.i18n},139:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs-pane","category":"layout","attributes":{"uuid":{"type":"string"}},"supports":{"html":false,"align":false,"inserter":false},"usesContext":["prc-block/tabs-vertical","prc-block/tabs-style","prc-block/tabs-active"],"parent":["prc-block/tabs-panes"]}')},14:function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=r=function(t){return typeof t}:t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(e)}t.exports=r},15:function(t,e){(function(e){t.exports=e}).call(this,{})},16:function(t,e,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},253:function(t,e,r){r(16),t.exports=r(286)},254:function(t,e,r){},286:function(t,e,r){"use strict";r.r(e);var n=r(5),o=r(6),c=r(1),s=r(139),i=r(8),a=r.n(i),l=r(0),p=r(3),u=r(7),b=(r(254),function(t){var e=t.attributes,r=t.className,n=t.clientId,o=t.context,c=(t.setAttributes,e.uuid),s=o["prc-block/tabs-active"],i=c===s;o["prc-block/tabs-vertical"],o["prc-block/tabs-style"];if(!i)return React.createElement(l.Fragment,null);var b=Object(u.useSelect)((function(t){return{hasChildBlocks:0<(0,t("core/block-editor").getBlockOrder)(n).length}}),[n]).hasChildBlocks,f=Object(p.useBlockProps)({className:a()(r,"ui segment tab",{active:c===s})}),y=Object(p.__experimentalUseInnerBlocksProps)(f,{renderAppender:b?p.InnerBlocks.DefaultBlockAppender:p.InnerBlocks.ButtonBlockAppender});return React.createElement("div",y)}),f=function(){return React.createElement(p.InnerBlocks.Content,null)};function y(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function k(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?y(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var O=s.name,d={title:Object(c.__)("Pane"),description:Object(c.__)("A tab pane, contains tab content."),edit:b,save:f};Object(o.registerBlockType)(O,k(k({},s),d))},3:function(t,e){t.exports=wp.blockEditor},5:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},6:function(t,e){t.exports=wp.blocks},7:function(t,e){t.exports=wp.data},8:function(t,e,r){var n,o=r(14);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var n=o(r);if("string"===n||"number"===n)t.push(r);else if(Array.isArray(r)&&r.length){var i=s.apply(null,r);i&&t.push(i)}else if("object"===n)for(var a in r)c.call(r,a)&&r[a]&&t.push(a)}}return t.join(" ")}t.exports?(s.default=s,t.exports=s):"object"===o(r(15))&&r(15)?void 0===(n=function(){return s}.apply(e,[]))||(t.exports=n):window.classNames=s}()}},[[253,0]]]);
//# sourceMappingURL=tabs-pane-0198ca54.js.map