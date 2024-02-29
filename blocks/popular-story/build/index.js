(()=>{"use strict";var e,t={462:()=>{const e=window.wp.i18n,t=window.wp.blocks,r=window.React,o=window.wp.element,n=window.wp.blockEditor,l=window.wp.data,i=window.prcComponents;function a({attributes:e,setAttributes:t,context:o}){return(0,r.createElement)(n.BlockControls,null,(0,r.createElement)(i.URLSearchToolbar,{postId:e.postId,postType:"post",disableImage:!0,onSelect:e=>{const{title:r,link:o,id:n}=e;t({title:r?.rendered,url:o,postId:n})}}))}const c=window.wp.components,s=(window.wp.coreData,window.prcIcons);function p(){return(0,r.createElement)(s.Icon,{icon:s.icons.faFire,height:18,preserveAspectRatio:"xMidYMid meet"})}function u({attributes:t,setAttributes:o,blockProps:n}){return(0,r.createElement)("div",{...n},(0,r.createElement)(c.Placeholder,{icon:(0,r.createElement)(p,null),label:(0,e.__)(" Popular Post","prc-block-library"),isColumnLayout:!0,instructions:(0,e.__)("Search for a post or paste url here","prc-block-library")},(0,r.createElement)(i.URLSearchField,{postId:t.postId,postType:"post",disableImage:!0,onSelect:e=>{const{title:t,link:r,id:n}=e;o({title:t?.rendered,url:r,postId:n})}}),(0,r.createElement)(c.Button,{variant:"link",onClick:()=>{o({postId:0})},text:(0,e.__)("Skip"),style:{paddingLeft:"9px",marginTop:"10px"}})))}const d=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/popular-story","version":"0.1.0","description":"A popular post, must be placed in a group block for numbers to appear.","title":"Popular Story","category":"content-curation","attributes":{"title":{"type":"string"},"url":{"type":"string","default":""},"postId":{"type":"integer"},"blockIndexAttr":{"type":"integer"},"enableNumber":{"type":"boolean"}},"supports":{"anchor":true,"html":false,"spacing":{"margin":["top","bottom"],"padding":true},"typography":{"fontSize":true,"__experimentalFontFamily":true}},"textdomain":"popular-story","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}'),{name:b}=d,m={icon:p,edit:function({attributes:e,setAttributes:i,context:c,clientId:s,isSelected:p,insertBlocksAfter:d}){const{postId:b,title:m}=e,k=(0,n.useBlockProps)(),{blockIndex:g,numberEnabled:h}=(0,l.useSelect)((e=>{const t=e("core/block-editor").getBlockRootClientId(s);if(null==t||"string"==typeof t&&0===t.length)return{blockIndex:null,numberEnabled:!1};let r;return"core/group"===e("core/block-editor").getBlock(t).name&&(r=e("core/block-editor").getBlockIndex(s,t)),{blockIndex:r,numberEnabled:!0}}),[s]);return(0,o.useEffect)((()=>{i({blockIndexAttr:g}),i(!0===h?{enableNumber:!0}:{enableNumber:!1})}),[g]),void 0===b?(0,r.createElement)(u,{attributes:e,setAttributes:i,blockProps:k}):(0,r.createElement)(o.Fragment,null,(0,r.createElement)(a,{attributes:e,setAttributes:i,context:!1}),(0,r.createElement)("div",{...k},h&&0<=g&&(0,r.createElement)("span",{className:"big-number"},g+1),!0!==p&&(0,r.createElement)(n.RichText.Content,{className:"title",tagName:"h2",value:m}),!0===p&&(0,r.createElement)(n.RichText,{tagName:"h2",value:m,allowedFormats:["core/bold","core/italic"],onChange:e=>i({title:e}),placeholder:"Political Typology",keepPlaceholderOnFocus:!0,className:"title",multiline:!1,disableLineBreaks:!0,__unstableOnSplitAtEnd:()=>d((0,t.createBlock)("prc-block/popular-story"))})))}};(0,t.registerBlockType)(b,{...d,...m})}},r={};function o(e){var n=r[e];if(void 0!==n)return n.exports;var l=r[e]={exports:{}};return t[e](l,l.exports,o),l.exports}o.m=t,e=[],o.O=(t,r,n,l)=>{if(!r){var i=1/0;for(p=0;p<e.length;p++){for(var[r,n,l]=e[p],a=!0,c=0;c<r.length;c++)(!1&l||i>=l)&&Object.keys(o.O).every((e=>o.O[e](r[c])))?r.splice(c--,1):(a=!1,l<i&&(i=l));if(a){e.splice(p--,1);var s=n();void 0!==s&&(t=s)}}return t}l=l||0;for(var p=e.length;p>0&&e[p-1][2]>l;p--)e[p]=e[p-1];e[p]=[r,n,l]},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var n,l,[i,a,c]=r,s=0;if(i.some((t=>0!==e[t]))){for(n in a)o.o(a,n)&&(o.m[n]=a[n]);if(c)var p=c(o)}for(t&&t(r);s<i.length;s++)l=i[s],o.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return o.O(p)},r=globalThis.webpackChunkpopular_story=globalThis.webpackChunkpopular_story||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=o.O(void 0,[350],(()=>o(462)));n=o.O(n)})();
//# sourceMappingURL=index.js.map