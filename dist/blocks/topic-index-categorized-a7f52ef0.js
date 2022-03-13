/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.9
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[57],{1:function(e,t){e.exports=window.React},1012:function(e,t,n){"use strict";n.r(t);var o=n(14),r=n(2),i=n(12),c=n(352),s=n(18),p=n.n(s),a=n(45),l=n(5),u=["prc-block/taxonomy-tree"],w=function(e){var t=e.attributes,n=e.className,o=e.setAttributes,i=e.clientId,c=t.heading,s=t.url,w=Object(l.useBlockProps)({className:p()(n)}),f=Object(l.useInnerBlocksProps)({},{allowedBlocks:u,orientation:"vertical",templateLock:!1,renderAppender:function(){return React.createElement(a.a,{label:Object(r.__)("Add New Tree List"),blockName:"prc-block/taxonomy-tree",clientId:i})}});return React.createElement("div",w,React.createElement(a.b,{url:s,heading:c,setAttributes:o}),React.createElement("div",f))},f=function(){return React.createElement(l.InnerBlocks.Content,null)};function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=c.name,O={title:Object(r.__)("Topic Index Categorized"),description:"A collapsible list that allows taxonomy trees to be inserted.",category:"layout",keywords:[Object(r.__)("Topic Index"),Object(r.__)("Categorized"),Object(r.__)("Topic")],edit:w,save:f};Object(i.registerBlockType)(y,b(b({},c),O))},11:function(e,t){e.exports=window.wp.data},12:function(e,t){e.exports=window.wp.blocks},18:function(e,t,n){var o,r=n(19);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var s=c.apply(null,n);s&&e.push(s)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var p in n)i.call(n,p)&&n[p]&&e.push(p);else e.push(n.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===r(n(21))&&n(21)?void 0===(o=function(){return c}.apply(t,[]))||(e.exports=o):window.classNames=c}()},2:function(e,t){e.exports=window.wp.i18n},21:function(e,t){(function(t){e.exports=t}).call(this,{})},25:function(e,t){e.exports=window.wp.primitives},29:function(e,t){e.exports=window.wp.apiFetch},3:function(e,t){e.exports=window.wp.components},352:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-categorized","category":"layout","attributes":{"heading":{"type":"string"},"url":{"type":"string"}},"supports":{"html":false}}')},36:function(e,t){e.exports=window.wp.url},38:function(e,t){e.exports=window.wp.htmlEntities},4:function(e,t){e.exports=window.wp.element},49:function(e,t){e.exports=window.ReactDOM},5:function(e,t){e.exports=window.wp.blockEditor},50:function(e,t){e.exports=regeneratorRuntime},63:function(e,t){e.exports=window.wp.mediaUtils},65:function(e,t){e.exports=window.wp.keycodes},962:function(e,t,n){n(24),e.exports=n(1012)}},[[962,0,1,2]]]);
//# sourceMappingURL=topic-index-categorized-a7f52ef0.js.map