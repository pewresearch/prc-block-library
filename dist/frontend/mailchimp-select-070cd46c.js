/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.23
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
(window.wpackioprcBlocksLibraryfrontendJsonp=window.wpackioprcBlocksLibraryfrontendJsonp||[]).push([[10],{1:function(e,t){e.exports=window.React},15:function(e,t){function n(t){return e.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,n(t)}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports},20:function(e,t){e.exports=window.wp.domReady},27:function(e,t){e.exports=window.wp.url},295:function(e,t){(function(t){e.exports=t}).call(this,{})},30:function(e,t,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},36:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(64);var o=n(42),a=n(65);function c(e,t){return Object(r.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);c=!0);}catch(e){i=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw o}}return a}}(e,t)||Object(o.a)(e,t)||Object(a.a)()}},41:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},42:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(41);function o(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},534:function(e,t){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports},535:function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e},e.exports.__esModule=!0,e.exports.default=e.exports},546:function(e,t,n){"use strict";var r=n(534),o=r(n(15)),a=r(n(610)),c=r(n(611)),i=r(n(535)),s=r(n(612)),u=r(n(614)),l=r(n(615));function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,l.default)(e);if(t){var o=(0,l.default)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return(0,u.default)(this,n)}}var f=n(1),d=n(616).generateQuery,h=[],y=!1,b=function(e){(0,s.default)(n,e);var t=p(n);function n(e){var r;(0,a.default)(this,n),(r=t.call(this,e)).renderCaptcha=r.renderCaptcha.bind((0,i.default)(r)),r.resetCaptcha=r.resetCaptcha.bind((0,i.default)(r)),r.removeCaptcha=r.removeCaptcha.bind((0,i.default)(r)),r.isReady=r.isReady.bind((0,i.default)(r)),r.handleOnLoad=r.handleOnLoad.bind((0,i.default)(r)),r.handleSubmit=r.handleSubmit.bind((0,i.default)(r)),r.handleExpire=r.handleExpire.bind((0,i.default)(r)),r.handleError=r.handleError.bind((0,i.default)(r)),r.handleOpen=r.handleOpen.bind((0,i.default)(r)),r.handleClose=r.handleClose.bind((0,i.default)(r)),r.handleChallengeExpired=r.handleChallengeExpired.bind((0,i.default)(r));var o="undefined"!=typeof hcaptcha;return r.ref=f.createRef(),r.state={isApiReady:o,isRemoved:!1,elementId:e.id,captchaId:""},r}return(0,c.default)(n,[{key:"componentDidMount",value:function(){var e=this.props,t=e.apihost,n=e.assethost,r=e.endpoint,o=e.host,a=e.imghost,c=e.languageOverride,i=e.reCaptchaCompat,s=e.reportapi,u=e.sentry,l=e.custom;this.state.isApiReady?this.renderCaptcha():(y||function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};y=!0,window.hcaptchaOnLoad=function(){h=h.filter((function(e){return e(),!1}))};var t=e.apihost||"https://js.hcaptcha.com";delete e.apihost;var n=document.createElement("script");n.src="".concat(t,"/1/api.js?render=explicit&onload=hcaptchaOnLoad"),n.async=!0;var r=d(e);n.src+=""!==r?"&".concat(r):"",document.head.appendChild(n)}({apihost:t,assethost:n,endpoint:r,hl:c,host:o,imghost:a,recaptchacompat:!1===i?"off":null,reportapi:s,sentry:u,custom:l}),h.push(this.handleOnLoad))}},{key:"componentWillUnmount",value:function(){var e=this.state.captchaId;this.isReady()&&(hcaptcha.reset(e),hcaptcha.remove(e))}},{key:"shouldComponentUpdate",value:function(e,t){return this.state.isApiReady===t.isApiReady&&this.state.isRemoved===t.isRemoved}},{key:"componentDidUpdate",value:function(e){var t=this;["sitekey","size","theme","tabindex","languageOverride","endpoint"].every((function(n){return e[n]===t.props[n]}))||this.removeCaptcha((function(){t.renderCaptcha()}))}},{key:"renderCaptcha",value:function(e){if(this.state.isApiReady){var t=Object.assign({"open-callback":this.handleOpen,"close-callback":this.handleClose,"error-callback":this.handleError,"chalexpired-callback":this.handleChallengeExpired,"expired-callback":this.handleExpire,callback:this.handleSubmit},this.props,{hl:this.props.hl||this.props.languageOverride,languageOverride:void 0}),n=hcaptcha.render(this.ref.current,t);this.setState({isRemoved:!1,captchaId:n},(function(){e&&e()}))}}},{key:"resetCaptcha",value:function(){var e=this.state.captchaId;this.isReady()&&hcaptcha.reset(e)}},{key:"removeCaptcha",value:function(e){var t=this.state.captchaId;this.isReady()&&this.setState({isRemoved:!0},(function(){hcaptcha.remove(t),e&&e()}))}},{key:"handleOnLoad",value:function(){var e=this;this.setState({isApiReady:!0},(function(){e.renderCaptcha((function(){var t=e.props.onLoad;t&&t()}))}))}},{key:"handleSubmit",value:function(e){var t=this.props.onVerify,n=this.state,r=n.isRemoved,o=n.captchaId;"undefined"==typeof hcaptcha||r||t(hcaptcha.getResponse(o),hcaptcha.getRespKey(o))}},{key:"handleExpire",value:function(){var e=this.props.onExpire,t=this.state.captchaId;this.isReady()&&(hcaptcha.reset(t),e&&e())}},{key:"handleError",value:function(e){var t=this.props.onError,n=this.state.captchaId;this.isReady()&&(hcaptcha.reset(n),t&&t(e))}},{key:"isReady",value:function(){var e=this.state,t=e.isApiReady,n=e.isRemoved;return t&&!n}},{key:"handleOpen",value:function(){this.isReady()&&this.props.onOpen&&this.props.onOpen()}},{key:"handleClose",value:function(){this.isReady()&&this.props.onClose&&this.props.onClose()}},{key:"handleChallengeExpired",value:function(){this.isReady()&&this.props.onChalExpired&&this.props.onChalExpired()}},{key:"execute",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this.state.captchaId;if(this.isReady())return e&&"object"!==(0,o.default)(e)&&(e=null),hcaptcha.execute(t,e)}},{key:"setData",value:function(e){var t=this.state.captchaId;this.isReady()&&(e&&"object"!==(0,o.default)(e)&&(e=null),hcaptcha.setData(t,e))}},{key:"getResponse",value:function(){return hcaptcha.getResponse(this.state.captchaId)}},{key:"getRespKey",value:function(){return hcaptcha.getRespKey(this.state.captchaId)}},{key:"render",value:function(){var e=this.state.elementId;return f.createElement("div",{ref:this.ref,id:e})}}]),n}(f.Component);e.exports=b},547:function(e,t,n){var r,o=n(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var a={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)){if(n.length){var i=c.apply(null,n);i&&e.push(i)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var s in n)a.call(n,s)&&n[s]&&e.push(s);else e.push(n.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===o(n(295))&&n(295)?void 0===(r=function(){return c}.apply(t,[]))||(e.exports=r):window.classNames=c}()},609:function(e,t,n){n(30),e.exports=n(661)},610:function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},e.exports.__esModule=!0,e.exports.default=e.exports},611:function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}e.exports=function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e},e.exports.__esModule=!0,e.exports.default=e.exports},612:function(e,t,n){var r=n(613);e.exports=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&r(e,t)},e.exports.__esModule=!0,e.exports.default=e.exports},613:function(e,t){function n(t,r){return e.exports=n=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},e.exports.__esModule=!0,e.exports.default=e.exports,n(t,r)}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports},614:function(e,t,n){var r=n(15).default,o=n(535);e.exports=function(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return o(e)},e.exports.__esModule=!0,e.exports.default=e.exports},615:function(e,t){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},e.exports.__esModule=!0,e.exports.default=e.exports,n(t)}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports},616:function(e,t,n){"use strict";var r=n(534)(n(617));e.exports={generateQuery:function(e){return Object.entries(e).filter((function(e){var t=(0,r.default)(e,2),n=(t[0],t[1]);return n||!1===n})).map((function(e){var t=(0,r.default)(e,2),n=t[0],o=t[1];return"".concat(encodeURIComponent(n),"=").concat(encodeURIComponent(o))})).join("&")}}},617:function(e,t,n){var r=n(618),o=n(619),a=n(620),c=n(622);e.exports=function(e,t){return r(e)||o(e,t)||a(e,t)||c()},e.exports.__esModule=!0,e.exports.default=e.exports},618:function(e,t){e.exports=function(e){if(Array.isArray(e))return e},e.exports.__esModule=!0,e.exports.default=e.exports},619:function(e,t){e.exports=function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);c=!0);}catch(e){i=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw o}}return a}},e.exports.__esModule=!0,e.exports.default=e.exports},620:function(e,t,n){var r=n(621);e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports},621:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r},e.exports.__esModule=!0,e.exports.default=e.exports},622:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},64:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},65:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},66:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(41);var o=n(74),a=n(42);function c(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||Object(o.a)(e)||Object(a.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},661:function(e,t,n){"use strict";n.r(t);var r=n(20),o=n.n(r),a=n(7),c=n(66),i=n(36),s=n(82),u=n(546),l=n.n(u),p=n(547),f=n.n(p),d=n(76),h=n.n(d),y=n(27);function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){Object(s.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function m(e){return e?e.split(";").filter((function(e){return e})).reduce((function(e,t){var n=t.split(":"),r=Object(i.a)(n,2),o=r[0],a=r[1];return e[o.split("-").map((function(e,t){return 0===t?e:e.charAt(0).toUpperCase()+e.slice(1)})).join("")]=a,e}),{}):{}}function x(e){var t=e.className,n=void 0===t?"":t,r=e.style,o=void 0===r?{}:r,c=e.input,s=void 0===c?null:c,u=e.button,p=void 0===u?null:u,d=e.value,h=void 0===d?null:d,y=e.error,b=void 0!==y&&y,m=e.success,x=void 0!==m&&m,g=e.processing,O=void 0!==g&&g,j=e.disabled,w=void 0!==j&&j,k=e.onChange,R=void 0===k?function(){}:k,S=e.setToken,_=void 0===S?function(){}:S,E=e.onSubmit,C=void 0===E?function(){}:E;if(null===s||null===p)return null;var A=f()(p.className,{"is-processing":O,"is-disabled":w,"has-error":b,"has-success":x}),I=Object(a.useState)(p.text),N=Object(i.a)(I,2),M=N[0],P=N[1];Object(a.useEffect)((function(){P(O?"Processing":b?"Error":x?"Success":p.text)}),[O,b,x]);var D=Object(a.useRef)(null);return React.createElement("div",{className:n,style:o},React.createElement("input",{className:s.className,style:s.style,type:s.type,placeholder:s.placeholder,value:h,onChange:function(e){return R(e.target.value)}}),React.createElement(l.a,{sitekey:"0fe85c0d-1c67-498a-9b51-eb9d3b473970",theme:"light",ref:D,onVerify:function(e){_(e)},onOpen:function(){!function e(){var t=document.querySelector('iframe[title="Main content of the hCaptcha challenge"]');if(t=t.parentElement.parentElement){var n=t.querySelector("div:last-of-type");null!==n&&(n.style=v(v({},n.style),{},{display:"none"}))}else e()}()}}),React.createElement("button",{type:"submit",className:p.wrapperClassName,disabled:O||w,style:v({opacity:O||w?.5:1},p.wrapperStyle),onClick:function(e){e.preventDefault(),!1===w&&C()}},React.createElement("span",{style:p.style,className:A},M)))}function g(e){var t=e.className,n=e.style,r=e.value,o=e.checked,a=e.label,c=e.name,i=e.onChange;return React.createElement("div",{className:t,style:m(n),onClick:function(){return i(r)},role:"checkbox","aria-checked":o,tabIndex:"0",onKeyDown:function(e){"Enter"===e.key&&i(r)}},React.createElement("input",{type:"checkbox",name:c,value:r,checked:o}),React.createElement("label",{"aria-controls":"".concat(c)},a))}function O(e){var t=e.checkboxes,n=void 0===t?[]:t,r=e.selected,o=void 0===r?[]:r,s=e.onChange,u=Object(a.useState)([]),l=Object(i.a)(u,2),p=l[0],f=l[1];return Object(a.useEffect)((function(){n.forEach((function(e){var t=e.getAttribute("class")||"",n=e.getAttribute("style")||"",r=e.querySelector("label"),o=e.querySelector("input"),a={className:t,style:n,label:r.innerText,name:o.getAttribute("name"),value:o.getAttribute("value")};f((function(e){return[].concat(Object(c.a)(e),[a])}))}))}),[n]),React.createElement(a.Fragment,null,p.map((function(e){var t=e.className,n=e.style,r=e.label,a=e.name,c=e.value;return React.createElement(g,{className:t,style:n,label:r,name:a,value:c,checked:o.includes(c),onChange:s})})))}function j(e){var t=e.className,n=void 0===t?"":t,r=e.checkboxes,o=void 0===r?[]:r,s=e.action,u=void 0===s?{className:"",style:{},input:null,button:null}:s,l=[],p=[];o.forEach((function(e){var t=e.querySelector("input");t.getAttribute("checked")&&l.push(t.getAttribute("value")),p.push(t.getAttribute("value"))}));var f=Object(a.useState)(l),d=Object(i.a)(f,2),b=d[0],m=d[1],g=Object(a.useState)(!1),j=Object(i.a)(g,2),w=j[0],k=j[1],R=Object(a.useState)(!1),S=Object(i.a)(R,2),_=S[0],E=S[1],C=Object(a.useState)(!1),A=Object(i.a)(C,2),I=A[0],N=A[1],M=Object(a.useState)(!1),P=Object(i.a)(M,2),D=P[0],L=P[1],q=Object(a.useState)(null),T=Object(i.a)(q,2),U=T[0],B=T[1],K=Object(a.useState)(!1),Q=Object(i.a)(K,2),z=Q[0],F=Q[1];return Object(a.useEffect)((function(){E(0===b.length||!1===z)}),[z,b]),React.createElement("form",{className:n},React.createElement(O,{checkboxes:o,selected:b,onChange:function(e){"select-all"===e?b.length===p.length?m([]):m(p):b.includes(e)?m(b.filter((function(t){return t!==e}))):m([].concat(Object(c.a)(b),[e]))}}),React.createElement(x,v(v({},u),{},{processing:w,disabled:_,error:I,success:D,value:U,onChange:function(e){B(e)},setToken:F,onSubmit:function(){var e=document.URL;if(Object(y.isURL)(e)){k(!0);var t=Object(y.buildQueryString)({email:U,interests:b.join(","),captcha_token:z,api_key:"mailchimp-select",origin_url:e});h()({path:"/prc-api/v2/mailchimp/subscribe/?".concat(t),method:"POST"}).then((function(){L(!0)})).catch((function(e){console.error("Error",e),N(!0)})).finally((function(){k(!1)}))}else console.error("Invalid URL")}})))}o()((function(){document.querySelectorAll(".wp-block-prc-block-mailchimp-select").forEach((function(e){var t=e.getAttribute("class"),n=e.querySelectorAll(".wp-block-prc-block-form-input-checkbox"),r=e.querySelector(".wp-block-group"),o=r.getAttribute("class")||"",c=r.querySelector(".wp-block-prc-block-form-input-text"),i=c.getAttribute("style")||"",s=c.getAttribute("class")||"",u=r.querySelector(".wp-block-button"),l=r.querySelector(".wp-block-button__link"),p=u.getAttribute("class")||"",f=u.getAttribute("style")||"",d=l.getAttribute("style")||"",h=l.getAttribute("class")||"",y=document.createElement("div");e.parentNode.insertBefore(y,e),Object(a.render)(React.createElement(j,{className:t,checkboxes:n,action:{className:r.getAttribute("class")||"",style:m(o),input:{style:m(i),className:s,type:c.getAttribute("type"),placeholder:c.getAttribute("placeholder")},button:{wrapperClassName:p,wrapperStyle:m(f),style:m(d),className:h,text:l.innerText}}}),y),e.parentNode.removeChild(e)}))}))},7:function(e,t){e.exports=window.wp.element},74:function(e,t,n){"use strict";function r(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}n.d(t,"a",(function(){return r}))},76:function(e,t){e.exports=window.wp.apiFetch},82:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))}},[[609,0]]]);
//# sourceMappingURL=mailchimp-select-070cd46c.js.map