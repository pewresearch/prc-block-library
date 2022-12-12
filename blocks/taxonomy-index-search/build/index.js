!function(){"use strict";var e,t={378:function(){window.wp.i18n;var e=window.wp.blocks,t=window.wp.element,n=window.wp.blockEditor,r=window.wp.components;function o(e){let{attributes:o,setAttributes:i}=e;return(0,t.createElement)(n.InspectorControls,null,(0,t.createElement)(r.PanelBody,{title:"Block Controls"},(0,t.createElement)(r.BaseControl,{label:"Do Something"},(0,t.createElement)(r.Button,{variant:"primary"},"Do Something"))))}function i(e){let{attributes:o,setAttributes:i,context:a}=e;const{myNewAttribute:l}=o,c=(0,t.useCallback)((()=>l?"admin-site":"admin-site-alt"),[l]);return(0,t.createElement)(n.BlockControls,null,(0,t.createElement)(r.ToolbarGroup,null,(0,t.createElement)(r.ToolbarDropdownMenu,{icon:c,label:"Select Option",controls:[{title:"A",icon:"admin-site",isActive:!0===l,onClick:()=>{i({myNewAttribute:!0})}},{title:"B",icon:"admin-site-alt",isActive:!1===l,onClick:()=>{i({myNewAttribute:!1})}}]})))}function a(e){let{attributes:n,setAttributes:r,context:a}=e;return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(o,{attributes:n,setAttributes:r,context:a}),(0,t.createElement)(i,{attributes:n,setAttributes:r,context:a}))}window.wp.coreData;const l=["core/group","core/paragraph"];var c=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/taxonomy-index-search","version":"0.1.0","title":"Taxonomy Index Search","category":"design","description":"Search terms in the selected taxonomy and redirect to the terms archive page","attributes":{"allowedBlocks":{"type":"array"},"orientation":{"type":"string","default":"vertical"}},"supports":{"anchor":true,"html":false,"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"textdomain":"taxonomy-index-search","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');const{name:s}=c,u={edit:function(e){let{attributes:r,setAttributes:o,context:i,clientId:c,isSelected:s}=e;const u=(0,n.useBlockProps)(),{allowedBlocks:p,orientation:m}=r,d=(0,n.useInnerBlocksProps)(u,{allowedBlocks:p||l,orientation:m||"vertical"});return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(a,{attributes:r,setAttributes:o,context:!1}),(0,t.createElement)("div",d))},save:function(e){let{attributes:r}=e;return(0,t.createElement)(n.InnerBlocks.Content,null)}};(0,e.registerBlockType)(s,{...c,...u})}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,r),i.exports}r.m=t,e=[],r.O=function(t,n,o,i){if(!n){var a=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],i=e[u][2];for(var l=!0,c=0;c<n.length;c++)(!1&i||a>=i)&&Object.keys(r.O).every((function(e){return r.O[e](n[c])}))?n.splice(c--,1):(l=!1,i<a&&(a=i));if(l){e.splice(u--,1);var s=o();void 0!==s&&(t=s)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,o,i]},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,i,a=n[0],l=n[1],c=n[2],s=0;if(a.some((function(t){return 0!==e[t]}))){for(o in l)r.o(l,o)&&(r.m[o]=l[o]);if(c)var u=c(r)}for(t&&t(n);s<a.length;s++)i=a[s],r.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return r.O(u)},n=self.webpackChunktaxonomy_index_search=self.webpackChunktaxonomy_index_search||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var o=r.O(void 0,[431],(function(){return r(378)}));o=r.O(o)}();