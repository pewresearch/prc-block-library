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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[50],{10:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return r}))},1050:function(t,e,n){"use strict";n.r(e);var r=n(10),o=n(2),c=n(8),a=n(412),i=n(16),l=n.n(i),s=n(5),u=n(21),p=n(4),m=n(3),f=n(9),b=function(t){var e=t.attributes,n=t.setAttributes,r={desktop:{min:980,max:0},tablet:{min:480,max:979},smartphone:{min:0,max:479}},o=Object.keys(r).filter((function(t){return r[t].max===e.max}));return React.createElement(m.SelectControl,{value:0!==o.length&&o[0],options:[{label:"Common Device Sizes...",value:!1},{label:"Desktop",value:"desktop"},{label:"Tablet",value:"tablet"},{label:"Smartphone",value:"smartphone"}],onChange:function(t){!1!==t&&n({min:r[t].min,max:r[t].max})}})},d=function(t){var e=t.attributes,n=t.setAttributes,r=t.clientId,c=e.min,a=e.max,i=Object(f.useSelect)((function(t){var e=t("core/block-editor").getPreviousBlockClientId(r),n=t("core/block-editor").getBlockAttributes(e);return null==n?0:n.min-1})),l=Object(p.useState)("".concat(c,"px to ").concat(a,"px")),d=Object(u.a)(l,2),y=d[0],x=d[1];return Object(p.useEffect)((function(){var t="between ".concat(c,"px and ").concat(a,"px");a||(t="minimum ".concat(c,"px")),c||(t="maximum ".concat(a,"px")),x(t)}),[c,a]),Object(p.useEffect)((function(){void 0===a&&n({max:i})}),[a]),React.createElement(p.Fragment,null,React.createElement(m.Notice,{isDismissible:!1,spokenMessage:Object(o.__)("Visible from ".concat(c," pixels to ").concat(a," pixels"))},React.createElement("span",{className:"sans-serif"},React.createElement("strong",null,"Viewport Range:")," ",Object(o.__)(y))),React.createElement(s.BlockControls,null,React.createElement("div",{style:{minWidth:"280px ",maxWidth:"320px",width:"100%",paddingTop:"7px",paddingLeft:"5px"}},React.createElement(m.Flex,{align:"center"},React.createElement(m.FlexBlock,{style:{marginBottom:"8px"}},React.createElement(m.__experimentalNumberControl,{value:c,min:0,max:a,onChange:function(t){n({min:parseInt(t)})}})),React.createElement(m.FlexItem,{style:{marginBottom:"8px"}},React.createElement("span",null,React.createElement("strong",null,"~ to ~"))),React.createElement(m.FlexBlock,{style:{marginBottom:"8px"}},React.createElement(m.__experimentalNumberControl,{value:a,min:0,max:i,disabled:0===i,onChange:function(t){n({max:parseInt(t)})}})),React.createElement(m.FlexItem,{style:{width:"100px"}},React.createElement(b,{attributes:e,setAttributes:n}))))))},y=[["core/html",{}]],x=function(t){var e=t.attributes,n=t.className,r=t.setAttributes,o=t.clientId,c=Object(s.useBlockProps)({className:l()(n)}),a=Object(s.useInnerBlocksProps)({},{orientation:"vertical",templateLock:!1,template:y});return React.createElement("div",c,React.createElement(d,{attributes:e,setAttributes:r,clientId:o}),React.createElement("div",a))},v=function(){return React.createElement(s.InnerBlocks.Content,null)};function w(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function O(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?w(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var g=a.name,j={title:Object(o.__)("Responsive View"),description:"A block of blocks that appears and hides at specific viewport widths.",icon:"art",category:"layout",keywords:[Object(o.__)("ai2html"),Object(o.__)("Illustrator"),Object(o.__)("Responsive")],edit:x,save:v};Object(c.registerBlockType)(g,O(O({},a),j))},15:function(t,e){function n(e){return t.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,n(e)}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports},16:function(t,e,n){var r,o=n(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function a(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var r=o(n);if("string"===r||"number"===r)t.push(n);else if(Array.isArray(n)){if(n.length){var i=a.apply(null,n);i&&t.push(i)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var l in n)c.call(n,l)&&n[l]&&t.push(l);else t.push(n.toString())}}return t.join(" ")}t.exports?(a.default=a,t.exports=a):"object"===o(n(17))&&n(17)?void 0===(r=function(){return a}.apply(e,[]))||(t.exports=r):window.classNames=a}()},17:function(t,e){(function(e){t.exports=e}).call(this,{})},19:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},2:function(t,e){t.exports=window.wp.i18n},21:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var r=n(28);var o=n(26),c=n(29);function a(t,e){return Object(r.a)(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,c=[],a=!0,i=!1;try{for(n=n.call(t);!(a=(r=n.next()).done)&&(c.push(r.value),!e||c.length!==e);a=!0);}catch(t){i=!0,o=t}finally{try{a||null==n.return||n.return()}finally{if(i)throw o}}return c}}(t,e)||Object(o.a)(t,e)||Object(c.a)()}},22:function(t,e,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},26:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(19);function o(t,e){if(t){if("string"==typeof t)return Object(r.a)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(t,e):void 0}}},28:function(t,e,n){"use strict";function r(t){if(Array.isArray(t))return t}n.d(e,"a",(function(){return r}))},29:function(t,e,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(e,"a",(function(){return r}))},3:function(t,e){t.exports=window.wp.components},4:function(t,e){t.exports=window.wp.element},412:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/responsive-container-view","category":"layout","attributes":{"min":{"type":"integer","default":0},"max":{"type":"integer"}},"parent":["prc-block/responsive-container-controller"],"supports":{"html":false}}')},5:function(t,e){t.exports=window.wp.blockEditor},8:function(t,e){t.exports=window.wp.blocks},9:function(t,e){t.exports=window.wp.data},978:function(t,e,n){n(22),t.exports=n(1050)}},[[978,0]]]);
//# sourceMappingURL=responsive-container-view-7cf9354f.js.map