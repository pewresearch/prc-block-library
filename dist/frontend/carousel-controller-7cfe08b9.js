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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[3],{1:function(e,t){e.exports=window.React},111:function(e,t){e.exports=window.wp.data},118:function(e,t){e.exports=window.ReactDOM},150:function(e,t){e.exports=window.wp.htmlEntities},179:function(e,t){e.exports=regeneratorRuntime},208:function(e,t){e.exports=window.wp.blockEditor},21:function(e,t){e.exports=window.wp.domReady},24:function(e,t){e.exports=window.wp.components},28:function(e,t){e.exports=window.wp.url},29:function(e,t){e.exports=window.wp.i18n},429:function(e,t){e.exports=window.wp.mediaUtils},450:function(e,t){e.exports=window.wp.coreData},6:function(e,t){e.exports=window.wp.element},744:function(e,t){e.exports=window.wp.primitives},746:function(e,t){e.exports=window.wp.date},771:function(e,t){e.exports=window.wp.blocks},833:function(e,t,o){o(31),e.exports=o(843)},839:function(e,t){e.exports=window.wp.keycodes},843:function(e,t,o){"use strict";o.r(t);o(82),o(32);var n=o(200),c=(o(869),o(768),o(280)),r=o(111),i=o(6),l=o(29),a=o(24);o(17),o(98),o(89),o(769),o(30),o(179);var s,d=o(28),u=o(150);Object(c.a)(a.Button)(s||(s=Object(n.a)(["\n\t&:hover {\n\t\t/* Add opacity background to support future color changes */\n\t\t/* Reduce background from #ddd to 0.05 for text contrast  */\n\t\tbackground-color: rgba(0, 0, 0, 0.05);\n\n\t\t.block-editor-link-control__search-item-type {\n\t\t\tcolor: black;\n\t\t}\n\t}\n\n\t.block-editor-link-control__search-item-type {\n\t\tbackground-color: rgba(0, 0, 0, 0.05);\n\t}\n"])));var w,p,k=o(283),b=Object(k.c)((function(){return React.createElement("svg",{style:{marginRight:"5px",cursor:"grab",flexShrink:0},width:"18",height:"18",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M5 4h2V2H5v2zm6-2v2h2V2h-2zm-6 8h2V8H5v2zm6 0h2V8h-2v2zm-6 6h2v-2H5v2zm6 0h2v-2h-2v2z"}))})),m=Object(c.a)("div")(w||(w=Object(n.a)(["\n\tbutton {\n\t\tdisplay: block;\n\t\tpadding: 2px 8px 6px 8px;\n\t\tmargin-left: auto;\n\t\tfont-size: 2em;\n\t\tcursor: pointer;\n\t\tborder: none;\n\t\tbackground-color: transparent;\n\n\t\t&:hover {\n\t\t\tbackground-color: #ccc;\n\t\t}\n\t}\n"]))),f=function(e){var t=e.item,o=e.isOrderable,n=void 0!==o&&o,c=e.handleItemDelete,a=e.mode,s="post"===a?"postType":"taxonomy",w=Object(r.useSelect)((function(e){var o=e("core"),n=o.getEntityRecord,c=o.hasFinishedResolution,r=[s,t.type,t.id],i=n.apply(void 0,r);if(i){console.log("Has Item",i);var l={title:"post"===a?i.title.rendered:i.name,url:i.link,id:i.id};return t.uuid&&(l.uuid=t.uuid),l}if(c("getEntityRecord",r))return null}),[t.id,s]);return Object(i.useEffect)((function(){null===w&&c(t)}),[t,c,w]),w?React.createElement(m,{style:{border:"2px dashed #ddd",paddingTop:"10px",paddingBottom:"10px",paddingLeft:n?"3px":"8px"},className:"block-editor-link-control__search-item is-entity"},n?React.createElement(b,null):"",React.createElement("span",{className:"block-editor-link-control__search-item-header"},React.createElement("span",{className:"block-editor-link-control__search-item-title"},Object(u.decodeEntities)(w.title)),React.createElement("span",{"aria-hidden":!0,className:"block-editor-link-control__search-item-info"},Object(d.filterURLForDisplay)(Object(d.safeDecodeURI)(w.url))||"")),React.createElement("button",{type:"button",onClick:function(){c(w)},"aria-label":Object(l.__)("Delete item","10up-block-components")},"×")):React.createElement("div",null)};Object(k.a)((function(e){var t=e.items,o=e.isOrderable,n=e.handleItemDelete,c=e.mode,r=e.ChildComponent,i=void 0!==r&&r,l=!1!==i?o?Object(k.b)(i):i:o?Object(k.b)(f):f;return React.createElement("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'}},t.map((function(e,r){var i=e.uuid?e.uuid:e.id;return React.createElement(l,{isOrderable:!!(o&&1<t.length)&&o,key:"item-".concat(i),index:r,handleItemDelete:n,sortIndex:r,item:e,mode:c,totalItems:t.length})})))})),Object(c.a)("div")(p||(p=Object(n.a)(["\n\t& .block-editor-link-control__search-item {\n\t\tborder: none !important;\n\t\tcursor: default;\n\n\t\t&:hover {\n\t\t\tbackground: transparent;\n\t\t}\n\t}\n"])));o(867);o(208);o(868),o(771);o(839);o(748),o(429);o(746),o(450);var h=o(747),g=o(772),B=o(21),v=o.n(B);function x(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;window.prcBlocks.carouselBlocks.watched.some((function(t){return t.id===e}))||window.prcBlocks.carouselBlocks.watched.push({id:e,y:0,ratio:0,enabled:!1,controller:t})}window.hasOwnProperty("prcBlocks")||(window.prcBlocks={}),window.prcBlocks.carouselBlocks={debug:!0,isMobile:!1,watched:[],toggleBodyLock:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=document.querySelector("body");!0===e?t.classList.add("carousel-locked"):t.classList.remove("carousel-locked")},unlockCarousel:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=document.getElementById(e),n=window.prcBlocks.carouselBlocks.watched.findIndex((function(t){return t.id===e})),c=window.prcBlocks.carouselBlocks.isMobile,r=window.prcBlocks.carouselBlocks.watched[n].controller;c?r.Components.Drag.disable(!1):window.prcBlocks.carouselBlocks.toggleBodyLock(!0),setTimeout((function(){o.parentElement.parentElement.scrollIntoView(!0)}),200),window.prcBlocks.carouselBlocks.watched[n].enabled=!0,console.warn("unlockCarousel: ",t)},lockCarousel:function(e){var t=window.prcBlocks.carouselBlocks.watched.findIndex((function(t){return t.id===e})),o=window.prcBlocks.carouselBlocks.isMobile,n=window.prcBlocks.carouselBlocks.watched[t].controller;o?n.Components.Drag.disable(!0):window.prcBlocks.carouselBlocks.toggleBodyLock(!1),window.prcBlocks.carouselBlocks.watched[t].enabled=!1,console.warn("lockCarousel: ",e)}},v()((function(){var e=document.querySelectorAll(".wp-block-prc-block-carousel"),t=Array.from(e);window.prcBlocks.carouselBlocks.isMobile=t.some((function(e){return e.getAttribute("data-is-mobile")})),e.length&&e.forEach((function(e){var t="_".concat(Math.random().toString(36).substr(2,9));e.setAttribute("id",t),e.querySelectorAll("ul.splide__list > .wp-block-prc-block-carousel-slide").forEach((function(e){e.classList.add("splide__slide")})),e.classList.contains("is-style-horizontal")?function(e,t){var o=window.prcBlocks.carouselBlocks.debug,n=new h.a(t,{direction:"ltr",autoHeight:!0,arrows:!0,wheel:!1,waitForTransition:!0,speed:700});x(e,n),n.mount(),o&&console.warn("Carousel (horizontal) initialized:",n,window.prcBlocks.carouselBlocks)}(t,e):function(e,t){var o=window.prcBlocks.carouselBlocks,n=o.lockCarousel,c=o.unlockCarousel,r=o.isMobile,i=o.debug,l={direction:"ttb",height:t.offsetHeight,arrows:!1,wheel:!0,waitForTransition:!0,wheelSleep:700,speed:700,releaseWheel:!0,intersection:{threshold:.95}},a=new h.a(t,l);a.mount({Intersection:g.a}),x(e,a),i&&console.warn("Carousel (vertical) initialized:",a,window.prcBlocks.carouselBlocks);var s=a.length;a.root.addEventListener("wheel",(function(t){var o=window.prcBlocks.carouselBlocks.watched.find((function(t){return t.id===e})).enabled;console.log("Scrolling...",o),o||t.stopPropagation()}),{capture:!0,passive:!0}),r&&a.Components.Drag.disable(!0),a.on("active",(function(t){var o=t.index,c=window.prcBlocks.carouselBlocks.watched.find((function(t){return t.id===e})).enabled;(0===o&&c||s===o+1)&&n(e,r)})),a.on("intersection:in",(function(t){c(e,r,t)}))}(t,e)}))}))},89:function(e,t){e.exports=window.wp.apiFetch}},[[833,0,24]]]);
//# sourceMappingURL=carousel-controller-7cfe08b9.js.map