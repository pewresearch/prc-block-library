(()=>{"use strict";var e,o={203:(e,o,r)=>{const t=window.wp.domReady;var n=r.n(t);const i=window.wp.data,a=window.wp.blocks,s=window.wp.hooks,l=window.wp.compose,d=window.wp.element,c=window.wp.i18n,w=window.wp.blockEditor,u=window.wp.components,p=window.ReactJSXRuntime;function b({attributes:e,setAttributes:o}){const{disableLazyLoading:r}=e;return(0,p.jsx)(w.InspectorAdvancedControls,{children:(0,p.jsx)(u.ToggleControl,{label:(0,c.__)("Disable Lazy Loading"),checked:r,onChange:()=>o({disableLazyLoading:!r}),help:r?(0,c.__)('Lazy loading is disabled. This image will load "eagerly".'):(0,c.__)("Lazy loading is enabled.")})})}const g="core/image";n()((()=>{null!==(0,i.select)("core/editor")&&(0,a.unregisterBlockStyle)(g,["rounded"])})),(0,s.addFilter)("editor.BlockEdit","prc-block/core-image-controls",(0,l.createHigherOrderComponent)((e=>function(o){const{name:r,attributes:t,setAttributes:n,clientId:i}=o;return g!==r?(0,p.jsx)(e,{...o}):(0,p.jsxs)(d.Fragment,{children:[(0,p.jsx)(b,{attributes:t,setAttributes:n,clientId:i}),(0,p.jsx)(e,{...o})]})}),"withCoreImageControls"),21)}},r={};function t(e){var n=r[e];if(void 0!==n)return n.exports;var i=r[e]={exports:{}};return o[e](i,i.exports,t),i.exports}t.m=o,e=[],t.O=(o,r,n,i)=>{if(!r){var a=1/0;for(c=0;c<e.length;c++){for(var[r,n,i]=e[c],s=!0,l=0;l<r.length;l++)(!1&i||a>=i)&&Object.keys(t.O).every((e=>t.O[e](r[l])))?r.splice(l--,1):(s=!1,i<a&&(a=i));if(s){e.splice(c--,1);var d=n();void 0!==d&&(o=d)}}return o}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[r,n,i]},t.n=e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return t.d(o,{a:o}),o},t.d=(e,o)=>{for(var r in o)t.o(o,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:o[r]})},t.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),(()=>{var e={57:0,350:0};t.O.j=o=>0===e[o];var o=(o,r)=>{var n,i,[a,s,l]=r,d=0;if(a.some((o=>0!==e[o]))){for(n in s)t.o(s,n)&&(t.m[n]=s[n]);if(l)var c=l(t)}for(o&&o(r);d<a.length;d++)i=a[d],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(c)},r=globalThis.webpackChunkcore_image=globalThis.webpackChunkcore_image||[];r.forEach(o.bind(null,0)),r.push=o.bind(null,r.push.bind(r))})();var n=t.O(void 0,[350],(()=>t(203)));n=t.O(n)})();