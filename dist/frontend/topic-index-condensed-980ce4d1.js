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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[7],{11:function(e,c){e.exports=wp.domReady},145:function(e,c,t){t(23),e.exports=t(146)},146:function(e,c,t){"use strict";t.r(c);var o=t(11),n=t.n(o),i=t(17),r=function(e){var c=document.querySelector('.wp-block-prc-block-topic-index-condensed-menu-item[data-uuid="'.concat(e,'"]'));c&&c.classList.add("active");var t=document.querySelector('.wp-block-prc-block-topic-index-condensed-page[data-uuid="'.concat(e,'"]'));if(t){var o={menuItem:c.dataset.slug},n=Object(i.addQueryArgs)(window.location.href,o);n=Object(i.removeQueryArgs)(n,"menuItemId"),window.history.pushState(o,document.title,n),t.classList.add("active")}};n()((function(){!function(){var e=window.prcTopicIndexCondensed.active;if(1<=e.length){var c=document.querySelector('.wp-block-prc-block-topic-index-condensed-menu-item[data-slug="'.concat(e,'"]'));console.log(c.dataset);var t=c.dataset.uuid;r(t)}}(),document.querySelectorAll(".wp-block-prc-block-topic-index-condensed-menu-item").forEach((function(e){e.addEventListener("click",(function(e){var c=e.target.getAttribute("data-uuid");!function(){var e=document.querySelector(".wp-block-prc-block-topic-index-condensed-menu-item.active");e&&e.classList.remove("active");var c=document.querySelector(".wp-block-prc-block-topic-index-condensed-page.active");c&&c.classList.remove("active")}(),r(c)}))}))}))},17:function(e,c){e.exports=wp.url},23:function(e,c,t){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");t.p=window["__wpackIo".concat(o)]}},[[145,0]]]);
//# sourceMappingURL=topic-index-condensed-980ce4d1.js.map