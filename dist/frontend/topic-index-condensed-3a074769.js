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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[14],{21:function(e,c){e.exports=window.wp.domReady},30:function(e,c){e.exports=window.wp.url},38:function(e,c,o){var t="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(t)]},511:function(e,c,o){o(38),e.exports=o(512)},512:function(e,c,o){"use strict";o.r(c);var t=o(21),n=o.n(t),r=o(30),i=function(e){var c=document.querySelector(".wp-block-prc-block-topic-index-condensed-controller .wp-block-prc-block-topic-index-condensed-menu");"true"===c.getAttribute("data-borderHidden")&&c.setAttribute("data-borderHidden","false");var o=document.querySelector('.wp-block-prc-block-topic-index-condensed-menu-item[data-uuid="'.concat(e,'"]'));o&&o.classList.add("active");var t=document.querySelector('.wp-block-prc-block-topic-index-condensed-page[data-uuid="'.concat(e,'"]'));if(t){var n={menuItem:o.dataset.slug},i=Object(r.addQueryArgs)(window.location.href,n);i=Object(r.removeQueryArgs)(i,"menuItemId"),window.history.pushState(n,document.title,i),t.classList.add("active")}};n()((function(){!function(){var e=window.prcTopicIndexCondensed.active;if(1<=e.length){var c=document.querySelector('.wp-block-prc-block-topic-index-condensed-menu-item[data-slug="'.concat(e,'"]'));console.log(c.dataset);var o=c.dataset.uuid;i(o)}}();var e=document.querySelector(".wp-block-prc-block-topic-index-condensed-controller");if(e){var c=e.classList.contains("accordion");console.log("isAccordion",c),c&&jQuery(e).accordion(),e.querySelectorAll(".wp-block-prc-block-topic-index-condensed-menu-item").forEach((function(e){e.addEventListener("click",(function(e){var c=e.target.getAttribute("data-uuid");!function(){var e=document.querySelector(".wp-block-prc-block-topic-index-condensed-menu-item.active");e&&e.classList.remove("active");var c=document.querySelector(".wp-block-prc-block-topic-index-condensed-page.active");c&&c.classList.remove("active")}(),i(c)}))}))}}))}},[[511,0]]]);
//# sourceMappingURL=topic-index-condensed-3a074769.js.map