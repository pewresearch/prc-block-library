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
(window.wpackioprcBlocksLibrarypostsJsonp=window.wpackioprcBlocksLibrarypostsJsonp||[]).push([[2],{0:function(e,t){e.exports=React},15:function(e,t){e.exports=wp.blockEditor},17:function(e,t){e.exports=wp.components},27:function(e,t,a){"use strict";a(32);var n=a(54),r=a.n(n);t.a=function(e,t,a,n){return console.log("format"),console.log(t),console.log("program"),console.log(a),new Promise((function(i,l){var s=[];r()({path:"/prc-api/v2/blocks/helpers/get-posts/?perPage="+e+"&format="+t+"&program="+a+"&labelTaxonomy="+n}).then((function(t){for(var a=0;a<e;a++)s.push({id:t[a].id,title:t[a].title,excerpt:t[a].excerpt,date:t[a].date,link:t[a].link,label:t[a].label,image:t[a].image});i(s)}))}))}},272:function(e,t,a){a(98),e.exports=a(273)},273:function(e,t,a){"use strict";a.r(t);var n=a(11),r=a(18),i=a(12),l=a(13),s=a(7),c=a(14),o=a(16),u=a(3),m=a(27),p=a(29),g=a(45),b=a(46),d=function(e){function t(e){var a;return Object(n.a)(this,t),a=Object(i.a)(this,Object(l.a)(t).call(this,e)),Object(o.a)(Object(s.a)(a),"componentDidMount",(function(){console.log("Dynamic Posts Mounted");var e=a.setState;Object(m.a)(a.props.per_page,a.props.format,a.props.program,"formats").then((function(t){e({posts:t})})),setInterval((function(){Object(m.a)(a.props.per_page,a.props.format,a.props.program,"formats").then((function(t){e({posts:t})}))}),a.state.fetchInterval)})),a.state={posts:!1,fetchInterval:5e4},a.setState=a.setState.bind(Object(s.a)(a)),a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this.props;e.posts=this.state.posts,e.disableLiink=!1;var t=!1;void 0!==this.props.style&&this.props.style.includes("is-style-fact-tank")&&(t=!0);var a=!1;void 0!==this.props.style&&this.props.style.includes("is-style-list")&&(a=!0);var n=!1;return void 0!==this.props.style&&this.props.style.includes("is-style-columns")&&(n=!0),React.createElement(u.Fragment,null,!0===t&&React.createElement(g.a,e),!0===a&&React.createElement(p.a,e),!0===n&&React.createElement(b.a,e))}}]),t}(u.Component);document.addEventListener("DOMContentLoaded",(function(){if(document.querySelector(".js-react-posts-block")){var e=document.querySelectorAll(".js-react-posts-block"),t=!0,a=!1,n=void 0;try{for(var r,i=e[Symbol.iterator]();!(t=(r=i.next()).done);t=!0){var l=r.value;console.log(l);var s={title:l.getAttribute("data-title"),format:l.getAttribute("data-format"),program:l.getAttribute("data-program"),per_page:l.getAttribute("data-number"),backgroundColor:l.getAttribute("data-background"),style:l.getAttribute("data-style")};Object(u.render)(React.createElement(d,s),l)}}catch(e){a=!0,n=e}finally{try{t||null==i.return||i.return()}finally{if(a)throw n}}}}))},29:function(e,t,a){"use strict";var n=a(11),r=a(18),i=a(12),l=a(13),s=a(14),c=a(3),o=a(49),u=function(e){function t(e){return Object(n.a)(this,t),Object(i.a)(this,Object(l.a)(t).call(this,e))}return Object(s.a)(t,e),Object(r.a)(t,[{key:"posts",value:function(e){e.loaded,e.setState,e.clientID;var t=e.data,a=e.disableLink;return React.createElement(o.a,{relaxed:"very",link:!0,divided:!0},!1!==t&&t.map((function(e,t){return!0===a?React.createElement(o.a.Item,null,React.createElement("span",{className:"meta date"},e.date),React.createElement(c.RawHTML,null,e.title)):React.createElement(o.a.Item,null,React.createElement("span",{className:"meta date"},e.date),React.createElement("a",{href:e.link},React.createElement(c.RawHTML,null,e.title)))})))}},{key:"render",value:function(){var e=this.posts;return React.createElement(c.Fragment,null,React.createElement(e,{data:this.props.posts,disableLink:this.props.disableLink}))}}]),t}(c.Component);t.a=u},3:function(e,t){e.exports=wp.element},32:function(e,t){e.exports=moment},37:function(e,t,a){"use strict";t.a=function(e,t){console.log("getting terms for "+e);var a=new wp.api.collections[e];return void 0!==a&&new Promise((function(e,n){var r=[];a.fetch({data:{hide_empty:!1,per_page:25}}).then((function(a){for(var n=0;n<a.length;n++){var i={label:a[n].name};i.value=!0===t?a[n].id:a[n].name,r.push(i)}e(r)}))}))}},44:function(e,t){e.exports=ReactDOM},45:function(e,t,a){"use strict";var n=a(11),r=a(18),i=a(12),l=a(13),s=a(7),c=a(14),o=(a(89),a(3)),u=a(29),m=a(0),p=a.n(m);p.a.createElement("style",null,".fact-tank-logo_svg__cls-2{fill:#ddd9c7}.fact-tank-logo_svg__cls-3{fill:#808184}.fact-tank-logo_svg__cls-4{fill:#231f20}");var g=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(i.a)(this,Object(l.a)(t).call(this,e))).svgHeader=a.svgHeader.bind(Object(s.a)(a)),a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"svgHeader",value:function(e){var t=e.svg,a=e.width,n=a/5;return React.createElement("img",{style:{margin:"auto",display:"block"},src:t,width:a+"px",height:n+"px"})}},{key:"render",value:function(){var e=this.svgHeader,t=window.siteURL+"/fact-tank";return React.createElement("div",{id:"js-fact-tank-widget",style:{marginBottom:"35px"}},React.createElement(e,{svg:"data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjUgNDAiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZWE5ZTJjO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDo0LjcycHg7fS5jbHMtMntmaWxsOiNkZGQ5Yzc7fS5jbHMtM3tmaWxsOiM4MDgxODQ7fS5jbHMtNHtmaWxsOiMyMzFmMjA7fS5jbHMtNXtmaWxsOiNlYTllMmM7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5GYWN0VGFuay1sb2dvczwvdGl0bGU+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxODUuMjIgMjAuNjkgMTk0LjE1IDEyLjUyIDIwMy4wMyAyMi40MiAyMTkuNjIgNi42MSIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxOTQuMTUgMTkuMjMgMTk0LjE1IDQwLjA4IDIwMC43IDQwLjA4IDIwMC43IDI2LjQ5IDE5NC4xNSAxOS4yMyIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIyMDIuOTMgMjguNTEgMjAyLjkzIDQwLjA4IDIwOS40OCA0MC4wOCAyMDkuNDggMjIuMjUgMjAyLjkzIDI4LjUxIi8+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjIxMS43MSAyMC4xMiAyMTEuNzEgNDAuMDggMjE4LjI2IDQwLjA4IDIxOC4yNiAxMy44NyAyMTEuNzEgMjAuMTIiLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMTg1LjM3IDI2LjU2IDE4NS4zNyA0MC4wOCAxOTEuOTIgNDAuMDggMTkxLjkyIDIwLjU3IDE4NS4zNyAyNi41NiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTI3Ljg4LDMuODN2Ni4yM0gxNC4zN1YxOS41SDI0Ljc5djYuMjRIMTQuMzdWNDBINi40NlYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTQzLjQ4LDMuODMsNTMuNzgsNDBINDUuNjVsLTEuNzktNy40M0gzMy42NkwzMS45Myw0MEgyNC42MUwzNS40NSwzLjgzWm0tNC43Nyw3Ljc1TDM1LjE4LDI2LjM0aDcuMTZaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNzksMjcuMzFjLS42NSw4LjE5LTUuNDIsMTMuMjMtMTIuNjQsMTMuMjMtOC42OCwwLTEzLjYxLTYuNzgtMTMuNjEtMTguNlM1Ny42MywzLjI4LDY2LjQyLDMuMjhjNC41LDAsNy45MiwxLjc5LDEwLDUuMjcsMS40MiwyLjI3LDIsNC42MSwyLjM0LDguNzNsLTcuMjcuNTRjLS4yMi0zLjE1LS40My00LjM5LTEuMTQtNS42NGE0LjI4LDQuMjgsMCwwLDAtMy45LTIuNDRjLTMuODYsMC01LjQzLDMuNzQtNS40MywxMi44LDAsOC4xOSwxLjU3LDExLjU1LDUuNDMsMTEuNTUsMi44NywwLDQuNS0yLjI4LDUuMDktNy4yN1oiLz48cG9seWdvbiBjbGFzcz0iY2xzLTMiIHBvaW50cz0iOTEuNTEgNDAgOTEuNTEgMy44MyA3OC45NSAzLjgzIDc4Ljk1IDEwLjYxIDg2LjE2IDEwLjYxIDg2LjE2IDQwIDkxLjUxIDQwIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMTIyLDMuODMsMTMyLjI3LDQwaC04LjEzbC0xLjc5LTcuNDNoLTEwLjJMMTEwLjQyLDQwSDEwMy4xTDExMy45NCwzLjgzWm0tNC43Nyw3Ljc1LTMuNTMsMTQuNzZoNy4xNloiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xNDMuODIsMy44MywxNTMsMjYuMjhWMy44M2g2LjE4VjQwaC03LjFsLTExLTI2LjE5VjQwSDEzNVYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTE3MC45NCwzLjgzVjE4LjlsOC43OS0xNS4wN2g4TDE3OC43LDE3LjExLDE4OC41MSw0MGgtOC4xOGwtNi40LTE2LjY1LTMsNC40VjQwSDE2M1YzLjgzWiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtNCIgcG9pbnRzPSI5Mi45MiAzLjgzIDkyLjkyIDQwIDk4LjE3IDQwIDk4LjE3IDEwLjYxIDEwNS41NCAxMC42MSAxMDUuNTQgMy44MyA5Mi45MiAzLjgzIi8+PHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjE4My42NiAxOC45NyAxODYuMTkgMjMuMDcgMTg3LjM5IDIxLjkxIDE4My42NiAxOC45NyIvPjwvc3ZnPg==",width:"200"}),React.createElement("div",{class:"ui segment inverted beige",style:{borderTop:"1px solid #b2b3a5"}},React.createElement("p",{className:"tagline"},"NEWS IN THE NUMBERS"),React.createElement(u.a,this.props),React.createElement("a",{href:t,className:"read-more"},"More From Fact Tank")))}}]),t}(o.Component);t.a=g},46:function(e,t,a){"use strict";var n=a(11),r=a(12),i=a(13),l=a(7),s=a(14),c=a(16),o=(a(90),a(3)),u=a(279),m=a(18),p=a(15),g=a(17),b=a(56),d=a(32),M=a(26),j=a.n(M),E=a(37),y=a(278),N=["image"],v=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(i.a)(t).call(this,e))).state={open:!1,editLabel:!1,taxonomy:"Formats",labelOptions:[]},a.setState=a.setState.bind(Object(l.a)(a)),a.getLabelOptions=a.getLabelOptions.bind(Object(l.a)(a)),a}return Object(s.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.getLabelOptions()}},{key:"componentDidUpdate",value:function(){this.state.taxonomy!==this.props.taxonomy&&this.getLabelOptions()}},{key:"getLabelOptions",value:function(){var e=this;if(void 0!==wp.api.collections[this.props.taxonomy]){var t=this.setState;Object(E.a)(this.props.taxonomy,!1).then((function(a){var n=a;t({taxonomy:e.props.taxonomy,labelOptions:n})}))}}},{key:"render",value:function(){var e=this;return React.createElement(o.Fragment,null,React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(g.SelectControl,{value:this.props.label,options:this.state.labelOptions,onChange:function(t){e.props.setAttributes({label:t})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(g.TextControl,{value:this.props.date,onChange:function(t){e.props.setAttributes({date:t})}}))))}}]),t}(o.Component),h=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(i.a)(t).call(this,e))).mediaHandler=a.mediaHandler.bind(Object(l.a)(a)),a}return Object(s.a)(t,e),Object(m.a)(t,[{key:"mediaHandler",value:function(e){console.log(e),"disabled"===this.props.slot?this.props.setAttributes({image:e.url,imageID:e.id,imageSlot:"default"}):this.props.setAttributes({image:e.url,imageID:e.id})}},{key:"render",value:function(){var e=this;return React.createElement(p.MediaUploadCheck,null,React.createElement(p.MediaUpload,{onSelect:this.mediaHandler,allowedTypes:N,render:function(t){var a=t.open;return React.createElement(o.Fragment,null,""!==e.props.img&&React.createElement(o.Fragment,null,"default"!==e.props.slot&&"disabled"!==e.props.slot&&React.createElement(p.BlockControls,null,React.createElement(g.Toolbar,{controls:[{icon:"art",title:"Chart Art",isActive:e.props.isChartArt,onClick:function(){e.props.setAttributes({isChartArt:!e.props.isChartArt})}}]})),React.createElement("div",{className:e.props.imgClass},React.createElement("img",{className:"wp-image-"+e.props.id,src:e.props.img,onClick:a}),React.createElement("div",{className:"image-editor-options"},React.createElement("div",null,React.createElement("div",{class:"sans-serif"},React.createElement("i",null,"Click image to open media library")),React.createElement("div",{class:"sans-serif remove-image",onClick:function(){e.props.setAttributes({image:"",imageSlot:"disabled"})}},"Or click here to ",React.createElement("strong",null,"REMOVE IMAGE"))),React.createElement("div",null,React.createElement(g.SelectControl,{label:"Image Size",value:e.props.size,options:[{value:"A1",label:"A1"},{value:"A2",label:"A2"},{value:"A3",label:"A3"},{value:"A4",label:"A4"},{value:"legacy-260",label:"Legacy Homepage 260x260"},{value:"legacy-260-173",label:"Legacy Homepage 260x173"}],onChange:function(t){e.props.setAttributes({imageSize:t})},style:{marginBottom:"0px"}}))))),""===e.props.img&&React.createElement("p",null,React.createElement(g.Button,{isPrimary:!0,onClick:a},"Insert Image")))}}))}}]),t}(o.Component),L=function(e){var t=e.isChartArt,a=e.img,n=e.setAttributes,r=e.link,i=!1;"left"!==a.slot&&"right"!==a.slot||(i=!0);var l=j()({ui:!0,medium:i,image:!0,bordered:t}),s=function(e,t,a,n){if(""===e||!1===e)return e;var r={w:"564px"};return"A2"===a?r={w:"268px"}:"A3"===a?r={w:"194px"}:"A4"===a?r={w:"268px"}:"legacy-260"===a?r={resize:"260,260"}:"legacy-260-173"===a&&(r={resize:"260,173"}),Object(b.addQueryArgs)(e,r)};return React.createElement(o.Fragment,null,void 0!==a&&React.createElement(o.Fragment,null,!1!==n&&React.createElement(o.Fragment,null,React.createElement(h,{id:a.id,slot:a.slot,img:s(a.src,a.slot,a.size),size:a.size,imgClass:l,isChartArt:t,setAttributes:n})),!1===n&&React.createElement("div",{className:l},React.createElement("a",{href:r},React.createElement("img",{className:"wp-image-"+a.id,src:s(a.src,a.slot,a.size)})))))},I=function(e){var t=e.content,a=e.enabled,n=e.setAttributes,r=e.sansSerif,i=j()("description",{"sans-serif":r});return React.createElement(o.Fragment,null,!0===a&&React.createElement(o.Fragment,null,!1!==n&&React.createElement(p.RichText,{tagName:"div",value:t,onChange:function(e){return n({excerpt:e})},placeholder:t,multiline:"p",className:i}),!1===n&&React.createElement(p.RichText.Content,{tagName:"div",value:t,className:i})))},f=function(e){var t=e.enabled,a=e.content,n=e.setAttributes,r=j()("extra");return React.createElement(o.Fragment,null,!1!==n&&!0===t&&React.createElement(p.RichText,{tagName:"ul",value:a,onChange:function(e){return n({extra:e})},placeholder:a,multiline:"li",className:r}),!1===n&&!0===t&&React.createElement(p.RichText.Content,{tagName:"ul",value:a,className:r}))},x=function(e){var t=e.label,a=e.date;void 0===t&&(t="Report");var n=t.replace(/\s+/g,"-").toLowerCase(),r=j()(n,"label");return React.createElement(o.Fragment,null,React.createElement("span",{className:r},t||"Report")," | ",d(a).format("MMM D, YYYY"))},R=function(e){var t=e.title,a=e.link,n=(e.size,e.as),r=void 0===n?"a":n;return React.createElement(p.RichText.Content,{href:a,tagName:r,value:t})},D=function(e){var t=e.title,a=e.label,n=e.date,r=e.link,i=e.enabled,l=e.size,s=e.taxonomy,c=e.setAttributes,u=l;return React.createElement(o.Fragment,null,!0===i&&React.createElement(o.Fragment,null,React.createElement(y.a.Meta,null,!1!==c&&React.createElement(v,{date:n,label:a,taxonomy:s,setAttributes:c}),!1===c&&React.createElement(x,{label:a,date:n})),React.createElement(y.a.Header,{className:l},!1!==c&&React.createElement(o.Fragment,null,React.createElement(p.BlockControls,null,React.createElement(g.Toolbar,{controls:["small","normal","large"].map((function(e){var t=!1;return e===u&&(t=!0),{icon:"editor-textcolor",title:"Size: ".concat(e),isActive:t,onClick:function(){c({headerSize:e})}}}))})),React.createElement(p.RichText,{tagName:"div",value:t,onChange:function(e){return c({title:e})},placeholder:"Title",multiline:"br"})),!1===c&&React.createElement(R,{title:t,link:r,as:"a",size:l}))))},O=function(e){function t(e){var a;return Object(n.a)(this,t),a=Object(r.a)(this,Object(i.a)(t).call(this,e)),Object(c.a)(Object(l.a)(a),"item",(function(e){return React.createElement(y.a,{as:"article",className:e.classes},("top"===e.imageSlot||"left"===e.imageSlot)&&React.createElement(L,{img:{src:e.image,id:e.imageID,slot:e.imageSlot,size:e.imageSize},link:e.link,setAttributes:a.props.setAttributes,isChartArt:e.isChartArt}),React.createElement(y.a.Content,null,React.createElement(D,{title:e.title,date:e.date,label:e.label,link:e.link,setAttributes:a.props.setAttributes,enabled:e.enableHeader,size:e.headerSize,taxonomy:e.taxonomy}),"default"===e.imageSlot&&React.createElement(L,{img:{src:e.image,id:e.imageID,slot:e.imageSlot,size:e.imageSize},link:e.link,setAttributes:a.props.setAttributes,isChartArt:e.isChartArt}),React.createElement(I,{content:e.excerpt,enabled:e.enableExcerpt,setAttributes:a.props.setAttributes,sansSerif:!e.enableHeader}),React.createElement(f,{enabled:e.enableExtra,content:e.extra,setAttributes:a.props.setAttributes})),("bottom"===e.imageSlot||"right"===e.imageSlot)&&React.createElement(L,{img:{src:e.image,id:e.imageID,slot:e.imageSlot,size:e.imageSize},link:e.link,setAttributes:a.props.setAttributes,isChartArt:e.isChartArt}))})),a.item=a.item.bind(Object(l.a)(a)),a}return Object(s.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){console.log(this.props)}},{key:"render",value:function(){void 0!==this.props.isSelected&&!0===this.props.isSelected||(this.props.setAttributes=!1),this.props.attributes.taxonomy="Formats",!0===this.props.attributes.enableProgramsTaxonomy&&(this.props.attributes.taxonomy="Programs");var e=!0;"left"!==this.props.attributes.imageSlot&&"right"!==this.props.attributes.imageSlot||(e=!1);var t=!1;return!0===this.props.attributes.emphasis&&(t=!0),this.props.attributes.classes=j()(this.props.attributes.className,"story-item",{stacked:e,bordered:t}),React.createElement(o.Fragment,null,React.createElement(this.item,this.props.attributes))}}]),t}(o.Component),z=function(e){function t(e){var a;return Object(n.a)(this,t),a=Object(r.a)(this,Object(i.a)(t).call(this,e)),Object(c.a)(Object(l.a)(a),"componentDidMount",(function(){})),Object(c.a)(Object(l.a)(a),"render",(function(){var e=a.props.posts;return React.createElement("div",{style:{marginBottom:"2rem"}},React.createElement("div",{className:"ui sub header",style:{marginBottom:"1rem"}},a.props.title),React.createElement(u.a,{divided:!0,padded:!0,stackable:!0,columns:"equal",style:{backgroundColor:a.props.backgroundColor}},React.createElement(u.a.Row,null,!1!==e&&e.map((function(e,t){var a={attributes:{title:e.title,image:e.image,excerpt:e.excerpt,link:e.link,label:e.label,date:e.date,extra:"",postID:e.id,emphasis:!1,isChartArt:!1,imageSlot:"top",imageSize:"legacy-260",horizontal:!1,stacked:!0,enableHeader:!0,enableExcerpt:!1,enableExtra:!1,enableProgramsTaxonomy:!1,headerSize:"small",classNames:"is-style-top"}};return React.createElement(u.a.Column,null,React.createElement(O,a))})))))})),a.state={defaultOptions:{emphasis:!1,enableHeader:!0,enableExcerpt:!0,headerSize:"small"}},a}return Object(s.a)(t,e),t}(o.Component);t.a=z},54:function(e,t){e.exports=wp.apiFetch},56:function(e,t){e.exports=wp.url},89:function(e,t,a){},90:function(e,t,a){}},[[272,0,1]]]);
//# sourceMappingURL=frontend-5f03f5d7.js.map