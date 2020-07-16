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
(window["wpackioprcBlocksLibrarymailchimp-formJsonp"]=window["wpackioprcBlocksLibrarymailchimp-formJsonp"]||[]).push([[2],{1:function(e,t){e.exports=React},166:function(e,t){e.exports=wp.domReady},19:function(e,t){e.exports=wp.element},300:function(e,t,a){a(107),e.exports=a(301)},301:function(e,t,a){"use strict";a.r(t);var c=a(19),n=a(166),i=a.n(n),r=a(52);i()((function(){document.querySelector(".js-react-mailchimp-form")&&document.querySelectorAll(".js-react-mailchimp-form").forEach((function(e){var t={display:!0,interest:e.getAttribute("data-segment-id"),className:e.getAttribute("data-style")};Object(c.render)(React.createElement(r.a,t),e)}))}))},45:function(e,t){e.exports=ReactDOM},52:function(e,t,a){"use strict";var c=a(21),n=a(19),i=a(53),r=a.n(i),s=a(78),o=a(32);a(81);t.a=function(e){var t=e.display,a=e.interest,i=e.className,l=Object(n.useState)(!1),u=Object(c.a)(l,2),m=u[0],d=u[1],p=Object(n.useState)(!1),f=Object(c.a)(p,2),b=f[0],h=f[1],y=Object(n.useState)(""),j=Object(c.a)(y,2),O=j[0],v=j[1],w=Object(n.useState)(!1),R=Object(c.a)(w,2),S=R[0],E=R[1],g=Object(n.useState)("n/a"),k=Object(c.a)(g,2),x=k[0],N=k[1],q=function(e){d(!1),h(!1),v(""),!0!==e&&(E(!1),N(""))};return React.createElement(s.a.Dimmable,{as:"div",id:"js-mailchimp-form",dimmed:S,className:i},React.createElement(o.a,{className:"mailchimp",error:m,onSubmit:function(e){if(e.preventDefault(),!0===t){var c=O;h(!0),setTimeout((function(){r()({path:"/prc-api/v2/mailchimp/subscribe/?email=".concat(c,"&interests=").concat(a),method:"POST"}).then((function(e){console.log(e),console.info("Succesfully subscribed"),N("You have succesfully subscribed to this newsletter."),E(!0)})).then((function(){q(!0)})).catch((function(e){d(!0),"add-member-error"===e.code?N("This email address is already subscribed to this newsletter."):N("Unfortunatley we could not subscribe you to this newsletter at this time, please try again later."),E(!0)}))}),2e3)}}},React.createElement(o.a.Field,null,React.createElement(o.a.Input,{placeholder:"Email address",type:"email","data-validate":"mc-email",required:!0,onChange:function(e){v(e.target.value)},value:O}),React.createElement(o.a.Button,{secondary:!0,loading:b,content:"SIGN UP"}))),React.createElement(s.a,{active:S,onClickOutside:function(){q()}},React.createElement("p",{className:"sans-serif"},x," (Click to close)")))}},53:function(e,t){e.exports=wp.apiFetch},81:function(e,t,a){}},[[300,0,1]]]);
//# sourceMappingURL=frontend-78cdc052.js.map