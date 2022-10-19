/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.17
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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[13],{24:function(o,n){o.exports=window.wp.domReady},30:function(o,n){o.exports=window.wp.url},35:function(o,n,t){var e="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");t.p=window["__wpackIo".concat(e)]},863:function(o,n,t){t(35),o.exports=t(864)},864:function(o,n,t){"use strict";t.r(n);var e=t(24),i=t.n(e),c=(t(30),!!window.hasOwnProperty("Vimeo")&&window.Vimeo),r=function(o){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};!0===n?jQuery(o).modal("show"):jQuery(o).modal(t)};i()((function(){!function(){window.location.href;var o=document.querySelectorAll(".wp-block-prc-block-popup-controller");o.length&&o.forEach((function(o){var n=o.getAttribute("id"),t=o.querySelector(".wp-block-prc-block-popup-modal"),e=o.querySelector(".wp-block-prc-block-popup-content"),i={};t.setAttribute("data-trigger-id",n),(t=document.querySelector('.wp-block-prc-block-popup-modal[data-trigger-id="'.concat(n,'"]'))).getAttribute("data-transition")&&(i.transition=t.getAttribute("data-transition"));var a=t.classList.contains("is-style-video"),l=!1,d=!1;!0===a&&!1!==c&&c.hasOwnProperty("Player")&&(d=t.querySelector("iframe"),console.log("iframes found...",d),null!==d&&(d.setAttribute("allow","autoplay"),l=new c.Player(d))),1==t.getAttribute("data-inverted")&&(i.inverted=!0),!1!==l?(e.addEventListener("mouseenter",(function(){l.ready().then((function(){console.log("the player is ready")}))})),i.onVisible=function(){window.history.pushState("modal","Modal","#".concat(n)),l.play().then((function(){console.log("the video was played")})).catch((function(o){console.log("error...",o),o.name}))},i.onHidden=function(){window.history.back(),l.unload().then((function(){console.log("the video was unloaded")})).catch((function(o){o.name}))},l.on("play",(function(){console.log("played the video!")}))):(i.onVisible=function(){window.history.pushState("modal","Modal","#".concat(n))},i.onHidden=function(){window.history.back()}),r(t,!1,i),window.location.hash==="#".concat(n)&&(console.log("Auto hash..."),setTimeout((function(){r(t)}),500)),jQuery(e).on("click",(function(o){o.preventDefault(),r(t)}))}))}()}))}},[[863,0]]]);
//# sourceMappingURL=popup-controller-8dc9b6b1.js.map