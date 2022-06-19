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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[45],{1009:function(e,t,r){r(23),e.exports=r(1045)},1045:function(e,t,r){"use strict";r.r(t);var n=r(14),o=r(9),c=r(429),i=r(19),s=r.n(i),a=r(2),l=r(4),p=r(5),u=r(3),f=[],b=function(e){var t=e.attributes,r=e.className,n=e.setAttributes,o=t.shareTargetUrl,c=t.description,i=t.title,b=Object(p.useBlockProps)({className:s()(r)}),y=Object(p.useInnerBlocksProps)(b,{allowedBlocks:f,orientation:"vertical",templateLock:!1});return React.createElement(l.Fragment,null,React.createElement(p.InspectorControls,null,React.createElement(u.PanelBody,{title:Object(a.__)("Share Content Settings")},React.createElement(u.TextControl,{label:Object(a.__)("Description"),value:c,onChange:function(e){return n({description:e})}}),React.createElement(u.TextControl,{label:Object(a.__)("Title"),value:i,onChange:function(e){return n({title:e})}}),React.createElement(u.TextControl,{label:Object(a.__)("Target URL"),value:o,onChange:function(e){return n({shareTargetUrl:e})}}))),React.createElement("div",y))},y=function(){return React.createElement(p.InnerBlocks.Content,null)};function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=c.name,m={edit:b,save:y};Object(o.registerBlockType)(g,d(d({},c),m))},14:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},15:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},19:function(e,t,r){var n,o=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)){if(r.length){var s=i.apply(null,r);s&&e.push(s)}}else if("object"===n)if(r.toString===Object.prototype.toString)for(var a in r)c.call(r,a)&&r[a]&&e.push(a);else e.push(r.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===o(r(20))&&r(20)?void 0===(n=function(){return i}.apply(t,[]))||(e.exports=n):window.classNames=i}()},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t){(function(t){e.exports=t}).call(this,{})},23:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},429:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/share-content","title":"Share Content","description":"Specify a different share target for the content inside this block.","keywords":["share"],"category":"marketing","attributes":{"shareTargetUrl":{"type":"string"},"description":{"type":"string"},"title":{"type":"string"}},"supports":{"html":false}}')},5:function(e,t){e.exports=window.wp.blockEditor},9:function(e,t){e.exports=window.wp.blocks}},[[1009,0]]]);
//# sourceMappingURL=share-content-ba53d6db.js.map