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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[60],{1:function(e,t){e.exports=window.React},11:function(e,t){e.exports=window.wp.blocks},12:function(e,t){e.exports=window.wp.data},18:function(e,t,n){var o,r=n(19);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var s=c.apply(null,n);s&&e.push(s)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var p in n)i.call(n,p)&&n[p]&&e.push(p);else e.push(n.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===r(n(23))&&n(23)?void 0===(o=function(){return c}.apply(t,[]))||(e.exports=o):window.classNames=c}()},2:function(e,t){e.exports=window.wp.i18n},23:function(e,t){(function(t){e.exports=t}).call(this,{})},25:function(e,t){e.exports=window.wp.primitives},29:function(e,t){e.exports=window.wp.apiFetch},3:function(e,t){e.exports=window.wp.components},358:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-page","category":"layout","attributes":{"heading":{"type":"string"},"uuid":{"type":"string"},"url":{"type":"string"}},"supports":{"html":false,"align":false,"inserter":false},"usesContext":["prc-block/topic-index-condensed-active"],"parent":["prc-block/topic-index-condensed-pages"]}')},36:function(e,t){e.exports=window.wp.url},38:function(e,t){e.exports=window.wp.htmlEntities},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},52:function(e,t){e.exports=window.ReactDOM},61:function(e,t){e.exports=regeneratorRuntime},64:function(e,t){e.exports=window.wp.mediaUtils},66:function(e,t){e.exports=window.wp.keycodes},961:function(e,t,n){n(24),e.exports=n(991)},991:function(e,t,n){"use strict";n.r(t);var o=n(14),r=n(11),i=n(2),c=n(358),s=n(18),p=n.n(s),a=n(46),l=n(5),u=n(12),d=function(e){var t=e.attributes,n=e.className,o=e.clientId,r=e.context,i=e.setAttributes,c=t.heading,s=t.url,d=t.uuid,w=r["prc-block/topic-index-condensed-active"],f=Object(u.useSelect)((function(e){return{hasChildBlocks:0<(0,e("core/block-editor").getBlockOrder)(o).length}}),[o]).hasChildBlocks,b=Object(l.useBlockProps)({className:p()(n,{active:d===w})}),g=Object(l.useInnerBlocksProps)({className:"pages"},{renderAppender:f?l.InnerBlocks.DefaultBlockAppender:l.InnerBlocks.ButtonBlockAppender});return React.createElement("div",b,React.createElement(a.b,{url:s,heading:c,setAttributes:i,disableIcon:!0}),React.createElement("div",g))},w=function(){return React.createElement(l.InnerBlocks.Content,null)};function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g=c.name,O={title:Object(i.__)("Page"),description:Object(i.__)("A sub block of Topic Index - Condensed View, this block controls the right side pages of content corresponding to an item from the menu."),edit:d,save:w};Object(r.registerBlockType)(g,b(b({},c),O))}},[[961,0,1,2]]]);
//# sourceMappingURL=topic-index-condensed-page-dc716791.js.map