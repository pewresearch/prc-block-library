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
(window["wpackioprcBlocksLibrarystory-itemJsonp"]=window["wpackioprcBlocksLibrarystory-itemJsonp"]||[]).push([[0],{15:function(e,t,a){"use strict";a.d(t,"c",(function(){return c})),a.d(t,"d",(function(){return r})),a.d(t,"e",(function(){return s})),a.d(t,"a",(function(){return h})),a.d(t,"b",(function(){return b}));a(25);var n=a(29),l=a.n(n),c=function(e,t,a){void 0===t&&(t=25);var n=new wp.api.collections[e];return void 0!==a?new Promise((function(e){l()({path:"/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=topic&letter=".concat(a)}).then((function(t){e(t)}))})):void 0!==n&&new Promise((function(a){var l={};n.fetch({data:{hide_empty:!1,per_page:t}}).then((function(t){for(var n=0;n<t.length;n++){var c=t[n].slug.replace("".concat(e.toLowerCase(),"_"),"");l[t[n].id]={id:t[n].id,name:t[n].name,slug:c}}a(l)}))}))},r=function(e,t){return new Promise((function(a){c(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(a){var n=e[a];t.push({value:n.name,label:n.name})})),t.sort((function(e,t){return e.label>t.label?1:-1})),a(t)}))}))},i=a(21),s=function(e,t,a,n,l){e===t&&l(Object(i.a)({},a,n))},m=a(52),o=a(14),u=a.n(o),d=a(1),E=a(153),v=a(44),R=a(71),g=a(72),f=a(70),h=(a(286),function(e){var t=e.title,a=e.excerpt,n=e.extra,l=e.link,c=e.label,r=e.date,i=e.image,s=e.imageSlot,m=e.imageSize,o=e.isChartArt,h=e.postID,b=e.headerSize,p=e.enableEmphasis,N=e.enableHeader,w=e.enableExcerpt,A=e.enableExtra,x=e.enableBreakingNews,k=e.enableProgramsTaxonomy,z=e.className,S=e.isSelected,y=e.setAttributes;e.inLoop;console.log("<StoryItem Edit>"),console.log(z);var H="Formats";!0===k&&(H="Programs");var C=!0;"left"!==s&&"right"!==s||(C=!1);var F=y;S||(F=!1);var L=u()(z,"story",{stacked:C,bordered:p}),M=function(){return React.createElement(v.b,{img:i,size:m,link:l,slot:s,chartArt:o,postId:h,setAttributes:F})},O=function(){return"top"!==s&&"left"!==s?React.createElement(d.Fragment,null):React.createElement(M,null)},T=function(){return"default"!==s?React.createElement(d.Fragment,null):React.createElement(M,null)},V=function(){return"bottom"!==s&&"right"!==s?React.createElement(d.Fragment,null):React.createElement(M,null)};return React.createElement(E.a,{as:"article",className:L},React.createElement(O,null),React.createElement(E.a.Content,null,React.createElement(f.b,{enabled:N,title:t,date:r,label:c,link:l,size:b,taxonomy:H,setAttributes:F}),React.createElement(T,null),React.createElement(R.b,{enabled:w,content:a,sansSerif:!N,setAttributes:F}),React.createElement(g.b,{enabled:A,content:n,breakingNews:x,setAttributes:F})),React.createElement(V,null))}),b=function(e){var t=e.postID,a=e.title,n=e.excerpt,l=e.extra,c=e.link,r=e.label,i=e.date,s=e.image,m=e.imageSlot,o=e.imageSize,E=e.isChartArt,v=e.headerSize,R=e.enableEmphasis,g=e.enableHeader,f=e.enableExcerpt,h=e.enableExtra,b=e.enableBreakingNews,p=e.className,N="stacked";"left"!==m&&"right"!==m||(N=null);var w=u()(p,"react-story-item"),A=function(){return React.createElement("div",{className:"".concat(o," image")},React.createElement("div",{className:"ui fluid placeholder"},React.createElement("div",{className:"image"})))},x=function(){return"top"!==m&&"left"!==m?React.createElement(d.Fragment,null):React.createElement(A,null)},k=function(){return"bottom"!==m&&"right"!==m?React.createElement(d.Fragment,null):React.createElement(A,null)};return React.createElement("div",{className:w,"data-label":r,"data-date":i,"data-link":c,"data-image":s,"data-imageSlot":m,"data-imageSize":o,"data-headerSize":v,"data-className":p,"data-emphasis":R,"data-breakingNews":b,"data-chartArt":E},React.createElement("div",{id:"post-".concat(t),className:"ui item story is-style-".concat(m," ").concat(N)},React.createElement(x,null),React.createElement("div",{className:"content"},React.createElement("div",{className:"ui fluid placeholder"},React.createElement("div",{className:"header"},React.createElement("div",{className:"line"}),React.createElement("div",{className:"line"})),React.createElement("div",{className:"paragraph"},React.createElement("div",{className:"line"}),React.createElement("div",{className:"line"}),React.createElement("div",{className:"line"}),React.createElement("div",{className:"line"}),React.createElement("div",{className:"line"})))),React.createElement(k,null),React.createElement("div",{className:"hidden"},!0===g&&React.createElement("div",{className:"title"},React.createElement(d.RawHTML,null,a)),!0===f&&React.createElement("div",{className:"description"},React.createElement(d.RawHTML,null,n)),!0===h&&React.createElement("ul",{className:"extra"},React.createElement(d.RawHTML,null,l)))))},p=(m.a,a(287),a(11),a(100),a(97)),N=a(9),w=a(295),A=a(150);Object(w.a)({termsData:[],excludeData:[],includeData:[]})((function(e){var t=e.termsData,a=e.excludeData,n=e.includeData,l=e.setState,r=e.exclude,i=e.include,s=e.letter,m=e.taxonomy,o=e.setAttributes,u=e.isSelected,E=function(){c(m,100,s).then((function(e){l({termsData:e}),function(e){var t={};if(0!==e.length&&0!==r.length&&(t.excludeData=JSON.parse(r)),0!==e.length&&0===i.length){var a=[];e.map((function(e){a.push({id:e.term_id,name:e.name,slug:e.slug})})),o({include:JSON.stringify(a)}),t.includeData=a}else 0!==e.length&&0!==i.length&&(t.includeData=JSON.parse(i));l(t)}(e)}))};!1!==o&&Object(A.a)((function(){0===t.length&&E()}));var v=0!==i.length&&!1===o&&JSON.parse(i);return React.createElement("div",{className:"ui link list"},!1!==v&&React.createElement(d.Fragment,null,v.map((function(e){return React.createElement("a",{className:"item",href:"/".concat(m.toLowerCase(),"/").concat(e.slug)},e.name)}))),!1!==o&&React.createElement(d.Fragment,null,t.map((function(e){var t=r.includes(e.term_id);return React.createElement("div",{className:"item"},React.createElement(N.CheckboxControl,{label:Object(p.decodeEntities)(e.name),checked:t,onChange:function(t){var l,c,r,i,s,m,u;l=t,c=e.term_id,r=e.name,i=e.slug,m=a,u=n,!0===l?(m.push(c),-1!==(s=u.findIndex((function(e){return e.id===c})))&&u.splice(s,1)):(u.push({id:c,name:r,slug:i}),function(){var e=m.indexOf(c);-1!==e&&m.splice(e,1)}()),o({exclude:JSON.stringify(m),include:JSON.stringify(u)})},"data-termid":e.term_id,"data-term":e.name}),React.createElement("div",{style:{height:"15px",marginTop:"-5px"}},!0===u&&React.createElement("pre",{style:{fontSize:"11px",margin:0}},"(",e.slug,")")))}))))}))},286:function(e,t,a){},287:function(e,t,a){},44:function(e,t,a){"use strict";a.d(t,"a",(function(){return m})),a.d(t,"b",(function(){return f}));var n=a(1),l=a(74),c=a(94),r=a(14),i=a.n(r),s=function(e){var t=e.img,a=e.size,r=e.link,i=e.onClick,s=void 0!==i&&i,m=function(e,t,a){if(""===e||!1===e)return e;var n={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},l={resize:{default:"564,317",small:"354,194",hidpi:"1128,634",smallHidpi:"708,388"}[a]};return"A2"===t?l={resize:{default:"268,151",small:"354,194",hidpi:"536,301",smallHidpi:"708,388"}[a]}:"A3"===t?l={resize:{default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"}[a]}:"A4"===t?l={resize:{default:"268,151",small:"354,194",hidpi:"536,302",smallHidpi:"708,388"}[a]}:"XL"===t&&(l={resize:{default:"720,405",small:"354,194",hidpi:"1440,810",smallHidpi:"708,388"}[a]}),"legacy-260"===t?l={resize:n[260][a]}:"legacy-260-173"===t&&(l={resize:n["260-173"][a]}),Object(c.addQueryArgs)(e,l)},o=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:420;return[{srcSet:"".concat(m(e,t,"default")," 1x, ").concat(m(e,t,"hidpi")," 2x"),media:"(min-width: ".concat(a,"px)")},{srcSet:"".concat(m(e,t,"small")," 1x, ").concat(m(e,t,"smallHidpi")," 2x"),media:"(max-width: ".concat(a,"px)")}]};return!1!==s?React.createElement("div",{onClick:s},React.createElement(l.a,{sources:o(t,a)})):React.createElement(n.Fragment,null,""===r&&React.createElement(l.a,{sources:o(t,a)}),""!==r&&React.createElement("a",{href:r},React.createElement(l.a,{sources:o(t,a)})))},m=function(e){var t,a,n,l,c,r=e.img,m=e.link,o=e.size,u=e.slot,d=e.chartArt;return React.createElement("div",{className:(t=!1,a=!1,n=!1,l=!1,c=!1,!1!==u&&("XL"===o?t=!0:"A1"===o?a=!0:"A2"===o?n=!0:"A3"===o?l=!0:"A4"===o&&(c=!0)),i()({ui:!0,XL:t,A1:a,A2:n,A3:l,A4:c,image:!0,bordered:d}))},React.createElement(s,{img:r,size:o,link:m}))},o=a(43),u=a(9),d=a(11),E=a(29),v=a.n(E),R=["image"],g=function(e){var t=e.img,a=e.size,l=e.chartArt,c=e.postId,r=e.setAttributes;console.log("ImageEdit"),console.log(r);var i=Object(n.useState)(!1),m=Object(o.a)(i,2),E=m[0],g=m[1];return Object(n.useEffect)((function(){0!==c&&!1!==r&&v()({path:"/prc-api/v2/get-art/?postId=".concat(c)}).then((function(e){!1!==e?(g(e),r({image:e[a].rawUrl})):g(!1)}))}),[c,r]),Object(n.useEffect)((function(){!1!==E&&void 0!==E[a]&&!1!==r&&r({image:E[a].rawUrl,isChartArt:E[a].chartArt})}),[E,a]),React.createElement(d.MediaUploadCheck,null,React.createElement(d.MediaUpload,{onSelect:function(e){return r({image:e.url})},allowedTypes:R,render:function(e){var c=e.open;return React.createElement(n.Fragment,null,""===t&&React.createElement(u.Button,{isPrimary:!0,onClick:c},"Insert Image"),""!==t&&React.createElement(s,{img:t,size:a,link:"",onClick:c}),React.createElement(d.BlockControls,null,React.createElement(u.Toolbar,{controls:[{icon:null,title:"Size",isActive:!1,children:React.createElement(u.SelectControl,{value:a,options:[{value:"XL",label:"XL"},{value:"A1",label:"A1"},{value:"A2",label:"A2"},{value:"A3",label:"A3"},{value:"A4",label:"A4"},{value:"legacy-260",label:"Legacy Homepage 260x260"},{value:"legacy-260-173",label:"Legacy Homepage 260x173"}],onChange:function(e){return r({imageSize:e})},style:{margin:"3px"}}),onClick:null},{icon:"chart-pie",title:"Chartart",isActive:l,onClick:function(){r({isChartArt:!l})}}]})))}}))},f=function(e){var t,a,n,l,c,r=e.img,s=e.size,m=e.slot,o=e.chartArt,u=e.postId,d=e.setAttributes;return React.createElement("div",{className:(t=!1,a=!1,n=!1,l=!1,c=!1,!1!==m&&("XL"===s?t=!0:"A1"===s?a=!0:"A2"===s?n=!0:"A3"===s?l=!0:"A4"===s&&(c=!0)),i()({ui:!0,XL:t,A1:a,A2:n,A3:l,A4:c,image:!0,bordered:o}))},React.createElement(g,{img:r,size:s,chartArt:o,postId:u,setAttributes:d}))}},52:function(e,t,a){"use strict";var n=a(14),l=a.n(n),c=a(1),r=a(152),i=a(153),s=a(44),m=a(71),o=a(72),u=a(70);t.a=function(e){var t=e.title,a=e.excerpt,n=e.extra,d=e.link,E=e.label,v=e.date,R=e.image,g=e.imageSlot,f=e.imageSize,h=e.isChartArt,b=e.headerSize,p=e.enableEmphasis,N=e.enableHeader,w=e.enableExcerpt,A=e.enableExtra,x=e.enableBreakingNews,k=e.className,z=e.inLoop,S=void 0!==z&&z;console.log("<StoryItem Display>");var y=Object(r.a)("(max-width: 767px)"),H=!0;"left"!==g&&"right"!==g||(H=!1);var C=!1;!0===S&&!0===y&&(C=!0);var F=l()(k,"story",{stacked:H,bordered:p,"is-style-mobile-loop":C}),L=function(){return React.createElement(s.a,{img:R,size:f,link:d,slot:g,chartArt:h})},M=function(){return"top"!==g&&"left"!==g||!0===S&&!0===y?React.createElement(c.Fragment,null):React.createElement(L,null)},O=function(){return"default"!==g||!0===S&&!0===y?React.createElement(c.Fragment,null):React.createElement(L,null)},T=function(){return"bottom"!==g&&"right"!==g||!0===S&&!0===y?React.createElement(c.Fragment,null):React.createElement(L,null)};return React.createElement(i.a,{as:"article",className:F},React.createElement(M,null),React.createElement(i.a.Content,null,React.createElement(u.a,{enabled:N,title:t,date:v,label:E,link:d,size:b,isStyleMobileLoop:C,image:R,imageSize:f,chartArt:h}),React.createElement(O,null),React.createElement(m.a,{enabled:w,content:a,sansSerif:!N}),React.createElement(o.a,{enabled:A,content:n,breakingNews:x})),React.createElement(T,null))}},70:function(e,t,a){"use strict";a.d(t,"a",(function(){return v})),a.d(t,"b",(function(){return f}));var n=a(1),l=a(153),c=a(44),r=a(14),i=a.n(r),s=a(25),m=function(e){var t=e.label,a=void 0===t?"Report":t,l=e.date,c=a.replace(/\s+/g,"-").toLowerCase(),r=i()(c,"label"),m=s(l).format("MMM D, YYYY");return React.createElement(n.Fragment,null,React.createElement("span",{className:r},a||"Report")," | ",React.createElement("span",{className:"date"},m))},o=a(295),u=a(9),d=a(15),E=Object(o.a)({labelOptions:[]})((function(e){var t=e.label,a=e.date,l=e.taxonomy,c=e.setAttributes,r=e.setState,i=e.labelOptions;return Object(n.useEffect)((function(){Object(d.d)(l).then((function(e){r({labelOptions:e})}))}),[l]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(u.SelectControl,{value:t,options:i,onChange:function(e){c({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(u.TextControl,{value:a,onChange:function(e){c({date:e})}})))})),v=function(e){var t=e.title,a=e.label,r=e.date,i=e.link,s=e.size,o=e.enabled,u=e.isStyleMobileLoop,d=e.image,E=e.imageSize,v=e.isChartArt;return!0!==o?React.createElement(n.Fragment,null):React.createElement(n.Fragment,null,React.createElement(l.a.Meta,null,React.createElement(m,{label:a,date:r})),React.createElement(l.a.Header,{className:s},!0===u&&React.createElement(c.a,{img:d,size:E,link:i,slot:"left",chartArt:v}),React.createElement("a",{href:i},React.createElement(n.RawHTML,null,t))))},R=a(11),g=function(e){var t=e.size,a=e.setAttributes,n=function(e){var t=e.level,a=e.isPressed,n=void 0!==a&&a,l={1:"M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z",2:"M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z",3:"M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z",4:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z",5:"M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z",6:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z"};return l.hasOwnProperty(t)?React.createElement(u.SVG,{width:"24",height:"24",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",isPressed:n},React.createElement(u.Path,{d:l[t]})):null};return React.createElement(R.BlockControls,null,React.createElement(u.Toolbar,{controls:[{icon:React.createElement(n,{level:1,isPressed:"large"===t}),title:"Size: Large",isActive:"large"===t,onClick:function(){a({headerSize:"large"})}},{icon:React.createElement(n,{level:2,isPressed:"medium"===t||"normal"===t}),title:"Size: Medium",isActive:"medium"===t,onClick:function(){a({headerSize:"medium"})}},{icon:React.createElement(n,{level:3,isPressed:"small"===t}),title:"Size: Small",isActive:"small"===t,onClick:function(){a({headerSize:"small"})}}]}))},f=function(e){var t=e.title,a=e.label,c=e.date,r=e.size,i=e.enabled,s=e.taxonomy,o=e.setAttributes;return!0!==i?React.createElement(n.Fragment,null):React.createElement(n.Fragment,null,React.createElement(l.a.Meta,null,!1!==o&&React.createElement(E,{date:c,label:a,taxonomy:s,setAttributes:o}),!1===o&&React.createElement(m,{label:a,date:c})),React.createElement(l.a.Header,{className:r},!1!==o&&React.createElement(n.Fragment,null,React.createElement(g,{size:r,setAttributes:o}),React.createElement(R.RichText,{tagName:"div",value:t,onChange:function(e){return o({title:e})},allowedFormats:["bold","italic"],placeholder:"Title",multiline:"br"})),!1===o&&React.createElement(n.RawHTML,null,t)))}},71:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return s}));var n=a(1),l=a(14),c=a.n(l),r=function(e){var t=e.content,a=e.sansSerif;if(!0!==e.enabled)return React.createElement(n.Fragment,null);var l=c()("description",{"sans-serif":a});return React.createElement("div",{className:l},React.createElement(n.RawHTML,null,t))},i=a(11),s=function(e){var t=e.content,a=e.sansSerif,l=e.enabled,r=e.setAttributes;if(!0!==l)return React.createElement(n.Fragment,null);var s=c()("description",{"sans-serif":a});return React.createElement(n.Fragment,null,!1!==r&&React.createElement(i.RichText,{tagName:"div",value:t,onChange:function(e){return r({excerpt:e})},placeholder:t,multiline:"p",className:s}),!1===r&&React.createElement(i.RichText.Content,{tagName:"div",value:t,className:s}))}},72:function(e,t,a){"use strict";a.d(t,"a",(function(){return c})),a.d(t,"b",(function(){return i}));var n=a(1),l=a(153),c=function(e){var t=e.content,a=e.breakingNews;return!0!==e.enabled?React.createElement(n.Fragment,null):React.createElement(n.Fragment,null,React.createElement(l.a.Extra,{as:"ul"},React.createElement(n.RawHTML,null,t)),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))},r=a(11),i=function(e){var t=e.content,a=e.breakingNews,l=e.enabled,c=e.setAttributes;return!0!==l?React.createElement(n.Fragment,null):React.createElement(n.Fragment,null,!1!==c&&React.createElement(r.RichText,{tagName:"ul",value:t,onChange:function(e){return c({extra:e})},placeholder:t,multiline:"li",className:"extra"}),!1===c&&React.createElement(r.RichText.Content,{tagName:"ul",value:t,className:"extra"}),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))}}}]);
//# sourceMappingURL=default~frontend~main-6a2cd8b9.js.map