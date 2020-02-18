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
(window.wpackioprcBlocksLibrarypostsJsonp=window.wpackioprcBlocksLibrarypostsJsonp||[]).push([[3],{0:function(e,t){e.exports=React},129:function(e,t){e.exports=wp.blocks},148:function(e,t,a){a(96),e.exports=a(149)},149:function(e,t,a){"use strict";a.r(t);var r=a(11),n=a(12),l=a(13),s=a(7),i=a(14),o=a(16),c=a(35),u=a(129),m=a(15),p=a(17),b=a(3),g=a(27),d=a(38),j=a(29),M=a(46),y=a(47),E=function(e){function t(e){var a;return Object(r.a)(this,t),a=Object(n.a)(this,Object(l.a)(t).call(this,e)),Object(o.a)(Object(s.a)(a),"componentDidMount",(function(){var e=a.setState,t=a.props.setAttributes;Object(d.a)("Formats",!0).then((function(t){e({formats:t})})),Object(d.a)("Programs",!0).then((function(t){var a=t;a.push({value:0,label:"All"}),e({programs:a})})),!1===a.props.attributes.posts&&(Object(g.a)(a.props.attributes.per_page,a.props.attributes.format,a.props.attributes.program,a.props.attributes.taxonomyToDisplay).then((function(e){t({posts:e})})),!0===a.props.className.includes("is-style-fact-tank")&&(t({format:10818955}),Object(g.a)(a.props.attributes.per_page,a.props.attributes.format,10818955,a.props.attributes.taxonomyToDisplay).then((function(e){t({posts:e})}))))})),Object(o.a)(Object(s.a)(a),"insertStoryBlock",(function(e,t,a){console.log("Insert Story Block");var r=window.wp.data.select("core/block-editor").getBlockHierarchyRootClientId(clientID),n=window.wp.data.select("core/block-editor").getBlockOrder(r),l=window.wp.data.select("core/block-editor").getBlock(n[1]);console.log(n[1]),console.log(l),console.log(r);var s=window.wp.blocks.createBlock("prc-block/story-item",{title:t.title,image:t.image,excerpt:t.excerpt,link:t.link,label:t.label,date:t.date,extra:"",postID:t.id,emphasis:!1,isChartArt:!1,imageSlot:"top",horizontal:!1,stacked:!0,enableHeader:!0,enableExcerpt:!1,enableExtra:!1,enableProgramsTaxonomy:!1,headerSize:"normal"});window.wp.data.dispatch("core/block-editor").insertBlocks(s,a,e)})),Object(o.a)(Object(s.a)(a),"render",(function(){var e=a.props.setAttributes;return React.createElement(m.InspectorControls,null,React.createElement(p.PanelBody,{title:Object(c.__)("Posts Block Options")},React.createElement(p.TextControl,{label:"Title",value:a.props.attributes.title,onChange:function(t){return e({title:t})}}),React.createElement(p.TextControl,{label:"Number of Posts",value:Number(a.props.attributes.per_page),onChange:function(t){e({per_page:Number(t)}),Object(g.a)(t,a.props.attributes.format,a.props.attributes.program,a.props.attributes.taxonomyToDisplay).then((function(t){e({posts:t})}))}}),React.createElement(p.SelectControl,{label:"Format",value:a.props.attributes.format,options:a.state.formats,onChange:function(t){e({format:Number(t)}),Object(g.a)(a.props.attributes.per_page,t,a.props.attributes.program,a.props.attributes.taxonomyToDisplay).then((function(t){e({posts:t})}))}}),React.createElement(p.SelectControl,{label:"Research Program",value:a.props.attributes.program,options:a.state.programs,onChange:function(t){e({program:Number(t)}),Object(g.a)(a.props.attributes.per_page,a.props.attributes.format,t,a.props.attributes.taxonomyToDisplay).then((function(t){e({posts:t})}))}}),React.createElement(p.SelectControl,{label:"Label Taxonomy",value:a.props.attributes.taxonomyToDisplay,options:[{label:"Formats",value:"formats"},{label:"Programs",value:"programs"}],onChange:function(t){e({taxonomyToDisplay:t}),Object(g.a)(a.props.attributes.per_page,a.props.attributes.format,a.props.attributes.program,t).then((function(t){e({posts:t})}))}}),React.createElement(p.ToggleControl,{label:"Dynamic Mode",help:a.props.attributes.dynamic?"Updates posts in real time, every 5 minutes.":"Posts are saved statically (will not update in real time).",checked:a.props.attributes.dynamic,onChange:function(){return e({dynamic:!a.props.attributes.dynamic})}}),React.createElement("strong",null,"Background Color:"),React.createElement("br",null),React.createElement(p.ColorPalette,{colors:[{name:"White",color:"#fff"},{name:"Oatmeal",color:"#f8f9f5"}],value:a.props.attributes.backgroundColor,onChange:function(t){return e({backgroundColor:t})}})))})),a.state={formats:!1,programs:!1},a.setState=a.setState.bind(Object(s.a)(a)),a}return Object(i.a)(t,e),t}(b.Component);Object(u.registerBlockType)("prc-block/posts",{title:Object(c.__)("Posts Block"),icon:"align-left",category:"widgets",keywords:[Object(c.__)("prc"),Object(c.__)("fact tank"),Object(c.__)("posts listing"),Object(c.__)("posts"),Object(c.__)("posts widget"),Object(c.__)("publication listing")],styles:[{name:"list",label:"Simple List",isDefault:!0},{name:"fact-tank",label:"Fact Tank"},{name:"columns",label:"Columns"}],supports:{html:!1},attributes:{title:{type:"string",default:"Title"},moreLink:{type:"string",default:""},format:{type:"integer",default:10818957},program:{type:"integer",default:0},per_page:{type:"integer",default:5},backgroundColor:{tyle:"string",default:"#fff"},dynamic:{type:"boolean",default:!1},taxonomyToDisplay:{type:"string",default:"formats"},posts:{type:"array",default:!1}},edit:function(e){var t=e.attributes,a=e.attributes.className,r=!1;void 0!==a&&a.includes("is-style-fact-tank")&&(r=!0);var n=!1;(void 0===a||a.includes("is-style-list"))&&(n=!0);var l=!1;return void 0!==a&&a.includes("is-style-columns")&&(l=!0),t.className=a,!0===e.isSelected&&(t.setAttributes=e.setAttributes),t.clientID=e.clientId,t.disableLink=!0,React.createElement(b.Fragment,null,!0===e.isSelected&&React.createElement(E,e),React.createElement("div",{className:t.className},!0===r&&React.createElement(M.a,t),!0===n&&React.createElement(j.a,t),!0===l&&React.createElement(y.a,t)))},save:function(e){var t=e.attributes,a=e.attributes.className,r=!1;void 0!==a&&a.includes("is-style-fact-tank")&&(r=!0);var n=!1;void 0!==a&&a.includes("is-style-list")&&(n=!0);var l=!1;return void 0!==a&&a.includes("is-style-columns")&&(l=!0),t.className=a,t.disableLink=!1,React.createElement("div",{className:t.className},!0!==e.attributes.dynamic&&!0===r&&React.createElement(M.a,t),!0!==e.attributes.dynamic&&!0===n&&React.createElement(j.a,t),!0!==e.attributes.dynamic&&!0===l&&React.createElement(y.a,t),!0===e.attributes.dynamic&&React.createElement("div",{className:"js-react-posts-block","data-title":e.attributes.title,"data-format":e.attributes.format,"data-program":e.attributes.program,"data-number":e.attributes.per_page,"data-background":e.attributes.backgroundColor,"data-style":a}))}})},15:function(e,t){e.exports=wp.blockEditor},17:function(e,t){e.exports=wp.components},27:function(e,t,a){"use strict";a(32);var r=a(55),n=a.n(r);t.a=function(e,t,a,r){return console.log("format"),console.log(t),console.log("program"),console.log(a),new Promise((function(l,s){var i=[];n()({path:"/prc-api/v2/blocks/helpers/get-posts/?perPage="+e+"&format="+t+"&program="+a+"&labelTaxonomy="+r}).then((function(t){for(var a=0;a<e;a++)i.push({id:t[a].id,title:t[a].title,excerpt:t[a].excerpt,date:t[a].date,link:t[a].link,label:t[a].label,image:t[a].image});l(i)}))}))}},29:function(e,t,a){"use strict";var r=a(11),n=a(18),l=a(12),s=a(13),i=a(14),o=a(3),c=a(50),u=function(e){function t(e){return Object(r.a)(this,t),Object(l.a)(this,Object(s.a)(t).call(this,e))}return Object(i.a)(t,e),Object(n.a)(t,[{key:"posts",value:function(e){e.loaded,e.setState,e.clientID;var t=e.data,a=e.disableLink;return React.createElement(c.a,{relaxed:"very",link:!0,divided:!0},!1!==t&&t.map((function(e,t){return!0===a?React.createElement(c.a.Item,null,React.createElement("span",{className:"meta date"},e.date),React.createElement(o.RawHTML,null,e.title)):React.createElement(c.a.Item,null,React.createElement("span",{className:"meta date"},e.date),React.createElement("a",{href:e.link},React.createElement(o.RawHTML,null,e.title)))})))}},{key:"render",value:function(){var e=this.posts;return React.createElement(o.Fragment,null,React.createElement(e,{data:this.props.posts,disableLink:this.props.disableLink}))}}]),t}(o.Component);t.a=u},3:function(e,t){e.exports=wp.element},32:function(e,t){e.exports=moment},33:function(e,t){e.exports=wp.url},35:function(e,t){e.exports=wp.i18n},38:function(e,t,a){"use strict";t.a=function(e,t){console.log("getting terms for "+e);var a=new wp.api.collections[e];return void 0!==a&&new Promise((function(e,r){var n=[];a.fetch({data:{hide_empty:!1,per_page:25}}).then((function(a){for(var r=0;r<a.length;r++){var l={label:a[r].name};l.value=!0===t?a[r].id:a[r].name,n.push(l)}e(n)}))}))}},45:function(e,t){e.exports=ReactDOM},46:function(e,t,a){"use strict";var r=a(11),n=a(18),l=a(12),s=a(13),i=a(7),o=a(14),c=a(3),u=a(33),m=a(29),p=a(0),b=a.n(p);b.a.createElement("style",null,".fact-tank-logo_svg__cls-2{fill:#ddd9c7}.fact-tank-logo_svg__cls-3{fill:#808184}.fact-tank-logo_svg__cls-4{fill:#231f20}");var g=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(s.a)(t).call(this,e))).svgHeader=a.svgHeader.bind(Object(i.a)(a)),a}return Object(o.a)(t,e),Object(n.a)(t,[{key:"svgHeader",value:function(e){var t=e.svg,a=e.width,r=a/5;return React.createElement("img",{style:{margin:"auto",display:"block"},src:t,width:a+"px",height:r+"px"})}},{key:"render",value:function(){var e=this.svgHeader,t=Object(u.addQueryArgs)(window.siteURL,{format:"fact-tank"});return React.createElement("div",{id:"js-fact-tank-widget"},React.createElement(e,{svg:"data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjUgNDAiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZWE5ZTJjO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDo0LjcycHg7fS5jbHMtMntmaWxsOiNkZGQ5Yzc7fS5jbHMtM3tmaWxsOiM4MDgxODQ7fS5jbHMtNHtmaWxsOiMyMzFmMjA7fS5jbHMtNXtmaWxsOiNlYTllMmM7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5GYWN0VGFuay1sb2dvczwvdGl0bGU+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxODUuMjIgMjAuNjkgMTk0LjE1IDEyLjUyIDIwMy4wMyAyMi40MiAyMTkuNjIgNi42MSIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxOTQuMTUgMTkuMjMgMTk0LjE1IDQwLjA4IDIwMC43IDQwLjA4IDIwMC43IDI2LjQ5IDE5NC4xNSAxOS4yMyIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIyMDIuOTMgMjguNTEgMjAyLjkzIDQwLjA4IDIwOS40OCA0MC4wOCAyMDkuNDggMjIuMjUgMjAyLjkzIDI4LjUxIi8+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjIxMS43MSAyMC4xMiAyMTEuNzEgNDAuMDggMjE4LjI2IDQwLjA4IDIxOC4yNiAxMy44NyAyMTEuNzEgMjAuMTIiLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMTg1LjM3IDI2LjU2IDE4NS4zNyA0MC4wOCAxOTEuOTIgNDAuMDggMTkxLjkyIDIwLjU3IDE4NS4zNyAyNi41NiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTI3Ljg4LDMuODN2Ni4yM0gxNC4zN1YxOS41SDI0Ljc5djYuMjRIMTQuMzdWNDBINi40NlYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTQzLjQ4LDMuODMsNTMuNzgsNDBINDUuNjVsLTEuNzktNy40M0gzMy42NkwzMS45Myw0MEgyNC42MUwzNS40NSwzLjgzWm0tNC43Nyw3Ljc1TDM1LjE4LDI2LjM0aDcuMTZaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNzksMjcuMzFjLS42NSw4LjE5LTUuNDIsMTMuMjMtMTIuNjQsMTMuMjMtOC42OCwwLTEzLjYxLTYuNzgtMTMuNjEtMTguNlM1Ny42MywzLjI4LDY2LjQyLDMuMjhjNC41LDAsNy45MiwxLjc5LDEwLDUuMjcsMS40MiwyLjI3LDIsNC42MSwyLjM0LDguNzNsLTcuMjcuNTRjLS4yMi0zLjE1LS40My00LjM5LTEuMTQtNS42NGE0LjI4LDQuMjgsMCwwLDAtMy45LTIuNDRjLTMuODYsMC01LjQzLDMuNzQtNS40MywxMi44LDAsOC4xOSwxLjU3LDExLjU1LDUuNDMsMTEuNTUsMi44NywwLDQuNS0yLjI4LDUuMDktNy4yN1oiLz48cG9seWdvbiBjbGFzcz0iY2xzLTMiIHBvaW50cz0iOTEuNTEgNDAgOTEuNTEgMy44MyA3OC45NSAzLjgzIDc4Ljk1IDEwLjYxIDg2LjE2IDEwLjYxIDg2LjE2IDQwIDkxLjUxIDQwIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMTIyLDMuODMsMTMyLjI3LDQwaC04LjEzbC0xLjc5LTcuNDNoLTEwLjJMMTEwLjQyLDQwSDEwMy4xTDExMy45NCwzLjgzWm0tNC43Nyw3Ljc1LTMuNTMsMTQuNzZoNy4xNloiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xNDMuODIsMy44MywxNTMsMjYuMjhWMy44M2g2LjE4VjQwaC03LjFsLTExLTI2LjE5VjQwSDEzNVYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTE3MC45NCwzLjgzVjE4LjlsOC43OS0xNS4wN2g4TDE3OC43LDE3LjExLDE4OC41MSw0MGgtOC4xOGwtNi40LTE2LjY1LTMsNC40VjQwSDE2M1YzLjgzWiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtNCIgcG9pbnRzPSI5Mi45MiAzLjgzIDkyLjkyIDQwIDk4LjE3IDQwIDk4LjE3IDEwLjYxIDEwNS41NCAxMC42MSAxMDUuNTQgMy44MyA5Mi45MiAzLjgzIi8+PHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjE4My42NiAxOC45NyAxODYuMTkgMjMuMDcgMTg3LjM5IDIxLjkxIDE4My42NiAxOC45NyIvPjwvc3ZnPg==",width:"200"}),React.createElement("div",{class:"ui segment inverted beige",style:{borderTop:"1px solid #b2b3a5"}},React.createElement("p",{className:"tagline"},"NEWS IN THE NUMBERS"),React.createElement(m.a,this.props),React.createElement("a",{href:t,className:"read-more"},"More From Fact Tank")))}}]),t}(c.Component);t.a=g},47:function(e,t,a){"use strict";var r=a(11),n=a(12),l=a(13),s=a(7),i=a(14),o=a(16),c=a(3),u=a(15),m=a(277),p=a(18),b=a(17),g=a(33),d=a(32),j=a(26),M=a.n(j),y=a(38),E=a(276),f=["image"],N=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(n.a)(this,Object(l.a)(t).call(this,e))).state={open:!1,editLabel:!1,taxonomy:"Formats",labelOptions:[]},a.setState=a.setState.bind(Object(s.a)(a)),a.getLabelOptions=a.getLabelOptions.bind(Object(s.a)(a)),a}return Object(i.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.getLabelOptions()}},{key:"componentDidUpdate",value:function(){this.state.taxonomy!==this.props.taxonomy&&this.getLabelOptions()}},{key:"getLabelOptions",value:function(){var e=this;if(void 0!==wp.api.collections[this.props.taxonomy]){var t=this.setState;Object(y.a)(this.props.taxonomy,!1).then((function(a){var r=a;t({taxonomy:e.props.taxonomy,labelOptions:r})}))}}},{key:"render",value:function(){var e=this;return React.createElement(c.Fragment,null,React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(b.SelectControl,{value:this.props.label,options:this.state.labelOptions,onChange:function(t){e.props.setAttributes({label:t})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(b.TextControl,{value:this.props.date,onChange:function(t){e.props.setAttributes({date:t})}}))))}}]),t}(c.Component),v=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(n.a)(this,Object(l.a)(t).call(this,e))).mediaHandler=a.mediaHandler.bind(Object(s.a)(a)),a}return Object(i.a)(t,e),Object(p.a)(t,[{key:"mediaHandler",value:function(e){console.log(e),"disabled"===this.props.slot?this.props.setAttributes({image:e.url,imageID:e.id,imageSlot:"default"}):this.props.setAttributes({image:e.url,imageID:e.id})}},{key:"render",value:function(){var e=this;return React.createElement(u.MediaUploadCheck,null,React.createElement(u.MediaUpload,{onSelect:this.mediaHandler,allowedTypes:f,render:function(t){var a=t.open;return React.createElement(c.Fragment,null,""!==e.props.img&&React.createElement(c.Fragment,null,"default"!==e.props.slot&&"disabled"!==e.props.slot&&React.createElement(u.BlockControls,null,React.createElement(b.Toolbar,{controls:[{icon:"art",title:"Chart Art",isActive:e.props.isChartArt,onClick:function(){e.props.setAttributes({isChartArt:!e.props.isChartArt})}}]})),React.createElement("div",{className:e.props.imgClass},React.createElement("img",{className:"wp-image-"+e.props.id,src:e.props.img,onClick:a}),React.createElement("div",{className:"image-editor-options"},React.createElement("div",null,React.createElement("div",{class:"sans-serif"},React.createElement("i",null,"Click image to open media library")),React.createElement("div",{class:"sans-serif remove-image",onClick:function(){e.props.setAttributes({image:"",imageSlot:"disabled"})}},"Or click here to ",React.createElement("strong",null,"REMOVE IMAGE"))),React.createElement("div",null,React.createElement(b.SelectControl,{label:"Image Size",value:e.props.size,options:[{value:"A1",label:"A1"},{value:"A2",label:"A2"},{value:"A3",label:"A3"},{value:"A4",label:"A4"},{value:"legacy-260",label:"Legacy Homepage 260x260"},{value:"legacy-260-173",label:"Legacy Homepage 260x173"}],onChange:function(t){e.props.setAttributes({imageSize:t})},style:{marginBottom:"0px"}}))))),""===e.props.img&&React.createElement("p",null,React.createElement(b.Button,{isPrimary:!0,onClick:a},"Insert Image")))}}))}}]),t}(c.Component),h=function(e){var t=e.isChartArt,a=e.img,r=e.setAttributes,n=e.link,l=!1;"left"!==a.slot&&"right"!==a.slot||(l=!0);var s=M()({ui:!0,medium:l,image:!0,bordered:t}),i=function(e,t,a,r){if(""===e||!1===e)return e;var n={w:"564px"};return"A2"===a?n={w:"268px"}:"A3"===a?n={w:"194px"}:"A4"===a?n={w:"268px"}:"legacy-260"===a?n={resize:"260,260"}:"legacy-260-173"===a&&(n={resize:"260,173"}),Object(g.addQueryArgs)(e,n)};return React.createElement(c.Fragment,null,void 0!==a&&React.createElement(c.Fragment,null,!1!==r&&React.createElement(c.Fragment,null,React.createElement(v,{id:a.id,slot:a.slot,img:i(a.src,a.slot,a.size),size:a.size,imgClass:s,isChartArt:t,setAttributes:r})),!1===r&&React.createElement("div",{className:s},React.createElement("a",{href:n},React.createElement("img",{className:"wp-image-"+a.id,src:i(a.src,a.slot,a.size)})))))},x=function(e){var t=e.content,a=e.enabled,r=e.setAttributes,n=e.sansSerif,l=M()("description",{"sans-serif":n});return React.createElement(c.Fragment,null,!0===a&&React.createElement(c.Fragment,null,!1!==r&&React.createElement(u.RichText,{tagName:"div",value:t,onChange:function(e){return r({excerpt:e})},placeholder:t,multiline:"p",className:l}),!1===r&&React.createElement(u.RichText.Content,{tagName:"div",value:t,className:l})))},L=function(e){var t=e.enabled,a=e.content,r=e.setAttributes,n=M()("extra");return React.createElement(c.Fragment,null,!1!==r&&!0===t&&React.createElement(u.RichText,{tagName:"ul",value:a,onChange:function(e){return r({extra:e})},placeholder:a,multiline:"li",className:n}),!1===r&&!0===t&&React.createElement(u.RichText.Content,{tagName:"ul",value:a,className:n}))},R=function(e){var t=e.label,a=e.date;void 0===t&&(t="Report");var r=t.replace(/\s+/g,"-").toLowerCase(),n=M()(r,"label");return React.createElement(c.Fragment,null,React.createElement("span",{className:n},t||"Report")," | ",d(a).format("MMM D, YYYY"))},I=function(e){var t=e.title,a=e.link,r=(e.size,e.as),n=void 0===r?"a":r;return React.createElement(u.RichText.Content,{href:a,tagName:n,value:t})},k=function(e){var t=e.title,a=e.label,r=e.date,n=e.link,l=e.enabled,s=e.size,i=e.taxonomy,o=e.setAttributes,m=s;return React.createElement(c.Fragment,null,!0===l&&React.createElement(c.Fragment,null,React.createElement(E.a.Meta,null,!1!==o&&React.createElement(N,{date:r,label:a,taxonomy:i,setAttributes:o}),!1===o&&React.createElement(R,{label:a,date:r})),React.createElement(E.a.Header,{className:s},!1!==o&&React.createElement(c.Fragment,null,React.createElement(u.BlockControls,null,React.createElement(b.Toolbar,{controls:["small","normal","large"].map((function(e){var t=!1;return e===m&&(t=!0),{icon:"editor-textcolor",title:"Size: ".concat(e),isActive:t,onClick:function(){o({headerSize:e})}}}))})),React.createElement(u.RichText,{tagName:"div",value:t,onChange:function(e){return o({title:e})},placeholder:"Title",multiline:"br"})),!1===o&&React.createElement(I,{title:t,link:n,as:"a",size:s}))))},D=function(e){function t(e){var a;return Object(r.a)(this,t),a=Object(n.a)(this,Object(l.a)(t).call(this,e)),Object(o.a)(Object(s.a)(a),"item",(function(e){return React.createElement(E.a,{as:"article",className:e.classes},("top"===e.imageSlot||"left"===e.imageSlot)&&React.createElement(h,{img:{src:e.image,id:e.imageID,slot:e.imageSlot,size:e.imageSize},link:e.link,setAttributes:a.props.setAttributes,isChartArt:e.isChartArt}),React.createElement(E.a.Content,null,React.createElement(k,{title:e.title,date:e.date,label:e.label,link:e.link,setAttributes:a.props.setAttributes,enabled:e.enableHeader,size:e.headerSize,taxonomy:e.taxonomy}),"default"===e.imageSlot&&React.createElement(h,{img:{src:e.image,id:e.imageID,slot:e.imageSlot,size:e.imageSize},link:e.link,setAttributes:a.props.setAttributes,isChartArt:e.isChartArt}),React.createElement(x,{content:e.excerpt,enabled:e.enableExcerpt,setAttributes:a.props.setAttributes,sansSerif:!e.enableHeader}),React.createElement(L,{enabled:e.enableExtra,content:e.extra,setAttributes:a.props.setAttributes})),("bottom"===e.imageSlot||"right"===e.imageSlot)&&React.createElement(h,{img:{src:e.image,id:e.imageID,slot:e.imageSlot,size:e.imageSize},link:e.link,setAttributes:a.props.setAttributes,isChartArt:e.isChartArt}))})),a.item=a.item.bind(Object(s.a)(a)),a}return Object(i.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){console.log(this.props)}},{key:"render",value:function(){void 0!==this.props.isSelected&&!0===this.props.isSelected||(this.props.setAttributes=!1),this.props.attributes.taxonomy="Formats",!0===this.props.attributes.enableProgramsTaxonomy&&(this.props.attributes.taxonomy="Programs");var e=!0;"left"!==this.props.attributes.imageSlot&&"right"!==this.props.attributes.imageSlot||(e=!1);var t=!1;return!0===this.props.attributes.emphasis&&(t=!0),this.props.attributes.classes=M()(this.props.attributes.className,"story-item",{stacked:e,bordered:t}),React.createElement(c.Fragment,null,React.createElement(this.item,this.props.attributes))}}]),t}(c.Component),O=function(e){function t(e){var a;return Object(r.a)(this,t),a=Object(n.a)(this,Object(l.a)(t).call(this,e)),Object(o.a)(Object(s.a)(a),"componentDidMount",(function(){console.log("Columns Mounted"),console.log(a.props)})),Object(o.a)(Object(s.a)(a),"render",(function(){var e=a.props.posts;return React.createElement("div",{style:{marginBottom:"2rem"}},React.createElement("div",{className:"ui sub header",style:{marginBottom:"1rem"}},a.props.title),React.createElement(m.a,{divided:!0,padded:!0,stackable:!0,columns:"equal",style:{backgroundColor:a.props.backgroundColor}},React.createElement(m.a.Row,null,!1!==e&&e.map((function(e,t){var a={attributes:{title:e.title,image:e.image,excerpt:e.excerpt,link:e.link,label:e.label,date:e.date,extra:"",postID:e.id,emphasis:!1,isChartArt:!1,imageSlot:"top",horizontal:!1,stacked:!0,enableHeader:!0,enableExcerpt:!1,enableExtra:!1,enableProgramsTaxonomy:!1,headerSize:"normal",classNames:"is-style-top"}};return React.createElement(m.a.Column,null,React.createElement(D,a))})))))})),a.state={defaultOptions:{emphasis:!1,enableHeader:!0,enableExcerpt:!0,headerSize:"small"}},a}return Object(i.a)(t,e),t}(c.Component);t.a=O},55:function(e,t){e.exports=wp.apiFetch}},[[148,0,1]]]);
//# sourceMappingURL=main-6030ad91.js.map