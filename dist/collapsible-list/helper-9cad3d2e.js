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
(window["wpackioprcBlocksLibrarycollapsible-listJsonp"]=window["wpackioprcBlocksLibrarycollapsible-listJsonp"]||[]).push([[0],[function(t,n){t.exports=jQuery},function(t,n){t.exports=wp.domReady},function(t,n,r){r(3),t.exports=r(4)},function(t,n,r){"use strict";var e="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(e)]},function(t,n,r){"use strict";r.r(n);var e=r(0),o=r.n(e),i=r(1);function a(t){if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=function(t,n){if(!t)return;if("string"==typeof t)return c(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return c(t,n)}(t))){var n=0,r=function(){};return{s:r,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var e,o,i=!0,a=!1;return{s:function(){e=t[Symbol.iterator]()},n:function(){var t=e.next();return i=t.done,t},e:function(t){a=!0,o=t},f:function(){try{i||null==e.return||e.return()}finally{if(a)throw o}}}}function c(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e}r.n(i)()((function(){!function(){if(767>Math.max(document.documentElement.clientWidth||0,window.innerWidth||0)){var t=document.querySelectorAll(".prc-collapsible-list");if(void 0!==t){var n,r=a(t);try{var e=function(){var t=n.value,r=t.querySelector(".content"),e=t.querySelector(".title");if(null==e)return"continue";var i=e.querySelector("a");if(null!==i){var a=i.getAttribute("href");e.querySelector("h2").innerHTML=i.innerHTML;var c=document.createElement("a");c.innerHTML="View all ".concat(i.innerHTML," publications"),c.setAttribute("href",a),c.classList.add("sans-serif"),r.prepend(c),i.remove()}e.addEventListener("click",(function(t){t.stopPropagation();var n=r.style.display,i=e.querySelector(".icon.caret");"block"===n?(o()(r).transition("".concat("fade"," up")),i.classList.contains("right")&&(i.classList.add("down"),i.classList.remove("right"))):(o()(r).transition("".concat("fade"," down")),i.classList.contains("down")&&(i.classList.add("right"),i.classList.remove("down")))}))};for(r.s();!(n=r.n()).done;)e()}catch(t){r.e(t)}finally{r.f()}}}}()}))}],[[2,1]]]);
//# sourceMappingURL=helper-9cad3d2e.js.map