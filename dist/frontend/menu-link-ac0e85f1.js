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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[13],{29:function(t,e){t.exports=window.wp.domReady},30:function(t,e){t.exports=window.wp.url},40:function(t,e,n){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},875:function(t,e,n){n(40),t.exports=n(906)},906:function(t,e,n){"use strict";n.r(e);var o=n(29),i=n.n(o),s=n(30);i()((function(){setTimeout((function(){var t;(t=Object(s.getQueryArg)(window.location.href,"menuItemId"))&&document.querySelector('[data-target="'.concat(t,'"]')).scrollIntoView()}),600);var t=document.querySelectorAll(".expand-sub-list");t&&t.forEach((function(t){t.addEventListener("click",(function(t){!function(t){t.classList.contains("plus")?(t.classList.remove("plus"),t.classList.add("minus")):(t.classList.remove("minus"),t.classList.add("plus")),t.parentElement.classList.toggle("active"),t.nextElementSibling.classList.toggle("hidden");var e={menuItemId:t.dataset.target},n=Object(s.addQueryArgs)(window.location.href,e);t.parentElement.classList.contains("active")||(n=Object(s.removeQueryArgs)(window.location.href,"menuItemId")),window.history.pushState(e,document.title,n)}(t.target)}))}))}))}},[[875,0]]]);
//# sourceMappingURL=menu-link-ac0e85f1.js.map