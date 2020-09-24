/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2020 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window["wpackioprcBlocksLibraryflip-cardJsonp"]=window["wpackioprcBlocksLibraryflip-cardJsonp"]||[]).push([[2],{0:function(e,t){e.exports=wp.element},1:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=r=function(e){return typeof e}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(t)}e.exports=r},10:function(e,t){(function(t){e.exports=t}).call(this,{})},14:function(e,t){e.exports=wp.components},15:function(e){e.exports=JSON.parse('{"name":"prc-block/flip-card-front","category":"layout","attributes":{},"parent":["prc-block/flip-card"]}')},16:function(e){e.exports=JSON.parse('{"name":"prc-block/flip-card-back","category":"layout","attributes":{},"parent":["prc-block/flip-card"]}')},169:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function c(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r.r(t);var o=r(27),a=r(3),l=r(28),i=r(2),s=r(14),p=r(55),u=(r(72),["prc-block/flip-card-front","prc-block/flip-card-back"]),f=[["prc-block/flip-card-front",{}],["prc-block/flip-card-back",{}]],b=function(e){var t=e.attributes,r=e.className,n=e.setAttributes,c=e.isSelected,o=t.width,a=Object(p.dispatch)("core/block-editor").toggleSelection;return React.createElement("div",{className:r},React.createElement(s.ResizableBox,{size:{width:o},minWidth:"200",maxWidth:"640",enable:{top:!1,right:c,bottom:!1,left:!1,topRight:!1,bottomRight:!1,bottomLeft:!1,topLeft:!1},onResizeStop:function(e,t,r,c){n({width:parseInt(o+c.width,10)}),a(!0)},onResizeStart:function(){a(!1)}},React.createElement(i.InnerBlocks,{allowedBlocks:u,template:f,templateLock:"all"})))},d=function(e){var t=e.attributes,r=e.className,n=t.width;return React.createElement("div",{className:r,style:{maxWidth:n}},React.createElement(i.InnerBlocks.Content,null))},m=l.name,y=l.category,v=l.attributes,k=[m,{title:Object(a.__)("PRC Flip Card"),description:Object(a.__)("An unstyled card that has a front and back"),category:y,attributes:v,supports:{align:["left","right"]},edit:b,save:d}],h=r(15),g=r(0);function O(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function w(e,t){if(null==e)return{};var r,n,c=function(e,t){if(null==e)return{};var r,n,c={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(c[r]=e[r]);return c}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(c[r]=e[r])}return c}var j=r(6),E=r.n(j);function R(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var x=Object(g.createElement)((function(e){var t=e.className,r=e.isPressed,n=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?R(Object(r),!0).forEach((function(t){O(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):R(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},w(e,["className","isPressed"]),{className:E()(t,{"is-pressed":r})||void 0,role:"img","aria-hidden":!0,focusable:!1});return Object(g.createElement)("svg",n)}),{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(g.createElement)((function(e){return Object(g.createElement)("path",e)}),{d:"M4 6v12c0 1.1.9 2 2 2h3v-1.5H6c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h3V4H6c-1.1 0-2 .9-2 2zm7.2 16h1.5V2h-1.5v20zM15 5.5h1.5V4H15v1.5zm3.5.5H20c0-1.1-.9-2-2-2v1.5c.3 0 .5.2.5.5zm0 10.5H20v-2h-1.5v2zm0-3.5H20v-2h-1.5v2zm-.5 5.5V20c1.1 0 2-.9 2-2h-1.5c0 .3-.2.5-.5.5zM15 20h1.5v-1.5H15V20zm3.5-10.5H20v-2h-1.5v2z"})),B=function(e){wp.data.select("core/block-editor").getBlock(e).innerBlocks.forEach((function(e){var t=document.querySelector('div[data-block="'.concat(e.clientId,'"]'));"none"===t.style.display?t.style.display="block":t.style.display="none"}))},S=function(e){var t=e.label,r=void 0===t?"Front of Card":t,n=e.clientId;return React.createElement("div",{className:"sans-serif",style:{fontSize:"12px",cursor:"pointer",display:"inline-block"},onClick:function(){var e=wp.data.select("core/block-editor").getBlockRootClientId(n);B(e)},alt:"Click to flip"},Object(a.__)(r))},I=function(e){var t=e.label,r=e.clientId;return React.createElement(g.Fragment,null,React.createElement(i.BlockControls,null,React.createElement(s.ToolbarGroup,null,React.createElement(s.ToolbarButton,{icon:x,label:Object(a.__)("Flip Card Over"),f:!0,onClick:function(){var e=wp.data.select("core/block-editor").getBlockRootClientId(r);B(e)}}))),React.createElement(S,{label:t,clientId:r}))},C=function(e){var t=e.className,r=e.clientId;return React.createElement("div",{className:t},React.createElement(I,{label:"Front of Card",clientId:r}),React.createElement(i.InnerBlocks,{templateLock:!1}))},N=function(e){e.attributes;var t=e.className;return React.createElement("div",{className:t},React.createElement(i.InnerBlocks.Content,null))},_=h.name,P=h.category,z=h.attributes,A=h.parent,F=[_,{title:Object(a.__)("PRC Flip Card (Front)"),description:Object(a.__)("Front of the flip card"),category:P,attributes:z,edit:C,save:N,parent:A}],H=r(16),L=function(e){var t=e.className,r=e.clientId;return Object(g.useEffect)((function(){document.querySelector('div[data-block="'.concat(r,'"]')).style.display="none"}),[]),React.createElement("div",{className:t},React.createElement(I,{label:"Back of Card",clientId:r}),React.createElement(i.InnerBlocks,{templateLock:!1}))},T=function(e){e.attributes;var t=e.className;return React.createElement("div",{className:t},React.createElement(i.InnerBlocks.Content,null))},V=H.name,J=H.category,D=H.attributes,M=H.parent,W=[V,{title:Object(a.__)("PRC Flip Card (Back)"),description:Object(a.__)("Back of the flip card"),category:J,attributes:D,edit:L,save:T,parent:M}];o.registerBlockType.apply(void 0,c(k)),o.registerBlockType.apply(void 0,c(F)),o.registerBlockType.apply(void 0,c(W))},2:function(e,t){e.exports=wp.blockEditor},27:function(e,t){e.exports=wp.blocks},28:function(e){e.exports=JSON.parse('{"name":"prc-block/flip-card","category":"layout","attributes":{"width":{"type":"string","default":"310px"}}}')},29:function(e,t,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},3:function(e,t){e.exports=wp.i18n},55:function(e,t){e.exports=wp.data},6:function(e,t,r){var n,c=r(1);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var o={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=c(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)&&r.length){var l=a.apply(null,r);l&&e.push(l)}else if("object"===n)for(var i in r)o.call(r,i)&&r[i]&&e.push(i)}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):"object"===c(r(10))&&r(10)?void 0===(n=function(){return a}.apply(t,[]))||(e.exports=n):window.classNames=a}()},71:function(e,t,r){r(29),e.exports=r(169)},72:function(e,t,r){}},[[71,0]]]);
//# sourceMappingURL=main-af3b3e17.js.map