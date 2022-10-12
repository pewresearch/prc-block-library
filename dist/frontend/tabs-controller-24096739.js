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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[17],{29:function(t,e){t.exports=window.wp.domReady},41:function(t,e,r){var c="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(c)]},880:function(t,e,r){r(41),t.exports=r(881)},881:function(t,e,r){"use strict";r.r(e);var c=r(29);function o(t,e){e.focus();var r=document.querySelector("#".concat(t,' .wp-block-prc-block-tabs-menu-item[aria-selected="true"]')),c=document.querySelector("#".concat(t,' .wp-block-prc-block-tabs-pane[aria-hidden="false"]')),o=document.getElementById(e.getAttribute("aria-controls"));null!==r&&r!==e&&r.setAttribute("aria-selected","false"),null!==c&&c!==o&&c.setAttribute("aria-hidden","true"),e.setAttribute("aria-selected","true"),o.setAttribute("aria-hidden","false")}r.n(c)()((function(){document.querySelectorAll(".wp-block-prc-block-tabs").forEach((function(t){var e=t.getAttribute("id");t.querySelectorAll(".wp-block-prc-block-tabs-menu-item").forEach((function(t,r){t.addEventListener("click",(function(t){return o(e,t.target)})),0===r&&o(e,t),window.location.hash===t.getAttribute("href")&&o(e,t)}))}))}))}},[[880,0]]]);
//# sourceMappingURL=tabs-controller-24096739.js.map