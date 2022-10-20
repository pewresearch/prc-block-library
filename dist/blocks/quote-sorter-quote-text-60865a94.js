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
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=n(r);if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r)){if(r.length){var a=c.apply(null,r);a&&t.push(a)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var s in r)i.call(r,s)&&r[s]&&t.push(s);else t.push(r.toString())}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):"object"===n(r(18))&&r(18)?void 0===(o=function(){return c}.apply(e,[]))||(t.exports=o):window.classNames=c}()},18:function(t,e){(function(e){t.exports=e}).call(this,{})},2:function(t,e){t.exports=window.wp.i18n},20:function(t,e,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},371:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/quote-sorter-quote-text","title":"Quote Sorter – Quote Text","icon":"format-quote","description":"Child block displaying a single quote","category":"layout","attributes":{},"supports":{"color":{"background":true,"text":true},"__experimentalBorder":{"color":true,"width":true},"spacing":{"padding":true,"margin":true},"html":false,"reusable":false,"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true}},"usesContext":["prc-block/quote-sorter-art","prc-block/quote-sorter-attribution-styles"],"parent":["prc-block/quote-sorter-quotes"],"ancestor":["prc-block/quote-sorter"]}')},5:function(t,e){t.exports=window.wp.blockEditor},746:function(t,e,r){r(20),t.exports=r(835)},8:function(t,e){t.exports=window.wp.blocks},835:function(t,e,r){"use strict";r.r(e);var o=r(9),n=(r(2),r(8)),i=r(371),c=r(16),a=r.n(c),s=r(5),l=function(t){var e=t.attributes,r=t.className,o=t.context,n=e.quote,i=e.attribution,c=o["prc-block/quote-sorter-attribution-styles"],l=Object(s.useBlockProps)({className:a()(r,"ui list")});return React.createElement("div",l,React.createElement("div",{className:"content"},React.createElement("div",{className:"description"},n)),React.createElement("div",{className:"extra content"},React.createElement("div",{className:"attribution",style:{color:c.color,fontSize:c.fontSize,fontStyle:c.fontStyle,fontWeight:c.fontWeight,fontFamily:c.fontFamily,lineHeight:c.lineHeight,textDecoration:c.textDecoration,textTransform:c.textTransform,textAlign:c.textAlign}},i)))},u=function(){return React.createElement(s.InnerBlocks.Content,null)};function p(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?p(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var b=i.name,y={edit:l,save:u};Object(n.registerBlockType)(b,f(f({},i),y))},9:function(t,e,r){"use strict";function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return o}))}},[[746,0]]]);
//# sourceMappingURL=quote-sorter-quote-text-60865a94.js.map