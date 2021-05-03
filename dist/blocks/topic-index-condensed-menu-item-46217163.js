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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[33],{12:function(e,t){e.exports=wp.blocks},15:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=n=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),n(t)}e.exports=n,e.exports.default=e.exports,e.exports.__esModule=!0},16:function(e,t){e.exports=wp.data},18:function(e,t,n){var r,o=n(15);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)&&n.length){var u=i.apply(null,n);u&&e.push(u)}else if("object"===r)for(var l in n)c.call(n,l)&&n[l]&&e.push(l)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===o(n(20))&&n(20)?void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r):window.classNames=i}()},2:function(e,t){e.exports=wp.i18n},20:function(e,t){(function(t){e.exports=t}).call(this,{})},24:function(e,t,n){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},290:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-menu-item","category":"layout","attributes":{"slug":{"type":"string"},"title":{"type":"string"},"uuid":{"type":"string","default":null}},"supports":{"html":false,"align":false},"usesContext":["prc-block/topic-index-condensed-active"],"parent":["prc-block/topic-index-condensed-menu"]}')},3:function(e,t){e.exports=wp.element},43:function(e,t){e.exports=wp.url},637:function(e,t,n){n(24),e.exports=n(670)},670:function(e,t,n){"use strict";n.r(t);var r=n(8),o=n(12),c=n(2),i=n(290),u=n(18),l=n.n(u),s=n(3),a=n(7),p=n(16),f=n(43),b=function(e){var t=e.attributes,n=e.setAttributes,r=e.className,i=e.clientId,u=e.isSelected,b=e.context,d=t.title,y=t.uuid,g=Object(p.useDispatch)("core/block-editor"),m=g.insertBlock,x=g.updateBlockAttributes,O=Object(p.useSelect)((function(e){var t=e("core/block-editor"),n=t.getBlock,r=t.getBlockRootClientId,o=t.getAdjacentBlockClientId,c=r(i),u=o(c);return{controllerClientId:r(c),pagesClientId:u,pages:n(u).innerBlocks.map((function(e){return{clientId:e.clientId,uuid:e.attributes.uuid,title:e.attributes.title}}))}}),[i]),v=O.controllerClientId,k=O.pagesClientId,j=O.pages;Object(s.useEffect)((function(){!function(){if(null===y){var e=i;n({uuid:e});var t=Object(o.createBlock)("prc-block/topic-index-condensed-page",{uuid:e,title:""});m(t,!1,k)}}()}),[]),Object(s.useEffect)((function(){!function(e){n({slug:Object(f.cleanForSlug)(e)});var t=j;if(1<=j.length){var r=t.filter((function(e){return e.uuid===y}));if(1<=r.length){var o=r[0].clientId;x(o,{heading:e})}}}(d)}),[d]),Object(s.useEffect)((function(){null!==y&&x(v,{active:y})}),[u]);var w=Object(a.useBlockProps)({className:l()(r,"item",{active:y===b["prc-block/topic-index-condensed-active"]})});return React.createElement(s.Fragment,null,React.createElement("div",w,React.createElement(a.RichText,{tagName:"div",value:d,allowedFormats:[],onChange:function(e){return n({title:e})},placeholder:Object(c.__)("Politics")})))},d=function(){return React.createElement(s.Fragment,null)};function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var m=i.name,x={title:Object(c.__)("Menu Item"),description:Object(c.__)("A sub block of Menu block, a sub block of the Topic Index - Condensed View block."),edit:b,save:d};Object(o.registerBlockType)(m,g(g({},i),x))},7:function(e,t){e.exports=wp.blockEditor},8:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))}},[[637,0]]]);
//# sourceMappingURL=topic-index-condensed-menu-item-46217163.js.map