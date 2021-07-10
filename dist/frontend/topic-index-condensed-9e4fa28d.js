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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[14],{21:function(o,e){o.exports=window.wp.domReady},32:function(o,e){o.exports=window.wp.url},38:function(o,e,c){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");c.p=window["__wpackIo".concat(n)]},511:function(o,e,c){c(38),o.exports=c(521)},521:function(o,e,c){"use strict";c.r(e);var n=c(21),t=c.n(n),i=c(32);t()((function(){var o=document.querySelector(".wp-block-prc-block-topic-index-condensed-controller");if(o){var e=o.classList.contains("accordion");if(console.log("isAccordion",e),e)jQuery(o).accordion({onOpen:function(){console.log("onOpen",void 0)},onChanging:function(){console.log("onChanging",void 0)}});else o.querySelectorAll(".wp-block-prc-block-topic-index-condensed-menu-item").forEach((function(o){o.addEventListener("click",(function(o){var e=o.target.getAttribute("data-uuid");!function(){var o=document.querySelector(".wp-block-prc-block-topic-index-condensed-menu-item.active");o&&o.classList.remove("active");var e=document.querySelector(".wp-block-prc-block-topic-index-condensed-page.active");e&&e.classList.remove("active")}(),function(o){console.log("makeActive",o);var e=document.querySelector(".wp-block-prc-block-topic-index-condensed-controller .wp-block-prc-block-topic-index-condensed-menu");"true"===e.getAttribute("data-borderHidden")&&e.setAttribute("data-borderHidden","false");var c=document.querySelector('.wp-block-prc-block-topic-index-condensed-menu-item[data-uuid="'.concat(o,'"]'));c&&c.classList.add("active");var n=document.querySelector('.wp-block-prc-block-topic-index-condensed-page[data-uuid="'.concat(o,'"]'));if(n){console.log(n);var t={menuItem:c.dataset.slug};console.log(t);var r=Object(i.addQueryArgs)(window.location.href,t);r=Object(i.removeQueryArgs)(r,"menuItemId"),console.log(r),window.history.pushState(t,document.title,r),n.classList.add("active")}}(e)}))}))}}))}},[[511,0]]]);
//# sourceMappingURL=topic-index-condensed-9e4fa28d.js.map