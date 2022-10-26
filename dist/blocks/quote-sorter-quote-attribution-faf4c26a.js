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
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=n(r);if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r)){if(r.length){var a=c.apply(null,r);a&&t.push(a)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var u in r)i.call(r,u)&&r[u]&&t.push(u);else t.push(r.toString())}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):"object"===n(r(18))&&r(18)?void 0===(o=function(){return c}.apply(e,[]))||(t.exports=o):window.classNames=c}()},18:function(t,e){(function(e){t.exports=e}).call(this,{})},2:function(t,e){t.exports=window.wp.i18n},21:function(t,e,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},373:function(t){t.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/quote-sorter-quote-attribution","title":"Quote Sorter – Quote Attribution","icon":"format-quote","description":"Child block displaying a single attribution","category":"layout","attributes":{"style":{"type":"object","default":{"color":{"background":"#ffffff","text":"#2a2a2a"},"typography":{"fontSize":"small","lineHeight":1.8,"fontFamily":"sans-serif"}}},"align":{"type":"string","default":"center"}},"supports":{"color":{"background":true,"text":true},"__experimentalBorder":{"color":true,"width":true},"spacing":{"padding":true,"margin":true},"html":false,"reusable":false,"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true}},"usesContext":["prc-block/quote-sorter/attribution"],"ancestor":["prc-block/quote-sorter"]}')},4:function(t,e){t.exports=window.wp.element},5:function(t,e){t.exports=window.wp.blockEditor},751:function(t,e,r){r(21),t.exports=r(840)},8:function(t,e){t.exports=window.wp.blocks},840:function(t,e,r){"use strict";r.r(e);var o=r(9),n=(r(2),r(8)),i=r(373),c=r(16),a=r.n(c),u=r(4),s=r(5),l=function(t){var e=t.attributes,r=t.setAttributes,n=t.className,i=t.context,c=e.align,l=null==i?void 0:i["prc-block/quote-sorter/attribution"],p=Object(s.useBlockProps)({className:a()(n,Object(o.a)({},"has-text-align-".concat(c),c))});return React.createElement(u.Fragment,null,React.createElement(s.BlockControls,{group:"block"},React.createElement(s.AlignmentControl,{value:c,onChange:function(t){return r({align:t})}})),React.createElement("div",p,l))},p=function(){return React.createElement(s.InnerBlocks.Content,null)};function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function b(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?f(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var y=i.name,m={edit:l,save:p};Object(n.registerBlockType)(y,b(b({},i),m))},9:function(t,e,r){"use strict";function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return o}))}},[[751,0]]]);
//# sourceMappingURL=quote-sorter-quote-attribution-faf4c26a.js.map