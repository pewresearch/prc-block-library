/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.17
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[2],{42:function(e,t,n){"use strict";n.d(t,"a",(function(){return z})),n.d(t,"b",(function(){return _})),n.d(t,"f",(function(){return F})),n.d(t,"g",(function(){return U})),n.d(t,"c",(function(){return H})),n.d(t,"d",(function(){return T})),n.d(t,"e",(function(){return N})),n.d(t,"h",(function(){return A})),n.d(t,"i",(function(){return D}));n(34);var a=n(20),r=n(54),c=(n(1101),n(172),n(68)),l=n(9),o=n(4),i=n(2),u=n(3),s=n(28),d=(n(38),n(29)),m=n.n(d),b=function(e,t){var n=Object(o.useState)(e),r=Object(a.a)(n,2),c=r[0],l=r[1];return Object(o.useEffect)((function(){var n=setTimeout((function(){l(e)}),t);return function(){clearTimeout(n)}}),[e,t]),c},h=(n(173),n(32));n(52);var p,v=n(31),f=n(43);Object(c.a)(u.Button)(p||(p=Object(r.a)(["\n\t&:hover {\n\t\t/* Add opacity background to support future color changes */\n\t\t/* Reduce background from #ddd to 0.05 for text contrast  */\n\t\tbackground-color: rgba(0, 0, 0, 0.05);\n\n\t\t.block-editor-link-control__search-item-type {\n\t\t\tcolor: black;\n\t\t}\n\t}\n\n\t.block-editor-link-control__search-item-type {\n\t\tbackground-color: rgba(0, 0, 0, 0.05);\n\t}\n"])));var g,R,E=n(70),y=Object(E.c)((function(){return React.createElement("svg",{style:{marginRight:"5px",cursor:"grab",flexShrink:0},width:"18",height:"18",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 18 18",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M5 4h2V2H5v2zm6-2v2h2V2h-2zm-6 8h2V8H5v2zm6 0h2V8h-2v2zm-6 6h2v-2H5v2zm6 0h2v-2h-2v2z"}))})),k=Object(c.a)("div")(g||(g=Object(r.a)(["\n\tbutton {\n\t\tdisplay: block;\n\t\tpadding: 2px 8px 6px 8px;\n\t\tmargin-left: auto;\n\t\tfont-size: 2em;\n\t\tcursor: pointer;\n\t\tborder: none;\n\t\tbackground-color: transparent;\n\n\t\t&:hover {\n\t\t\tbackground-color: #ccc;\n\t\t}\n\t}\n"]))),O=function(e){var t=e.item,n=e.isOrderable,a=void 0!==n&&n,r=e.handleItemDelete,c=e.mode,u="post"===c?"postType":"taxonomy",s=Object(l.useSelect)((function(e){var n=e("core"),a=n.getEntityRecord,r=n.hasFinishedResolution,l=[u,t.type,t.id],o=a.apply(void 0,l);if(o){console.log("Has Item",o);var i={title:"post"===c?o.title.rendered:o.name,url:o.link,id:o.id};return t.uuid&&(i.uuid=t.uuid),i}if(r("getEntityRecord",l))return null}),[t.id,u]);return Object(o.useEffect)((function(){null===s&&r(t)}),[t,r,s]),s?React.createElement(k,{style:{border:"2px dashed #ddd",paddingTop:"10px",paddingBottom:"10px",paddingLeft:a?"3px":"8px"},className:"block-editor-link-control__search-item is-entity"},a?React.createElement(y,null):"",React.createElement("span",{className:"block-editor-link-control__search-item-header"},React.createElement("span",{className:"block-editor-link-control__search-item-title"},Object(f.decodeEntities)(s.title)),React.createElement("span",{"aria-hidden":!0,className:"block-editor-link-control__search-item-info"},Object(v.filterURLForDisplay)(Object(v.safeDecodeURI)(s.url))||"")),React.createElement("button",{type:"button",onClick:function(){r(s)},"aria-label":Object(i.__)("Delete item","10up-block-components")},"×")):React.createElement("div",null)};Object(E.a)((function(e){var t=e.items,n=e.isOrderable,a=e.handleItemDelete,r=e.mode,c=e.ChildComponent,l=void 0!==c&&c,o=!1!==l?n?Object(E.b)(l):l:n?Object(E.b)(O):O;return React.createElement("div",{style:{fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'}},t.map((function(e,c){var l=e.uuid?e.uuid:e.id;return React.createElement(o,{isOrderable:!!(n&&1<t.length)&&n,key:"item-".concat(l),index:c,handleItemDelete:a,sortIndex:c,item:e,mode:r,totalItems:t.length})})))})),Object(c.a)("div")(R||(R=Object(r.a)(["\n\t& .block-editor-link-control__search-item {\n\t\tborder: none !important;\n\t\tcursor: default;\n\n\t\t&:hover {\n\t\t\tbackground: transparent;\n\t\t}\n\t}\n"])));n(1090);var j=n(5);var x=function(e){var t=e.url,n=e.onChange,r=e.query,c=void 0===r?{type:"term",subtype:"topic"}:r,l=Object(o.useState)(!1),s=Object(a.a)(l,2),d=s[0],m=s[1];return React.createElement(o.Fragment,null,React.createElement(u.ToolbarButton,{"aria-expanded":d,"aria-haspopup":"true",label:Object(i.__)("Set Link"),icon:"admin-links",onClick:function(){return m(!d)},showTooltip:!0}),!0===d&&React.createElement(u.Popover,{position:"bottom center",onClose:function(){return m(!1)}},React.createElement(j.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",value:{url:t},showInitialSuggestions:!0,suggestionsQuery:c,onChange:function(e){return n(e)},settings:[]})))},S=n(1098),_=function(e){var t=e.url,n=e.heading,a=e.headingSize,r=void 0===a?"h2":a,c=e.disableIcon,l=void 0!==c&&c,i=e.setAttributes;return React.createElement(o.Fragment,null,React.createElement(j.BlockControls,null,React.createElement(u.ToolbarGroup,null,React.createElement(x,{url:t,onChange:function(e){i({url:e.url})}}))),React.createElement(u.Flex,{style:{paddingBottom:"1em"}},React.createElement(u.FlexItem,null,React.createElement(j.RichText,{tagName:r,value:n,onChange:function(e){return i({heading:e})},placeholder:"Heading...",formattingControls:[],keepPlaceholderOnFocus:!0,className:"sans-serif"})),!0!==l&&React.createElement(u.FlexBlock,null,React.createElement(S.a,{name:"chevron right",size:"small",style:{marginLeft:"0.5em"}}))))},w=n(7);var z=function(e){var t=e.label,n=void 0===t?"":t,a=e.blockName,r=e.clientId,c=(e.className,e.attributes),o=void 0===c?{}:c;return React.createElement(u.Button,{label:Object(i.__)(n),tooltipPosition:"bottom",onClick:function(){var e=Object(l.select)("core/block-editor").getBlock(r);console.log("debug info...",e.innerBlocks.length);var t=0===e.innerBlocks.length?0:e.innerBlocks.length+1,n=Object(w.createBlock)(a,o);Object(l.dispatch)("core/block-editor").insertBlock(n,t,r)},className:"block-editor-button-block-appender"},Object(i.__)(n))};n(56);function C(e){var t=e.level,n=e.isPressed,a=void 0!==n&&n,r={1:"M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z",2:"M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z",3:"M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z",4:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z",5:"M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z",6:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z"};return r.hasOwnProperty(t)?React.createElement(u.SVG,{width:"24",height:"24",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",isPressed:a},React.createElement(u.Path,{d:r[t]})):null}var H=function(e){var t=e.selectedLevel,n=e.levels,a=void 0===n?[2,3]:n,r=e.onChange,c=e.Icon,l=void 0===c?C:c;console.log("HeadingLevelToolbar",t);var s=Object(o.useCallback)((function(){return React.createElement(l,{level:t,isPressed:!0})}),[t]);return React.createElement(u.ToolbarGroup,null,React.createElement(u.ToolbarDropdownMenu,{icon:s,label:"Select Heading Size",controls:a.map((function(e){var n=e===t;return{title:Object(i.sprintf)(Object(i.__)("Heading %d"),e),icon:React.createElement(l,{level:e,isPressed:n}),isActive:n,onClick:function(){return r(e)}}}))}))};n(118),n(57);var I=n(47),P=n(45);function B(e){var t=e.searchRecords,n=e.onSelect,a=e.imageSize,r=void 0===a?"A3":a,c=e.disableImage,l=void 0!==c&&c;return t.map((function(e){return React.createElement(V,{item:e,onSelect:n,imageSize:r,disableImage:l})}))}function M(e){var t=e.item,n=e.imageSize,a=t.art;if(a&&a[n]){var r=a[n],c=r.rawUrl,l=r.height,o=r.width,i=r.caption;return React.createElement(u.CardMedia,null,React.createElement("img",{src:c,height:l,width:o,alt:i}))}return null}function V(e){var t=e.item,n=e.onSelect,a=e.imageSize,r=void 0===a?"A3":a,c=e.disableImage,l=void 0!==c&&c;if(!t)return null;var o=t.post_title?t.post_title:t.title.rendered,i=t.post_date?t.post_date:t.date,s=t.label,d=t.canonical_url;return React.createElement(u.Card,{onClick:function(){var e=function(e){var t=e.post,n=e.imageSize,a=void 0!==n&&n,r=e.isRefresh,c=void 0!==r&&r;if(console.log("getAttributesFromPost",t),null===t)return{};var l=Object(I.date)("M j, Y",t.date),o={title:t.hasOwnProperty("title")&&t.title.hasOwnProperty("rendered")?t.title.rendered:"",excerpt:t.hasOwnProperty("excerpt")&&t.excerpt.hasOwnProperty("rendered")?t.excerpt.rendered:"",url:t.canonical_url,label:t.hasOwnProperty("label")?t.label:"report",date:l,postId:t.id||t.ID};if(!0!==c&&(o.extra=""),!1!==a&&t.art){var i=t.art;o.image=i[a].rawUrl,o.isChartArt=i[a].chartArt}return o}({post:t,imageSize:r,isRefresh:!1});n(e)},size:"small",style:{cursor:"pointer",":hover":{"background-color":"#f3f4f5"}}},React.createElement(u.CardBody,{style:{display:"flex"}},!l&&React.createElement("div",{style:{width:"35%",maxWidth:"200px",paddingRight:"1em",paddingTop:"0.5em"}},React.createElement(M,{item:t,imageSize:r})),React.createElement("div",null,React.createElement("div",{style:{fontSize:"0.8em",color:"#666"}},"".concat(s," | ").concat(Object(I.date)("M j, Y",i))),React.createElement("strong",null,o),React.createElement("div",{style:{fontSize:"0.8em",fontStyle:"italic",color:"#666",lineHeight:"1.5em"}},d))))}function T(e){var t=e.attributes,n=e.setAttributes,r=e.disableImage,c=void 0!==r&&r,l=e.onSelect,d=void 0===l?function(){}:l,h=e.onKeyEnter,p=void 0===h?function(){}:h,v=t.imageSize,f=t.url,g=Object(P.useEntityProp)("root","site","siteId"),R=1===Object(a.a)(g,1)[0]?"stub":"post",E=Object(o.useState)(!!f),y=Object(a.a)(E,2),k=y[0],O=y[1],j=Object(o.useState)(f),x=Object(a.a)(j,2),S=x[0],_=x[1],w=b(S,500),z=Object(o.useMemo)((function(){return!(void 0===w||!w.match(/^(http|https):\/\//))}),[w]),C=Object(o.useState)(null),H=Object(a.a)(C,2),I=H[0],M=H[1],T=!!w.length,N=Object(P.useEntityRecords)("postType",R,{per_page:10,post_parent:0,search:T&&!z?w:"",context:"view"}),A=N.records,L=N.isResolving,F=!(k||z||!A)&&0<A.length,U=!k&&z&&null!==I,D=!k&&!F&&!U;return Object(o.useEffect)((function(){var e;z&&(O(!0),(e=w,new Promise((function(t,n){m()({path:"/prc-api/v2/stub/get-post-by-url",method:"POST",data:{url:e}}).then((function(e){"object"!==Object(s.a)(e)&&n(new Error("post is not an object")),t(e)})).catch((function(e){return n(e)}))}))).then((function(e){M(e),O(!1)})).catch((function(e){console.error("getPostByUrl error",e),M(null),O(!1)})))}),[w,z]),Object(o.useEffect)((function(){O(L)}),[L]),React.createElement(u.TabbableContainer,{onNavigate:function(e,t){return console.log("onNavigate:",t)}},React.createElement(u.KeyboardShortcuts,{shortcuts:{enter:function(){z&&(n({url:w}),"function"==typeof p&&p())}}},React.createElement(u.SearchControl,{tabIndex:"0",value:S,onChange:function(e){return _(e)},placeholder:"Climate Change...",autoComplete:"off"})),T&&React.createElement(o.Fragment,null,k&&React.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",color:"#666"}},React.createElement("span",null,"Loading... "),React.createElement(u.Spinner,null)),D&&React.createElement("div",{style:{textAlign:"center",color:"#666",paddingTop:"1em"}},React.createElement("span",null,Object(i.__)("Nothing found.","prc-block-library")),z&&React.createElement("div",null,React.createElement("span",null,Object(i.__)("Press enter to change the URL.","prc-block-library")))),U&&React.createElement("div",null,React.createElement(V,{item:I,onSelect:d,imageSize:v,disableImage:c}),React.createElement("div",{style:{textAlign:"center",color:"#666",paddingTop:"1em"}},React.createElement("span",null,Object(i.__)("Press enter to insert post.","prc-block-library")))),F&&!z&&React.createElement(B,{searchRecords:A,onSelect:d,imageSize:v,disableImage:c})))}function N(e){var t=e.attributes,n=e.setAttributes,r=e.onSelect,c=void 0===r?function(){}:r,l=Object(P.useEntityProp)("root","site","siteId"),s=1===Object(a.a)(l,1)[0]?"stub":"post",d=Object(o.useState)(!1),m=Object(a.a)(d,2),b=m[0],h=m[1];return React.createElement(u.ToolbarGroup,null,React.createElement(u.ToolbarButton,{"aria-expanded":b,"aria-haspopup":"true",label:Object(i.__)("Search for a ".concat(s," or paste url here"),"prc-block-library"),icon:"admin-links",onClick:function(){return h(!0)},showTooltip:!0}),!0===b&&React.createElement(u.Modal,{title:Object(i.__)("Search for a ".concat(s," or paste url here"),"prc-block-library"),onRequestClose:function(){return h(!1)},shouldCloseOnClickOutside:!1,shouldCloseOnEsc:!1},React.createElement("div",{style:{width:"100%",minWidth:"340px",maxWidth:"640px",margin:"0 auto"}},React.createElement(T,{attributes:t,setAttributes:n,onSelect:function(e){c(e),h(!1)},onKeyEnter:function(){return h(!1)}}))))}function A(e,t,n,a,r){e===t&&r(Object(h.a)({},n,a))}function L(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25;return new Promise((function(n){var a={};m()({path:"/wp/v2/".concat(e,"?per_page=").concat(t)}).then((function(t){for(var r=0;r<t.length;r++){var c=t[r].slug.replace("".concat(e.toLowerCase(),"_"),"");a[t[r].id]={id:t[r].id,name:t[r].name,parent:t[r].parent,slug:c}}n(a)}))}))}function F(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"slug",a=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return new Promise((function(r){L(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(a){var r=e[a],c=r[n],l=r.name;void 0!==r.parent&&0!==r.parent&&(l=" -- ".concat(l)),t.push({value:c,label:l})})),!1!==a&&t.sort((function(e,t){return e.label>t.label?1:-1})),r(t)}))}))}function U(e){return new Promise((function(t){L(e).then((function(e){var n=[],a=Object.keys(e).map((function(t){return e[t]}));a.filter((function(e){return 0===e.parent})).forEach((function(e){var t=a.filter((function(t){return t.parent===e.id})),r=[];t.forEach((function(e){r.push({name:e.name,id:e.id})})),n.push({name:e.name,id:e.id,children:r})})),t(n)}))}))}var D=[{label:"Weekly roundup of all new publications",value:"7c1390ba46"},{label:"Quarterly update from the president",value:"a33430a835"},{label:"--",value:!1},{label:"Global attitudes & trends (twice a month)",value:"9203343b04"},{label:"Internet, science & tech (monthly)",value:"ea87b26abe"},{label:"Daily briefing of media news",value:"1d2638430b"},{label:"Race & ethnicity (monthly)",value:"0e7495c7b2"},{label:"Religion & public life - Weekly newsletter",value:"a7d4f3268f"},{label:"Religion & public life - Daily religion headlines",value:"1a647764b2"},{label:"Social & demographic trends (monthly)",value:"3836f62305"},{label:"Methodological research (quarterly)",value:"6d1e80bbaf"},{label:"U.S. politics & policy (monthly)",value:"fa5fdbc701"},{label:"--",value:!1},{label:"Mini-course - U.S. Immigration",value:"xxx"},{label:"Mini-course - U.S. Census",value:"xxxx"},{label:"Mini-course - Muslims and Islam",value:"xxxxx"}]}}]);
//# sourceMappingURL=default~collection-kicker~mailchimp-form~mailchimp-select~menu-link~popular-listing~promo~staff-list~aa0bc84c-42c1d43a.js.map