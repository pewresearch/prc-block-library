(()=>{"use strict";var e,t={172:(e,t,n)=>{const r=window.wp.blocks,a=window.React,l=window.classnames;var i=n.n(l);const s=window.wp.element,o=window.wp.data,p=window.wp.blockEditor,c=window.wp.apiFetch;var u=n.n(c);const m=["Person A","Person B","Person C"],d=window.prcIcons,f=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/bylines-display","version":"1.0.0","title":"Bylines Display","category":"theme","description":"Display a post\'s bylines in the format: {prefix \'By\'} 1, 2, and 3.","attributes":{"prefix":{"type":"string","default":"By"}},"supports":{"anchor":true,"html":false,"color":{"text":true,"background":true,"link":true},"spacing":{"margin":["top","bottom"],"padding":true},"layout":{"allowEditing":true,"allowJustification":true,"allowInheriting":false,"allowOrientation":true,"allowSizingOnChildren":true,"allowSwitching":false,"allowVerticalAlignment":false,"default":{"type":"flex","justifyContent":"left","orientation":"horizontal"}},"typography":{"fontSize":true,"fontAppearance":true,"__experimentalFontStyle":false,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalLetterSpacing":true,"__experimentalTextTransform":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalLetterSpacing":true,"__experimentalTextTransform":true,"__experimentalFontFamily":true}}},"example":{"attributes":{"textAlign":"left","prefix":"By"},"viewportWidth":400},"usesContext":["postId"],"textdomain":"bylines-display","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}'),{name:y}=f,h={icon:function(){return(0,a.createElement)(d.Icon,{icon:d.icons.faUsersLine,height:21,preserveAspectRatio:"xMidYMid meet"})},edit:function({attributes:e,setAttributes:t,context:n,clientId:r,isSelected:l,__unstableLayoutClassNames:c}){const{postId:d}=n,{prefix:f,className:y}=e,[h,w]=(0,s.useState)(m),b=(0,o.useSelect)((e=>e("core/editor").getEditedPostAttribute("bylines")),[r]),g=(0,p.useBlockProps)({className:i()(y,c)});return(0,s.useEffect)((()=>{b&&0<b.length?Promise.all(b.map((e=>(e=>new Promise((t=>{u()({path:`/wp/v2/bylines/${e}`}).then((e=>{const{name:n}=e;return t(n)}))})))(e)))).then((e=>{w([...e])})):w([...m])}),[b]),(0,a.createElement)("div",{...g},(0,a.createElement)(p.RichText,{tagName:"span",placeholder:"By",value:f,onChange:e=>t({prefix:e}),allowedFormats:[],style:{marginRight:"4px"}}),(0,a.createElement)("div",{className:"wp-block-prc-block-bylines-display__bylines"},h.map(((e,t)=>{const n=h.length,r=e;let l="",i=()=>{};return 1<n&&t+1===n?i=()=>(0,a.createElement)("span",{className:"prc-platform-staff-bylines__separator"}," ","and"," "):1<n&&0!==t&&(i=()=>(0,a.createElement)("span",{className:"prc-platform-staff-bylines__separator"},","," ")),l=0!==t||d?(0,a.createElement)(s.Fragment,null,(0,a.createElement)(i,null),(0,a.createElement)("span",null,r)):(0,a.createElement)("a",null,r),l}))))},save:function({attributes:e}){return(0,a.createElement)(p.InnerBlocks.Content,null)}};(0,r.registerBlockType)(y,{...f,...h})}},n={};function r(e){var a=n[e];if(void 0!==a)return a.exports;var l=n[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.m=t,e=[],r.O=(t,n,a,l)=>{if(!n){var i=1/0;for(c=0;c<e.length;c++){for(var[n,a,l]=e[c],s=!0,o=0;o<n.length;o++)(!1&l||i>=l)&&Object.keys(r.O).every((e=>r.O[e](n[o])))?n.splice(o--,1):(s=!1,l<i&&(i=l));if(s){e.splice(c--,1);var p=a();void 0!==p&&(t=p)}}return t}l=l||0;for(var c=e.length;c>0&&e[c-1][2]>l;c--)e[c]=e[c-1];e[c]=[n,a,l]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var a,l,[i,s,o]=n,p=0;if(i.some((t=>0!==e[t]))){for(a in s)r.o(s,a)&&(r.m[a]=s[a]);if(o)var c=o(r)}for(t&&t(n);p<i.length;p++)l=i[p],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(c)},n=globalThis.webpackChunkbylines_display=globalThis.webpackChunkbylines_display||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var a=r.O(void 0,[350],(()=>r(172)));a=r.O(a)})();
//# sourceMappingURL=index.js.map