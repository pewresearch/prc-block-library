/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.13
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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[13],{16:function(t,e){t.exports=window.wp.domReady},23:function(t,e){t.exports=window.wp.url},31:function(t,e,n){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},570:function(t,e,n){n(31),t.exports=n(597)},597:function(t,e,n){"use strict";n.r(e);var o=n(16),i=n.n(o),s=n(23);i()((function(){setTimeout((function(){var t;(t=Object(s.getQueryArg)(window.location.href,"menuItemId"))&&document.querySelector('[data-target="'.concat(t,'"]')).scrollIntoView()}),600);var t=document.querySelectorAll(".expand-sub-list");t&&t.forEach((function(t){t.addEventListener("click",(function(t){!function(t){t.classList.contains("plus")?(t.classList.remove("plus"),t.classList.add("minus")):(t.classList.remove("minus"),t.classList.add("plus")),t.parentElement.classList.toggle("active"),t.nextElementSibling.classList.toggle("hidden");var e={menuItemId:t.dataset.target},n=Object(s.addQueryArgs)(window.location.href,e);t.parentElement.classList.contains("active")||(n=Object(s.removeQueryArgs)(window.location.href,"menuItemId")),window.history.pushState(e,document.title,n)}(t.target)}))}))}))}},[[570,0]]]);
//# sourceMappingURL=menu-link-9b147a3f.js.map