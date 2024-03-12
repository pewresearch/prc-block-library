(()=>{"use strict";var e,t={871:(e,t,r)=>{const o=window.wp.blocks,l=window.React,i=window.classnames;var a=r.n(i);const n=window.prcIcons,c=window.prcBlockUtils,s=window.wp.element,p=window.wp.blockEditor,u=["core/paragraph","core/heading","core/image","core/table","core/list","core/buttons","core/file","core/video","core/group"],d=[["core/paragraph",{}]],b={from:[{type:"shortcode",tag:"collapsible",transform({},{shortcode:e}){const{content:t}=e,{title:r,contents:l}=function(e){var t=e,r="",o=/<h4>(.*?)<\/h4>/i,l=o.exec(t);return l&&l[1]&&(r=l[1],t=t.replace(o,"")),{title:r,contents:t}}(t);return(0,o.createBlock)("prc-block/collapsible",{title:r},(0,o.rawHandler)({HTML:l}))}}]},m=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/collapsible","version":"0.1.0","title":"Collapsible","category":"design","keywords":["collapsible","accordion","how we did this"],"attributes":{"title":{"type":"string"},"allowedBlocks":{"type":"array"},"backgroundColor":{"type":"string","default":"ui-beige-very-light"},"borderColor":{"type":"string","default":"ui-beige-dark"},"style":{"type":"object","default":{"border":{"width":"1px"},"spacing":{"blockGap":{"top":"var:preset|spacing|30"},"padding":{"bottom":"var:preset|spacing|20","left":"var:preset|spacing|30","right":"var:preset|spacing|30","top":"var:preset|spacing|20"}}}}},"supports":{"anchor":false,"html":false,"spacing":{"blockGap":{"sides":["vertical"]},"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"color":{"background":true,"text":true,"link":true},"__experimentalBorder":{"color":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"style":true,"width":true}},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}},"interactivity":true},"example":{"attributes":{"title":"How we did this"},"innerBlocks":[{"name":"core/paragraph","attributes":{"content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, quam sapien aliquet nunc, nec aliquam nisl nunc"}}],"viewportWidth":640},"textdomain":"collapsible","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php","viewScriptModule":"file:./view.js"}'),{name:g}=m,h={icon:function(){return(0,l.createElement)(n.NewIcon,{icon:"circle-plus"})},edit:function({attributes:e,setAttributes:t}){const{title:r,className:o,allowedBlocks:i}=e,[b,m]=(0,s.useState)(!0),g=(0,p.useBlockProps)({className:a()(o,{"is-open":b}),style:{"--block-gap":(0,c.getBlockGapSupportValue)(e,"vertical")}}),h=(0,p.useInnerBlocksProps)({className:"wp-block-prc-block-collapsible__content"},{allowedBlocks:i||u,templateLock:!1,template:d});return(0,l.createElement)("div",{...g},(0,l.createElement)("div",{className:"wp-block-prc-block-collapsible__title"},(0,l.createElement)(p.RichText,{tagName:"div",value:r,onChange:e=>t({title:e}),placeholder:"How we did this...",formattingControls:[],keepPlaceholderOnFocus:!0}),(0,l.createElement)("button",{className:"wp-block-prc-block-collapsible__icon",onClick:()=>{m(!b)},type:"button"},(0,l.createElement)(n.Icon,{icon:b?n.icons.faCircleMinusLight:n.icons.faCirclePlusLight}))),(0,l.createElement)("div",{...h}))},save:function(){return(0,l.createElement)(p.InnerBlocks.Content,null)},transforms:b};(0,o.registerBlockType)(g,{...m,...h})}},r={};function o(e){var l=r[e];if(void 0!==l)return l.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,r,l,i)=>{if(!r){var a=1/0;for(p=0;p<e.length;p++){for(var[r,l,i]=e[p],n=!0,c=0;c<r.length;c++)(!1&i||a>=i)&&Object.keys(o.O).every((e=>o.O[e](r[c])))?r.splice(c--,1):(n=!1,i<a&&(a=i));if(n){e.splice(p--,1);var s=l();void 0!==s&&(t=s)}}return t}i=i||0;for(var p=e.length;p>0&&e[p-1][2]>i;p--)e[p]=e[p-1];e[p]=[r,l,i]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var l,i,[a,n,c]=r,s=0;if(a.some((t=>0!==e[t]))){for(l in n)o.o(n,l)&&(o.m[l]=n[l]);if(c)var p=c(o)}for(t&&t(r);s<a.length;s++)i=a[s],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(p)},r=globalThis.webpackChunkcollapsible=globalThis.webpackChunkcollapsible||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var l=o.O(void 0,[350],(()=>o(871)));l=o.O(l)})();
//# sourceMappingURL=index.js.map