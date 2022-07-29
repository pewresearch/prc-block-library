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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[62],{10:function(t,e){t.exports=window.wp.data},1010:function(t,e,o){o(22),t.exports=o(1084)},1084:function(t,e,o){"use strict";o.r(e);var r=o(9),n=o(8),c=o(2),i=o(420),l=o(16),s=o.n(l),a=o(5),u=o(10),p=o(268),b=["prc-block/tabs-menu-item"],f=[["prc-block/tabs-menu-item",{}]],y=function(t){var e=t.className,o=t.clientId,r=t.context,n=r["prc-block/tabs-vertical"],c=r["prc-block/tabs-style"],i=Object(u.useSelect)((function(t){return t("core/block-editor").getBlockRootClientId(o)}),[o]),l=Object(a.useBlockProps)({className:s()(e,{"column four wide":n}),style:{marginBottom:n||"is-style-tabular"!==c?null:"-1px!important"}}),y=Object(a.useInnerBlocksProps)({className:s()("ui fluid menu",{vertical:n,pointing:"is-style-pointing"===c,secondary:"is-style-secondary"===c,tabular:"is-style-tabular"===c,text:"is-style-text"===c})},{allowedBlocks:b,orientation:n?"vertical":"horizontal",template:f,templateLock:!1});return React.createElement("div",l,React.createElement(p.a,{vertical:n,controllerClientId:i}),React.createElement("div",y))},d=function(){return React.createElement(a.InnerBlocks.Content,null)};function m(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function w(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?m(Object(o),!0).forEach((function(e){Object(r.a)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):m(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var k=i.name,O={title:Object(c.__)("Menu"),description:Object(c.__)("A sub block of Topic Index - Condensed View, this block controls the left sidebar menu."),edit:y,save:d};Object(n.registerBlockType)(k,w(w({},i),O))},15:function(t,e){function o(e){return t.exports=o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,o(e)}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},16:function(t,e,o){var r,n=o(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var o=arguments[e];if(o){var r=n(o);if("string"===r||"number"===r)t.push(o);else if(Array.isArray(o)){if(o.length){var l=i.apply(null,o);l&&t.push(l)}}else if("object"===r)if(o.toString===Object.prototype.toString)for(var s in o)c.call(o,s)&&o[s]&&t.push(s);else t.push(o.toString())}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===n(o(17))&&o(17)?void 0===(r=function(){return i}.apply(e,[]))||(t.exports=r):window.classNames=i}()},17:function(t,e){(function(e){t.exports=e}).call(this,{})},2:function(t,e){t.exports=window.wp.i18n},22:function(t,e,o){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},268:function(t,e,o){"use strict";var r=o(5),n=o(3),c=o(10),i=o(2);e.a=function(t){var e=t.vertical,o=t.controllerClientId,l=Object(c.useDispatch)("core/block-editor").updateBlockAttributes;return React.createElement(r.InspectorControls,null,React.createElement(n.PanelBody,{title:Object(i.__)("Tab Controller Settings")},React.createElement(n.ToggleControl,{label:"Vertical Orientation",checked:e,onChange:function(){l(o,{vertical:!e})}})))}},3:function(t,e){t.exports=window.wp.components},420:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs-menu","category":"layout","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/tabs"],"usesContext":["prc-block/tabs-vertical","prc-block/tabs-style"]}')},5:function(t,e){t.exports=window.wp.blockEditor},8:function(t,e){t.exports=window.wp.blocks},9:function(t,e,o){"use strict";function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}o.d(e,"a",(function(){return r}))}},[[1010,0]]]);
//# sourceMappingURL=tabs-menu-f5bc2863.js.map