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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[17],{1:function(t,e){t.exports=wp.element},10:function(t,e,o){var r,n=o(9);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var o=arguments[e];if(o){var r=n(o);if("string"===r||"number"===r)t.push(o);else if(Array.isArray(o)&&o.length){var l=i.apply(null,o);l&&t.push(l)}else if("object"===r)for(var s in o)c.call(o,s)&&o[s]&&t.push(s)}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===n(o(12))&&o(12)?void 0===(r=function(){return i}.apply(e,[]))||(t.exports=r):window.classNames=i}()},12:function(t,e){(function(e){t.exports=e}).call(this,{})},129:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-list-item","category":"layout","attributes":{"id":{"type":"integer"},"title":{"type":"string"},"url":{"type":"string","default":null},"more":{"type":"boolean","default":false}}}')},17:function(t,e,o){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},2:function(t,e){t.exports=wp.i18n},221:function(t,e,o){o(17),t.exports=o(246)},246:function(t,e,o){"use strict";o.r(e);var r=o(5),n=(o(33),o(2)),c=o(6),i=o(129),l=(o(10),o(1)),s=o(3),a=o(4),u=["prc-block/topic-list-item"],p=function(t){var e=t.attributes,o=t.setAttributes,r=(t.className,t.clientId,t.isSelected),c=(e.id,e.title),i=e.url,p=e.more,f=Object(s.useBlockProps)({className:"item"}),b=Object(s.__experimentalUseInnerBlocksProps)({},{allowedBlocks:u,orientation:"vertical",templateLock:!1});return React.createElement(l.Fragment,null,React.createElement(s.BlockControls,null,React.createElement(a.ToolbarGroup,null,React.createElement(a.ToolbarButton,{label:Object(n.__)("Toggle More"),icon:"admin-links",onClick:function(){return o({more:!p})},showTooltip:!0}))),React.createElement("div",f,!0===r&&React.createElement(s.__experimentalLinkControl,{value:{url:i},showInitialSuggestions:!0,suggestionsQuery:{type:"term",subtype:"topic"},onChange:function(t){console.log(t),o({id:t.id,title:t.title,url:t.url})},settings:[]}),!1===r&&null!==i&&"".concat(c),!1===r&&null===i&&"Click to select Topic term.",!0===p&&React.createElement("div",b)))},f=function(){return React.createElement(s.InnerBlocks.Content,null)};function b(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,r)}return o}function m(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?b(Object(o),!0).forEach((function(e){Object(r.a)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):b(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var y=i.name,w={title:Object(n.__)("Topic List Item"),description:Object(n.__)("A list item that links to a Topic term"),keywords:[Object(n.__)("topic")],edit:p,save:f};Object(c.registerBlockType)(y,m(m({},i),w))},3:function(t,e){t.exports=wp.blockEditor},33:function(t,e){t.exports=moment},4:function(t,e){t.exports=wp.components},5:function(t,e,o){"use strict";function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}o.d(e,"a",(function(){return r}))},6:function(t,e){t.exports=wp.blocks},9:function(t,e){function o(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=o=function(t){return typeof t}:t.exports=o=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(e)}t.exports=o}},[[221,0]]]);
//# sourceMappingURL=topic-list-item-f16eabcd.js.map