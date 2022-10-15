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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[47],{1034:function(t,e,r){"use strict";r.r(e);var o=r(8),n=r(2),i=r(7),c=r(408),s=r(17),a=r.n(s),u=r(5),l=["core/pullquote"],p=function(t){var e=t.attributes,r=t.className,o=(t.setAttributes,e.quote),i=e.attribution,c=Object(u.useBlockProps)({className:a()(r,"ui list")}),s=[["core/pullquote",{value:"<p>".concat(Object(n.__)(o),"</p>"),citation:i}]],p=Object(u.useInnerBlocksProps)(c,{allowedBlocks:l,orientation:"vertical",templateLock:!1,template:s});return React.createElement("div",c,React.createElement("div",p))},f=function(){return React.createElement(u.InnerBlocks.Content,null)};function b(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function y(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?b(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var d=c.name,w={edit:p,save:f};Object(i.registerBlockType)(d,y(y({},c),w))},13:function(t,e,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},15:function(t,e){function r(e){return t.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,r(e)}t.exports=r,t.exports.__esModule=!0,t.exports.default=t.exports},17:function(t,e,r){var o,n=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=n(r);if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r)){if(r.length){var s=c.apply(null,r);s&&t.push(s)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var a in r)i.call(r,a)&&r[a]&&t.push(a);else t.push(r.toString())}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):"object"===n(r(18))&&r(18)?void 0===(o=function(){return c}.apply(e,[]))||(t.exports=o):window.classNames=c}()},18:function(t,e){(function(e){t.exports=e}).call(this,{})},2:function(t,e){t.exports=window.wp.i18n},408:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/quote-sorter-quote","title":"Quote Sorter – Quote","icon":"format-quote","description":"Child block displaying a single quote and attributes","category":"layout","attributes":{"quote":{"type":"string","default":"Pabst austin banjo intelligentsia. Synth venmo waistcoat woke shabby chic distillery swag kickstarter air plant tilde shaman humblebrag tumeric before they sold out."},"props":{"type":"array"},"attribution":{"type":"string","default":"Person, Age"}},"supports":{"html":false},"parent":["prc-block/quote-sorter-quotes"],"ancestor":["prc-block/quote-sorter"]}')},5:function(t,e){t.exports=window.wp.blockEditor},7:function(t,e){t.exports=window.wp.blocks},8:function(t,e,r){"use strict";function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return o}))},984:function(t,e,r){r(13),t.exports=r(1034)}},[[984,0]]]);
//# sourceMappingURL=quote-sorter-quote-b60c8bf3.js.map