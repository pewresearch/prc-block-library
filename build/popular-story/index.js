(()=>{"use strict";var e,t={1033:()=>{const e=window.wp.i18n,t=window.wp.blocks,r=window.wp.element,o=window.wp.blockEditor,n=window.wp.data,l=window.prcComponents,i=window.ReactJSXRuntime;function s({attributes:e,setAttributes:t}){return(0,i.jsx)(o.BlockControls,{children:(0,i.jsx)(l.URLSearchToolbar,{postId:e.postId,postType:"post",disableImage:!0,onSelect:e=>{const{title:r,link:o,id:n}=e;t({title:r?.rendered,url:o,postId:n})}})})}const c=window.wp.components,a=(window.wp.coreData,window.prcIcons);function p(){return(0,i.jsx)(a.Icon,{icon:"fire"})}function d({attributes:t,setAttributes:r,blockProps:o}){return(0,i.jsx)("div",{...o,children:(0,i.jsxs)(c.Placeholder,{icon:(0,i.jsx)(p,{}),label:(0,e.__)(" Popular Post","prc-block-library"),isColumnLayout:!0,instructions:(0,e.__)("Search for a post or paste url here","prc-block-library"),children:[(0,i.jsx)(l.URLSearchField,{postId:t.postId,postType:"post",disableImage:!0,onSelect:e=>{const{title:t,link:o,id:n}=e;r({title:t?.rendered,url:o,postId:n})}}),(0,i.jsx)(c.Button,{variant:"link",onClick:()=>{r({postId:0})},text:(0,e.__)("Skip"),style:{paddingLeft:"9px",marginTop:"10px"}})]})})}const u=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/popular-story","version":"1.0.0","description":"A popular post, must be placed in a group block for numbers to appear.","title":"Popular Story","category":"content-curation","attributes":{"title":{"type":"string"},"url":{"type":"string","default":""},"postId":{"type":"integer"},"blockIndexAttr":{"type":"integer"},"enableNumber":{"type":"boolean"}},"supports":{"anchor":true,"html":false,"spacing":{"margin":["top","bottom"],"padding":true},"typography":{"fontSize":true,"__experimentalFontFamily":true}},"textdomain":"popular-story","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}'),{name:b}=u,k={icon:p,edit:function({attributes:e,setAttributes:l,context:c,clientId:a,isSelected:p,insertBlocksAfter:u}){const{postId:b,title:k}=e,m=(0,o.useBlockProps)(),{blockIndex:h,numberEnabled:x}=(0,n.useSelect)((e=>{const t=e("core/block-editor").getBlockRootClientId(a);if(null==t||"string"==typeof t&&0===t.length)return{blockIndex:null,numberEnabled:!1};let r;return"core/group"===e("core/block-editor").getBlock(t).name&&(r=e("core/block-editor").getBlockIndex(a,t)),{blockIndex:r,numberEnabled:!0}}),[a]);return(0,r.useEffect)((()=>{l({blockIndexAttr:h}),l(!0===x?{enableNumber:!0}:{enableNumber:!1})}),[h]),void 0===b?(0,i.jsx)(d,{attributes:e,setAttributes:l,blockProps:m}):(0,i.jsxs)(r.Fragment,{children:[(0,i.jsx)(s,{attributes:e,setAttributes:l,context:!1}),(0,i.jsxs)("div",{...m,children:[x&&0<=h&&(0,i.jsx)("span",{className:"big-number",children:h+1}),!0!==p&&(0,i.jsx)(o.RichText.Content,{className:"title",tagName:"h2",value:k}),!0===p&&(0,i.jsx)(o.RichText,{tagName:"h2",value:k,allowedFormats:["core/bold","core/italic"],onChange:e=>l({title:e}),placeholder:"Political Typology",keepPlaceholderOnFocus:!0,className:"title",multiline:!1,disableLineBreaks:!0,__unstableOnSplitAtEnd:()=>u((0,t.createBlock)("prc-block/popular-story"))})]})]})}};(0,t.registerBlockType)(b,{...u,...k})}},r={};function o(e){var n=r[e];if(void 0!==n)return n.exports;var l=r[e]={exports:{}};return t[e](l,l.exports,o),l.exports}o.m=t,e=[],o.O=(t,r,n,l)=>{if(!r){var i=1/0;for(p=0;p<e.length;p++){r=e[p][0],n=e[p][1],l=e[p][2];for(var s=!0,c=0;c<r.length;c++)(!1&l||i>=l)&&Object.keys(o.O).every((e=>o.O[e](r[c])))?r.splice(c--,1):(s=!1,l<i&&(i=l));if(s){e.splice(p--,1);var a=n();void 0!==a&&(t=a)}}return t}l=l||0;for(var p=e.length;p>0&&e[p-1][2]>l;p--)e[p]=e[p-1];e[p]=[r,n,l]},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={9179:0,9203:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var n,l,i=r[0],s=r[1],c=r[2],a=0;if(i.some((t=>0!==e[t]))){for(n in s)o.o(s,n)&&(o.m[n]=s[n]);if(c)var p=c(o)}for(t&&t(r);a<i.length;a++)l=i[a],o.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return o.O(p)},r=self.webpackChunk_pewresearch_prc_block_library=self.webpackChunk_pewresearch_prc_block_library||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=o.O(void 0,[9203],(()=>o(1033)));n=o.O(n)})();
//# sourceMappingURL=index.js.map