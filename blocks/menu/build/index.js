(()=>{var e,t={93:(e,t,r)=>{"use strict";const o=window.wp.element,l=window.wp.primitives,n=(0,o.createElement)(l.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,o.createElement)(l.Path,{d:"M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.5c-3.6 0-6.5-2.9-6.5-6.5S8.4 5.5 12 5.5s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5zM9 16l4.5-3L15 8.4l-4.5 3L9 16z"})),a=window.wp.blocks;var i=r(184),s=r.n(i);const c=window.wp.blockEditor,u=window.wp.i18n;function p(e){let{attributes:t,colors:r}=e;const{layout:{orientation:l="horizontal"}={}}=t,{activeColor:n,setActiveColor:a,textColor:i,setTextColor:s,backgroundColor:p,setBackgroundColor:m,borderColor:d,setBorderColor:g}=r,b=[{value:i.color,onChange:s,label:(0,u.__)("Menu Item Text")},{value:p.color,onChange:m,label:(0,u.__)("Menu Item Background")},{value:d.color,onChange:g,label:(0,u.__)("Menu Item Border")},{value:n.color,onChange:a,label:(0,u.__)("Active Menu Item")}];return(0,o.createElement)(c.InspectorControls,{group:"styles"},(0,o.createElement)(c.PanelColorSettings,{__experimentalHasMultipleOrigins:!0,__experimentalIsRenderedInSidebar:!0,title:(0,u.__)("Color"),disableCustomColors:!0,colorSettings:b}))}function m(e){let{attributes:t,colors:r}=e;return(0,o.createElement)(p,{attributes:t,colors:r})}const d=["prc-block/menu-link","prc-block/mega-menu-controller","core/block"],g=(0,c.withColors)({activeColor:"color"},{textColor:"color"},{backgroundColor:"color"},{borderColor:"color"})((function(e){let{attributes:t,setAttributes:r,clientId:l,context:n,isSelected:a,activeColor:i,setActiveColor:u,textColor:p,setTextColor:g,backgroundColor:b,setBackgroundColor:v,borderColor:f,setBorderColor:h}=e;const{className:C,templateLock:x,layout:{justifyContent:w,orientation:k="horizontal",flexWrap:y="wrap"}={}}=t,_=(0,c.useBlockProps)({className:s()(C,{"items-justified-right":"right"===w,"items-justified-space-between":"space-between"===w,"items-justified-left":"left"===w,"items-justified-center":"center"===w,"is-vertical":"vertical"===k,"is-horizontal":"horizontal"===k,"no-wrap":"nowrap"===y,"has-active":i?.color,"has-border":f?.color,"has-background":b?.color,"has-text":p?.color}),style:{"--menu--active-color":`var(--wp--preset--color--${i?.slug})`,"--menu--border-color":`var(--wp--preset--color--${f?.slug})`,"--menu--text-color":`var(--wp--preset--color--${p?.slug})`,"--menu--background-color":`var(--wp--preset--color--${b?.slug})`}}),S=(0,c.useInnerBlocksProps)(_,{allowedBlocks:d,orientation:k});return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(m,{attributes:t,setAttributes:r,colors:{activeColor:i,setActiveColor:u,textColor:p,setTextColor:g,backgroundColor:b,setBackgroundColor:v,borderColor:f,setBorderColor:h},context:n}),(0,o.createElement)("nav",S))})),b=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/menu","version":"0.1.0","title":"Menu","category":"design","description":"Display a menu.","attributes":{"taxonomy":{"type":"string","default":"topic"},"activeColor":{"type":"string"},"textColor":{"type":"string"},"backgroundColor":{"type":"string"},"borderColor":{"type":"string"},"templateLock":{"type":["string","boolean"],"enum":["all","insert","contentOnly",false]}},"providesContext":{"menu/className":"className","menu/taxonomy":"taxonomy","menu/activeColor":"activeColor","menu/textColor":"textColor","menu/backgroundColor":"backgroundColor","menu/borderColor":"borderColor"},"supports":{"align":["wide","full"],"html":false,"reusable":true,"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalSkipSerialization":["textDecoration"]},"spacing":{"blockGap":true,"padding":true,"margin":true,"units":["px","em","rem","vh","vw"],"__experimentalDefaultControls":{"blockGap":true}},"__experimentalLayout":{"allowSwitching":false,"allowInheriting":false,"allowVerticalAlignment":false,"default":{"type":"flex","justifyContent":"left","orientation":"horizontal","flexWrap":"nowrap"}},"__experimentalStyle":{"elements":{"link":{"color":{"text":"inherit"}}}}},"styles":[{"name":"text","label":"Pills","isDefault":true},{"name":"text-only","label":"Text"},{"name":"pointing","label":"Pointing"}],"example":{"attributes":{"borderColor":"gray-light","className":"is-style-pills"},"viewportWidth":420,"innerBlocks":[{"name":"prc-block/menu-link","attributes":{"label":"et ipsum","url":"https://pewresearch.org"}},{"name":"prc-block/menu-link","attributes":{"label":"esse id","url":"https://pewresearch.org"}},{"name":"prc-block/menu-link","attributes":{"label":"sit consectetur reprehenderit","url":"https://pewresearch.org"}}]},"textdomain":"menu","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}'),{name:v}=b,f={icon:n,edit:g,save:function(){return(0,o.createElement)(c.InnerBlocks.Content,null)}};(0,a.registerBlockType)(v,{...b,...f})},184:(e,t)=>{var r;!function(){"use strict";var o={}.hasOwnProperty;function l(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=typeof r;if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)){if(r.length){var a=l.apply(null,r);a&&e.push(a)}}else if("object"===n){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){e.push(r.toString());continue}for(var i in r)o.call(r,i)&&r[i]&&e.push(i)}}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):void 0===(r=function(){return l}.apply(t,[]))||(e.exports=r)}()}},r={};function o(e){var l=r[e];if(void 0!==l)return l.exports;var n=r[e]={exports:{}};return t[e](n,n.exports,o),n.exports}o.m=t,e=[],o.O=(t,r,l,n)=>{if(!r){var a=1/0;for(u=0;u<e.length;u++){for(var[r,l,n]=e[u],i=!0,s=0;s<r.length;s++)(!1&n||a>=n)&&Object.keys(o.O).every((e=>o.O[e](r[s])))?r.splice(s--,1):(i=!1,n<a&&(a=n));if(i){e.splice(u--,1);var c=l();void 0!==c&&(t=c)}}return t}n=n||0;for(var u=e.length;u>0&&e[u-1][2]>n;u--)e[u]=e[u-1];e[u]=[r,l,n]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};o.O.j=t=>0===e[t];var t=(t,r)=>{var l,n,[a,i,s]=r,c=0;if(a.some((t=>0!==e[t]))){for(l in i)o.o(i,l)&&(o.m[l]=i[l]);if(s)var u=s(o)}for(t&&t(r);c<a.length;c++)n=a[c],o.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return o.O(u)},r=globalThis.webpackChunkmenu=globalThis.webpackChunkmenu||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var l=o.O(void 0,[431],(()=>o(93)));l=o.O(l)})();