(()=>{"use strict";var e,t={766:()=>{const e=window.wp.blocks,t=window.React,o=window.prcBlockUtils,r=(window.wp.i18n,window.wp.element),n=window.wp.blockEditor,s=window.wp.data,l=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/footnotes","version":"0.1.0","title":"Footnotes","category":"theme","description":"A unique take on footnotes. Supports numoffset.","attributes":{"numoffset":{"type":"number","default":0},"style":{"type":"object","default":{"spacing":{"blockGap":"var:preset|spacing|20"}}}},"supports":{"anchor":true,"html":false,"color":{"background":true,"text":true,"link":true},"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"__experimentalBorder":{"color":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"style":true,"width":true}},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"usesContext":["postId"],"textdomain":"footnotes","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}'),{name:a}=l,i={edit:function({attributes:e,setAttributes:l,context:a,clientId:i,isSelected:p}){const c=function(){const[e,o]=(0,t.useState)([]),r=(0,s.useSelect)((e=>e("core/editor").getEditedPostContent()));return(0,t.useMemo)((()=>{const e=r.match(/\[\d+\.\s(.*?)(?:\s\w+=".*?")?\]/g)?.map((e=>e.match(/\[\d+\.\s(.*?)(?:\s\w+=".*?")?\]/)?.[1]));o(e||["No footnotes found.","Add a footnote using the [1. Footnote] shortcode.","Add a footnote using the [2. Footnote] shortcode."])}),[r]),e}(),u=c.map(((e,o)=>(0,t.createElement)("li",{key:`footnote-${o}`,className:"wp-block-prc-block-footnotes__footnote"},(0,t.createElement)("span",null,(0,t.createElement)(r.RawHTML,null,e)),(0,t.createElement)("span",{className:"wp-block-prc-block-footnotes__footnote__return"},"↩")))),d=(0,n.useBlockProps)({style:{"--block-gap":(0,o.getBlockGapSupportValue)(e)}});return console.log("footnotes",c),(0,t.createElement)("ol",{...d},u)}};(0,e.registerBlockType)(a,{...l,...i})}},o={};function r(e){var n=o[e];if(void 0!==n)return n.exports;var s=o[e]={exports:{}};return t[e](s,s.exports,r),s.exports}r.m=t,e=[],r.O=(t,o,n,s)=>{if(!o){var l=1/0;for(c=0;c<e.length;c++){for(var[o,n,s]=e[c],a=!0,i=0;i<o.length;i++)(!1&s||l>=s)&&Object.keys(r.O).every((e=>r.O[e](o[i])))?o.splice(i--,1):(a=!1,s<l&&(l=s));if(a){e.splice(c--,1);var p=n();void 0!==p&&(t=p)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[o,n,s]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};r.O.j=t=>0===e[t];var t=(t,o)=>{var n,s,[l,a,i]=o,p=0;if(l.some((t=>0!==e[t]))){for(n in a)r.o(a,n)&&(r.m[n]=a[n]);if(i)var c=i(r)}for(t&&t(o);p<l.length;p++)s=l[p],r.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return r.O(c)},o=globalThis.webpackChunkfootnotes=globalThis.webpackChunkfootnotes||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var n=r.O(void 0,[350],(()=>r(766)));n=r.O(n)})();
//# sourceMappingURL=index.js.map