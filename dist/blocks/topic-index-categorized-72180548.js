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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[67],{1:function(t,e){t.exports=window.React},1049:function(t,e,n){"use strict";n.r(e);var o=n(10),r=n(8),i=n(415),c=n(14),s=n.n(c),p=n(45),a=(n(2),n(5)),l=["prc-block/taxonomy-tree","core/navigation"],u=function(t){var e=t.attributes,n=t.className,o=t.setAttributes,r=(t.clientId,e.heading),i=e.url,c=Object(a.useBlockProps)({className:s()(n)}),u=Object(a.useInnerBlocksProps)({},{allowedBlocks:l,orientation:"vertical",templateLock:!1});return React.createElement("div",c,React.createElement(p.b,{url:i,heading:r,setAttributes:o}),React.createElement("div",u))},w=function(){return React.createElement(a.InnerBlocks.Content,null)};function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach((function(e){Object(o.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var b=i.name,g={__experimentalLabel:function(t){return t.heading},edit:u,save:w};Object(r.registerBlockType)(b,d(d({},i),g))},14:function(t,e,n){var o,r=n(12);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var o=r(n);if("string"===o||"number"===o)t.push(n);else if(Array.isArray(n)){if(n.length){var s=c.apply(null,n);s&&t.push(s)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var p in n)i.call(n,p)&&n[p]&&t.push(p);else t.push(n.toString())}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):"object"===r(n(15))&&n(15)?void 0===(o=function(){return c}.apply(e,[]))||(t.exports=o):window.classNames=c}()},15:function(t,e){(function(e){t.exports=e}).call(this,{})},2:function(t,e){t.exports=window.wp.i18n},23:function(t,e){t.exports=window.wp.primitives},28:function(t,e){t.exports=window.wp.apiFetch},3:function(t,e){t.exports=window.wp.components},32:function(t,e){t.exports=window.wp.url},4:function(t,e){t.exports=window.wp.element},40:function(t,e){t.exports=window.wp.htmlEntities},415:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-categorized","title":"Topic Index Categorized","description":"A heading the collapses and expands to show content","category":"layout","keywords":["topic index","categorized","collapsible"],"attributes":{"heading":{"type":"string"},"url":{"type":"string"}},"supports":{"html":false}}')},49:function(t,e){t.exports=regeneratorRuntime},5:function(t,e){t.exports=window.wp.blockEditor},56:function(t,e){t.exports=window.wp.keycodes},57:function(t,e){t.exports=window.ReactDOM},59:function(t,e){t.exports=window.wp.mediaUtils},8:function(t,e){t.exports=window.wp.blocks},9:function(t,e){t.exports=window.wp.data},976:function(t,e,n){n(22),t.exports=n(1049)}},[[976,0,1,2]]]);
//# sourceMappingURL=topic-index-categorized-72180548.js.map