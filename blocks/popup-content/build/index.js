(()=>{"use strict";var e,t={415:()=>{window.wp.i18n;const e=window.wp.blocks,t=window.wp.element,n=window.wp.blockEditor,r=window.wp.components;function o(e){let{attributes:o,setAttributes:l}=e;return(0,t.createElement)(n.InspectorControls,null,(0,t.createElement)(r.PanelBody,{title:"Block Controls"},(0,t.createElement)(r.BaseControl,{label:"Do Something"},(0,t.createElement)(r.Button,{variant:"primary"},"Do Something"))))}function l(e){let{attributes:o,setAttributes:l,context:i}=e;const{myNewAttribute:a}=o,s=(0,t.useCallback)((()=>a?"admin-site":"admin-site-alt"),[a]);return(0,t.createElement)(n.BlockControls,null,(0,t.createElement)(r.ToolbarGroup,null,(0,t.createElement)(r.ToolbarDropdownMenu,{icon:s,label:"Select Option",controls:[{title:"A",icon:"admin-site",isActive:!0===a,onClick:()=>{l({myNewAttribute:!0})}},{title:"B",icon:"admin-site-alt",isActive:!1===a,onClick:()=>{l({myNewAttribute:!1})}}]})))}function i(e){let{attributes:n,setAttributes:r,context:i}=e;return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(o,{attributes:n,setAttributes:r,context:i}),(0,t.createElement)(l,{attributes:n,setAttributes:r,context:i}))}window.wp.coreData;const a=["core/group","core/paragraph"],s=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/popup-content","version":"0.1.0","title":"Content","description":"The content inside this block will act as the clickable trigger to display the modal.","category":"media","attributes":{"allowedBlocks":{"type":"array"}},"supports":{"html":false,"align":false,"inserter":false,"multiple":false,"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"parent":["prc-block/popup-controller"],"textdomain":"popup-content","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}'),{name:c}=s,p={icon:function(){return(0,t.createElement)(r.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",preserveAspectRatio:"xMidYMid meet",height:20},(0,t.createElement)(r.Path,{d:"M432 48H208C190.3 48 176 62.33 176 80V96H128V80C128 35.82 163.8 0 208 0H432C476.2 0 512 35.82 512 80V304C512 348.2 476.2 384 432 384H416V336H432C449.7 336 464 321.7 464 304V80C464 62.33 449.7 48 432 48zM320 128C355.3 128 384 156.7 384 192V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V192C0 156.7 28.65 128 64 128H320zM64 464H320C328.8 464 336 456.8 336 448V256H48V448C48 456.8 55.16 464 64 464z"}))},edit:function(e){let{attributes:r,setAttributes:o,context:l,clientId:s,isSelected:c}=e;const p=(0,n.useBlockProps)(),{allowedBlocks:u}=r,m=(0,n.useInnerBlocksProps)(p,{allowedBlocks:u||a,templateLock:!1});return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(i,{attributes:r,setAttributes:o,context:!1}),(0,t.createElement)("div",m))},save:function(e){let{attributes:r}=e;return(0,t.createElement)(n.InnerBlocks.Content,null)}};(0,e.registerBlockType)(c,{...s,...p})}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var l=n[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.m=t,e=[],r.O=(t,n,o,l)=>{if(!n){var i=1/0;for(p=0;p<e.length;p++){for(var[n,o,l]=e[p],a=!0,s=0;s<n.length;s++)(!1&l||i>=l)&&Object.keys(r.O).every((e=>r.O[e](n[s])))?n.splice(s--,1):(a=!1,l<i&&(i=l));if(a){e.splice(p--,1);var c=o();void 0!==c&&(t=c)}}return t}l=l||0;for(var p=e.length;p>0&&e[p-1][2]>l;p--)e[p]=e[p-1];e[p]=[n,o,l]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,l,[i,a,s]=n,c=0;if(i.some((t=>0!==e[t]))){for(o in a)r.o(a,o)&&(r.m[o]=a[o]);if(s)var p=s(r)}for(t&&t(n);c<i.length;c++)l=i[c],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(p)},n=globalThis.webpackChunkpopup_content=globalThis.webpackChunkpopup_content||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var o=r.O(void 0,[431],(()=>r(415)));o=r.O(o)})();