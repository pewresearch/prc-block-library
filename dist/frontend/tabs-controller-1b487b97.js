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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[5],{10:function(t,e){t.exports=wp.domReady},12:function(t,e){t.exports=wp.url},142:function(t,e,c){c(19),t.exports=c(143)},143:function(t,e,c){"use strict";c.r(e);var o=c(10),n=c.n(o),r=c(12);n()((function(){document.querySelectorAll(".wp-block-prc-block-tabs").forEach((function(t){var e=t.getAttribute("id"),c=t.classList.contains("accordion");t.querySelectorAll(".wp-block-prc-block-tabs-menu-item").forEach((function(t){var o=t.getAttribute("data-uuid");t.classList;t.addEventListener("click",(function(){!function(t){var e=document.getElementById(t).querySelector(".wp-block-prc-block-tabs-menu-item.active");e&&e.classList.remove("active");var c=document.getElementById(t).querySelector(".wp-block-prc-block-tabs-pane.active");c&&c.classList.remove("active")}(e),function(t,e,c){console.log("makeActive",t,e,c);var o=document.querySelector('.wp-block-prc-block-tabs-menu-item[data-uuid="'.concat(t,'"]'));o&&(c?(console.log("menuItem",o),o.classList.toggle("active")):(console.log("not accordion"),o.classList.add("active")));var n=document.querySelector('.wp-block-prc-block-tabs-pane[data-uuid="'.concat(t,'"]'));if(n){var a={menuItem:t},i=Object(r.addQueryArgs)(window.location.href,a);c&&!0===n.classList.contains("active")?(i=Object(r.removeQueryArgs)(i,"menuItem"),n.classList.remove("active")):n.classList.add("active"),window.history.pushState(a,document.title,i)}}(o,e,c)}))}))})),function(){var t=Object(r.getQueryArg)(window.location.href,"menuItem");if(t){var e=document.querySelector('.wp-block-prc-block-tabs-menu-item[data-uuid="'.concat(t,'"]'));setTimeout((function(){return e.scrollIntoView(!0)}),1e3)}}()}))},19:function(t,e,c){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");c.p=window["__wpackIo".concat(o)]}},[[142,0]]]);
//# sourceMappingURL=tabs-controller-1b487b97.js.map