!function(){"use strict";var e,t={854:function(){function e(){return e=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},e.apply(this,arguments)}var t=window.wp.element,r=window.wp.hooks,o=window.wp.compose,i=window.wp.i18n,a=window.wp.blockEditor,s=window.wp.components,l=window.wp.data;function n(e){let{attributes:r,setAttributes:o}=e;const{isSticky:n,responsiveAttachId:c,responsiveThreshold:d,responsiveContainerQuery:u}=r,{hideOnDesktop:p,hideOnTablet:m,hideOnMobile:h}=u||{},{allowNewControls:b}=(0,l.useSelect)((e=>{const{getCurrentTheme:t}=e("core"),r=t();return{allowNewControls:"prc-block-theme"===(null==r?void 0:r.stylesheet)||""}}),[]);return(0,t.createElement)(t.Fragment,null,b&&(0,t.createElement)(a.InspectorControls,null,(0,t.createElement)(s.PanelBody,{title:(0,i.__)("Device Visibility")},(0,t.createElement)(s.ToggleControl,{label:(0,i.__)("Hide on Desktop"),checked:p,onChange:()=>o({responsiveContainerQuery:{...r.responsiveContainerQuery,hideOnDesktop:!p}})}),(0,t.createElement)(s.ToggleControl,{label:(0,i.__)("Hide on Tablet"),checked:m,onChange:()=>o({responsiveContainerQuery:{...r.responsiveContainerQuery,hideOnTablet:!m}})}),(0,t.createElement)(s.ToggleControl,{label:(0,i.__)("Hide on Mobile"),checked:h,onChange:()=>o({responsiveContainerQuery:{...r.responsiveContainerQuery,hideOnMobile:!h}})}))),!b&&(0,t.createElement)(a.InspectorAdvancedControls,null,(0,t.createElement)(s.ToggleControl,{label:(0,i.__)("Sticky On Scroll?"),checked:n,onChange:()=>o({isSticky:!n}),help:"Enable sticky on scroll for this group, this will be disabled when you reach the responsive threshold as its intended for desktop only."}),(0,t.createElement)(s.TextControl,{label:(0,i.__)("Responsive Attachment ID"),value:c,onChange:e=>o({responsiveAttachId:e}),placeholder:"e.g. #my-id"}),(0,t.createElement)(s.__experimentalNumberControl,{label:(0,i.__)("Responsive Threshold"),value:d,onChange:e=>o({responsiveThreshold:e}),max:3540,min:320,isDragEnabled:!0,help:(0,i.__)("The responsive threshold is the point at which the group block and it's contents will trigger their mobile behavior. The default is 640px (small tablet), but you can change this to any value you like. If you would like to trigger the mobile behavior of a block immediately regardless of device size then use the maximum value of 3540.")}),(0,t.createElement)(s.CardDivider,null)))}var c=window.prcIcons,d=window.wp.blocks;const u="core/group",p="core/group",m="core/group";(0,d.registerBlockVariation)(u,{name:"callout",title:(0,i.__)("Callout"),description:(0,i.__)('A Group block in the "Callout" style with a oatmeal background and pre-set innerblocks'),attributes:{className:"is-style-callout",backgroundColor:"beige"},example:{innerBlocks:[{name:"core/heading",attributes:{placeholder:"Ex Reprehenderit Sunt Ex Proident"}},{name:"core/paragraph",attributes:{placeholder:"Minim non id non esse sint culpa irure cillum ex est. Consequat sint nisi nulla do nostrud veniam labore eu magna Lorem ad Lorem in. Esse est tempor elit voluptate et eiusmod velit consequat nulla esse irure. Elit velit tempor do cupidatat eu deserunt laboris nisi anim enim in ea minim exercitation ullamco. Laborum duis adipisicing ex incididunt veniam."}}],viewportWidth:320},innerBlocks:[["core/heading"],["core/paragraph"]],isActive:(e,t)=>e.className&&e.className===t.className}),(0,d.registerBlockVariation)(u,{name:"card",title:(0,i.__)("Card"),icon:()=>(0,t.createElement)(c.Icon,{icon:c.icons.faCardSpadeLight,width:21,preserveAspectRatio:"xMidYMid meet"}),description:(0,i.__)('A Group block in the "Card" format with a heading with a border, image, text, and read more link.'),attributes:{className:"is-style-card"},example:{innerBlocks:[{name:"core/heading",attributes:{className:"is-style-section-header",level:3,placeholder:"Signature Reports"}},{name:"core/image",attributes:{}},{name:"prc-block/story-item",attributes:{title:"Ultricies Ipsum Nibh Egestas Purus",excerpt:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>",label:"Report",date:"Jan 1, 2023",image:"https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg",imageSlot:"disabled",imageSize:"A2",isPreview:!0,className:"is-style-disabled",postId:0}}],viewportWidth:320},innerBlocks:[["core/heading",{className:"is-style-section-header",level:3,placeholder:"Signature Reports..."}],["core/image"],["prc-block/story-item",{className:"is-style-disabled"}]],isActive:e=>{let{className:t}=e;return"is-style-card"===t}}),(0,d.registerBlockVariation)(u,{name:"card-alt",title:(0,i.__)("Card (Alt)"),icon:()=>(0,t.createElement)(c.Icon,{icon:c.icons.faCardSpadeSolid,width:21,preserveAspectRatio:"xMidYMid meet"}),description:(0,i.__)('A Group block in the "Card" format with a sub header heading in a black background, image, text, and read more link. Internally we call this the "Baseball Card" style.'),attributes:{className:"is-style-card-alt"},example:{innerBlocks:[{name:"core/heading",attributes:{className:"is-style-sub-header",level:3,fontSize:"small-label",content:"Most Popular Posts",backgroundColor:"text-color",textColor:"white"}},{name:"prc-block/story-item",attributes:{title:"Ultricies Ipsum Nibh Egestas Purus",excerpt:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>",label:"Report",date:"Jan 1, 2023",image:"https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg",imageSlot:"disabled",imageSize:"A2",isPreview:!0,className:"is-style-disabled",postId:0}}],viewportWidth:320},innerBlocks:[["core/heading",{className:"is-style-sub-header",level:3,fontSize:"small-label",placeholder:"Most Popular Posts...",backgroundColor:"text-color",textColor:"white"}],["prc-block/story-item",{className:"is-style-disabled"}]],isActive:e=>{let{className:t}=e;return"is-style-card-alt"===t}}),(0,d.registerBlockVariation)(u,{name:"social-group",title:(0,i.__)("Social Group"),icon:()=>(0,t.createElement)(c.Icon,{icon:c.icons.faShareFromSquare,width:21,preserveAspectRatio:"xMidYMid meet"}),description:(0,i.__)("A Group block that allows you to override the share meta for content inside."),category:"widgets",attributes:{className:"is-style-social-group",templateLock:!0},example:{attributes:{className:"is-style-social-group"},innerBlocks:[{name:"core/group",innerBlocks:[{name:"core/paragraph",attributes:{placeholder:"Add visual content here..."}}]},{name:"core/social-links",attributes:{iconColor:"text-color",iconColorValue:"#2a2a2a",size:"has-small-icon-size",className:"is-style-logos-only"},innerBlocks:[{name:"prc-block/social-share-url-field",attributes:{}},{name:"core/social-link",attributes:{service:"facebook"}},{name:"core/social-link",attributes:{service:"twitter"}},{name:"core/social-link",attributes:{service:"linkedin"}}]}],viewportWidth:640},innerBlocks:[[u,{templateLock:!1},[["core/paragraph",{placeholder:"Add visual content here..."}]]],["core/social-links",{iconColor:"text-color",iconColorValue:"#2a2a2a",size:"has-small-icon-size",className:"is-style-logos-only"},[["prc-block/social-share-url-field",{}],["core/social-link",{service:"facebook"}],["core/social-link",{service:"twitter"}],["core/social-link",{service:"linkedin"}]]]],isActive:(e,t)=>e.className&&e.className===t.className}),(0,r.addFilter)("blocks.registerBlockType","prc-block/core-group-transforms",(e=>(p!==e.name||void 0!==e.transforms&&void 0!==e.transforms.from&&(e.transforms.from.push({type:"block",blocks:["core/group","prc-block/callout"],transform:(e,t)=>(0,d.createBlock)(p,{className:"is-style-callout",backgroundColor:"beige",...e},t)}),e.transforms.from.push({type:"raw",isMatch:e=>e.classList.contains("callout"),transform:e=>{const t=(0,d.rawHandler)({HTML:e.innerHTML}),r={className:"is-style-callout",backgroundColor:"beige"};return e.getAttribute("align")&&(r.align=e.getAttribute("align")),(0,d.createBlock)(p,r,[...t])},priority:11}),e.transforms.from.push({type:"shortcode",tag:"callout",transform(e,t){let{}=e,{shortcode:r}=t;const{content:o}=r;return(0,d.createBlock)("core/group",{className:"is-style-callout",backgroundColor:"beige"},(0,d.rawHandler)({HTML:o}))}})),e))),(0,r.addFilter)("editor.BlockEdit","prc-block/core-group-controls",(0,o.createHigherOrderComponent)((e=>function(r){const{name:o,attributes:i,setAttributes:a,clientId:s}=r;return m!==o?(0,t.createElement)(e,r):(0,t.createElement)(t.Fragment,null,(0,t.createElement)(n,{attributes:i,setAttributes:a,clientId:s}),(0,t.createElement)(e,r))}),"withCoreGroupControls"),21),(0,r.addFilter)("editor.BlockListBlock","prc-block/core-group-wrapper-props",(0,o.createHigherOrderComponent)((r=>o=>{const{attributes:i,wrapperProps:a,name:s}=o;if(m!==s)return(0,t.createElement)(r,o);const{responsiveContainerQuery:{hideOnDesktop:l,hideOnTablet:n,hideOnMobile:c}={}}=i,d={...a,"data-hide-on-desktop":l,"data-hide-on-tablet":n,"data-hide-on-mobile":c};return(0,t.createElement)(r,e({},o,{wrapperProps:d}))}),"withCoreGroupResponsiveWrapper")),(0,r.addFilter)("blocks.registerBlockType","prc-block/core-group-supports",(e=>(m!==e.name||(e.attributes={...e.attributes,responsiveContainerQuery:{type:"object",default:{hideOnDesktop:!1,hideOnTablet:!1,hideOnMobile:!1}}},void 0!==e.supports.align&&(e.supports.align=["left","right","center","wide","full"])),e)))}},r={};function o(e){var i=r[e];if(void 0!==i)return i.exports;var a=r[e]={exports:{}};return t[e](a,a.exports,o),a.exports}o.m=t,e=[],o.O=function(t,r,i,a){if(!r){var s=1/0;for(d=0;d<e.length;d++){r=e[d][0],i=e[d][1],a=e[d][2];for(var l=!0,n=0;n<r.length;n++)(!1&a||s>=a)&&Object.keys(o.O).every((function(e){return o.O[e](r[n])}))?r.splice(n--,1):(l=!1,a<s&&(s=a));if(l){e.splice(d--,1);var c=i();void 0!==c&&(t=c)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[r,i,a]},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={826:0,431:0};o.O.j=function(t){return 0===e[t]};var t=function(t,r){var i,a,s=r[0],l=r[1],n=r[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(i in l)o.o(l,i)&&(o.m[i]=l[i]);if(n)var d=n(o)}for(t&&t(r);c<s.length;c++)a=s[c],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(d)},r=self.webpackChunkcore_group=self.webpackChunkcore_group||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var i=o.O(void 0,[431],(function(){return o(854)}));i=o.O(i)}();
//# sourceMappingURL=index.js.map