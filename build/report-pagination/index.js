(()=>{"use strict";var o,t={9115:(o,t,e)=>{const r=window.wp.primitives,n=window.ReactJSXRuntime,l=(0,n.jsx)(r.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,n.jsx)(r.Path,{d:"M4 13.5h6v-3H4v3zm8 0h3v-3h-3v3zm5-3v3h3v-3h-3z"})}),a=window.wp.blocks,i=window.wp.element,s=window.wp.blockEditor,c=(window.wp.data,window.wp.coreData),u=window.wp.url,d=window.wp.i18n;function g({colors:o,clientId:t}){const e=(0,s.__experimentalUseMultipleOriginColorsAndGradients)(),{textColor:r,setTextColor:l,backgroundColor:a,setBackgroundColor:i,itemBackgroundColor:c,setItemBackgroundColor:u,itemTextColor:g,setItemTextColor:p,itemBorderColor:C,setItemBorderColor:m,itemHoverBackgroundColor:x,setItemHoverBackgroundColor:h,itemActiveBackgroundColor:k,setItemActiveBackgroundColor:B,nextButtonBackgroundColor:v,setNextButtonBackgroundColor:_,nextButtonTextColor:b,setNextButtonTextColor:w,nextButtonBoxShadowColor:f,setNextButtonBoxShadowColor:y}=o;return(0,n.jsx)(s.InspectorControls,{group:"color",children:(0,n.jsx)(s.__experimentalColorGradientSettingsDropdown,{settings:[{colorValue:r?.color,onColorChange:l,label:(0,d.__)("Text")},{colorValue:a?.color,onColorChange:i,label:(0,d.__)("Background")},{colorValue:c?.color,onColorChange:u,label:(0,d.__)("Item Background")},{colorValue:g?.color,onColorChange:p,label:(0,d.__)("Item Text")},{colorValue:C?.color,onColorChange:m,label:(0,d.__)("Item Border")},{colorValue:x?.color,onColorChange:h,label:(0,d.__)("Item Hover Background")},{colorValue:k?.color,onColorChange:B,label:(0,d.__)("Item Active Background")},{colorValue:v?.color,onColorChange:_,label:(0,d.__)("Next Button Background")},{colorValue:b?.color,onColorChange:w,label:(0,d.__)("Next Button Text")},{colorValue:f?.color,onColorChange:y,label:(0,d.__)("Next Button Box Shadow")}],panelId:t,hasColorsOrGradients:!1,disableCustomColors:!0,__experimentalIsRenderedInSidebar:!0,...e})})}const p=window.classnames;var C=e.n(p);function m({nextPost:o,backgroundColor:t,textColor:e,boxShadowColor:r}){if(!o)return null;const{title:l,link:a}=o,i=C()("wp-block-prc-block-report-pagination__next-post-button",{"has-text-color":!!e.color||!!e?.class,[(0,s.getColorClassName)("color",e?.slug)]:!!e?.slug,"has-background":!!t.color||t.class,[(0,s.getColorClassName)("background-color",t?.slug)]:!!t?.slug});return(0,n.jsx)("a",{href:a,className:i,alt:(0,d.__)(`Go to the next post in this report package: ${l}`),style:{"box-shadow":`inset 0 3px 4px -2px var(--wp--preset--color--${r?.slug})`},children:l})}const x=window.wp.htmlEntities;function h({post:o,label:t="Next Page",className:e="common-block-style__pagination__pagination-next"}){if(!o)return null;const{title:r,link:l}=o;return(0,n.jsx)("a",{href:l,className:e,children:(0,x.decodeEntities)(t)})}function k({paginationItems:o,backgroundColor:t,textColor:e,borderColor:r,hoverBackgroundColor:l,activeBackgroundColor:a}){return o?(0,n.jsx)("div",{className:"common-block-style__pagination__pagination-numbers",children:o.map(((o,i)=>{const{title:c,link:u,isActive:d}=o,g=C()("common-block-style__pagination__page-numbers",{"has-text-color":!!e.color||!!e?.class,[(0,s.getColorClassName)("color",e?.slug)]:!!e?.slug,"has-background":!!t.color||t.class,[(0,s.getColorClassName)("background-color",t?.slug)]:!!t?.slug,"has-border-color":!!r.color||r.class,[(0,s.getColorClassName)("border-color",r?.slug)]:!!r?.slug,"has-hover-background":!!l.color||l.class,[(0,s.getColorClassName)("hover-background-color",l?.slug)]:!!l?.slug,"has-active-background":!!a.color||a.class,[(0,s.getColorClassName)("active-background-color",a?.slug)]:!!a?.slug,"is-active":d});return(0,n.jsx)("a",{href:u,className:g,alt:`Go to page ${i+1} in report package`,children:i+1},i)}))}):null}const B=(0,s.withColors)({itemBackgroundColor:"color"},{itemTextColor:"color"},{itemBorderColor:"color"},{itemHoverBackgroundColor:"color"},{itemActiveBackgroundColor:"color"},{nextButtonBackgroundColor:"color"},{nextButtonTextColor:"color"},{nextButtonBoxShadowColor:"color"})((function({attributes:o,setAttributes:t,context:e,clientId:r,isSelected:l,itemBackgroundColor:a,setItemBackgroundColor:d,itemTextColor:p,setItemTextColor:C,itemBorderColor:x,setItemBorderColor:B,itemHoverBackgroundColor:v,setItemHoverBackgroundColor:_,itemActiveBackgroundColor:b,setItemActiveBackgroundColor:w,nextButtonBackgroundColor:f,setNextButtonBackgroundColor:y,nextButtonTextColor:I,setNextButtonTextColor:N,nextButtonBoxShadowColor:T,setNextButtonBoxShadowColor:P,__unstableLayoutClassNames:S}){const{postId:j,postType:A}=e,{currentPost:E,nextPost:O,previousPost:V,paginationItems:H}=function({postId:o,postType:t}){const e=(0,u.getPath)(window.location.href)?.includes("site-editor.php"),{record:r,isResolving:n}=(0,c.useEntityRecord)("postType",t,o),{currentPost:l,nextPost:a,previousPost:s,paginationItems:d}=(0,i.useMemo)((()=>{if(e)return{currentPost:{id:null,title:"A Longitudinal Study of the Impact of COVID-19 on the U.S. Economy",link:"#"},nextPost:{id:null,title:"The Trump Effect on the U.S. Economy",link:"#"},previousPost:{id:null,title:"The Biden Effect on the U.S. Economy",link:"#"},paginationItems:[{link:"#",title:"Introduction",isActive:!0},{link:"#",title:"Executive Summary",isActive:!1},{link:"#",title:"The Trump Effect on the U.S. Economy",isActive:!1},{link:"#",title:"The Biden Effect on the U.S. Economy",isActive:!1},{link:"#",title:"A Longitudinal Study of the Impact of COVID-19 on the U.S. Economy",isActive:!1},{link:"#",title:"Conclusion",isActive:!1}]};if(!r||n)return{currentPost:{title:"Loading...",link:"#"},nextPost:{title:"Loading...",link:"#"},previousPost:{title:"Loading...",link:"#"},paginationItems:[]};const o=r?.report_pagination;return{currentPost:o?.current_post,nextPost:o?.next_post,previousPost:o?.previous_post,paginationItems:o?.pagination_items}}),[r,n]);return{currentPost:l,nextPost:a,previousPost:s,paginationItems:d}}({postId:j,postType:A}),z=(0,s.useBlockProps)({className:S});return(0,n.jsxs)(i.Fragment,{children:[(0,n.jsx)(g,{colors:{itemBackgroundColor:a,setItemBackgroundColor:d,itemTextColor:p,setItemTextColor:C,itemBorderColor:x,setItemBorderColor:B,itemHoverBackgroundColor:v,setItemHoverBackgroundColor:_,itemActiveBackgroundColor:b,setItemActiveBackgroundColor:w,nextButtonBackgroundColor:f,setNextButtonBackgroundColor:y,nextButtonTextColor:I,setNextButtonTextColor:N,nextButtonBoxShadowColor:T,setNextButtonBoxShadowColor:P},clientId:r}),(0,n.jsxs)("div",{...z,children:[(0,n.jsx)(m,{nextPost:O,backgroundColor:f,textColor:I,boxShadowColor:T}),(0,n.jsx)("div",{className:"common-block-style__pagination__container",children:(0,n.jsxs)("div",{className:"common-block-style__pagination",children:[(0,n.jsx)(h,{post:V,label:"&larr; Prev Page",className:"common-block-style__pagination__pagination-previous"}),(0,n.jsx)(k,{paginationItems:H,backgroundColor:a,textColor:p,borderColor:x,hoverBackgroundColor:v,activeBackgroundColor:b}),(0,n.jsx)(h,{post:O,label:"Next Page &rarr;",className:"common-block-style__pagination__pagination-next"})]})})]})]})})),v=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/report-pagination","version":"0.1.0","title":"Report Pagination","category":"theme","description":"Provides a stylized pagination for use with reports","attributes":{"backgroundColor":{"type":"string","default":"white"},"textColor":{"type":"string","default":"white"},"itemBackgroundColor":{"type":"string","default":"white"},"itemTextColor":{"type":"string","default":"ui-black"},"itemBorderColor":{"type":"string","default":"gray"},"itemHoverBackgroundColor":{"type":"string","default":"ui-beige-very-light"},"itemActiveBackgroundColor":{"type":"string","default":"white"},"nextButtonBackgroundColor":{"type":"string","default":"ui-beige-very-light"},"nextButtonTextColor":{"type":"string","default":"ui-black"},"nextButtonBoxShadowColor":{"type":"string","default":"gray-alt"}},"supports":{"color":{"background":true,"text":true,"link":true},"anchor":true,"html":false,"spacing":{"blockGap":["horizontal","vertical"],"margin":["top","bottom"],"padding":true},"layout":{"allowSwitching":false,"allowInheriting":false,"allowEditing":false,"default":{"type":"flex","flexWrap":"wrap"}},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"usesContext":["postId","postType"],"textdomain":"report-pagination","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":["file:./style-index.css","prc-block-library--pagination"]}'),{name:_}=v,b={icon:l,edit:B};(0,a.registerBlockType)(_,{...v,...b})}},e={};function r(o){var n=e[o];if(void 0!==n)return n.exports;var l=e[o]={exports:{}};return t[o](l,l.exports,r),l.exports}r.m=t,o=[],r.O=(t,e,n,l)=>{if(!e){var a=1/0;for(u=0;u<o.length;u++){e=o[u][0],n=o[u][1],l=o[u][2];for(var i=!0,s=0;s<e.length;s++)(!1&l||a>=l)&&Object.keys(r.O).every((o=>r.O[o](e[s])))?e.splice(s--,1):(i=!1,l<a&&(a=l));if(i){o.splice(u--,1);var c=n();void 0!==c&&(t=c)}}return t}l=l||0;for(var u=o.length;u>0&&o[u-1][2]>l;u--)o[u]=o[u-1];o[u]=[e,n,l]},r.n=o=>{var t=o&&o.__esModule?()=>o.default:()=>o;return r.d(t,{a:t}),t},r.d=(o,t)=>{for(var e in t)r.o(t,e)&&!r.o(o,e)&&Object.defineProperty(o,e,{enumerable:!0,get:t[e]})},r.o=(o,t)=>Object.prototype.hasOwnProperty.call(o,t),(()=>{var o={6887:0,9087:0};r.O.j=t=>0===o[t];var t=(t,e)=>{var n,l,a=e[0],i=e[1],s=e[2],c=0;if(a.some((t=>0!==o[t]))){for(n in i)r.o(i,n)&&(r.m[n]=i[n]);if(s)var u=s(r)}for(t&&t(e);c<a.length;c++)l=a[c],r.o(o,l)&&o[l]&&o[l][0](),o[l]=0;return r.O(u)},e=self.webpackChunk_pewresearch_prc_block_library=self.webpackChunk_pewresearch_prc_block_library||[];e.forEach(t.bind(null,0)),e.push=t.bind(null,e.push.bind(e))})();var n=r.O(void 0,[9087],(()=>r(9115)));n=r.O(n)})();
//# sourceMappingURL=index.js.map