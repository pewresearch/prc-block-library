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
(window.wpackioprcBlocksLibrarycollapsibleJsonp=window.wpackioprcBlocksLibrarycollapsibleJsonp||[]).push([[2],{0:function(e,t){e.exports=React},110:function(e,t){e.exports=wp.domReady},18:function(e,t){e.exports=wp.blockEditor},239:function(e,t,n){n(72),e.exports=n(240)},240:function(e,t,n){"use strict";n.r(t);var r=n(7),a=n(110),l=n.n(a),c=n(34);function o(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(e,t)}(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,l=!0,c=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return l=e.done,e},e:function(e){c=!0,a=e},f:function(){try{l||null==r.return||r.return()}finally{if(c)throw a}}}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}l()((function(){if(document.querySelector(".js-react-collapsible")){var e,t=o(document.querySelectorAll(".js-react-collapsible"));try{for(t.s();!(e=t.n()).done;){var n=e.value;console.log(n);var a=n.innerHTML,l=n.getAttribute("data-title"),i=n.getAttribute("data-style");Object(r.render)(React.createElement(c.a,{title:l,className:i,setAttributes:!1},a),n)}}catch(e){t.e(e)}finally{t.f()}}}))},34:function(e,t,n){"use strict";var r=n(50),a=n(18),l=n(7),c=n(51),o=n(29),i=["core/paragraph","core/heading","core/list","prc-block/button"];t.a=function(e){var t=e.title,n=e.className,u=e.children,s=e.setAttributes,f=void 0!==s&&s,m=e.defaultOpen,p=void 0!==m&&m,d=Object(l.useState)(p),y=Object(r.a)(d,2),b=y[0],v=y[1],h=b?"caret down":"caret right";"is-style-alternate"===n&&(h=b?"minus":"plus");var w=function(){return React.createElement(l.Fragment,null,"is-style-alternate"!==n&&React.createElement(c.a,{name:h,onClick:function(){!1!==f&&v(!b)}}),!1!==f&&React.createElement(a.RichText,{tagName:"div",value:t,onChange:function(e){return f({title:e})},placeholder:"How we did this",formattingControls:[],keepPlaceholderOnFocus:!0,style:{display:"inline-block"}}),!1===f&&React.createElement("span",null,t),"is-style-alternate"===n&&React.createElement(c.a,{name:h,style:{marginLeft:"0.5em"},onClick:function(){!1!==f&&v(!b)}}))},g=function(){return React.createElement(l.Fragment,null,!1!==f&&React.createElement(a.InnerBlocks,{allowedBlocks:i}),!1===f&&React.createElement(l.RawHTML,null,u))};return React.createElement(o.a,{styled:!0},React.createElement(o.a.Title,{active:!0===b,index:0,onClick:function(){!1===f&&v(!b)}},React.createElement(w,null)),React.createElement(o.a.Content,{active:!0===b},React.createElement(g,null)))}},7:function(e,t){e.exports=wp.element}},[[239,0,1]]]);
//# sourceMappingURL=frontend-89695bf8.js.map