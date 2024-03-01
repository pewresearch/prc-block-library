(()=>{"use strict";var e,t={873:(e,t,l)=>{const n=window.wp.i18n,a=window.wp.blocks,o=window.wp.element,r=window.prcComponents,i=window.prcBlockUtils,c=window.wp.blockEditor,s=window.wp.components,p=window.classnames;var d=l.n(p);const u=window.wp.data,m=window.wp.apiFetch;var g=l.n(m);const f=window.wp.url;function h(e){let{clientId:t}=e;const l=(0,u.useSelect)((e=>{const{getEditedPostAttribute:t}=e("core/editor");return t("collection")}),[t]),{isResolving:a,records:r,parentTerm:i,altLanguagePosts:p}=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];const[t,l]=(0,o.useState)(null),[n,a]=(0,o.useState)(null),[r,i]=(0,o.useState)([]),[c,s]=(0,o.useState)([]),[p,d]=(0,o.useState)(!0),u=(0,o.useMemo)((()=>e[0]),[e]);(0,o.useEffect)((()=>{console.log("firstTermId",u),u&&(d(!0),g()({path:`/wp/v2/collection/${u}`}).then((e=>{console.log("firstTerm",e);const t=e?.parent;l(t),g()({path:`/wp/v2/collection/${t}`}).then((e=>{console.log("parentTerm",e),a(e)}))})))}),[u]),(0,o.useEffect)((()=>{console.log("parentTermId",t),t&&(d(!0),g()({path:`/wp/v2/collection?parent=${t}`}).then((e=>{console.log("terms",e),s(e),d(!1)})))}),[t]),(0,o.useEffect)((()=>{if(t&&u&&n){d(!0);const e=(0,f.addQueryArgs)("/wp/v2/fact-sheet",{collection:u,languages_exclude:478,status:"publish,draft"});g()({path:e}).then((e=>{i(e),d(!1)}))}}),[t,u,n]);const{parentTerm:m,records:h}=(0,o.useMemo)((()=>({parentTerm:n,records:c})),[n,c]);return{parentTerm:m,records:h,isResolving:p,altLanguagePosts:r}}(l);return(0,o.createElement)(o.Fragment,null,a&&(0,o.createElement)(c.Warning,null,(0,o.createElement)(s.Flex,null,(0,o.createElement)(s.FlexItem,null,(0,o.createElement)(s.Spinner,null)),(0,o.createElement)(s.FlexBlock,null,(0,n.__)("Loading Collection...","prc-block-library")))),!a&&(0,o.createElement)(o.Fragment,null,(0,o.createElement)("div",{className:"wp-block-prc-block-fact-sheet-collection--parent-term"},`${i?.name}`),p?.length>0&&(0,o.createElement)("div",{className:"wp-block-prc-block-fact-sheet-collection--alt-languages"},p?.map((e=>(0,o.createElement)("div",{className:"wp-block-prc-block-fact-sheet-collection--alt-language-link",key:Math.random().toString(10).substring(7)},`${e.title.rendered}`)))),(0,o.createElement)("div",{className:"wp-block-prc-block-fact-sheet-collection--term-list"},r?.map((e=>{const t=l.includes(e.id);return(0,o.createElement)(o.Fragment,{key:Math.random().toString(10).substring(7)},(0,o.createElement)("div",{className:d()("wp-block-prc-block-fact-sheet-collection--term-link",{"is-active":t}),key:Math.random().toString(10).substring(7)},`${e.name}`))})))))}const w=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/fact-sheet-collection","version":"1.0.0","title":"Fact Sheet Collection","category":"design","description":"Display the hierarchy of this fact sheet\'s collection term and a link to download an associated PDF if provided. If this collection has multiple language posts the main link will link to the English language post and then a listing of other languages will be provided automatically. These alternate language links will appear above the main collection.","attributes":{"pdf":{"type":"object"},"altPostLabel":{"type":"string"},"style":{"type":"object","default":{"spacing":{"blockGap":"var:preset|spacing|20"}}}},"supports":{"anchor":true,"html":false,"color":{"background":true,"text":false,"link":true},"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"usesContext":["postId","postType"],"example":{"attributes":{}},"styles":[{"name":"list","label":"List","isDefault":true}],"textdomain":"collection","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}'),{name:b}=w,k={icon:function(){return(0,o.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",height:21,preserveAspectRatio:"xMidYMid meet"},(0,o.createElement)(s.Path,{d:"M32 24c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H56C42.7 0 32 10.7 32 24zM48 160c-13.8 0-26.9 5.9-36 16.2S-1.3 200.3 .4 214l32 256c3 24 23.4 42 47.6 42H432c24.2 0 44.6-18 47.6-42l32-256c1.7-13.7-2.5-27.4-11.6-37.7s-22.2-16.2-36-16.2H48zM440 344c0 75.1-82.4 136-184 136S72 419.1 72 344s82.4-136 184-136s184 60.9 184 136zM256 376c17.7 0 32-10.7 32-24s-14.3-24-32-24s-32 10.7-32 24s14.3 24 32 24zM40 80c-13.3 0-24 10.7-24 24s10.7 24 24 24H472c13.3 0 24-10.7 24-24s-10.7-24-24-24H40z"}))},edit:function(e){let{attributes:t,setAttributes:l,clientId:n}=e;const{className:a,pdf:p}=t,d=void 0!==a?a.split(" "):[],{id:u}=p||{id:!1},m=(0,c.useBlockProps)({style:{gap:(0,i.getBlockGapSupportValue)(t)}});return(0,o.createElement)("div",m,!d.includes("is-style-dropdown")&&(0,o.createElement)(h,{clientId:n}),(0,o.createElement)(r.MediaDropZone,{className:"wp-block-prc-block-fact-sheet-collection--pdf-link",attachmentId:u,onUpdate:e=>{const t={id:e.id,slug:e.slug,title:e.title,link:e.link,description:e.description,caption:e.caption,alt_text:e.alt_text,media_type:e.media_type,mime_type:e.mime_type,media_details:e.media_details,post:e.post,source_url:e.source_url};l({pdf:t})},onClear:()=>l({pdf:null}),mediaType:["application/pdf"],label:"Upload Fact Sheet PDF",singularLabel:"PDF"},(0,o.createElement)(s.Button,{variant:"secondary",label:"Update PDF",icon:"pdf"},"Update "+(p?`${p.title}.pdf`:"PDF"))))},save:function(e){let{attributes:t}=e;return(0,o.createElement)(c.InnerBlocks.Content,null)}};(0,a.registerBlockType)(b,{...w,...k})}},l={};function n(e){var a=l[e];if(void 0!==a)return a.exports;var o=l[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=(t,l,a,o)=>{if(!l){var r=1/0;for(p=0;p<e.length;p++){l=e[p][0],a=e[p][1],o=e[p][2];for(var i=!0,c=0;c<l.length;c++)(!1&o||r>=o)&&Object.keys(n.O).every((e=>n.O[e](l[c])))?l.splice(c--,1):(i=!1,o<r&&(r=o));if(i){e.splice(p--,1);var s=a();void 0!==s&&(t=s)}}return t}o=o||0;for(var p=e.length;p>0&&e[p-1][2]>o;p--)e[p]=e[p-1];e[p]=[l,a,o]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var l in t)n.o(t,l)&&!n.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};n.O.j=t=>0===e[t];var t=(t,l)=>{var a,o,r=l[0],i=l[1],c=l[2],s=0;if(r.some((t=>0!==e[t]))){for(a in i)n.o(i,a)&&(n.m[a]=i[a]);if(c)var p=c(n)}for(t&&t(l);s<r.length;s++)o=r[s],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(p)},l=self.webpackChunkfact_sheet_collection=self.webpackChunkfact_sheet_collection||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))})();var a=n.O(void 0,[431],(()=>n(873)));a=n.O(a)})();
//# sourceMappingURL=index.js.map