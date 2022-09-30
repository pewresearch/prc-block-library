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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[65],{1033:function(e,t,r){"use strict";r.r(t);var n=r(8),o=r(2),c=r(7),i=r(406),a=r(13),s=r.n(a),l=(r(4),r(5)),u=["prc-block/menu-link","prc-block/taxonomy-tree-more"],p=function(e){var t=e.attributes,r=e.setAttributes,n=t.subHeading,c=t.className,i=Object(l.useBlockProps)({className:s()(c)}),a=void 0!==c&&c.includes("is-style-alt"),p=s()({"ui sub header":a}),b=Object(l.useInnerBlocksProps)({className:s()("ui list")},{allowedBlocks:u,orientation:"vertical",templateLock:!1,renderAppender:l.InnerBlocks.ButtonBlockAppender});return React.createElement("div",i,React.createElement(l.RichText,{tagName:a?"div":"h3",className:p,identifier:"label",value:n,onChange:function(e){return r({subHeading:e})},"aria-label":Object(o.__)("Subheading text"),placeholder:Object(o.__)("Key Topics"),keepPlaceholderOnFocus:!0,withoutInteractiveFormatting:!0,allowedFormats:[]}),React.createElement("div",b))},b=function(){return React.createElement(l.InnerBlocks.Content,null)};function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var y=i.name,m={title:Object(o.__)("DEPRECATED: Tree List"),description:"DEPRECATED: A tree list that can be expanded.",category:"layout",icon:"networking",keywords:[Object(o.__)("Taxonomy Tree"),Object(o.__)("Taxonomies"),Object(o.__)("Tree")],edit:p,save:b};Object(c.registerBlockType)(y,d(d({},i),m))},12:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},13:function(e,t,r){var n,o=r(12);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)){if(r.length){var a=i.apply(null,r);a&&e.push(a)}}else if("object"===n)if(r.toString===Object.prototype.toString)for(var s in r)c.call(r,s)&&r[s]&&e.push(s);else e.push(r.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===o(r(14))&&r(14)?void 0===(n=function(){return i}.apply(t,[]))||(e.exports=n):window.classNames=i}()},14:function(e,t){(function(t){e.exports=t}).call(this,{})},16:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},2:function(e,t){e.exports=window.wp.i18n},4:function(e,t){e.exports=window.wp.element},406:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/taxonomy-tree","category":"layout","attributes":{"subHeading":{"type":"string"}},"styles":[{"name":"standard","label":"Standard","isDefault":true},{"name":"alt","label":"Alternate"}],"supports":{"html":false,"inserter":false}}')},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},8:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},973:function(e,t,r){r(16),e.exports=r(1033)}},[[973,0]]]);
//# sourceMappingURL=taxonomy-tree-86227427.js.map