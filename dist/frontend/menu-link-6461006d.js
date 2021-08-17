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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[8],{21:function(t,e){t.exports=window.wp.domReady},22:function(t,e){t.exports=window.wp.url},34:function(t,e,n){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},505:function(t,e,n){n(34),t.exports=n(527)},527:function(t,e,n){"use strict";n.r(e);var o=n(21),c=n.n(o),i=n(22);c()((function(){console.log("menuItem Init"),setTimeout((function(){!function(){console.log("bringMenuItemIntoView");var t=Object(i.getQueryArg)(window.location.href,"menuItemId");console.log("watchAndMove",t),t&&document.querySelector('[data-target="'.concat(t,'"]')).scrollIntoView()}()}),600);var t=document.querySelectorAll(".expand-sub-list");t&&t.forEach((function(t){t.addEventListener("click",(function(t){!function(t){t.parentElement.classList.toggle("active"),t.nextElementSibling.classList.toggle("hidden");var e={menuItemId:t.dataset.target},n=Object(i.addQueryArgs)(window.location.href,e);t.parentElement.classList.contains("active")||(n=Object(i.removeQueryArgs)(window.location.href,"menuItemId")),window.history.pushState(e,document.title,n)}(t.target)}))}))}))}},[[505,0]]]);
//# sourceMappingURL=menu-link-6461006d.js.map