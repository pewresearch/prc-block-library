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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[34],{10:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},12:function(e,t){e.exports=wp.blocks},15:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=n=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),n(t)}e.exports=n,e.exports.default=e.exports,e.exports.__esModule=!0},17:function(e,t){e.exports=wp.data},18:function(e,t,n){var r,o=n(15);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)&&n.length){var u=i.apply(null,n);u&&e.push(u)}else if("object"===r)for(var l in n)c.call(n,l)&&n[l]&&e.push(l)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===o(n(20))&&n(20)?void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r):window.classNames=i}()},2:function(e,t){e.exports=wp.i18n},20:function(e,t){(function(t){e.exports=t}).call(this,{})},22:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(37);var o=n(28),c=n(38);function i(e,t){return Object(r.a)(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,c=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,c=e}finally{try{r||null==u.return||u.return()}finally{if(o)throw c}}return n}}(e,t)||Object(o.a)(e,t)||Object(c.a)()}},24:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},25:function(e,t,n){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},28:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(24);function o(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},298:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-controller","category":"layout","attributes":{"active":{"type":"string","default":null}},"providesContext":{"prc-block/topic-index-condensed-active":"active"},"supports":{"html":false,"align":false}}')},3:function(e,t){e.exports=wp.element},37:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},38:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},4:function(e,t){e.exports=wp.components},647:function(e,t,n){n(25),e.exports=n(684)},684:function(e,t,n){"use strict";n.r(t);var r=n(10),o=n(12),c=n(2),i=n(298),u=n(22),l=n(18),s=n.n(l),a=n(3),p=n(7),f=n(4),d=n(17),b=[["prc-block/topic-index-condensed-menu",{}],["prc-block/topic-index-condensed-pages",{}]],y=["prc-block/topic-index-condensed-menu","prc-block/topic-index-condensed-pages"],m=function(e){var t=e.className,n=e.clientId,r=(e.setAttributes,Object(a.useState)(!1)),o=Object(u.a)(r,2),i=o[0],l=o[1],m=Object(p.useBlockProps)({className:s()(t,"ui divided grid")}),O=Object(p.__experimentalUseInnerBlocksProps)(m,{allowedBlocks:y,renderAppender:!1,template:b,templateLock:"all"}),v=Object(d.useSelect)((function(e){var t=e("core/block-editor").getBlocks(n),r=1<=t.length?t.filter((function(e){return"prc-block/topic-index-condensed-menu"===e.name})):[],o=1<=t.length?t.filter((function(e){return"prc-block/topic-index-condensed-pages"===e.name})):[];return{menuBlocks:1<=r.length&&r[0].innerBlocks,pageBlocks:1<=o.length&&o[0].innerBlocks}})),g=v.menuBlocks,j=v.pageBlocks;return Object(a.useEffect)((function(){if(g.length<i.length){var e=(r=g,o=function(e){return function(t){return 0===e.filter((function(e){return e.attributes.uuid===t.attributes.uuid})).length}},c=(n=i).filter(o(r)),u=r.filter(o(n)),c.concat(u)),t=j.filter((function(t){return t.attributes.uuid===e[0].attributes.uuid}));Object(d.dispatch)("core/block-editor").removeBlock(t[0].clientId)}var n,r,o,c,u;l(g)}),[g]),React.createElement(a.Fragment,null,React.createElement(p.BlockControls,null),React.createElement(p.InspectorControls,null,React.createElement(f.PanelBody,{title:Object(c.__)("Controller Settings")},React.createElement(a.Fragment,null,"Controller Settings"))),React.createElement("div",{className:"ui container"},React.createElement("div",O)))},O=function(){return React.createElement(p.InnerBlocks.Content,null)};function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var j=i.name,x={title:Object(c.__)("Topic Index - Condensed View"),description:Object(c.__)('The condensed, or "schwoopy" version of the topic index.'),keywords:[Object(c.__)("Topics"),Object(c.__)("Topic"),Object(c.__)("Index"),Object(c.__)("Schwoopy")],edit:m,save:O};Object(o.registerBlockType)(j,g(g({},i),x))},7:function(e,t){e.exports=wp.blockEditor}},[[647,0]]]);
//# sourceMappingURL=topic-index-condensed-controller-07d8d6a3.js.map