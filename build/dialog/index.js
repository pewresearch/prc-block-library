(()=>{"use strict";const e=window.wp.blocks,o=window.wp.data,t=window.wp.i18n,l=window.wp.element,i=window.wp.blockEditor,r=window.wp.components,a=window.ReactJSXRuntime,n=[["prc-block/dialog-trigger",{}],["prc-block/dialog-element",{}]],c=["prc-block/dialog-trigger","prc-block/dialog-element"],p=window.prcIcons,s=[{name:"dialog",isDefault:!0,title:(0,t.__)("Dialog","prc-block-library"),excerpt:(0,t.__)("Display content in a pop-up (<dialog/> ).","prc-block-library"),attributes:{className:"is-style-standard",dialogType:"modal"},keywords:["dialog","modal","popup","overlay","pop-up"],category:"media",innerBlocks:[["prc-block/dialog-trigger",{},[["core/paragraph",{placeholder:(0,t.__)("Add content to trigger your dialog here...","prc-block-library")}]]],["prc-block/dialog-element",{backgroundColor:"white",style:{spacing:{padding:{top:"var:preset|spacing|30",bottom:"var:preset|spacing|30",left:"var:preset|spacing|30",right:"var:preset|spacing|30"}},shadow:"var:preset|shadow|deep"}},[["core/heading",{placeholder:(0,t.__)("Dialog Title...","prc-block-library")}],["core/paragraph",{placeholder:(0,t.__)("Add content inside the dialog here...","prc-block-library")}]]]],scope:["inserter","transform"],isActive:({className:e})=>!!e&&e.includes("is-style-standard")},{name:"dialog-video",title:(0,t.__)("Video Dialog","prc-block-library"),excerpt:(0,t.__)("Display a video in popup (<dialog/>). This variant is specifically designed for videos. Note: All Dialog blocks support the included video functionality so long as a VideoPress block is present.","prc-block-library"),attributes:{className:"is-style-video",dialogType:"modal"},keywords:["dialog","video","modal","videopress","youtube"],category:"media",innerBlocks:[["prc-block/dialog-trigger",{},[["core/paragraph",{placeholder:(0,t.__)("Add content to trigger your video dialog here...","prc-block-library")}]]],["prc-block/dialog-element",{backgroundColor:"black",textColor:"white",style:{spacing:{padding:{top:"var:preset|spacing|0",bottom:"var:preset|spacing|0",left:"var:preset|spacing|0",right:"var:preset|spacing|0"}},shadow:"var:preset|shadow|deep"},allowedBlocks:["core/video","core/embed","videopress/video"]},[["videopress/video",{}]]]],scope:["inserter","transform"],isActive:({className:e})=>!!e&&e.includes("is-style-video")}],d=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/dialog","version":"1.0.0","title":"Dialog","description":"Render content in a <dialog/> element modal. Includes a trigger to open the dialog and dialog element to render content.","category":"media","keywords":["dialog","modal","popup"],"attributes":{"dialogId":{"type":"string","default":""},"dialogType":{"type":"string","enum":["dialog","modal"],"default":"modal"},"animationDuration":{"type":"number","default":500},"autoActivationTimer":{"type":"number","default":-1},"enableDeepLink":{"type":"boolean","default":false},"widths":{"type":"object","default":{"desktop":640,"tablet":480}}},"supports":{"anchor":false,"html":false,"align":["full","wide","left","right","center"],"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}},"interactivity":true},"providesContext":{"dialog/id":"dialogId","dialog/className":"className","dialog/widths":"widths","dialog/animationDuration":"animationDuration","dialog/type":"dialogType","dialog/autoActivationTimer":"autoActivationTimer","dialog/enableDeepLink":"enableDeepLink"},"textdomain":"dialog","editorScript":"file:./index.js","viewScriptModule":"file:./view.js","render":"file:./render.php"}'),{name:g}=d,u={icon:function(){return(0,a.jsx)(p.Icon,{icon:"window-restore"})},edit:function({attributes:e,setAttributes:o,context:p,clientId:s,isSelected:d}){const{dialogType:g,dialogId:u}=e;u||o({dialogId:s});const b=(0,l.useRef)(null),m=(0,l.useMemo)((()=>b.current?.querySelector(".wp-block-prc-block-dialog-element")||null),[b,b.current]),k=(0,i.useBlockProps)({ref:b}),y=(0,i.useInnerBlocksProps)(k,{allowedBlocks:c,template:n,templateLock:"all"}),w=(0,t.__)("Edit Dialog Element","prc-block-library");return(0,a.jsxs)(l.Fragment,{children:[(0,a.jsx)(i.BlockControls,{__experimentalShareWithChildBlocks:!0,children:(0,a.jsx)(r.ToolbarGroup,{children:(0,a.jsx)(r.ToolbarButton,{label:w,onClick:()=>"modal"===g?m.showModal():m.show(),children:w})})}),(0,a.jsx)("div",{...y})]})},save:function(){return(0,a.jsx)(i.InnerBlocks.Content,{})},variations:s};(0,e.registerBlockType)(g,{...d,...u}),(0,e.registerBlockType)("prc-block/popup-controller",{apiVersion:3,title:"Legacy Popup Controller",version:"1.0.0",category:"design",name:"prc-block/popup-controller",attributes:{},supports:{inserter:!1},edit:({clientId:e})=>((e=>{const t=(0,o.select)("core/block-editor").getBlock(e),l=t.innerBlocks.map((e=>("prc-block/popup-content"===e.name?e.name="prc-block/dialog-trigger":"prc-block/popup-modal"===e.name&&(e.name="prc-block/dialog-element"),e))),i={...t,name:"prc-block/dialog",innerBlocks:l};(0,o.dispatch)("core/block-editor").replaceBlocks(e,i)})(e),null),save:()=>null}),(0,e.registerBlockType)("prc-block/popup-content",{apiVersion:3,title:"Legacy Popup Content",version:"1.0.0",category:"design",name:"prc-block/popup-content",attributes:{allowedBlocks:{type:"array"},disengageClickHandler:{type:"boolean",default:!1}},supports:{inserter:!1},edit:()=>null,save:()=>null}),(0,e.registerBlockType)("prc-block/popup-modal",{apiVersion:3,title:"Legacy Popup Modal",version:"1.0.0",category:"design",name:"prc-block/popup-modal",attributes:{allowedBlocks:{type:"array"},title:{type:"string"},transition:{type:"string",default:"scale"},shadeBackgroundLite:{type:"boolean",default:!1},controllerId:{type:"string"},isVideo:{type:"boolean",default:!1}},supports:{inserter:!1},edit:()=>null,save:()=>null})})();
//# sourceMappingURL=index.js.map