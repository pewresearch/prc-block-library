/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[4],{22:function(t,e){t.exports=wp.domReady},25:function(t,e){t.exports=wp.url},38:function(t,e,n){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},651:function(t,e,n){n(38),t.exports=n(652)},652:function(t,e,n){"use strict";n.r(e);var o=n(22),c=n.n(o),r=n(25),i=function(t){t.parentElement.classList.toggle("active"),t.nextElementSibling.classList.toggle("hidden");var e={menuItemId:t.dataset.target},n=Object(r.addQueryArgs)(window.location.href,e);t.parentElement.classList.contains("active")||(n=Object(r.removeQueryArgs)(window.location.href,"menuItemId")),window.history.pushState(e,document.title,n)};c()((function(){!function(){console.log("checkForQueryVar");var t=Object(r.getQueryArg)(window.location.href,"menuItemId");console.log(t);var e=document.querySelector('.expand-sub-list[data-target="'.concat(t,'"]'));console.log(e),e&&i(e)}(),document.querySelectorAll(".expand-sub-list").forEach((function(t){t.addEventListener("click",(function(t){i(t.target)}))}))}))}},[[651,0]]]);
//# sourceMappingURL=menu-link-20496606.js.map