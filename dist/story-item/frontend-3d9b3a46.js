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
(window["wpackioprcBlocksLibrarystory-itemJsonp"]=window["wpackioprcBlocksLibrarystory-itemJsonp"]||[]).push([[3],{0:function(t,e){t.exports=React},1:function(t,e){t.exports=wp.element},11:function(t,e){t.exports=wp.blockEditor},151:function(t,e){t.exports=wp.domReady},25:function(t,e){t.exports=moment},288:function(t,e,a){a(104),t.exports=a(289)},289:function(t,e,a){"use strict";a.r(e);var r=a(1),i=a(151),n=a.n(i),o=a(52);n()((function(){document.querySelectorAll(".react-story-item").forEach((function(t){var e=function(t){var e={title:"",excerpt:"",extra:"",link:"",label:"",date:"",image:"",imageSlot:"disabled",imageSize:"A3",isChartArt:!1,postID:"",headerSize:"normal",enableEmphasis:!1,enableHeader:!0,enableExcerpt:!0,enableExtra:!1,enableBreakingNews:!1,className:"",inLoop:!1};e.className=t.getAttribute("data-classname"),e.title=t.querySelector(".title").textContent;var a=t.querySelector(".description");a?e.excerpt=a.innerHTML:e.enableExcerpt=!1,e.link=t.getAttribute("data-link"),e.label=t.getAttribute("data-label"),e.date=t.getAttribute("data-date");var r=t.getAttribute("data-image");return r&&(e.image=r,e.imageSlot=t.getAttribute("data-imageslot"),e.imageSize=t.getAttribute("data-imagesize"),e.isChartArt=t.getAttribute("data-chartart")),t.querySelector(".extra")&&(e.extra=t.querySelector(".extra").innerHTML,e.enableExtra=!0),t.getAttribute("data-headersize")&&(e.headerSize=t.getAttribute("data-headersize")),t.getAttribute("data-emphasis")&&"true"===t.getAttribute("data-emphasis")&&(e.enableEmphasis=!0),t.getAttribute("data-breakingnews")&&"true"===t.getAttribute("data-breakingnews")&&(e.enableBreakingNews=!0),t.getAttribute("data-inloop")&&"true"===t.getAttribute("data-inloop")&&(e.inLoop=!0),e}(t);Object(r.render)(React.createElement(o.a,e),t),t.classList.add("loaded")}))}))},29:function(t,e){t.exports=wp.apiFetch},39:function(t,e){t.exports=ReactDOM},69:function(t,e){t.exports=lodash},9:function(t,e){t.exports=wp.components},94:function(t,e){t.exports=wp.url},97:function(t,e){t.exports=wp.htmlEntities}},[[288,1,2,0]]]);
//# sourceMappingURL=frontend-3d9b3a46.js.map