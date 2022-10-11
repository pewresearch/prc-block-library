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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[17],{29:function(t,e){t.exports=window.wp.domReady},41:function(t,e,o){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},880:function(t,e,o){o(41),t.exports=o(881)},881:function(t,e,o){"use strict";o.r(e);var r=o(29);function c(t){t.focus();var e=document.querySelector('.wp-block-prc-block-tabs-menu-item[aria-selected="true"]'),o=document.querySelector('.wp-block-prc-block-tabs-tab-pane[aria-hidden="false"]'),r=document.getElementById(t.getAttribute("aria-controls"));console.log("newTab",t,e,o,r),t!==e&&e&&e.setAttribute("aria-selected","false"),r!==o&&o&&o.setAttribute("aria-hidden","true"),t.setAttribute("aria-selected","true"),r.setAttribute("aria-hidden","false")}o.n(r)()((function(){document.querySelectorAll(".wp-block-prc-block-tabs").forEach((function(t){t.querySelectorAll(".wp-block-prc-block-tabs-menu-item").forEach((function(t,e){t.addEventListener("click",(function(t){return c(t.target)})),0!==e||window.location.hash?window.location.hash===t.getAttribute("href")&&c(t):c(t)}))}))}))}},[[880,0]]]);
//# sourceMappingURL=tabs-controller-070a3b1b.js.map