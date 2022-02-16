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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[28],{11:function(t,e){t.exports=window.wp.blocks},114:function(t,e){t.exports=moment},13:function(t,e){t.exports=window.wp.data},14:function(t,e,o){"use strict";function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}o.d(e,"a",(function(){return r}))},17:function(t,e,o){var r,n=o(18);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var o=arguments[e];if(o){var r=n(o);if("string"===r||"number"===r)t.push(o);else if(Array.isArray(o)){if(o.length){var s=i.apply(null,o);s&&t.push(s)}}else if("object"===r)if(o.toString===Object.prototype.toString)for(var p in o)c.call(o,p)&&o[p]&&t.push(p);else t.push(o.toString())}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===n(o(21))&&o(21)?void 0===(r=function(){return i}.apply(e,[]))||(t.exports=r):window.classNames=i}()},18:function(t,e){function o(e){return t.exports=o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,o(e)}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},2:function(t,e){t.exports=window.wp.i18n},21:function(t,e){(function(e){t.exports=e}).call(this,{})},25:function(t,e,o){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},3:function(t,e){t.exports=window.wp.element},330:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/post-publish-date","category":"layout","attributes":{"asItem":{"type":"boolean"}},"supports":{"html":false,"multiple":false}}')},6:function(t,e){t.exports=window.wp.blockEditor},905:function(t,e,o){o(25),t.exports=o(989)},989:function(t,e,o){"use strict";o.r(e);var r=o(14),n=o(11),c=o(2),i=o(330),s=o(3),p=o(13),u=o(6),a=o(17),l=o.n(a),f=o(114),b=function(t){var e=t.attributes,o=t.className,r=t.clientId,n=t.setAttributes,c=e.asItem,i=Object(p.useSelect)((function(t){var e=new Date(t("core/editor").getEditedPostAttribute("date")).toString(),o=t("core/block-editor").getBlockRootClientId(r);return{postDate:f(e).format("MMMM D, YYYY"),rootBlock:t("core/block-editor").getBlockName(o)}}),[r]),a=i.postDate,b=i.rootBlock,d=Object(u.useBlockProps)({className:l()(o,"meta",{item:c})});return Object(s.useEffect)((function(){n({asItem:"prc-block/menu"===b})}),[b]),React.createElement("div",d,a)},d=function(){return React.createElement(s.Fragment,null)};function y(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function w(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?y(Object(o),!0).forEach((function(e){Object(r.a)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):y(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var m=i.name,O={title:Object(c.__)("PRC Post Publish Date"),description:Object(c.__)("The post published date, useful when building out post headers."),edit:b,save:d};Object(n.registerBlockType)(m,w(w({},i),O))}},[[905,0]]]);
//# sourceMappingURL=post-publish-date-ac6df108.js.map