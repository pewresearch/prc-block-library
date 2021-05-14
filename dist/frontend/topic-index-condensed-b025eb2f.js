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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[13],{20:function(e,t){e.exports=wp.domReady},31:function(e,t){e.exports=wp.url},36:function(e,t,c){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");c.p=window["__wpackIo".concat(o)]},507:function(e,t,c){c(36),e.exports=c(508)},508:function(e,t,c){"use strict";c.r(t);var o=c(20),n=c.n(o),r=c(31),i=function(e){var t=document.querySelector(".wp-block-prc-block-topic-index-condensed .ui.vertical.fluid.tabular.menu");"true"===t.getAttribute("data-borderHidden")&&t.setAttribute("data-borderHidden","false");var c=document.querySelector('.wp-block-prc-block-topic-index-condensed-menu-item[data-uuid="'.concat(e,'"]'));c&&c.classList.add("active");var o=document.querySelector('.wp-block-prc-block-topic-index-condensed-page[data-uuid="'.concat(e,'"]'));if(o){var n={menuItem:c.dataset.slug},i=Object(r.addQueryArgs)(window.location.href,n);i=Object(r.removeQueryArgs)(i,"menuItemId"),window.history.pushState(n,document.title,i),o.classList.add("active")}};n()((function(){!function(){var e=window.prcTopicIndexCondensed.active;if(1<=e.length){var t=document.querySelector('.wp-block-prc-block-topic-index-condensed-menu-item[data-slug="'.concat(e,'"]'));console.log(t.dataset);var c=t.dataset.uuid;i(c)}}(),document.querySelectorAll(".wp-block-prc-block-topic-index-condensed-menu-item").forEach((function(e){e.addEventListener("click",(function(e){var t=e.target.getAttribute("data-uuid");!function(){var e=document.querySelector(".wp-block-prc-block-topic-index-condensed-menu-item.active");e&&e.classList.remove("active");var t=document.querySelector(".wp-block-prc-block-topic-index-condensed-page.active");t&&t.classList.remove("active")}(),i(t)}))}))}))}},[[507,0]]]);
//# sourceMappingURL=topic-index-condensed-b025eb2f.js.map