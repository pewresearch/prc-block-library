!function(){var c,e={472:function(c,e){var t;!function(){"use strict";var r={}.hasOwnProperty;function n(){for(var c=[],e=0;e<arguments.length;e++){var t=arguments[e];if(t){var l=typeof t;if("string"===l||"number"===l)c.push(t);else if(Array.isArray(t)){if(t.length){var o=n.apply(null,t);o&&c.push(o)}}else if("object"===l)if(t.toString===Object.prototype.toString)for(var i in t)r.call(t,i)&&t[i]&&c.push(i);else c.push(t.toString())}}return c.join(" ")}c.exports?(n.default=n,c.exports=n):void 0===(t=function(){return n}.apply(e,[]))||(c.exports=t)}()},975:function(c,e,t){"use strict";var r=window.wp.blocks,n=window.wp.element,l=t(472),o=t.n(l),i=window.wp.blockEditor,a=window.wp.data,s=window.wp.components,u=window.wp.i18n,m=function(c){let{attributes:e,setAttributes:t}=c;const{vertical:r}=e;return(0,n.createElement)(i.InspectorControls,null,(0,n.createElement)(s.PanelBody,{title:(0,u.__)("Tabs Layout")},(0,n.createElement)(s.ToggleControl,{label:"Vertical Orientation",checked:r,onChange:()=>{t({vertical:!r})}})))};const p=[["prc-block/tabs-menu",{}],["prc-block/tabs-panes",{}]],b=["prc-block/tabs-menu","prc-block/tabs-panes"];var f=[{name:"tabs-horizontal",isDefault:!0,title:(0,u.__)("Horizontal Tabs"),description:(0,u.__)("A set of tabs that display horizontally"),attributes:{className:"is-style-tabbed",vertical:!1},innerBlocks:[["prc-block/tabs-menu",{}],["prc-block/tabs-panes",{}]],scope:["inserter","transform"],isActive:c=>!1===c.vertical},{name:"tabs-vertical",title:(0,u.__)("Vertical Tabs"),description:(0,u.__)("A set of tabs that display vertically."),attributes:{className:"is-style-tabbed",vertical:!0},innerBlocks:[["prc-block/tabs-menu",{}],["prc-block/tabs-panes",{}]],scope:["inserter","transform"],isActive:c=>!0===c.vertical}],d=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/tabs","version":"0.1.0","title":"Tabs","description":"Create horizontal or vertical tabbed content.","keywords":["tabs","tabbed content","tabbed content"],"category":"design","icon":"editor-kitchensink","attributes":{"active":{"type":"string","default":null},"vertical":{"type":"boolean","default":false}},"providesContext":{"prc-block/tabs/active":"active","prc-block/tabs/layout":"vertical"},"styles":[{"name":"tabbed","label":"Tabbed","isDefault":true},{"name":"pills","label":"Pills"},{"name":"text","label":"Text"},{"name":"accordion","label":"Accordion"}],"supports":{"html":false,"color":{"background":true,"text":true},"spacing":{"padding":true,"margin":true},"typography":{"fontSize":true,"__experimentalFontFamily":true}},"textdomain":"tabs-controller","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}');const{name:z}=d,v={icon:function(){return(0,n.createElement)(s.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 640 640",height:21,preserveAspectRatio:"xMidYMid meet"},(0,n.createElement)(s.Path,{d:"M64 480c-35.4 0-64-28.7-64-64c0-21.3 0-42.7 0-64c0-35.3 28.7-64 64-64c88.4 0 176.7 0 265 0c-2.7 6.2-5 12.5-7 18.9c-1.4 4.4-2 8.8-2.1 13.1c-85.3 0-170.7 0-256 0c-17.7 0-32 14.3-32 32c0 21.3 0 42.7 0 64c0 17.7 14.3 32 32 32c90.9 0 181.8 0 272.7 0c6.3 11.4 13.9 22.2 22.5 32c-98.4 0-196.8 0-295.2 0zM192 112c8.8 0 16 7.2 16 16s-7.2 16-16 16c-32 0-64 0-96 0c-8.8 0-16-7.2-16-16s7.2-16 16-16c32 0 64 0 96 0zm87.4-48c5.5 9.4 8.6 20.3 8.6 32c0 21.3 0 42.7 0 64c0 35.3-28.7 64-64 64c-53.3 0-106.7 0-160 0c-35.4 0-64-28.7-64-64c0-21.3 0-42.7 0-64C0 60.7 28.7 32 64 32c101.4 0 202.7 0 304 0c35.3 0 64 28.7 64 64c0 29.8 0 59.6 0 89.4c12.2-12.2 24.5-24.5 36.7-36.7c6.2-6.3 16.4-6.3 22.6 0c6.3 6.2 6.3 16.4 0 22.6c-1.7 1.7-3.4 3.4-5.1 5.1c-10.1 .6-20.1 1.9-29.9 4.2c-21.8 5-36.2 24.9-36.2 46.9c-8.6-4.8-18.8-6.8-28.8-5.7c-16.8-16.8-33.7-33.7-50.5-50.5c-6.3-6.2-6.3-16.4 0-22.6c6.2-6.3 16.4-6.3 22.6 0c12.2 12.2 24.5 24.5 36.7 36.7c0-29.8 0-59.6 0-89.4c0-17.7-14.3-32-32-32c-29.5 0-59.1 0-88.6 0zM224 64L64 64C46.3 64 32 78.3 32 96c0 21.3 0 42.7 0 64c0 17.7 14.3 32 32 32c53.3 0 106.7 0 160 0c17.7 0 32-14.3 32-32c0-21.3 0-42.7 0-64c0-17.7-14.3-32-32-32zM429.9 279.9l-8 13.9c5.8 3.3 13.1 2.7 18.2-1.5c-3.4-4.1-6.8-8.2-10.2-12.3c0-.1 0 0 0-.1zm-9.2-23.7l-16 27.7c5.7 3.3 11.5 6.6 17.2 9.9c5.3-9.2 10.7-18.5 16-27.7c-5.7-3.3-11.5-6.6-17.2-9.9zm39.7 6.2c1.8 5 3.7 10 5.5 15c6.3-2.3 10.5-8.3 10.5-15c-5.3 0-10.7 0-16 0zm16-19.9c0-1 .2-.6-.3 0c-.2 .3 .1-.3 2.1-.9c4.5-1.4 10.8-1.6 18-1.6c0-10.7 0-21.3 0-32c-.1 0 0 0-.1 0c-6 0-17.5-.1-27.6 3.1c-5.3 1.7-11.4 4.6-16.3 10.1c-5.2 5.7-7.8 13.1-7.8 21.3c10.7 0 21.3 0 32 0zm19.7-2.5l.3 0c0-10.7 0-21.3 0-32c-.1 0-.2 0-.3 0c0 10.7 0 21.3 0 32zm52.5 2.5c-.1-8.3-3-15.6-8.2-21.3c-4.9-5.3-11-8.2-16.2-9.8c-10.1-3.3-21.5-3.4-27.7-3.4c0 10.7 0 21.3 0 32c6.6 0 13.2 .3 17.9 1.8c2.2 .7 2.7 1.3 2.6 1.2c-.5-.5-.4-1.1-.5-.5c10.7 0 21.4 0 32 0zm-16.1 20l-16 0c0 6.7 4.2 12.7 10.4 15c1.9-5 3.7-10 5.6-15zm30.2 17.6c-3.3 4.1-6.8 8.2-10.2 12.3c5.2 4.3 12.4 4.9 18.3 1.6c-2.7-4.6-5.4-9.3-8-13.9zm25.5 3.8c.5-.3 0 0-.7-.1c-.2 0 .6 .1 2.3 1.7c3.7 3.3 7.2 8.9 10.5 14.6c9.2-5.3 18.5-10.7 27.7-16c.1-.1 0 0 .1-.1c-3.1-5.4-8.9-15.2-16.8-22.3c-4.1-3.7-9.6-7.5-16.6-9.1c-7.5-1.7-15.3-.6-22.5 3.6c5.3 9.2 10.7 18.5 16 27.7zm10.5 58.7l-8-13.9c-5.8 3.3-8.9 9.9-7.8 16.5c5.3-.9 10.5-1.8 15.8-2.7c0 .1 0 0 0 .1zm0 34.9l-15.8-2.7c-1.1 6.6 2 13.2 7.8 16.5c2.6-4.6 5.3-9.3 8-13.9c0 .1 0 0 0 .1zm17.5 10.1l-8 13.8c2.7-4.6 5.3-9.3 8-13.9c0 .1 0 0 0 .1zm11.9 48.5c3.1-5.4 8.7-15.3 11-25.7c1.1-5.4 1.7-12.1-.4-18.9c-2.3-7.4-7.1-13.5-14.3-17.7c-5.4 9.2-10.8 18.4-16.2 27.6c.5 .3 0 0-.2-.7c-.1-.2 .2 .6-.3 2.8c-1 4.8-4.1 10.7-7.4 16.4c9.2 5.3 18.5 10.7 27.7 16c.1 .1 0 .1 .1 .2zm-55.9 27.8l16-27.8c-5.8-3.4-11.6-6.7-17.4-10.1c-5.3 9.2-10.7 18.5-16 27.7c5.8 3.5 11.6 6.8 17.4 10.2zm-9.4-24l8-13.9c-5.8-3.4-13.1-2.7-18.2 1.6c3.4 4.1 6.8 8.2 10.2 12.3zm-30.3 17.6c-1.9-5-3.7-10-5.5-15c-6.3 2.3-10.5 8.3-10.5 15c5.3 0 10.7 0 16 0zm-16 20l32 0c0-6.7 0-13.3 0-20c-10.7 0-21.3 0-32 0c0 6.7 0 13.3 0 20zm-72.1 0c0 8.3 2.9 15.6 8.1 21.3c4.9 5.3 11 8.2 16.2 9.8c10.1 3.3 21.5 3.4 27.7 3.4c0-10.7 0-21.3 0-32c-6.6 0-13.2-.3-17.9-1.8c-2.2-.7-2.7-1.3-2.6-1.2c.5 .5 .4 1.1 .4 .5c-10.7 0-21.3 0-32 0zm16-19.9l16 0c0-6.7-4.2-12.7-10.5-15c-1.8 5-3.7 10-5.5 15zM429.9 440l10.2-12.3c-5.2-4.3-12.4-4.9-18.2-1.5c2.7 4.6 5.3 9.3 8 13.9c0-.1 0 0 0-.1zm-25.2-3.9l16 27.7c-.1 .1 0 0-.1 .1c-5.3-9.3-10.6-18.5-15.9-27.8zm-12-15.8c-3.3-5.8-6.5-11.7-7.6-16.6c-.5-2.3-.2-3.1-.3-2.9c-.2 .7-.7 .9-.2 .6c-5.3-9.2-10.7-18.5-16-27.7c.1 0 0 0 .1 0c-7.3 4.2-12.3 10.4-14.5 17.8c-2.1 6.9-1.5 13.7-.3 19.1c2.3 10.4 8 20.4 11.1 25.7c9.2-5.3 18.5-10.7 27.7-16zm1-42.6c2.7 4.6 5.3 9.3 8 13.9c5.8-3.3 8.9-10 7.8-16.5c-5.3 .9-10.5 1.8-15.8 2.7zm0-35.3l15.8 2.6c1.1-6.6-2-13.2-7.8-16.6c-2.7 4.6-5.3 9.3-8 13.9c0 .1 0 0 0 .1zm-9.1-23.8l-16 27.7c5.7 3.3 11.4 6.6 17.1 9.9c5.3-9.2 10.7-18.5 16-27.7c-5.7-3.3-11.4-6.6-17.1-9.9zm7.8-18.3c0-.1 .1-.2 .2-.3c-9.3-5.3-18.5-10.7-27.8-16c-.1 .1-.1 .2-.2 .3c9.2 5.3 18.5 10.7 27.8 16zM378.7 292c4.6 2.7 9.3 5.3 13.9 8c-4.6-2.7-9.3-5.3-14-8c.1 0 0 0 .1 0zm76.2-44.7c-12.9 4.8-24.8 11.7-35.2 20.3c6.8 8.2 13.6 16.4 20.4 24.6c7.6-6.3 16.3-11.4 25.8-14.9c-3.7-10.1-7.3-20.1-11-30.1zm-10.5 15l32 .1c0-6.6 0-13.3 0-19.9c-10.7 0-21.3 0-32 0c0 6.5 0 13.2 0 19.8zm104.1 .2c0-6.7 0-13.3 .1-20c-10.6 0-21.3 0-32 0c0 6.7 0 13.3 0 20c10.7 0 21.3 0 32 0zm24.5 5.3c-10.3-8.6-22.1-15.5-35-20.3c-3.7 10-7.4 20-11.1 30c9.4 3.5 18.1 8.6 25.6 14.9c6.8-8.2 13.7-16.4 20.5-24.6zm-18.2-1.5c5.3 9.2 10.7 18.5 16 27.7c5.9-3.4 11.7-6.7 17.5-10.1c-5.3-9.2-10.7-18.5-16-27.7c-5.8 3.4-11.6 6.7-17.4 10.1zm69.5 80l-16.1-27.7c-5.8 3.4-11.7 6.7-17.5 10.1c5.3 9.2 10.7 18.5 16 27.7c.1 0 0 0 .1 0c5.8-3.4 11.7-6.7 17.5-10.1zm14.3-17.7c2.1-6.9 1.6-13.6 .4-18.9c-2.2-10.4-7.8-20.3-10.9-25.7c-9.3 5.3-18.5 10.7-27.8 16c3.3 5.7 6.3 11.6 7.4 16.4c.5 2.3 .2 3 .3 2.8c.2-.7 .7-.9 .2-.7c5.3 9.2 10.7 18.5 16 27.7c.1 .1 0 0 .1 .1c7.2-4.2 12.1-10.3 14.3-17.7zm-24 51.6c2.2-13.1 2.2-27.2 0-40.3c-10.5 1.8-21.1 3.5-31.6 5.3c1.6 9.6 1.6 20 0 29.6c10.5 1.8 21.1 3.5 31.6 5.3c0 .1 0 0 0 .1zm-7.8-16.6c-5.3 9.2-10.7 18.5-16 27.7c5.9 3.4 11.7 6.7 17.5 10.1c5.4-9.2 10.8-18.4 16.2-27.6c-5.9-3.4-11.7-6.8-17.6-10.2zm17.4 10.1c.1 .1 0 0 .2 .1c-5.4 9.2-10.8 18.4-16.2 27.6c5.3-9.2 10.7-18.5 16-27.7zm-29.5 93.8c7-1.6 12.6-5.4 16.6-9.1c7.9-7.1 13.7-17 16.8-22.3c-9.2-5.3-18.5-10.6-27.7-16c-3.3 5.7-6.8 11.3-10.5 14.6c-1.7 1.6-2.5 1.7-2.3 1.7c.7-.2 1.2 .2 .7-.1c-5.3 9.2-10.7 18.5-16 27.7c-.1-.1 0 0-.1-.1c7.2 4.2 15 5.3 22.5 3.6zm-56.6 5c12.9-4.8 24.7-11.7 35-20.3c-6.8-8.2-13.7-16.4-20.5-24.6c-7.6 6.3-16.2 11.4-25.6 14.9c3.8 10 7.5 20 11.1 30zm-14 36.1c5.2-1.7 11.3-4.6 16.2-9.8c5.2-5.6 8.1-12.9 8.1-21.3c-10.6 0-21.3 0-31.9 0c0 .5 0 0 .4-.5c.1-.1-.4 .5-2.6 1.2c-4.7 1.5-11.3 1.8-17.9 1.8c0 10.7 0 21.3 0 32c6.2 0 17.6-.1 27.7-3.4zm-79.7-51l0 19.9c10.6 0 21.3 0 32 0c0-6.6 0-13.3 0-19.9c-10.7 0-21.3 0-32 0zm-24.8-5.2c10.4 8.6 22.3 15.5 35.2 20.3c3.7-10 7.3-20 11-30c-9.5-3.5-18.2-8.5-25.8-14.9c-6.8 8.2-13.6 16.4-20.4 24.6zm18.2 1.6l-16-27.7c-5.7 3.3-11.4 6.5-17.1 9.8c5.3 9.3 10.7 18.5 15.9 27.8c5.7-3.3 11.4-6.6 17.2-9.9zm-56.4 4.7c4.1 3.7 9.7 7.6 16.9 9.1c7.6 1.6 15.3 .2 22.4-3.9c-5.3-9.3-10.6-18.5-15.9-27.8c-.9 .5-.6 .1 .2 .3c.3 .1-.3 0-1.8-1.4c-3.5-3.2-6.8-8.6-10.3-14.8c-9.3 5.4-18.5 10.7-27.8 16.1c3 5.2 8.6 15.3 16.4 22.4zm4.3-94.9l-17.1 9.9c5.3 9.2 10.7 18.5 16 27.7c5.7-3.3 11.4-6.6 17.1-9.9c-5.3-9.3-10.7-18.5-16-27.8zM378 339.6c-2.3 13.3-2.3 27.4 0 40.7c10.5-1.8 21-3.5 31.5-5.3c-1.7-9.7-1.7-20.2 0-29.9c-10.5-1.8-21-3.6-31.5-5.4c0-.1 0 0 0-.1zm-24.5-29.9c-1.2 5.4-1.7 12.2 .6 19.1c2.4 7.4 7.5 13.4 14.6 17.4c5.3-9.2 10.7-18.5 16-27.7c-.9-.5-.4-.5-.2 .3c.1 .3-.2-.2 .3-2.3c1-4.6 4.1-10.2 7.6-16.3c-9.3-5.3-18.5-10.6-27.8-15.9c-3 5.2-8.9 15.1-11.1 25.4zm44.7-57.1c-7 1.6-12.6 5.4-16.6 9.1c-7.9 7.1-13.7 16.9-16.8 22.3c9.2 5.3 18.5 10.7 27.8 16c3.2-5.7 6.7-11.3 10.4-14.6c1.7-1.6 2.5-1.7 2.3-1.7c-.7 .2-1.2-.2-.7 .1c5.4-9.2 10.7-18.4 16.1-27.6c-7.2-4.2-15-5.3-22.5-3.6zM520.4 360.3c0 13.3-10.7 24-24 24c0 10.7 0 21.3 0 32c30.9 0 56-25.1 56-56c-10.7 0-21.3 0-32 0zm-24-24c13.3 0 24 10.7 24 24c10.7 0 21.3 0 32 0c0-30.9-25.1-56-56-56c0 10.7 0 21.3 0 32zm-24 24c0-13.3 10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24zm-32 0c0 30.9 25.1 56 56 56s56-25.1 56-56s-25.1-56-56-56s-56 25.1-56 56z"}))},edit:function(c){let{attributes:e,setAttributes:t,context:r,clientId:l,isSelected:s}=c;const[u,f]=(0,n.useState)(!1),{vertical:d}=e,z=(0,i.useBlockProps)({className:o()({"is-vertical-tabs":d,"is-horizontal-tabs":!d})}),v=(0,i.useInnerBlocksProps)({},{allowedBlocks:b,renderAppender:!1,orientation:d?"vertical":"horizontal",template:p,templateLock:"all"}),{menuBlocks:k,paneBlocks:h}=(0,a.useSelect)((c=>{if(void 0===l)return;const e=c("core/block-editor").getBlocks(l),t=1<=e.length?e.filter((c=>"prc-block/tabs-menu"===c.name)):[],r=1<=e.length?e.filter((c=>"prc-block/tabs-panes"===c.name)):[];return{menuBlocks:1<=t.length&&t[0].innerBlocks,paneBlocks:1<=r.length&&r[0].innerBlocks}}),[l]);return(0,n.useEffect)((()=>{if(console.log("menuBlocks",k),k.length<u.length){const c=((c,e)=>{const t=c=>e=>0===c.filter((c=>c.attributes.uuid===e.attributes.uuid)).length,r=c.filter(t(e)),n=e.filter(t(c));return r.concat(n)})(u,k),e=h.filter((e=>e.attributes.uuid===c[0].attributes.uuid));(0,a.dispatch)("core/block-editor").removeBlock(e[0].clientId)}f(k)}),[k]),(0,n.createElement)(n.Fragment,null,(0,n.createElement)("div",z,(0,n.createElement)("div",v)),(0,n.createElement)(m,{attributes:e,setAttributes:t}))},save:function(){return(0,n.createElement)(i.InnerBlocks.Content,null)},variations:f};(0,r.registerBlockType)(z,{...d,...v})}},t={};function r(c){var n=t[c];if(void 0!==n)return n.exports;var l=t[c]={exports:{}};return e[c](l,l.exports,r),l.exports}r.m=e,c=[],r.O=function(e,t,n,l){if(!t){var o=1/0;for(u=0;u<c.length;u++){t=c[u][0],n=c[u][1],l=c[u][2];for(var i=!0,a=0;a<t.length;a++)(!1&l||o>=l)&&Object.keys(r.O).every((function(c){return r.O[c](t[a])}))?t.splice(a--,1):(i=!1,l<o&&(o=l));if(i){c.splice(u--,1);var s=n();void 0!==s&&(e=s)}}return e}l=l||0;for(var u=c.length;u>0&&c[u-1][2]>l;u--)c[u]=c[u-1];c[u]=[t,n,l]},r.n=function(c){var e=c&&c.__esModule?function(){return c.default}:function(){return c};return r.d(e,{a:e}),e},r.d=function(c,e){for(var t in e)r.o(e,t)&&!r.o(c,t)&&Object.defineProperty(c,t,{enumerable:!0,get:e[t]})},r.o=function(c,e){return Object.prototype.hasOwnProperty.call(c,e)},function(){var c={826:0,431:0};r.O.j=function(e){return 0===c[e]};var e=function(e,t){var n,l,o=t[0],i=t[1],a=t[2],s=0;if(o.some((function(e){return 0!==c[e]}))){for(n in i)r.o(i,n)&&(r.m[n]=i[n]);if(a)var u=a(r)}for(e&&e(t);s<o.length;s++)l=o[s],r.o(c,l)&&c[l]&&c[l][0](),c[l]=0;return r.O(u)},t=self.webpackChunktabs_controller=self.webpackChunktabs_controller||[];t.forEach(e.bind(null,0)),t.push=e.bind(null,t.push.bind(t))}();var n=r.O(void 0,[431],(function(){return r(975)}));n=r.O(n)}();