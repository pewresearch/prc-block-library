(()=>{"use strict";var o,e={998:(o,e,t)=>{const r=window.wp.blocks,l=window.React,n=window.classnames;var c=t.n(n);const a=window.wp.i18n,s=window.wp.element,i=window.wp.blockEditor;function u({colors:o,clientId:e}){const t=(0,i.__experimentalUseMultipleOriginColorsAndGradients)(),{titleBackgroundColor:r,setTitleBackgroundColor:n,titleTextColor:c,setTitleTextColor:s,contentBackgroundColor:u,setContentBackgroundColor:d,contentTextColor:g,setContentTextColor:p}=o;return(0,l.createElement)(i.InspectorControls,{group:"color"},(0,l.createElement)(i.__experimentalColorGradientSettingsDropdown,{settings:[{colorValue:c?.color,onColorChange:s,label:(0,a.__)("Title Text")},{colorValue:r?.color,onColorChange:n,label:(0,a.__)("Title Background")},{colorValue:g?.color,onColorChange:p,label:(0,a.__)("Content Text")},{colorValue:u?.color,onColorChange:d,label:(0,a.__)("Content Background")}],panelId:e,hasColorsOrGradients:!1,disableCustomColors:!0,__experimentalIsRenderedInSidebar:!0,...t}))}const d=(0,i.withColors)({contentTextColor:"color"},{contentBackgroundColor:"color"},{titleBackgroundColor:"color"},{titleTextColor:"color"})((function({attributes:o,setAttributes:e,className:t,titleBackgroundColor:r,setTitleBackgroundColor:n,titleTextColor:d,setTitleTextColor:g,contentBackgroundColor:p,setContentBackgroundColor:C,contentTextColor:k,setContentTextColor:b,clientId:m,context:x}){const h=(0,s.useMemo)((()=>{const o=x?.["prc-block/accordion-controller/title-background"];return!r?.slug&&o?{slug:o}:r}),[x,r]),_=(0,s.useMemo)((()=>{const o=x?.["prc-block/accordion-controller/title-text"];return!d?.slug&&o?{slug:o}:d}),[x,d]),w=(0,s.useMemo)((()=>{const o=x?.["prc-block/accordion-controller/content-background"];return!p?.slug&&o?{slug:o}:p}),[x,p]),T=(0,s.useMemo)((()=>{const o=x?.["prc-block/accordion-controller/content-text"];return!k?.slug&&o?{slug:o}:k}),[x,k]),[f,v]=(0,s.useState)(!1),B=(0,i.useBlockProps)({className:c()(t,{"is-active":f})}),{allowedBlocks:y,title:O}=o,E=(0,i.useInnerBlocksProps)({className:c()("wp-block-prc-block-accordion__content",{"is-open":f,"has-background":!!w?.slug,[(0,i.getColorClassName)("background-color",w?.slug)]:!!w?.slug,"has-text-color":!!T?.slug,[(0,i.getColorClassName)("color",T?.slug)]:!!T?.slug})},{allowedBlocks:y||!0,orientation:"vertical"}),N=c()("wp-block-prc-block-accordion__title",{"has-background":!!h?.slug,[(0,i.getColorClassName)("background-color",h?.slug)]:!!h?.slug,"has-text-color":!!_?.slug,[(0,i.getColorClassName)("color",_?.slug)]:!!_?.slug});return(0,l.createElement)(s.Fragment,null,(0,l.createElement)(u,{colors:{titleBackgroundColor:r,setTitleBackgroundColor:n,titleTextColor:d,setTitleTextColor:g,contentBackgroundColor:p,setContentBackgroundColor:C,contentTextColor:k,setContentTextColor:b},clientId:m}),(0,l.createElement)("div",{...B},(0,l.createElement)("div",{className:N},(0,l.createElement)("span",{className:"wp-block-prc-block-accordion__icon",onClick:()=>v(!f)},"‣"),(0,l.createElement)(i.RichText,{tagName:"h3",placeholder:(0,a.__)("Title","prc-block-library"),value:O,onChange:o=>e({title:o}),allowedFormats:[]})),(0,l.createElement)("div",{...E})))})),g=window.prcIcons,p=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/accordion","version":"0.1.0","title":"Accordion","category":"design","attributes":{"title":{"type":"string"},"allowedBlocks":{"type":"array"},"titleBackgroundColor":{"type":"string"},"titleTextColor":{"type":"string"},"contentBackgroundColor":{"type":"string"},"contentTextColor":{"type":"string"}},"supports":{"color":{"link":true,"text":false,"background":false},"anchor":true,"html":false,"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}},"__experimentalBorder":{"color":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"style":true,"width":true}},"interactivity":true},"parent":["prc-block/accordion-controller"],"usesContext":["prc-block/accordion-controller/content-background","prc-block/accordion-controller/content-text","prc-block/accordion-controller/title-background","prc-block/accordion-controller/title-text"],"textdomain":"accordion","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php"}'),{name:C}=p,k={icon:function(){return(0,l.createElement)(g.NewIcon,{icon:"shutters",library:"light"})},__experimentalLabel:({title:o})=>o||C,edit:d,save:function(){return(0,l.createElement)(i.InnerBlocks.Content,null)}};(0,r.registerBlockType)(C,{...p,...k})}},t={};function r(o){var l=t[o];if(void 0!==l)return l.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}r.m=e,o=[],r.O=(e,t,l,n)=>{if(!t){var c=1/0;for(u=0;u<o.length;u++){for(var[t,l,n]=o[u],a=!0,s=0;s<t.length;s++)(!1&n||c>=n)&&Object.keys(r.O).every((o=>r.O[o](t[s])))?t.splice(s--,1):(a=!1,n<c&&(c=n));if(a){o.splice(u--,1);var i=l();void 0!==i&&(e=i)}}return e}n=n||0;for(var u=o.length;u>0&&o[u-1][2]>n;u--)o[u]=o[u-1];o[u]=[t,l,n]},r.n=o=>{var e=o&&o.__esModule?()=>o.default:()=>o;return r.d(e,{a:e}),e},r.d=(o,e)=>{for(var t in e)r.o(e,t)&&!r.o(o,t)&&Object.defineProperty(o,t,{enumerable:!0,get:e[t]})},r.o=(o,e)=>Object.prototype.hasOwnProperty.call(o,e),(()=>{var o={826:0,431:0};r.O.j=e=>0===o[e];var e=(e,t)=>{var l,n,[c,a,s]=t,i=0;if(c.some((e=>0!==o[e]))){for(l in a)r.o(a,l)&&(r.m[l]=a[l]);if(s)var u=s(r)}for(e&&e(t);i<c.length;i++)n=c[i],r.o(o,n)&&o[n]&&o[n][0](),o[n]=0;return r.O(u)},t=globalThis.webpackChunkaccordion=globalThis.webpackChunkaccordion||[];t.forEach(e.bind(null,0)),t.push=e.bind(null,t.push.bind(t))})();var l=r.O(void 0,[431],(()=>r(998)));l=r.O(l)})();
//# sourceMappingURL=index.js.map