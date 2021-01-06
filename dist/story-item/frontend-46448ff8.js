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
(window["wpackioprcBlocksLibrarystory-itemJsonp"]=window["wpackioprcBlocksLibrarystory-itemJsonp"]||[]).push([[2],{0:function(e,t){e.exports=React},1:function(e,t){e.exports=wp.element},101:function(e,t){e.exports=wp.domReady},124:function(e,t,a){a(86),e.exports=a(125)},125:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a(101),l=a.n(n),i=a(58),c=function(){console.log("StoryItemsRender...");var e=document.querySelectorAll(".react-story-item");console.log(e),e.forEach((function(e){var t=function(e){var t={title:"",excerpt:"",extra:"",link:"",label:"",date:"",image:"",imageSlot:"disabled",imageSize:"A3",isChartArt:!1,postID:"",headerSize:2,enableEmphasis:!1,enableHeader:!0,enableAltHeaderWeight:!1,enableExcerpt:!0,enableExcerptBelow:!1,enableExtra:!1,enableBreakingNews:!1,extraContent:!1,className:"",inLoop:!1};t.className=e.getAttribute("data-classname"),t.title=e.querySelector(".title").textContent,e.querySelector(".extra-content")&&(t.extraContent=e.querySelector(".extra-content").innerHTML);var a=e.querySelector(".description");a?t.excerpt=a.innerHTML:t.enableExcerpt=!1,t.link=e.getAttribute("data-link"),t.label=e.getAttribute("data-label"),t.date=e.getAttribute("data-date");var r=e.getAttribute("data-image");return r&&(t.image=r,t.imageSlot=e.getAttribute("data-imageslot"),t.imageSize=e.getAttribute("data-imagesize"),e.getAttribute("data-chartart")&&"true"===e.getAttribute("data-chartart")&&(t.isChartArt=!0)),e.querySelector(".extra")&&(t.extra=e.querySelector(".extra").innerHTML,t.enableExtra=!0),e.getAttribute("data-headersize")&&(t.headerSize=e.getAttribute("data-headersize")),e.getAttribute("data-emphasis")&&("1"!==e.getAttribute("data-emphasis")&&"true"!==e.getAttribute("data-emphasis")||(t.enableEmphasis=!0)),e.getAttribute("data-breakingnews")&&("1"!==e.getAttribute("data-breakingnews")&&"true"!==e.getAttribute("data-breakingnews")||(t.enableBreakingNews=!0)),e.getAttribute("data-inloop")&&("1"!==e.getAttribute("data-inloop")&&"true"!==e.getAttribute("data-inloop")||(t.inLoop=!0)),e.getAttribute("data-excerptbelow")&&("1"!==e.getAttribute("data-excerptbelow")&&"true"!==e.getAttribute("data-excerptbelow")||(t.enableExcerptBelow=!0)),console.log("getProps",t,e),t}(e);Object(r.render)(React.createElement(i.a,t),e),e.classList.add("loaded")}))};l()((function(){c(),jQuery(document).on("facetwp-loaded",(function(){console.log("facetwp loaded"),c()}))}))},20:function(e,t,a){"use strict";a.d(t,"a",(function(){return d})),a.d(t,"b",(function(){return E}));var r=a(1),n=a(37),l=a(41),i={default:"564,317",small:"690,388",hidpi:"1128,634",smallHidpi:"1380,776"},c={default:"268,151",small:"690,388",hidpi:"536,301",smallHidpi:"1380,776"},o={default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"},s={default:"268,151",small:"690,388",hidpi:"536,302",smallHidpi:"1380,776"},m={default:"720,405",small:"690,388",hidpi:"1440,810",smallHidpi:"1380,776"},u={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},d=function(e){var t=e.img,a=e.size,d=e.link,g=e.onClick,p=void 0!==g&&g,b=e.placeholder,E=void 0!==b&&b,f=function(e){if(!0===E){return"https://via.placeholder.com/".concat("A2"===a?"536x301":"A3"===a?"388x220":"A4"===a?"536x302":"XL"===a?"1440x810":"1128x634",".png?text=").concat(a)}if(""===t||!1===t)return t;var r={resize:i[e]};return"A2"===a?r={resize:c[e]}:"A3"===a?r={resize:o[e]}:"A4"===a?r={resize:s[e]}:"XL"===a&&(r={resize:m[e]}),"legacy-260"===a?r={resize:u[260][e]}:"legacy-260-173"===a&&(r={resize:u["260-173"][e]}),Object(l.addQueryArgs)(t,r)},R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:767;return[{srcSet:"".concat(f("default")," 1x, ").concat(f("hidpi")," 2x"),media:"(min-width: ".concat(e,"px)")},{srcSet:"".concat(f("small")," 1x, ").concat(f("smallHidpi")," 2x"),media:"(max-width: ".concat(e,"px)")}]};return!1!==p?React.createElement("div",{onClick:p},!0===E&&React.createElement("img",{src:f(),alt:"Click to insert"}),!0!==E&&React.createElement(n.a,{sources:R(),alt:"Click to edit"})):React.createElement(r.Fragment,null,""===d&&React.createElement(n.a,{sources:R()}),""!==d&&React.createElement("a",{href:d},React.createElement(n.a,{sources:R()})))},g=a(7),p=a.n(g),b=a(23),E=function(e){var t=e.label,a=void 0===t?"Report":t,n=e.date,l=a.replace(/\s+/g,"-").toLowerCase(),i=p()(l,"label"),c=b(n).format("MMM D, YYYY");return React.createElement(r.Fragment,null,React.createElement("span",{className:i},a||"Report")," | ",React.createElement("span",{className:"date"},c))}},23:function(e,t){e.exports=moment},41:function(e,t){e.exports=wp.url},50:function(e,t){e.exports=ReactDOM},58:function(e,t,a){"use strict";var r=a(7),n=a.n(r),l=a(1),i=a(73),c=a(139),o=a(20),s=function(e){var t,a,r,l,i,c=e.img,s=e.link,m=e.size,u=e.slot,d=e.chartArt;return React.createElement("div",{className:(t=!1,a=!1,r=!1,l=!1,i=!1,!1!==u&&("XL"===m?t=!0:"A1"===m?a=!0:"A2"===m?r=!0:"A3"===m?l=!0:"A4"===m&&(i=!0)),n()({ui:!0,XL:t,A1:a,A2:r,A3:l,A4:i,image:!0,bordered:d}))},React.createElement(o.a,{img:c,size:m,link:s}))},m=function(e){var t=e.content,a=e.sansSerif;if(!0!==e.enabled)return React.createElement(l.Fragment,null);var r=n()("description",{"sans-serif":a});return React.createElement("div",{className:r},React.createElement(l.RawHTML,null,t))},u=function(e){var t=e.content,a=e.breakingNews,r=e.enabled;return React.createElement(l.Fragment,null,!0===r&&React.createElement(c.a.Extra,{as:"ul"},React.createElement(l.RawHTML,null,t)),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))},d=o.b,g=function(e){var t=e.title,a=e.label,r=e.date,i=e.link,o=e.size,m=e.enabled,u=e.isStyleMobileLoop,g=e.image,p=e.imageSize,b=e.isChartArt,E=e.altHeaderWeight;if(!0!==m)return React.createElement(l.Fragment,null);console.log(o);var f=n()({large:1===parseInt(o),medium:2===parseInt(o),small:3===parseInt(o),light:E});return console.log("<Header/>",o,f),React.createElement(l.Fragment,null,React.createElement(c.a.Meta,null,React.createElement(d,{label:a,date:r})),React.createElement(c.a.Header,{className:f},!0===u&&React.createElement(s,{img:g,size:p,link:i,slot:"left",chartArt:b}),React.createElement("a",{href:i},React.createElement(l.RawHTML,null,t))))};t.a=function(e){var t=e.title,a=e.excerpt,r=e.extra,o=e.link,d=e.label,p=e.date,b=e.image,E=e.imageSlot,f=e.imageSize,R=e.isChartArt,x=e.headerSize,A=e.enableEmphasis,h=e.enableHeader,w=e.enableExcerpt,k=e.enableExcerptBelow,v=e.enableExtra,S=e.enableBreakingNews,z=e.extraContent,y=void 0!==z&&z,H=e.className,L=e.inLoop,N=void 0!==L&&L,C=Object(i.a)("(max-width: 767px)"),M=!1;!1===w&&(M=!0);var B=!0;"left"!==E&&"right"!==E||(B=!1);var F=!1;!0===N&&!0===C&&(F=!0),!1===N&&!0===C&&"disabled"!==E&&(E="top");var q=n()(H,"story",{stacked:B,bordered:A,"alt-description":k,"is-style-mobile-loop":F}),T=function(){return React.createElement(s,{img:b,size:f,link:o,slot:E,chartArt:R,onClick:function(){window.location=o}})},I=function(){return"top"!==E&&"left"!==E||!0===N&&!0===C?React.createElement(l.Fragment,null):React.createElement(T,null)},j=function(){return"default"!==E||!0===N&&!0===C?React.createElement(l.Fragment,null):React.createElement(T,null)},O=function(){return"bottom"!==E&&"right"!==E||!0===N&&!0===C?React.createElement(l.Fragment,null):React.createElement(T,null)};return React.createElement(c.a,{as:"article",className:q},React.createElement(I,null),React.createElement(c.a.Content,null,React.createElement(g,{enabled:h,title:t,date:p,label:d,link:o,size:x,isStyleMobileLoop:F,image:b,imageSize:f,chartArt:R,altHeaderWeight:M}),React.createElement(j,null),!0!==k&&React.createElement(m,{enabled:w,content:a,sansSerif:!h}),!0===k&&!0===C&&React.createElement(m,{enabled:w,content:a,sansSerif:!h}),React.createElement(u,{enabled:v,content:r,breakingNews:S}),!1!==y&&React.createElement(l.RawHTML,null,y)),React.createElement(O,null),!0===k&&!1===C&&React.createElement(m,{enabled:w,content:a,sansSerif:!h}))}}},[[124,0,1]]]);
//# sourceMappingURL=frontend-46448ff8.js.map