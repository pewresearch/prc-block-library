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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[76],{1053:function(e,t,r){"use strict";r.r(t);var o=r(8),n=r(2),c=r(7),i=r(404),l=r(12),a=r.n(l),s=r(4),u=r(5),p=r(3),f=function(e){var t=e.value,r=void 0!==t&&t,o=e.searchLabel,n=e.setAttributes,c=r.label;return void 0!==c&&""!==c?React.createElement(p.Flex,null,React.createElement(p.FlexBlock,null,c),React.createElement(p.FlexItem,null,React.createElement(p.Button,{isSecondary:!0,onClick:function(){n({url:"",label:"",id:""})}},"Clear"))):React.createElement(u.__experimentalLinkControl,{searchInputPlaceholder:o,settings:[],onChange:function(e){console.log(e),n({url:e.url,label:e.title,id:e.id})},suggestionsQuery:{type:"term",subtype:"topic"},noDirectEntry:!0,withCreateSuggestion:!1})},b=function(e){var t=e.attributes,r=e.className,o=e.setAttributes,c=Object(u.useBlockProps)({className:a()(r)});return React.createElement("div",c,React.createElement(p.Placeholder,{label:"Configure Topic Search Field",isColumnLayout:!0},React.createElement(f,{value:t,setAttributes:o,searchLabel:Object(n.__)("Search for Topic")})))},y=function(){return React.createElement(s.Fragment,null)};function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m=i.name,g={title:Object(n.__)("Topic Index Search Field"),description:"Allows user to search for a term and redirect to its listing page. Allows restricting searches to a root term.",category:"layout",keywords:[Object(n.__)("Topic Search"),Object(n.__)("Search")],edit:b,save:y};Object(c.registerBlockType)(m,w(w({},i),g))},11:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},12:function(e,t,r){var o,n=r(11);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var l=i.apply(null,r);l&&e.push(l)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var a in r)c.call(r,a)&&r[a]&&e.push(a);else e.push(r.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===n(r(13))&&r(13)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},13:function(e,t){(function(t){e.exports=t}).call(this,{})},17:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},2:function(e,t){e.exports=window.wp.i18n},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},404:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-search-field","category":"layout","attributes":{"url":{"type":"string"},"label":{"type":"string"},"id":{"type":"integer"}},"supports":{"html":false,"reusable":false}}')},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},8:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},978:function(e,t,r){r(17),e.exports=r(1053)}},[[978,0]]]);
//# sourceMappingURL=topic-index-search-field-4150a2be.js.map