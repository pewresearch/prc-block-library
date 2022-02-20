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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[13],{19:function(o,t){o.exports=window.wp.domReady},23:function(o,t){o.exports=window.wp.url},37:function(o,t,n){var e="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(e)]},538:function(o,t,n){n(37),o.exports=n(539)},539:function(o,t,n){"use strict";n.r(t);var e=n(19),i=n.n(e),r=(n(23),!!window.hasOwnProperty("Vimeo")&&window.Vimeo),c=function(o){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};!0===t?jQuery(o).modal("show"):jQuery(o).modal(n)};i()((function(){var o,t;o=window.location.href,(t=document.querySelectorAll(".wp-block-prc-block-popup-controller")).length&&t.forEach((function(t){var n=t.getAttribute("id"),e=t.querySelector(".wp-block-prc-block-popup-modal"),i=t.querySelector(".wp-block-prc-block-popup-content"),a={};e.setAttribute("data-trigger-id",n),(e=document.querySelector('.wp-block-prc-block-popup-modal[data-trigger-id="'.concat(n,'"]'))).getAttribute("data-transition")&&(a.transition=e.getAttribute("data-transition"));var l=e.classList.contains("is-style-video"),d=!1,u=!1;!0===l&&!1!==r&&r.hasOwnProperty("Player")&&(u=e.querySelector("iframe"),console.log("iframes found...",u),null!==u&&(u.setAttribute("allow","autoplay"),d=new r.Player(u))),1==e.getAttribute("data-inverted")&&(a.inverted=!0),!1!==d&&(i.addEventListener("mouseenter",(function(){d.ready().then((function(){console.log("the player is ready")}))})),a.onVisible=function(){window.history.pushState("modal","Modal","#".concat(n)),d.play().then((function(){console.log("the video was played")})).catch((function(o){console.log("error...",o),o.name}))},a.onHidden=function(){console.log("originalUrl",o),window.history.back(),d.unload().then((function(){console.log("the video was unloaded")})).catch((function(o){o.name}))},d.on("play",(function(){console.log("played the video!")}))),c(e,!1,a),window.location.hash==="#".concat(n)&&(console.log("Auto hash..."),setTimeout((function(){c(e)}),500)),jQuery(i).on("click",(function(o){o.preventDefault(),c(e)}))}))}))}},[[538,0]]]);
//# sourceMappingURL=popup-controller-0880ad22.js.map