(()=>{"use strict";var e,o={718:(e,o,t)=>{const r=window.wp.blocks,l=window.wp.domReady;var a=t.n(l);const n=window.React,c=window.classnames;var s=t.n(c);const i=window.prcBlockUtils,d=window.wp.blockEditor,u=window.wp.data,p=window.wp.i18n,g=window.wp.element,h=window.wp.components;function C({attributes:e,colors:o,clientId:t}){const{className:r}=e,l=(0,d.__experimentalUseMultipleOriginColorsAndGradients)(),a=(0,g.useMemo)((()=>{const{dropdownBackgroundColor:e,setDropdownBackgroundColor:t,dropdownTextColor:l,setDropdownTextColor:a,headingBackgroundColor:n,setHeadingBackgroundColor:c,headingTextColor:s,setHeadingTextColor:i,activeBackgroundColor:d,setActiveBackgroundColor:u,activeTextColor:g,setActiveTextColor:h,hoverBackgroundColor:C,setHoverBackgroundColor:b,hoverTextColor:k,setHoverTextColor:w}=o,v=[{colorValue:l?.color,onColorChange:a,label:(0,p.__)("(Mobile) Dropdown Text")},{colorValue:e?.color,onColorChange:t,label:(0,p.__)("(Mobile) Dropdown Background")},{colorValue:s?.color,onColorChange:i,label:(0,p.__)("(Desktop) Heading Text")},{colorValue:n?.color,onColorChange:c,label:(0,p.__)("(Desktop) Heading Background")},{colorValue:g?.color,onColorChange:h,label:(0,p.__)("Active Text")},{colorValue:d?.color,onColorChange:u,label:(0,p.__)("Active Background")},{colorValue:k?.color,onColorChange:w,label:(0,p.__)("Hover Text")},{colorValue:C?.color,onColorChange:b,label:(0,p.__)("Hover Background")}];return"is-style-dropdown"===r&&(v[0].label=(0,p.__)("Dropdown Text"),v[1].label=(0,p.__)("Dropdown Background"),v.splice(2,2)),v}),[o,r]);return(0,n.createElement)(d.InspectorControls,{group:"color"},(0,n.createElement)(d.__experimentalColorGradientSettingsDropdown,{settings:a,panelId:t,hasColorsOrGradients:!1,disableCustomColors:!0,__experimentalIsRenderedInSidebar:!0,...l}))}function b({attributes:e,setAttributes:o,colors:t,clientId:r}){const{showCurrentChapter:l,hideHeading:a,className:c,autoDropdownWidth:s,autoDropdownEnabled:i}=e;return(0,n.createElement)(g.Fragment,null,(0,n.createElement)(C,{attributes:e,colors:t,clientId:r}),(0,n.createElement)(d.InspectorControls,null,(0,n.createElement)(h.PanelBody,{title:(0,p.__)("Settings","prc-block-library")},(0,n.createElement)(h.ToggleControl,{label:(0,p.__)("Highlight Current Chapter"),checked:l,onChange:()=>{o({showCurrentChapter:!l})},help:(0,p.__)("Highlight the current chapter in the table of contents when scrolling.","prc-block-library")}),"is-style-default"===c&&(0,n.createElement)(g.Fragment,null,(0,n.createElement)(h.ToggleControl,{label:(0,p.__)("Hide Heading"),checked:a,onChange:()=>{o({hideHeading:!a})},help:(0,p.__)('Hide the heading from the front end when in "Baseball Card" style.',"prc-block-library")}),(0,n.createElement)(h.BaseControl,{label:(0,p.__)("Auto Dropdown"),help:(0,p.__)("Automatically switch to the dropdown style when the container is less than the specified width.","prc-block-library")},(0,n.createElement)(h.ToggleControl,{label:(0,p.__)("Enable"),checked:i,onChange:()=>{o({autoDropdownEnabled:!i})}}),i&&(0,n.createElement)(h.__experimentalNumberControl,{label:(0,p.__)("Container Width Threshold"),onChange:e=>o({autoDropdownWidth:e}),shiftStep:10,value:s}))))))}const k=window.wp.coreData;const w=(0,d.withColors)({dropdownBackgroundColor:"color"},{dropdownTextColor:"color"},{headingBackgroundColor:"color"},{headingTextColor:"color"},{activeBackgroundColor:"color"},{activeTextColor:"color"},{hoverBackgroundColor:"color"},{hoverTextColor:"color"})((function({attributes:e,setAttributes:o,context:t,clientId:r,isSelected:l,dropdownBackgroundColor:a,setDropdownBackgroundColor:c,dropdownTextColor:p,setDropdownTextColor:h,headingBackgroundColor:C,setHeadingBackgroundColor:w,headingTextColor:v,setHeadingTextColor:f,activeBackgroundColor:m,setActiveBackgroundColor:_,activeTextColor:x,setActiveTextColor:T,hoverBackgroundColor:y,setHoverBackgroundColor:B,hoverTextColor:E,setHoverTextColor:D}){const{postId:N,postType:H}=t,{chapters:I=[]}=function({postId:e,postType:o}){const{record:t,isResolving:r}=(0,k.useEntityRecord)("postType",o,e),l=(0,g.useMemo)((()=>!t||r?[{id:e,title:"Chapter 1...",internalChapters:[{title:"Chapter 1.1...",id:1},{title:"Chapter 1.2...",id:2},{title:"Chapter 1.3...",id:3}]},{id:2,title:"Chapter 2..."},{id:3,title:"Chapter 3..."}]:t?.table_of_contents),[t,r]),a=function(){const{currentChapters:e=[]}=(0,u.useSelect)((e=>{const o=e("core/block-editor").getBlocks().filter((e=>"core/heading"===e.name&&!0===e.attributes?.isChapter));return{currentChapters:0===o.length?[{attributes:{content:"Chapter 1..."}},{attributes:{content:"Chapter 2..."}},{attributes:{content:"Chapter 3..."}}]:o}}),[]);return e}();return{chapters:(0,g.useMemo)((()=>l?.map((o=>{const t=e===o?.id?a.map((e=>({title:e.attributes?.content,id:e?.id,clientId:e?.clientId,link:e?.link}))):o?.internal_chapters;return{id:o.id,title:o?.title,link:o?.link,internalChapters:t}}))),[a,l])}}({postId:N,postType:H}),{heading:A,showCurrentChapter:M,className:O,hideHeading:S,autoDropdownEnabled:$,autoDropdownWidth:V,style:R}=e,{selectBlock:j}=(0,u.useDispatch)("core/block-editor"),[G,W]=(0,n.useState)(!1),[F,z]=(0,n.useState)(null),P=(0,n.useRef)(null);(0,n.useEffect)((()=>{if(!$)return z(!1);const e=()=>{P?.current&&z(P?.current.parentNode.parentNode.offsetWidth<=V)};return e(),window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[$,P?.current?.parentNode?.parentNode.offsetWidth,P?.current?.parentNode?.parentNode,V]);const L=(0,n.useMemo)((()=>({dropdownBackgroundColor:a,setDropdownBackgroundColor:c,dropdownTextColor:p,setDropdownTextColor:h,headingBackgroundColor:C,setHeadingBackgroundColor:w,headingTextColor:v,setHeadingTextColor:f,activeBackgroundColor:m,setActiveBackgroundColor:_,activeTextColor:x,setActiveTextColor:T,hoverBackgroundColor:y,setHoverBackgroundColor:B,hoverTextColor:E,setHoverTextColor:D})),[a,c,p,h,C,w,v,f,m,_,x,T,y,B,E,D]),U=(0,n.useMemo)((()=>s()(O,"common-block-style--baseball-card",{"is-switched":F})),[F,O]),J=(0,n.useMemo)((()=>s()("wp-block-prc-block-table-of-contents__heading",{"has-text-color":!!L?.headingTextColor?.color||!!L?.headingTextColor?.class,[`has-${L?.headingTextColor?.slug}-color`]:!!L?.headingTextColor?.slug,"has-background":!!L?.headingBackgroundColor?.color||!!L?.headingBackgroundColor?.class,[`has-${L?.headingBackgroundColor?.slug}-background-color`]:!!L?.headingBackgroundColor?.slug,"is-hidden":S})),[L,S]),Y=(0,n.useMemo)((()=>s()("wp-block-prc-block-table-of-contents__dropdown__heading",{"has-text-color":!!L?.dropdownTextColor?.color||!!L?.dropdownTextColor?.class,[`has-${L?.dropdownTextColor?.slug}-color`]:!!L?.dropdownTextColor?.slug,"has-background":!!L?.dropdownBackgroundColor?.color||!!L?.dropdownBackgroundColor?.class,[`has-${L?.dropdownBackgroundColor?.slug}-background-color`]:!!L?.dropdownBackgroundColor?.slug})),[L]),q=(0,n.useMemo)((()=>({className:U,"data-auto-dropdown-enabled":$,"data-auto-dropdown-width":V,"data-show-current-chapter":M,"aria-expanded":G})),[U,$,V,M,G]),K=(0,d.useBlockProps)(q);return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(b,{attributes:e,setAttributes:o,colors:L,clientId:r}),(0,n.createElement)("div",{...K},(0,n.createElement)("div",{ref:P},(0,n.createElement)("div",{className:J},(0,n.createElement)(d.RichText,{tagName:"h2",placeholder:"Table of Contents",value:A,onChange:e=>o({heading:e})})),(0,n.createElement)("div",{className:Y},(0,n.createElement)(d.RichText,{tagName:"h2",placeholder:"Table of Contents",value:A,onChange:e=>o({heading:e})}),(0,n.createElement)("div",{className:"wp-block-prc-block-table-of-contents__dropdown-trigger",onClick:()=>W(!G)},"+")),(0,n.createElement)("ul",{className:"wp-block-prc-block-table-of-contents__list",style:{"--block-gap":(0,i.getBlockGapSupportValue)(e)}},0!==I.length&&I.map((e=>(0,n.createElement)("li",{key:e.id,className:s()("wp-block-prc-block-table-of-contents__list-item",{"is-active":N===e?.id,"has-active-background":!!L.activeBackgroundColor.color||L.activeBackgroundColor.class,[`has-active-${L?.activeBackgroundColor?.slug}-background-color`]:!!L?.activeBackgroundColor?.slug,"has-active-color":!!L.activeTextColor.color||L.activeTextColor.class,[`has-active-${L?.activeTextColor?.slug}-color`]:!!L?.activeTextColor?.slug,"has-focus-background":!!L.activeBackgroundColor.color||L.activeBackgroundColor.class,[`has-focus-${L?.activeBackgroundColor?.slug}-background-color`]:!!L?.activeBackgroundColor?.slug,"has-focus-color":!!L.activeTextColor.color||L.activeTextColor.class,[`has-focus-${L?.activeTextColor?.slug}-color`]:!!L?.activeTextColor?.slug,"has-hover-background":!!L.hoverBackgroundColor.color||L.hoverBackgroundColor.class,[`has-hover-${L?.hoverBackgroundColor?.slug}-background-color`]:!!L?.activeBackgroundColor?.slug,"has-hover-color":!!L.hoverTextColor.color||L.hoverTextColor.class,[`has-hover-${L?.hoverTextColor?.slug}-color`]:!!L?.hoverTextColor?.slug})},(0,n.createElement)("span",null,e?.title),N===e?.id&&e?.internalChapters&&(0,n.createElement)("ul",{className:"wp-block-prc-block-table-of-contents__list"},e.internalChapters.map((e=>(0,n.createElement)("li",{key:e.id},(0,n.createElement)("a",{onClick:()=>{e.clientId&&j(e.clientId)}},e.title))))))))))))})),v=window.prcIcons,f=[{name:"table-of-contents",isDefault:!0,title:(0,p.__)("Table of Contents (Default)"),description:(0,p.__)('The default table of contents block. Displays a list of links to chapters and back-chapters in a post in a "Baseball Card" style. On mobile this transforms to a dropdown.'),attributes:{className:"is-style-default"},scope:["inserter","transform"],isActive:(e,o)=>o.className===e.className},{name:"table-of-contents-dropdown",isDefault:!0,title:(0,p.__)("Table of Contents (Dropdown)"),description:(0,p.__)("Displays a list of chapters and back-chapters in a post in a dropdown style."),attributes:{className:"is-style-dropdown"},scope:["inserter","transform"],isActive:(e,o)=>o.className===e.className}],m=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/table-of-contents","version":"0.1.0","title":"Table of Contents","category":"theme","description":"Displays a list of all heading blocks set to chapter headings.","attributes":{"showCurrentChapter":{"type":"boolean","default":false},"dropdownBackgroundColor":{"type":"string","default":"white"},"dropdownTextColor":{"type":"string","default":"ui-black"},"autoDropdownEnabled":{"type":"boolean","default":true},"autoDropdownWidth":{"type":"number","default":300},"headingBackgroundColor":{"type":"string","default":"ui-black"},"headingTextColor":{"type":"string","default":"white"},"backgroundColor":{"type":"string","default":"white"},"textColor":{"type":"string","default":"ui-black"},"linkColor":{"type":"string","default":"ui-black"},"activeBackgroundColor":{"type":"string","default":"ui-gray-very-light"},"activeTextColor":{"type":"string","default":"ui-black"},"hoverBackgroundColor":{"type":"string","default":"ui-beige-very-light"},"hoverTextColor":{"type":"string","default":"ui-black"},"heading":{"type":"string","default":"Table of Contents"},"hideHeading":{"type":"boolean","default":false},"style":{"type":"object","default":{"spacing":{"blockGap":"var:preset|spacing|20"}}}},"supports":{"anchor":true,"html":false,"align":["left","right"],"color":{"background":true,"text":true,"link":true},"spacing":{"margin":["top","bottom","left","right"],"blockGap":true,"__experimentalDefaultControls":{"margin":true,"blockGap":true}},"position":{"sticky":true},"typography":{"__experimentalFontFamily":true,"fontSizes":true,"lineHeight":true,"__experimentalDefaultControls":{"__experimentalFontFamily":true,"fontSizes":true}},"__experimentalBorder":{"color":true,"radius":false,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"radius":false,"style":true,"width":true}}},"selectors":{"root":".wp-block-prc-block-table-of-contents","spacing":{"blockGap":".wp-block-prc-block-table-of-contents__list"}},"example":{"attributes":{"className":"is-style-default"},"viewportWidth":320},"usesContext":["postId","postType"],"textdomain":"table-of-contents","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":["file:./style-index.css","prc-block-library--baseball-card","prc-block-library--additional-color-supports"],"viewScriptModule":"file:./view.js"}'),{name:_}=m,x={icon:function(){return(0,n.createElement)(v.Icon,{icon:v.icons.faListTree,height:18,preserveAspectRatio:"xMidYMid meet"})},edit:w,variations:f};(0,r.registerBlockType)(_,{...m,...x}),a()((()=>{(0,r.unregisterBlockType)("core/table-of-contents"),(0,r.unregisterBlockType)("yoast-seo/table-of-contents")}))}},t={};function r(e){var l=t[e];if(void 0!==l)return l.exports;var a=t[e]={exports:{}};return o[e](a,a.exports,r),a.exports}r.m=o,e=[],r.O=(o,t,l,a)=>{if(!t){var n=1/0;for(d=0;d<e.length;d++){for(var[t,l,a]=e[d],c=!0,s=0;s<t.length;s++)(!1&a||n>=a)&&Object.keys(r.O).every((e=>r.O[e](t[s])))?t.splice(s--,1):(c=!1,a<n&&(n=a));if(c){e.splice(d--,1);var i=l();void 0!==i&&(o=i)}}return o}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[t,l,a]},r.n=e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return r.d(o,{a:o}),o},r.d=(e,o)=>{for(var t in o)r.o(o,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})},r.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),(()=>{var e={57:0,350:0};r.O.j=o=>0===e[o];var o=(o,t)=>{var l,a,[n,c,s]=t,i=0;if(n.some((o=>0!==e[o]))){for(l in c)r.o(c,l)&&(r.m[l]=c[l]);if(s)var d=s(r)}for(o&&o(t);i<n.length;i++)a=n[i],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(d)},t=globalThis.webpackChunktable_of_contents=globalThis.webpackChunktable_of_contents||[];t.forEach(o.bind(null,0)),t.push=o.bind(null,t.push.bind(t))})();var l=r.O(void 0,[350],(()=>r(718)));l=r.O(l)})();
//# sourceMappingURL=index.js.map