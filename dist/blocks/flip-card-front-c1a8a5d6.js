/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.9
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[14],{1003:function(e,t,r){"use strict";r.r(t);var o=r(14),n=r(12),c=(r(2),r(254)),l=r(323),a=r(18),i=r.n(a),s=r(4),u=r(5),p=r(151),b=[["core/paragraph",{}]],f=function(e){e.attributes;var t=e.className,r=e.clientId,o=Object(u.useBlockProps)({className:i()(t)}),n=Object(u.useInnerBlocksProps)({},{orientation:"vertical",templateLock:!1,template:b});return React.createElement(s.Fragment,null,React.createElement(p.a,{clientId:r}),React.createElement("div",o,React.createElement("div",n)))},m=function(e){e.attributes,e.className;return React.createElement(u.InnerBlocks.Content,null)};function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var w=l.name,y={icon:c.a,edit:f,save:m};Object(n.registerBlockType)(w,v(v({},l),y))},12:function(e,t){e.exports=window.wp.blocks},14:function(e,t,r){"use strict";function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return o}))},151:function(e,t,r){"use strict";var o=r(14),n=r(2),c=r(5),l=r(187),a=r(3),i=r(9),s=r(4);function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var b=[{name:"Oatmeal",color:"#E2E2E2"},{name:"White",color:"#FFF"}],f=[{name:"Oatmeal",color:"#E2E2E2"},{name:"Oatmeal (dark)",color:"#D5D5CD"},{name:"Gray",color:"#D8D8D8"},{name:"Black",color:"#000"}],m=function(e){Object(i.select)("core/block-editor").getBlock(e).innerBlocks.forEach((function(e){var t=document.querySelector('div[data-block="'.concat(e.clientId,'"]'));"none"===t.style.display?t.style.display="block":t.style.display="none"}))};t.a=function(e){var t=e.clientId,r=Object(i.useSelect)((function(e){var r=e("core/block-editor"),o=r.getBlockName,n=r.getBlockRootClientId,c=r.getBlockAttributes,l=t;return"prc-block/flip-card"!==o(t)&&(l=n(t)),p(p({},c(l)),{},{controllerClientId:l})}),[t]),o=r.width,u=r.height,d=r.borderColor,v=r.bgColor,w=r.controllerClientId,y=Object(i.useDispatch)("core/block-editor").updateBlockAttributes;return React.createElement(s.Fragment,null,React.createElement(c.BlockControls,null,React.createElement(a.ToolbarGroup,null,React.createElement(a.ToolbarButton,{icon:l.a,label:Object(n.__)("Flip Card Over"),f:!0,onClick:function(){m(w)}}))),React.createElement(c.InspectorControls,null,React.createElement(a.PanelBody,{title:Object(n.__)("Flip Card Options")},React.createElement(a.PanelRow,null,React.createElement(a.Button,{isSecondary:!0,onClick:function(){m(w)}},"Flip Card Over")),React.createElement(a.PanelRow,null,React.createElement(a.TextControl,{label:"Width",value:o,onChange:function(e){return y(w,{width:e})}})),React.createElement(a.PanelRow,null,React.createElement(a.TextControl,{label:"Height",value:u,onChange:function(e){return y(w,{height:e})}})),React.createElement(a.PanelRow,null,React.createElement("div",null,React.createElement("label",{style:{marginBottom:"0.5em",display:"inline-block"}},"Border Color"),React.createElement(a.ColorPalette,{colors:f,value:d,onChange:function(e){return y(w,{borderColor:e})},disableCustomColors:!0}))),React.createElement(a.PanelRow,null,React.createElement("div",null,React.createElement("label",{style:{marginBottom:"0.5em",display:"inline-block"}},"Background Color"),React.createElement(a.ColorPalette,{colors:b,value:v,onChange:function(e){return y(w,{bgColor:e})},disableCustomColors:!0}))))))}},18:function(e,t,r){var o,n=r(19);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function l(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var a=l.apply(null,r);a&&e.push(a)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var i in r)c.call(r,i)&&r[i]&&e.push(i);else e.push(r.toString())}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):"object"===n(r(22))&&r(22)?void 0===(o=function(){return l}.apply(t,[]))||(e.exports=o):window.classNames=l}()},187:function(e,t,r){"use strict";var o=r(4),n=r(24),c=Object(o.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(o.createElement)(n.Path,{d:"M4 6v12c0 1.1.9 2 2 2h3v-1.5H6c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h3V4H6c-1.1 0-2 .9-2 2zm7.2 16h1.5V2h-1.5v20zM15 5.5h1.5V4H15v1.5zm3.5.5H20c0-1.1-.9-2-2-2v1.5c.3 0 .5.2.5.5zm0 10.5H20v-2h-1.5v2zm0-3.5H20v-2h-1.5v2zm-.5 5.5V20c1.1 0 2-.9 2-2h-1.5c0 .3-.2.5-.5.5zM15 20h1.5v-1.5H15V20zm3.5-10.5H20v-2h-1.5v2z"}));t.a=c},19:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t){(function(t){e.exports=t}).call(this,{})},24:function(e,t){e.exports=window.wp.primitives},25:function(e,t,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},254:function(e,t,r){"use strict";var o=r(4),n=r(24),c=Object(o.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(o.createElement)(n.Path,{d:"M2 11.2v1.5h20v-1.5H2zM5.5 6c0-.3.2-.5.5-.5h12c.3 0 .5.2.5.5v3H20V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3h1.5V6zm2 14h2v-1.5h-2V20zm3.5 0h2v-1.5h-2V20zm7-1.5V20c1.1 0 2-.9 2-2h-1.5c0 .3-.2.5-.5.5zm.5-2H20V15h-1.5v1.5zM5.5 18H4c0 1.1.9 2 2 2v-1.5c-.3 0-.5-.2-.5-.5zm0-3H4v1.5h1.5V15zm9 5h2v-1.5h-2V20z"}));t.a=c},3:function(e,t){e.exports=window.wp.components},323:function(e){e.exports=JSON.parse('{"name":"prc-block/flip-card-front","title":"Flip Card Front","description":"A front of a flip card","category":"layout","attributes":{},"parent":["prc-block/flip-card"]}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},899:function(e,t,r){r(25),e.exports=r(1003)},9:function(e,t){e.exports=window.wp.data}},[[899,0]]]);
//# sourceMappingURL=flip-card-front-c1a8a5d6.js.map