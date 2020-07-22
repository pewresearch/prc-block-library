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
(window["wpackioprcBlocksLibrarystory-itemJsonp"]=window["wpackioprcBlocksLibrarystory-itemJsonp"]||[]).push([[0],{0:function(e,t){e.exports=React},10:function(e,t){e.exports=wp.components},11:function(e,t){e.exports=wp.blockEditor},124:function(e,t){e.exports=wp.blocks},126:function(e,t){e.exports=wp.url},138:function(e,t){e.exports=wp.htmlEntities},150:function(e,t,a){a(151),e.exports=a(276)},274:function(e,t,a){},275:function(e,t,a){},276:function(e,t,a){"use strict";a.r(t);var l=a(140),n=a(124),r=a(29),i=a(28),c=a(6),o=a(31),s=a.n(o),m=function(e,t,a){void 0===t&&(t=25);var l=new wp.api.collections[e];return void 0!==a?new Promise((function(e){s()({path:"/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=topic&letter=".concat(a)}).then((function(t){e(t)}))})):void 0!==l&&new Promise((function(a){var n={};l.fetch({data:{hide_empty:!1,per_page:t}}).then((function(t){for(var l=0;l<t.length;l++){var r=t[l].slug.replace("".concat(e.toLowerCase(),"_"),"");n[t[l].id]={id:t[l].id,name:t[l].name,slug:r}}a(n)}))}))},u=a(19),d=function(e,t,a,l,n){e===t&&n(Object(u.a)({},a,l))},p=a(26),g=a.n(p),b=a(281),h=a(65),f=a(126),v=function(e){var t=e.img,a=e.size,l=e.link,n=e.onClick,r=void 0!==n&&n,i=function(e,t,a){if(""===e||!1===e)return e;var l={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},n={resize:{default:"564,317",small:"354,194",hidpi:"1128,634",smallHidpi:"708,388"}[a]};return"A2"===t?n={resize:{default:"268,151",small:"354,194",hidpi:"536,301",smallHidpi:"708,388"}[a]}:"A3"===t?n={resize:{default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"}[a]}:"A4"===t?n={resize:{default:"268,151",small:"354,194",hidpi:"536,302",smallHidpi:"708,388"}[a]}:"XL"===t&&(n={resize:{default:"720,405",small:"354,194",hidpi:"1440,810",smallHidpi:"708,388"}[a]}),"legacy-260"===t?n={resize:l[260][a]}:"legacy-260-173"===t&&(n={resize:l["260-173"][a]}),Object(f.addQueryArgs)(e,n)},o=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:420;return[{srcSet:"".concat(i(e,t,"default")," 1x, ").concat(i(e,t,"hidpi")," 2x"),media:"(min-width: ".concat(a,"px)")},{srcSet:"".concat(i(e,t,"small")," 1x, ").concat(i(e,t,"smallHidpi")," 2x"),media:"(max-width: ".concat(a,"px)")}]};return!1!==r?React.createElement("div",{onClick:r},React.createElement(h.a,{sources:o(t,a)})):React.createElement(c.Fragment,null,""===l&&React.createElement(h.a,{sources:o(t,a)}),""!==l&&React.createElement("a",{href:l},React.createElement(h.a,{sources:o(t,a)})))},E=a(41),R=a(10),w=a(11),x=["image"],y=function(e){var t=e.img,a=e.size,l=e.chartArt,n=e.postId,r=e.setAttributes,i=Object(c.useState)(!1),o=Object(E.a)(i,2),m=o[0],u=o[1];return Object(c.useEffect)((function(){0!==n&&s()({path:"/prc-api/v2/get-art/?postId=".concat(n)}).then((function(e){!1!==e?(u(e),r({image:e[a].rawUrl})):u(!1)}))}),[n]),Object(c.useEffect)((function(){!1!==m&&void 0!==m[a]&&(console.log("image size changed, go get correct art from art store!"),r({image:m[a].rawUrl,isChartArt:m[a].chartArt}))}),[m,a]),React.createElement(w.MediaUploadCheck,null,React.createElement(w.MediaUpload,{onSelect:function(e){return r({image:e.url})},allowedTypes:x,render:function(e){var n=e.open;return React.createElement(c.Fragment,null,""===t&&React.createElement(R.Button,{isPrimary:!0,onClick:n},"Insert Image"),""!==t&&React.createElement(v,{img:t,size:a,link:"",onClick:n}),React.createElement(w.BlockControls,null,React.createElement(R.Toolbar,{controls:[{icon:null,title:"Size",isActive:!1,children:React.createElement(R.SelectControl,{value:a,options:[{value:"XL",label:"XL"},{value:"A1",label:"A1"},{value:"A2",label:"A2"},{value:"A3",label:"A3"},{value:"A4",label:"A4"},{value:"legacy-260",label:"Legacy Homepage 260x260"},{value:"legacy-260-173",label:"Legacy Homepage 260x173"}],onChange:function(e){return r({imageSize:e})},style:{margin:"3px"}}),onClick:null},{icon:"chart-pie",title:"Chartart",isActive:l,onClick:function(){r({isChartArt:!l})}}]})))}}))},k=function(e){var t,a,l,n,r,i,c=e.img,o=e.link,s=e.size,m=e.slot,u=e.chartArt,d=e.postId,p=e.setAttributes;return React.createElement("div",{className:(t=!1,a=!1,l=!1,n=!1,r=!1,i=!1,!1!==m&&("XL"===s?a=!0:"A1"===s?l=!0:"A2"===s?n=!0:"A3"===s?r=!0:"A4"===s?i=!0:"left"!==m&&"right"!==m||(t=!0)),g()({ui:!0,XL:a,A1:l,A2:n,A3:r,A4:i,medium:t,image:!0,bordered:u}))},!1===p&&React.createElement(v,{img:c,size:s,link:!1!==p?"":o}),!1!==p&&React.createElement(y,{img:c,size:s,chartArt:u,postId:d,setAttributes:p}))},A=function(e){var t=e.content,a=e.sansSerif,l=e.enabled,n=e.setAttributes;if(!0!==l)return React.createElement(c.Fragment,null);var r=g()("description",{"sans-serif":a});return React.createElement(c.Fragment,null,!1!==n&&React.createElement(w.RichText,{tagName:"div",value:t,onChange:function(e){return n({excerpt:e})},placeholder:t,multiline:"p",className:r}),!1===n&&React.createElement(w.RichText.Content,{tagName:"div",value:t,className:r}))},C=function(e){var t=e.content,a=e.breakingNews,l=e.enabled,n=e.setAttributes;return!0!==l?React.createElement(c.Fragment,null):React.createElement(c.Fragment,null,!1!==n&&React.createElement(w.RichText,{tagName:"ul",value:t,onChange:function(e){return n({extra:e})},placeholder:t,multiline:"li",className:"extra"}),!1===n&&React.createElement(w.RichText.Content,{tagName:"ul",value:t,className:"extra"}),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))},S=function(e){var t=e.label,a=void 0===t?"Report":t,l=e.date,n=a.replace(/\s+/g,"-").toLowerCase(),r=g()(n,"label"),o=i(l).format("MMM D, YYYY");return React.createElement(c.Fragment,null,React.createElement("span",{className:r},a||"Report")," | ",React.createElement("span",{className:"date"},o))},z=a(282),N=Object(z.a)({labelOptions:[]})((function(e){var t=e.label,a=e.date,l=e.taxonomy,n=e.setAttributes,r=e.setState,i=e.labelOptions;return Object(c.useEffect)((function(){(function(e,t){return new Promise((function(a){m(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(a){var l=e[a];t.push({value:l.name,label:l.name})})),t.sort((function(e,t){return e.label>t.label?1:-1})),a(t)}))}))})(l).then((function(e){r({labelOptions:e})}))}),[l]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(R.SelectControl,{value:t,options:i,onChange:function(e){n({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(R.TextControl,{value:a,onChange:function(e){n({date:e})}})))}));function H(e){var t=e.level,a=e.isPressed,l=void 0!==a&&a,n={1:"M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z",2:"M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z",3:"M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z",4:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z",5:"M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z",6:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z"};return n.hasOwnProperty(t)?React.createElement(R.SVG,{width:"24",height:"24",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",isPressed:l},React.createElement(R.Path,{d:n[t]})):null}var O=function(e){var t=e.title,a=e.label,l=e.date,n=e.link,r=e.size,i=e.enabled,o=e.taxonomy,s=e.setAttributes;return!0!==i?React.createElement(c.Fragment,null):React.createElement(c.Fragment,null,React.createElement(b.a.Meta,null,!1!==s&&React.createElement(N,{date:l,label:a,taxonomy:o,setAttributes:s}),!1===s&&React.createElement(S,{label:a,date:l})),React.createElement(b.a.Header,{className:r},!1!==s&&React.createElement(c.Fragment,null,React.createElement(w.BlockControls,null,React.createElement(R.Toolbar,{controls:[{icon:React.createElement(H,{level:1,isPressed:"large"===r}),title:"Size: Large",isActive:"large"===r,onClick:function(){s({headerSize:"large"})}},{icon:React.createElement(H,{level:2,isPressed:"medium"===r||"normal"===r}),title:"Size: Medium",isActive:"medium"===r,onClick:function(){s({headerSize:"medium"})}},{icon:React.createElement(H,{level:3,isPressed:"small"===r}),title:"Size: Small",isActive:"small"===r,onClick:function(){s({headerSize:"small"})}}]})),React.createElement(w.RichText,{tagName:"div",value:t,onChange:function(e){return s({title:e})},allowedFormats:["bold","italic"],placeholder:"Title",multiline:"br"})),!1===s&&React.createElement("a",{href:n},React.createElement(c.RawHTML,null,t))))},D=(a(274),function(e){var t=e.title,a=e.excerpt,l=e.extra,n=e.link,r=e.label,i=e.date,c=e.image,o=e.imageSlot,s=e.imageSize,m=e.isChartArt,u=e.postID,d=e.headerSize,p=e.enableEmphasis,h=e.enableHeader,f=e.enableExcerpt,v=e.enableExtra,E=e.enableBreakingNews,R=e.enableProgramsTaxonomy,w=e.className,x=e.isSelected,y="Formats";!0===R&&(y="Programs");var S=!0;"left"!==o&&"right"!==o||(S=!1);var z=e.setAttributes;x||(z=!1);var N=g()(w,"story-item",{stacked:S,bordered:p});return React.createElement(b.a,{as:"article",className:N},("top"===o||"left"===o)&&React.createElement(k,{img:c,size:s,link:n,slot:o,chartArt:m,postId:u,setAttributes:z}),React.createElement(b.a.Content,null,React.createElement(O,{enabled:h,title:t,date:i,label:r,link:n,size:d,taxonomy:y,setAttributes:z}),"default"===o&&React.createElement(k,{img:c,size:s,link:n,slot:o,chartArt:m,postId:u,setAttributes:z}),React.createElement(A,{enabled:f,content:a,sansSerif:!h,setAttributes:z}),React.createElement(C,{enabled:v,content:l,breakingNews:E,setAttributes:z})),("bottom"===o||"right"===o)&&React.createElement(k,{img:c,size:s,link:n,slot:o,chartArt:m,postId:u,setAttributes:z}))}),T=(a(275),a(89),a(138)),I=a(139),j=(Object(z.a)({termsData:[],excludeData:[],includeData:[]})((function(e){var t=e.termsData,a=e.excludeData,l=e.includeData,n=e.setState,r=e.exclude,i=e.include,o=e.letter,s=e.taxonomy,u=e.setAttributes,d=e.isSelected,p=function(){m(s,100,o).then((function(e){n({termsData:e}),function(e){var t={};if(0!==e.length&&0!==r.length&&(t.excludeData=JSON.parse(r)),0!==e.length&&0===i.length){var a=[];e.map((function(e){a.push({id:e.term_id,name:e.name,slug:e.slug})})),u({include:JSON.stringify(a)}),t.includeData=a}else 0!==e.length&&0!==i.length&&(t.includeData=JSON.parse(i));n(t)}(e)}))};!1!==u&&Object(I.a)((function(){0===t.length&&p()}));var g=0!==i.length&&!1===u&&JSON.parse(i);return React.createElement("div",{className:"ui link list"},!1!==g&&React.createElement(c.Fragment,null,g.map((function(e){return React.createElement("a",{className:"item",href:"/".concat(s.toLowerCase(),"/").concat(e.slug)},e.name)}))),!1!==u&&React.createElement(c.Fragment,null,t.map((function(e){var t=r.includes(e.term_id);return React.createElement("div",{className:"item"},React.createElement(R.CheckboxControl,{label:Object(T.decodeEntities)(e.name),checked:t,onChange:function(t){var n,r,i,c,o,s,m;n=t,r=e.term_id,i=e.name,c=e.slug,s=a,m=l,!0===n?(s.push(r),-1!==(o=m.findIndex((function(e){return e.id===r})))&&m.splice(o,1)):(m.push({id:r,name:i,slug:c}),function(){var e=s.indexOf(r);-1!==e&&s.splice(e,1)}()),u({exclude:JSON.stringify(s),include:JSON.stringify(m)})},"data-termid":e.term_id,"data-term":e.name}),React.createElement("div",{style:{height:"15px",marginTop:"-5px"}},!0===d&&React.createElement("pre",{style:{fontSize:"11px",margin:0}},"(",e.slug,")")))}))))})),function(e){var t=e.postID,a=e.link,l=e.enableHeader,n=e.enableExcerpt,i=e.enableExtra,o=e.enableBreakingNews,m=e.enableEmphasis,u=e.enableProgramsTaxonomy,d=e.setAttributes,p=Object(c.useState)(a),g=Object(E.a)(p,2),b=g[0],h=g[1];return React.createElement(w.InspectorControls,null,React.createElement(R.PanelBody,{title:Object(r.__)("Story Item Options")},React.createElement("div",null,React.createElement(R.TextControl,{label:"Post ID",value:t,disabled:!0})),React.createElement("div",{className:"story-item-link"},React.createElement("div",null,React.createElement(R.TextControl,{label:"Link",value:b,onChange:function(e){h(e),d({link:e})}})),React.createElement("div",null,React.createElement(R.Button,{onClick:function(){return function(e,t){if(void 0!==t&&void 0!==e){var a,l,n;s()({path:"/prc-api/v2/blocks/helpers/get-post-by-url/?url=".concat(e,"&siteID=").concat((a=e,l=window.siteDomain,n=1,a.includes("".concat(l,"/global/"))?n=2:a.includes("".concat(l,"/hispanic/"))?n=5:a.includes("".concat(l,"/science/"))?n=16:a.includes("".concat(l,"/methods/"))?n=10:a.includes("".concat(l,"/internet/"))?n=9:a.includes("".concat(l,"/politics/"))?n=4:a.includes("https://www.pewforum.org/")?n=7:a.includes("https://www.journalism.org/")?n=8:a.includes("https://www.pewsocialtrends.org/")?n=3:(a.includes("https://www.pewresearch.org/")||a.includes(l))&&(n=1),n))}).then((function(e){if(!1!==e){var a={title:e.title,excerpt:e.excerpt,link:e.link,label:e.label,date:e.date,postID:e.id,extra:""};e.art||(a.image=e.image),t(a)}}))}}(a,d)},isPrimary:!0,style:{height:"30px"}},"Fetch"))),React.createElement("p",null,React.createElement("strong",null,"Content Options:")),React.createElement("div",null,React.createElement(R.ToggleControl,{label:l?"Header Enabled":"Header Disabled",checked:l,onChange:function(){d({enableHeader:!l})}})),React.createElement("div",null,React.createElement(R.ToggleControl,{label:n?"Excerpt Enabled":"Excerpt Disabled",checked:n,onChange:function(){d({enableExcerpt:!n})}})),React.createElement("div",null,React.createElement(R.ToggleControl,{label:i?"Extras Enabled":"Extras Disabled",checked:i,onChange:function(){d({enableExtra:!i})}})),React.createElement("div",null,React.createElement(R.ToggleControl,{label:o?"Breaking News Enabled":"Breaking News Disabled",checked:o,onChange:function(){!1!==window.prcBreakingNews?d({enableBreakingNews:!o}):(alert("There are no currently active, authorized, breaking news events. The breaking news toggle will be set back to false."),d({enableBreakingNews:!1}))}})),React.createElement("div",null,React.createElement(R.ToggleControl,{label:m?"Emphasis Enabled":"Emphasis Disabled",checked:m,onChange:function(){d({enableEmphasis:!m})}})),React.createElement("div",null,React.createElement(R.ToggleControl,{label:u?"Programs":"Formats",checked:u,onChange:function(){d({enableProgramsTaxonomy:!u})}}))))}),B=function(e){var t=e.attributes,a=e.setAttributes,l=e.isSelected;!function(e,t){d("is-style-top",e,"imageSlot","top",t),d("is-style-bottom",e,"imageSlot","bottom",t),d("is-style-left",e,"imageSlot","left",t),d("is-style-right",e,"imageSlot","right",t),d("is-style-disabled",e,"imageSlot","disabled",t),d("",e,"imageSlot","default",t)}(t.className,a);var n=t;return n.isSelected=l,n.setAttributes=a,React.createElement(c.Fragment,null,!0===l&&React.createElement(j,n),React.createElement(D,n))},P=function(e){var t=e.attributes;return t.isSelected=!1,React.createElement(D,t)},_=["prc-block/story-item",{title:Object(r.__)("Story Item"),icon:"format-aside",category:"widgets",keywords:[Object(r.__)("prc"),Object(r.__)("story"),Object(r.__)("post"),Object(r.__)("story item")],styles:[{name:"disabled",label:"Image Disabled"},{name:"default",label:"Default Image Alignment",isDefault:!0},{name:"top",label:"Image Aligned Top"},{name:"bottom",label:"Image Aligned Bottom"},{name:"left",label:"Image Aligned Left"},{name:"right",label:"Image Aligned Right"}],example:{attributes:{title:"Ultricies Ipsum Nibh Egestas Purus",excerpt:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>",extra:"<li></li>",link:"#",label:"Report",date:i().format("MM-DD-YYYY"),image:"https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg",imageSlot:"top",imageSize:"A2"}},supports:{html:!1},attributes:{title:{type:"string",default:"Title"},excerpt:{type:"string",source:"html",multiline:"p",selector:".description",default:"<p>Excerpt</p>"},extra:{type:"string",source:"html",multiline:"li",selector:".extra",default:""},link:{type:"string",default:""},label:{type:"string",default:"Report",source:"html",selector:".meta .label"},date:{type:"string"},image:{type:"string",default:""},imageSlot:{type:"string",default:"disabled"},imageSize:{type:"string",default:"A1"},isChartArt:{type:"boolean",default:!1},postID:{type:"integer"},headerSize:{type:"string",default:"normal"},enableEmphasis:{type:"boolean",default:!1},enableHeader:{type:"boolean",default:!0},enableExcerpt:{type:"boolean",default:!0},enableExtra:{type:"boolean",default:!1},enableBreakingNews:{type:"boolean",default:!1},enableProgramsTaxonomy:{type:"boolean",default:!1}},edit:B,save:P}];n.registerBlockType.apply(void 0,Object(l.a)(_))},28:function(e,t){e.exports=moment},29:function(e,t){e.exports=wp.i18n},31:function(e,t){e.exports=wp.apiFetch},50:function(e,t){e.exports=ReactDOM},6:function(e,t){e.exports=wp.element},86:function(e,t){e.exports=lodash}},[[150,1,2]]]);
//# sourceMappingURL=main-c561bb98.js.map