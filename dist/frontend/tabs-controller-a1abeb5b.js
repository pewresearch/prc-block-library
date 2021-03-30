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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[5],{10:function(t,c){t.exports=wp.domReady},12:function(t,c){t.exports=wp.url},142:function(t,c,e){e(19),t.exports=e(143)},143:function(t,c,e){"use strict";e.r(c);var o=e(10),a=e.n(o),n=e(12);a()((function(){document.querySelectorAll(".wp-block-prc-block-tabs").forEach((function(t){var c=t.getAttribute("id"),e=t.classList.contains("accordion");t.querySelectorAll(".wp-block-prc-block-tabs-menu-item").forEach((function(t){var o=t.getAttribute("data-uuid");t.addEventListener("click",(function(){!function(t){var c=document.getElementById(t).querySelector(".wp-block-prc-block-tabs-menu-item.active");c&&c.classList.remove("active");var e=document.getElementById(t).querySelector(".wp-block-prc-block-tabs-pane.active");e&&e.classList.remove("active")}(c),function(t,c){console.log("makeActive",t,c);var e=document.querySelector('.wp-block-prc-block-tabs-menu-item[data-uuid="'.concat(t,'"]'));e&&(console.log(c),c?(console.log("doing accordion things?",e.classList),e.classList.toggle("active",!0)):e.classList.add("active"));var o=document.querySelector('.wp-block-prc-block-tabs-pane[data-uuid="'.concat(t,'"]'));if(o){var a={menuItem:t},i=Object(n.addQueryArgs)(window.location.href,a);c?(o.classList.contains("active")&&(i=Object(n.removeQueryArgs)(i,"menuItem")),o.classList.toggle("active",!0)):o.classList.add("active"),window.history.pushState(a,document.title,i)}}(o,e)}))}))}))}))},19:function(t,c,e){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");e.p=window["__wpackIo".concat(o)]}},[[142,0]]]);
//# sourceMappingURL=tabs-controller-a1abeb5b.js.map