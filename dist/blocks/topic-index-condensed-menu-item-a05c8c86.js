/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.9
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[47],{10:function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return o}))},14:function(e,t){e.exports=window.wp.data},16:function(e,t,n){var o,r=n(18);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var l=i.apply(null,n);l&&e.push(l)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var u in n)c.call(n,u)&&n[u]&&e.push(u);else e.push(n.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===r(n(22))&&n(22)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},18:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=n=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),n(t)}e.exports=n,e.exports.default=e.exports,e.exports.__esModule=!0},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t){(function(t){e.exports=t}).call(this,{})},23:function(e,t,n){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},315:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-menu-item","category":"layout","attributes":{"title":{"type":"string"},"uuid":{"type":"string","default":null}},"supports":{"html":false,"align":false},"usesContext":["prc-block/topic-index-condensed-active"],"parent":["prc-block/topic-index-condensed-menu"]}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},665:function(e,t,n){n(23),e.exports=n(713)},713:function(e,t,n){"use strict";n.r(t);var o=n(10),r=n(9),c=n(2),i=n(315),l=n(16),u=n.n(l),s=n(4),a=n(5),p=n(14),f=function(e){var t=e.attributes,n=e.setAttributes,o=e.className,i=e.clientId,l=e.isSelected,f=e.context,d=t.title,b=t.uuid,y=Object(p.useDispatch)("core/block-editor"),w=y.insertBlock,g=y.updateBlockAttributes,m=Object(p.useSelect)((function(e){var t=e("core/block-editor"),n=t.getBlock,o=t.getBlockRootClientId,r=t.getAdjacentBlockClientId,c=o(i),l=r(c);return{controllerClientId:o(c),pagesClientId:l,pages:n(l).innerBlocks.map((function(e){return{clientId:e.clientId,uuid:e.attributes.uuid,title:e.attributes.title}}))}}),[i]),O=m.controllerClientId,v=m.pagesClientId,x=m.pages;Object(s.useEffect)((function(){!function(){if(null===b){var e=i;n({uuid:e});var t=Object(r.createBlock)("prc-block/topic-index-condensed-page",{uuid:e,title:""});w(t,!1,v)}}()}),[]),Object(s.useEffect)((function(){!function(e){var t=x;if(1<=x.length){var n=t.filter((function(e){return e.uuid===b}));if(1<=n.length){var o=n[0].clientId;g(o,{heading:e})}}}(d)}),[d]),Object(s.useEffect)((function(){null!==b&&g(O,{active:b})}),[l]);var k=Object(a.useBlockProps)({className:u()(o,"item",{active:b===f["prc-block/topic-index-condensed-active"]})});return React.createElement(s.Fragment,null,React.createElement("div",k,React.createElement(a.RichText,{tagName:"div",value:d,allowedFormats:[],onChange:function(e){return n({title:e})},placeholder:Object(c.__)("Politics")})))},d=function(){return React.createElement(s.Fragment,null)};function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var w=i.name,g={title:Object(c.__)("Menu Item"),description:Object(c.__)("A sub block of Menu block, a sub block of the Topic Index - Condensed View block."),edit:f,save:d};Object(r.registerBlockType)(w,y(y({},i),g))},9:function(e,t){e.exports=window.wp.blocks}},[[665,0]]]);
//# sourceMappingURL=topic-index-condensed-menu-item-a05c8c86.js.map