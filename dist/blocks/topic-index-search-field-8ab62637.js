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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[25],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=wp.i18n},10:function(e,t,r){var n,o=r(17);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)&&r.length){var a=i.apply(null,r);a&&e.push(a)}else if("object"===n)for(var l in r)c.call(r,l)&&r[l]&&e.push(l)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===o(r(20))&&r(20)?void 0===(n=function(){return i}.apply(t,[]))||(e.exports=n):window.classNames=i}()},147:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-search-field","category":"layout","attributes":{"url":{"type":"string"},"label":{"type":"string"},"id":{"type":"integer"}},"supports":{"html":false,"reusable":false}}')},17:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=r=function(e){return typeof e}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(t)}e.exports=r},19:function(e,t,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},2:function(e,t){e.exports=wp.components},20:function(e,t){(function(t){e.exports=t}).call(this,{})},258:function(e,t,r){r(19),e.exports=r(282)},282:function(e,t,r){"use strict";r.r(t);var n=r(5),o=r(1),c=r(6),i=r(147),a=r(10),l=r.n(a),s=r(0),u=r(4),p=r(2),f=function(e){var t=e.value,r=void 0!==t&&t,n=e.searchLabel,o=e.setAttributes,c=r.label;return void 0!==c&&""!==c?React.createElement(p.Flex,null,React.createElement(p.FlexBlock,null,c),React.createElement(p.FlexItem,null,React.createElement(p.Button,{isSecondary:!0,onClick:function(){o({url:"",label:"",id:""})}},"Clear"))):React.createElement(u.__experimentalLinkControl,{searchInputPlaceholder:n,settings:[],onChange:function(e){console.log(e),o({url:e.url,label:e.title,id:e.id})},suggestionsQuery:{type:"term",subtype:"topic"},noDirectEntry:!0,withCreateSuggestion:!1})},b=function(e){var t=e.attributes,r=e.className,n=e.setAttributes,c=Object(u.useBlockProps)({className:l()(r)});return React.createElement("div",c,React.createElement(p.Placeholder,{label:"Configure Topic Search Field",isColumnLayout:!0},React.createElement(f,{value:t,setAttributes:n,searchLabel:Object(o.__)("Search for Topic")})))},y=function(){return React.createElement(s.Fragment,null)};function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=i.name,h={title:Object(o.__)("Topic Index Search Field"),description:"Allows user to search for a term and redirect to its listing page. Allows restricting searches to a root term.",category:"layout",keywords:[Object(o.__)("Topic Search"),Object(o.__)("Search")],edit:b,save:y};Object(c.registerBlockType)(g,d(d({},i),h))},4:function(e,t){e.exports=wp.blockEditor},5:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},6:function(e,t){e.exports=wp.blocks}},[[258,0]]]);
//# sourceMappingURL=topic-index-search-field-8ab62637.js.map