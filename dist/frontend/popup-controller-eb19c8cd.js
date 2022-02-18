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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[13],{19:function(o,r){o.exports=window.wp.domReady},37:function(o,r,t){var c="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");t.p=window["__wpackIo".concat(c)]},538:function(o,r,t){t(37),o.exports=t(539)},539:function(o,r,t){"use strict";t.r(r);var c=t(19),e=function(o){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};!0===r?jQuery(o).modal("show"):jQuery(o).modal(t)};t.n(c)()((function(){var o=document.querySelectorAll(".wp-block-prc-block-popup-controller");o.length&&o.forEach((function(o){var r=o.getAttribute("id"),t=o.querySelector(".wp-block-prc-block-popup-modal"),c=o.querySelector(".wp-block-prc-block-popup-content");t.setAttribute("data-trigger-id",r);var n={};1==(t=document.querySelector('.wp-block-prc-block-popup-modal[data-trigger-id="'.concat(r,'"]'))).getAttribute("data-inverted")&&(n.inverted=!0),e(t,!1,n),jQuery(c).on("click",(function(o){o.preventDefault(),console.log("CLICKED"),e(t)}))}))}))}},[[538,0]]]);
//# sourceMappingURL=popup-controller-eb19c8cd.js.map