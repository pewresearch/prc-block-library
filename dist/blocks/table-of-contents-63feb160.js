/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.9
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[46],{1003:function(t,e,o){"use strict";o.r(e);var r=o(14),n=(o(2),o(11)),c=o(344),s=o(17),i=o.n(s),p=o(4),a=o(5),l=(o(13),function(t){t.attributes;var e=t.className,o=(t.setAttributes,Object(a.useBlockProps)({className:i()(e)}));return React.createElement("div",o,React.createElement("p",null,"Table of contents use data api to gather up all the chapter blocks here..."))}),u=function(){return React.createElement(p.Fragment,null)};function f(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function b(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?f(Object(o),!0).forEach((function(e){Object(r.a)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):f(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var y=c.name,w={edit:l,save:u};Object(n.registerBlockType)(y,b(b({},c),w))},11:function(t,e){t.exports=window.wp.blocks},13:function(t,e){t.exports=window.wp.data},14:function(t,e,o){"use strict";function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}o.d(e,"a",(function(){return r}))},17:function(t,e,o){var r,n=o(18);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var t=[],e=0;e<arguments.length;e++){var o=arguments[e];if(o){var r=n(o);if("string"===r||"number"===r)t.push(o);else if(Array.isArray(o)){if(o.length){var i=s.apply(null,o);i&&t.push(i)}}else if("object"===r)if(o.toString===Object.prototype.toString)for(var p in o)c.call(o,p)&&o[p]&&t.push(p);else t.push(o.toString())}}return t.join(" ")}t.exports?(s.default=s,t.exports=s):"object"===n(o(19))&&o(19)?void 0===(r=function(){return s}.apply(e,[]))||(t.exports=r):window.classNames=s}()},18:function(t,e){function o(e){return t.exports=o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,o(e)}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},19:function(t,e){(function(e){t.exports=e}).call(this,{})},2:function(t,e){t.exports=window.wp.i18n},23:function(t,e,o){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},344:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/table-of-contents","title":"Table of Contents","description":"Displays a list of all heading blocks set to chapter headings.","keywords":["toc","chapter","table of contents"],"category":"design","attributes":{},"supports":{"html":false,"multiple":false},"usesContext":["queryId","query","postId","postType","prc-block/column/width","prc-block/row/isEqual"]}')},4:function(t,e){t.exports=window.wp.element},5:function(t,e){t.exports=window.wp.blockEditor},947:function(t,e,o){o(23),t.exports=o(1003)}},[[947,0]]]);
//# sourceMappingURL=table-of-contents-63feb160.js.map