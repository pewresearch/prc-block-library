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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[14],{1:function(e,t){e.exports=wp.element},10:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n},11:function(e,t,n){var r,o=n(10);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)&&n.length){var s=i.apply(null,n);s&&e.push(s)}else if("object"===r)for(var a in n)c.call(n,a)&&n[a]&&e.push(a)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===o(n(15))&&n(15)?void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r):window.classNames=i}()},126:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-page","category":"layout","attributes":{"title":{"type":"string"},"uuid":{"type":"string"}},"supports":{"html":false,"align":false,"inserter":false},"usesContext":["prc-block/topic-index-condensed-active"],"parent":["prc-block/topic-index-condensed-pages"]}')},15:function(e,t){(function(t){e.exports=t}).call(this,{})},17:function(e,t,n){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},2:function(e,t){e.exports=wp.i18n},215:function(e,t,n){n(17),e.exports=n(239)},216:function(e,t,n){},239:function(e,t,n){"use strict";n.r(t);var r=n(5),o=n(8),c=n(2),i=n(126),s=n(74),a=n(11),l=n.n(a),p=n(1),u=n(3),f=n(4);n(6),n(216);function b(){var e=Object(s.a)(['"page settings"']);return b=function(){return e},e}var d=function(e){var t=e.attributes,n=e.className,r=(e.clientId,e.context),o=t.title,i=t.uuid,s=r["prc-block/topic-index-condensed-active"],a=Object(u.useBlockProps)({className:l()(n,{active:i===s})}),d=Object(u.__experimentalUseInnerBlocksProps)();return Object(p.useEffect)((function(){console.log("page context",i,r)}),[r]),React.createElement(p.Fragment,null,React.createElement(u.InspectorControls,null,React.createElement(f.PanelBody,{title:Object(c.__)("Page Settings")},React.createElement(p.Fragment,null,React.createElement("p",null,"Yep, sure looks like ",Object(c.__)(b()))))),React.createElement("div",a,React.createElement("h2",null,o),React.createElement("div",d)))},y=function(){return React.createElement(u.InnerBlocks.Content,null)};function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g=i.name,j={title:Object(c.__)("Page"),description:Object(c.__)("A sub block of Topic Index - Condensed View, this block controls the right side pages of content corresponding to an item from the menu."),edit:d,save:y};Object(o.registerBlockType)(g,O(O({},i),j))},3:function(e,t){e.exports=wp.blockEditor},4:function(e,t){e.exports=wp.components},5:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},6:function(e,t){e.exports=wp.data},74:function(e,t,n){"use strict";function r(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}n.d(t,"a",(function(){return r}))},8:function(e,t){e.exports=wp.blocks}},[[215,0]]]);
//# sourceMappingURL=topic-index-condensed-page-a4278db6.js.map