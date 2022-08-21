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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[46],{10:function(t,e,o){"use strict";function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}o.d(e,"a",(function(){return r}))},1031:function(t,e,o){o(22),t.exports=o(1077)},1077:function(t,e,o){"use strict";o.r(e);var r=o(10),n=o(2),i=o(8),c=o(441),s=o(16),a=o.n(s),u=(o(4),o(5)),p=["core/pullquote"],l=function(t){var e=t.attributes,o=t.className,r=(t.setAttributes,e.quote),i=e.attribution,c=Object(u.useBlockProps)({className:a()(o,"ui list")}),s=[["core/pullquote",{value:"<p>".concat(Object(n.__)(r),"</p>"),citation:i}]],l=Object(u.useInnerBlocksProps)(c,{allowedBlocks:p,orientation:"vertical",templateLock:!1,template:s});return React.createElement("div",c,React.createElement("div",l))},f=function(){return React.createElement(u.InnerBlocks.Content,null)};function b(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function y(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?b(Object(o),!0).forEach((function(e){Object(r.a)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):b(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var w=c.name,d={edit:l,save:f};Object(i.registerBlockType)(w,y(y({},c),d))},15:function(t,e){function o(e){return t.exports=o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,o(e)}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},16:function(t,e,o){var r,n=o(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var t=[],e=0;e<arguments.length;e++){var o=arguments[e];if(o){var r=n(o);if("string"===r||"number"===r)t.push(o);else if(Array.isArray(o)){if(o.length){var s=c.apply(null,o);s&&t.push(s)}}else if("object"===r)if(o.toString===Object.prototype.toString)for(var a in o)i.call(o,a)&&o[a]&&t.push(a);else t.push(o.toString())}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):"object"===n(o(17))&&o(17)?void 0===(r=function(){return c}.apply(e,[]))||(t.exports=r):window.classNames=c}()},17:function(t,e){(function(e){t.exports=e}).call(this,{})},2:function(t,e){t.exports=window.wp.i18n},22:function(t,e,o){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},4:function(t,e){t.exports=window.wp.element},441:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/quote-sorter-quote","title":"Quote Sorter – Quote","icon":"format-quote","description":"Child block displaying a single quote and attributes","category":"layout","attributes":{"quote":{"type":"string","default":"Pabst austin banjo intelligentsia. Synth venmo waistcoat woke shabby chic distillery swag kickstarter air plant tilde shaman humblebrag tumeric before they sold out."},"props":{"type":"array"},"attribution":{"type":"string","default":"Person, Age"}},"supports":{"html":false},"parent":["prc-block/quote-sorter-quotes"],"ancestor":["prc-block/quote-sorter"]}')},5:function(t,e){t.exports=window.wp.blockEditor},8:function(t,e){t.exports=window.wp.blocks}},[[1031,0]]]);
//# sourceMappingURL=quote-sorter-quote-931774fe.js.map