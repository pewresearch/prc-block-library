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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[8],{11:function(t,e){t.exports=window.wp.blocks},13:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},16:function(t,e,r){var n,o=r(20);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var n=o(r);if("string"===n||"number"===n)t.push(r);else if(Array.isArray(r)){if(r.length){var a=c.apply(null,r);a&&t.push(a)}}else if("object"===n)if(r.toString===Object.prototype.toString)for(var s in r)i.call(r,s)&&r[s]&&t.push(s);else t.push(r.toString())}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):"object"===o(r(25))&&r(25)?void 0===(n=function(){return c}.apply(e,[]))||(t.exports=n):window.classNames=c}()},18:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(28);var o=r(27),i=r(29);function c(t,e){return Object(n.a)(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],c=!0,a=!1;try{for(r=r.call(t);!(c=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);c=!0);}catch(t){a=!0,o=t}finally{try{c||null==r.return||r.return()}finally{if(a)throw o}}return i}}(t,e)||Object(o.a)(t,e)||Object(i.a)()}},2:function(t,e){t.exports=window.wp.i18n},20:function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(t.exports=r=function(t){return typeof t},t.exports.default=t.exports,t.exports.__esModule=!0):(t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.default=t.exports,t.exports.__esModule=!0),r(e)}t.exports=r,t.exports.default=t.exports,t.exports.__esModule=!0},21:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},24:function(t,e,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},25:function(t,e){(function(e){t.exports=e}).call(this,{})},27:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(21);function o(t,e){if(t){if("string"==typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},28:function(t,e,r){"use strict";function n(t){if(Array.isArray(t))return t}r.d(e,"a",(function(){return n}))},29:function(t,e,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(e,"a",(function(){return n}))},298:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/daily-briefing-signup","category":"marketing","attributes":{},"supports":{"html":false}}')},3:function(t,e){t.exports=window.wp.element},33:function(t,e){t.exports=window.wp.apiFetch},6:function(t,e){t.exports=window.wp.blockEditor},851:function(t,e,r){r(24),t.exports=r(926)},926:function(t,e,r){"use strict";r.r(e);var n=r(13),o=r(2),i=r(11),c=r(298),a=r(18),s=r(16),u=r.n(s),l=r(33),p=r.n(l),f=r(3),b=r(6),y=["prc-block/promo","prc-block/story-item"],m=function(t){t.attributes;var e=t.className,r=(t.setAttributes,Object(f.useState)(!1)),n=Object(a.a)(r,2),o=n[0],i=n[1],c=Object(f.useState)([]),s=Object(a.a)(c,2),l=s[0],m=s[1],d=Object(b.useBlockProps)({className:u()(e)}),O=Object(b.useInnerBlocksProps)(d,{allowedBlocks:y,orientation:"vertical",templateLock:"all",template:l});return Object(f.useEffect)((function(){p()({path:"/prc-api/v2/blocks/daily-briefing-signup",method:"GET"}).then((function(t){console.log(t),m([["prc-block/story-item",{postId:t.ID,title:t.post_title,description:"<p>".concat(t.post_content,"</p>"),imageSlot:"disabled"}],["prc-block/promo",{heading:"Get the Daily Briefing by email",headingLevel:2,hasForm:!0,icon:"journalism"},[["prc-block/mailchimp-form",{className:"is-style-horizontal",interest:"1d2638430b",buttonColor:"#000"}]]]])}))}),[]),Object(f.useEffect)((function(){l.length>0&&i(!0)}),[l]),o?React.createElement("div",O):React.createElement(f.Fragment,null)},d=function(){return React.createElement(b.InnerBlocks.Content,null)};function O(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function g(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?O(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var w=c.name,j={title:Object(o.__)("Daily Briefing Signup"),description:"Displays the latest Daily Briefing post and a mailchimp form to signup.",keywords:[Object(o.__)("Journalism"),Object(o.__)("Daily Briefing"),Object(o.__)("mailchimp")],edit:m,save:d};Object(i.registerBlockType)(w,g(g({},c),j))}},[[851,0]]]);
//# sourceMappingURL=daily-briefing-signup-962cc70a.js.map