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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[10],{11:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,"a",(function(){return n}))},12:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},15:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r(22);var o=r(17),c=r(23);function a(e,t){return Object(n.a)(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c=[],a=!0,i=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(c.push(n.value),!t||c.length!==t);a=!0);}catch(e){i=!0,o=e}finally{try{a||null==r.return||r.return()}finally{if(i)throw o}}return c}}(e,t)||Object(o.a)(e,t)||Object(c.a)()}},17:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(11);function o(e,t){if(e){if("string"==typeof e)return Object(n.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(e,t):void 0}}},18:function(e,t,r){var n,o=r(20);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)){if(r.length){var i=a.apply(null,r);i&&e.push(i)}}else if("object"===n)if(r.toString===Object.prototype.toString)for(var l in r)c.call(r,l)&&r[l]&&e.push(l);else e.push(r.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):"object"===o(r(19))&&r(19)?void 0===(n=function(){return a}.apply(t,[]))||(e.exports=n):window.classNames=a}()},19:function(e,t){(function(t){e.exports=t}).call(this,{})},20:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},22:function(e,t,r){"use strict";function n(e){if(Array.isArray(e))return e}r.d(t,"a",(function(){return n}))},23:function(e,t,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(t,"a",(function(){return n}))},292:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/collapsible","title":"Collapsible","description":"A block that can be expanded and collapsed. Defaults to collapsed.","category":"layout","keywords":["collapsible","accordion","how we did this"],"attributes":{"title":{"type":"string","default":"How we did this"}},"styles":[{"name":"plus","label":"Plus Icon","isDefault":true},{"name":"caret","label":"Caret Icon"}],"supports":{"anchor":true,"html":false,"align":false,"color":{"background":true,"text":true},"spacing":{"padding":true},"__experimentalBorder":{"color":true,"width":true}}}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},512:function(e,t,r){r(12),e.exports=r(778)},7:function(e,t){e.exports=window.wp.blocks},778:function(e,t,r){"use strict";r.r(t);var n=r(8),o=r(7),c=r(292),a=r(15),i=r(18),l=r.n(i),u=r(4),s=r(5),p=["core/paragraph","core/heading","core/image","core/table","core/list","core/buttons","core/file","core/video","core/group"],f=[["core/paragraph",{}]];function b(e){var t=e.onToggle,r=e.caretStyle,n=void 0!==r&&r?["icon caret right","icon caret down"]:["icon outline plus circle","icon outline minus circle"];return React.createElement("button",{className:"wp-block-prc-block-collapsible__icon",onClick:function(){t()},type:"button"},n.map((function(e,t){return React.createElement("i",{key:"icon-".concat(t),className:"".concat(e," ").concat(0===t?"closed":"opened")})})))}var d=function(e){var t=e.attributes,r=e.setAttributes,n=t.title,o=t.className,c=Object(u.useState)(!0),i=Object(a.a)(c,2),d=i[0],y=i[1],m=void 0!==o?o.split(" "):[],w=Object(s.useBlockProps)({className:l()(o,{"is-open":d})}),g=Object(s.useInnerBlocksProps)({},{allowedBlocks:p,orientation:"vertical",templateLock:!1,template:f});return React.createElement("div",w,React.createElement("div",{className:"wp-block-prc-block-collapsible__title"},React.createElement(s.RichText,{tagName:"div",value:n,onChange:function(e){return r({title:e})},placeholder:"How we did this...",formattingControls:[],keepPlaceholderOnFocus:!0}),React.createElement(b,{onToggle:function(){y(!d)},caretStyle:m.includes("is-style-caret")})),React.createElement("div",{className:"wp-block-prc-block-collapsible__content"},React.createElement("div",g)))},y=function(){return React.createElement(s.InnerBlocks.Content,null)};function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=c.name,v={icon:function(){return React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},React.createElement("path",{d:"M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"}))},edit:d,save:y};Object(o.registerBlockType)(g,w(w({},c),v))},8:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))}},[[512,0]]]);
//# sourceMappingURL=collapsible-2547c2fd.js.map