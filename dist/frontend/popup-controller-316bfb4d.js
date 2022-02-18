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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[13],{19:function(o,t){o.exports=window.wp.domReady},37:function(o,t,e){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");e.p=window["__wpackIo".concat(n)]},538:function(o,t,e){e(37),o.exports=e(539)},539:function(o,t,e){"use strict";e.r(t);var n=e(19),r=e.n(n),c=!!window.hasOwnProperty("Vimeo")&&window.Vimeo,i=function(o){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};!0===t?jQuery(o).modal("show"):jQuery(o).modal(e)};r()((function(){var o;(o=document.querySelectorAll(".wp-block-prc-block-popup-controller")).length&&o.forEach((function(o){var t=o.getAttribute("id"),e=o.querySelector(".wp-block-prc-block-popup-modal"),n=o.querySelector(".wp-block-prc-block-popup-content"),r={};e.setAttribute("data-trigger-id",t),(e=document.querySelector('.wp-block-prc-block-popup-modal[data-trigger-id="'.concat(t,'"]'))).getAttribute("data-transition")&&(r.transition=e.getAttribute("data-transition"));var a=e.classList.contains("is-style-video"),l=!1,u=!1;!0===a&&!1!==c&&c.hasOwnProperty("Player")&&(u=e.querySelector("iframe"),console.log("iframes found...",u),null!==u&&(u.setAttribute("allow","autoplay"),l=new c.Player(u))),1==e.getAttribute("data-inverted")&&(r.inverted=!0),!1!==l&&(n.addEventListener("mouseenter",(function(){l.ready().then((function(){console.log("the player is ready")}))})),r.onVisible=function(){l.play().then((function(){console.log("the video was played")})).catch((function(o){console.log("error...",o),o.name}))},r.onHidden=function(){l.unload().then((function(){console.log("the video was unloaded")})).catch((function(o){o.name}))},l.on("play",(function(){console.log("played the video!")}))),i(e,!1,r),window.location.hash==="#".concat(t)&&(console.log("Auto hash..."),setTimeout((function(){i(e)}),500)),jQuery(n).on("click",(function(o){o.preventDefault(),i(e)}))}))}))}},[[538,0]]]);
//# sourceMappingURL=popup-controller-316bfb4d.js.map