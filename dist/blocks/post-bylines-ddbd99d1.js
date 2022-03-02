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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[30],{10:function(t,e){t.exports=window.wp.blocks},1001:function(t,e,n){"use strict";n.r(e);var r=n(14),o=n(10),c=(n(2),n(431)),i=n(335),a=n(65),u=n(22),l=n(17),s=n.n(l),f=n(4),p=n(12),b=n(5),y=n(29),m=n.n(y),d=function(t){var e=t.attributes,n=t.className,o=t.clientId,c=t.setAttributes,i=e.textAlign,l=Object(f.useState)([]),y=Object(u.a)(l,2),d=y[0],w=y[1],v=Object(p.useSelect)((function(t){return t("core/editor").getEditedPostAttribute("bylines")}),[o]),h=Object(b.useBlockProps)({className:s()(n,Object(r.a)({"bylines meta":!0},"has-text-align-".concat(i),i))}),g=function(){return Promise.all(v.map((function(t){return function(t){return new Promise((function(e){m()({path:"/wp/v2/bylines/".concat(t)}).then((function(t){var n=t.name;return e(n)}))}))}(t)})))};return Object(f.useEffect)((function(){v&&v.length>0?g().then((function(t){console.log("bylines data...",t),w(Object(a.a)(t))})):w(["Jane Doe","John Doe"])}),[v]),React.createElement(f.Fragment,null,React.createElement(b.BlockControls,null,React.createElement(b.AlignmentControl,{value:i,onChange:function(t){c({textAlign:t})}})),React.createElement("div",h,"By ",d.map((function(t,e){var n=d.length;return 1<n&&n===e+1?React.createElement(f.Fragment,null,"and ",t):1<n&&n!==e+1?React.createElement(f.Fragment,null,t,", "):React.createElement(f.Fragment,null,t)}))))},w=function(){var t=b.useBlockProps.save();return React.createElement(f.Fragment,t)};function v(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function h(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?v(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var g=i.name,O={icon:c.a,edit:d,save:w};Object(o.registerBlockType)(g,h(h({},O),i))},12:function(t,e){t.exports=window.wp.data},14:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return r}))},17:function(t,e,n){var r,o=n(19);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var r=o(n);if("string"===r||"number"===r)t.push(n);else if(Array.isArray(n)){if(n.length){var a=i.apply(null,n);a&&t.push(a)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var u in n)c.call(n,u)&&n[u]&&t.push(u);else t.push(n.toString())}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===o(n(20))&&n(20)?void 0===(r=function(){return i}.apply(e,[]))||(t.exports=r):window.classNames=i}()},19:function(t,e){function n(e){return t.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,n(e)}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports},2:function(t,e){t.exports=window.wp.i18n},20:function(t,e){(function(e){t.exports=e}).call(this,{})},21:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},22:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(30);var o=n(27),c=n(31);function i(t,e){return Object(r.a)(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,c=[],i=!0,a=!1;try{for(n=n.call(t);!(i=(r=n.next()).done)&&(c.push(r.value),!e||c.length!==e);i=!0);}catch(t){a=!0,o=t}finally{try{i||null==n.return||n.return()}finally{if(a)throw o}}return c}}(t,e)||Object(o.a)(t,e)||Object(c.a)()}},24:function(t,e){t.exports=window.wp.primitives},25:function(t,e,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},27:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(21);function o(t,e){if(t){if("string"==typeof t)return Object(r.a)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(t,e):void 0}}},29:function(t,e){t.exports=window.wp.apiFetch},30:function(t,e,n){"use strict";function r(t){if(Array.isArray(t))return t}n.d(e,"a",(function(){return r}))},31:function(t,e,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(e,"a",(function(){return r}))},335:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/post-bylines","title":"Post Bylines","description":"Displays the bylines for a post, page, or any other content-type. Useful when building out post headers.","category":"layout","attributes":{"textAlign":{"type":"string"}},"supports":{"html":false,"multiple":false,"color":{"text":true,"background":true}}}')},4:function(t,e){t.exports=window.wp.element},431:function(t,e,n){"use strict";var r=n(4),o=n(24),c=Object(r.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(r.createElement)(o.Path,{d:"M15.5 9.5a1 1 0 100-2 1 1 0 000 2zm0 1.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm-2.25 6v-2a2.75 2.75 0 00-2.75-2.75h-4A2.75 2.75 0 003.75 15v2h1.5v-2c0-.69.56-1.25 1.25-1.25h4c.69 0 1.25.56 1.25 1.25v2h1.5zm7-2v2h-1.5v-2c0-.69-.56-1.25-1.25-1.25H15v-1.5h2.5A2.75 2.75 0 0120.25 15zM9.5 8.5a1 1 0 11-2 0 1 1 0 012 0zm1.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",fillRule:"evenodd"}));e.a=c},5:function(t,e){t.exports=window.wp.blockEditor},65:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(21);var o=n(68),c=n(27);function i(t){return function(t){if(Array.isArray(t))return Object(r.a)(t)}(t)||Object(o.a)(t)||Object(c.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},68:function(t,e,n){"use strict";function r(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}n.d(e,"a",(function(){return r}))},913:function(t,e,n){n(25),t.exports=n(1001)}},[[913,0]]]);
//# sourceMappingURL=post-bylines-ddbd99d1.js.map