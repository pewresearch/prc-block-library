/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.0.0
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[26],{11:function(t,e){t.exports=window.wp.blocks},13:function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(t.exports=r=function(t){return typeof t},t.exports.default=t.exports,t.exports.__esModule=!0):(t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.default=t.exports,t.exports.__esModule=!0),r(e)}t.exports=r,t.exports.default=t.exports,t.exports.__esModule=!0},14:function(t,e){t.exports=window.wp.data},16:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},18:function(t,e){(function(e){t.exports=e}).call(this,{})},19:function(t,e,r){var n,o=r(13);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function a(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var n=o(r);if("string"===n||"number"===n)t.push(r);else if(Array.isArray(r)){if(r.length){var i=a.apply(null,r);i&&t.push(i)}}else if("object"===n)if(r.toString===Object.prototype.toString)for(var l in r)c.call(r,l)&&r[l]&&t.push(l);else t.push(r.toString())}}return t.join(" ")}t.exports?(a.default=a,t.exports=a):"object"===o(r(18))&&r(18)?void 0===(n=function(){return a}.apply(e,[]))||(t.exports=n):window.classNames=a}()},193:function(t,e,r){"use strict";var n=r(6),o=r(4),c=r(14),a=r(2);e.a=function(t){var e=t.vertical,r=t.controllerClientId,i=Object(c.useDispatch)("core/block-editor").updateBlockAttributes;return React.createElement(n.InspectorControls,null,React.createElement(o.PanelBody,{title:Object(a.__)("Tab Controller Settings")},React.createElement(o.ToggleControl,{label:"Vertical Orientation",checked:e,onChange:function(){i(r,{vertical:!e})}})))}},2:function(t,e){t.exports=window.wp.i18n},21:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r(42);var o=r(33),c=r(43);function a(t,e){return Object(n.a)(t)||function(t,e){var r=t&&("undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"]);if(null!=r){var n,o,c=[],a=!0,i=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(c.push(n.value),!e||c.length!==e);a=!0);}catch(t){i=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(i)throw o}}return c}}(t,e)||Object(o.a)(t,e)||Object(c.a)()}},23:function(t,e,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},27:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},295:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs","category":"layout","attributes":{"active":{"type":"string","default":null},"vertical":{"type":"boolean","default":false}},"providesContext":{"prc-block/tabs-active":"active","prc-block/tabs-vertical":"vertical","prc-block/tabs-style":"className"},"styles":[{"name":"tabular","label":"Tabular","isDefault":true},{"name":"secondary","label":"Secondary"},{"name":"text","label":"Text"},{"name":"pointing","label":"Pointing"}],"supports":{"html":false}}')},3:function(t,e){t.exports=window.wp.element},33:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(27);function o(t,e){if(t){if("string"==typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},4:function(t,e){t.exports=window.wp.components},42:function(t,e,r){"use strict";function n(t){if(Array.isArray(t))return t}r.d(e,"a",(function(){return n}))},43:function(t,e,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(e,"a",(function(){return n}))},6:function(t,e){t.exports=window.wp.blockEditor},626:function(t,e,r){r(23),t.exports=r(658)},658:function(t,e,r){"use strict";r.r(e);var n=r(16),o=r(11),c=r(2),a=r(295),i=r(21),l=r(19),u=r.n(l),s=r(3),p=r(6),f=r(14),b=r(193),d=[["prc-block/tabs-menu",{}],["prc-block/tabs-panes",{}]],y=["prc-block/tabs-menu","prc-block/tabs-panes"],m=function(t){var e=t.attributes,r=t.className,n=t.clientId,o=Object(s.useState)(!1),c=Object(i.a)(o,2),a=c[0],l=c[1],m=e.vertical,v=Object(p.useBlockProps)({className:u()(r,{"ui grid":m})}),w=Object(p.__experimentalUseInnerBlocksProps)(v,{allowedBlocks:y,renderAppender:!1,orientation:m?"horizontal":"vertical",template:d,templateLock:"all"}),O=Object(f.useSelect)((function(t){if(void 0!==n){var e=t("core/block-editor").getBlocks(n),r=1<=e.length?e.filter((function(t){return"prc-block/tabs-menu"===t.name})):[],o=1<=e.length?e.filter((function(t){return"prc-block/tabs-panes"===t.name})):[];return{menuBlocks:1<=r.length&&r[0].innerBlocks,paneBlocks:1<=o.length&&o[0].innerBlocks}}}),[n]),k=O.menuBlocks,g=O.paneBlocks;return Object(s.useEffect)((function(){if(console.log("menuBlocks",k),k.length<a.length){var t=(n=k,o=function(t){return function(e){return 0===t.filter((function(t){return t.attributes.uuid===e.attributes.uuid})).length}},c=(r=a).filter(o(n)),i=n.filter(o(r)),c.concat(i)),e=g.filter((function(e){return e.attributes.uuid===t[0].attributes.uuid}));Object(f.dispatch)("core/block-editor").removeBlock(e[0].clientId)}var r,n,o,c,i;l(k)}),[k]),React.createElement(s.Fragment,null,React.createElement(b.a,{vertical:m,controllerClientId:n}),React.createElement("div",w))},v=function(){return React.createElement(p.InnerBlocks.Content,null)};function w(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function O(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?w(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var k=a.name,g={title:Object(c.__)("Tabs"),description:Object(c.__)("Create horizontal or vertical tabs."),keywords:[Object(c.__)("Tabs")],edit:m,save:v};Object(o.registerBlockType)(k,O(O({},a),g))}},[[626,0]]]);
//# sourceMappingURL=tabs-controller-6616d608.js.map