(()=>{"use strict";var e,t={9258:()=>{const e=window.wp.blocks,t=(window.classnames,window.prcBlockUtils,window.React),o=window.wp.blockEditor,r=window.prcControls,l=window.wp.i18n,a=window.wp.components,n=window.ReactJSXRuntime,s=[{label:"North America",value:"north-america"},{label:"South America",value:"south-america"},{label:"Europe",value:"europe"},{label:"Asia",value:"asia"},{label:"Africa",value:"africa"},{label:"Australia",value:"australia"}];function i({attributes:e,setAttributes:i,clientId:c,context:u}){const{placeholder:p,options:d,defaultOptions:b,hasClearIcon:f,disabled:h}=e,m=(0,t.useMemo)((()=>u["prc-block/sortable-options"]?JSON.parse(u["prc-block/sortable-options"]):{}),[u]);return(0,t.useEffect)((()=>{if("custom"===b)return;if(d.length>0)return;const e=Object.keys(m).map((e=>({label:m[e].name,name:m[e].name,value:e,disabled:!1})));e.length>0?i({options:e}):i({options:s})}),[d,m]),(0,n.jsxs)(o.InspectorControls,{children:[(0,n.jsxs)(a.PanelBody,{title:(0,l.__)("Form Input Field Settings"),children:[(0,n.jsx)(a.TextControl,{label:"Placeholder",value:p,onChange:e=>{i({placeholder:e})}}),(0,n.jsx)(a.ToggleControl,{label:"Disabled",checked:h,help:"If toggled on, the user cannot interact with this input.",onChange:e=>{i({disabled:e})}}),(0,n.jsx)(a.ToggleControl,{label:"Clear Icon Enabled",checked:f,help:"If toggled on, a clear icon will be displayed in the input field.",onChange:e=>{i({hasClearIcon:e})}})]}),(0,n.jsxs)(a.PanelBody,{title:(0,l.__)("Form Input Field Options"),children:[(0,n.jsx)(a.SelectControl,{label:"Select from default options",value:b,options:[{label:"Custom",value:"custom"},{label:"Countries",value:"countries"},{label:"Countries and Regions",value:"countries-and-regions"},{label:"U.S. States",value:"us-states"},{label:"Industries",value:"industries"}],onChange:e=>{i({defaultOptions:e})}}),(0,n.jsx)(r.Sorter,{options:d,setAttributes:i,attribute:"sortedOptions",clientId:c,isRemovable:!0,hasSetActive:!0})]})]})}const c=window.prcIcons,u=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/form-input-select","version":"1.5.0","title":"Form Input Select","category":"forms","description":"Create a dropdown component with a list of options.","attributes":{"defaultOptions":{"type":"string","enum":["custom","industries","countries","countries-and-regions","us-states"],"default":"custom"},"options":{"type":"array","default":[]},"sortedOptions":{"type":"array","default":[]},"placeholder":{"type":"string","default":"Select an option"},"disabled":{"type":"boolean","default":false},"backgroundColor":{"type":"string","default":"ui-white"},"textColor":{"type":"string","default":"ui-black"},"value":{"type":"string"},"hasClearIcon":{"type":"boolean","default":false}},"supports":{"anchor":true,"html":false,"reusable":true,"inserter":false,"__experimentalBorder":{"color":true,"width":true,"radius":true},"color":{"gradients":false},"spacing":{"padding":true,"margin":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true},"interactivity":true},"usesContext":["prc-block/form-input-select/options","prc-block/form-field-required","prc-block/form-field-label","prc-facets/template/facetType","prc-facets/template/facetName","prc-facets/template/facetLabel","prc-block/sortable-options"],"styles":[{"name":"default","label":"Default","isDefault":true}],"parent":["prc-block/form-field"],"textdomain":"form-input-select","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php","viewScriptModule":"file:./view.js"}'),{name:p}=u,d={icon:function(){return(0,n.jsx)(c.Icon,{icon:"list-dropdown"})},edit:function({attributes:e,setAttributes:r,clientId:l,isSelected:a,context:s}){const{placeholder:c}=e,u=(0,o.useBlockProps)({onChange:e=>e.preventDefault()});return(0,n.jsxs)(t.Fragment,{children:[(0,n.jsx)(i,{attributes:e,setAttributes:r,clientId:l,context:s}),(0,n.jsx)("div",{...u,children:(0,n.jsx)("div",{className:"wp-block-prc-block-form-input-select__input",children:(0,n.jsx)("input",{type:"search",role:"combobox",placeholder:c})})})]})}};(0,e.registerBlockType)(p,{...u,...d})}},o={};function r(e){var l=o[e];if(void 0!==l)return l.exports;var a=o[e]={exports:{}};return t[e](a,a.exports,r),a.exports}r.m=t,e=[],r.O=(t,o,l,a)=>{if(!o){var n=1/0;for(u=0;u<e.length;u++){o=e[u][0],l=e[u][1],a=e[u][2];for(var s=!0,i=0;i<o.length;i++)(!1&a||n>=a)&&Object.keys(r.O).every((e=>r.O[e](o[i])))?o.splice(i--,1):(s=!1,a<n&&(n=a));if(s){e.splice(u--,1);var c=l();void 0!==c&&(t=c)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[o,l,a]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={9030:0,9098:0};r.O.j=t=>0===e[t];var t=(t,o)=>{var l,a,n=o[0],s=o[1],i=o[2],c=0;if(n.some((t=>0!==e[t]))){for(l in s)r.o(s,l)&&(r.m[l]=s[l]);if(i)var u=i(r)}for(t&&t(o);c<n.length;c++)a=n[c],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(u)},o=self.webpackChunk_pewresearch_prc_block_library=self.webpackChunk_pewresearch_prc_block_library||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var l=r.O(void 0,[9098],(()=>r(9258)));l=r.O(l)})();
//# sourceMappingURL=index.js.map