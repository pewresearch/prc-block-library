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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[47],{15:function(t,e){function r(e){return t.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,r(e)}t.exports=r,t.exports.__esModule=!0,t.exports.default=t.exports},16:function(t,e,r){var o,n=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=n(r);if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r)){if(r.length){var i=s.apply(null,r);i&&t.push(i)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var a in r)c.call(r,a)&&r[a]&&t.push(a);else t.push(r.toString())}}return t.join(" ")}t.exports?(s.default=s,t.exports=s):"object"===n(r(18))&&r(18)?void 0===(o=function(){return s}.apply(e,[]))||(t.exports=o):window.classNames=s}()},18:function(t,e){(function(e){t.exports=e}).call(this,{})},2:function(t,e){t.exports=window.wp.i18n},20:function(t,e,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},400:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/quote-sorter-quote","title":"Quote Sorter – Quote","icon":"format-quote","description":"Child block displaying a single quote and attributes","category":"layout","attributes":{"quote":{"type":"string","default":"This is a placeholder quote. Quotes from data will render here on frontend."},"props":{"type":"array"},"attribution":{"type":"string","default":"Person, Age"}},"supports":{"html":false,"reusable":false},"usesContext":["prc-block/quote-sorter-art","prc-block/quote-sorter-attribution-styles"],"parent":["prc-block/quote-sorter-quotes"],"ancestor":["prc-block/quote-sorter"]}')},5:function(t,e){t.exports=window.wp.blockEditor},799:function(t,e,r){r(20),t.exports=r(846)},8:function(t,e){t.exports=window.wp.blocks},846:function(t,e,r){"use strict";r.r(e);var o=r(9),n=(r(2),r(8)),c=r(400),s=r(16),i=r.n(s),a=r(5),u=function(t){var e=t.attributes,r=t.className,o=t.context,n=e.quote,c=e.attribution,s=o["prc-block/quote-sorter-attribution-styles"],u=Object(a.useBlockProps)({className:i()(r,"ui list")});return console.log(s.color),React.createElement("div",u,React.createElement("div",{className:"content"},React.createElement("div",{className:"description"},n)),React.createElement("div",{className:"extra content"},React.createElement("div",{className:"meta",style:{color:s.color}},c)))},l=function(){return React.createElement(a.InnerBlocks.Content,null)};function p(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?p(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var b=c.name,y={edit:u,save:l};Object(n.registerBlockType)(b,f(f({},c),y))},9:function(t,e,r){"use strict";function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return o}))}},[[799,0]]]);
//# sourceMappingURL=quote-sorter-quote-4d5a4016.js.map