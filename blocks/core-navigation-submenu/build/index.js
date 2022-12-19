(()=>{"use strict";var e,t={274:()=>{const e=window.wp.element,t=window.wp.i18n,r=window.wp.hooks,n=window.wp.compose,o=window.wp.blockEditor,a=window.wp.components;function s(r){let{attributes:n,setAttributes:s}=r;const{subExpandOpenedLabel:l,label:i}=n;let u="More"===i?"Less":"~ Less or Close or Collapse ~";return"Expand"===i&&(u="Collapse"),"Open"===i&&(u="Close"),(0,e.createElement)(o.InspectorControls,null,(0,e.createElement)(a.PanelBody,{title:"Sub Expand Settings"},(0,e.createElement)(a.TextControl,{label:(0,t.__)("Expanded Label","prc-block-library-core-blocks"),help:(0,t.__)("Label for expanded submenu","prc-block-library-core-blocks"),value:l,onChange:e=>s({subExpandOpenedLabel:e}),placeholder:u})))}function l(t){let{attributes:r,setAttributes:n,context:o}=t;return(0,e.createElement)(s,{attributes:r,setAttributes:n,context:o})}const i="core/navigation-submenu",u="prc-block-library/core-navigation-submenu";(0,r.addFilter)("blocks.registerBlockType",u,((e,t)=>{if(i!==t)return e;const r=e;return!e.attributes||e.attributes.subExpandOpenedLabel||e.attributes.subExpandIsOpenedOnClick||(r.attributes.subExpandOpenedLabel={type:"string"}),{...e,...r}})),(0,r.addFilter)("editor.BlockEdit",u,(0,n.createHigherOrderComponent)((t=>function(r){const{name:n,attributes:o,setAttributes:a}=r;if(i!==n)return(0,e.createElement)(t,r);const{className:s}=o;return"is-style-sub-expand"!==s?(0,e.createElement)(t,r):(0,e.createElement)(e.Fragment,null,(0,e.createElement)(t,r),(0,e.createElement)(l,{attributes:o,setAttributes:a,context:!1}))}),"withCoreNavigationSubmenuControls"),21)}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var a=r[e]={exports:{}};return t[e](a,a.exports,n),a.exports}n.m=t,e=[],n.O=(t,r,o,a)=>{if(!r){var s=1/0;for(c=0;c<e.length;c++){for(var[r,o,a]=e[c],l=!0,i=0;i<r.length;i++)(!1&a||s>=a)&&Object.keys(n.O).every((e=>n.O[e](r[i])))?r.splice(i--,1):(l=!1,a<s&&(s=a));if(l){e.splice(c--,1);var u=o();void 0!==u&&(t=u)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[r,o,a]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,a,[s,l,i]=r,u=0;if(s.some((t=>0!==e[t]))){for(o in l)n.o(l,o)&&(n.m[o]=l[o]);if(i)var c=i(n)}for(t&&t(r);u<s.length;u++)a=s[u],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(c)},r=globalThis.webpackChunkcore_navigation_submenu=globalThis.webpackChunkcore_navigation_submenu||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=n.O(void 0,[431],(()=>n(274)));o=n.O(o)})();