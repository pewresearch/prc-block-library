/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.9
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
(window["wpackioprcBlocksLibrarymailchimp-opt-downJsonp"]=window["wpackioprcBlocksLibrarymailchimp-opt-downJsonp"]||[]).push([[3],{10:function(e,t){e.exports=window.wp.element},155:function(e,t,r){r(121),e.exports=r(172)},172:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.r(t);var a,i=r(78),o=r(18),c=r(49),l=function(e){var t={interests:window.prcMailchimpForm.interests};return React.createElement(c.a,t)},s=function(e){var t={interests:window.prcMailchimpForm.interests};return React.createElement(c.a,t)},d=["prc-block/mailchimp-opt-down",{title:Object(o.__)("Mailchimp Opt-down Form"),description:Object(o.__)("Unsubscribe email address from all newsletter products EXCEPT the Quarterly Update"),icon:"feedback",category:"widgets",keywords:[Object(o.__)("prc"),Object(o.__)("mailchimp"),Object(o.__)("newsletter"),Object(o.__)("newsletter signup")],supports:{html:!1},edit:l,save:s}];i.registerBlockType.apply(void 0,function(e){if(Array.isArray(e))return n(e)}(a=d)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(a)||function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(a)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())},18:function(e,t){e.exports=window.wp.i18n},49:function(e,t,r){"use strict";var n=r(58),a=(r(10),r(79)),i=r(141),o=r(32),c=r(142),l=Object(a.withState)({error:!1,loading:!1,list_id:"a33430a835",choice:!0,dimmerActive:!1,dimmerMessage:""})((function(e){var t=e.list_id,r=e.interests,a=e.error,l=e.loading,s=e.choice,d=e.emailAddress,u=e.dimmerActive,m=e.dimmerMessage,p=e.setState;return console.log(JSON.stringify(r)),console.log(d),React.createElement(React.Fragment,null,React.createElement(i.a,{style:{fontFamily:"franklin-gothic-urw"},color:a?"red":"green",hidden:!u},m),React.createElement(o.a,{className:"mailchimp-opt-down"},React.createElement(o.a.Field,null,React.createElement(o.a.Input,{label:"Email",placeholder:"Your email address",name:"email","data-validate":"mc-email",required:!0,value:d,onChange:function(e){p({emailAddress:e.target.value})},size:"big"})),r.map((function(e,r){return React.createElement(o.a.Field,null,React.createElement(o.a.Checkbox,{inline:!0,name:"interests",label:React.createElement("label",{style:{fontFamily:"franklin-gothic-urw"}}," ",e.value===t?"Send me quarterly updates and unsubscribe from all other newsletters.":e.label),value:e.value,readonly:e.value!==t,defaultChecked:e.value===t,style:{display:e.value!==t?"none":"inherit"},onChange:function(e){p({choice:!s})}}))})),React.createElement(c.a,{disabled:!s||document.querySelector("body.wp-admin"),onClick:function(e){e.preventDefault(),p({loading:!0,dimmerActive:!1});var t=d;if(!function(e){return/^.+@.+\..+$/.test(e)}(t))return console.log("email error"),void p({dimmerMessage:"Please enter a valid email address.",error:!0,loading:!1,dimmerActive:!0});var r={};jQuery.each(jQuery("input[name='interests']"),(function(){jQuery.extend(r,Object(n.a)({},jQuery(this).val(),!!jQuery(this).is(":checked")))})),setTimeout((function(){jQuery.ajax({url:"".concat(window.siteURL,"/wp-json/prc-api/v2/mailchimp/update?").concat(jQuery.param({email:t,interests:r})),type:"POST"}).fail((function(e){console.log(e),"404"==e.responseJSON.data.status&&p({dimmerMessage:"We could not find that email address in our records.",error:!0,loading:!1,dimmerActive:!0})})).done((function(){console.info("Succesfully subscribed"),p({dimmerMessage:"You have succesfully updated your preferences.",error:!1,loading:!1,dimmerActive:!0})}))}))},loading:l},"Update preferences")))}));t.a=l},78:function(e,t){e.exports=window.wp.blocks},79:function(e,t){e.exports=window.wp.compose}},[[155,0,1]]]);
//# sourceMappingURL=main-2a059430.js.map