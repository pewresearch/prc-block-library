/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.24
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[14],{11:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},12:function(t,e,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},17:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));var n=r(23);var o=r(18),i=r(24);function c(t,e){return Object(n.a)(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],c=!0,a=!1;try{for(r=r.call(t);!(c=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);c=!0);}catch(t){a=!0,o=t}finally{try{c||null==r.return||r.return()}finally{if(a)throw o}}return i}}(t,e)||Object(o.a)(t,e)||Object(i.a)()}},18:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(11);function o(t,e){if(t){if("string"==typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},23:function(t,e,r){"use strict";function n(t){if(Array.isArray(t))return t}r.d(e,"a",(function(){return n}))},24:function(t,e,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(e,"a",(function(){return n}))},29:function(t,e){t.exports=window.wp.apiFetch},3:function(t,e){t.exports=window.wp.components},301:function(t){t.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/daily-briefing-signup","title":"Daily Briefing Signup","description":"Displays the latest Daily Briefing post and a MailChimp form to sign up for the newsletter.","keywords":["daily briefing","journalism","sign up","newsletter"],"category":"marketing","attributes":{},"supports":{"html":false}}')},4:function(t,e){t.exports=window.wp.element},5:function(t,e){t.exports=window.wp.blockEditor},686:function(t,e,r){r(12),t.exports=r(779)},7:function(t,e){t.exports=window.wp.blocks},779:function(t,e,r){"use strict";r.r(e);var n=r(8),o=r(7),i=r(301),c=r(17),a=r(29),l=r.n(a),s=r(4),u=r(5),p=r(3),f=["prc-block/promo","prc-block/story-item"],b=function(){var t=Object(s.useState)(!1),e=Object(c.a)(t,2),r=e[0],n=e[1],o=Object(s.useState)([]),i=Object(c.a)(o,2),a=i[0],b=i[1],d=Object(u.useBlockProps)({}),y=Object(u.useInnerBlocksProps)(d,{allowedBlocks:f,orientation:"vertical",templateLock:"all",template:a});return Object(s.useEffect)((function(){l()({path:"/prc-api/v2/blocks/daily-briefing-signup",method:"GET"}).then((function(t){b([["prc-block/story-item",{postId:t.ID,title:t.post_title,excerpt:"<p>".concat(t.post_content,"</p>"),imageSlot:"disabled",url:t.link,isPreview:!0}],["prc-block/promo",{heading:"Get the Daily Briefing by email",headingLevel:2,hasForm:!0,icon:"journalism"},[["prc-block/mailchimp-form",{className:"is-style-horizontal",interest:"1d2638430b"},[["prc-block/form-input-text",{type:"email",placeholder:"Enter your email address",label:"Email Address"}],["core/button",{text:"Sign Up"}]]]]]])}))}),[]),Object(s.useEffect)((function(){0<a.length&&n(!0)}),[a]),r?React.createElement("div",y):React.createElement("div",null,"Loading Daily Briefing Signup... ",React.createElement(p.Spinner,null))},d=function(){return React.createElement(u.InnerBlocks.Content,null)};function y(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function m(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?y(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var w=i.name,g={edit:b,save:d};Object(o.registerBlockType)(w,m(m({},i),g))},8:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))}},[[686,0]]]);
//# sourceMappingURL=daily-briefing-signup-338f238a.js.map