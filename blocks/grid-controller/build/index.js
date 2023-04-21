!function(){var e,t={797:function(e,t,o){"use strict";var r=window.wp.element,n=window.wp.primitives,l=(0,r.createElement)(n.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,r.createElement)(n.Path,{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4.1 1.5v10H10v-10h4.9zM5.5 17V8c0-.3.2-.5.5-.5h2.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2.6v-10H19c.3 0 .5.2.5.5v9z"})),i=window.wp.blocks,a=o(184),c=o.n(a),s=window.wp.blockEditor,d=window.wp.data,u=window.wp.i18n,p=window.wp.components;function m(e){let{attributes:t,setAttributes:o,clientId:n,colors:l}=e;const{verticalAlignment:a}=t,{backgroundColor:c,textColor:m,dividerColor:g,setBackgroundColor:b,setTextColor:k,setDividerColor:h}=l,{updateBlockAttributes:v,replaceInnerBlocks:w}=(0,d.useDispatch)(s.store),{count:S,innerBlocks:f,innerBlockClientIds:C}=(0,d.useSelect)((e=>({count:e(s.store).getBlockCount(n),innerBlockClientIds:e(s.store).getBlockOrder(n),innerBlocks:e(s.store).getBlock(n).innerBlocks})),[n]);return(0,r.createElement)(r.Fragment,null,(0,r.createElement)(s.BlockControls,null,(0,r.createElement)(s.BlockVerticalAlignmentToolbar,{onChange:e=>{o({verticalAlignment:e}),C.forEach((t=>{v(t,{verticalAlignment:e})}))},value:a})),(0,r.createElement)(s.InspectorControls,null,(0,r.createElement)(p.PanelBody,null,(0,r.createElement)(p.RangeControl,{label:(0,u.__)("Columns"),value:S,onChange:e=>((e,t)=>{let o=f;const r=t>e;console.log("updateColumns -> ",o,r,e,t);let l=o.reduce(((e,t)=>e-t.attributes.gridLayout.desktopSpan),12);0>l&&(l=0);let a=o.reduce(((e,t)=>e-t.attributes.gridLayout.tabletSpan),8);0>a&&(a=0);let c=o.reduce(((e,t)=>e-t.attributes.gridLayout.mobileSpan),4);if(0>c&&(c=0),console.log("Available Spans:",{availableDesktopSpan:l,availableTabletSpan:a,availableMobileSpan:c}),r){const e=(0,i.createBlock)("prc-block/grid-column",{gridLayout:{index:o.length+1,desktopSpan:4,tabletSpan:4,mobileSpan:4,tabletStart:1,mobileStart:1}});o=[...o,e]}else{const r=o[o.length-1].innerBlocks,n=[...o[o.length-2].innerBlocks,...r];o[o.length-2].innerBlocks=n,o=o.slice(0,-(e-t))}console.log('"updateColumns" replaceInnerBlocks...',r,e,t,o,f),w(n,o)})(S,e),min:1,max:Math.max(6,S)}),6<S&&(0,r.createElement)(p.Notice,{status:"warning",isDismissible:!1},(0,u.__)("This column count exceeds the recommended amount and may cause visual breakage.")))),(0,r.createElement)(s.InspectorControls,{group:"styles"},(0,r.createElement)(s.PanelColorSettings,{__experimentalHasMultipleOrigins:!0,__experimentalIsRenderedInSidebar:!0,title:(0,u.__)("Color"),disableCustomColors:!0,colorSettings:[{value:m.color,onChange:k,label:(0,u.__)("Text")},{value:c.color,onChange:b,label:(0,u.__)("Background")},{value:g.color,onChange:h,label:(0,u.__)("Gutter Divider")}]})))}var g=window.lodash;function b(e){let{clientId:t,setAttributes:o}=e;const n="prc-block/grid-controller",{blockType:l,defaultVariation:a,variations:c}=(0,d.useSelect)((e=>{const{getBlockVariations:t,getBlockType:o,getDefaultBlockVariation:r}=e(i.store);return{blockType:o(n),defaultVariation:r(n,"block"),variations:t(n,"block")}}),[t]),{replaceInnerBlocks:u}=(0,d.useDispatch)(s.store),p=(0,s.useBlockProps)({className:"is-placeholder"});return(0,r.createElement)("div",p,(0,r.createElement)(s.__experimentalBlockVariationPicker,{icon:(0,g.get)(l,["icon","src"]),label:(0,g.get)(l,["title"]),variations:c,onSelect:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a;e.attributes&&o(e.attributes),e.innerBlocks&&u(t,(0,i.createBlocksFromInnerBlocksTemplate)(e.innerBlocks),!0)}}))}const k=["prc-block/grid-column"];var h=(0,s.withColors)({textColor:"color"},{backgroundColor:"color"},{dividerColor:"color"})((function(e){let{attributes:t,setAttributes:o,clientId:n,className:l,textColor:i,setTextColor:a,backgroundColor:u,setBackgroundColor:p,dividerColor:g,setDividerColor:h}=e;const{verticalAlignment:v}=t,w=(0,d.useSelect)((e=>e(s.store).getBlocks(n).length>0),[n]),S=(0,s.useBlockProps)({className:c()(l,{"has-text-color":!!i.color||!!i?.class,[(0,s.getColorClassName)("color",i?.slug)]:!!i?.slug,"has-background":!!u.color||u.class,[(0,s.getColorClassName)("background-color",u?.slug)]:!!u?.slug,"has-divider":!!g.color||g.class,[(0,s.getColorClassName)("divider-color",g?.slug)]:!!g?.slug,[`are-vertically-aligned-${v}`]:v}),style:{color:!i?.slug&&i?.color,backgroundColor:!u?.slug&&u?.color}}),f=(0,s.useInnerBlocksProps)(S,{allowedBlocks:k,orientation:"horizontal",renderAppender:!1,templateLock:!1});return w?(0,r.createElement)(r.Fragment,null,(0,r.createElement)(m,{attributes:t,setAttributes:o,clientId:n,colors:{textColor:i,setTextColor:a,backgroundColor:u,setBackgroundColor:p,dividerColor:g,setDividerColor:h}}),(0,r.createElement)("div",f)):(0,r.createElement)(b,{attributes:t,setAttributes:o,clientId:n})}));const v=e=>{const t=e.length,o=e.map(((e,o)=>{const{innerBlocks:r}=e;return["prc-block/grid-column",{gridLayout:{index:o+1,desktopSpan:Math.floor(12/t),tabletSpan:Math.floor(8/t),mobileSpan:4}},[...r]]}));return(0,i.createBlock)("prc-block/grid-controller",{},(0,i.createBlocksFromInnerBlocksTemplate)(o))};var w={from:[{type:"block",blocks:["core/columns"],transform:(e,t)=>!(!Array.isArray(t)||0===t.length)&&v(t)},{type:"block",blocks:["prc-block/grid"],transform:(e,t)=>!(!Array.isArray(t)||0===t.length)&&t.map((e=>v(e.innerBlocks)))}],to:[{type:"block",blocks:["core/columns"],transform:(e,t)=>{if(!Array.isArray(t)||0===t.length)return!1;const o=t.map(((e,t)=>{const{innerBlocks:o}=e;return["core/column",{},[...o]]}));return(0,i.createBlock)("core/columns",{},(0,i.createBlocksFromInnerBlocksTemplate)(o))}}]},S=[{name:"two-columns-equal",title:(0,u.__)("6 / 6"),description:(0,u.__)("Two columns; equal split"),icon:(0,r.createElement)(p.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},(0,r.createElement)(p.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z"})),isDefault:!0,attributes:{dividerColor:"gray"},innerBlocks:[["prc-block/grid-column",{gridLayout:{index:1,desktopSpan:6,tabletSpan:6,mobileSpan:4}}],["prc-block/grid-column",{gridLayout:{index:2,desktopSpan:6,tabletSpan:6,mobileSpan:4}}]],scope:["block"]},{name:"two-columns-one-third-two-thirds",title:(0,u.__)("4 / 8"),description:(0,u.__)("Two columns; one-third, two-thirds split"),icon:(0,r.createElement)(p.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},(0,r.createElement)(p.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z"})),attributes:{dividerColor:"gray"},innerBlocks:[["prc-block/grid-column",{gridLayout:{index:1,desktopSpan:4,tabletSpan:4,mobileSpan:4}}],["prc-block/grid-column",{gridLayout:{index:2,desktopSpan:8,tabletSpan:8,mobileSpan:4}}]],scope:["block"]},{name:"two-columns-two-thirds-one-third",title:(0,u.__)("8 / 4"),description:(0,u.__)("Two columns; two-thirds, one-third split"),icon:(0,r.createElement)(p.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},(0,r.createElement)(p.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z"})),attributes:{dividerColor:"gray"},innerBlocks:[["prc-block/grid-column",{gridLayout:{index:1,desktopSpan:8,tabletSpan:8,mobileSpan:4}}],["prc-block/grid-column",{gridLayout:{index:2,desktopSpan:4,tabletSpan:4,mobileSpan:4}}]],scope:["block"]},{name:"three-columns-equal",title:(0,u.__)("4 / 4 / 4"),description:(0,u.__)("Three columns; equal split"),icon:(0,r.createElement)(p.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},(0,r.createElement)(p.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"})),attributes:{dividerColor:"gray"},innerBlocks:[["prc-block/grid-column",{gridLayout:{index:1,desktopSpan:4,tabletSpan:4,mobileSpan:4}}],["prc-block/grid-column",{gridLayout:{index:2,desktopSpan:4,tabletSpan:4,mobileSpan:4}}],["prc-block/grid-column",{gridLayout:{index:3,desktopSpan:4,tabletSpan:4,mobileSpan:4}}]],scope:["block"]},{name:"three-columns-wider-center",title:(0,u.__)("3 / 6 / 3"),description:(0,u.__)("Three columns; wide center column"),icon:(0,r.createElement)(p.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},(0,r.createElement)(p.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM31 34H17V14h14v20zm2 0V14h6v20h-6zm-18 0H9V14h6v20z"})),attributes:{dividerColor:"gray"},innerBlocks:[["prc-block/grid-column",{gridLayout:{index:1,desktopSpan:3,tabletSpan:3,mobileSpan:4}}],["prc-block/grid-column",{gridLayout:{index:2,desktopSpan:6,tabletSpan:6,mobileSpan:4}}],["prc-block/grid-column",{gridLayout:{index:3,desktopSpan:3,tabletSpan:3,mobileSpan:4}}]],scope:["block"]},{name:"three-columns-wider-center-container-sensitive",title:(0,u.__)("Featured Lede Grid"),description:(0,u.__)("Three columns; wide center column (container sensitive)"),icon:(0,r.createElement)(p.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},(0,r.createElement)(p.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM31 34H17V14h14v20zm2 0V14h6v20h-6zm-18 0H9V14h6v20z"})),attributes:{dividerColor:"gray",className:"is-pattern__featured-layout"},innerBlocks:[["prc-block/grid-column",{gridLayout:{index:1,desktopSpan:3,tabletSpan:6,mobileSpan:4}}],["prc-block/grid-column",{gridLayout:{index:2,desktopSpan:6,tabletSpan:12,mobileSpan:4}}],["prc-block/grid-column",{gridLayout:{index:3,desktopSpan:3,tabletSpan:6,mobileSpan:4}}]],isActive:e=>{let{className:t}=e;return t?.includes("is-pattern__featured-layout")},scope:["inserter","block"]}],f=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/grid-controller","version":"0.1.0","title":"Grid","category":"design","description":"Display content in multiple columns using CSS grid with blocks added to each column.","keywords":["grid","columns","css grid","layout"],"attributes":{"verticalAlignment":{"type":"string"},"backgroundColor":{"type":"string"},"textColor":{"type":"string"},"dividerColor":{"type":"string"}},"supports":{"anchor":true,"html":false,"align":["wide","full"],"spacing":{"blockGap":{"__experimentalDefault":"24px","sides":["horizontal","vertical"]},"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"__experimentalBorder":{"color":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"style":true,"width":true}},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"textdomain":"grid-controller","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php"}');const{name:C}=f,y={icon:l,edit:h,save:function(e){let{attributes:t}=e;return(0,r.createElement)(s.InnerBlocks.Content,null)},transforms:w,variations:S};(0,i.registerBlockType)(C,{...f,...y})},184:function(e,t){var o;!function(){"use strict";var r={}.hasOwnProperty;function n(){for(var e=[],t=0;t<arguments.length;t++){var o=arguments[t];if(o){var l=typeof o;if("string"===l||"number"===l)e.push(o);else if(Array.isArray(o)){if(o.length){var i=n.apply(null,o);i&&e.push(i)}}else if("object"===l){if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]")){e.push(o.toString());continue}for(var a in o)r.call(o,a)&&o[a]&&e.push(a)}}}return e.join(" ")}e.exports?(n.default=n,e.exports=n):void 0===(o=function(){return n}.apply(t,[]))||(e.exports=o)}()}},o={};function r(e){var n=o[e];if(void 0!==n)return n.exports;var l=o[e]={exports:{}};return t[e](l,l.exports,r),l.exports}r.m=t,e=[],r.O=function(t,o,n,l){if(!o){var i=1/0;for(d=0;d<e.length;d++){o=e[d][0],n=e[d][1],l=e[d][2];for(var a=!0,c=0;c<o.length;c++)(!1&l||i>=l)&&Object.keys(r.O).every((function(e){return r.O[e](o[c])}))?o.splice(c--,1):(a=!1,l<i&&(i=l));if(a){e.splice(d--,1);var s=n();void 0!==s&&(t=s)}}return t}l=l||0;for(var d=e.length;d>0&&e[d-1][2]>l;d--)e[d]=e[d-1];e[d]=[o,n,l]},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};r.O.j=function(t){return 0===e[t]};var t=function(t,o){var n,l,i=o[0],a=o[1],c=o[2],s=0;if(i.some((function(t){return 0!==e[t]}))){for(n in a)r.o(a,n)&&(r.m[n]=a[n]);if(c)var d=c(r)}for(t&&t(o);s<i.length;s++)l=i[s],r.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return r.O(d)},o=self.webpackChunkgrid_controller=self.webpackChunkgrid_controller||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var n=r.O(void 0,[431],(function(){return r(797)}));n=r.O(n)}();