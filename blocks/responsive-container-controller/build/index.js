(()=>{"use strict";var e,r={932:()=>{const e=window.wp.blocks,r=window.React,o=window.wp.blockEditor,t=["prc-block/responsive-container-view"],n=[["prc-block/responsive-container-view",{deviceType:"desktop",min:980,max:0}],["prc-block/responsive-container-view",{deviceType:"tablet",min:480,max:979}],["prc-block/responsive-container-view",{deviceType:"mobile",min:0,max:479}]],i=window.prcIcons,s=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/responsive-container-controller","version":"0.1.0","title":"Responsive Container","description":"A set of blocks to display content at specific viewport widths.","keywords":["ai2html","illustrator","responsive","container","Illustrator","AI2HTML"],"category":"design","attributes":{},"supports":{"anchor":true,"html":false,"align":["left","right","wide","full"],"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true},"typography":{"fontSize":true,"__experimentalFontFamily":true}},"textdomain":"responsive-container-controller","editorScript":"file:./index.js","style":"file:./style-index.css"}'),{name:c}=s,l={icon:function(){return(0,r.createElement)(i.Icon,{icon:i.icons.faLaptopMobile,width:21,preserveAspectRatio:"xMidYMid meet"})},edit:function({isSelected:e}){const i=(0,o.useBlockProps)(),s=(0,o.useInnerBlocksProps)(i,{allowedBlocks:t,orientation:"vertical",templateLock:!1,template:n,renderAppender:!!e&&o.InnerBlocks.ButtonBlockAppender});return(0,r.createElement)("div",{...s})},save:function(){return(0,r.createElement)(o.InnerBlocks.Content,null)}};(0,e.registerBlockType)(c,{...s,...l})}},o={};function t(e){var n=o[e];if(void 0!==n)return n.exports;var i=o[e]={exports:{}};return r[e](i,i.exports,t),i.exports}t.m=r,e=[],t.O=(r,o,n,i)=>{if(!o){var s=1/0;for(p=0;p<e.length;p++){for(var[o,n,i]=e[p],c=!0,l=0;l<o.length;l++)(!1&i||s>=i)&&Object.keys(t.O).every((e=>t.O[e](o[l])))?o.splice(l--,1):(c=!1,i<s&&(s=i));if(c){e.splice(p--,1);var a=n();void 0!==a&&(r=a)}}return r}i=i||0;for(var p=e.length;p>0&&e[p-1][2]>i;p--)e[p]=e[p-1];e[p]=[o,n,i]},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e={57:0,350:0};t.O.j=r=>0===e[r];var r=(r,o)=>{var n,i,[s,c,l]=o,a=0;if(s.some((r=>0!==e[r]))){for(n in c)t.o(c,n)&&(t.m[n]=c[n]);if(l)var p=l(t)}for(r&&r(o);a<s.length;a++)i=s[a],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(p)},o=globalThis.webpackChunkresponsive_container_controller=globalThis.webpackChunkresponsive_container_controller||[];o.forEach(r.bind(null,0)),o.push=r.bind(null,o.push.bind(o))})();var n=t.O(void 0,[350],(()=>t(932)));n=t.O(n)})();
//# sourceMappingURL=index.js.map