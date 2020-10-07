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
(window["wpackioprcBlocksLibrarystory-itemJsonp"]=window["wpackioprcBlocksLibrarystory-itemJsonp"]||[]).push([[0],{21:function(e,t,a){"use strict";a.d(t,"c",(function(){return r})),a.d(t,"d",(function(){return i})),a.d(t,"e",(function(){return o})),a.d(t,"a",(function(){return A})),a.d(t,"b",(function(){return N}));a(25);var n=a(29),l=a.n(n),c=window.wp,r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25,a=arguments.length>2?arguments[2]:void 0,n=new c.api.collections[e];return void 0!==a?new Promise((function(e){l()({path:"/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=topic&letter=".concat(a)}).then((function(t){e(t)}))})):void 0!==n&&new Promise((function(a){var l={};n.fetch({data:{hide_empty:!1,per_page:t}}).then((function(t){for(var n=0;n<t.length;n++){var c=t[n].slug.replace("".concat(e.toLowerCase(),"_"),"");l[t[n].id]={id:t[n].id,name:t[n].name,slug:c}}a(l)}))}))},i=function(e,t){return new Promise((function(a){r(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(a){var n=e[a];t.push({value:n.name,label:n.name})})),t.sort((function(e,t){return e.label>t.label?1:-1})),a(t)}))}))},s=a(20),o=function(e,t,a,n,l){e===t&&l(Object(s.a)({},a,n))},m=a(55),u=a(12),d=a.n(u),v=a(1),E=a(154),g=a(46),R=a(34),h=a(75),f=a(74),p=a(54),b=a(8),x=a(11),w=function(e){var t=e.wpQueryContext,a=e.rootClientId,n=e.postId;console.log("<ContextControls>",t,a,n);var l=t.includes(n);return console.log("isActive?",l),React.createElement(x.BlockControls,null,React.createElement(b.Toolbar,{controls:[{icon:"sticky",title:"Pin This",isActive:l,onClick:function(){var e=t,l=e.findIndex((function(e){return e===n}));-1===l?e.push(n):e.splice(l,1),console.log("dispatching...",n),console.log(e),Object(p.dispatch)("core/block-editor").updateBlockAttributes(a,{pinned:JSON.stringify(e)})}}]}))},A=(a(287),function(e){var t=e.title,a=e.excerpt,n=e.extra,l=e.link,c=e.label,r=e.date,i=e.image,s=e.imageSlot,o=e.imageSize,m=e.isChartArt,u=e.postID,p=e.headerSize,b=e.enableEmphasis,x=e.enableHeader,A=e.enableExcerpt,N=e.enableExcerptBelow,k=e.enableExtra,z=e.enableBreakingNews,C=e.enableProgramsTaxonomy,S=e.className,y=e.isSelected,H=e.setAttributes,L=e.wpQueryContext,O=e.rootClientId,M=!1;!1===A&&(M=!0);var F="Formats";!0===C&&(F="Programs");var B=!0;"left"!==s&&"right"!==s||(B=!1);var T=H;y||(T=!1);var V=d()(S,"story",{stacked:B,bordered:b,"alt-description":N}),j=function(){return React.createElement(g.b,{img:i,size:o,link:l,slot:s,chartArt:m,postId:u,setAttributes:T})},I=function(){return"top"!==s&&"left"!==s?React.createElement(v.Fragment,null):React.createElement(j,null)},D=function(){return"default"!==s?React.createElement(v.Fragment,null):React.createElement(j,null)},P=function(){return"bottom"!==s&&"right"!==s?React.createElement(v.Fragment,null):React.createElement(j,null)};return React.createElement(E.a,{as:"article",className:V},!1!==L&&React.createElement(w,{wpQueryContext:L,rootClientId:O,postId:u}),React.createElement(I,null),React.createElement(E.a.Content,null,React.createElement(f.b,{enabled:x,title:t,date:r,label:c,link:l,size:p,taxonomy:F,setAttributes:T,altHeaderWeight:M}),React.createElement(D,null),!0!==N&&React.createElement(R.b,{enabled:A,content:a,sansSerif:!x,setAttributes:T}),React.createElement(h.b,{enabled:k,content:n,breakingNews:z,setAttributes:T})),React.createElement(P,null),!0===N&&React.createElement(R.b,{enabled:A,content:a,sansSerif:!x,setAttributes:T}))}),N=function(e){var t=e.postID,a=e.title,n=e.excerpt,l=e.extra,c=e.link,r=e.label,i=e.date,s=e.image,o=e.imageSlot,m=e.imageSize,u=e.isChartArt,E=e.headerSize,g=e.enableEmphasis,R=e.enableHeader,h=e.enableExcerpt,f=e.enableExcerptBelow,p=e.enableExtra,b=e.enableBreakingNews,x=e.className,w="stacked";"left"!==o&&"right"!==o||(w=null);var A=d()(x,"react-story-item"),N=function(){return React.createElement("div",{className:"".concat(m," image")},React.createElement("div",{className:"ui fluid placeholder"},React.createElement("div",{className:"image"})))},k=function(){return"top"!==o&&"left"!==o?React.createElement(v.Fragment,null):React.createElement(N,null)},z=function(){return"bottom"!==o&&"right"!==o?React.createElement(v.Fragment,null):React.createElement(N,null)};return React.createElement("div",{className:A,"data-label":r,"data-date":i,"data-link":c,"data-image":s,"data-imageSlot":o,"data-imageSize":m,"data-headerSize":E,"data-className":x,"data-emphasis":g,"data-breakingNews":b,"data-excerptbelow":f,"data-chartArt":u},React.createElement("div",{id:"post-".concat(t),className:"ui item story is-style-".concat(o," ").concat(w)},React.createElement(k,null),React.createElement("div",{className:"content"},React.createElement("div",{className:"ui fluid placeholder"},React.createElement("div",{className:"header"},React.createElement("div",{className:"line"}),React.createElement("div",{className:"line"})),React.createElement("div",{className:"paragraph"},React.createElement("div",{className:"line"}),React.createElement("div",{className:"line"}),React.createElement("div",{className:"line"}),React.createElement("div",{className:"line"}),React.createElement("div",{className:"line"})))),React.createElement(z,null),React.createElement("div",{className:"hidden"},!0===R&&React.createElement("div",{className:"title"},React.createElement(v.RawHTML,null,a)),!0===h&&React.createElement("div",{className:"description"},React.createElement(v.RawHTML,null,n)),!0===p&&React.createElement("ul",{className:"extra"},React.createElement(v.RawHTML,null,l)))))},k=(m.a,a(288),a(103),a(100)),z=a(296),C=a(152);Object(z.a)({termsData:[],excludeData:[],includeData:[]})((function(e){var t=e.termsData,a=e.excludeData,n=e.includeData,l=e.setState,c=e.exclude,i=e.include,s=e.letter,o=e.taxonomy,m=e.setAttributes,u=e.isSelected,d=function(){r(o,100,s).then((function(e){l({termsData:e}),function(e){var t={};if(0!==e.length&&0!==c.length&&(t.excludeData=JSON.parse(c)),0!==e.length&&0===i.length){var a=[];e.map((function(e){a.push({id:e.term_id,name:e.name,slug:e.slug})})),m({include:JSON.stringify(a)}),t.includeData=a}else 0!==e.length&&0!==i.length&&(t.includeData=JSON.parse(i));l(t)}(e)}))};!1!==m&&Object(C.a)((function(){0===t.length&&d()}));var E=0!==i.length&&!1===m&&JSON.parse(i);return React.createElement("div",{className:"ui link list"},!1!==E&&React.createElement(v.Fragment,null,E.map((function(e){return React.createElement("a",{className:"item",href:"/".concat(o.toLowerCase(),"/").concat(e.slug)},e.name)}))),!1!==m&&React.createElement(v.Fragment,null,t.map((function(e){var t=c.includes(e.term_id);return React.createElement("div",{className:"item"},React.createElement(b.CheckboxControl,{label:Object(k.decodeEntities)(e.name),checked:t,onChange:function(t){var l,c,r,i,s,o,u;l=t,c=e.term_id,r=e.name,i=e.slug,o=a,u=n,!0===l?(o.push(c),-1!==(s=u.findIndex((function(e){return e.id===c})))&&u.splice(s,1)):(u.push({id:c,name:r,slug:i}),function(){var e=o.indexOf(c);-1!==e&&o.splice(e,1)}()),m({exclude:JSON.stringify(o),include:JSON.stringify(u)})},"data-termid":e.term_id,"data-term":e.name}),React.createElement("div",{style:{height:"15px",marginTop:"-5px"}},!0===u&&React.createElement("pre",{style:{fontSize:"11px",margin:0}},"(",e.slug,")")))}))))}))},287:function(e,t,a){},288:function(e,t,a){},34:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return s}));var n=a(1),l=a(12),c=a.n(l),r=function(e){var t=e.content,a=e.sansSerif;if(!0!==e.enabled)return React.createElement(n.Fragment,null);var l=c()("description",{"sans-serif":a});return React.createElement("div",{className:l},React.createElement(n.RawHTML,null,t))},i=a(11),s=function(e){var t=e.content,a=e.sansSerif,l=e.enabled,r=e.setAttributes;if(!0!==l)return React.createElement(n.Fragment,null);var s=c()("description",{"sans-serif":a});return React.createElement(n.Fragment,null,!1!==r&&React.createElement(i.RichText,{tagName:"div",value:t,onChange:function(e){return r({excerpt:e})},placeholder:t,multiline:"p",className:s}),!1===r&&React.createElement(i.RichText.Content,{tagName:"div",value:t,className:s}))}},46:function(e,t,a){"use strict";a.d(t,"a",(function(){return g})),a.d(t,"b",(function(){return A}));var n=a(1),l=a(77),c=a(97),r=a(12),i=a.n(r),s={default:"564,317",small:"690,388",hidpi:"1128,634",smallHidpi:"1380,776"},o={default:"268,151",small:"690,388",hidpi:"536,301",smallHidpi:"1380,776"},m={default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"},u={default:"268,151",small:"690,388",hidpi:"536,302",smallHidpi:"1380,776"},d={default:"720,405",small:"690,388",hidpi:"1440,810",smallHidpi:"1380,776"},v={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},E=function(e){var t=e.img,a=e.size,r=e.link,i=e.onClick,E=void 0!==i&&i,g=e.placeholder,R=void 0!==g&&g,h=function(e){if(!0===R){return"https://via.placeholder.com/".concat("A2"===a?"536x301":"A3"===a?"388x220":"A4"===a?"536x302":"XL"===a?"1440x810":"1128x634",".png?text=").concat(a)}if(""===t||!1===t)return t;var n={resize:s[e]};return"A2"===a?n={resize:o[e]}:"A3"===a?n={resize:m[e]}:"A4"===a?n={resize:u[e]}:"XL"===a&&(n={resize:d[e]}),"legacy-260"===a?n={resize:v[260][e]}:"legacy-260-173"===a&&(n={resize:v["260-173"][e]}),Object(c.addQueryArgs)(t,n)},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:767;return[{srcSet:"".concat(h("default")," 1x, ").concat(h("hidpi")," 2x"),media:"(min-width: ".concat(e,"px)")},{srcSet:"".concat(h("small")," 1x, ").concat(h("smallHidpi")," 2x"),media:"(max-width: ".concat(e,"px)")}]};return!1!==E?React.createElement("div",{onClick:E},!0===R&&React.createElement("img",{src:h(),alt:"Click to insert"}),!0!==R&&React.createElement(l.a,{sources:f(),alt:"Click to edit"})):React.createElement(n.Fragment,null,""===r&&React.createElement(l.a,{sources:f()}),""!==r&&React.createElement("a",{href:r},React.createElement(l.a,{sources:f()})))},g=function(e){var t,a,n,l,c,r=e.img,s=e.link,o=e.size,m=e.slot,u=e.chartArt;return React.createElement("div",{className:(t=!1,a=!1,n=!1,l=!1,c=!1,!1!==m&&("XL"===o?t=!0:"A1"===o?a=!0:"A2"===o?n=!0:"A3"===o?l=!0:"A4"===o&&(c=!0)),i()({ui:!0,XL:t,A1:a,A2:n,A3:l,A4:c,image:!0,bordered:u}))},React.createElement(E,{img:r,size:o,link:s}))},R=a(45),h=a(8),f=a(11),p=a(29),b=a.n(p),x=["image"],w=function(e){var t=e.img,a=e.size,l=e.chartArt,c=e.postId,r=e.setAttributes,i=Object(n.useState)(!1),s=Object(R.a)(i,2),o=s[0],m=s[1];return Object(n.useEffect)((function(){0!==c&&!1!==r&&b()({path:"/prc-api/v2/get-art/?postId=".concat(c)}).then((function(e){!1!==e?(m(e),r({image:e[a].rawUrl})):m(!1)}))}),[c,r]),Object(n.useEffect)((function(){!1!==o&&void 0!==o[a]&&!1!==r&&r({image:o[a].rawUrl,isChartArt:o[a].chartArt})}),[o,a]),React.createElement(f.MediaUploadCheck,null,React.createElement(f.MediaUpload,{onSelect:function(e){return r({image:e.url})},allowedTypes:x,render:function(e){var c=e.open;return React.createElement(n.Fragment,null,0===t.length&&React.createElement(E,{img:t,size:a,link:"",onClick:c,placeholder:!0}),""!==t&&React.createElement(E,{img:t,size:a,link:"",onClick:c}),React.createElement(f.BlockControls,null,React.createElement(h.Toolbar,{controls:[{icon:null,title:"Size",isActive:!1,children:React.createElement(h.SelectControl,{value:a,options:[{value:"XL",label:"XL"},{value:"A1",label:"A1"},{value:"A2",label:"A2"},{value:"A3",label:"A3"},{value:"A4",label:"A4"},{value:"legacy-260",label:"Legacy Homepage 260x260"},{value:"legacy-260-173",label:"Legacy Homepage 260x173"}],onChange:function(e){return r({imageSize:e})},style:{marginBottom:"-8px"}}),onClick:null},{icon:"chart-pie",title:"Chartart",isActive:l,onClick:function(){r({isChartArt:!l})}}]})))}}))},A=function(e){var t,a,n,l,c,r=e.img,s=e.size,o=e.slot,m=e.chartArt,u=e.postId,d=e.setAttributes;return React.createElement("div",{className:(t=!1,a=!1,n=!1,l=!1,c=!1,!1!==o&&("XL"===s?t=!0:"A1"===s?a=!0:"A2"===s?n=!0:"A3"===s?l=!0:"A4"===s&&(c=!0)),i()({ui:!0,XL:t,A1:a,A2:n,A3:l,A4:c,image:!0,bordered:m}))},React.createElement(w,{img:r,size:s,chartArt:m,postId:u,setAttributes:d}))}},55:function(e,t,a){"use strict";var n=a(12),l=a.n(n),c=a(1),r=a(73),i=a(154),s=a(46),o=a(34),m=a(75),u=a(74);t.a=function(e){var t=e.title,a=e.excerpt,n=e.extra,d=e.link,v=e.label,E=e.date,g=e.image,R=e.imageSlot,h=e.imageSize,f=e.isChartArt,p=e.headerSize,b=e.enableEmphasis,x=e.enableHeader,w=e.enableExcerpt,A=e.enableExcerptBelow,N=e.enableExtra,k=e.enableBreakingNews,z=e.extraContent,C=void 0!==z&&z,S=e.className,y=e.inLoop,H=void 0!==y&&y,L=Object(r.b)("(max-width: 767px)"),O=!1;!1===w&&(O=!0);var M=!0;"left"!==R&&"right"!==R||(M=!1);var F=!1;!0===H&&!0===L&&(F=!0),!1===H&&!0===L&&"disabled"!==R&&(R="top");var B=l()(S,"story",{stacked:M,bordered:b,"alt-description":A,"is-style-mobile-loop":F}),T=function(){return React.createElement(s.a,{img:g,size:h,link:d,slot:R,chartArt:f,onClick:function(){window.location=d}})},V=function(){return"top"!==R&&"left"!==R||!0===H&&!0===L?React.createElement(c.Fragment,null):React.createElement(T,null)},j=function(){return"default"!==R||!0===H&&!0===L?React.createElement(c.Fragment,null):React.createElement(T,null)},I=function(){return"bottom"!==R&&"right"!==R||!0===H&&!0===L?React.createElement(c.Fragment,null):React.createElement(T,null)};return React.createElement(i.a,{as:"article",className:B},React.createElement(V,null),React.createElement(i.a.Content,null,React.createElement(u.a,{enabled:x,title:t,date:E,label:v,link:d,size:p,isStyleMobileLoop:F,image:g,imageSize:h,chartArt:f,altHeaderWeight:O}),React.createElement(j,null),!0!==A&&React.createElement(o.a,{enabled:w,content:a,sansSerif:!x}),!0===A&&!0===L&&React.createElement(o.a,{enabled:w,content:a,sansSerif:!x}),React.createElement(m.a,{enabled:N,content:n,breakingNews:k}),!1!==C&&React.createElement(c.RawHTML,null,C)),React.createElement(I,null),!0===A&&!1===L&&React.createElement(o.a,{enabled:w,content:a,sansSerif:!x}))}},74:function(e,t,a){"use strict";a.d(t,"a",(function(){return E})),a.d(t,"b",(function(){return h}));var n=a(1),l=a(154),c=a(12),r=a.n(c),i=a(46),s=a(25),o=function(e){var t=e.label,a=void 0===t?"Report":t,l=e.date,c=a.replace(/\s+/g,"-").toLowerCase(),i=r()(c,"label"),o=s(l).format("MMM D, YYYY");return React.createElement(n.Fragment,null,React.createElement("span",{className:i},a||"Report")," | ",React.createElement("span",{className:"date"},o))},m=a(296),u=a(8),d=a(21),v=Object(m.a)({labelOptions:[]})((function(e){var t=e.label,a=e.date,l=e.taxonomy,c=e.setAttributes,r=e.setState,i=e.labelOptions;return Object(n.useEffect)((function(){Object(d.d)(l).then((function(e){r({labelOptions:e})}))}),[l]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(u.SelectControl,{value:t,options:i,onChange:function(e){c({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(u.TextControl,{value:a,onChange:function(e){c({date:e})},style:{marginBottom:"0px"},className:"story-label-select"})))})),E=function(e){var t=e.title,a=e.label,c=e.date,s=e.link,m=e.size,u=e.enabled,d=e.isStyleMobileLoop,v=e.image,E=e.imageSize,g=e.isChartArt,R=e.altHeaderWeight;if(!0!==u)return React.createElement(n.Fragment,null);var h=r()(m,{light:R});return React.createElement(n.Fragment,null,React.createElement(l.a.Meta,null,React.createElement(o,{label:a,date:c})),React.createElement(l.a.Header,{className:h},!0===d&&React.createElement(i.a,{img:v,size:E,link:s,slot:"left",chartArt:g}),React.createElement("a",{href:s},React.createElement(n.RawHTML,null,t))))},g=a(11),R=function(e){var t=e.size,a=e.setAttributes,n=function(e){var t=e.level,a=e.isPressed,n=void 0!==a&&a,l={1:"M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z",2:"M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z",3:"M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z",4:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z",5:"M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z",6:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z"};return l.hasOwnProperty(t)?React.createElement(u.SVG,{width:"24",height:"24",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",isPressed:n},React.createElement(u.Path,{d:l[t]})):null};return React.createElement(g.BlockControls,null,React.createElement(u.Toolbar,{controls:[{icon:React.createElement(n,{level:1,isPressed:"large"===t}),title:"Size: Large",isActive:"large"===t,onClick:function(){a({headerSize:"large"})}},{icon:React.createElement(n,{level:2,isPressed:"medium"===t||"normal"===t}),title:"Size: Medium",isActive:"medium"===t,onClick:function(){a({headerSize:"medium"})}},{icon:React.createElement(n,{level:3,isPressed:"small"===t}),title:"Size: Small",isActive:"small"===t,onClick:function(){a({headerSize:"small"})}}]}))},h=function(e){var t=e.title,a=e.label,c=e.date,i=e.size,s=e.enabled,m=e.taxonomy,u=e.setAttributes,d=e.altHeaderWeight;if(!0!==s)return React.createElement(n.Fragment,null);var E=r()(i,{light:d});return React.createElement(n.Fragment,null,React.createElement(l.a.Meta,null,!1!==u&&React.createElement(v,{date:c,label:a,taxonomy:m,setAttributes:u}),!1===u&&React.createElement(o,{label:a,date:c})),React.createElement(l.a.Header,{className:E},!1!==u&&React.createElement(n.Fragment,null,React.createElement(R,{size:i,setAttributes:u}),React.createElement(g.RichText,{tagName:"div",value:t,onChange:function(e){return u({title:e})},allowedFormats:["italic"],placeholder:"Title",multiline:"br"})),!1===u&&React.createElement(n.RawHTML,null,t)))}},75:function(e,t,a){"use strict";a.d(t,"a",(function(){return c})),a.d(t,"b",(function(){return i}));var n=a(1),l=a(154),c=function(e){var t=e.content,a=e.breakingNews,c=e.enabled;return React.createElement(n.Fragment,null,!0===c&&React.createElement(l.a.Extra,{as:"ul"},React.createElement(n.RawHTML,null,t)),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))},r=a(11),i=function(e){var t=e.content,a=e.breakingNews,l=e.enabled,c=e.setAttributes;return React.createElement(n.Fragment,null,!1!==c&&!0===l&&React.createElement(r.RichText,{tagName:"ul",value:t,onChange:function(e){return c({extra:e})},placeholder:t,multiline:"li",className:"extra"}),!1===c&&!0===l&&React.createElement(r.RichText.Content,{tagName:"ul",value:t,className:"extra"}),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))}}}]);
//# sourceMappingURL=default~frontend~main-f3607aea.js.map