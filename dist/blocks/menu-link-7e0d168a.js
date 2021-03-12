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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[6],{0:function(e,t){e.exports=wp.element},12:function(e,t){e.exports=lodash},120:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/menu-link","category":"layout","attributes":{"label":{"type":"string"},"type":{"type":"string"},"description":{"type":"string"},"rel":{"type":"string"},"id":{"type":"number"},"opensInNewTab":{"type":"boolean","default":false},"url":{"type":"string"},"title":{"type":"string"},"subMenuEnabled":{"type":"boolean","default":false}},"usesContext":["prc-block/menu","prc-block/tree-list"],"supports":{"reusable":false,"html":false}}')},176:function(e,t,n){n(17),e.exports=n(234)},2:function(e,t){e.exports=wp.i18n},234:function(e,t,n){"use strict";n.r(t);var o=n(5),r=n(2),c=n(264),a=n(6),i=n(120),l=n(18),s=n(9),u=n.n(s),p=n(12),b=n(7),m=n(4),f=n(135),d=n(3),g=n(35),k=n(0),O=n(266),y=n(259),_=n(260),j=function(e){switch(e){case"page":return{type:"post",subtype:"page"};case"topic":return{type:"term",subtype:"topic"};case"formats":return{type:"term",subtype:"formats"};case"programs":return{type:"term",subtype:"programs"};default:return{}}},h=function(e){var t=e.type,n=e.close,o=Object(d.__experimentalUseInnerBlocksProps)({className:u()({list:"inline"===t,menu:"dropdown"===t})},{allowedBlocks:["prc-block/menu-link"],orientation:"vertical",__experimentalCaptureToolbars:!0,templateLock:!1});return"inline"===t?React.createElement("div",o):React.createElement(m.Popover,{position:"bottom center",onFocusOutside:function(){return null},onClose:n,style:{zIndex:1}},React.createElement("div",{style:{width:"300px",height:"300px",zIndex:2}},React.createElement("div",o)))},w=function(e){var t=e.attributes,n=e.context,c=e.isSelected,a=e.setAttributes,i=e.clientId,s=e.mergeBlocks,w=e.onReplace,R=t.label,E=t.type,v=t.opensInNewTab,x=t.url,C=t.description,T=t.rel,P=t.title,L=t.subMenuEnabled,B={url:x,opensInNewTab:v},I=Object(b.useSelect)((function(e){var t=e("core/block-editor"),o=t.getClientIdsOfDescendants,r=t.getBlockRootClientId,c=!0;return"prc-block/menu-link"===(0,t.getBlock)(r(i)).name&&(c=!1),{allowSubMenu:c,hasDescendants:!!o([i]).length,isDraggingBlocks:e("core/block-editor").isDraggingBlocks(),subMenuType:n.hasOwnProperty("prc-block/menu")?"dropdown":"inline"}}),[]),S=I.isDraggingBlocks,D=I.subMenuType,M=I.allowSubMenu,N=Object(k.useState)(!1),A=Object(l.a)(N,2),F=A[0],U=A[1],z=Object(k.useState)(!1),J=Object(l.a)(z,2),G=J[0],V=J[1],H=Object(k.useRef)(null),K=Object(r.__)("Add link…"),Q=Object(k.useRef)();Object(k.useEffect)((function(){x||U(!0)}),[]),Object(k.useEffect)((function(){c||U(!1)}),[c]),Object(k.useEffect)((function(){F&&x&&(Object(g.isURL)(Object(g.prependHTTP)(R))&&/^.+\.[a-z]+/.test(R)?function(){Q.current.focus();var e=Q.current.ownerDocument,t=e.defaultView.getSelection(),n=e.createRange();n.selectNodeContents(Q.current),t.removeAllRanges(),t.addRange(n)}():Object(O.a)(Q.current,!0))}),[x]);var q=Object(d.useBlockProps)({ref:H,className:u()("item",{"is-editing":c&&!S,"is-selected":c&&!S,"has-link":!!x})});return React.createElement(k.Fragment,null,React.createElement(d.BlockControls,null,React.createElement(m.ToolbarGroup,null,React.createElement(m.KeyboardShortcuts,{bindGlobal:!0,shortcuts:Object(o.a)({},f.b.primary("k"),(function(){return U(!0)}))}),React.createElement(m.ToolbarButton,{name:"link",icon:y.a,title:Object(r.__)("Link"),shortcut:f.a.primary("k"),onClick:function(){return U(!0)}}),!0===M&&React.createElement(m.ToolbarButton,{name:"sub-menu",icon:_.a,title:Object(r.__)("Sub Menu"),onClick:function(){!1===L&&a({subMenuEnabled:!0}),V(!G)}}))),React.createElement(d.InspectorControls,null,React.createElement(m.PanelBody,{title:Object(r.__)("Link settings")},React.createElement(m.TextareaControl,{value:C||"",onChange:function(e){a({description:e})},label:Object(r.__)("Description"),help:Object(r.__)("The description will be displayed in the menu if the current theme supports it.")}),React.createElement(m.TextControl,{value:P||"",onChange:function(e){a({title:e})},label:Object(r.__)("Link title"),autoComplete:"off"}),React.createElement(m.TextControl,{value:T||"",onChange:function(e){a({rel:e})},label:Object(r.__)("Link rel"),autoComplete:"off"}),!0===M&&React.createElement(m.ToggleControl,{checked:L,onChange:function(){a({subMenuEnabled:!L})},label:Object(r.__)("Enable Sub Menu")}))),React.createElement("div",q,React.createElement(d.RichText,{ref:Q,identifier:"label",className:"is-style-text"===n["prc-block/menu"]?"ui basic button":"",value:R,onChange:function(e){return a({label:e})},onMerge:s,onReplace:w,"aria-label":Object(r.__)("Menu link text"),placeholder:K,keepPlaceholderOnFocus:!0,withoutInteractiveFormatting:!0,allowedFormats:["core/bold","core/italic"]}),F&&React.createElement(m.Popover,{position:"bottom center",onClose:function(){return U(!1)}},React.createElement(d.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",value:B,showInitialSuggestions:!0,noDirectEntry:!!E,noURLSuggestion:!!E,suggestionsQuery:j(E),onChange:function(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=n.title,r=void 0===o?"":o,c=n.url,i=void 0===c?"":c,l=n.opensInNewTab,s=n.id;return a({url:encodeURI(i),label:(e=r.replace(/http(s?):\/\//gi,""),t=i.replace(/http(s?):\/\//gi,""),""!==r&&e!==t&&R!==r?Object(p.escape)(r):R||Object(p.escape)(t)),opensInNewTab:l,id:s})}})),!0===L&&!0===G&&React.createElement(h,{type:D,close:function(){return V(!G)}})))},R=function(){return React.createElement(d.InnerBlocks.Content,null)},E=n(261),v=n(262),x=n(263),C=[{name:"link",isDefault:!0,title:Object(r.__)("Link"),description:Object(r.__)("A link to a URL."),attributes:{}},{name:"page",icon:E.a,title:Object(r.__)("Page Link"),description:Object(r.__)("A link to a page."),attributes:{type:"page"}},{name:"topic",icon:v.a,title:Object(r.__)("Topic Page Link"),description:Object(r.__)("A link to a topic."),attributes:{type:"topic"}},{name:"formats",icon:x.a,title:Object(r.__)("Format Link"),description:Object(r.__)("A link to a format."),attributes:{type:"formats"}},{name:"programs",icon:x.a,title:Object(r.__)("Program Link"),description:Object(r.__)("A link to a program."),attributes:{type:"programs"}}];function T(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?T(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):T(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var L=i.name,B={title:Object(r.__)("Link"),icon:c.a,description:Object(r.__)("Add a page, link, or another item to your navigation."),variations:C,__experimentalLabel:function(e){return e.label},edit:w,save:R};Object(a.registerBlockType)(L,P(P({},i),B))},3:function(e,t){e.exports=wp.blockEditor},35:function(e,t){e.exports=wp.url},4:function(e,t){e.exports=wp.components},6:function(e,t){e.exports=wp.blocks},7:function(e,t){e.exports=wp.data}},[[176,0,19]]]);
//# sourceMappingURL=menu-link-7e0d168a.js.map