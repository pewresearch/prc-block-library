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
(window.wpackioprcBlocksLibrarypostsJsonp=window.wpackioprcBlocksLibrarypostsJsonp||[]).push([[3],{0:function(e,t){e.exports=React},133:function(e,t){e.exports=wp.blocks},153:function(e,t,a){a(101),e.exports=a(154)},154:function(e,t,a){"use strict";a.r(t);var r=a(10),l=a(11),n=a(12),i=a(7),s=a(13),o=a(14),c=a(35),u=a(133),m=a(17),p=a(16),d=a(3),b=a(26),g=a(38),f=a(30),j=a(47),M=a(46),y=function(e){function t(e){var a;return Object(r.a)(this,t),a=Object(l.a)(this,Object(n.a)(t).call(this,e)),Object(o.a)(Object(i.a)(a),"componentDidMount",(function(){var e=a.setState,t=a.props.setAttributes;Object(g.a)("Formats").then((function(t){var a=[];for(var r in t)if(t.hasOwnProperty(r)){var l=t[r];a.push({value:l.id,label:l.name})}e({formatsRaw:t,formats:a})})),Object(g.a)("Programs").then((function(t){var a=[];for(var r in t[0]={id:0,name:"All",slug:"all"},t)if(t.hasOwnProperty(r)){var l=t[r];a.push({value:l.id,label:l.name})}e({programsRaw:t,programs:a})})),!1===a.props.attributes.posts&&(Object(b.a)(a.props.attributes.per_page,a.props.attributes.format,a.props.attributes.program,a.props.attributes.taxonomyToDisplay,!0).then((function(e){t({posts:e})})),!0===a.props.className.includes("is-style-fact-tank")&&(t({format:10818955}),Object(b.a)(a.props.attributes.per_page,a.props.attributes.format,10818955,a.props.attributes.taxonomyToDisplay,!0).then((function(e){t({posts:e})}))))})),Object(o.a)(Object(i.a)(a),"insertStoryBlock",(function(e,t,a){console.log("Insert Story Block");var r=window.wp.data.select("core/block-editor").getBlockHierarchyRootClientId(clientID),l=window.wp.data.select("core/block-editor").getBlockOrder(r),n=window.wp.data.select("core/block-editor").getBlock(l[1]);console.log(l[1]),console.log(n),console.log(r);var i=window.wp.blocks.createBlock("prc-block/story-item",{title:t.title,image:t.image,excerpt:t.excerpt,link:t.link,label:t.label,date:t.date,extra:"",postID:t.id,emphasis:!1,isChartArt:!1,imageSlot:"top",horizontal:!1,stacked:!0,enableHeader:!0,enableExcerpt:!1,enableExtra:!1,enableProgramsTaxonomy:!1,headerSize:"normal"});window.wp.data.dispatch("core/block-editor").insertBlocks(i,a,e)})),Object(o.a)(Object(i.a)(a),"render",(function(){var e=a.props.setAttributes;return React.createElement(m.InspectorControls,null,React.createElement(p.PanelBody,{title:Object(c.__)("Posts Block Options")},React.createElement(p.TextControl,{label:"Title",value:a.props.attributes.title,onChange:function(t){return e({title:t})}}),React.createElement(p.TextControl,{label:"Number of Posts",value:Number(a.props.attributes.per_page),onChange:function(t){e({per_page:Number(t)}),Object(b.a)(t,a.props.attributes.formatID,a.props.attributes.programID,a.props.attributes.taxonomyToDisplay,!0).then((function(t){e({posts:t})}))}}),React.createElement(p.SelectControl,{label:"Format",value:a.props.attributes.formatID,options:a.state.formats,onChange:function(t){var r=a.state.formatsRaw[Number(t)];e({formatID:r.id,formatSlug:r.slug,format:r.name}),Object(b.a)(a.props.attributes.per_page,r.id,a.props.attributes.programID,a.props.attributes.taxonomyToDisplay,!0).then((function(t){e({posts:t})}))}}),React.createElement(p.SelectControl,{label:"Research Program",value:a.props.attributes.programID,options:a.state.programs,onChange:function(t){var r=a.state.programsRaw[Number(t)];e({programID:r.id,programSlug:r.slug,program:r.name}),Object(b.a)(a.props.attributes.per_page,a.props.attributes.formatID,r.id,a.props.attributes.taxonomyToDisplay,!0).then((function(t){e({posts:t})}))}}),React.createElement(p.SelectControl,{label:"Label Taxonomy",value:a.props.attributes.taxonomyToDisplay,options:[{label:"Formats",value:"formats"},{label:"Programs",value:"programs"}],onChange:function(t){e({taxonomyToDisplay:t}),Object(b.a)(a.props.attributes.per_page,a.props.attributes.formatID,a.props.attributes.programID,t,!0).then((function(t){e({posts:t})}))}}),React.createElement(p.ToggleControl,{label:"Dynamic Mode",help:a.props.attributes.dynamic?"Updates posts in real time, every 5 minutes.":"Posts are saved statically (will not update in real time).",checked:a.props.attributes.dynamic,onChange:function(){return e({dynamic:!a.props.attributes.dynamic})}}),React.createElement("strong",null,"Background Color:"),React.createElement("br",null),React.createElement(p.ColorPalette,{colors:[{name:"White",color:"#fff"},{name:"Oatmeal",color:"#f8f9f5"}],value:a.props.attributes.backgroundColor,onChange:function(t){return e({backgroundColor:t})}})))})),a.state={formats:!1,formatsRaw:!1,programs:!1,programsRaw:!1},a.setState=a.setState.bind(Object(i.a)(a)),a}return Object(s.a)(t,e),t}(d.Component);Object(u.registerBlockType)("prc-block/posts",{title:Object(c.__)("Posts Block"),icon:"align-left",category:"widgets",keywords:[Object(c.__)("prc"),Object(c.__)("fact tank"),Object(c.__)("posts listing"),Object(c.__)("posts"),Object(c.__)("posts widget"),Object(c.__)("publication listing")],styles:[{name:"list",label:"Simple List",isDefault:!0},{name:"fact-tank",label:"Fact Tank"},{name:"columns",label:"Columns"}],supports:{html:!1},attributes:{title:{type:"string",default:"Title"},moreLink:{type:"string",default:""},formatID:{type:"integer",default:10818957},formatSlug:{type:"string",default:"report"},format:{type:"string",default:"Report"},programID:{type:"integer",default:0},programSlug:{type:"string",default:""},program:{type:"string",default:""},per_page:{type:"integer",default:5},backgroundColor:{tyle:"string",default:"#fff"},dynamic:{type:"boolean",default:!1},taxonomyToDisplay:{type:"string",default:"formats"},posts:{type:"array",default:!1}},edit:function(e){var t=e.attributes,a=e.attributes.className,r=!1;void 0!==a&&a.includes("is-style-fact-tank")&&(r=!0);var l=!1;(void 0===a||a.includes("is-style-list"))&&(l=!0);var n=!1;return void 0!==a&&a.includes("is-style-columns")&&(n=!0),t.className=a,!0===e.isSelected&&(t.setAttributes=e.setAttributes),t.clientID=e.clientId,t.disableLink=!0,React.createElement(d.Fragment,null,!0===e.isSelected&&React.createElement(y,e),React.createElement("div",{className:t.className},!0===r&&React.createElement(j.a,t),!0===l&&React.createElement(f.a,t),!0===n&&React.createElement(M.a,t)))},save:function(e){var t=e.attributes,a=e.attributes.className,r=!1;void 0!==a&&a.includes("is-style-fact-tank")&&(r=!0);var l=!1;void 0!==a&&a.includes("is-style-list")&&(l=!0);var n=!1;return void 0!==a&&a.includes("is-style-columns")&&(n=!0),t.className=a,t.disableLink=!1,React.createElement("div",{className:t.className},!0!==e.attributes.dynamic&&!0===r&&React.createElement(j.a,t),!0!==e.attributes.dynamic&&!0===l&&React.createElement(f.a,t),!0!==e.attributes.dynamic&&!0===n&&React.createElement(M.a,t),!0===e.attributes.dynamic&&React.createElement("div",{className:"js-react-posts-block","data-title":e.attributes.title,"data-format":e.attributes.format,"data-format-id":e.attributes.formatID,"data-format-slug":e.attributes.formatSlug,"data-program":e.attributes.program,"data-program-id":e.attributes.programID,"data-program-slug":e.attributes.programSlug,"data-number":e.attributes.per_page,"data-background":e.attributes.backgroundColor,"data-style":a}))}})},16:function(e,t){e.exports=wp.components},17:function(e,t){e.exports=wp.blockEditor},26:function(e,t,a){"use strict";var r=a(28);t.a=function(e,t,a,l){var n=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i=function(e,t){var a=r().format("MMM D, YYYY"),l=r(e).format("MMM D, YYYY");return!0===t&&a===l&&(l=r(e).fromNow()),l};return new Promise((function(r,s){var o=[];fetch(window.siteURL+"/wp-json/prc-api/v2/blocks/helpers/get-posts/?perPage="+e+"&format="+t+"&program="+a+"&labelTaxonomy="+l).then((function(e){return e.json()})).then((function(t){for(var a=0;a<e;a++)o.push({id:t[a].id,title:t[a].title,excerpt:t[a].excerpt,date:i(t[a].timestamp,n),link:t[a].link,label:t[a].label,image:t[a].image});r(o)}),(function(e){console.log(e)}))}))}},28:function(e,t){e.exports=moment},3:function(e,t){e.exports=wp.element},30:function(e,t,a){"use strict";var r=a(10),l=a(18),n=a(11),i=a(12),s=a(13),o=a(3),c=a(51),u=function(e){function t(e){return Object(r.a)(this,t),Object(n.a)(this,Object(i.a)(t).call(this,e))}return Object(s.a)(t,e),Object(l.a)(t,[{key:"posts",value:function(e){e.loaded,e.setState,e.clientID;var t=e.data,a=e.disableLink;return React.createElement(c.a,{relaxed:"very",link:!0,divided:!0},!1!==t&&t.map((function(e,t){return!0===a?React.createElement(c.a.Item,null,React.createElement("span",{className:"meta"},e.date),React.createElement(o.RawHTML,null,e.title)):React.createElement(c.a.Item,null,React.createElement("span",{className:"meta"},e.date),React.createElement("a",{href:e.link},React.createElement(o.RawHTML,null,e.title)))})))}},{key:"render",value:function(){var e=this.posts;return React.createElement(o.Fragment,null,React.createElement(e,{data:this.props.posts,disableLink:this.props.disableLink}))}}]),t}(o.Component);t.a=u},33:function(e,t){e.exports=wp.url},35:function(e,t){e.exports=wp.i18n},38:function(e,t,a){"use strict";t.a=function(e){console.log("getting terms for "+e);var t=new wp.api.collections[e];return void 0!==t&&new Promise((function(a,r){var l={};t.fetch({data:{hide_empty:!1,per_page:25}}).then((function(t){for(var r=0;r<t.length;r++){var n=t[r].slug.replace(e.toLowerCase()+"_","");l[t[r].id]={id:t[r].id,name:t[r].name,slug:n}}a(l)}))}))}},45:function(e,t){e.exports=ReactDOM},46:function(e,t,a){"use strict";var r=a(10),l=a(11),n=a(12),i=a(7),s=a(13),o=a(14),c=(a(92),a(3)),u=a(285),m=a(18),p=a(17),d=a(16),b=a(28),g=a(27),f=a.n(g),j=(a(26),a(38)),M=(a(93),a(49)),y=a(33),v=["image"],h=function(e){function t(e){var a;return Object(r.a)(this,t),a=Object(l.a)(this,Object(n.a)(t).call(this,e)),Object(o.a)(Object(i.a)(a),"classNames",(function(){var e=!1;void 0!==a.props.slot&&("left"!==a.props.slot&&"right"!==a.props.slot||(e=!0));var t=!1;return void 0!==a.props.chartArt&&(t=a.props.chartArt),f()({ui:!0,medium:e,image:!0,bordered:t})})),Object(o.a)(Object(i.a)(a),"imgMarkup",(function(e){var t=e.img,a=e.size,r=e.link,l=function(e,t,a){if(""===e||!1===e)return e;var r={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},l={resize:{default:"564,317",small:"354,194",hidpi:"1128,634",smallHidpi:"708,388"}[a]};return"A2"===t?l={resize:{default:"268,151",small:"354,194",hidpi:"536,301",smallHidpi:"708,388"}[a]}:"A3"===t?l={resize:{default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"}[a]}:"A4"===t&&(l={resize:{default:"268,151",small:"354,194",hidpi:"536,302",smallHidpi:"708,388"}[a]}),"legacy-260"===t?l={resize:r[260][a]}:"legacy-260-173"===t&&(l={resize:r["260-173"][a]}),Object(y.addQueryArgs)(e,l)},n=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:420;return[{srcSet:l(e,t,"default")+" 1x, "+l(e,t,"hidpi")+" 2x",media:"(min-width: "+a+"px)"},{srcSet:l(e,t,"small")+" 1x, "+l(e,t,"smallHidpi")+" 2x",media:"(max-width: "+a+"px)"}]};return React.createElement(c.Fragment,null,""===r&&React.createElement(M.a,{style:{display:"block"},sources:n(t,a)}),""!==r&&React.createElement("a",{href:r},React.createElement(M.a,{style:{display:"block"},sources:n(t,a)})))})),Object(o.a)(Object(i.a)(a),"editMode",(function(e){var t=e.dataHandler,r=function(e){var t=e.open,r=e.dataHandler;return React.createElement("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",backgroundColor:"#f0f2f3"}},React.createElement("div",null,React.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},React.createElement(d.IconButton,{icon:"upload",label:"Select/Upload New Image",onClick:t}),React.createElement(d.IconButton,{icon:"trash",label:"Remove Image",onClick:function(){r({image:"",imageSlot:"disabled"})}}),React.createElement(c.Fragment,null,void 0!==a.props.chartArt&&React.createElement(d.IconButton,{icon:"art",label:!0===a.props.chartArt?"Disable Chart Art":"Enable Chart Art",onClick:function(){r({isChartArt:!a.props.chartArt})}})))),void 0!==a.props.slot&&React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement(d.SelectControl,{label:"Image Size",value:a.props.size,options:[{value:"A1",label:"A1"},{value:"A2",label:"A2"},{value:"A3",label:"A3"},{value:"A4",label:"A4"},{value:"legacy-260",label:"Legacy Homepage 260x260"},{value:"legacy-260-173",label:"Legacy Homepage 260x173"}],onChange:function(e){return r({imageSize:e})},style:{marginBottom:"0px"}})))},l=a.imgMarkup;return React.createElement(p.MediaUploadCheck,null,React.createElement(p.MediaUpload,{onSelect:function(e){void 0!==a.props.slot&&"disabled"===a.props.slot?t({image:e.url,imageSlot:"default"}):t({image:e.url})},allowedTypes:v,render:function(e){var n=e.open;return React.createElement(c.Fragment,null,""!==a.props.img&&React.createElement(c.Fragment,null,React.createElement("div",{className:a.classNames()},React.createElement(l,{img:a.props.img,size:a.props.size,id:a.props.id,link:""}),React.createElement(r,{dataHandler:t,open:n}))),""===a.props.img&&React.createElement("p",null,React.createElement(d.Button,{isPrimary:!0,onClick:n},"Insert Image")))}}))})),a}return Object(s.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){console.log("Image Component:"),console.log(this.props);var e=this.editMode,t=this.imgMarkup;return React.createElement(c.Fragment,null,(!1===this.props.dataHandler||void 0===this.props.dataHandler)&&React.createElement("div",{className:this.classNames()},React.createElement(t,{img:this.props.img,size:this.props.size,link:this.props.link})),!1!==this.props.dataHandler&&void 0!==this.props.dataHandler&&React.createElement(e,{dataHandler:this.props.dataHandler}))}}]),t}(c.Component),E=a(284),N=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(n.a)(t).call(this,e))).state={open:!1,editLabel:!1,taxonomy:"Formats",labelOptions:[]},a.setState=a.setState.bind(Object(i.a)(a)),a.getLabelOptions=a.getLabelOptions.bind(Object(i.a)(a)),a}return Object(s.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.getLabelOptions()}},{key:"componentDidUpdate",value:function(){this.state.taxonomy!==this.props.taxonomy&&this.getLabelOptions()}},{key:"getLabelOptions",value:function(){var e=this;if(void 0!==wp.api.collections[this.props.taxonomy]){var t=this.setState;Object(j.a)(this.props.taxonomy).then((function(a){var r=[];for(var l in a)if(a.hasOwnProperty(l)){var n=a[l];r.push({value:n.name,label:n.name})}r.sort((function(e,t){return e.label>t.label?1:-1})),t({taxonomy:e.props.taxonomy,labelOptions:r})}))}}},{key:"render",value:function(){var e=this;return React.createElement(c.Fragment,null,React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(d.SelectControl,{value:this.props.label,options:this.state.labelOptions,onChange:function(t){e.props.setAttributes({label:t})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(d.TextControl,{value:this.props.date,onChange:function(t){e.props.setAttributes({date:t})}}))))}}]),t}(c.Component),x=function(e){var t=e.content,a=e.enabled,r=e.setAttributes,l=e.sansSerif,n=f()("description",{"sans-serif":l});return React.createElement(c.Fragment,null,!0===a&&React.createElement(c.Fragment,null,!1!==r&&React.createElement(p.RichText,{tagName:"div",value:t,onChange:function(e){return r({excerpt:e})},placeholder:t,multiline:"p",className:n}),!1===r&&React.createElement(p.RichText.Content,{tagName:"div",value:t,className:n})))},I=function(e){var t=e.enabled,a=e.content,r=e.setAttributes,l=f()("extra");return React.createElement(c.Fragment,null,!1!==r&&!0===t&&React.createElement(p.RichText,{tagName:"ul",value:a,onChange:function(e){return r({extra:e})},placeholder:a,multiline:"li",className:l}),!1===r&&!0===t&&React.createElement(p.RichText.Content,{tagName:"ul",value:a,className:l}))},R=function(e){var t=e.label,a=e.date;void 0===t&&(t="Report");var r=t.replace(/\s+/g,"-").toLowerCase(),l=f()(r,"label");return React.createElement(c.Fragment,null,React.createElement("span",{className:l},t||"Report")," | ",b(a).format("MMM D, YYYY"))},L=function(e){var t=e.title,a=e.link,r=(e.size,e.as),l=void 0===r?"a":r;return React.createElement(p.RichText.Content,{href:a,tagName:l,value:t})},w=function(e){var t=e.title,a=e.label,r=e.date,l=e.link,n=e.enabled,i=e.size,s=e.taxonomy,o=e.setAttributes,u=i;return React.createElement(c.Fragment,null,!0===n&&React.createElement(c.Fragment,null,React.createElement(E.a.Meta,null,!1!==o&&React.createElement(N,{date:r,label:a,taxonomy:s,setAttributes:o}),!1===o&&React.createElement(R,{label:a,date:r})),React.createElement(E.a.Header,{className:i},!1!==o&&React.createElement(c.Fragment,null,React.createElement(p.BlockControls,null,React.createElement(d.Toolbar,{controls:["small","normal","large"].map((function(e){var t=!1;return e===u&&(t=!0),{icon:"editor-textcolor",title:"Size: ".concat(e),isActive:t,onClick:function(){o({headerSize:e})}}}))})),React.createElement(p.RichText,{tagName:"div",value:t,onChange:function(e){return o({title:e})},placeholder:"Title",multiline:"br"})),!1===o&&React.createElement(L,{title:t,link:l,as:"a",size:i}))))},D=function(e){function t(e){var a;return Object(r.a)(this,t),a=Object(l.a)(this,Object(n.a)(t).call(this,e)),Object(o.a)(Object(i.a)(a),"item",(function(e){return React.createElement(E.a,{as:"article",className:e.classes},("top"===e.imageSlot||"left"===e.imageSlot)&&React.createElement(h,{img:e.image,size:e.imageSize,link:e.link,slot:e.imageSlot,chartArt:e.isChartArt,dataHandler:a.props.setAttributes}),React.createElement(E.a.Content,null,React.createElement(w,{title:e.title,date:e.date,label:e.label,link:e.link,setAttributes:a.props.setAttributes,enabled:e.enableHeader,size:e.headerSize,taxonomy:e.taxonomy}),"default"===e.imageSlot&&React.createElement(h,{img:e.image,size:e.imageSize,link:e.link,slot:e.imageSlot,chartArt:e.isChartArt,dataHandler:a.props.setAttributes}),React.createElement(x,{content:e.excerpt,enabled:e.enableExcerpt,setAttributes:a.props.setAttributes,sansSerif:!e.enableHeader}),React.createElement(I,{enabled:e.enableExtra,content:e.extra,setAttributes:a.props.setAttributes})),("bottom"===e.imageSlot||"right"===e.imageSlot)&&React.createElement(h,{img:e.image,size:e.imageSize,link:e.link,slot:e.imageSlot,chartArt:e.isChartArt,dataHandler:a.props.setAttributes}))})),a.item=a.item.bind(Object(i.a)(a)),a}return Object(s.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){void 0!==this.props.isSelected&&!0===this.props.isSelected||(this.props.setAttributes=!1),this.props.attributes.taxonomy="Formats",!0===this.props.attributes.enableProgramsTaxonomy&&(this.props.attributes.taxonomy="Programs");var e=!0;"left"!==this.props.attributes.imageSlot&&"right"!==this.props.attributes.imageSlot||(e=!1);var t=!1;return!0===this.props.attributes.emphasis&&(t=!0),this.props.attributes.classes=f()(this.props.attributes.className,"story-item",{stacked:e,bordered:t}),React.createElement(c.Fragment,null,React.createElement(this.item,this.props.attributes))}}]),t}(c.Component),k=function(e){function t(e){var a;return Object(r.a)(this,t),a=Object(l.a)(this,Object(n.a)(t).call(this,e)),Object(o.a)(Object(i.a)(a),"render",(function(){var e=a.props.posts;return React.createElement("div",{style:{marginBottom:"2rem"}},React.createElement("div",{className:"ui sub header",style:{marginBottom:"1rem"}},a.props.title),React.createElement(u.a,{divided:!0,padded:!0,stackable:!0,columns:"equal",style:{backgroundColor:a.props.backgroundColor}},React.createElement(u.a.Row,null,!1!==e&&e.map((function(e,t){var a={attributes:{title:e.title,image:e.image,excerpt:e.excerpt,link:e.link,label:e.label,date:e.date,extra:"",postID:e.id,emphasis:!1,isChartArt:!1,imageSlot:"top",imageSize:"legacy-260",horizontal:!1,stacked:!0,enableHeader:!0,enableExcerpt:!1,enableExtra:!1,enableProgramsTaxonomy:!1,headerSize:"small",classNames:"is-style-top"}};return React.createElement(u.a.Column,null,React.createElement(D,a))})))))})),a.state={defaultOptions:{emphasis:!1,enableHeader:!0,enableExcerpt:!0,headerSize:"small"}},a}return Object(s.a)(t,e),t}(c.Component);t.a=k},47:function(e,t,a){"use strict";var r=a(10),l=a(18),n=a(11),i=a(12),s=a(7),o=a(13),c=(a(91),a(3)),u=a(33),m=a(30),p=a(0),d=a.n(p);d.a.createElement("style",null,".fact-tank-logo_svg__cls-2{fill:#ddd9c7}.fact-tank-logo_svg__cls-3{fill:#808184}.fact-tank-logo_svg__cls-4{fill:#231f20}");var b=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(n.a)(this,Object(i.a)(t).call(this,e))).svgHeader=a.svgHeader.bind(Object(s.a)(a)),a}return Object(o.a)(t,e),Object(l.a)(t,[{key:"svgHeader",value:function(e){var t=e.svg,a=e.width,r=e.link,l=a/5;return React.createElement("a",{href:r},React.createElement("img",{style:{margin:"auto",display:"block"},src:t,width:a+"px",height:l+"px"}))}},{key:"render",value:function(){var e=this.svgHeader,t="https://www.pewresearch.org/fact-tank";if(1!==window.siteID){var a={formats:"fact-tank",programs:this.props.programSlug};t=Object(u.addQueryArgs)("https://www.pewresearch.org/publications/",a)}return React.createElement("div",{id:"js-fact-tank-widget",style:{marginBottom:"35px"}},React.createElement(e,{svg:"data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjUgNDAiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZWE5ZTJjO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS13aWR0aDo0LjcycHg7fS5jbHMtMntmaWxsOiNkZGQ5Yzc7fS5jbHMtM3tmaWxsOiM4MDgxODQ7fS5jbHMtNHtmaWxsOiMyMzFmMjA7fS5jbHMtNXtmaWxsOiNlYTllMmM7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5GYWN0VGFuay1sb2dvczwvdGl0bGU+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxODUuMjIgMjAuNjkgMTk0LjE1IDEyLjUyIDIwMy4wMyAyMi40MiAyMTkuNjIgNi42MSIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxOTQuMTUgMTkuMjMgMTk0LjE1IDQwLjA4IDIwMC43IDQwLjA4IDIwMC43IDI2LjQ5IDE5NC4xNSAxOS4yMyIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIyMDIuOTMgMjguNTEgMjAyLjkzIDQwLjA4IDIwOS40OCA0MC4wOCAyMDkuNDggMjIuMjUgMjAyLjkzIDI4LjUxIi8+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjIxMS43MSAyMC4xMiAyMTEuNzEgNDAuMDggMjE4LjI2IDQwLjA4IDIxOC4yNiAxMy44NyAyMTEuNzEgMjAuMTIiLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMTg1LjM3IDI2LjU2IDE4NS4zNyA0MC4wOCAxOTEuOTIgNDAuMDggMTkxLjkyIDIwLjU3IDE4NS4zNyAyNi41NiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTI3Ljg4LDMuODN2Ni4yM0gxNC4zN1YxOS41SDI0Ljc5djYuMjRIMTQuMzdWNDBINi40NlYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTQzLjQ4LDMuODMsNTMuNzgsNDBINDUuNjVsLTEuNzktNy40M0gzMy42NkwzMS45Myw0MEgyNC42MUwzNS40NSwzLjgzWm0tNC43Nyw3Ljc1TDM1LjE4LDI2LjM0aDcuMTZaIi8+PHBhdGggY2xhc3M9ImNscy0zIiBkPSJNNzksMjcuMzFjLS42NSw4LjE5LTUuNDIsMTMuMjMtMTIuNjQsMTMuMjMtOC42OCwwLTEzLjYxLTYuNzgtMTMuNjEtMTguNlM1Ny42MywzLjI4LDY2LjQyLDMuMjhjNC41LDAsNy45MiwxLjc5LDEwLDUuMjcsMS40MiwyLjI3LDIsNC42MSwyLjM0LDguNzNsLTcuMjcuNTRjLS4yMi0zLjE1LS40My00LjM5LTEuMTQtNS42NGE0LjI4LDQuMjgsMCwwLDAtMy45LTIuNDRjLTMuODYsMC01LjQzLDMuNzQtNS40MywxMi44LDAsOC4xOSwxLjU3LDExLjU1LDUuNDMsMTEuNTUsMi44NywwLDQuNS0yLjI4LDUuMDktNy4yN1oiLz48cG9seWdvbiBjbGFzcz0iY2xzLTMiIHBvaW50cz0iOTEuNTEgNDAgOTEuNTEgMy44MyA3OC45NSAzLjgzIDc4Ljk1IDEwLjYxIDg2LjE2IDEwLjYxIDg2LjE2IDQwIDkxLjUxIDQwIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMTIyLDMuODMsMTMyLjI3LDQwaC04LjEzbC0xLjc5LTcuNDNoLTEwLjJMMTEwLjQyLDQwSDEwMy4xTDExMy45NCwzLjgzWm0tNC43Nyw3Ljc1LTMuNTMsMTQuNzZoNy4xNloiLz48cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xNDMuODIsMy44MywxNTMsMjYuMjhWMy44M2g2LjE4VjQwaC03LjFsLTExLTI2LjE5VjQwSDEzNVYzLjgzWiIvPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTE3MC45NCwzLjgzVjE4LjlsOC43OS0xNS4wN2g4TDE3OC43LDE3LjExLDE4OC41MSw0MGgtOC4xOGwtNi40LTE2LjY1LTMsNC40VjQwSDE2M1YzLjgzWiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtNCIgcG9pbnRzPSI5Mi45MiAzLjgzIDkyLjkyIDQwIDk4LjE3IDQwIDk4LjE3IDEwLjYxIDEwNS41NCAxMC42MSAxMDUuNTQgMy44MyA5Mi45MiAzLjgzIi8+PHBvbHlnb24gY2xhc3M9ImNscy01IiBwb2ludHM9IjE4My42NiAxOC45NyAxODYuMTkgMjMuMDcgMTg3LjM5IDIxLjkxIDE4My42NiAxOC45NyIvPjwvc3ZnPg==",width:"200",link:t}),React.createElement("div",{class:"ui segment inverted beige",style:{borderTop:"1px solid #b2b3a5"}},React.createElement("p",{className:"tagline"},"NEWS IN THE NUMBERS"),React.createElement(m.a,this.props),React.createElement("a",{href:t,className:"read-more"},"More From Fact Tank")))}}]),t}(c.Component);t.a=b},91:function(e,t,a){},92:function(e,t,a){},93:function(e,t,a){}},[[153,0,1]]]);
//# sourceMappingURL=main-7b43202f.js.map