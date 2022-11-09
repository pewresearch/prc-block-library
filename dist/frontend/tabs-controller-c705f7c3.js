/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.22
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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[18],{20:function(t,e){t.exports=window.wp.domReady},30:function(t,e,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},637:function(t,e,r){r(30),t.exports=r(638)},638:function(t,e,r){"use strict";r.r(e);var o=r(20);function c(t,e){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(r){e.focus();var o=e.getAttribute("href");window.history.replaceState(null,null,o)}var c=document.querySelector("#".concat(t,' .wp-block-prc-block-tabs-menu-item[aria-selected="true"]')),n=document.querySelector("#".concat(t,' .wp-block-prc-block-tabs-pane[aria-hidden="false"]')),i=document.getElementById(e.getAttribute("aria-controls"));null!==c&&c!==e&&c.setAttribute("aria-selected","false"),null!==n&&n!==i&&n.setAttribute("aria-hidden","true"),e.setAttribute("aria-selected","true"),i.setAttribute("aria-hidden","false")}r.n(o)()((function(){document.querySelectorAll(".wp-block-prc-block-tabs").forEach((function(t){var e=t.getAttribute("id");t.querySelectorAll(".wp-block-prc-block-tabs-menu-item").forEach((function(t,r){t.addEventListener("click",(function(t){t.preventDefault(),c(e,t.target)})),0===r&&c(e,t,!1),window.location.hash===t.getAttribute("href")&&(c(e,t),setTimeout((function(){t.scrollIntoView()}),1e3))}))}))}))}},[[637,0]]]);
//# sourceMappingURL=tabs-controller-c705f7c3.js.map