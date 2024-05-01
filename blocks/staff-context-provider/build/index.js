(()=>{"use strict";var e,t={519:()=>{window.wp.i18n;const e=window.wp.blocks,t=window.React,o=(window.wp.element,window.wp.blockEditor),r=["core/group","core/paragraph","prc-block/staff-info"],n=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/staff-context-provider","version":"0.1.0","title":"Staff Context Provider","category":"widgets","description":"Provides information about a Staff member via termId and passes that information via block context to its innerblocks.","attributes":{"allowedBlocks":{"type":"array"},"orientation":{"type":"string","default":"vertical"}},"supports":{"anchor":true,"html":false},"usesContext":["postId","postType"],"textdomain":"staff-context-provider","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}'),{name:i}=n,s={edit:function({attributes:e,setAttributes:n,context:i,clientId:s,isSelected:a}){const l=(0,o.useBlockProps)(),{allowedBlocks:c,orientation:p}=e,d=(0,o.useInnerBlocksProps)(l,{allowedBlocks:c||r,orientation:p||"vertical"});return(0,t.createElement)("div",{...d})},save:function({attributes:e}){return(0,t.createElement)(o.InnerBlocks.Content,null)}};(0,e.registerBlockType)(i,{...n,...s})}},o={};function r(e){var n=o[e];if(void 0!==n)return n.exports;var i=o[e]={exports:{}};return t[e](i,i.exports,r),i.exports}r.m=t,e=[],r.O=(t,o,n,i)=>{if(!o){var s=1/0;for(p=0;p<e.length;p++){for(var[o,n,i]=e[p],a=!0,l=0;l<o.length;l++)(!1&i||s>=i)&&Object.keys(r.O).every((e=>r.O[e](o[l])))?o.splice(l--,1):(a=!1,i<s&&(s=i));if(a){e.splice(p--,1);var c=n();void 0!==c&&(t=c)}}return t}i=i||0;for(var p=e.length;p>0&&e[p-1][2]>i;p--)e[p]=e[p-1];e[p]=[o,n,i]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};r.O.j=t=>0===e[t];var t=(t,o)=>{var n,i,[s,a,l]=o,c=0;if(s.some((t=>0!==e[t]))){for(n in a)r.o(a,n)&&(r.m[n]=a[n]);if(l)var p=l(r)}for(t&&t(o);c<s.length;c++)i=s[c],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(p)},o=globalThis.webpackChunkstaff_context_provider=globalThis.webpackChunkstaff_context_provider||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var n=r.O(void 0,[431],(()=>r(519)));n=r.O(n)})();
//# sourceMappingURL=index.js.map