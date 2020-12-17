/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2020 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibrarycollapsibleJsonp=window.wpackioprcBlocksLibrarycollapsibleJsonp||[]).push([[2],{1:function(e,t){e.exports=React},15:function(e,t){e.exports=wp.element},18:function(e,t){e.exports=wp.blockEditor},45:function(e,t,a){"use strict";var c=a(62),n=a(18),l=a(15),r=a(43),o=a(67),i=["core/paragraph","core/heading","core/image","core/table","core/list","prc-block/button"],s=[["core/paragraph",{}]];t.a=function(e){var t=e.title,a=e.className,u=e.children,p=e.setAttributes,m=void 0!==p&&p,d=e.defaultOpen,b=void 0!==d&&d,f=Object(l.useState)(b),R=Object(c.a)(f,2),w=R[0],g=R[1],k=w?"caret down":"caret right";return"is-style-alternate"===a&&(k=w?"minus":"plus"),React.createElement(r.a,{styled:!0},React.createElement(r.a.Title,{active:!0===w,index:0,onClick:function(){!1===m&&g(!w)}},React.createElement(l.Fragment,null,"is-style-alternate"!==a&&React.createElement(o.a,{name:k,onClick:function(){!1!==m&&g(!w)}}),!1!==m&&React.createElement(n.RichText,{tagName:"div",value:t,onChange:function(e){return m({title:e})},placeholder:"How we did this",formattingControls:[],keepPlaceholderOnFocus:!0,style:{display:"inline-block"}}),!1===m&&React.createElement("span",null,t),"is-style-alternate"===a&&React.createElement(o.a,{name:k,style:{marginLeft:"0.5em"},onClick:function(){!1!==m&&g(!w)}}))),React.createElement(r.a.Content,{active:!0===w},!1!==m&&React.createElement(n.InnerBlocks,{allowedBlocks:i,template:s}),!1===m&&React.createElement(l.RawHTML,null,u)))}},76:function(e,t){e.exports=wp.domReady},94:function(e,t,a){a(69),e.exports=a(95)},95:function(e,t,a){"use strict";a.r(t);var c=a(15),n=a(76),l=a.n(n),r=a(45);l()((function(){document.querySelector(".js-react-collapsible")&&document.querySelectorAll(".js-react-collapsible").forEach((function(e){console.log(e);var t=e.innerHTML,a=e.getAttribute("data-title"),n=e.getAttribute("data-style");Object(c.render)(React.createElement(r.a,{title:a,className:n,setAttributes:!1},t),e)}))}))}},[[94,0,1]]]);
//# sourceMappingURL=frontend-245885f2.js.map