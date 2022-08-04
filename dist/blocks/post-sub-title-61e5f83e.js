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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[37],{1062:function(t,e,r){"use strict";r.r(e);var o=r(9),n=r(2),i=r(8),c=r(4),a=r(24),s=Object(c.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(a.Path,{d:"M11.1 15.8H20v-1.5h-8.9v1.5zm0-8.6v1.5H20V7.2h-8.9zM5 6.7V10h1V5.3L3.8 6l.4 1 .8-.3zm-.4 5.7c-.3.1-.5.2-.7.3l.1 1.1c.2-.2.5-.4.8-.5.3-.1.6 0 .7.1.2.3 0 .8-.2 1.1-.5.8-.9 1.6-1.4 2.5h2.7v-1h-1c.3-.6.8-1.4.9-2.1.1-.3 0-.8-.2-1.1-.5-.6-1.3-.5-1.7-.4z"})),l=r(277),u=r(16),p=r.n(u),b=r(5),f=function(t){var e=t.attributes,r=t.className,i=t.setAttributes,a=e.value,s=e.textAlign,l=Object(b.useBlockProps)({className:p()(r,Object(o.a)({},"has-text-align-".concat(s),s)),style:{marginBottom:"1.5em"}});return React.createElement(c.Fragment,null,React.createElement(b.BlockControls,null,React.createElement(b.AlignmentControl,{value:s,onChange:function(t){i({textAlign:t})}})),React.createElement("div",l,React.createElement(b.RichText,{tagName:"div",onChange:function(t){return i({value:t})},allowedFormats:[],keepPlaceholderOnFocus:!0,value:a,placeholder:Object(n.__)("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua")})))};function m(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function d(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?m(Object(r),!0).forEach((function(e){Object(o.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var y=l.name,w=l.category,g=l.attributes,v={title:Object(n.__)("Post Sub Title"),description:Object(n.__)("A sub title that appears under the post title."),icon:s,category:w,attributes:g,edit:f,save:function(){return null}};Object(i.registerBlockType)(y,d(d({},l),v))},15:function(t,e){function r(e){return t.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,r(e)}t.exports=r,t.exports.__esModule=!0,t.exports.default=t.exports},16:function(t,e,r){var o,n=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var o=n(r);if("string"===o||"number"===o)t.push(r);else if(Array.isArray(r)){if(r.length){var a=c.apply(null,r);a&&t.push(a)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var s in r)i.call(r,s)&&r[s]&&t.push(s);else t.push(r.toString())}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):"object"===n(r(17))&&r(17)?void 0===(o=function(){return c}.apply(e,[]))||(t.exports=o):window.classNames=c}()},17:function(t,e){(function(e){t.exports=e}).call(this,{})},2:function(t,e){t.exports=window.wp.i18n},22:function(t,e,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},24:function(t,e){t.exports=window.wp.primitives},277:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/subtitle","category":"layout","attributes":{"value":{"type":"string","source":"meta","meta":"sub_headline"},"textAlign":{"type":"string"}},"example":{"attributes":{"value":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"}},"supports":{"multiple":false,"color":{"text":true,"background":true}}}')},4:function(t,e){t.exports=window.wp.element},5:function(t,e){t.exports=window.wp.blockEditor},8:function(t,e){t.exports=window.wp.blocks},9:function(t,e,r){"use strict";function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return o}))},970:function(t,e,r){r(22),t.exports=r(1062)}},[[970,0]]]);
//# sourceMappingURL=post-sub-title-61e5f83e.js.map