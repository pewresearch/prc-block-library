/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.9
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[41],{10:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},16:function(t,e,r){var n,o=r(18);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var n=o(r);if("string"===n||"number"===n)t.push(r);else if(Array.isArray(r)){if(r.length){var u=i.apply(null,r);u&&t.push(u)}}else if("object"===n)if(r.toString===Object.prototype.toString)for(var a in r)c.call(r,a)&&r[a]&&t.push(a);else t.push(r.toString())}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===o(r(22))&&r(22)?void 0===(n=function(){return i}.apply(e,[]))||(t.exports=n):window.classNames=i}()},17:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(27);var o=r(25),c=r(28);function i(t,e){return Object(n.a)(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,c=[],i=!0,u=!1;try{for(r=r.call(t);!(i=(n=r.next()).done)&&(c.push(n.value),!e||c.length!==e);i=!0);}catch(t){u=!0,o=t}finally{try{i||null==r.return||r.return()}finally{if(u)throw o}}return c}}(t,e)||Object(o.a)(t,e)||Object(c.a)()}},18:function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(t.exports=r=function(t){return typeof t},t.exports.default=t.exports,t.exports.__esModule=!0):(t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.default=t.exports,t.exports.__esModule=!0),r(e)}t.exports=r,t.exports.default=t.exports,t.exports.__esModule=!0},2:function(t,e){t.exports=window.wp.i18n},20:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},22:function(t,e){(function(e){t.exports=e}).call(this,{})},23:function(t,e,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},25:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(20);function o(t,e){if(t){if("string"==typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},27:function(t,e,r){"use strict";function n(t){if(Array.isArray(t))return t}r.d(e,"a",(function(){return n}))},28:function(t,e,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(e,"a",(function(){return n}))},3:function(t,e){t.exports=window.wp.components},309:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/taxonomy-tree-more","category":"layout","parent":"prc-block/taxonomy-tree","supports":{"html":false}}')},4:function(t,e){t.exports=window.wp.element},5:function(t,e){t.exports=window.wp.blockEditor},659:function(t,e,r){r(23),t.exports=r(709)},709:function(t,e,r){"use strict";r.r(e);var n=r(10),o=r(2),c=r(9),i=r(309),u=r(17),a=r(16),s=r.n(a),l=r(4),p=r(5),f=r(3),b=["prc-block/menu-link"],y=function(t){var e=t.className,r=Object(l.useState)(!1),n=Object(u.a)(r,2),o=n[0],c=n[1],i=Object(p.useBlockProps)({className:s()(e)}),a=Object(p.useInnerBlocksProps)({},{allowedBlocks:b,orientation:"vertical",templateLock:!1});return React.createElement("div",i,React.createElement(f.Button,{isLink:!0,onClick:function(){return c(!o)}},o?"- Less":"+ More"),o&&React.createElement("div",a))},d=function(){return React.createElement(p.InnerBlocks.Content,null)};function m(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function w(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?m(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var O=i.name,v={title:Object(o.__)("Taxonomy Tree More"),description:"A collapsible list of more content for the Taxonomy Tree.",category:"layout",edit:y,save:d};Object(c.registerBlockType)(O,w(w({},i),v))},9:function(t,e){t.exports=window.wp.blocks}},[[659,0]]]);
//# sourceMappingURL=taxonomy-tree-more-a328c588.js.map