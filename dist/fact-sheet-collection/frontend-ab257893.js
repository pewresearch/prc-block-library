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
(window["wpackioprcBlocksLibraryfact-sheet-collectionJsonp"]=window["wpackioprcBlocksLibraryfact-sheet-collectionJsonp"]||[]).push([[2],{0:function(e,t){e.exports=React},139:function(e,t){e.exports=wp.domReady},166:function(e,t,l){l(125),e.exports=l(168)},168:function(e,t,l){"use strict";l.r(t);var a=l(6),c=l(139),n=l.n(c),r=l(183),o=l(178),i=l(180),s=l(179),u=l(75),m=function(){var e=window.prcToc;return React.createElement(r.a,{small:!0,selection:!0,link:!0},e.data.map((function(e,t){return!0===e.active?React.createElement(r.a.Item,{active:!0,key:t},e.title):React.createElement(r.a.Item,{as:"a",href:e.link,key:t},e.title)})))},f=function(e){var t=e.items,l=e.enableFlags;return React.createElement("div",{className:"ui celled horizontal link list sans-serif"},t.map((function(e){return React.createElement("a",{className:"item",href:e.url},!0===l&&React.createElement(o.a,{name:e.label.toLowerCase()}),e.label)})))},d=function(e){var t=e.items;return React.createElement(i.a,{placeholder:"Select Fact Sheet",fluid:!0,search:!0,selection:!0,options:t,onChange:function(e,t){var l=t.value;window.location.href=l}})},h=function(e){var t=e.altPost,l=e.collectionName,c=e.collectionTerms,n=e.download,r=e.enableFlags,o=e.style,i=function(){var e=[];return c.forEach((function(t){if("is-style-list"===o)e.push({label:t.innerText,url:t.href});else{var l={key:Object(u.cleanForSlug)(t.innerText),value:t.href,text:t.innerText};!0===r&&(l.flag=t.innerText.toLowerCase()),e.push(l)}})),React.createElement(a.Fragment,null,"is-style-dropdown"===o&&React.createElement(d,{items:e}),"is-style-list"===o&&React.createElement(f,{items:e,enableFlags:r}))};return React.createElement("div",null,React.createElement(m,null),React.createElement("a",{href:t.href},t.innerText),React.createElement(s.a,null),React.createElement("div",{className:"ui sub header"},l),React.createElement(i,null),React.createElement(s.a,null),React.createElement("a",{href:n.href,download:!0,style:{color:"black"}},React.createElement("i",{className:"icon file pdf outline"}),"Download a PDF version of this fact sheet"))};n()((function(){document.querySelectorAll(".wp-block-prc-block-fact-sheet-collection").forEach((function(e){var t={altPost:!1,collectionName:"",collectionTerms:!1,download:!1,enableFlags:!1,style:e.getAttribute("data-style")};e.querySelector(".fact-sheet-alt-url")&&(t.altPost=e.querySelector(".fact-sheet-alt-url")),e.querySelector(".fact-sheet-collection-terms")&&(t.collectionTerms=e.querySelectorAll(".fact-sheet-collection-terms > .item"),t.collectionName=e.querySelector(".fact-sheet-collection-terms").getAttribute("data-collection-name"),t.enableFlags=Boolean(e.querySelector(".fact-sheet-collection-terms").getAttribute("data-enable-flags"))),e.querySelector(".fact-sheet-download")&&(t.download=e.querySelector(".fact-sheet-download")),Object(a.render)(React.createElement(h,t),e)}))}))},6:function(e,t){e.exports=wp.element},62:function(e,t){e.exports=ReactDOM},75:function(e,t){e.exports=wp.url}},[[166,0,1,4]]]);
//# sourceMappingURL=frontend-ab257893.js.map