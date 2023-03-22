!function(){"use strict";var e=window.wp.blocks,t=window.wp.element,n=window.wp.blockEditor;const o=["prc-block/topic-index-condensed-page"];var r=window.wp.components,s=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/tabs-panes","version":"0.1.0","title":"Tab Panes","description":"Contains the pane block that contains content for each tab.","category":"design","parent":["prc-block/tabs"],"supports":{"html":false,"align":false,"inserter":false,"multiple":false,"color":{"background":true,"text":true},"spacing":{"padding":true},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"usesContext":["prc-block/tabs/layout","prc-block/tabs/activeUUID"],"textdomain":"tabs-panes","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');const{name:i}=s,a={icon:function(){return(0,t.createElement)(r.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",height:21,preserveAspectRatio:"xMidYMid meet"},(0,t.createElement)(r.Path,{d:"M512 416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V352C0 316.7 28.65 288 64 288H448C483.3 288 512 316.7 512 352V416zM448 320H64C46.33 320 32 334.3 32 352V416C32 433.7 46.33 448 64 448H448C465.7 448 480 433.7 480 416V352C480 334.3 465.7 320 448 320zM192 112C200.8 112 208 119.2 208 128C208 136.8 200.8 144 192 144H96C87.16 144 80 136.8 80 128C80 119.2 87.16 112 96 112H192zM279.4 64C284.9 73.41 288 84.34 288 96V160C288 195.3 259.3 224 224 224H64C28.65 224 0 195.3 0 160V96C0 60.65 28.65 32 64 32H368C403.3 32 432 60.65 432 96V185.4L468.7 148.7C474.9 142.4 485.1 142.4 491.3 148.7C497.6 154.9 497.6 165.1 491.3 171.3L427.3 235.3C421.1 241.6 410.9 241.6 404.7 235.3L340.7 171.3C334.4 165.1 334.4 154.9 340.7 148.7C346.9 142.4 357.1 142.4 363.3 148.7L400 185.4V96C400 78.33 385.7 64 368 64H279.4zM224 64H64C46.33 64 32 78.33 32 96V160C32 177.7 46.33 192 64 192H224C241.7 192 256 177.7 256 160V96C256 78.33 241.7 64 224 64z"}))},edit:function(){const e=(0,n.useBlockProps)({}),r=(0,n.useInnerBlocksProps)(e,{allowedBlocks:o,orientation:"vertical",templateLock:!1,renderAppender:!1});return(0,t.createElement)("div",r)},save:function(){return(0,t.createElement)(n.InnerBlocks.Content,null)}};(0,e.registerBlockType)(i,{...s,...a})}();