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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[45],{10:function(e,t){e.exports=window.wp.blocks},13:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},15:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},16:function(e,t,r){var o,n=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var a=s.apply(null,r);a&&e.push(a)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var i in r)c.call(r,i)&&r[i]&&e.push(i);else e.push(r.toString())}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):"object"===n(r(18))&&r(18)?void 0===(o=function(){return s}.apply(t,[]))||(e.exports=o):window.classNames=s}()},18:function(e,t){(function(t){e.exports=t}).call(this,{})},23:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},3:function(e,t){e.exports=window.wp.i18n},338:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs-panes","category":"layout","attributes":{},"parent":["prc-block/tabs"],"providesContext":{"prc-block/tabs-panes-style":"className"},"styles":[{"name":"bordered","label":"Bordered","isDefault":true},{"name":"not-bordered","label":"Not Bordered"}],"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"usesContext":["prc-block/tabs-vertical","prc-block/tabs-style","prc-block/tabs-active"]}')},6:function(e,t){e.exports=window.wp.blockEditor},909:function(e,t,r){r(23),e.exports=r(961)},961:function(e,t,r){"use strict";r.r(t);var o=r(13),n=r(10),c=r(3),s=r(338),a=r(16),i=r.n(a),l=r(6),p=["prc-block/topic-index-condensed-page"],u=function(e){var t=e.attributes,r=e.context,o=r["prc-block/tabs-vertical"],n=r["prc-block/tabs-style"],c=t.className,s=Object(l.useBlockProps)({className:i()({"column twelve wide":o}),style:{marginTop:o||"is-style-tabular"!==n?null:"0px!important"}}),a=Object(l.useInnerBlocksProps)({className:i()("ui segment tab",{basic:"is-style-not-bordered"===c})},{allowedBlocks:p,orientation:"vertical",templateLock:!1,renderAppender:!1});return React.createElement("div",s,React.createElement("div",a))},b=function(){return React.createElement(l.InnerBlocks.Content,null)};function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d=s.name,m={title:Object(c.__)("Panes"),description:Object(c.__)("Contains pane blocks"),edit:u,save:b};Object(n.registerBlockType)(d,y(y({},s),m))}},[[909,0]]]);
//# sourceMappingURL=tabs-panes-6a9a1d6e.js.map