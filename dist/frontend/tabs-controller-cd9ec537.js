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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[5],{10:function(t,e){t.exports=wp.domReady},12:function(t,e){t.exports=wp.url},142:function(t,e,c){c(19),t.exports=c(143)},143:function(t,e,c){"use strict";c.r(e);var o=c(10),r=c.n(o),n=c(12);r()((function(){document.querySelectorAll(".wp-block-prc-block-tabs").forEach((function(t){var e=t.getAttribute("id");t.querySelectorAll(".wp-block-prc-block-tabs-menu-item").forEach((function(t){var c=t.getAttribute("data-uuid");t.addEventListener("click",(function(){!function(t){var e=document.getElementById(t).querySelector(".wp-block-prc-block-tabs-menu-item.active");e&&e.classList.remove("active");var c=document.getElementById(t).querySelector(".wp-block-prc-block-tabs-pane.active");c&&c.classList.remove("active")}(e),function(t){var e=document.querySelector('.wp-block-prc-block-tabs-menu-item[data-uuid="'.concat(t,'"]'));e&&e.classList.add("active");var c=document.querySelector('.wp-block-prc-block-tabs-pane[data-uuid="'.concat(t,'"]'));if(c){var o={menuItem:t},r=Object(n.addQueryArgs)(window.location.href,o);r=Object(n.removeQueryArgs)(r,"menuItem"),window.history.pushState(o,document.title,r),c.classList.add("active")}}(c)}))}))}))}))},19:function(t,e,c){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");c.p=window["__wpackIo".concat(o)]}},[[142,0]]]);
//# sourceMappingURL=tabs-controller-cd9ec537.js.map