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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[30],{10:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},12:function(e,t){e.exports=wp.blocks},16:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},18:function(e,t,r){var o,n=r(16);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)&&r.length){var s=a.apply(null,r);s&&e.push(s)}else if("object"===o)for(var i in r)c.call(r,i)&&r[i]&&e.push(i)}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):"object"===n(r(19))&&r(19)?void 0===(o=function(){return a}.apply(t,[]))||(e.exports=o):window.classNames=a}()},19:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=wp.i18n},25:function(e,t,r){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},296:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/taxonomy-tree","category":"layout","attributes":{"subHeading":{"type":"string"}},"styles":[{"name":"standard","label":"Standard","isDefault":true},{"name":"alt","label":"Alternate"}],"supports":{"html":false}}')},3:function(e,t){e.exports=wp.element},637:function(e,t,r){r(25),e.exports=r(678)},638:function(e,t,r){},678:function(e,t,r){"use strict";r.r(t);var o=r(10),n=r(2),c=r(12),a=r(296),s=r(18),i=r.n(s),l=(r(3),r(7)),u=["prc-block/menu-link","prc-block/taxonomy-tree-more"],p=function(e){var t=e.attributes,r=e.setAttributes,o=t.subHeading,c=t.className,a=Object(l.useBlockProps)({className:i()(c)}),s=void 0!==c&&c.includes("is-style-alt"),p=i()({"ui sub header":s}),b=Object(l.__experimentalUseInnerBlocksProps)({className:i()("ui list")},{allowedBlocks:u,orientation:"vertical",templateLock:!1,renderAppender:l.InnerBlocks.ButtonBlockAppender});return React.createElement("div",a,React.createElement(l.RichText,{tagName:s?"div":"h3",className:p,identifier:"label",value:o,onChange:function(e){return r({subHeading:e})},"aria-label":Object(n.__)("Subheading text"),placeholder:Object(n.__)("Key Topics"),keepPlaceholderOnFocus:!0,withoutInteractiveFormatting:!0,allowedFormats:[]}),React.createElement("div",b))},b=function(){return React.createElement(l.InnerBlocks.Content,null)};r(638);function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d=a.name,m={title:Object(n.__)("Tree List"),description:"A tree list that can be expanded.",category:"layout",icon:"networking",keywords:[Object(n.__)("Taxonomy Tree"),Object(n.__)("Taxonomies"),Object(n.__)("Tree")],edit:p,save:b};Object(c.registerBlockType)(d,y(y({},a),m))},7:function(e,t){e.exports=wp.blockEditor}},[[637,0]]]);
//# sourceMappingURL=taxonomy-tree-f2a291d7.js.map