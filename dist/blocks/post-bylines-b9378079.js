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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[26],{10:function(t,e){t.exports=window.wp.blocks},12:function(t,e){t.exports=window.wp.data},14:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return r}))},2:function(t,e){t.exports=window.wp.element},20:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(30);var o=n(28),c=n(31);function i(t,e){return Object(r.a)(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,c=[],i=!0,a=!1;try{for(n=n.call(t);!(i=(r=n.next()).done)&&(c.push(r.value),!e||c.length!==e);i=!0);}catch(t){a=!0,o=t}finally{try{i||null==n.return||n.return()}finally{if(a)throw o}}return c}}(t,e)||Object(o.a)(t,e)||Object(c.a)()}},21:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},23:function(t,e){t.exports=window.wp.apiFetch},24:function(t,e,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},28:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(21);function o(t,e){if(t){if("string"==typeof t)return Object(r.a)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(t,e):void 0}}},3:function(t,e){t.exports=window.wp.i18n},30:function(t,e,n){"use strict";function r(t){if(Array.isArray(t))return t}n.d(e,"a",(function(){return r}))},31:function(t,e,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(e,"a",(function(){return r}))},322:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/post-bylines","category":"layout","supports":{"html":false,"multiple":false}}')},6:function(t,e){t.exports=window.wp.blockEditor},77:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var r=n(21);var o=n(96),c=n(28);function i(t){return function(t){if(Array.isArray(t))return Object(r.a)(t)}(t)||Object(o.a)(t)||Object(c.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},871:function(t,e,n){n(24),t.exports=n(952)},952:function(t,e,n){"use strict";n.r(e);var r=n(14),o=n(10),c=n(3),i=n(322),a=n(77),u=n(20),s=n(2),l=n(12),f=n(6),p=n(23),b=n.n(p),y=function(t){var e=t.className,n=t.clientId,r=Object(s.useState)([]),o=Object(u.a)(r,2),c=o[0],i=o[1],p=Object(l.useSelect)((function(t){return t("core/editor").getEditedPostAttribute("bylines")}),[n]),y=Object(f.useBlockProps)({className:"".concat(e," bylines meta")}),d=function(){return Promise.all(p.map((function(t){return function(t){return new Promise((function(e){b()({path:"/wp/v2/bylines/".concat(t)}).then((function(t){var n=t.name;return e(n)}))}))}(t)})))};return Object(s.useEffect)((function(){p&&p.length>0&&d().then((function(t){return i(Object(a.a)(t))}))}),[p]),React.createElement("div",y,"By ",c.map((function(t,e){var n=c.length-1;return 1<n&&e===n?React.createElement(s.Fragment,null,"and ",t):1<n&&e!==n?React.createElement(s.Fragment,null,t,", "):React.createElement(s.Fragment,null,t)})))},d=function(){var t=f.useBlockProps.save();return React.createElement(s.Fragment,t)};function m(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function w(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?m(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var O=i.name,j={title:Object(c.__)("PRC Post Bylines"),description:Object(c.__)("Displays the post bylines."),edit:y,save:d};Object(o.registerBlockType)(O,w(w({},j),i))},96:function(t,e,n){"use strict";function r(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}n.d(e,"a",(function(){return r}))}},[[871,0]]]);
//# sourceMappingURL=post-bylines-b9378079.js.map