(()=>{"use strict";var e,t={521:(e,t,r)=>{const o=window.wp.blocks,l=window.classnames;var i=r.n(l);const n=window.prcIcons,a=window.wp.blockEditor,c=window.wp.data,s=window.wp.element,u=window.wp.components,d=window.ReactJSXRuntime;function p({attributes:e,setAttributes:t,clientId:r}){const{orientation:o}=e,{isInsideCover:l}=(0,c.useSelect)((e=>{const{getBlockRootClientId:t,getBlock:o}=e("core/block-editor"),l=t(r);return l?{isInsideCover:"core/cover"===o(l).name}:{isInsideCover:!1}}),[r]),i=(0,s.useMemo)((()=>l?[{label:"Horizontal",value:"horizontal"},{label:"Vertical",value:"vertical"}]:[{label:"Horizontal",value:"horizontal"}]),[l]);return(0,d.jsx)(a.InspectorControls,{children:(0,d.jsx)(u.PanelBody,{title:"Carousel Orientation",initialOpen:l,children:(0,d.jsx)(u.SelectControl,{label:"Orientation",value:o,options:i,onChange:e=>t({orientation:e}),help:l?"When the carousel is inside a cover block, you can select between the default horizontal or vertical orientation.":"To use a vertical carousel, the carousel must be inside a cover block."})})})}function b(){return(0,d.jsx)(n.Icon,{icon:"rectangle-history",library:"light"})}const v=window.wp.i18n,h=[{name:"carousel-horizontal",title:(0,v.__)("Carousel: Horizontal"),description:(0,v.__)("A horizontal carousel."),icon:b(),attributes:{orientation:"horizontal"},scope:["inserter"],isDefault:!0,isActive:(e,t)=>e.orientation===t.orientation},{name:"carousel-vertical",title:(0,v.__)("Carousel: Vertical"),description:(0,v.__)("A vertical carousel."),icon:(0,d.jsx)(n.Icon,{icon:"rectangle-vertical-history",library:"light"}),attributes:{orientation:"vertical"},scope:[],isActive:(e,t)=>e.orientation===t.orientation}],k=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/carousel-controller","version":"1.0.0","title":"Carousel","category":"design","description":"Organize content in a vertical or horizontal carousel.","keywords":["scroll","carousel","slider"],"allowedBlocks":["prc-block/carousel-slide"],"attributes":{"orientation":{"type":"string","default":"horizontal"}},"supports":{"html":false,"align":["wide","full"],"spacing":{"margin":["top","bottom"],"padding":true},"interactivity":true,"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}},"shadow":true,"color":{"background":true,"text":true,"button":true,"enableContrastChecker":true,"gradients":true,"heading":true,"link":true},"background":{"color":true,"gradient":true,"image":true},"__experimentalBorder":{"radius":true,"color":true,"width":true,"style":true}},"styles":[{"name":"arrows-navigation","label":"Arrows Navigation","isDefault":true},{"name":"dots-navigation","label":"Dots Navigation"}],"textdomain":"carousel-controller","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php","viewScriptModule":"file:./view.js"}'),{name:_}=k,w={icon:b,edit:function({attributes:e,setAttributes:t,clientId:r,isSelected:o}){const{orientation:l,className:u}=e,{selectBlock:b}=(0,c.useDispatch)(a.store),{innerBlocks:v,selectedCarouselSlideClientId:h,_isSelected:k,nextClientId:_,previousClientId:w}=(0,c.useSelect)((e=>{const{getBlock:t,getBlocks:l,getSelectedBlockClientId:i,getBlockParentsByBlockName:n,hasSelectedInnerBlock:c}=e(a.store),s=i(),u=n(s,"prc-block/carousel-slide"),d=u?.[0]||s,p=t(s),b=l(r),v="prc-block/carousel-slide"===p?.blockName?s:null;if(null===v)return{innerBlocks:b,selectedCarouselSlideClientId:d,nextClientId:null,previousClientId:null,_isSelected:o||c(r,!0)};const h=b.indexOf(v)+1,k=b.indexOf(v)-1,_=b[h]?.clientId,w=b[k]?.clientId;return{innerBlocks:b,selectedCarouselSlideClientId:d,nextClientId:_,previousClientId:w,_isSelected:o||c(r,!0)}})),m=(0,a.useBlockProps)({className:i()("prc-block-carousel-controller",{"is-style-vertical":"vertical"===l,"is-enabled":k})}),g=(0,a.useInnerBlocksProps)({className:"prc-block-carousel-controller__track"},{orientation:l,templateLock:!1,__experiementalCaptureToolbars:!0,template:[["prc-block/carousel-slide",{},[["core/paragraph",{placeholder:"Place blocks inside the carousel slide."}]]]]}),f=(0,d.jsx)("div",{className:"prc-block-carousel-controller__dots",children:v.map(((e,t)=>(0,d.jsx)("button",{className:"prc-block-carousel-controller__dot",type:"button",onClick:()=>b(e.clientId),"aria-label":`Go to slide ${t+1}`,"data-active":h===e.clientId,children:(0,d.jsx)(n.Icon,{library:"solid",icon:"circle"})},e.clientId)))}),x=(0,d.jsxs)("div",{className:"prc-block-carousel-controller__arrows",children:[(0,d.jsx)("button",{className:"prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow--prev",type:"button",onClick:()=>b(w),children:(0,d.jsx)(n.Icon,{library:"solid",icon:"chevron-left"})}),(0,d.jsx)("button",{className:"prc-block-carousel-controller__arrow prc-block-carousel-controller__arrow--next",type:"button",onClick:()=>b(_),children:(0,d.jsx)(n.Icon,{library:"solid",icon:"chevron-right"})})]});return(0,d.jsxs)(s.Fragment,{children:[(0,d.jsx)(p,{attributes:e,setAttributes:t,clientId:r}),(0,d.jsxs)("div",{...m,children:[(0,d.jsx)("div",{...g}),u?.includes("dots-navigation")&&f,u?.includes("arrows-navigation")&&x]})]})},save:function(){return(0,d.jsx)(a.InnerBlocks.Content,{})},variations:h};(0,o.registerBlockType)(_,{...k,...w})}},r={};function o(e){var l=r[e];if(void 0!==l)return l.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,r,l,i)=>{if(!r){var n=1/0;for(u=0;u<e.length;u++){r=e[u][0],l=e[u][1],i=e[u][2];for(var a=!0,c=0;c<r.length;c++)(!1&i||n>=i)&&Object.keys(o.O).every((e=>o.O[e](r[c])))?r.splice(c--,1):(a=!1,i<n&&(n=i));if(a){e.splice(u--,1);var s=l();void 0!==s&&(t=s)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[r,l,i]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var l,i,n=r[0],a=r[1],c=r[2],s=0;if(n.some((t=>0!==e[t]))){for(l in a)o.o(a,l)&&(o.m[l]=a[l]);if(c)var u=c(o)}for(t&&t(r);s<n.length;s++)i=n[s],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(u)},r=self.webpackChunk_pewresearch_prc_block_library=self.webpackChunk_pewresearch_prc_block_library||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var l=o.O(void 0,[350],(()=>o(521)));l=o.O(l)})();
//# sourceMappingURL=index.js.map