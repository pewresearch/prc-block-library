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
(window.wpackioprcBlocksLibraryviewJsonp=window.wpackioprcBlocksLibraryviewJsonp||[]).push([[0],[function(t,e){t.exports=window.wp.element},function(t,e){t.exports=window.wp.domReady},function(t,e,r){r(3),t.exports=r(4)},function(t,e,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,l=[],c=!0,i=!1;try{for(r=r.call(t);!(c=(n=r.next()).done)&&(l.push(n.value),!e||l.length!==e);c=!0);}catch(t){i=!0,o=t}finally{try{c||null==r.return||r.return()}finally{if(i)throw o}}return l}}(t,e)||function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r.r(e);var l=r(0),c=r(1);function i(t){return t?t.split(";").filter((function(t){return t})).reduce((function(t,e){var r=o(e.split(":"),2),n=r[0],l=r[1];return t[n.split("-").map((function(t,e){return 0===e?t:t.charAt(0).toUpperCase()+t.slice(1)})).join("")]=l,t}),{}):{}}function a(t){return t?t.split(" ").filter((function(t){return t})):[]}function u(t){var e=t.input,r=void 0===e?{styles:"",classes:"",type:"email",placeholder:""}:e,n=t.button,c=void 0===n?{styles:"",classes:"",text:""}:n,u=(t.form,i(r.styles)),s=a(r.classes),p=i(c.styles),f=a(c.classes),y=o(Object(l.useState)(""),2),b=y[0],d=y[1];return Object(l.useEffect)((function(){console.log("Form value...",b)})),React.createElement("form",null,React.createElement("input",{type:r.type,placeholder:r.placeholder,style:u,className:s.join(" "),onChange:function(t){return d(t.target.value)},value:b}),React.createElement("button",{type:"submit",className:"wp-block-button",style:{background:"none",border:"none",padding:0,fontSize:"inherit"}},React.createElement("span",{style:p,className:f.join(" ")},c.text)))}r.n(c)()((function(){document.querySelectorAll(".wp-block-prc-block-mailchimp-form").forEach((function(t){var e=t.getAttribute("data-segment-id"),r=t.querySelector(".wp-block-prc-block-form-input-field"),n=t.querySelector(".wp-block-button__link"),o=r.getAttribute("style"),c=r.getAttribute("class"),i=n.getAttribute("style"),a=n.getAttribute("class");Object(l.hydrate)(React.createElement(u,{input:{styles:o,classes:c,type:r.getAttribute("type"),placeholder:r.getAttribute("placeholder")},button:{styles:i,classes:a,text:n.innerText},form:{segmentId:e}},t.innerHTML),t)}))}))}],[[2,1]]]);
//# sourceMappingURL=mailchimp-form-8777efc6.js.map