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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[5],{10:function(t,c){t.exports=wp.domReady},13:function(t,c){t.exports=wp.url},142:function(t,c,e){e(19),t.exports=e(143)},143:function(t,c,e){"use strict";e.r(c);var o=e(10),n=e.n(o),r=e(13);n()((function(){document.querySelectorAll(".wp-block-prc-block-tabs").forEach((function(t){var c=t.getAttribute("id");t.classList.contains("accordion");t.querySelectorAll(".wp-block-prc-block-tabs-menu-item").forEach((function(t){var e=t.getAttribute("data-uuid");t.addEventListener("click",(function(){!function(t){var c=document.getElementById(t).querySelector(".wp-block-prc-block-tabs-menu-item.active");c&&c.classList.remove("active");var e=document.getElementById(t).querySelector(".wp-block-prc-block-tabs-pane.active");e&&e.classList.remove("active")}(c),function(t){var c=document.querySelector('.wp-block-prc-block-tabs-menu-item[data-uuid="'.concat(t,'"]'));c&&c.classList.add("active");var e=document.querySelector('.wp-block-prc-block-tabs-pane[data-uuid="'.concat(t,'"]'));if(e){var o={menuItem:t},n=Object(r.addQueryArgs)(window.location.href,o);console.log("newUrl",n),window.history.pushState(o,document.title,n),e.classList.add("active")}}(e)}))}))}))}))},19:function(t,c,e){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");e.p=window["__wpackIo".concat(o)]}},[[142,0]]]);
//# sourceMappingURL=tabs-controller-b91ecda3.js.map