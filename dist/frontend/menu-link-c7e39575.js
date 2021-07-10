/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.0.0
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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[8],{21:function(t,n){t.exports=window.wp.domReady},29:function(t,n){t.exports=window.wp.url},38:function(t,n,e){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");e.p=window["__wpackIo".concat(o)]},500:function(t,n,e){e(38),t.exports=e(520)},520:function(t,n,e){"use strict";e.r(n);var o=e(21),i=e.n(o),c=e(29);i()((function(){var t=document.querySelectorAll(".expand-sub-list");t&&t.forEach((function(t){t.addEventListener("click",(function(t){!function(t){t.parentElement.classList.toggle("active"),t.nextElementSibling.classList.toggle("hidden");var n={menuItemId:t.dataset.target},e=Object(c.addQueryArgs)(window.location.href,n);t.parentElement.classList.contains("active")||(e=Object(c.removeQueryArgs)(window.location.href,"menuItemId")),window.history.pushState(n,document.title,e)}(t.target)}))}))}))}},[[500,0]]]);
//# sourceMappingURL=menu-link-c7e39575.js.map