(()=>{"use strict";const o=window.wp.blocks,e=window.wp.blockEditor,t=window.wp.data,r=window.ReactJSXRuntime,n=["prc-block/promo","prc-block/card"],a=window.prcIcons,c=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/promo-rotator","version":"0.1.0","title":"Promo Rotator","description":"Rotates through a promo block randomly on page load.","keywords":["promo","rotator","ads","ad"],"category":"marketing","attributes":{"allowedBlocks":{"type":"array"}},"supports":{"anchor":true,"html":false,"spacing":{"blockGap":true,"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"typography":{"fontSize":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}},"textdomain":"promo-rotator","editorScript":"file:./index.js"}'),{name:l}=c,i={icon:function(){return(0,r.jsx)(a.Icon,{icon:"recycle"})},edit:function({attributes:o,clientId:a}){const c=(0,t.useSelect)((o=>0<o(e.store).getBlocks(a).length),[a]),l=(0,e.useBlockProps)(),{allowedBlocks:i}=o,s=(0,e.useInnerBlocksProps)(l,{allowedBlocks:i||n,orientation:"vertical",templateLock:!1,renderAppender:c?e.InnerBlocks.DefaultBlockAppender:e.InnerBlocks.ButtonBlockAppender});return(0,r.jsx)("div",{...s})},save:function(){return(0,r.jsx)(e.InnerBlocks.Content,{})}};(0,o.registerBlockType)(l,{...c,...i})})();
//# sourceMappingURL=index.js.map