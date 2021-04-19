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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[33],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=wp.i18n},11:function(e,t,r){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},12:function(e,t){(function(t){e.exports=t}).call(this,{})},13:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},154:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-search-field","category":"layout","attributes":{"url":{"type":"string"},"label":{"type":"string"},"id":{"type":"integer"}},"supports":{"html":false,"reusable":false}}')},2:function(e,t){e.exports=wp.components},279:function(e,t,r){r(11),e.exports=r(308)},3:function(e,t){e.exports=wp.blockEditor},308:function(e,t,r){"use strict";r.r(t);var o=r(6),n=r(1),c=r(5),i=r(154),s=r(8),l=r.n(s),a=r(0),u=r(3),p=r(2),f=function(e){var t=e.value,r=void 0!==t&&t,o=e.searchLabel,n=e.setAttributes,c=r.label;return void 0!==c&&""!==c?React.createElement(p.Flex,null,React.createElement(p.FlexBlock,null,c),React.createElement(p.FlexItem,null,React.createElement(p.Button,{isSecondary:!0,onClick:function(){n({url:"",label:"",id:""})}},"Clear"))):React.createElement(u.__experimentalLinkControl,{searchInputPlaceholder:o,settings:[],onChange:function(e){console.log(e),n({url:e.url,label:e.title,id:e.id})},suggestionsQuery:{type:"term",subtype:"topic"},noDirectEntry:!0,withCreateSuggestion:!1})},b=function(e){var t=e.attributes,r=e.className,o=e.setAttributes,c=Object(u.useBlockProps)({className:l()(r)});return React.createElement("div",c,React.createElement(p.Placeholder,{label:"Configure Topic Search Field",isColumnLayout:!0},React.createElement(f,{value:t,setAttributes:o,searchLabel:Object(n.__)("Search for Topic")})))},y=function(){return React.createElement(a.Fragment,null)};function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=i.name,x={title:Object(n.__)("Topic Index Search Field"),description:"Allows user to search for a term and redirect to its listing page. Allows restricting searches to a root term.",category:"layout",keywords:[Object(n.__)("Topic Search"),Object(n.__)("Search")],edit:b,save:y};Object(c.registerBlockType)(g,m(m({},i),x))},5:function(e,t){e.exports=wp.blocks},6:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},8:function(e,t,r){var o,n=r(13);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)&&r.length){var s=i.apply(null,r);s&&e.push(s)}else if("object"===o)for(var l in r)c.call(r,l)&&r[l]&&e.push(l)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===n(r(12))&&r(12)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()}},[[279,0]]]);
//# sourceMappingURL=topic-index-search-field-099ae4a7.js.map