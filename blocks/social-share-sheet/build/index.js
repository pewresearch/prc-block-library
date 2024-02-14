(()=>{"use strict";var e,t={948:()=>{const e=window.wp.blocks,t=window.React,r=(window.wp.i18n,window.wp.element,window.wp.blockEditor),o=window.prcIcons;function n(){return(0,t.createElement)(o.Icon,{icon:o.icons.faUpFromBracket,width:21,preserveAspectRatio:"xMidYMid meet"})}const i=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/social-share-sheet","version":"0.1.0","title":"Social Share Sheet","category":"widgets","description":"Invokes a browser\'s native navigator.share share sheet. If the browser does not support the Web Share API, a fallback share sheet is displayed.","supports":{"anchor":true,"html":false,"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}},"interactivity":true},"usesContext":["postId","queryId","core/social-links/title","core/social-links/title","core/social-links/url","core/social-links/imageId","core/social-links/hashtags"],"parent":["core/social-links"],"textdomain":"social-share-sheet","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewModule":"file:./view.js"}'),{name:s}=i,a={icon:n,edit:function({context:e,clientId:o}){const i=(0,r.useBlockProps)();return(0,t.createElement)("button",{...i,onClick:e=>{e.preventDefault()},type:"button"},(0,t.createElement)("span",{className:"wp-block-prc-block-social-share-sheet__label"},"Share"),(0,t.createElement)(n,null))},save:function({attributes:e}){return(0,t.createElement)(r.InnerBlocks.Content,null)}};(0,e.registerBlockType)(s,{...i,...a})}},r={};function o(e){var n=r[e];if(void 0!==n)return n.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,r,n,i)=>{if(!r){var s=1/0;for(p=0;p<e.length;p++){for(var[r,n,i]=e[p],a=!0,l=0;l<r.length;l++)(!1&i||s>=i)&&Object.keys(o.O).every((e=>o.O[e](r[l])))?r.splice(l--,1):(a=!1,i<s&&(s=i));if(a){e.splice(p--,1);var c=n();void 0!==c&&(t=c)}}return t}i=i||0;for(var p=e.length;p>0&&e[p-1][2]>i;p--)e[p]=e[p-1];e[p]=[r,n,i]},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={656:0,564:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var n,i,[s,a,l]=r,c=0;if(s.some((t=>0!==e[t]))){for(n in a)o.o(a,n)&&(o.m[n]=a[n]);if(l)var p=l(o)}for(t&&t(r);c<s.length;c++)i=s[c],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(p)},r=globalThis.webpackChunksocial_share_sheet=globalThis.webpackChunksocial_share_sheet||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=o.O(void 0,[564],(()=>o(948)));n=o.O(n)})();
//# sourceMappingURL=index.js.map