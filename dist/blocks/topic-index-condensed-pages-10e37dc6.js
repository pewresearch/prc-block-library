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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[16],{10:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=r=function(e){return typeof e}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(t)}e.exports=r},11:function(e,t,r){var o,n=r(10);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)&&r.length){var s=i.apply(null,r);s&&e.push(s)}else if("object"===o)for(var l in r)c.call(r,l)&&r[l]&&e.push(l)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===n(r(13))&&r(13)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},126:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-pages","category":"layout","attributes":{},"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/topic-index-condensed-controller"]}')},13:function(e,t){(function(t){e.exports=t}).call(this,{})},17:function(e,t,r){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},2:function(e,t){e.exports=wp.i18n},216:function(e,t,r){r(17),e.exports=r(240)},240:function(e,t,r){"use strict";r.r(t);var o=r(5),n=r(6),c=r(2),i=r(126),s=r(11),l=r.n(s),p=r(3),a=r(7),u=["prc-block/topic-index-condensed-page"],f=function(e){e.attributes,e.setAttributes;var t=e.className,r=e.clientId,o=(Object(a.useDispatch)("core/block-editor").updateBlockAttributes,Object(a.useSelect)((function(e){var t=e("core/block-editor"),o=t.getBlockOrder,n=(0,t.getBlockRootClientId)(r);return{hasChildBlocks:0<o(r).length,rootClientId:n}}),[r])),n=(o.hasChildBlocks,o.rootClientId,Object(p.useBlockProps)({className:l()(t,"column eleven wide")})),c=Object(p.__experimentalUseInnerBlocksProps)(n,{allowedBlocks:u,orientation:"vertical",templateLock:!1,renderAppender:!1});return React.createElement("div",c)},b=function(){return React.createElement(p.InnerBlocks.Content,null)};function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var k=i.name,O={title:Object(c.__)("Pages"),description:Object(c.__)("A sub block of Topic Index - Condensed View, this block controls the right side pages."),edit:f,save:b};Object(n.registerBlockType)(k,y(y({},i),O))},3:function(e,t){e.exports=wp.blockEditor},5:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},6:function(e,t){e.exports=wp.blocks},7:function(e,t){e.exports=wp.data}},[[216,0]]]);
//# sourceMappingURL=topic-index-condensed-pages-10e37dc6.js.map