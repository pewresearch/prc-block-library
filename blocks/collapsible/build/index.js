!function(){var e,t={939:function(e,t,r){"use strict";var n=window.wp.blocks,o=window.wp.element,i=r(184),l=r.n(i),a=window.prcIcons,c=window.wp.blockEditor;const s=["core/paragraph","core/heading","core/image","core/table","core/list","core/buttons","core/file","core/video","core/group"],u=[["core/paragraph",{}]];var p={from:[{type:"shortcode",tag:"collapsible",transform(e,t){let{}=e,{shortcode:r}=t;const{content:o}=r,{title:i,contents:l}=function(e){var t=e,r="",n=/<h4>(.*?)<\/h4>/i,o=n.exec(t);return o&&o[1]&&(r=o[1],t=t.replace(n,"")),{title:r,contents:t}}(o);return(0,n.createBlock)("prc-block/collapsible",{title:i},(0,n.rawHandler)({HTML:l}))}}]},f=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/collapsible","version":"0.1.0","title":"Collapsible","category":"design","keywords":["collapsible","accordion","how we did this"],"attributes":{"title":{"type":"string"},"allowedBlocks":{"type":"array"},"orientation":{"type":"string","default":"vertical"}},"supports":{"anchor":false,"html":false,"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"example":{"attributes":{"title":"How we did this"},"innerBlocks":[{"name":"core/paragraph","attributes":{"content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, quam sapien aliquet nunc, nec aliquam nisl nunc"}}],"viewportWidth":640},"textdomain":"collapsible","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}');const{name:d}=f,m={icon:function(){return(0,o.createElement)(a.Icon,{icon:a.icons.faCirclePlusSolid,width:21,preserveAspectRatio:"xMidYMid meet"})},edit:function(e){let{attributes:t,setAttributes:r}=e;const{title:n,className:i,allowedBlocks:p,orientation:f}=t,[d,m]=(0,o.useState)(!0),v=(void 0!==i&&i.split(" "),(0,c.useBlockProps)({className:l()(i,{"is-open":d})})),b=(0,c.useInnerBlocksProps)({},{allowedBlocks:p||s,orientation:f||"vertical",templateLock:!1,template:u});return(0,o.createElement)("div",v,(0,o.createElement)("div",{className:"wp-block-prc-block-collapsible__title"},(0,o.createElement)(c.RichText,{tagName:"div",value:n,onChange:e=>r({title:e}),placeholder:"How we did this...",formattingControls:[],keepPlaceholderOnFocus:!0}),(0,o.createElement)("button",{className:"wp-block-prc-block-collapsible__icon",onClick:()=>{m(!d)},type:"button"},(0,o.createElement)(a.Icon,{icon:d?a.icons.faCircleMinusLight:a.icons.faCirclePlusLight}))),(0,o.createElement)("div",{className:"wp-block-prc-block-collapsible__content"},(0,o.createElement)("div",b)))},save:function(){return(0,o.createElement)(c.InnerBlocks.Content,null)},transforms:p};(0,n.registerBlockType)(d,{...f,...m})},184:function(e,t){var r;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var i=typeof r;if("string"===i||"number"===i)e.push(r);else if(Array.isArray(r)){if(r.length){var l=o.apply(null,r);l&&e.push(l)}}else if("object"===i){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){e.push(r.toString());continue}for(var a in r)n.call(r,a)&&r[a]&&e.push(a)}}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r)}()}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,n),i.exports}n.m=t,e=[],n.O=function(t,r,o,i){if(!r){var l=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],i=e[u][2];for(var a=!0,c=0;c<r.length;c++)(!1&i||l>=i)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(a=!1,i<l&&(l=i));if(a){e.splice(u--,1);var s=o();void 0!==s&&(t=s)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[r,o,i]},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,i,l=r[0],a=r[1],c=r[2],s=0;if(l.some((function(t){return 0!==e[t]}))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(c)var u=c(n)}for(t&&t(r);s<l.length;s++)i=l[s],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(u)},r=self.webpackChunkcollapsible=self.webpackChunkcollapsible||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var o=n.O(void 0,[431],(function(){return n(939)}));o=n.O(o)}();
//# sourceMappingURL=index.js.map