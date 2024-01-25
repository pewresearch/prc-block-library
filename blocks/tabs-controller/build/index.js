!function(){var e,t={472:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var s=i.apply(null,n);s&&e.push(s)}}else if("object"===o){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var c in n)r.call(n,c)&&n[c]&&e.push(c)}}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0===(n=function(){return i}.apply(t,[]))||(e.exports=n)}()},15:function(e,t,n){"use strict";var r=window.wp.blocks,i=window.wp.data;const o={clientIdsOnPage:[],clientIdsActiveUUIDPairs:{}},s={setClientId(e){return{type:"SET_CLIENT_ID",clientId:e}},setActiveUUIDPair(e,t){return{type:"SET_ACTIVE_UUID_PAIR",clientId:e,uuid:t}}},c=(0,i.createReduxStore)("prc-block/tabs-controller",{reducer(e=o,t){switch(t.type){case"SET_CLIENT_ID":return{...e,clientIdsOnPage:[...e.clientIdsOnPage,t.clientId]};case"SET_ACTIVE_UUID_PAIR":return{...e,clientIdsActiveUUIDPairs:{...e.clientIdsActiveUUIDPairs,[t.clientId]:t.uuid}}}return e},actions:s,selectors:{getClientIdsOnPage(e){return e.clientIdsOnPage},getActiveUUID(e,t){return e.clientIdsActiveUUIDPairs[t]}}});var a=window.React,l=n(472),u=n.n(l),b=window.wp.element,d=window.wp.blockEditor;const p=[["prc-block/tabs-menu",{}],["prc-block/tabs-panes",{}]],f=["prc-block/tabs-menu","prc-block/tabs-panes"];var k=window.prcIcons,m=window.wp.i18n,h=[{name:"tabs-horizontal",isDefault:!0,title:(0,m.__)("Horizontal Tabs"),description:(0,m.__)("A set of tabs that display horizontally"),attributes:{className:"is-style-tabbed",vertical:!1},innerBlocks:[["prc-block/tabs-menu",{}],["prc-block/tabs-panes",{}]],scope:["inserter","transform"],isActive:e=>!1===e.vertical},{name:"tabs-vertical",title:(0,m.__)("Vertical Tabs"),description:(0,m.__)("A set of tabs that display vertically."),attributes:{className:"is-style-tabbed",vertical:!0},innerBlocks:[["prc-block/tabs-menu",{}],["prc-block/tabs-panes",{}]],scope:["inserter","transform"],isActive:e=>!0===e.vertical}],v=window.wp.htmlEntities;const g=(e,t,n)=>{const r={name:"prc-block/taxonomy-list",attributes:{fontFamily:"sans-serif",layout:{justifyContent:"left",type:"flex",orientation:"vertical"}},innerBlocks:[{name:"prc-block/taxonomy-menu-link",attributes:{label:(0,v.decodeEntities)(e),url:t,id:"",className:"is-style-sub-heading",style:{typography:{fontSize:"21px"}}}}]};return n.forEach((e=>{"prc-block/taxonomy-search"===e.name&&r.innerBlocks.push({name:"prc-block/taxonomy-search",attributes:e.attributes}),"prc-block/taxonomy-tree"===e.name&&(r.innerBlocks.push({name:"prc-block/taxonomy-menu-link",attributes:{label:e.attributes.subHeading?(0,v.decodeEntities)(e.attributes.subHeading):"Key Topics",id:"",url:"",style:{typography:{fontSize:"18px",fontStyle:"normal",fontWeight:"700"}}}}),e.innerBlocks.forEach((e=>{const t=e.innerBlocks,n=[];t.forEach((e=>{n.push({name:"prc-block/taxonomy-menu-link",attributes:{label:(0,v.decodeEntities)(e.attributes.label),url:e.attributes.url,id:e.attributes.id}})})),r.innerBlocks.push({name:"prc-block/taxonomy-menu-link",attributes:{label:(0,v.decodeEntities)(e.attributes.label),url:e.attributes.url,id:e.attributes.id,enableSubMenu:0<t.length,className:u()({"is-style-sub-tree":0<t.length})},innerBlocks:n})})))})),console.log(`${e}: `,n),[r]};var y={from:[{type:"block",blocks:["prc-block/topic-index-condensed-controller"],transform:(e,t)=>!(!Array.isArray(t)||0===t.length)&&(e=>{const t={name:"prc-block/tabs-menu",attributes:{},innerBlocks:[]},n={name:"prc-block/tabs-panes",attributes:{},innerBlocks:[]},i=e.filter((e=>"prc-block/topic-index-condensed-menu"===e.name))[0],o=i.innerBlocks.map((e=>{const{title:t,uuid:n}=e.attributes;return{title:t,uuid:n}})).map((e=>({name:"prc-block/tabs-menu-item",attributes:{title:(0,v.decodeEntities)(e.title),uuid:e.uuid}})));t.innerBlocks=o;const s=e.filter((e=>"prc-block/topic-index-condensed-pages"===e.name))[0],c=s.innerBlocks.map((e=>{const{heading:t,uuid:n,url:r}=e.attributes;return{heading:t,uuid:n,url:r,innerBlocks:e.innerBlocks}})).map((e=>({name:"prc-block/tabs-pane",attributes:{uuid:e.uuid},innerBlocks:g(e.heading,e.url,e.innerBlocks)})));n.innerBlocks=c,console.log(i,s),console.log("newMenu",t),console.log("newPanes",n);const a=[t,n];return console.log("newInnerBlocks",a),(0,r.createBlock)("prc-block/tabs",{vertical:!0,className:"is-style-accordion"},(0,r.createBlocksFromInnerBlocksTemplate)(a))})(t)}]},I=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/tabs","version":"1.0.0","title":"Tabs","description":"Create horizontal or vertical tabbed content.","keywords":["tabs","tabbed content","tabbed content"],"category":"design","icon":"editor-kitchensink","attributes":{"vertical":{"type":"boolean","default":false},"disableMobileAccordion":{"type":"boolean","default":false}},"providesContext":{"prc-block/tabs/layout":"vertical"},"styles":[{"name":"tabbed","label":"Tabbed","isDefault":true},{"name":"text","label":"Text"},{"name":"accordion","label":"Accordion"}],"supports":{"html":false,"color":{"background":true,"text":true},"spacing":{"padding":true,"margin":true},"typography":{"fontSize":true,"__experimentalFontFamily":true},"interactivity":true},"textdomain":"tabs-controller","editorScript":"file:./index.js","style":"file:./style-index.css"}');const{name:B}=I,w={icon:function(){return(0,a.createElement)(k.Icon,{icon:k.icons.faDiagramPredecessor,height:18,preserveAspectRatio:"xMidYMid meet"})},edit:function({attributes:e,setAttributes:t,context:n,clientId:r,isSelected:o}){const[s,c]=(0,b.useState)(!1),{vertical:l}=e,{removeBlock:k,selectBlock:m}=(0,i.useDispatch)("core/block-editor"),{setClientId:h,setActiveUUIDPair:v}=(0,i.useDispatch)("prc-block/tabs-controller"),{menuBlocks:g,paneBlocks:y,matchedPaneClientId:I,activeUUID:B,isTyping:w}=(0,i.useSelect)((e=>{if(void 0===r)return;const t=e("prc-block/tabs-controller").getActiveUUID(r),n=e("core/block-editor").getBlocks(r),i=1<=n.length?n.filter((e=>"prc-block/tabs-menu"===e.name)):[],o=1<=n.length?n.filter((e=>"prc-block/tabs-panes"===e.name)):[];let s=!1;if(1<=o.length){const e=o[0].innerBlocks.filter((e=>e.attributes.uuid===t));1<=e.length&&(s=e[0].clientId)}return{menuBlocks:1<=i.length&&i[0].innerBlocks,paneBlocks:1<=o.length&&o[0].innerBlocks,matchedPaneClientId:s,activeUUID:t,isTyping:e("core/block-editor").isTyping()}}),[r]),x=(0,i.useSelect)((e=>o||e("core/block-editor").hasSelectedInnerBlock(r,!0)),[o,r]);(0,b.useEffect)((()=>{h(r),void 0===B&&1<=g.length&&v(r,g[0].attributes.uuid)}),[r,B,g,y]),(0,b.useEffect)((()=>{if(g.length<s.length){const e=((e,t)=>{const n=e=>t=>0===e.filter((e=>e.attributes.uuid===t.attributes.uuid)).length,r=e.filter(n(t)),i=t.filter(n(e));return r.concat(i)})(s,g),t=y.filter((t=>t.attributes.uuid===e[0].attributes.uuid));0!==t.length&&k(t[0].clientId)}c(g)}),[g]),(0,b.useEffect)((()=>{x&&void 0!==B&&m(I)}),[x,B,I]);const E=(0,d.useBlockProps)({className:u()({"is-vertical-tabs":l,"is-horizontal-tabs":!l})}),A=(0,d.useInnerBlocksProps)({},{allowedBlocks:f,renderAppender:!1,orientation:l?"vertical":"horizontal",template:p});return(0,a.createElement)("div",{...E},(0,a.createElement)("div",{...A}))},save:function(){return(0,a.createElement)(d.InnerBlocks.Content,null)},variations:h,transforms:y};(0,i.register)(c),(0,r.registerBlockType)(B,{...I,...w})}},n={};function r(e){var i=n[e];if(void 0!==i)return i.exports;var o=n[e]={exports:{}};return t[e](o,o.exports,r),o.exports}r.m=t,e=[],r.O=function(t,n,i,o){if(!n){var s=1/0;for(u=0;u<e.length;u++){n=e[u][0],i=e[u][1],o=e[u][2];for(var c=!0,a=0;a<n.length;a++)(!1&o||s>=o)&&Object.keys(r.O).every((function(e){return r.O[e](n[a])}))?n.splice(a--,1):(c=!1,o<s&&(s=o));if(c){e.splice(u--,1);var l=i();void 0!==l&&(t=l)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[n,i,o]},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var i,o,s=n[0],c=n[1],a=n[2],l=0;if(s.some((function(t){return 0!==e[t]}))){for(i in c)r.o(c,i)&&(r.m[i]=c[i]);if(a)var u=a(r)}for(t&&t(n);l<s.length;l++)o=s[l],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(u)},n=self.webpackChunktabs_controller=self.webpackChunktabs_controller||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var i=r.O(void 0,[431],(function(){return r(15)}));i=r.O(i)}();
//# sourceMappingURL=index.js.map