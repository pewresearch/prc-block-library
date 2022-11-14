/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.24
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[51],{12:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},16:function(e,t,r){var o,n=r(20);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var a=i.apply(null,r);a&&e.push(a)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var l in r)c.call(r,l)&&r[l]&&e.push(l);else e.push(r.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===n(r(19))&&r(19)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},19:function(e,t){(function(t){e.exports=t}).call(this,{})},20:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},324:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/quote-sorter-quote-text","title":"Quote Sorter – Quote Text","icon":"format-quote","description":"Child block displaying a single quote","category":"layout","attributes":{"style":{"type":"object","default":{"color":{"text":"#2a2a2a"},"typography":{"fontSize":"large","lineHeight":1.8,"fontFamily":"var(--wp--preset--font-family--serif)"}}},"align":{"type":"string","default":"center"}},"supports":{"color":{"background":true,"text":true},"__experimentalBorder":{"color":true,"width":true},"spacing":{"padding":true,"margin":true},"html":false,"reusable":false,"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true}}},"usesContext":["prc-block/quote-sorter-art","prc-block/quote-sorter/quote"],"ancestor":["prc-block/quote-sorter"]}')},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},717:function(e,t,r){r(12),e.exports=r(788)},788:function(e,t,r){"use strict";r.r(t);var o=r(8),n=r(7),c=r(324),i=r(16),a=r.n(i),l=r(5),u=function(e){var t=e.className,r=e.context,n=e.attributes,c=e.setAttributes,i=n.align,u=r["prc-block/quote-sorter/quote"],s=Object(l.useBlockProps)({className:a()(t,Object(o.a)({},"has-text-align-".concat(i),i))});return React.createElement(React.Fragment,null,React.createElement(l.BlockControls,{group:"block"},React.createElement(l.AlignmentControl,{value:i,onChange:function(e){return c({align:e})}})),React.createElement("div",s,"“",u,"”"))},s=function(){return React.createElement(l.InnerBlocks.Content,null)};function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var b=c.name,y={edit:u,save:s};Object(n.registerBlockType)(b,f(f({},c),y))},8:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))}},[[717,0]]]);
//# sourceMappingURL=quote-sorter-quote-text-0b60e2f4.js.map