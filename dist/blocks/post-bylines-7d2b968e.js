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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[39],{11:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},12:function(t,e,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},15:function(t,e){function n(e){return t.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,n(e)}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports},16:function(t,e){t.exports=window.wp.primitives},17:function(t,e,n){var r,o=n(15);
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function a(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var r=o(n);if("string"===r||"number"===r)t.push(n);else if(Array.isArray(n)){if(n.length){var c=a.apply(null,n);c&&t.push(c)}}else if("object"===r){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){t.push(n.toString());continue}for(var u in n)i.call(n,u)&&n[u]&&t.push(u)}}}return t.join(" ")}t.exports?(a.default=a,t.exports=a):"object"===o(n(19))&&n(19)?void 0===(r=function(){return a}.apply(e,[]))||(t.exports=r):window.classNames=a}()},18:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n(23);var o=n(20),i=n(24);function a(t,e){return Object(r.a)(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);a=!0);}catch(t){c=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(t,e)||Object(o.a)(t,e)||Object(i.a)()}},19:function(t,e){(function(e){t.exports=e}).call(this,{})},2:function(t,e){t.exports=window.wp.i18n},20:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(11);function o(t,e){if(t){if("string"==typeof t)return Object(r.a)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(t,e):void 0}}},23:function(t,e,n){"use strict";function r(t){if(Array.isArray(t))return t}n.d(e,"a",(function(){return r}))},24:function(t,e,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(e,"a",(function(){return r}))},29:function(t,e){t.exports=window.wp.apiFetch},365:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/post-bylines","title":"Post Bylines","description":"Displays the bylines for a post, page, or any other content-type. Useful when building out post headers.","category":"layout","attributes":{"textAlign":{"type":"string"}},"supports":{"html":false,"multiple":false,"color":{"text":true,"background":true},"typography":{"fontSize":true,"fontAppearance":false,"__experimentalFontStyle":false,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalLetterSpacing":true,"__experimentalTextTransform":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalLetterSpacing":true,"__experimentalTextTransform":true,"__experimentalFontFamily":true}}}}')},4:function(t,e){t.exports=window.wp.element},43:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n(11);var o=n(44),i=n(20);function a(t){return function(t){if(Array.isArray(t))return Object(r.a)(t)}(t)||Object(o.a)(t)||Object(i.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},44:function(t,e,n){"use strict";function r(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}n.d(e,"a",(function(){return r}))},5:function(t,e){t.exports=window.wp.blockEditor},7:function(t,e){t.exports=window.wp.blocks},8:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return r}))},9:function(t,e){t.exports=window.wp.data},926:function(t,e,n){n(12),t.exports=n(989)},989:function(t,e,n){"use strict";n.r(e);var r=n(8),o=n(7),i=(n(2),n(4)),a=n(16),c=Object(i.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(i.createElement)(a.Path,{d:"M15.5 9.5a1 1 0 100-2 1 1 0 000 2zm0 1.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm-2.25 6v-2a2.75 2.75 0 00-2.75-2.75h-4A2.75 2.75 0 003.75 15v2h1.5v-2c0-.69.56-1.25 1.25-1.25h4c.69 0 1.25.56 1.25 1.25v2h1.5zm7-2v2h-1.5v-2c0-.69-.56-1.25-1.25-1.25H15v-1.5h2.5A2.75 2.75 0 0120.25 15zM9.5 8.5a1 1 0 11-2 0 1 1 0 012 0zm1.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",fillRule:"evenodd"})),u=n(365),l=n(43),s=n(18),f=n(17),p=n.n(f),b=n(9),y=n(5),m=n(29),d=n.n(m),w=function(t){var e=t.attributes,n=t.className,o=t.clientId,a=t.setAttributes,c=e.textAlign,u=Object(i.useState)([]),f=Object(s.a)(u,2),m=f[0],w=f[1],v=Object(b.useSelect)((function(t){return t("core/editor").getEditedPostAttribute("bylines")}),[o]),g=Object(y.useBlockProps)({className:p()(n,Object(r.a)({},"has-text-align-".concat(c),c))}),h=function(){return Promise.all(v.map((function(t){return function(t){return new Promise((function(e){d()({path:"/wp/v2/bylines/".concat(t)}).then((function(t){var n=t.name;return e(n)}))}))}(t)})))};return Object(i.useEffect)((function(){v&&v.length>0?h().then((function(t){console.log("bylines data...",t),w(Object(l.a)(t))})):w(["Jane Doe","John Doe"])}),[v]),React.createElement(i.Fragment,null,React.createElement(y.BlockControls,null,React.createElement(y.AlignmentControl,{value:c,onChange:function(t){a({textAlign:t})}})),React.createElement("div",g,"By ",m.map((function(t,e){var n=m.length;return 1<n&&n===e+1?React.createElement(i.Fragment,null,"and ",t):1<n&&n!==e+1?React.createElement(i.Fragment,null,t,", "):React.createElement(i.Fragment,null,t)}))))},v=function(){var t=y.useBlockProps.save();return React.createElement(i.Fragment,t)};function g(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function h(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?g(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var O=u.name,x={icon:c,edit:w,save:v};Object(o.registerBlockType)(O,h(h({},x),u))}},[[926,0]]]);
//# sourceMappingURL=post-bylines-7d2b968e.js.map