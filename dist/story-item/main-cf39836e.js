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
(window["wpackioprcBlocksLibrarystory-itemJsonp"]=window["wpackioprcBlocksLibrarystory-itemJsonp"]||[]).push([[0],{0:function(e,t){e.exports=React},108:function(e,t){e.exports=wp.blocks},109:function(e,t){e.exports=wp.apiFetch},111:function(e,t){e.exports=wp.url},131:function(e,t,a){a(132),e.exports=a(255)},133:function(e,t,a){},134:function(e,t,a){},19:function(e,t){e.exports=wp.blockEditor},255:function(e,t,a){"use strict";a.r(t);var l=a(21),n=a(22),r=a(23),i=a(12),c=a(24),s=a(18),o=(a(133),a(33)),m=a(108),u=a(19),p=a(9),d=a(6),b=a(109),g=a.n(b),f=a(30),h=a(29),E=a(31),R=a.n(E),y=a(262),v=function(e){var t=new wp.api.collections[e];return void 0!==t&&new Promise((function(a){var l={};t.fetch({data:{hide_empty:!1,per_page:25}}).then((function(t){for(var n=0;n<t.length;n++){var r=t[n].slug.replace("".concat(e.toLowerCase(),"_"),"");l[t[n].id]={id:t[n].id,name:t[n].name,slug:r}}a(l)}))}))},x=function(e){var t=e.label,a=void 0===t?"Report":t,l=e.date,n=a.replace(/\s+/g,"-").toLowerCase(),r=R()(n,"label");return React.createElement(d.Fragment,null,React.createElement("span",{className:r},a||"Report")," | ",f(l).format("MMM D, YYYY"))},A=a(263),w=Object(A.a)({labelOptions:[]})((function(e){var t=e.label,a=e.date,l=e.taxonomy,n=e.setAttributes,r=e.setState,i=e.labelOptions;return Object(d.useEffect)((function(){(function(e){return new Promise((function(t){v(e).then((function(e){var a=[];Object.keys(e).forEach((function(t){var l=e[t];a.push({value:l.name,label:l.name})})),a.sort((function(e,t){return e.label>t.label?1:-1})),t(a)}))}))})(l).then((function(e){return r({labelOptions:e})}))}),[l]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(p.SelectControl,{value:t,options:i,onChange:function(e){n({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(p.TextControl,{value:a,onChange:function(e){n({date:e})}})))})),k=(a(134),a(80)),C=a(111),S=function(e){var t=e.img,a=e.size,l=e.link,n=function(e,t,a){if(""===e||!1===e)return e;var l={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},n={resize:{default:"564,317",small:"354,194",hidpi:"1128,634",smallHidpi:"708,388"}[a]};return"A2"===t?n={resize:{default:"268,151",small:"354,194",hidpi:"536,301",smallHidpi:"708,388"}[a]}:"A3"===t?n={resize:{default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"}[a]}:"A4"===t&&(n={resize:{default:"268,151",small:"354,194",hidpi:"536,302",smallHidpi:"708,388"}[a]}),"legacy-260"===t?n={resize:l[260][a]}:"legacy-260-173"===t&&(n={resize:l["260-173"][a]}),Object(C.addQueryArgs)(e,n)},r=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:420;return[{srcSet:"".concat(n(e,t,"default")," 1x, ").concat(n(e,t,"hidpi")," 2x"),media:"(min-width: ".concat(a,"px)")},{srcSet:"".concat(n(e,t,"small")," 1x, ").concat(n(e,t,"smallHidpi")," 2x"),media:"(max-width: ".concat(a,"px)")}]};return React.createElement(d.Fragment,null,""===l&&React.createElement(k.a,{sources:r(t,a)}),""!==l&&React.createElement("a",{href:l},React.createElement(k.a,{sources:r(t,a)})))},O=["image"],j=function(e){var t=e.img,a=e.size,l=e.slot,n=e.chartArt,r=e.dataHandler,i=e.display,c=e.className,s=i,o=function(e){var t=e.handler,r=e.open;return React.createElement("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",backgroundColor:"#f0f2f3"}},React.createElement("div",null,React.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},React.createElement(p.IconButton,{icon:"upload",label:"Select/Upload New Image",onClick:r}),React.createElement(p.IconButton,{icon:"trash",label:"Remove Image",onClick:function(){t({image:"",imageSlot:"disabled"})}}),React.createElement(d.Fragment,null,null!==n&&React.createElement(p.IconButton,{icon:"art",label:!0===n?"Disable Chart Art":"Enable Chart Art",onClick:function(){t({isChartArt:!n})}})))),null!==l&&React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement(p.SelectControl,{label:"Image Size",value:a,options:[{value:"A1",label:"A1"},{value:"A2",label:"A2"},{value:"A3",label:"A3"},{value:"A4",label:"A4"},{value:"legacy-260",label:"Legacy Homepage 260x260"},{value:"legacy-260-173",label:"Legacy Homepage 260x173"}],onChange:function(e){return t({imageSize:e})},style:{marginBottom:"0px"}})))};return React.createElement(u.MediaUploadCheck,null,React.createElement(u.MediaUpload,{onSelect:function(e){r("disabled"===l?{image:e.url,imageSlot:"default"}:{image:e.url})},allowedTypes:O,render:function(e){var l=e.open;return React.createElement(d.Fragment,null,""!==t&&React.createElement(d.Fragment,null,React.createElement("div",{className:c},React.createElement(s,{img:t,size:a,link:""}),React.createElement(o,{handler:r,open:l}))),""===t&&React.createElement("p",null,React.createElement(p.Button,{isPrimary:!0,onClick:l},"Insert Image")))}}))},z=function(e){var t=e.img,a=e.link,l=e.size,n=e.slot,r=e.chartArt,i=e.dataHandler,c=function(){var e=!1;return!1!==n&&("left"!==n&&"right"!==n||(e=!0)),R()({ui:!0,medium:e,image:!0,bordered:r})};return React.createElement(d.Fragment,null,!1===i&&React.createElement("div",{className:c()},React.createElement(S,{img:t,size:l,link:a})),!1!==i&&React.createElement(j,{img:t,slot:n,size:l,chartArt:r,dataHandler:i,display:S,className:c()}))};z.defaultProps={img:"",link:"",size:"A1",slot:!1,chartArt:!1,dataHandler:!1};var N=z,I=function(e){var t=e.content,a=e.enabled,l=e.setAttributes,n=e.sansSerif,r=R()("description",{"sans-serif":n});return React.createElement(d.Fragment,null,!0===a&&React.createElement(d.Fragment,null,!1!==l&&React.createElement(u.RichText,{tagName:"div",value:t,onChange:function(e){return l({excerpt:e})},placeholder:t,multiline:"p",className:r}),!1===l&&React.createElement(u.RichText.Content,{tagName:"div",value:t,className:r})))},H=function(e){var t=e.enabled,a=e.content,l=e.setAttributes,n=R()("extra");return React.createElement(d.Fragment,null,!1!==l&&!0===t&&React.createElement(u.RichText,{tagName:"ul",value:a,onChange:function(e){return l({extra:e})},placeholder:a,multiline:"li",className:n}),!1===l&&!0===t&&React.createElement(u.RichText.Content,{tagName:"ul",value:a,className:n}))},T=function(e){var t=e.title,a=e.label,l=e.date,n=e.link,r=e.enabled,i=e.size,c=e.taxonomy,s=e.setAttributes,o=i;return React.createElement(d.Fragment,null,!0===r&&React.createElement(d.Fragment,null,React.createElement(y.a.Meta,null,!1!==s&&React.createElement(w,{date:l,label:a,taxonomy:c,setAttributes:s}),!1===s&&React.createElement(x,{label:a,date:l})),React.createElement(y.a.Header,{className:i},!1!==s&&React.createElement(d.Fragment,null,React.createElement(u.BlockControls,null,React.createElement(p.Toolbar,{controls:["small","normal","large"].map((function(e){var t=!1;return e===o&&(t=!0),{icon:"editor-textcolor",title:"Size: ".concat(e),isActive:t,onClick:function(){s({headerSize:e})}}}))})),React.createElement(u.RichText,{tagName:"div",value:t,onChange:function(e){return s({title:e})},placeholder:"Title",multiline:"br"})),!1===s&&React.createElement((function(e){var t=e.title,a=e.link,l=e.as,n=void 0===l?"a":l;return React.createElement(u.RichText.Content,{href:a,tagName:n,value:t})}),{title:t,link:n,as:"a",size:i}))))},D=function(e){function t(e){var a;return Object(l.a)(this,t),a=Object(n.a)(this,Object(r.a)(t).call(this,e)),Object(s.a)(Object(i.a)(a),"item",(function(e){return React.createElement(y.a,{as:"article",className:e.classes},("top"===e.imageSlot||"left"===e.imageSlot)&&React.createElement(N,{img:e.image,size:e.imageSize,link:e.link,slot:e.imageSlot,chartArt:e.isChartArt,dataHandler:e.setAttributes}),React.createElement(y.a.Content,null,React.createElement(T,{title:e.title,date:e.date,label:e.label,link:e.link,setAttributes:e.setAttributes,enabled:e.enableHeader,size:e.headerSize,taxonomy:e.taxonomy}),"default"===e.imageSlot&&React.createElement(N,{img:e.image,size:e.imageSize,link:e.link,slot:e.imageSlot,chartArt:e.isChartArt,dataHandler:e.setAttributes}),React.createElement(I,{content:e.excerpt,enabled:e.enableExcerpt,setAttributes:e.setAttributes,sansSerif:!e.enableHeader}),React.createElement(H,{enabled:e.enableExtra,content:e.extra,setAttributes:e.setAttributes})),("bottom"===e.imageSlot||"right"===e.imageSlot)&&React.createElement(N,{img:e.image,size:e.imageSize,link:e.link,slot:e.imageSlot,chartArt:e.isChartArt,dataHandler:e.setAttributes}))})),a.item=a.item.bind(Object(i.a)(a)),a}return Object(c.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){void 0!==this.props.isSelected&&!0===this.props.isSelected||(this.props.setAttributes=!1),this.props.attributes.taxonomy="Formats",!0===this.props.attributes.enableProgramsTaxonomy&&(this.props.attributes.taxonomy="Programs");var e=!0;"left"!==this.props.attributes.imageSlot&&"right"!==this.props.attributes.imageSlot||(e=!1);var t=!1;!0===this.props.attributes.emphasis&&(t=!0),this.props.attributes.classes=R()(this.props.attributes.className,"story-item",{stacked:e,bordered:t});var a=this.props.attributes;return a.setAttributes=this.props.setAttributes,React.createElement(d.Fragment,null,React.createElement(this.item,a))}}]),t}(d.Component),P=function(e){function t(e){var a;return Object(l.a)(this,t),a=Object(n.a)(this,Object(r.a)(t).call(this,e)),Object(s.a)(Object(i.a)(a),"componentDidMount",(function(){a.setState({url:a.props.attributes.link})})),Object(s.a)(Object(i.a)(a),"setPostByURL",(function(){var e=a.props.setAttributes,t=a.props.attributes.link;void 0!==e&&void 0!==t&&g()({path:"/prc-api/v2/blocks/helpers/get-post-by-url/?url="+t+"&siteID="+function(e){console.log(e);var t=1;return e.includes(window.siteDomain+"/global/")?t=2:e.includes(window.siteDomain+"/hispanic/")?t=5:e.includes(window.siteDomain+"/science/")?t=16:e.includes(window.siteDomain+"/methods/")?t=10:e.includes(window.siteDomain+"/internet/")?t=9:e.includes("https://www.people-press.org/")?t=4:e.includes("https://www.pewforum.org/")?t=7:e.includes("https://www.journalism.org/")?t=8:e.includes("https://www.pewsocialtrends.org/")?t=3:(e.includes("https://www.pewresearch.org/")||e.includes(window.siteDomain))&&(t=1),t}(t)}).then((function(t){console.info("Post Returned:"),console.log(t),!1!==t&&e({title:t.title,image:t.image,excerpt:t.excerpt,link:t.link,label:t.label,date:t.date,postID:t.id,extra:""})}))})),Object(s.a)(Object(i.a)(a),"render",(function(){var e=a.props.setAttributes;return React.createElement(u.InspectorControls,null,React.createElement(p.PanelBody,{title:Object(o.__)("Story Item Options")},React.createElement("div",null,React.createElement(p.TextControl,{label:"Post ID",value:a.props.attributes.postID,disabled:!0})),React.createElement("div",{className:"story-item-link"},React.createElement("div",null,React.createElement(p.TextControl,{label:"Link",value:a.props.attributes.link,onChange:function(t){return e({link:t})}})),React.createElement("div",null,React.createElement(p.Button,{onClick:a.setPostByURL,isPrimary:!0},"Fetch"))),React.createElement("p",null,React.createElement("strong",null,"Content Options:")),React.createElement("div",null,React.createElement(p.ToggleControl,{label:a.props.attributes.enableHeader?"Header Enabled":"Header Disabled",checked:a.props.attributes.enableHeader,onChange:function(t){e({enableHeader:t})}})),React.createElement("div",null,React.createElement(p.ToggleControl,{label:a.props.attributes.enableExcerpt?"Excerpt Enabled":"Excerpt Disabled",checked:a.props.attributes.enableExcerpt,onChange:function(t){e({enableExcerpt:t})}})),React.createElement("div",null,React.createElement(p.ToggleControl,{label:a.props.attributes.enableExtra?"Extras Enabled":"Extras Disabled",checked:a.props.attributes.enableExtra,onChange:function(t){e({enableExtra:t})}})),React.createElement("div",null,React.createElement(p.ToggleControl,{label:a.props.attributes.emphasis?"Emphasis Enabled":"Emphasis Disabled",checked:a.props.attributes.emphasis,onChange:function(t){e({emphasis:t})}})),React.createElement("div",null,React.createElement(p.ToggleControl,{label:a.props.attributes.enableProgramsTaxonomy?"Programs":"Formats",checked:a.props.attributes.enableProgramsTaxonomy,onChange:function(t){e({enableProgramsTaxonomy:t})}}))))})),a.state={url:""},a.setPostByURL=a.setPostByURL.bind(Object(i.a)(a)),a}return Object(c.a)(t,e),t}(d.Component);Object(m.registerBlockType)("prc-block/story-item",{title:Object(o.__)("Story Item"),icon:"format-aside",category:"widgets",keywords:[Object(o.__)("prc"),Object(o.__)("story"),Object(o.__)("post"),Object(o.__)("story item")],styles:[{name:"disabled",label:"Image Disabled"},{name:"default",label:"Default Image Alignment",isDefault:!0},{name:"top",label:"Image Aligned Top"},{name:"bottom",label:"Image Aligned Bottom"},{name:"left",label:"Image Aligned Left"},{name:"right",label:"Image Aligned Right"}],supports:{html:!1},attributes:{title:{type:"string",default:"Title"},excerpt:{type:"string",source:"html",multiline:"p",selector:".description",default:"<p>Excerpt</p>"},extra:{type:"string",source:"html",multiline:"li",selector:".extra",default:""},link:{type:"string",default:""},label:{type:"string",default:"Report"},date:{type:"string",default:f().format("MMM D, YYYY")},image:{type:"string",default:""},imageSlot:{type:"string",default:"disabled"},imageSize:{type:"string",default:"A1"},isChartArt:{type:"boolean",default:!1},postID:{type:"integer"},emphasis:{type:"boolean",default:!1},horizontal:{type:"boolean",default:!1},stacked:{type:"boolean",default:!0},enableHeader:{type:"boolean",default:!0},enableExcerpt:{type:"boolean",default:!0},enableExtra:{type:"boolean",default:!1},enableProgramsTaxonomy:{type:"boolean",default:!1},headerSize:{type:"string",default:"normal"}},edit:function(e){return"is-style-default"===e.attributes.className?e.setAttributes({imageSlot:"default"}):"is-style-top"===e.attributes.className?e.setAttributes({imageSlot:"top"}):"is-style-bottom"===e.attributes.className?e.setAttributes({imageSlot:"bottom"}):"is-style-left"===e.attributes.className?e.setAttributes({imageSlot:"left"}):"is-style-right"===e.attributes.className?e.setAttributes({imageSlot:"right"}):"is-style-disabled"===e.attributes.className&&e.setAttributes({imageSlot:"disabled"}),console.log("StoryItem"),console.log(e),React.createElement(d.Fragment,null,!0===e.isSelected&&React.createElement(P,e),React.createElement(D,e))},save:function(e){return React.createElement(D,e)}})},30:function(e,t){e.exports=moment},33:function(e,t){e.exports=wp.i18n},43:function(e,t){e.exports=ReactDOM},6:function(e,t){e.exports=wp.element},77:function(e,t){e.exports=lodash},9:function(e,t){e.exports=wp.components}},[[131,1,2]]]);
//# sourceMappingURL=main-cf39836e.js.map