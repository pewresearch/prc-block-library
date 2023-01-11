(()=>{"use strict";var e,t={115:(e,t,r)=>{const n=window.wp.i18n,i=window.wp.blocks,o=window.wp.element,a=window.wp.blockEditor,s=window.wp.apiFetch;var l=r.n(s);const f=window.wp.components,c=[{name:"staff-name",title:(0,n.__)("Staff Name"),attributes:{valueToFetch:"name"},default:!0,isActive:e=>{let{valueToFetch:t}=e;return"name"===t}},{name:"staff-job-title",title:(0,n.__)("Staff Job Title"),attributes:{valueToFetch:"jobTitle"},isActive:e=>{let{valueToFetch:t}=e;return"jobTitle"===t}},{name:"staff-twitter",title:(0,n.__)("Staff Twitter"),attributes:{valueToFetch:"twitter"},isActive:e=>{let{valueToFetch:t}=e;return"twitter"===t}}],u=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/staff-info","version":"0.1.0","title":"Staff Info","category":"theme","description":"Display staff info from a byline; supports name, job title, twitter, and expertise.","attributes":{"valueToFetch":{"type":"string","enum":["name","jobTitle","twitter","expertise"]}},"supports":{"anchor":true,"html":false,"spacing":{"margin":["top","bottom"],"padding":true},"typography":{"fontSize":true,"__experimentalFontFamily":true}},"usesContext":["bylineTermId","staffPostId","staffName","staffJobTitle","staffTwitter"],"ancestor":["prc-block/bylines-query","prc-block/staff-query"],"textdomain":"staff-info","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}'),{name:p}=u,d={icon:function(){return(0,o.createElement)(f.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 576 512",height:21,preserveAspectRatio:"xMidYMid meet"},(0,o.createElement)(f.Path,{d:"M368 344h96c13.25 0 24-10.75 24-24s-10.75-24-24-24h-96c-13.25 0-24 10.75-24 24S354.8 344 368 344zM208 320c35.35 0 64-28.65 64-64c0-35.35-28.65-64-64-64s-64 28.65-64 64C144 291.3 172.7 320 208 320zM512 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM528 416c0 8.822-7.178 16-16 16h-192c0-44.18-35.82-80-80-80h-64C131.8 352 96 387.8 96 432H64c-8.822 0-16-7.178-16-16V160h480V416zM368 264h96c13.25 0 24-10.75 24-24s-10.75-24-24-24h-96c-13.25 0-24 10.75-24 24S354.8 264 368 264z"}))},edit:function(e){let{attributes:t,setAttributes:r,context:n,clientId:i,isSelected:s}=e;const{valueToFetch:f}=t,{bylineTermId:c,staffName:u,staffJobTitle:p,staffTwitter:d}=n;console.log("Context",n);const[v,h]=(0,o.useState)("Jane Doe");(0,o.useEffect)((()=>{void 0!==c&&function(e,t){return new Promise((r=>{l()({path:`/wp/v2/bylines/${e}`}).then((e=>{const{name:n,staff_info:i}=e,o="name"!==t?i[`${t}`]:n;return r(o)}))}))}(c,f).then((e=>{h(e)})),void 0!==u&&"name"===f&&h(u),void 0!==p&&"jobTitle"===f&&h(p),void 0!==d&&"twitter"===f&&h(d)}),[c,u,p,d,f]);const m=(0,a.useBlockProps)();return(0,o.createElement)("div",m,v)},save:function(e){let{attributes:t}=e;return(0,o.createElement)(a.InnerBlocks.Content,null)},variations:c};(0,i.registerBlockType)(p,{...u,...d})}},r={};function n(e){var i=r[e];if(void 0!==i)return i.exports;var o=r[e]={exports:{}};return t[e](o,o.exports,n),o.exports}n.m=t,e=[],n.O=(t,r,i,o)=>{if(!r){var a=1/0;for(c=0;c<e.length;c++){r=e[c][0],i=e[c][1],o=e[c][2];for(var s=!0,l=0;l<r.length;l++)(!1&o||a>=o)&&Object.keys(n.O).every((e=>n.O[e](r[l])))?r.splice(l--,1):(s=!1,o<a&&(a=o));if(s){e.splice(c--,1);var f=i();void 0!==f&&(t=f)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[r,i,o]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var i,o,a=r[0],s=r[1],l=r[2],f=0;if(a.some((t=>0!==e[t]))){for(i in s)n.o(s,i)&&(n.m[i]=s[i]);if(l)var c=l(n)}for(t&&t(r);f<a.length;f++)o=a[f],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(c)},r=self.webpackChunkstaff_info=self.webpackChunkstaff_info||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var i=n.O(void 0,[431],(()=>n(115)));i=n.O(i)})();