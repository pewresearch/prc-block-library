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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[76],{1:function(e,t){e.exports=window.React},10:function(e,t){e.exports=window.wp.data},16:function(e,t,n){var o,r=n(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var s=c.apply(null,n);s&&e.push(s)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var p in n)i.call(n,p)&&n[p]&&e.push(p);else e.push(n.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===r(n(18))&&n(18)?void 0===(o=function(){return c}.apply(t,[]))||(e.exports=o):window.classNames=c}()},18:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},25:function(e,t){e.exports=window.wp.primitives},3:function(e,t){e.exports=window.wp.components},31:function(e,t){e.exports=window.wp.apiFetch},32:function(e,t){e.exports=window.wp.url},39:function(e,t){e.exports=window.wp.htmlEntities},397:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-page","category":"layout","attributes":{"heading":{"type":"string"},"uuid":{"type":"string"},"url":{"type":"string"}},"supports":{"html":false,"align":false,"inserter":false},"usesContext":["prc-block/topic-index-condensed-active"],"parent":["prc-block/topic-index-condensed-pages"]}')},4:function(e,t){e.exports=window.wp.element},46:function(e,t){e.exports=window.ReactDOM},5:function(e,t){e.exports=window.wp.blockEditor},51:function(e,t){e.exports=regeneratorRuntime},57:function(e,t){e.exports=window.wp.keycodes},63:function(e,t){e.exports=window.wp.mediaUtils},797:function(e,t,n){n(20),e.exports=n(846)},8:function(e,t){e.exports=window.wp.blocks},846:function(e,t,n){"use strict";n.r(t);var o=n(9),r=n(8),i=n(2),c=n(397),s=n(16),p=n.n(s),a=n(48),u=n(5),l=n(10),d=function(e){var t=e.attributes,n=e.className,o=e.clientId,r=e.context,i=e.setAttributes,c=t.heading,s=t.url,d=t.uuid,f=r["prc-block/topic-index-condensed-active"],w=Object(l.useSelect)((function(e){return{hasChildBlocks:0<(0,e("core/block-editor").getBlockOrder)(o).length}}),[o]).hasChildBlocks,b=Object(u.useBlockProps)({className:p()(n,{active:d===f})}),g=Object(u.useInnerBlocksProps)({className:"pages"},{renderAppender:w?u.InnerBlocks.DefaultBlockAppender:u.InnerBlocks.ButtonBlockAppender});return React.createElement("div",b,React.createElement(a.b,{url:s,heading:c,setAttributes:i,disableIcon:!0}),React.createElement("div",g))},f=function(){return React.createElement(u.InnerBlocks.Content,null)};function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g=c.name,O={title:Object(i.__)("Page"),description:Object(i.__)("A sub block of Topic Index - Condensed View, this block controls the right side pages of content corresponding to an item from the menu."),edit:d,save:f};Object(r.registerBlockType)(g,b(b({},c),O))},9:function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return o}))}},[[797,0,1,2]]]);
//# sourceMappingURL=topic-index-condensed-page-d80aa679.js.map