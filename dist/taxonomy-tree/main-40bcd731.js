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
(window["wpackioprcBlocksLibrarytaxonomy-treeJsonp"]=window["wpackioprcBlocksLibrarytaxonomy-treeJsonp"]||[]).push([[0],[function(e,t){e.exports=wp.i18n},function(e,t){e.exports=wp.blockEditor},function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/taxonomy-tree","category":"layout","attributes":{"subHeading":{"type":"string"}},"supports":{"reusable":false,"html":false}}')},function(e,t,r){var n,o=r(8);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)&&r.length){var a=i.apply(null,r);a&&e.push(a)}else if("object"===n)for(var s in r)c.call(r,s)&&r[s]&&e.push(s)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===o(r(4))&&r(4)?void 0===(n=function(){return i}.apply(t,[]))||(e.exports=n):window.classNames=i}()},function(e,t){(function(t){e.exports=t}).call(this,{})},function(e,t){e.exports=wp.blocks},function(e,t,r){r(7),e.exports=r(11)},function(e,t,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=r=function(e){return typeof e}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(t)}e.exports=r},function(e,t){e.exports=wp.element},function(e,t,r){},function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.r(t);var o=r(0),c=r(5),i=r(2),a=r(3),s=r.n(a),l=(r(9),r(1)),p=["prc-block/menu-link"],u=function(e){var t=e.attributes,r=e.className,n=e.setAttributes,c=t.subHeading,i=Object(l.useBlockProps)({className:s()(r)}),a=Object(l.__experimentalUseInnerBlocksProps)({className:s()("ui list")},{allowedBlocks:p,orientation:"vertical",templateLock:!1,renderAppender:l.InnerBlocks.ButtonBlockAppender});return React.createElement("div",i,React.createElement(l.RichText,{identifier:"label",value:c,onChange:function(e){return n({subHeading:e})},"aria-label":Object(o.__)("Subheading text"),placeholder:Object(o.__)("Key Topics"),keepPlaceholderOnFocus:!0,withoutInteractiveFormatting:!0,allowedFormats:[]}),React.createElement("div",a))},b=function(){return React.createElement(l.InnerBlocks.Content,null)};r(10);function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m=i.name,d={title:Object(o.__)("Tree List"),description:"A tree list that can be expanded.",category:"layout",icon:"networking",keywords:[Object(o.__)("Taxonomy Tree"),Object(o.__)("Taxonomies"),Object(o.__)("Tree")],edit:u,save:b};Object(c.registerBlockType)(m,y(y({},i),d))}],[[6,1]]]);
//# sourceMappingURL=main-40bcd731.js.map