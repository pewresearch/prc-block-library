/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.0.0
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[33],{11:function(e,t){e.exports=window.wp.blocks},16:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},2:function(e,t){e.exports=window.wp.i18n},21:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(42);var o=n(33),a=n(43);function c(e,t){return Object(r.a)(e)||function(e,t){var n=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=n){var r,o,a=[],c=!0,l=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);c=!0);}catch(e){l=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(l)throw o}}return a}}(e,t)||Object(o.a)(e,t)||Object(a.a)()}},23:function(e,t,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},24:function(e,t){e.exports=window.wp.apiFetch},27:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},3:function(e,t){e.exports=window.wp.element},302:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-az","category":"layout","attributes":{"letter":{"type":"string"},"exclude":{"type":"string"}},"supports":{"html":false,"align":false}}')},303:function(e,t){e.exports=window.wp.htmlEntities},33:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(27);function o(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},4:function(e,t){e.exports=window.wp.components},42:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},43:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},45:function(e,t){e.exports=window.lodash},6:function(e,t){e.exports=window.wp.blockEditor},633:function(e,t,n){n(23),e.exports=n(660)},660:function(e,t,n){"use strict";n.r(t);var r=n(16),o=n(2),a=n(11),c=n(302),l=n(80),i=n(21),u=n(24),s=n.n(u),b=n(303),f=n(4),p=n(3),d=n(6),m=n(45),v=n.n(m),y=function(e){var t=e.attributes,n=e.className,r=e.setAttributes,o=t.letter,a=t.exclude,c=Object(p.useState)(!1),u=Object(i.a)(c,2),m=u[0],y=u[1],w=Object(d.useBlockProps)({className:n}),O=function(){(function(e){return console.log("getTermsByLetter",e),new Promise((function(t){s()({path:"/prc-api/v2/blocks/helpers/get-topic-by-letter/?letter=".concat(e)}).then((function(e){console.log(e);var n=e.map((function(e){return{name:e.name,term_id:e.term_id,excluded:!1}}));console.log(n),t(n)}))}))})(o).then((function(e){var t=void 0!==a?a.split(",").map((function(e){return parseInt(e)})):[],n=e.map((function(e){return t.includes(e.term_id)&&(e.excluded=!0),e}));y(n)}))};return Object(p.useEffect)((function(){if(console.log("trying to set the exclude map...",m),!1!==m){var e=m.filter((function(e){return!0===e.excluded})).map((function(e){return e.term_id}));console.log("tmpExclude",e),r({exclude:e.join()})}}),[m]),Object(p.useEffect)((function(){O()}),[o]),React.createElement("div",w,void 0===o&&React.createElement(f.SelectControl,{label:"Chose a letter",value:o,options:[{label:"(Click to select letter)",value:null},{label:"A",value:"A"},{label:"B",value:"B"},{label:"C",value:"C"},{label:"D",value:"D"},{label:"E",value:"E"},{label:"F",value:"F"},{label:"G",value:"G"},{label:"H",value:"H"},{label:"I",value:"I"},{label:"J",value:"J"},{label:"K",value:"K"},{label:"L",value:"L"},{label:"M",value:"M"},{label:"N",value:"N"},{label:"O",value:"O"},{label:"P",value:"P"},{label:"Q",value:"Q"},{label:"R",value:"R"},{label:"S",value:"S"},{label:"T",value:"T"},{label:"U",value:"U"},{label:"V",value:"V"},{label:"W",value:"W"},{label:"X",value:"X"},{label:"Y",value:"Y"},{label:"Z",value:"Z"}],onChange:function(e){return r({letter:e})}}),void 0!==o&&React.createElement(p.Fragment,null,React.createElement("h2",{className:"sans-serif"},o),!1!==m&&React.createElement("div",{className:"ui list"},m.map((function(e){var t=e.excluded,n=!0!==t?Object(b.decodeEntities)(e.name):"".concat(Object(b.decodeEntities)(e.name)," (").concat(e.term_id,")");return React.createElement("div",{className:"item"},React.createElement(f.CheckboxControl,{label:v()(n),checked:t,onChange:function(t){return function(e,t){console.log(e,t,a);var n=m;n.map((function(n){return n.term_id===t&&(n.excluded=!!e),n})),y(Object(l.a)(n))}(t,e.term_id)}}))})))))},w=function(){return React.createElement(p.Fragment,null)};function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g=c.name,h={title:Object(o.__)("Topic Index A-Z"),description:"A taxonomy list sorted alphabeticaly. Select terms you want to exclude.",category:"layout",icon:"networking",keywords:[Object(o.__)("Topic Index"),Object(o.__)("Taxonomies"),Object(o.__)("A-Z"),Object(o.__)("AZ")],edit:y,save:w};Object(a.registerBlockType)(g,j(j({},c),h))},80:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(27);var o=n(83),a=n(33);function c(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||Object(o.a)(e)||Object(a.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},83:function(e,t,n){"use strict";function r(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}n.d(t,"a",(function(){return r}))}},[[633,0]]]);
//# sourceMappingURL=topic-index-az-fda4b4e7.js.map