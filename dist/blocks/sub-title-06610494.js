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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[38],{10:function(t,e){t.exports=window.wp.blocks},14:function(t,e,r){"use strict";function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return o}))},15:function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(t.exports=r=function(t){return typeof t},t.exports.default=t.exports,t.exports.__esModule=!0):(t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.default=t.exports,t.exports.__esModule=!0),r(e)}t.exports=r,t.exports.default=t.exports,t.exports.__esModule=!0},17:function(t,e,r){var o,n=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=n(r);if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r)){if(r.length){var s=c.apply(null,r);s&&t.push(s)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var a in r)i.call(r,a)&&r[a]&&t.push(a);else t.push(r.toString())}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):"object"===n(r(20))&&r(20)?void 0===(o=function(){return c}.apply(e,[]))||(t.exports=o):window.classNames=c}()},2:function(t,e){t.exports=window.wp.element},20:function(t,e){(function(e){t.exports=e}).call(this,{})},23:function(t,e,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},231:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/subtitle","category":"layout","attributes":{"value":{"type":"string","source":"meta","meta":"sub_headline"}},"example":{"attributes":{"value":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"}},"supports":{"multiple":false}}')},24:function(t,e){t.exports=window.wp.primitives},3:function(t,e){t.exports=window.wp.i18n},421:function(t,e,r){"use strict";var o=r(2),n=r(24),i=Object(o.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(o.createElement)(n.Path,{d:"M11.1 15.8H20v-1.5h-8.9v1.5zm0-8.6v1.5H20V7.2h-8.9zM5 6.7V10h1V5.3L3.8 6l.4 1 .8-.3zm-.4 5.7c-.3.1-.5.2-.7.3l.1 1.1c.2-.2.5-.4.8-.5.3-.1.6 0 .7.1.2.3 0 .8-.2 1.1-.5.8-.9 1.6-1.4 2.5h2.7v-1h-1c.3-.6.8-1.4.9-2.1.1-.3 0-.8-.2-1.1-.5-.6-1.3-.5-1.7-.4z"}));e.a=i},6:function(t,e){t.exports=window.wp.blockEditor},883:function(t,e,r){r(23),t.exports=r(972)},972:function(t,e,r){"use strict";r.r(e);var o=r(14),n=r(3),i=r(10),c=r(421),s=r(231),a=r(17),u=r.n(a),p=r(6),l=function(t){var e=t.attributes,r=t.className,o=t.setAttributes,i=e.value,c=Object(p.useBlockProps)({className:u()(r)});return React.createElement("div",c,React.createElement(p.RichText,{tagName:"div",onChange:function(t){return o({value:t})},allowedFormats:[],keepPlaceholderOnFocus:!0,value:i,placeholder:Object(n.__)("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua")}))};function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function b(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?f(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var d=s.name,m=s.category,w=s.attributes,y={title:Object(n.__)("Post Sub Title"),description:Object(n.__)("A sub title that appears under the post title."),icon:c.a,category:m,attributes:w,edit:l,save:function(){return null}};Object(i.registerBlockType)(d,b(b({},s),y))}},[[883,0]]]);
//# sourceMappingURL=sub-title-06610494.js.map