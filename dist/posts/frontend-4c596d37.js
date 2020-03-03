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
(window.wpackioprcBlocksLibrarypostsJsonp=window.wpackioprcBlocksLibrarypostsJsonp||[]).push([[2],{0:function(e,t){e.exports=React},16:function(e,t){e.exports=wp.components},17:function(e,t){e.exports=wp.blockEditor},26:function(e,t,a){"use strict";var r=a(28);t.a=function(e,t,a,n){var l=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i=function(e,t){var a=r().format("MMM D, YYYY"),n=r(e).format("MMM D, YYYY");return!0===t&&a===n&&(n=r(e).fromNow()),n};return new Promise((function(r,s){var c=[];fetch(window.siteURL+"/wp-json/prc-api/v2/blocks/helpers/get-posts/?perPage="+e+"&format="+t+"&program="+a+"&labelTaxonomy="+n).then((function(e){return e.json()})).then((function(t){for(var a=0;a<e;a++)c.push({id:t[a].id,title:t[a].title,excerpt:t[a].excerpt,date:i(t[a].timestamp,l),link:t[a].link,label:t[a].label,image:t[a].image});r(c)}),(function(e){console.log(e)}))}))}},278:function(e,t,a){a(101),e.exports=a(279)},279:function(e,t,a){"use strict";a.r(t);var r=a(10),n=a(18),l=a(11),i=a(12),s=a(7),c=a(13),o=a(14),u=a(3),m=a(26),p=a(30),d=a(47),g=a(46),b=function(e){function t(e){var a;return Object(r.a)(this,t),a=Object(l.a)(this,Object(i.a)(t).call(this,e)),Object(o.a)(Object(s.a)(a),"componentDidMount",(function(){var e=a.setState;Object(m.a)(a.props.per_page,a.props.formatID,a.props.programID,"formats",!0).then((function(t){e({posts:t})})),setInterval((function(){Object(m.a)(a.props.per_page,a.props.formatID,a.props.programID,"formats",!0).then((function(t){e({posts:t})}))}),a.state.fetchInterval)})),a.state={posts:!1,fetchInterval:5e4},a.setState=a.setState.bind(Object(s.a)(a)),a}return Object(c.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this.props;e.posts=this.state.posts,e.disableLiink=!1;var t=!1;void 0!==this.props.style&&this.props.style.includes("is-style-fact-tank")&&(t=!0);var a=!1;void 0!==this.props.style&&this.props.style.includes("is-style-list")&&(a=!0);var r=!1;return void 0!==this.props.style&&this.props.style.includes("is-style-columns")&&(r=!0),React.createElement(u.Fragment,null,!0===t&&React.createElement(d.a,e),!0===a&&React.createElement(p.a,e),!0===r&&React.createElement(g.a,e))}}]),t}(u.Component);document.addEventListener("DOMContentLoaded",(function(){if(document.querySelector(".js-react-posts-block")){var e=document.querySelectorAll(".js-react-posts-block"),t=!0,a=!1,r=void 0;try{for(var n,l=e[Symbol.iterator]();!(t=(n=l.next()).done);t=!0){var i=n.value,s={title:i.getAttribute("data-title"),format:i.getAttribute("data-format"),formatID:i.getAttribute("data-format-id"),formatSlug:i.getAttribute("data-format-slug"),program:i.getAttribute("data-program"),programID:i.getAttribute("data-program-id"),programSlug:i.getAttribute("data-program-slug"),per_page:i.getAttribute("data-number"),backgroundColor:i.getAttribute("data-background"),style:i.getAttribute("data-style")};Object(u.render)(React.createElement(b,s),i)}}catch(e){a=!0,r=e}finally{try{t||null==l.return||l.return()}finally{if(a)throw r}}}}))},28:function(e,t){e.exports=moment},3:function(e,t){e.exports=wp.element},30:function(e,t,a){"use strict";var r=a(10),n=a(18),l=a(11),i=a(12),s=a(13),c=a(3),o=a(51),u=function(e){function t(e){return Object(r.a)(this,t),Object(l.a)(this,Object(i.a)(t).call(this,e))}return Object(s.a)(t,e),Object(n.a)(t,[{key:"posts",value:function(e){e.loaded,e.setState,e.clientID;var t=e.data,a=e.disableLink;return React.createElement(o.a,{relaxed:"very",link:!0,divided:!0},!1!==t&&t.map((function(e,t){return!0===a?React.createElement(o.a.Item,null,React.createElement("span",{className:"meta"},e.date),React.createElement(c.RawHTML,null,e.title)):React.createElement(o.a.Item,null,React.createElement("span",{className:"meta"},e.date),React.createElement("a",{href:e.link},React.createElement(c.RawHTML,null,e.title)))})))}},{key:"render",value:function(){var e=this.posts;return React.createElement(c.Fragment,null,React.createElement(e,{data:this.props.posts,disableLink:this.props.disableLink}))}}]),t}(c.Component);t.a=u},33:function(e,t){e.exports=wp.url},38:function(e,t,a){"use strict";t.a=function(e){console.log("getting terms for "+e);var t=new wp.api.collections[e];return void 0!==t&&new Promise((function(a,r){var n={};t.fetch({data:{hide_empty:!1,per_page:25}}).then((function(t){for(var r=0;r<t.length;r++){var l=t[r].slug.replace(e.toLowerCase()+"_","");n[t[r].id]={id:t[r].id,name:t[r].name,slug:l}}a(n)}))}))}},45:function(e,t){e.exports=ReactDOM},46:function(e,t,a){"use strict";var r=a(10),n=a(11),l=a(12),i=a(7),s=a(13),c=a(14),o=(a(92),a(3)),u=a(285),m=a(18),p=a(17),d=a(16),g=a(28),b=a(27),M=a.n(b),j=(a(26),a(38)),h=(a(93),a(49)),f=a(33),v=["image"],E=function(e){function t(e){var a;return Object(r.a)(this,t),a=Object(n.a)(this,Object(l.a)(t).call(this,e)),Object(c.a)(Object(i.a)(a),"classNames",(function(){var e=!1;void 0!==a.props.slot&&("left"!==a.props.slot&&"right"!==a.props.slot||(e=!0));var t=!1;return void 0!==a.props.chartArt&&(t=a.props.chartArt),M()({ui:!0,medium:e,image:!0,bordered:t})})),Object(c.a)(Object(i.a)(a),"imgMarkup",(function(e){var t=e.img,a=e.size,r=e.link,n=function(e,t,a){if(""===e||!1===e)return e;var r={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},n={resize:{default:"564,317",small:"354,194",hidpi:"1128,634",smallHidpi:"708,388"}[a]};return"A2"===t?n={resize:{default:"268,151",small:"354,194",hidpi:"536,301",smallHidpi:"708,388"}[a]}:"A3"===t?n={resize:{default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"}[a]}:"A4"===t&&(n={resize:{default:"268,151",small:"354,194",hidpi:"536,302",smallHidpi:"708,388"}[a]}),"legacy-260"===t?n={resize:r[260][a]}:"legacy-260-173"===t&&(n={resize:r["260-173"][a]}),Object(f.addQueryArgs)(e,n)},l=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:420;return[{srcSet:n(e,t,"default")+" 1x, "+n(e,t,"hidpi")+" 2x",media:"(min-width: "+a+"px)"},{srcSet:n(e,t,"small")+" 1x, "+n(e,t,"smallHidpi")+" 2x",media:"(max-width: "+a+"px)"}]};return React.createElement(o.Fragment,null,""===r&&React.createElement(h.a,{style:{display:"block"},sources:l(t,a)}),""!==r&&React.createElement("a",{href:r},React.createElement(h.a,{style:{display:"block"},sources:l(t,a)})))})),Object(c.a)(Object(i.a)(a),"editMode",(function(e){var t=e.dataHandler,r=function(e){var t=e.open,r=e.dataHandler;return React.createElement("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",backgroundColor:"#f0f2f3"}},React.createElement("div",null,React.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},React.createElement(d.IconButton,{icon:"upload",label:"Select/Upload New Image",onClick:t}),React.createElement(d.IconButton,{icon:"trash",label:"Remove Image",onClick:function(){r({image:"",imageSlot:"disabled"})}}),React.createElement(o.Fragment,null,void 0!==a.props.chartArt&&React.createElement(d.IconButton,{icon:"art",label:!0===a.props.chartArt?"Disable Chart Art":"Enable Chart Art",onClick:function(){r({isChartArt:!a.props.chartArt})}})))),void 0!==a.props.slot&&React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement(d.SelectControl,{label:"Image Size",value:a.props.size,options:[{value:"A1",label:"A1"},{value:"A2",label:"A2"},{value:"A3",label:"A3"},{value:"A4",label:"A4"},{value:"legacy-260",label:"Legacy Homepage 260x260"},{value:"legacy-260-173",label:"Legacy Homepage 260x173"}],onChange:function(e){return r({imageSize:e})},style:{marginBottom:"0px"}})))},n=a.imgMarkup;return React.createElement(p.MediaUploadCheck,null,React.createElement(p.MediaUpload,{onSelect:function(e){void 0!==a.props.slot&&"disabled"===a.props.slot?t({image:e.url,imageSlot:"default"}):t({image:e.url})},allowedTypes:v,render:function(e){var l=e.open;return React.createElement(o.Fragment,null,""!==a.props.img&&React.createElement(o.Fragment,null,React.createElement("div",{className:a.classNames()},React.createElement(n,{img:a.props.img,size:a.props.size,id:a.props.id,link:""}),React.createElement(r,{dataHandler:t,open:l}))),""===a.props.img&&React.createElement("p",null,React.createElement(d.Button,{isPrimary:!0,onClick:l},"Insert Image")))}}))})),a}return Object(s.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){console.log("Image Component:"),console.log(this.props);var e=this.editMode,t=this.imgMarkup;return React.createElement(o.Fragment,null,(!1===this.props.dataHandler||void 0===this.props.dataHandler)&&React.createElement("div",{className:this.classNames()},React.createElement(t,{img:this.props.img,size:this.props.size,link:this.props.link})),!1!==this.props.dataHandler&&void 0!==this.props.dataHandler&&React.createElement(e,{dataHandler:this.props.dataHandler}))}}]),t}(o.Component),y=a(284),N=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(n.a)(this,Object(l.a)(t).call(this,e))).state={open:!1,editLabel:!1,taxonomy:"Formats",labelOptions:[]},a.setState=a.setState.bind(Object(i.a)(a)),a.getLabelOptions=a.getLabelOptions.bind(Object(i.a)(a)),a}return Object(s.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.getLabelOptions()}},{key:"componentDidUpdate",value:function(){this.state.taxonomy!==this.props.taxonomy&&this.getLabelOptions()}},{key:"getLabelOptions",value:function(){var e=this;if(void 0!==wp.api.collections[this.props.taxonomy]){var t=this.setState;Object(j.a)(this.props.taxonomy).then((function(a){var r=[];for(var n in a)if(a.hasOwnProperty(n)){var l=a[n];r.push({value:l.name,label:l.name})}r.sort((function(e,t){return e.label>t.label?1:-1})),t({taxonomy:e.props.taxonomy,labelOptions:r})}))}}},{key:"render",value:function(){var e=this;return React.createElement(o.Fragment,null,React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(d.SelectControl,{value:this.props.label,options:this.state.labelOptions,onChange:function(t){e.props.setAttributes({label:t})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(d.TextControl,{value:this.props.date,onChange:function(t){e.props.setAttributes({date:t})}}))))}}]),t}(o.Component),I=function(e){var t=e.content,a=e.enabled,r=e.setAttributes,n=e.sansSerif,l=M()("description",{"sans-serif":n});return React.createElement(o.Fragment,null,!0===a&&React.createElement(o.Fragment,null,!1!==r&&React.createElement(p.RichText,{tagName:"div",value:t,onChange:function(e){return r({excerpt:e})},placeholder:t,multiline:"p",className:l}),!1===r&&React.createElement(p.RichText.Content,{tagName:"div",value:t,className:l})))},x=function(e){var t=e.enabled,a=e.content,r=e.setAttributes,n=M()("extra");return React.createElement(o.Fragment,null,!1!==r&&!0===t&&React.createElement(p.RichText,{tagName:"ul",value:a,onChange:function(e){return r({extra:e})},placeholder:a,multiline:"li",className:n}),!1===r&&!0===t&&React.createElement(p.RichText.Content,{tagName:"ul",value:a,className:n}))},L=function(e){var t=e.label,a=e.date;void 0===t&&(t="Report");var r=t.replace(/\s+/g,"-").toLowerCase(),n=M()(r,"label");return React.createElement(o.Fragment,null,React.createElement("span",{className:n},t||"Report")," | ",g(a).format("MMM D, YYYY"))},R=function(e){var t=e.title,a=e.link,r=(e.size,e.as),n=void 0===r?"a":r;return React.createElement(p.RichText.Content,{href:a,tagName:n,value:t})},D=function(e){var t=e.title,a=e.label,r=e.date,n=e.link,l=e.enabled,i=e.size,s=e.taxonomy,c=e.setAttributes,u=i;return React.createElement(o.Fragment,null,!0===l&&React.createElement(o.Fragment,null,React.createElement(y.a.Meta,null,!1!==c&&React.createElement(N,{date:r,label:a,taxonomy:s,setAttributes:c}),!1===c&&React.createElement(L,{label:a,date:r})),React.createElement(y.a.Header,{className:i},!1!==c&&React.createElement(o.Fragment,null,React.createElement(p.BlockControls,null,React.createElement(d.Toolbar,{controls:["small","normal","large"].map((function(e){var t=!1;return e===u&&(t=!0),{icon:"editor-textcolor",title:"Size: ".concat(e),isActive:t,onClick:function(){c({headerSize:e})}}}))})),React.createElement(p.RichText,{tagName:"div",value:t,onChange:function(e){return c({title:e})},placeholder:"Title",multiline:"br"})),!1===c&&React.createElement(R,{title:t,link:n,as:"a",size:i}))))},w=function(e){function t(e){var a;return Object(r.a)(this,t),a=Object(n.a)(this,Object(l.a)(t).call(this,e)),Object(c.a)(Object(i.a)(a),"item",(function(e){return React.createElement(y.a,{as:"article",className:e.classes},("top"===e.imageSlot||"left"===e.imageSlot)&&React.createElement(E,{img:e.image,size:e.imageSize,link:e.link,slot:e.imageSlot,chartArt:e.isChartArt,dataHandler:a.props.setAttributes}),React.createElement(y.a.Content,null,React.createElement(D,{title:e.title,date:e.date,label:e.label,link:e.link,setAttributes:a.props.setAttributes,enabled:e.enableHeader,size:e.headerSize,taxonomy:e.taxonomy}),"default"===e.imageSlot&&React.createElement(E,{img:e.image,size:e.imageSize,link:e.link,slot:e.imageSlot,chartArt:e.isChartArt,dataHandler:a.props.setAttributes}),React.createElement(I,{content:e.excerpt,enabled:e.enableExcerpt,setAttributes:a.props.setAttributes,sansSerif:!e.enableHeader}),React.createElement(x,{enabled:e.enableExtra,content:e.extra,setAttributes:a.props.setAttributes})),("bottom"===e.imageSlot||"right"===e.imageSlot)&&React.createElement(E,{img:e.image,size:e.imageSize,link:e.link,slot:e.imageSlot,chartArt:e.isChartArt,dataHandler:a.props.setAttributes}))})),a.item=a.item.bind(Object(i.a)(a)),a}return Object(s.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){void 0!==this.props.isSelected&&!0===this.props.isSelected||(this.props.setAttributes=!1),this.props.attributes.taxonomy="Formats",!0===this.props.attributes.enableProgramsTaxonomy&&(this.props.attributes.taxonomy="Programs");var e=!0;"left"!==this.props.attributes.imageSlot&&"right"!==this.props.attributes.imageSlot||(e=!1);var t=!1;return!0===this.props.attributes.emphasis&&(t=!0),this.props.attributes.classes=M()(this.props.attributes.className,"story-item",{stacked:e,bordered:t}),React.createElement(o.Fragment,null,React.createElement(this.item,this.props.attributes))}}]),t}(o.Component),O=function(e){function t(e){var a;return Object(r.a)(this,t),a=Object(n.a)(this,Object(l.a)(t).call(this,e)),Object(c.a)(Object(i.a)(a),"render",(function(){var e=a.props.posts;return React.createElement("div",{style:{marginBottom:"2rem"}},React.createElement("div",{className:"ui sub header",style:{marginBottom:"1rem"}},a.props.title),React.createElement(u.a,{divided:!0,padded:!0,stackable:!0,columns:"equal",style:{backgroundColor:a.props.backgroundColor}},React.createElement(u.a.Row,null,!1!==e&&e.map((function(e,t){var a={attributes:{title:e.title,image:e.image,excerpt:e.excerpt,link:e.link,label:e.label,date:e.date,extra:"",postID:e.id,emphasis:!1,isChartArt:!1,imageSlot:"top",imageSize:"legacy-260",horizontal:!1,stacked:!0,enableHeader:!0,enableExcerpt:!1,enableExtra:!1,enableProgramsTaxonomy:!1,headerSize:"small",classNames:"is-style-top"}};return React.createElement(u.a.Column,null,React.createElement(w,a))})))))})),a.state={defaultOptions:{emphasis:!1,enableHeader:!0,enableExcerpt:!0,headerSize:"small"}},a}return Object(s.a)(t,e),t}(o.Component);t.a=O},47:function(e,t,a){"use strict";var r=a(10),n=a(18),l=a(11),i=a(12),s=a(7),c=a(13),o=(a(91),a(3)),u=a(33),m=a(30),p=a(0),d=a.n(p);d.a.createElement("style",null,".fact-tank-logo_svg__cls-2{fill:#ddd9c7}.fact-tank-logo_svg__cls-3{fill:#808184}.fact-tank-logo_svg__cls-4{fill:#231f20}");var g=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(i.a)(t).call(this,e))).svgHeader=a.svgHeader.bind(Object(s.a)(a)),a}return Object(c.a)(t,e),Object(n.a)(t,[{key:"svgHeader",value:function(e){var t=e.svg,a=e.width,r=e.link,n=a/5;return React.createElement("a",{href:r},React.createElement("img",{style:{margin:"auto",display:"block"},src:t,width:a+"px",height:n+"px"}))}},{key:"render",value:function(){var e=this.svgHeader,t="https://www.pewresearch.org/fact-tank";if(1!==window.siteID){var a={formats:"fact-tank",programs:this.props.programSlug};t=Object(u.addQueryArgs)("https://www.pewresearch.org/publications/",a)}return React.createElement("div",{id:"js-fact-tank-widget",style:{marginBottom:"35px"}},React.createElement(e,{svg:"data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjUgNDAiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZWE5ZTJjO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDo0LjcycHg7fS5jbHMtMntmaWxsOiNkZGQ5Yzc7fS5jbHMtM3tmaWxsOiM4MDgxODQ7fS5jbHMtNHtmaWxsOiMyMzFmMjA7fS5jbHMtNXtmaWxsOiNlYTllMmM7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5GYWN0VGFuay1sb2dvczwvdGl0bGU+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxODUuMjIgMjAuNjkgMTk0LjE1IDEyLjUyIDIwMy4wMyAyMi40MiAyMTkuNjIgNi42MSIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxOTQuMTUgMTkuMjMgMTk0LjE1IDQwLjA4IDIwMC43IDQwLjA4IDIwMC43IDI2LjQ5IDE5NC4xNSAxOS4yMyIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIyMDIuOTMgMjguNTEgMjAyLjkzIDQwLjA4IDIwOS40OCA0MC4wOCAyMDkuNDggMjIuMjUgMjAyLjkzIDI4LjUxIi8+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjIxMS43MSAyMC4xMiAyMTEuNzEgNDAuMDggMjE4LjI2IDQwLjA4IDIxOC4yNiAxMy44NyAyMTEuNzEgMjAuMTIiLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMTg1LjM3IDI2LjU2IDE4NS4zNyA0MC4wOCAxOTEuOTIgNDAuMDggMTkxLjkyIDIwLjU3IDE4NS4zNyAyNi41NiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTI3Ljg4LDMuODN2Ni4yM0gxNC4zN1YxOS41SDI0Ljc5djYuMjRIMTQuMzdWNDBINi40NlYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTQzLjQ4LDMuODMsNTMuNzgsNDBINDUuNjVsLTEuNzktNy40M0gzMy42NkwzMS45Myw0MEgyNC42MUwzNS40NSwzLjgzWm0tNC43Nyw3Ljc1TDM1LjE4LDI2LjM0aDcuMTZaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNzksMjcuMzFjLS42NSw4LjE5LTUuNDIsMTMuMjMtMTIuNjQsMTMuMjMtOC42OCwwLTEzLjYxLTYuNzgtMTMuNjEtMTguNlM1Ny42MywzLjI4LDY2LjQyLDMuMjhjNC41LDAsNy45MiwxLjc5LDEwLDUuMjcsMS40MiwyLjI3LDIsNC42MSwyLjM0LDguNzNsLTcuMjcuNTRjLS4yMi0zLjE1LS40My00LjM5LTEuMTQtNS42NGE0LjI4LDQuMjgsMCwwLDAtMy45LTIuNDRjLTMuODYsMC01LjQzLDMuNzQtNS40MywxMi44LDAsOC4xOSwxLjU3LDExLjU1LDUuNDMsMTEuNTUsMi44NywwLDQuNS0yLjI4LDUuMDktNy4yN1oiLz48cG9seWdvbiBjbGFzcz0iY2xzLTMiIHBvaW50cz0iOTEuNTEgNDAgOTEuNTEgMy44MyA3OC45NSAzLjgzIDc4Ljk1IDEwLjYxIDg2LjE2IDEwLjYxIDg2LjE2IDQwIDkxLjUxIDQwIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMTIyLDMuODMsMTMyLjI3LDQwaC04LjEzbC0xLjc5LTcuNDNoLTEwLjJMMTEwLjQyLDQwSDEwMy4xTDExMy45NCwzLjgzWm0tNC43Nyw3Ljc1LTMuNTMsMTQuNzZoNy4xNloiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xNDMuODIsMy44MywxNTMsMjYuMjhWMy44M2g2LjE4VjQwaC03LjFsLTExLTI2LjE5VjQwSDEzNVYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTE3MC45NCwzLjgzVjE4LjlsOC43OS0xNS4wN2g4TDE3OC43LDE3LjExLDE4OC41MSw0MGgtOC4xOGwtNi40LTE2LjY1LTMsNC40VjQwSDE2M1YzLjgzWiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtNCIgcG9pbnRzPSI5Mi45MiAzLjgzIDkyLjkyIDQwIDk4LjE3IDQwIDk4LjE3IDEwLjYxIDEwNS41NCAxMC42MSAxMDUuNTQgMy44MyA5Mi45MiAzLjgzIi8+PHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjE4My42NiAxOC45NyAxODYuMTkgMjMuMDcgMTg3LjM5IDIxLjkxIDE4My42NiAxOC45NyIvPjwvc3ZnPg==",width:"200",link:t}),React.createElement("div",{class:"ui segment inverted beige",style:{borderTop:"1px solid #b2b3a5"}},React.createElement("p",{className:"tagline"},"NEWS IN THE NUMBERS"),React.createElement(m.a,this.props),React.createElement("a",{href:t,className:"read-more"},"More From Fact Tank")))}}]),t}(o.Component);t.a=g},91:function(e,t,a){},92:function(e,t,a){},93:function(e,t,a){}},[[278,0,1]]]);
//# sourceMappingURL=frontend-4c596d37.js.map