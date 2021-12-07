/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.0.0
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[37],{10:function(t,e){t.exports=window.wp.blocks},12:function(t,e){t.exports=window.wp.data},13:function(t,e,o){"use strict";function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}o.d(e,"a",(function(){return r}))},14:function(t,e){function o(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(t.exports=o=function(t){return typeof t},t.exports.default=t.exports,t.exports.__esModule=!0):(t.exports=o=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.default=t.exports,t.exports.__esModule=!0),o(e)}t.exports=o,t.exports.default=t.exports,t.exports.__esModule=!0},15:function(t,e,o){var r,n=o(14);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var o=arguments[e];if(o){var r=n(o);if("string"===r||"number"===r)t.push(o);else if(Array.isArray(o)){if(o.length){var l=i.apply(null,o);l&&t.push(l)}}else if("object"===r)if(o.toString===Object.prototype.toString)for(var s in o)c.call(o,s)&&o[s]&&t.push(s);else t.push(o.toString())}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===n(o(18))&&o(18)?void 0===(r=function(){return i}.apply(e,[]))||(t.exports=r):window.classNames=i}()},18:function(t,e){(function(e){t.exports=e}).call(this,{})},193:function(t,e,o){"use strict";var r=o(6),n=o(4),c=o(12),i=o(3);e.a=function(t){var e=t.vertical,o=t.controllerClientId,l=Object(c.useDispatch)("core/block-editor").updateBlockAttributes;return React.createElement(r.InspectorControls,null,React.createElement(n.PanelBody,{title:Object(i.__)("Tab Controller Settings")},React.createElement(n.ToggleControl,{label:"Vertical Orientation",checked:e,onChange:function(){l(o,{vertical:!e})}})))}},24:function(t,e,o){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},3:function(t,e){t.exports=window.wp.i18n},315:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs-menu","category":"layout","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/tabs"],"usesContext":["prc-block/tabs-vertical","prc-block/tabs-style"]}')},4:function(t,e){t.exports=window.wp.components},6:function(t,e){t.exports=window.wp.blockEditor},662:function(t,e,o){o(24),t.exports=o(714)},714:function(t,e,o){"use strict";o.r(e);var r=o(13),n=o(10),c=o(3),i=o(315),l=o(15),s=o.n(l),a=o(6),p=o(12),u=o(193),b=["prc-block/tabs-menu-item"],f=[["prc-block/tabs-menu-item",{}]],y=function(t){var e=t.className,o=t.clientId,r=t.context,n=r["prc-block/tabs-vertical"],c=r["prc-block/tabs-style"],i=Object(p.useSelect)((function(t){return t("core/block-editor").getBlockRootClientId(o)}),[o]),l=Object(a.useBlockProps)({className:s()(e,{"column four wide":n}),style:{marginBottom:n||"is-style-tabular"!==c?null:"-1px!important"}}),y=Object(a.__experimentalUseInnerBlocksProps)({className:s()("ui fluid menu",{vertical:n,pointing:"is-style-pointing"===c,secondary:"is-style-secondary"===c,tabular:"is-style-tabular"===c,text:"is-style-text"===c})},{allowedBlocks:b,orientation:n?"vertical":"horizontal",template:f,templateLock:!1});return React.createElement("div",l,React.createElement(u.a,{vertical:n,controllerClientId:i}),React.createElement("div",y))},d=function(){return React.createElement(a.InnerBlocks.Content,null)};function m(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function w(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?m(Object(o),!0).forEach((function(e){Object(r.a)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):m(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var k=i.name,O={title:Object(c.__)("Menu"),description:Object(c.__)("A sub block of Topic Index - Condensed View, this block controls the left sidebar menu."),edit:y,save:d};Object(n.registerBlockType)(k,w(w({},i),O))}},[[662,0]]]);
//# sourceMappingURL=tabs-menu-d8bcdd8c.js.map