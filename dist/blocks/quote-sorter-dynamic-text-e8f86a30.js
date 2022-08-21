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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[45],{1:function(t,e){t.exports=window.React},10:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},1034:function(t,e,r){r(22),t.exports=r(1078)},1078:function(t,e,r){"use strict";r.r(e);var n=r(10),o=r(2),c=r(8),i=r(444),a=r(57),s=r(16),l=r.n(s),u=(r(4),r(5)),p=r(9),f=r(1),b=r(3);function y(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function d(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?y(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var O=[],m=function(t){var e=t.attributes,r=t.className,c=t.setAttributes,i=t.clientId,s=t.context,y=t.isSelected,m=e.id,g=JSON.parse(s["prc-block/quote-sorter-typologies"]),w=Object.keys(g).map((function(t){return{cells:[{content:t,tag:"td"},{content:"Selected quotes from the <strong>".concat(g[t].name,"</strong> group"),tag:"td"}]}})),j=[["core/table",{className:"dynamic-text-table",head:[{cells:[{content:"Key",tag:"th"},{content:"Display Text",tag:"th"}]}],body:[{cells:[{content:"all",tag:"td"},{content:"Selected quotes from <strong>all</strong> groups",tag:"td"}]}].concat(Object(a.a)(w))}]];c({id:m||i});var h=Object(p.select)("core/block-editor").getBlocks(i).find((function(t){return"core/table"===t.name}));Object(f.useEffect)((function(){if(h){var t=h.attributes.body.reduce((function(t,e){return d(d({},t),{},Object(n.a)({},e.cells[0].content,e.cells[1].content))}),{});c({dynamicText:JSON.stringify(t)})}}),[h]);var v=Object(u.useBlockProps)({className:l()(r,"ui list")}),k=Object(p.useSelect)((function(){return{isActive:y||Object(p.select)("core/block-editor").hasSelectedInnerBlock(i)}})).isActive,x=Object(u.useInnerBlocksProps)(v,{allowedBlocks:O,orientation:"vertical",templateLock:!1});return React.createElement("div",x,React.createElement(b.Placeholder,{label:Object(o.__)("Dynamic Text Block"),instructions:Object(o.__)("Click this area to change the dynamic text that will appear on the\n\t\t\t\t\tfrontend. This block’s ID is: ".concat(m)),isColumnLayout:!0},k&&React.createElement(u.InnerBlocks,{template:j,templateLock:"all"})))},g=function(){return React.createElement(u.InnerBlocks.Content,null)};function w(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function j(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?w(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var h=i.name,v={edit:m,save:g};Object(c.registerBlockType)(h,j(j({},i),v))},15:function(t,e){function r(e){return t.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,r(e)}t.exports=r,t.exports.__esModule=!0,t.exports.default=t.exports},16:function(t,e,r){var n,o=r(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var n=o(r);if("string"===n||"number"===n)t.push(r);else if(Array.isArray(r)){if(r.length){var a=i.apply(null,r);a&&t.push(a)}}else if("object"===n)if(r.toString===Object.prototype.toString)for(var s in r)c.call(r,s)&&r[s]&&t.push(s);else t.push(r.toString())}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===o(r(17))&&r(17)?void 0===(n=function(){return i}.apply(e,[]))||(t.exports=n):window.classNames=i}()},17:function(t,e){(function(e){t.exports=e}).call(this,{})},19:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},2:function(t,e){t.exports=window.wp.i18n},22:function(t,e,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},26:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(19);function o(t,e){if(t){if("string"==typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},3:function(t,e){t.exports=window.wp.components},4:function(t,e){t.exports=window.wp.element},444:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/quote-sorter-dynamic-text","title":"Quote Sorter – Dynamic Text","icon":"editor-paragraph","description":"Child block for displaying dynamic text based on filter selection.","category":"layout","attributes":{"id":{"type":"string"},"dynamicText":{"type":"string"}},"supports":{"html":false},"ancestor":["prc-block/quote-sorter"],"usesContext":["prc-block/quote-sorter-hash","prc-block/quote-sorter-typologies"]}')},5:function(t,e){t.exports=window.wp.blockEditor},57:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(19);var o=r(62),c=r(26);function i(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||Object(o.a)(t)||Object(c.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},62:function(t,e,r){"use strict";function n(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}r.d(e,"a",(function(){return n}))},8:function(t,e){t.exports=window.wp.blocks},9:function(t,e){t.exports=window.wp.data}},[[1034,0]]]);
//# sourceMappingURL=quote-sorter-dynamic-text-e8f86a30.js.map