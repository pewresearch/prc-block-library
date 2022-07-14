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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[3],{24:function(o,c){o.exports=window.wp.domReady},36:function(o,c,n){var e="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(e)]},866:function(o,c,n){n(36),o.exports=n(881)},881:function(o,c,n){"use strict";n.r(c);var e=n(24),t=n.n(e);window.carouselActivated=!1,t()((function(){var o=document.querySelectorAll(".wp-block-prc-block-carousel");o.length&&o.forEach((function(o){var c=o.querySelector(":scope > .wp-block-group:last-child");window.addEventListener("scroll",(function(){0>o.getBoundingClientRect().top&&!1===window.carouselActivated&&(console.log("ACTIVE"),o.classList.add("active"),window.carouselActivated=!0)})),o.addEventListener("scroll",(function(){var n=c.getBoundingClientRect().top;console.log("lastCarouselSlide:",c,n),0>n&&o.classList.remove("active")}))}))}))}},[[866,0]]]);
//# sourceMappingURL=carousel-47d3f9ac.js.map