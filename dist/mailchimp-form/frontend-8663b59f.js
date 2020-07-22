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
(window["wpackioprcBlocksLibrarymailchimp-formJsonp"]=window["wpackioprcBlocksLibrarymailchimp-formJsonp"]||[]).push([[2],{1:function(e,t){e.exports=React},172:function(e,t){e.exports=wp.domReady},24:function(e,t){e.exports=wp.element},308:function(e,t,a){a(112),e.exports=a(309)},309:function(e,t,a){"use strict";a.r(t);var i=a(24),r=a(172),s=a.n(r),c=a(57);s()((function(){document.querySelector(".js-react-mailchimp-form")&&document.querySelectorAll(".js-react-mailchimp-form").forEach((function(e){var t={display:!0,interest:e.getAttribute("data-segment-id"),className:e.getAttribute("data-style")};Object(i.render)(React.createElement(c.a,t),e)}))}))},49:function(e,t){e.exports=ReactDOM},57:function(e,t,a){"use strict";var i=a(173),r=(a(85),a(82)),s=a(32),c=(a(86),Object(i.a)({error:!1,loading:!1,emailAddress:"",dimmerActive:!1,dimmerMessage:"n/a"})((function(e){var t=e.display,a=e.interest,i=e.error,c=e.loading,n=e.emailAddress,o=e.dimmerActive,m=e.dimmerMessage,l=e.setState,d=e.className;return React.createElement(r.a.Dimmable,{as:"div",id:"js-mailchimp-form",dimmed:o,className:d},React.createElement(s.a,{className:"mailchimp",error:i,onSubmit:function(e){if(e.preventDefault(),!0===t){var i=n;l({loading:!0}),setTimeout((function(){jQuery.ajax({url:"".concat(window.siteURL,"/wp-json/prc-api/v2/mailchimp/subscribe?").concat(jQuery.param({email:i,interests:a})),type:"POST"}).done((function(){console.info("Succesfully subscribed"),l({dimmerMessage:"You have succesfully subscribed to this newsletter."})})).fail((function(e){var t={error:!0,dimmerMessage:""};"add-member-error"===e.responseJSON.code?t.dimmerMessage="This email address is already subscribed to this newsletter.":t.dimmerMessage="Unfortunatley we could not subscribe you to this newsletter at this time, please try again later.",l(t)})).always((function(){l({loading:!1,emailAddress:"",dimmerActive:!0})}))}),2e3)}}},React.createElement(s.a.Field,null,React.createElement(s.a.Input,{placeholder:"Email address",type:"email","data-validate":"mc-email",required:!0,onChange:function(e){l({emailAddress:e.target.value})},value:n}),React.createElement(s.a.Button,{secondary:!0,loading:c,content:"SIGN UP"}))),React.createElement(r.a,{active:o,onClickOutside:function(){l({dimmerActive:!1})}},React.createElement("p",{className:"sans-serif"},m," (Click to close)")))})));t.a=c},77:function(e,t){e.exports=lodash},85:function(e,t){e.exports=wp.apiFetch},86:function(e,t,a){}},[[308,0,1]]]);
//# sourceMappingURL=frontend-8663b59f.js.map