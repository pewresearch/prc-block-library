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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[72],{1:function(e,t){e.exports=window.React},1050:function(e,t,n){"use strict";n.r(t);var o=n(8),r=n(7),i=n(2),c=n(401),s=n(12),p=n.n(s),l=n(43),a=n(5),u=["prc-block/topic-index-condensed-menu-item"],w=function(e){var t=e.className,n=e.clientId,o=Object(a.useBlockProps)({className:p()(t,"column five wide")}),r=Object(a.useInnerBlocksProps)({className:"ui vertical fluid tabular menu"},{allowedBlocks:u,orientation:"vertical",templateLock:!1,renderAppender:function(){return React.createElement(l.a,{label:"Add New Menu Item",blockName:"prc-block/topic-index-condensed-menu-item",clientId:n})}});return React.createElement("div",o,React.createElement("div",r))},f=function(){return React.createElement(a.InnerBlocks.Content,null)};function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var m=c.name,O={title:Object(i.__)("Menu"),description:Object(i.__)("A sub block of Topic Index - Condensed View, this block controls the left sidebar menu."),edit:w,save:f};Object(r.registerBlockType)(m,b(b({},c),O))},12:function(e,t,n){var o,r=n(11);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var s=c.apply(null,n);s&&e.push(s)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var p in n)i.call(n,p)&&n[p]&&e.push(p);else e.push(n.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===r(n(13))&&n(13)?void 0===(o=function(){return c}.apply(t,[]))||(e.exports=o):window.classNames=c}()},13:function(e,t){(function(t){e.exports=t}).call(this,{})},19:function(e,t){e.exports=window.wp.primitives},2:function(e,t){e.exports=window.wp.i18n},29:function(e,t){e.exports=window.wp.apiFetch},3:function(e,t){e.exports=window.wp.components},31:function(e,t){e.exports=window.wp.url},4:function(e,t){e.exports=window.wp.element},401:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-menu","category":"layout","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/topic-index-condensed-controller"]}')},42:function(e,t){e.exports=window.wp.htmlEntities},49:function(e,t){e.exports=window.ReactDOM},5:function(e,t){e.exports=window.wp.blockEditor},50:function(e,t){e.exports=regeneratorRuntime},54:function(e,t){e.exports=window.wp.keycodes},55:function(e,t){e.exports=window.wp.mediaUtils},7:function(e,t){e.exports=window.wp.blocks},9:function(e,t){e.exports=window.wp.data},974:function(e,t,n){n(17),e.exports=n(1050)}},[[974,0,1,2]]]);
//# sourceMappingURL=topic-index-condensed-menu-07323533.js.map