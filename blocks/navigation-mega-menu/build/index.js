(()=>{"use strict";var e,o={446:(e,o,t)=>{const n=window.React,l=window.wp.blocks,r=window.wp.hooks,a=window.classnames;var c=t.n(a);const i=window.prcIcons,u=window.wp.i18n,s=window.wp.blockEditor,m=window.wp.components,g=window.wp.data,d=window.wp.element,p=window.wp.coreData;function v({menuSlug:e,setMenuSlug:o=(()=>{})}){const{hasResolved:t,records:l}=(0,p.useEntityRecords)("postType","wp_template_part",{per_page:-1}),r=(0,n.useMemo)((()=>{const o=l.find((o=>o.slug===e));return o?[{label:o.title.rendered,value:o.slug}]:l.filter((e=>"menu"===e.area||e.title.rendered.includes("menu"))).map((e=>({label:e.title.rendered,value:e.slug})))}),[e,l]),a=(0,n.useMemo)((()=>r.length>0),[r]),c=(0,n.useMemo)((()=>e&&r?.length&&r.some((o=>o.value===e))),[e,r]),i=(0,n.useMemo)((()=>{if(!e||!t)return;const o=t&&l&&l.find((o=>o.slug===e));return console.log("r...",o),o.theme&&o.slug?`${o.theme}//${o.slug}`:void 0}),[e,t,l]);return console.log("useMenuTemplatePart",r,a,c,l,i),{menuOptions:r,hasMenus:a,selectedMenuAndExists:c,menuId:i,setMenuSlug:o}}function C({menuSlug:e,onChange:o=(()=>{})}){const t=(0,g.useSelect)((e=>e("core").getSite().url)),l=t?`${t}/wp-admin/site-editor.php?path=%2Fpatterns&categoryType=wp_template_part&categoryId=menu`:"",{menuOptions:r,hasMenus:a,selectedMenuAndExists:c}=v({menuSlug:e,setMenuSlug:e=>o(e)}),i=(0,n.createElement)(m.Notice,{status:"warning",isDismissible:!1},(0,d.createInterpolateElement)((0,u.__)("No menu templates could be found. Create a new one in the <a>Site Editor</a>.","mega-menu-block"),{a:(0,n.createElement)("a",{href:l,target:"_blank",rel:"noreferrer"})})),s=(0,n.createElement)(m.Notice,{status:"warning",isDismissible:!1},(0,u.__)("The selected menu template no longer exists. Choose another.","mega-menu-block"));return(0,n.createElement)(d.Fragment,null,(0,n.createElement)(m.ComboboxControl,{label:(0,u.__)("Menu Template","mega-menu-block"),value:e,options:r,onChange:o,help:a&&(0,d.createInterpolateElement)((0,u.__)("Create and modify menu templates in the <a>Site Editor</a>.","mega-menu-block"),{a:(0,n.createElement)("a",{href:l,target:"_blank",rel:"noreferrer"})})}),!a&&i,a&&!c&&s)}function b({colors:e,clientId:o}){const t=(0,s.__experimentalUseMultipleOriginColorsAndGradients)(),l=(0,n.useMemo)((()=>{const{menuItemBackgroundColor:o,setMenuItemBackgroundColor:t,menuItemTextColor:n,setMenuItemTextColor:l,menuItemActiveBackgroundColor:r,setMenuItemActiveBackgroundColor:a,menuItemActiveTextColor:c,setMenuItemActiveTextColor:i,menuOverlayBackgroundColor:s,setMenuOverlayBackgroundColor:m,menuOverlayTextColor:g,setMenuOverlayTextColor:d,menuActiveBorderColor:p,setMenuActiveBorderColor:v}=e;return[{colorValue:o?.color,onColorChange:t,label:(0,u.__)("Menu Item Background Color","prc-block-library")},{colorValue:n?.color,onColorChange:l,label:(0,u.__)("Menu Item Text Color","prc-block-library")},{colorValue:r?.color,onColorChange:a,label:(0,u.__)("Menu Item Active Background Color","prc-block-library")},{colorValue:c?.color,onColorChange:i,label:(0,u.__)("Menu Item Active Text Color","prc-block-library")},{colorValue:s?.color,onColorChange:m,label:(0,u.__)("Menu Overlay Background Color","prc-block-library")},{colorValue:g?.color,onColorChange:d,label:(0,u.__)("Menu Overlay Text Color","prc-block-library")},{colorValue:p?.color,onColorChange:v,label:(0,u.__)("Menu Active Border Color","prc-block-library")}]}),[e]);return(0,n.createElement)(s.InspectorControls,{group:"color"},(0,n.createElement)(s.__experimentalColorGradientSettingsDropdown,{settings:l,panelId:o,hasColorsOrGradients:!1,disableCustomColors:!0,__experimentalIsRenderedInSidebar:!0,...t}))}function h({attributes:e,setAttributes:o,colors:t,clientId:l}){const{menuSlug:r,label:a,title:c,description:i,url:g,icon:d}=e;return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(s.InspectorControls,{group:"settings"},(0,n.createElement)(m.PanelBody,{title:(0,u.__)("Settings","prc-navigation-mega-menu"),initialOpen:!0},(0,n.createElement)(m.TextControl,{label:(0,u.__)("Label","prc-navigation-mega-menu"),type:"text",value:a,onChange:e=>o({label:e}),autoComplete:"off"}),(0,n.createElement)(C,{menuSlug:r,onChange:e=>o({menuSlug:e})}),(0,n.createElement)(m.TextareaControl,{className:"settings-panel__description",label:(0,u.__)("Description","prc-navigation-mega-menu"),type:"text",value:i||"",onChange:e=>{o({description:e})},help:(0,u.__)("The description will be displayed in the menu if the current theme supports it.","prc-navigation-mega-menu"),autoComplete:"off"}),(0,n.createElement)(m.TextControl,{label:(0,u.__)("Title","prc-navigation-mega-menu"),type:"text",value:c||"",onChange:e=>{o({title:e})},help:(0,u.__)("Additional information to help clarify the purpose of the link.","prc-navigation-mega-menu"),autoComplete:"off"}),(0,n.createElement)(m.TextControl,{label:(0,u.__)("URL","prc-navigation-mega-menu"),type:"text",value:g||"",onChange:e=>{o({url:e})},help:(0,u.__)("When the mega menu is unable to be opened clicking on the navigation link will direct the user to this url instead.","prc-navigation-mega-menu"),autoComplete:"off"}),(0,n.createElement)(m.SelectControl,{label:(0,u.__)("Icon","prc-navigation-mega-menu"),value:d,options:[{label:(0,u.__)("Dropdown","prc-navigation-mega-menu"),value:"dropdown"},{label:(0,u.__)("Mobile Menu","prc-navigation-mega-menu"),value:"mobile"},{label:(0,u.__)("Search","prc-navigation-mega-menu"),value:"search"}],onChange:e=>{o({icon:e})},help:(0,u.__)("Choose an icon to display next to the label. Mobile and Search options replace the label with an icon.","prc-navigation-mega-menu")}))),(0,n.createElement)(b,{colors:t,clientId:l}))}const _=window.prcComponents;function k({menuSlug:e,overlayClassnames:o,clientId:t}){const l=(0,n.createRef)(),[r,a]=(0,n.useState)(0),[c,i]=(0,n.useState)(0),{menuId:u}=v({menuSlug:e});return(0,n.useEffect)((()=>{const e=()=>{if(console.log("EditMenuTemplatePart Ref:",l),l.current){const e=l.current.parentElement.parentElement.parentElement,o=e.getBoundingClientRect(),{left:t}=o,n=e.offsetHeight;a(n),i(t)}};return e(),window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[l?.current]),(0,n.createElement)(n.Fragment,null,(0,n.createElement)("div",{ref:l}),(0,n.createElement)(_.InnerBlocksAsSyncedContent,{postId:u,postType:"wp_template_part",postTypeLabel:"Mega Menu",blockProps:{className:`${o}`,style:{top:`${r}px`,left:`-${c}px`}},clientId:t}))}const w=(0,s.withColors)({menuItemBackgroundColor:"color"},{menuItemTextColor:"color"},{menuItemActiveBackgroundColor:"color"},{menuItemActiveTextColor:"color"},{menuOverlayBackgroundColor:"color"},{menuOverlayTextColor:"color"},{menuActiveBorderColor:"color"})((function({attributes:e,setAttributes:o,clientId:t,isSelected:l,menuItemBackgroundColor:r,setMenuItemBackgroundColor:a,menuItemTextColor:m,setMenuItemTextColor:g,menuItemActiveBackgroundColor:d,setMenuItemActiveBackgroundColor:p,menuItemActiveTextColor:v,setMenuItemActiveTextColor:C,menuOverlayBackgroundColor:b,setMenuOverlayBackgroundColor:_,menuOverlayTextColor:w,setMenuOverlayTextColor:M,menuActiveBorderColor:y,setMenuActiveBorderColor:f}){const{label:I,description:x,menuSlug:E,icon:T}=e,[B,A]=(0,n.useState)(!1),O=()=>A(!B);window.toggleMegaMenu=()=>O();const S={menuItemBackgroundColor:r,setMenuItemBackgroundColor:a,menuItemTextColor:m,setMenuItemTextColor:g,menuItemActiveBackgroundColor:d,setMenuItemActiveBackgroundColor:p,menuItemActiveTextColor:v,setMenuItemActiveTextColor:C,menuOverlayBackgroundColor:b,setMenuOverlayBackgroundColor:_,menuOverlayTextColor:w,setMenuOverlayTextColor:M,menuActiveBorderColor:y,setMenuActiveBorderColor:f},L=c()("wp-block-navigation-item",{"is-active":B,"has-active-menu-item-background":!!d.color||d.class,[(0,s.getColorClassName)("active-menu-item-background",d?.slug)]:!!d?.slug,"has-active-menu-item-color":!!v.color||v.class,[(0,s.getColorClassName)("active-menu-item-color",v?.slug)]:!!v?.slug,"has-menu-item-background":!!r.color||r.class,[(0,s.getColorClassName)("menu-item-background",r?.slug)]:!!r?.slug,"has-menu-item-color":!!m.color||m.class,[(0,s.getColorClassName)("menu-item-color",m?.slug)]:!!m?.slug,"has-active-border-color":!!y.color||y.class,[(0,s.getColorClassName)("active-border-color",y?.slug)]:!!y?.slug}),N=c()("wp-block-prc-block-navigation-mega-menu__container",{"has-overlay-background":!!b.color||b.class,[(0,s.getColorClassName)("overlay-background",b?.slug)]:!!b?.slug,"has-overlay-color":!!w.color||w.class,[(0,s.getColorClassName)("overlay-color",w?.slug)]:!!w?.slug}),R=(0,s.useBlockProps)({className:L}),F=(0,n.useMemo)((()=>"dropdown"===T?"caret-down":"mobile"===T?"bars":"search"===T?"magnifying-glass":"caret-down"),[T]),P=(0,n.useMemo)((()=>"caret-down"===F?"sharp-solid":"mobile"===T?"light":"solid"),[F,T]),V=!T||"dropdown"===T;return(0,n.createElement)(n.Fragment,null,(0,n.createElement)(h,{attributes:e,setAttributes:o,colors:S,clientId:t}),(0,n.createElement)("div",{...R},(0,n.createElement)("button",{className:"wp-block-navigation-item__content wp-block-prc-block-navigation-mega-menu__toggle","aria-expanded":B,type:"button"},V&&(0,n.createElement)(s.RichText,{identifier:"label",className:"wp-block-navigation-item__label",value:I,onChange:e=>o({label:e}),"aria-label":(0,u.__)("Mega menu link text","mega-menu-block"),placeholder:(0,u.__)("Add label…","mega-menu-block"),allowedFormats:["core/bold","core/italic","core/image","core/strikethrough"]}),(0,n.createElement)("span",{className:`wp-block-prc-block-navigation-mega-menu__toggle-${T}-icon`,onClick:()=>{l&&O()}},(0,n.createElement)(i.Icon,{library:P,icon:F})),x&&(0,n.createElement)("span",{className:"wp-block-navigation-item__description"},x)),(0,n.createElement)("div",{className:"wp-block-prc-block-navigation-mega-menu__tab-divider"}),B&&(0,n.createElement)(k,{menuSlug:E,clientId:t,overlayClassnames:N})))})),M=JSON.parse('{"UU":"prc-block/navigation-mega-menu"}'),y=(0,n.createElement)("svg",{width:"24px",height:"24px",viewBox:"0 0 24 24",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},(0,n.createElement)("path",{d:"M20,12 L4,12 L4,13.5 L20,13.5 L20,12 Z M10,6.5 L4,6.5 L4,8 L10,8 L10,6.5 Z M20,17.5 L4,17.5 L4,19 L20,19 L20,17.5 Z M20,5.62462724 L16.000015,9 L12,5.62462724 L12.9791165,4.5 L16.000015,7.04920972 L19.0208935,4.5 L20,5.62462724 Z"}));(0,l.registerBlockType)(M.UU,{icon:y,edit:w}),(0,r.addFilter)("blocks.registerBlockType","prc-block-mega-menu-add-to-navigation",((e,o)=>{var t;return"core/navigation"===o?{...e,allowedBlocks:[...null!==(t=e.allowedBlocks)&&void 0!==t?t:[],"prc-block/navigation-mega-menu"]}:e}))}},t={};function n(e){var l=t[e];if(void 0!==l)return l.exports;var r=t[e]={exports:{}};return o[e](r,r.exports,n),r.exports}n.m=o,e=[],n.O=(o,t,l,r)=>{if(!t){var a=1/0;for(s=0;s<e.length;s++){for(var[t,l,r]=e[s],c=!0,i=0;i<t.length;i++)(!1&r||a>=r)&&Object.keys(n.O).every((e=>n.O[e](t[i])))?t.splice(i--,1):(c=!1,r<a&&(a=r));if(c){e.splice(s--,1);var u=l();void 0!==u&&(o=u)}}return o}r=r||0;for(var s=e.length;s>0&&e[s-1][2]>r;s--)e[s]=e[s-1];e[s]=[t,l,r]},n.n=e=>{var o=e&&e.__esModule?()=>e.default:()=>e;return n.d(o,{a:o}),o},n.d=(e,o)=>{for(var t in o)n.o(o,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})},n.o=(e,o)=>Object.prototype.hasOwnProperty.call(e,o),(()=>{var e={57:0,350:0};n.O.j=o=>0===e[o];var o=(o,t)=>{var l,r,[a,c,i]=t,u=0;if(a.some((o=>0!==e[o]))){for(l in c)n.o(c,l)&&(n.m[l]=c[l]);if(i)var s=i(n)}for(o&&o(t);u<a.length;u++)r=a[u],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(s)},t=globalThis.webpackChunknavigation_mega_menu=globalThis.webpackChunknavigation_mega_menu||[];t.forEach(o.bind(null,0)),t.push=o.bind(null,t.push.bind(t))})();var l=n.O(void 0,[350],(()=>n(446)));l=n.O(l)})();
//# sourceMappingURL=index.js.map