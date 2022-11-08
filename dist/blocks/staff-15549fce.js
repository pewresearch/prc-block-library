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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[60],{11:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},13:function(e,t,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},16:function(e,t,n){var r,a=n(20);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var o={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=a(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)){if(n.length){var l=c.apply(null,n);l&&e.push(l)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var i in n)o.call(n,i)&&n[i]&&e.push(i);else e.push(n.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===a(n(18))&&n(18)?void 0===(r=function(){return c}.apply(t,[]))||(e.exports=r):window.classNames=c}()},17:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(23);var a=n(19),o=n(24);function c(e,t){return Object(r.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],c=!0,l=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);c=!0);}catch(e){l=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(l)throw a}}return o}}(e,t)||Object(a.a)(e,t)||Object(o.a)()}},18:function(e,t){(function(t){e.exports=t}).call(this,{})},19:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(11);function a(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t){function n(t){return e.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,n(t)}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports},23:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},24:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},29:function(e,t){e.exports=window.wp.apiFetch},3:function(e,t){e.exports=window.wp.components},337:function(e){e.exports=JSON.parse('{"name":"prc-block/staff","category":"layout","attributes":{"postId":{"type":"integer"},"title":{"type":"string"},"url":{"type":"string"},"enableJobTitle":{"type":"boolean","default":true},"enableFindAnExpert":{"type":"boolean","default":false},"enableTwitter":{"type":"boolean","default":false},"enableExpertiseLinks":{"type":"boolean","default":false}},"supports":{"html":false,"align":false}}')},4:function(e,t){e.exports=window.wp.element},47:function(e,t){e.exports=window.lodash},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},730:function(e,t,n){n(13),e.exports=n(797)},797:function(e,t,n){"use strict";n.r(t);var r=n(8),a=n(2),o=n(7),c=n(337),l=n(17),i=n(16),s=n.n(i),u=n(4),f=n(5),b=n(29),p=n.n(b),d=n(3),m=n(47),y=function(e){var t=e.value,n=e.setAttributes,r=e.forceIsEditingLink;return React.createElement(f.__experimentalLinkControl,{label:Object(a.__)("Select Staff Member"),value:t,showInitialSuggestions:!0,suggestionsQuery:{type:"post",subtype:"staff"},forceIsEditingLink:r,onChange:function(e){void 0!==e.id&&n({postId:e.id,title:e.title,url:e.url})},settings:[]})},g=function(e){var t=e.attributes,n=e.setAttributes,r=e.isSelected,o=t.postId,c=t.title,l=t.url,i=t.enableJobTitle,s=t.enableFindAnExpert,u=t.enableTwitter,b=t.enableExpertiseLinks;return React.createElement(f.InspectorControls,null,React.createElement(d.PanelBody,{title:Object(a.__)("Staff Link")},React.createElement(y,{value:{title:c,url:l,id:o},setAttributes:n,forceIsEditingLink:r})),React.createElement(d.PanelBody,{title:Object(a.__)("Staff Settings")},React.createElement("div",null,React.createElement(d.ToggleControl,{label:"Enable Job Title",checked:i,onChange:function(){return n({enableJobTitle:!i})}}),React.createElement(d.ToggleControl,{label:"Enable 'Find An Expert' Link",checked:s,onChange:function(){return n({enableFindAnExpert:!s})}}),React.createElement(d.ToggleControl,{label:"Enable Twitter",checked:u,onChange:function(){return n({enableTwitter:!u})}}),React.createElement(d.ToggleControl,{label:"Enable Expertise Links",checked:b,onChange:function(){return n({enableExpertiseLinks:!b})}}))))},w=function(e){var t=e.label,n=e.attributes,r=e.setAttributes,a=n.postId,o=n.title,c=n.url;return React.createElement(d.Placeholder,{icon:"wordpress-alt",label:t},React.createElement(y,{value:{title:o,url:c,id:a},setAttributes:r}))},E=function(e){var t=e.attributes,n=e.className,r=e.setAttributes,o=e.isSelected,c=t.postId,i=t.title,b=t.enableJobTitle,d=t.enableFindAnExpert,y=t.enableTwitter,E=t.enableExpertiseLinks,v=Object(u.useState)(!1),O=Object(l.a)(v,2),j=O[0],h=O[1],x=Object(u.useState)(!1),S=Object(l.a)(x,2),k=S[0],R=S[1],A=Object(u.useState)(!1),_=Object(l.a)(A,2),I=_[0],T=_[1],P=Object(u.useState)(!1),L=Object(l.a)(P,2),N=L[0],C=L[1],F=Object(f.useBlockProps)({className:s()(n,"ui","staff")});Object(u.useEffect)((function(){var e;(e=c,new Promise((function(t){var n={method:"GET",path:"/wp/v2/staff/".concat(e)};p()(n).then((function(e){t(e)}))}))).then((function(e){h(e.staffInfo.image),R(e.staffInfo.jobTitle),T(e.staffInfo.twitter),C(e.staffInfo.expertise),console.log("expertise",e.staffInfo.expertise)}))}),[c]);var J=d||y||E;return React.createElement("div",F,React.createElement(g,{attributes:t,setAttributes:r,isSelected:o}),Object(m.isInteger)(c)&&React.createElement(u.Fragment,null,React.createElement("div",{className:"image"},React.createElement("img",{src:j,alt:"Staff bio pic for ".concat(i)})),React.createElement("div",{className:"content"},React.createElement("div",{className:"header"},i),!0===b&&!1!==k&&React.createElement("div",{className:"job-title"},React.createElement("span",null,k)),!0===J&&React.createElement("div",{className:"extra"},!0===y&&!1!==I&&React.createElement("div",null,React.createElement("span",{className:"blue-link"},Object(a.__)("@".concat(I)))),!0===d&&React.createElement("div",null,React.createElement("span",{className:"blue-link"},Object(a.__)("Find an expert >"))),!0===E&&!1!==N&&React.createElement("div",null,React.createElement("strong",null,y?"Tweeting about: ":"Areas of Expertise: "),N.map((function(e,t){var n=t+1,r=1<N.length&&n!==N.length?"".concat(e.label,", "):e.label;return React.createElement("span",{className:"blue-link"},r)})))))),void 0===c&&React.createElement(w,{label:"Select Staff Member",attributes:t,setAttributes:r}))},v=function(e){e.attributes,e.className;return React.createElement(u.Fragment,null)};function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var h=c.name,x={title:Object(a.__)("Staff Member"),description:"Reference a staff member.",category:"layout",keywords:[Object(a.__)("Staff")],edit:E,save:v};Object(o.registerBlockType)(h,j(j({},c),x))},8:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))}},[[730,0]]]);
//# sourceMappingURL=staff-15549fce.js.map