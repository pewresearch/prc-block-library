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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[8],{13:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},15:function(e,t,r){var o,n=r(17);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function s(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var c=s.apply(null,r);c&&e.push(c)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var a in r)i.call(r,a)&&r[a]&&e.push(a);else e.push(r.toString())}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):"object"===n(r(22))&&r(22)?void 0===(o=function(){return s}.apply(t,[]))||(e.exports=o):window.classNames=s}()},17:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},2:function(e,t){e.exports=window.wp.i18n},21:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},22:function(e,t){(function(t){e.exports=t}).call(this,{})},273:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/daily-briefing-signup","category":"marketing","attributes":{},"supports":{"html":false}}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},580:function(e,t,r){r(21),e.exports=r(662)},662:function(e,t,r){"use strict";r.r(t);var o=r(13),n=r(2),i=r(9),s=r(273),c=r(15),a=r.n(c),p=r(4),l=r(5),u=["prc-block/mailchimp-form","prc-block/story-item"],f=[["prc-block/story-item",{postId:0,title:"More than 10% of staff in Daily Mail let go after acquisition",description:"<p>This story, plus independent Indian journalist shares perspective on Israeli spyware and Pegasus list, NBC News adding over 200 new jobs as part of major streaming push and more, all in today’s media headlines.</p>",imageSlot:"disabled"}],["prc-block/mailchimp-form",{className:"is-style-horizontal",interest:"1d2638430b"}]],b=function(e){e.attributes;var t=e.className,r=(e.setAttributes,Object(l.useBlockProps)({className:a()(t)})),o=Object(l.__experimentalUseInnerBlocksProps)(r,{allowedBlocks:u,orientation:"vertical",templateLock:"all",template:f});return Object(p.useEffect)((function(){}),[]),React.createElement("div",o)},y=function(){return React.createElement(l.InnerBlocks.Content,null)};function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var w=s.name,g={title:Object(n.__)("Daily Briefing Signup"),description:"Displays the latest Daily Briefing post and a mailchimp form to signup.",keywords:[Object(n.__)("Journalism"),Object(n.__)("Daily Briefing"),Object(n.__)("mailchimp")],edit:b,save:y};Object(i.registerBlockType)(w,d(d({},s),g))},9:function(e,t){e.exports=window.wp.blocks}},[[580,0]]]);
//# sourceMappingURL=daily-briefing-signup-8f3ec49c.js.map