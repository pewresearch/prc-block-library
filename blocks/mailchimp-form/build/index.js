(()=>{"use strict";var e,t={695:()=>{const e=window.wp.blocks,t=window.React,r=window.prcBlockUtils,i=window.wp.blockEditor,o=window.wp.element,n=window.prcComponents,a=window.wp.i18n,c=window.wp.components;function l({attributes:e,setAttributes:r}){const{interest:o}=e;return(0,t.createElement)(i.InspectorControls,null,(0,t.createElement)(c.PanelBody,{title:(0,a.__)("Mailchimp Form Options")},(0,t.createElement)(c.PanelRow,null,(0,t.createElement)(n.MailchimpSegmentSelect,{label:"Choose Newsletter Segment",value:o,onChange:e=>{r({interest:e})},apiKey:"mailchimp-form"}))))}const p=["prc-block/form-input-text","prc-block/form-input-captcha","prc-block/form-input-message","core/button"],s=window.prcIcons,m=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"prc-block/mailchimp-form","title":"MailChimp Form","description":"A block that allows you to add a MailChimp form to your page.","version":"0.1.0","category":"marketing","keywords":["mailchimp","form","newsletter","subscribe"],"attributes":{"interest":{"type":"string","default":""}},"supports":{"anchor":true,"html":false,"spacing":{"margin":true,"padding":true,"blockGap":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true},"interactivity":true},"example":{"attributes":{},"innerBlocks":[{"name":"prc-block/form-input-text","attributes":{"type":"email"}},{"name":"core/button","attributes":{"text":"SIGN UP"}}],"viewportWidth":640},"providesContext":{"interactiveNamespace":"interactiveNamespace"},"textdomain":"mailchimp-form","editorScript":"file:./index.js","style":"file:./style-index.css","render":"file:./render.php","viewModule":"file:./view.js"}'),{name:u}=m,b={icon:function(){return(0,t.createElement)(s.Icon,{icon:"mailchimp",library:"brands"})},edit:function({attributes:e,setAttributes:n}){const a=(0,i.useBlockProps)({style:{"--block-gap":(0,r.getBlockGapSupportValue)(e)}}),c=(0,i.useInnerBlocksProps)(a,{allowedBlocks:p,templateLock:!1,template:[["prc-block/form-input-text",{isInteractive:!0,interactiveNamespace:"prc-block/mailchimp-form"}],["core/button",{text:"Sign Up",isInteractive:!0,interactiveNamespace:"prc-block/mailchimp-form"}],["prc-block/form-captcha",{isInteractive:!0,interactiveNamespace:"prc-block/mailchimp-form"}]]});return(0,t.createElement)(o.Fragment,null,(0,t.createElement)(l,{attributes:e,setAttributes:n}),(0,t.createElement)("form",{...c}))},save:function({attributes:e}){return(0,t.createElement)(i.InnerBlocks.Content,null)}};(0,e.registerBlockType)(u,{...m,...b})}},r={};function i(e){var o=r[e];if(void 0!==o)return o.exports;var n=r[e]={exports:{}};return t[e](n,n.exports,i),n.exports}i.m=t,e=[],i.O=(t,r,o,n)=>{if(!r){var a=1/0;for(s=0;s<e.length;s++){for(var[r,o,n]=e[s],c=!0,l=0;l<r.length;l++)(!1&n||a>=n)&&Object.keys(i.O).every((e=>i.O[e](r[l])))?r.splice(l--,1):(c=!1,n<a&&(a=n));if(c){e.splice(s--,1);var p=o();void 0!==p&&(t=p)}}return t}n=n||0;for(var s=e.length;s>0&&e[s-1][2]>n;s--)e[s]=e[s-1];e[s]=[r,o,n]},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,350:0};i.O.j=t=>0===e[t];var t=(t,r)=>{var o,n,[a,c,l]=r,p=0;if(a.some((t=>0!==e[t]))){for(o in c)i.o(c,o)&&(i.m[o]=c[o]);if(l)var s=l(i)}for(t&&t(r);p<a.length;p++)n=a[p],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(s)},r=globalThis.webpackChunkmailchimp_form=globalThis.webpackChunkmailchimp_form||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=i.O(void 0,[350],(()=>i(695)));o=i.O(o)})();
//# sourceMappingURL=index.js.map