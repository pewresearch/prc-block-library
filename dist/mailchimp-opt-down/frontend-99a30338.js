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
(window["wpackioprcBlocksLibrarymailchimp-opt-downJsonp"]=window["wpackioprcBlocksLibrarymailchimp-opt-downJsonp"]||[]).push([[2],{1:function(e,t){e.exports=React},24:function(e,t){e.exports=wp.element},306:function(e,t,n){n(110),e.exports=n(307)},307:function(e,t,n){"use strict";n.r(t);var r=n(24),a=n(34);function o(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(e,t)}(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,o=!0,c=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return o=e.done,e},e:function(e){c=!0,a=e},f:function(){try{o||null==r.return||r.return()}finally{if(c)throw a}}}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}document.addEventListener("DOMContentLoaded",(function(){if(document.querySelector(".mailchimp-opt-down")){var e,t=o(document.querySelectorAll(".mailchimp-opt-down"));try{for(t.s();!(e=t.n()).done;){var n=e.value;Object(r.render)(React.createElement(a.a,null),n)}}catch(e){t.e(e)}finally{t.f()}}}))},34:function(e,t,n){"use strict";n(24);var r=n(171),a=n(54),o=n(170),i=new URLSearchParams(window.location.search),c={error:!1,loading:!1,choice:"999f8eb858",emailAddress:void 0!==i.get("email")?i.get("email"):"",dimmerActive:!1,dimmerMessage:"BLANK DIMMER MESSAGE"},l=Object(r.a)(c)((function(e){e.error,e.loading;var t=e.choice,n=e.emailAddress,r=(e.dimmerActive,e.dimmerMessage,e.setState);return console.log(n),React.createElement(a.a,{className:"mailchimp-opt-down"},React.createElement(a.a.Input,{label:"Email",placeholder:"",name:"email",value:n,onChange:function(e){r({emailAddress:e.target.value})}}),window.prcMailchimpBlock.interests.map((function(e,n){return React.createElement(a.a.Checkbox,{inline:!0,name:"interests",label:e.label,value:e.value,checked:e.value===t,style:{display:e.value!==t?"none":"inherit"}})})),React.createElement(o.a,null,"Update preferences"))}));t.a=l},50:function(e,t){e.exports=ReactDOM},78:function(e,t){e.exports=lodash}},[[306,0,1]]]);
//# sourceMappingURL=frontend-99a30338.js.map