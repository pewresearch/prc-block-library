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
(window["wpackioprcBlocksLibrarymailchimp-opt-downJsonp"]=window["wpackioprcBlocksLibrarymailchimp-opt-downJsonp"]||[]).push([[2],{1:function(e,t){e.exports=React},24:function(e,t){e.exports=wp.element},306:function(e,t,n){n(110),e.exports=n(307)},307:function(e,t,n){"use strict";n.r(t);var r=n(24),a=n(34);function o(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(e,t)}(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,o=!0,l=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return o=e.done,e},e:function(e){l=!0,a=e},f:function(){try{o||null==r.return||r.return()}finally{if(l)throw a}}}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}window.onload=function(){if(document.querySelector(".mailchimp-opt-down")){var e,t=new URLSearchParams(window.location.search),n=o(document.querySelectorAll(".mailchimp-opt-down"));try{for(n.s();!(e=n.n()).done;){var i=e.value,l={interests:window.prcMailchimpBlock.interests,emailAddress:void 0!==t.get("email")?t.get("email"):""};Object(r.render)(React.createElement(a.a,l),i)}}catch(e){n.e(e)}finally{n.f()}}}},34:function(e,t,n){"use strict";n(24);var r=n(171),a=n(54),o=n(170),i=Object(r.a)({error:!1,loading:!1,list_id:"999f8eb858",choice:!0,dimmerActive:!1,dimmerMessage:"BLANK DIMMER MESSAGE"})((function(e){var t=e.list_id,n=e.interests,r=(e.error,e.loading,e.choice),i=e.emailAddress,l=(e.dimmerActive,e.dimmerMessage,e.setState);return console.log(JSON.stringify(n)),console.log(i),React.createElement(a.a,{className:"mailchimp-opt-down"},React.createElement(a.a.Input,{label:"Email",placeholder:"",name:"email",value:i,onChange:function(e){l({emailAddress:e.target.value})}}),React.createElement("p",null,"choice: ",r?"true":"false"),n.map((function(e,n){return React.createElement(a.a.Checkbox,{inline:!0,name:"interests",label:e.value===t?"Send me quarterly updates and unsubscribe from all other newsletters.":e.label,value:e.value,readonly:e.value!==t,defaultChecked:e.value===t,style:{display:e.value!==t?"none":"inherit"},onChange:function(e){e.preventDefault(),l({choice:!r})}})})),React.createElement(o.a,null,"Update preferences"))}));t.a=i},50:function(e,t){e.exports=ReactDOM},78:function(e,t){e.exports=lodash}},[[306,0,1]]]);
//# sourceMappingURL=frontend-8cdf2290.js.map