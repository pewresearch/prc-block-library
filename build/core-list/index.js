(()=>{"use strict";var r,e={180:(r,e,o)=>{const t=window.wp.domReady;var p=o.n(t);const s=window.wp.blocks,a=window.wp.compose,n=window.wp.hooks,i=window.prcBlockUtils,l=window.React,c=window.ReactJSXRuntime,d="prc-block/core-list",w="core/list";p()((()=>{(0,s.registerBlockStyle)(w,{name:"list-style-type-none",label:"Unstyled List"}),(0,n.addFilter)("editor.BlockListBlock",`${d}-wrapper-props`,(0,a.createHigherOrderComponent)((r=>e=>{const{attributes:o,name:t}=e;if(w!==t)return(0,c.jsx)(r,{...e});const p=(0,l.useMemo)((()=>(0,i.getBlockGapSupportValue)(o,"vertical")),[o]),s={...e.wrapperProps,style:{"--block-gap":p||0}};return(0,c.jsx)(r,{...e,wrapperProps:s})}),"withCoreListWrapperProps"),100),(0,n.addFilter)("blocks.registerBlockType",`${d}-supports`,(r=>(w!==r.name||r.supports.spacing&&(r.supports.spacing.blockGap=!0),r)))}))}},o={};function t(r){var p=o[r];if(void 0!==p)return p.exports;var s=o[r]={exports:{}};return e[r](s,s.exports,t),s.exports}t.m=e,r=[],t.O=(e,o,p,s)=>{if(!o){var a=1/0;for(c=0;c<r.length;c++){o=r[c][0],p=r[c][1],s=r[c][2];for(var n=!0,i=0;i<o.length;i++)(!1&s||a>=s)&&Object.keys(t.O).every((r=>t.O[r](o[i])))?o.splice(i--,1):(n=!1,s<a&&(a=s));if(n){r.splice(c--,1);var l=p();void 0!==l&&(e=l)}}return e}s=s||0;for(var c=r.length;c>0&&r[c-1][2]>s;c--)r[c]=r[c-1];r[c]=[o,p,s]},t.n=r=>{var e=r&&r.__esModule?()=>r.default:()=>r;return t.d(e,{a:e}),e},t.d=(r,e)=>{for(var o in e)t.o(e,o)&&!t.o(r,o)&&Object.defineProperty(r,o,{enumerable:!0,get:e[o]})},t.o=(r,e)=>Object.prototype.hasOwnProperty.call(r,e),(()=>{var r={6598:0,7882:0};t.O.j=e=>0===r[e];var e=(e,o)=>{var p,s,a=o[0],n=o[1],i=o[2],l=0;if(a.some((e=>0!==r[e]))){for(p in n)t.o(n,p)&&(t.m[p]=n[p]);if(i)var c=i(t)}for(e&&e(o);l<a.length;l++)s=a[l],t.o(r,s)&&r[s]&&r[s][0](),r[s]=0;return t.O(c)},o=self.webpackChunk_pewresearch_prc_block_library=self.webpackChunk_pewresearch_prc_block_library||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))})();var p=t.O(void 0,[7882],(()=>t(180)));p=t.O(p)})();
//# sourceMappingURL=index.js.map