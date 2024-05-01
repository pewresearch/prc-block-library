(()=>{"use strict";var e,t={988:(e,t,r)=>{const o=window.wp.blocks,l=window.React,n=window.classnames;var a=r.n(n);const c=window.wp.i18n,i=window.wp.element,s=window.wp.blockEditor,u=window.wp.components;function d({colors:e,clientId:t}){const r=(0,s.__experimentalUseMultipleOriginColorsAndGradients)(),o=(0,i.useMemo)((()=>{const{checkboxColor:t,setCheckboxColor:r}=e;return[{colorValue:t?.color,onColorChange:r,label:(0,c.__)("Checkbox Color")}]}),[e]);return(0,l.createElement)(s.InspectorControls,{group:"color"},(0,l.createElement)(s.__experimentalColorGradientSettingsDropdown,{settings:o,panelId:t,hasColorsOrGradients:!1,disableCustomColors:!1,__experimentalIsRenderedInSidebar:!0,...r}))}function p({attributes:e,setAttributes:t,colors:r,clientId:o}){const{type:n,value:a,defaultChecked:p,required:b}=e,m=e?.metadata?.name;return(0,l.createElement)(i.Fragment,null,(0,l.createElement)(s.InspectorControls,null,(0,l.createElement)(u.PanelBody,{title:(0,c.__)("Form Input Field Settings")},(0,l.createElement)(u.SelectControl,{label:"Input Type",value:n,options:[{label:"Checkbox",value:"checkbox"},{label:"Radio",value:"radio"}],onChange:e=>{t({type:e})}}),(0,l.createElement)(u.TextControl,{label:"Input Value",value:a,onChange:e=>{t({value:e})}}),(0,l.createElement)(u.TextControl,{label:"Input Name",value:m,onChange:r=>{t({metadata:{...e.metadata,name:r}})}}),(0,l.createElement)(u.ToggleControl,{checked:p,label:"Default Checked",onChange:()=>{t({defaultChecked:!p})}}),(0,l.createElement)(u.ToggleControl,{checked:b,label:"Required",onChange:()=>{t({required:!b})}}))),(0,l.createElement)(d,{colors:r,clientId:o}))}function b({attributes:e,setAttributes:t,context:r,clientId:o,colors:n}){return(0,l.createElement)(p,{attributes:e,setAttributes:t,context:r,clientId:o,colors:n})}const m=(0,s.withColors)({checkboxColor:"color"})((function({attributes:e,setAttributes:t,context:r,clientId:o,isSelected:n,checkboxColor:u,setCheckboxColor:d}){const{anchor:p,label:m,type:h,defaultChecked:f,required:C}=e,g=(0,s.useBlockProps)({className:a()({"is-required":C})}),k=a()({"has-border-color":u.slug,[(0,s.getColorClassName)("color",u?.slug)]:!!u?.slug});return(0,l.createElement)(i.Fragment,null,(0,l.createElement)(b,{attributes:e,setAttributes:t,context:!1,clientId:o,colors:{checkboxColor:u,setCheckboxColor:d}}),(0,l.createElement)("div",{...g},(0,l.createElement)("input",{type:h,id:p,name:p,required:C,checked:f,className:k}),(0,l.createElement)(s.RichText,{tagName:"label",placeholder:(0,c.__)("Label","prc-block-library"),value:m,onChange:e=>{t({label:e})},__unstableOnSplitAtEnd:()=>onEnterSplit()})))})),h=window.prcIcons,f=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/form-input-checkbox","version":"0.1.0","title":"Form Input Checkbox","description":"A primitive block for a form input checkbox field","category":"design","attributes":{"type":{"type":"string","enum":["checkbox","radio"],"default":"checkbox"},"label":{"type":"string"},"value":{"type":"string","default":""},"required":{"type":"boolean","default":false},"defaultChecked":{"type":"boolean","default":false},"checkboxColor":{"type":"string"}},"styles":[{"name":"default","label":"Default","isDefault":true},{"name":"label-only","label":"Label Only"}],"supports":{"anchor":true,"html":false,"reusable":false,"color":{"text":true},"spacing":{"padding":true,"margin":true,"blockSpacing":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true},"interactivity":true},"usesContext":["prc-block/form-field-label","prc-block/form-field-required"],"textdomain":"form-input-checkbox","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php"}'),{name:C,title:g}=f,k={icon:function(){return(0,l.createElement)(h.Icon,{icon:"square-check"})},__experimentalLabel:({label:e})=>e||g,edit:m};(0,o.registerBlockType)(C,{...f,...k})}},r={};function o(e){var l=r[e];if(void 0!==l)return l.exports;var n=r[e]={exports:{}};return t[e](n,n.exports,o),n.exports}o.m=t,e=[],o.O=(t,r,l,n)=>{if(!r){var a=1/0;for(u=0;u<e.length;u++){for(var[r,l,n]=e[u],c=!0,i=0;i<r.length;i++)(!1&n||a>=n)&&Object.keys(o.O).every((e=>o.O[e](r[i])))?r.splice(i--,1):(c=!1,n<a&&(a=n));if(c){e.splice(u--,1);var s=l();void 0!==s&&(t=s)}}return t}n=n||0;for(var u=e.length;u>0&&e[u-1][2]>n;u--)e[u]=e[u-1];e[u]=[r,l,n]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var l,n,[a,c,i]=r,s=0;if(a.some((t=>0!==e[t]))){for(l in c)o.o(c,l)&&(o.m[l]=c[l]);if(i)var u=i(o)}for(t&&t(r);s<a.length;s++)n=a[s],o.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return o.O(u)},r=globalThis.webpackChunkform_input_checkbox=globalThis.webpackChunkform_input_checkbox||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var l=o.O(void 0,[350],(()=>o(988)));l=o.O(l)})();
//# sourceMappingURL=index.js.map