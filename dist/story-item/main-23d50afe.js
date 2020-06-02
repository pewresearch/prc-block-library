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
(window["wpackioprcBlocksLibrarystory-itemJsonp"]=window["wpackioprcBlocksLibrarystory-itemJsonp"]||[]).push([[0],{0:function(e,t){e.exports=React},110:function(e,t){e.exports=wp.blocks},111:function(e,t){e.exports=wp.apiFetch},113:function(e,t){e.exports=wp.url},12:function(e,t){e.exports=wp.blockEditor},135:function(e,t,a){a(136),e.exports=a(261)},137:function(e,t,a){},260:function(e,t,a){},261:function(e,t,a){"use strict";a.r(t);var l=a(125),n=a(110),r=a(31),i=a(30),c=a(26),s=a(18),o=a(29),u=a(27),m=a(21),d=a(19),p=a(12),b=a(9),g=a(6),f=a(111),h=a.n(f),E=function(e,t){void 0===t&&(t=25);var a=new wp.api.collections[e];return void 0!==a&&new Promise((function(l){var n={};a.fetch({data:{hide_empty:!1,per_page:t}}).then((function(t){for(var a=0;a<t.length;a++){var r=t[a].slug.replace("".concat(e.toLowerCase(),"_"),"");n[t[a].id]={id:t[a].id,name:t[a].name,slug:r}}l(n)}))}))},R=a(28),v=a.n(R),y=function(e){var t=e.label,a=void 0===t?"Report":t,l=e.date,n=a.replace(/\s+/g,"-").toLowerCase(),r=v()(n,"label"),c=i(l).format("MMM D, YYYY");return React.createElement(g.Fragment,null,React.createElement("span",{className:r},a||"Report")," | ",React.createElement("span",{classNmae:"date"},c))},w=a(268),x=Object(w.a)({labelOptions:[]})((function(e){var t=e.label,a=e.date,l=e.taxonomy,n=e.setAttributes,r=e.setState,i=e.labelOptions;return Object(g.useEffect)((function(){(function(e,t){return new Promise((function(a){E(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(a){var l=e[a];t.push({value:l.name,label:l.name})})),t.sort((function(e,t){return e.label>t.label?1:-1})),a(t)}))}))})(l).then((function(e){return r({labelOptions:e})}))}),[l]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(b.SelectControl,{value:t,options:i,onChange:function(e){n({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(b.TextControl,{value:a,onChange:function(e){n({date:e})}})))})),k=(a(137),a(81)),A=a(113),C=function(e){var t=e.img,a=e.size,l=e.link,n=function(e,t,a){if(""===e||!1===e)return e;var l={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},n={resize:{default:"564,317",small:"354,194",hidpi:"1128,634",smallHidpi:"708,388"}[a]};return"A2"===t?n={resize:{default:"268,151",small:"354,194",hidpi:"536,301",smallHidpi:"708,388"}[a]}:"A3"===t?n={resize:{default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"}[a]}:"A4"===t?n={resize:{default:"268,151",small:"354,194",hidpi:"536,302",smallHidpi:"708,388"}[a]}:"XL"===t&&(n={resize:{default:"720,405",small:"354,194",hidpi:"1440,810",smallHidpi:"708,388"}[a]}),"legacy-260"===t?n={resize:l[260][a]}:"legacy-260-173"===t&&(n={resize:l["260-173"][a]}),Object(A.addQueryArgs)(e,n)},r=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:420;return[{srcSet:"".concat(n(e,t,"default")," 1x, ").concat(n(e,t,"hidpi")," 2x"),media:"(min-width: ".concat(a,"px)")},{srcSet:"".concat(n(e,t,"small")," 1x, ").concat(n(e,t,"smallHidpi")," 2x"),media:"(max-width: ".concat(a,"px)")}]};return React.createElement(g.Fragment,null,""===l&&React.createElement(k.a,{sources:r(t,a)}),""!==l&&React.createElement("a",{href:l},React.createElement(k.a,{sources:r(t,a)})))},S=["image"],N=function(e){var t=e.img,a=e.size,l=e.slot,n=e.chartArt,r=e.dataHandler,i=function(e){var t=e.handler,r=e.open;return React.createElement("div",{className:"image-editor-toolbar"},React.createElement("div",null,React.createElement("div",{style:{display:"flex",flexWrap:"wrap"}},React.createElement(b.IconButton,{icon:"upload",label:"Select/Upload New Image",onClick:r}),React.createElement(b.IconButton,{icon:"trash",label:"Remove Image",onClick:function(){t({image:"",imageSlot:"disabled"})}}),React.createElement(g.Fragment,null,null!==n&&React.createElement(b.IconButton,{icon:"art",label:!0===n?"Disable Chart Art":"Enable Chart Art",onClick:function(){t({isChartArt:!n})}})))),null!==l&&React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement(b.SelectControl,{label:"Image Size",value:a,options:[{value:"XL",label:"XL"},{value:"A1",label:"A1"},{value:"A2",label:"A2"},{value:"A3",label:"A3"},{value:"A4",label:"A4"},{value:"legacy-260",label:"Legacy Homepage 260x260"},{value:"legacy-260-173",label:"Legacy Homepage 260x173"}],onChange:function(e){return t({imageSize:e})},style:{marginBottom:"0px",maxWidth:"140px"}})))};return React.createElement(p.MediaUploadCheck,null,React.createElement(p.MediaUpload,{onSelect:function(e){r("disabled"===l?{image:e.url,imageSlot:"default"}:{image:e.url})},allowedTypes:S,render:function(e){var a=e.open;return React.createElement(g.Fragment,null,""!==t&&React.createElement(i,{handler:r,open:a}),""===t&&React.createElement("p",null,React.createElement(b.Button,{isPrimary:!0,onClick:a},"Insert Image")))}}))},z=function(e){var t,a,l,n,r,i,c=e.img,s=e.link,o=e.size,u=e.slot,m=e.chartArt,d=e.dataHandler;return React.createElement("div",{className:(t=!1,a=!1,l=!1,n=!1,r=!1,i=!1,!1!==u&&("XL"===o?a=!0:"A1"===o?l=!0:"A2"===o?n=!0:"A3"===o?r=!0:"A4"===o?i=!0:"left"!==u&&"right"!==u||(t=!0)),v()({ui:!0,XL:a,A1:l,A2:n,A3:r,A4:i,medium:t,image:!0,bordered:m}))},React.createElement(C,{img:c,size:o,link:!1!==d?"":s}),!1!==d&&React.createElement(N,{img:c,slot:u,size:o,chartArt:m,dataHandler:d}))};z.defaultProps={img:"",link:"",size:"A1",slot:!1,chartArt:!1,dataHandler:!1};var B=z,O=a(267),D=function(e){var t=e.content,a=e.sansSerif,l=e.enabled,n=e.setAttributes;if(!0!==l)return React.createElement(g.Fragment,null);var r=v()("description",{"sans-serif":a});return React.createElement(g.Fragment,null,!1!==n&&React.createElement(p.RichText,{tagName:"div",value:t,onChange:function(e){return n({excerpt:e})},placeholder:t,multiline:"p",className:r}),!1===n&&React.createElement(p.RichText.Content,{tagName:"div",value:t,className:r}))},T=function(e){var t=e.content,a=e.breakingNews,l=e.enabled,n=e.setAttributes;return!0!==l?React.createElement(g.Fragment,null):React.createElement(g.Fragment,null,!1!==n&&React.createElement(p.RichText,{tagName:"ul",value:t,onChange:function(e){return n({extra:e})},placeholder:t,multiline:"li",className:"extra"}),!1===n&&React.createElement(p.RichText.Content,{tagName:"ul",value:t,className:"extra"}),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))},H=function(e){var t=e.title,a=e.link,l=e.as,n=void 0===l?"a":l;return React.createElement(p.RichText.Content,{href:a,tagName:n,value:t})},j=function(e){var t=e.title,a=e.label,l=e.date,n=e.link,r=e.size,i=e.enabled,c=e.taxonomy,s=e.setAttributes;if(!0!==i)return React.createElement(g.Fragment,null);var o=r;return React.createElement(g.Fragment,null,React.createElement(O.a.Meta,null,!1!==s&&React.createElement(x,{date:l,label:a,taxonomy:c,setAttributes:s}),!1===s&&React.createElement(y,{label:a,date:l})),React.createElement(O.a.Header,{className:r},!1!==s&&React.createElement(g.Fragment,null,React.createElement(p.BlockControls,null,React.createElement(b.Toolbar,{controls:["small","normal","large"].map((function(e){var t=!1;return e===o&&(t=!0),{icon:"editor-textcolor",title:"Size: ".concat(e),isActive:t,onClick:function(){s({headerSize:e})}}}))})),React.createElement(p.RichText,{tagName:"div",value:t,onChange:function(e){return s({title:e})},placeholder:"Title",multiline:"br"})),!1===s&&React.createElement(H,{title:t,link:n,as:"a",size:r})))},I=(a(260),function(e){void 0!==e.isSelected&&!0===e.isSelected||(e.setAttributes=!1),e.attributes.taxonomy="Formats",!0===e.attributes.enableProgramsTaxonomy&&(e.attributes.taxonomy="Programs");var t=!0;"left"!==e.attributes.imageSlot&&"right"!==e.attributes.imageSlot||(t=!1);var a=!1;!0===e.attributes.emphasis&&(a=!0),e.attributes.classes=v()(e.attributes.className,"story-item",{stacked:t,bordered:a});var l=e.attributes;return l.setAttributes=e.setAttributes,React.createElement(O.a,{as:"article",className:l.classes},("top"===l.imageSlot||"left"===l.imageSlot)&&React.createElement(B,{img:l.image,size:l.imageSize,link:l.link,slot:l.imageSlot,chartArt:l.isChartArt,dataHandler:l.setAttributes}),React.createElement(O.a.Content,null,React.createElement(j,{title:l.title,date:l.date,label:l.label,link:l.link,setAttributes:l.setAttributes,enabled:l.enableHeader,size:l.headerSize,taxonomy:l.taxonomy}),"default"===l.imageSlot&&React.createElement(B,{img:l.image,size:l.imageSize,link:l.link,slot:l.imageSlot,chartArt:l.isChartArt,dataHandler:l.setAttributes}),React.createElement(D,{content:l.excerpt,enabled:l.enableExcerpt,setAttributes:l.setAttributes,sansSerif:!l.enableHeader}),React.createElement(T,{enabled:l.enableExtra,content:l.extra,setAttributes:l.setAttributes,breakingNews:l.enableBreakingNews})),("bottom"===l.imageSlot||"right"===l.imageSlot)&&React.createElement(B,{img:l.image,size:l.imageSize,link:l.link,slot:l.imageSlot,chartArt:l.isChartArt,dataHandler:l.setAttributes}))});function P(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,l=Object(m.a)(e);if(t){var n=Object(m.a)(this).constructor;a=Reflect.construct(l,arguments,n)}else a=l.apply(this,arguments);return Object(u.a)(this,a)}}var L=function(e){Object(o.a)(a,e);var t=P(a);function a(e){var l;return Object(c.a)(this,a),l=t.call(this,e),Object(d.a)(Object(s.a)(l),"componentDidMount",(function(){l.setState({url:l.props.attributes.link})})),Object(d.a)(Object(s.a)(l),"setPostByURL",(function(){var e=l.props.setAttributes,t=l.props.attributes.link;void 0!==e&&void 0!==t&&h()({path:"/prc-api/v2/blocks/helpers/get-post-by-url/?url=".concat(t,"&siteID=").concat(function(e){var t=1;return e.includes("".concat(window.siteDomain,"/global/"))?t=2:e.includes("".concat(window.siteDomain,"/hispanic/"))?t=5:e.includes("".concat(window.siteDomain,"/science/"))?t=16:e.includes("".concat(window.siteDomain,"/methods/"))?t=10:e.includes("".concat(window.siteDomain,"/internet/"))?t=9:e.includes("https://www.people-press.org/")?t=4:e.includes("https://www.pewforum.org/")?t=7:e.includes("https://www.journalism.org/")?t=8:e.includes("https://www.pewsocialtrends.org/")?t=3:(e.includes("https://www.pewresearch.org/")||e.includes(window.siteDomain))&&(t=1),t}(t))}).then((function(t){!1!==t&&e({title:t.title,image:t.image,excerpt:t.excerpt,link:t.link,label:t.label,date:t.date,postID:t.id,extra:""})}))})),Object(d.a)(Object(s.a)(l),"render",(function(){var e=l.props.setAttributes;return React.createElement(p.InspectorControls,null,React.createElement(b.PanelBody,{title:Object(r.__)("Story Item Options")},React.createElement("div",null,React.createElement(b.TextControl,{label:"Post ID",value:l.props.attributes.postID,disabled:!0})),React.createElement("div",{className:"story-item-link"},React.createElement("div",null,React.createElement(b.TextControl,{label:"Link",value:l.props.attributes.link,onChange:function(t){return e({link:t})}})),React.createElement("div",null,React.createElement(b.Button,{onClick:l.setPostByURL,isPrimary:!0},"Fetch"))),React.createElement("p",null,React.createElement("strong",null,"Content Options:")),React.createElement("div",null,React.createElement(b.ToggleControl,{label:l.props.attributes.enableHeader?"Header Enabled":"Header Disabled",checked:l.props.attributes.enableHeader,onChange:function(t){e({enableHeader:t})}})),React.createElement("div",null,React.createElement(b.ToggleControl,{label:l.props.attributes.enableExcerpt?"Excerpt Enabled":"Excerpt Disabled",checked:l.props.attributes.enableExcerpt,onChange:function(t){e({enableExcerpt:t})}})),React.createElement("div",null,React.createElement(b.ToggleControl,{label:l.props.attributes.enableExtra?"Extras Enabled":"Extras Disabled",checked:l.props.attributes.enableExtra,onChange:function(t){e({enableExtra:t})}})),React.createElement("div",null,React.createElement(b.ToggleControl,{label:l.props.attributes.enableBreakingNews?"Breaking News Enabled":"Breaking News Disabled",checked:l.props.attributes.enableBreakingNews,onChange:function(t){!1!==window.prcBreakingNews?e({enableBreakingNews:t}):(alert("There are no currently active breaking news events, this will be set to false automatically."),e({enableBreakingNews:!1}))}})),React.createElement("div",null,React.createElement(b.ToggleControl,{label:l.props.attributes.emphasis?"Emphasis Enabled":"Emphasis Disabled",checked:l.props.attributes.emphasis,onChange:function(t){e({emphasis:t})}})),React.createElement("div",null,React.createElement(b.ToggleControl,{label:l.props.attributes.enableProgramsTaxonomy?"Programs":"Formats",checked:l.props.attributes.enableProgramsTaxonomy,onChange:function(t){e({enableProgramsTaxonomy:t})}}))))})),l.state={url:""},l.setPostByURL=l.setPostByURL.bind(Object(s.a)(l)),l}return a}(g.Component),_=function(e){return"is-style-default"===e.attributes.className?e.setAttributes({imageSlot:"default"}):"is-style-top"===e.attributes.className?e.setAttributes({imageSlot:"top"}):"is-style-bottom"===e.attributes.className?e.setAttributes({imageSlot:"bottom"}):"is-style-left"===e.attributes.className?e.setAttributes({imageSlot:"left"}):"is-style-right"===e.attributes.className?e.setAttributes({imageSlot:"right"}):"is-style-disabled"===e.attributes.className?e.setAttributes({imageSlot:"disabled"}):e.setAttributes({imageSlot:"default"}),React.createElement(g.Fragment,null,!0===e.isSelected&&React.createElement(L,e),React.createElement(I,e))},F=function(e){return React.createElement(I,e)},M=["prc-block/story-item",{title:Object(r.__)("Story Item"),icon:"format-aside",category:"widgets",keywords:[Object(r.__)("prc"),Object(r.__)("story"),Object(r.__)("post"),Object(r.__)("story item")],styles:[{name:"disabled",label:"Image Disabled"},{name:"default",label:"Default Image Alignment",isDefault:!0},{name:"top",label:"Image Aligned Top"},{name:"bottom",label:"Image Aligned Bottom"},{name:"left",label:"Image Aligned Left"},{name:"right",label:"Image Aligned Right"}],example:{attributes:{title:"Ultricies Ipsum Nibh Egestas Purus",excerpt:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>",extra:"<li></li>",link:"#",label:"Report",date:i().format("MM-DD-YYYY"),image:"https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg",imageSlot:"top",imageSize:"A2"}},supports:{html:!1},attributes:{title:{type:"string",default:"Title"},excerpt:{type:"string",source:"html",multiline:"p",selector:".description",default:"<p>Excerpt</p>"},extra:{type:"string",source:"html",multiline:"li",selector:".extra",default:""},link:{type:"string",default:""},label:{type:"string",default:"Report"},date:{type:"string"},image:{type:"string",default:""},imageSlot:{type:"string",default:"disabled"},imageSize:{type:"string",default:"A1"},isChartArt:{type:"boolean",default:!1},postID:{type:"integer"},emphasis:{type:"boolean",default:!1},horizontal:{type:"boolean",default:!1},stacked:{type:"boolean",default:!0},enableHeader:{type:"boolean",default:!0},enableExcerpt:{type:"boolean",default:!0},enableExtra:{type:"boolean",default:!1},enableBreakingNews:{type:"boolean",default:!1},enableProgramsTaxonomy:{type:"boolean",default:!1},headerSize:{type:"string",default:"normal"}},edit:_,save:F}];n.registerBlockType.apply(void 0,Object(l.a)(M))},30:function(e,t){e.exports=moment},31:function(e,t){e.exports=wp.i18n},44:function(e,t){e.exports=ReactDOM},6:function(e,t){e.exports=wp.element},78:function(e,t){e.exports=lodash},9:function(e,t){e.exports=wp.components}},[[135,1,2]]]);
//# sourceMappingURL=main-23d50afe.js.map