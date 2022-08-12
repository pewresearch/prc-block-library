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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[7],{15:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},16:function(e,t,r){var o,n=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var l=i.apply(null,r);l&&e.push(l)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var s in r)c.call(r,s)&&r[s]&&e.push(s);else e.push(r.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===n(r(18))&&r(18)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},18:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},3:function(e,t){e.exports=window.wp.components},396:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/carousel","title":"Carousel","description":"Organize content in a vertical or horizontal carousel.","icon":"arrow-down-alt2","keywords":["scroll","carousel","slider","scrolly","scrolley","scrollytelly","scrolleytelley"],"category":"essay","attributes":{"direction":{"type":"string","default":"vertical"}},"supports":{"html":false},"providesContext":{"prc-block/carousel/direction":"direction"}}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},792:function(e,t,r){r(22),e.exports=r(840)},8:function(e,t){e.exports=window.wp.blocks},840:function(e,t,r){"use strict";r.r(t);var o=r(9),n=r(2),c=r(8),i=r(396),l=r(16),s=r.n(l),a=r(4),u=r(5),p=r(3),f=["core/group"],b=function(e){var t=e.attributes,r=e.className,o=e.setAttributes,c=t.direction,i=Object(u.useBlockProps)({className:s()(r)}),l=Object(u.useInnerBlocksProps)(i,{allowedBlocks:f,orientation:c,templateLock:!1});return React.createElement(a.Fragment,null,React.createElement(u.BlockControls,null,React.createElement(p.ToolbarGroup,null,React.createElement(p.ToolbarButton,{icon:Object(n.sprintf)("arrow-%s-alt2","vertical"===c?"down":"right"),label:"Carousel Direction",onClick:function(){return o({direction:"vertical"===c?"horizontal":"vertical"})}}))),React.createElement("div",l))},y=function(){return React.createElement(u.InnerBlocks.Content,null)};function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m=i.name,O={edit:b,save:y};Object(c.registerBlockType)(m,d(d({},i),O))},9:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))}},[[792,0]]]);
//# sourceMappingURL=carousel-2db6cc0b.js.map