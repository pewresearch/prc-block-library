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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[38],{0:function(e,t){e.exports=window.React},10:function(e,t){e.exports=window.wp.blocks},12:function(e,t){e.exports=window.wp.data},14:function(e,t,n){"use strict";function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return c}))},150:function(e,t,n){"use strict";n.d(t,"a",(function(){return L})),n.d(t,"c",(function(){return v})),n.d(t,"b",(function(){return A}));var c=n(68),o=n(45),r=n(66),a=n(932),i=n(195),l=n(78),s=n(12),u=n(2),d=n(3),p=n(4),b=n(39);var f,m,h,g,v=function(e,t){var n=Object(u.useState)(e),c=Object(o.a)(n,2),r=c[0],a=c[1];return Object(u.useEffect)((function(){var n=setTimeout((function(){a(e)}),t);return function(){clearTimeout(n)}}),[e,t]),r},O=n(23),y=n.n(O),j=n(32),k=n(72),w=Object(l.a)(p.Button)(f||(f=Object(r.a)(["\n\t&:hover {\n\t\t/* Add opacity background to support future color changes */\n\t\t/* Reduce background from #ddd to 0.05 for text contrast  */\n\t\tbackground-color: rgba(0, 0, 0, 0.05);\n\n\t\t.block-editor-link-control__search-item-type {\n\t\t\tcolor: black;\n\t\t}\n\t}\n\n\t.block-editor-link-control__search-item-type {\n\t\tbackground-color: rgba(0, 0, 0, 0.05);\n\t}\n"]))),E=function(e){var t=e.suggestion,n=e.onClick,c=e.searchTerm,o=e.isSelected,r=e.id,a=e.contentTypes,i=t.type&&a.length>1;return React.createElement(p.Tooltip,{text:Object(k.decodeEntities)(t.title)},React.createElement(w,{id:r,onClick:n,className:"block-editor-link-control__search-item is-entity ".concat(o&&"is-selected"),style:{borderRadius:"0",boxSizing:"border-box"}},React.createElement("span",{className:"block-editor-link-control__search-item-header"},React.createElement("span",{className:"block-editor-link-control__search-item-title",style:{paddingRight:i?null:0}},React.createElement(p.TextHighlight,{text:Object(k.decodeEntities)(t.title),highlight:c})),React.createElement("span",{"aria-hidden":!0,className:"block-editor-link-control__search-item-info",style:{paddingRight:i?null:0}},Object(j.filterURLForDisplay)(Object(j.safeDecodeURI)(t.url))||"")),i&&React.createElement("span",{className:"block-editor-link-control__search-item-type"},"post_tag"===t.type?"tag":t.type)))},x="prc-content-search",R={},_=function(e){var t=e.onSelectItem,n=e.placeholder,c=e.label,a=e.style,i=void 0===a?"search":a,l=e.contentTypes,s=e.mode,f=e.excludeItems,h=e.perPage,g=Object(u.useState)(""),O=Object(o.a)(g,2),j=O[0],k=O[1],w=v(j,500),_=Object(u.useState)(!1),S=Object(o.a)(_,2),P=S[0],C=S[1],T=Object(u.useState)([]),I=Object(o.a)(T,2),D=I[0],N=I[1],L=Object(u.useState)(!1),B=Object(o.a)(L,2),A=B[0],F=B[1],z=Object(u.useState)(null),U=Object(o.a)(z,2),H=U[0],M=U[1],V=Object(u.useRef)(),J=Object(u.useRef)(!0),Y=function(e){return void 0!==e&&new Promise((function(t,n){y()({path:"/prc-api/v2/utils/get-post-by-url",method:"POST",data:{url:e}}).then((function(e){console.log("getPostByUrl",e),t(e)})).catch((function(e){return n(e)}))}))},q=function(e){return e.filter((function(e){var t=!0;return f.length&&(t=f.every((function(t){return t.id!==e.id}))),t}))},G=!!w.length,Q=!!D.length;Object(u.useEffect)((function(){return function(){J.current=!1}}),[]),Object(u.useEffect)((function(){if(""!==w){var e=w.match(/^(http|https):\/\//);C(e),function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(V.current&&V.current.abort(),""===e.trim())return F(!1),N([]),void(V.current=null);V.current=new AbortController,F(!0);var n="wp/v2/search/?search=".concat(e,"&subtype=").concat(l.join(","),"&type=").concat(s,"&_embed&per_page=").concat(h);R[n]?(V.current=null,N(q(R[n])),F(!1)):t?(console.log("isUrl",e),Y(e).then((function(e){if(J.current){var t=e.ID,c=e.post_title,o=e.post_type,r=e.permalink;V.current=null;var a=[{id:t,subtype:o,title:c,type:"post",url:r}];console.log("this is where we should do our stuff...",a,e),R[n]=a,N(q(a)),F(!1)}})).catch((function(t,n){console.log("Hey this is a url error, we didnt find a matching post... now what?",e),F(!1)}))):y()({path:n,signal:V.current.signal}).then((function(e){!1!==J.current&&(console.log("search Results",e),V.current=null,R[n]=e,N(q(e)),F(!1))})).catch((function(e,t){"fetch_error"!==e.code&&(N([]),V.current=null,F(!1))}))}(w,e)}}),[w]);var Z=Object(b.a)(m||(m=Object(r.a)(["\n\t\t/* stylelint-disable */\n\t\tmax-height: 350px;\n\t\toverflow-y: auto;\n\t"])));return Object(b.b)(p.NavigableMenu,{onNavigate:function(e){0===e&&M(null),M(e)},orientation:"vertical"},Object(b.b)("div",{style:{display:"flex"}},Object(b.b)("div",{style:{flexGrow:"1"}},"minimal"===i&&Object(b.b)(p.TextControl,{label:c,value:j,onChange:function(e){return k(e)},placeholder:n,autoComplete:"off"}),"search"===i&&Object(b.b)(p.SearchControl,{value:j,onChange:function(e){return k(e)},placeholder:n})),A&&Object(b.b)("div",{style:{position:"absolute",right:"minimal"===i?"8px":"50px",marginTop:"minimal"===i?"27px":"10px"}},Object(b.b)(p.Spinner,null))),G?Object(b.b)("ul",{className:"".concat(x,"-list"),style:{marginTop:"0",marginBottom:"0",marginLeft:"0",paddingLeft:"0",listStyle:"none"},css:Z},!A&&!Q&&!1===P&&Object(b.b)("li",{className:"".concat(x,"-list-item components-button"),style:{color:"inherit",cursor:"default",paddingLeft:"3px"}},Object(d.__)("Nothing found.","prc-block-components")),!A&&!Q&&P&&Object(b.b)("li",{className:"".concat(x,"-list-item components-button"),style:{color:"inherit",cursor:"default",paddingLeft:"3px"}},Object(d.__)("Press enter to change url.","prc-block-components")),!A&&D.map((function(e,n){return e.title.length?Object(b.b)("li",{key:e.id,className:"".concat(x,"-list-item"),style:{marginBottom:"0"}},Object(b.b)(E,{onClick:function(){return function(e){N([]),k(""),t(e)}(e)},searchTerm:w,suggestion:e,contentTypes:l,isSelected:H===n+1})):null}))):null)},S=n(84),P=Object(S.c)((function(){return React.createElement("svg",{style:{marginRight:"5px",cursor:"grab",flexShrink:0},width:"18",height:"18",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M5 4h2V2H5v2zm6-2v2h2V2h-2zm-6 8h2V8H5v2zm6 0h2V8h-2v2zm-6 6h2v-2H5v2zm6 0h2v-2h-2v2z"}))})),C=Object(l.a)("div")(h||(h=Object(r.a)(["\n\tbutton {\n\t\tdisplay: block;\n\t\tpadding: 2px 8px 6px 8px;\n\t\tmargin-left: auto;\n\t\tfont-size: 2em;\n\t\tcursor: pointer;\n\t\tborder: none;\n\t\tbackground-color: transparent;\n\n\t\t&:hover {\n\t\t\tbackground-color: #ccc;\n\t\t}\n\t}\n"]))),T=function(e){var t=e.item,n=e.isOrderable,c=void 0!==n&&n,o=e.handleItemDelete,r=e.mode,a="post"===r?"postType":"taxonomy",i=Object(s.useSelect)((function(e){var n=e("core"),c=n.getEntityRecord,o=n.hasFinishedResolution,i=[a,t.type,t.id],l=c.apply(void 0,i);if(l){console.log("Has Item",l);var s={title:"post"===r?l.title.rendered:l.name,url:l.link,id:l.id};return t.uuid&&(s.uuid=t.uuid),s}if(o("getEntityRecord",i))return null}),[t.id,a]);return Object(u.useEffect)((function(){null===i&&o(t)}),[t,o,i]),i?React.createElement(C,{style:{border:"2px dashed #ddd",paddingTop:"10px",paddingBottom:"10px",paddingLeft:c?"3px":"8px"},className:"block-editor-link-control__search-item is-entity"},c?React.createElement(P,null):"",React.createElement("span",{className:"block-editor-link-control__search-item-header"},React.createElement("span",{className:"block-editor-link-control__search-item-title"},Object(k.decodeEntities)(i.title)),React.createElement("span",{"aria-hidden":!0,className:"block-editor-link-control__search-item-info"},Object(j.filterURLForDisplay)(Object(j.safeDecodeURI)(i.url))||"")),React.createElement("button",{type:"button",onClick:function(){o(i)},"aria-label":Object(d.__)("Delete item","10up-block-components")},"×")):React.createElement("div",null)},I=Object(S.a)((function(e){var t=e.items,n=e.isOrderable,c=e.handleItemDelete,o=e.mode,r=e.ChildComponent,a=void 0!==r&&r,i=!1!==a?n?Object(S.b)(a):a:n?Object(S.b)(T):T;return React.createElement("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'}},t.map((function(e,r){var a=e.uuid?e.uuid:e.id;return React.createElement(i,{isOrderable:!!(n&&t.length>1)&&n,key:"item-".concat(a),index:r,handleItemDelete:c,sortIndex:r,item:e,mode:o,totalItems:t.length})})))})),D=Object(l.a)("div")(g||(g=Object(r.a)(["\n\t& .block-editor-link-control__search-item {\n\t\tborder: none !important;\n\t\tcursor: default;\n\n\t\t&:hover {\n\t\t\tbackground: transparent;\n\t\t}\n\t}\n"]))),N=function(e){var t,n=e.label,r=e.placeholder,l=e.mode,p=void 0===l?"post":l,b=e.contentTypes,f=void 0===b?["post","page"]:b,m=e.onPickChange,h=void 0===m?function(e){console.log("Content picker list change",e)}:m,g=e.maxContentItems,v=void 0===g?1:g,O=e.isOrderable,y=void 0!==O&&O,j=e.singlePickedLabel,k=void 0===j?Object(d.__)("You have selected the following item:","prc-block-components"):j,w=e.multiPickedLabel,E=void 0===w?Object(d.__)("You have selected the following items:","prc-block-components"):w,x=e.value,R=void 0===x?[]:x,S=e.uniqueContentItems,P=void 0===S||S,C=e.excludeCurrentPost,T=void 0===C||C,N=e.perPage,L=void 0===N?50:N,B=e.PickedItemChild,A=void 0!==B&&B,F=e.searchStyle,z=void 0===F?"search":F,U=Object(u.useState)(R),H=Object(o.a)(U,2),M=H[0],V=H[1],J=null===(t=Object(s.select)("core/editor"))||void 0===t?void 0:t.getCurrentPostId();Object(u.useEffect)((function(){console.log("Init content state",R)}),[]),Object(u.useEffect)((function(){M!==R&&0!==M.length&&(console.log("useEffect onPickChange->",M),h(M))}),[M]);var Y=Object(u.useMemo)((function(){var e=P?Object(c.a)(M):[];return T&&J&&e.push({id:J}),e}),[M,J,T,P]);return React.createElement("div",{className:"".concat("prc-content-picker")},(!M.length||M.length&&M.length<v)&&React.createElement(_,{placeholder:r,label:n,excludeItems:Y,onSelectItem:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];console.log("handleSelect->",e,t),V(!0===t?function(t){return[{uuid:Object(a.a)(),type:"subtype"in e?e.subtype:e.type,url:e.url}].concat(Object(c.a)(t))}:function(t){return[{id:e.id,uuid:Object(a.a)(),type:"subtype"in e?e.subtype:e.type,url:e.url}].concat(Object(c.a)(t))})},contentTypes:f,mode:p,perPage:L,style:z}),Boolean(null==M?void 0:M.length)>0&&React.createElement(D,null,React.createElement("span",{style:{marginTop:"15px",marginBottom:"2px",display:"block"}},M.length>1?E:k),React.createElement(I,{items:M,useDragHandle:!0,handleItemDelete:function(e){V((function(t){return t.filter((function(t){var n=t.id,c=t.uuid;return e.uuid?c!==e.uuid:n!==e.id}))}))},isOrderable:y,mode:p,onSortEnd:function(e){var t=e.oldIndex,n=e.newIndex,o=Object(c.a)(Object(i.default)(M,t,n));console.log("newContent?",o),V(o)},ChildComponent:A})))},L=function(e){var t=e.blockProps,n=e.onChange,c=e.onSkip,o=e.mode,r=void 0===o?"post":o,a=e.contentTypes,i=void 0===a?["stub"]:a,l=e.label,s=void 0===l?Object(d.__)("Search for a post","prc-block-components"):l,b=e.placeholder,f=void 0===b?Object(d.__)("Search for a post or pate in a url...","prc-block-components"):b,m=e.value,h=void 0===m?[]:m,g=e.loadingComponent,v=void 0!==g&&g,O=e.children;return React.createElement("div",t,React.createElement(p.Placeholder,{label:"".concat(s,":"),isColumnLayout:!0},!1!==v&&React.createElement("div",{style:{textAlign:"center"}},React.createElement(p.Spinner,null),React.createElement("p",{className:"sans-serif"},"Loading object...")),!1===v&&React.createElement(u.Fragment,null,O,React.createElement(N,{onPickChange:function(e){console.log("Step1:",e),n(e)},mode:r,label:"".concat(s," or enter a url:"),placeholder:f,contentTypes:i,value:h}),React.createElement(p.Button,{isLink:!0,onClick:function(){c()},text:Object(d.__)("Skip"),style:{paddingLeft:"9px"}}))))},B=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25;return new Promise((function(n){var c={};y()({path:"/wp/v2/".concat(e,"?per_page=").concat(t)}).then((function(t){for(var o=0;o<t.length;o++){var r=t[o].slug.replace("".concat(e.toLowerCase(),"_"),"");c[t[o].id]={id:t[o].id,name:t[o].name,parent:t[o].parent,slug:r}}n(c)}))}))},A=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"slug",c=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return new Promise((function(o){B(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(c){var o=e[c],r=o[n],a=o.name;void 0!==o.parent&&0!==o.parent&&(a=" -- ".concat(a)),t.push({value:r,label:a})})),!1!==c&&t.sort((function(e,t){return e.label>t.label?1:-1})),o(t)}))}))}},2:function(e,t){e.exports=window.wp.element},23:function(e,t){e.exports=window.wp.apiFetch},24:function(e,t,n){var c="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(c)]},3:function(e,t){e.exports=window.wp.i18n},32:function(e,t){e.exports=window.wp.url},332:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/staff-listing","title":"Staff Listing","description":"Display a list of staff members organized by staff type, as well as expertise and/or research team.","keywords":["staff","people","experts"],"category":"layout","attributes":{"staffTypes":{"type":"array","default":["staff"]},"expertise":{"type":"array"},"researchTeams":{"type":"array"}},"supports":{"html":false}}')},4:function(e,t){e.exports=window.wp.components},6:function(e,t){e.exports=window.wp.blockEditor},65:function(e,t){e.exports=window.ReactDOM},72:function(e,t){e.exports=window.wp.htmlEntities},77:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var c=n(21);var o=n(96),r=n(28);function a(e){return function(e){if(Array.isArray(e))return Object(c.a)(e)}(e)||Object(o.a)(e)||Object(r.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},883:function(e,t,n){n(24),e.exports=n(957)},957:function(e,t,n){"use strict";n.r(t);var c=n(14),o=n(3),r=n(10),a=n(332),i=n(77),l=n(20),s=n(150),u=n(23),d=n.n(u),p=n(32),b=n(2),f=n(6),m=n(4);function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,c)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var v=function(e){return"string"!=typeof e?"":e.replace(/\w\S*/g,(function(e){return e.replace(/^\w/,(function(e){return e.toUpperCase()}))}))},O=function(e){var t=e.taxonomy,n=void 0===t?"staff-type":t,c=e.attribute,o=void 0===c?"staffTypes":c,r=e.selected,a=void 0===r?[]:r,u=e.setAttributes,d=Object(b.useState)(a),p=Object(l.a)(d,2),f=p[0],h=p[1],g=Object(b.useState)([]),O=Object(l.a)(g,2),y=O[0],j=O[1];return Object(b.useEffect)((function(){Object(s.b)(n).then((function(e){j(e)}))}),[n]),Object(b.useEffect)((function(){var e={};e[o]=Object(i.a)(f),u(e)}),[f]),React.createElement("div",null,React.createElement("h3",null,v(n.replace("-"," "))),y.map((function(e){return React.createElement(m.CheckboxControl,{key:e.value,label:e.label,checked:f.includes(e.value),onChange:function(){f.includes(e.value)?h(f.filter((function(t){return t!==e.value}))):h([].concat(Object(i.a)(f),[e.value]))}})})))},y=function(e){var t=e.attributes,n=e.setAttributes,c=t.staffTypes,r=t.expertise,a=t.researchTeams,i=Object(b.useState)({"executive-team":[],"managing-directors":[],staff:[]}),s=Object(l.a)(i,2),u=s[0],h=s[1],y=Object(b.useState)(!0),j=Object(l.a)(y,2),k=j[0],w=j[1],E=Object(f.useBlockProps)();return Object(b.useEffect)((function(){!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],c={staff_types:e.join(","),areas_of_expertise:t.join(","),research_teams:n.join(",")};console.log("loadPosts",c),w(!0),d()({path:Object(p.addQueryArgs)("/prc-api/v2/blocks/staff-listing",c)}).then((function(e){console.log(e),h(g(g({},u),e))}))}(c,r,a)}),[c,r,a]),Object(b.useEffect)((function(){console.log("staffPosts changed",u),w(!1)}),[u]),React.createElement(b.Fragment,null,React.createElement(f.InspectorControls,null,React.createElement(m.PanelBody,{title:"Staff Listing Options"},React.createElement(O,{taxonomy:"staff-type",attribute:"staffTypes",selected:c,setAttributes:n}),React.createElement(O,{taxonomy:"areas-of-expertise",attribute:"expertise",selected:r,setAttributes:n}),React.createElement(O,{taxonomy:"research-teams",attribute:"researchTeams",selected:a,setAttributes:n}))),React.createElement("div",E,k&&React.createElement(m.Notice,{status:"warning",isDismissible:!1},Object(o.__)("Loading Staff...","prc-block-library")),!1===k&&Object.keys(u).map((function(e){return u[e].length<=0?React.createElement(b.Fragment,null):React.createElement(b.Fragment,null,React.createElement("h2",null,v(e.replace("-"," "))),React.createElement("div",{class:"ui list"},u[e].map((function(e){return React.createElement("div",{class:"item"},React.createElement("p",null,React.createElement("strong",null,e.name),", ",e.job_title))}))))}))))},j=function(){return React.createElement(b.Fragment,null)};function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,c)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var E=a.name,x={edit:y,save:j};Object(r.registerBlockType)(E,w(w({},a),x))},96:function(e,t,n){"use strict";function c(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}n.d(t,"a",(function(){return c}))}},[[883,0,3]]]);
//# sourceMappingURL=staff-listing-9ebe967f.js.map