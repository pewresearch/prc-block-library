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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[11],{1:function(t,e){t.exports=window.React},1035:function(t,e,n){"use strict";n.r(e);var r=n(10),o=n(8),i=n(421),c=n(22),s=n(14),u=n.n(s),a=n(45),l=n(4),p=n(5),f=n(3),w=n(9);function d(t){var e=t.termId,n=t.setAttributes,r=Object(l.useState)(!1),o=Object(c.a)(r,2),i=o[0],s=o[1],u=Object(w.useDispatch)("core/editor").editPost;return Object(l.useEffect)((function(){Object(a.f)("collection").then((function(t){console.log("collection terms...",t),s(t)}))}),[]),!1===i?null:React.createElement(f.TreeSelect,{noOptionLabel:"Select Collection",onChange:function(t){console.log("selected",t),u({collection:[parseFloat(t)]}),n({termId:parseFloat(t)})},selectedId:e,tree:i})}var b=function(t){var e=t.attributes,n=t.className,r=t.setAttributes,o=e.termId,i=Object(p.useBlockProps)({className:u()(n)});return React.createElement("div",i,React.createElement(d,{termId:o,setAttributes:r}))},y=function(){return React.createElement(l.Fragment,null)};function m(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function O(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?m(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var j=i.name,v={edit:b,save:y};Object(o.registerBlockType)(j,O(O({},i),v))},14:function(t,e,n){var r,o=n(12);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var r=o(n);if("string"===r||"number"===r)t.push(n);else if(Array.isArray(n)){if(n.length){var s=c.apply(null,n);s&&t.push(s)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var u in n)i.call(n,u)&&n[u]&&t.push(u);else t.push(n.toString())}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):"object"===o(n(15))&&n(15)?void 0===(r=function(){return c}.apply(e,[]))||(t.exports=r):window.classNames=c}()},15:function(t,e){(function(e){t.exports=e}).call(this,{})},18:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},2:function(t,e){t.exports=window.wp.i18n},22:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n(28);var o=n(24),i=n(29);function c(t,e){return Object(r.a)(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],c=!0,s=!1;try{for(n=n.call(t);!(c=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);c=!0);}catch(t){s=!0,o=t}finally{try{c||null==n.return||n.return()}finally{if(s)throw o}}return i}}(t,e)||Object(o.a)(t,e)||Object(i.a)()}},23:function(t,e){t.exports=window.wp.primitives},24:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(18);function o(t,e){if(t){if("string"==typeof t)return Object(r.a)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(t,e):void 0}}},28:function(t,e,n){"use strict";function r(t){if(Array.isArray(t))return t}n.d(e,"a",(function(){return r}))},29:function(t,e,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(e,"a",(function(){return r}))},3:function(t,e){t.exports=window.wp.components},30:function(t,e){t.exports=window.wp.apiFetch},32:function(t,e){t.exports=window.wp.url},4:function(t,e){t.exports=window.wp.element},40:function(t,e){t.exports=window.wp.htmlEntities},421:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/collection-kicker","title":"Collection Kicker","description":"Allows you to put this post into a collection and display that collections kicker bug.","keywords":[],"category":"design","attributes":{"termId":{"type":"integer"}},"supports":{"html":false}}')},49:function(t,e){t.exports=regeneratorRuntime},5:function(t,e){t.exports=window.wp.blockEditor},56:function(t,e){t.exports=window.wp.keycodes},57:function(t,e){t.exports=window.ReactDOM},59:function(t,e){t.exports=window.wp.mediaUtils},8:function(t,e){t.exports=window.wp.blocks},9:function(t,e){t.exports=window.wp.data},986:function(t,e,n){n(19),t.exports=n(1035)}},[[986,0,1,2]]]);
//# sourceMappingURL=collection-kicker-b5e143a1.js.map