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
(window["wpackioprcBlocksLibrarymailchimp-formJsonp"]=window["wpackioprcBlocksLibrarymailchimp-formJsonp"]||[]).push([[2],{0:function(e,t){e.exports=React},105:function(e,t,c){},122:function(e,t){e.exports=wp.domReady},144:function(e,t,c){c(109),e.exports=c(145)},145:function(e,t,c){"use strict";c.r(t);var a=c(15),n=c(122),i=c.n(n),o=c(72);i()((function(){document.querySelector(".wp-block-prc-block-mailchimp-form")&&document.querySelectorAll(".wp-block-prc-block-mailchimp-form").forEach((function(e){var t={display:!0,interest:e.getAttribute("data-segment-id"),className:e.getAttribute("class")};Object(a.render)(React.createElement(o.a,t),e)}))}))},15:function(e,t){e.exports=wp.element},61:function(e,t){e.exports=ReactDOM},72:function(e,t,c){"use strict";var a=c(23),n=c(15),i=c(73),o=c.n(i),r=c(44),l=c(45);c(105);t.a=function(e){var t=e.display,c=e.interest,i=e.className,s=Object(n.useState)("SIGNUP"),u=Object(a.a)(s,2),m=u[0],p=u[1],d=Object(n.useState)(!1),f=Object(a.a)(d,2),b=f[0],h=f[1],O=Object(n.useState)(!1),v=Object(a.a)(O,2),R=v[0],j=v[1],w=Object(n.useState)(!1),E=Object(a.a)(w,2),S=E[0],k=E[1],y=Object(n.useState)(""),g=Object(a.a)(y,2),x=g[0],N=g[1],q=function(){j(!1),k(!1),h(!0),p(React.createElement(r.a,{name:"check circle"})),N("")};return React.createElement("div",{className:i},React.createElement(l.a,{className:"mailchimp",error:R,onSubmit:function(e){if(e.preventDefault(),!0===t){var a=x;k(!0),setTimeout((function(){o()({path:"/prc-api/v2/mailchimp/subscribe/?email=".concat(a,"&interests=").concat(c),method:"POST"}).then((function(){q()})).catch((function(e){k(!1),"add-member-error"===e.code?(q(),console.info("".concat(x," already subscribed to ").concat(c))):(h(!1),j(!0),p("ERROR"))}))}),2e3)}}},React.createElement(l.a.Field,null,React.createElement(l.a.Input,{placeholder:"Email address","data-validate":"mc-email",required:!0,onChange:function(e){N(e.target.value)},value:x}),React.createElement(l.a.Button,{secondary:!0,positive:b,negative:R,loading:S,icon:b},m))))}},73:function(e,t){e.exports=wp.apiFetch}},[[144,0,1]]]);
//# sourceMappingURL=frontend-d8c631de.js.map