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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[6],{1:function(t,e){t.exports=wp.element},11:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},117:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/post-bylines","category":"layout","supports":{"html":false,"multiple":false}}')},15:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(16);function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,c=void 0;try{for(var i,a=t[Symbol.iterator]();!(n=(i=a.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(t){o=!0,c=t}finally{try{n||null==a.return||a.return()}finally{if(o)throw c}}return r}}(t,e)||Object(n.a)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},16:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(11);function o(t,e){if(t){if("string"==typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},170:function(t,e,r){r(24),t.exports=r(222)},2:function(t,e){t.exports=wp.i18n},222:function(t,e,r){"use strict";r.r(e);var n=r(6),o=r(9),c=r(2),i=r(117),a=r(27),u=r(15),s=r(1),l=r(7),f=r(4),p=r(42),b=r.n(p),y=function(t){var e=t.className,r=t.clientId,n=Object(s.useState)([]),o=Object(u.a)(n,2),c=o[0],i=o[1],p=Object(l.useSelect)((function(t){return t("core/editor").getEditedPostAttribute("bylines")}),[r]),y=Object(f.useBlockProps)({className:"".concat(e," bylines meta")}),m=function(){return Promise.all(p.map((function(t){return function(t){return new Promise((function(e){b()({path:"/wp/v2/bylines/".concat(t)}).then((function(t){var r=t.name;return e(r)}))}))}(t)})))};return Object(s.useEffect)((function(){m().then((function(t){return i(Object(a.a)(t))}))}),[p]),React.createElement("div",y,"By ",c.map((function(t,e){var r=c.length-1;return 1<r&&e===r?React.createElement(s.Fragment,null,"and ",t):1<r&&e!==r?React.createElement(s.Fragment,null,t,", "):React.createElement(s.Fragment,null,t)})))},m=function(){var t=f.useBlockProps.save();return React.createElement(s.Fragment,t)};function d(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function O(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?d(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var j=i.name,v={title:Object(c.__)("PRC Post Bylines"),description:Object(c.__)("Displays the post bylines."),edit:y,save:m};Object(o.registerBlockType)(j,O(O({},v),i))},24:function(t,e,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},27:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(11);var o=r(16);function c(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(o.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},4:function(t,e){t.exports=wp.blockEditor},42:function(t,e){t.exports=wp.apiFetch},6:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},7:function(t,e){t.exports=wp.data},9:function(t,e){t.exports=wp.blocks}},[[170,0]]]);
//# sourceMappingURL=post-bylines-408958b1.js.map