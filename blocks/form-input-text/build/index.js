(()=>{"use strict";var e,t={850:()=>{const e=window.wp.blocks,t=window.wp.element,r=window.wp.blockEditor,n=window.wp.i18n,a=window.wp.components,o=window.ReactJSXRuntime;function i({attributes:e,setAttributes:t}){const{placeholder:i,type:l}=e,p=e?.metadata?.name;return(0,o.jsx)(r.InspectorControls,{children:(0,o.jsxs)(a.PanelBody,{title:(0,n.__)("Form Input Field Settings"),children:[(0,o.jsx)(a.SelectControl,{label:"Input Type",value:l,options:[{label:"Text",value:"text"},{label:"Text Area",value:"textarea"},{label:"Email",value:"email"},{label:"Password",value:"password"}],onChange:e=>{t({type:e})}}),(0,o.jsx)(a.TextControl,{label:"Input Name",value:p,onChange:r=>{t({metadata:{...e.metadata,name:r}})}}),(0,o.jsx)(a.TextControl,{label:"Input Placeholder",value:i,onChange:e=>{t({placeholder:e})}})]})})}const l=window.prcIcons,p=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/form-input-text","version":"0.1.0","title":"Input Text Field","description":"A primtive block for a text input field in a form.","category":"design","attributes":{"placeholder":{"type":"string","default":"Enter text..."},"type":{"type":"string","enum":["email","password","text","textarea","number"],"default":"text"},"value":{"type":"string"},"style":{"type":"object","default":{"typography":{"lineHeight":"1"}}}},"parent":["prc-block/form-field"],"supports":{"anchor":true,"html":false,"reusable":false,"inserter":false,"__experimentalBorder":{"color":true,"width":true},"spacing":{"padding":true,"margin":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}},"interactivity":true},"usesContext":["prc-block/form-field/required","prc-block/form-field/label","prc-block/form-input-target-namespace"],"textdomain":"form-input-text","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php"}'),{name:s}=p,u={icon:function(){return(0,o.jsx)(l.Icon,{icon:"input-text"})},edit:function({attributes:e,setAttributes:n,context:a}){const l=a?.["prc-block/form-field-required"],{placeholder:p,type:s}=e,u=(0,r.useBlockProps)({placeholder:p,onChange:e=>e.preventDefault(),type:s,required:l});return(0,o.jsxs)(t.Fragment,{children:[(0,o.jsx)(i,{attributes:e,setAttributes:n}),"textarea"!==s?(0,o.jsx)("input",{...u}):(0,o.jsx)("textarea",{...u})]})}};(0,e.registerBlockType)(s,{...p,...u})}},r={};function n(e){var a=r[e];if(void 0!==a)return a.exports;var o=r[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=(t,r,a,o)=>{if(!r){var i=1/0;for(u=0;u<e.length;u++){for(var[r,a,o]=e[u],l=!0,p=0;p<r.length;p++)(!1&o||i>=o)&&Object.keys(n.O).every((e=>n.O[e](r[p])))?r.splice(p--,1):(l=!1,o<i&&(i=o));if(l){e.splice(u--,1);var s=a();void 0!==s&&(t=s)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[r,a,o]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var a,o,[i,l,p]=r,s=0;if(i.some((t=>0!==e[t]))){for(a in l)n.o(l,a)&&(n.m[a]=l[a]);if(p)var u=p(n)}for(t&&t(r);s<i.length;s++)o=i[s],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(u)},r=globalThis.webpackChunkform_input_text=globalThis.webpackChunkform_input_text||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var a=n.O(void 0,[350],(()=>n(850)));a=n.O(a)})();
//# sourceMappingURL=index.js.map