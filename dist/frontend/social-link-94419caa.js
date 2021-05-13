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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[9],{20:function(t,e){t.exports=wp.domReady},29:function(t,e){t.exports=wp.url},32:function(t,e,r){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},493:function(t,e,r){r(32),t.exports=r(494)},494:function(t,e,r){"use strict";r.r(e);var o=r(20),n=r.n(o),i=r(29),c=window,a=c.innerWidth,l=c.innerHeight,u=function(t){var e=t.getAttribute("share-description");e||(e=document.querySelector('meta[property="og:description"]').getAttribute("content"));var r=t.getAttribute("share-title");r||(r=document.querySelector('meta[property="og:title"]').getAttribute("content"));var o=t.getAttribute("share-url");return o||(o=document.querySelector('meta[property="og:url"]').getAttribute("content")),{url:o,description:e,title:r}},s=function(){document.querySelectorAll(".social-link.facebook").forEach((function(t){var e=u(t),r=e.url;e.title,e.description,t.addEventListener("click",(function(t){t.preventDefault();var e=Object(i.addQueryArgs)("https://www.facebook.com/sharer/sharer.php",{u:r});window.open(e,"fbShareWindow","height=450, width=550, top=".concat(l/2-275,", left=").concat(a/2-225,", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")),t.stopPropagation()}))})),document.querySelectorAll(".social-link.linkedin").forEach((function(t){var e=u(t),r=e.url,o=e.title,n=e.description;t.addEventListener("click",(function(t){t.preventDefault();var e=Object(i.addQueryArgs)("https://www.linkedin.com/shareArticle",{summary:n,url:r,title:o,source:"PewResearch"});window.open(e,"linkedinShareWindow","height=450, width=550, top=".concat(l/2-275,", left=").concat(a/2-225,", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")),t.stopPropagation()}))})),document.querySelectorAll(".social-link.twitter").forEach((function(t){var e=u(t),r=e.url,o=(e.title,e.description);t.addEventListener("click",(function(t){t.preventDefault();var e=Object(i.addQueryArgs)("https://twitter.com/intent/tweet",{text:o,url:r});window.open(e,"twtrShareWindow","height=450, width=550, top=".concat(l/2-275,", left=").concat(a/2-225,", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")),t.stopPropagation()}))}))};n()((function(){console.log("!!!! Social Link Frontend"),s()}))}},[[493,0]]]);
//# sourceMappingURL=social-link-94419caa.js.map