(()=>{"use strict";var e,t={647:()=>{const e=window.wp.element,t=window.wp.primitives,r=(0,e.createElement)(t.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(t.Path,{d:"M3.445 16.505a.75.75 0 001.06.05l5.005-4.55 4.024 3.521 4.716-4.715V14h1.5V8.25H14v1.5h3.19l-3.724 3.723L9.49 9.995l-5.995 5.45a.75.75 0 00-.05 1.06z"})),o=window.wp.i18n,l=window.wp.blocks,n=window.wp.blockEditor,i=window.wp.data,a=window.prcComponents;function s(t){let{attributes:r,setAttributes:o,context:l}=t;return(0,e.createElement)(n.BlockControls,null,(0,e.createElement)(a.URLSearchToolbar,{attributes:r,setAttributes:o,onSelect:e=>{o(e)}}))}const c=window.wp.components,p=window.wp.coreData;function u(t){let{attributes:l,setAttributes:n,blockProps:i}=t;const[s]=(0,p.useEntityProp)("root","site","siteId"),u=1===s?"stub":"post";return(0,e.createElement)("div",i,(0,e.createElement)(c.Placeholder,{icon:r,label:(0,o.__)(" Popular Post","prc-block-library"),isColumnLayout:!0,instructions:(0,o.__)(`Search for a ${u} or paste url here`,"prc-block-library")},(0,e.createElement)(a.URLSearchField,{attributes:l,setAttributes:n,disableImage:!0,onSelect:e=>{const{title:t,url:r,postId:o}=e;n({title:t,url:r,postId:o})}}),(0,e.createElement)(c.Button,{isLink:!0,onClick:()=>{n({postId:0})},text:(0,o.__)("Skip"),style:{paddingLeft:"9px",marginTop:"10px"}})))}const d=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/popular-story","version":"0.1.0","description":"A popular post, must be placed in a group block for numbers to appear.","title":"Popular Story","category":"design","attributes":{"title":{"type":"string"},"url":{"type":"string","default":""},"postId":{"type":"integer"},"blockIndexAttr":{"type":"integer"},"enableNumber":{"type":"boolean"}},"supports":{"anchor":true,"html":false,"spacing":{"margin":["top","bottom"],"padding":true},"typography":{"fontSize":true,"__experimentalFontFamily":true}},"textdomain":"popular-story","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}'),{name:b}=d,m={icon:r,edit:function(t){let{attributes:r,setAttributes:o,context:a,clientId:c,isSelected:p,insertBlocksAfter:d}=t;const{postId:b,title:m}=r,k=(0,n.useBlockProps)(),{blockIndex:w,numberEnabled:g}=(0,i.useSelect)((e=>{const t=e("core/block-editor").getBlockRootClientId(c);if(null==t||"string"==typeof t&&0===t.length)return{blockIndex:null,numberEnabled:!1};let r;return"core/group"===e("core/block-editor").getBlock(t).name&&(r=e("core/block-editor").getBlockIndex(c,t)),{blockIndex:r,numberEnabled:!0}}),[c]);return(0,e.useEffect)((()=>{o({blockIndexAttr:w}),o(!0===g?{enableNumber:!0}:{enableNumber:!1})}),[w]),void 0===b?(0,e.createElement)(u,{attributes:r,setAttributes:o,blockProps:k}):(0,e.createElement)(e.Fragment,null,(0,e.createElement)(s,{attributes:r,setAttributes:o,context:!1}),(0,e.createElement)("div",k,g&&0<=w&&(0,e.createElement)("span",{className:"big-number"},w+1),!0!==p&&(0,e.createElement)(n.RichText.Content,{className:"title",tagName:"h2",value:m}),!0===p&&(0,e.createElement)(n.RichText,{tagName:"h2",value:m,allowedFormats:["core/bold","core/italic"],onChange:e=>o({title:e}),placeholder:"Political Typology",keepPlaceholderOnFocus:!0,className:"title",multiline:!1,disableLineBreaks:!0,__unstableOnSplitAtEnd:()=>d((0,l.createBlock)("prc-block/popular-story"))})))}};(0,l.registerBlockType)(b,{...d,...m})}},r={};function o(e){var l=r[e];if(void 0!==l)return l.exports;var n=r[e]={exports:{}};return t[e](n,n.exports,o),n.exports}o.m=t,e=[],o.O=(t,r,l,n)=>{if(!r){var i=1/0;for(p=0;p<e.length;p++){r=e[p][0],l=e[p][1],n=e[p][2];for(var a=!0,s=0;s<r.length;s++)(!1&n||i>=n)&&Object.keys(o.O).every((e=>o.O[e](r[s])))?r.splice(s--,1):(a=!1,n<i&&(i=n));if(a){e.splice(p--,1);var c=l();void 0!==c&&(t=c)}}return t}n=n||0;for(var p=e.length;p>0&&e[p-1][2]>n;p--)e[p]=e[p-1];e[p]=[r,l,n]},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var l,n,i=r[0],a=r[1],s=r[2],c=0;if(i.some((t=>0!==e[t]))){for(l in a)o.o(a,l)&&(o.m[l]=a[l]);if(s)var p=s(o)}for(t&&t(r);c<i.length;c++)n=i[c],o.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return o.O(p)},r=self.webpackChunkpopular_story=self.webpackChunkpopular_story||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var l=o.O(void 0,[431],(()=>o(647)));l=o.O(l)})();
//# sourceMappingURL=index.js.map