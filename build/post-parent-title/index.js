(()=>{"use strict";var e,t={5425:(e,t,r)=>{const n=window.wp.primitives,o=window.ReactJSXRuntime,l=(0,o.jsx)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,o.jsx)(n.Path,{d:"m4 5.5h2v6.5h1.5v-6.5h2v-1.5h-5.5zm16 10.5h-16v-1.5h16zm-7 4h-9v-1.5h9z"})}),i=window.wp.i18n,s=window.wp.blocks,a=window.classnames;var p=r.n(a);const u=window.wp.blockEditor,c=window.wp.components,d=window.wp.element,g=window.wp.coreData,h=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/post-parent-title","version":"0.1.0","title":"Post Parent Title","category":"theme","usesContext":["postId","postType","queryId"],"attributes":{"textAlign":{"type":"string"},"level":{"type":"number","default":4},"isLink":{"type":"boolean","default":false},"rel":{"type":"string","attribute":"rel","default":""},"linkTarget":{"type":"string","default":"_self"}},"supports":{"align":["wide","full"],"html":false,"color":{"gradients":false,"link":true,"__experimentalDefaultControls":{"background":true,"text":true,"link":true}},"spacing":{"margin":true,"padding":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true,"fontAppearance":true,"textTransform":true}}},"textdomain":"parent-post-title","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}'),{name:_}=h,x={icon:l,edit:function({attributes:{level:e,textAlign:t,isLink:r,rel:n,linkTarget:l},setAttributes:s,context:{postType:a,postId:h,queryId:_}}){const x="h"+e,[f]=(0,g.useEntityProp)("postType",a,"post_parent",h),[m="",w,v]=(0,g.useEntityProp)("postType",a,"title",f),[k]=(0,g.useEntityProp)("postType",a,"link",f),y=(0,u.useBlockProps)({className:p()({[`has-text-align-${t}`]:t})}),b=(0,u.useBlockEditingMode)();let j=(0,o.jsx)(x,{...y,children:(0,i.__)("Parent Post Title")});return f&&f&&v&&(j=(0,o.jsx)(x,{...y,children:v?.rendered})),r&&f&&k&&v&&(j=(0,o.jsx)(x,{...y,children:(0,o.jsx)("a",{href:k,target:l,rel:n,onClick:e=>e.preventDefault(),dangerouslySetInnerHTML:{__html:v?.rendered}})})),0===f&&(j=(0,o.jsx)(x,{...y,children:(0,i.__)("No parent post found")})),(0,o.jsxs)(d.Fragment,{children:["default"===b&&(0,o.jsxs)(u.BlockControls,{group:"block",children:[(0,o.jsx)(u.HeadingLevelDropdown,{value:e,onChange:e=>s({level:e})}),(0,o.jsx)(u.AlignmentControl,{value:t,onChange:e=>{s({textAlign:e})}})]}),(0,o.jsx)(u.InspectorControls,{children:(0,o.jsxs)(c.PanelBody,{title:(0,i.__)("Settings"),children:[(0,o.jsx)(c.ToggleControl,{__nextHasNoMarginBottom:!0,label:(0,i.__)("Make title a link"),onChange:()=>s({isLink:!r}),checked:r}),r&&(0,o.jsxs)(d.Fragment,{children:[(0,o.jsx)(c.ToggleControl,{__nextHasNoMarginBottom:!0,label:(0,i.__)("Open in new tab"),onChange:e=>s({linkTarget:e?"_blank":"_self"}),checked:"_blank"===l}),(0,o.jsx)(c.TextControl,{__nextHasNoMarginBottom:!0,label:(0,i.__)("Link rel"),value:n,onChange:e=>s({rel:e})})]})]})}),j]})}};(0,s.registerBlockType)(_,{...h,...x})}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var l=r[e]={exports:{}};return t[e](l,l.exports,n),l.exports}n.m=t,e=[],n.O=(t,r,o,l)=>{if(!r){var i=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],l=e[u][2];for(var s=!0,a=0;a<r.length;a++)(!1&l||i>=l)&&Object.keys(n.O).every((e=>n.O[e](r[a])))?r.splice(a--,1):(s=!1,l<i&&(i=l));if(s){e.splice(u--,1);var p=o();void 0!==p&&(t=p)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[r,o,l]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={5974:0,778:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,l,i=r[0],s=r[1],a=r[2],p=0;if(i.some((t=>0!==e[t]))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(a)var u=a(n)}for(t&&t(r);p<i.length;p++)l=i[p],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(u)},r=self.webpackChunk_pewresearch_prc_block_library=self.webpackChunk_pewresearch_prc_block_library||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=n.O(void 0,[778],(()=>n(5425)));o=n.O(o)})();
//# sourceMappingURL=index.js.map