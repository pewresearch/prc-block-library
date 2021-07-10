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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[9],{21:function(t,e){t.exports=window.wp.domReady},29:function(t,e){t.exports=window.wp.url},38:function(t,e,o){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},501:function(t,e,o){o(38),t.exports=o(502)},502:function(t,e,o){"use strict";o.r(e);var r=o(21),n=o.n(r),i=o(29),c=window,a=c.innerWidth,l=c.innerHeight,u=function(t){var e=t.getAttribute("share-description");e||(e=document.querySelector('meta[property="og:description"]').getAttribute("content"));var o=t.getAttribute("share-title");o||(o=document.querySelector('meta[property="og:title"]').getAttribute("content"));var r=t.getAttribute("share-url");return r||(r=document.querySelector('meta[property="og:url"]').getAttribute("content")),{url:r,description:e,title:o}},d=function(){document.querySelectorAll(".social-link.facebook").forEach((function(t){var e=u(t),o=e.url;e.title,e.description,t.addEventListener("click",(function(t){t.preventDefault();var e=Object(i.addQueryArgs)("https://www.facebook.com/sharer/sharer.php",{u:o});window.open(e,"fbShareWindow","height=450, width=550, top=".concat(l/2-275,", left=").concat(a/2-225,", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")),t.stopPropagation()}))})),document.querySelectorAll(".social-link.linkedin").forEach((function(t){var e=u(t),o=e.url,r=e.title,n=e.description;t.addEventListener("click",(function(t){t.preventDefault();var e=Object(i.addQueryArgs)("https://www.linkedin.com/shareArticle",{summary:n,url:o,title:r,source:"PewResearch"});window.open(e,"linkedinShareWindow","height=450, width=550, top=".concat(l/2-275,", left=").concat(a/2-225,", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")),t.stopPropagation()}))})),document.querySelectorAll(".social-link.twitter").forEach((function(t){var e=u(t),o=e.url,r=(e.title,e.description);t.addEventListener("click",(function(t){t.preventDefault();var e=Object(i.addQueryArgs)("https://twitter.com/intent/tweet",{text:r,url:o});window.open(e,"twtrShareWindow","height=450, width=550, top=".concat(l/2-275,", left=").concat(a/2-225,", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")),t.stopPropagation()}))}))};n()((function(){console.log("!!!! Social Link Frontend"),d()}))}},[[501,0]]]);
//# sourceMappingURL=social-link-cec998dc.js.map