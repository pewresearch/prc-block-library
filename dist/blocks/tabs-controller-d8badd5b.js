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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[21],{12:function(t,e){t.exports=wp.blocks},15:function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(t.exports=r=function(t){return typeof t},t.exports.default=t.exports,t.exports.__esModule=!0):(t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.default=t.exports,t.exports.__esModule=!0),r(e)}t.exports=r,t.exports.default=t.exports,t.exports.__esModule=!0},16:function(t,e){t.exports=wp.data},169:function(t,e,r){"use strict";var n=r(7),o=r(4),c=r(16),a=r(2);e.a=function(t){var e=t.vertical,r=t.controllerClientId,i=Object(c.useDispatch)("core/block-editor").updateBlockAttributes;return React.createElement(n.InspectorControls,null,React.createElement(o.PanelBody,{title:Object(a.__)("Tab Controller Settings")},React.createElement(o.ToggleControl,{label:"Vertical Orientation",checked:e,onChange:function(){i(r,{vertical:!e})}})))}},18:function(t,e,r){var n,o=r(15);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function a(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var n=o(r);if("string"===n||"number"===n)t.push(r);else if(Array.isArray(r)&&r.length){var i=a.apply(null,r);i&&t.push(i)}else if("object"===n)for(var l in r)c.call(r,l)&&r[l]&&t.push(l)}}return t.join(" ")}t.exports?(a.default=a,t.exports=a):"object"===o(r(20))&&r(20)?void 0===(n=function(){return a}.apply(e,[]))||(t.exports=n):window.classNames=a}()},2:function(t,e){t.exports=wp.i18n},20:function(t,e){(function(e){t.exports=e}).call(this,{})},22:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},23:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r(39);var o=r(27),c=r(40);function a(t,e){return Object(n.a)(t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,c=void 0;try{for(var a,i=t[Symbol.iterator]();!(n=(a=i.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){o=!0,c=t}finally{try{n||null==i.return||i.return()}finally{if(o)throw c}}return r}}(t,e)||Object(o.a)(t,e)||Object(c.a)()}},24:function(t,e,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},27:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(22);function o(t,e){if(t){if("string"==typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},277:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs","category":"layout","attributes":{"active":{"type":"string","default":null},"vertical":{"type":"boolean","default":false}},"providesContext":{"prc-block/tabs-active":"active","prc-block/tabs-vertical":"vertical","prc-block/tabs-style":"className"},"styles":[{"name":"tabular","label":"Tabular","isDefault":true},{"name":"secondary","label":"Secondary"},{"name":"text","label":"Text"},{"name":"pointing","label":"Pointing"}],"supports":{"html":false}}')},3:function(t,e){t.exports=wp.element},39:function(t,e,r){"use strict";function n(t){if(Array.isArray(t))return t}r.d(e,"a",(function(){return n}))},4:function(t,e){t.exports=wp.components},40:function(t,e,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(e,"a",(function(){return n}))},622:function(t,e,r){r(24),t.exports=r(658)},623:function(t,e,r){},658:function(t,e,r){"use strict";r.r(e);var n=r(8),o=r(12),c=r(2),a=(r(623),r(277)),i=r(23),l=r(18),u=r.n(l),s=r(3),p=r(7),f=r(16),b=r(169),d=[["prc-block/tabs-menu",{}],["prc-block/tabs-panes",{}]],y=["prc-block/tabs-menu","prc-block/tabs-panes"],m=function(t){var e=t.attributes,r=t.className,n=t.clientId,o=Object(s.useState)(!1),c=Object(i.a)(o,2),a=c[0],l=c[1],m=e.vertical,v=Object(p.useBlockProps)({className:u()(r,{"ui grid":m})}),O=Object(p.__experimentalUseInnerBlocksProps)(v,{allowedBlocks:y,renderAppender:!1,orientation:m?"horizontal":"vertical",template:d,templateLock:"all"}),k=Object(f.useSelect)((function(t){if(void 0!==n){var e=t("core/block-editor").getBlocks(n),r=1<=e.length?e.filter((function(t){return"prc-block/tabs-menu"===t.name})):[],o=1<=e.length?e.filter((function(t){return"prc-block/tabs-panes"===t.name})):[];return{menuBlocks:1<=r.length&&r[0].innerBlocks,paneBlocks:1<=o.length&&o[0].innerBlocks}}}),[n]),g=k.menuBlocks,j=k.paneBlocks;return Object(s.useEffect)((function(){if(console.log("menuBlocks",g),g.length<a.length){var t=(n=g,o=function(t){return function(e){return 0===t.filter((function(t){return t.attributes.uuid===e.attributes.uuid})).length}},c=(r=a).filter(o(n)),i=n.filter(o(r)),c.concat(i)),e=j.filter((function(e){return e.attributes.uuid===t[0].attributes.uuid}));Object(f.dispatch)("core/block-editor").removeBlock(e[0].clientId)}var r,n,o,c,i;l(g)}),[g]),React.createElement(s.Fragment,null,React.createElement(b.a,{vertical:m,controllerClientId:n}),React.createElement("div",O))},v=function(){return React.createElement(p.InnerBlocks.Content,null)};function O(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function k(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?O(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var g=a.name,j={title:Object(c.__)("Tabs"),description:Object(c.__)("Create horizontal or vertical tabs."),keywords:[Object(c.__)("Tabs")],edit:m,save:v};Object(o.registerBlockType)(g,k(k({},a),j))},7:function(t,e){t.exports=wp.blockEditor},8:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))}},[[622,0]]]);
//# sourceMappingURL=tabs-controller-d8badd5b.js.map