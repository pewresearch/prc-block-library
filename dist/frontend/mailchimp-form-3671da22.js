/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 0.1.0
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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[6],{1:function(e,t){e.exports=React},111:function(e,t){e.exports=ReactDOM},133:function(e,t){e.exports=wp.apiFetch},15:function(e,t){e.exports=wp.element},20:function(e,t){e.exports=wp.domReady},271:function(e,t,c){},476:function(e,t,c){c(28),e.exports=c(495)},495:function(e,t,c){"use strict";c.r(t);var a=c(15),n=c(20),o=c.n(n),r=c(34),i=c(133),l=c.n(i),s=c(123),u=c(178),m=(c(271),function(e){var t=e.display,c=e.interest,n=e.className,o=Object(a.useState)("SIGN UP"),i=Object(r.a)(o,2),m=i[0],p=i[1],d=Object(a.useState)(!1),b=Object(r.a)(d,2),f=b[0],h=b[1],O=Object(a.useState)(!1),R=Object(r.a)(O,2),v=R[0],j=R[1],w=Object(a.useState)(!1),E=Object(r.a)(w,2),S=E[0],k=E[1],y=Object(a.useState)(""),g=Object(r.a)(y,2),x=g[0],N=g[1],q=function(){j(!1),k(!1),h(!0),p(React.createElement(s.a,{name:"check circle"})),N("")};return React.createElement("div",{className:n},React.createElement(u.a,{className:"mailchimp",error:v,onSubmit:function(e){if(e.preventDefault(),!0===t){var a=x;k(!0),setTimeout((function(){l()({path:"/prc-api/v2/mailchimp/subscribe/?email=".concat(a,"&interests=").concat(c),method:"POST"}).then((function(){q()})).catch((function(e){k(!1),"add-member-error"===e.code?(q(),console.info("".concat(x," already subscribed to ").concat(c))):(h(!1),j(!0),p("ERROR"))}))}),2e3)}}},React.createElement(u.a.Field,null,React.createElement(u.a.Input,{placeholder:"Email address","data-validate":"mc-email",required:!0,onChange:function(e){N(e.target.value)},value:x}),React.createElement(u.a.Button,{secondary:!0,positive:f,negative:v,loading:S,icon:f},m))))});o()((function(){(console.log("MailChimpForm Init"),document.querySelector(".wp-block-prc-block-mailchimp-form"))&&document.querySelectorAll(".wp-block-prc-block-mailchimp-form").forEach((function(e){var t={display:!0,interest:e.getAttribute("data-segment-id"),className:e.getAttribute("class")};Object(a.render)(React.createElement(m,t),e)}))}))}},[[476,0,1,2]]]);
//# sourceMappingURL=mailchimp-form-3671da22.js.map