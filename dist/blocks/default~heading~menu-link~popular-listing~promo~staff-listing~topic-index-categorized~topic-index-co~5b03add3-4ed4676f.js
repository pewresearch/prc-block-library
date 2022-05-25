/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.14
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[2],{46:function(e,t,n){"use strict";n.d(t,"a",(function(){return A})),n.d(t,"b",(function(){return U})),n.d(t,"c",(function(){return M})),n.d(t,"f",(function(){return $})),n.d(t,"d",(function(){return q})),n.d(t,"g",(function(){return K})),n.d(t,"h",(function(){return ee})),n.d(t,"e",(function(){return Y})),n.d(t,"i",(function(){return g}));var o=n(28),a=n(19),l=n(45),c=n(1094),r=n(151),i=n(55),s=n(11),u=n(4),d=n(2),b=n(3),m=n(33),p=n(30),h=n(29),v=n.n(h),g=function(e,t){var n=Object(u.useState)(e),o=Object(a.a)(n,2),l=o[0],c=o[1];return Object(u.useEffect)((function(){var n=setTimeout((function(){c(e)}),t);return function(){clearTimeout(n)}}),[e,t]),l},f=(n(152),n(34));n(58);var k,O=n(35),y=n(40),j=Object(i.a)(b.Button)(k||(k=Object(l.a)(["\n\t&:hover {\n\t\t/* Add opacity background to support future color changes */\n\t\t/* Reduce background from #ddd to 0.05 for text contrast  */\n\t\tbackground-color: rgba(0, 0, 0, 0.05);\n\n\t\t.block-editor-link-control__search-item-type {\n\t\t\tcolor: black;\n\t\t}\n\t}\n\n\t.block-editor-link-control__search-item-type {\n\t\tbackground-color: rgba(0, 0, 0, 0.05);\n\t}\n"])));var _,R=function(e){var t=e.suggestion,n=e.onClick,o=e.searchTerm,a=e.isSelected,l=e.id,c=e.contentTypes,r=t.type&&1<c.length;return React.createElement(b.Tooltip,{text:Object(y.decodeEntities)(t.title)},React.createElement(j,{id:l,onClick:n,className:"block-editor-link-control__search-item is-entity ".concat(a&&"is-selected"),style:{borderRadius:"0",boxSizing:"border-box"}},React.createElement("span",{className:"block-editor-link-control__search-item-header"},React.createElement("span",{className:"block-editor-link-control__search-item-title",style:{paddingRight:r?null:0}},React.createElement(b.TextHighlight,{text:Object(y.decodeEntities)(t.title),highlight:o})),React.createElement("span",{"aria-hidden":!0,className:"block-editor-link-control__search-item-info",style:{paddingRight:r?null:0}},Object(O.filterURLForDisplay)(Object(O.safeDecodeURI)(t.url))||"")),r&&React.createElement("span",{className:"block-editor-link-control__search-item-type"},"post_tag"===t.type?"tag":t.type)))},E="prc-content-search",x={};function w(e){var t=e.onSelectItem,n=e.placeholder,o=e.label,c=e.style,r=void 0===c?"search":c,i=e.contentTypes,s=e.mode,h=e.excludeItems,f=e.perPage,k=Object(u.useState)(""),O=Object(a.a)(k,2),y=O[0],j=O[1],w=g(y,500),C=Object(u.useMemo)((function(){return!!w.match(/^(http|https):\/\//)}),[w]),S=Object(u.useState)([]),T=Object(a.a)(S,2),z=T[0],H=T[1],I=Object(u.useState)(!1),P=Object(a.a)(I,2),B=P[0],N=P[1],M=Object(u.useState)(null),D=Object(a.a)(M,2),L=D[0],V=D[1],U=Object(u.useRef)(),F=Object(u.useRef)(!0),A=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];U.current=null,!1!==t&&(x[t]=e);var n=e.filter((function(e){var t=!0;return h.length&&(t=h.every((function(t){return t.id!==e.id}))),t}));H(n),N(!1)},G=function(e){return void 0===e?new Error("url is undefined"):new Promise((function(t,n){v()({path:"/prc-api/v2/utils/get-post-by-url",method:"POST",data:{url:e}}).then((function(o){console.log("getPostByUrl",e,o),"object"!==Object(m.a)(o)&&n(new Error("post is not an object")),t(o)})).catch((function(e){return n(e)}))}))},W=!!w.length,Z=!!z.length;Object(u.useEffect)((function(){return function(){F.current=!1}}),[]),Object(u.useEffect)((function(){""!==w&&function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(U.current&&U.current.abort(),""===e.trim())return console.log("Resetting search string..."),void A([]);U.current=new AbortController,N(!0);var n="wp/v2/search/?search=".concat(e,"&subtype=").concat(i.join(","),"&type=").concat(s,"&_embed&per_page=").concat(f);x[n]?A(x[n],n):t?(console.log("isUrl",e),G(e).then((function(e){if(F.current){console.log("parse getPostByUrl",e);var t=e.ID,o=e.post_title,a=e.post_type,l=e.permalink,c=e.label;A([{id:t,subtype:a,title:o,type:"post",url:l,label:c}],n)}})).catch((function(t,n){console.log("Hey this is a url error, we didnt find a matching post... now what?",e),console.error(t,n),N(!1)}))):v()({path:n,signal:U.current.signal}).then((function(e){!1!==F.current&&(console.log("Not a url, searching.... here are the results:",e),A(e,n))})).catch((function(e,t){"fetch_error"!==e.code&&A([])}))}(w,C)}),[w,C]);var q=Object(p.a)(_||(_=Object(l.a)(["\n\t\t/* stylelint-disable */\n\t\tmax-height: 350px;\n\t\toverflow-y: auto;\n\t"])));return Object(p.b)(b.NavigableMenu,{onNavigate:function(e){0===e&&V(null),V(e)},orientation:"vertical"},Object(p.b)("div",{style:{display:"flex"}},Object(p.b)("div",{style:{flexGrow:"1"}},"minimal"===r&&Object(p.b)(b.TextControl,{label:o,value:y,onChange:function(e){return j(e)},placeholder:n,autoComplete:"off"}),"search"===r&&Object(p.b)(b.SearchControl,{value:y,onChange:function(e){return j(e)},placeholder:n})),B&&Object(p.b)("div",{style:{position:"absolute",right:"minimal"===r?"8px":"50px",marginTop:"minimal"===r?"27px":"10px"}},Object(p.b)(b.Spinner,null))),W?Object(p.b)("ul",{className:"".concat(E,"-list"),style:{marginTop:"0",marginBottom:"0",marginLeft:"0",paddingLeft:"0",listStyle:"none"},css:q},!B&&!Z&&!1===C&&Object(p.b)("li",{className:"".concat(E,"-list-item components-button"),style:{color:"inherit",cursor:"default",paddingLeft:"3px"}},Object(d.__)("Nothing found.","prc-block-components")),!B&&!Z&&C&&Object(p.b)("li",{className:"".concat(E,"-list-item components-button"),style:{color:"inherit",cursor:"default",paddingLeft:"3px"}},Object(d.__)("Press enter to change url.","prc-block-components")),!B&&z.map((function(e,n){return console.log("searchResults map...",e),void 0===e.title?null:Object(p.b)("li",{key:e.id,className:"".concat(E,"-list-item"),style:{marginBottom:"0"}},Object(p.b)(R,{onClick:function(){return function(e){H([]),j(""),t(e)}(e)},searchTerm:w,suggestion:e,contentTypes:i,isSelected:L===n+1}))}))):null)}var C,S,T=n(57),z=Object(T.c)((function(){return React.createElement("svg",{style:{marginRight:"5px",cursor:"grab",flexShrink:0},width:"18",height:"18",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M5 4h2V2H5v2zm6-2v2h2V2h-2zm-6 8h2V8H5v2zm6 0h2V8h-2v2zm-6 6h2v-2H5v2zm6 0h2v-2h-2v2z"}))})),H=Object(i.a)("div")(C||(C=Object(l.a)(["\n\tbutton {\n\t\tdisplay: block;\n\t\tpadding: 2px 8px 6px 8px;\n\t\tmargin-left: auto;\n\t\tfont-size: 2em;\n\t\tcursor: pointer;\n\t\tborder: none;\n\t\tbackground-color: transparent;\n\n\t\t&:hover {\n\t\t\tbackground-color: #ccc;\n\t\t}\n\t}\n"]))),I=function(e){var t=e.item,n=e.isOrderable,o=void 0!==n&&n,a=e.handleItemDelete,l=e.mode,c="post"===l?"postType":"taxonomy",r=Object(s.useSelect)((function(e){var n=e("core"),o=n.getEntityRecord,a=n.hasFinishedResolution,r=[c,t.type,t.id],i=o.apply(void 0,r);if(i){console.log("Has Item",i);var s={title:"post"===l?i.title.rendered:i.name,url:i.link,id:i.id};return t.uuid&&(s.uuid=t.uuid),s}if(a("getEntityRecord",r))return null}),[t.id,c]);return Object(u.useEffect)((function(){null===r&&a(t)}),[t,a,r]),r?React.createElement(H,{style:{border:"2px dashed #ddd",paddingTop:"10px",paddingBottom:"10px",paddingLeft:o?"3px":"8px"},className:"block-editor-link-control__search-item is-entity"},o?React.createElement(z,null):"",React.createElement("span",{className:"block-editor-link-control__search-item-header"},React.createElement("span",{className:"block-editor-link-control__search-item-title"},Object(y.decodeEntities)(r.title)),React.createElement("span",{"aria-hidden":!0,className:"block-editor-link-control__search-item-info"},Object(O.filterURLForDisplay)(Object(O.safeDecodeURI)(r.url))||"")),React.createElement("button",{type:"button",onClick:function(){a(r)},"aria-label":Object(d.__)("Delete item","10up-block-components")},"×")):React.createElement("div",null)},P=Object(T.a)((function(e){var t=e.items,n=e.isOrderable,o=e.handleItemDelete,a=e.mode,l=e.ChildComponent,c=void 0!==l&&l,r=!1!==c?n?Object(T.b)(c):c:n?Object(T.b)(I):I;return React.createElement("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'}},t.map((function(e,l){var c=e.uuid?e.uuid:e.id;return React.createElement(r,{isOrderable:!!(n&&1<t.length)&&n,key:"item-".concat(c),index:l,handleItemDelete:o,sortIndex:l,item:e,mode:a,totalItems:t.length})})))})),B=Object(i.a)("div")(S||(S=Object(l.a)(["\n\t& .block-editor-link-control__search-item {\n\t\tborder: none !important;\n\t\tcursor: default;\n\n\t\t&:hover {\n\t\t\tbackground: transparent;\n\t\t}\n\t}\n"]))),N=function(e){var t,n=e.label,l=e.placeholder,i=e.mode,b=void 0===i?"post":i,m=e.contentTypes,p=void 0===m?["post","page"]:m,h=e.onPickChange,v=void 0===h?function(e){console.log("Content picker list change",e)}:h,g=e.maxContentItems,f=void 0===g?1:g,k=e.isOrderable,O=void 0!==k&&k,y=e.singlePickedLabel,j=void 0===y?Object(d.__)("You have selected the following item:","prc-block-components"):y,_=e.multiPickedLabel,R=void 0===_?Object(d.__)("You have selected the following items:","prc-block-components"):_,E=e.value,x=void 0===E?[]:E,C=e.uniqueContentItems,S=void 0===C||C,T=e.excludeCurrentPost,z=void 0===T||T,H=e.perPage,I=void 0===H?50:H,N=e.PickedItemChild,M=void 0!==N&&N,D=e.searchStyle,L=void 0===D?"search":D,V=Object(u.useState)(x),U=Object(a.a)(V,2),F=U[0],A=U[1],G=null===(t=Object(s.select)("core/editor"))||void 0===t?void 0:t.getCurrentPostId();Object(u.useEffect)((function(){console.log("Init content state",x)}),[]),Object(u.useEffect)((function(){F!==x&&0!==F.length&&(console.log("useEffect onPickChange->",F),v(F))}),[F]);var W=Object(u.useMemo)((function(){var e=S?Object(o.a)(F):[];return z&&G&&e.push({id:G}),e}),[F,G,z,S]);return React.createElement("div",{className:"".concat("prc-content-picker")},(!F.length||F.length&&F.length<f)&&React.createElement(w,{placeholder:l,label:n,excludeItems:W,onSelectItem:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];console.log("handleSelect->",e,t),A(!0===t?function(t){return[{uuid:Object(c.a)(),type:"subtype"in e?e.subtype:e.type,url:e.url}].concat(Object(o.a)(t))}:function(t){return[{id:e.id,uuid:Object(c.a)(),type:"subtype"in e?e.subtype:e.type,url:e.url}].concat(Object(o.a)(t))})},contentTypes:p,mode:b,perPage:I,style:L}),Boolean(null==F?void 0:F.length)>0&&React.createElement(B,null,React.createElement("span",{style:{marginTop:"15px",marginBottom:"2px",display:"block"}},F.length>1?R:j),React.createElement(P,{items:F,useDragHandle:!0,handleItemDelete:function(e){A((function(t){return t.filter((function(t){var n=t.id,o=t.uuid;return e.uuid?o!==e.uuid:n!==e.id}))}))},isOrderable:O,mode:b,onSortEnd:function(e){var t=e.oldIndex,n=e.newIndex,a=Object(o.a)(Object(r.default)(F,t,n));console.log("newContent?",a),A(a)},ChildComponent:M})))};function M(e){var t=e.blockProps,n=e.onChange,o=e.onSkip,a=e.mode,l=void 0===a?"post":a,c=e.contentTypes,r=void 0===c?["stub"]:c,i=e.label,s=void 0===i?Object(d.__)("Search for a post","prc-block-components"):i,m=e.placeholder,p=void 0===m?Object(d.__)("Search for a post or paste in a url...","prc-block-components"):m,h=e.value,v=void 0===h?[]:h,g=e.loadingComponent,f=void 0!==g&&g,k=e.children;return React.createElement("div",t,React.createElement(b.Placeholder,{label:"".concat(s,":"),isColumnLayout:!0},!1!==f&&React.createElement("div",{style:{textAlign:"center"}},React.createElement(b.Spinner,null),React.createElement("p",{className:"sans-serif"},"Loading object...")),!1===f&&React.createElement(u.Fragment,null,k,React.createElement(N,{onPickChange:function(e){console.log("Step1:",e),n(e)},mode:l,label:"".concat(s," or enter a url:"),placeholder:p,contentTypes:r,value:v}),React.createElement(b.Button,{isLink:!0,onClick:function(){o()},text:Object(d.__)("Skip"),style:{paddingLeft:"9px"}}))))}n(1086);var D=n(5);var L=function(e){var t=e.url,n=e.onChange,o=e.query,l=void 0===o?{type:"term",subtype:"topic"}:o,c=Object(u.useState)(!1),r=Object(a.a)(c,2),i=r[0],s=r[1];return React.createElement(u.Fragment,null,React.createElement(b.ToolbarButton,{"aria-expanded":i,"aria-haspopup":"true",label:Object(d.__)("Set Link"),icon:"admin-links",onClick:function(){return s(!i)},showTooltip:!0}),!0===i&&React.createElement(b.Popover,{position:"bottom center",onClose:function(){return s(!1)}},React.createElement(D.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",value:{url:t},showInitialSuggestions:!0,suggestionsQuery:l,onChange:function(e){return n(e)},settings:[]})))},V=n(1093),U=function(e){var t=e.url,n=e.heading,o=e.headingSize,a=void 0===o?"h2":o,l=e.disableIcon,c=void 0!==l&&l,r=e.setAttributes;return React.createElement(u.Fragment,null,React.createElement(D.BlockControls,null,React.createElement(b.ToolbarGroup,null,React.createElement(L,{url:t,onChange:function(e){r({url:e.url})}}))),React.createElement(b.Flex,{style:{paddingBottom:"1em"}},React.createElement(b.FlexItem,null,React.createElement(D.RichText,{tagName:a,value:n,onChange:function(e){return r({heading:e})},placeholder:"Heading...",formattingControls:[],keepPlaceholderOnFocus:!0,className:"sans-serif"})),!0!==c&&React.createElement(b.FlexBlock,null,React.createElement(V.a,{name:"chevron right",size:"small",style:{marginLeft:"0.5em"}}))))},F=n(9);var A=function(e){var t=e.label,n=void 0===t?"":t,o=e.blockName,a=e.clientId,l=(e.className,e.attributes),c=void 0===l?{}:l;return React.createElement(b.Button,{label:Object(d.__)(n),tooltipPosition:"bottom",onClick:function(){var e=Object(s.select)("core/block-editor").getBlock(a);console.log("debug info...",e.innerBlocks.length);var t=0===e.innerBlocks.length?0:e.innerBlocks.length+1,n=Object(F.createBlock)(o,c);Object(s.dispatch)("core/block-editor").insertBlock(n,t,a)},className:"block-editor-button-block-appender"},Object(d.__)(n))},G=n(66),W=function(e){var t=e.level,n=e.isPressed,o=void 0!==n&&n,a={1:"M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z",2:"M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z",3:"M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z",4:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z",5:"M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z",6:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z"};return a.hasOwnProperty(t)?React.createElement(b.SVG,{width:"24",height:"24",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",isPressed:o},React.createElement(b.Path,{d:a[t]})):null},Z={className:"block-library-heading-level-dropdown",isAlternate:!0},q=function(e){var t=e.selectedLevel,n=e.levels,o=void 0===n?[2,3]:n,a=e.onChange;return console.log("HeadingLevelToolbar",t),React.createElement(b.ToolbarGroup,null,React.createElement(b.Dropdown,{popoverProps:Z,renderToggle:function(e){var n=e.onToggle,o=e.isOpen;return React.createElement(b.ToolbarButton,{"aria-expanded":o,"aria-haspopup":"true",icon:React.createElement(W,{level:t}),label:Object(d.__)("Change heading level"),onClick:n,onKeyDown:function(e){o||e.keyCode!==G.DOWN||(e.preventDefault(),e.stopPropagation(),n())},showTooltip:!0})},renderContent:function(){return React.createElement(b.Toolbar,{className:"block-library-heading-level-toolbar",label:Object(d.__)("Change heading level")},React.createElement(b.ToolbarGroup,{isCollapsed:!1,controls:o.map((function(e){var n=e===t;return{icon:React.createElement(W,{level:e,isPressed:n}),title:Object(d.sprintf)(Object(d.__)("Heading %d"),e),isActive:n,onClick:function(){a(e)}}}))}))}}))},J=n(103),Q=n(64);var Y=function(e){var t=e.attachmentId,n=void 0!==t&&t,o=e.onUpdate,l=void 0===o?function(e){console.warn("Media DropZone Attachment, use onUpdate prop when using <MediaDropZone/>: ",e)}:o,c=e.onClear,r=void 0!==c&&c,i=e.mediaType,m=void 0===i?["image"]:i,p=e.mediaSize,h=void 0===p?"full":p,v=e.label,g=void 0===v?Object(d.__)("Set Image"):v,f=Object(u.useState)(n),k=Object(a.a)(f,2),O=k[0],y=k[1],j=Object(u.useState)(!1),_=Object(a.a)(j,2),R=_[0],E=_[1],x=Object(s.useSelect)((function(e){var t=!!O&&e("core").getMedia(O);if(console.log("m...",O,t),void 0===t||!1===t)return{media:!1,src:!1,width:!1,height:!1,type:!1};var n=!1,o=!1,a=!1;if(Object(J.a)(t,["media_details","sizes",h]))o=t.media_details.sizes[h].width,a=t.media_details.sizes[h].height,n=t.media_details.sizes[h].source_url;else{Object(J.a)(t,["media_details","sizes","full"])?(o=t.media_details.sizes.full.width,a=t.media_details.sizes.full.height,n=t.media_details.sizes.full.source_url):(o=t.media_details.width,a=t.media_details.height,n=t.source_url)}return{media:t,src:n,width:o,height:a,type:!1!==t&&t.type}}),[O]),w=x.media,C=x.src,S=x.width,T=x.height,z=(x.type,function(e){console.log("onMediaUpdate",O,e.id),e.id!==O&&(y(e.id),l(e)),E(!1)}),H=function(e){console.log("onDropImage",e),Object(Q.uploadMedia)({allowedTypes:m,filesList:e,onFileChange:function(e){var t=Object(a.a)(e,1)[0];console.log("onFileChange",t),t.id?(console.log("found!",t),t.sizes=t.media_details.sizes,z(t)):(console.log("waiting"),E(!0))},onError:function(e){console.error(e)}})},I=!1!==O&&!1!==w&&!1!==C&&!1===R;return React.createElement(D.MediaUploadCheck,{fallback:Object(d.__)("Fallback Instructions Should Go Here")},React.createElement(D.MediaUpload,{title:Object(d.__)("Media Upload"),onSelect:z,allowedTypes:m,value:O,render:function(e){var t=e.open;return React.createElement("div",null,I&&React.createElement("button",{type:"button",onClick:t,style:{cursor:"pointer",background:"none",border:"none"}},React.createElement("img",{alt:"Drop an asset here, or click to replace.",src:C,width:"".concat(S,"px"),height:"".concat(T,"px")})),!1!==r&&I&&React.createElement(b.Button,{variant:"link",isSmall:!0,onClick:function(){r(),y(!1)}},"Clear Image"),(!1!==O&&!1===w||R)&&React.createElement(b.Button,{variant:"secondary",isBusy:!0,onClick:t},Object(d.__)(" Loading...")),!1===O&&React.createElement(b.Button,{variant:"secondary",onClick:t},g),React.createElement(b.DropZone,{onFilesDrop:H}))}}))};function K(e,t,n,o,a){e===t&&a(Object(f.a)({},n,o))}function X(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25;return new Promise((function(n){var o={};v()({path:"/wp/v2/".concat(e,"?per_page=").concat(t)}).then((function(t){for(var a=0;a<t.length;a++){var l=t[a].slug.replace("".concat(e.toLowerCase(),"_"),"");o[t[a].id]={id:t[a].id,name:t[a].name,parent:t[a].parent,slug:l}}n(o)}))}))}function $(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"slug",o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return new Promise((function(a){X(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(o){var a=e[o],l=a[n],c=a.name;void 0!==a.parent&&0!==a.parent&&(c=" -- ".concat(c)),t.push({value:l,label:c})})),!1!==o&&t.sort((function(e,t){return e.label>t.label?1:-1})),a(t)}))}))}var ee=[{label:"Weekly roundup of all new publications",value:"7c1390ba46"},{label:"Quarterly update from the President",value:"a33430a835"},{label:"--",value:!1},{label:"Global Attitudes & Trends",value:"9203343b04"},{label:"Internet, Science & Tech",value:"ea87b26abe"},{label:"Media & News Daily Briefing",value:"1d2638430b"},{label:"Hispanic Trends",value:"0e7495c7b2"},{label:"Religion - Weekly newsletter",value:"a7d4f3268f"},{label:"Religion - Daily religion headlines",value:"1a647764b2"},{label:"Social & Demographic Trends",value:"3836f62305"},{label:"Methods",value:"6d1e80bbaf"},{label:"Politics",value:"fa5fdbc701"},{label:"--",value:!1},{label:"Mini-course - U.S. Immigration",value:"xxx"},{label:"Mini-course - U.S. Census",value:"xxxx"},{label:"Mini-course - Muslims and Islam",value:"xxxxx"}]}}]);
//# sourceMappingURL=default~heading~menu-link~popular-listing~promo~staff-listing~topic-index-categorized~topic-index-co~5b03add3-4ed4676f.js.map