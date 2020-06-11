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
(window["wpackioprcBlocksLibrarytaxonomy-tree-listJsonp"]=window["wpackioprcBlocksLibrarytaxonomy-tree-listJsonp"]||[]).push([[1],[,,,function(n,t,e){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");e.p=window["__wpackIo".concat(r)]},,function(n,t){n.exports=wp.domReady},,,function(n,t,e){e(3),n.exports=e(9)},function(n,t,e){"use strict";e.r(t);var r=e(5);function o(n){if("undefined"==typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(n=function(n,t){if(!n)return;if("string"==typeof n)return i(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);"Object"===e&&n.constructor&&(e=n.constructor.name);if("Map"===e||"Set"===e)return Array.from(n);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return i(n,t)}(n))){var t=0,e=function(){};return{s:e,n:function(){return t>=n.length?{done:!0}:{done:!1,value:n[t++]}},e:function(n){throw n},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,o,a=!0,l=!1;return{s:function(){r=n[Symbol.iterator]()},n:function(){var n=r.next();return a=n.done,n},e:function(n){l=!0,o=n},f:function(){try{a||null==r.return||r.return()}finally{if(l)throw o}}}}function i(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}var a=function(){console.log("ViewMoreHandler active");var n=document.querySelectorAll(".ui.tree.list");if(void 0!==n){var t,e=o(n);try{var r=function(){var n=t.value;if(n.parentElement.classList.contains("block-editor-block-list__block"))return"continue";var e=n.querySelector(".read-more");return null==e?"continue":void e.addEventListener("click",(function(){"none"===e.nextElementSibling.style.display?(e.innerHTML="View Less",jQuery(e.nextElementSibling).transition("slide up")):(e.innerHTML="View More",jQuery(e.nextElementSibling).transition("slide down"))}))};for(e.s();!(t=e.n()).done;)r()}catch(n){e.e(n)}finally{e.f()}}};e.n(r)()((function(){setTimeout(a,1e3)}))}],[[8,0]]]);
//# sourceMappingURL=frontend-ce61bbae.js.map