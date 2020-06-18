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
(window.wpackioprcBlocksLibrarycollapsibleJsonp=window.wpackioprcBlocksLibrarycollapsibleJsonp||[]).push([[2],{0:function(e,t){e.exports=React},110:function(e,t){e.exports=wp.domReady},18:function(e,t){e.exports=wp.blockEditor},239:function(e,t,n){n(72),e.exports=n(240)},240:function(e,t,n){"use strict";n.r(t);var r=n(9),a=n(110),o=n.n(a),c=n(34);function l(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(e,t)}(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,o=!0,c=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return o=e.done,e},e:function(e){c=!0,a=e},f:function(){try{o||null==r.return||r.return()}finally{if(c)throw a}}}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}o()((function(){if(document.querySelector(".js-react-collapsible")){var e,t=l(document.querySelectorAll(".js-react-collapsible"));try{for(t.s();!(e=t.n()).done;){var n=e.value;console.log(n);var a=n.innerHTML,o=n.getAttribute("data-title"),i=n.getAttribute("data-style");Object(r.render)(React.createElement(c.a,{title:o,className:i,setAttributes:!1},a),n)}}catch(e){t.e(e)}finally{t.f()}}}))},34:function(e,t,n){"use strict";var r=n(50),a=n(18),o=n(9),c=n(29),l=n(51),i=["core/paragraph","core/heading","core/list","prc-block/button"],u=[["core/paragraph",{}]];t.a=function(e){var t=e.title,n=e.className,s=e.children,f=e.setAttributes,p=void 0!==f&&f,m=e.defaultOpen,d=void 0!==m&&m,y=Object(o.useState)(d),b=Object(r.a)(y,2),v=b[0],h=b[1],w=v?"caret down":"caret right";return"is-style-alternate"===n&&(w=v?"minus":"plus"),React.createElement(c.a,{styled:!0},React.createElement(c.a.Title,{active:!0===v,index:0,onClick:function(){!1===p&&h(!v)}},React.createElement(o.Fragment,null,"is-style-alternate"!==n&&React.createElement(l.a,{name:w,onClick:function(){!1!==p&&h(!v)}}),!1!==p&&React.createElement(a.RichText,{tagName:"div",value:t,onChange:function(e){return p({title:e})},placeholder:"How we did this",formattingControls:[],keepPlaceholderOnFocus:!0,style:{display:"inline-block"}}),!1===p&&React.createElement("span",null,t),"is-style-alternate"===n&&React.createElement(l.a,{name:w,style:{marginLeft:"0.5em"},onClick:function(){!1!==p&&h(!v)}}))),React.createElement(c.a.Content,{active:!0===v},!1!==p&&React.createElement(a.InnerBlocks,{allowedBlocks:i,template:u}),!1===p&&React.createElement(o.RawHTML,null,s)))}},9:function(e,t){e.exports=wp.element}},[[239,0,1]]]);
//# sourceMappingURL=frontend-af882c25.js.map