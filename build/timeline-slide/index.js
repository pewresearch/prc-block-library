(()=>{"use strict";var e,t={380:()=>{const e=window.wp.blocks,t=window.wp.blockEditor,r=window.wp.element,n=window.wp.data,o=window.ReactJSXRuntime,i=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/timeline-slide","title":"Timeline Slide","version":"1.0.0","category":"design","attributes":{"metadata":{"type":"object","default":{"name":"2020"}}},"supports":{"anchor":true,"html":false,"reusable":false,"interactivity":true,"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"parent":["prc-block/timeline"],"usesContext":["timeline/currentActiveIndex"],"textdomain":"timeline-slide","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}'),{name:l}=i,s={edit:function({attributes:e,setAttributes:i,clientId:l,isSelected:s,context:c}){const{blockIndex:a,hasChildBlocks:d,hasInnerBlocksSelected:p,isRootSelected:u,isRootDeepSelected:k,timelineClientId:h}=(0,n.useSelect)((e=>{const r=e(t.store).getBlockRootClientId(l);return{blockIndex:e(t.store).getBlockIndex(l)+1,hasChildBlocks:e(t.store).getBlockOrder(l).length>0,hasInnerBlocksSelected:e(t.store).hasSelectedInnerBlock(l,!0),timelineClientId:r,isRootSelected:e(t.store).isBlockSelected(r),isRootDeepSelected:e(t.store).hasSelectedInnerBlock(r,!0)}}),[l]),{updateBlockAttributes:m}=(0,n.useDispatch)(t.store);(0,r.useEffect)((()=>{!0===s&&(console.log("Updating the parent timeline block's current active index",s,h,a),m(h,{currentActiveIndex:a}))}),[a,h,s]);const f=(0,r.useMemo)((()=>s||p||c&&a===c["timeline/currentActiveIndex"]),[s,p,c]),b=(0,t.useBlockProps)({hidden:!f}),v=(0,t.useInnerBlocksProps)({role:"tabpanel"},{renderAppender:d?void 0:t.InnerBlocks.ButtonBlockAppender});return(0,o.jsx)("div",{...b,children:f&&(0,o.jsx)("section",{...v})})},save:function(){return(0,o.jsx)(t.InnerBlocks.Content,{})}};(0,e.registerBlockType)(l,{...i,...s})}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,n),i.exports}n.m=t,e=[],n.O=(t,r,o,i)=>{if(!r){var l=1/0;for(d=0;d<e.length;d++){r=e[d][0],o=e[d][1],i=e[d][2];for(var s=!0,c=0;c<r.length;c++)(!1&i||l>=i)&&Object.keys(n.O).every((e=>n.O[e](r[c])))?r.splice(c--,1):(s=!1,i<l&&(l=i));if(s){e.splice(d--,1);var a=o();void 0!==a&&(t=a)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[r,o,i]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,i,l=r[0],s=r[1],c=r[2],a=0;if(l.some((t=>0!==e[t]))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(c)var d=c(n)}for(t&&t(r);a<l.length;a++)i=l[a],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(d)},r=self.webpackChunk_pewresearch_prc_block_library=self.webpackChunk_pewresearch_prc_block_library||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=n.O(void 0,[350],(()=>n(380)));o=n.O(o)})();
//# sourceMappingURL=index.js.map