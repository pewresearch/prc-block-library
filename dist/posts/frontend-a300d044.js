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
(window.wpackioprcBlocksLibrarypostsJsonp=window.wpackioprcBlocksLibrarypostsJsonp||[]).push([[2],{0:function(e,t){e.exports=React},16:function(e,t){e.exports=wp.blockEditor},17:function(e,t,a){"use strict";var n=a(28),r=function(e,t,a,r){var l=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i=function(e){var t=n().format("MMM D, YYYY"),a=n(e).format("MMM D, YYYY");return!0===l&&t===a&&(a=n(e).fromNow()),a};return new Promise((function(n){var c=[];fetch("".concat(window.siteURL,"/wp-json/prc-api/v2/blocks/helpers/get-posts/?perPage=").concat(e,"&format=").concat(t,"&program=").concat(a,"&labelTaxonomy=").concat(r)).then((function(e){return e.json()})).then((function(t){for(var a=0;a<e;a++)c.push({id:t[a].id,title:t[a].title,excerpt:t[a].excerpt,date:i(t[a].timestamp,l),link:t[a].link,label:t[a].label,image:t[a].image});n(c)}),(function(e){console.log(e)}))}))},l=function(e){var t=new wp.api.collections[e];return void 0!==t&&new Promise((function(a){var n={};t.fetch({data:{hide_empty:!1,per_page:25}}).then((function(t){for(var r=0;r<t.length;r++){var l=t[r].slug.replace("".concat(e.toLowerCase(),"_"),"");n[t[r].id]={id:t[r].id,name:t[r].name,slug:l}}a(n)}))}))},i=a(2),c=a(27),s=a.n(c),o=function(e){var t=e.label,a=void 0===t?"Report":t,r=e.date,l=a.replace(/\s+/g,"-").toLowerCase(),c=s()(l,"label");return React.createElement(i.Fragment,null,React.createElement("span",{className:c},a||"Report")," | ",n(r).format("MMM D, YYYY"))},u=a(287),m=a(8),d=Object(u.a)({labelOptions:[]})((function(e){var t=e.label,a=e.date,n=e.taxonomy,r=e.setAttributes,c=e.setState,s=e.labelOptions;return Object(i.useEffect)((function(){(function(e){return new Promise((function(t){l(e).then((function(e){var a=[];Object.keys(e).forEach((function(t){var n=e[t];a.push({value:n.name,label:n.name})})),a.sort((function(e,t){return e.label>t.label?1:-1})),t(a)}))}))})(n).then((function(e){return c({labelOptions:e})}))}),[n]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(m.SelectControl,{value:t,options:s,onChange:function(e){r({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(m.TextControl,{value:a,onChange:function(e){r({date:e})}})))})),p=(a(73),a(48)),g=a(33),b=function(e){var t=e.img,a=e.size,n=e.link,r=function(e,t,a){if(""===e||!1===e)return e;var n={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},r={resize:{default:"564,317",small:"354,194",hidpi:"1128,634",smallHidpi:"708,388"}[a]};return"A2"===t?r={resize:{default:"268,151",small:"354,194",hidpi:"536,301",smallHidpi:"708,388"}[a]}:"A3"===t?r={resize:{default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"}[a]}:"A4"===t&&(r={resize:{default:"268,151",small:"354,194",hidpi:"536,302",smallHidpi:"708,388"}[a]}),"legacy-260"===t?r={resize:n[260][a]}:"legacy-260-173"===t&&(r={resize:n["260-173"][a]}),Object(g.addQueryArgs)(e,r)},l=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:420;return[{srcSet:"".concat(r(e,t,"default")," 1x, ").concat(r(e,t,"hidpi")," 2x"),media:"(min-width: ".concat(a,"px)")},{srcSet:"".concat(r(e,t,"small")," 1x, ").concat(r(e,t,"smallHidpi")," 2x"),media:"(max-width: ".concat(a,"px)")}]};return React.createElement(i.Fragment,null,""===n&&React.createElement(p.a,{sources:l(t,a)}),""!==n&&React.createElement("a",{href:n},React.createElement(p.a,{sources:l(t,a)})))},M=a(16),j=["image"],f=function(e){var t=e.img,a=e.size,n=e.slot,r=e.chartArt,l=e.dataHandler,c=e.display,s=e.className,o=c,u=function(e){var t=e.handler,l=e.open;return React.createElement("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",backgroundColor:"#f0f2f3"}},React.createElement("div",null,React.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},React.createElement(m.IconButton,{icon:"upload",label:"Select/Upload New Image",onClick:l}),React.createElement(m.IconButton,{icon:"trash",label:"Remove Image",onClick:function(){t({image:"",imageSlot:"disabled"})}}),React.createElement(i.Fragment,null,null!==r&&React.createElement(m.IconButton,{icon:"art",label:!0===r?"Disable Chart Art":"Enable Chart Art",onClick:function(){t({isChartArt:!r})}})))),null!==n&&React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement(m.SelectControl,{label:"Image Size",value:a,options:[{value:"A1",label:"A1"},{value:"A2",label:"A2"},{value:"A3",label:"A3"},{value:"A4",label:"A4"},{value:"legacy-260",label:"Legacy Homepage 260x260"},{value:"legacy-260-173",label:"Legacy Homepage 260x173"}],onChange:function(e){return t({imageSize:e})},style:{marginBottom:"0px"}})))};return React.createElement(M.MediaUploadCheck,null,React.createElement(M.MediaUpload,{onSelect:function(e){l("disabled"===n?{image:e.url,imageSlot:"default"}:{image:e.url})},allowedTypes:j,render:function(e){var n=e.open;return React.createElement(i.Fragment,null,""!==t&&React.createElement(i.Fragment,null,React.createElement("div",{className:s},React.createElement(o,{img:t,size:a,link:""}),React.createElement(u,{handler:l,open:n}))),""===t&&React.createElement("p",null,React.createElement(m.Button,{isPrimary:!0,onClick:n},"Insert Image")))}}))},E=function(e){var t=e.img,a=e.link,n=e.size,r=e.slot,l=e.chartArt,c=e.dataHandler,o=function(){var e=!1;return!1!==r&&("left"!==r&&"right"!==r||(e=!0)),s()({ui:!0,medium:e,image:!0,bordered:l})};return React.createElement(i.Fragment,null,!1===c&&React.createElement("div",{className:o()},React.createElement(b,{img:t,size:n,link:a})),!1!==c&&React.createElement(f,{img:t,slot:r,size:n,chartArt:l,dataHandler:c,display:b,className:o()}))};E.defaultProps={img:"",link:"",size:"A1",slot:!1,chartArt:!1,dataHandler:!1};var N=E;a.d(t,"d",(function(){return r})),a.d(t,"e",(function(){return l})),a.d(t,"a",(function(){return N})),a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return d}))},2:function(e,t){e.exports=wp.element},279:function(e,t,a){a(101),e.exports=a(280)},28:function(e,t){e.exports=moment},280:function(e,t,a){"use strict";a.r(t);var n=a(12),r=a(19),l=a(13),i=a(14),c=a(9),s=a(15),o=a(18),u=a(2),m=a(17),d=a(30),p=a(45),g=a(46),b=function(e){function t(e){var a;return Object(n.a)(this,t),a=Object(l.a)(this,Object(i.a)(t).call(this,e)),Object(o.a)(Object(c.a)(a),"componentDidMount",(function(){var e=Object(c.a)(a).setState;Object(m.d)(a.props.per_page,a.props.formatID,a.props.programID,"formats",!0).then((function(t){e({posts:t})})),setInterval((function(){Object(m.d)(a.props.per_page,a.props.formatID,a.props.programID,"formats",!0).then((function(t){e({posts:t})}))}),a.state.fetchInterval)})),a.state={posts:!1,fetchInterval:5e4},a.setState=a.setState.bind(Object(c.a)(a)),a}return Object(s.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props;e.posts=this.state.posts,e.disableLiink=!1;var t=!1;void 0!==this.props.style&&this.props.style.includes("is-style-fact-tank")&&(t=!0);var a=!1;void 0!==this.props.style&&this.props.style.includes("is-style-list")&&(a=!0);var n=!1;return void 0!==this.props.style&&this.props.style.includes("is-style-columns")&&(n=!0),React.createElement(u.Fragment,null,!0===t&&React.createElement(p.a,e),!0===a&&React.createElement(d.a,e),!0===n&&React.createElement(g.a,e))}}]),t}(u.Component);document.addEventListener("DOMContentLoaded",(function(){if(document.querySelector(".js-react-posts-block")){var e=document.querySelectorAll(".js-react-posts-block"),t=!0,a=!1,n=void 0;try{for(var r,l=e[Symbol.iterator]();!(t=(r=l.next()).done);t=!0){var i=r.value,c={title:i.getAttribute("data-title"),format:i.getAttribute("data-format"),formatID:i.getAttribute("data-format-id"),formatSlug:i.getAttribute("data-format-slug"),program:i.getAttribute("data-program"),programID:i.getAttribute("data-program-id"),programSlug:i.getAttribute("data-program-slug"),per_page:i.getAttribute("data-number"),backgroundColor:i.getAttribute("data-background"),style:i.getAttribute("data-style")};Object(u.render)(React.createElement(b,c),i)}}catch(e){a=!0,n=e}finally{try{t||null==l.return||l.return()}finally{if(a)throw n}}}}))},30:function(e,t,a){"use strict";var n=a(12),r=a(19),l=a(13),i=a(14),c=a(15),s=a(2),o=a(50),u=function(e){function t(e){return Object(n.a)(this,t),Object(l.a)(this,Object(i.a)(t).call(this,e))}return Object(c.a)(t,e),Object(r.a)(t,[{key:"posts",value:function(e){e.loaded,e.setState,e.clientID;var t=e.data,a=e.disableLink;return React.createElement(o.a,{relaxed:"very",link:!0,divided:!0},!1!==t&&t.map((function(e,t){return!0===a?React.createElement(o.a.Item,null,React.createElement("span",{className:"meta"},e.date),React.createElement(s.RawHTML,null,e.title)):React.createElement(o.a.Item,null,React.createElement("span",{className:"meta"},e.date),React.createElement("a",{href:e.link},React.createElement(s.RawHTML,null,e.title)))})))}},{key:"render",value:function(){var e=this.posts;return React.createElement(s.Fragment,null,React.createElement(e,{data:this.props.posts,disableLink:this.props.disableLink}))}}]),t}(s.Component);t.a=u},33:function(e,t){e.exports=wp.url},44:function(e,t){e.exports=ReactDOM},45:function(e,t,a){"use strict";var n=a(12),r=a(19),l=a(13),i=a(14),c=a(9),s=a(15),o=(a(92),a(2)),u=a(33),m=a(30),d=a(0),p=a.n(d);p.a.createElement("style",null,".fact-tank-logo_svg__cls-2{fill:#ddd9c7}.fact-tank-logo_svg__cls-3{fill:#808184}.fact-tank-logo_svg__cls-4{fill:#231f20}");var g=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(l.a)(this,Object(i.a)(t).call(this,e))).svgHeader=a.svgHeader.bind(Object(c.a)(a)),a}return Object(s.a)(t,e),Object(r.a)(t,[{key:"svgHeader",value:function(e){var t=e.svg,a=e.width,n=e.link,r=a/5;return React.createElement("a",{href:n},React.createElement("img",{style:{margin:"auto",display:"block"},src:t,width:a+"px",height:r+"px"}))}},{key:"render",value:function(){var e=this.svgHeader,t="https://www.pewresearch.org/fact-tank";if(1!==window.siteID){var a={formats:"fact-tank",programs:this.props.programSlug};t=Object(u.addQueryArgs)("https://www.pewresearch.org/publications/",a)}return React.createElement("div",{id:"js-fact-tank-widget",style:{marginBottom:"35px"}},React.createElement(e,{svg:"data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjUgNDAiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZWE5ZTJjO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDo0LjcycHg7fS5jbHMtMntmaWxsOiNkZGQ5Yzc7fS5jbHMtM3tmaWxsOiM4MDgxODQ7fS5jbHMtNHtmaWxsOiMyMzFmMjA7fS5jbHMtNXtmaWxsOiNlYTllMmM7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5GYWN0VGFuay1sb2dvczwvdGl0bGU+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxODUuMjIgMjAuNjkgMTk0LjE1IDEyLjUyIDIwMy4wMyAyMi40MiAyMTkuNjIgNi42MSIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxOTQuMTUgMTkuMjMgMTk0LjE1IDQwLjA4IDIwMC43IDQwLjA4IDIwMC43IDI2LjQ5IDE5NC4xNSAxOS4yMyIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIyMDIuOTMgMjguNTEgMjAyLjkzIDQwLjA4IDIwOS40OCA0MC4wOCAyMDkuNDggMjIuMjUgMjAyLjkzIDI4LjUxIi8+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjIxMS43MSAyMC4xMiAyMTEuNzEgNDAuMDggMjE4LjI2IDQwLjA4IDIxOC4yNiAxMy44NyAyMTEuNzEgMjAuMTIiLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMTg1LjM3IDI2LjU2IDE4NS4zNyA0MC4wOCAxOTEuOTIgNDAuMDggMTkxLjkyIDIwLjU3IDE4NS4zNyAyNi41NiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTI3Ljg4LDMuODN2Ni4yM0gxNC4zN1YxOS41SDI0Ljc5djYuMjRIMTQuMzdWNDBINi40NlYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTQzLjQ4LDMuODMsNTMuNzgsNDBINDUuNjVsLTEuNzktNy40M0gzMy42NkwzMS45Myw0MEgyNC42MUwzNS40NSwzLjgzWm0tNC43Nyw3Ljc1TDM1LjE4LDI2LjM0aDcuMTZaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNzksMjcuMzFjLS42NSw4LjE5LTUuNDIsMTMuMjMtMTIuNjQsMTMuMjMtOC42OCwwLTEzLjYxLTYuNzgtMTMuNjEtMTguNlM1Ny42MywzLjI4LDY2LjQyLDMuMjhjNC41LDAsNy45MiwxLjc5LDEwLDUuMjcsMS40MiwyLjI3LDIsNC42MSwyLjM0LDguNzNsLTcuMjcuNTRjLS4yMi0zLjE1LS40My00LjM5LTEuMTQtNS42NGE0LjI4LDQuMjgsMCwwLDAtMy45LTIuNDRjLTMuODYsMC01LjQzLDMuNzQtNS40MywxMi44LDAsOC4xOSwxLjU3LDExLjU1LDUuNDMsMTEuNTUsMi44NywwLDQuNS0yLjI4LDUuMDktNy4yN1oiLz48cG9seWdvbiBjbGFzcz0iY2xzLTMiIHBvaW50cz0iOTEuNTEgNDAgOTEuNTEgMy44MyA3OC45NSAzLjgzIDc4Ljk1IDEwLjYxIDg2LjE2IDEwLjYxIDg2LjE2IDQwIDkxLjUxIDQwIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMTIyLDMuODMsMTMyLjI3LDQwaC04LjEzbC0xLjc5LTcuNDNoLTEwLjJMMTEwLjQyLDQwSDEwMy4xTDExMy45NCwzLjgzWm0tNC43Nyw3Ljc1LTMuNTMsMTQuNzZoNy4xNloiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xNDMuODIsMy44MywxNTMsMjYuMjhWMy44M2g2LjE4VjQwaC03LjFsLTExLTI2LjE5VjQwSDEzNVYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTE3MC45NCwzLjgzVjE4LjlsOC43OS0xNS4wN2g4TDE3OC43LDE3LjExLDE4OC41MSw0MGgtOC4xOGwtNi40LTE2LjY1LTMsNC40VjQwSDE2M1YzLjgzWiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtNCIgcG9pbnRzPSI5Mi45MiAzLjgzIDkyLjkyIDQwIDk4LjE3IDQwIDk4LjE3IDEwLjYxIDEwNS41NCAxMC42MSAxMDUuNTQgMy44MyA5Mi45MiAzLjgzIi8+PHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjE4My42NiAxOC45NyAxODYuMTkgMjMuMDcgMTg3LjM5IDIxLjkxIDE4My42NiAxOC45NyIvPjwvc3ZnPg==",width:"200",link:t}),React.createElement("div",{class:"ui segment inverted beige",style:{borderTop:"1px solid #b2b3a5"}},React.createElement("p",{className:"tagline"},"NEWS IN THE NUMBERS"),React.createElement(m.a,this.props),React.createElement("a",{href:t,className:"read-more"},"More From Fact Tank")))}}]),t}(o.Component);t.a=g},46:function(e,t,a){"use strict";var n=a(12),r=a(13),l=a(14),i=a(9),c=a(15),s=a(18),o=(a(93),a(2)),u=a(286),m=a(19),d=a(16),p=a(8),g=a(27),b=a.n(g),M=a(285),j=a(17),f=function(e){var t=e.content,a=e.enabled,n=e.setAttributes,r=e.sansSerif,l=b()("description",{"sans-serif":r});return React.createElement(o.Fragment,null,!0===a&&React.createElement(o.Fragment,null,!1!==n&&React.createElement(d.RichText,{tagName:"div",value:t,onChange:function(e){return n({excerpt:e})},placeholder:t,multiline:"p",className:l}),!1===n&&React.createElement(d.RichText.Content,{tagName:"div",value:t,className:l})))},E=function(e){var t=e.enabled,a=e.content,n=e.setAttributes,r=b()("extra");return React.createElement(o.Fragment,null,!1!==n&&!0===t&&React.createElement(d.RichText,{tagName:"ul",value:a,onChange:function(e){return n({extra:e})},placeholder:a,multiline:"li",className:r}),!1===n&&!0===t&&React.createElement(d.RichText.Content,{tagName:"ul",value:a,className:r}))},N=function(e){var t=e.title,a=e.label,n=e.date,r=e.link,l=e.enabled,i=e.size,c=e.taxonomy,s=e.setAttributes,u=i;return React.createElement(o.Fragment,null,!0===l&&React.createElement(o.Fragment,null,React.createElement(M.a.Meta,null,!1!==s&&React.createElement(j.c,{date:n,label:a,taxonomy:c,setAttributes:s}),!1===s&&React.createElement(j.b,{label:a,date:n})),React.createElement(M.a.Header,{className:i},!1!==s&&React.createElement(o.Fragment,null,React.createElement(d.BlockControls,null,React.createElement(p.Toolbar,{controls:["small","normal","large"].map((function(e){var t=!1;return e===u&&(t=!0),{icon:"editor-textcolor",title:"Size: ".concat(e),isActive:t,onClick:function(){s({headerSize:e})}}}))})),React.createElement(d.RichText,{tagName:"div",value:t,onChange:function(e){return s({title:e})},placeholder:"Title",multiline:"br"})),!1===s&&React.createElement((function(e){var t=e.title,a=e.link,n=e.as,r=void 0===n?"a":n;return React.createElement(d.RichText.Content,{href:a,tagName:r,value:t})}),{title:t,link:r,as:"a",size:i}))))},y=function(e){function t(e){var a;return Object(n.a)(this,t),a=Object(r.a)(this,Object(l.a)(t).call(this,e)),Object(s.a)(Object(i.a)(a),"item",(function(e){return React.createElement(M.a,{as:"article",className:e.classes},("top"===e.imageSlot||"left"===e.imageSlot)&&React.createElement(j.a,{img:e.image,size:e.imageSize,link:e.link,slot:e.imageSlot,chartArt:e.isChartArt,dataHandler:e.setAttributes}),React.createElement(M.a.Content,null,React.createElement(N,{title:e.title,date:e.date,label:e.label,link:e.link,setAttributes:e.setAttributes,enabled:e.enableHeader,size:e.headerSize,taxonomy:e.taxonomy}),"default"===e.imageSlot&&React.createElement(j.a,{img:e.image,size:e.imageSize,link:e.link,slot:e.imageSlot,chartArt:e.isChartArt,dataHandler:e.setAttributes}),React.createElement(f,{content:e.excerpt,enabled:e.enableExcerpt,setAttributes:e.setAttributes,sansSerif:!e.enableHeader}),React.createElement(E,{enabled:e.enableExtra,content:e.extra,setAttributes:e.setAttributes})),("bottom"===e.imageSlot||"right"===e.imageSlot)&&React.createElement(j.a,{img:e.image,size:e.imageSize,link:e.link,slot:e.imageSlot,chartArt:e.isChartArt,dataHandler:e.setAttributes}))})),a.item=a.item.bind(Object(i.a)(a)),a}return Object(c.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){void 0!==this.props.isSelected&&!0===this.props.isSelected||(this.props.setAttributes=!1),this.props.attributes.taxonomy="Formats",!0===this.props.attributes.enableProgramsTaxonomy&&(this.props.attributes.taxonomy="Programs");var e=!0;"left"!==this.props.attributes.imageSlot&&"right"!==this.props.attributes.imageSlot||(e=!1);var t=!1;!0===this.props.attributes.emphasis&&(t=!0),this.props.attributes.classes=b()(this.props.attributes.className,"story-item",{stacked:e,bordered:t});var a=this.props.attributes;return a.setAttributes=this.props.setAttributes,React.createElement(o.Fragment,null,React.createElement(this.item,a))}}]),t}(o.Component),v=function(e){function t(e){var a;return Object(n.a)(this,t),a=Object(r.a)(this,Object(l.a)(t).call(this,e)),Object(s.a)(Object(i.a)(a),"render",(function(){var e=a.props.posts;return React.createElement("div",{style:{marginBottom:"2rem"}},React.createElement("div",{className:"ui sub header",style:{marginBottom:"1rem"}},a.props.title),React.createElement(u.a,{divided:!0,padded:!0,stackable:!0,columns:"equal",style:{backgroundColor:a.props.backgroundColor}},React.createElement(u.a.Row,null,!1!==e&&e.map((function(e,t){var a={attributes:{title:e.title,image:e.image,excerpt:e.excerpt,link:e.link,label:e.label,date:e.date,extra:"",postID:e.id,emphasis:!1,isChartArt:!1,imageSlot:"top",imageSize:"legacy-260",horizontal:!1,stacked:!0,enableHeader:!0,enableExcerpt:!1,enableExtra:!1,enableProgramsTaxonomy:!1,headerSize:"small",classNames:"is-style-top"}};return React.createElement(u.a.Column,null,React.createElement(y,a))})))))})),a.state={defaultOptions:{emphasis:!1,enableHeader:!0,enableExcerpt:!0,headerSize:"small"}},a}return Object(c.a)(t,e),t}(o.Component);t.a=v},68:function(e,t){e.exports=lodash},73:function(e,t,a){},8:function(e,t){e.exports=wp.components},92:function(e,t,a){},93:function(e,t,a){}},[[279,0,1]]]);
//# sourceMappingURL=frontend-a300d044.js.map