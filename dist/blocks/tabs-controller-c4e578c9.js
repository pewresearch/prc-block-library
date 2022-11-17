/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.24
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[65],{11:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},12:function(t,e,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},15:function(t,e){function r(e){return t.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,r(e)}t.exports=r,t.exports.__esModule=!0,t.exports.default=t.exports},17:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r(23);var o=r(18),c=r(24);function a(t,e){return Object(n.a)(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,c=[],a=!0,i=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(c.push(n.value),!e||c.length!==e);a=!0);}catch(t){i=!0,o=t}finally{try{a||null==r.return||r.return()}finally{if(i)throw o}}return c}}(t,e)||Object(o.a)(t,e)||Object(c.a)()}},18:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(11);function o(t,e){if(t){if("string"==typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},19:function(t,e,r){var n,o=r(15);
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function a(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var n=o(r);if("string"===n||"number"===n)t.push(r);else if(Array.isArray(r)){if(r.length){var i=a.apply(null,r);i&&t.push(i)}}else if("object"===n){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){t.push(r.toString());continue}for(var l in r)c.call(r,l)&&r[l]&&t.push(l)}}}return t.join(" ")}t.exports?(a.default=a,t.exports=a):"object"===o(r(20))&&r(20)?void 0===(n=function(){return a}.apply(e,[]))||(t.exports=n):window.classNames=a}()},2:function(t,e){t.exports=window.wp.i18n},20:function(t,e){(function(e){t.exports=e}).call(this,{})},23:function(t,e,r){"use strict";function n(t){if(Array.isArray(t))return t}r.d(e,"a",(function(){return n}))},24:function(t,e,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(e,"a",(function(){return n}))},3:function(t,e){t.exports=window.wp.components},382:function(t){t.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/tabs","title":"Tabs","description":"Create horizontal or vertical tabbed content.","keywords":["tabs","tabbed content","tabbed content"],"category":"layout","icon":"editor-kitchensink","attributes":{"active":{"type":"string","default":null},"vertical":{"type":"boolean","default":false}},"providesContext":{"prc-block/tabs/active":"active","prc-block/tabs/layout":"vertical"},"styles":[{"name":"tabbed","label":"Tabbed","isDefault":true},{"name":"pills","label":"Pills"},{"name":"text","label":"Text"}],"supports":{"html":false,"color":{"background":true,"text":true},"spacing":{"padding":true,"margin":true},"typography":{"fontSize":true,"__experimentalFontFamily":true}}}')},4:function(t,e){t.exports=window.wp.element},5:function(t,e){t.exports=window.wp.blockEditor},7:function(t,e){t.exports=window.wp.blocks},8:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},9:function(t,e){t.exports=window.wp.data},946:function(t,e,r){r(12),t.exports=r(982)},982:function(t,e,r){"use strict";r.r(e);var n=r(8),o=r(7),c=r(382),a=r(17),i=r(19),l=r.n(i),s=r(4),u=r(5),b=r(9),p=r(3),f=r(2);var d=function(t){var e=t.attributes,r=t.setAttributes,n=e.vertical;return React.createElement(u.InspectorControls,null,React.createElement(p.PanelBody,{title:Object(f.__)("Tabs Layout")},React.createElement(p.ToggleControl,{label:"Vertical Orientation",checked:n,onChange:function(){r({vertical:!n})}})))},y=[["prc-block/tabs-menu",{}],["prc-block/tabs-panes",{}]],m=["prc-block/tabs-menu","prc-block/tabs-panes"];var v=function(t){var e=t.attributes,r=t.setAttributes,n=t.clientId,o=Object(s.useState)(!1),c=Object(a.a)(o,2),i=c[0],p=c[1],f=e.vertical,v=Object(u.useBlockProps)({className:l()({"is-vertical-tabs":f,"is-horizontal-tabs":!f})}),k=Object(u.useInnerBlocksProps)({},{allowedBlocks:m,renderAppender:!1,orientation:f?"vertical":"horizontal",template:y,templateLock:"all"}),g=Object(b.useSelect)((function(t){if(void 0!==n){var e=t("core/block-editor").getBlocks(n),r=1<=e.length?e.filter((function(t){return"prc-block/tabs-menu"===t.name})):[],o=1<=e.length?e.filter((function(t){return"prc-block/tabs-panes"===t.name})):[];return{menuBlocks:1<=r.length&&r[0].innerBlocks,paneBlocks:1<=o.length&&o[0].innerBlocks}}}),[n]),h=g.menuBlocks,w=g.paneBlocks;return Object(s.useEffect)((function(){if(console.log("menuBlocks",h),h.length<i.length){var t=(n=h,o=function(t){return function(e){return 0===t.filter((function(t){return t.attributes.uuid===e.attributes.uuid})).length}},c=(r=i).filter(o(n)),a=n.filter(o(r)),c.concat(a)),e=w.filter((function(e){return e.attributes.uuid===t[0].attributes.uuid}));Object(b.dispatch)("core/block-editor").removeBlock(e[0].clientId)}var r,n,o,c,a;p(h)}),[h]),React.createElement(s.Fragment,null,React.createElement("div",v,React.createElement("div",k)),React.createElement(d,{attributes:e,setAttributes:r}))},k=function(){return React.createElement(u.InnerBlocks.Content,null)},g=[{name:"tabs-horizontal",isDefault:!0,title:Object(f.__)("Horizontal Tabs"),description:Object(f.__)("A set of tabs that display horizontally"),attributes:{className:"is-style-tabbed",vertical:!1},innerBlocks:[["prc-block/tabs-menu",{}],["prc-block/tabs-panes",{}]],scope:["inserter","transform"],isActive:function(t){return!1===t.vertical}},{name:"tabs-vertical",title:Object(f.__)("Vertical Tabs"),description:Object(f.__)("A set of tabs that display vertically."),attributes:{className:"is-style-tabbed",vertical:!0},innerBlocks:[["prc-block/tabs-menu",{}],["prc-block/tabs-panes",{}]],scope:["inserter","transform"],isActive:function(t){return!0===t.vertical}}];function h(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function w(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?h(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var O=c.name,j={edit:v,save:k,variations:g};Object(o.registerBlockType)(O,w(w({},c),j))}},[[946,0]]]);
//# sourceMappingURL=tabs-controller-c4e578c9.js.map