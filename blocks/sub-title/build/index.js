(()=>{"use strict";var e,t={120:(e,t,r)=>{const o=window.wp.blocks,n=window.React,i=window.wp.primitives,a=(0,n.createElement)(i.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,n.createElement)(i.Path,{d:"m4 5.5h2v6.5h1.5v-6.5h2v-1.5h-5.5zm16 10.5h-16v-1.5h16zm-7 4h-9v-1.5h9z"})),l=window.classnames;var s=r.n(l);window.prcHooks;const p=window.wp.i18n,u=window.wp.element,c=window.wp.blockEditor,d=window.wp.coreData,m=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/subtitle","version":"0.1.0","title":"Sub-title","description":"Displays the sub-title of a post.","category":"layout","attributes":{"textAlign":{"type":"string"},"fontSize":{"type":"string","default":"h2"},"style":{"type":"object","default":{"typography":{"fontWeight":"400","fontStyle":"italic"}}}},"example":{"attributes":{"textAlign":"left"}},"supports":{"anchor":true,"html":false,"multiple":false,"color":{"text":true,"background":true},"spacing":{"margin":["top","bottom"],"padding":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true,"fontAppearance":true,"textTransform":true,"lineHeight":true}}},"usesContext":["postType","postId"],"textdomain":"post-sub-title","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php"}'),{name:h}=m,g={icon:a,edit:function({attributes:e,className:t,setAttributes:r,insertBlocksAfter:i,context:a}){const{textAlign:l}=e,{postId:m,postType:h}=a,[g,f]=(0,d.useEntityProp)("postType",h,"meta",m),w=g?.sub_headline||"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",b=(0,c.useBlockProps)({className:s()(t,{[`has-text-align-${l}`]:l})});return(0,n.createElement)(u.Fragment,null,(0,n.createElement)(c.BlockControls,null,(0,n.createElement)(c.AlignmentControl,{value:l,onChange:e=>{r({textAlign:e})}})),(0,n.createElement)("div",{...b},(0,n.createElement)(c.RichText,{tagName:"div",onChange:e=>void 0!==m&&f({...g,sub_headline:e}),allowedFormats:[],keepPlaceholderOnFocus:!0,value:w,placeholder:(0,p.__)("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"),disableLineBreaks:!0,__unstableOnSplitAtEnd:()=>i((0,o.createBlock)((0,o.getDefaultBlockName)()))})))}};(0,o.registerBlockType)(h,{...m,...g})}},r={};function o(e){var n=r[e];if(void 0!==n)return n.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,r,n,i)=>{if(!r){var a=1/0;for(u=0;u<e.length;u++){for(var[r,n,i]=e[u],l=!0,s=0;s<r.length;s++)(!1&i||a>=i)&&Object.keys(o.O).every((e=>o.O[e](r[s])))?r.splice(s--,1):(l=!1,i<a&&(a=i));if(l){e.splice(u--,1);var p=n();void 0!==p&&(t=p)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[r,n,i]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var n,i,[a,l,s]=r,p=0;if(a.some((t=>0!==e[t]))){for(n in l)o.o(l,n)&&(o.m[n]=l[n]);if(s)var u=s(o)}for(t&&t(r);p<a.length;p++)i=a[p],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(u)},r=globalThis.webpackChunksubtitle=globalThis.webpackChunksubtitle||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=o.O(void 0,[350],(()=>o(120)));n=o.O(n)})();
//# sourceMappingURL=index.js.map