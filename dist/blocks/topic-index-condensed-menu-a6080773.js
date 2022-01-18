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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[49],{1:function(e,t){e.exports=window.React},11:function(e,t){e.exports=window.wp.blocks},15:function(e,t){e.exports=window.wp.data},2:function(e,t){e.exports=window.wp.i18n},3:function(e,t){e.exports=window.wp.element},33:function(e,t){e.exports=window.wp.apiFetch},332:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-menu","category":"layout","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/topic-index-condensed-controller"]}')},4:function(e,t){e.exports=window.wp.components},43:function(e,t){e.exports=window.wp.url},53:function(e,t){e.exports=moment},55:function(e,t){e.exports=window.ReactDOM},6:function(e,t){e.exports=window.wp.blockEditor},87:function(e,t){e.exports=window.wp.keycodes},910:function(e,t,n){n(24),e.exports=n(957)},957:function(e,t,n){"use strict";n.r(t);var o=n(13),c=n(11),r=n(2),i=n(332),s=n(16),p=n.n(s),l=n(47),a=n(6),u=["prc-block/topic-index-condensed-menu-item"],d=function(e){var t=e.className,n=e.clientId,o=Object(a.useBlockProps)({className:p()(t,"column five wide")}),c=Object(a.useInnerBlocksProps)({className:"ui vertical fluid tabular menu"},{allowedBlocks:u,orientation:"vertical",templateLock:!1,renderAppender:function(){return React.createElement(l.a,{label:"Add New Menu Item",blockName:"prc-block/topic-index-condensed-menu-item",clientId:n})}});return React.createElement("div",o,React.createElement("div",c))},w=function(){return React.createElement(a.InnerBlocks.Content,null)};function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var m=i.name,O={title:Object(r.__)("Menu"),description:Object(r.__)("A sub block of Topic Index - Condensed View, this block controls the left sidebar menu."),edit:d,save:w};Object(c.registerBlockType)(m,f(f({},i),O))}},[[910,0,1,2]]]);
//# sourceMappingURL=topic-index-condensed-menu-a6080773.js.map