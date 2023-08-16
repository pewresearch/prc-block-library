!function(){"use strict";var e=window.wp.blocks,t=window.wp.element,i=window.wp.i18n,n=window.wp.blockEditor,r=window.wp.components;const o=[["core/html",{}]];var s=window.prcIcons,a=[{name:"desktop",isDefault:!0,title:(0,i.__)("Desktop"),attributes:{deviceType:"desktop",min:980,max:0},scope:["inserter","transform"],isActive:e=>{let{deviceType:t}=e;return"desktop"===t}},{name:"tablet",title:(0,i.__)("Tablet"),attributes:{deviceType:"tablet",min:480,max:979},scope:["inserter","transform"],isActive:e=>{let{deviceType:t}=e;return"tablet"===t}},{name:"mobile",title:(0,i.__)("Mobile"),attributes:{deviceType:"mobile",min:0,max:479},scope:["inserter","transform"],isActive:e=>{let{deviceType:t}=e;return"mobile"===t}}],l=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/responsive-container-view","version":"0.1.0","title":"Responsive View","category":"design","description":"A block of blocks that appears and hides at specific viewport widths.","attributes":{"min":{"type":"integer","default":0},"max":{"type":"integer"},"allowedBlocks":{"type":"array"},"orientation":{"type":"string","default":"vertical"},"deviceType":{"type":"string","enum":["desktop","tablet","mobile"],"default":"desktop"}},"supports":{"anchor":true,"html":false,"spacing":{"blockGap":true,"padding":true},"typography":{"fontSize":true,"__experimentalFontFamily":true}},"parent":["prc-block/responsive-container-controller"],"textdomain":"responsive-container-view","editorScript":"file:./index.js","editorStyle":"file:./index.css","render":"file:./render.php"}');const{name:c}=l,p={icon:function(){return(0,t.createElement)(s.Icon,{icon:s.icons.faLaptopMobile,width:21,preserveAspectRatio:"xMidYMid meet"})},edit:function(e){let{attributes:s,setAttributes:a,clientId:l}=e;const{min:c,max:p}=s,m=(0,n.useBlockProps)(),{allowedBlocks:d,orientation:u}=s,w=(0,n.useInnerBlocksProps)({},{allowedBlocks:d||!0,orientation:u||"vertical",templateLock:!1,template:o}),[b,v]=(0,t.useState)(`${c}px to ${p}px`);return(0,t.useEffect)((()=>{let e=`between ${c}px and ${p}px`;p||(e=`minimum ${c}px`),c||(e=`maximum ${p}px`),v(e)}),[c,p]),(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",m,(0,t.createElement)(r.Notice,{isDismissible:!1,spokenMessage:(0,i.__)(`Visible from ${c} pixels to ${p} pixels`)},(0,t.createElement)("span",{className:"sans-serif"},(0,t.createElement)("strong",null,"Viewport Range:")," ",(0,i.__)(b))),(0,t.createElement)("div",w)))},save:function(){return(0,t.createElement)(n.InnerBlocks.Content,null)},variations:a};(0,e.registerBlockType)(c,{...l,...p})}();
//# sourceMappingURL=index.js.map