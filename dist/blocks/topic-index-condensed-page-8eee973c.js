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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[74],{1:function(e,t){e.exports=window.React},10:function(e,t){e.exports=window.wp.data},1029:function(e,t,n){"use strict";n.r(t);var o=n(8),r=n(7),i=n(2),c=n(398),s=n(17),p=n.n(s),a=n(42),u=n(5),l=n(10),d=function(e){var t=e.attributes,n=e.className,o=e.clientId,r=e.context,i=e.setAttributes,c=t.heading,s=t.url,d=t.uuid,w=r["prc-block/topic-index-condensed-active"],f=Object(l.useSelect)((function(e){return{hasChildBlocks:0<(0,e("core/block-editor").getBlockOrder)(o).length}}),[o]).hasChildBlocks,b=Object(u.useBlockProps)({className:p()(n,{active:d===w})}),g=Object(u.useInnerBlocksProps)({className:"pages"},{renderAppender:f?u.InnerBlocks.DefaultBlockAppender:u.InnerBlocks.ButtonBlockAppender});return React.createElement("div",b,React.createElement(a.b,{url:s,heading:c,setAttributes:i,disableIcon:!0}),React.createElement("div",g))},w=function(){return React.createElement(u.InnerBlocks.Content,null)};function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g=c.name,x={title:Object(i.__)("Page"),description:Object(i.__)("A sub block of Topic Index - Condensed View, this block controls the right side pages of content corresponding to an item from the menu."),edit:d,save:w};Object(r.registerBlockType)(g,b(b({},c),x))},16:function(e,t){e.exports=window.wp.primitives},17:function(e,t,n){var o,r=n(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var s=c.apply(null,n);s&&e.push(s)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var p in n)i.call(n,p)&&n[p]&&e.push(p);else e.push(n.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===r(n(18))&&n(18)?void 0===(o=function(){return c}.apply(t,[]))||(e.exports=o):window.classNames=c}()},18:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},29:function(e,t){e.exports=window.wp.apiFetch},3:function(e,t){e.exports=window.wp.components},31:function(e,t){e.exports=window.wp.url},398:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-page","category":"layout","attributes":{"heading":{"type":"string"},"uuid":{"type":"string"},"url":{"type":"string"}},"supports":{"html":false,"align":false,"inserter":false},"usesContext":["prc-block/topic-index-condensed-active"],"parent":["prc-block/topic-index-condensed-pages"]}')},4:function(e,t){e.exports=window.wp.element},43:function(e,t){e.exports=window.wp.htmlEntities},45:function(e,t){e.exports=window.wp.coreData},47:function(e,t){e.exports=window.wp.date},5:function(e,t){e.exports=window.wp.blockEditor},51:function(e,t){e.exports=regeneratorRuntime},52:function(e,t){e.exports=window.ReactDOM},56:function(e,t){e.exports=window.wp.keycodes},57:function(e,t){e.exports=window.wp.mediaUtils},7:function(e,t){e.exports=window.wp.blocks},974:function(e,t,n){n(13),e.exports=n(1029)}},[[974,0,1,2]]]);
//# sourceMappingURL=topic-index-condensed-page-8eee973c.js.map