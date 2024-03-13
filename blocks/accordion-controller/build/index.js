(()=>{"use strict";var o,e={924:(o,e,t)=>{const r=window.wp.blocks,n=window.React,l=window.classnames;var c=t.n(l);const i=window.prcBlockUtils,a=window.wp.element,s=window.wp.blockEditor,d=window.wp.i18n;function u({colors:o,clientId:e}){const t=(0,s.__experimentalUseMultipleOriginColorsAndGradients)(),{titleBackgroundColor:r,setTitleBackgroundColor:l,titleTextColor:c,setTitleTextColor:i,contentBackgroundColor:a,setContentBackgroundColor:u,contentTextColor:p,setContentTextColor:C}=o;return(0,n.createElement)(s.InspectorControls,{group:"color"},(0,n.createElement)(s.__experimentalColorGradientSettingsDropdown,{settings:[{colorValue:c?.color,onColorChange:i,label:(0,d.__)("Title Text")},{colorValue:r?.color,onColorChange:l,label:(0,d.__)("Title Background")},{colorValue:p?.color,onColorChange:C,label:(0,d.__)("Content Text")},{colorValue:a?.color,onColorChange:u,label:(0,d.__)("Content Background")}],panelId:e,hasColorsOrGradients:!1,disableCustomColors:!0,__experimentalIsRenderedInSidebar:!0,...t}))}const p=["prc-block/accordion"],C=(0,s.withColors)({contentTextColor:"color"},{contentBackgroundColor:"color"},{titleBackgroundColor:"color"},{titleTextColor:"color"})((function({attributes:o,className:e,titleBackgroundColor:t,setTitleBackgroundColor:r,titleTextColor:l,setTitleTextColor:d,contentBackgroundColor:C,setContentBackgroundColor:g,contentTextColor:k,setContentTextColor:b,__unstableLayoutClassNames:x,clientId:m}){const f=(0,i.getBlockGapSupportValue)(o,"vertical"),w=(0,s.useBlockProps)({className:c()(e,x,{"has-block-gap":"0"!==f})}),B=(0,s.useInnerBlocksProps)(w,{allowedBlocks:p,orientation:"vertical",renderAppender:s.InnerBlocks.ButtonBlockAppender});return(0,n.createElement)(a.Fragment,null,(0,n.createElement)(u,{colors:{titleBackgroundColor:t,setTitleBackgroundColor:r,titleTextColor:l,setTitleTextColor:d,contentBackgroundColor:C,setContentBackgroundColor:g,contentTextColor:k,setContentTextColor:b},clientId:m}),(0,n.createElement)("div",{...B}))})),g=window.prcIcons,k=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/accordion-controller","version":"0.1.0","title":"Accordion Controller","category":"design","description":"Controls a group of accordion blocks.","attributes":{"titleBackgroundColor":{"type":"string"},"titleTextColor":{"type":"string"},"contentBackgroundColor":{"type":"string"},"contentTextColor":{"type":"string"}},"supports":{"anchor":true,"html":false,"color":{"link":true,"text":false,"background":false},"spacing":{"blockGap":{"sides":["vertical"]},"margin":["top","bottom"]},"__experimentalBorder":{"color":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"style":true,"width":true}},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}},"layout":{"allowEditing":false,"default":{"type":"flex","orientation":"vertical"}},"interactivity":true},"example":{"attributes":{},"innerBlocks":[{"name":"prc-block/accordion","attributes":{"title":"Accordion 1"},"innerBlocks":[{"name":"core/paragraph","attributes":{"content":"Content 1"}}]},{"name":"prc-block/accordion","attributes":{"title":"Accordion 2"},"innerBlocks":[{"name":"core/paragraph","attributes":{"content":"Content 2"}}]}],"viewportWidth":640},"providesContext":{"prc-block/accordion-controller/content-background":"contentBackgroundColor","prc-block/accordion-controller/content-text":"contentTextColor","prc-block/accordion-controller/title-background":"titleBackgroundColor","prc-block/accordion-controller/title-text":"titleTextColor"},"textdomain":"accordion-controller","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewModule":"file:./view.js"}'),{name:b}=k,x={icon:function(){return(0,n.createElement)(g.NewIcon,{icon:"shutters",library:"solid"})},edit:C,save:function(){return(0,n.createElement)(s.InnerBlocks.Content,null)}};(0,r.registerBlockType)(b,{...k,...x})}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var l=t[o]={exports:{}};return e[o](l,l.exports,r),l.exports}r.m=e,o=[],r.O=(e,t,n,l)=>{if(!t){var c=1/0;for(d=0;d<o.length;d++){for(var[t,n,l]=o[d],i=!0,a=0;a<t.length;a++)(!1&l||c>=l)&&Object.keys(r.O).every((o=>r.O[o](t[a])))?t.splice(a--,1):(i=!1,l<c&&(c=l));if(i){o.splice(d--,1);var s=n();void 0!==s&&(e=s)}}return e}l=l||0;for(var d=o.length;d>0&&o[d-1][2]>l;d--)o[d]=o[d-1];o[d]=[t,n,l]},r.n=o=>{var e=o&&o.__esModule?()=>o.default:()=>o;return r.d(e,{a:e}),e},r.d=(o,e)=>{for(var t in e)r.o(e,t)&&!r.o(o,t)&&Object.defineProperty(o,t,{enumerable:!0,get:e[t]})},r.o=(o,e)=>Object.prototype.hasOwnProperty.call(o,e),(()=>{var o={57:0,350:0};r.O.j=e=>0===o[e];var e=(e,t)=>{var n,l,[c,i,a]=t,s=0;if(c.some((e=>0!==o[e]))){for(n in i)r.o(i,n)&&(r.m[n]=i[n]);if(a)var d=a(r)}for(e&&e(t);s<c.length;s++)l=c[s],r.o(o,l)&&o[l]&&o[l][0](),o[l]=0;return r.O(d)},t=globalThis.webpackChunkaccordion_controller=globalThis.webpackChunkaccordion_controller||[];t.forEach(e.bind(null,0)),t.push=e.bind(null,t.push.bind(t))})();var n=r.O(void 0,[350],(()=>r(924)));n=r.O(n)})();
//# sourceMappingURL=index.js.map