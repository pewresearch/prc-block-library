!function(){"use strict";var e,t={182:function(){function e(){return e=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},e.apply(this,arguments)}var t=window.wp.element,r=window.wp.hooks,o=window.wp.compose,a=window.wp.i18n,i=window.wp.blockEditor,n=window.wp.components;function l(e){let{attributes:r,setAttributes:o}=e;const{responsiveContainerQuery:l}=r,{hideOnDesktop:s,hideOnTablet:c,hideOnMobile:u}=l||{};return(0,t.createElement)(i.InspectorControls,null,(0,t.createElement)(n.PanelBody,{title:(0,a.__)("Device Visibility")},(0,t.createElement)(n.ToggleControl,{label:(0,a.__)("Hide on Desktop"),checked:s,onChange:()=>o({responsiveContainerQuery:{...r.responsiveContainerQuery,hideOnDesktop:!s}})}),(0,t.createElement)(n.ToggleControl,{label:(0,a.__)("Hide on Tablet"),checked:c,onChange:()=>o({responsiveContainerQuery:{...r.responsiveContainerQuery,hideOnTablet:!c}})}),(0,t.createElement)(n.ToggleControl,{label:(0,a.__)("Hide on Mobile"),checked:u,onChange:()=>o({responsiveContainerQuery:{...r.responsiveContainerQuery,hideOnMobile:!u}})})))}var s=window.prcIcons,c=window.wp.blocks;const u="core/group",d="core/group",p="core/group";(0,c.registerBlockVariation)(u,{name:"callout",title:(0,a.__)("Callout"),description:(0,a.__)('A Group block in the "Callout" style with a oatmeal background and pre-set innerblocks'),attributes:{className:"is-style-callout",backgroundColor:"ui-beige-very-light"},example:{innerBlocks:[{name:"core/heading",attributes:{placeholder:"Ex Reprehenderit Sunt Ex Proident"}},{name:"core/paragraph",attributes:{placeholder:"Minim non id non esse sint culpa irure cillum ex est. Consequat sint nisi nulla do nostrud veniam labore eu magna Lorem ad Lorem in. Esse est tempor elit voluptate et eiusmod velit consequat nulla esse irure. Elit velit tempor do cupidatat eu deserunt laboris nisi anim enim in ea minim exercitation ullamco. Laborum duis adipisicing ex incididunt veniam."}}],viewportWidth:320},innerBlocks:[["core/heading"],["core/paragraph"]],isActive:(e,t)=>e.className&&e.className===t.className}),(0,c.registerBlockVariation)(u,{name:"baseball-card",title:(0,a.__)("Baseball Card"),icon:()=>(0,t.createElement)(s.Icon,{icon:s.icons.faCardSpadeSolid,width:21,preserveAspectRatio:"xMidYMid meet"}),description:(0,a.__)('A Group block in the "Baseball Card" format with a card heading in a black background, image, text, and read more link.'),attributes:{className:"is-style-baseball-card"},example:{innerBlocks:[{name:"core/heading",attributes:{className:"baseball-card__heading",level:3,content:"Most Popular Posts",backgroundColor:"ui-black",textColor:"ui-white"}},{name:"prc-block/story-item",attributes:{title:"Ultricies Ipsum Nibh Egestas Purus",excerpt:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>",label:"Report",date:"Jan 1, 2023",image:"https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg",imageSlot:"disabled",imageSize:"A2",isPreview:!0,className:"is-style-disabled",postId:0}}],viewportWidth:320},innerBlocks:[["core/heading",{className:"baseball-card__heading",level:3,fontSize:"small-label",placeholder:"Most Popular Posts...",backgroundColor:"ui-black",textColor:"ui-white"}],["core/paragraph",{placeholder:"Add card content here..."}]],isActive:e=>{let{className:t}=e;return"is-style-baseball-card"===t}}),(0,c.registerBlockVariation)(u,{name:"post-infographics",title:(0,a.__)("Post Infographics Card"),icon:()=>(0,t.createElement)(s.Icon,{icon:s.icons.faChartBar,width:21,preserveAspectRatio:"xMidYMid meet"}),description:(0,a.__)('A Group block in the "Baseball Card" style with a heading and list of attached images.'),attributes:{className:"is-style-baseball-card"},example:{innerBlocks:[{name:"core/heading",attributes:{className:"baseball-card__heading",level:3,fontSize:"small-label",content:"POST INFOGRAPHICS",backgroundColor:"ui-black",textColor:"ui-white"}},{name:"prc-block/attachment-info",attributes:{}}],viewportWidth:320},innerBlocks:[["core/heading",{className:"baseball-card__heading",level:3,fontSize:"small-label",placeholder:"POST INFOGRAPHICS",backgroundColor:"ui-black",textColor:"ui-white"}],["prc-block/attachment-info",{}]],isActive:e=>{let{className:t}=e;return"is-style-card-alt"===t}}),(0,c.registerBlockVariation)(u,{name:"social-group",title:(0,a.__)("Social Group"),icon:()=>(0,t.createElement)(s.Icon,{icon:s.icons.faShareFromSquare,width:21,preserveAspectRatio:"xMidYMid meet"}),description:(0,a.__)("A Group block that allows you to override the share meta for content inside."),category:"widgets",attributes:{className:"is-style-social-group",templateLock:!0},example:{attributes:{className:"is-style-social-group"},innerBlocks:[{name:"core/group",innerBlocks:[{name:"core/paragraph",attributes:{placeholder:"Add visual content here..."}}]},{name:"core/social-links",attributes:{iconColor:"ui-black",iconColorValue:"#2a2a2a",size:"has-small-icon-size",className:"is-style-logos-only"},innerBlocks:[{name:"prc-block/social-share-url-field",attributes:{}},{name:"core/social-link",attributes:{service:"facebook"}},{name:"core/social-link",attributes:{service:"twitter"}},{name:"core/social-link",attributes:{service:"linkedin"}}]}],viewportWidth:640},innerBlocks:[[u,{templateLock:!1},[["core/paragraph",{placeholder:"Add visual content here..."}]]],["core/social-links",{iconColor:"ui-black",iconColorValue:"#2a2a2a",size:"has-small-icon-size",className:"is-style-logos-only"},[["prc-block/social-share-url-field",{}],["core/social-link",{service:"facebook"}],["core/social-link",{service:"twitter"}],["core/social-link",{service:"linkedin"}]]]],isActive:(e,t)=>e.className&&e.className===t.className}),(0,r.addFilter)("blocks.registerBlockType","prc-block/core-group-transforms",(e=>(d!==e.name||void 0!==e.transforms&&void 0!==e.transforms.from&&(e.transforms.from.push({type:"block",blocks:["core/group","prc-block/callout"],transform:(e,t)=>(0,c.createBlock)(d,{className:"is-style-callout",backgroundColor:"beige",...e},t)}),e.transforms.from.push({type:"raw",isMatch:e=>e.classList.contains("callout"),transform:e=>{const t=(0,c.rawHandler)({HTML:e.innerHTML}),r={className:"is-style-callout",backgroundColor:"beige"};return e.getAttribute("align")&&(r.align=e.getAttribute("align")),(0,c.createBlock)(d,r,[...t])},priority:11}),e.transforms.from.push({type:"shortcode",tag:"callout",transform(e,t){let{}=e,{shortcode:r}=t;const{content:o}=r;return(0,c.createBlock)("core/group",{className:"is-style-callout",backgroundColor:"beige"},(0,c.rawHandler)({HTML:o}))}})),e))),(0,r.addFilter)("editor.BlockEdit","prc-block/core-group-controls",(0,o.createHigherOrderComponent)((e=>function(r){const{name:o,attributes:a,setAttributes:i,clientId:n}=r;return p!==o?(0,t.createElement)(e,r):(0,t.createElement)(t.Fragment,null,(0,t.createElement)(l,{attributes:a,setAttributes:i,clientId:n}),(0,t.createElement)(e,r))}),"withCoreGroupControls"),21),(0,r.addFilter)("editor.BlockListBlock","prc-block/core-group-wrapper-props",(0,o.createHigherOrderComponent)((r=>o=>{const{attributes:a,wrapperProps:i,name:n}=o;if(p!==n)return(0,t.createElement)(r,o);const{responsiveContainerQuery:{hideOnDesktop:l,hideOnTablet:s,hideOnMobile:c}={}}=a,u={...i,"data-hide-on-desktop":l,"data-hide-on-tablet":s,"data-hide-on-mobile":c};return(0,t.createElement)(r,e({},o,{wrapperProps:u}))}),"withCoreGroupResponsiveWrapper")),(0,r.addFilter)("blocks.registerBlockType","prc-block/core-group-supports",(e=>(p!==e.name||(e.attributes={...e.attributes,responsiveContainerQuery:{type:"object",default:{hideOnDesktop:!1,hideOnTablet:!1,hideOnMobile:!1}}},e.supports.align&&(e.supports.align=["left","right","center","wide","full"])),e)))}},r={};function o(e){var a=r[e];if(void 0!==a)return a.exports;var i=r[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.m=t,e=[],o.O=function(t,r,a,i){if(!r){var n=1/0;for(u=0;u<e.length;u++){r=e[u][0],a=e[u][1],i=e[u][2];for(var l=!0,s=0;s<r.length;s++)(!1&i||n>=i)&&Object.keys(o.O).every((function(e){return o.O[e](r[s])}))?r.splice(s--,1):(l=!1,i<n&&(n=i));if(l){e.splice(u--,1);var c=a();void 0!==c&&(t=c)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[r,a,i]},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};o.O.j=function(t){return 0===e[t]};var t=function(t,r){var a,i,n=r[0],l=r[1],s=r[2],c=0;if(n.some((function(t){return 0!==e[t]}))){for(a in l)o.o(l,a)&&(o.m[a]=l[a]);if(s)var u=s(o)}for(t&&t(r);c<n.length;c++)i=n[c],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(u)},r=self.webpackChunkcore_group=self.webpackChunkcore_group||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var a=o.O(void 0,[431],(function(){return o(182)}));a=o.O(a)}();
//# sourceMappingURL=index.js.map