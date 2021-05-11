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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[19],{1:function(e,t){e.exports=wp.element},10:function(e,t){e.exports=lodash},13:function(e,t,n){var r,o=n(14);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var a={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)&&n.length){var i=c.apply(null,n);i&&e.push(i)}else if("object"===r)for(var l in n)a.call(n,l)&&n[l]&&e.push(l)}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===o(n(15))&&n(15)?void 0===(r=function(){return c}.apply(t,[]))||(e.exports=r):window.classNames=c}()},14:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=n=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),n(t)}e.exports=n,e.exports.default=e.exports,e.exports.__esModule=!0},15:function(e,t){(function(t){e.exports=t}).call(this,{})},177:function(e){e.exports=JSON.parse('{"name":"prc-block/staff","category":"layout","attributes":{"postId":{"type":"integer"},"title":{"type":"string"},"url":{"type":"string"},"enableJobTitle":{"type":"boolean","default":true},"enableFindAnExpert":{"type":"boolean","default":false}},"supports":{"html":false,"align":false}}')},18:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},19:function(e,t,n){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},2:function(e,t){e.exports=wp.i18n},20:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(21);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,a=void 0;try{for(var c,i=e[Symbol.iterator]();!(r=(c=i.next()).done)&&(n.push(c.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==i.return||i.return()}finally{if(o)throw a}}return n}}(e,t)||Object(r.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},21:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(18);function o(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},23:function(e,t){e.exports=wp.apiFetch},272:function(e,t,n){n(19),e.exports=n(338)},273:function(e,t,n){},3:function(e,t){e.exports=wp.components},338:function(e,t,n){"use strict";n.r(t);var r=n(6),o=n(2),a=n(9),c=n(177),i=n(20),l=n(13),s=n.n(l),u=n(1),f=n(4),p=n(23),b=n.n(p),d=n(3),m=n(10),y=function(e){var t=e.value,n=e.setAttributes,r=e.forceIsEditingLink;return React.createElement(f.__experimentalLinkControl,{label:Object(o.__)("Select Staff Member"),value:t,showInitialSuggestions:!0,suggestionsQuery:{type:"post",subtype:"staff"},forceIsEditingLink:r,onChange:function(e){void 0!==e.id&&n({postId:e.id,title:e.title,url:e.url})},settings:[]})},v=function(e){var t=e.attributes,n=e.setAttributes,r=e.isSelected,a=t.postId,c=t.title,i=t.url,l=t.enableJobTitle,s=t.enableFindAnExpert;return React.createElement(f.InspectorControls,null,React.createElement(d.PanelBody,{title:Object(o.__)("Staff Link")},React.createElement(y,{value:{title:c,url:i,id:a},setAttributes:n,forceIsEditingLink:r})),React.createElement(d.PanelBody,{title:Object(o.__)("Staff Settings")},React.createElement("div",null,React.createElement(d.ToggleControl,{label:"Enable Job Title",checked:l,onChange:function(){return n({enableJobTitle:!l})}}),React.createElement(d.ToggleControl,{label:"Enable 'Find An Expert' Link",checked:s,onChange:function(){return n({enableFindAnExpert:!s})}}))))},g=function(e){var t=e.label,n=e.attributes,r=e.setAttributes,o=n.postId,a=n.title,c=n.url;return React.createElement(d.Placeholder,{icon:"wordpress-alt",label:t},React.createElement(y,{value:{title:a,url:c,id:o},setAttributes:r}))},O=function(e){var t=e.attributes,n=e.className,r=e.setAttributes,a=e.isSelected,c=t.postId,l=t.title,p=t.enableJobTitle,d=t.enableFindAnExpert,y=Object(u.useState)(!1),O=Object(i.a)(y,2),j=O[0],E=O[1],h=Object(u.useState)(!1),w=Object(i.a)(h,2),x=w[0],S=w[1],k=Object(f.useBlockProps)({className:s()(n,"ui","staff")});return Object(u.useEffect)((function(){var e;(e=c,new Promise((function(t){var n={method:"GET",path:"/wp/v2/staff/".concat(e)};b()(n).then((function(e){t(e)}))}))).then((function(e){E(e.staffInfo.image),S(e.staffInfo.jobTitle)}))}),[c]),React.createElement("div",k,React.createElement(v,{attributes:t,setAttributes:r,isSelected:a}),Object(m.isInteger)(c)&&React.createElement(u.Fragment,null,React.createElement("div",{className:"image"},React.createElement("img",{src:j,alt:"Staff bio pic for ".concat(l)})),React.createElement("div",{className:"content"},React.createElement("div",{className:"header"},l),!0===p&&!1!==x&&React.createElement("div",{className:"job-title"},React.createElement("span",null,x)),!0===d&&React.createElement("div",{className:"extra"},React.createElement("a",{href:"#",className:"blue-link"},Object(o.__)("Find an expert >"))))),void 0===c&&React.createElement(g,{label:"Select Staff Member",attributes:t,setAttributes:r}))},j=function(e){e.attributes,e.className;return React.createElement(u.Fragment,null)};n(273);function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var w=c.name,x={title:Object(o.__)("Staff Member"),description:"Reference a staff member.",category:"layout",keywords:[Object(o.__)("Staff")],edit:O,save:j};Object(a.registerBlockType)(w,h(h({},c),x))},4:function(e,t){e.exports=wp.blockEditor},6:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},9:function(e,t){e.exports=wp.blocks}},[[272,0]]]);
//# sourceMappingURL=staff-83287285.js.map