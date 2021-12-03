/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.8
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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[17],{19:function(e,o){e.exports=window.wp.domReady},22:function(e,o){e.exports=window.wp.url},32:function(e,o,c){var t="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");c.p=window["__wpackIo".concat(t)]},519:function(e,o,c){c(32),e.exports=c(530)},530:function(e,o,c){"use strict";c.r(o);var t=c(19),n=c.n(t),r=c(22);n()((function(){var e=document.querySelector(".wp-block-prc-block-topic-index-condensed-controller");if(e){var o=e.classList.contains("accordion");if(console.log("isAccordion",o),o)jQuery(e).accordion({onOpen:function(){var e={menuItem:this.dataset.slug};console.log(e);var o=Object(r.addQueryArgs)(window.location.href,e);o=Object(r.removeQueryArgs)(o,"menuItemId"),console.log(o),window.history.pushState(e,document.title,o)}});else e.querySelectorAll(".wp-block-prc-block-topic-index-condensed-menu-item").forEach((function(e){e.addEventListener("click",(function(e){var o=e.target.getAttribute("data-uuid");!function(){var e=document.querySelector(".wp-block-prc-block-topic-index-condensed-menu-item.active");e&&e.classList.remove("active");var o=document.querySelector(".wp-block-prc-block-topic-index-condensed-page.active");o&&o.classList.remove("active")}(),function(e){console.log("makeActive",e);var o=document.querySelector(".wp-block-prc-block-topic-index-condensed-controller .wp-block-prc-block-topic-index-condensed-menu");"true"===o.getAttribute("data-borderHidden")&&o.setAttribute("data-borderHidden","false");var c=document.querySelector('.wp-block-prc-block-topic-index-condensed-menu-item[data-uuid="'.concat(e,'"]'));c&&c.classList.add("active");var t=document.querySelector('.wp-block-prc-block-topic-index-condensed-page[data-uuid="'.concat(e,'"]'));if(t){console.log(t);var n={menuItem:c.dataset.slug};console.log(n);var i=Object(r.addQueryArgs)(window.location.href,n);i=Object(r.removeQueryArgs)(i,"menuItemId"),console.log(i),window.history.pushState(n,document.title,i),t.classList.add("active")}}(o)}))}))}}))}},[[519,0]]]);
//# sourceMappingURL=topic-index-condensed-06e96777.js.map