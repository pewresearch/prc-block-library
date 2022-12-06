!function(){"use strict";var e,t={491:function(){var e=window.wp.blocks,t=window.wp.element,n=window.wp.blockEditor,r=window.wp.i18n,o=window.wp.components;function l(e){let{attributes:l,setAttributes:i}=e;const{type:a,value:c}=l;return(0,t.createElement)(n.InspectorControls,null,(0,t.createElement)(o.PanelBody,{title:(0,r.__)("Form Input Field Settings")},(0,t.createElement)(o.SelectControl,{label:"Input Type",value:a,options:[{label:"Checkbox",value:"checkbox"},{label:"Radio",value:"radio"}],onChange:e=>{i({type:e})}}),(0,t.createElement)(o.TextControl,{label:"Value",value:c,onChange:e=>{i({value:e})}})))}function i(e){let{attributes:n,setAttributes:r,context:o}=e;return(0,t.createElement)(l,{attributes:n,setAttributes:r,context:o})}window.wp.coreData;var a=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/form-input-checkbox","version":"0.1.0","title":"Form Input Checkbox","description":"A primitive block for a form input checkbox field","category":"design","attributes":{"label":{"type":"string"},"type":{"type":"string","default":"checkbox"},"value":{"type":"string","default":""},"defaultChecked":{"type":"boolean","default":false}},"ancestor":["prc-block/mailchimp-form","prc-block/mailchimp-select"],"supports":{"anchor":true,"html":false,"reusable":false,"color":{"text":true},"spacing":{"padding":true,"margin":true,"blockGap":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true}},"textdomain":"form-input-checkbox","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php"}');const{name:c,title:u}=a,s={icon:function(){return(0,t.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",width:21,preserveAspectRatio:"xMidYMid meet"},(0,t.createElement)(o.Path,{d:"M203.3 331.3C197.1 337.6 186.9 337.6 180.7 331.3L116.7 267.3C110.4 261.1 110.4 250.9 116.7 244.7C122.9 238.4 133.1 238.4 139.3 244.7L192 297.4L308.7 180.7C314.9 174.4 325.1 174.4 331.3 180.7C337.6 186.9 337.6 197.1 331.3 203.3L203.3 331.3zM0 96C0 60.65 28.65 32 64 32H384C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96zM32 96V416C32 433.7 46.33 448 64 448H384C401.7 448 416 433.7 416 416V96C416 78.33 401.7 64 384 64H64C46.33 64 32 78.33 32 96z"}))},__experimentalLabel:e=>{let{label:t}=e;return t||u},edit:function(e){let{attributes:r,setAttributes:o,context:l,clientId:a,isSelected:c}=e;const{anchor:u,label:s,type:p,defaultChecked:d}=r,[f,b]=(0,t.useState)(d);(0,t.useEffect)((()=>{o({defaultChecked:f})}),[f]);const m=(0,n.useBlockProps)({});return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(i,{attributes:r,setAttributes:o,context:!1}),(0,t.createElement)("div",m,(0,t.createElement)("input",{type:p,id:u,name:u,checked:f,onChange:()=>b(!f)}),(0,t.createElement)(n.RichText,{tagName:"label",value:s,onChange:e=>o({label:e}),placeholder:"Label",keepPlaceholderOnFocus:!0,multiline:!1,allowedFormats:["core/bold","core/italic"]})))}};(0,e.registerBlockType)(c,{...a,...s})}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var l=n[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.m=t,e=[],r.O=function(t,n,o,l){if(!n){var i=1/0;for(s=0;s<e.length;s++){n=e[s][0],o=e[s][1],l=e[s][2];for(var a=!0,c=0;c<n.length;c++)(!1&l||i>=l)&&Object.keys(r.O).every((function(e){return r.O[e](n[c])}))?n.splice(c--,1):(a=!1,l<i&&(i=l));if(a){e.splice(s--,1);var u=o();void 0!==u&&(t=u)}}return t}l=l||0;for(var s=e.length;s>0&&e[s-1][2]>l;s--)e[s]=e[s-1];e[s]=[n,o,l]},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,l,i=n[0],a=n[1],c=n[2],u=0;if(i.some((function(t){return 0!==e[t]}))){for(o in a)r.o(a,o)&&(r.m[o]=a[o]);if(c)var s=c(r)}for(t&&t(n);u<i.length;u++)l=i[u],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(s)},n=self.webpackChunkform_input_checkbox=self.webpackChunkform_input_checkbox||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var o=r.O(void 0,[431],(function(){return r(491)}));o=r.O(o)}();