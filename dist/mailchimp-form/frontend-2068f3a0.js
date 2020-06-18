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
(window["wpackioprcBlocksLibrarymailchimp-formJsonp"]=window["wpackioprcBlocksLibrarymailchimp-formJsonp"]||[]).push([[2],{1:function(e,t){e.exports=React},24:function(e,t){e.exports=wp.element},305:function(e,t,r){r(110),e.exports=r(306)},306:function(e,t,r){"use strict";r.r(t);var n=r(24),a=r(57);function i(e){if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(e,t)}(e))){var t=0,r=function(){};return{s:r,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,a,i=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw a}}}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}document.addEventListener("DOMContentLoaded",(function(){if(document.querySelector(".js-react-mailchimp-form")){var e,t=i(document.querySelectorAll(".js-react-mailchimp-form"));try{for(t.s();!(e=t.n()).done;){var r=e.value,o={display:!0,interest:r.getAttribute("data-segment-id")};Object(n.render)(React.createElement(a.a,o),r)}}catch(e){t.e(e)}finally{t.f()}}}))},49:function(e,t){e.exports=ReactDOM},57:function(e,t,r){"use strict";var n=r(170),a=r(81),i=r(32),o=Object(n.a)({error:!1,loading:!1,emailAddress:"",dimmerActive:!1,dimmerMessage:"BLANK DIMMER MESSAGE"})((function(e){var t=e.display,r=e.interest,n=e.error,o=e.loading,c=e.emailAddress,s=e.dimmerActive,l=e.dimmerMessage,m=e.setState;return React.createElement(a.a.Dimmable,{as:"div",id:"js-mailchimp-form",dimmed:s},React.createElement(i.a,{className:"mailchimp",error:n,onSubmit:function(e){if(e.preventDefault(),!0===t){var n=c;m({loading:!0}),setTimeout((function(){jQuery.ajax({url:"".concat(window.siteURL,"/wp-json/prc-api/v2/mailchimp/subscribe?").concat(jQuery.param({email:n,interests:r})),type:"POST"}).done((function(){console.info("Succesfully subscribed"),m({dimmerMessage:"You have succesfully subscribed to this newsletter."})})).fail((function(e){var t={error:!0,dimmerMessage:""};"add-member-error"===e.responseJSON.code?t.dimmerMessage="This email address is already subscribed to this newsletter.":t.dimmerMessage="Unfortunatley we could not subscribe you to this newsletter at this time, please try again later.",m(t)})).always((function(){m({loading:!1,emailAddress:"",dimmerActive:!0})}))}),2e3)}}},React.createElement(i.a.Field,null,React.createElement(i.a.Input,{placeholder:"Email address",type:"email","data-validate":"mc-email",required:!0,onChange:function(e){m({emailAddress:e.target.value})},value:c}),React.createElement(i.a.Button,{secondary:!0,loading:o,content:"SIGN UP"}))),React.createElement(a.a,{active:s,onClickOutside:function(){m({dimmerActive:!1})}},React.createElement("p",{className:"sans-serif"},l," (Click to close)")))}));t.a=o},77:function(e,t){e.exports=lodash}},[[305,0,1]]]);
//# sourceMappingURL=frontend-2068f3a0.js.map