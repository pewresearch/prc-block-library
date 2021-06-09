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
(window["wpackioprcBlocksLibrarystory-itemJsonp"]=window["wpackioprcBlocksLibrarystory-itemJsonp"]||[]).push([[2],{0:function(t,e){t.exports=React},1:function(t,e){t.exports=wp.element},100:function(t,e){t.exports=wp.domReady},11:function(t,e){t.exports=wp.blockEditor},121:function(t,e,a){a(87),t.exports=a(122)},122:function(t,e,a){"use strict";a.r(e);var r=a(1),i=a(100),n=a.n(i),o=a(22),u=function(){document.querySelectorAll(".react-story-item").forEach((function(t){var e=function(t){var e={title:"",excerpt:"",extra:"",link:"",label:"",date:"",image:"",imageSlot:"disabled",imageSize:"A3",isChartArt:!1,postID:"",headerSize:2,enableEmphasis:!1,enableHeader:!0,enableMeta:!0,enableAltHeaderWeight:!1,enableExcerpt:!0,enableExcerptBelow:!1,enableExtra:!1,enableBreakingNews:!1,extraContent:!1,className:"",inLoop:!1};e.className=t.getAttribute("data-classname"),e.title=t.querySelector(".title").textContent,t.querySelector(".extra-content")&&(e.extraContent=t.querySelector(".extra-content").innerHTML);var a=t.querySelector(".description");a?e.excerpt=a.innerHTML:e.enableExcerpt=!1,e.link=t.getAttribute("data-link"),e.label=t.getAttribute("data-label"),e.date=t.getAttribute("data-date");var r=t.getAttribute("data-image");return r&&(e.image=r,e.imageSlot=t.getAttribute("data-imageslot"),e.imageSize=t.getAttribute("data-imagesize"),t.getAttribute("data-chartart")&&("1"!==t.getAttribute("data-chartart")&&"true"!==t.getAttribute("data-chartart")||(e.isChartArt=!0))),t.querySelector(".extra")&&(e.extra=t.querySelector(".extra").innerHTML,e.enableExtra=!0),t.getAttribute("data-headersize")&&(e.headerSize=t.getAttribute("data-headersize")),t.getAttribute("data-emphasis")&&("1"!==t.getAttribute("data-emphasis")&&"true"!==t.getAttribute("data-emphasis")||(e.enableEmphasis=!0)),t.getAttribute("data-meta")?"1"===t.getAttribute("data-meta")||"true"===t.getAttribute("data-meta")?e.enableMeta=!0:"0"!==t.getAttribute("data-meta")&&"false"!==t.getAttribute("data-meta")&&""!==t.getAttribute("data-meta")||(e.enableMeta=!1):e.enableMeta=!1,t.getAttribute("data-breakingnews")&&("1"!==t.getAttribute("data-breakingnews")&&"true"!==t.getAttribute("data-breakingnews")||(e.enableBreakingNews=!0)),t.getAttribute("data-inloop")&&("1"!==t.getAttribute("data-inloop")&&"true"!==t.getAttribute("data-inloop")||(e.inLoop=!0)),t.getAttribute("data-excerptbelow")&&("1"!==t.getAttribute("data-excerptbelow")&&"true"!==t.getAttribute("data-excerptbelow")||(e.enableExcerptBelow=!0)),console.log("story item props:",e),e}(t);Object(r.render)(React.createElement(o.b,e),t),t.classList.add("loaded")}))};n()((function(){u(),jQuery(document).on("facetwp-loaded",(function(){u()}))}))},2:function(t,e){t.exports=wp.components},21:function(t,e){t.exports=moment},23:function(t,e){t.exports=wp.apiFetch},24:function(t,e){t.exports=wp.data},31:function(t,e){t.exports=wp.blocks},4:function(t,e){t.exports=wp.i18n},46:function(t,e){t.exports=wp.url},55:function(t,e){t.exports=ReactDOM},8:function(t,e){t.exports=lodash}},[[121,0,1]]]);
//# sourceMappingURL=frontend-501ae691.js.map