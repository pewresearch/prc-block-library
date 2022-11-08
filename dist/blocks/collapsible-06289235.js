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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[10],{11:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}r.d(e,"a",(function(){return n}))},12:function(t,e,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},15:function(t,e){function r(e){return t.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,r(e)}t.exports=r,t.exports.__esModule=!0,t.exports.default=t.exports},17:function(t,e,r){var n,o=r(15);
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var n=o(r);if("string"===n||"number"===n)t.push(r);else if(Array.isArray(r)){if(r.length){var a=i.apply(null,r);a&&t.push(a)}}else if("object"===n){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){t.push(r.toString());continue}for(var l in r)c.call(r,l)&&r[l]&&t.push(l)}}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===o(r(19))&&r(19)?void 0===(n=function(){return i}.apply(e,[]))||(t.exports=n):window.classNames=i}()},18:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(23);var o=r(20),c=r(24);function i(t,e){return Object(n.a)(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,c=[],i=!0,a=!1;try{for(r=r.call(t);!(i=(n=r.next()).done)&&(c.push(n.value),!e||c.length!==e);i=!0);}catch(t){a=!0,o=t}finally{try{i||null==r.return||r.return()}finally{if(a)throw o}}return c}}(t,e)||Object(o.a)(t,e)||Object(c.a)()}},19:function(t,e){(function(e){t.exports=e}).call(this,{})},20:function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));var n=r(11);function o(t,e){if(t){if("string"==typeof t)return Object(n.a)(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(t,e):void 0}}},23:function(t,e,r){"use strict";function n(t){if(Array.isArray(t))return t}r.d(e,"a",(function(){return n}))},24:function(t,e,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(e,"a",(function(){return n}))},340:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/collapsible","title":"Collapsible","description":"A block that can be expanded and collapsed. Defaults to collapsed.","category":"layout","keywords":["collapsible","accordion","how we did this"],"attributes":{"title":{"type":"string","default":"How we did this"}},"styles":[{"name":"plus","label":"Plus Icon","isDefault":true},{"name":"caret","label":"Caret Icon"}],"supports":{"html":false,"align":false,"color":{"background":true,"text":true},"spacing":{"padding":true},"__experimentalBorder":{"color":true,"width":true}}}')},4:function(t,e){t.exports=window.wp.element},5:function(t,e){t.exports=window.wp.blockEditor},620:function(t,e,r){r(12),t.exports=r(996)},7:function(t,e){t.exports=window.wp.blocks},8:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},996:function(t,e,r){"use strict";r.r(e);var n=r(8),o=r(7),c=r(340),i=r(18),a=r(17),l=r.n(a),u=r(4),s=r(5),p=["core/paragraph","core/heading","core/image","core/table","core/list","core/buttons","core/file","core/video","core/group"],f=[["core/paragraph",{}]];function b(t){var e=t.onToggle,r=t.caretStyle,n=void 0!==r&&r?["icon caret right","icon caret down"]:["icon outline plus circle","icon outline minus circle"];return React.createElement("button",{className:"wp-block-prc-block-collapsible__icon",onClick:function(){e()},type:"button"},n.map((function(t,e){return React.createElement("i",{key:"icon-".concat(e),className:"".concat(t," ").concat(0===e?"closed":"opened")})})))}var d=function(t){var e=t.attributes,r=t.setAttributes,n=e.title,o=e.className,c=Object(u.useState)(!0),a=Object(i.a)(c,2),d=a[0],y=a[1],m=void 0!==o?o.split(" "):[],w=Object(s.useBlockProps)({className:l()(o,{"is-open":d})}),g=Object(s.useInnerBlocksProps)({},{allowedBlocks:p,orientation:"vertical",templateLock:!1,template:f});return React.createElement("div",w,React.createElement("div",{className:"wp-block-prc-block-collapsible__title"},React.createElement(s.RichText,{tagName:"div",value:n,onChange:function(t){return r({title:t})},placeholder:"How we did this...",formattingControls:[],keepPlaceholderOnFocus:!0}),React.createElement(b,{onToggle:function(){y(!d)},caretStyle:m.includes("is-style-caret")})),React.createElement("div",{className:"wp-block-prc-block-collapsible__content"},React.createElement("div",g)))},y=function(){return React.createElement(s.InnerBlocks.Content,null)};function m(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function w(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?m(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var g=c.name,v={icon:function(){return React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},React.createElement("path",{d:"M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"}))},edit:d,save:y};Object(o.registerBlockType)(g,w(w({},c),v))}},[[620,0]]]);
//# sourceMappingURL=collapsible-06289235.js.map