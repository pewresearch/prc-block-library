/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[21],{0:function(e,t){e.exports=wp.element},13:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n},142:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-page","category":"layout","attributes":{"title":{"type":"string"},"uuid":{"type":"string"}},"supports":{"html":false,"align":false,"inserter":false},"usesContext":["prc-block/topic-index-condensed-active"],"parent":["prc-block/topic-index-condensed-pages"]}')},17:function(e,t){(function(t){e.exports=t}).call(this,{})},19:function(e,t,n){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},2:function(e,t){e.exports=wp.i18n},244:function(e,t,n){n(19),e.exports=n(266)},245:function(e,t,n){},266:function(e,t,n){"use strict";n.r(t);var r=n(5),o=n(6),c=n(2),i=n(142),s=n(9),a=n.n(s),l=n(0),p=n(3),u=n(4),f=n(7),b=(n(245),function(e){var t=e.attributes,n=e.className,r=e.clientId,o=e.context,i=t.title,s=t.uuid,b=o["prc-block/topic-index-condensed-active"],d=Object(f.useSelect)((function(e){return{hasChildBlocks:0<(0,e("core/block-editor").getBlockOrder)(r).length}}),[r]).hasChildBlocks,y=Object(p.useBlockProps)({className:a()(n,{active:s===b})}),m=Object(p.__experimentalUseInnerBlocksProps)({className:"pages"},{renderAppender:d?p.InnerBlocks.DefaultBlockAppender:p.InnerBlocks.ButtonBlockAppender});return Object(l.useEffect)((function(){console.log("page context",s,o)}),[o]),React.createElement(l.Fragment,null,React.createElement(p.InspectorControls,null,React.createElement(u.PanelBody,{title:Object(c.__)("Page Settings")},React.createElement(l.Fragment,null,React.createElement("p",null,"Page Settings WIP")))),React.createElement("div",y,React.createElement("h2",{className:"sans-serif"},i),React.createElement("div",m)))}),d=function(){return React.createElement(p.InnerBlocks.Content,null)};function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g=i.name,O={title:Object(c.__)("Page"),description:Object(c.__)("A sub block of Topic Index - Condensed View, this block controls the right side pages of content corresponding to an item from the menu."),edit:b,save:d};Object(o.registerBlockType)(g,m(m({},i),O))},3:function(e,t){e.exports=wp.blockEditor},4:function(e,t){e.exports=wp.components},5:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},6:function(e,t){e.exports=wp.blocks},7:function(e,t){e.exports=wp.data},9:function(e,t,n){var r,o=n(13);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)&&n.length){var s=i.apply(null,n);s&&e.push(s)}else if("object"===r)for(var a in n)c.call(n,a)&&n[a]&&e.push(a)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===o(n(17))&&n(17)?void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r):window.classNames=i}()}},[[244,0]]]);
//# sourceMappingURL=topic-index-condensed-page-61aefdef.js.map