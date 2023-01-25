(()=>{var e,t={472:(e,t)=>{var r;!function(){"use strict";var l={}.hasOwnProperty;function n(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var c=typeof r;if("string"===c||"number"===c)e.push(r);else if(Array.isArray(r)){if(r.length){var i=n.apply(null,r);i&&e.push(i)}}else if("object"===c)if(r.toString===Object.prototype.toString)for(var o in r)l.call(r,o)&&r[o]&&e.push(o);else e.push(r.toString())}}return e.join(" ")}e.exports?(n.default=n,e.exports=n):void 0===(r=function(){return n}.apply(t,[]))||(e.exports=r)}()},463:(e,t,r)=>{"use strict";window.wp.i18n;const l=window.wp.blocks,n=window.wp.element;var c=r(472),i=r.n(c);const o=window.wp.blockEditor,a=window.wp.components;function s(e){let{isFlipped:t,doFlip:r}=e;return(0,n.createElement)(o.BlockControls,null,(0,n.createElement)(a.ToolbarGroup,null,(0,n.createElement)(a.ToolbarButton,{onClick:()=>r(),isActive:t,label:"Flip Over",icon:"image-rotate"})))}function p(e){let{attributes:t,setAttributes:r,context:l,isFlipped:c,doFlip:i}=e;return(0,n.createElement)(s,{isFlipped:c,doFlip:i})}const d=["prc-block/flip-card-side"],u=[["prc-block/flip-card-side",{className:"is-style-front"},[["core/paragraph",{placeholder:"Flip Card Front..."}]]],["prc-block/flip-card-side",{className:"is-style-back"},[["core/paragraph",{placeholder:"Flip Card Back..."}]]]],f=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/flip-card-controller","version":"0.1.0","title":"Flip Card Controller","description":"A card that can be flipped","category":"media","attributes":{},"supports":{"anchor":true,"html":false,"align":["left","right"],"spacing":{"margin":true},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"textdomain":"flip-card-controller","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}'),{name:m}=f,v={icon:function(){return(0,n.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 640",width:21,preserveAspectRatio:"xMidYMid meet"},(0,n.createElement)(a.Path,{d:"M7.5 194.9c-15.4-26.7-6.3-60.7 20.4-76.1C92.1 81.7 156.4 44.6 220.7 7.5c26.6-15.4 60.7-6.3 76.1 20.4c36.4 63 72.7 126 109.1 188.9c-14 8.4-26.8 18.6-37.9 30.4C330.4 182.1 292.8 117 255.2 51.9c-2.1-3.7-6.8-4.9-10.5-2.8C180.4 86.2 116.1 123.3 51.9 160.4c-3.7 2.1-4.9 6.8-2.8 10.5c55.7 96.5 111.4 192.9 167.1 289.3c2.1 3.6 6.8 4.9 10.4 1.9c32.6-18.6 65.1-37.3 97.7-55.9c3.6 16.3 9.5 31.7 17.2 45.9c-30.3 17.5-60.6 35-90.9 52.4c-26.6 15.4-60.6 6.3-76-20.3C118.8 387.7 63.1 291.3 7.5 194.9zM354.7 64.3c1.8-.2 3.5-1.2 5.3-1.2c74.7 0 149.3 0 224 0c30.9 0 56 26 56 56c0 49.2 0 98.5 0 147.7C608.1 221.6 555.5 192 496 192c-21.5 0-42.1 3.9-61.2 10.9c-26.7-46.2-53.4-92.5-80.1-138.7zM640 456c0 30.9-25.1 56-56 56c-29.3 0-58.7 0-88 0c79.5 0 144-64.5 144-144c0 29.3 0 58.7 0 88zM394.8 512L360 512c-13.6 0-26.2-4.9-35.9-13.9c11.6-6.6 23.2-13.2 34.8-19.8c10.3 12.8 22.4 24.2 35.9 33.7zM640 512l0-144c0 79.5-64.5 144-144 144c48 0 96 0 144 0zM352 368c0-79.5 64.5-144 144-144s144 64.5 144 144s-64.5 144-144 144s-144-64.5-144-144zm194.5-66.2c2.8-5 1.7-11.1-2.6-14.9s-10.6-4-15.1-.6c-32 24-64 48-96 72c-4.1 3.1-5.8 8.5-4.2 13.4s6.2 8.2 11.4 8.2c11.9 0 23.7 0 35.6 0c-10 18.1-20.1 36.1-30.1 54.2c-2.8 5-1.7 11.1 2.6 14.9s10.6 4 15.1 .6c32-24 64-48 96-72c4.1-3.1 5.8-8.5 4.2-13.4s-6.2-8.2-11.4-8.2c-11.9 0-23.7 0-35.6 0c10-18.1 20.1-36.1 30.1-54.2z"}))},edit:function(e){let{attributes:t,setAttributes:r,context:l,clientId:c,isSelected:a}=e;const[s,f]=(0,n.useState)(!1),m=(0,o.useBlockProps)({className:i()({"is-flipped":s})}),v=(0,o.useInnerBlocksProps)({},{allowedBlocks:d,template:u,templateLock:"all",__experimentalCaptureToolbars:!0});return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(p,{isFlipped:s,doFlip:()=>{f(!s)}}),(0,n.createElement)("div",m,(0,n.createElement)("div",v)))},save:function(e){let{attributes:t}=e;return(0,n.createElement)(o.InnerBlocks.Content,null)}};(0,l.registerBlockType)(m,{...f,...v})}},r={};function l(e){var n=r[e];if(void 0!==n)return n.exports;var c=r[e]={exports:{}};return t[e](c,c.exports,l),c.exports}l.m=t,e=[],l.O=(t,r,n,c)=>{if(!r){var i=1/0;for(p=0;p<e.length;p++){r=e[p][0],n=e[p][1],c=e[p][2];for(var o=!0,a=0;a<r.length;a++)(!1&c||i>=c)&&Object.keys(l.O).every((e=>l.O[e](r[a])))?r.splice(a--,1):(o=!1,c<i&&(i=c));if(o){e.splice(p--,1);var s=n();void 0!==s&&(t=s)}}return t}c=c||0;for(var p=e.length;p>0&&e[p-1][2]>c;p--)e[p]=e[p-1];e[p]=[r,n,c]},l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var r in t)l.o(t,r)&&!l.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};l.O.j=t=>0===e[t];var t=(t,r)=>{var n,c,i=r[0],o=r[1],a=r[2],s=0;if(i.some((t=>0!==e[t]))){for(n in o)l.o(o,n)&&(l.m[n]=o[n]);if(a)var p=a(l)}for(t&&t(r);s<i.length;s++)c=i[s],l.o(e,c)&&e[c]&&e[c][0](),e[c]=0;return l.O(p)},r=self.webpackChunkflip_card_controller=self.webpackChunkflip_card_controller||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=l.O(void 0,[431],(()=>l(463)));n=l.O(n)})();