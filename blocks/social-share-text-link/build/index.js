!function(){"use strict";var e,t={80:function(){var e=window.wp.element,t=window.wp.primitives,n=(0,e.createElement)(t.SVG,{xmlns:"https://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(t.Path,{d:"M12 9c-.8 0-1.5.7-1.5 1.5S11.2 12 12 12s1.5-.7 1.5-1.5S12.8 9 12 9zm0-5c-3.6 0-6.5 2.8-6.5 6.2 0 .8.3 1.8.9 3.1.5 1.1 1.2 2.3 2 3.6.7 1 3 3.8 3.2 3.9l.4.5.4-.5c.2-.2 2.6-2.9 3.2-3.9.8-1.2 1.5-2.5 2-3.6.6-1.3.9-2.3.9-3.1C18.5 6.8 15.6 4 12 4zm4.3 8.7c-.5 1-1.1 2.2-1.9 3.4-.5.7-1.7 2.2-2.4 3-.7-.8-1.9-2.3-2.4-3-.8-1.2-1.4-2.3-1.9-3.3-.6-1.4-.7-2.2-.7-2.5 0-2.6 2.2-4.7 5-4.7s5 2.1 5 4.7c0 .2-.1 1-.7 2.4z"})),r=window.wp.blocks,o=window.wp.i18n,l=window.wp.blockEditor,a=window.wp.dom,i=window.wp.url,s=window.wp.components,c=(0,e.createElement)(t.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(t.Path,{d:"M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"})),u=window.wp.keycodes;function p(t){let{attributes:n,setAttributes:r,setIsLinkOpen:a}=t;return(0,e.createElement)(l.BlockControls,null,(0,e.createElement)(s.ToolbarGroup,null,(0,e.createElement)(s.KeyboardShortcuts,{bindGlobal:!0,shortcuts:{[u.rawShortcut.primary("k")]:()=>a(!0)}}),(0,e.createElement)(s.ToolbarButton,{name:"link",icon:c,title:(0,o.__)("Link"),shortcut:u.displayShortcut.primary("k"),onClick:()=>a(!0)})))}function d(t){let{attributes:n,setAttributes:r,setIsLinkOpen:o}=t;return(0,e.createElement)(p,{attributes:n,setAttributes:r,setIsLinkOpen:o})}var m=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/social-share-text-link","version":"0.1.0","title":"Social Share Text Link","description":"Add a text link to a social share group.","category":"widgets","attributes":{"label":{"type":"string"},"opensInNewTab":{"type":"boolean","default":false},"url":{"type":"string"}},"supports":{"anchor":true,"html":false,"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"example":{"attributes":{"label":"Read more..."},"viewPortWidth":100},"parent":["core/social-links"],"textdomain":"social-share-text-link","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php"}');const{name:w}=m,f={icon:n,edit:function(t){let{attributes:n,isSelected:r,setAttributes:c,mergeBlocks:u,onReplace:p}=t;const{className:m,label:w,opensInNewTab:f,url:b}=n,h={url:b,opensInNewTab:f},[k,v]=(0,e.useState)(!1),g=(0,e.useRef)(null),x=(0,o.__)("Add link…"),_=(0,e.useRef)();(0,e.useEffect)((()=>{b||v(!0)}),[]),(0,e.useEffect)((()=>{r||v(!1)}),[r]),(0,e.useEffect)((()=>{k&&b&&((0,i.isURL)((0,i.prependHTTP)(w))&&/^.+\.[a-z]+/.test(w)?(()=>{_.current.focus();const{ownerDocument:e}=_.current,{defaultView:t}=e,n=t.getSelection(),r=e.createRange();r.selectNodeContents(_.current),n.removeAllRanges(),n.addRange(r)})():(0,a.placeCaretAtHorizontalEdge)(_.current,!0))}),[b]);const y=(0,l.useBlockProps)({ref:g,className:m});return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(d,{attributes:n,setAttributes:c,setIsLinkOpen:v}),(0,e.createElement)("div",y,(0,e.createElement)(l.RichText,{ref:_,identifier:"label",value:w,onChange:e=>c({label:e}),onMerge:u,onReplace:p,"aria-label":(0,o.__)("Social share link text"),placeholder:x,keepPlaceholderOnFocus:!0,withoutInteractiveFormatting:!0,allowedFormats:["bold"]}),k&&(0,e.createElement)(s.Popover,{position:"bottom center",onClose:()=>v(!1)},(0,e.createElement)(l.__experimentalLinkControl,{className:"wp-block-navigation-link__inline-link-input",value:h,suggestionsQuery:{},onChange:function(){let{url:e="",opensInNewTab:t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return c({url:encodeURI(e),label:(()=>{const t=e.replace(/http(s?):\/\//gi,"");return w||escape(t)})(),opensInNewTab:t})}}))))},__experimentalLabel:e=>{let{label:t}=e;return t}};(0,r.registerBlockType)(w,{...m,...f})}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var l=n[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.m=t,e=[],r.O=function(t,n,o,l){if(!n){var a=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],l=e[u][2];for(var i=!0,s=0;s<n.length;s++)(!1&l||a>=l)&&Object.keys(r.O).every((function(e){return r.O[e](n[s])}))?n.splice(s--,1):(i=!1,l<a&&(a=l));if(i){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[n,o,l]},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,l,a=n[0],i=n[1],s=n[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(o in i)r.o(i,o)&&(r.m[o]=i[o]);if(s)var u=s(r)}for(t&&t(n);c<a.length;c++)l=a[c],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(u)},n=self.webpackChunksocial_share_text_link=self.webpackChunksocial_share_text_link||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var o=r.O(void 0,[431],(function(){return r(80)}));o=r.O(o)}();