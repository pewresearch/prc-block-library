/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2021 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window["wpackioprcBlocksLibrarystory-itemJsonp"]=window["wpackioprcBlocksLibrarystory-itemJsonp"]||[]).push([[3],{0:function(e,t){e.exports=React},1:function(e,t){e.exports=wp.element},100:function(e,t){e.exports=wp.htmlEntities},11:function(e,t){e.exports=wp.blockEditor},112:function(e,t,a){a(86),e.exports=a(127)},123:function(e,t,a){},124:function(e,t,a){},127:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.r(t);var l=a(22),r=a(26),c=a(57),i=a(80),o=a(1),s=a(62),u=a(37),m=a.n(u),d=window.wp,p=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25,a=e,n=new d.api.collections[a];return void 0!==n&&new Promise((function(e){var l={};n.fetch({data:{hide_empty:!1,per_page:t}}).then((function(t){for(var n=0;n<t.length;n++){var r=t[n].slug.replace("".concat(a.toLowerCase(),"_"),"");l[t[n].id]={id:t[n].id,name:t[n].name,slug:r}}e(l)}))}))},f=function(e,t,a,l,r){e===t&&r(n({},a,l))},b=a(42),g=a(6),h=a.n(g),v=a(140);var E=a(99);function R(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var a=[],n=!0,l=!1,r=void 0;try{for(var c,i=e[Symbol.iterator]();!(n=(c=i.next()).done)&&(a.push(c.value),!t||a.length!==t);n=!0);}catch(e){l=!0,r=e}finally{try{n||null==i.return||i.return()}finally{if(l)throw r}}return a}}(e,t)||Object(E.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var y=a(60),w=a(11),x=a(7),k=function(e,t){void 0!==t&&void 0!==e&&m()({path:"/prc-api/v2/blocks/helpers/get-post-by-url",method:"POST",data:{url:e}}).then((function(e){if(console.log("setPostbyURL",e),!1!==e){var a={title:e.title,excerpt:e.excerpt,link:e.link,label:e.label,date:e.date,postID:e.id,extra:""};e.art||(a.image=e.image),t(a)}}))},A=function(e){var t=e.inline,a=e.children,n=Object(r.__)("Story Item Options");return!0===t?React.createElement(x.Placeholder,{isColumnLayout:!0,label:n},a):React.createElement(w.InspectorControls,null,React.createElement(x.PanelBody,{title:n},a))},C=function(e){var t=e.postID,a=e.link,n=e.imageSlot,l=e.enableHeader,r=e.enableExcerpt,c=e.enableExcerptBelow,i=e.enableExtra,s=e.enableBreakingNews,u=e.enableEmphasis,m=e.enableProgramsTaxonomy,d=e.setAttributes,p=e.inline,f=R(Object(o.useState)(a),2),b=f[0],g=f[1];return Object(o.useEffect)((function(){Object(y.isEmpty)(a)||void 0!==t||(console.log("Story Item Controls Did Mount"),console.log(a),console.log(t),k(a,d))}),[a]),React.createElement(A,{inline:p},React.createElement("div",null,React.createElement(x.TextControl,{label:"Post ID",value:t,disabled:!0})),React.createElement("div",{className:"story-item-link"},React.createElement("div",null,React.createElement(x.TextControl,{autoComplete:"off",label:"Link",value:b,onChange:function(e){g(e),d({link:e})}})),React.createElement("div",null,React.createElement(x.Button,{onClick:function(){return k(a,d)},isPrimary:!0,style:{height:"30px"}},"Fetch Post Details"))),React.createElement("div",null,React.createElement(x.BaseControl,{label:"Content Options"},React.createElement(x.ToggleControl,{label:l?"Header Enabled":"Header Disabled",checked:l,onChange:function(){d({enableHeader:!l})}}),React.createElement(x.ToggleControl,{label:r?"Excerpt Enabled":"Excerpt Disabled",checked:r,onChange:function(){d({enableExcerpt:!r})}}),React.createElement(x.ToggleControl,{label:i?"Extras Enabled":"Extras Disabled",checked:i,onChange:function(){d({enableExtra:!i})}}),React.createElement(x.ToggleControl,{label:s?"Breaking News Enabled":"Breaking News Disabled",checked:s,onChange:function(){!1!==window.prcBreakingNews?d({enableBreakingNews:!s}):(alert("There are no currently active, authorized, breaking news events. The breaking news toggle will be set back to false."),d({enableBreakingNews:!1}))}}),React.createElement(x.ToggleControl,{label:m?"Programs":"Formats",checked:m,onChange:function(){d({enableProgramsTaxonomy:!m})}}))),React.createElement("div",null,React.createElement(x.BaseControl,{label:"Style Options"},React.createElement(x.ToggleControl,{label:u?"Emphasis Enabled":"Emphasis Disabled",checked:u,onChange:function(){d({enableEmphasis:!u})}}),!0===r&&("right"===n||"left"===n)&&React.createElement("div",null,React.createElement(x.ToggleControl,{label:c?"Excerpt Will Appear Below":"Excerpt Will Appear Normally",checked:c,onChange:function(){d({enableExcerptBelow:!c})}})))))},S=a(18),O=["image"],N=function(e){var t=e.img,a=e.size,n=e.chartArt,l=e.postId,r=e.setAttributes,c=R(Object(o.useState)(!1),2),i=c[0],s=c[1];return Object(o.useEffect)((function(){0!==l&&!1!==r&&m()({path:"/prc-api/v2/get-art/?postId=".concat(l)}).then((function(e){!1!==e?(s(e),r({image:e[a].rawUrl})):s(!1)}))}),[l,r]),Object(o.useEffect)((function(){!1!==i&&void 0!==i[a]&&!1!==r&&r({image:i[a].rawUrl,isChartArt:i[a].chartArt})}),[i,a]),React.createElement(w.MediaUploadCheck,null,React.createElement(w.MediaUpload,{onSelect:function(e){return r({image:e.url})},allowedTypes:O,render:function(e){var l=e.open;return React.createElement(o.Fragment,null,0===t.length&&React.createElement(S.a,{img:t,size:a,link:"",onClick:l,placeholder:!0}),""!==t&&React.createElement(S.a,{img:t,size:a,link:"",onClick:l}),React.createElement(w.BlockControls,null,React.createElement(x.Toolbar,{controls:[{icon:null,title:"Size",isActive:!1,children:React.createElement(x.SelectControl,{value:a,options:[{value:"XL",label:"XL"},{value:"A1",label:"A1"},{value:"A2",label:"A2"},{value:"A3",label:"A3"},{value:"A4",label:"A4"},{value:"legacy-260",label:"Legacy Homepage 260x260"},{value:"legacy-260-173",label:"Legacy Homepage 260x173"}],onChange:function(e){return r({imageSize:e})},style:{marginBottom:"-8px"}}),onClick:null},{icon:"chart-pie",title:"Chartart",isActive:n,onClick:function(){r({isChartArt:!n})}}]})))}}))},j=function(e){var t,a,n,l,r,c=e.img,i=e.size,o=e.slot,s=e.chartArt,u=e.postId,m=e.setAttributes;return React.createElement("div",{className:(t=!1,a=!1,n=!1,l=!1,r=!1,!1!==o&&("XL"===i?t=!0:"A1"===i?a=!0:"A2"===i?n=!0:"A3"===i?l=!0:"A4"===i&&(r=!0)),h()({ui:!0,XL:t,A1:a,A2:n,A3:l,A4:r,image:!0,bordered:s}))},React.createElement(N,{img:c,size:i,chartArt:s,postId:u,setAttributes:m}))},z=function(e){var t=e.content,a=e.sansSerif,n=e.enabled,l=e.setAttributes;if(!0!==n)return React.createElement(o.Fragment,null);var r=h()("description",{"sans-serif":a});return React.createElement(o.Fragment,null,!1!==l&&React.createElement(w.RichText,{tagName:"div",value:t,onChange:function(e){return l({excerpt:e})},placeholder:t,multiline:"p",className:r}),!1===l&&React.createElement(w.RichText.Content,{tagName:"div",value:t,className:r}))},H=function(e){var t=e.content,a=e.breakingNews,n=e.enabled,l=e.setAttributes;return React.createElement(o.Fragment,null,!1!==l&&!0===n&&React.createElement(w.RichText,{tagName:"ul",value:t,onChange:function(e){return l({extra:e})},placeholder:t,multiline:"li",className:"extra"}),!1===l&&!0===n&&React.createElement(w.RichText.Content,{tagName:"ul",value:t,className:"extra"}),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))},P=a(2);function B(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function T(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function I(e,t,a){return t&&T(e.prototype,t),a&&T(e,a),e}var D=a(51);function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function L(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}var M=a(3);function F(e,t){return!t||"object"!==Object(M.a)(t)&&"function"!=typeof t?Object(D.a)(e):t}function V(e){return(V=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var J=function(e,t){return function(a){var n=e(a),l=a.displayName,r=void 0===l?a.name||"Component":l;return n.displayName="".concat(Object(y.upperFirst)(Object(y.camelCase)(t)),"(").concat(r,")"),n}};function U(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=V(e);if(t){var l=V(this).constructor;a=Reflect.construct(n,arguments,l)}else a=n.apply(this,arguments);return F(this,a)}}function X(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return J((function(t){return function(a){L(l,a);var n=U(l);function l(){var t;return B(this,l),(t=n.apply(this,arguments)).setState=t.setState.bind(Object(D.a)(t)),t.state=e,t}return I(l,[{key:"render",value:function(){return Object(o.createElement)(t,Object(P.a)({},this.props,this.state,{setState:this.setState}))}}]),l}(o.Component)}),"withState")}var Y=X({labelOptions:[]})((function(e){var t=e.label,a=e.date,n=e.taxonomy,l=e.setAttributes,r=e.setState,c=e.labelOptions;return Object(o.useEffect)((function(){(function(e,t){return new Promise((function(a){p(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(a){var n=e[a];t.push({value:n.name,label:n.name})})),t.sort((function(e,t){return e.label>t.label?1:-1})),a(t)}))}))})(n).then((function(e){r({labelOptions:e})}))}),[n]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(x.SelectControl,{value:t,options:c,onChange:function(e){l({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(x.TextControl,{value:a,onChange:function(e){l({date:e})},style:{marginBottom:"0px"},className:"story-label-select"})))})),W=function(e){var t=e.size,a=e.setAttributes,n=function(e){var t=e.level,a=e.isPressed,n=void 0!==a&&a,l={1:"M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z",2:"M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z",3:"M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z",4:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z",5:"M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z",6:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z"};return l.hasOwnProperty(t)?React.createElement(x.SVG,{width:"24",height:"24",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",isPressed:n},React.createElement(x.Path,{d:l[t]})):null};return React.createElement(w.BlockControls,null,React.createElement(x.Toolbar,{controls:[{icon:React.createElement(n,{level:1,isPressed:"large"===t}),title:"Size: Large",isActive:"large"===t,onClick:function(){a({headerSize:"large"})}},{icon:React.createElement(n,{level:2,isPressed:"medium"===t||"normal"===t}),title:"Size: Medium",isActive:"medium"===t,onClick:function(){a({headerSize:"medium"})}},{icon:React.createElement(n,{level:3,isPressed:"small"===t}),title:"Size: Small",isActive:"small"===t,onClick:function(){a({headerSize:"small"})}}]}))},Q=function(e){var t=e.title,a=e.label,n=e.date,l=e.size,r=e.enabled,c=e.taxonomy,i=e.setAttributes,s=e.altHeaderWeight;if(!0!==r)return React.createElement(o.Fragment,null);var u=h()(l,{light:s});return React.createElement(o.Fragment,null,React.createElement(v.a.Meta,null,!1!==i&&React.createElement(Y,{date:n,label:a,taxonomy:c,setAttributes:i}),!1===i&&React.createElement(S.b,{label:a,date:n})),React.createElement(v.a.Header,{className:u},!1!==i&&React.createElement(o.Fragment,null,React.createElement(W,{size:l,setAttributes:i}),React.createElement(w.RichText,{tagName:"div",value:t,onChange:function(e){return i({title:e})},allowedFormats:["italic"],placeholder:"Title",multiline:"br"})),!1===i&&React.createElement(o.RawHTML,null,t)))},q=function(e){var t=e.wpQueryContext,a=e.rootClientId,n=e.postId;console.log("<ContextControls>",t,a,n);var l=t.includes(n);return console.log("isActive?",l),React.createElement(w.BlockControls,null,React.createElement(x.Toolbar,{controls:[{icon:"sticky",title:"Pin This",isActive:l,onClick:function(){var e=t,l=e.findIndex((function(e){return e===n}));-1===l?e.push(n):e.splice(l,1),console.log("dispatching...",n),console.log(e),Object(s.dispatch)("core/block-editor").updateBlockAttributes(a,{pinned:JSON.stringify(e)})}}]}))},G=(a(123),function(e){var t=e.title,a=e.excerpt,n=e.extra,l=e.link,r=e.label,c=e.date,i=e.image,s=e.imageSlot,u=e.imageSize,m=e.isChartArt,d=e.postID,p=e.headerSize,f=e.enableEmphasis,b=e.enableHeader,g=e.enableExcerpt,E=e.enableExcerptBelow,R=e.enableExtra,y=e.enableBreakingNews,w=e.enableProgramsTaxonomy,x=e.className,k=e.isSelected,A=e.setAttributes,S=e.wpQueryContext,O=void 0!==S&&S,N=e.rootClientId,P={postID:d,link:l,imageSlot:s,enableHeader:b,enableExcerpt:g,enableExcerptBelow:E,enableExtra:R,enableBreakingNews:y,enableEmphasis:f,enableProgramsTaxonomy:w,setAttributes:A,inline:void 0===N},B=A;k||(B=!1);var T=!1;!1===g&&(T=!0);var I="Formats";!0===w&&(I="Programs");var D=!0;"left"!==s&&"right"!==s||(D=!1);var _=h()(x,"story",{stacked:D,bordered:f,"alt-description":E}),L=function(){return React.createElement(j,{img:i,size:u,link:l,slot:s,chartArt:m,postId:d,setAttributes:B})},M=function(){return"top"!==s&&"left"!==s?React.createElement(o.Fragment,null):React.createElement(L,null)},F=function(){return"default"!==s?React.createElement(o.Fragment,null):React.createElement(L,null)},V=function(){return"bottom"!==s&&"right"!==s?React.createElement(o.Fragment,null):React.createElement(L,null)};return React.createElement(o.Fragment,null,!1!==O&&React.createElement(q,{wpQueryContext:O,rootClientId:N,postId:d}),React.createElement(v.a,{as:"article",className:_},React.createElement(M,null),React.createElement(v.a.Content,null,React.createElement(Q,{enabled:b,title:t,date:c,label:r,link:l,size:p,taxonomy:I,setAttributes:B,altHeaderWeight:T}),React.createElement(F,null),!0!==E&&React.createElement(z,{enabled:g,content:a,sansSerif:!b,setAttributes:B}),React.createElement(H,{enabled:R,content:n,breakingNews:y,setAttributes:B})),React.createElement(V,null),!0===E&&React.createElement(z,{enabled:g,content:a,sansSerif:!b,setAttributes:B})),!0===k&&React.createElement(C,P))}),$=(b.a,a(124),a(84),a(100)),K=a(0);X({termsData:[],excludeData:[],includeData:[]})((function(e){var t=e.termsData,a=e.excludeData,n=e.includeData,l=e.setState,r=e.exclude,c=e.include,i=(e.letter,e.taxonomy),s=e.setAttributes,u=e.isSelected,d=function(){(function(e,t){return new Promise((function(a){m()({path:"/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=".concat(e,"&letter=").concat(t)}).then((function(e){a(e)}))}))})(i,100).then((function(e){l({termsData:e}),function(e){var t={};if(0!==e.length&&0!==r.length&&(t.excludeData=JSON.parse(r)),0!==e.length&&0===c.length){var a=[];e.map((function(e){a.push({id:e.term_id,name:e.name,slug:e.slug})})),s({include:JSON.stringify(a)}),t.includeData=a}else 0!==e.length&&0!==c.length&&(t.includeData=JSON.parse(c));l(t)}(e)}))};!1!==s&&function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){return null};Object(K.useEffect)(Object(K.useCallback)((function(){e()}),[e]),[])}((function(){0===t.length&&d()}));var p=0!==c.length&&!1===s&&JSON.parse(c);return React.createElement("div",{className:"ui link list"},!1!==p&&React.createElement(o.Fragment,null,p.map((function(e){return React.createElement("a",{className:"item",href:"/".concat(i.toLowerCase(),"/").concat(e.slug)},e.name)}))),!1!==s&&React.createElement(o.Fragment,null,t.map((function(e){var t=r.includes(e.term_id);return React.createElement("div",{className:"item"},React.createElement(x.CheckboxControl,{label:Object($.decodeEntities)(e.name),checked:t,onChange:function(t){var l,r,c,i,o,u,m;l=t,r=e.term_id,c=e.name,i=e.slug,u=a,m=n,!0===l?(u.push(r),-1!==(o=m.findIndex((function(e){return e.id===r})))&&m.splice(o,1)):(m.push({id:r,name:c,slug:i}),function(){var e=u.indexOf(r);-1!==e&&u.splice(e,1)}()),s({exclude:JSON.stringify(u),include:JSON.stringify(m)})},"data-termid":e.term_id,"data-term":e.name}),React.createElement("div",{style:{height:"15px",marginTop:"-5px"}},!0===u&&React.createElement("pre",{style:{fontSize:"11px",margin:0}},"(",e.slug,")")))}))))}));var Z=function(e){var t=e.attributes,a=e.setAttributes,n=e.isSelected,l=e.clientId,r=e.context,c=Object(s.useSelect)((function(e){return{rootClientId:e("core/block-editor").getBlockRootClientId(l)}}),[l]).rootClientId;!function(e,t){f("is-style-top",e,"imageSlot","top",t),f("is-style-bottom",e,"imageSlot","bottom",t),f("is-style-left",e,"imageSlot","left",t),f("is-style-right",e,"imageSlot","right",t),f("is-style-disabled",e,"imageSlot","disabled",t),f("is-style-default",e,"imageSlot","default",t)}(t.className,a);var i=t;return i.isSelected=n,i.setAttributes=a,i.rootClientId=c,i.wpQueryContext=!1,r.hasOwnProperty("prc-block/wp-query")&&(i.wpQueryContext=JSON.parse(r["prc-block/wp-query"])),console.log("StoryItem Context?",r),console.log(i),React.createElement(G,i)},ee=function(e){e.attributes;return React.createElement(o.Fragment,null)},te={from:[{type:"raw",isMatch:function(e){return"P"===e.nodeName&&/^https?:\/\/(www\.)?pewresearch\.(org|local)\/((?!staff).)*$/i.test(e.textContent)},transform:function(e){return Object(c.createBlock)("prc-block/story-item",{link:e.textContent.trim(),className:"is-style-default",imageSize:"A1",imageSlot:"default"})}}],to:[{type:"block",blocks:["prc-block/story-item"],transform:function(e){var t=e.url;return Object(c.createBlock)("prc-block/story-item",{link:t,className:"is-style-default",imageSize:"A1",imageSlot:"default"})}}]};function ae(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function ne(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ae(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ae(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var le=i.name,re={title:Object(r.__)("Story Item"),icon:"format-aside",description:Object(r.__)("A story item is a visual display of a stub post (which is a database reference to a post)."),keywords:[Object(r.__)("prc"),Object(r.__)("story"),Object(r.__)("post"),Object(r.__)("story item")],example:{attributes:{title:"Ultricies Ipsum Nibh Egestas Purus",excerpt:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>",extra:"<li></li>",link:"#",label:"Report",date:l().format("MM-DD-YYYY"),image:"https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg",imageSlot:"top",imageSize:"A2"}},transforms:te,edit:Z,save:ee};Object(c.registerBlockType)(le,ne(ne({},i),re))},18:function(e,t,a){"use strict";a.d(t,"a",(function(){return d})),a.d(t,"b",(function(){return g}));var n=a(1),l=a(36),r=a(56),c={default:"564,317",small:"690,388",hidpi:"1128,634",smallHidpi:"1380,776"},i={default:"268,151",small:"690,388",hidpi:"536,301",smallHidpi:"1380,776"},o={default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"},s={default:"268,151",small:"690,388",hidpi:"536,302",smallHidpi:"1380,776"},u={default:"720,405",small:"690,388",hidpi:"1440,810",smallHidpi:"1380,776"},m={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},d=function(e){var t=e.img,a=e.size,d=e.link,p=e.onClick,f=void 0!==p&&p,b=e.placeholder,g=void 0!==b&&b,h=function(e){if(!0===g){return"https://via.placeholder.com/".concat("A2"===a?"536x301":"A3"===a?"388x220":"A4"===a?"536x302":"XL"===a?"1440x810":"1128x634",".png?text=").concat(a)}if(""===t||!1===t)return t;var n={resize:c[e]};return"A2"===a?n={resize:i[e]}:"A3"===a?n={resize:o[e]}:"A4"===a?n={resize:s[e]}:"XL"===a&&(n={resize:u[e]}),"legacy-260"===a?n={resize:m[260][e]}:"legacy-260-173"===a&&(n={resize:m["260-173"][e]}),Object(r.addQueryArgs)(t,n)},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:767;return[{srcSet:"".concat(h("default")," 1x, ").concat(h("hidpi")," 2x"),media:"(min-width: ".concat(e,"px)")},{srcSet:"".concat(h("small")," 1x, ").concat(h("smallHidpi")," 2x"),media:"(max-width: ".concat(e,"px)")}]};return!1!==f?React.createElement("div",{onClick:f},!0===g&&React.createElement("img",{src:h(),alt:"Click to insert"}),!0!==g&&React.createElement(l.a,{sources:v(),alt:"Click to edit"})):React.createElement(n.Fragment,null,""===d&&React.createElement(l.a,{sources:v()}),""!==d&&React.createElement("a",{href:d},React.createElement(l.a,{sources:v()})))},p=a(6),f=a.n(p),b=a(22),g=function(e){var t=e.label,a=void 0===t?"Report":t,l=e.date,r=a.replace(/\s+/g,"-").toLowerCase(),c=f()(r,"label"),i=b(l).format("MMM D, YYYY");return React.createElement(n.Fragment,null,React.createElement("span",{className:c},a||"Report")," | ",React.createElement("span",{className:"date"},i))}},22:function(e,t){e.exports=moment},26:function(e,t){e.exports=wp.i18n},37:function(e,t){e.exports=wp.apiFetch},42:function(e,t,a){"use strict";var n=a(6),l=a.n(n),r=a(1),c=a(73),i=a(140),o=a(18),s=function(e){var t,a,n,r,c,i=e.img,s=e.link,u=e.size,m=e.slot,d=e.chartArt;return React.createElement("div",{className:(t=!1,a=!1,n=!1,r=!1,c=!1,!1!==m&&("XL"===u?t=!0:"A1"===u?a=!0:"A2"===u?n=!0:"A3"===u?r=!0:"A4"===u&&(c=!0)),l()({ui:!0,XL:t,A1:a,A2:n,A3:r,A4:c,image:!0,bordered:d}))},React.createElement(o.a,{img:i,size:u,link:s}))},u=function(e){var t=e.content,a=e.sansSerif;if(!0!==e.enabled)return React.createElement(r.Fragment,null);var n=l()("description",{"sans-serif":a});return React.createElement("div",{className:n},React.createElement(r.RawHTML,null,t))},m=function(e){var t=e.content,a=e.breakingNews,n=e.enabled;return React.createElement(r.Fragment,null,!0===n&&React.createElement(i.a.Extra,{as:"ul"},React.createElement(r.RawHTML,null,t)),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))},d=o.b,p=function(e){var t=e.title,a=e.label,n=e.date,c=e.link,o=e.size,u=e.enabled,m=e.isStyleMobileLoop,p=e.image,f=e.imageSize,b=e.isChartArt,g=e.altHeaderWeight;if(!0!==u)return React.createElement(r.Fragment,null);var h=l()(o,{light:g});return React.createElement(r.Fragment,null,React.createElement(i.a.Meta,null,React.createElement(d,{label:a,date:n})),React.createElement(i.a.Header,{className:h},!0===m&&React.createElement(s,{img:p,size:f,link:c,slot:"left",chartArt:b}),React.createElement("a",{href:c},React.createElement(r.RawHTML,null,t))))};t.a=function(e){var t=e.title,a=e.excerpt,n=e.extra,o=e.link,d=e.label,f=e.date,b=e.image,g=e.imageSlot,h=e.imageSize,v=e.isChartArt,E=e.headerSize,R=e.enableEmphasis,y=e.enableHeader,w=e.enableExcerpt,x=e.enableExcerptBelow,k=e.enableExtra,A=e.enableBreakingNews,C=e.extraContent,S=void 0!==C&&C,O=e.className,N=e.inLoop,j=void 0!==N&&N,z=Object(c.a)("(max-width: 767px)"),H=!1;!1===w&&(H=!0);var P=!0;"left"!==g&&"right"!==g||(P=!1);var B=!1;!0===j&&!0===z&&(B=!0),!1===j&&!0===z&&"disabled"!==g&&(g="top");var T=l()(O,"story",{stacked:P,bordered:R,"alt-description":x,"is-style-mobile-loop":B}),I=function(){return React.createElement(s,{img:b,size:h,link:o,slot:g,chartArt:v,onClick:function(){window.location=o}})},D=function(){return"top"!==g&&"left"!==g||!0===j&&!0===z?React.createElement(r.Fragment,null):React.createElement(I,null)},_=function(){return"default"!==g||!0===j&&!0===z?React.createElement(r.Fragment,null):React.createElement(I,null)},L=function(){return"bottom"!==g&&"right"!==g||!0===j&&!0===z?React.createElement(r.Fragment,null):React.createElement(I,null)};return React.createElement(i.a,{as:"article",className:T},React.createElement(D,null),React.createElement(i.a.Content,null,React.createElement(p,{enabled:y,title:t,date:f,label:d,link:o,size:E,isStyleMobileLoop:B,image:b,imageSize:h,chartArt:v,altHeaderWeight:H}),React.createElement(_,null),!0!==x&&React.createElement(u,{enabled:w,content:a,sansSerif:!y}),!0===x&&!0===z&&React.createElement(u,{enabled:w,content:a,sansSerif:!y}),React.createElement(m,{enabled:k,content:n,breakingNews:A}),!1!==S&&React.createElement(r.RawHTML,null,S)),React.createElement(L,null),!0===x&&!1===z&&React.createElement(u,{enabled:w,content:a,sansSerif:!y}))}},50:function(e,t){e.exports=ReactDOM},56:function(e,t){e.exports=wp.url},57:function(e,t){e.exports=wp.blocks},60:function(e,t){e.exports=lodash},62:function(e,t){e.exports=wp.data},7:function(e,t){e.exports=wp.components},80:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/story-item","category":"layout","attributes":{"title":{"type":"string"},"excerpt":{"type":"string","multiline":"p","default":"<p>Excerpt</p>"},"extra":{"type":"string","multiline":"li"},"link":{"type":"string"},"label":{"type":"string","default":"Report"},"date":{"type":"string"},"image":{"type":"string"},"imageSlot":{"type":"string","default":"default"},"imageSize":{"type":"string","default":"A1"},"isChartArt":{"type":"boolean","default":false},"postID":{"type":"integer"},"headerSize":{"type":"string","default":"normal"},"enableAltHeaderWeight":{"type":"boolean","default":false},"enableEmphasis":{"type":"boolean","default":false},"enableHeader":{"type":"boolean","default":true},"enableExcerpt":{"type":"boolean","default":true},"enableExcerptBelow":{"type":"boolean","default":false},"enableExtra":{"type":"boolean","default":false},"enableBreakingNews":{"type":"boolean","default":false},"enableProgramsTaxonomy":{"type":"boolean","default":false}},"usesContext":["prc-block/wp-query"],"styles":[{"name":"default","label":"Default Image Alignment","isDefault":true},{"name":"top","label":"Image Aligned Top"},{"name":"bottom","label":"Image Aligned Bottom"},{"name":"left","label":"Image Aligned Left"},{"name":"right","label":"Image Aligned Right"},{"name":"disabled","label":"Disable Image"}],"supports":{"html":false}}')},83:function(e,t,a){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}a.d(t,"a",(function(){return n}))},99:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(83);function l(e,t){if(e){if("string"==typeof e)return Object(n.a)(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Object(n.a)(e,t):void 0}}}},[[112,0,1]]]);
//# sourceMappingURL=main-97c47f96.js.map