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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[23],{10:function(t,e){t.exports=wp.blocks},12:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},13:function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=r=function(t){return typeof t}:t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(e)}t.exports=r},14:function(t,e,r){var n,o=r(13);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var n=o(r);if("string"===n||"number"===n)t.push(r);else if(Array.isArray(r)&&r.length){var a=i.apply(null,r);a&&t.push(a)}else if("object"===n)for(var u in r)c.call(r,u)&&r[u]&&t.push(u)}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===o(r(17))&&r(17)?void 0===(n=function(){return i}.apply(e,[]))||(t.exports=n):window.classNames=i}()},17:function(t,e){(function(e){t.exports=e}).call(this,{})},18:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(33);var o=r(31),c=r(34);function i(t,e){return Object(n.a)(t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,c=void 0;try{for(var i,a=t[Symbol.iterator]();!(n=(i=a.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(t){o=!0,c=t}finally{try{n||null==a.return||a.return()}finally{if(o)throw c}}return r}}(t,e)||Object(o.a)(t,e)||Object(c.a)()}},19:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},2:function(t,e){t.exports=wp.element},21:function(t,e,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},291:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/taxonomy-tree-more","category":"layout","parent":"prc-block/taxonomy-tree","supports":{"html":false}}')},3:function(t,e){t.exports=wp.i18n},31:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(19);function o(t,e){if(t){if("string"==typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},33:function(t,e,r){"use strict";function n(t){if(Array.isArray(t))return t}r.d(e,"a",(function(){return n}))},34:function(t,e,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(e,"a",(function(){return n}))},4:function(t,e){t.exports=wp.components},5:function(t,e){t.exports=wp.blockEditor},761:function(t,e,r){r(21),t.exports=r(794)},794:function(t,e,r){"use strict";r.r(e);var n=r(12),o=r(3),c=r(10),i=r(291),a=r(18),u=r(14),s=r.n(u),l=r(2),p=r(5),f=r(4),b=["prc-block/menu-link"],y=function(t){var e=t.className,r=Object(l.useState)(!1),n=Object(a.a)(r,2),o=n[0],c=n[1],i=Object(p.useBlockProps)({className:s()(e)}),u=Object(p.__experimentalUseInnerBlocksProps)({},{allowedBlocks:b,orientation:"vertical",templateLock:!1});return React.createElement("div",i,React.createElement(f.Button,{isLink:!0,onClick:function(){return c(!o)}},o?"- Less":"+ More"),o&&React.createElement("div",u))},m=function(){return React.createElement(p.InnerBlocks.Content,null)};function O(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function v(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?O(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var d=i.name,j={title:Object(o.__)("Taxonomy Tree More"),description:"A collapsible list of more content for the Taxonomy Tree.",category:"layout",edit:y,save:m};Object(c.registerBlockType)(d,v(v({},i),j))}},[[761,0]]]);
//# sourceMappingURL=taxonomy-tree-more-3895c06e.js.map