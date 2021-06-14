/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.0.0
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[35],{1:function(e,t){e.exports=window.React},16:function(e,t,r){var o,n=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var s=i.apply(null,r);s&&e.push(s)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var a in r)c.call(r,a)&&r[a]&&e.push(a);else e.push(r.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===n(r(19))&&r(19)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},18:function(e,t){e.exports=window.wp.data},2:function(e,t){e.exports=window.wp.i18n},294:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-categorized","category":"layout","attributes":{"heading":{"type":"string"},"url":{"type":"string"}},"supports":{"html":false}}')},3:function(e,t){e.exports=window.wp.components},35:function(e,t){e.exports=window.wp.apiFetch},4:function(e,t){e.exports=window.wp.element},47:function(e,t){e.exports=window.wp.url},54:function(e,t){e.exports=moment},6:function(e,t){e.exports=window.wp.blockEditor},62:function(e,t){e.exports=window.wp.keycodes},63:function(e,t){e.exports=window.ReactDOM},630:function(e,t,r){r(23),e.exports=r(669)},669:function(e,t,r){"use strict";r.r(t);var o=r(14),n=r(2),c=r(9),i=r(294),s=r(16),a=r.n(s),p=r(33),l=r(6),u=["prc-block/taxonomy-tree"],w=function(e){var t=e.attributes,r=e.className,o=e.setAttributes,c=e.clientId,i=t.heading,s=t.url,w=Object(l.useBlockProps)({className:a()(r)}),b=Object(l.__experimentalUseInnerBlocksProps)({},{allowedBlocks:u,orientation:"vertical",templateLock:!1,renderAppender:function(){return React.createElement(p.a,{label:Object(n.__)("Add New Tree List"),blockName:"prc-block/taxonomy-tree",clientId:c})}});return React.createElement("div",w,React.createElement(p.b,{url:s,heading:i,setAttributes:o}),React.createElement("div",b))},b=function(){return React.createElement(l.InnerBlocks.Content,null)};function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var y=i.name,O={title:Object(n.__)("Topic Index Categorized"),description:"A collapsible list that allows taxonomy trees to be inserted.",category:"layout",keywords:[Object(n.__)("Topic Index"),Object(n.__)("Categorized"),Object(n.__)("Topic")],edit:w,save:b};Object(c.registerBlockType)(y,d(d({},i),O))},9:function(e,t){e.exports=window.wp.blocks}},[[630,0,1,2]]]);
//# sourceMappingURL=topic-index-categorized-8c637af3.js.map