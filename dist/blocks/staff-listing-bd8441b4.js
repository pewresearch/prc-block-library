/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.28
 * @link UNLICENSED
 * @license UNLICENSED
 * 
 * Copyright (c) 2023 Seth Rubenstein
 * 
 * This software is released under the UNLICENSED License
 * https://opensource.org/licenses/UNLICENSED
 * 
 * Compiled with the help of https://wpack.io
 * A zero setup Webpack Bundler Script for WordPress
 */
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[62],{1:function(e,t){e.exports=window.React},11:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},15:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(22);var o=n(17),a=n(23);function c(e,t){return Object(r.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);c=!0);}catch(e){i=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw o}}return a}}(e,t)||Object(o.a)(e,t)||Object(a.a)()}},16:function(e,t){e.exports=window.wp.primitives},17:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(11);function o(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},23:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},3:function(e,t){e.exports=window.wp.components},30:function(e,t){e.exports=window.wp.apiFetch},33:function(e,t){e.exports=window.wp.url},334:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/staff-listing","title":"Staff Listing","description":"Display a list of staff members organized by staff type, as well as expertise and/or research team.","keywords":["staff","people","experts"],"category":"layout","attributes":{"staffTypes":{"type":"array","default":["staff"]},"expertise":{"type":"array"},"researchTeams":{"type":"array"}},"supports":{"html":false}}')},39:function(e,t){e.exports=window.wp.coreData},4:function(e,t){e.exports=window.wp.element},41:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(11);var o=n(42),a=n(17);function c(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||Object(o.a)(e)||Object(a.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},42:function(e,t,n){"use strict";function r(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}n.d(t,"a",(function(){return r}))},47:function(e,t){e.exports=window.wp.htmlEntities},48:function(e,t){e.exports=window.wp.date},5:function(e,t){e.exports=window.wp.blockEditor},50:function(e,t){e.exports=window.ReactDOM},56:function(e,t){e.exports=regeneratorRuntime},59:function(e,t){e.exports=window.wp.mediaUtils},60:function(e,t){e.exports=window.wp.keycodes},7:function(e,t){e.exports=window.wp.blocks},724:function(e,t,n){n(12),e.exports=n(809)},809:function(e,t,n){"use strict";n.r(t);var r=n(8),o=n(2),a=n(7),c=n(334),i=n(41),s=n(15),u=n(49),l=n(30),f=n.n(l),p=n(33),b=n(4),d=n(5),y=n(3);function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var O=function(e){return"string"!=typeof e?"":e.replace(/\w\S*/g,(function(e){return e.replace(/^\w/,(function(e){return e.toUpperCase()}))}))},j=function(e){var t=e.taxonomy,n=void 0===t?"staff-type":t,r=e.attribute,o=void 0===r?"staffTypes":r,a=e.selected,c=void 0===a?[]:a,l=e.setAttributes,f=Object(b.useState)(c),p=Object(s.a)(f,2),d=p[0],m=p[1],w=Object(b.useState)([]),j=Object(s.a)(w,2),v=j[0],g=j[1];return Object(b.useEffect)((function(){Object(u.f)(n).then((function(e){g(e)}))}),[n]),Object(b.useEffect)((function(){var e={};e[o]=Object(i.a)(d),l(e)}),[d]),React.createElement(y.BaseControl,{label:O(n.replace("-"," "))},v.map((function(e){return React.createElement(y.CheckboxControl,{key:e.value,label:e.label,checked:d.includes(e.value),onChange:function(){d.includes(e.value)?m(d.filter((function(t){return t!==e.value}))):m([].concat(Object(i.a)(d),[e.value]))}})})),React.createElement(y.CardDivider,null))},v=function(e){var t=e.attributes,n=e.setAttributes,r=t.staffTypes,a=t.expertise,c=t.researchTeams,i=Object(b.useState)({"executive-team":[],"managing-directors":[],staff:[]}),u=Object(s.a)(i,2),l=u[0],m=u[1],v=Object(b.useState)(!0),g=Object(s.a)(v,2),h=g[0],x=g[1],E=Object(d.useBlockProps)();return Object(b.useEffect)((function(){!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r={staff_types:e.join(","),areas_of_expertise:t.join(","),research_teams:n.join(",")};x(!0),f()({path:Object(p.addQueryArgs)("/prc-api/v2/blocks/staff-listing",r)}).then((function(e){console.log(e),m(w(w({},l),e))}))}(r,a,c)}),[r,a,c]),Object(b.useEffect)((function(){console.log("staffPosts changed",l),x(!1)}),[l]),React.createElement(b.Fragment,null,React.createElement(d.InspectorControls,null,React.createElement(y.PanelBody,{title:"Staff Listing Options"},React.createElement(j,{taxonomy:"staff-type",attribute:"staffTypes",selected:r,setAttributes:n}),React.createElement(j,{taxonomy:"areas-of-expertise",attribute:"expertise",selected:a,setAttributes:n}),React.createElement(j,{taxonomy:"research-teams",attribute:"researchTeams",selected:c,setAttributes:n}))),React.createElement("div",E,h&&React.createElement(y.Placeholder,{icon:"",label:Object(o.__)("Staff Listing")},React.createElement("span",null,React.createElement(y.Spinner,null)," Loading Staff Database...")),!1===h&&Object.keys(l).map((function(e){return l[e].length<=0?React.createElement(b.Fragment,null):React.createElement(b.Fragment,null,React.createElement("h2",null,O(e.replace("-"," "))),React.createElement("div",{class:"ui list"},l[e].map((function(e){return React.createElement("div",{class:"item sans-serif"},React.createElement("p",null,React.createElement("strong",null,e.name),", ",e.job_title))}))))}))))},g=function(){return React.createElement(b.Fragment,null)};function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var E=c.name,R={edit:v,save:g};Object(a.registerBlockType)(E,x(x({},c),R))},9:function(e,t){e.exports=window.wp.data}},[[724,0,1,2]]]);
//# sourceMappingURL=staff-listing-bd8441b4.js.map