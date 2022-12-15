(()=>{"use strict";var e,t={378:()=>{const e=window.wp.blocks,t=window.wp.element,o=window.wp.blockEditor,r=(window.wp.i18n,window.wp.components);function n(e){let{attributes:n,setAttributes:l}=e;return(0,t.createElement)(o.InspectorControls,null,(0,t.createElement)(r.PanelBody,{title:"Block Controls"},(0,t.createElement)(r.BaseControl,{label:"Do Something"},(0,t.createElement)(r.Button,{variant:"primary"},"Do Something"))))}function l(e){let{attributes:n,setAttributes:l,context:a}=e;const{myNewAttribute:i}=n,s=(0,t.useCallback)((()=>i?"admin-site":"admin-site-alt"),[i]);return(0,t.createElement)(o.BlockControls,null,(0,t.createElement)(r.ToolbarGroup,null,(0,t.createElement)(r.ToolbarDropdownMenu,{icon:s,label:"Select Option",controls:[{title:"A",icon:"admin-site",isActive:!0===i,onClick:()=>{l({myNewAttribute:!0})}},{title:"B",icon:"admin-site-alt",isActive:!1===i,onClick:()=>{l({myNewAttribute:!1})}}]})))}function a(e){let{attributes:o,setAttributes:r,context:a}=e;return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(n,{attributes:o,setAttributes:r,context:a}),(0,t.createElement)(l,{attributes:o,setAttributes:r,context:a}))}window.wp.coreData;const i=["core/navigation-link","core/navigation-submenu"],s=(0,o.withColors)({textColor:"color"},{backgroundColor:"color"},{overlayBackgroundColor:"color"},{overlayTextColor:"color"})((function(e){let{attributes:r,setAttributes:n,clientId:l,isSelected:s,textColor:u,setTextColor:c,backgroundColor:m,setBackgroundColor:p,overlayBackgroundColor:y,setOverlayBackgroundColor:d,overlayTextColor:g,setOverlayTextColor:b}=e;const x=(0,o.useBlockProps)(),{allowedBlocks:C,orientation:v}=r,k=(0,o.useInnerBlocksProps)(x,{allowedBlocks:C||i,orientation:v||"vertical"});return console.log("Client ID: ",l),(0,t.createElement)(t.Fragment,null,(0,t.createElement)(a,{attributes:r,setAttributes:n,context:!1}),(0,t.createElement)("div",k))})),u=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/taxonomy-menu","version":"0.1.0","title":"Taxonomy Menu","category":"design","description":"Display a menu of taxonomy terms.","attributes":{"ref":{"type":"number"},"textColor":{"type":"string"},"customTextColor":{"type":"string"},"rgbTextColor":{"type":"string"},"backgroundColor":{"type":"string"},"customBackgroundColor":{"type":"string"},"rgbBackgroundColor":{"type":"string"},"showSubmenuIcon":{"type":"boolean","default":true},"overlayMenu":{"type":"string","default":"mobile"},"icon":{"type":"string","default":"handle"},"hasIcon":{"type":"boolean","default":true},"overlayBackgroundColor":{"type":"string"},"customOverlayBackgroundColor":{"type":"string"},"overlayTextColor":{"type":"string"},"customOverlayTextColor":{"type":"string"},"maxNestingLevel":{"type":"number","default":5},"templateLock":{"type":["string","boolean"],"enum":["all","insert","contentOnly",false]}},"providesContext":{"textColor":"textColor","customTextColor":"customTextColor","backgroundColor":"backgroundColor","customBackgroundColor":"customBackgroundColor","overlayTextColor":"overlayTextColor","customOverlayTextColor":"customOverlayTextColor","overlayBackgroundColor":"overlayBackgroundColor","customOverlayBackgroundColor":"customOverlayBackgroundColor","fontSize":"fontSize","customFontSize":"customFontSize","showSubmenuIcon":"showSubmenuIcon","openSubmenusOnClick":"openSubmenusOnClick","style":"style","orientation":"orientation","maxNestingLevel":"maxNestingLevel"},"supports":{"align":["wide","full"],"html":false,"inserter":true,"reusable":true,"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontStyle":true,"__experimentalFontWeight":true,"__experimentalTextTransform":true,"__experimentalFontFamily":true,"__experimentalLetterSpacing":true,"__experimentalTextDecoration":true,"__experimentalSkipSerialization":["textDecoration"],"__experimentalDefaultControls":{"fontSize":true}},"spacing":{"blockGap":true,"units":["px","em","rem","vh","vw"],"__experimentalDefaultControls":{"blockGap":true}},"__experimentalLayout":{"allowSwitching":false,"allowInheriting":false,"allowVerticalAlignment":false,"default":{"type":"flex"}},"__experimentalStyle":{"elements":{"link":{"color":{"text":"inherit"}}}}},"textdomain":"menu","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}'),{name:c}=u,m={edit:s,save:function(e){let{attributes:r}=e;return(0,t.createElement)(o.InnerBlocks.Content,null)}};(0,e.registerBlockType)(c,{...u,...m})}},o={};function r(e){var n=o[e];if(void 0!==n)return n.exports;var l=o[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.m=t,e=[],r.O=(t,o,n,l)=>{if(!o){var a=1/0;for(c=0;c<e.length;c++){for(var[o,n,l]=e[c],i=!0,s=0;s<o.length;s++)(!1&l||a>=l)&&Object.keys(r.O).every((e=>r.O[e](o[s])))?o.splice(s--,1):(i=!1,l<a&&(a=l));if(i){e.splice(c--,1);var u=n();void 0!==u&&(t=u)}}return t}l=l||0;for(var c=e.length;c>0&&e[c-1][2]>l;c--)e[c]=e[c-1];e[c]=[o,n,l]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};r.O.j=t=>0===e[t];var t=(t,o)=>{var n,l,[a,i,s]=o,u=0;if(a.some((t=>0!==e[t]))){for(n in i)r.o(i,n)&&(r.m[n]=i[n]);if(s)var c=s(r)}for(t&&t(o);u<a.length;u++)l=a[u],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(c)},o=globalThis.webpackChunktaxonomy_menu=globalThis.webpackChunktaxonomy_menu||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var n=r.O(void 0,[431],(()=>r(378)));n=r.O(n)})();