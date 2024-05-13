!function(){"use strict";var e,t={213:function(e,t,n){var o=window.wp.blocks,r=window.React,s=window.prcComponents,i=window.wp.blockEditor,a=window.wp.apiFetch,c=n.n(a),l=window.wp.i18n,f=window.wp.components;function u({staffId:e,setAttributes:t}){return(0,r.createElement)(i.InspectorControls,null,(0,r.createElement)(f.PanelBody,{title:(0,l.__)("Staff Context Provider")},(0,r.createElement)(s.WPEntitySearch,{placeholder:"Search for Staff",searchLabel:"Search for Staff",entityType:"postType",entitySubType:"staff",onSelect:e=>{console.log("Staff: ",e),t({staffSlug:e.slug})},onKeyEnter:()=>{console.log("Enter Key Pressed")},onKeyESC:()=>{console.log("ESC Key Pressed")},perPage:5,showExcerpt:!1})))}const p=["core/group","core/paragraph","core/button","prc-block/staff-info"];var d=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/staff-context-provider","version":"0.1.0","title":"Staff Context Provider","category":"widgets","description":"Provides information about a Staff member via termId and passes that information via block context to its innerblocks.","attributes":{"allowedBlocks":{"type":"array"},"orientation":{"type":"string","default":"vertical"},"staffSlug":{"type":"string"}},"supports":{"anchor":true,"html":false,"interactivity":true},"usesContext":["postId","postType"],"textdomain":"staff-context-provider","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');const{name:v}=d,h={edit:function({attributes:e,setAttributes:t,context:n,clientId:o,isSelected:a}){const{allowedBlocks:l,staffSlug:f}=e,{postId:d,postType:v}=n,[h,w]=(0,r.useState)(null);(0,r.useEffect)((()=>{d&&"staff"===v&&w(d);let e="";e=f||"michael-dimock",(async()=>{console.log("fetchStaffId",e),await c()({path:`/wp/v2/staff?slug=${e}&_fields=id`}).then((e=>{e&&e.length&&Object.prototype.hasOwnProperty.call(e[0],"id")?(console.log("...staff...",e),w(e[0].id)):w(null)})).catch((()=>{w(null)}))})()}),[d,v,f]);const y=(0,r.useMemo)((()=>[{staffId:h}]),[h]),m=(0,i.useBlockProps)();return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(u,{staffId:h,setAttributes:t}),(0,r.createElement)("div",{...m},(0,r.createElement)(s.InnerBlocksAsContextTemplate,{clientId:o,allowedBlocks:l||p,blockContexts:y,isResolving:!h})))},save:function({attributes:e}){return(0,r.createElement)(i.InnerBlocks.Content,null)}};(0,o.registerBlockType)(v,{...d,...h})}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var s=n[e]={exports:{}};return t[e](s,s.exports,o),s.exports}o.m=t,e=[],o.O=function(t,n,r,s){if(!n){var i=1/0;for(f=0;f<e.length;f++){n=e[f][0],r=e[f][1],s=e[f][2];for(var a=!0,c=0;c<n.length;c++)(!1&s||i>=s)&&Object.keys(o.O).every((function(e){return o.O[e](n[c])}))?n.splice(c--,1):(a=!1,s<i&&(i=s));if(a){e.splice(f--,1);var l=r();void 0!==l&&(t=l)}}return t}s=s||0;for(var f=e.length;f>0&&e[f-1][2]>s;f--)e[f]=e[f-1];e[f]=[n,r,s]},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,{a:t}),t},o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,s,i=n[0],a=n[1],c=n[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(r in a)o.o(a,r)&&(o.m[r]=a[r]);if(c)var f=c(o)}for(t&&t(n);l<i.length;l++)s=i[l],o.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return o.O(f)},n=self.webpackChunkstaff_context_provider=self.webpackChunkstaff_context_provider||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var r=o.O(void 0,[431],(function(){return o(213)}));r=o.O(r)}();
//# sourceMappingURL=index.js.map