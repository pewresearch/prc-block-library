/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.0.0
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[16],{14:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return r}))},15:function(t,e){t.exports=window.wp.data},19:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(28);var o=n(25),c=n(29);function i(t,e){return Object(r.a)(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,c=[],i=!0,a=!1;try{for(n=n.call(t);!(i=(r=n.next()).done)&&(c.push(r.value),!e||c.length!==e);i=!0);}catch(t){a=!0,o=t}finally{try{i||null==n.return||n.return()}finally{if(a)throw o}}return c}}(t,e)||Object(o.a)(t,e)||Object(c.a)()}},2:function(t,e){t.exports=window.wp.i18n},20:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},22:function(t,e,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},25:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(20);function o(t,e){if(t){if("string"==typeof t)return Object(r.a)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(t,e):void 0}}},275:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/post-bylines","category":"layout","supports":{"html":false,"multiple":false}}')},28:function(t,e,n){"use strict";function r(t){if(Array.isArray(t))return t}n.d(e,"a",(function(){return r}))},29:function(t,e,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(e,"a",(function(){return r}))},35:function(t,e){t.exports=window.wp.apiFetch},4:function(t,e){t.exports=window.wp.element},582:function(t,e,n){n(22),t.exports=n(663)},6:function(t,e){t.exports=window.wp.blockEditor},60:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(20);var o=n(64),c=n(25);function i(t){return function(t){if(Array.isArray(t))return Object(r.a)(t)}(t)||Object(o.a)(t)||Object(c.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},64:function(t,e,n){"use strict";function r(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}n.d(e,"a",(function(){return r}))},663:function(t,e,n){"use strict";n.r(e);var r=n(14),o=n(9),c=n(2),i=n(275),a=n(60),u=n(19),s=n(4),l=n(15),f=n(6),p=n(35),b=n.n(p),y=function(t){var e=t.className,n=t.clientId,r=Object(s.useState)([]),o=Object(u.a)(r,2),c=o[0],i=o[1],p=Object(l.useSelect)((function(t){return t("core/editor").getEditedPostAttribute("bylines")}),[n]),y=Object(f.useBlockProps)({className:"".concat(e," bylines meta")}),d=function(){return Promise.all(p.map((function(t){return function(t){return new Promise((function(e){b()({path:"/wp/v2/bylines/".concat(t)}).then((function(t){var n=t.name;return e(n)}))}))}(t)})))};return Object(s.useEffect)((function(){d().then((function(t){return i(Object(a.a)(t))}))}),[p]),React.createElement("div",y,"By ",c.map((function(t,e){var n=c.length-1;return 1<n&&e===n?React.createElement(s.Fragment,null,"and ",t):1<n&&e!==n?React.createElement(s.Fragment,null,t,", "):React.createElement(s.Fragment,null,t)})))},d=function(){var t=f.useBlockProps.save();return React.createElement(s.Fragment,t)};function m(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function w(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?m(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var O=i.name,j={title:Object(c.__)("PRC Post Bylines"),description:Object(c.__)("Displays the post bylines."),edit:y,save:d};Object(o.registerBlockType)(O,w(w({},j),i))},9:function(t,e){t.exports=window.wp.blocks}},[[582,0]]]);
//# sourceMappingURL=post-bylines-bcf5abd8.js.map