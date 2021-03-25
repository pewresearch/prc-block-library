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
(window.wpackioprcBlocksLibrarypostsJsonp=window.wpackioprcBlocksLibrarypostsJsonp||[]).push([[0],{137:function(e,t,a){},138:function(e,t,a){},20:function(e,t,a){"use strict";a.d(t,"c",(function(){return l})),a.d(t,"d",(function(){return i})),a.d(t,"a",(function(){return g})),a.d(t,"b",(function(){return T}));var n=a(41),r=a(63),c=a.n(r),l=function(e,t,a,r){var c=arguments.length>4&&void 0!==arguments[4]&&arguments[4],l=function(e){var t=n().format("MMM D, YYYY"),a=n(e).format("MMM D, YYYY");return!0===c&&t===a&&(a=n(e).fromNow()),a};return new Promise((function(n){var i=[];fetch("".concat(window.siteURL,"/wp-json/prc-api/v2/blocks/helpers/get-posts/?perPage=").concat(e,"&format=").concat(t,"&program=").concat(a,"&labelTaxonomy=").concat(r)).then((function(e){return e.json()})).then((function(t){console.log(t);for(var a=0;a<e;a++)i.push({id:t[a].id,title:t[a].title,excerpt:t[a].excerpt,date:l(t[a].timestamp,c),link:t[a].link,label:t[a].label,image:t[a].image});n(i)}),(function(e){console.log(e)}))}))},i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25;return new Promise((function(a){var n={};c()({path:"/wp/v2/".concat(e,"?per_page=").concat(t)}).then((function(t){for(var r=0;r<t.length;r++){var c=t[r].slug.replace("".concat(e.toLowerCase(),"_"),"");n[t[r].id]={id:t[r].id,name:t[r].name,parent:t[r].parent,slug:c}}a(n)}))}))},s=(a(12),a(10)),o=(a(47),a(8)),u=(a(62),a(4)),m=a(27),M=(a(70),a(113),a(114)),g=function(e){var t=e.url,a=e.onChange,n=e.query,r=void 0===n?{type:"term",subtype:"topic"}:n,c=Object(u.useState)(!1),l=Object(M.a)(c,2),i=l[0],g=l[1];return React.createElement(u.Fragment,null,React.createElement(o.ToolbarButton,{"aria-expanded":i,"aria-haspopup":"true",label:Object(s.__)("Set Link"),icon:"admin-links",onClick:function(){return g(!i)},showTooltip:!0}),!0===i&&React.createElement(o.Popover,{position:"bottom center",onClose:function(){return g(!1)}},React.createElement(m.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",value:{url:t},showInitialSuggestions:!0,suggestionsQuery:r,onChange:function(e){return a(e)},settings:[]})))},d=a(29),j=a.n(d),p=a(112),N=a(153),E=a(91),L=a(64),f={default:"564,317",small:"690,388",hidpi:"1128,634",smallHidpi:"1380,776"},I={default:"268,151",small:"690,388",hidpi:"536,301",smallHidpi:"1380,776"},w={default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"},b={default:"268,151",small:"690,388",hidpi:"536,302",smallHidpi:"1380,776"},y={default:"720,405",small:"690,388",hidpi:"1440,810",smallHidpi:"1380,776"},x={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},R=function(e){var t=e.img,a=e.size,n=e.link,r=e.onClick,c=void 0!==r&&r,l=e.placeholder,i=void 0!==l&&l,s=function(e){if(!0===i){return"https://via.placeholder.com/".concat("A2"===a?"536x301":"A3"===a?"388x220":"A4"===a?"536x302":"XL"===a?"1440x810":"legacy-260"===a?"260x260":"legacy-260-173"===a?"260x173":"1128x634",".png?text=").concat(a)}if(""===t||!1===t)return t;var n={resize:f[e]};return"A2"===a?n={resize:I[e]}:"A3"===a?n={resize:w[e]}:"A4"===a?n={resize:b[e]}:"XL"===a&&(n={resize:y[e]}),"legacy-260"===a?n={resize:x[260][e]}:"legacy-260-173"===a&&(n={resize:x["260-173"][e]}),Object(L.addQueryArgs)(t,n)},o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:767;return[{srcSet:"".concat(s("default")," 1x, ").concat(s("hidpi")," 2x"),media:"(min-width: ".concat(e,"px)")},{srcSet:"".concat(s("small")," 1x, ").concat(s("smallHidpi")," 2x"),media:"(max-width: ".concat(e,"px)")}]};return!1!==c?React.createElement("div",{onClick:c},!0===i&&React.createElement("img",{src:s(),alt:"Click to insert"}),!0!==i&&React.createElement(E.a,{sources:o(),alt:"Click to edit"})):React.createElement(u.Fragment,null,""===n&&React.createElement(E.a,{sources:o()}),""!==n&&React.createElement("a",{href:n},React.createElement(E.a,{sources:o()})))},D=function(e){var t,a,n,r,c,l=e.img,i=e.link,s=e.size,o=e.slot,u=e.chartArt;return React.createElement("div",{className:(t=!1,a=!1,n=!1,r=!1,c=!1,!1!==o&&("XL"===s?t=!0:"A1"===s?a=!0:"A2"===s?n=!0:"A3"===s?r=!0:"A4"===s&&(c=!0)),j()({ui:!0,XL:t,A1:a,A2:n,A3:r,A4:c,image:!0,bordered:u}))},React.createElement(R,{img:l,size:s,link:i}))},z=function(e){var t=e.content,a=e.sansSerif;if(!0!==e.enabled)return React.createElement(u.Fragment,null);var n=j()("description",{"sans-serif":a});return React.createElement("div",{className:n},React.createElement(u.RawHTML,null,t))},v=function(e){var t=e.content,a=e.breakingNews,n=e.enabled;return React.createElement(u.Fragment,null,!0===n&&React.createElement(N.a.Extra,{as:"ul"},React.createElement(u.RawHTML,null,t)),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))},h=function(e){var t=e.label,a=void 0===t?"Report":t,r=e.date,c=a.replace(/\s+/g,"-").toLowerCase(),l=j()(c,"label"),i=n(r).format("MMM D, YYYY");return React.createElement(u.Fragment,null,React.createElement("span",{className:l},a||"Report")," | ",React.createElement("span",{className:"date"},i))},k=function(e){var t=e.title,a=e.label,n=e.date,r=e.link,c=e.size,l=e.enabled,i=e.isStyleMobileLoop,s=e.image,o=e.imageSize,m=e.isChartArt,M=e.altHeaderWeight;if(!0!==l)return React.createElement(u.Fragment,null);var g=j()({large:1===parseInt(c),medium:2===parseInt(c),small:3===parseInt(c),light:M});return React.createElement(u.Fragment,null,React.createElement(N.a.Meta,null,React.createElement(h,{label:a,date:n})),React.createElement(N.a.Header,{className:g},!0===i&&React.createElement(D,{img:s,size:o,link:r,slot:"left",chartArt:m}),React.createElement("a",{href:r},React.createElement(u.RawHTML,null,t))))},T=function(e){var t=e.title,a=e.excerpt,n=e.extra,r=e.link,c=e.label,l=e.date,i=e.image,s=e.imageSlot,o=e.imageSize,m=e.isChartArt,M=e.headerSize,g=e.enableEmphasis,d=e.enableHeader,E=e.enableExcerpt,L=e.enableExcerptBelow,f=e.enableExtra,I=e.enableBreakingNews,w=e.extraContent,b=void 0!==w&&w,y=e.className,x=e.inLoop,R=void 0!==x&&x,h=Object(p.a)("(max-width: 767px)"),T=!1;!1===E&&(T=!0);var S=!0;"left"!==s&&"right"!==s||(S=!1);var C=!1;!0===R&&!0===h&&(C=!0),!1===R&&!0===h&&"disabled"!==s&&(s="top");var A=j()(y,"story",{stacked:S,bordered:g,"alt-description":L,"is-style-mobile-loop":C}),O=function(){return React.createElement(D,{img:i,size:o,link:r,slot:s,chartArt:m,onClick:function(){window.location=r}})},H=function(){return"top"!==s&&"left"!==s||!0===R&&!0===h?React.createElement(u.Fragment,null):React.createElement(O,null)},Y=function(){return"default"!==s||!0===R&&!0===h?React.createElement(u.Fragment,null):React.createElement(O,null)},P=function(){return"bottom"!==s&&"right"!==s||!0===R&&!0===h?React.createElement(u.Fragment,null):React.createElement(O,null)};return React.createElement(N.a,{as:"article",className:A},React.createElement(H,null),React.createElement(N.a.Content,null,React.createElement(k,{enabled:d,title:t,date:l,label:c,link:r,size:M,isStyleMobileLoop:C,image:i,imageSize:o,chartArt:m,altHeaderWeight:T}),React.createElement(Y,null),!0!==L&&React.createElement(z,{enabled:E,content:a,sansSerif:!d}),!0===L&&!0===h&&React.createElement(z,{enabled:E,content:a,sansSerif:!d}),React.createElement(v,{enabled:f,content:n,breakingNews:I}),!1!==b&&React.createElement(u.RawHTML,null,b)),React.createElement(P,null),!0===L&&!1===h&&React.createElement(z,{enabled:E,content:a,sansSerif:!d}))}},43:function(e,t,a){"use strict";var n=a(32),r=a(56),c=a(38),l=a(33),i=a(22),s=a(4),o=a(95);function u(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=Object(i.a)(e);if(t){var r=Object(i.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(l.a)(this,a)}}var m=function(e){Object(c.a)(a,e);var t=u(a);function a(e){return Object(n.a)(this,a),t.call(this,e)}return Object(r.a)(a,[{key:"posts",value:function(e){var t=e.data,a=e.disableLink,n=e.size;return React.createElement(o.a,{relaxed:"very",link:!0,divided:!0,size:n},!1!==t&&t.map((function(e,t){return!0===a?React.createElement(o.a.Item,null,React.createElement("span",{className:"meta"},e.date),React.createElement(s.RawHTML,null,e.title)):React.createElement(o.a.Item,null,React.createElement("span",{className:"meta"},e.date),React.createElement("a",{href:e.link},React.createElement(s.RawHTML,null,e.title)))})))}},{key:"render",value:function(){var e=this.posts,t="medium";return"large"===this.props.size&&(t="large"),React.createElement(s.Fragment,null,React.createElement(e,{data:this.props.posts,disableLink:this.props.disableLink,size:t}))}}]),a}(s.Component);t.a=m},68:function(e,t,a){"use strict";a(138);var n=a(96),r=a(20);t.a=function(e){var t=e.posts,a=e.title,c=e.backgroundColor;return React.createElement("div",{style:{marginBottom:"2rem"}},React.createElement("div",{className:"ui sub header",style:{marginBottom:"1rem"}},a),React.createElement(n.a,{divided:!0,padded:!0,stackable:!0,columns:"equal",style:{backgroundColor:c}},React.createElement(n.a.Row,null,!1!==t&&t.map((function(e){var t={title:e.title,image:e.image,excerpt:e.excerpt,link:e.link,label:e.label,date:e.date,extra:"",postID:e.id,emphasis:!1,isChartArt:!1,imageSlot:"top",imageSize:"legacy-260",horizontal:!1,stacked:!0,enableHeader:!0,enableExcerpt:!1,enableEmphasis:!1,enableExtra:!1,enableProgramsTaxonomy:!1,headerSize:"small",classNames:"is-style-top"};return React.createElement(n.a.Column,null,React.createElement(r.b,t))})))))}},69:function(e,t,a){"use strict";var n=a(32),r=a(56),c=a(17),l=a(38),i=a(33),s=a(22),o=(a(137),a(4)),u=a(64),m=a(43);a(0);function M(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=Object(s.a)(e);if(t){var r=Object(s.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(i.a)(this,a)}}var g=function(e){Object(l.a)(a,e);var t=M(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).svgHeader=r.svgHeader.bind(Object(c.a)(r)),r}return Object(r.a)(a,[{key:"svgHeader",value:function(e){var t=e.svg,a=e.width,n=e.link,r=a/5;return React.createElement("a",{href:n},React.createElement("img",{style:{margin:"auto",display:"block"},src:t,width:a+"px",height:r+"px"}))}},{key:"render",value:function(){var e=this.svgHeader;this.props.size="large";var t="https://www.pewresearch.org/fact-tank";if(1!==window.siteID){var a={formats:"fact-tank",programs:this.props.programSlug};t=Object(u.addQueryArgs)("https://www.pewresearch.org/publications/",a)}return React.createElement("div",{id:"js-fact-tank-widget",style:{marginBottom:"35px"}},React.createElement(e,{svg:"data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjUgNDAiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZWE5ZTJjO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDo0LjcycHg7fS5jbHMtMntmaWxsOiNkZGQ5Yzc7fS5jbHMtM3tmaWxsOiM4MDgxODQ7fS5jbHMtNHtmaWxsOiMyMzFmMjA7fS5jbHMtNXtmaWxsOiNlYTllMmM7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5GYWN0VGFuay1sb2dvczwvdGl0bGU+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxODUuMjIgMjAuNjkgMTk0LjE1IDEyLjUyIDIwMy4wMyAyMi40MiAyMTkuNjIgNi42MSIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxOTQuMTUgMTkuMjMgMTk0LjE1IDQwLjA4IDIwMC43IDQwLjA4IDIwMC43IDI2LjQ5IDE5NC4xNSAxOS4yMyIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIyMDIuOTMgMjguNTEgMjAyLjkzIDQwLjA4IDIwOS40OCA0MC4wOCAyMDkuNDggMjIuMjUgMjAyLjkzIDI4LjUxIi8+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjIxMS43MSAyMC4xMiAyMTEuNzEgNDAuMDggMjE4LjI2IDQwLjA4IDIxOC4yNiAxMy44NyAyMTEuNzEgMjAuMTIiLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMTg1LjM3IDI2LjU2IDE4NS4zNyA0MC4wOCAxOTEuOTIgNDAuMDggMTkxLjkyIDIwLjU3IDE4NS4zNyAyNi41NiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTI3Ljg4LDMuODN2Ni4yM0gxNC4zN1YxOS41SDI0Ljc5djYuMjRIMTQuMzdWNDBINi40NlYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTQzLjQ4LDMuODMsNTMuNzgsNDBINDUuNjVsLTEuNzktNy40M0gzMy42NkwzMS45Myw0MEgyNC42MUwzNS40NSwzLjgzWm0tNC43Nyw3Ljc1TDM1LjE4LDI2LjM0aDcuMTZaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNzksMjcuMzFjLS42NSw4LjE5LTUuNDIsMTMuMjMtMTIuNjQsMTMuMjMtOC42OCwwLTEzLjYxLTYuNzgtMTMuNjEtMTguNlM1Ny42MywzLjI4LDY2LjQyLDMuMjhjNC41LDAsNy45MiwxLjc5LDEwLDUuMjcsMS40MiwyLjI3LDIsNC42MSwyLjM0LDguNzNsLTcuMjcuNTRjLS4yMi0zLjE1LS40My00LjM5LTEuMTQtNS42NGE0LjI4LDQuMjgsMCwwLDAtMy45LTIuNDRjLTMuODYsMC01LjQzLDMuNzQtNS40MywxMi44LDAsOC4xOSwxLjU3LDExLjU1LDUuNDMsMTEuNTUsMi44NywwLDQuNS0yLjI4LDUuMDktNy4yN1oiLz48cG9seWdvbiBjbGFzcz0iY2xzLTMiIHBvaW50cz0iOTEuNTEgNDAgOTEuNTEgMy44MyA3OC45NSAzLjgzIDc4Ljk1IDEwLjYxIDg2LjE2IDEwLjYxIDg2LjE2IDQwIDkxLjUxIDQwIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMTIyLDMuODMsMTMyLjI3LDQwaC04LjEzbC0xLjc5LTcuNDNoLTEwLjJMMTEwLjQyLDQwSDEwMy4xTDExMy45NCwzLjgzWm0tNC43Nyw3Ljc1LTMuNTMsMTQuNzZoNy4xNloiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xNDMuODIsMy44MywxNTMsMjYuMjhWMy44M2g2LjE4VjQwaC03LjFsLTExLTI2LjE5VjQwSDEzNVYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTE3MC45NCwzLjgzVjE4LjlsOC43OS0xNS4wN2g4TDE3OC43LDE3LjExLDE4OC41MSw0MGgtOC4xOGwtNi40LTE2LjY1LTMsNC40VjQwSDE2M1YzLjgzWiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtNCIgcG9pbnRzPSI5Mi45MiAzLjgzIDkyLjkyIDQwIDk4LjE3IDQwIDk4LjE3IDEwLjYxIDEwNS41NCAxMC42MSAxMDUuNTQgMy44MyA5Mi45MiAzLjgzIi8+PHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjE4My42NiAxOC45NyAxODYuMTkgMjMuMDcgMTg3LjM5IDIxLjkxIDE4My42NiAxOC45NyIvPjwvc3ZnPg==",width:"200",link:t}),React.createElement("div",{class:"ui segment inverted beige",style:{borderTop:"1px solid #b2b3a5"}},React.createElement("p",{className:"tagline"},"NEWS IN THE NUMBERS"),React.createElement(m.a,this.props),React.createElement("a",{href:t,className:"read-more"},"More From Fact Tank")))}}]),a}(o.Component);t.a=g}}]);
//# sourceMappingURL=default~frontend~main-f77344fc.js.map