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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[28],{10:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},12:function(e,t){e.exports=wp.blocks},16:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},17:function(e,t){e.exports=wp.data},18:function(e,t,r){var n,o=r(16);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)&&r.length){var a=s.apply(null,r);a&&e.push(a)}else if("object"===n)for(var i in r)c.call(r,i)&&r[i]&&e.push(i)}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):"object"===o(r(19))&&r(19)?void 0===(n=function(){return s}.apply(t,[]))||(e.exports=n):window.classNames=s}()},19:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=wp.i18n},25:function(e,t,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},294:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs-pane","category":"layout","attributes":{"uuid":{"type":"string"}},"supports":{"html":false,"align":false,"inserter":false},"usesContext":["prc-block/tabs-active","prc-block/tabs-vertical","prc-block/tabs-panes-style","prc-block/tabs-style"],"parent":["prc-block/tabs-panes"]}')},3:function(e,t){e.exports=wp.element},635:function(e,t,r){r(25),e.exports=r(676)},676:function(e,t,r){"use strict";r.r(t);var n=r(10),o=r(12),c=r(2),s=r(294),a=r(18),i=r.n(a),p=r(3),l=r(7),u=r(17),b=function(e){var t=e.attributes,r=e.className,n=e.context,o=e.clientId;if(!(t.uuid===n["prc-block/tabs-active"]))return React.createElement(p.Fragment,null);var c=Object(u.useSelect)((function(e){return{hasChildBlocks:0<(0,e("core/block-editor").getBlockOrder)(o).length}}),[o]).hasChildBlocks,s=Object(l.useBlockProps)({className:i()(r)}),a=Object(l.__experimentalUseInnerBlocksProps)(s,{renderAppender:c?l.InnerBlocks.DefaultBlockAppender:l.InnerBlocks.ButtonBlockAppender});return React.createElement("div",s,React.createElement("div",a))},f=function(){return React.createElement(l.InnerBlocks.Content,null)};function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var k=s.name,O={title:Object(c.__)("Pane"),description:Object(c.__)("A tab pane, contains tab content."),edit:b,save:f};Object(o.registerBlockType)(k,d(d({},s),O))},7:function(e,t){e.exports=wp.blockEditor}},[[635,0]]]);
//# sourceMappingURL=tabs-pane-0a560595.js.map