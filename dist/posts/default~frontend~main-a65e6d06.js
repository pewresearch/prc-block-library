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
(window.wpackioprcBlocksLibrarypostsJsonp=window.wpackioprcBlocksLibrarypostsJsonp||[]).push([[0],{156:function(e,t,a){},25:function(e,t,a){"use strict";a.d(t,"e",(function(){return r})),a.d(t,"f",(function(){return i})),a.d(t,"a",(function(){return v})),a.d(t,"b",(function(){return m})),a.d(t,"c",(function(){return M})),a.d(t,"d",(function(){return w}));var n=a(36),r=function(e,t,a,r){var l=arguments.length>4&&void 0!==arguments[4]&&arguments[4],c=function(e){var t=n().format("MMM D, YYYY"),a=n(e).format("MMM D, YYYY");return!0===l&&t===a&&(a=n(e).fromNow()),a};return new Promise((function(n){var i=[];fetch("".concat(window.siteURL,"/wp-json/prc-api/v2/blocks/helpers/get-posts/?perPage=").concat(e,"&format=").concat(t,"&program=").concat(a,"&labelTaxonomy=").concat(r)).then((function(e){return e.json()})).then((function(t){for(var a=0;a<e;a++)i.push({id:t[a].id,title:t[a].title,excerpt:t[a].excerpt,date:c(t[a].timestamp,l),link:t[a].link,label:t[a].label,image:t[a].image});n(i)}),(function(e){console.log(e)}))}))},l=a(89),c=a.n(l),i=function(e,t,a){void 0===t&&(t=25);var n=new wp.api.collections[e];return void 0!==a?new Promise((function(e){c()({path:"/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=topic&letter="+a}).then((function(t){console.log(t),e(t)}))})):void 0!==n&&new Promise((function(a){var r={};n.fetch({data:{hide_empty:!1,per_page:t}}).then((function(t){for(var n=0;n<t.length;n++){var l=t[n].slug.replace("".concat(e.toLowerCase(),"_"),"");r[t[n].id]={id:t[n].id,name:t[n].name,slug:l}}a(r)}))}))},s=a(6),o=a(34),u=a.n(o),m=function(e){var t=e.label,a=void 0===t?"Report":t,r=e.date,l=a.replace(/\s+/g,"-").toLowerCase(),c=u()(l,"label"),i=n(r).format("MMM D, YYYY");return React.createElement(s.Fragment,null,React.createElement("span",{className:c},a||"Report")," | ",React.createElement("span",{classNmae:"date"},i))},d=a(292),g=a(12),M=Object(d.a)({labelOptions:[]})((function(e){var t=e.label,a=e.date,n=e.taxonomy,r=e.setAttributes,l=e.setState,c=e.labelOptions;return Object(s.useEffect)((function(){(function(e,t){return new Promise((function(a){i(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(a){var n=e[a];t.push({value:n.name,label:n.name})})),t.sort((function(e,t){return e.label>t.label?1:-1})),a(t)}))}))})(n).then((function(e){return l({labelOptions:e})}))}),[n]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(g.SelectControl,{value:t,options:c,onChange:function(e){r({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(g.TextControl,{value:a,onChange:function(e){r({date:e})}})))})),b=(a(156),a(94)),f=a(49),p=function(e){var t=e.img,a=e.size,n=e.link,r=function(e,t,a){if(""===e||!1===e)return e;var n={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},r={resize:{default:"564,317",small:"354,194",hidpi:"1128,634",smallHidpi:"708,388"}[a]};return"A2"===t?r={resize:{default:"268,151",small:"354,194",hidpi:"536,301",smallHidpi:"708,388"}[a]}:"A3"===t?r={resize:{default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"}[a]}:"A4"===t?r={resize:{default:"268,151",small:"354,194",hidpi:"536,302",smallHidpi:"708,388"}[a]}:"XL"===t&&(r={resize:{default:"720,405",small:"354,194",hidpi:"1440,810",smallHidpi:"708,388"}[a]}),"legacy-260"===t?r={resize:n[260][a]}:"legacy-260-173"===t&&(r={resize:n["260-173"][a]}),Object(f.addQueryArgs)(e,r)},l=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:420;return[{srcSet:"".concat(r(e,t,"default")," 1x, ").concat(r(e,t,"hidpi")," 2x"),media:"(min-width: ".concat(a,"px)")},{srcSet:"".concat(r(e,t,"small")," 1x, ").concat(r(e,t,"smallHidpi")," 2x"),media:"(max-width: ".concat(a,"px)")}]};return React.createElement(s.Fragment,null,""===n&&React.createElement(b.a,{sources:l(t,a)}),""!==n&&React.createElement("a",{href:n},React.createElement(b.a,{sources:l(t,a)})))},j=a(13),N=["image"],E=function(e){var t=e.img,a=e.size,n=e.slot,r=e.chartArt,l=e.dataHandler,c=function(e){var t=e.handler,l=e.open;return React.createElement("div",{className:"image-editor-toolbar"},React.createElement("div",null,React.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},React.createElement(g.IconButton,{icon:"upload",label:"Select/Upload New Image",onClick:l}),React.createElement(g.IconButton,{icon:"trash",label:"Remove Image",onClick:function(){t({image:"",imageSlot:"disabled"})}}),React.createElement(s.Fragment,null,null!==r&&React.createElement(g.IconButton,{icon:"art",label:!0===r?"Disable Chart Art":"Enable Chart Art",onClick:function(){t({isChartArt:!r})}})))),null!==n&&React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement(g.SelectControl,{label:"Image Size",value:a,options:[{value:"XL",label:"XL"},{value:"A1",label:"A1"},{value:"A2",label:"A2"},{value:"A3",label:"A3"},{value:"A4",label:"A4"},{value:"legacy-260",label:"Legacy Homepage 260x260"},{value:"legacy-260-173",label:"Legacy Homepage 260x173"}],onChange:function(e){return t({imageSize:e})},style:{marginBottom:"0px",maxWidth:"140px"}})))};return React.createElement(j.MediaUploadCheck,null,React.createElement(j.MediaUpload,{onSelect:function(e){l("disabled"===n?{image:e.url,imageSlot:"default"}:{image:e.url})},allowedTypes:N,render:function(e){var a=e.open;return React.createElement(s.Fragment,null,""!==t&&React.createElement(c,{handler:l,open:a}),""===t&&React.createElement("p",null,React.createElement(g.Button,{isPrimary:!0,onClick:a},"Insert Image")))}}))},y=function(e){var t,a,n,r,l,c,i=e.img,s=e.link,o=e.size,m=e.slot,d=e.chartArt,g=e.dataHandler;return React.createElement("div",{className:(t=!1,a=!1,n=!1,r=!1,l=!1,c=!1,!1!==m&&("XL"===o?a=!0:"A1"===o?n=!0:"A2"===o?r=!0:"A3"===o?l=!0:"A4"===o?c=!0:"left"!==m&&"right"!==m||(t=!0)),u()({ui:!0,XL:a,A1:n,A2:r,A3:l,A4:c,medium:t,image:!0,bordered:d}))},React.createElement(p,{img:i,size:o,link:!1!==g?"":s}),!1!==g&&React.createElement(E,{img:i,slot:m,size:o,chartArt:d,dataHandler:g}))};y.defaultProps={img:"",link:"",size:"A1",slot:!1,chartArt:!1,dataHandler:!1};var v=y,L=a(291),I=function(e){var t=e.content,a=e.sansSerif,n=e.enabled,r=e.setAttributes;if(!0!==n)return React.createElement(s.Fragment,null);var l=u()("description",{"sans-serif":a});return React.createElement(s.Fragment,null,!1!==r&&React.createElement(j.RichText,{tagName:"div",value:t,onChange:function(e){return r({excerpt:e})},placeholder:t,multiline:"p",className:l}),!1===r&&React.createElement(j.RichText.Content,{tagName:"div",value:t,className:l}))},x=function(e){var t=e.content,a=e.breakingNews,n=e.enabled,r=e.setAttributes;return!0!==n?React.createElement(s.Fragment,null):React.createElement(s.Fragment,null,!1!==r&&React.createElement(j.RichText,{tagName:"ul",value:t,onChange:function(e){return r({extra:e})},placeholder:t,multiline:"li",className:"extra"}),!1===r&&React.createElement(j.RichText.Content,{tagName:"ul",value:t,className:"extra"}),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))},R=function(e){var t=e.title,a=e.link,n=e.as,r=void 0===n?"a":n;return React.createElement(j.RichText.Content,{href:a,tagName:r,value:t})},h=function(e){var t=e.title,a=e.label,n=e.date,r=e.link,l=e.size,c=e.enabled,i=e.taxonomy,o=e.setAttributes;if(!0!==c)return React.createElement(s.Fragment,null);var u=l;return React.createElement(s.Fragment,null,React.createElement(L.a.Meta,null,!1!==o&&React.createElement(M,{date:n,label:a,taxonomy:i,setAttributes:o}),!1===o&&React.createElement(m,{label:a,date:n})),React.createElement(L.a.Header,{className:l},!1!==o&&React.createElement(s.Fragment,null,React.createElement(j.BlockControls,null,React.createElement(g.Toolbar,{controls:["small","normal","large"].map((function(e){var t=!1;return e===u&&(t=!0),{icon:"editor-textcolor",title:"Size: ".concat(e),isActive:t,onClick:function(){o({headerSize:e})}}}))})),React.createElement(j.RichText,{tagName:"div",value:t,onChange:function(e){return o({title:e})},placeholder:"Title",multiline:"br"})),!1===o&&React.createElement(R,{title:t,link:r,as:"a",size:l})))},w=(a(277),function(e){void 0!==e.isSelected&&!0===e.isSelected||(e.setAttributes=!1),e.attributes.taxonomy="Formats",!0===e.attributes.enableProgramsTaxonomy&&(e.attributes.taxonomy="Programs");var t=!0;"left"!==e.attributes.imageSlot&&"right"!==e.attributes.imageSlot||(t=!1);var a=!1;!0===e.attributes.emphasis&&(a=!0),e.attributes.classes=u()(e.attributes.className,"story-item",{stacked:t,bordered:a});var n=e.attributes;return n.setAttributes=e.setAttributes,React.createElement(L.a,{as:"article",className:n.classes},("top"===n.imageSlot||"left"===n.imageSlot)&&React.createElement(v,{img:n.image,size:n.imageSize,link:n.link,slot:n.imageSlot,chartArt:n.isChartArt,dataHandler:n.setAttributes}),React.createElement(L.a.Content,null,React.createElement(h,{title:n.title,date:n.date,label:n.label,link:n.link,setAttributes:n.setAttributes,enabled:n.enableHeader,size:n.headerSize,taxonomy:n.taxonomy}),"default"===n.imageSlot&&React.createElement(v,{img:n.image,size:n.imageSize,link:n.link,slot:n.imageSlot,chartArt:n.isChartArt,dataHandler:n.setAttributes}),React.createElement(I,{content:n.excerpt,enabled:n.enableExcerpt,setAttributes:n.setAttributes,sansSerif:!n.enableHeader}),React.createElement(x,{enabled:n.enableExtra,content:n.extra,setAttributes:n.setAttributes,breakingNews:n.enableBreakingNews})),("bottom"===n.imageSlot||"right"===n.imageSlot)&&React.createElement(v,{img:n.image,size:n.imageSize,link:n.link,slot:n.imageSlot,chartArt:n.isChartArt,dataHandler:n.setAttributes}))});a(278),a(53)},277:function(e,t,a){},278:function(e,t,a){},279:function(e,t,a){},280:function(e,t,a){},37:function(e,t,a){"use strict";var n=a(21),r=a(26),l=a(23),c=a(22),i=a(10),s=a(6),o=a(95);function u(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=Object(i.a)(e);if(t){var r=Object(i.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(c.a)(this,a)}}var m=function(e){Object(l.a)(a,e);var t=u(a);function a(e){return Object(n.a)(this,a),t.call(this,e)}return Object(r.a)(a,[{key:"posts",value:function(e){var t=e.data,a=e.disableLink,n=e.size;return React.createElement(o.a,{relaxed:"very",link:!0,divided:!0,size:n},!1!==t&&t.map((function(e,t){return!0===a?React.createElement(o.a.Item,null,React.createElement("span",{className:"meta"},e.date),React.createElement(s.RawHTML,null,e.title)):React.createElement(o.a.Item,null,React.createElement("span",{className:"meta"},e.date),React.createElement("a",{href:e.link},React.createElement(s.RawHTML,null,e.title)))})))}},{key:"render",value:function(){var e=this.posts,t="medium";return"large"===this.props.size&&(t="large"),React.createElement(s.Fragment,null,React.createElement(e,{data:this.props.posts,disableLink:this.props.disableLink,size:t}))}}]),a}(s.Component);t.a=m},51:function(e,t,a){"use strict";var n=a(21),r=a(11),l=a(23),c=a(22),i=a(10),s=a(24),o=(a(280),a(6)),u=a(96),m=a(25);function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=Object(i.a)(e);if(t){var r=Object(i.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(c.a)(this,a)}}var g=function(e){Object(l.a)(a,e);var t=d(a);function a(e){var l;return Object(n.a)(this,a),l=t.call(this,e),Object(s.a)(Object(r.a)(l),"render",(function(){var e=l.props.posts;return React.createElement("div",{style:{marginBottom:"2rem"}},React.createElement("div",{className:"ui sub header",style:{marginBottom:"1rem"}},l.props.title),React.createElement(u.a,{divided:!0,padded:!0,stackable:!0,columns:"equal",style:{backgroundColor:l.props.backgroundColor}},React.createElement(u.a.Row,null,!1!==e&&e.map((function(e,t){var a={attributes:{title:e.title,image:e.image,excerpt:e.excerpt,link:e.link,label:e.label,date:e.date,extra:"",postID:e.id,emphasis:!1,isChartArt:!1,imageSlot:"top",imageSize:"legacy-260",horizontal:!1,stacked:!0,enableHeader:!0,enableExcerpt:!1,enableExtra:!1,enableProgramsTaxonomy:!1,headerSize:"small",classNames:"is-style-top"}};return React.createElement(u.a.Column,null,React.createElement(m.d,a))})))))})),l.state={defaultOptions:{emphasis:!1,enableHeader:!0,enableExcerpt:!0,headerSize:"small"}},l}return a}(o.Component);t.a=g},52:function(e,t,a){"use strict";var n=a(21),r=a(26),l=a(11),c=a(23),i=a(22),s=a(10),o=(a(279),a(6)),u=a(49),m=a(37);a(0);function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=Object(s.a)(e);if(t){var r=Object(s.a)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return Object(i.a)(this,a)}}var g=function(e){Object(c.a)(a,e);var t=d(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).svgHeader=r.svgHeader.bind(Object(l.a)(r)),r}return Object(r.a)(a,[{key:"svgHeader",value:function(e){var t=e.svg,a=e.width,n=e.link,r=a/5;return React.createElement("a",{href:n},React.createElement("img",{style:{margin:"auto",display:"block"},src:t,width:a+"px",height:r+"px"}))}},{key:"render",value:function(){var e=this.svgHeader;this.props.size="large";var t="https://www.pewresearch.org/fact-tank";if(1!==window.siteID){var a={formats:"fact-tank",programs:this.props.programSlug};t=Object(u.addQueryArgs)("https://www.pewresearch.org/publications/",a)}return React.createElement("div",{id:"js-fact-tank-widget",style:{marginBottom:"35px"}},React.createElement(e,{svg:"data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjUgNDAiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZWE5ZTJjO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDo0LjcycHg7fS5jbHMtMntmaWxsOiNkZGQ5Yzc7fS5jbHMtM3tmaWxsOiM4MDgxODQ7fS5jbHMtNHtmaWxsOiMyMzFmMjA7fS5jbHMtNXtmaWxsOiNlYTllMmM7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5GYWN0VGFuay1sb2dvczwvdGl0bGU+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxODUuMjIgMjAuNjkgMTk0LjE1IDEyLjUyIDIwMy4wMyAyMi40MiAyMTkuNjIgNi42MSIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxOTQuMTUgMTkuMjMgMTk0LjE1IDQwLjA4IDIwMC43IDQwLjA4IDIwMC43IDI2LjQ5IDE5NC4xNSAxOS4yMyIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIyMDIuOTMgMjguNTEgMjAyLjkzIDQwLjA4IDIwOS40OCA0MC4wOCAyMDkuNDggMjIuMjUgMjAyLjkzIDI4LjUxIi8+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjIxMS43MSAyMC4xMiAyMTEuNzEgNDAuMDggMjE4LjI2IDQwLjA4IDIxOC4yNiAxMy44NyAyMTEuNzEgMjAuMTIiLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMTg1LjM3IDI2LjU2IDE4NS4zNyA0MC4wOCAxOTEuOTIgNDAuMDggMTkxLjkyIDIwLjU3IDE4NS4zNyAyNi41NiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTI3Ljg4LDMuODN2Ni4yM0gxNC4zN1YxOS41SDI0Ljc5djYuMjRIMTQuMzdWNDBINi40NlYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTQzLjQ4LDMuODMsNTMuNzgsNDBINDUuNjVsLTEuNzktNy40M0gzMy42NkwzMS45Myw0MEgyNC42MUwzNS40NSwzLjgzWm0tNC43Nyw3Ljc1TDM1LjE4LDI2LjM0aDcuMTZaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNzksMjcuMzFjLS42NSw4LjE5LTUuNDIsMTMuMjMtMTIuNjQsMTMuMjMtOC42OCwwLTEzLjYxLTYuNzgtMTMuNjEtMTguNlM1Ny42MywzLjI4LDY2LjQyLDMuMjhjNC41LDAsNy45MiwxLjc5LDEwLDUuMjcsMS40MiwyLjI3LDIsNC42MSwyLjM0LDguNzNsLTcuMjcuNTRjLS4yMi0zLjE1LS40My00LjM5LTEuMTQtNS42NGE0LjI4LDQuMjgsMCwwLDAtMy45LTIuNDRjLTMuODYsMC01LjQzLDMuNzQtNS40MywxMi44LDAsOC4xOSwxLjU3LDExLjU1LDUuNDMsMTEuNTUsMi44NywwLDQuNS0yLjI4LDUuMDktNy4yN1oiLz48cG9seWdvbiBjbGFzcz0iY2xzLTMiIHBvaW50cz0iOTEuNTEgNDAgOTEuNTEgMy44MyA3OC45NSAzLjgzIDc4Ljk1IDEwLjYxIDg2LjE2IDEwLjYxIDg2LjE2IDQwIDkxLjUxIDQwIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMTIyLDMuODMsMTMyLjI3LDQwaC04LjEzbC0xLjc5LTcuNDNoLTEwLjJMMTEwLjQyLDQwSDEwMy4xTDExMy45NCwzLjgzWm0tNC43Nyw3Ljc1LTMuNTMsMTQuNzZoNy4xNloiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xNDMuODIsMy44MywxNTMsMjYuMjhWMy44M2g2LjE4VjQwaC03LjFsLTExLTI2LjE5VjQwSDEzNVYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTE3MC45NCwzLjgzVjE4LjlsOC43OS0xNS4wN2g4TDE3OC43LDE3LjExLDE4OC41MSw0MGgtOC4xOGwtNi40LTE2LjY1LTMsNC40VjQwSDE2M1YzLjgzWiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtNCIgcG9pbnRzPSI5Mi45MiAzLjgzIDkyLjkyIDQwIDk4LjE3IDQwIDk4LjE3IDEwLjYxIDEwNS41NCAxMC42MSAxMDUuNTQgMy44MyA5Mi45MiAzLjgzIi8+PHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjE4My42NiAxOC45NyAxODYuMTkgMjMuMDcgMTg3LjM5IDIxLjkxIDE4My42NiAxOC45NyIvPjwvc3ZnPg==",width:"200",link:t}),React.createElement("div",{class:"ui segment inverted beige",style:{borderTop:"1px solid #b2b3a5"}},React.createElement("p",{className:"tagline"},"NEWS IN THE NUMBERS"),React.createElement(m.a,this.props),React.createElement("a",{href:t,className:"read-more"},"More From Fact Tank")))}}]),a}(o.Component);t.a=g}}]);
//# sourceMappingURL=default~frontend~main-a65e6d06.js.map