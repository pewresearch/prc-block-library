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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[9],{22:function(e,c){e.exports=wp.domReady},25:function(e,c){e.exports=wp.url},38:function(e,c,t){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");t.p=window["__wpackIo".concat(o)]},661:function(e,c,t){t(38),e.exports=t(662)},662:function(e,c,t){"use strict";t.r(c);var o=t(22),n=t.n(o),i=t(25),r=function(e){var c=document.querySelector('.wp-block-prc-block-topic-index-condensed-menu-item[data-uuid="'.concat(e,'"]'));c&&c.classList.add("active");var t=document.querySelector('.wp-block-prc-block-topic-index-condensed-page[data-uuid="'.concat(e,'"]'));if(t){var o={menuItem:c.dataset.slug},n=Object(i.addQueryArgs)(window.location.href,o);n=Object(i.removeQueryArgs)(n,"menuItemId"),window.history.pushState(o,document.title,n),t.classList.add("active")}};n()((function(){!function(){var e=window.prcTopicIndexCondensed.active;if(1<=e.length){var c=document.querySelector('.wp-block-prc-block-topic-index-condensed-menu-item[data-slug="'.concat(e,'"]'));console.log(c.dataset);var t=c.dataset.uuid;r(t)}}(),document.querySelectorAll(".wp-block-prc-block-topic-index-condensed-menu-item").forEach((function(e){e.addEventListener("click",(function(e){var c=e.target.getAttribute("data-uuid");!function(){var e=document.querySelector(".wp-block-prc-block-topic-index-condensed-menu-item.active");e&&e.classList.remove("active");var c=document.querySelector(".wp-block-prc-block-topic-index-condensed-page.active");c&&c.classList.remove("active")}(),r(c)}))}))}))}},[[661,0]]]);
//# sourceMappingURL=topic-index-condensed-c1f46ec3.js.map