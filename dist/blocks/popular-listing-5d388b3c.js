/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.9
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2022 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[22],{1:function(e,t){e.exports=window.React},119:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return l}));var o=n(51),r=n(32),c=n.n(r),i=function(e,t,n){0!==t&&!1!==n&&c()({path:"/prc-api/v2/get-art/?postId=".concat(t)}).then((function(t){!1!==t&&void 0!==t[e]&&!1!==n&&n({image:t[e].rawUrl,isChartArt:t[e].chartArt})}))},a=function e(t){var n=t.post,r=t.imageSize,c=t.isRefresh,i=void 0!==c&&c;console.log(e,n);var a=new Date(n.date),l=o(a).format("MMM D, YYYY"),s={title:n.title.hasOwnProperty("rendered")?n.title.rendered:n.title,excerpt:n.excerpt.hasOwnProperty("rendered")?n.excerpt.rendered:n.excerpt,url:n.link,label:n.hasOwnProperty("label")?n.label:"Report",date:l,postId:n.id};if(!0!==i&&(s.extra=""),n.art){var u=n.art;s.image=u[r].rawUrl,s.isChartArt=u[r].chartArt}return console.log("getAttributesFromPost",n,s),s},l=function(e){var t=e.setAttributes,n=e.postId,o=void 0!==n&&n,r=e.url,i=void 0!==r&&r,l=e.imageSize,s=void 0===l?"A1":l,u=e.isRefresh,d=void 0!==u&&u;!1===o&&!1===i||void 0===t||(!1!==i&&function(e){var t=e.url,n=e.imageSize;return new Promise((function(e,o){c()({path:"/prc-api/v2/blocks/story-item/get-post-by-url",method:"POST",data:{url:t}}).then((function(t){if(console.log("getAttributesFromURL",t),!1!==t){var r=a({post:t,imageSize:n,isRefresh:!1});e(r)}else o(t)})).catch((function(e){console.error(e),o(e)}))}))}({url:i,imageSize:s}).then((function(e){console.log("setPostAttributes -> by url:",e),t(e)})).catch((function(e){console.error(e)})),c()({path:"/wp/v2/stub/".concat(o),method:"GET"}).then((function(e){if(console.log("setPostAttributes -> by id:",o,e),!1!==e){var n=a({post:e,imageSize:s,isRefresh:d});t(n)}})).catch((function(e){return console.error(e)})))}},14:function(e,t){e.exports=window.wp.data},166:function(e,t,n){"use strict";n.d(t,"a",(function(){return A})),n.d(t,"b",(function(){return D}));var o=n(68),r=n(44),c=n(65),i=n(921),a=n(207),l=n(86),s=n(14),u=n(3),d=n(2),p=n(40);var b,m,f,h,g=function(e,t){var n=Object(u.useState)(e),o=Object(r.a)(n,2),c=o[0],i=o[1];return Object(u.useEffect)((function(){var n=setTimeout((function(){i(e)}),t);return function(){clearTimeout(n)}}),[e,t]),c},v=n(4),O=n(32),y=n.n(O),j=n(39),k=n(76),w=Object(l.a)(v.Button)(b||(b=Object(c.a)(["\n\t&:hover {\n\t\t/* Add opacity background to support future color changes */\n\t\t/* Reduce background from #ddd to 0.05 for text contrast  */\n\t\tbackground-color: rgba(0, 0, 0, 0.05);\n\n\t\t.block-editor-link-control__search-item-type {\n\t\t\tcolor: black;\n\t\t}\n\t}\n\n\t.block-editor-link-control__search-item-type {\n\t\tbackground-color: rgba(0, 0, 0, 0.05);\n\t}\n"]))),x=function(e){var t=e.suggestion,n=e.onClick,o=e.searchTerm,r=e.isSelected,c=e.id,i=e.contentTypes,a=t.type&&i.length>1;return React.createElement(v.Tooltip,{text:Object(k.decodeEntities)(t.title)},React.createElement(w,{id:c,onClick:n,className:"block-editor-link-control__search-item is-entity ".concat(r&&"is-selected"),style:{borderRadius:"0",boxSizing:"border-box"}},React.createElement("span",{className:"block-editor-link-control__search-item-header"},React.createElement("span",{className:"block-editor-link-control__search-item-title",style:{paddingRight:a?null:0}},React.createElement(v.TextHighlight,{text:Object(k.decodeEntities)(t.title),highlight:o})),React.createElement("span",{"aria-hidden":!0,className:"block-editor-link-control__search-item-info",style:{paddingRight:a?null:0}},Object(j.filterURLForDisplay)(Object(j.safeDecodeURI)(t.url))||"")),a&&React.createElement("span",{className:"block-editor-link-control__search-item-type"},"post_tag"===t.type?"tag":t.type)))},R="prc-content-search",E={},S=function(e){var t=e.onSelectItem,n=e.placeholder,o=e.label,i=e.style,a=void 0===i?"search":i,l=e.contentTypes,s=e.mode,b=e.excludeItems,f=e.perPage,h=Object(u.useState)(""),O=Object(r.a)(h,2),j=O[0],k=O[1],w=g(j,500),S=Object(u.useState)([]),P=Object(r.a)(S,2),_=P[0],I=P[1],C=Object(u.useState)(!1),N=Object(r.a)(C,2),T=N[0],A=N[1],D=Object(u.useState)(null),B=Object(r.a)(D,2),L=B[0],z=B[1],F=Object(u.useRef)(),U=Object(u.useRef)(!0),H=function(e){return e.filter((function(e){var t=!0;return b.length&&(t=b.every((function(t){return t.id!==e.id}))),t}))},M=!!w.length,Y=!!_.length,V=function(e){F.current&&F.current.abort();var t=e.match(/^(http|https):\/\//);if(""===e.trim())return A(!1),I([]),void(F.current=null);F.current=new AbortController,A(!0);var n,o="wp/v2/search/?search=".concat(e,"&subtype=").concat(l.join(","),"&type=").concat(s,"&_embed&per_page=").concat(f);E[o]?(F.current=null,I(H(E[o])),A(!1)):t?(n=e,void 0!==n&&new Promise((function(e,t){y()({path:"/prc-api/v2/utils/get-post-by-url",method:"POST",data:{url:n}}).then((function(t){console.log("getPostByUrl",t),e(t)})).catch((function(e){return t(e)}))}))).then((function(e){if(U.current){var t=e.ID,n=e.post_title,r=e.post_type,c=e.permalink;F.current=null;var i=[{id:t,subtype:r,title:n,type:"post",url:c}];console.log("this is where we should do our stuff...",i,e),E[o]=i,I(H(i)),A(!1)}})):y()({path:o,signal:F.current.signal}).then((function(e){!1!==U.current&&(console.log("search Results",e),F.current=null,E[o]=e,I(H(e)),A(!1))})).catch((function(e,t){"fetch_error"!==e.code&&(I([]),F.current=null,A(!1))}))};Object(u.useEffect)((function(){return function(){U.current=!1}}),[]),Object(u.useEffect)((function(){""!==w&&V(w)}),[w]);var J=Object(p.a)(m||(m=Object(c.a)(["\n\t\t/* stylelint-disable */\n\t\tmax-height: 350px;\n\t\toverflow-y: auto;\n\t"])));return Object(p.b)(v.NavigableMenu,{onNavigate:function(e){0===e&&z(null),z(e)},orientation:"vertical"},Object(p.b)("div",{style:{display:"flex"}},Object(p.b)("div",{style:{flexGrow:"1"}},"minimal"===a&&Object(p.b)(v.TextControl,{label:o,value:j,onChange:function(e){return k(e)},placeholder:n,autoComplete:"off"}),"search"===a&&Object(p.b)(v.SearchControl,{value:j,onChange:function(e){return k(e)},placeholder:n})),T&&Object(p.b)("div",{style:{position:"absolute",right:"minimal"===a?"8px":"50px",marginTop:"minimal"===a?"27px":"10px"}},Object(p.b)(v.Spinner,null))),M?Object(p.b)("ul",{className:"".concat(R,"-list"),style:{marginTop:"0",marginBottom:"0",marginLeft:"0",paddingLeft:"0",listStyle:"none"},css:J},!T&&!Y&&Object(p.b)("li",{className:"".concat(R,"-list-item components-button"),style:{color:"inherit",cursor:"default",paddingLeft:"3px"}},Object(d.__)("Nothing found.","prc-block-components")),!T&&_.map((function(e,n){return e.title.length?Object(p.b)("li",{key:e.id,className:"".concat(R,"-list-item"),style:{marginBottom:"0"}},Object(p.b)(x,{onClick:function(){return function(e){I([]),k(""),t(e)}(e)},searchTerm:w,suggestion:e,contentTypes:l,isSelected:L===n+1})):null}))):null)},P=n(91),_=Object(P.c)((function(){return React.createElement("svg",{style:{marginRight:"5px",cursor:"grab",flexShrink:0},width:"18",height:"18",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M5 4h2V2H5v2zm6-2v2h2V2h-2zm-6 8h2V8H5v2zm6 0h2V8h-2v2zm-6 6h2v-2H5v2zm6 0h2v-2h-2v2z"}))})),I=Object(l.a)("div")(f||(f=Object(c.a)(["\n\tbutton {\n\t\tdisplay: block;\n\t\tpadding: 2px 8px 6px 8px;\n\t\tmargin-left: auto;\n\t\tfont-size: 2em;\n\t\tcursor: pointer;\n\t\tborder: none;\n\t\tbackground-color: transparent;\n\n\t\t&:hover {\n\t\t\tbackground-color: #ccc;\n\t\t}\n\t}\n"]))),C=function(e){var t=e.item,n=e.isOrderable,o=void 0!==n&&n,r=e.handleItemDelete,c=e.mode,i="post"===c?"postType":"taxonomy",a=Object(s.useSelect)((function(e){var n=e("core"),o=n.getEntityRecord,r=n.hasFinishedResolution,a=[i,t.type,t.id],l=o.apply(void 0,a);if(l){console.log("Has Item",l);var s={title:"post"===c?l.title.rendered:l.name,url:l.link,id:l.id};return t.uuid&&(s.uuid=t.uuid),s}if(r("getEntityRecord",a))return null}),[t.id,i]);return Object(u.useEffect)((function(){null===a&&r(t)}),[t,r,a]),a?React.createElement(I,{style:{border:"2px dashed #ddd",paddingTop:"10px",paddingBottom:"10px",paddingLeft:o?"3px":"8px"},className:"block-editor-link-control__search-item is-entity"},o?React.createElement(_,null):"",React.createElement("span",{className:"block-editor-link-control__search-item-header"},React.createElement("span",{className:"block-editor-link-control__search-item-title"},Object(k.decodeEntities)(a.title)),React.createElement("span",{"aria-hidden":!0,className:"block-editor-link-control__search-item-info"},Object(j.filterURLForDisplay)(Object(j.safeDecodeURI)(a.url))||"")),React.createElement("button",{type:"button",onClick:function(){r(a)},"aria-label":Object(d.__)("Delete item","10up-block-components")},"×")):React.createElement("div",null)},N=Object(P.a)((function(e){var t=e.items,n=e.isOrderable,o=e.handleItemDelete,r=e.mode,c=e.ChildComponent,i=void 0!==c&&c,a=!1!==i?n?Object(P.b)(i):i:n?Object(P.b)(C):C;return React.createElement("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'}},t.map((function(e,c){var i=e.uuid?e.uuid:e.id;return React.createElement(a,{isOrderable:!!(n&&t.length>1)&&n,key:"item-".concat(i),index:c,handleItemDelete:o,sortIndex:c,item:e,mode:r,totalItems:t.length})})))})),T=Object(l.a)("div")(h||(h=Object(c.a)(["\n\t& .block-editor-link-control__search-item {\n\t\tborder: none !important;\n\t\tcursor: default;\n\n\t\t&:hover {\n\t\t\tbackground: transparent;\n\t\t}\n\t}\n"]))),A=function(e){var t,n=e.label,c=e.placeholder,l=e.mode,p=void 0===l?"post":l,b=e.contentTypes,m=void 0===b?["post","page"]:b,f=e.onPickChange,h=void 0===f?function(e){console.log("Content picker list change",e)}:f,g=e.maxContentItems,v=void 0===g?1:g,O=e.isOrderable,y=void 0!==O&&O,j=e.singlePickedLabel,k=void 0===j?Object(d.__)("You have selected the following item:","prc-block-components"):j,w=e.multiPickedLabel,x=void 0===w?Object(d.__)("You have selected the following items:","prc-block-components"):w,R=e.value,E=void 0===R?[]:R,P=e.uniqueContentItems,_=void 0===P||P,I=e.excludeCurrentPost,C=void 0===I||I,A=e.perPage,D=void 0===A?50:A,B=e.PickedItemChild,L=void 0!==B&&B,z=e.searchStyle,F=void 0===z?"search":z,U=Object(u.useState)(E),H=Object(r.a)(U,2),M=H[0],Y=H[1],V=null===(t=Object(s.select)("core/editor"))||void 0===t?void 0:t.getCurrentPostId();Object(u.useEffect)((function(){console.log("Init content state",E)}),[]),Object(u.useEffect)((function(){console.log("useEffect onPickChange->",M),h(M)}),[M]);var J=Object(u.useMemo)((function(){var e=_?Object(o.a)(M):[];return C&&V&&e.push({id:V}),e}),[M,V,C,_]);return React.createElement("div",{className:"".concat("prc-content-picker")},(!M.length||M.length&&M.length<v)&&React.createElement(S,{placeholder:c,label:n,excludeItems:J,onSelectItem:function(e){console.log("handleSelect->",e),Y((function(t){return[{id:e.id,uuid:Object(i.a)(),type:"subtype"in e?e.subtype:e.type,url:e.url}].concat(Object(o.a)(t))}))},contentTypes:m,mode:p,perPage:D,style:F}),Boolean(null==M?void 0:M.length)>0&&React.createElement(T,null,React.createElement("span",{style:{marginTop:"15px",marginBottom:"2px",display:"block"}},M.length>1?x:k),React.createElement(N,{items:M,useDragHandle:!0,handleItemDelete:function(e){Y((function(t){return t.filter((function(t){var n=t.id,o=t.uuid;return e.uuid?o!==e.uuid:n!==e.id}))}))},isOrderable:y,mode:p,onSortEnd:function(e){var t=e.oldIndex,n=e.newIndex,r=Object(o.a)(Object(a.default)(M,t,n));console.log("newContent?",r),Y(r)},ChildComponent:L})))},D=function(e){var t=e.blockProps,n=e.onChange,o=e.onSkip,r=e.mode,c=void 0===r?"post":r,i=e.contentTypes,a=void 0===i?["stub"]:i,l=e.label,s=void 0===l?Object(d.__)("Search for a post","prc-block-components"):l,p=e.placeholder,b=void 0===p?Object(d.__)("Search for a post or pate in a url...","prc-block-components"):p,m=e.value,f=void 0===m?[]:m,h=e.loadingComponent,g=void 0!==h&&h,O=e.children;return React.createElement("div",t,React.createElement(v.Placeholder,{label:"".concat(s,":"),isColumnLayout:!0},!1!==g&&React.createElement("div",{style:{textAlign:"center"}},React.createElement(v.Spinner,null),React.createElement("p",{className:"sans-serif"},"Loading object...")),!1===g&&React.createElement(u.Fragment,null,O,React.createElement(A,{onPickChange:function(e){console.log("Step1:",e),n(e)},mode:c,label:"".concat(s," or enter a url:"),placeholder:b,contentTypes:a,value:f}),React.createElement(v.Button,{isLink:!0,onClick:function(){o()},text:Object(d.__)("Skip"),style:{paddingLeft:"9px"}}))))}},2:function(e,t){e.exports=window.wp.i18n},21:function(e,t){e.exports=window.wp.primitives},3:function(e,t){e.exports=window.wp.element},308:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/popular-listing","description":"A popular post, must be placed in a group block for numbers to appear.","title":"Popular Listing","category":"layout","attributes":{"title":{"type":"string"},"url":{"type":"string"},"postId":{"type":"integer"},"blockIndexAttr":{"type":"integer"},"enableNumber":{"type":"boolean"}},"supports":{"html":false}}')},32:function(e,t){e.exports=window.wp.apiFetch},39:function(e,t){e.exports=window.wp.url},4:function(e,t){e.exports=window.wp.components},5:function(e,t){e.exports=window.wp.blockEditor},51:function(e,t){e.exports=moment},52:function(e,t){e.exports=window.ReactDOM},76:function(e,t){e.exports=window.wp.htmlEntities},862:function(e,t,n){n(23),e.exports=n(919)},9:function(e,t){e.exports=window.wp.blocks},919:function(e,t,n){"use strict";n.r(t);var o=n(10),r=n(2),c=n(9),i=n(397),a=n(308),l=n(5),s=n(3),u=n(14),d=(n(4),n(17)),p=n(166),b=n(119);n(32);function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var h=function(e){var t=e.setAttributes,n=e.blockProps,o=Object(s.useState)(!1),c=Object(d.a)(o,2),i=c[0],a=c[1];return React.createElement(p.b,{onChange:function(e){var n,o;e.length>0&&void 0!==e[0].id&&(a(!0),n=e[0].id,o=e[0].title,Object(b.b)({postId:n,title:o,setAttributes:t}))},onSkip:function(){t({postId:0})},label:Object(r.__)("Search for a popular post","prc-block-library"),blockProps:f(f({},n),{},{style:{marginBottom:"16px"}}),loadingComponent:i})},g=function(e){var t=e.attributes,n=e.setAttributes,o=e.isSelected,r=e.clientId,c=t.title,i=t.link,a=t.postId,d=(t.blockIndexAttr,t.enableNumber,Object(l.useBlockProps)()),p=Object(u.useSelect)((function(e){var t,n=e("core/block-editor").getBlockRootClientId(r);return null==n||"string"==typeof n&&0===n.length?{blockIndex:null,numberEnabled:!1}:("core/group"===e("core/block-editor").getBlock(n).name&&(t=e("core/block-editor").getBlockIndex(r,n)),{blockIndex:t,numberEnabled:!0})}),[r]),b=p.blockIndex,m=p.numberEnabled;return Object(s.useEffect)((function(){n({blockIndexAttr:b}),n(1==m?{enableNumber:!0}:{enableNumber:!1})}),[b]),!0!==o&&b>=0?React.createElement("div",d,React.createElement("div",{class:"main"},m&&React.createElement("span",{className:"big-number"},b+1),React.createElement("h2",{className:"my-class"},React.createElement("a",{href:i}," ",c)))):!0!==o?React.createElement("div",Object.assign({},d,{style:{padding:"5px"}}),c):void 0===a?React.createElement(h,{setAttributes:n,blockProps:d}):React.createElement("div",d,a&&React.createElement("article",{className:"item story stacked",style:{border:"2px solid gray"}},React.createElement("div",{className:"content"},React.createElement("div",{className:"header small light"},React.createElement("a",{href:i},React.createElement(l.RichText,{tagName:"p",value:c,onChange:function(e){return n({title:e})},placeholder:"How we did this",keepPlaceholderOnFocus:!0,style:{fontFamily:"Abril",fontWeight:"400",fontSize:"18px",color:"#2a2a2a",lineHeight:"128%"}}))))))},v=function(){return React.createElement(s.Fragment,null)};function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var j=a.name,k={icon:i.a,edit:g,save:v};Object(c.registerBlockType)(j,y(y({},a),k))}},[[862,0,54]]]);
//# sourceMappingURL=popular-listing-5d388b3c.js.map