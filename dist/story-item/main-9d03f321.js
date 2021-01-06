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
(window["wpackioprcBlocksLibrarystory-itemJsonp"]=window["wpackioprcBlocksLibrarystory-itemJsonp"]||[]).push([[3],{0:function(e,t){e.exports=React},1:function(e,t){e.exports=wp.element},100:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(83);function r(e,t){if(e){if("string"==typeof e)return Object(n.a)(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Object(n.a)(e,t):void 0}}},11:function(e,t){e.exports=wp.blockEditor},112:function(e,t,a){a(86),e.exports=a(126)},123:function(e,t,a){},126:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.r(t);var r=a(23),l=a(17),c=a(58),i=a(80),o=a(7),s=a.n(o),u=a(1),m=a(56),p=a(139),d=a(37),b=a.n(d),f=window.wp,g=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:25,a=e,n=new f.api.collections[a];return void 0!==n&&new Promise((function(e){var r={};n.fetch({data:{hide_empty:!1,per_page:t}}).then((function(t){for(var n=0;n<t.length;n++){var l=t[n].slug.replace("".concat(a.toLowerCase(),"_"),"");r[t[n].id]={id:t[n].id,name:t[n].name,slug:l}}e(r)}))}))},h=function(e,t,a,r,l){e===t&&l(n({},a,r))},E=(a(57).a,a(123),a(11)),v=(a(84),a(99)),R=a(6),y=a(2);function w(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function x(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function k(e,t,a){return t&&x(e.prototype,t),a&&x(e,a),e}var A=a(51);function C(e,t){return(C=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function O(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&C(e,t)}var S=a(3);function N(e,t){return!t||"object"!==Object(S.a)(t)&&"function"!=typeof t?Object(A.a)(e):t}function j(e){return(j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var H=a(61);var z=function(e,t){return function(a){var n=e(a),r=a.displayName,l=void 0===r?a.name||"Component":r;return n.displayName="".concat(Object(H.upperFirst)(Object(H.camelCase)(t)),"(").concat(l,")"),n}};function T(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=j(e);if(t){var r=j(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return N(this,a)}}function _(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return z((function(t){return function(a){O(r,a);var n=T(r);function r(){var t;return w(this,r),(t=n.apply(this,arguments)).setState=t.setState.bind(Object(A.a)(t)),t.state=e,t}return k(r,[{key:"render",value:function(){return Object(u.createElement)(t,Object(y.a)({},this.props,this.state,{setState:this.setState}))}}]),r}(u.Component)}),"withState")}var I=a(100);function P(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var a=[],n=!0,r=!1,l=void 0;try{for(var c,i=e[Symbol.iterator]();!(n=(c=i.next()).done)&&(a.push(c.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{n||null==i.return||i.return()}finally{if(r)throw l}}return a}}(e,t)||Object(I.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var B=a(0);_({termsData:[],excludeData:[],includeData:[]})((function(e){var t=e.termsData,a=e.excludeData,n=e.includeData,r=e.setState,l=e.exclude,c=e.include,i=(e.letter,e.taxonomy),o=e.setAttributes,s=e.isSelected,m=function(){(function(e,t){return new Promise((function(a){b()({path:"/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=".concat(e,"&letter=").concat(t)}).then((function(e){a(e)}))}))})(i,100).then((function(e){r({termsData:e}),function(e){var t={};if(0!==e.length&&0!==l.length&&(t.excludeData=JSON.parse(l)),0!==e.length&&0===c.length){var a=[];e.map((function(e){a.push({id:e.term_id,name:e.name,slug:e.slug})})),o({include:JSON.stringify(a)}),t.includeData=a}else 0!==e.length&&0!==c.length&&(t.includeData=JSON.parse(c));r(t)}(e)}))};!1!==o&&function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){return null};Object(B.useEffect)(Object(B.useCallback)((function(){e()}),[e]),[])}((function(){0===t.length&&m()}));var p=0!==c.length&&!1===o&&JSON.parse(c);return React.createElement("div",{className:"ui link list"},!1!==p&&React.createElement(u.Fragment,null,p.map((function(e){return React.createElement("a",{className:"item",href:"/".concat(i.toLowerCase(),"/").concat(e.slug)},e.name)}))),!1!==o&&React.createElement(u.Fragment,null,t.map((function(e){var t=l.includes(e.term_id);return React.createElement("div",{className:"item"},React.createElement(R.CheckboxControl,{label:Object(v.decodeEntities)(e.name),checked:t,onChange:function(t){var r,l,c,i,s,u,m;r=t,l=e.term_id,c=e.name,i=e.slug,u=a,m=n,!0===r?(u.push(l),-1!==(s=m.findIndex((function(e){return e.id===l})))&&m.splice(s,1)):(m.push({id:l,name:c,slug:i}),function(){var e=u.indexOf(l);-1!==e&&u.splice(e,1)}()),o({exclude:JSON.stringify(u),include:JSON.stringify(m)})},"data-termid":e.term_id,"data-term":e.name}),React.createElement("div",{style:{height:"15px",marginTop:"-5px"}},!0===s&&React.createElement("pre",{style:{fontSize:"11px",margin:0}},"(",e.slug,")")))}))))}));var M=function(e){var t=e.wpQueryContext,a=e.rootClientId,n=e.postId;console.log("<ContextControls>",t,a,n);var r=t.includes(n);return console.log("isActive?",r),React.createElement(E.BlockControls,null,React.createElement(R.Toolbar,{controls:[{icon:"sticky",title:"Pin This",isActive:r,onClick:function(){var e=t,r=e.findIndex((function(e){return e===n}));-1===r?e.push(n):e.splice(r,1),console.log("dispatching...",n),console.log(e),Object(m.dispatch)("core/block-editor").updateBlockAttributes(a,{pinned:JSON.stringify(e)})}}]}))},D=(a(41),function(e){var t=e.url,a=(e.setAttributes,P(Object(u.useState)(!1),2)),n=a[0],r=a[1];return React.createElement(u.Fragment,null,React.createElement(R.ToolbarButton,{"aria-expanded":n,"aria-haspopup":"true",label:Object(l.__)("Set Link"),icon:"admin-links",onClick:function(){return r(!n)},showTooltip:!0}),!0===n&&React.createElement(R.Popover,{position:"bottom center",onClose:function(){return r(!1)}},React.createElement(E.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",value:{url:t},showInitialSuggestions:!0,suggestionsQuery:{type:"post",subtype:"stub"},onChange:function(e){return console.log(e)},settings:[]})))}),L={className:"block-library-heading-level-dropdown",isAlternate:!0},F=function(e){var t=e.selected,a=e.options,n=e.iconPaths,r=e.label,c=e.prefixLabel,i=void 0===c?"%s":c,o=e.onChange,s=e.iconWidth,u=void 0===s?"24":s,m=e.iconHeight,p=void 0===m?"24":m,d=e.iconViewBox,b=void 0===d?"0 0 24 24":d,f=function(e){var t=e.selected,a=e.isPressed,r=void 0!==a&&a;return n.hasOwnProperty(t)?React.createElement(R.SVG,{width:u,height:p,viewBox:b,xmlns:"http://www.w3.org/2000/svg",isPressed:r},React.createElement(R.Path,{d:n[t]})):null};return React.createElement(R.Dropdown,{popoverProps:L,renderToggle:function(e){var a=e.onToggle,n=e.isOpen;return React.createElement(R.ToolbarButton,{"aria-expanded":n,"aria-haspopup":"true",icon:React.createElement(f,{selected:t}),label:r,onClick:a,showTooltip:!0})},renderContent:function(){return React.createElement(R.Toolbar,{className:"block-library-heading-level-toolbar",label:r},React.createElement(R.ToolbarGroup,{isCollapsed:!1,controls:a.map((function(e,a){var n=t===e;return{icon:React.createElement(f,{selected:e,isPressed:n}),title:Object(l.sprintf)(Object(l.__)(i),e),isActive:n,onClick:function(){o(e)}}}))}))}})},V=function(e){var t=e.attributes,a=e.setAttributes,n=t.link,r=t.imageSize,c=t.imageSlot,i=t.headerSize,o=t.isChartArt;return React.createElement(E.BlockControls,null,React.createElement(R.ToolbarGroup,null,React.createElement(D,{url:n,setAttributes:a})),React.createElement(R.ToolbarGroup,null,React.createElement(F,{label:Object(l.__)("Change Heading Level"),selected:i,options:[1,2,3],onChange:function(e){return a({headerSize:e})},iconPaths:{1:"M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z",2:"M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z",3:"M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z"},iconHeight:"24",iconWidth:"24",prefixLabel:"Heading %d",iconViewBox:"0 0 20 20"})),"disabled"!==c&&React.createElement(R.ToolbarGroup,null,React.createElement(F,{label:Object(l.__)("Change Image Size"),selected:r,options:["A1","A2","A3","A4","XL"],onChange:function(e){return a({imageSize:e})},iconPaths:{A1:"M12.13,18.09h-3l-.74-2.46H4.49l-.75,2.46H1.27l3.84-12H8.36ZM7.72,13.41,6.44,9.2,5.16,13.41Z M13.31,8.35a7,7,0,0,0,4-2.44h2v10h3.33v2.19H13V15.9h3.63V9a23.54,23.54,0,0,1-3.33,1.78Z",A2:"M12.5,18.09h-3l-.74-2.46H4.86l-.75,2.46H1.64l3.83-12H8.73ZM8.09,13.41,6.81,9.2,5.53,13.41Z M22.16,18.09h-9V15.75l.72-.52,1.46-1a31.07,31.07,0,0,0,3.1-2.6,2.74,2.74,0,0,0,.9-1.87,1.55,1.55,0,0,0-1.66-1.6c-1.19,0-1.86.76-2,2.3l-2.48-.55c.56-2.67,2.11-4,4.66-4a4.37,4.37,0,0,1,3,.91A3.5,3.5,0,0,1,22.2,9.69c0,1.51-.69,2.61-2.52,4a33.64,33.64,0,0,1-3.06,2h5.74Z",A3:"M12.52,18h-3l-.74-2.47H4.89L4.13,18H1.67L5.5,6H8.76ZM8.11,13.32,6.83,9.11,5.56,13.32Z M17.38,10.75a1.87,1.87,0,0,0,1.46-.47,1.36,1.36,0,0,0,.38-.94A1.5,1.5,0,0,0,17.6,7.89c-1,0-1.51.45-1.84,1.53L13.28,9a3.62,3.62,0,0,1,1.1-2,4.58,4.58,0,0,1,3.33-1.24C20.24,5.82,22,7.13,22,9a2.69,2.69,0,0,1-2,2.68,3.09,3.09,0,0,1,1.51.74,2.73,2.73,0,0,1,.9,2.11c0,2.19-1.82,3.61-4.64,3.61A4.67,4.67,0,0,1,14.23,17a3.88,3.88,0,0,1-1.31-2.45l2.55-.36A2,2,0,0,0,17.63,16a1.64,1.64,0,0,0,1.84-1.62,1.55,1.55,0,0,0-.61-1.27,3,3,0,0,0-1.66-.27H16.1V10.75Z",A4:"M12.31,18.09h-3l-.74-2.46H4.67l-.75,2.46H1.45l3.84-12H8.54ZM7.9,13.41,6.62,9.2,5.34,13.41Z M20.86,13.22h1.69v2.1H20.86v2.77H18.05V15.32H12.81v-2.1l4.84-7.31h3.21Zm-2.69,0V9.16c0-.09,0-.28,0-.57l0-.51-3.29,5.14Z",XL:"M9.23,11.58,12.94,18H9.7L7.28,13.65,4.87,18H2.21l3.71-6.38L2.62,6H5.9L7.84,9.65,9.88,6h2.63Z M21.79,15.63V18H14.18V6H17v9.64Z"},prefixLabel:"%s Image Size"}),React.createElement(R.ToolbarButton,{icon:"chart-pie",isPressed:o,label:Object(l.__)("Enable Chart Art"),onClick:function(){a({isChartArt:!o})}})))},Z=function(e){var t=e.attributes,a=e.setAttributes,n=e.context,r=e.rootClientId,c=t.postID,i=t.link,o=t.imageSlot,s=t.enableHeader,m=t.enableExcerpt,p=t.enableExcerptBelow,d=t.enableExtra,f=t.enableBreakingNews,g=t.enableEmphasis,h=t.enableProgramsTaxonomy,v=Object(l.__)("Story Item Options");return Object(u.useEffect)((function(){Object(H.isEmpty)(i)||void 0!==c||(console.log("Story Item Controls Did Mount"),console.log(i),console.log(c),function(e,t){void 0!==t&&void 0!==e&&b()({path:"/prc-api/v2/blocks/helpers/get-post-by-url",method:"POST",data:{url:e}}).then((function(e){if(console.log("setPostbyURL",e),!1!==e){var a={title:e.title,excerpt:e.excerpt,link:e.link,label:e.label,date:e.date,postID:e.id,extra:""};e.art||(a.image=e.image),t(a)}}))}(i,a))}),[i]),React.createElement(u.Fragment,null,React.createElement(V,{attributes:t,setAttributes:a}),!1!==n&&React.createElement(M,{wpQueryContext:n,rootClientId:r,postId:c}),React.createElement(E.InspectorControls,null,React.createElement(R.PanelBody,{title:v},React.createElement("div",null,React.createElement(R.TextControl,{label:"Post ID",value:c,disabled:!0})),React.createElement("div",null,React.createElement(R.BaseControl,{label:"Content Options"},React.createElement(R.ToggleControl,{label:s?"Header Enabled":"Header Disabled",checked:s,onChange:function(){a({enableHeader:!s})}}),React.createElement(R.ToggleControl,{label:m?"Excerpt Enabled":"Excerpt Disabled",checked:m,onChange:function(){a({enableExcerpt:!m})}}),React.createElement(R.ToggleControl,{label:d?"Extras Enabled":"Extras Disabled",checked:d,onChange:function(){a({enableExtra:!d})}}),React.createElement(R.ToggleControl,{label:f?"Breaking News Enabled":"Breaking News Disabled",checked:f,onChange:function(){!1!==window.prcBreakingNews?a({enableBreakingNews:!f}):(alert("There are no currently active, authorized, breaking news events. The breaking news toggle will be set back to false."),a({enableBreakingNews:!1}))}}),React.createElement(R.ToggleControl,{label:h?"Programs":"Formats",checked:h,onChange:function(){a({enableProgramsTaxonomy:!h})}}))),React.createElement("div",null,React.createElement(R.BaseControl,{label:"Style Options"},React.createElement(R.ToggleControl,{label:g?"Emphasis Enabled":"Emphasis Disabled",checked:g,onChange:function(){a({enableEmphasis:!g})}}),!0===m&&("right"===o||"left"===o)&&React.createElement("div",null,React.createElement(R.ToggleControl,{label:p?"Excerpt Will Appear Below":"Excerpt Will Appear Normally",checked:p,onChange:function(){a({enableExcerptBelow:!p})}})))))))},J=a(20),W=["image"],U=function(e){var t=e.img,a=e.size,n=(e.chartArt,e.postId),r=e.setAttributes,l=P(Object(u.useState)(!1),2),c=l[0],i=l[1];return Object(u.useEffect)((function(){0!==n&&!1!==r&&b()({path:"/prc-api/v2/get-art/?postId=".concat(n)}).then((function(e){!1!==e?(i(e),r({image:e[a].rawUrl})):i(!1)}))}),[n,r]),Object(u.useEffect)((function(){!1!==c&&void 0!==c[a]&&!1!==r&&r({image:c[a].rawUrl,isChartArt:c[a].chartArt})}),[c,a]),React.createElement(E.MediaUploadCheck,null,React.createElement(E.MediaUpload,{onSelect:function(e){return r({image:e.url})},allowedTypes:W,render:function(e){var n=e.open;return React.createElement(u.Fragment,null,void 0!==t&&0===t.length&&React.createElement(J.a,{img:t,size:a,link:"",onClick:n,placeholder:!0}),""!==t&&React.createElement(J.a,{img:t,size:a,link:"",onClick:n}))}}))},X=function(e){var t=e.img,a=e.size,n=e.slot,r=e.chartArt,l=e.postId,c=e.setAttributes;console.log("<Img>",t);var i,o,u,m,p;return React.createElement("div",{className:(i=!1,o=!1,u=!1,m=!1,p=!1,!1!==n&&("XL"===a?i=!0:"A1"===a?o=!0:"A2"===a?u=!0:"A3"===a?m=!0:"A4"===a&&(p=!0)),s()({ui:!0,XL:i,A1:o,A2:u,A3:m,A4:p,image:!0,bordered:r}))},React.createElement(U,{img:t,size:a,chartArt:r,postId:l,setAttributes:c}))},Y=function(e){var t=e.content,a=e.sansSerif,n=e.enabled,r=e.setAttributes;if(!0!==n)return React.createElement(u.Fragment,null);var l=s()("description",{"sans-serif":a});return React.createElement(u.Fragment,null,!1!==r&&React.createElement(E.RichText,{tagName:"div",value:t,onChange:function(e){return r({excerpt:e})},placeholder:t,multiline:"p",className:l}),!1===r&&React.createElement(E.RichText.Content,{tagName:"div",value:t,className:l}))},G=function(e){var t=e.content,a=e.breakingNews,n=e.enabled,r=e.setAttributes;return React.createElement(u.Fragment,null,!1!==r&&!0===n&&React.createElement(E.RichText,{tagName:"ul",value:t,onChange:function(e){return r({extra:e})},placeholder:t,multiline:"li",className:"extra"}),!1===r&&!0===n&&React.createElement(E.RichText.Content,{tagName:"ul",value:t,className:"extra"}),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))},Q=_({labelOptions:[]})((function(e){var t=e.label,a=e.date,n=e.taxonomy,r=e.setAttributes,l=e.setState,c=e.labelOptions;return Object(u.useEffect)((function(){(function(e,t){return new Promise((function(a){g(e,t).then((function(e){var t=[];Object.keys(e).forEach((function(a){var n=e[a];t.push({value:n.name,label:n.name})})),t.sort((function(e,t){return e.label>t.label?1:-1})),a(t)}))}))})(n).then((function(e){l({labelOptions:e})}))}),[n]),React.createElement("div",{style:{display:"flex",alignItems:"center"}},React.createElement("div",null,React.createElement(R.SelectControl,{value:t,options:c,onChange:function(e){r({label:e})},style:{marginBottom:"0px"},className:"story-label-select"})),React.createElement("div",null," | "),React.createElement("div",null,React.createElement(R.TextControl,{value:a,onChange:function(e){r({date:e})},style:{marginBottom:"0px"},className:"story-label-select"})))})),q=function(e){var t=e.title,a=e.label,n=e.date,r=e.size,l=e.enabled,c=e.taxonomy,i=e.setAttributes,o=e.altHeaderWeight;if(!0!==l)return React.createElement(u.Fragment,null);var m=s()({large:1===r,medium:2===r,small:3===r,light:o});return React.createElement(u.Fragment,null,React.createElement(p.a.Meta,null,React.createElement(Q,{date:n,label:a,taxonomy:c,setAttributes:i})),React.createElement(p.a.Header,{className:m},React.createElement(E.RichText,{tagName:"div",value:t,onChange:function(e){return i({title:e})},allowedFormats:["italic"],placeholder:"Title",multiline:"br"})))},$=function(e){var t=e.attributes,a=e.setAttributes,n=e.isSelected,r=e.clientId,l=e.context,c=t.title,i=t.excerpt,o=t.extra,d=t.link,b=t.label,f=t.date,g=t.image,E=t.imageSlot,v=t.imageSize,R=t.isChartArt,y=t.postID,w=t.headerSize,x=t.enableEmphasis,k=t.enableHeader,A=t.enableExcerpt,C=t.enableExcerptBelow,O=t.enableExtra,S=t.enableBreakingNews,N=t.enableProgramsTaxonomy,j=t.className,H=Object(m.useSelect)((function(e){return{rootClientId:e("core/block-editor").getBlockRootClientId(r)}}),[r]).rootClientId,z=a,T=!A,_=N?"Programs":"Formats",I=s()(j,"story",{stacked:"top"===E||"bottom"===E,bordered:x,"alt-description":C});!function(e,t){h("is-style-top",e,"imageSlot","top",t),h("is-style-bottom",e,"imageSlot","bottom",t),h("is-style-left",e,"imageSlot","left",t),h("is-style-right",e,"imageSlot","right",t),h("is-style-disabled",e,"imageSlot","disabled",t),h("is-style-default",e,"imageSlot","default",t)}(j,a);var P=function(){return React.createElement(X,{img:g,size:v,link:d,slot:E,chartArt:R,postId:y,setAttributes:z})},B=function(){return"top"!==E&&"left"!==E?React.createElement(u.Fragment,null):React.createElement(P,null)},M=function(){return"default"!==E?React.createElement(u.Fragment,null):React.createElement(P,null)},D=function(){return"bottom"!==E&&"right"!==E?React.createElement(u.Fragment,null):React.createElement(P,null)};return React.createElement(u.Fragment,null,!0===n&&React.createElement(Z,{attributes:t,setAttributes:a,context:!!l.hasOwnProperty("prc-block/wp-query")&&JSON.parse(l["prc-block/wp-query"]),rootClientId:H}),React.createElement(p.a,{as:"article",className:I},React.createElement(B,null),React.createElement(p.a.Content,null,React.createElement(q,{enabled:k,title:c,date:f,label:b,link:d,size:w,taxonomy:_,setAttributes:z,altHeaderWeight:T}),React.createElement(M,null),!0!==C&&React.createElement(Y,{enabled:A,content:i,sansSerif:!k,setAttributes:z}),React.createElement(G,{enabled:O,content:o,breakingNews:S,setAttributes:z})),React.createElement(D,null),!0===C&&React.createElement(Y,{enabled:A,content:i,sansSerif:!k,setAttributes:z})))},K=function(e){e.attributes;return React.createElement(u.Fragment,null)},ee={from:[{type:"raw",isMatch:function(e){return"P"===e.nodeName&&/^https?:\/\/(www\.)?pewresearch\.(org|local)\/((?!staff).)*$/i.test(e.textContent)},transform:function(e){return Object(c.createBlock)("prc-block/story-item",{link:e.textContent.trim(),className:"is-style-default",imageSize:"A1",imageSlot:"default"})}}],to:[{type:"block",blocks:["prc-block/story-item"],transform:function(e){var t=e.url;return Object(c.createBlock)("prc-block/story-item",{link:t,className:"is-style-default",imageSize:"A1",imageSlot:"default"})}}]};function te(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function ae(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?te(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):te(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var ne=i.name,re={title:Object(l.__)("Story Item"),icon:"format-aside",description:Object(l.__)("A story item is a visual display of a stub post (which is a database reference to a post)."),keywords:[Object(l.__)("prc"),Object(l.__)("story"),Object(l.__)("post"),Object(l.__)("story item")],example:{attributes:{title:"Ultricies Ipsum Nibh Egestas Purus",excerpt:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>",extra:"<li></li>",link:"#",label:"Report",date:r().format("MM-DD-YYYY"),image:"https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg",imageSlot:"top",imageSize:"A2"}},transforms:ee,edit:$,save:K};Object(c.registerBlockType)(ne,ae(ae({},i),re))},17:function(e,t){e.exports=wp.i18n},20:function(e,t,a){"use strict";a.d(t,"a",(function(){return p})),a.d(t,"b",(function(){return g}));var n=a(1),r=a(36),l=a(41),c={default:"564,317",small:"690,388",hidpi:"1128,634",smallHidpi:"1380,776"},i={default:"268,151",small:"690,388",hidpi:"536,301",smallHidpi:"1380,776"},o={default:"194,110",small:"148,84",hidpi:"388,220",smallHidpi:"296,168"},s={default:"268,151",small:"690,388",hidpi:"536,302",smallHidpi:"1380,776"},u={default:"720,405",small:"690,388",hidpi:"1440,810",smallHidpi:"1380,776"},m={260:{default:"260,260",small:"260,260",hidpi:"520,520",smallHidpi:"520,520"},"260-173":{default:"260,173",small:"260,173",hidpi:"520,346",smallHidpi:"520,346"}},p=function(e){var t=e.img,a=e.size,p=e.link,d=e.onClick,b=void 0!==d&&d,f=e.placeholder,g=void 0!==f&&f,h=function(e){if(!0===g){return"https://via.placeholder.com/".concat("A2"===a?"536x301":"A3"===a?"388x220":"A4"===a?"536x302":"XL"===a?"1440x810":"1128x634",".png?text=").concat(a)}if(""===t||!1===t)return t;var n={resize:c[e]};return"A2"===a?n={resize:i[e]}:"A3"===a?n={resize:o[e]}:"A4"===a?n={resize:s[e]}:"XL"===a&&(n={resize:u[e]}),"legacy-260"===a?n={resize:m[260][e]}:"legacy-260-173"===a&&(n={resize:m["260-173"][e]}),Object(l.addQueryArgs)(t,n)},E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:767;return[{srcSet:"".concat(h("default")," 1x, ").concat(h("hidpi")," 2x"),media:"(min-width: ".concat(e,"px)")},{srcSet:"".concat(h("small")," 1x, ").concat(h("smallHidpi")," 2x"),media:"(max-width: ".concat(e,"px)")}]};return!1!==b?React.createElement("div",{onClick:b},!0===g&&React.createElement("img",{src:h(),alt:"Click to insert"}),!0!==g&&React.createElement(r.a,{sources:E(),alt:"Click to edit"})):React.createElement(n.Fragment,null,""===p&&React.createElement(r.a,{sources:E()}),""!==p&&React.createElement("a",{href:p},React.createElement(r.a,{sources:E()})))},d=a(7),b=a.n(d),f=a(23),g=function(e){var t=e.label,a=void 0===t?"Report":t,r=e.date,l=a.replace(/\s+/g,"-").toLowerCase(),c=b()(l,"label"),i=f(r).format("MMM D, YYYY");return React.createElement(n.Fragment,null,React.createElement("span",{className:c},a||"Report")," | ",React.createElement("span",{className:"date"},i))}},23:function(e,t){e.exports=moment},37:function(e,t){e.exports=wp.apiFetch},41:function(e,t){e.exports=wp.url},50:function(e,t){e.exports=ReactDOM},56:function(e,t){e.exports=wp.data},57:function(e,t,a){"use strict";var n=a(7),r=a.n(n),l=a(1),c=a(73),i=a(139),o=a(20),s=function(e){var t,a,n,l,c,i=e.img,s=e.link,u=e.size,m=e.slot,p=e.chartArt;return React.createElement("div",{className:(t=!1,a=!1,n=!1,l=!1,c=!1,!1!==m&&("XL"===u?t=!0:"A1"===u?a=!0:"A2"===u?n=!0:"A3"===u?l=!0:"A4"===u&&(c=!0)),r()({ui:!0,XL:t,A1:a,A2:n,A3:l,A4:c,image:!0,bordered:p}))},React.createElement(o.a,{img:i,size:u,link:s}))},u=function(e){var t=e.content,a=e.sansSerif;if(!0!==e.enabled)return React.createElement(l.Fragment,null);var n=r()("description",{"sans-serif":a});return React.createElement("div",{className:n},React.createElement(l.RawHTML,null,t))},m=function(e){var t=e.content,a=e.breakingNews,n=e.enabled;return React.createElement(l.Fragment,null,!0===n&&React.createElement(i.a.Extra,{as:"ul"},React.createElement(l.RawHTML,null,t)),!0===a&&!1!==window.prcBreakingNews&&React.createElement("ul",{className:"extra-breaking-news"},React.createElement("li",null,React.createElement("a",{href:window.prcBreakingNews.url,className:"kicker-breaking-news"},window.prcBreakingNews.label))))},p=o.b,d=function(e){var t=e.title,a=e.label,n=e.date,c=e.link,o=e.size,u=e.enabled,m=e.isStyleMobileLoop,d=e.image,b=e.imageSize,f=e.isChartArt,g=e.altHeaderWeight;if(!0!==u)return React.createElement(l.Fragment,null);console.log(o);var h=r()({large:1===parseInt(o),medium:2===parseInt(o),small:3===parseInt(o),light:g});return console.log("<Header/>",o,h),React.createElement(l.Fragment,null,React.createElement(i.a.Meta,null,React.createElement(p,{label:a,date:n})),React.createElement(i.a.Header,{className:h},!0===m&&React.createElement(s,{img:d,size:b,link:c,slot:"left",chartArt:f}),React.createElement("a",{href:c},React.createElement(l.RawHTML,null,t))))};t.a=function(e){var t=e.title,a=e.excerpt,n=e.extra,o=e.link,p=e.label,b=e.date,f=e.image,g=e.imageSlot,h=e.imageSize,E=e.isChartArt,v=e.headerSize,R=e.enableEmphasis,y=e.enableHeader,w=e.enableExcerpt,x=e.enableExcerptBelow,k=e.enableExtra,A=e.enableBreakingNews,C=e.extraContent,O=void 0!==C&&C,S=e.className,N=e.inLoop,j=void 0!==N&&N,H=Object(c.a)("(max-width: 767px)"),z=!1;!1===w&&(z=!0);var T=!0;"left"!==g&&"right"!==g||(T=!1);var _=!1;!0===j&&!0===H&&(_=!0),!1===j&&!0===H&&"disabled"!==g&&(g="top");var I=r()(S,"story",{stacked:T,bordered:R,"alt-description":x,"is-style-mobile-loop":_}),P=function(){return React.createElement(s,{img:f,size:h,link:o,slot:g,chartArt:E,onClick:function(){window.location=o}})},B=function(){return"top"!==g&&"left"!==g||!0===j&&!0===H?React.createElement(l.Fragment,null):React.createElement(P,null)},M=function(){return"default"!==g||!0===j&&!0===H?React.createElement(l.Fragment,null):React.createElement(P,null)},D=function(){return"bottom"!==g&&"right"!==g||!0===j&&!0===H?React.createElement(l.Fragment,null):React.createElement(P,null)};return React.createElement(i.a,{as:"article",className:I},React.createElement(B,null),React.createElement(i.a.Content,null,React.createElement(d,{enabled:y,title:t,date:b,label:p,link:o,size:v,isStyleMobileLoop:_,image:f,imageSize:h,chartArt:E,altHeaderWeight:z}),React.createElement(M,null),!0!==x&&React.createElement(u,{enabled:w,content:a,sansSerif:!y}),!0===x&&!0===H&&React.createElement(u,{enabled:w,content:a,sansSerif:!y}),React.createElement(m,{enabled:k,content:n,breakingNews:A}),!1!==O&&React.createElement(l.RawHTML,null,O)),React.createElement(D,null),!0===x&&!1===H&&React.createElement(u,{enabled:w,content:a,sansSerif:!y}))}},58:function(e,t){e.exports=wp.blocks},6:function(e,t){e.exports=wp.components},61:function(e,t){e.exports=lodash},80:function(e){e.exports=JSON.parse('{"name":"prc-block/story-item","category":"layout","attributes":{"title":{"type":"string"},"excerpt":{"type":"string","multiline":"p","default":"<p>Excerpt</p>"},"extra":{"type":"string","multiline":"li"},"link":{"type":"string"},"label":{"type":"string","default":"Report"},"date":{"type":"string"},"image":{"type":"string"},"imageSlot":{"type":"string","default":"default"},"imageSize":{"type":"string","default":"A1"},"isChartArt":{"type":"boolean","default":false},"postID":{"type":"integer"},"headerSize":{"type":"integer","default":2},"enableAltHeaderWeight":{"type":"boolean","default":false},"enableEmphasis":{"type":"boolean","default":false},"enableHeader":{"type":"boolean","default":true},"enableExcerpt":{"type":"boolean","default":true},"enableExcerptBelow":{"type":"boolean","default":false},"enableExtra":{"type":"boolean","default":false},"enableBreakingNews":{"type":"boolean","default":false},"enableProgramsTaxonomy":{"type":"boolean","default":false}},"usesContext":["prc-block/wp-query"],"styles":[{"name":"default","label":"Default Image Alignment","isDefault":true},{"name":"top","label":"Image Aligned Top"},{"name":"bottom","label":"Image Aligned Bottom"},{"name":"left","label":"Image Aligned Left"},{"name":"right","label":"Image Aligned Right"},{"name":"disabled","label":"Disable Image"}],"supports":{"html":false}}')},83:function(e,t,a){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}a.d(t,"a",(function(){return n}))},99:function(e,t){e.exports=wp.htmlEntities}},[[112,0,1]]]);
//# sourceMappingURL=main-9d03f321.js.map