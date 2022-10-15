/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.17
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2022 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryviewJsonp=window.wpackioprcBlocksLibraryviewJsonp||[]).push([[0],[function(t,e){t.exports=window.wp.element},function(t,e){t.exports=window.wp.domReady},function(t,e,n){n(3),t.exports=n(4)},function(t,e,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,l=[],c=!0,i=!1;try{for(n=n.call(t);!(c=(r=n.next()).done)&&(l.push(r.value),!e||l.length!==e);c=!0);}catch(t){i=!0,o=t}finally{try{c||null==n.return||n.return()}finally{if(i)throw o}}return l}}(t,e)||function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}n.r(e);var l=n(0),c=n(1);function i(t){return t?t.split(";").filter((function(t){return t})).reduce((function(t,e){var n=o(e.split(":"),2),r=n[0],l=n[1];return t[r.split("-").map((function(t,e){return 0===e?t:t.charAt(0).toUpperCase()+t.slice(1)})).join("")]=l,t}),{}):{}}function a(t){return t?t.split(" ").filter((function(t){return t})):[]}function u(t){var e=t.input,n=void 0===e?{styles:"",classes:"",type:"email",placeholder:""}:e,r=t.button,c=void 0===r?{styles:"",classes:"",text:""}:r,u=(t.form,i(n.styles)),s=a(n.classes),p=i(c.styles),f=a(c.classes),y=o(Object(l.useState)(""),2),b=y[0],d=y[1];return Object(l.useEffect)((function(){console.log("Form value...",b)})),React.createElement("form",null,React.createElement("input",{type:n.type,placeholder:n.placeholder,style:u,className:s.join(" "),onChange:function(t){return d(t.target.value)},value:b}),React.createElement("button",{type:"submit",className:"wp-block-button",style:{background:"none",border:"none",padding:0,fontSize:"inherit"},onClick:function(t){t.preventDefault(),console.log("Form submitted...",b)}},React.createElement("span",{style:p,className:f.join(" ")},c.text)))}n.n(c)()((function(){document.querySelectorAll(".wp-block-prc-block-mailchimp-form").forEach((function(t){var e=t.getAttribute("data-segment-id"),n=t.querySelector(".wp-block-prc-block-form-input-field"),r=t.querySelector(".wp-block-button__link"),o=n.getAttribute("style"),c=n.getAttribute("class"),i=r.getAttribute("style"),a=r.getAttribute("class");Object(l.hydrate)(React.createElement(u,{input:{styles:o,classes:c,type:n.getAttribute("type"),placeholder:n.getAttribute("placeholder")},button:{styles:i,classes:a,text:r.innerText},form:{segmentId:e}},t.innerHTML),t)}))}))}],[[2,1]]]);
//# sourceMappingURL=mailchimp-form-a1a44de0.js.map