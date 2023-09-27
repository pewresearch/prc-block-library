!function(){"use strict";var e,t={583:function(){window.wp.i18n;var e=window.wp.blocks,t=window.wp.element,n=window.wp.blockEditor,r=window.wp.coreData,o=window.wp.data;window.wp.components;const i=["core/group","core/paragraph"];var a=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/attachment-info","version":"0.1.0","title":"Attachment Info","category":"text","description":"Displays the titles of other images attached to a post.","attributes":{"allowedBlocks":{"type":"array"},"orientation":{"type":"string","default":"vertical"}},"supports":{"anchor":true,"html":false,"spacing":{"blockGap":false,"margin":["top","bottom"],"padding":false,"__experimentalDefaultControls":{"padding":false}},"typography":{"fontSize":false,"__experimentalFontFamily":false,"__experimentalDefaultControls":{"fontSize":false,"__experimentalFontFamily":false}}},"usesContext":["postId","postType"],"textdomain":"attachment-info","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');const{name:l}=a,s={edit:function({attributes:e,setAttributes:a,context:l,clientId:s,isSelected:c}){const d=(0,n.useBlockProps)(),{allowedBlocks:p,orientation:u}=e,f=(0,n.useInnerBlocksProps)(d,{allowedBlocks:p||i,orientation:u||"vertical"});return(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",{...f},(0,t.createElement)((()=>{console.log({context:l});const{records:e,isResolving:n}=(0,r.useEntityRecords)("postType","attachment",{per_page:50,context:"view",parent:l.postId,status:"inherit",media_type:"image",order_by:"date",order:"asc"}),{record:i,isResolving:a}=(0,r.useEntityRecord)("postType","post",l.postId);console.log({parentRecord:i,parentIsResolving:a});const s=(0,o.select)("core/editor").getPermalink(l.postId);return n?(0,t.createElement)("div",null,"Loading..."):e?(console.log({records:e}),(0,t.createElement)("div",{role:"list",className:"ui divided relaxed link list"},(0,t.createElement)("a",{href:s},i.title.rendered),e.filter((e=>""!==e.title.rendered&&e.title.rendered.includes(" "))).map((e=>(0,t.createElement)("div",{className:"item",key:e.id},(0,t.createElement)("a",{href:e.link},JSON.stringify(e.title.rendered))))))):(0,t.createElement)("div",null,"No attachments found.")}),null)))},save:function({attributes:e}){return(0,t.createElement)(n.InnerBlocks.Content,null)}};(0,e.registerBlockType)(l,{...a,...s})}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,r),i.exports}r.m=t,e=[],r.O=function(t,n,o,i){if(!n){var a=1/0;for(d=0;d<e.length;d++){n=e[d][0],o=e[d][1],i=e[d][2];for(var l=!0,s=0;s<n.length;s++)(!1&i||a>=i)&&Object.keys(r.O).every((function(e){return r.O[e](n[s])}))?n.splice(s--,1):(l=!1,i<a&&(a=i));if(l){e.splice(d--,1);var c=o();void 0!==c&&(t=c)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[n,o,i]},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,i,a=n[0],l=n[1],s=n[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(o in l)r.o(l,o)&&(r.m[o]=l[o]);if(s)var d=s(r)}for(t&&t(n);c<a.length;c++)i=a[c],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(d)},n=self.webpackChunkattachment_info=self.webpackChunkattachment_info||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var o=r.O(void 0,[431],(function(){return r(583)}));o=r.O(o)}();
//# sourceMappingURL=index.js.map