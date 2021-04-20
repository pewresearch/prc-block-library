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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[7],{22:function(n,t){n.exports=wp.domReady},38:function(n,t,e){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");e.p=window["__wpackIo".concat(o)]},657:function(n,t,e){e(38),n.exports=e(658)},658:function(n,t,e){"use strict";e.r(t);var o=e(22);e.n(o)()((function(){document.querySelectorAll(".item.view-more").forEach((function(n){var t=function(n){var t=[];console.log("getSiblings",n);for(var e=n.parentNode.firstChild;e;)1===e.nodeType&&e!==n&&e.classList.contains("hidden")&&t.push(e),e=e.nextSibling;return t}(n);n.addEventListener("click",(function(n){console.log("click!",n),t.forEach((function(n){return n.classList.toggle("hidden")})),n.target.nextElementSibling.classList.contains("hidden")?n.target.innerText="+ More":n.target.innerText="- Less"}))}))}))}},[[657,0]]]);
//# sourceMappingURL=taxonomy-tree-more-a9d2073d.js.map