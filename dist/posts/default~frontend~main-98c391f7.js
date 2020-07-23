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
(window.wpackioprcBlocksLibrarypostsJsonp=window.wpackioprcBlocksLibrarypostsJsonp||[]).push([[0],{26:function(e,t,a){"use strict";a.d(t,"b",(function(){return l})),a.d(t,"c",(function(){return i})),a.d(t,"d",(function(){return s})),a.d(t,"a",(function(){return z}));var n=a(37),c=a(43),r=a.n(c),l=function(e,t,a,c){arguments.length>4&&void 0!==arguments[4]&&arguments[4];var r=arguments.length>5&&void 0!==arguments[5]&&arguments[5],l=function(e){var t=n().format("MMM D, YYYY"),a=n(e).format("MMM D, YYYY");return!0===r&&t===a&&(a=n(e).fromNow()),a};return new Promise((function(n){var i=[];fetch("".concat(window.siteURL,"/wp-json/prc-api/v2/blocks/helpers/get-posts/?perPage=").concat(e,"&format=").concat(t,"&program=").concat(a,"&labelTaxonomy=").concat(c)).then((function(e){return e.json()})).then((function(t){for(var a=0;a<e;a++)i.push({id:t[a].id,title:t[a].title,excerpt:t[a].excerpt,date:l(t[a].timestamp,r),link:t[a].link,label:t[a].label,image:t[a].image});n(i)}),(function(e){console.log(e)}))}))},i=function(e,t,a){void 0===t&&(t=25);var n=new wp.api.collections[e];return void 0!==a?new Promise((function(e){r()({path:"/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=topic&letter=".concat(a)}).then((function(t){e(t)}))})):void 0!==n&&new Promise((function(a){var c={};n.fetch({data:{hide_empty:!1,per_page:t}}).then((function(t){for(var n=0;n<t.length;n++){var r=t[n].slug.replace("".concat(e.toLowerCase(),"_"),"");c[t[n].id]={id:t[n].id,name:t[n].name,slug:r}}a(c)}))}))},s=function(e,t){return new Promise((function(a){i(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(a){var n=e[a];t.push({value:n.name,label:n.name})})),t.sort((function(e,t){return e.label>t.label?1:-1})),a(t)}))}))},o=(a(20),a(11)),u=a.n(o),m=a(2),d=a(155),M=a(301),g=a(74),j=a(51),p={default:"564,317",small:"690,388",hidpi:"1128,634",smallHidpi:"1380,776"},f={default:"268,151",small:"690,388",hidpi:"536,301",smallHidpi:"1380,776"},N={default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"},E={default:"268,151",small:"690,388",hidpi:"536,302",smallHidpi:"1380,776"},L={default:"720,405",small:"690,388",hidpi:"1440,810",smallHidpi:"1380,776"},b={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},y=function(e){var t=e.img,a=e.size,n=e.link,c=e.onClick,r=void 0!==c&&c,l=e.placeholder,i=void 0!==l&&l,s=function(e){if(!0===i){return"https://via.placeholder.com/".concat("A2"===a?"536x301":"A3"===a?"388x220":"A4"===a?"536x302":"XL"===a?"1440x810":"1128x634",".png?text=").concat(a)}if(""===t||!1===t)return t;var n={resize:p[e]};return"A2"===a?n={resize:f[e]}:"A3"===a?n={resize:N[e]}:"A4"===a?n={resize:E[e]}:"XL"===a&&(n={resize:L[e]}),"legacy-260"===a?n={resize:b[260][e]}:"legacy-260-173"===a&&(n={resize:b["260-173"][e]}),Object(j.addQueryArgs)(t,n)},o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:767;return[{srcSet:"".concat(s("default")," 1x, ").concat(s("hidpi")," 2x"),media:"(min-width: ".concat(e,"px)")},{srcSet:"".concat(s("small")," 1x, ").concat(s("smallHidpi")," 2x"),media:"(max-width: ".concat(e,"px)")}]};return!1!==r?React.createElement("div",{onClick:r},!0===i&&React.createElement("img",{src:s(),alt:"Click to insert"}),!0!==i&&React.createElement(g.a,{sources:o(),alt:"Click to edit"})):React.createElement(m.Fragment,null,""===n&&React.createElement(g.a,{sources:o()}),""!==n&&React.createElement("a",{href:n},React.createElement(g.a,{sources:o()})))},x=function(e){var t,a,n,c,r,l=e.img,i=e.link,s=e.size,o=e.slot,m=e.chartArt;return React.createElement("div",{className:(t=!1,a=!1,n=!1,c=!1,r=!1,!1!==o&&("XL"===s?t=!0:"A1"===s?a=!0:"A2"===s?n=!0:"A3"===s?c=!0:"A4"===s&&(r=!0)),u()({ui:!0,XL:t,A1:a,A2:n,A3:c,A4:r,image:!0,bordered:m}))},React.createElement(y,{img:l,size:s,link:i}))},w=(a(72),a(10)),I=(a(14),function(e){var t=e.content,a=e.sansSerif;if(!0!==e.enabled)return React.createElement(m.Fragment,null);var n=u()("description",{"sans-serif":a});return React.createElement("div",{className:n},React.createElement(m.RawHTML,null,t))}),v=function(e){var t=e.content,a=e.breakingNews,n=e.enabled;return React.createElement(m.Fragment,null,!0===n&&React.createElement(M.a.Extra,{as:"ul"},React.createElement(m.RawHTML,null,t)),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))},D=function(e){var t=e.label,a=void 0===t?"Report":t,c=e.date,r=a.replace(/\s+/g,"-").toLowerCase(),l=u()(r,"label"),i=n(c).format("MMM D, YYYY");return React.createElement(m.Fragment,null,React.createElement("span",{className:l},a||"Report")," | ",React.createElement("span",{className:"date"},i))},R=a(302),h=(Object(R.a)({labelOptions:[]})((function(e){var t=e.label,a=e.date,n=e.taxonomy,c=e.setAttributes,r=e.setState,l=e.labelOptions;return Object(m.useEffect)((function(){s(n).then((function(e){r({labelOptions:e})}))}),[n]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(w.SelectControl,{value:t,options:l,onChange:function(e){c({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(w.TextControl,{value:a,onChange:function(e){c({date:e})},style:{marginBottom:"0px"},className:"story-label-select"})))})),function(e){var t=e.title,a=e.label,n=e.date,c=e.link,r=e.size,l=e.enabled,i=e.isStyleMobileLoop,s=e.image,o=e.imageSize,d=e.isChartArt,g=e.altHeaderWeight;if(!0!==l)return React.createElement(m.Fragment,null);var j=u()(r,{light:g});return React.createElement(m.Fragment,null,React.createElement(M.a.Meta,null,React.createElement(D,{label:a,date:n})),React.createElement(M.a.Header,{className:j},!0===i&&React.createElement(x,{img:s,size:o,link:c,slot:"left",chartArt:d}),React.createElement("a",{href:c},React.createElement(m.RawHTML,null,t))))}),z=function(e){var t=e.title,a=e.excerpt,n=e.extra,c=e.link,r=e.label,l=e.date,i=e.image,s=e.imageSlot,o=e.imageSize,g=e.isChartArt,j=e.headerSize,p=e.enableEmphasis,f=e.enableHeader,N=e.enableExcerpt,E=e.enableExcerptBelow,L=e.enableExtra,b=e.enableBreakingNews,y=e.className,w=e.inLoop,D=void 0!==w&&w,R=Object(d.a)("(max-width: 767px)"),z=!1;!1===N&&(z=!0);var S=!0;"left"!==s&&"right"!==s||(S=!1);var T=!1;!0===D&&!0===R&&(T=!0),!1===D&&!0===R&&(s="top");var k=u()(y,"story",{stacked:S,bordered:p,"alt-description":E,"is-style-mobile-loop":T}),O=function(){return React.createElement(x,{img:i,size:o,link:c,slot:s,chartArt:g})},C=function(){return"top"!==s&&"left"!==s||!0===D&&!0===R?React.createElement(m.Fragment,null):React.createElement(O,null)},A=function(){return"default"!==s||!0===D&&!0===R?React.createElement(m.Fragment,null):React.createElement(O,null)},H=function(){return"bottom"!==s&&"right"!==s||!0===D&&!0===R?React.createElement(m.Fragment,null):React.createElement(O,null)};return React.createElement(M.a,{as:"article",className:k,onClick:function(){window.location=c}},React.createElement(C,null),React.createElement(M.a.Content,null,React.createElement(h,{enabled:f,title:t,date:l,label:r,link:c,size:j,isStyleMobileLoop:T,image:i,imageSize:o,chartArt:g,altHeaderWeight:z}),React.createElement(A,null),!0!==E&&React.createElement(I,{enabled:N,content:a,sansSerif:!f}),!0===E&&!0===R&&React.createElement(I,{enabled:N,content:a,sansSerif:!f}),React.createElement(v,{enabled:L,content:n,breakingNews:b})),React.createElement(H,null),!0===E&&!1===R&&React.createElement(I,{enabled:N,content:a,sansSerif:!f}))},S=(a(288),a(289),a(55),a(96)),T=a(153);Object(R.a)({termsData:[],excludeData:[],includeData:[]})((function(e){var t=e.termsData,a=e.excludeData,n=e.includeData,c=e.setState,r=e.exclude,l=e.include,s=e.letter,o=e.taxonomy,u=e.setAttributes,d=e.isSelected,M=function(){i(o,100,s).then((function(e){c({termsData:e}),function(e){var t={};if(0!==e.length&&0!==r.length&&(t.excludeData=JSON.parse(r)),0!==e.length&&0===l.length){var a=[];e.map((function(e){a.push({id:e.term_id,name:e.name,slug:e.slug})})),u({include:JSON.stringify(a)}),t.includeData=a}else 0!==e.length&&0!==l.length&&(t.includeData=JSON.parse(l));c(t)}(e)}))};!1!==u&&Object(T.a)((function(){0===t.length&&M()}));var g=0!==l.length&&!1===u&&JSON.parse(l);return React.createElement("div",{className:"ui link list"},!1!==g&&React.createElement(m.Fragment,null,g.map((function(e){return React.createElement("a",{className:"item",href:"/".concat(o.toLowerCase(),"/").concat(e.slug)},e.name)}))),!1!==u&&React.createElement(m.Fragment,null,t.map((function(e){var t=r.includes(e.term_id);return React.createElement("div",{className:"item"},React.createElement(w.CheckboxControl,{label:Object(S.decodeEntities)(e.name),checked:t,onChange:function(t){var c,r,l,i,s,o,m;c=t,r=e.term_id,l=e.name,i=e.slug,o=a,m=n,!0===c?(o.push(r),-1!==(s=m.findIndex((function(e){return e.id===r})))&&m.splice(s,1)):(m.push({id:r,name:l,slug:i}),function(){var e=o.indexOf(r);-1!==e&&o.splice(e,1)}()),u({exclude:JSON.stringify(o),include:JSON.stringify(m)})},"data-termid":e.term_id,"data-term":e.name}),React.createElement("div",{style:{height:"15px",marginTop:"-5px"}},!0===d&&React.createElement("pre",{style:{fontSize:"11px",margin:0}},"(",e.slug,")")))}))))}))},288:function(e,t,a){},289:function(e,t,a){},290:function(e,t,a){},291:function(e,t,a){},38:function(e,t,a){"use strict";var n=a(23),c=a(27),r=a(25),l=a(24),i=a(13),s=a(2),o=a(100);function u(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=Object(i.a)(e);if(t){var c=Object(i.a)(this).constructor;a=Reflect.construct(n,arguments,c)}else a=n.apply(this,arguments);return Object(l.a)(this,a)}}var m=function(e){Object(r.a)(a,e);var t=u(a);function a(e){return Object(n.a)(this,a),t.call(this,e)}return Object(c.a)(a,[{key:"posts",value:function(e){var t=e.data,a=e.disableLink,n=e.size;return React.createElement(o.a,{relaxed:"very",link:!0,divided:!0,size:n},!1!==t&&t.map((function(e,t){return!0===a?React.createElement(o.a.Item,null,React.createElement("span",{className:"meta"},e.date),React.createElement(s.RawHTML,null,e.title)):React.createElement(o.a.Item,null,React.createElement("span",{className:"meta"},e.date),React.createElement("a",{href:e.link},React.createElement(s.RawHTML,null,e.title)))})))}},{key:"render",value:function(){var e=this.posts,t="medium";return"large"===this.props.size&&(t="large"),React.createElement(s.Fragment,null,React.createElement(e,{data:this.props.posts,disableLink:this.props.disableLink,size:t}))}}]),a}(s.Component);t.a=m},53:function(e,t,a){"use strict";a(291);var n=a(101),c=a(26);t.a=function(e){var t=e.posts,a=e.title,r=e.backgroundColor;return React.createElement("div",{style:{marginBottom:"2rem"}},React.createElement("div",{className:"ui sub header",style:{marginBottom:"1rem"}},a),React.createElement(n.a,{divided:!0,padded:!0,stackable:!0,columns:"equal",style:{backgroundColor:r}},React.createElement(n.a.Row,null,!1!==t&&t.map((function(e){var t={title:e.title,image:e.image,excerpt:e.excerpt,link:e.link,label:e.label,date:e.date,extra:"",postID:e.id,emphasis:!1,isChartArt:!1,imageSlot:"top",imageSize:"legacy-260",horizontal:!1,stacked:!0,enableHeader:!0,enableExcerpt:!1,enableEmphasis:!1,enableExtra:!1,enableProgramsTaxonomy:!1,headerSize:"small",classNames:"is-style-top"};return React.createElement(n.a.Column,null,React.createElement(c.a,t))})))))}},54:function(e,t,a){"use strict";var n=a(23),c=a(27),r=a(12),l=a(25),i=a(24),s=a(13),o=(a(290),a(2)),u=a(51),m=a(38);a(0);function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=Object(s.a)(e);if(t){var c=Object(s.a)(this).constructor;a=Reflect.construct(n,arguments,c)}else a=n.apply(this,arguments);return Object(i.a)(this,a)}}var M=function(e){Object(l.a)(a,e);var t=d(a);function a(e){var c;return Object(n.a)(this,a),(c=t.call(this,e)).svgHeader=c.svgHeader.bind(Object(r.a)(c)),c}return Object(c.a)(a,[{key:"svgHeader",value:function(e){var t=e.svg,a=e.width,n=e.link,c=a/5;return React.createElement("a",{href:n},React.createElement("img",{style:{margin:"auto",display:"block"},src:t,width:a+"px",height:c+"px"}))}},{key:"render",value:function(){var e=this.svgHeader;this.props.size="large";var t="https://www.pewresearch.org/fact-tank";if(1!==window.siteID){var a={formats:"fact-tank",programs:this.props.programSlug};t=Object(u.addQueryArgs)("https://www.pewresearch.org/publications/",a)}return React.createElement("div",{id:"js-fact-tank-widget",style:{marginBottom:"35px"}},React.createElement(e,{svg:"data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjUgNDAiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZWE5ZTJjO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDo0LjcycHg7fS5jbHMtMntmaWxsOiNkZGQ5Yzc7fS5jbHMtM3tmaWxsOiM4MDgxODQ7fS5jbHMtNHtmaWxsOiMyMzFmMjA7fS5jbHMtNXtmaWxsOiNlYTllMmM7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5GYWN0VGFuay1sb2dvczwvdGl0bGU+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxODUuMjIgMjAuNjkgMTk0LjE1IDEyLjUyIDIwMy4wMyAyMi40MiAyMTkuNjIgNi42MSIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxOTQuMTUgMTkuMjMgMTk0LjE1IDQwLjA4IDIwMC43IDQwLjA4IDIwMC43IDI2LjQ5IDE5NC4xNSAxOS4yMyIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIyMDIuOTMgMjguNTEgMjAyLjkzIDQwLjA4IDIwOS40OCA0MC4wOCAyMDkuNDggMjIuMjUgMjAyLjkzIDI4LjUxIi8+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjIxMS43MSAyMC4xMiAyMTEuNzEgNDAuMDggMjE4LjI2IDQwLjA4IDIxOC4yNiAxMy44NyAyMTEuNzEgMjAuMTIiLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMTg1LjM3IDI2LjU2IDE4NS4zNyA0MC4wOCAxOTEuOTIgNDAuMDggMTkxLjkyIDIwLjU3IDE4NS4zNyAyNi41NiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTI3Ljg4LDMuODN2Ni4yM0gxNC4zN1YxOS41SDI0Ljc5djYuMjRIMTQuMzdWNDBINi40NlYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTQzLjQ4LDMuODMsNTMuNzgsNDBINDUuNjVsLTEuNzktNy40M0gzMy42NkwzMS45Myw0MEgyNC42MUwzNS40NSwzLjgzWm0tNC43Nyw3Ljc1TDM1LjE4LDI2LjM0aDcuMTZaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNzksMjcuMzFjLS42NSw4LjE5LTUuNDIsMTMuMjMtMTIuNjQsMTMuMjMtOC42OCwwLTEzLjYxLTYuNzgtMTMuNjEtMTguNlM1Ny42MywzLjI4LDY2LjQyLDMuMjhjNC41LDAsNy45MiwxLjc5LDEwLDUuMjcsMS40MiwyLjI3LDIsNC42MSwyLjM0LDguNzNsLTcuMjcuNTRjLS4yMi0zLjE1LS40My00LjM5LTEuMTQtNS42NGE0LjI4LDQuMjgsMCwwLDAtMy45LTIuNDRjLTMuODYsMC01LjQzLDMuNzQtNS40MywxMi44LDAsOC4xOSwxLjU3LDExLjU1LDUuNDMsMTEuNTUsMi44NywwLDQuNS0yLjI4LDUuMDktNy4yN1oiLz48cG9seWdvbiBjbGFzcz0iY2xzLTMiIHBvaW50cz0iOTEuNTEgNDAgOTEuNTEgMy44MyA3OC45NSAzLjgzIDc4Ljk1IDEwLjYxIDg2LjE2IDEwLjYxIDg2LjE2IDQwIDkxLjUxIDQwIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMTIyLDMuODMsMTMyLjI3LDQwaC04LjEzbC0xLjc5LTcuNDNoLTEwLjJMMTEwLjQyLDQwSDEwMy4xTDExMy45NCwzLjgzWm0tNC43Nyw3Ljc1LTMuNTMsMTQuNzZoNy4xNloiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xNDMuODIsMy44MywxNTMsMjYuMjhWMy44M2g2LjE4VjQwaC03LjFsLTExLTI2LjE5VjQwSDEzNVYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTE3MC45NCwzLjgzVjE4LjlsOC43OS0xNS4wN2g4TDE3OC43LDE3LjExLDE4OC41MSw0MGgtOC4xOGwtNi40LTE2LjY1LTMsNC40VjQwSDE2M1YzLjgzWiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtNCIgcG9pbnRzPSI5Mi45MiAzLjgzIDkyLjkyIDQwIDk4LjE3IDQwIDk4LjE3IDEwLjYxIDEwNS41NCAxMC42MSAxMDUuNTQgMy44MyA5Mi45MiAzLjgzIi8+PHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjE4My42NiAxOC45NyAxODYuMTkgMjMuMDcgMTg3LjM5IDIxLjkxIDE4My42NiAxOC45NyIvPjwvc3ZnPg==",width:"200",link:t}),React.createElement("div",{class:"ui segment inverted beige",style:{borderTop:"1px solid #b2b3a5"}},React.createElement("p",{className:"tagline"},"NEWS IN THE NUMBERS"),React.createElement(m.a,this.props),React.createElement("a",{href:t,className:"read-more"},"More From Fact Tank")))}}]),a}(o.Component);t.a=M}}]);
//# sourceMappingURL=default~frontend~main-98c391f7.js.map