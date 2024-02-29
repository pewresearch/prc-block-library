(()=>{"use strict";var e,t={863:(e,t,r)=>{const a=window.wp.i18n,n=window.wp.blocks,o=window.React,l=window.classnames;var s=r.n(l);const i=window.prcBlockUtils,c=window.wp.blockEditor,p=window.wp.components;function u({attributes:e,setAttributes:t}){const{placeholder:r,includesConfirmation:n,confirmationPlaceholder:l}=e;return(0,o.createElement)(c.InspectorControls,null,(0,o.createElement)(p.PanelBody,{title:(0,a.__)("Form Password Field Settings")},(0,o.createElement)(p.ToggleControl,{label:"Include confirmation field and password strength meter",checked:n,onChange:e=>{t({includesConfirmation:e})}})))}const m=(e,t="Password",r="password")=>{const{includesConfirmation:a}=e;return["prc-block/form-field",{label:t,required:!0},[["prc-block/form-input-text",{type:"password",placeholder:a?"Password...":"Confirm Password...",isInteractive:!0,interactiveNamespace:"prc-block/form-input-password",metadata:{name:r}}]]]},d=window.prcIcons,f=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/form-input-password","version":"0.1.0","title":"Password Field","category":"design","description":"A block for password input in a form with optional confirmation field and analyzer.","attributes":{"includesConfirmation":{"type":"boolean","default":false},"style":{"type":"object","default":{"spacing":{"blockGap":"var:preset|spacing|10"},"typography":{"lineHeight":"1"}}}},"supports":{"anchor":true,"html":false,"reusable":false,"__experimentalBorder":{"color":true,"width":true},"spacing":{"blockGap":true,"padding":true,"margin":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true},"interactivity":true},"providesContext":{"prc-block/form-input-target-namespace":"interactiveNamespace"},"textdomain":"form-input-password","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php","viewModule":"file:./view.js"}'),{name:w}=f,b={icon:function(){return(0,o.createElement)(d.Icon,{icon:d.icons.faPenField,width:18,preserveAspectRatio:"xMidYMid meet"})},edit:function({attributes:e,setAttributes:t}){const{includesConfirmation:r}=e,a=(0,o.useMemo)((()=>r?[m(e),m(e,"Confirm Password","confirmPassword")]:[m(e)]),[r]),n=(0,o.useMemo)((()=>r?"vertical":"horizontal"),[r]),l=(0,c.useBlockProps)({className:s()({"has-confirmation":r}),style:{"--block-gap":(0,i.getBlockGapSupportValue)(e,"horizontal")}}),p=(0,c.useInnerBlocksProps)({className:"wp-block-prc-block-form-input-password__input"},{allowedBlocks:["prc-block/form-input-text","prc-block/form-field"],templateLock:!0,template:a,orientation:n});return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(u,{attributes:e,setAttributes:t}),(0,o.createElement)("div",{...l},(0,o.createElement)("div",{...p}),r&&(0,o.createElement)("div",{className:"wp-block-prc-block-form-input-password__analyzer"},(0,o.createElement)("p",null,"Password Must:"),(0,o.createElement)("ul",null,(0,o.createElement)("li",{classname:"is-valid"},(0,o.createElement)("span",{classname:"fa fa-solid fa-check"})," Includes one lowercase letter"),(0,o.createElement)("li",null,(0,o.createElement)("span",{classname:"fa fa-regular fa-xmark"})," Includes one uppercase letter"),(0,o.createElement)("li",null,(0,o.createElement)("span",{classname:"fa fa-regular fa-xmark"})," Includes one number"),(0,o.createElement)("li",null,(0,o.createElement)("span",{classname:"fa fa-regular fa-xmark"})," Includes one special character"),(0,o.createElement)("li",null,(0,o.createElement)("span",{classname:"fa fa-regular fa-xmark"})," Be at least 12 characters long"),(0,o.createElement)("li",null,(0,o.createElement)("span",{classname:"fa fa-regular fa-xmark"})," Not include invalid characters")))))},save:function({attributes:e}){return(0,o.createElement)(c.InnerBlocks.Content,null)}};(0,n.registerBlockType)(w,{...f,...b})}},r={};function a(e){var n=r[e];if(void 0!==n)return n.exports;var o=r[e]={exports:{}};return t[e](o,o.exports,a),o.exports}a.m=t,e=[],a.O=(t,r,n,o)=>{if(!r){var l=1/0;for(p=0;p<e.length;p++){for(var[r,n,o]=e[p],s=!0,i=0;i<r.length;i++)(!1&o||l>=o)&&Object.keys(a.O).every((e=>a.O[e](r[i])))?r.splice(i--,1):(s=!1,o<l&&(l=o));if(s){e.splice(p--,1);var c=n();void 0!==c&&(t=c)}}return t}o=o||0;for(var p=e.length;p>0&&e[p-1][2]>o;p--)e[p]=e[p-1];e[p]=[r,n,o]},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};a.O.j=t=>0===e[t];var t=(t,r)=>{var n,o,[l,s,i]=r,c=0;if(l.some((t=>0!==e[t]))){for(n in s)a.o(s,n)&&(a.m[n]=s[n]);if(i)var p=i(a)}for(t&&t(r);c<l.length;c++)o=l[c],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(p)},r=globalThis.webpackChunkform_input_password=globalThis.webpackChunkform_input_password||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=a.O(void 0,[350],(()=>a(863)));n=a.O(n)})();
//# sourceMappingURL=index.js.map