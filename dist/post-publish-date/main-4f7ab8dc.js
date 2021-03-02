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
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function s(){for(var t=[],e=0;e<arguments.length;e++){var o=arguments[e];if(o){var r=n(o);if("string"===r||"number"===r)t.push(o);else if(Array.isArray(o)&&o.length){var i=s.apply(null,o);i&&t.push(i)}else if("object"===r)for(var a in o)c.call(o,a)&&o[a]&&t.push(a)}}return t.join(" ")}t.exports?(s.default=s,t.exports=s):"object"===n(o(4))&&o(4)?void 0===(r=function(){return s}.apply(e,[]))||(t.exports=r):window.classNames=s}()},function(t,e){t.exports=wp.i18n},function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/post-publish-date","category":"layout","attributes":{"date":{"type":"string"},"asItem":{"type":"boolean"}},"supports":{"html":false,"multiple":false}}')},function(t,e){(function(e){t.exports=e}).call(this,{})},function(t,e){t.exports=wp.blocks},function(t,e){t.exports=wp.element},function(t,e){t.exports=wp.data},function(t,e){t.exports=moment},function(t,e,o){o(10),t.exports=o(12)},function(t,e,o){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},function(t,e){function o(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=o=function(t){return typeof t}:t.exports=o=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(e)}t.exports=o},function(t,e,o){"use strict";function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}o.r(e);var n=o(5),c=o(2),s=o(3),i=o(6),a=o(7),p=o(0),u=o(1),l=o.n(u),f=o(8),b=function(t){var e=t.attributes,o=t.className,r=t.clientId,n=t.setAttributes,c=e.date,s=e.asItem,u=Object(a.useSelect)((function(t){var e=new Date(t("core/editor").getEditedPostAttribute("date")).toString(),o=t("core/block-editor").getBlockRootClientId(r);return{postDate:f(e).format("MMMM D, YYYY"),rootBlock:t("core/block-editor").getBlockName(o)}}),[r]),b=u.postDate,y=u.rootBlock,m=Object(p.useBlockProps)({className:l()(o,"meta",{item:s})});return Object(i.useEffect)((function(){n({date:b,asItem:"prc-block/menu"===y})}),[b,y]),React.createElement("div",m,c)},y=function(t){var e=t.attributes,o=t.className,r=e.date,n=e.asItem,c=p.useBlockProps.save({className:l()(o,"meta",{item:n})});return React.createElement("div",c,r)};function m(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function d(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?m(Object(o),!0).forEach((function(e){r(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):m(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var w=s.name,O={title:Object(c.__)("PRC Post Publish Date"),description:Object(c.__)("The post published date, useful when building out post headers."),edit:b,save:y};Object(n.registerBlockType)(w,d(d({},s),O))}],[[9,1]]]);
//# sourceMappingURL=main-4f7ab8dc.js.map