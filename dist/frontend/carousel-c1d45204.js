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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[3],{24:function(o,c){o.exports=window.wp.domReady},36:function(o,c,e){var t="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");e.p=window["__wpackIo".concat(t)]},866:function(o,c,e){e(36),o.exports=e(881)},881:function(o,c,e){"use strict";e.r(c);var t=e(24),n=e.n(t);window.carouselActivated=!1,n()((function(){var o=document.querySelectorAll(".wp-block-prc-block-carousel");o.length&&o.forEach((function(o){var c=o.querySelector(":scope > .wp-block-group:last-child");window.addEventListener("scroll",(function(){var c=o.getBoundingClientRect().top,e=o.getBoundingClientRect().height;0>c&&!1===window.carouselActivated&&(o.classList.add("active"),document.querySelector("body").classList.add("carousel-locked"),window.carouselActivated=!0),e<=Math.round(Math.abs(c))&&window.carouselActivated&&(o.scrollTop=0,window.carouselActivated=!1)})),o.addEventListener("scroll",(function(){0>c.getBoundingClientRect().top&&(o.classList.remove("active"),document.querySelector("body").classList.remove("carousel-locked"))}))}))}))}},[[866,0]]]);
//# sourceMappingURL=carousel-c1d45204.js.map