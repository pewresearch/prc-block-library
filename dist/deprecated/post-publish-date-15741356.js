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
(window.wpackioprcBlocksLibrarydeprecatedJsonp=window.wpackioprcBlocksLibrarydeprecatedJsonp||[]).push([[2],[function(t,e){t.exports=window.wp.i18n},function(t,e){t.exports=window.wp.element},function(t,e){t.exports=window.wp.blockEditor},function(t,e){t.exports=window.wp.blocks},,function(t,e,o){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},function(t,e,o){"use strict";function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}o.d(e,"a",(function(){return r}))},function(t,e){t.exports=window.wp.data},,,function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/post-publish-date","category":"layout","attributes":{"asItem":{"type":"boolean"}},"supports":{"html":false,"multiple":false}}')},,function(t,e){(function(e){t.exports=e}).call(this,{})},,,function(t,e,o){var r,n=o(19);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var o=arguments[e];if(o){var r=n(o);if("string"===r||"number"===r)t.push(o);else if(Array.isArray(o)){if(o.length){var s=i.apply(null,o);s&&t.push(s)}}else if("object"===r)if(o.toString===Object.prototype.toString)for(var p in o)c.call(o,p)&&o[p]&&t.push(p);else t.push(o.toString())}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===n(o(12))&&o(12)?void 0===(r=function(){return i}.apply(e,[]))||(t.exports=r):window.classNames=i}()},function(t,e){t.exports=moment},,function(t,e,o){o(5),t.exports=o(22)},function(t,e){function o(e){return t.exports=o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,o(e)}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},,,function(t,e,o){"use strict";o.r(e);var r=o(6),n=o(3),c=o(0),i=o(10),s=o(1),p=o(7),u=o(2),a=o(15),l=o.n(a),f=o(16),b=function(t){var e=t.attributes,o=t.className,r=t.clientId,n=t.setAttributes,c=e.asItem,i=Object(p.useSelect)((function(t){var e=new Date(t("core/editor").getEditedPostAttribute("date")).toString(),o=t("core/block-editor").getBlockRootClientId(r);return{postDate:f(e).format("MMMM D, YYYY"),rootBlock:t("core/block-editor").getBlockName(o)}}),[r]),a=i.postDate,b=i.rootBlock,d=Object(u.useBlockProps)({className:l()(o,"meta",{item:c})});return Object(s.useEffect)((function(){n({asItem:"prc-block/menu"===b})}),[b]),React.createElement("div",d,a)},d=function(){return React.createElement(s.Fragment,null)};function y(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function w(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?y(Object(o),!0).forEach((function(e){Object(r.a)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):y(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var m=i.name,O={title:Object(c.__)("PRC Post Publish Date"),description:Object(c.__)("The post published date, useful when building out post headers."),edit:b,save:d};Object(n.registerBlockType)(m,w(w({},i),O))}],[[18,0]]]);
//# sourceMappingURL=post-publish-date-15741356.js.map