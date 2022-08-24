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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[6],{31:function(o,c){o.exports=window.wp.domReady},38:function(o,c,l){var s="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");l.p=window["__wpackIo".concat(s)]},856:function(o,c,l){l(38),o.exports=l(857)},857:function(o,c,l){"use strict";l.r(c);var s=l(31);l.n(s)()((function(){var o=document.querySelectorAll(".wp-block-prc-block-collapsible");1<=o.length&&(console.log("Collapsible blocks found",o),o.forEach((function(o){var c=o.querySelector(".wp-block-prc-block-collapsible__title");c.addEventListener("click",(function(l){l.preventDefault();var s=c.querySelector(".wp-block-prc-block-collapsible__icon > .icon");o.classList.toggle("is-open"),s.classList.contains("plus")?(s.classList.remove("plus"),s.classList.add("minus")):(s.classList.remove("minus"),s.classList.add("plus"))}))})))}))}},[[856,0]]]);
//# sourceMappingURL=collapsible-9d93281e.js.map