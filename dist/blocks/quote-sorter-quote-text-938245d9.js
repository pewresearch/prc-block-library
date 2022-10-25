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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[49],{15:function(t,e){function r(e){return t.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,r(e)}t.exports=r,t.exports.__esModule=!0,t.exports.default=t.exports},16:function(t,e,r){var o,n=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=n(r);if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r)){if(r.length){var s=c.apply(null,r);s&&t.push(s)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var u in r)i.call(r,u)&&r[u]&&t.push(u);else t.push(r.toString())}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):"object"===n(r(18))&&r(18)?void 0===(o=function(){return c}.apply(e,[]))||(t.exports=o):window.classNames=c}()},18:function(t,e){(function(e){t.exports=e}).call(this,{})},2:function(t,e){t.exports=window.wp.i18n},21:function(t,e,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},371:function(t){t.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/quote-sorter-quote-text","title":"Quote Sorter – Quote Text","icon":"format-quote","description":"Child block displaying a single quote","category":"layout","attributes":{"style":{"type":"object","default":{"color":{"text":"#2a2a2a"},"typography":{"fontSize":"large","lineHeight":1.8,"fontFamily":"serif"}}},"align":{"type":"string","default":"center"}},"supports":{"align":true,"color":{"background":true,"text":true},"__experimentalBorder":{"color":true,"width":true},"spacing":{"padding":true,"margin":true},"html":false,"reusable":false,"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true}},"usesContext":["prc-block/quote-sorter-art","prc-block/quote-sorter/quote"],"ancestor":["prc-block/quote-sorter"]}')},5:function(t,e){t.exports=window.wp.blockEditor},750:function(t,e,r){r(21),t.exports=r(839)},8:function(t,e){t.exports=window.wp.blocks},839:function(t,e,r){"use strict";r.r(e);var o=r(9),n=(r(2),r(8)),i=r(371),c=r(16),s=r.n(c),u=r(5),a=function(t){var e=t.className,r=t.context["prc-block/quote-sorter/quote"],o=Object(u.useBlockProps)({className:s()(e,"description")});return React.createElement("div",o,"“",r,"”")},p=function(){return React.createElement(u.InnerBlocks.Content,null)};function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var b=i.name,y={edit:a,save:p};Object(n.registerBlockType)(b,f(f({},i),y))},9:function(t,e,r){"use strict";function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return o}))}},[[750,0]]]);
//# sourceMappingURL=quote-sorter-quote-text-938245d9.js.map