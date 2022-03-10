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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[59],{1:function(e,t){e.exports=window.React},1017:function(e,t,n){"use strict";n.r(t);var o=n(14),r=n(12),i=n(2),c=n(359),s=n(18),p=n.n(s),l=n(46),a=n(5),u=["prc-block/topic-index-condensed-menu-item"],w=function(e){var t=e.className,n=e.clientId,o=Object(a.useBlockProps)({className:p()(t,"column five wide")}),r=Object(a.useInnerBlocksProps)({className:"ui vertical fluid tabular menu"},{allowedBlocks:u,orientation:"vertical",templateLock:!1,renderAppender:function(){return React.createElement(l.a,{label:"Add New Menu Item",blockName:"prc-block/topic-index-condensed-menu-item",clientId:n})}});return React.createElement("div",o,React.createElement("div",r))},f=function(){return React.createElement(a.InnerBlocks.Content,null)};function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var m=c.name,O={title:Object(i.__)("Menu"),description:Object(i.__)("A sub block of Topic Index - Condensed View, this block controls the left sidebar menu."),edit:w,save:f};Object(r.registerBlockType)(m,b(b({},c),O))},12:function(e,t){e.exports=window.wp.blocks},18:function(e,t,n){var o,r=n(19);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var s=c.apply(null,n);s&&e.push(s)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var p in n)i.call(n,p)&&n[p]&&e.push(p);else e.push(n.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===r(n(22))&&n(22)?void 0===(o=function(){return c}.apply(t,[]))||(e.exports=o):window.classNames=c}()},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t){(function(t){e.exports=t}).call(this,{})},24:function(e,t){e.exports=window.wp.primitives},29:function(e,t){e.exports=window.wp.apiFetch},3:function(e,t){e.exports=window.wp.components},359:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-menu","category":"layout","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/topic-index-condensed-controller"]}')},36:function(e,t){e.exports=window.wp.url},38:function(e,t){e.exports=window.wp.htmlEntities},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},52:function(e,t){e.exports=window.ReactDOM},53:function(e,t){e.exports=regeneratorRuntime},64:function(e,t){e.exports=window.wp.mediaUtils},66:function(e,t){e.exports=window.wp.keycodes},9:function(e,t){e.exports=window.wp.data},966:function(e,t,n){n(25),e.exports=n(1017)}},[[966,0,1,2]]]);
//# sourceMappingURL=topic-index-condensed-menu-9d09dc46.js.map