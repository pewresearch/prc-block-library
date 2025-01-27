(()=>{"use strict";var e,o={6303:()=>{const e=window.prcBlockUtils,o=window.wp.hooks,t=window.wp.compose,i=window.wp.element,r=window.wp.blockEditor,s=window.wp.i18n,a=window.ReactJSXRuntime,l=window.wp.primitives,n=(0,a.jsx)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,a.jsx)(l.Path,{d:"M20.5 16h-.7V8c0-1.1-.9-2-2-2H6.2c-1.1 0-2 .9-2 2v8h-.7c-.8 0-1.5.7-1.5 1.5h20c0-.8-.7-1.5-1.5-1.5zM5.7 8c0-.3.2-.5.5-.5h11.6c.3 0 .5.2.5.5v7.6H5.7V8z"})}),c=(0,a.jsx)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,a.jsx)(l.Path,{d:"M17 4H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v12zm-7.5-.5h4V16h-4v1.5z"})}),d=(0,a.jsx)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,a.jsx)(l.Path,{d:"M15 4H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5v12zm-4.5-.5h2V16h-2v1.5z"})}),u=(0,a.jsx)(l.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)(l.Path,{d:"M3.99961 13C4.67043 13.3354 4.6703 13.3357 4.67017 13.3359L4.67298 13.3305C4.67621 13.3242 4.68184 13.3135 4.68988 13.2985C4.70595 13.2686 4.7316 13.2218 4.76695 13.1608C4.8377 13.0385 4.94692 12.8592 5.09541 12.6419C5.39312 12.2062 5.84436 11.624 6.45435 11.0431C7.67308 9.88241 9.49719 8.75 11.9996 8.75C14.502 8.75 16.3261 9.88241 17.5449 11.0431C18.1549 11.624 18.6061 12.2062 18.9038 12.6419C19.0523 12.8592 19.1615 13.0385 19.2323 13.1608C19.2676 13.2218 19.2933 13.2686 19.3093 13.2985C19.3174 13.3135 19.323 13.3242 19.3262 13.3305L19.3291 13.3359C19.3289 13.3357 19.3288 13.3354 19.9996 13C20.6704 12.6646 20.6703 12.6643 20.6701 12.664L20.6697 12.6632L20.6688 12.6614L20.6662 12.6563L20.6583 12.6408C20.6517 12.6282 20.6427 12.6108 20.631 12.5892C20.6078 12.5459 20.5744 12.4852 20.5306 12.4096C20.4432 12.2584 20.3141 12.0471 20.1423 11.7956C19.7994 11.2938 19.2819 10.626 18.5794 9.9569C17.1731 8.61759 14.9972 7.25 11.9996 7.25C9.00203 7.25 6.82614 8.61759 5.41987 9.9569C4.71736 10.626 4.19984 11.2938 3.85694 11.7956C3.68511 12.0471 3.55605 12.2584 3.4686 12.4096C3.42484 12.4852 3.39142 12.5459 3.36818 12.5892C3.35656 12.6108 3.34748 12.6282 3.34092 12.6408L3.33297 12.6563L3.33041 12.6614L3.32948 12.6632L3.32911 12.664C3.32894 12.6643 3.32879 12.6646 3.99961 13ZM11.9996 16C13.9326 16 15.4996 14.433 15.4996 12.5C15.4996 10.567 13.9326 9 11.9996 9C10.0666 9 8.49961 10.567 8.49961 12.5C8.49961 14.433 10.0666 16 11.9996 16Z"})}),p=window.wp.components,b=window.wp.data;function h({attributes:e,setAttributes:o}){const{responsiveContainerQuery:t}=e,{hideOnDesktop:l,hideOnTablet:h,hideOnMobile:m}=t||{},g=t=>{console.log("toggleHideOn",t),"desktop"===t&&o({responsiveContainerQuery:{...e.responsiveContainerQuery,hideOnDesktop:!l}}),"tablet"===t&&o({responsiveContainerQuery:{...e.responsiveContainerQuery,hideOnTablet:!h}}),"mobile"===t&&o({responsiveContainerQuery:{...e.responsiveContainerQuery,hideOnMobile:!m}})},{deviceType:k}=(0,b.useSelect)((e=>e("core/editor").getDeviceType().toLowerCase()),[]),C=(0,i.useMemo)((()=>({desktop:l?"Hidden on Desktop":"Visible on Desktop",tablet:h?"Hidden on Tablet":"Visible on Tablet",mobile:m?"Hidden on Mobile":"Visible on Mobile"})),[l,h,m]),v=(0,i.useMemo)((()=>[{title:C.desktop,icon:n,isActive:l,isDisabled:"desktop"===k,onClick:()=>g("desktop")},{title:C.tablet,icon:c,isActive:h,isDisabled:"tablet"===k,onClick:()=>g("tablet")},{title:C.mobile,icon:d,isActive:m,isDisabled:"mobile"===k,onClick:()=>g("mobile")}]),[k,l,h,m,C]);return(0,a.jsxs)(i.Fragment,{children:[(0,a.jsx)(r.BlockControls,{children:(0,a.jsx)(p.ToolbarGroup,{children:(0,a.jsx)(p.ToolbarDropdownMenu,{icon:u,label:"Toggle Device Visibility",controls:v})})}),(0,a.jsx)(r.InspectorControls,{children:(0,a.jsxs)(p.PanelBody,{title:(0,s.__)("Device Visibility"),children:[(0,a.jsx)(p.ToggleControl,{label:C.desktop,checked:l,onChange:()=>o({responsiveContainerQuery:{...e.responsiveContainerQuery,hideOnDesktop:!l}})}),(0,a.jsx)(p.ToggleControl,{label:C.tablet,checked:h,onChange:()=>o({responsiveContainerQuery:{...e.responsiveContainerQuery,hideOnTablet:!h}})}),(0,a.jsx)(p.ToggleControl,{label:C.mobile,checked:m,onChange:()=>o({responsiveContainerQuery:{...e.responsiveContainerQuery,hideOnMobile:!m}})})]})})]})}const m=window.prcIcons,g=window.wp.blocks,k="core/group",C="core/group",v="core/group",w="prc-block/core-group";(0,g.registerBlockVariation)(k,{name:"callout",title:(0,s.__)("Callout"),description:(0,s.__)('A Group block in the "Callout" style with a oatmeal background and pre-set innerblocks'),attributes:{className:"is-style-callout",backgroundColor:"ui-beige-very-light"},example:{innerBlocks:[{name:"core/heading",attributes:{placeholder:"Ex Reprehenderit Sunt Ex Proident"}},{name:"core/paragraph",attributes:{placeholder:"Minim non id non esse sint culpa irure cillum ex est. Consequat sint nisi nulla do nostrud veniam labore eu magna Lorem ad Lorem in. Esse est tempor elit voluptate et eiusmod velit consequat nulla esse irure. Elit velit tempor do cupidatat eu deserunt laboris nisi anim enim in ea minim exercitation ullamco. Laborum duis adipisicing ex incididunt veniam."}}],viewportWidth:320},innerBlocks:[["core/heading"],["core/paragraph"]],isActive:(e,o)=>e.className&&e.className===o.className}),(0,g.registerBlockVariation)(k,{name:"baseball-card",title:(0,s.__)("Baseball Card"),icon:()=>(0,a.jsx)(m.Icon,{icon:"card-spade",library:"solid"}),description:(0,s.__)('A Group block in the "Baseball Card" format with a card heading in a black background, image, text, and read more link.'),attributes:{className:"is-style-baseball-card"},example:{innerBlocks:[{name:"core/heading",attributes:{className:"baseball-card__heading",level:3,content:"Most Popular Posts",backgroundColor:"ui-black",textColor:"ui-white",fontFamily:"sans-serif",fontSize:"small-label"}},{name:"prc-block/story-item",attributes:{title:"Ultricies Ipsum Nibh Egestas Purus",excerpt:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>",label:"Report",date:"Jan 1, 2023",image:"https://www.pewresearch.org/global/wp-content/uploads/sites/2/2020/04/PG_2020.04.21_U.S.-Views-China_featured.jpg",imageSlot:"disabled",imageSize:"A2",isPreview:!0,className:"is-style-disabled",postId:0}}],viewportWidth:320},innerBlocks:[["core/heading",{className:"baseball-card__heading",level:3,fontSize:"small-label",fontFamily:"sans-serif",placeholder:"Most Popular Posts...",backgroundColor:"ui-black",textColor:"ui-white"}],["core/paragraph",{placeholder:"Add card content here..."}]],isActive:({className:e})=>"is-style-baseball-card"===e}),(0,g.registerBlockVariation)(k,{name:"post-infographics",title:(0,s.__)("Post Infographics Card"),icon:()=>(0,a.jsx)(m.Icon,{icon:"chart-bar"}),description:(0,s.__)('A Group block in the "Baseball Card" style with a heading and list of attached images.'),attributes:{className:"is-style-baseball-card"},example:{innerBlocks:[{name:"core/heading",attributes:{className:"baseball-card__heading",level:3,fontSize:"small-label",content:"POST INFOGRAPHICS",backgroundColor:"ui-black",textColor:"ui-white"}},{name:"prc-block/attachment-info",attributes:{}}],viewportWidth:320},innerBlocks:[["core/heading",{className:"baseball-card__heading",level:3,fontSize:"small-label",placeholder:"POST INFOGRAPHICS",backgroundColor:"ui-black",textColor:"ui-white"}],["prc-block/attachment-info",{}]],isActive:({className:e})=>"is-style-card-alt"===e}),(0,g.registerBlockVariation)(k,{name:"social-group",title:(0,s.__)("Social Group"),icon:()=>(0,a.jsx)(m.Icon,{icon:"share-from-square"}),description:(0,s.__)("A Group block that allows you to override the share meta for content inside."),category:"widgets",attributes:{className:"is-style-social-group",templateLock:!0},example:{attributes:{className:"is-style-social-group"},innerBlocks:[{name:"core/group",innerBlocks:[{name:"core/paragraph",attributes:{placeholder:"Add visual content here..."}}]},{name:"core/social-links",attributes:{iconColor:"ui-black",iconColorValue:"#2a2a2a",size:"has-small-icon-size",className:"is-style-logos-only"},innerBlocks:[{name:"prc-block/social-share-url-field",attributes:{}},{name:"core/social-link",attributes:{service:"facebook"}},{name:"core/social-link",attributes:{service:"x"}},{name:"core/social-link",attributes:{service:"linkedin"}}]}],viewportWidth:640},innerBlocks:[[k,{templateLock:!1},[["core/paragraph",{placeholder:"Add visual content here..."}]]],["core/social-links",{iconColor:"ui-black",iconColorValue:"#2a2a2a",size:"has-small-icon-size",className:"is-style-logos-only"},[["prc-block/social-share-url-field",{}],["core/social-link",{service:"facebook"}],["core/social-link",{service:"twitter"}],["core/social-link",{service:"linkedin"}]]]],isActive:(e,o)=>e.className&&e.className===o.className}),(0,o.addFilter)("blocks.registerBlockType","prc-block/core-group-transforms",(e=>(C!==e.name||void 0!==e.transforms&&void 0!==e.transforms.from&&(e.transforms.from.push({type:"block",blocks:["core/group","prc-block/callout"],transform:(e,o)=>(0,g.createBlock)(C,{className:"is-style-callout",backgroundColor:"beige",...e},o)}),e.transforms.from.push({type:"raw",isMatch:e=>e.classList.contains("callout"),transform:e=>{const o=(0,g.rawHandler)({HTML:e.innerHTML}),t={className:"is-style-callout",backgroundColor:"beige"};return e.getAttribute("align")&&(t.align=e.getAttribute("align")),(0,g.createBlock)(C,t,[...o])},priority:11}),e.transforms.from.push({type:"shortcode",tag:"callout",transform({},{shortcode:e}){const{content:o}=e;return(0,g.createBlock)("core/group",{className:"is-style-callout",backgroundColor:"beige"},(0,g.rawHandler)({HTML:o}))}})),e)));const x=(0,r.withColors)({dividerColor:"color",isStuckBackground:"color",isStuckText:"color"})((function({attributes:e,setAttributes:o,clientId:t,dividerColor:l,setDividerColor:n,isStuckBackground:c,setIsStuckBackground:d,isStuckText:u,setIsStuckText:p}){const{style:b}=e,h=(0,r.__experimentalUseMultipleOriginColorsAndGradients)(),m=(0,i.useMemo)((()=>{const e=[{colorValue:l?.color,onColorChange:n,label:(0,s.__)("Interior Divider")}];if("sticky"===b?.position?.type){const o=[{colorValue:c?.color,onColorChange:d,label:(0,s.__)("Stuck Background")},{colorValue:u?.color,onColorChange:p,label:(0,s.__)("Stuck Text")}];e.push(...o)}return e}),[l,c,u,b]);return(0,a.jsx)(i.Fragment,{children:(0,a.jsx)(r.InspectorControls,{group:"color",children:(0,a.jsx)(r.__experimentalColorGradientSettingsDropdown,{settings:m,panelId:t,hasColorsOrGradients:!1,disableCustomColors:!0,__experimentalIsRenderedInSidebar:!0,...h})})})}));(0,o.addFilter)("editor.BlockEdit",`${w}-controls`,(0,t.createHigherOrderComponent)((e=>function(o){const{name:t,attributes:r,setAttributes:s,clientId:l}=o;return v!==t?(0,a.jsx)(e,{...o}):(0,a.jsxs)(i.Fragment,{children:[(0,a.jsx)(x,{attributes:r,setAttributes:s,clientId:l}),(0,a.jsx)(h,{attributes:r,setAttributes:s}),(0,a.jsx)(e,{...o})]})}),"withCoreGroupControls"),21),(0,o.addFilter)("editor.BlockListBlock",`${w}-wrapper-props`,(0,t.createHigherOrderComponent)((o=>t=>{const{attributes:i,wrapperProps:r,name:s}=t;if(v!==s)return(0,a.jsx)(o,{...t});const{responsiveContainerQuery:{hideOnDesktop:l,hideOnTablet:n,hideOnMobile:c}={},dividerColor:d,isStuckBackground:u,isStuckText:p}=i,b={...r,"data-hide-on-desktop":l,"data-hide-on-tablet":n,"data-hide-on-mobile":c};return void 0!==d&&(b.className=`has-interior-divider has-${d}-interior-divider-color`),void 0!==u&&(b.className=`has-stuck-background has-sticky-background-${u}-color`),void 0!==p&&(b.className=`has-stuck-text has-sticky-text-${p}-color`),b.style={"--grid-gutter":(0,e.getBlockGapSupportValue)(i,"vertical")},(0,a.jsx)(o,{...t,wrapperProps:b})}),"withCoreGroupResponsiveWrapper")),(0,o.addFilter)("blocks.registerBlockType",`${w}-supports`,(e=>(v!==e.name||(e.attributes={...e.attributes,responsiveContainerQuery:{type:"object",default:{hideOnDesktop:!1,hideOnTablet:!1,hideOnMobile:!1}}},e.supports.align&&(e.supports.align=["left","right","center","wide","full"])),e)))}},t={};function i(e){var r=t[e];if(void 0!==r)return r.exports;var s=t[e]={exports:{}};return o[e](s,s.exports,i),s.exports}i.m=o,e=[],i.O=(o,t,r,s)=>{if(!t){var a=1/0;for(d=0;d<e.length;d++){t=e[d][0],r=e[d][1],s=e[d][2];for(var l=!0,n=0;n<t.length;n++)(!1&s||a>=s)&&Object.keys(i.O).every((e=>i.O[e](t[n])))?t.splice(n--,1):(l=!1,s<a&&(a=s));if(l){e.splice(d--,1);var c=r();void 0!==c&&(o=c)}}return o}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[t,r,s]},i.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),(()=>{var e={8841:0,9709:0};i.O.j=o=>0===e[o];var o=(o,t)=>{var r,s,a=t[0],l=t[1],n=t[2],c=0;if(a.some((o=>0!==e[o]))){for(r in l)i.o(l,r)&&(i.m[r]=l[r]);if(n)var d=n(i)}for(o&&o(t);c<a.length;c++)s=a[c],i.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return i.O(d)},t=self.webpackChunk_pewresearch_prc_block_library=self.webpackChunk_pewresearch_prc_block_library||[];t.forEach(o.bind(null,0)),t.push=o.bind(null,t.push.bind(t))})();var r=i.O(void 0,[9709],(()=>i(6303)));r=i.O(r)})();
//# sourceMappingURL=index.js.map