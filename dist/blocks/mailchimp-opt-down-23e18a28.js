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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[29],{1:function(e,t){e.exports=window.React},29:function(e,t){e.exports=window.wp.apiFetch},31:function(e,t){e.exports=window.wp.url},312:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/mailchimp-opt-down","title":"Mailchimp Opt-down Form","description":"Allows newsletter subscribers to quickly unsubscribe from a selection of newsletters.","category":"widgets","attributes":{},"icon":"feedback","supports":{"html":false,"inserter":false}}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},50:function(e,t){e.exports=window.ReactDOM},698:function(e,t,n){n(13),e.exports=n(810)},7:function(e,t){e.exports=window.wp.blocks},810:function(e,t,n){"use strict";n.r(t);var r=n(8),a=n(4),c=n(7),o=n(312),i=n(5),l=n(17),s=n(444),u=n(874),p=n(873),d=n(833),b=n(29),m=n.n(b),f=n(31),w=function(e){Object(s.a)(e);var t=Object(a.useState)(!1),n=Object(l.a)(t,2),r=n[0],c=n[1],o=Object(a.useState)(!1),i=Object(l.a)(o,2),b=i[0],w=i[1],O=Object(a.useState)(!1),j=Object(l.a)(O,2),y=j[0],g=j[1],h=Object(a.useState)(!1),v=Object(l.a)(h,2),k=v[0],E=v[1],R=Object(a.useState)(""),S=Object(l.a)(R,2),P=S[0],x=S[1],F=Object(a.useState)(Object(f.getQueryArg)(window.location,"email")),D=Object(l.a)(F,2),q=D[0],C=D[1];return React.createElement(a.Fragment,null,React.createElement(u.a,{style:{fontFamily:"franklin-gothic-urw"},color:r?"red":"green",hidden:!k},P),React.createElement(p.a,{className:"mailchimp-opt-down"},React.createElement(p.a.Field,null,React.createElement(p.a.Input,{label:"Email",placeholder:"Your email address",name:"email","data-validate":"mc-email",required:!0,value:q,onChange:function(e){C(e.target.value)},size:"big"})),React.createElement(p.a.Field,null,React.createElement(p.a.Checkbox,{inline:!0,name:"interests",label:"Send me quarterly updates and unsubscribe from all other newsletters.",value:"a33430a835",onChange:function(e){console.log("Click",e),g(!0)}})),React.createElement(d.a,{disabled:!y||document.querySelector("body.wp-admin"),onClick:function(e){if(e.preventDefault(),w(!0),E(!1),!Object(f.isEmail)(q))return x("Please enter a valid email address"),c(!0),w(!1),void E(!0);m()({path:Object(f.addQueryArgs)("prc-api/v2/mailchimp/quarterly-opt-out/",{email:q}),method:"POST"}).then((function(e){console.info("Succesfully updated",e),w(!1),c(!1),E(!0),x("You have succesfully updated your preferences.")})).catch((function(e){console.log(e),w(!1),c(!0),E(!0),"404"==e.data.status&&x("We could not find that email address in our records.")}))},loading:b},"Update preferences")))},O=function(e){var t=Object(i.useBlockProps)();return React.createElement("div",t,React.createElement(w,null))};function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g=o.name,h={edit:O,save:function(){return React.createElement(a.Fragment,null)}};Object(c.registerBlockType)(g,y(y({},o),h))}},[[698,0,3,80]]]);
//# sourceMappingURL=mailchimp-opt-down-23e18a28.js.map