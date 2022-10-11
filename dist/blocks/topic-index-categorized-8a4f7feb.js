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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[70],{1:function(t,e){t.exports=window.React},1047:function(t,e,n){"use strict";n.r(e);var o=n(8),r=n(7),i=n(395),c=n(12),s=n.n(c),p=n(42),a=(n(2),n(5)),u=["prc-block/taxonomy-tree","core/navigation"],l=function(t){var e=t.attributes,n=t.className,o=t.setAttributes,r=(t.clientId,e.heading),i=e.url,c=Object(a.useBlockProps)({className:s()(n)}),l=Object(a.useInnerBlocksProps)({},{allowedBlocks:u,orientation:"vertical",templateLock:!1});return React.createElement("div",c,React.createElement(p.b,{url:i,heading:r,setAttributes:o}),React.createElement("div",l))},w=function(){return React.createElement(a.InnerBlocks.Content,null)};function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach((function(e){Object(o.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var b=i.name,x={__experimentalLabel:function(t){return t.heading},edit:l,save:w};Object(r.registerBlockType)(b,d(d({},i),x))},12:function(t,e,n){var o,r=n(11);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var o=r(n);if("string"===o||"number"===o)t.push(n);else if(Array.isArray(n)){if(n.length){var s=c.apply(null,n);s&&t.push(s)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var p in n)i.call(n,p)&&n[p]&&t.push(p);else t.push(n.toString())}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):"object"===r(n(13))&&n(13)?void 0===(o=function(){return c}.apply(e,[]))||(t.exports=o):window.classNames=c}()},13:function(t,e){(function(e){t.exports=e}).call(this,{})},18:function(t,e){t.exports=window.wp.primitives},2:function(t,e){t.exports=window.wp.i18n},29:function(t,e){t.exports=window.wp.apiFetch},3:function(t,e){t.exports=window.wp.components},31:function(t,e){t.exports=window.wp.url},395:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-categorized","title":"Topic Index Categorized","description":"A heading the collapses and expands to show content","category":"layout","keywords":["topic index","categorized","collapsible"],"attributes":{"heading":{"type":"string"},"url":{"type":"string"}},"supports":{"html":false}}')},4:function(t,e){t.exports=window.wp.element},43:function(t,e){t.exports=window.wp.htmlEntities},45:function(t,e){t.exports=window.wp.coreData},47:function(t,e){t.exports=window.wp.date},5:function(t,e){t.exports=window.wp.blockEditor},51:function(t,e){t.exports=window.ReactDOM},52:function(t,e){t.exports=regeneratorRuntime},56:function(t,e){t.exports=window.wp.keycodes},57:function(t,e){t.exports=window.wp.mediaUtils},7:function(t,e){t.exports=window.wp.blocks},9:function(t,e){t.exports=window.wp.data},971:function(t,e,n){n(16),t.exports=n(1047)}},[[971,0,1,2]]]);
//# sourceMappingURL=topic-index-categorized-8a4f7feb.js.map