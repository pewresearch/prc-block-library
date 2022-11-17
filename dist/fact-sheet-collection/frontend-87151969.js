/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.24
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
(window["wpackioprcBlocksLibraryfact-sheet-collectionJsonp"]=window["wpackioprcBlocksLibraryfact-sheet-collectionJsonp"]||[]).push([[1],{165:function(e,t){e.exports=window.wp.domReady},166:function(e,t){e.exports=window.wp.viewport},2:function(e,t){e.exports=window.wp.element},20:function(e,t){e.exports=window.wp.data},204:function(e,t,a){a(140),e.exports=a(215)},215:function(e,t,a){"use strict";a.r(t);var l=a(2),c=a(165),n=a.n(c),r=a(96),o=a(43),i=a(20),s=a(166),m=a(234),u=a(230),f=a(233),d=a(231),w=a(235),h=a(102),E=function(){var e=window.prcToc;return React.createElement(m.a,{small:!0,selection:!0,link:!0},e.data.map((function(e){return!0===e.active?React.createElement(m.a.Item,{active:!0},e.title):React.createElement(m.a.Item,{as:"a",href:e.link},e.title)})))},p=function(e){var t=e.items,a=e.enableFlags,l=e.isSmall,c=void 0!==l&&l;return React.createElement(m.a,{link:!0,celled:!c,horizontal:!c,selection:c,className:"sans-serif"},t.map((function(e){return React.createElement(m.a.Item,{as:"a",href:e.url,active:e.active},!0===a&&React.createElement(u.a,{name:e.label.toLowerCase()}),e.label)})))},R=function(e){var t=e.items;return React.createElement(f.a,{placeholder:"Select Fact Sheet",fluid:!0,search:!0,selection:!0,options:t,onChange:function(e,t){var a=t.value;window.location.href=a}})},v=function(e){var t=e.altPost,a=e.collectionName,c=e.collectionTerms,n=e.download,m=e.enableFlags,u=e.style,f=Object(l.useState)(null),v=Object(r.a)(f,2),y=v[0],b=v[1],x=Object(i.select)(s.store).isViewportMatch("< medium"),g=function(e,t){var a=t.index;b(y===a?-1:a)},S=function(e){var t=e.styleOverride,a=u;void 0!==t&&(a=t);var n=[];return c.forEach((function(e){var t={active:e.classList.contains("active")};"is-style-list"===a?(t.label=e.innerText,t.url=e.href):(t.key=Object(o.cleanForSlug)(e.innerText),t.value=e.href,t.text=e.innerText,!0===m&&(t.flag=e.innerText.toLowerCase())),n.push(t)})),React.createElement(l.Fragment,null,"is-style-dropdown"===a&&React.createElement(R,{items:n}),"is-style-list"===a&&React.createElement(p,{items:n,enableFlags:m,isSmall:x}))},k=function(){return React.createElement(l.Fragment,null,React.createElement(d.a,null),React.createElement("div",{className:"ui sub header",style:{marginTop:0}},a),React.createElement(S,null),React.createElement(d.a,null),!1!==n&&React.createElement("a",{href:n.href,download:!0,style:{color:"black"},className:"sans-serif"},React.createElement("i",{className:"icon file pdf outline"}),"Download a PDF version of this fact sheet"))},T=function(){return React.createElement(w.a,{styled:!0},React.createElement(w.a.Title,{active:0===y,index:0,onClick:g},React.createElement(h.a,{name:"dropdown"}),"Table Of Contents"),React.createElement(w.a.Content,{active:0===y},React.createElement(E,null)),React.createElement(w.a.Title,{active:1===y,index:1,onClick:g},React.createElement(h.a,{name:"dropdown"}),a),React.createElement(w.a.Content,{active:1===y},React.createElement(S,{styleOverride:"is-style-list"})),!1!==n&&React.createElement(w.a.Title,{active:2===y,index:2,onClick:function(){window.location.href=n.href}},React.createElement("i",{className:"icon file pdf outline"}),"Download a PDF version of this fact sheet"))};return React.createElement("div",null,React.createElement("p",{className:"sans-serif"},React.createElement("a",{href:t.href},t.innerText)),!x&&React.createElement(k,null),x&&React.createElement(T,null))};n()((function(){document.querySelectorAll(".wp-block-prc-block-fact-sheet-collection").forEach((function(e){var t={altPost:!1,collectionName:"",collectionTerms:!1,download:!1,enableFlags:!1,style:e.getAttribute("data-style")};e.querySelector(".fact-sheet-alt-url")&&(t.altPost=e.querySelector(".fact-sheet-alt-url")),e.querySelector(".fact-sheet-collection-terms")&&(t.collectionTerms=e.querySelectorAll(".fact-sheet-collection-terms > .item"),t.collectionName=e.querySelector(".fact-sheet-collection-terms").getAttribute("data-collection-name"),t.enableFlags=Boolean(e.querySelector(".fact-sheet-collection-terms").getAttribute("data-enable-flags"))),e.querySelector(".fact-sheet-download")&&(t.download=e.querySelector(".fact-sheet-download")),Object(l.render)(React.createElement(v,t),e)}))}))},43:function(e,t){e.exports=window.wp.url}},[[204,0,3]]]);
//# sourceMappingURL=frontend-87151969.js.map