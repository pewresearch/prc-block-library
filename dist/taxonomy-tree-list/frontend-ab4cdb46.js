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
(window["wpackioprcBlocksLibrarytaxonomy-tree-listJsonp"]=window["wpackioprcBlocksLibrarytaxonomy-tree-listJsonp"]||[]).push([[1],{3:function(n,t,e){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");e.p=window["__wpackIo".concat(r)]},8:function(n,t,e){e(3),n.exports=e(9)},9:function(n,t){function e(n){if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(n=function(n,t){if(!n)return;if("string"==typeof n)return r(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(n);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return r(n,t)}(n))){var t=0,e=function(){};return{s:e,n:function(){return t>=n.length?{done:!0}:{done:!1,value:n[t++]}},e:function(n){throw n},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i,a=!0,l=!1;return{s:function(){o=n[Symbol.iterator]()},n:function(){var n=o.next();return a=n.done,n},e:function(n){l=!0,i=n},f:function(){try{a||null==o.return||o.return()}finally{if(l)throw i}}}}function r(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}var o=function(){console.log("ViewMoreHandler active");var n=document.querySelectorAll(".ui.tree.list");if(void 0!==n){var t,r=e(n);try{var o=function(){var n=t.value;if(n.parentElement.classList.contains("block-editor-block-list__block"))return"continue";var e=n.querySelector(".read-more");return null==e?"continue":void e.addEventListener("click",(function(){"none"===e.nextElementSibling.style.display?(e.innerHTML="View Less",jQuery(e.nextElementSibling).transition("slide up")):(e.innerHTML="View More",jQuery(e.nextElementSibling).transition("slide down"))}))};for(r.s();!(t=r.n()).done;)o()}catch(n){r.e(n)}finally{r.f()}}};document.addEventListener("DOMContentLoaded",(function(){setTimeout(o,1e3)}))}},[[8,0]]]);
//# sourceMappingURL=frontend-ab4cdb46.js.map