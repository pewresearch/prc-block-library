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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[13],{19:function(o,t){o.exports=window.wp.domReady},37:function(o,t,r){var e="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(e)]},538:function(o,t,r){r(37),o.exports=r(539)},539:function(o,t,r){"use strict";r.r(t);var e=r(19),c=function(o){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};!0===t?jQuery(o).modal("show"):jQuery(o).modal(r)};r.n(e)()((function(){var o=document.querySelectorAll(".wp-block-prc-block-popup-controller");o.length&&o.forEach((function(o){var t=o.getAttribute("id"),r=o.querySelector(".wp-block-prc-block-popup-modal"),e=o.querySelector(".wp-block-prc-block-popup-content");r.setAttribute("data-trigger-id",t),r=document.querySelector('.wp-block-prc-block-popup-modal[data-trigger-id="'.concat(t,'"]')),console.log(t,r,r.getAttribute("data-inverted"));var n={};1==r.getAttribute("data-inverted")&&(n.inverted=!0),c(r,!1,n),jQuery(e).on("click",(function(o){o.preventDefault(),console.log("CLICKED"),c(r)}))}))}))}},[[538,0]]]);
//# sourceMappingURL=popup-controller-85983075.js.map