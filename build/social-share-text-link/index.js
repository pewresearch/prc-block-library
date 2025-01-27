(()=>{"use strict";var e,t={3148:()=>{const e=window.wp.blocks,t=window.wp.i18n,r=window.React,n=window.wp.blockEditor,o=window.wp.dom,i=window.wp.url,s=window.wp.components,a=window.wp.primitives,l=window.ReactJSXRuntime,c=(0,l.jsx)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,l.jsx)(a.Path,{d:"M10 17.389H8.444A5.194 5.194 0 1 1 8.444 7H10v1.5H8.444a3.694 3.694 0 0 0 0 7.389H10v1.5ZM14 7h1.556a5.194 5.194 0 0 1 0 10.39H14v-1.5h1.556a3.694 3.694 0 0 0 0-7.39H14V7Zm-4.5 6h5v-1.5h-5V13Z"})}),p=window.wp.keycodes;function u({attributes:e,setAttributes:r,setIsLinkOpen:o}){return(0,l.jsx)(n.BlockControls,{children:(0,l.jsxs)(s.ToolbarGroup,{children:[(0,l.jsx)(s.KeyboardShortcuts,{bindGlobal:!0,shortcuts:{[p.rawShortcut.primary("k")]:()=>o(!0)}}),(0,l.jsx)(s.ToolbarButton,{name:"link",icon:c,title:(0,t.__)("Link"),shortcut:p.displayShortcut.primary("k"),onClick:()=>o(!0)})]})})}function d({attributes:e,setAttributes:t,setIsLinkOpen:r}){return(0,l.jsx)(u,{attributes:e,setAttributes:t,setIsLinkOpen:r})}const w=window.prcIcons,b=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/social-share-text-link","version":"0.1.0","title":"Social Share Text Link","description":"Add a text link to a social share group.","category":"widgets","attributes":{"label":{"type":"string"},"opensInNewTab":{"type":"boolean","default":false},"url":{"type":"string"}},"supports":{"anchor":true,"html":false,"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}},"align":false},"example":{"attributes":{"label":"Read more..."},"viewPortWidth":100},"parent":["core/social-links"],"textdomain":"social-share-text-link","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php"}'),{name:h}=b,f={icon:function(){return(0,l.jsx)(w.Icon,{icon:"link"})},edit:function({attributes:e,isSelected:a,setAttributes:c,mergeBlocks:p,onReplace:u}){const{className:w,label:b,opensInNewTab:h,url:f}=e,k={url:f,opensInNewTab:h},[m,x]=(0,r.useState)(!1),g=(0,r.useRef)(null),v=(0,t.__)("Add link…"),_=(0,r.useRef)();(0,r.useEffect)((()=>{f||x(!0)}),[]),(0,r.useEffect)((()=>{a||x(!1)}),[a]),(0,r.useEffect)((()=>{m&&f&&((0,i.isURL)((0,i.prependHTTP)(b))&&/^.+\.[a-z]+/.test(b)?(()=>{_.current.focus();const{ownerDocument:e}=_.current,{defaultView:t}=e,r=t.getSelection(),n=e.createRange();n.selectNodeContents(_.current),r.removeAllRanges(),r.addRange(n)})():(0,o.placeCaretAtHorizontalEdge)(_.current,!0))}),[f]);const y=(0,n.useBlockProps)({ref:g,className:w});return(0,l.jsxs)(r.Fragment,{children:[(0,l.jsx)(d,{attributes:e,setAttributes:c,setIsLinkOpen:x}),(0,l.jsxs)("div",{...y,children:[(0,l.jsx)(n.RichText,{ref:_,identifier:"label",value:b,onChange:e=>c({label:e}),onMerge:p,onReplace:u,"aria-label":(0,t.__)("Social share link text"),placeholder:v,keepPlaceholderOnFocus:!0,withoutInteractiveFormatting:!0,allowedFormats:["core/bold"]}),m&&(0,l.jsx)(s.Popover,{position:"bottom center",onClose:()=>x(!1),children:(0,l.jsx)(n.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",value:k,suggestionsQuery:{},onChange:({url:e="",opensInNewTab:t}={})=>c({url:encodeURI(e),label:(()=>{const t=e.replace(/http(s?):\/\//gi,"");return b||escape(t)})(),opensInNewTab:t})})})]})]})},__experimentalLabel:({label:e})=>e};(0,e.registerBlockType)(h,{...b,...f})}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,n),i.exports}n.m=t,e=[],n.O=(t,r,o,i)=>{if(!r){var s=1/0;for(p=0;p<e.length;p++){r=e[p][0],o=e[p][1],i=e[p][2];for(var a=!0,l=0;l<r.length;l++)(!1&i||s>=i)&&Object.keys(n.O).every((e=>n.O[e](r[l])))?r.splice(l--,1):(a=!1,i<s&&(s=i));if(a){e.splice(p--,1);var c=o();void 0!==c&&(t=c)}}return t}i=i||0;for(var p=e.length;p>0&&e[p-1][2]>i;p--)e[p]=e[p-1];e[p]=[r,o,i]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={2936:0,4448:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,i,s=r[0],a=r[1],l=r[2],c=0;if(s.some((t=>0!==e[t]))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(l)var p=l(n)}for(t&&t(r);c<s.length;c++)i=s[c],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(p)},r=self.webpackChunk_pewresearch_prc_block_library=self.webpackChunk_pewresearch_prc_block_library||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=n.O(void 0,[4448],(()=>n(3148)));o=n.O(o)})();
//# sourceMappingURL=index.js.map