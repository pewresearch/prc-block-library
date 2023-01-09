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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[72],{11:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},12:function(e,t,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},15:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n(22);var o=n(17),a=n(23);function l(e,t){return Object(r.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],l=!0,c=!1;try{for(n=n.call(e);!(l=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);l=!0);}catch(e){c=!0,o=e}finally{try{l||null==n.return||n.return()}finally{if(c)throw o}}return a}}(e,t)||Object(o.a)(e,t)||Object(a.a)()}},17:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(11);function o(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},23:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},3:function(e,t){e.exports=window.wp.components},30:function(e,t){e.exports=window.wp.apiFetch},344:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-az","category":"layout","attributes":{"letter":{"type":"string"},"exclude":{"type":"string"}},"supports":{"html":false,"align":false}}')},4:function(e,t){e.exports=window.wp.element},41:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n(11);var o=n(42),a=n(17);function l(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||Object(o.a)(e)||Object(a.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},42:function(e,t,n){"use strict";function r(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}n.d(t,"a",(function(){return r}))},45:function(e,t){e.exports=window.lodash},47:function(e,t){e.exports=window.wp.htmlEntities},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},737:function(e,t,n){n(12),e.exports=n(795)},795:function(e,t,n){"use strict";n.r(t);var r=n(8),o=n(2),a=n(7),l=n(344),c=n(41),i=n(15),u=n(30),s=n.n(u),b=n(47),f=n(3),p=n(4),d=n(5),m=n(45),v=n.n(m),y=function(e){var t=e.attributes,n=e.className,r=e.setAttributes,o=t.letter,a=t.exclude,l=Object(p.useState)(!1),u=Object(i.a)(l,2),m=u[0],y=u[1],w=Object(d.useBlockProps)({className:n}),O=function(){(function(e){return console.log("getTermsByLetter",e),new Promise((function(t){s()({path:"/prc-api/v2/blocks/helpers/get-topic-by-letter/?letter=".concat(e)}).then((function(e){console.log(e);var n=e.map((function(e){return{name:e.name,term_id:e.term_id,excluded:!1}}));console.log(n),t(n)}))}))})(o).then((function(e){var t=void 0!==a?a.split(",").map((function(e){return parseInt(e)})):[],n=e.map((function(e){return t.includes(e.term_id)&&(e.excluded=!0),e}));y(n)}))};return Object(p.useEffect)((function(){if(console.log("trying to set the exclude map...",m),!1!==m){var e=m.filter((function(e){return!0===e.excluded})).map((function(e){return e.term_id}));console.log("tmpExclude",e),r({exclude:e.join()})}}),[m]),Object(p.useEffect)((function(){O()}),[o]),React.createElement("div",w,void 0===o&&React.createElement(f.SelectControl,{label:"Chose a letter",value:o,options:[{label:"(Click to select letter)",value:null},{label:"A",value:"A"},{label:"B",value:"B"},{label:"C",value:"C"},{label:"D",value:"D"},{label:"E",value:"E"},{label:"F",value:"F"},{label:"G",value:"G"},{label:"H",value:"H"},{label:"I",value:"I"},{label:"J",value:"J"},{label:"K",value:"K"},{label:"L",value:"L"},{label:"M",value:"M"},{label:"N",value:"N"},{label:"O",value:"O"},{label:"P",value:"P"},{label:"Q",value:"Q"},{label:"R",value:"R"},{label:"S",value:"S"},{label:"T",value:"T"},{label:"U",value:"U"},{label:"V",value:"V"},{label:"W",value:"W"},{label:"X",value:"X"},{label:"Y",value:"Y"},{label:"Z",value:"Z"}],onChange:function(e){return r({letter:e})}}),void 0!==o&&React.createElement(p.Fragment,null,React.createElement("h2",{className:"sans-serif"},o),!1!==m&&React.createElement("div",{className:"ui list"},m.map((function(e){var t=e.excluded,n=!0!==t?Object(b.decodeEntities)(e.name):"".concat(Object(b.decodeEntities)(e.name)," (").concat(e.term_id,")");return React.createElement("div",{className:"item"},React.createElement(f.CheckboxControl,{label:v()(n),checked:t,onChange:function(t){return function(e,t){console.log(e,t,a);var n=m;n.map((function(n){return n.term_id===t&&(n.excluded=!!e),n})),y(Object(c.a)(n))}(t,e.term_id)}}))})))))},w=function(){return React.createElement(p.Fragment,null)};function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var g=l.name,h={title:Object(o.__)("Topic Index A-Z"),description:"A taxonomy list sorted alphabeticaly. Select terms you want to exclude.",category:"layout",icon:"networking",keywords:[Object(o.__)("Topic Index"),Object(o.__)("Taxonomies"),Object(o.__)("A-Z"),Object(o.__)("AZ")],edit:y,save:w};Object(a.registerBlockType)(g,j(j({},l),h))},8:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))}},[[737,0]]]);
//# sourceMappingURL=topic-index-az-b2ccd225.js.map