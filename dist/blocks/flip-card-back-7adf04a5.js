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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[9],{10:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},121:function(e,t,r){"use strict";var o=r(10),n=r(2),c=r(5),l=r(4),a=r(22),i=Object(l.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(l.createElement)(a.Path,{d:"M4 6v12c0 1.1.9 2 2 2h3v-1.5H6c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h3V4H6c-1.1 0-2 .9-2 2zm7.2 16h1.5V2h-1.5v20zM15 5.5h1.5V4H15v1.5zm3.5.5H20c0-1.1-.9-2-2-2v1.5c.3 0 .5.2.5.5zm0 10.5H20v-2h-1.5v2zm0-3.5H20v-2h-1.5v2zm-.5 5.5V20c1.1 0 2-.9 2-2h-1.5c0 .3-.2.5-.5.5zM15 20h1.5v-1.5H15V20zm3.5-10.5H20v-2h-1.5v2z"})),s=r(3),u=r(15);function p(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function b(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?p(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):p(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var f=[{name:"Oatmeal",color:"#E2E2E2"},{name:"White",color:"#FFF"}],m=[{name:"Oatmeal",color:"#E2E2E2"},{name:"Oatmeal (dark)",color:"#D5D5CD"},{name:"Gray",color:"#D8D8D8"},{name:"Black",color:"#000"}],d=function(e){Object(u.select)("core/block-editor").getBlock(e).innerBlocks.forEach((function(e){var t=document.querySelector('div[data-block="'.concat(e.clientId,'"]'));"none"===t.style.display?t.style.display="block":t.style.display="none"}))};t.a=function(e){var t=e.clientId,r=Object(u.useSelect)((function(e){var r=e("core/block-editor"),o=r.getBlockName,n=r.getBlockRootClientId,c=r.getBlockAttributes,l=t;return"prc-block/flip-card"!==o(t)&&(l=n(t)),b(b({},c(l)),{},{controllerClientId:l})}),[t]),o=r.width,a=r.height,p=r.borderColor,y=r.bgColor,w=r.controllerClientId,O=Object(u.useDispatch)("core/block-editor").updateBlockAttributes;return React.createElement(l.Fragment,null,React.createElement(c.BlockControls,null,React.createElement(s.ToolbarGroup,null,React.createElement(s.ToolbarButton,{icon:i,label:Object(n.__)("Flip Card Over"),f:!0,onClick:function(){d(w)}}))),React.createElement(c.InspectorControls,null,React.createElement(s.PanelBody,{title:Object(n.__)("Flip Card Options")},React.createElement(s.PanelRow,null,React.createElement(s.Button,{isSecondary:!0,onClick:function(){d(w)}},"Flip Card Over")),React.createElement(s.PanelRow,null,React.createElement(s.TextControl,{label:"Width",value:o,onChange:function(e){return O(w,{width:e})}})),React.createElement(s.PanelRow,null,React.createElement(s.TextControl,{label:"Height",value:a,onChange:function(e){return O(w,{height:e})}})),React.createElement(s.PanelRow,null,React.createElement("div",null,React.createElement("label",{style:{marginBottom:"0.5em",display:"inline-block"}},"Border Color"),React.createElement(s.ColorPalette,{colors:m,value:p,onChange:function(e){return O(w,{borderColor:e})},disableCustomColors:!0}))),React.createElement(s.PanelRow,null,React.createElement("div",null,React.createElement("label",{style:{marginBottom:"0.5em",display:"inline-block"}},"Background Color"),React.createElement(s.ColorPalette,{colors:f,value:y,onChange:function(e){return O(w,{bgColor:e})},disableCustomColors:!0}))))))}},15:function(e,t){e.exports=window.wp.data},16:function(e,t,r){var o,n=r(17);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function l(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var a=l.apply(null,r);a&&e.push(a)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var i in r)c.call(r,i)&&r[i]&&e.push(i);else e.push(r.toString())}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):"object"===n(r(21))&&r(21)?void 0===(o=function(){return l}.apply(t,[]))||(e.exports=o):window.classNames=l}()},17:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},2:function(e,t){e.exports=window.wp.i18n},21:function(e,t){(function(t){e.exports=t}).call(this,{})},22:function(e,t){e.exports=window.wp.primitives},23:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},275:function(e){e.exports=JSON.parse('{"name":"prc-block/flip-card-back","category":"layout","attributes":{},"parent":["prc-block/flip-card"]}')},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},587:function(e,t,r){r(23),e.exports=r(683)},683:function(e,t,r){"use strict";r.r(t);var o=r(10),n=r(9),c=r(2),l=r(275),a=r(16),i=r.n(a),s=r(4),u=r(5),p=r(121),b=[],f=[["core/paragraph",{}]],m=function(e){e.attributes;var t=e.className,r=e.clientId,o=Object(u.useBlockProps)({className:i()(t)}),n=Object(u.__experimentalUseInnerBlocksProps)({},{allowedBlocks:b,orientation:"vertical",templateLock:!1,template:f});return Object(s.useEffect)((function(){document.querySelector('div[data-block="'.concat(r,'"]')).style.display="none"}),[]),React.createElement(s.Fragment,null,React.createElement(p.a,{clientId:r}),React.createElement("div",o,React.createElement("div",n)))},d=function(e){e.attributes,e.className;return React.createElement(u.InnerBlocks.Content,null)};function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var O=l.name,v={title:Object(c.__)("PRC Flip Card (Back)"),description:Object(c.__)("Back of the flip card"),edit:m,save:d};Object(n.registerBlockType)(O,w(w({},l),v))},9:function(e,t){e.exports=window.wp.blocks}},[[587,0]]]);
//# sourceMappingURL=flip-card-back-7adf04a5.js.map