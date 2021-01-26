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
(window.wpackioprcBlocksLibrarymenuJsonp=window.wpackioprcBlocksLibrarymenuJsonp||[]).push([[2],[function(e,t){e.exports=wp.element},function(e,t){e.exports=wp.i18n},function(e,t){e.exports=wp.components},function(e,t){e.exports=lodash},,function(e,t){e.exports=wp.blockEditor},function(e,t){e.exports=wp.data},function(e,t){e.exports=wp.blocks},,,,,,,function(e,t){e.exports=regeneratorRuntime},function(e,t){e.exports=wp.url},,,,,,,,,function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/menu-link","category":"layout","parent":["prc-block/menu"],"attributes":{"label":{"type":"string"},"type":{"type":"string"},"description":{"type":"string"},"rel":{"type":"string"},"id":{"type":"number"},"opensInNewTab":{"type":"boolean","default":false},"url":{"type":"string"},"title":{"type":"string"}},"usesContext":["prc-block/menu"],"supports":{"reusable":false,"html":false}}')},,,,,,function(e,t,n){n(19),e.exports=n(33)},,,function(e,t,n){"use strict";n.r(t),n.d(t,"settings",(function(){return T}));var r=n(13),c=n(4),o=n(1),a=n(0),i=n(23),l=Object(a.createElement)(i.b,{xmlns:"https://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(a.createElement)(i.a,{d:"M12.5 4C8.9 4 6 6.8 6 10.2c0 .8.3 1.8.9 3.1.5 1.1 1.2 2.3 2 3.6.7 1 3 3.8 3.2 3.9l.4.5.4-.5c.2-.2 2.6-2.9 3.2-3.9.8-1.2 1.5-2.5 2-3.6.6-1.3.9-2.3.9-3.1C19 6.8 16.1 4 12.5 4zm4.3 8.7c-.5 1-1.1 2.2-1.9 3.4-.5.7-1.7 2.2-2.4 3-.7-.8-1.9-2.3-2.4-3-.8-1.2-1.4-2.3-1.9-3.3-.6-1.4-.7-2.2-.7-2.5 0-2.6 2.2-4.7 5-4.7s5 2.1 5 4.7c0 .2-.1 1-.7 2.4zM12.5 9c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5S13.3 9 12.5 9z"})),s=Object(a.createElement)(i.b,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(a.createElement)(i.a,{fill:"#000",d:"M4 14.5h16V16H4zM4 18.5h9V20H4zM4 4h3c2 0 3 .86 3 2.583 0 .891-.253 1.554-.76 1.988-.505.435-1.24.652-2.204.652H5.542V12H4V4zm2.855 4c.53 0 .924-.114 1.18-.343.266-.228.398-.579.398-1.051 0-.473-.132-.82-.397-1.04-.265-.229-.67-.343-1.217-.343H5.542V8h1.313z"})),u=Object(a.createElement)(i.b,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(a.createElement)(i.a,{d:"M7 5.5h10a.5.5 0 01.5.5v12a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM17 4H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2zm-1 3.75H8v1.5h8v-1.5zM8 11h8v1.5H8V11zm6 3.25H8v1.5h6v-1.5z"})),p=Object(a.createElement)(i.b,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(a.createElement)(i.a,{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm.5 16c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5V7h15v12zM9 10H7v2h2v-2zm0 4H7v2h2v-2zm4-4h-2v2h2v-2zm4 0h-2v2h2v-2zm-4 4h-2v2h2v-2zm4 0h-2v2h2v-2z"})),b=Object(a.createElement)(i.b,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(a.createElement)(i.a,{d:"M20.1 11.2l-6.7-6.7c-.1-.1-.3-.2-.5-.2H5c-.4-.1-.8.3-.8.7v7.8c0 .2.1.4.2.5l6.7 6.7c.2.2.5.4.7.5s.6.2.9.2c.3 0 .6-.1.9-.2.3-.1.5-.3.8-.5l5.6-5.6c.4-.4.7-1 .7-1.6.1-.6-.2-1.2-.6-1.6zM19 13.4L13.4 19c-.1.1-.2.1-.3.2-.2.1-.4.1-.6 0-.1 0-.2-.1-.3-.2l-6.5-6.5V5.8h6.8l6.5 6.5c.2.2.2.4.2.6 0 .1 0 .3-.2.5zM9 8c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1z"})),m=n(5),g=n(7),d=n(24),f=n(14),O=n.n(f),v=n(20),k=n(9),h=n(8),j=n.n(h),w=n(3),y=n(29),_=n(6),E=n(2),C=n(16),x=n(15),B=n(36),R=n(35);function L(e){switch(e){case"post":case"page":return{type:"post",subtype:e};case"topic":return{type:"term",subtype:"topic"};case"formats":return{type:"term",subtype:"formats"};case"programs":return{type:"term",subtype:"programs"};default:return{}}}var z=Object(y.a)([Object(_.withSelect)((function(e,t){var n,r=e("core/block-editor"),c=(r.getBlockAttributes,r.getClientIdsOfDescendants),o=r.hasSelectedInnerBlock,a=(r.getBlockParentsByBlockName,r.getSelectedBlockClientId),i=(r.getSettings,t.clientId),l=!!c([i]).length;return{isImmediateParentOfSelectedBlock:o(i,!1),hasDescendants:l,selectedBlockHasDescendants:!!(null===(n=c([a()]))||void 0===n?void 0:n.length),userCanCreatePages:e("core").canUser("create","pages"),userCanCreatePosts:e("core").canUser("create","posts")}})),Object(_.withDispatch)((function(e,t,n){return{insertLinkBlock:function(){var r=t.clientId,c=e("core/block-editor").insertBlock,o=(0,n.select("core/block-editor").getClientIdsOfDescendants)([r]),a=o.length?o.length:0;c(Object(g.createBlock)("prc-block/menu-link"),a,r)}}}))])((function(e){var t=e.attributes,n=e.context,r=e.isSelected,i=(e.isImmediateParentOfSelectedBlock,e.setAttributes),l=(e.insertLinkBlock,e.userCanCreatePages),s=void 0!==l&&l,u=e.userCanCreatePosts,p=void 0!==u&&u,b=e.insertBlocksAfter,d=e.mergeBlocks,f=e.onReplace,h=t.label,y=t.type,z=t.opensInNewTab,P=t.url,S=t.description,I=t.rel,T=t.title,H={url:P,opensInNewTab:z},D=Object(_.useDispatch)("core").saveEntityRecord,M=Object(a.useState)(!1),A=Object(k.a)(M,2),N=A[0],V=A[1],U=Object(a.useRef)(null),F=function(e){var t=Object(a.useState)(!1),n=Object(k.a)(t,2),r=n[0],c=n[1];return Object(a.useEffect)((function(){var t=e.current.ownerDocument;function n(e){o(e)}function r(){c(!1)}function o(t){e.current.contains(t.target)?c(!0):c(!1)}return t.addEventListener("dragstart",n),t.addEventListener("dragend",r),t.addEventListener("dragenter",o),function(){t.removeEventListener("dragstart",n),t.removeEventListener("dragend",r),t.removeEventListener("dragenter",o)}}),[]),r}(U),J=Object(o.__)("Add link…"),G=Object(a.useRef)(),K=Object(_.useSelect)((function(e){return e("core/block-editor").isDraggingBlocks()}),[]);Object(a.useEffect)((function(){P||V(!0)}),[]),Object(a.useEffect)((function(){r||V(!1)}),[r]),Object(a.useEffect)((function(){N&&P&&(Object(x.isURL)(Object(x.prependHTTP)(h))&&/^.+\.[a-z]+/.test(h)?function(){G.current.focus();var e=G.current.ownerDocument,t=e.defaultView.getSelection(),n=e.createRange();n.selectNodeContents(G.current),t.removeAllRanges(),t.addRange(n)}():Object(B.a)(G.current,!0))}),[P]);var Q=!1;function q(){return(q=Object(v.a)(O.a.mark((function e(t){var n,r;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=y||"page",e.next=3,D("postType",n,{title:t,status:"publish"});case 3:return r=e.sent,e.abrupt("return",{id:r.id,postType:n,title:r.title.rendered,url:r.link});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}y&&"page"!==y?"post"===y&&(Q=p):Q=s;var W=Object(m.useBlockProps)({ref:U,className:j()("item",{"is-editing":r&&!K,"is-selected":r&&!K,"is-dragging-within":F,"has-link":!!P})});return React.createElement(a.Fragment,null,React.createElement(m.BlockControls,null,React.createElement(E.ToolbarGroup,null,React.createElement(E.KeyboardShortcuts,{bindGlobal:!0,shortcuts:Object(c.a)({},C.b.primary("k"),(function(){return V(!0)}))}),React.createElement(E.ToolbarButton,{name:"link",icon:R.a,title:Object(o.__)("Link"),shortcut:C.a.primary("k"),onClick:function(){return V(!0)}}))),React.createElement(m.InspectorControls,null,React.createElement(E.PanelBody,{title:Object(o.__)("Link settings")},React.createElement(E.TextareaControl,{value:S||"",onChange:function(e){i({description:e})},label:Object(o.__)("Description"),help:Object(o.__)("The description will be displayed in the menu if the current theme supports it.")}),React.createElement(E.TextControl,{value:T||"",onChange:function(e){i({title:e})},label:Object(o.__)("Link title"),autoComplete:"off"}),React.createElement(E.TextControl,{value:I||"",onChange:function(e){i({rel:e})},label:Object(o.__)("Link rel"),autoComplete:"off"}))),React.createElement("div",W,React.createElement(m.RichText,{ref:G,identifier:"label",className:"is-style-text"===n["prc-block/menu"]?"ui basic button":"",value:h,onChange:function(e){return i({label:e})},onMerge:d,onReplace:f,__unstableOnSplitAtEnd:function(){return b(Object(g.createBlock)("prc-block/menu-link"))},"aria-label":Object(o.__)("Navigation link text"),placeholder:J,keepPlaceholderOnFocus:!0,withoutInteractiveFormatting:!0,allowedFormats:["core/bold","core/italic","core/image","core/strikethrough"]}),N&&React.createElement(E.Popover,{position:"bottom center",onClose:function(){return V(!1)}},React.createElement(m.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",value:H,showInitialSuggestions:!0,withCreateSuggestion:Q,createSuggestion:function(e){return q.apply(this,arguments)},createSuggestionButtonText:function(e){var t;return t="post"===y?Object(o.__)("Create post: <mark>%s</mark>"):Object(o.__)("Create page: <mark>%s</mark>"),Object(a.createInterpolateElement)(Object(o.sprintf)(t,e),{mark:React.createElement("mark",null)})},noDirectEntry:!!y,noURLSuggestion:!!y,suggestionsQuery:L(y),onChange:function(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=n.title,c=void 0===r?"":r,o=n.url,a=void 0===o?"":o,l=n.opensInNewTab,s=n.id;return i({url:encodeURI(a),label:(e=c.replace(/http(s?):\/\//gi,""),t=a.replace(/http(s?):\/\//gi,""),""!==c&&e!==t&&h!==c?Object(w.escape)(c):h||Object(w.escape)(t)),opensInNewTab:l,id:s})}}))))}));function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var I=d.name,T={title:Object(o.__)("Link"),icon:l,description:Object(o.__)("Add a page, link, or another item to your navigation."),variations:[{name:"link",isDefault:!0,title:Object(o.__)("Link"),description:Object(o.__)("A link to a URL."),attributes:{}},{name:"post",icon:s,title:Object(o.__)("Post Link"),description:Object(o.__)("A link to a post."),attributes:{type:"post"}},{name:"page",icon:u,title:Object(o.__)("Page Link"),description:Object(o.__)("A link to a page."),attributes:{type:"page"}},{name:"topic",icon:p,title:Object(o.__)("Topic Page Link"),description:Object(o.__)("A link to a topic."),attributes:{type:"topic"}},{name:"formats",icon:b,title:Object(o.__)("Format Link"),description:Object(o.__)("A link to a format."),attributes:{type:"formats"}},{name:"programs",icon:b,title:Object(o.__)("Program Link"),description:Object(o.__)("A link to a program."),attributes:{type:"programs"}}],__experimentalLabel:function(e){return e.label},merge:function(e,t){var n=t.label,r=void 0===n?"":n;return S(S({},e),{},{label:e.label+r})},edit:z,save:function(){return React.createElement(m.InnerBlocks.Content,null)},deprecated:[{isEligible:function(e){return e.nofollow},attributes:{label:{type:"string"},type:{type:"string"},nofollow:{type:"boolean"},description:{type:"string"},id:{type:"number"},opensInNewTab:{type:"boolean",default:!1},url:{type:"string"}},migrate:function(e){return S({rel:e.nofollow?"nofollow":""},Object(r.a)(e,["nofollow"]))},save:function(){return React.createElement(m.InnerBlocks.Content,null)}}]};Object(g.registerBlockType)(I,S(S({},d),T))}],[[30,0,1]]]);
//# sourceMappingURL=link-4cc49001.js.map