(()=>{var o,e={472:(o,e)=>{var t;!function(){"use strict";var r={}.hasOwnProperty;function l(){for(var o=[],e=0;e<arguments.length;e++){var t=arguments[e];if(t){var n=typeof t;if("string"===n||"number"===n)o.push(t);else if(Array.isArray(t)){if(t.length){var a=l.apply(null,t);a&&o.push(a)}}else if("object"===n){if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]")){o.push(t.toString());continue}for(var c in t)r.call(t,c)&&t[c]&&o.push(c)}}}return o.join(" ")}o.exports?(l.default=l,o.exports=l):void 0===(t=function(){return l}.apply(e,[]))||(o.exports=t)}()},900:(o,e,t)=>{"use strict";const r=window.wp.blocks,l=window.wp.element;var n=t(472),a=t.n(n);const c=window.wp.i18n,s=window.wp.blockEditor;function i(o){let{colors:e}=o;const{titleBackgroundColor:t,setTitleBackgroundColor:r,titleTextColor:n,setTitleTextColor:a,contentBackgroundColor:i,setContentBackgroundColor:u,contentTextColor:d,setContentTextColor:g,borderColor:p,setBorderColor:C}=e;return(0,l.createElement)(s.InspectorControls,{group:"styles"},(0,l.createElement)(s.PanelColorSettings,{__experimentalHasMultipleOrigins:!0,__experimentalIsRenderedInSidebar:!0,title:(0,c.__)("Colors"),disableCustomColors:!0,colorSettings:[{value:t.color,onChange:r,label:(0,c.__)("Title Background")},{value:n.color,onChange:a,label:(0,c.__)("Title Text")},{value:i.color,onChange:u,label:(0,c.__)("Content Background")},{value:d.color,onChange:g,label:(0,c.__)("Content Text")},{value:p.color,onChange:C,label:(0,c.__)("Border")}]}))}const u=(0,s.withColors)({titleBackgroundColor:"color"},{titleTextColor:"color"},{contentBackgroundColor:"color"},{contentTextColor:"color"},{borderColor:"color"})((function(o){let{attributes:e,setAttributes:t,className:r,titleBackgroundColor:n,setTitleBackgroundColor:u,titleTextColor:d,setTitleTextColor:g,contentBackgroundColor:p,setContentBackgroundColor:C,contentTextColor:b,setContentTextColor:k,borderColor:h,setBorderColor:m}=o;const[v,f]=(0,l.useState)(!1),x={titleBackgroundColor:n,setTitleBackgroundColor:u,titleTextColor:d,setTitleTextColor:g,contentBackgroundColor:p,setContentBackgroundColor:C,contentTextColor:b,setContentTextColor:k,borderColor:h,setBorderColor:m},y=(0,s.useBlockProps)({className:a()(r,{"is-active":v,"has-border-color":!!h.color||!!h?.class,[(0,s.getColorClassName)("border-color",h?.slug)]:!!h?.slug})}),{allowedBlocks:T,title:B}=e,_=(0,s.useInnerBlocksProps)({className:a()("wp-block-prc-block-accordion--content",{"is-open":v,"has-background":!!p.color||!!p?.class,[(0,s.getColorClassName)("background-color",p?.slug)]:!!p?.slug,"has-text-color":!!b.color||!!b?.class,[(0,s.getColorClassName)("color",b?.slug)]:!!b?.slug})},{allowedBlocks:T||!0,orientation:"vertical"}),w=a()("wp-block-prc-block-accordion--title",{"has-background":!!n.color||!!n?.class,[(0,s.getColorClassName)("background-color",n?.slug)]:!!n?.slug,"has-text-color":!!d.color||!!d?.class,[(0,s.getColorClassName)("color",d?.slug)]:!!d?.slug});return(0,l.createElement)(l.Fragment,null,(0,l.createElement)(i,{colors:x}),(0,l.createElement)("div",y,(0,l.createElement)("div",{className:w},(0,l.createElement)("span",{className:"wp-block-prc-block-accordion--icon",onClick:()=>f(!v)},"‣"),(0,l.createElement)(s.RichText,{tagName:"h3",placeholder:(0,c.__)("Title","prc-block-library"),value:B,onChange:o=>t({title:o}),allowedFormats:[]})),(0,l.createElement)("div",_)))})),d=window.prcIcons,g=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/accordion","version":"0.1.0","title":"Accordion","category":"design","attributes":{"title":{"type":"string"},"allowedBlocks":{"type":"array"},"titleBackgroundColor":{"type":"string"},"titleTextColor":{"type":"string"},"contentBackgroundColor":{"type":"string"},"contentTextColor":{"type":"string"},"borderColor":{"type":"string","default":"gray-light"}},"supports":{"anchor":true,"html":false,"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"parent":["prc-block/accordion-controller"],"textdomain":"accordion","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php"}'),{name:p}=g,C={icon:function(){return(0,l.createElement)(d.Icon,{icon:d.icons.faShuttersLight,height:21,preserveAspectRatio:"xMidYMid meet"})},__experimentalLabel:o=>{let{title:e}=o;return e||p},edit:u,save:function(){return(0,l.createElement)(s.InnerBlocks.Content,null)}};(0,r.registerBlockType)(p,{...g,...C})}},t={};function r(o){var l=t[o];if(void 0!==l)return l.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}r.m=e,o=[],r.O=(e,t,l,n)=>{if(!t){var a=1/0;for(u=0;u<o.length;u++){for(var[t,l,n]=o[u],c=!0,s=0;s<t.length;s++)(!1&n||a>=n)&&Object.keys(r.O).every((o=>r.O[o](t[s])))?t.splice(s--,1):(c=!1,n<a&&(a=n));if(c){o.splice(u--,1);var i=l();void 0!==i&&(e=i)}}return e}n=n||0;for(var u=o.length;u>0&&o[u-1][2]>n;u--)o[u]=o[u-1];o[u]=[t,l,n]},r.n=o=>{var e=o&&o.__esModule?()=>o.default:()=>o;return r.d(e,{a:e}),e},r.d=(o,e)=>{for(var t in e)r.o(e,t)&&!r.o(o,t)&&Object.defineProperty(o,t,{enumerable:!0,get:e[t]})},r.o=(o,e)=>Object.prototype.hasOwnProperty.call(o,e),(()=>{var o={826:0,431:0};r.O.j=e=>0===o[e];var e=(e,t)=>{var l,n,[a,c,s]=t,i=0;if(a.some((e=>0!==o[e]))){for(l in c)r.o(c,l)&&(r.m[l]=c[l]);if(s)var u=s(r)}for(e&&e(t);i<a.length;i++)n=a[i],r.o(o,n)&&o[n]&&o[n][0](),o[n]=0;return r.O(u)},t=globalThis.webpackChunkaccordion=globalThis.webpackChunkaccordion||[];t.forEach(e.bind(null,0)),t.push=e.bind(null,t.push.bind(t))})();var l=r.O(void 0,[431],(()=>r(900)));l=r.O(l)})();
//# sourceMappingURL=index.js.map