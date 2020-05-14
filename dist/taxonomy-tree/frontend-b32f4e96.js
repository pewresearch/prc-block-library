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
(window["wpackioprcBlocksLibrarytaxonomy-treeJsonp"]=window["wpackioprcBlocksLibrarytaxonomy-treeJsonp"]||[]).push([[1],{200:function(t,n,r){r(26),t.exports=r(201)},201:function(t,n){function r(t){if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=function(t,n){if(!t)return;if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return e(t,n)}(t))){var n=0,r=function(){};return{s:r,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i,a=!0,c=!1;return{s:function(){o=t[Symbol.iterator]()},n:function(){var t=o.next();return a=t.done,t},e:function(t){c=!0,i=t},f:function(){try{a||null==o.return||o.return()}finally{if(c)throw i}}}}function e(t,n){(null==n||n>t.length)&&(n=t.length);for(var r=0,e=new Array(n);r<n;r++)e[r]=t[r];return e}var o=function(){if(!(541<=window.innerWidth)){var t=document.querySelectorAll(".wp-block-prc-block-taxonomy-tree");if(void 0!==t){var n,e=r(t);try{var o=function(){var t=n.value;if(t.parentElement.classList.contains("block-editor-block-list__block"))return"continue";var r=t.querySelector(".title");if(void 0===r)return"continue";if(null===r)return"continue";var e=t.querySelector(".content"),o=r.querySelector("a");if(null!==o){var i=o.getAttribute("href");r.querySelector("h2").innerHTML=o.innerHTML;var a=document.createElement("a");a.innerHTML="View all "+o.innerHTML+" publications.",a.setAttribute("href",i),a.classList.add("sans-serif"),e.prepend(a),o.remove()}r.addEventListener("click",(function(t){t.stopPropagation();var n=e.style.display,o=r.querySelector(".icon.caret");"block"!==n?(jQuery(e).transition("fade down"),o.classList.contains("down")&&(o.classList.add("right"),o.classList.remove("down"))):(jQuery(e).transition("fade up"),o.classList.contains("right")&&(o.classList.add("down"),o.classList.remove("right")))}))};for(e.s();!(n=e.n()).done;)o()}catch(t){e.e(t)}finally{e.f()}}}};document.addEventListener("DOMContentLoaded",(function(){setTimeout(o,1e3)}))},26:function(t,n,r){"use strict";var e="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(e)]}},[[200,0]]]);
//# sourceMappingURL=frontend-b32f4e96.js.map