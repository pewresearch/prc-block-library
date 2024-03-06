(()=>{"use strict";var e,t={377:(e,t,n)=>{const a=window.React,o=window.wp.blocks,l=window.wp.hooks,r=window.classnames;var i=n.n(r);const s=window.wp.i18n,c=window.wp.blockEditor,u=window.wp.components,m=window.wp.data,p=window.wp.element,g=window.wp.coreData;function d({menuSlug:e,setMenuSlug:t=(()=>{})}){const{hasResolved:n,records:o}=(0,g.useEntityRecords)("postType","wp_template_part",{per_page:-1}),l=(0,a.useMemo)((()=>n&&o.filter((e=>"menu"===e.area)).map((e=>({label:e.title.rendered,value:e.slug})))),[n,o]),r=(0,a.useMemo)((()=>l.length>0),[l]),i=(0,a.useMemo)((()=>e&&l?.length&&l.some((t=>t.value===e))),[e,l]),s=(0,a.useMemo)((()=>{if(!e||!n)return;const t=n&&o&&o.find((t=>t.slug===e));return console.log("r...",t),t.theme&&t.slug?`${t.theme}//${t.slug}`:void 0}),[e,n,o]);return console.log("useMenuTemplatePart",l,r,i,o,s),{menuOptions:l,hasMenus:r,selectedMenuAndExists:i,menuId:s,setMenuSlug:t}}function b({menuSlug:e,onChange:t=(()=>{})}){const n=(0,m.useSelect)((e=>e("core").getSite().url)),o=n?`${n}/wp-admin/site-editor.php?path=%2Fpatterns&categoryType=wp_template_part&categoryId=menu`:"",{menuOptions:l,hasMenus:r,selectedMenuAndExists:i}=d({menuSlug:e,setMenuSlug:e=>t(e)}),c=(0,a.createElement)(u.Notice,{status:"warning",isDismissible:!1},(0,p.createInterpolateElement)((0,s.__)("No menu templates could be found. Create a new one in the <a>Site Editor</a>.","mega-menu-block"),{a:(0,a.createElement)("a",{href:o,target:"_blank",rel:"noreferrer"})})),g=(0,a.createElement)(u.Notice,{status:"warning",isDismissible:!1},(0,s.__)("The selected menu template no longer exists. Choose another.","mega-menu-block"));return(0,a.createElement)(p.Fragment,null,(0,a.createElement)(u.ComboboxControl,{label:(0,s.__)("Menu Template","mega-menu-block"),value:e,options:l,onChange:t,help:r&&(0,p.createInterpolateElement)((0,s.__)("Create and modify menu templates in the <a>Site Editor</a>.","mega-menu-block"),{a:(0,a.createElement)("a",{href:o,target:"_blank",rel:"noreferrer"})})}),!r&&c,r&&!i&&g)}function h({attributes:e,setAttributes:t,clientId:n}){const{menuSlug:o,label:l,title:r,description:i,url:m}=e;return(0,a.createElement)(c.InspectorControls,{group:"settings"},(0,a.createElement)(u.PanelBody,{title:(0,s.__)("Settings","prc-navigation-mega-menu"),initialOpen:!0},(0,a.createElement)(u.TextControl,{label:(0,s.__)("Label","prc-navigation-mega-menu"),type:"text",value:l,onChange:e=>t({label:e}),autoComplete:"off"}),(0,a.createElement)(b,{menuSlug:o,onChange:e=>t({menuSlug:e})}),(0,a.createElement)(u.TextareaControl,{className:"settings-panel__description",label:(0,s.__)("Description","prc-navigation-mega-menu"),type:"text",value:i||"",onChange:e=>{t({description:e})},help:(0,s.__)("The description will be displayed in the menu if the current theme supports it.","prc-navigation-mega-menu"),autoComplete:"off"}),(0,a.createElement)(u.TextControl,{label:(0,s.__)("Title","prc-navigation-mega-menu"),type:"text",value:r||"",onChange:e=>{t({title:e})},help:(0,s.__)("Additional information to help clarify the purpose of the link.","prc-navigation-mega-menu"),autoComplete:"off"}),(0,a.createElement)(u.TextControl,{label:(0,s.__)("URL","prc-navigation-mega-menu"),type:"text",value:m||"",onChange:e=>{t({url:e})},help:(0,s.__)("When the mega menu is unable to be opened clicking on the navigation link will direct the user to this url instead.","prc-navigation-mega-menu"),autoComplete:"off"})))}const w=window.prcComponents;function v({menuSlug:e,clientId:t}){const n=(0,a.createRef)(),[o,l]=(0,a.useState)(0),[r,i]=(0,a.useState)(0),{menuId:s}=d({menuSlug:e});return(0,a.useEffect)((()=>{const e=()=>{if(console.log("ref",n),n.current){const e=n.current.parentElement.parentElement.parentElement,t=e.getBoundingClientRect(),{left:a}=t,o=e.offsetHeight;l(o),i(a)}};return e(),window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[n?.current]),(0,a.createElement)(a.Fragment,null,(0,a.createElement)("div",{ref:n}),(0,a.createElement)(w.InnerBlocksAsSyncedContent,{postId:s,postType:"wp_template_part",postTypeLabel:"Mega Menu",blockProps:{className:"wp-block-prc-block-navigation-mega-menu__container",style:{top:`${o}px`,left:`-${r}px`}},clientId:t}))}const _=JSON.parse('{"UU":"prc-block/navigation-mega-menu"}'),f=(0,a.createElement)("svg",{width:"24px",height:"24px",viewBox:"0 0 24 24",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},(0,a.createElement)("path",{d:"M20,12 L4,12 L4,13.5 L20,13.5 L20,12 Z M10,6.5 L4,6.5 L4,8 L10,8 L10,6.5 Z M20,17.5 L4,17.5 L4,19 L20,19 L20,17.5 Z M20,5.62462724 L16.000015,9 L12,5.62462724 L12.9791165,4.5 L16.000015,7.04920972 L19.0208935,4.5 L20,5.62462724 Z"}));(0,o.registerBlockType)(_.UU,{icon:f,edit:function({attributes:e,setAttributes:t,clientId:n,isSelected:o}){const{label:l,description:r,menuSlug:u}=e,[m,p]=(0,a.useState)(!1),g=()=>p(!m);window.toggleMegaMenu=()=>g();const d=(0,c.useBlockProps)({className:i()("wp-block-navigation-item",{"is-open":m})});return(0,a.createElement)(a.Fragment,null,(0,a.createElement)(h,{attributes:e,setAttributes:t,clientId:n}),(0,a.createElement)("div",{...d},(0,a.createElement)("button",{className:"wp-block-navigation-item__content wp-block-prc-block-navigation-mega-menu__toggle","aria-expanded":m,type:"button"},(0,a.createElement)(c.RichText,{identifier:"label",className:"wp-block-navigation-item__label",value:l,onChange:e=>t({label:e}),"aria-label":(0,s.__)("Mega menu link text","mega-menu-block"),placeholder:(0,s.__)("Add label…","mega-menu-block"),allowedFormats:["core/bold","core/italic","core/image","core/strikethrough"]}),(0,a.createElement)("span",{className:"wp-block-prc-block-navigation-mega-menu__toggle-icon",onClick:()=>{o&&g()}},(0,a.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 12 12",fill:"none","aria-hidden":"true",focusable:"false"},(0,a.createElement)("path",{d:"M1.50002 4L6.00002 8L10.5 4",strokeWidth:"1.5"}))),r&&(0,a.createElement)("span",{className:"wp-block-navigation-item__description"},r)),m&&(0,a.createElement)(v,{menuSlug:u,clientId:n})))}}),(0,l.addFilter)("blocks.registerBlockType","prc-block-mega-menu-add-to-navigation",((e,t)=>{var n;return"core/navigation"===t?{...e,allowedBlocks:[...null!==(n=e.allowedBlocks)&&void 0!==n?n:[],"prc-block/navigation-mega-menu"]}:e}))}},n={};function a(e){var o=n[e];if(void 0!==o)return o.exports;var l=n[e]={exports:{}};return t[e](l,l.exports,a),l.exports}a.m=t,e=[],a.O=(t,n,o,l)=>{if(!n){var r=1/0;for(u=0;u<e.length;u++){for(var[n,o,l]=e[u],i=!0,s=0;s<n.length;s++)(!1&l||r>=l)&&Object.keys(a.O).every((e=>a.O[e](n[s])))?n.splice(s--,1):(i=!1,l<r&&(r=l));if(i){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[n,o,l]},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};a.O.j=t=>0===e[t];var t=(t,n)=>{var o,l,[r,i,s]=n,c=0;if(r.some((t=>0!==e[t]))){for(o in i)a.o(i,o)&&(a.m[o]=i[o]);if(s)var u=s(a)}for(t&&t(n);c<r.length;c++)l=r[c],a.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return a.O(u)},n=globalThis.webpackChunknavigation_mega_menu=globalThis.webpackChunknavigation_mega_menu||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var o=a.O(void 0,[350],(()=>a(377)));o=a.O(o)})();
//# sourceMappingURL=index.js.map