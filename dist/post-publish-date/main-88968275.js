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
(window["wpackioprcBlocksLibrarypost-publish-dateJsonp"]=window["wpackioprcBlocksLibrarypost-publish-dateJsonp"]||[]).push([[0],[function(t,e){t.exports=wp.blockEditor},function(t,e,o){var r,n=o(11);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var s={}.hasOwnProperty;function c(){for(var t=[],e=0;e<arguments.length;e++){var o=arguments[e];if(o){var r=n(o);if("string"===r||"number"===r)t.push(o);else if(Array.isArray(o)){if(o.length){var i=c.apply(null,o);i&&t.push(i)}}else if("object"===r)if(o.toString===Object.prototype.toString)for(var a in o)s.call(o,a)&&o[a]&&t.push(a);else t.push(o.toString())}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):"object"===n(o(4))&&o(4)?void 0===(r=function(){return c}.apply(e,[]))||(t.exports=r):window.classNames=c}()},function(t,e){t.exports=wp.i18n},function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/post-publish-date","category":"layout","attributes":{"date":{"type":"string"},"asItem":{"type":"boolean"}},"supports":{"html":false,"multiple":false}}')},function(t,e){(function(e){t.exports=e}).call(this,{})},function(t,e){t.exports=wp.blocks},function(t,e){t.exports=wp.element},function(t,e){t.exports=wp.data},function(t,e){t.exports=moment},function(t,e,o){o(10),t.exports=o(12)},function(t,e,o){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},function(t,e){function o(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(t.exports=o=function(t){return typeof t},t.exports.default=t.exports,t.exports.__esModule=!0):(t.exports=o=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.default=t.exports,t.exports.__esModule=!0),o(e)}t.exports=o,t.exports.default=t.exports,t.exports.__esModule=!0},function(t,e,o){"use strict";function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}o.r(e);var n=o(5),s=o(2),c=o(3),i=o(6),a=o(7),p=o(0),u=o(1),l=o.n(u),f=o(8),b=function(t){var e=t.attributes,o=t.className,r=t.clientId,n=t.setAttributes,s=e.date,c=e.asItem,u=Object(a.useSelect)((function(t){var e=new Date(t("core/editor").getEditedPostAttribute("date")).toString(),o=t("core/block-editor").getBlockRootClientId(r);return{postDate:f(e).format("MMMM D, YYYY"),rootBlock:t("core/block-editor").getBlockName(o)}}),[r]),b=u.postDate,d=u.rootBlock,y=Object(p.useBlockProps)({className:l()(o,"meta",{item:c})});return Object(i.useEffect)((function(){n({date:b,asItem:"prc-block/menu"===d})}),[b,d]),React.createElement("div",y,s)},d=function(t){var e=t.attributes,o=t.className,r=e.date,n=e.asItem,s=p.useBlockProps.save({className:l()(o,"meta",{item:n})});return React.createElement("div",s,r)};function y(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function m(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?y(Object(o),!0).forEach((function(e){r(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):y(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var O=c.name,w={title:Object(s.__)("PRC Post Publish Date"),description:Object(s.__)("The post published date, useful when building out post headers."),edit:b,save:d};Object(n.registerBlockType)(O,m(m({},c),w))}],[[9,1]]]);
//# sourceMappingURL=main-88968275.js.map