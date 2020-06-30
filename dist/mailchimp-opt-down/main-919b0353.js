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
(window["wpackioprcBlocksLibrarymailchimp-opt-downJsonp"]=window["wpackioprcBlocksLibrarymailchimp-opt-downJsonp"]||[]).push([[3],{1:function(e,t){e.exports=React},151:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r(59);function a(e,t){if(e){if("string"==typeof e)return Object(n.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(e,t):void 0}}},152:function(e,t){e.exports=wp.blocks},184:function(e,t,r){r(110),e.exports=r(308)},24:function(e,t){e.exports=wp.element},308:function(e,t,r){"use strict";r.r(t);var n=r(59);var a=r(151);var i,o=r(152),c=r(38),l=r(34),s=function(e){return React.createElement(l.a,null)},u=function(e){return React.createElement(l.a,null)},p=["prc-block/mailchimp-opt-down",{title:Object(c.__)("Mailchimp Opt-down Form"),description:Object(c.__)("Unsubscribe email address from all newsletter products EXCEPT the Quarterly Update"),icon:"feedback",category:"widgets",keywords:[Object(c.__)("prc"),Object(c.__)("mailchimp"),Object(c.__)("newsletter"),Object(c.__)("newsletter signup")],supports:{html:!1},attributes:{interest:{type:"string",default:""}},edit:s,save:u}];o.registerBlockType.apply(void 0,function(e){if(Array.isArray(e))return Object(n.a)(e)}(i=p)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(i)||Object(a.a)(i)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())},34:function(e,t,r){"use strict";r(24);var n=r(171),a=r(54),i=r(170),o=new URLSearchParams(window.location.search),c={error:!1,loading:!1,choice:"999f8eb858",emailAddress:void 0!==o.get("email")?o.get("email"):"",dimmerActive:!1,dimmerMessage:"BLANK DIMMER MESSAGE"},l=Object(n.a)(c)((function(e){e.error,e.loading;var t=e.choice,r=e.emailAddress,n=(e.dimmerActive,e.dimmerMessage,e.setState);return console.log(r),React.createElement(a.a,{className:"mailchimp-opt-down"},React.createElement(a.a.Input,{label:"Email",placeholder:"",name:"email",value:r,onChange:function(e){n({emailAddress:e.target.value})}}),window.prcMailchimpBlock.interests.map((function(e,r){return React.createElement(a.a.Checkbox,{inline:!0,name:"interests",label:e.label,value:e.value,checked:e.value===t,style:{display:e.value!==t?"none":"inherit"}})})),React.createElement(i.a,null,"Update preferences"))}));t.a=l},38:function(e,t){e.exports=wp.i18n},50:function(e,t){e.exports=ReactDOM},59:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,"a",(function(){return n}))},78:function(e,t){e.exports=lodash}},[[184,0,1]]]);
//# sourceMappingURL=main-919b0353.js.map