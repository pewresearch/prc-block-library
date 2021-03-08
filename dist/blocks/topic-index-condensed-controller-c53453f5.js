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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[11],{1:function(e,t){e.exports=wp.element},10:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n},11:function(e,t,n){var o,r=n(10);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)&&n.length){var s=i.apply(null,n);s&&e.push(s)}else if("object"===o)for(var p in n)c.call(n,p)&&n[p]&&e.push(p)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===r(n(15))&&n(15)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},123:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-controller","category":"layout","attributes":{"active":{"type":"string","default":null}},"providesContext":{"prc-block/topic-index-condensed-active":"active"},"supports":{"html":false,"align":false}}')},15:function(e,t){(function(t){e.exports=t}).call(this,{})},17:function(e,t,n){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},2:function(e,t){e.exports=wp.i18n},212:function(e,t,n){n(17),e.exports=n(236)},236:function(e,t,n){"use strict";n.r(t);var o=n(5),r=n(8),c=n(2),i=n(123),s=n(11),p=n.n(s),l=n(1),a=n(3),u=n(4),f=(n(6),[["prc-block/topic-index-condensed-menu",{}],["prc-block/topic-index-condensed-pages",{}]]),b=["prc-block/topic-index-condensed-menu","prc-block/topic-index-condensed-pages"],d=function(e){e.attributes,e.setAttributes;var t=e.className,n=(e.clientId,Object(a.useBlockProps)({className:p()(t,"ui divided grid")})),o=Object(a.__experimentalUseInnerBlocksProps)(n,{allowedBlocks:b,renderAppender:!1,template:f});return React.createElement(l.Fragment,null,React.createElement(a.BlockControls,null),React.createElement(a.InspectorControls,null,React.createElement(u.PanelBody,{title:Object(c.__)("Controller Settings")},React.createElement(l.Fragment,null,React.createElement("p",null,"Yep")))),React.createElement("div",{className:"ui container"},React.createElement("div",o)))},y=function(){return React.createElement(a.InnerBlocks.Content,null)};function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var w=i.name,j={title:Object(c.__)("Topic Index - Condensed View"),description:Object(c.__)('The condensed, or "schwoopy" version of the topic index.'),keywords:[Object(c.__)("Topics"),Object(c.__)("Topic"),Object(c.__)("Index"),Object(c.__)("Schwoopy")],edit:d,save:y};Object(r.registerBlockType)(w,O(O({},i),j))},3:function(e,t){e.exports=wp.blockEditor},4:function(e,t){e.exports=wp.components},5:function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return o}))},6:function(e,t){e.exports=wp.data},8:function(e,t){e.exports=wp.blocks}},[[212,0]]]);
//# sourceMappingURL=topic-index-condensed-controller-c53453f5.js.map