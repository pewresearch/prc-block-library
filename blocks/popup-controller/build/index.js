(()=>{"use strict";var e,o={575:()=>{const e=window.wp.blocks,o=window.React,r=window.wp.blockEditor,t=[["prc-block/popup-content",{}],["prc-block/popup-modal",{}]],p=["prc-block/popup-content","prc-block/popup-modal"],l=window.prcIcons,i=window.wp.i18n,c=[{name:"popup-standard",isDefault:!0,title:(0,i.__)("Popup Standard","prc-block-library"),excerpt:(0,i.__)("A standard popup.","prc-block-library"),attributes:{className:"is-style-standard"},innerBlocks:[["prc-block/popup-content",{},[["core/paragraph",{placeholder:(0,i.__)("Add content to trigger your popup here.","prc-block-library")}]]],["prc-block/popup-modal",{backgroundColor:"white"},[["core/paragraph",{placeholder:(0,i.__)("Add content inside the modal here.","prc-block-library")}]]]],scope:["inserter","transform"],isActive:({className:e})=>!!e&&e.includes("is-style-standard")},{name:"popup-video",title:(0,i.__)("Popup Video","prc-block-library"),excerpt:(0,i.__)("A video popup.","prc-block-library"),attributes:{className:"is-style-video"},keywords:[(0,i.__)("video","prc-block-library")],innerBlocks:[["prc-block/popup-content",{},[["core/paragraph",{placeholder:(0,i.__)("Add content to trigger your video popup here.","prc-block-library")}]]],["prc-block/popup-modal",{backgroundColor:"black",textColor:"white",allowedBlocks:["vimeo/create","core/video","core/embed"]},[["vimeo/create",{}]]]],scope:["inserter","transform"],isActive:({className:e})=>!!e&&e.includes("is-style-video")}],n=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/popup-controller","version":"0.1.0","title":"Popup Controller","description":"Render content in a modal popup","category":"media","keywords":["modal","popup","video","vimeo","youtube"],"attributes":{},"supports":{"anchor":true,"html":false,"align":["full","wide","left","right","center"],"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}},"interactivity":true},"providesContext":{"popup-controller/className":"className"},"textdomain":"popup-controller","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScriptModule":"file:./view.js"}'),{name:a}=n,s={icon:function(){return(0,o.createElement)(l.Icon,{icon:l.icons.faWindowRestore,width:21,preserveAspectRatio:"xMidYMid meet"})},edit:function({attributes:e,setAttributes:l,context:i,clientId:c,isSelected:n}){const a=(0,r.useBlockProps)(),s=(0,r.useInnerBlocksProps)(a,{allowedBlocks:p,template:t,templateLock:"all"});return(0,o.createElement)("div",{...s})},save:function(){return(0,o.createElement)(r.InnerBlocks.Content,null)},variations:c};(0,e.registerBlockType)(a,{...n,...s})}},r={};function t(e){var p=r[e];if(void 0!==p)return p.exports;var l=r[e]={exports:{}};return o[e](l,l.exports,t),l.exports}t.m=o,e=[],t.O=(o,r,p,l)=>{if(!r){var i=1/0;for(s=0;s<e.length;s++){for(var[r,p,l]=e[s],c=!0,n=0;n<r.length;n++)(!1&l||i>=l)&&Object.keys(t.O).every((e=>t.O[e](r[n])))?r.splice(n--,1):(c=!1,l<i&&(i=l));if(c){e.splice(s--,1);var a=p();void 0!==a&&(o=a)}}return o}l=l||0;for(var s=e.length;s>0&&e[s-1][2]>l;s--)e[s]=e[s-1];e[s]=[r,p,l]},t.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),(()=>{var e={826:0,431:0};t.O.j=o=>0===e[o];var o=(o,r)=>{var p,l,[i,c,n]=r,a=0;if(i.some((o=>0!==e[o]))){for(p in c)t.o(c,p)&&(t.m[p]=c[p]);if(n)var s=n(t)}for(o&&o(r);a<i.length;a++)l=i[a],t.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return t.O(s)},r=globalThis.webpackChunkpopup_controller=globalThis.webpackChunkpopup_controller||[];r.forEach(o.bind(null,0)),r.push=o.bind(null,r.push.bind(r))})();var p=t.O(void 0,[431],(()=>t(575)));p=t.O(p)})();
//# sourceMappingURL=index.js.map