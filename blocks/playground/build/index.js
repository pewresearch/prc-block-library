(()=>{"use strict";var e,t={256:()=>{const e=window.wp.i18n,t=window.wp.blocks,o=window.React,n=window.wp.blockEditor,{prcPlayground:r}=window,l=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/playground","version":"0.1.0","title":"Playground","category":"design","description":"A dev only block: prc-block/playground provides a simple way to see all blocks and/or components at once, delete it and drop it back in to start fresh. We dont automatically include child blocks, but you can add them in the editor.","attributes":{"playgroundType":{"type":"string","enum":["blocks","components"],"default":"blocks"}},"supports":{"anchor":true,"html":false},"textdomain":"playground","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js"}'),{name:s}=l,a={edit:function({attributes:t,setAttributes:l,context:s,clientId:a,isSelected:i}){const{playgroundType:c}=t,p=(0,n.useBlockProps)(),d=(0,o.useMemo)((()=>"blocks"===c?r?.blockTemplate:[["core/paragraph",{content:(0,e.__)("Components Playground will render on the frontend.")}]]),[r,c]),u=(0,n.useInnerBlocksProps)(p,{template:d});return(0,o.createElement)(o.Fragment,null,(0,o.createElement)("div",{...u}))},save:function({attributes:e}){return(0,o.createElement)(n.InnerBlocks.Content,null)},variations:[{name:"blocks-playground",title:"Blocks Playground",isDefault:!0,attributes:{playgroundType:"blocks"},isActive:({playgroundType:e})=>"blocks"===e,scope:["block","inserter","transform"]},{name:"components-playground",title:"Components Playground",attributes:{playgroundType:"components"},isActive:({playgroundType:e})=>"components"===e,scope:["block","inserter","transform"]}]};(0,t.registerBlockType)(s,{...l,...a})}},o={};function n(e){var r=o[e];if(void 0!==r)return r.exports;var l=o[e]={exports:{}};return t[e](l,l.exports,n),l.exports}n.m=t,e=[],n.O=(t,o,r,l)=>{if(!o){var s=1/0;for(p=0;p<e.length;p++){for(var[o,r,l]=e[p],a=!0,i=0;i<o.length;i++)(!1&l||s>=l)&&Object.keys(n.O).every((e=>n.O[e](o[i])))?o.splice(i--,1):(a=!1,l<s&&(s=l));if(a){e.splice(p--,1);var c=r();void 0!==c&&(t=c)}}return t}l=l||0;for(var p=e.length;p>0&&e[p-1][2]>l;p--)e[p]=e[p-1];e[p]=[o,r,l]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};n.O.j=t=>0===e[t];var t=(t,o)=>{var r,l,[s,a,i]=o,c=0;if(s.some((t=>0!==e[t]))){for(r in a)n.o(a,r)&&(n.m[r]=a[r]);if(i)var p=i(n)}for(t&&t(o);c<s.length;c++)l=s[c],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(p)},o=globalThis.webpackChunkplayground=globalThis.webpackChunkplayground||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var r=n.O(void 0,[431],(()=>n(256)));r=n.O(r)})();
//# sourceMappingURL=index.js.map