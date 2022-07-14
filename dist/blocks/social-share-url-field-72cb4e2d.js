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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[49],{1:function(e,t){e.exports=window.React},1014:function(e,t,r){r(23),e.exports=r(1053)},1053:function(e,t,r){"use strict";r.r(t);var n=r(13),o=r(2),i=r(8),c=r(430),l=r(17),a=r.n(l),s=r(564),u=r(5),p=function(e){var t=e.attributes,r=e.className,n=e.setAttributes,i=e.context,c=t.url;console.log("Social Share URL Field: context: ",i);var l=Object(u.useBlockProps)({className:a()(r),style:{display:"flex",flexDirection:"row"}});return React.createElement("div",l,React.createElement("div",{className:"label"},Object(o.__)("Share This Link:","prc-block-library")),React.createElement(s.a,{placeholder:"URL...",value:c,onChange:function(e,t){var r=t.value;return n({url:r})}}))},f=function(){return React.createElement(u.InnerBlocks.Content,null)};function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var y=c.name,w={edit:p,save:f};Object(i.registerBlockType)(y,d(d({},c),w))},13:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},15:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},169:function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},17:function(e,t,r){var n,o=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)){if(r.length){var l=c.apply(null,r);l&&e.push(l)}}else if("object"===n)if(r.toString===Object.prototype.toString)for(var a in r)i.call(r,a)&&r[a]&&e.push(a);else e.push(r.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===o(r(20))&&r(20)?void 0===(n=function(){return c}.apply(t,[]))||(e.exports=n):window.classNames=c}()},2:function(e,t){e.exports=window.wp.i18n},23:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},430:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/social-share-url-field","title":"Social Share URL Field","description":"A input field with a url that can be shared on social media. Clicking the field will copy the link.","icon":"admin-links","keywords":["social"],"category":"marketing","attributes":{"url":{"type":"string"}},"supports":{"html":false},"parent":["core/social-links"],"usesContext":["core/social-links/title","core/social-links/description","core/social-links/url"]}')},49:function(e,t){e.exports=window.ReactDOM},5:function(e,t){e.exports=window.wp.blockEditor},8:function(e,t){e.exports=window.wp.blocks},94:function(e,t,r){var n,o=r(15);n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"===("undefined"==typeof window?"undefined":o(window))&&(n=window)}e.exports=n}},[[1014,0,3,4]]]);
//# sourceMappingURL=social-share-url-field-72cb4e2d.js.map