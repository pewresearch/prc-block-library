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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[20],{32:function(n,o){n.exports=window.wp.domReady},48:function(n,o,e){var t="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");e.p=window["__wpackIo".concat(t)]},887:function(n,o,e){e(48),n.exports=e(888)},888:function(n,o,e){"use strict";e.r(o);var t=e(32);e.n(t)()((function(){document.querySelectorAll(".item.view-more").forEach((function(n){var o=function(n){var o=[];console.log("getSiblings",n);for(var e=n.parentNode.firstChild;e;)1===e.nodeType&&e!==n&&e.classList.contains("hidden")&&o.push(e),e=e.nextSibling;return o}(n);n.addEventListener("click",(function(n){console.log("click!",n),o.forEach((function(n){return n.classList.toggle("hidden")})),n.target.nextElementSibling.classList.contains("hidden")?n.target.innerText="+ More":n.target.innerText="- Less"}))}))}))}},[[887,0]]]);
//# sourceMappingURL=taxonomy-tree-more-fb898488.js.map