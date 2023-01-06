/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.27
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2023 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[6],{12:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},18:function(e,t,r){var o,n=r(20);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var s=i.apply(null,r);s&&e.push(s)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var a in r)c.call(r,a)&&r[a]&&e.push(a);else e.push(r.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===n(r(19))&&r(19)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},19:function(e,t){(function(t){e.exports=t}).call(this,{})},191:function(e,t,r){"use strict";r.d(t,"a",(function(){return n}));var o=r(3);function n(){return React.createElement(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",height:21,preserveAspectRatio:"xMidYMid meet"},React.createElement(o.Path,{d:"M448 128C483.3 128 512 156.7 512 192V448C512 483.3 483.3 512 448 512H64C28.65 512 0 483.3 0 448V192C0 156.7 28.65 128 64 128H448zM448 160H64C46.33 160 32 174.3 32 192V448C32 465.7 46.33 480 64 480H448C465.7 480 480 465.7 480 448V192C480 174.3 465.7 160 448 160zM448 64C456.8 64 464 71.16 464 80C464 88.84 456.8 96 448 96H64C55.16 96 48 88.84 48 80C48 71.16 55.16 64 64 64H448zM400 0C408.8 0 416 7.164 416 16C416 24.84 408.8 32 400 32H112C103.2 32 96 24.84 96 16C96 7.164 103.2 0 112 0H400z"}))}},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},3:function(e,t){e.exports=window.wp.components},356:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/carousel","title":"Carousel","description":"Organize content in a vertical or horizontal carousel.","keywords":["scroll","carousel","slider","scrolly","scrolley","scrollytelly","scrolleytelley"],"category":"essay","supports":{"html":false,"align":["wide","full"],"spacing":{"margin":["top","bottom"],"padding":true},"__experimentalMetadata":true},"providesContext":{"prc-block/carousel/direction":"direction"},"styles":[{"name":"vertical","label":"Vertical","isDefault":true},{"name":"horizontal","label":"Horizontal"}]}')},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},749:function(e,t,r){r(12),e.exports=r(767)},767:function(e,t,r){"use strict";r.r(t);var o=r(8),n=r(7),c=r(356),i=r(18),s=r.n(i),a=r(5),l=["prc-block/carousel-slide"],u=function(e){e.attributes;var t=e.className,r=(e.setAttributes,e.clientId,Object(a.useBlockProps)({className:s()(t)})),o=Object(a.useInnerBlocksProps)(r,{allowedBlocks:l,templateLock:!1,template:[["prc-block/carousel-slide",{},[["core/paragraph",{placeholder:"You can use any blocks inside this carousel slide."}]]]]});return React.createElement("div",o)},p=function(){return React.createElement(a.InnerBlocks.Content,null)},f=r(2);var b=[{name:"carousel-vertical",title:Object(f.__)("Carousel Vertical"),description:Object(f.__)("A vertical carousel."),icon:React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",width:"24",height:"24"},React.createElement("path",{d:"M512 448C512 483.3 483.3 512 448 512H64C28.65 512 0 483.3 0 448V224C0 188.7 28.65 160 64 160H448C483.3 160 512 188.7 512 224V448zM440 80C453.3 80 464 90.75 464 104C464 117.3 453.3 128 440 128H72C58.75 128 48 117.3 48 104C48 90.75 58.75 80 72 80H440zM392 0C405.3 0 416 10.75 416 24C416 37.25 405.3 48 392 48H120C106.7 48 96 37.25 96 24C96 10.75 106.7 0 120 0H392z"})),attributes:{className:"is-style-vertical"},isDefault:!0},{name:"carousel-horizontal",title:Object(f.__)("Carousel Horizontal"),description:Object(f.__)("A horizontal carousel."),icon:React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 576 512",width:"24",height:"21"},React.createElement("path",{d:"M512 0C547.3 0 576 28.65 576 64V448C576 483.3 547.3 512 512 512H256C220.7 512 192 483.3 192 448V64C192 28.65 220.7 0 256 0H512zM96 72C96 58.75 106.7 48 120 48C133.3 48 144 58.75 144 72V440C144 453.3 133.3 464 120 464C106.7 464 96 453.3 96 440V72zM0 120C0 106.7 10.75 96 24 96C37.25 96 48 106.7 48 120V392C48 405.3 37.25 416 24 416C10.75 416 0 405.3 0 392V120z"})),attributes:{className:"is-style-horizontal"}}],w=r(191);function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var C=c.name,m={icon:Object(w.a)(),edit:u,save:p,variations:b};Object(n.registerBlockType)(C,y(y({},c),m))},8:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))}},[[749,0]]]);
//# sourceMappingURL=carousel-controller-d3c2d10d.js.map