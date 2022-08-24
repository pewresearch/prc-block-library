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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[16],{30:function(t,e){t.exports=window.wp.url},31:function(t,e){t.exports=window.wp.domReady},38:function(t,e,r){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(o)]},855:function(t,e,r){r(38),t.exports=r(904)},904:function(t,e,r){"use strict";r.r(e);var o=r(31),n=r.n(o),i=r(30),c=window,a=c.innerWidth,l=c.innerHeight,u=c.open,s=function(t){var e=t.getAttribute("data-share-description");e||(e=document.querySelector('meta[property="og:description"]').getAttribute("content"));var r=t.getAttribute("data-share-title");r||(r=document.querySelector('meta[property="og:title"]').getAttribute("content"));var o=t.getAttribute("data-share-url");return o||(o=document.querySelector('meta[property="og:url"]').getAttribute("content")),{url:o,description:e,title:r}};n()((function(){document.querySelectorAll(".wp-block-social-link.wp-social-link-facebook").forEach((function(t){var e=s(t),r=e.url;e.title,e.description,t.querySelector("a").addEventListener("click",(function(t){t.preventDefault();var e=Object(i.addQueryArgs)("https://www.facebook.com/sharer/sharer.php",{u:r});u(e,"fbShareWindow","height=450, width=550, top=".concat(l/2-275,", left=").concat(a/2-225,", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")),t.stopPropagation()}))})),document.querySelectorAll(".wp-block-social-link.wp-social-link-linkedin").forEach((function(t){var e=s(t),r=e.url,o=e.title,n=e.description;t.querySelector("a").addEventListener("click",(function(t){t.preventDefault();var e=Object(i.addQueryArgs)("https://www.linkedin.com/shareArticle",{summary:n,url:r,title:o,source:"PewResearch"});u(e,"linkedinShareWindow","height=450, width=550, top=".concat(l/2-275,", left=").concat(a/2-225,", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")),t.stopPropagation()}))})),document.querySelectorAll(".wp-block-social-link.wp-social-link-twitter").forEach((function(t){var e=s(t),r=e.url,o=(e.title,e.description);t.querySelector("a").addEventListener("click",(function(t){t.preventDefault();var e=Object(i.addQueryArgs)("https://twitter.com/intent/tweet",{text:o,url:r});u(e,"twtrShareWindow","height=450, width=550, top=".concat(l/2-275,", left=").concat(a/2-225,", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0")),t.stopPropagation()}))}))}))}},[[855,0]]]);
//# sourceMappingURL=social-link-007615ad.js.map