/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.13
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[41],{10:function(e,t){e.exports=window.wp.blocks},14:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},17:function(e,t,r){var o,n=r(18);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var i=s.apply(null,r);i&&e.push(i)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var p in r)c.call(r,p)&&r[p]&&e.push(p);else e.push(r.toString())}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):"object"===n(r(20))&&r(20)?void 0===(o=function(){return s}.apply(t,[]))||(e.exports=o):window.classNames=s}()},18:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t){(function(t){e.exports=t}).call(this,{})},24:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},344:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/roper-db-search","title":"Roper DB Search","description":"A frontend for the Roper DB Search API","keywords":["database","roper","cornell","search","polling"],"category":"layout","attributes":{"subText":{"type":"string","default":"Use this tool to search our database of polling questions."},"perPage":{"type":"number","default":10},"type":{"type":"string","default":"default"}},"supports":{"html":false}}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},705:function(e,t,r){r(24),e.exports=r(787)},787:function(e,t,r){"use strict";r.r(t);var o=r(14),n=r(10),c=r(344),s=r(17),i=r.n(s),p=(r(2),r(4)),a=r(5),u=function(e){var t=e.attributes,r=e.className,o=(e.setAttributes,t.subText,t.perPage,t.type,Object(a.useBlockProps)({className:i()(r)}));return React.createElement("div",o,React.createElement("p",null,"Roper Db Search"))},l=function(){return React.createElement(p.Fragment,null)};function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var y=c.name,d={edit:u,save:l};Object(n.registerBlockType)(y,b(b({},c),d))}},[[705,0]]]);
//# sourceMappingURL=roper-db-search-9c4a8cd9.js.map