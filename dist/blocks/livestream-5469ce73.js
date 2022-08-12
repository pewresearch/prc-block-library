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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[23],{1:function(e,t){e.exports=window.React},148:function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},15:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},16:function(e,t,r){var n,o=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)){if(r.length){var i=a.apply(null,r);i&&e.push(i)}}else if("object"===n)if(r.toString===Object.prototype.toString)for(var s in r)c.call(r,s)&&r[s]&&e.push(s);else e.push(r.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):"object"===o(r(18))&&r(18)?void 0===(n=function(){return a}.apply(t,[]))||(e.exports=n):window.classNames=a}()},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},354:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/livestream","category":"layout","attributes":{"streamUrl":{"type":"string"},"chatUrl":{"type":"string"}},"styles":[{"name":"chat-box-left","label":"Chat Box Left"},{"name":"chat-box-right","label":"Chat Box Right","isDefault":true}],"example":{"attributes":{"streamUrl":"https://vimeo.com/event/1352567/embed","chatUrl":"https://app.sli.do/event/2jtxhrzn"},"viewPortWidth":800},"supports":{"html":false}}')},47:function(e,t){e.exports=window.ReactDOM},5:function(e,t){e.exports=window.wp.blockEditor},716:function(e,t,r){r(22),e.exports=r(821)},8:function(e,t){e.exports=window.wp.blocks},821:function(e,t,r){"use strict";r.r(t);var n=r(9),o=r(2),c=r(8),a=r(354),i=r(16),s=r.n(i),l=r(459),p=r(5),u=function(e){var t=e.attributes,r=e.setAttributes,n=t.className,o=t.streamUrl,c=t.chatUrl,a=Object(p.useBlockProps)({className:s()(n)});return React.createElement("div",a,React.createElement("div",{className:"prc-livestream-stream"},"Livestream video embed URL:",React.createElement(l.a,{type:"text",placeholder:"e.g. https://vimeo.com/event/1352567/embed",value:o,onChange:function(e){return r({streamUrl:e.target.value})}})),React.createElement("div",{className:"prc-livestream-chat"},"Livestream chat embed URL:",React.createElement(l.a,{type:"text",placeholder:"e.g. https://app.sli.do/event/2jtxhrzn",value:c,onChange:function(e){return r({chatUrl:e.target.value})}})))},f=function(){return React.createElement(p.InnerBlocks.Content,null)};function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var d=a.name,y={title:Object(o.__)("Livestream"),description:"Create Embeddable Livestream with Chat.",keywords:[Object(o.__)("Livestream"),Object(o.__)("Stream"),Object(o.__)("Chat")],icon:"embed-video",edit:u,save:f};Object(c.registerBlockType)(d,m(m({},a),y))},87:function(e,t,r){var n,o=r(15);n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"===("undefined"==typeof window?"undefined":o(window))&&(n=window)}e.exports=n}},[[716,0,3,4]]]);
//# sourceMappingURL=livestream-5469ce73.js.map