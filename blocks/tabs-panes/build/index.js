(()=>{"use strict";const e=window.wp.blocks,t=window.React,n=window.wp.blockEditor,o=["prc-block/topic-index-condensed-page"],r=window.prcIcons,s=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/tabs-panes","version":"0.1.0","title":"Tab Panes","description":"Contains the pane block that contains content for each tab.","category":"design","parent":["prc-block/tabs"],"supports":{"html":false,"align":false,"inserter":false,"multiple":false,"color":{"background":true,"text":true},"spacing":{"padding":true},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"usesContext":["prc-block/tabs/layout","prc-block/tabs/activeUUID"],"textdomain":"tabs-panes","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}'),{name:a}=s,c={icon:function(){return(0,t.createElement)(r.Icon,{icon:"diagram-predecessor"})},edit:function(){const e=(0,n.useBlockProps)({}),r=(0,n.useInnerBlocksProps)(e,{allowedBlocks:o,orientation:"vertical",templateLock:!1,renderAppender:!1});return(0,t.createElement)("div",{...r})},save:function(){return(0,t.createElement)(n.InnerBlocks.Content,null)}};(0,e.registerBlockType)(a,{...s,...c})})();
//# sourceMappingURL=index.js.map