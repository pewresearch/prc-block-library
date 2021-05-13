/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[28],{10:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},12:function(e,t){e.exports=wp.blocks},15:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},18:function(e,t,r){var o,n=r(15);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)&&r.length){var a=s.apply(null,r);a&&e.push(a)}else if("object"===o)for(var l in r)c.call(r,l)&&r[l]&&e.push(l)}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):"object"===n(r(20))&&r(20)?void 0===(o=function(){return s}.apply(t,[]))||(e.exports=o):window.classNames=s}()},2:function(e,t){e.exports=wp.i18n},20:function(e,t){(function(t){e.exports=t}).call(this,{})},25:function(e,t,r){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},291:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs-panes","category":"layout","attributes":{},"parent":["prc-block/tabs"],"providesContext":{"prc-block/tabs-panes-style":"className"},"styles":[{"name":"bordered","label":"Bordered","isDefault":true},{"name":"not-bordered","label":"Not Bordered"}],"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"usesContext":["prc-block/tabs-vertical","prc-block/tabs-style","prc-block/tabs-active"]}')},640:function(e,t,r){r(25),e.exports=r(679)},679:function(e,t,r){"use strict";r.r(t);var o=r(10),n=r(12),c=r(2),s=r(291),a=r(18),l=r.n(a),i=r(7),p=["prc-block/topic-index-condensed-page"],u=function(e){var t=e.attributes,r=e.context,o=r["prc-block/tabs-vertical"],n=r["prc-block/tabs-style"],c=t.className,s=Object(i.useBlockProps)({className:l()({"column twelve wide":o}),style:{marginTop:o||"is-style-tabular"!==n?null:"0px!important"}}),a=Object(i.__experimentalUseInnerBlocksProps)({className:l()("ui segment tab",{basic:"is-style-not-bordered"===c})},{allowedBlocks:p,orientation:"vertical",templateLock:!1,renderAppender:!1});return React.createElement("div",s,React.createElement("div",a))},b=function(){return React.createElement(i.InnerBlocks.Content,null)};function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d=s.name,m={title:Object(c.__)("Panes"),description:Object(c.__)("Contains pane blocks"),edit:u,save:b};Object(n.registerBlockType)(d,y(y({},s),m))},7:function(e,t){e.exports=wp.blockEditor}},[[640,0]]]);
//# sourceMappingURL=tabs-panes-d76d8baf.js.map