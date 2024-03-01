(()=>{"use strict";var e,t={703:()=>{const e=window.React,t=window.wp.hooks,r=window.wp.compose,n=window.wp.element,o=window.wp.i18n,l=window.wp.blockEditor,i=window.wp.components;function a({attributes:t,setAttributes:r}){const{title:n,description:a,url:c}=t;return(0,e.createElement)(l.InspectorControls,null,(0,e.createElement)(i.PanelBody,{title:"Share Meta"},(0,e.createElement)(i.TextControl,{label:(0,o.__)("Title","prc-block-library"),value:n,onChange:e=>r({title:e})}),(0,e.createElement)(i.TextControl,{label:(0,o.__)("Description","prc-block-library"),value:a,onChange:e=>r({description:e})}),(0,e.createElement)(i.TextControl,{label:(0,o.__)("URL","prc-block-library"),help:(0,o.__)("Setting a url here will override any selections on the individual social links.","prc-block-library"),value:c,onChange:e=>r({url:e})})))}function c({attributes:t,setAttributes:r,context:n}){return(0,e.createElement)(a,{attributes:t,setAttributes:r,context:n})}(0,t.addFilter)("editor.BlockEdit","prc-block-library/core-social-links",(0,r.createHigherOrderComponent)((t=>function(r){const{name:o,attributes:l,setAttributes:i}=r;return"core/social-links"!==o?(0,e.createElement)(t,{...r}):(0,e.createElement)(n.Fragment,null,(0,e.createElement)(t,{...r}),(0,e.createElement)(c,{attributes:l,setAttributes:i,context:!1}))}),"withCoreSocialLinksControls"),21)}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var l=r[e]={exports:{}};return t[e](l,l.exports,n),l.exports}n.m=t,e=[],n.O=(t,r,o,l)=>{if(!r){var i=1/0;for(u=0;u<e.length;u++){for(var[r,o,l]=e[u],a=!0,c=0;c<r.length;c++)(!1&l||i>=l)&&Object.keys(n.O).every((e=>n.O[e](r[c])))?r.splice(c--,1):(a=!1,l<i&&(i=l));if(a){e.splice(u--,1);var s=o();void 0!==s&&(t=s)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[r,o,l]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,l,[i,a,c]=r,s=0;if(i.some((t=>0!==e[t]))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(c)var u=c(n)}for(t&&t(r);s<i.length;s++)l=i[s],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(u)},r=globalThis.webpackChunkcore_social_links=globalThis.webpackChunkcore_social_links||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=n.O(void 0,[350],(()=>n(703)));o=n.O(o)})();
//# sourceMappingURL=index.js.map