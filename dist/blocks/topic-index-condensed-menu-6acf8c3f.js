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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[37],{1:function(e,t){e.exports=window.React},16:function(e,t,n){var o,r=n(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var s=i.apply(null,n);s&&e.push(s)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var p in n)c.call(n,p)&&n[p]&&e.push(p);else e.push(n.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===r(n(19))&&n(19)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},18:function(e,t){e.exports=window.wp.data},2:function(e,t){e.exports=window.wp.i18n},296:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-menu","category":"layout","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/topic-index-condensed-controller"]}')},3:function(e,t){e.exports=window.wp.components},35:function(e,t){e.exports=window.wp.apiFetch},4:function(e,t){e.exports=window.wp.element},47:function(e,t){e.exports=window.wp.url},54:function(e,t){e.exports=moment},6:function(e,t){e.exports=window.wp.blockEditor},62:function(e,t){e.exports=window.wp.keycodes},63:function(e,t){e.exports=window.ReactDOM},632:function(e,t,n){n(23),e.exports=n(671)},671:function(e,t,n){"use strict";n.r(t);var o=n(14),r=n(9),c=n(2),i=n(296),s=n(16),p=n.n(s),a=n(33),l=n(6),u=["prc-block/topic-index-condensed-menu-item"],d=function(e){var t=e.className,n=e.clientId,o=Object(l.useBlockProps)({className:p()(t,"column five wide")}),r=Object(l.__experimentalUseInnerBlocksProps)({className:"ui vertical fluid secondary menu"},{allowedBlocks:u,orientation:"vertical",templateLock:!1,renderAppender:function(){return React.createElement(a.a,{label:"Add New Menu Item",blockName:"prc-block/topic-index-condensed-menu-item",clientId:n})}});return React.createElement("div",o,React.createElement("div",r))},f=function(){return React.createElement(l.InnerBlocks.Content,null)};function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var m=i.name,O={title:Object(c.__)("Menu"),description:Object(c.__)("A sub block of Topic Index - Condensed View, this block controls the left sidebar menu."),edit:d,save:f};Object(r.registerBlockType)(m,b(b({},i),O))},9:function(e,t){e.exports=window.wp.blocks}},[[632,0,1,2]]]);
//# sourceMappingURL=topic-index-condensed-menu-6acf8c3f.js.map