/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.9
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2022 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[15],{19:function(o,n){o.exports=window.wp.domReady},23:function(o,n){o.exports=window.wp.url},28:function(o,n,t){var e="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");t.p=window["__wpackIo".concat(e)]},514:function(o,n,t){t(28),o.exports=t(515)},515:function(o,n,t){"use strict";t.r(n);var e=t(19),c=t.n(e),r=t(23);c()((function(){var o=document.querySelector(".wp-block-prc-block-topic-index-az-controller.ui.accordion");if(o){jQuery(o).accordion({onOpen:function(){var o={menuItem:this.dataset.slug},n=Object(r.addQueryArgs)(window.location.href,o);n=Object(r.removeQueryArgs)(n,"menuItemId"),window.history.pushState(o,document.title,n)}});var n=Object(r.getQueryArg)(window.location.href,"menuItem");console.log("watchAndMove",n),n&&setTimeout((function(){document.querySelector('.content[data-slug="'.concat(n,'"]')).scrollIntoView()}),200)}}))}},[[514,0]]]);
//# sourceMappingURL=topic-index-az-mobile-871e36a0.js.map