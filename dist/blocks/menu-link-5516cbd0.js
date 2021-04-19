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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[9],{1:function(e,t){e.exports=React},10:function(e,t){e.exports=wp.blocks},11:function(e,t){e.exports=wp.data},14:function(e,t,n){var r,o=n(13);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)&&n.length){var l=a.apply(null,n);l&&e.push(l)}else if("object"===r)for(var i in n)c.call(n,i)&&n[i]&&e.push(i)}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):"object"===o(n(17))&&n(17)?void 0===(r=function(){return a}.apply(t,[]))||(e.exports=r):window.classNames=a}()},195:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return p}));var c=n(14),a=n.n(c),l=n(2);function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u=function(e){return Object(l.createElement)("path",e)},p=function(e){var t=e.className,n=e.isPressed,r=s(s({},o(e,["className","isPressed"])),{},{className:a()(t,{"is-pressed":n})||void 0,role:"img","aria-hidden":!0,focusable:!1});return Object(l.createElement)("svg",r)}},2:function(e,t){e.exports=wp.element},22:function(e,t){e.exports=moment},27:function(e,t){e.exports=lodash},278:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/menu-link","category":"layout","attributes":{"label":{"type":"string"},"type":{"type":"string"},"description":{"type":"string"},"rel":{"type":"string"},"id":{"type":"number"},"opensInNewTab":{"type":"boolean","default":false},"url":{"type":"string"},"title":{"type":"string"},"color":{"type":"string"},"subMenuEnabled":{"type":"boolean","default":false},"isChild":{"type":"boolean","default":false},"rootBlockName":{"type":"string"},"parentBlockName":{"type":"string"}},"example":{"attributes":{"label":"A link"},"viewPortWidth":100},"usesContext":["prc-block/menu","prc-block/taxonomy-tree","prc-block/taxonomy-tree-more"],"supports":{"reusable":false,"html":false},"styles":[{"name":"link","label":"Link","isDefault":true},{"name":"button","label":"Button"}]}')},28:function(e,t){e.exports=wp.apiFetch},3:function(e,t){e.exports=wp.i18n},39:function(e,t){e.exports=wp.url},4:function(e,t){e.exports=wp.components},42:function(e,t,n){"use strict";n.d(t,"e",(function(){return c})),n.d(t,"f",(function(){return l})),n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return f})),n.d(t,"c",(function(){return y})),n.d(t,"d",(function(){return k}));n(22);var r=n(28),o=n.n(r),c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25;return new Promise((function(n){var r={};o()({path:"/wp/v2/".concat(e,"?per_page=").concat(t)}).then((function(t){for(var o=0;o<t.length;o++){var c=t[o].slug.replace("".concat(e.toLowerCase(),"_"),"");r[t[o].id]={id:t[o].id,name:t[o].name,parent:t[o].parent,slug:c}}n(r)}))}))},a=n(12),l=function(e,t,n,r,o){e===t&&o(Object(a.a)({},n,r))},i=n(3),s=n(11),u=n(4),p=n(10),b=function(e){var t=e.label,n=void 0===t?"":t,r=e.blockName,o=e.clientId,c=(e.className,e.attributes),a=void 0===c?{}:c;return React.createElement(u.Button,{label:Object(i.__)(n),tooltipPosition:"bottom",onClick:function(){var e=Object(s.select)("core/block-editor").getBlock(o);console.log("debug info...",e.innerBlocks.length);var t=e.innerBlocks.length-1,n=Object(p.createBlock)(r,a);Object(s.dispatch)("core/block-editor").insertBlock(n,t,o)},className:"block-editor-button-block-appender"},Object(i.__)(n))},m=n(2),v=n(5),d=n(303),f=function(e){var t=e.url,n=e.heading,r=e.headingSize,o=void 0===r?"h2":r,c=e.setAttributes;return React.createElement(m.Fragment,null,React.createElement(v.BlockControls,null,React.createElement(u.ToolbarGroup,null,React.createElement(k,{url:t,onChange:function(e){c({url:e.url})}}))),React.createElement(u.Flex,{style:{paddingBottom:"1em"}},React.createElement(u.FlexItem,null,React.createElement(v.RichText,{tagName:o,value:n,onChange:function(e){return c({heading:e})},placeholder:"Heading...",formattingControls:[],keepPlaceholderOnFocus:!0,className:"sans-serif"})),React.createElement(u.FlexBlock,null,React.createElement(d.a,{name:"chevron right",size:"large",style:{marginLeft:"0.5em"}}))))},h=n(53),g=function(e){var t=e.level,n=e.isPressed,r=void 0!==n&&n,o={1:"M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z",2:"M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z",3:"M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z",4:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z",5:"M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z",6:"M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z"};return o.hasOwnProperty(t)?React.createElement(u.SVG,{width:"24",height:"24",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",isPressed:r},React.createElement(u.Path,{d:o[t]})):null},O={className:"block-library-heading-level-dropdown",isAlternate:!0},y=function(e){var t=e.selectedLevel,n=e.levels,r=void 0===n?[2,3]:n,o=e.onChange;return console.log("HeadingLevelToolbar",t),React.createElement(u.ToolbarGroup,null,React.createElement(u.Dropdown,{popoverProps:O,renderToggle:function(e){var n=e.onToggle,r=e.isOpen;return React.createElement(u.ToolbarButton,{"aria-expanded":r,"aria-haspopup":"true",icon:React.createElement(g,{level:t}),label:Object(i.__)("Change heading level"),onClick:n,onKeyDown:function(e){r||e.keyCode!==h.a||(e.preventDefault(),e.stopPropagation(),n())},showTooltip:!0})},renderContent:function(){return React.createElement(u.Toolbar,{className:"block-library-heading-level-toolbar",label:Object(i.__)("Change heading level")},React.createElement(u.ToolbarGroup,{isCollapsed:!1,controls:r.map((function(e){var n=e===t;return{icon:React.createElement(g,{level:e,isPressed:n}),title:Object(i.sprintf)(Object(i.__)("Heading %d"),e),isActive:n,onClick:function(){o(e)}}}))}))}}))},w=n(18),k=function(e){var t=e.url,n=e.onChange,r=e.query,o=void 0===r?{type:"term",subtype:"topic"}:r,c=Object(m.useState)(!1),a=Object(w.a)(c,2),l=a[0],s=a[1];return React.createElement(m.Fragment,null,React.createElement(u.ToolbarButton,{"aria-expanded":l,"aria-haspopup":"true",label:Object(i.__)("Set Link"),icon:"admin-links",onClick:function(){return s(!l)},showTooltip:!0}),!0===l&&React.createElement(u.Popover,{position:"bottom center",onClose:function(){return s(!1)}},React.createElement(v.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",value:{url:t},showInitialSuggestions:!0,suggestionsQuery:o,onChange:function(e){return n(e)},settings:[]})))};n(16),n(61),n(829),n(40),n(39)},5:function(e,t){e.exports=wp.blockEditor},716:function(e,t,n){n(21),e.exports=n(774)},73:function(e,t){e.exports=ReactDOM},774:function(e,t,n){"use strict";n.r(t);var r=n(12),o=n(3),c=n(2),a=n(195),l=Object(c.createElement)(a.b,{xmlns:"https://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(a.a,{d:"M12 9c-.8 0-1.5.7-1.5 1.5S11.2 12 12 12s1.5-.7 1.5-1.5S12.8 9 12 9zm0-5c-3.6 0-6.5 2.8-6.5 6.2 0 .8.3 1.8.9 3.1.5 1.1 1.2 2.3 2 3.6.7 1 3 3.8 3.2 3.9l.4.5.4-.5c.2-.2 2.6-2.9 3.2-3.9.8-1.2 1.5-2.5 2-3.6.6-1.3.9-2.3.9-3.1C18.5 6.8 15.6 4 12 4zm4.3 8.7c-.5 1-1.1 2.2-1.9 3.4-.5.7-1.7 2.2-2.4 3-.7-.8-1.9-2.3-2.4-3-.8-1.2-1.4-2.3-1.9-3.3-.6-1.4-.7-2.2-.7-2.5 0-2.6 2.2-4.7 5-4.7s5 2.1 5 4.7c0 .2-.1 1-.7 2.4z"})),i=n(10),s=n(278),u=n(18),p=n(14),b=n.n(p),m=n(27),v=n(11),d=n(4),f=n(53),h=n(5),g=n(39);var O=Object(c.createElement)(a.b,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(a.a,{d:"M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"})),y=Object(c.createElement)(a.b,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(a.a,{d:"M4 7.2v1.5h16V7.2H4zm8 8.6h8v-1.5h-8v1.5zm-8-3.5l3 3-3 3 1 1 4-4-4-4-1 1z"})),w=Object(c.createElement)(a.b,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},Object(c.createElement)(a.a,{d:"M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6zM10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6z"})),k=n(42),j=function(e,t){var n=t.filter((function(t){return t.color===e}));return 1<=n.length?"".concat(n[0].name):null},E=function(e){switch(e){case"page":return{type:"post",subtype:"page"};case"topic":return{type:"term",subtype:"topic"};case"formats":return{type:"term",subtype:"formats"};case"programs":return{type:"term",subtype:"programs"};default:return{}}},_=function(e){var t=e.type,n=e.close,r=e.clientId,c=e.linkType,a=Object(h.__experimentalUseInnerBlocksProps)({className:b()({list:"inline"===t}),style:"dropdown"===t?{width:"200px",padding:"0 1em 1em 1em",zIndex:2}:null},{allowedBlocks:["prc-block/menu-link"],orientation:"vertical",__experimentalCaptureToolbars:"dropdown"===t,templateLock:!1,renderAppender:function(){return React.createElement(k.a,{label:Object(o.__)("Add New ".concat((e=t,"string"!=typeof e?"":e.charAt(0).toUpperCase()+e.slice(1))," Item")),blockName:"prc-block/menu-link",attributes:{type:c},clientId:r});var e}});return"inline"===t?React.createElement("div",a):React.createElement(d.Popover,{position:"bottom center",onFocusOutside:function(){return null},onClose:n,style:{zIndex:1}},React.createElement("div",a))},R=function(e){var t=e.attributes,n=e.isSelected,a=e.setAttributes,l=e.clientId,i=e.mergeBlocks,s=e.onReplace,p=t.className,k=t.color,R=t.label,x=t.type,P=t.opensInNewTab,C=t.url,z=t.description,H=t.rel,B=t.title,M=t.subMenuEnabled,T={url:C,opensInNewTab:P},N=Object(v.useSelect)((function(e){var t=e("core/block-editor"),n=t.getBlockHierarchyRootClientId,r=t.getBlockRootClientId,o=t.getBlock,c=o(r(l)),a=o(n(l));return{allowSubMenu:null!==c&&c.hasOwnProperty("name")&&["prc-block/menu","prc-block/taxonomy-tree","prc-block/taxonomy-tree-more"].includes(c.name),subMenuType:null!==c&&c.hasOwnProperty("name")&&"prc-block/menu"===c.name?"dropdown":"inline",rootBlockName:null!==a&&a.hasOwnProperty("name")?a.name:null,parentBlockName:null!==c&&c.hasOwnProperty("name")?c.name:null}}),[]),V=N.subMenuType,S=N.allowSubMenu,I=N.parentBlockName,L=N.rootBlockName,A=Object(c.useState)(!1),F=Object(u.a)(A,2),D=F[0],U=F[1],G=Object(c.useState)(!1),J=Object(u.a)(G,2),K=J[0],Q=J[1],q=Object(c.useRef)(null),W=Object(o.__)("Add link…"),X=Object(c.useRef)();Object(c.useEffect)((function(){C||U(!0),a({rootBlockName:L,parentBlockName:I})}),[]),Object(c.useEffect)((function(){n||U(!1)}),[n]),Object(c.useEffect)((function(){D&&C&&(Object(g.isURL)(Object(g.prependHTTP)(R))&&/^.+\.[a-z]+/.test(R)?function(){X.current.focus();var e=X.current.ownerDocument,t=e.defaultView.getSelection(),n=e.createRange();n.selectNodeContents(X.current),t.removeAllRanges(),t.addRange(n)}():function e(t,n,r){if(t)if(t.focus(),Object(m.includes)(["INPUT","TEXTAREA"],t.tagName)){if("number"!=typeof t.selectionStart)return;n?(t.selectionStart=t.value.length,t.selectionEnd=t.value.length):(t.selectionStart=0,t.selectionEnd=0)}else if(t.isContentEditable){var o=t.ownerDocument,c=t.getBoundingClientRect(),a=function(e,t,n,r){var o,c=r.style.zIndex,a=r.style.position,l=(o=r).ownerDocument.defaultView.getComputedStyle(o).position;"static"===(void 0===l?"static":l)&&(r.style.position="relative"),r.style.zIndex="10000";var i=function(e,t,n){if(e.caretRangeFromPoint)return e.caretRangeFromPoint(t,n);if(!e.caretPositionFromPoint)return null;var r=e.caretPositionFromPoint(t,n);if(!r)return null;var o=e.createRange();return o.setStart(r.offsetNode,r.offset),o.collapse(!0),o}(e,t,n);return r.style.zIndex=c,r.style.position=a,i}(o,n?c.right-1:c.left+1,n?c.bottom-1:c.top+1,t);if(!a||!a.startContainer||!t.contains(a.startContainer)){if(!r)return;return r=!1,t.scrollIntoView(n),void e(t,n,r)}var l=o.defaultView.getSelection();l.removeAllRanges(),l.addRange(a)}}(X.current,!0))}),[C]);var Y=[{name:"primary",color:"#2185d0"},{name:"secondary",color:"#000"},{name:"mustard",color:"#d3aa20"},{name:"basic",color:"#fff"}],Z="is-style-button"===p,$=["prc-block/menu","prc-block/menu-link"].includes(I),ee=["prc-block/taxonomy-tree","prc-block/taxonomy-tree-more"].includes(I);Object(c.useEffect)((function(){Z?"prc-block/menu"===I&&null==k&&a({color:"#fff"}):a({color:null})}),[Z]);var te=Object(h.useBlockProps)({ref:q,className:b()(p,j(k,Y),{item:!Z||ee||$,"ui button":Z&&!(ee||$)})});return React.createElement(c.Fragment,null,React.createElement(h.BlockControls,null,React.createElement(d.ToolbarGroup,null,React.createElement(d.KeyboardShortcuts,{bindGlobal:!0,shortcuts:Object(r.a)({},f.c.primary("k"),(function(){return U(!0)}))}),React.createElement(d.ToolbarButton,{name:"link",icon:O,title:Object(o.__)("Link"),shortcut:f.b.primary("k"),onClick:function(){return U(!0)}}),!0===S&&React.createElement(d.ToolbarButton,{name:"sub-menu",icon:y,title:Object(o.__)("Sub Menu"),isActive:K,onClick:function(){!1===M&&a({subMenuEnabled:!0}),Q(!K)}}))),React.createElement(h.InspectorControls,null,React.createElement(d.PanelBody,{title:Object(o.__)("Link settings")},React.createElement(d.TextareaControl,{value:z||"",onChange:function(e){a({description:e})},label:Object(o.__)("Description"),help:Object(o.__)("The description will be displayed where supported.")}),React.createElement(d.TextControl,{value:B||"",onChange:function(e){a({title:e})},label:Object(o.__)("Link title"),autoComplete:"off"}),React.createElement(d.TextControl,{value:H||"",onChange:function(e){a({rel:e})},label:Object(o.__)("Link rel"),autoComplete:"off"}),!0===S&&React.createElement(d.ToggleControl,{checked:M,onChange:function(){a({subMenuEnabled:!M})},label:Object(o.__)("Enable Sub Menu")})),Z&&React.createElement(d.PanelBody,{title:Object(o.__)("Button Style Options")},React.createElement(d.ColorPalette,{colors:Y,value:k,onChange:function(e){a({color:e})},disableCustomColors:!0}))),React.createElement("div",te,React.createElement(d.Flex,null,React.createElement(d.FlexItem,null,React.createElement(h.RichText,{ref:X,identifier:"label",className:void 0!==I&&"prc-block/menu"===I&&Z?"ui ".concat(j(k,Y)," button"):"",value:R,onChange:function(e){return a({label:e})},onMerge:i,onReplace:s,"aria-label":Object(o.__)("Menu link text"),placeholder:W,keepPlaceholderOnFocus:!0,withoutInteractiveFormatting:!0,allowedFormats:[]})),React.createElement(d.FlexBlock,null,!0===M&&"inline"===V&&React.createElement(d.Button,{isTertiary:!0,isPressed:K,icon:w,onClick:function(){return Q(!K)}}))),D&&React.createElement(d.Popover,{position:"bottom center",onClose:function(){return U(!1)}},React.createElement(h.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",value:T,showInitialSuggestions:!0,noDirectEntry:!!x,noURLSuggestion:!!x,suggestionsQuery:E(x),onChange:function(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=n.title,o=void 0===r?"":r,c=n.url,l=void 0===c?"":c,i=n.opensInNewTab,s=n.id;return a({url:encodeURI(l),label:(e=o.replace(/http(s?):\/\//gi,""),t=l.replace(/http(s?):\/\//gi,""),""!==o&&e!==t&&R!==o?Object(m.escape)(o):R||Object(m.escape)(t)),opensInNewTab:i,id:s})}})),!0===M&&!0===K&&React.createElement(_,{type:V,close:function(){return Q(!K)},clientId:l,linkType:x})))},x=function(){return React.createElement(h.InnerBlocks.Content,null)},P=Object(c.createElement)(a.b,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(c.createElement)(a.a,{d:"M19 6.5H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm.5 9c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5v-7c0-.3.2-.5.5-.5h14c.3 0 .5.2.5.5v7zM8 12.8h8v-1.5H8v1.5z"})),C=Object(c.createElement)(a.b,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(a.a,{d:"M7 5.5h10a.5.5 0 01.5.5v12a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM17 4H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2zm-1 3.75H8v1.5h8v-1.5zM8 11h8v1.5H8V11zm6 3.25H8v1.5h6v-1.5z"})),z=Object(c.createElement)(a.b,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(c.createElement)(a.a,{d:"M6 5.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM4 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm11-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM13 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2V6zm5 8.5h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zM15 13a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2h-3zm-9 1.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM4 15a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3z",fillRule:"evenodd",clipRule:"evenodd"})),H=Object(c.createElement)(a.b,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(a.a,{d:"M20.1 11.2l-6.7-6.7c-.1-.1-.3-.2-.5-.2H5c-.4-.1-.8.3-.8.7v7.8c0 .2.1.4.2.5l6.7 6.7c.2.2.5.4.7.5s.6.2.9.2c.3 0 .6-.1.9-.2.3-.1.5-.3.8-.5l5.6-5.6c.4-.4.7-1 .7-1.6.1-.6-.2-1.2-.6-1.6zM19 13.4L13.4 19c-.1.1-.2.1-.3.2-.2.1-.4.1-.6 0-.1 0-.2-.1-.3-.2l-6.5-6.5V5.8h6.8l6.5 6.5c.2.2.2.4.2.6 0 .1 0 .3-.2.5zM9 8c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1z"})),B=[{name:"link",isDefault:!0,title:Object(o.__)("Link"),description:Object(o.__)("A link to a URL."),attributes:{}},{name:"button",icon:P,title:Object(o.__)("Button"),description:Object(o.__)("A link to a URL, styled as a button"),attributes:{className:"is-style-button"}},{name:"page",icon:C,title:Object(o.__)("Page Link"),description:Object(o.__)("A link to a page."),attributes:{type:"page"}},{name:"topic",icon:z,title:Object(o.__)("Topic Page Link"),description:Object(o.__)("A link to a topic."),attributes:{type:"topic"}},{name:"formats",icon:H,title:Object(o.__)("Format Link"),description:Object(o.__)("A link to a format."),attributes:{type:"formats"}},{name:"programs",icon:H,title:Object(o.__)("Program Link"),description:Object(o.__)("A link to a program."),attributes:{type:"programs"}}];function M(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function T(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?M(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):M(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var N=s.name,V={title:Object(o.__)("Link"),icon:l,description:Object(o.__)("Add a page, link, or another item to your navigation."),variations:B,__experimentalLabel:function(e){return e.label},edit:R,save:x};Object(i.registerBlockType)(N,T(T({},s),V))}},[[716,0,1,2]]]);
//# sourceMappingURL=menu-link-5516cbd0.js.map