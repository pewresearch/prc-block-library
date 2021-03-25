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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[17],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=wp.i18n},11:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},12:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(21);function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(r=(l=c.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}}(e,t)||Object(r.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},13:function(e,t){e.exports=lodash},138:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-az","category":"layout","attributes":{"letter":{"type":"string"},"exclude":{"type":"string"}},"supports":{"html":false,"align":false}}')},139:function(e,t){e.exports=wp.htmlEntities},19:function(e,t,n){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},2:function(e,t){e.exports=wp.components},21:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var r=n(11);function a(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},22:function(e,t){e.exports=wp.apiFetch},248:function(e,t,n){n(19),e.exports=n(274)},249:function(e,t,n){},274:function(e,t,n){"use strict";n.r(t);var r=n(5),a=n(1),o=n(6),l=n(138),c=n(31),i=n(12),u=n(22),s=n.n(u),b=n(139),f=n(2),p=n(0),d=n(4),m=n(13),v=n.n(m),y=function(e){var t=e.attributes,n=e.className,r=e.setAttributes,a=t.letter,o=t.exclude,l=Object(p.useState)(!1),u=Object(i.a)(l,2),m=u[0],y=u[1],O=Object(d.useBlockProps)({className:n}),j=function(){(function(e){return console.log("getTermsByLetter",e),new Promise((function(t){s()({path:"/prc-api/v2/blocks/helpers/get-topic-by-letter/?letter=".concat(e)}).then((function(e){console.log(e);var n=e.map((function(e){return{name:e.name,term_id:e.term_id,excluded:!1}}));console.log(n),t(n)}))}))})(a).then((function(e){var t=void 0!==o?o.split(",").map((function(e){return parseInt(e)})):[],n=e.map((function(e){return t.includes(e.term_id)&&(e.excluded=!0),e}));y(n)}))};return Object(p.useEffect)((function(){if(console.log("trying to set the exclude map...",m),!1!==m){var e=m.filter((function(e){return!0===e.excluded})).map((function(e){return e.term_id}));console.log("tmpExclude",e),r({exclude:e.join()})}}),[m]),Object(p.useEffect)((function(){j()}),[a]),React.createElement("div",O,void 0===a&&React.createElement(f.SelectControl,{label:"Chose a letter",value:a,options:[{label:"(Click to select letter)",value:null},{label:"A",value:"A"},{label:"B",value:"B"},{label:"C",value:"C"},{label:"D",value:"D"},{label:"E",value:"E"},{label:"F",value:"F"},{label:"G",value:"G"},{label:"H",value:"H"},{label:"I",value:"I"},{label:"J",value:"J"},{label:"K",value:"K"},{label:"L",value:"L"},{label:"M",value:"M"},{label:"N",value:"N"},{label:"O",value:"O"},{label:"P",value:"P"},{label:"Q",value:"Q"},{label:"R",value:"R"},{label:"S",value:"S"},{label:"T",value:"T"},{label:"U",value:"U"},{label:"V",value:"V"},{label:"W",value:"W"},{label:"X",value:"X"},{label:"Y",value:"Y"},{label:"Z",value:"Z"}],onChange:function(e){return r({letter:e})}}),void 0!==a&&React.createElement(p.Fragment,null,React.createElement("h2",{className:"sans-serif"},a),!1!==m&&React.createElement("div",{className:"ui list"},m.map((function(e){var t=e.excluded,n=!0!==t?Object(b.decodeEntities)(e.name):"".concat(Object(b.decodeEntities)(e.name)," (").concat(e.term_id,")");return React.createElement("div",{className:"item"},React.createElement(f.CheckboxControl,{label:v()(n),checked:t,onChange:function(t){return function(e,t){console.log(e,t,o);var n=m;n.map((function(n){return n.term_id===t&&(n.excluded=!!e),n})),y(Object(c.a)(n))}(t,e.term_id)}}))})))))},O=function(){return React.createElement(p.Fragment,null)};n(249);function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var h=l.name,w={title:Object(a.__)("Topic Index A-Z"),description:"A taxonomy list sorted alphabeticaly. Select terms you want to exclude.",category:"layout",icon:"networking",keywords:[Object(a.__)("Topic Index"),Object(a.__)("Taxonomies"),Object(a.__)("A-Z"),Object(a.__)("AZ")],edit:y,save:O};Object(o.registerBlockType)(h,g(g({},l),w))},31:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(11);var a=n(21);function o(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(a.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},4:function(e,t){e.exports=wp.blockEditor},5:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},6:function(e,t){e.exports=wp.blocks}},[[248,0]]]);
//# sourceMappingURL=topic-index-az-9f465b6e.js.map