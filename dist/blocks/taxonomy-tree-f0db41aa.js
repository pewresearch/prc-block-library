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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[25],{10:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},13:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},14:function(e,t,r){var o,n=r(13);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)&&r.length){var s=i.apply(null,r);s&&e.push(s)}else if("object"===o)for(var a in r)c.call(r,a)&&r[a]&&e.push(a)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===n(r(17))&&r(17)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},17:function(e,t){(function(t){e.exports=t}).call(this,{})},18:function(e,t,r){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},2:function(e,t){e.exports=wp.element},245:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/taxonomy-tree","category":"layout","attributes":{"subHeading":{"type":"string"}},"supports":{"html":false}}')},3:function(e,t){e.exports=wp.i18n},593:function(e,t,r){r(18),e.exports=r(627)},594:function(e,t,r){},6:function(e,t){e.exports=wp.blockEditor},627:function(e,t,r){"use strict";r.r(t);var o=r(10),n=r(3),c=r(8),i=r(245),s=r(14),a=r.n(s),l=(r(2),r(6)),p=["prc-block/menu-link","prc-block/taxonomy-tree-more"],u=function(e){var t=e.attributes,r=e.className,o=e.setAttributes,c=t.subHeading,i=Object(l.useBlockProps)({className:a()(r)}),s=Object(l.__experimentalUseInnerBlocksProps)({className:a()("ui list")},{allowedBlocks:p,orientation:"vertical",templateLock:!1,renderAppender:l.InnerBlocks.ButtonBlockAppender});return React.createElement("div",i,React.createElement(l.RichText,{className:"ui sub header",identifier:"label",value:c,onChange:function(e){return o({subHeading:e})},"aria-label":Object(n.__)("Subheading text"),placeholder:Object(n.__)("Key Topics"),keepPlaceholderOnFocus:!0,withoutInteractiveFormatting:!0,allowedFormats:[]}),React.createElement("div",s))},b=function(){return React.createElement(l.InnerBlocks.Content,null)};r(594);function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d=i.name,m={title:Object(n.__)("Tree List"),description:"A tree list that can be expanded.",category:"layout",icon:"networking",keywords:[Object(n.__)("Taxonomy Tree"),Object(n.__)("Taxonomies"),Object(n.__)("Tree")],edit:u,save:b};Object(c.registerBlockType)(d,y(y({},i),m))},8:function(e,t){e.exports=wp.blocks}},[[593,0]]]);
//# sourceMappingURL=taxonomy-tree-f0db41aa.js.map