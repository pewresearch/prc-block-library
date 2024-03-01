(()=>{"use strict";var e,t={936:()=>{const e=window.React,t=window.wp.hooks,r=window.wp.compose,o=window.wp.element,n=window.prcComponents,i=window.wp.i18n,l=window.wp.blockEditor,a=window.wp.components;function c({attributes:t,setAttributes:r}){const{mobileId:o,tabletId:c}=t;return(0,e.createElement)(l.InspectorControls,null,(0,e.createElement)(a.PanelBody,{title:(0,i.__)("Media (mobile) settings")},(0,e.createElement)(n.MediaDropZone,{attachmentId:o,label:((0,i.__)("Set Mobile Background"),"prc-block-library"),onUpdate:e=>{r({mobileId:e.id,mobileUrl:e.source_url})}}),(0,e.createElement)(n.MediaDropZone,{attachmentId:c,label:((0,i.__)("Set Tablet Background"),"prc-block-library"),onUpdate:e=>{r({tabletId:e.id,tabletUrl:e.source_url})}})))}function s({attributes:t,setAttributes:r,context:o}){return(0,e.createElement)(c,{attributes:t,setAttributes:r,context:o})}(0,t.addFilter)("editor.BlockEdit","prc-block-library/core-cover",(0,r.createHigherOrderComponent)((t=>function(r){const{name:n,attributes:i,setAttributes:l}=r;return"core/cover"!==n?(0,e.createElement)(t,{...r}):(0,e.createElement)(o.Fragment,null,(0,e.createElement)(t,{...r}),(0,e.createElement)(s,{attributes:i,setAttributes:l,context:!1}))}),"withCoreCoverControls"),21)}},r={};function o(e){var n=r[e];if(void 0!==n)return n.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,r,n,i)=>{if(!r){var l=1/0;for(b=0;b<e.length;b++){for(var[r,n,i]=e[b],a=!0,c=0;c<r.length;c++)(!1&i||l>=i)&&Object.keys(o.O).every((e=>o.O[e](r[c])))?r.splice(c--,1):(a=!1,i<l&&(l=i));if(a){e.splice(b--,1);var s=n();void 0!==s&&(t=s)}}return t}i=i||0;for(var b=e.length;b>0&&e[b-1][2]>i;b--)e[b]=e[b-1];e[b]=[r,n,i]},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var n,i,[l,a,c]=r,s=0;if(l.some((t=>0!==e[t]))){for(n in a)o.o(a,n)&&(o.m[n]=a[n]);if(c)var b=c(o)}for(t&&t(r);s<l.length;s++)i=l[s],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(b)},r=globalThis.webpackChunkcore_cover=globalThis.webpackChunkcore_cover||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=o.O(void 0,[350],(()=>o(936)));n=o.O(n)})();
//# sourceMappingURL=index.js.map