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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[6],{21:function(s,c){s.exports=window.wp.domReady},34:function(s,c,o){var i="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(i)]},842:function(s,c,o){o(34),s.exports=o(843)},843:function(s,c,o){"use strict";o.r(c);var i=o(21);o.n(i)()((function(){var s=document.querySelectorAll(".wp-block-prc-block-collapsible");1<=s.length&&s.forEach((function(s){var c=s.querySelector(".wp-block-prc-block-collapsible__title");c.addEventListener("click",(function(o){o.preventDefault();var i=c.querySelector(".wp-block-prc-block-collapsible__icon > .icon"),n=i.classList.contains("caret");s.classList.toggle("is-open"),n&&i.classList.contains("right")?(i.classList.remove("right"),i.classList.add("down")):n&&i.classList.contains("down")?(i.classList.remove("down"),i.classList.add("right")):!n&&i.classList.contains("plus")?(i.classList.remove("plus"),i.classList.add("minus")):!n&&i.classList.contains("minus")&&(i.classList.remove("minus"),i.classList.add("plus"))}))}))}))}},[[842,0]]]);
//# sourceMappingURL=collapsible-5d5725a5.js.map