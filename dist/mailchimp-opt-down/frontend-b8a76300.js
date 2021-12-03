/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.8
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2021 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window["wpackioprcBlocksLibrarymailchimp-opt-downJsonp"]=window["wpackioprcBlocksLibrarymailchimp-opt-downJsonp"]||[]).push([[2],{149:function(e,t,r){r(108),e.exports=r(150)},150:function(e,t,r){"use strict";r.r(t);var n=r(72),a=r(46);function i(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,l=!0,c=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return l=e.done,e},e:function(e){c=!0,i=e},f:function(){try{l||null==r.return||r.return()}finally{if(c)throw i}}}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}window.onload=function(){if(document.querySelector(".mailchimp-opt-down")&&!document.querySelector("body.wp-admin")){var e,t=new URLSearchParams(window.location.search),r=i(document.querySelectorAll(".mailchimp-opt-down"));try{for(r.s();!(e=r.n()).done;){var o=e.value,l={interests:window.prcMailchimpBlock.interests,emailAddress:void 0!==t.get("email")?t.get("email"):""};Object(n.render)(React.createElement(a.a,l),o)}}catch(e){r.e(e)}finally{r.f()}}}},46:function(e,t,r){"use strict";var n=r(78),a=(r(72),r(73)),i=r(122),o=r(28),l=r(123),c=Object(a.withState)({error:!1,loading:!1,list_id:"a33430a835",choice:!0,dimmerActive:!1,dimmerMessage:""})((function(e){var t=e.list_id,r=e.interests,a=e.error,c=e.loading,u=e.choice,s=e.emailAddress,d=e.dimmerActive,m=e.dimmerMessage,f=e.setState;return console.log(JSON.stringify(r)),console.log(s),React.createElement(React.Fragment,null,React.createElement(i.a,{style:{fontFamily:"franklin-gothic-urw"},color:a?"red":"green",hidden:!d},m),React.createElement(o.a,{className:"mailchimp-opt-down"},React.createElement(o.a.Field,null,React.createElement(o.a.Input,{label:"Email",placeholder:"Your email address",name:"email","data-validate":"mc-email",required:!0,value:s,onChange:function(e){f({emailAddress:e.target.value})},size:"big"})),r.map((function(e,r){return React.createElement(o.a.Field,null,React.createElement(o.a.Checkbox,{inline:!0,name:"interests",label:React.createElement("label",{style:{fontFamily:"franklin-gothic-urw"}}," ",e.value===t?"Send me quarterly updates and unsubscribe from all other newsletters.":e.label),value:e.value,readonly:e.value!==t,defaultChecked:e.value===t,style:{display:e.value!==t?"none":"inherit"},onChange:function(e){f({choice:!u})}}))})),React.createElement(l.a,{disabled:!u||document.querySelector("body.wp-admin"),onClick:function(e){e.preventDefault(),f({loading:!0,dimmerActive:!1});var t=s;if(!function(e){return/^.+@.+\..+$/.test(e)}(t))return console.log("email error"),void f({dimmerMessage:"Please enter a valid email address.",error:!0,loading:!1,dimmerActive:!0});var r={};jQuery.each(jQuery("input[name='interests']"),(function(){jQuery.extend(r,Object(n.a)({},jQuery(this).val(),!!jQuery(this).is(":checked")))})),setTimeout((function(){jQuery.ajax({url:"".concat(window.siteURL,"/wp-json/prc-api/v2/mailchimp/update?").concat(jQuery.param({email:t,interests:r})),type:"POST"}).fail((function(e){console.log(e),"404"==e.responseJSON.data.status&&f({dimmerMessage:"We could not find that email address in our records.",error:!0,loading:!1,dimmerActive:!0})})).done((function(){console.info("Succesfully subscribed"),f({dimmerMessage:"You have succesfully updated your preferences.",error:!1,loading:!1,dimmerActive:!0})}))}))},loading:c},"Update preferences")))}));t.a=c},72:function(e,t){e.exports=window.wp.element},73:function(e,t){e.exports=window.wp.compose}},[[149,0,1]]]);
//# sourceMappingURL=frontend-b8a76300.js.map