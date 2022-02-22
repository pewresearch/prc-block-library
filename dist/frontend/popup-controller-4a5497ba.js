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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[13],{19:function(o,t){o.exports=window.wp.domReady},23:function(o,t){o.exports=window.wp.url},37:function(o,t,n){var e="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(e)]},538:function(o,t,n){n(37),o.exports=n(539)},539:function(o,t,n){"use strict";n.r(t);var e=n(19),i=n.n(e),c=(n(23),!!window.hasOwnProperty("Vimeo")&&window.Vimeo),r=function(o){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};!0===t?jQuery(o).modal("show"):jQuery(o).modal(n)};i()((function(){!function(){window.location.href;var o=document.querySelectorAll(".wp-block-prc-block-popup-controller");o.length&&o.forEach((function(o){var t=o.getAttribute("id"),n=o.querySelector(".wp-block-prc-block-popup-modal"),e=o.querySelector(".wp-block-prc-block-popup-content"),i={};n.setAttribute("data-trigger-id",t),(n=document.querySelector('.wp-block-prc-block-popup-modal[data-trigger-id="'.concat(t,'"]'))).getAttribute("data-transition")&&(i.transition=n.getAttribute("data-transition"));var a=n.classList.contains("is-style-video"),l=!1,u=!1;!0===a&&!1!==c&&c.hasOwnProperty("Player")&&(u=n.querySelector("iframe"),console.log("iframes found...",u),null!==u&&(u.setAttribute("allow","autoplay"),l=new c.Player(u))),1==n.getAttribute("data-inverted")&&(i.inverted=!0),!1!==l&&(e.addEventListener("mouseenter",(function(){l.ready().then((function(){console.log("the player is ready")}))})),i.onVisible=function(){window.history.pushState("modal","Modal","#".concat(t)),l.play().then((function(){console.log("the video was played")})).catch((function(o){console.log("error...",o),o.name}))},i.onHidden=function(){window.history.back(),l.unload().then((function(){console.log("the video was unloaded")})).catch((function(o){o.name}))},l.on("play",(function(){console.log("played the video!")}))),r(n,!1,i),window.location.hash==="#".concat(t)&&(console.log("Auto hash..."),setTimeout((function(){r(n)}),500)),jQuery(e).on("click",(function(o){o.preventDefault(),r(n)}))}))}()}))}},[[538,0]]]);
//# sourceMappingURL=popup-controller-4a5497ba.js.map