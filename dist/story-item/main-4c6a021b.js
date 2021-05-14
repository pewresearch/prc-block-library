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
(window["wpackioprcBlocksLibrarystory-itemJsonp"]=window["wpackioprcBlocksLibrarystory-itemJsonp"]||[]).push([[3],{0:function(e,t){e.exports=React},1:function(e,t){e.exports=wp.element},107:function(e,t,a){a(84),e.exports=a(120)},11:function(e,t){e.exports=wp.blockEditor},120:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.r(t);var r=a(24),l=a(7),i=a(40),c=a(79),o=a(8),s=a.n(o),u=a(1),m=a(32),d=a(133),p=a(28),b=a.n(p),f=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25;return new Promise((function(a){var n={};b()({path:"/wp/v2/".concat(e,"?per_page=").concat(t)}).then((function(t){for(var r=0;r<t.length;r++){var l=t[r].slug.replace("".concat(e.toLowerCase(),"_"),"");n[t[r].id]={id:t[r].id,name:t[r].name,parent:t[r].parent,slug:l}}a(n)}))}))},g=function(e,t,a,r,l){e===t&&l(n({},a,r))},h=a(3),E=a(11);a(82);function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function y(e,t){if(e){if("string"==typeof e)return v(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?v(e,t):void 0}}function R(e){return function(e){if(Array.isArray(e))return v(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||y(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var w=a(18);function k(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(!e){if("undefined"==typeof window)return!1;e=window}var t=e.navigator.platform;return-1!==t.indexOf("Mac")||Object(w.includes)(["iPad","iPhone"],t)}var x="alt",A="ctrl",C="meta",O="shift",S={primary:function(e){return e()?[C]:[A]},primaryShift:function(e){return e()?[O,C]:[A,O]},primaryAlt:function(e){return e()?[x,C]:[A,x]},secondary:function(e){return e()?[O,x,C]:[A,O,x]},access:function(e){return e()?[A,x]:[O,x]},ctrl:function(){return[A]},alt:function(){return[x]},ctrlShift:function(){return[A,O]},shift:function(){return[O]},shiftAlt:function(){return[O,x]}},j=(Object(w.mapValues)(S,(function(e){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:k;return[].concat(R(e(a)),[t.toLowerCase()]).join("+")}})),Object(w.mapValues)(S,(function(e){return function(t){var a,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:k,l=r(),i=(n(a={},x,l?"⌥":"Alt"),n(a,A,l?"⌃":"Ctrl"),n(a,C,"⌘"),n(a,O,l?"⇧":"Shift"),a),c=e(r).reduce((function(e,t){var a=Object(w.get)(i,t,t);return[].concat(R(e),l?[a]:[a,"+"])}),[]),o=Object(w.capitalize)(t);return[].concat(R(c),[o])}})));Object(w.mapValues)(j,(function(e){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:k;return e(t,a).join("")}})),Object(w.mapValues)(S,(function(e){return function(t){var a,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:k,i=r(),c=(n(a={},O,"Shift"),n(a,C,i?"Command":"Control"),n(a,A,"Control"),n(a,x,i?"Option":"Alt"),n(a,",",Object(l.__)("Comma")),n(a,".",Object(l.__)("Period")),n(a,"`",Object(l.__)("Backtick")),a);return[].concat(R(e(r)),[t]).map((function(e){return Object(w.capitalize)(Object(w.get)(c,e,e))})).join(i?" ":" + ")}}));function H(e){return[x,A,C,O].filter((function(t){return e["".concat(t,"Key")]}))}Object(w.mapValues)(S,(function(e){return function(t,a){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:k,r=e(n),l=H(t);return!Object(w.xor)(r,l).length&&(a?t.key===a:Object(w.includes)(r,t.key.toLowerCase()))}}));function N(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var a=[],n=!0,r=!1,l=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw l}}return a}}(e,t)||y(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}a(58).a;var M=function(e){var t=e.wpQueryContext,a=e.rootClientId,n=e.postId;console.log("<ContextControls>",t,a,n);var r=t.includes(n);return console.log("isActive?",r),React.createElement(E.BlockControls,null,React.createElement(h.Toolbar,{controls:[{icon:"sticky",title:"Pin This",isActive:r,onClick:function(){var e=t,r=e.findIndex((function(e){return e===n}));-1===r?e.push(n):e.splice(r,1),console.log("dispatching...",n),console.log(e),Object(m.dispatch)("core/block-editor").updateBlockAttributes(a,{pinned:JSON.stringify(e)})}}]}))},z=(a(45),function(e,t){var a={title:e.title.hasOwnProperty("rendered")?e.title.rendered:e.title,excerpt:e.excerpt.hasOwnProperty("rendered")?e.excerpt.rendered:e.excerpt,link:e.link,label:e.hasOwnProperty("label")?e.label:"Report",date:e.date,postID:e.id,extra:""};e.art||(a.image=e.image),t(a)}),T=function(e,t){void 0!==e&&void 0!==t&&b()({path:"/prc-api/v2/blocks/helpers/get-post-by-url",method:"POST",data:{url:e}}).then((function(e){console.log("setPostbyURL",e),!1!==e&&z(e,t)})).catch((function(a){console.error(a),t({link:e})}))},P=function(e,t,a){void 0!==e&&void 0!==t&&(void 0!==a&&a(!0),b()({path:"/wp/v2/stub/".concat(e),method:"GET"}).then((function(a){console.log("setPostByStubID",e,a),!1!==a&&z(a,t)})).catch((function(e){return console.error(e)})).then((function(){void 0!==a&&a(!1)})))},I=function(e){var t=e.url,a=e.setAttributes,n=N(Object(u.useState)(!1),2),r=n[0],i=n[1];return React.createElement(u.Fragment,null,React.createElement(h.ToolbarButton,{"aria-expanded":r,"aria-haspopup":"true",label:Object(l.__)("Set Link"),icon:"admin-links",onClick:function(){return i(!r)},showTooltip:!0}),!0===r&&React.createElement(h.Popover,{position:"bottom center",onClose:function(){return i(!1)}},React.createElement(E.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",value:{url:t},showInitialSuggestions:!0,suggestionsQuery:{type:"post",subtype:"stub"},onChange:function(e){e.hasOwnProperty("url")&&(e.hasOwnProperty("id")?P(e.id,a):T(e.url,a))},settings:[]})))},B={className:"block-library-heading-level-dropdown",isAlternate:!0},_=function(e){var t=e.selected,a=e.options,n=e.iconPaths,r=e.label,i=e.prefixLabel,c=void 0===i?"%s":i,o=e.onChange,s=e.iconWidth,u=void 0===s?"24":s,m=e.iconHeight,d=void 0===m?"24":m,p=e.iconViewBox,b=void 0===p?"0 0 24 24":p,f=function(e){var t=e.selected,a=e.isPressed,r=void 0!==a&&a;return n.hasOwnProperty(t)?React.createElement(h.SVG,{width:u,height:d,viewBox:b,xmlns:"http://www.w3.org/2000/svg",isPressed:r},React.createElement(h.Path,{d:n[t]})):null};return React.createElement(h.Dropdown,{popoverProps:B,renderToggle:function(e){var a=e.onToggle,n=e.isOpen;return React.createElement(h.ToolbarButton,{"aria-expanded":n,"aria-haspopup":"true",icon:React.createElement(f,{selected:t}),label:r,onClick:a,showTooltip:!0})},renderContent:function(){return React.createElement(h.Toolbar,{className:"block-library-heading-level-toolbar",label:r},React.createElement(h.ToolbarGroup,{isCollapsed:!1,controls:a.map((function(e,a){var n=t===e;return{icon:React.createElement(f,{selected:e,isPressed:n}),title:Object(l.sprintf)(Object(l.__)(c),e),isActive:n,onClick:function(){o(e)}}}))}))}})},L=function(e){var t=e.attributes,a=e.setAttributes,n=t.link,r=t.imageSize,i=t.imageSlot,c=t.headerSize,o=t.isChartArt;return React.createElement(E.BlockControls,null,React.createElement(h.ToolbarGroup,null,React.createElement(I,{url:n,setAttributes:a})),React.createElement(h.ToolbarGroup,null,React.createElement(_,{label:Object(l.__)("Change Heading Level"),selected:c,options:[1,2,3],onChange:function(e){return a({headerSize:e})},iconPaths:{1:"M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z",2:"M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z",3:"M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z"},iconHeight:"24",iconWidth:"24",prefixLabel:"Heading %d",iconViewBox:"0 0 20 20"})),"disabled"!==i&&React.createElement(h.ToolbarGroup,null,!["legacy-260","legacy-260-173"].includes(r)&&React.createElement(_,{label:Object(l.__)("Change Image Size"),selected:r,options:["A1","A2","A3","A4","XL"],onChange:function(e){return a({imageSize:e})},iconPaths:{A1:"M12.13,18.09h-3l-.74-2.46H4.49l-.75,2.46H1.27l3.84-12H8.36ZM7.72,13.41,6.44,9.2,5.16,13.41Z M13.31,8.35a7,7,0,0,0,4-2.44h2v10h3.33v2.19H13V15.9h3.63V9a23.54,23.54,0,0,1-3.33,1.78Z",A2:"M12.5,18.09h-3l-.74-2.46H4.86l-.75,2.46H1.64l3.83-12H8.73ZM8.09,13.41,6.81,9.2,5.53,13.41Z M22.16,18.09h-9V15.75l.72-.52,1.46-1a31.07,31.07,0,0,0,3.1-2.6,2.74,2.74,0,0,0,.9-1.87,1.55,1.55,0,0,0-1.66-1.6c-1.19,0-1.86.76-2,2.3l-2.48-.55c.56-2.67,2.11-4,4.66-4a4.37,4.37,0,0,1,3,.91A3.5,3.5,0,0,1,22.2,9.69c0,1.51-.69,2.61-2.52,4a33.64,33.64,0,0,1-3.06,2h5.74Z",A3:"M12.52,18h-3l-.74-2.47H4.89L4.13,18H1.67L5.5,6H8.76ZM8.11,13.32,6.83,9.11,5.56,13.32Z M17.38,10.75a1.87,1.87,0,0,0,1.46-.47,1.36,1.36,0,0,0,.38-.94A1.5,1.5,0,0,0,17.6,7.89c-1,0-1.51.45-1.84,1.53L13.28,9a3.62,3.62,0,0,1,1.1-2,4.58,4.58,0,0,1,3.33-1.24C20.24,5.82,22,7.13,22,9a2.69,2.69,0,0,1-2,2.68,3.09,3.09,0,0,1,1.51.74,2.73,2.73,0,0,1,.9,2.11c0,2.19-1.82,3.61-4.64,3.61A4.67,4.67,0,0,1,14.23,17a3.88,3.88,0,0,1-1.31-2.45l2.55-.36A2,2,0,0,0,17.63,16a1.64,1.64,0,0,0,1.84-1.62,1.55,1.55,0,0,0-.61-1.27,3,3,0,0,0-1.66-.27H16.1V10.75Z",A4:"M12.31,18.09h-3l-.74-2.46H4.67l-.75,2.46H1.45l3.84-12H8.54ZM7.9,13.41,6.62,9.2,5.34,13.41Z M20.86,13.22h1.69v2.1H20.86v2.77H18.05V15.32H12.81v-2.1l4.84-7.31h3.21Zm-2.69,0V9.16c0-.09,0-.28,0-.57l0-.51-3.29,5.14Z",XL:"M9.23,11.58,12.94,18H9.7L7.28,13.65,4.87,18H2.21l3.71-6.38L2.62,6H5.9L7.84,9.65,9.88,6h2.63Z M21.79,15.63V18H14.18V6H17v9.64Z"},prefixLabel:"%s Image Size"}),React.createElement(h.ToolbarButton,{icon:"chart-pie",isPressed:o,label:Object(l.__)("Enable Chart Art"),onClick:function(){a({isChartArt:!o})}})))},F=function(e){var t=e.attributes,a=e.setAttributes,n=e.context,r=e.rootClientId,i=N(Object(u.useState)(!1),2),c=i[0],o=i[1],s=t.postID,m=t.link,d=t.imageSlot,p=t.enableHeader,b=t.enableExcerpt,f=t.enableExcerptBelow,g=t.enableExtra,v=t.enableBreakingNews,y=t.enableEmphasis,R=t.enableProgramsTaxonomy,k=t.enableMeta,x=t.inLoop,A=Object(l.__)("Story Item options");return Object(u.useEffect)((function(){Object(w.isEmpty)(m)||void 0!==s||T(m,a)}),[m]),React.createElement(u.Fragment,null,React.createElement(L,{attributes:t,setAttributes:a}),!1!==n&&React.createElement(M,{wpQueryContext:n,rootClientId:r,postId:s}),React.createElement(E.InspectorControls,null,React.createElement(h.PanelBody,{title:A},Object(w.isInteger)(s)&&React.createElement(h.Button,{isSecondary:!0,isBusy:c,onClick:function(){return P(s,a,o)},style:{marginBottom:"1em"}},"Refresh Post"),React.createElement(h.ToggleControl,{label:k?"Meta Enabled":"Meta Disabled",checked:k,onChange:function(){a({enableMeta:!k})}}),React.createElement(h.ToggleControl,{label:p?"Header Enabled":"Header Disabled",checked:p,onChange:function(){a({enableHeader:!p})}}),React.createElement(h.ToggleControl,{label:b?"Excerpt Enabled":"Excerpt Disabled",checked:b,onChange:function(){a({enableExcerpt:!b})}}),!0===b&&("right"===d||"left"===d)&&React.createElement(h.ToggleControl,{label:f?"Excerpt Will Appear Below":"Excerpt Will Appear Normally",checked:f,onChange:function(){a({enableExcerptBelow:!f})}}),React.createElement(h.ToggleControl,{label:g?"Extras Enabled":"Extras Disabled",checked:g,onChange:function(){a({enableExtra:!g})}}),React.createElement(h.ToggleControl,{label:v?"Breaking News Enabled":"Breaking News Disabled",checked:v,onChange:function(){!1!==window.prcBreakingNews?a({enableBreakingNews:!v}):(alert("There are no currently active, authorized, breaking news events. The breaking news toggle will be set back to false."),a({enableBreakingNews:!1}))}}),React.createElement(h.ToggleControl,{label:R?"Programs":"Formats",checked:R,onChange:function(){a({enableProgramsTaxonomy:!R})}}),React.createElement(h.ToggleControl,{label:y?"Emphasis Enabled":"Emphasis Disabled",checked:y,onChange:function(){a({enableEmphasis:!y})}}),React.createElement(h.ToggleControl,{label:x?"Pub Listing Style On Mobile":"Normal Styling On Mobile",checked:x,onChange:function(){a({inLoop:!x})}}))))},V=a(21),D=["image"],Z=function(e){var t=e.img,a=e.size,n=e.postId,r=e.setAttributes,l=N(Object(u.useState)(!1),2),i=l[0],c=l[1];return Object(u.useEffect)((function(){0!==n&&!1!==r&&b()({path:"/prc-api/v2/get-art/?postId=".concat(n)}).then((function(e){!1!==e?(c(e),r({image:e[a].rawUrl})):c(!1)}))}),[n]),Object(u.useEffect)((function(){!1!==i&&void 0!==i[a]&&!1!==r&&r({image:i[a].rawUrl,isChartArt:i[a].chartArt})}),[i,a]),React.createElement(E.MediaUploadCheck,null,React.createElement(E.MediaUpload,{onSelect:function(e){return r({image:e.url})},allowedTypes:D,render:function(e){var r=e.open;return void 0===n||["legacy-260","legacy-260-173"].includes(a)||(r=function(){return alert("You are unable to edit this image as it is locked to a post. To edit, visit this post and edit its origin post. "+n)}),React.createElement(u.Fragment,null,void 0!==t&&0!==t.length&&React.createElement(V.a,{img:t,size:a,link:"",onClick:r}),(void 0===t||0===t.length)&&React.createElement(V.a,{img:t,size:a,link:"",onClick:r,placeholder:!0}))}}))},W=function(e){var t=e.img,a=e.size,n=e.slot,r=e.chartArt,l=e.postId,i=e.setAttributes;console.log("<Img>",t);var c,o,u,m,d;return React.createElement("div",{className:(c=!1,o=!1,u=!1,m=!1,d=!1,!1!==n&&("XL"===a?c=!0:"A1"===a?o=!0:"A2"===a?u=!0:"A3"===a?m=!0:"A4"===a&&(d=!0)),s()({ui:!0,XL:c,A1:o,A2:u,A3:m,A4:d,image:!0,bordered:r}))},React.createElement(Z,{img:t,size:a,postId:l,setAttributes:i}))},Y=function(e){var t=e.content,a=e.sansSerif,n=e.enabled,r=e.setAttributes;if(!0!==n)return React.createElement(u.Fragment,null);var l=s()("description",{"sans-serif":a});return React.createElement(u.Fragment,null,!1!==r&&React.createElement(E.RichText,{tagName:"div",value:t,onChange:function(e){return r({excerpt:e})},placeholder:t,multiline:"p",className:l}),!1===r&&React.createElement(E.RichText.Content,{tagName:"div",value:t,className:l}))},U=function(e){var t=e.content,a=e.breakingNews,n=e.enabled,r=e.setAttributes;return React.createElement(u.Fragment,null,!1!==r&&!0===n&&React.createElement(E.RichText,{tagName:"ul",value:t,onChange:function(e){return r({extra:e})},placeholder:t,multiline:"li",className:"extra"}),!1===r&&!0===n&&React.createElement(E.RichText.Content,{tagName:"ul",value:t,className:"extra"}),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))},X=function(e){var t=e.label,a=e.date,n=e.taxonomy,r=e.setAttributes,l=N(Object(u.useState)([]),2),i=l[0],c=l[1];return Object(u.useEffect)((function(){(function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"name",n=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return new Promise((function(r){f(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(n){var r=e[n],l=r.name;"termid"===a&&(l=r.id);var i=r.name;void 0!==r.parent&&0!==r.parent&&(i=" -- ".concat(i)),t.push({value:l,label:i})})),!1!==n&&t.sort((function(e,t){return e.label>t.label?1:-1})),r(t)}))}))})(n).then((function(e){c(e)}))}),[n]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(h.SelectControl,{value:t,options:i,onChange:function(e){r({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(h.TextControl,{value:a,onChange:function(e){r({date:e})},style:{marginBottom:"0px"},className:"story-label-select"})))},G=function(e){var t=e.title,a=e.label,n=e.date,r=e.size,l=e.enabled,i=e.taxonomy,c=e.setAttributes,o=e.altHeaderWeight,m=l.enableHeader,p=l.enableMeta;if(!0!==m)return React.createElement(u.Fragment,null);var b=s()({large:1===r,medium:2===r,small:3===r,light:o,"sans-serif":!0!==p});return React.createElement(u.Fragment,null,!0===p&&React.createElement(d.a.Meta,null,React.createElement(X,{date:n,label:a,taxonomy:i,setAttributes:c})),React.createElement(d.a.Header,{className:b},React.createElement(E.RichText,{tagName:"div",value:t,onChange:function(e){return c({title:e})},allowedFormats:["italic"],placeholder:"Title",multiline:"br"})))},J=function(e){var t=e.attributes,a=e.setAttributes,n=e.isSelected,r=e.clientId,l=e.context,i=t.title,c=t.excerpt,o=t.extra,p=t.link,b=t.label,f=t.date,h=t.image,E=t.imageSlot,v=t.imageSize,y=t.isChartArt,R=t.postID,w=t.headerSize,k=t.enableEmphasis,x=t.enableHeader,A=t.enableExcerpt,C=t.enableExcerptBelow,O=t.enableExtra,S=t.enableBreakingNews,j=t.enableProgramsTaxonomy,H=t.enableMeta,N=t.className,M=Object(m.useSelect)((function(e){return{rootClientId:e("core/block-editor").getBlockRootClientId(r)}}),[r]).rootClientId,z=a,T=!A,P=j?"Programs":"Formats",I=s()(N,"story",{stacked:"top"===E||"bottom"===E,bordered:k,"alt-description":C});!function(e,t){g("is-style-top",e,"imageSlot","top",t),g("is-style-bottom",e,"imageSlot","bottom",t),g("is-style-left",e,"imageSlot","left",t),g("is-style-right",e,"imageSlot","right",t),g("is-style-disabled",e,"imageSlot","disabled",t),g("is-style-default",e,"imageSlot","default",t)}(N,a);var B=function(){return React.createElement(W,{img:h,size:v,link:p,slot:E,chartArt:y,postId:R,setAttributes:z})},_=function(){return"top"!==E&&"left"!==E?React.createElement(u.Fragment,null):React.createElement(B,null)},L=function(){return"default"!==E?React.createElement(u.Fragment,null):React.createElement(B,null)},V=function(){return"bottom"!==E&&"right"!==E?React.createElement(u.Fragment,null):React.createElement(B,null)};return React.createElement(u.Fragment,null,!0===n&&React.createElement(F,{attributes:t,setAttributes:a,context:!!l.hasOwnProperty("prc-block/wp-query")&&JSON.parse(l["prc-block/wp-query"]),rootClientId:M}),React.createElement(d.a,{as:"article",className:I},React.createElement(_,null),React.createElement(d.a.Content,null,React.createElement(G,{enabled:{enableHeader:x,enableMeta:H},title:i,date:f,label:b,link:p,size:w,taxonomy:P,setAttributes:z,altHeaderWeight:T}),React.createElement(L,null),!0!==C&&React.createElement(Y,{enabled:A,content:c,sansSerif:!H||!x,setAttributes:z}),React.createElement(U,{enabled:O,content:o,breakingNews:S,setAttributes:z})),React.createElement(V,null),!0===C&&React.createElement(Y,{enabled:A,content:c,sansSerif:!x,setAttributes:z})))},Q=function(e){e.attributes;return React.createElement(u.Fragment,null)},q={from:[{type:"raw",isMatch:function(e){return"P"===e.nodeName&&/^https?:\/\/(www\.)?pewresearch\.(org|local)\/((?!staff).)*$/i.test(e.textContent)},transform:function(e){return Object(i.createBlock)("prc-block/story-item",{link:e.textContent.trim(),className:"is-style-default",imageSize:"A1",imageSlot:"default"})}}],to:[{type:"block",blocks:["prc-block/story-item"],transform:function(e){var t=e.url;return Object(i.createBlock)("prc-block/story-item",{link:t,className:"is-style-default",imageSize:"A1",imageSlot:"default"})}}]};function $(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function K(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?$(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):$(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var ee=c.name,te={title:Object(l.__)("Story Item"),icon:"format-aside",description:Object(l.__)("A story item is a visual display of a post, usually referencing a stub post."),keywords:[Object(l.__)("prc"),Object(l.__)("story"),Object(l.__)("post"),Object(l.__)("story item")],example:{attributes:{title:"Ultricies Ipsum Nibh Egestas Purus",excerpt:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>",extra:"<li></li>",link:"#",label:"Report",date:r().format("MM-DD-YYYY"),image:"https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg",imageSlot:"top",imageSize:"A2"}},variations:[{name:"story-item-default",isDefault:!0,title:Object(l.__)("Story Item"),description:Object(l.__)("The default story item"),attributes:{imageSlot:"default",imageSize:"A1"}},{name:"story-item-pub-listing",title:Object(l.__)("Pub Listing Story Item"),attributes:{className:"is-style-left",imageSlot:"left",imageSize:"A3"}}],transforms:q,edit:J,save:Q};Object(i.registerBlockType)(ee,K(K({},c),te))},18:function(e,t){e.exports=lodash},21:function(e,t,a){"use strict";a.d(t,"a",(function(){return d})),a.d(t,"b",(function(){return g}));var n=a(1),r=a(39),l=a(45),i={default:"564,317",small:"690,388",hidpi:"1128,634",smallHidpi:"1380,776"},c={default:"268,151",small:"690,388",hidpi:"536,301",smallHidpi:"1380,776"},o={default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"},s={default:"268,151",small:"690,388",hidpi:"536,302",smallHidpi:"1380,776"},u={default:"720,405",small:"690,388",hidpi:"1440,810",smallHidpi:"1380,776"},m={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},d=function(e){var t=e.img,a=e.size,d=e.link,p=e.onClick,b=void 0!==p&&p,f=e.placeholder,g=void 0!==f&&f,h=function(e){if(!0===g){return"https://via.placeholder.com/".concat("A2"===a?"536x301":"A3"===a?"388x220":"A4"===a?"536x302":"XL"===a?"1440x810":"legacy-260"===a?"260x260":"legacy-260-173"===a?"260x173":"1128x634",".png?text=").concat(a)}if(""===t||!1===t)return t;var n={resize:i[e]};return"A2"===a?n={resize:c[e]}:"A3"===a?n={resize:o[e]}:"A4"===a?n={resize:s[e]}:"XL"===a&&(n={resize:u[e]}),"legacy-260"===a?n={resize:m[260][e]}:"legacy-260-173"===a&&(n={resize:m["260-173"][e]}),Object(l.addQueryArgs)(t,n)},E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:767;return[{srcSet:"".concat(h("default")," 1x, ").concat(h("hidpi")," 2x"),media:"(min-width: ".concat(e,"px)")},{srcSet:"".concat(h("small")," 1x, ").concat(h("smallHidpi")," 2x"),media:"(max-width: ".concat(e,"px)")}]};return!1!==b?React.createElement("div",{onClick:b},!0===g&&React.createElement("img",{src:h(),alt:"Click to insert"}),!0!==g&&React.createElement(r.a,{sources:E(),alt:"Click to edit"})):React.createElement(n.Fragment,null,""===d&&React.createElement(r.a,{sources:E()}),""!==d&&React.createElement("a",{href:d},React.createElement(r.a,{sources:E()})))},p=a(8),b=a.n(p),f=a(24),g=function(e){var t=e.label,a=void 0===t?"Report":t,r=e.date,l=null!==a?a.replace(/\s+/g,"-").toLowerCase():"report",i=b()(l,"label"),c=f(r).format("MMM D, YYYY");return React.createElement(n.Fragment,null,React.createElement("span",{className:i},a||"Report")," | ",React.createElement("span",{className:"date"},c))}},24:function(e,t){e.exports=moment},28:function(e,t){e.exports=wp.apiFetch},3:function(e,t){e.exports=wp.components},32:function(e,t){e.exports=wp.data},40:function(e,t){e.exports=wp.blocks},45:function(e,t){e.exports=wp.url},53:function(e,t){e.exports=ReactDOM},58:function(e,t,a){"use strict";var n=a(8),r=a.n(n),l=a(1),i=a(71),c=a(133),o=a(21),s=function(e){var t,a,n,l,i,c=e.img,s=e.link,u=e.size,m=e.slot,d=e.chartArt;return React.createElement("div",{className:(t=!1,a=!1,n=!1,l=!1,i=!1,!1!==m&&("XL"===u?t=!0:"A1"===u?a=!0:"A2"===u?n=!0:"A3"===u?l=!0:"A4"===u&&(i=!0)),r()({ui:!0,XL:t,A1:a,A2:n,A3:l,A4:i,image:!0,bordered:d}))},React.createElement(o.a,{img:c,size:u,link:s}))},u=function(e){var t=e.content,a=e.sansSerif;if(!0!==e.enabled)return React.createElement(l.Fragment,null);var n=r()("description",{"sans-serif":a});return React.createElement("div",{className:n},React.createElement(l.RawHTML,null,t))},m=function(e){var t=e.content,a=e.breakingNews,n=e.enabled;return React.createElement(l.Fragment,null,!0===n&&React.createElement(c.a.Extra,{as:"ul"},React.createElement(l.RawHTML,null,t)),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))},d=o.b,p=function(e){var t=e.title,a=e.label,n=e.date,i=e.link,o=e.size,u=e.enabled,m=e.isStyleMobileLoop,p=e.image,b=e.imageSize,f=e.isChartArt,g=e.altHeaderWeight,h=u.enableHeader,E=u.enableMeta;if(!0!==h)return React.createElement(l.Fragment,null);var v=r()({large:1===parseInt(o,0),medium:2===parseInt(o,0),small:3===parseInt(o,0),light:g,"sans-serif":!E});return React.createElement(l.Fragment,null,!0===E&&React.createElement(c.a.Meta,null,React.createElement(d,{label:a,date:n})),React.createElement(c.a.Header,{className:v},!0===m&&React.createElement(s,{img:p,size:b,link:i,slot:"left",chartArt:f}),React.createElement("a",{href:i},React.createElement(l.RawHTML,null,t))))};t.a=function(e){var t=e.title,a=e.excerpt,n=e.extra,o=e.link,d=e.label,b=e.date,f=e.image,g=e.imageSlot,h=e.imageSize,E=e.isChartArt,v=e.headerSize,y=e.enableEmphasis,R=e.enableHeader,w=e.enableMeta,k=e.enableExcerpt,x=e.enableExcerptBelow,A=e.enableExtra,C=e.enableBreakingNews,O=e.extraContent,S=void 0!==O&&O,j=e.className,H=e.inLoop,N=void 0!==H&&H,M=Object(i.a)("(max-width: 990px)"),z=!1;!1===k&&(z=!0);var T=!0;"left"!==g&&"right"!==g||(T=!1);var P=!1;!0===N&&!0===M&&(P=!0),!1===N&&!0===M&&"disabled"!==g&&(g="top"),P&&(g="left",h="A3");var I=r()(j,"story",{stacked:T,bordered:y,"alt-description":x,"is-style-mobile-loop":P}),B=function(){return React.createElement(s,{img:f,size:h,link:o,slot:g,chartArt:E,onClick:function(){window.location=o}})},_=function(){return"top"!==g&&"left"!==g||!0===N&&!0===M?React.createElement(l.Fragment,null):React.createElement(B,null)},L=function(){return"default"!==g||!0===N&&!0===M?React.createElement(l.Fragment,null):React.createElement(B,null)},F=function(){return"bottom"!==g&&"right"!==g||!0===N&&!0===M?React.createElement(l.Fragment,null):React.createElement(B,null)};return React.createElement(c.a,{as:"article",className:I},React.createElement(_,null),React.createElement(c.a.Content,null,React.createElement(p,{enabled:{enableHeader:R,enableMeta:w},title:t,date:b,label:d,link:o,size:v,isStyleMobileLoop:P,image:f,imageSize:h,chartArt:E,altHeaderWeight:z}),React.createElement(L,null),!0!==x&&React.createElement(u,{enabled:k,content:a,sansSerif:!R||!w}),!0===x&&!0===M&&React.createElement(u,{enabled:k,content:a,sansSerif:!R}),React.createElement(m,{enabled:A,content:n,breakingNews:C}),!1!==S&&React.createElement(l.RawHTML,null,S)),React.createElement(F,null),!0===x&&!1===M&&React.createElement(u,{enabled:k,content:a,sansSerif:!R}))}},7:function(e,t){e.exports=wp.i18n},79:function(e){e.exports=JSON.parse('{"name":"prc-block/story-item","category":"layout","attributes":{"title":{"type":"string"},"excerpt":{"type":"string","multiline":"p","default":"<p>Excerpt</p>"},"extra":{"type":"string","multiline":"li"},"link":{"type":"string"},"label":{"type":"string","default":"Report"},"date":{"type":"string"},"image":{"type":"string"},"imageSlot":{"type":"string","default":"default"},"imageSize":{"type":"string","default":"A1"},"isChartArt":{"type":"boolean","default":false},"postID":{"type":"integer"},"headerSize":{"type":"integer","default":2},"enableAltHeaderWeight":{"type":"boolean","default":false},"enableEmphasis":{"type":"boolean","default":false},"enableHeader":{"type":"boolean","default":true},"enableExcerpt":{"type":"boolean","default":true},"enableExcerptBelow":{"type":"boolean","default":false},"enableExtra":{"type":"boolean","default":false},"enableBreakingNews":{"type":"boolean","default":false},"enableProgramsTaxonomy":{"type":"boolean","default":false},"enableMeta":{"type":"boolean","default":true},"inLoop":{"type":"boolean","default":false}},"usesContext":["prc-block/wp-query"],"styles":[{"name":"default","label":"Default Image Alignment","isDefault":true},{"name":"top","label":"Image Aligned Top"},{"name":"bottom","label":"Image Aligned Bottom"},{"name":"left","label":"Image Aligned Left"},{"name":"right","label":"Image Aligned Right"},{"name":"disabled","label":"Disable Image"}],"supports":{"html":false}}')}},[[107,0,1]]]);
//# sourceMappingURL=main-4c6a021b.js.map