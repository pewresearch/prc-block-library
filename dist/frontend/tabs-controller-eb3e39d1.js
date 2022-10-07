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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[17],{29:function(t,e){t.exports=window.wp.domReady},30:function(t,e){t.exports=window.wp.url},41:function(t,e,c){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");c.p=window["__wpackIo".concat(o)]},880:function(t,e,c){c(41),t.exports=c(881)},881:function(t,e,c){"use strict";c.r(e);var o=c(29),n=c.n(o),a=c(30);n()((function(){document.querySelectorAll(".wp-block-prc-block-tabs").forEach((function(t){var e=t.getAttribute("id"),c=t.classList.contains("accordion");t.querySelectorAll(".wp-block-prc-block-tabs-menu-item").forEach((function(t){var o=t.getAttribute("data-uuid");t.classList;t.addEventListener("click",(function(){!function(t){var e=document.getElementById(t).querySelector(".wp-block-prc-block-tabs-menu-item.active");e&&e.classList.remove("active");var c=document.getElementById(t).querySelector(".wp-block-prc-block-tabs-pane.active");c&&c.classList.remove("active")}(e),function(t,e,c){console.log("makeActive",t,e,c);var o=document.querySelector('.wp-block-prc-block-tabs-menu-item[data-uuid="'.concat(t,'"]'));o&&(c?(console.log("menuItem",o),o.classList.toggle("active")):(console.log("not accordion"),o.classList.add("active")));var n=document.querySelector('.wp-block-prc-block-tabs-pane[data-uuid="'.concat(t,'"]'));if(n){var r={menuItem:t},i=Object(a.addQueryArgs)(window.location.href,r);c&&!0===n.classList.contains("active")?(i=Object(a.removeQueryArgs)(i,"menuItem"),n.classList.remove("active")):n.classList.add("active"),window.history.pushState(r,document.title,i)}}(o,e,c)}))}))})),function(){var t=Object(a.getQueryArg)(window.location.href,"menuItem");if(t){var e=document.querySelector('.wp-block-prc-block-tabs-menu-item[data-uuid="'.concat(t,'"]'));setTimeout((function(){return e.scrollIntoView(!0)}),1e3)}}()}))}},[[880,0]]]);
//# sourceMappingURL=tabs-controller-eb3e39d1.js.map