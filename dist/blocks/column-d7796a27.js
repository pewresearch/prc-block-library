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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[6],{10:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return r}))},15:function(t,e){t.exports=window.wp.data},16:function(t,e,n){var r,o=n(17);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var r=o(n);if("string"===r||"number"===r)t.push(n);else if(Array.isArray(n)){if(n.length){var l=c.apply(null,n);l&&t.push(l)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var a in n)i.call(n,a)&&n[a]&&t.push(a);else t.push(n.toString())}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):"object"===o(n(21))&&n(21)?void 0===(r=function(){return c}.apply(e,[]))||(t.exports=r):window.classNames=c}()},17:function(t,e){function n(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(t.exports=n=function(t){return typeof t},t.exports.default=t.exports,t.exports.__esModule=!0):(t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.default=t.exports,t.exports.__esModule=!0),n(e)}t.exports=n,t.exports.default=t.exports,t.exports.__esModule=!0},18:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n(27);var o=n(25),i=n(28);function c(t,e){return Object(r.a)(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],c=!0,l=!1;try{for(n=n.call(t);!(c=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{c||null==n.return||n.return()}finally{if(l)throw o}}return i}}(t,e)||Object(o.a)(t,e)||Object(i.a)()}},188:function(t,e,n){var r=n(228),o=n(229),i=n(189),c=n(230);t.exports=function(t,e){return r(t)||o(t,e)||i(t,e)||c()},t.exports.default=t.exports,t.exports.__esModule=!0},189:function(t,e,n){var r=n(190);t.exports=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}},t.exports.default=t.exports,t.exports.__esModule=!0},19:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},190:function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r},t.exports.default=t.exports,t.exports.__esModule=!0},2:function(t,e){t.exports=window.wp.i18n},21:function(t,e){(function(e){t.exports=e}).call(this,{})},22:function(t,e){t.exports=window.wp.primitives},228:function(t,e){t.exports=function(t){if(Array.isArray(t))return t},t.exports.default=t.exports,t.exports.__esModule=!0},229:function(t,e){t.exports=function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],c=!0,l=!1;try{for(n=n.call(t);!(c=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{c||null==n.return||n.return()}finally{if(l)throw o}}return i}},t.exports.default=t.exports,t.exports.__esModule=!0},23:function(t,e,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},230:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.default=t.exports,t.exports.__esModule=!0},25:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(19);function o(t,e){if(t){if("string"==typeof t)return Object(r.a)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(t,e):void 0}}},265:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/column","category":"layout","attributes":{"width":{"type":"integer","default":0},"tabletWidth":{"type":"integer","default":100},"tabletOrder":{"type":"integer","default":100},"mobileWidth":{"type":"integer","default":100},"mobileOrder":{"type":"integer","default":100},"verticalAlignment":{"type":"string"},"templateLock":{"type":"string"}},"parent":["prc-block/columns","prc-block/row"],"usesContext":["prc-block/row-stackable"],"supports":{"html":false,"align":false}}')},27:function(t,e,n){"use strict";function r(t){if(Array.isArray(t))return t}n.d(e,"a",(function(){return r}))},28:function(t,e,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(e,"a",(function(){return r}))},3:function(t,e){t.exports=window.wp.components},375:function(t,e,n){var r=n(188),o=["","one ","two ","three ","four ","five ","six ","seven ","eight ","nine ","ten ","eleven ","twelve ","thirteen ","fourteen ","fifteen ","sixteen ","seventeen ","eighteen ","nineteen "],i=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],c=/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/,l=function(t){return o[Number(t)]},a=function(t){return i[t[0]]+" "+o[t[1]]};t.exports=function(t){var e=Number(t);if(isNaN(e))return"";if(0===e)return"zero";var n=e.toString();if(n.length>9)throw new Error("overflow");var o=("000000000"+n).substr(-9).match(c),i=r(o,6),u=i[1],s=i[2],d=i[3],p=i[4],f=i[5],b="";return b+=0!=u?(l(u)||a(u))+"crore ":"",b+=0!=s?(l(s)||a(s))+"lakh ":"",b+=0!=d?(l(d)||a(d))+"thousand ":"",b+=0!=p?l(p)+"hundred ":"",b+=0!=f&&""!=b?"and ":"",(b+=0!=f?l(f)||a(f):"").trim()}},376:function(t,e,n){var r=n(17),o=n(433);function i(t){if("number"!=typeof t)throw new TypeError("Expected Number, got "+r(t)+" "+t);return Number.isFinite(t)?t+o(t):t}i.indicator=o,t.exports=i},4:function(t,e){t.exports=window.wp.element},432:function(t,e,n){n(23),t.exports=n(668)},433:function(t,e){t.exports=function(t){var e=(t=Math.abs(t))%100;if(e>=10&&e<=20)return"th";var n=t%10;return 1===n?"st":2===n?"nd":3===n?"rd":"th"}},5:function(t,e){t.exports=window.wp.blockEditor},668:function(t,e,n){"use strict";n.r(e);var r=n(10),o=n(9),i=n(2),c=n(4),l=n(22),a=Object(c.createElement)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(l.Path,{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM6 17.5c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h3v10H6zm13.5-.5c0 .3-.2.5-.5.5h-3v-10h3c.3 0 .5.2.5.5v9z"})),u=n(265),s=n(18),d=n(16),p=n.n(d),f=n(375),b=n.n(f),m=n(376),h=n.n(m),y=n(5),v=n(3),g=n(15),w=function(t){var e=t.label,n=t.icon,r=void 0===n?null:n,o=t.width,i=t.setWidth,c=t.min,l=void 0===c?1:c,a=t.disabled;return React.createElement(v.RangeControl,{beforeIcon:r,label:e,value:o,onChange:function(t){var e=0>parseFloat(t)?"0":t;i(e)},min:l,max:16,withInputField:!0,disabled:a,renderTooltipContent:function(t){return"".concat(t,"/16")},type:"stepper"})},x=function(t){var e=t.label,n=void 0===e?"Current Position":e,r=t.icon,o=void 0===r?null:r,i=t.disabled,c=t.position,l=t.max,a=void 0===l?4:l,u=t.setOrder;return React.createElement(v.RangeControl,{beforeIcon:o,label:n,value:c,onChange:function(t){var e=0>parseFloat(t)?"0":t;u(e)},min:0,max:a,disabled:i,renderTooltipContent:function(t){return"Column Will Appear: ".concat(h()(++t))},type:"stepper"})},O=function(t){var e=t.attributes,n=e.verticalAlignment,r=void 0!==n&&n,o=e.width,l=e.tabletOrder,a=e.tabletWidth,u=e.mobileOrder,d=e.mobileWidth,f=e.templateLock,m=void 0!==f&&f,h=t.setAttributes,O=t.className,j=t.clientId,k=t.context,_=Object(c.useState)(16),E=Object(s.a)(_,2),A=E[0],B=E[1],S=Object(g.useDispatch)("core/block-editor").updateBlockAttributes,C=k["prc-block/row-active"],R=Object(g.useSelect)((function(t){var e=t("core/block-editor"),n=e.getBlocks,r=e.getBlockIndex,o=e.getBlockOrder,i=e.getBlockRootClientId,c=e.getBlockAttributes,l=i(j),a=c(l).equal;return{index:r(j,l),isEqual:a,hasChildBlocks:0<o(j).length,otherColumnsInRow:n(l),rootClientId:l}}),[j]),I=R.isEqual,M=R.index,P=R.hasChildBlocks,W=R.otherColumnsInRow,N=R.rootClientId;Object(c.useEffect)((function(){var t;t=[],W.forEach((function(e){var n=e.attributes.width;j===e.clientId&&(n=o),t.push(n)})),t=t.reduce((function(t,e){return t+e}),0),B(16-t)}),[o]),Object(c.useEffect)((function(){I&&h({width:null})}),[I]);var T=Object(y.useBlockProps)({className:p()(O,!0===I?null:"".concat(b()(o)," wide"),"column",function(){if(!1===r)return null;var t=r;return"center"===r&&(t="middle"),"".concat(t," aligned")}())}),D=Object(y.__experimentalUseInnerBlocksProps)(T,{templateLock:m,renderAppender:P?void 0:y.InnerBlocks.ButtonBlockAppender});return React.createElement(c.Fragment,null,React.createElement(y.BlockControls,null,React.createElement(y.BlockVerticalAlignmentToolbar,{onChange:function(t){console.log("updateAlignment",t),h({verticalAlignment:t}),S(N,{verticalAlignment:null})},value:r})),React.createElement(y.InspectorControls,null,React.createElement(v.PanelBody,{title:Object(i.__)("Column settings")},React.createElement(c.Fragment,null,I&&React.createElement(v.Notice,{status:"info",isDismissible:!1},"Columns in this row are set to be equal. Setting column widths has been disabled."),1>=A&&React.createElement(v.Notice,{status:-1===Math.sign(A)?"warning":"info",isDismissible:!1},-1===Math.sign(A)?"Exceeding Grid Width!!":"Attention: Approaching Grid Maximum"),React.createElement("div",{style:{marginBottom:"1em",paddingBottom:"1em",borderBottom:"1px solid lightgray"}},React.createElement(w,{label:Object(i.__)("Desktop Width"),icon:"desktop",disabled:I,width:o,setWidth:function(t){return h({width:t})}})),React.createElement("div",{style:{marginBottom:"1em",paddingBottom:"1em",borderBottom:"1px solid lightgray"}},React.createElement(w,{label:Object(i.__)("Tablet Width"),icon:"tablet",min:0,disabled:I||C,width:100===a?o:a,setWidth:function(t){return h({tabletWidth:t})}}),React.createElement(x,{label:Object(i.__)("Tablet Order"),icon:"tablet",disabled:I||C,position:100===l?M:l,setOrder:function(t){return h({tabletOrder:t})}})),React.createElement("div",null,React.createElement(w,{label:Object(i.__)("Mobile Width"),icon:"smartphone",min:0,disabled:I||C,width:100===d?o:d,setWidth:function(t){return h({mobileWidth:t})}}),React.createElement(x,{label:Object(i.__)("Mobile Order"),icon:"smartphone",disabled:I||C,position:100===u?M:u,setOrder:function(t){return h({mobileOrder:t})}}))))),React.createElement("div",D))},j=function(){return React.createElement(y.InnerBlocks.Content,null)};function k(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function _(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?k(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var E=u.name,A={title:Object(i.__)("Column"),description:Object(i.__)("A single column within a row."),icon:a,edit:O,save:j};Object(o.registerBlockType)(E,_(_({},u),A))},9:function(t,e){t.exports=window.wp.blocks}},[[432,0]]]);
//# sourceMappingURL=column-d7796a27.js.map