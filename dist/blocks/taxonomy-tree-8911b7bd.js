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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[69],{13:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},16:function(e,t,r){var o,n=r(20);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var a=i.apply(null,r);a&&e.push(a)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var s in r)c.call(r,s)&&r[s]&&e.push(s);else e.push(r.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===n(r(18))&&r(18)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},18:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},346:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/taxonomy-tree","category":"layout","attributes":{"subHeading":{"type":"string"}},"styles":[{"name":"standard","label":"Standard","isDefault":true},{"name":"alt","label":"Alternate"}],"supports":{"html":false,"inserter":false}}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},742:function(e,t,r){r(13),e.exports=r(799)},799:function(e,t,r){"use strict";r.r(t);var o=r(8),n=r(2),c=r(7),i=r(346),a=r(16),s=r.n(a),l=(r(4),r(5)),u=["prc-block/menu-link","prc-block/taxonomy-tree-more"],p=function(e){var t=e.attributes,r=e.setAttributes,o=t.subHeading,c=t.className,i=Object(l.useBlockProps)({className:s()(c)}),a=void 0!==c&&c.includes("is-style-alt"),p=s()({"ui sub header":a}),b=Object(l.useInnerBlocksProps)({className:s()("ui list")},{allowedBlocks:u,orientation:"vertical",templateLock:!1,renderAppender:l.InnerBlocks.ButtonBlockAppender});return React.createElement("div",i,React.createElement(l.RichText,{tagName:a?"div":"h3",className:p,identifier:"label",value:o,onChange:function(e){return r({subHeading:e})},"aria-label":Object(n.__)("Subheading text"),placeholder:Object(n.__)("Key Topics"),keepPlaceholderOnFocus:!0,withoutInteractiveFormatting:!0,allowedFormats:[]}),React.createElement("div",b))},b=function(){return React.createElement(l.InnerBlocks.Content,null)};function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var y=i.name,m={title:Object(n.__)("DEPRECATED: Tree List"),description:"DEPRECATED: Use core/navigation block and submenu blocks instead.",category:"layout",icon:"networking",keywords:[Object(n.__)("Taxonomy Tree"),Object(n.__)("Taxonomies"),Object(n.__)("Tree")],edit:p,save:b};Object(c.registerBlockType)(y,d(d({},i),m))},8:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))}},[[742,0]]]);
//# sourceMappingURL=taxonomy-tree-8911b7bd.js.map