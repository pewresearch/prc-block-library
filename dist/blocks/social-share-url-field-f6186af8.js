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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[55],{1:function(e,t){e.exports=window.React},1025:function(e,t,r){r(22),e.exports=r(1073)},1073:function(e,t,r){"use strict";r.r(t);var o=r(9),n=r(2),i=r(8),c=r(435),l=r(16),s=r.n(l),a=r(575),p=r(5),u=function(e){var t=e.attributes,r=e.className,o=e.setAttributes,i=e.context,c=t.url;console.log("Social Share URL Field: context: ",i);var l=Object(p.useBlockProps)({className:s()(r),style:{display:"flex",flexDirection:"row"}});return React.createElement("div",l,React.createElement("div",{className:"label"},Object(n.__)("Share This Link:","prc-block-library")),React.createElement(a.a,{placeholder:"URL...",value:c,onChange:function(e,t){var r=t.value;return o({url:r})}}))},f=function(){return React.createElement(p.InnerBlocks.Content,null)};function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var y=c.name,w={edit:u,save:f};Object(i.registerBlockType)(y,d(d({},c),w))},15:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},158:function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},16:function(e,t,r){var o,n=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var l=c.apply(null,r);l&&e.push(l)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var s in r)i.call(r,s)&&r[s]&&e.push(s);else e.push(r.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===n(r(17))&&r(17)?void 0===(o=function(){return c}.apply(t,[]))||(e.exports=o):window.classNames=c}()},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},435:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/social-share-url-field","title":"Social Share URL Field","description":"A input field with a url that can be shared on social media. Clicking the field will copy the link.","icon":"admin-links","keywords":["social"],"category":"marketing","attributes":{"url":{"type":"string"}},"supports":{"html":false},"parent":["core/social-links"],"usesContext":["core/social-links/title","core/social-links/description","core/social-links/url"]}')},47:function(e,t){e.exports=window.ReactDOM},5:function(e,t){e.exports=window.wp.blockEditor},8:function(e,t){e.exports=window.wp.blocks},89:function(e,t,r){var o,n=r(15);o=function(){return this}();try{o=o||new Function("return this")()}catch(e){"object"===("undefined"==typeof window?"undefined":n(window))&&(o=window)}e.exports=o}},[[1025,0,3,4]]]);
//# sourceMappingURL=social-share-url-field-f6186af8.js.map