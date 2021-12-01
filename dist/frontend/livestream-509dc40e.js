/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.0.0
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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[8],{16:function(e,t){e.exports=window.wp.domReady},28:function(e,t,r){var c="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(c)]},512:function(e,t,r){r(28),e.exports=r(538)},538:function(e,t,r){"use strict";r.r(t);var c=r(9),a=r(16),o=function(e){var t=e.streamURL,r=e.chatURL;return React.createElement(React.Fragment,null,React.createElement("div",{className:"prc-livestream-stream"},React.createElement("iframe",{src:t,frameborder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowfullscreen:!0,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"}})),React.createElement("div",{className:"prc-livestream-chat"},React.createElement("iframe",{src:r,height:"100%",width:"100%",frameBorder:"0",style:{minHeight:"560px"},title:"Slido"})))};r.n(a)()((function(){if(document.querySelector(".wp-block-prc-block-livestream")){console.log("stream loading");var e=document.querySelectorAll(".wp-block-prc-block-livestream");console.log(e),e.forEach((function(e){var t={streamURL:e.dataset.streamUrl,chatURL:e.dataset.chatUrl};Object(c.render)(React.createElement(o,t),e)}))}}))},9:function(e,t){e.exports=window.wp.element}},[[512,0]]]);
//# sourceMappingURL=livestream-509dc40e.js.map