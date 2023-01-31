!function(){"use strict";var e,t={333:function(e,t,l){var n=window.wp.blocks,a=window.wp.element,o=window.wp.apiFetch,r=l.n(o),i=window.wp.blockEditor,u=window.wp.components,c=window.wp.htmlEntities,s=window.prcComponents;function m(e){let{value:t,onChange:l}=e;return(0,a.createElement)(u.SelectControl,{label:"Terms starting with letter",value:t,options:[{label:"(Click to select letter)",value:null},{label:"A",value:"A"},{label:"B",value:"B"},{label:"C",value:"C"},{label:"D",value:"D"},{label:"E",value:"E"},{label:"F",value:"F"},{label:"G",value:"G"},{label:"H",value:"H"},{label:"I",value:"I"},{label:"J",value:"J"},{label:"K",value:"K"},{label:"L",value:"L"},{label:"M",value:"M"},{label:"N",value:"N"},{label:"O",value:"O"},{label:"P",value:"P"},{label:"Q",value:"Q"},{label:"R",value:"R"},{label:"S",value:"S"},{label:"T",value:"T"},{label:"U",value:"U"},{label:"V",value:"V"},{label:"W",value:"W"},{label:"X",value:"X"},{label:"Y",value:"Y"},{label:"Z",value:"Z"}],onChange:e=>l(e)})}function d(e){let{value:t,onChange:l}=e;return(0,a.createElement)(s.TaxonomySelect,{value:t,onChange:l,allowMultiple:!0})}function p(e){let{attributes:t,setAttributes:l}=e;const{letter:n,taxonomy:o}=t;return(0,a.createElement)(i.InspectorControls,null,(0,a.createElement)(u.PanelBody,{title:"Taxonomy Query"},(0,a.createElement)(d,{value:o,onChange:e=>{l({taxonomy:[...e]})}}),(0,a.createElement)(u.CardDivider,null),(0,a.createElement)(m,{value:n,onChange:e=>l({letter:e})})))}function b(e){let{children:t}=e;return(0,a.createElement)(u.Placeholder,{isColumnLayout:!0,icon:"networking",label:"Taxonomy Index A-Z Listing"},(0,a.createElement)("div",null,t))}var v={from:[{type:"block",blocks:["prc-block/topic-index-az"],transform:e=>{const t=e;return t.exclude&&(t.exclude=t.exclude.split(",")),(0,n.createBlock)("prc-block/taxonomy-index-az-list",t)}}]},f=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/taxonomy-index-az-list","version":"0.1.0","title":"Taxonomy Index A-Z Listing","category":"design","description":"A list of taxonomy terms sorted alphabeticaly. Select terms you want to exclude by checking the box.","icon":"networking","keywords":["taxonomy","alphabetical"],"attributes":{"letter":{"type":"string"},"exclude":{"type":"array","default":[]},"taxonomy":{"type":"array","default":["topic"]},"disableHeading":{"type":"boolean","default":false}},"supports":{"anchor":true,"align":false,"html":false,"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"textdomain":"taxonomy-index-az-list","editorScript":"file:./index.js"}');const{name:x}=f,y={edit:function(e){let{attributes:t,setAttributes:l}=e;const{letter:n,exclude:o,taxonomy:s}=t,[v,f]=(0,a.useState)(!1),x=(0,i.useBlockProps)();return(0,a.useEffect)((()=>{if(console.log("Setting the exclude map...",v),!1!==v){const e=v.filter((e=>!0===e.excluded)).map((e=>e.term_id));console.log("tmpExclude",e),l({exclude:e})}}),[v]),(0,a.useEffect)((()=>{((e,t)=>(console.log("getTermsByLetter fn...",e,t),new Promise((l=>{r()({path:`/prc-api/v2/blocks/taxonomy-index-az-list/?letter=${e}&taxonomy=${t}`}).then((e=>{const t=e.map((e=>({name:e.name,term_id:e.term_id,excluded:!1})));l(t)}))}))))(n,s).then((e=>{const t=o,l=e.map((e=>{console.log("Load Terms... s?",e);const l={...e};return t.includes(l.term_id)&&(l.excluded=!0),l}));f(l)}))}),[n,s]),(0,a.createElement)(a.Fragment,null,(0,a.createElement)(p,{attributes:t,setAttributes:l}),(0,a.createElement)("div",x,void 0===n&&(0,a.createElement)(b,null,(0,a.createElement)(d,{value:s,onChange:e=>{l({taxonomy:[...e]})}}),(0,a.createElement)(m,{value:n,onChange:e=>l({letter:e})})),void 0!==n&&(0,a.createElement)(a.Fragment,null,(0,a.createElement)("h2",null,n),!1!==v&&(0,a.createElement)("ul",null,v.map((e=>{const t=e.excluded,l=!0!==t?(0,c.decodeEntities)(e.name):`${(0,c.decodeEntities)(e.name)} (${e.term_id})`;return(0,a.createElement)("li",null,(0,a.createElement)(u.CheckboxControl,{label:l,checked:t,onChange:t=>((e,t)=>{const l=v;l.map((l=>(l.term_id===t&&(l.excluded=!!e),l))),f([...l])})(t,e.term_id)}))}))))))},transforms:v};(0,n.registerBlockType)(x,{...f,...y})}},l={};function n(e){var a=l[e];if(void 0!==a)return a.exports;var o=l[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=function(t,l,a,o){if(!l){var r=1/0;for(s=0;s<e.length;s++){l=e[s][0],a=e[s][1],o=e[s][2];for(var i=!0,u=0;u<l.length;u++)(!1&o||r>=o)&&Object.keys(n.O).every((function(e){return n.O[e](l[u])}))?l.splice(u--,1):(i=!1,o<r&&(r=o));if(i){e.splice(s--,1);var c=a();void 0!==c&&(t=c)}}return t}o=o||0;for(var s=e.length;s>0&&e[s-1][2]>o;s--)e[s]=e[s-1];e[s]=[l,a,o]},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var l in t)n.o(t,l)&&!n.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};n.O.j=function(t){return 0===e[t]};var t=function(t,l){var a,o,r=l[0],i=l[1],u=l[2],c=0;if(r.some((function(t){return 0!==e[t]}))){for(a in i)n.o(i,a)&&(n.m[a]=i[a]);if(u)var s=u(n)}for(t&&t(l);c<r.length;c++)o=r[c],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(s)},l=self.webpackChunktaxonomy_index_az_list=self.webpackChunktaxonomy_index_az_list||[];l.forEach(t.bind(null,0)),l.push=t.bind(null,l.push.bind(l))}();var a=n.O(void 0,[431],(function(){return n(333)}));a=n.O(a)}();
//# sourceMappingURL=index.js.map