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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[59],{1:function(e,t){e.exports=window.React},11:function(e,t){e.exports=window.wp.blocks},13:function(e,t){e.exports=window.wp.data},17:function(e,t,n){var o,r=n(18);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var s=i.apply(null,n);s&&e.push(s)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var p in n)c.call(n,p)&&n[p]&&e.push(p);else e.push(n.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===r(n(21))&&n(21)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},2:function(e,t){e.exports=window.wp.i18n},21:function(e,t){(function(t){e.exports=t}).call(this,{})},25:function(e,t){e.exports=window.wp.primitives},29:function(e,t){e.exports=window.wp.apiFetch},3:function(e,t){e.exports=window.wp.element},357:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-page","category":"layout","attributes":{"heading":{"type":"string"},"uuid":{"type":"string"},"url":{"type":"string"}},"supports":{"html":false,"align":false,"inserter":false},"usesContext":["prc-block/topic-index-condensed-active"],"parent":["prc-block/topic-index-condensed-pages"]}')},36:function(e,t){e.exports=window.wp.url},38:function(e,t){e.exports=window.wp.htmlEntities},4:function(e,t){e.exports=window.wp.components},5:function(e,t){e.exports=window.wp.blockEditor},55:function(e,t){e.exports=window.ReactDOM},63:function(e,t){e.exports=regeneratorRuntime},65:function(e,t){e.exports=window.wp.keycodes},959:function(e,t,n){n(24),e.exports=n(989)},989:function(e,t,n){"use strict";n.r(t);var o=n(14),r=n(11),c=n(2),i=n(357),s=n(17),p=n.n(s),a=n(46),l=n(5),u=n(13),d=function(e){var t=e.attributes,n=e.className,o=e.clientId,r=e.context,c=e.setAttributes,i=t.heading,s=t.url,d=t.uuid,f=r["prc-block/topic-index-condensed-active"],w=Object(u.useSelect)((function(e){return{hasChildBlocks:0<(0,e("core/block-editor").getBlockOrder)(o).length}}),[o]).hasChildBlocks,b=Object(l.useBlockProps)({className:p()(n,{active:d===f})}),g=Object(l.useInnerBlocksProps)({className:"pages"},{renderAppender:w?l.InnerBlocks.DefaultBlockAppender:l.InnerBlocks.ButtonBlockAppender});return React.createElement("div",b,React.createElement(a.b,{url:s,heading:i,setAttributes:c,disableIcon:!0}),React.createElement("div",g))},f=function(){return React.createElement(l.InnerBlocks.Content,null)};function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g=i.name,O={title:Object(c.__)("Page"),description:Object(c.__)("A sub block of Topic Index - Condensed View, this block controls the right side pages of content corresponding to an item from the menu."),edit:d,save:f};Object(r.registerBlockType)(g,b(b({},i),O))}},[[959,0,1,2]]]);
//# sourceMappingURL=topic-index-condensed-page-53419304.js.map