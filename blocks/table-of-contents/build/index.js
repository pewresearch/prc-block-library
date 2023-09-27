(()=>{var e,o={472:(e,o)=>{var t;!function(){"use strict";var r={}.hasOwnProperty;function l(){for(var e=[],o=0;o<arguments.length;o++){var t=arguments[o];if(t){var a=typeof t;if("string"===a||"number"===a)e.push(t);else if(Array.isArray(t)){if(t.length){var n=l.apply(null,t);n&&e.push(n)}}else if("object"===a){if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]")){e.push(t.toString());continue}for(var s in t)r.call(t,s)&&t[s]&&e.push(s)}}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):void 0===(t=function(){return l}.apply(o,[]))||(e.exports=t)}()},741:(e,o,t)=>{"use strict";const r=window.wp.i18n,l=window.wp.blocks,a=window.wp.domReady;var n=t.n(a);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},s.apply(this,arguments)}const c=window.wp.element;var i=t(472),d=t.n(i);const u=window.wp.blockEditor,p=window.wp.data,g=window.wp.components;function C(e){let{attributes:o,setAttributes:t,colors:l}=e;const{showCurrentChapter:a,hideHeading:n,className:s,autoDropdownWidth:i,autoDropdownEnabled:d}=o,p=(0,c.useMemo)((()=>{const{textColor:e,setTextColor:o,backgroundColor:t,setBackgroundColor:a,dropdownBackgroundColor:n,setDropdownBackgroundColor:c,dropdownTextColor:i,setDropdownTextColor:d,headingBackgroundColor:u,setHeadingBackgroundColor:p,headingTextColor:g,setHeadingTextColor:C,activeBackgroundColor:h,setActiveBackgroundColor:b,activeTextColor:k,setActiveTextColor:v,hoverBackgroundColor:f,setHoverBackgroundColor:w,hoverTextColor:m,setHoverTextColor:x}=l,_=[{value:i?.color,onChange:d,label:(0,r.__)("(Mobile) Dropdown Text")},{value:n?.color,onChange:c,label:(0,r.__)("(Mobile) Dropdown Background")},{value:g?.color,onChange:C,label:(0,r.__)("(Desktop) Heading Text")},{value:u?.color,onChange:p,label:(0,r.__)("(Desktop) Heading Background")},{value:e?.color,onChange:o,label:(0,r.__)("Text")},{value:t?.color,onChange:a,label:(0,r.__)("Background")},{value:k?.color,onChange:v,label:(0,r.__)("Active Text")},{value:h?.color,onChange:b,label:(0,r.__)("Active Background")},{value:m?.color,onChange:x,label:(0,r.__)("Hover Text")},{value:f?.color,onChange:w,label:(0,r.__)("Hover Background")}];return"is-style-dropdown"===s&&(_[0].label=(0,r.__)("Dropdown Text"),_[1].label=(0,r.__)("Dropdown Background"),_.splice(2,2)),_}),[l,s]);return(0,c.createElement)(c.Fragment,null,(0,c.createElement)(u.InspectorControls,{group:"styles"},(0,c.createElement)(u.PanelColorSettings,{__experimentalHasMultipleOrigins:!0,__experimentalIsRenderedInSidebar:!0,title:(0,r.__)("Color"),disableCustomColors:!0,colorSettings:p})),(0,c.createElement)(u.InspectorControls,null,(0,c.createElement)(g.PanelBody,{title:(0,r.__)("Settings","prc-block-library")},(0,c.createElement)(g.ToggleControl,{label:(0,r.__)("Highlight Current Chapter"),checked:a,onChange:()=>{t({showCurrentChapter:!a})},help:(0,r.__)("Highlight the current chapter in the table of contents when scrolling.","prc-block-library")}),"is-style-default"===s&&(0,c.createElement)(c.Fragment,null,(0,c.createElement)(g.ToggleControl,{label:(0,r.__)("Hide Heading"),checked:n,onChange:()=>{t({hideHeading:!n})},help:(0,r.__)('Hide the heading from the front end when in "Baseball Card" style.',"prc-block-library")}),(0,c.createElement)(g.BaseControl,{label:(0,r.__)("Auto Dropdown"),help:(0,r.__)("Automatically switch to the dropdown style when the container is less than the specified width.","prc-block-library")},(0,c.createElement)(g.ToggleControl,{label:(0,r.__)("Enable"),checked:d,onChange:()=>{t({autoDropdownEnabled:!d})}}),d&&(0,c.createElement)(g.__experimentalNumberControl,{label:(0,r.__)("Container Width Threshold"),onChange:e=>t({autoDropdownWidth:e}),shiftStep:10,value:i}))))))}const h=window.wp.coreData;const b=(0,u.withColors)({textColor:"color"},{backgroundColor:"color"},{dropdownBackgroundColor:"color"},{dropdownTextColor:"color"},{headingBackgroundColor:"color"},{headingTextColor:"color"},{activeBackgroundColor:"color"},{activeTextColor:"color"},{hoverBackgroundColor:"color"},{hoverTextColor:"color"})((function(e){let{attributes:o,setAttributes:t,context:r,clientId:l,isSelected:a,textColor:n,setTextColor:i,backgroundColor:g,setBackgroundColor:b,dropdownBackgroundColor:k,setDropdownBackgroundColor:v,dropdownTextColor:f,setDropdownTextColor:w,headingBackgroundColor:m,setHeadingBackgroundColor:x,headingTextColor:_,setHeadingTextColor:T,activeBackgroundColor:y,setActiveBackgroundColor:B,activeTextColor:E,setActiveTextColor:D,hoverBackgroundColor:H,setHoverBackgroundColor:O,hoverTextColor:N,setHoverTextColor:I}=e;const{postId:A,postType:S}=r,{chapters:M=[],parentId:j,parentTitle:P}=function(e){let{postId:o,postType:t}=e;const{record:r,isResolving:l}=(0,h.useEntityRecord)("postType",t,o),{reportPackage:a,parentTitle:n,parentId:s,tableOfContents:i}=(0,c.useMemo)((()=>!r||l?{}:{reportPackage:r?.report_package,parentTitle:r?.report_package?.parent_title,parentId:r?.report_package?.parent_id,tableOfContents:r?.report_package?.table_of_contents}),[r,l]),d=function(){const{currentChapters:e=[]}=(0,p.useSelect)((e=>{const o=e("core/block-editor").getBlocks().filter((e=>"core/heading"===e.name&&!0===e.attributes?.isChapter));return{currentChapters:0===o.length?[{attributes:{content:"Chapter 1..."}},{attributes:{content:"Chapter 2..."}},{attributes:{content:"Chapter 3..."}}]:o}}),[]);return e}();return console.log("useTOC",o,t,a,d,i),{parentId:s,parentTitle:n,chapters:(0,c.useMemo)((()=>i?i?.map((e=>{const t=o===e?.id?d.map((e=>({title:e.attributes?.content,id:e?.id,clientId:e?.clientId,link:e?.link}))):e?.internal_chapters;return{id:e.id,title:e?.title,link:e?.link,internalChapters:t}})):[{id:1,title:"Chapter 1...",internalChapters:[{title:"Chapter 1.1...",id:1},{title:"Chapter 1.2...",id:2},{title:"Chapter 1.3...",id:3}]},{id:2,title:"Chapter 2..."},{id:3,title:"Chapter 3..."}]),[d,i])}}({postId:A,postType:S}),{heading:$,showCurrentChapter:W,className:F,hideHeading:R,autoDropdownEnabled:L,autoDropdownWidth:z}=o,{selectBlock:G}=(0,p.useDispatch)("core/block-editor"),[J,V]=(0,c.useState)(!1),[Y,q]=(0,c.useState)(null),K=(0,c.useRef)(null);(0,c.useEffect)((()=>{if(!L)return q(!1);const e=()=>{K.current&&q(K.current.parentNode.offsetWidth<=z)};return e(),window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[K.current?.parentNode?.offsetWidth,K.current?.parentNode,z]);const Q=(0,c.useMemo)((()=>({textColor:n,setTextColor:i,backgroundColor:g,setBackgroundColor:b,dropdownBackgroundColor:k,setDropdownBackgroundColor:v,dropdownTextColor:f,setDropdownTextColor:w,headingBackgroundColor:m,setHeadingBackgroundColor:x,headingTextColor:_,setHeadingTextColor:T,activeBackgroundColor:y,setActiveBackgroundColor:B,activeTextColor:E,setActiveTextColor:D,hoverBackgroundColor:H,setHoverBackgroundColor:O,hoverTextColor:N,setHoverTextColor:I})),[n,i,g,b,k,v,f,w,m,x,_,T,y,B,E,D,H,O,N,I]),U=(0,c.useMemo)((()=>d()(F,{"has-text-color":!!Q.textColor.color||!!Q.textColor?.class,[(0,u.getColorClassName)("color",Q.textColor?.slug)]:!!Q.textColor?.slug,"has-background":!!Q.backgroundColor.color||Q.backgroundColor.class,[(0,u.getColorClassName)("background-color",Q.backgroundColor?.slug)]:!!Q.backgroundColor?.slug,"has-active-background":!!Q.activeBackgroundColor.color||Q.activeBackgroundColor.class,[`has-active-${Q?.activeBackgroundColor?.slug}-background-color`]:!!Q?.activeBackgroundColor?.slug,"has-active-color":!!Q.activeTextColor.color||Q.activeTextColor.class,[`has-active-${Q?.activeTextColor?.slug}-color`]:!!Q?.activeTextColor?.slug,"has-hover-background":!!Q.hoverBackgroundColor.color||Q.hoverBackgroundColor.class,[`has-hover-${Q?.hoverBackgroundColor?.slug}-background-color`]:!!Q?.activeBackgroundColor?.slug,"has-hover-color":!!Q.hoverTextColor.color||Q.hoverTextColor.class,[`has-hover-${Q?.hoverTextColor?.slug}-color`]:!!Q?.hoverTextColor?.slug,"is-switched":Y})),[Q.textColor,Q.backgroundColor,Q.hoverBackgroundColor,Q.activeBackgroundColor,Q.hoverTextColor,Q.activeTextColor,Y,F]),X=(0,c.useMemo)((()=>({color:!Q.textColor?.slug&&Q.textColor?.color,backgroundColor:!Q.backgroundColor?.slug&&Q.backgroundColor?.color})),[Q.textColor,Q.backgroundColor]),Z=(0,c.useMemo)((()=>d()("wp-block-prc-block-table-of-contents__heading",{"has-heading-color":!!Q?.headingTextColor?.color||!!Q?.headingTextColor?.class,[`has-heading-${Q?.headingTextColor?.slug}-color`]:!!Q?.headingTextColor?.slug,"has-dropdown-color":!!Q?.dropdownTextColor?.color||!!Q?.dropdownTextColor?.class,[`has-dropdown-${Q?.dropdownTextColor?.slug}-color`]:!!Q?.dropdownTextColor?.slug,"has-heading-background":!!Q?.headingBackgroundColor?.color||!!Q?.headingBackgroundColor?.class,[`has-heading-${Q?.headingBackgroundColor?.slug}-background-color`]:!!Q?.headingBackgroundColor?.slug,"has-dropdown-background":!!Q?.dropdownBackgroundColor?.color||!!Q?.dropdownBackgroundColor?.class,[`has-dropdown-${Q?.dropdownBackgroundColor?.slug}-background-color`]:!!Q?.dropdownBackgroundColor?.slug,"is-hidden":R})),[Q,R]),ee=(0,c.useMemo)((()=>({className:U,style:X,"data-auto-dropdown-enabled":L,"data-auto-dropdown-width":z,"data-show-current-chapter":W,"aria-expanded":J})),[U,X,L,z,W,J]),oe=(0,u.useBlockProps)(ee);return(0,c.createElement)(c.Fragment,null,(0,c.createElement)(C,{attributes:o,setAttributes:t,colors:Q}),(0,c.createElement)("div",s({},oe,{ref:K}),(0,c.createElement)("div",{className:Z},(0,c.createElement)(u.RichText,{tagName:"h2",placeholder:"Table of Contents",value:$,onChange:e=>t({heading:e})}),(0,c.createElement)("div",{className:"wp-block-prc-block-table-of-contents__dropdown",onClick:()=>V(!J)},"+")),(0,c.createElement)("ul",{className:"wp-block-prc-block-table-of-contents__list"},0!==M.length&&M.map((e=>(0,c.createElement)("li",{className:A===e?.id?"is-active":null},(0,c.createElement)("span",null,e?.title),A===e?.id&&e?.internalChapters&&(0,c.createElement)("ul",null,e.internalChapters.map((e=>(0,c.createElement)("li",null,(0,c.createElement)("a",{onClick:()=>{e.clientId&&G(e.clientId)}},e.title)))))))))))})),k=window.prcIcons,v=[{name:"table-of-contents",isDefault:!0,title:(0,r.__)("Table of Contents (Default)"),description:(0,r.__)('The default table of contents block. Displays a list of links to chapters and back-chapters in a post in a "Baseball Card" style. On mobile this transforms to a dropdown.'),attributes:{className:"is-style-default"},scope:["inserter","transform"],isActive:(e,o)=>o.className===e.className},{name:"table-of-contents-dropdown",isDefault:!0,title:(0,r.__)("Table of Contents (Dropdown)"),description:(0,r.__)("Displays a list of chapters and back-chapters in a post in a dropdown style."),attributes:{className:"is-style-dropdown"},scope:["inserter","transform"],isActive:(e,o)=>o.className===e.className}],f=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/table-of-contents","version":"0.1.0","title":"Table of Contents","category":"theme","description":"Displays a list of all heading blocks set to chapter headings.","attributes":{"showCurrentChapter":{"type":"boolean","default":false},"dropdownBackgroundColor":{"type":"string","default":"white"},"dropdownTextColor":{"type":"string","default":"slate"},"headingBackgroundColor":{"type":"string","default":"slate"},"headingTextColor":{"type":"string","default":"white"},"backgroundColor":{"type":"string","default":"white"},"textColor":{"type":"string","default":"slate"},"activeBackgroundColor":{"type":"string","default":"gray"},"activeTextColor":{"type":"string","default":"slate"},"hoverBackgroundColor":{"type":"string","default":"oatmeal"},"hoverTextColor":{"type":"string","default":"slate"},"heading":{"type":"string","default":"Table of Contents"},"hideHeading":{"type":"boolean","default":false},"autoDropdownEnabled":{"type":"boolean","default":true},"autoDropdownWidth":{"type":"number","default":300}},"supports":{"anchor":true,"html":false,"align":["left","right"],"spacing":{"margin":["top","bottom","left","right"],"blockGap":true,"__experimentalDefaultControls":{"margin":true,"blockGap":true}},"position":{"sticky":true},"typography":{"__experimentalFontFamily":true,"__experimentalDefaultControls":{"__experimentalFontFamily":true}}},"example":{"attributes":{"className":"is-style-default"},"viewportWidth":320},"usesContext":["postId","postType"],"textdomain":"table-of-contents","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js"}'),{name:w}=f,m={icon:function(){return(0,c.createElement)(k.Icon,{icon:k.icons.faListTree,height:18,preserveAspectRatio:"xMidYMid meet"})},edit:b,variations:v};(0,l.registerBlockType)(w,{...f,...m}),n()((()=>{(0,l.unregisterBlockType)("core/table-of-contents"),(0,l.unregisterBlockType)("yoast-seo/table-of-contents")}))}},t={};function r(e){var l=t[e];if(void 0!==l)return l.exports;var a=t[e]={exports:{}};return o[e](a,a.exports,r),a.exports}r.m=o,e=[],r.O=(o,t,l,a)=>{if(!t){var n=1/0;for(d=0;d<e.length;d++){t=e[d][0],l=e[d][1],a=e[d][2];for(var s=!0,c=0;c<t.length;c++)(!1&a||n>=a)&&Object.keys(r.O).every((e=>r.O[e](t[c])))?t.splice(c--,1):(s=!1,a<n&&(n=a));if(s){e.splice(d--,1);var i=l();void 0!==i&&(o=i)}}return o}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[t,l,a]},r.n=e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return r.d(o,{a:o}),o},r.d=(e,o)=>{for(var t in o)r.o(o,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})},r.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),(()=>{var e={826:0,431:0};r.O.j=o=>0===e[o];var o=(o,t)=>{var l,a,n=t[0],s=t[1],c=t[2],i=0;if(n.some((o=>0!==e[o]))){for(l in s)r.o(s,l)&&(r.m[l]=s[l]);if(c)var d=c(r)}for(o&&o(t);i<n.length;i++)a=n[i],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(d)},t=self.webpackChunktable_of_contents=self.webpackChunktable_of_contents||[];t.forEach(o.bind(null,0)),t.push=o.bind(null,t.push.bind(t))})();var l=r.O(void 0,[431],(()=>r(741)));l=r.O(l)})();
//# sourceMappingURL=index.js.map