/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.14
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[47],{1:function(e,t){e.exports=window.React},1047:function(e,t,n){"use strict";n.r(t);var r=n(14),a=n(2),o=n(9),c=n(410),i=n(65),s=n(21),u=n(46),l=n(29),f=n.n(l),p=n(35),b=n(4),y=n(5),d=n(3);function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function O(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var w=function(e){return"string"!=typeof e?"":e.replace(/\w\S*/g,(function(e){return e.replace(/^\w/,(function(e){return e.toUpperCase()}))}))},j=function(e){var t=e.taxonomy,n=void 0===t?"staff-type":t,r=e.attribute,a=void 0===r?"staffTypes":r,o=e.selected,c=void 0===o?[]:o,l=e.setAttributes,f=Object(b.useState)(c),p=Object(s.a)(f,2),y=p[0],m=p[1],O=Object(b.useState)([]),j=Object(s.a)(O,2),v=j[0],g=j[1];return Object(b.useEffect)((function(){Object(u.f)(n).then((function(e){g(e)}))}),[n]),Object(b.useEffect)((function(){var e={};e[a]=Object(i.a)(y),l(e)}),[y]),React.createElement(d.BaseControl,{label:w(n.replace("-"," "))},v.map((function(e){return React.createElement(d.CheckboxControl,{key:e.value,label:e.label,checked:y.includes(e.value),onChange:function(){y.includes(e.value)?m(y.filter((function(t){return t!==e.value}))):m([].concat(Object(i.a)(y),[e.value]))}})})),React.createElement(d.CardDivider,null))},v=function(e){var t=e.attributes,n=e.setAttributes,r=t.staffTypes,o=t.expertise,c=t.researchTeams,i=Object(b.useState)({"executive-team":[],"managing-directors":[],staff:[]}),u=Object(s.a)(i,2),l=u[0],m=u[1],v=Object(b.useState)(!0),g=Object(s.a)(v,2),h=g[0],E=g[1],x=Object(y.useBlockProps)();return Object(b.useEffect)((function(){!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r={staff_types:e.join(","),areas_of_expertise:t.join(","),research_teams:n.join(",")};E(!0),f()({path:Object(p.addQueryArgs)("/prc-api/v2/blocks/staff-listing",r)}).then((function(e){console.log(e),m(O(O({},l),e))}))}(r,o,c)}),[r,o,c]),Object(b.useEffect)((function(){console.log("staffPosts changed",l),E(!1)}),[l]),React.createElement(b.Fragment,null,React.createElement(y.InspectorControls,null,React.createElement(d.PanelBody,{title:"Staff Listing Options"},React.createElement(j,{taxonomy:"staff-type",attribute:"staffTypes",selected:r,setAttributes:n}),React.createElement(j,{taxonomy:"areas-of-expertise",attribute:"expertise",selected:o,setAttributes:n}),React.createElement(j,{taxonomy:"research-teams",attribute:"researchTeams",selected:c,setAttributes:n}))),React.createElement("div",x,h&&React.createElement(d.Placeholder,{icon:"",label:Object(a.__)("Staff Listing")},React.createElement("span",null,React.createElement(d.Spinner,null)," Loading Staff Database...")),!1===h&&Object.keys(l).map((function(e){return l[e].length<=0?React.createElement(b.Fragment,null):React.createElement(b.Fragment,null,React.createElement("h2",null,w(e.replace("-"," "))),React.createElement("div",{class:"ui list"},l[e].map((function(e){return React.createElement("div",{class:"item sans-serif"},React.createElement("p",null,React.createElement("strong",null,e.name),", ",e.job_title))}))))}))))},g=function(){return React.createElement(b.Fragment,null)};function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function E(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var x=c.name,R={edit:v,save:g};Object(o.registerBlockType)(x,E(E({},c),R))},11:function(e,t){e.exports=window.wp.data},2:function(e,t){e.exports=window.wp.i18n},21:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(31);var a=n(27),o=n(32);function c(e,t){return Object(r.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,o=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);c=!0);}catch(e){i=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw a}}return o}}(e,t)||Object(a.a)(e,t)||Object(o.a)()}},22:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},25:function(e,t){e.exports=window.wp.primitives},27:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(22);function a(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},29:function(e,t){e.exports=window.wp.apiFetch},3:function(e,t){e.exports=window.wp.components},31:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},32:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},35:function(e,t){e.exports=window.wp.url},4:function(e,t){e.exports=window.wp.element},40:function(e,t){e.exports=window.wp.htmlEntities},410:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/staff-listing","title":"Staff Listing","description":"Display a list of staff members organized by staff type, as well as expertise and/or research team.","keywords":["staff","people","experts"],"category":"layout","attributes":{"staffTypes":{"type":"array","default":["staff"]},"expertise":{"type":"array"},"researchTeams":{"type":"array"}},"supports":{"html":false}}')},5:function(e,t){e.exports=window.wp.blockEditor},51:function(e,t){e.exports=window.ReactDOM},58:function(e,t){e.exports=regeneratorRuntime},64:function(e,t){e.exports=window.wp.mediaUtils},65:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(22);var a=n(69),o=n(27);function c(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||Object(a.a)(e)||Object(o.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},66:function(e,t){e.exports=window.wp.keycodes},69:function(e,t,n){"use strict";function r(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}n.d(t,"a",(function(){return r}))},9:function(e,t){e.exports=window.wp.blocks},967:function(e,t,n){n(23),e.exports=n(1047)}},[[967,0,1,2]]]);
//# sourceMappingURL=staff-listing-0803280f.js.map