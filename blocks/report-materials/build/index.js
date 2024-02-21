(()=>{"use strict";var e,o={731:(e,o,r)=>{const t=window.wp.i18n,a=window.wp.blocks,l=window.React,n=window.classnames;var s=r.n(n);const c=window.prcBlockUtils,i=window.prcIcons,u=window.wp.element,p=window.wp.blockEditor,d=(window.wp.data,window.wp.coreData),g=window.wp.url;function h({colors:e,clientId:o}){const r=(0,p.__experimentalUseMultipleOriginColorsAndGradients)(),a=(0,u.useMemo)((()=>{const{headingBackgroundColor:o,setHeadingBackgroundColor:r,headingTextColor:a,setHeadingTextColor:l,activeBackgroundColor:n,setActiveBackgroundColor:s,activeTextColor:c,setActiveTextColor:i,hoverBackgroundColor:u,setHoverBackgroundColor:p,hoverTextColor:d,setHoverTextColor:g}=e;return[{colorValue:a?.color,onColorChange:l,label:(0,t.__)("Heading Text")},{colorValue:o?.color,onColorChange:r,label:(0,t.__)("Heading Background")},{colorValue:c?.color,onColorChange:i,label:(0,t.__)("Active Text")},{colorValue:n?.color,onColorChange:s,label:(0,t.__)("Active Background")},{colorValue:d?.color,onColorChange:g,label:(0,t.__)("Hover Text")},{colorValue:u?.color,onColorChange:p,label:(0,t.__)("Hover Background")}]}),[e]);return(0,l.createElement)(u.Fragment,null,(0,l.createElement)(p.InspectorControls,{group:"color"},(0,l.createElement)(p.__experimentalColorGradientSettingsDropdown,{settings:a,panelId:o,hasColorsOrGradients:!1,disableCustomColors:!0,__experimentalIsRenderedInSidebar:!0,...r})))}const k=(0,p.withColors)({activeBackgroundColor:"color"},{activeTextColor:"color"},{headingBackgroundColor:"color"},{headingTextColor:"color"},{hoverBackgroundColor:"color"},{hoverTextColor:"color"})((function({attributes:e,setAttributes:o,context:r,clientId:t,isSelected:a,headingBackgroundColor:n,setHeadingBackgroundColor:k,headingTextColor:b,setHeadingTextColor:C,activeBackgroundColor:m,setActiveBackgroundColor:v,activeTextColor:f,setActiveTextColor:x,hoverBackgroundColor:y,setHoverBackgroundColor:T,hoverTextColor:w,setHoverTextColor:_}){const{postId:B,postType:M}=r,{heading:I,className:H}=e,{reportMaterials:E=[],parentId:O,parentTitle:A}=function({postId:e,postType:o}){(0,g.getPath)(window.location.href)?.includes("site-editor.php");const{record:r,isResolving:t}=(0,d.useEntityRecord)("postType",o,e),{parentTitle:a,parentId:l,reportMaterials:n}=(0,u.useMemo)((()=>!r||t?{parentTitle:null,parentId:null,reportMaterials:[{key:"1",type:"detailTable",label:"Material 1..."},{key:"2",type:"report",label:"Material 2..."},{key:"3",type:"topline",label:"Material 3..."},{key:"4",type:"dataset",label:"Material 4..."}]}:{parentTitle:r?.parent_info?.parent_title,parentId:r?.parent_info?.parent_id,reportMaterials:r?.report_materials}),[r,t]);return console.log("useReportMaterials",e,o,n),{parentId:l,parentTitle:a,reportMaterials:n}}({postId:B,postType:M}),R=(0,u.useMemo)((()=>s()(H,"common-block-style--baseball-card")),[H]),P=(0,u.useMemo)((()=>s()("wp-block-prc-block-report-materials__heading",{"has-text-color":!!b?.color||!!b?.class,[`has-${b?.slug}-color`]:!!b?.slug,"has-background":!!n?.color||!!n?.class,[`has-${n?.slug}-background-color`]:!!n?.slug})),[n,b]),S=(0,p.useBlockProps)({className:R});return(0,l.createElement)(u.Fragment,null,(0,l.createElement)(h,{colors:{headingBackgroundColor:n,setHeadingBackgroundColor:k,headingTextColor:b,setHeadingTextColor:C,hoverBackgroundColor:y,setHoverBackgroundColor:T,hoverTextColor:w,setHoverTextColor:_,activeBackgroundColor:m,setActiveBackgroundColor:v,activeTextColor:f,setActiveTextColor:x},clientId:t}),(0,l.createElement)("div",{...S},(0,l.createElement)("div",{className:P},(0,l.createElement)(p.RichText,{tagName:"h2",placeholder:"Report Materials",value:I,onChange:e=>o({heading:e})})),(0,l.createElement)("ul",{className:"wp-block-prc-block-report-materials__list",style:{"--block-gap":(0,c.getBlockGapSupportValue)(e)}},0!==E.length&&E.map((e=>{const o=e?.type,r=o?function(e){switch(e){case"detailedTable":return i.icons.faTable;case"link":return i.icons.faLink;case"presentation":return i.icons.faPresentationScreen;case"pressRelease":case"promo":case"qA":case"report":case"supplemental":default:return i.icons.faFile;case"questionnaire":case"topline":return i.icons.faClipboard}}(o):null;return(0,l.createElement)("li",{className:s()("wp-block-prc-block-repor_materials__list-item","flex-align-center",{"has-hover-background":!!y.color||y.class,[`has-hover-${y?.slug}-background-color`]:!!y?.slug,"has-hover-color":!!w.color||w.class,[`has-hover-${w?.slug}-color`]:!!w?.slug,"has-active-background":!!m.color||m.class,[`has-active-${m?.slug}-background-color`]:!!m?.slug,"has-active-color":!!f.color||f.class,[`has-active-${f?.slug}-color`]:!!f?.slug,"has-focus-background":!!m.color||m.class,[`has-focus-${m?.slug}-background-color`]:!!m?.slug,"has-focus-color":!!f.color||f.class,[`has-focus-${f?.slug}-color`]:!!f?.slug})},null!==r&&(0,l.createElement)(i.Icon,{icon:r}),(0,l.createElement)("span",null,function(e){if(e.hasOwnProperty("label")&&""!==e.label)return e.label;switch(e.type){case"detailedTable":return"Data Table";case"link":return"Link";case"presentation":return"Presentation";case"pressRelease":return"Press Release";case"promo":return"Promo";case"qA":return"Q & A";case"questionnaire":return"Questionnaire";case"report":return"Report PDF";case"supplemental":return"Supplemental";case"topline":return"Topline";default:return"Unknown"}}(e)))})))))})),b=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/report-materials","version":"0.1.0","title":"Report Materials","category":"theme","description":"Displays a list of all materials from a post report package.","attributes":{"headingBackgroundColor":{"type":"string","default":"ui-black"},"headingTextColor":{"type":"string","default":"ui-white"},"hoverBackgroundColor":{"type":"string","default":"ui-beige-very-light"},"hoverTextColor":{"type":"string","default":"ui-black"},"activeBackgroundColor":{"type":"string","default":"ui-gray-very-light"},"activeTextColor":{"type":"string","default":"ui-black"},"heading":{"type":"string","default":"Report Materials"},"hideHeading":{"type":"boolean","default":false},"style":{"type":"object","default":{"spacing":{"blockGap":"var:preset|spacing|20"}}}},"supports":{"anchor":true,"html":false,"color":{"background":true,"text":true,"link":true},"spacing":{"margin":["top","bottom","left","right"],"blockGap":true,"__experimentalDefaultControls":{"margin":true,"blockGap":true}},"typography":{"__experimentalFontFamily":true,"fontSize":true,"__experimentalDefaultControls":{"__experimentalFontFamily":true}}},"usesContext":["postId","postType"],"textdomain":"report-materials","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":["file:./style-index.css","prc-block-library--baseball-card","prc-block-library--additional-color-supports"]}'),{name:C}=b,m={icon:function(){return(0,l.createElement)(i.Icon,{icon:i.icons.faListTree,height:18,preserveAspectRatio:"xMidYMid meet"})},edit:k};(0,a.registerBlockType)(C,{...b,...m})}},r={};function t(e){var a=r[e];if(void 0!==a)return a.exports;var l=r[e]={exports:{}};return o[e](l,l.exports,t),l.exports}t.m=o,e=[],t.O=(o,r,a,l)=>{if(!r){var n=1/0;for(u=0;u<e.length;u++){for(var[r,a,l]=e[u],s=!0,c=0;c<r.length;c++)(!1&l||n>=l)&&Object.keys(t.O).every((e=>t.O[e](r[c])))?r.splice(c--,1):(s=!1,l<n&&(n=l));if(s){e.splice(u--,1);var i=a();void 0!==i&&(o=i)}}return o}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[r,a,l]},t.n=e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return t.d(o,{a:o}),o},t.d=(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},t.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),(()=>{var e={57:0,350:0};t.O.j=o=>0===e[o];var o=(o,r)=>{var a,l,[n,s,c]=r,i=0;if(n.some((o=>0!==e[o]))){for(a in s)t.o(s,a)&&(t.m[a]=s[a]);if(c)var u=c(t)}for(o&&o(r);i<n.length;i++)l=n[i],t.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return t.O(u)},r=globalThis.webpackChunkreport_materials=globalThis.webpackChunkreport_materials||[];r.forEach(o.bind(null,0)),r.push=o.bind(null,r.push.bind(r))})();var a=t.O(void 0,[350],(()=>t(731)));a=t.O(a)})();
//# sourceMappingURL=index.js.map