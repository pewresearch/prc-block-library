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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[72],{1:function(e,t){e.exports=window.React},10:function(e,t){e.exports=window.wp.data},17:function(e,t,n){var r,o=n(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)){if(n.length){var s=c.apply(null,n);s&&e.push(s)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var p in n)i.call(n,p)&&n[p]&&e.push(p);else e.push(n.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===o(n(19))&&n(19)?void 0===(r=function(){return c}.apply(t,[]))||(e.exports=r):window.classNames=c}()},19:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},26:function(e,t){e.exports=window.wp.primitives},3:function(e,t){e.exports=window.wp.components},30:function(e,t){e.exports=window.wp.apiFetch},32:function(e,t){e.exports=window.wp.url},39:function(e,t){e.exports=window.wp.htmlEntities},393:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-categorized","category":"layout","attributes":{"heading":{"type":"string"},"url":{"type":"string"}},"supports":{"html":false}}')},4:function(e,t){e.exports=window.wp.element},46:function(e,t){e.exports=window.ReactDOM},5:function(e,t){e.exports=window.wp.blockEditor},53:function(e,t){e.exports=regeneratorRuntime},58:function(e,t){e.exports=window.wp.keycodes},63:function(e,t){e.exports=window.wp.mediaUtils},793:function(e,t,n){n(21),e.exports=n(862)},8:function(e,t){e.exports=window.wp.blocks},862:function(e,t,n){"use strict";n.r(t);var r=n(9),o=n(2),i=n(8),c=n(393),s=n(17),p=n.n(s),a=n(48),l=n(5),u=["prc-block/taxonomy-tree"],w=function(e){var t=e.attributes,n=e.className,r=e.setAttributes,i=e.clientId,c=t.heading,s=t.url,w=Object(l.useBlockProps)({className:p()(n)}),f=Object(l.useInnerBlocksProps)({},{allowedBlocks:u,orientation:"vertical",templateLock:!1,renderAppender:function(){return React.createElement(a.a,{label:Object(o.__)("Add New Tree List"),blockName:"prc-block/taxonomy-tree",clientId:i})}});return React.createElement("div",w,React.createElement(a.b,{url:s,heading:c,setAttributes:r}),React.createElement("div",f))},f=function(){return React.createElement(l.InnerBlocks.Content,null)};function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=c.name,O={title:Object(o.__)("Topic Index Categorized"),description:"A collapsible list that allows taxonomy trees to be inserted.",category:"layout",keywords:[Object(o.__)("Topic Index"),Object(o.__)("Categorized"),Object(o.__)("Topic")],edit:w,save:f};Object(i.registerBlockType)(y,d(d({},c),O))},9:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))}},[[793,0,1,2]]]);
//# sourceMappingURL=topic-index-categorized-7e66fa96.js.map