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
(window.wpackioprcBlocksLibrarycollapsibleJsonp=window.wpackioprcBlocksLibrarycollapsibleJsonp||[]).push([[2],{0:function(e,t){e.exports=React},108:function(e,t){e.exports=wp.domReady},22:function(e,t){e.exports=wp.element},236:function(e,t,n){n(70),e.exports=n(237)},237:function(e,t,n){"use strict";n.r(t);var r=n(48),a=n(22),o=n(108),c=n.n(o),i=n(68),l=n(239);function u(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(e,t)}(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,o=!0,c=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return o=e.done,e},e:function(e){c=!0,a=e},f:function(){try{o||null==r.return||r.return()}finally{if(c)throw a}}}}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var s=function(e){var t=e.title,n=e.children,o=Object(a.useState)(!0),c=Object(r.a)(o,2),u=c[0],f=c[1],s=u?"down":"right";return React.createElement(i.a,{styled:!0},React.createElement(i.a.Title,{active:!0===u,index:0,onClick:function(){return f(!u)}},React.createElement(l.a,{name:"caret "+s}),React.createElement("span",null,t)),React.createElement(i.a.Content,{active:!0===u},React.createElement(a.RawHTML,null,n)))};c()((function(){if(document.querySelector(".js-react-collapsible")){var e,t=u(document.querySelectorAll(".js-react-collapsible"));try{for(t.s();!(e=t.n()).done;){var n=e.value,r=n.innerHTML,o=n.getAttribute("data-title");Object(a.render)(React.createElement(s,{title:o},r),n)}}catch(e){t.e(e)}finally{t.f()}}}))}},[[236,0,1]]]);
//# sourceMappingURL=frontend-33e9adc8.js.map