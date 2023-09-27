(()=>{"use strict";var e,r={504:()=>{const e=window.wp.blocks,r=window.wp.element,o=window.wp.blockEditor,t=[["prc-block/popup-content",{}],["prc-block/popup-modal",{}]],p=["prc-block/popup-content","prc-block/popup-modal"],l=window.prcIcons,n=window.wp.i18n,i=[{name:"popup-standard",isDefault:!0,title:(0,n.__)("Popup Standard","prc-block-library"),excerpt:(0,n.__)("A standard popup.","prc-block-library"),attributes:{className:"is-style-standard"},innerBlocks:[["prc-block/popup-content",{},[["core/paragraph",{placeholder:(0,n.__)("Add content to trigger your popup here.","prc-block-library")}]]],["prc-block/popup-modal",{backgroundColor:"white"},[["core/paragraph",{placeholder:(0,n.__)("Add content inside the modal here.","prc-block-library")}]]]],scope:["inserter","transform"],isActive:e=>{let{className:r}=e;return!!r&&r.includes("is-style-standard")}},{name:"popup-video",title:(0,n.__)("Popup Video","prc-block-library"),excerpt:(0,n.__)("A video popup.","prc-block-library"),attributes:{className:"is-style-video"},keywords:[(0,n.__)("video","prc-block-library")],innerBlocks:[["prc-block/popup-content",{},[["core/paragraph",{placeholder:(0,n.__)("Add content to trigger your video popup here.","prc-block-library")}]]],["prc-block/popup-modal",{backgroundColor:"black",textColor:"white",allowedBlocks:["vimeo/create","core/video","core/embed"]},[["vimeo/create",{}]]]],scope:["inserter","transform"],isActive:e=>{let{className:r}=e;return!!r&&r.includes("is-style-video")}}],c=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/popup-controller","version":"0.1.0","title":"Popup Controller","description":"Render content in a modal popup","category":"media","keywords":["modal","popup","video","vimeo","youtube"],"attributes":{},"supports":{"anchor":true,"html":false,"align":["full","wide","left","right","center"],"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"providesContext":{"popup-controller/className":"className"},"textdomain":"popup-controller","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}'),{name:a}=c,s={icon:function(){return(0,r.createElement)(l.Icon,{icon:l.icons.faWindowRestore,width:21,preserveAspectRatio:"xMidYMid meet"})},edit:function(e){let{attributes:l,setAttributes:n,context:i,clientId:c,isSelected:a}=e;const s=(0,o.useBlockProps)(),d=(0,o.useInnerBlocksProps)(s,{allowedBlocks:p,template:t,templateLock:"all"});return(0,r.createElement)("div",d)},save:function(){return(0,r.createElement)(o.InnerBlocks.Content,null)},variations:i};(0,e.registerBlockType)(a,{...c,...s})}},o={};function t(e){var p=o[e];if(void 0!==p)return p.exports;var l=o[e]={exports:{}};return r[e](l,l.exports,t),l.exports}t.m=r,e=[],t.O=(r,o,p,l)=>{if(!o){var n=1/0;for(s=0;s<e.length;s++){for(var[o,p,l]=e[s],i=!0,c=0;c<o.length;c++)(!1&l||n>=l)&&Object.keys(t.O).every((e=>t.O[e](o[c])))?o.splice(c--,1):(i=!1,l<n&&(n=l));if(i){e.splice(s--,1);var a=p();void 0!==a&&(r=a)}}return r}l=l||0;for(var s=e.length;s>0&&e[s-1][2]>l;s--)e[s]=e[s-1];e[s]=[o,p,l]},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e={826:0,431:0};t.O.j=r=>0===e[r];var r=(r,o)=>{var p,l,[n,i,c]=o,a=0;if(n.some((r=>0!==e[r]))){for(p in i)t.o(i,p)&&(t.m[p]=i[p]);if(c)var s=c(t)}for(r&&r(o);a<n.length;a++)l=n[a],t.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return t.O(s)},o=globalThis.webpackChunkpopup_controller=globalThis.webpackChunkpopup_controller||[];o.forEach(r.bind(null,0)),o.push=r.bind(null,o.push.bind(o))})();var p=t.O(void 0,[431],(()=>t(504)));p=t.O(p)})();
//# sourceMappingURL=index.js.map