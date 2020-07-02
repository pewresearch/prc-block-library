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
(window["wpackioprcBlocksLibrarymailchimp-opt-downJsonp"]=window["wpackioprcBlocksLibrarymailchimp-opt-downJsonp"]||[]).push([[2],{1:function(e,t){e.exports=React},25:function(e,t){e.exports=wp.element},307:function(e,t,n){n(111),e.exports=n(308)},308:function(e,t,n){"use strict";n.r(t);var r=n(25),a=n(35);function i(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,i=!0,c=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return i=e.done,e},e:function(e){c=!0,a=e},f:function(){try{i||null==r.return||r.return()}finally{if(c)throw a}}}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}window.onload=function(){if(document.querySelector(".mailchimp-opt-down")){var e,t=new URLSearchParams(window.location.search),n=i(document.querySelectorAll(".mailchimp-opt-down"));try{for(n.s();!(e=n.n()).done;){var o=e.value,c={interests:window.prcMailchimpBlock.interests,emailAddress:void 0!==t.get("email")?t.get("email"):""};Object(r.render)(React.createElement(a.a,c),o)}}catch(e){n.e(e)}finally{n.f()}}}},35:function(e,t,n){"use strict";var r=n(20),a=(n(25),n(172)),i=n(55),o=n(171),c=Object(a.a)({error:!1,loading:!1,list_id:"a33430a835",choice:!0,dimmerActive:!1,dimmerMessage:"BLANK DIMMER MESSAGE"})((function(e){var t=e.list_id,n=e.interests,a=(e.error,e.loading,e.choice),c=e.emailAddress,l=(e.dimmerActive,e.dimmerMessage,e.setState);return console.log(JSON.stringify(n)),console.log(c),React.createElement(i.a,{className:"mailchimp-opt-down"},React.createElement(i.a.Input,{label:"Email",placeholder:"Your email address",name:"email","data-validate":"mc-email",required:!0,value:c,onChange:function(e){l({emailAddress:e.target.value})}}),React.createElement("p",null,"choice: ",a?"true":"false"," "),n.map((function(e,n){return React.createElement(i.a.Checkbox,{inline:!0,name:"interests",label:e.value===t?"Send me quarterly updates and unsubscribe from all other newsletters.":e.label,value:e.value,readonly:e.value!==t,defaultChecked:e.value===t,style:{display:e.value!==t?"none":"inherit"},onChange:function(e){l({choice:!a})}})})),React.createElement(o.a,{disabled:!a||0==c.length,onClick:function(e){e.preventDefault();var t=c,n=[];jQuery.each(jQuery("input[name='interests']"),(function(){n.push(Object(r.a)({},jQuery(this).val(),!!jQuery(this).is(":checked")))})),setTimeout((function(){jQuery.ajax({url:"".concat(window.siteURL,"/wp-json/prc-api/v2/mailchimp/update?").concat(jQuery.param({email:t,interests:n})),type:"POST"}).done((function(){console.info("Succesfully subscribed"),l({dimmerMessage:"You have succesfully subscribed to this newsletter."})}))}))}},"Update preferences"))}));t.a=c},51:function(e,t){e.exports=ReactDOM},79:function(e,t){e.exports=lodash}},[[307,0,1]]]);
//# sourceMappingURL=frontend-b21490a2.js.map