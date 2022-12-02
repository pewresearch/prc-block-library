/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.26
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[75],{11:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},12:function(e,t,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},15:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n(22);var o=n(17),c=n(23);function i(e,t){return Object(r.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],i=!0,u=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);i=!0);}catch(e){u=!0,o=e}finally{try{i||null==n.return||n.return()}finally{if(u)throw o}}return c}}(e,t)||Object(o.a)(e,t)||Object(c.a)()}},17:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(11);function o(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},18:function(e,t,n){var r,o=n(20);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)){if(n.length){var u=i.apply(null,n);u&&e.push(u)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var l in n)c.call(n,l)&&n[l]&&e.push(l);else e.push(n.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===o(n(19))&&n(19)?void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r):window.classNames=i}()},19:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t){function n(t){return e.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,n(t)}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports},22:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},23:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},3:function(e,t){e.exports=window.wp.components},347:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-controller","category":"layout","attributes":{"active":{"type":"string","default":null}},"providesContext":{"prc-block/topic-index-condensed-active":"active"},"supports":{"html":false,"align":false}}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},740:function(e,t,n){n(12),e.exports=n(816)},8:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},816:function(e,t,n){"use strict";n.r(t);var r=n(8),o=n(7),c=n(2),i=n(347),u=n(15),l=n(18),a=n.n(l),s=n(4),p=n(5),f=n(3),d=n(9),b=[["prc-block/topic-index-condensed-menu",{}],["prc-block/topic-index-condensed-pages",{}]],y=["prc-block/topic-index-condensed-menu","prc-block/topic-index-condensed-pages"],m=function(e){var t=e.className,n=e.clientId,r=(e.setAttributes,Object(s.useState)(!1)),o=Object(u.a)(r,2),i=o[0],l=o[1],m=Object(p.useBlockProps)({className:a()(t,"ui divided grid")}),w=Object(p.useInnerBlocksProps)(m,{allowedBlocks:y,renderAppender:!1,template:b,templateLock:"all"}),O=Object(d.useSelect)((function(e){var t=e("core/block-editor").getBlocks(n),r=1<=t.length?t.filter((function(e){return"prc-block/topic-index-condensed-menu"===e.name})):[],o=1<=t.length?t.filter((function(e){return"prc-block/topic-index-condensed-pages"===e.name})):[];return{menuBlocks:1<=r.length&&r[0].innerBlocks,pageBlocks:1<=o.length&&o[0].innerBlocks}})),g=O.menuBlocks,v=O.pageBlocks;return Object(s.useEffect)((function(){if(g.length<i.length){var e=(r=g,o=function(e){return function(t){return 0===e.filter((function(e){return e.attributes.uuid===t.attributes.uuid})).length}},c=(n=i).filter(o(r)),u=r.filter(o(n)),c.concat(u)),t=v.filter((function(t){return t.attributes.uuid===e[0].attributes.uuid}));Object(d.dispatch)("core/block-editor").removeBlock(t[0].clientId)}var n,r,o,c,u;l(g)}),[g]),React.createElement(s.Fragment,null,React.createElement(p.BlockControls,null),React.createElement(p.InspectorControls,null,React.createElement(f.PanelBody,{title:Object(c.__)("Controller Settings")},React.createElement(s.Fragment,null,"Controller Settings"))),React.createElement("div",{className:"ui container"},React.createElement("div",w)))},w=function(){return React.createElement(p.InnerBlocks.Content,null)};function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var v=i.name,j={title:Object(c.__)("Topic Index - Condensed View"),description:Object(c.__)('The condensed, or "schwoopy" version of the topic index.'),keywords:[Object(c.__)("Topics"),Object(c.__)("Topic"),Object(c.__)("Index"),Object(c.__)("Schwoopy")],edit:m,save:w};Object(o.registerBlockType)(v,g(g({},i),j))},9:function(e,t){e.exports=window.wp.data}},[[740,0]]]);
//# sourceMappingURL=topic-index-condensed-controller-e52e9c4b.js.map