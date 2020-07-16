/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2020 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window["wpackioprcBlocksLibrarystory-itemJsonp"]=window["wpackioprcBlocksLibrarystory-itemJsonp"]||[]).push([[3],{0:function(e,t){e.exports=React},1:function(e,t){e.exports=wp.element},12:function(e,t){e.exports=wp.blockEditor},152:function(e,t){e.exports=wp.domReady},25:function(e,t){e.exports=moment},288:function(e,t,a){a(106),e.exports=a(289)},289:function(e,t,a){"use strict";a.r(t);var r=a(1),i=a(152),n=a.n(i),o=a(54);n()((function(){document.querySelectorAll(".react-story-item").forEach((function(e){var t=function(e){var t={title:"",excerpt:"",extra:"",link:"",label:"",date:"",image:"",imageSlot:"disabled",imageSize:"A3",isChartArt:!1,postID:"",headerSize:"normal",enableEmphasis:!1,enableHeader:!0,enableAltHeaderWeight:!1,enableExcerpt:!0,enableExcerptBelow:!1,enableExtra:!1,enableBreakingNews:!1,className:"",inLoop:!1};t.className=e.getAttribute("data-classname"),t.title=e.querySelector(".title").textContent;var a=e.querySelector(".description");a?t.excerpt=a.innerHTML:t.enableExcerpt=!1,t.link=e.getAttribute("data-link"),t.label=e.getAttribute("data-label"),t.date=e.getAttribute("data-date");var r=e.getAttribute("data-image");return r&&(t.image=r,t.imageSlot=e.getAttribute("data-imageslot"),t.imageSize=e.getAttribute("data-imagesize"),t.isChartArt=e.getAttribute("data-chartart")),e.querySelector(".extra")&&(t.extra=e.querySelector(".extra").innerHTML,t.enableExtra=!0),e.getAttribute("data-headersize")&&(t.headerSize=e.getAttribute("data-headersize")),e.getAttribute("data-emphasis")&&"true"===e.getAttribute("data-emphasis")&&(t.enableEmphasis=!0),e.getAttribute("data-breakingnews")&&"true"===e.getAttribute("data-breakingnews")&&(t.enableBreakingNews=!0),e.getAttribute("data-inloop")&&"true"===e.getAttribute("data-inloop")&&(t.inLoop=!0),e.getAttribute("data-excerptbelow")&&"true"===e.getAttribute("data-excerptbelow")&&(t.enableExcerptBelow=!0),t}(e);Object(r.render)(React.createElement(o.a,t),e),e.classList.add("loaded")}))}))},29:function(e,t){e.exports=wp.apiFetch},39:function(e,t){e.exports=ReactDOM},43:function(e,t){e.exports=lodash},8:function(e,t){e.exports=wp.components},96:function(e,t){e.exports=wp.url},99:function(e,t){e.exports=wp.htmlEntities}},[[288,1,2,0]]]);
//# sourceMappingURL=frontend-188ee312.js.map