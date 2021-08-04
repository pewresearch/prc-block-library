/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.0.0
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[15],{1:function(e,t){e.exports=window.React},16:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var o=n(27);var r=n(25),c=n(28);function a(e,t){return Object(o.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c=[],a=!0,l=!1;try{for(n=n.call(e);!(a=(o=n.next()).done)&&(c.push(o.value),!t||c.length!==t);a=!0);}catch(e){l=!0,r=e}finally{try{a||null==n.return||n.return()}finally{if(l)throw r}}return c}}(e,t)||Object(r.a)(e,t)||Object(c.a)()}},18:function(e,t){e.exports=window.wp.data},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t,n){"use strict";function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}n.d(t,"a",(function(){return o}))},24:function(e,t){e.exports=window.wp.primitives},25:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var o=n(20);function r(e,t){if(e){if("string"==typeof e)return Object(o.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(o.a)(e,t):void 0}}},27:function(e,t,n){"use strict";function o(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return o}))},277:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/menu-link","category":"layout","attributes":{"label":{"type":"string"},"type":{"type":"string"},"description":{"type":"string"},"rel":{"type":"string"},"id":{"type":"number"},"opensInNewTab":{"type":"boolean","default":false},"url":{"type":"string"},"title":{"type":"string"},"color":{"type":"string","default":""},"subMenuEnabled":{"type":"boolean","default":false},"isChild":{"type":"boolean","default":false},"rootBlockName":{"type":"string"},"parentBlockName":{"type":"string"}},"example":{"attributes":{"label":"A link"},"viewPortWidth":100},"usesContext":["prc-block/menu","prc-block/taxonomy-tree","prc-block/taxonomy-tree-more","prc-block/hasDarkBackground"],"supports":{"reusable":false,"html":false},"styles":[{"name":"link","label":"Link","isDefault":true},{"name":"button","label":"Button"},{"name":"link-to-read-more","label":"Read More"},{"name":"link-to-archive","label":"All Publications"}]}')},28:function(e,t,n){"use strict";function o(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return o}))},3:function(e,t){e.exports=window.wp.components},35:function(e,t){e.exports=window.wp.apiFetch},38:function(e,t){e.exports=window.lodash},390:function(e,t){e.exports=window.wp.dom},4:function(e,t){e.exports=window.wp.element},53:function(e,t){e.exports=moment},54:function(e,t){e.exports=window.wp.url},585:function(e,t,n){n(22),e.exports=n(649)},6:function(e,t){e.exports=window.wp.blockEditor},62:function(e,t){e.exports=window.wp.keycodes},63:function(e,t){e.exports=window.ReactDOM},649:function(e,t,n){"use strict";n.r(t);var o=n(14),r=n(2),c=n(4),a=n(24),l=Object(c.createElement)(a.SVG,{xmlns:"https://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(a.Path,{d:"M12 9c-.8 0-1.5.7-1.5 1.5S11.2 12 12 12s1.5-.7 1.5-1.5S12.8 9 12 9zm0-5c-3.6 0-6.5 2.8-6.5 6.2 0 .8.3 1.8.9 3.1.5 1.1 1.2 2.3 2 3.6.7 1 3 3.8 3.2 3.9l.4.5.4-.5c.2-.2 2.6-2.9 3.2-3.9.8-1.2 1.5-2.5 2-3.6.6-1.3.9-2.3.9-3.1C18.5 6.8 15.6 4 12 4zm4.3 8.7c-.5 1-1.1 2.2-1.9 3.4-.5.7-1.7 2.2-2.4 3-.7-.8-1.9-2.3-2.4-3-.8-1.2-1.4-2.3-1.9-3.3-.6-1.4-.7-2.2-.7-2.5 0-2.6 2.2-4.7 5-4.7s5 2.1 5 4.7c0 .2-.1 1-.7 2.4z"})),i=n(9),s=n(277),u=n(16),p=n(15),b=n.n(p),m=n(33),d=Object(c.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(a.Path,{d:"M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"})),f=Object(c.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(a.Path,{d:"M4 7.2v1.5h16V7.2H4zm8 8.6h8v-1.5h-8v1.5zm-8-3.5l3 3-3 3 1 1 4-4-4-4-1 1z"})),w=Object(c.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24"},Object(c.createElement)(a.Path,{d:"M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6zM10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6z"})),v=n(38),h=n(18),y=n(3),k=n(62),O=n(6),g=n(54),j=n(390),_=function(e,t){var n=t.filter((function(t){return t.color===e}));return 1<=n.length?"".concat(n[0].name):null},E=function(e){switch(e){case"page":return{type:"post",subtype:"page"};case"topic":return{type:"term",subtype:"topic"};case"formats":return{type:"term",subtype:"formats"};case"research-teams":return{type:"term",subtype:"research-teams"};default:return{}}},x=function(e){var t=e.type,n=e.close,o=e.clientId,c=e.linkType,a=Object(O.__experimentalUseInnerBlocksProps)({className:b()({list:"inline"===t}),style:"dropdown"===t?{width:"200px",padding:"0 1em 1em 1em",zIndex:2}:null},{allowedBlocks:["prc-block/menu-link"],orientation:"vertical",__experimentalCaptureToolbars:"dropdown"===t,templateLock:!1,renderAppender:function(){return React.createElement(m.a,{label:Object(r.__)("Add New ".concat((e=t,"string"!=typeof e?"":e.charAt(0).toUpperCase()+e.slice(1))," Item")),blockName:"prc-block/menu-link",attributes:{type:c},clientId:o});var e}});return"inline"===t?React.createElement("div",a):React.createElement(y.Popover,{position:"bottom center",onFocusOutside:function(){return null},onClose:n,style:{zIndex:1}},React.createElement("div",a))},R=[{name:"primary",color:"#2185d0"},{name:"secondary",color:"#000"},{name:"mustard",color:"#d3aa20"},{name:"basic",color:"#fff"}],B=function(e){var t=e.attributes,n=e.isSelected,a=e.setAttributes,l=e.clientId,i=e.context,s=e.mergeBlocks,p=e.onReplace,m=t.className,B=t.color,z=t.label,C=t.type,M=t.opensInNewTab,P=t.url,S=t.description,H=t.rel,T=t.title,A=t.subMenuEnabled,I=i["prc-block/hasDarkBackground"],V={url:P,opensInNewTab:M},N=Object(h.useSelect)((function(e){var t=e("core/block-editor"),n=t.getBlockHierarchyRootClientId,o=t.getBlockRootClientId,r=t.getBlock,c=r(o(l)),a=r(n(l));return{allowSubMenu:null!==c&&c.hasOwnProperty("name")&&["prc-block/menu","prc-block/taxonomy-tree","prc-block/taxonomy-tree-more"].includes(c.name),subMenuType:null!==c&&c.hasOwnProperty("name")&&"prc-block/menu"===c.name?"dropdown":"inline",rootBlockName:null!==a&&a.hasOwnProperty("name")?a.name:null,parentBlockName:null!==c&&c.hasOwnProperty("name")?c.name:null}}),[]),L=N.subMenuType,D=N.allowSubMenu,F=N.parentBlockName,G=N.rootBlockName,U=Object(c.useState)(!1),J=Object(u.a)(U,2),K=J[0],Q=J[1],W=Object(c.useState)(!1),$=Object(u.a)(W,2),q=$[0],X=$[1],Y=Object(c.useRef)(null),Z=Object(r.__)("Add link…"),ee=Object(c.useRef)();Object(c.useEffect)((function(){""!==B&&"#000"!==B||!I||a({color:"#d3aa20"})}),[B,I]),Object(c.useEffect)((function(){P||Q(!0),a({rootBlockName:G,parentBlockName:F})}),[]),Object(c.useEffect)((function(){n||Q(!1)}),[n]),Object(c.useEffect)((function(){K&&P&&(Object(g.isURL)(Object(g.prependHTTP)(z))&&/^.+\.[a-z]+/.test(z)?function(){ee.current.focus();var e=ee.current.ownerDocument,t=e.defaultView.getSelection(),n=e.createRange();n.selectNodeContents(ee.current),t.removeAllRanges(),t.addRange(n)}():Object(j.placeCaretAtHorizontalEdge)(ee.current,!0))}),[P]);var te="is-style-button"===m,ne=["prc-block/menu","prc-block/menu-link"].includes(F),oe=["prc-block/taxonomy-tree","prc-block/taxonomy-tree-more"].includes(F);Object(c.useEffect)((function(){te?"prc-block/menu"===F&&null==B&&a({color:"#fff"}):a({color:null})}),[te]);var re=Object(O.useBlockProps)({ref:Y,className:b()(m,_(B,R),{item:!te||oe||ne,"ui button":te&&!(oe||ne),inverted:"basic"===_(B,R)&&I&&te&&!(oe||ne)})});return React.createElement(c.Fragment,null,React.createElement(O.BlockControls,null,React.createElement(y.ToolbarGroup,null,React.createElement(y.KeyboardShortcuts,{bindGlobal:!0,shortcuts:Object(o.a)({},k.rawShortcut.primary("k"),(function(){return Q(!0)}))}),React.createElement(y.ToolbarButton,{name:"link",icon:d,title:Object(r.__)("Link"),shortcut:k.displayShortcut.primary("k"),onClick:function(){return Q(!0)}}),!0===D&&React.createElement(y.ToolbarButton,{name:"sub-menu",icon:f,title:Object(r.__)("Sub Menu"),isActive:q,onClick:function(){!1===A&&a({subMenuEnabled:!0}),X(!q)}}))),React.createElement(O.InspectorControls,null,React.createElement(y.PanelBody,{title:Object(r.__)("Link settings")},React.createElement(y.TextareaControl,{value:S||"",onChange:function(e){a({description:e})},label:Object(r.__)("Description"),help:Object(r.__)("The description will be displayed where supported.")}),React.createElement(y.TextControl,{value:T||"",onChange:function(e){a({title:e})},label:Object(r.__)("Link title"),autoComplete:"off"}),React.createElement(y.TextControl,{value:H||"",onChange:function(e){a({rel:e})},label:Object(r.__)("Link rel"),autoComplete:"off"}),!0===D&&React.createElement(y.ToggleControl,{checked:A,onChange:function(){a({subMenuEnabled:!A})},label:Object(r.__)("Enable Sub Menu")})),te&&React.createElement(y.PanelBody,{title:Object(r.__)("Button Style Options")},React.createElement(y.ColorPalette,{colors:R,value:B,onChange:function(e){a({color:e})},disableCustomColors:!0}))),React.createElement("div",re,React.createElement(y.Flex,null,React.createElement(y.FlexItem,null,React.createElement(O.RichText,{ref:ee,identifier:"label",className:void 0!==F&&"prc-block/menu"===F&&te?b()("ui button",_(B,R),{inverted:"basic"===_(B,R)&&I}):"",value:z,onChange:function(e){return a({label:e})},onMerge:s,onReplace:p,"aria-label":Object(r.__)("Menu link text"),placeholder:Z,keepPlaceholderOnFocus:!0,withoutInteractiveFormatting:!0,allowedFormats:["bold"]})),React.createElement(y.FlexBlock,null,!0===A&&"inline"===L&&React.createElement(y.Button,{isTertiary:!0,isPressed:q,icon:w,onClick:function(){return X(!q)}}))),K&&React.createElement(y.Popover,{position:"bottom center",onClose:function(){return Q(!1)}},React.createElement(O.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",value:V,showInitialSuggestions:!0,noDirectEntry:!!C,noURLSuggestion:!!C,suggestionsQuery:E(C),onChange:function(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=n.title,r=void 0===o?"":o,c=n.url,l=void 0===c?"":c,i=n.opensInNewTab,s=n.id;return a({url:encodeURI(l),label:(e=r.replace(/http(s?):\/\//gi,""),t=l.replace(/http(s?):\/\//gi,""),""!==r&&e!==t&&z!==r?Object(v.escape)(r):z||Object(v.escape)(t)),opensInNewTab:i,id:s})}})),!0===A&&!0===q&&React.createElement(x,{type:L,close:function(){return X(!q)},clientId:l,linkType:C})))},z=function(){return React.createElement(O.InnerBlocks.Content,null)},C=Object(c.createElement)(a.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(c.createElement)(a.Path,{d:"M19 6.5H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm.5 9c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5v-7c0-.3.2-.5.5-.5h14c.3 0 .5.2.5.5v7zM8 12.8h8v-1.5H8v1.5z"})),M=Object(c.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(a.Path,{d:"M7 5.5h10a.5.5 0 01.5.5v12a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM17 4H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2zm-1 3.75H8v1.5h8v-1.5zM8 11h8v1.5H8V11zm6 3.25H8v1.5h6v-1.5z"})),P=Object(c.createElement)(a.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(c.createElement)(a.Path,{d:"M6 5.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM4 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm11-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM13 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2V6zm5 8.5h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zM15 13a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2h-3zm-9 1.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM4 15a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3z",fillRule:"evenodd",clipRule:"evenodd"})),S=Object(c.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(a.Path,{d:"M20.1 11.2l-6.7-6.7c-.1-.1-.3-.2-.5-.2H5c-.4-.1-.8.3-.8.7v7.8c0 .2.1.4.2.5l6.7 6.7c.2.2.5.4.7.5s.6.2.9.2c.3 0 .6-.1.9-.2.3-.1.5-.3.8-.5l5.6-5.6c.4-.4.7-1 .7-1.6.1-.6-.2-1.2-.6-1.6zM19 13.4L13.4 19c-.1.1-.2.1-.3.2-.2.1-.4.1-.6 0-.1 0-.2-.1-.3-.2l-6.5-6.5V5.8h6.8l6.5 6.5c.2.2.2.4.2.6 0 .1 0 .3-.2.5zM9 8c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1z"})),H=[{name:"link",isDefault:!0,title:Object(r.__)("Link"),description:Object(r.__)("A link to a URL."),attributes:{}},{name:"button",icon:C,title:Object(r.__)("Button"),description:Object(r.__)("A link to a URL, styled as a button"),attributes:{className:"is-style-button"}},{name:"page",icon:M,title:Object(r.__)("Page Link"),description:Object(r.__)("A link to a page."),attributes:{type:"page"}},{name:"topic",icon:P,title:Object(r.__)("Topic Page Link"),description:Object(r.__)("A link to a topic."),attributes:{type:"topic"}},{name:"formats",icon:S,title:Object(r.__)("Format Link"),description:Object(r.__)("A link to a format."),attributes:{type:"formats"}},{name:"research-teams",icon:S,title:Object(r.__)("Research Areas Link"),description:Object(r.__)("A link to a research area."),attributes:{type:"research-teams"}}];function T(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function A(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?T(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):T(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var I=s.name,V={title:Object(r.__)("Link"),icon:l,description:Object(r.__)("Add a page, link, or another item to your navigation."),variations:H,__experimentalLabel:function(e){return e.label},edit:B,save:z};Object(i.registerBlockType)(I,A(A({},s),V))},9:function(e,t){e.exports=window.wp.blocks}},[[585,0,1,2]]]);
//# sourceMappingURL=menu-link-06e431a6.js.map