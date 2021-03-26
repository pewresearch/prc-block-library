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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[19],{1:function(e,t){e.exports=wp.i18n},14:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=r=function(e){return typeof e}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(t)}e.exports=r},140:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs-panes","category":"layout","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/tabs"],"usesContext":["prc-block/tabs-vertical","prc-block/tabs-style"]}')},15:function(e,t){(function(t){e.exports=t}).call(this,{})},16:function(e,t,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},255:function(e,t,r){r(16),e.exports=r(287)},287:function(e,t,r){"use strict";r.r(t);var n=r(5),o=r(6),c=r(1),s=r(140),i=r(8),a=r.n(i),p=r(3),l=["prc-block/topic-index-condensed-page"],u=function(e){var t=e.className,r=e.context["prc-block/tabs-vertical"],n=Object(p.useBlockProps)({className:a()(t,{"column twelve wide":r})}),o=Object(p.__experimentalUseInnerBlocksProps)(n,{allowedBlocks:l,orientation:"vertical",templateLock:!1,renderAppender:!1});return React.createElement("div",o)},b=function(){return React.createElement(p.InnerBlocks.Content,null)};function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var O=s.name,w={title:Object(c.__)("Panes"),description:Object(c.__)("Contains pane blocks"),edit:u,save:b};Object(o.registerBlockType)(O,y(y({},s),w))},3:function(e,t){e.exports=wp.blockEditor},5:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},6:function(e,t){e.exports=wp.blocks},8:function(e,t,r){var n,o=r(14);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)&&r.length){var i=s.apply(null,r);i&&e.push(i)}else if("object"===n)for(var a in r)c.call(r,a)&&r[a]&&e.push(a)}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):"object"===o(r(15))&&r(15)?void 0===(n=function(){return s}.apply(t,[]))||(e.exports=n):window.classNames=s}()}},[[255,0]]]);
//# sourceMappingURL=tabs-panes-e49c9346.js.map