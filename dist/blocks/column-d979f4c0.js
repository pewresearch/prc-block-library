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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[12],{11:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},12:function(t,e,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},15:function(t,e){t.exports=window.wp.primitives},16:function(t,e,n){var r,o=n(20);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var r=o(n);if("string"===r||"number"===r)t.push(n);else if(Array.isArray(n)){if(n.length){var l=c.apply(null,n);l&&t.push(l)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var a in n)i.call(n,a)&&n[a]&&t.push(a);else t.push(n.toString())}}return t.join(" ")}t.exports?(c.default=c,t.exports=c):"object"===o(n(19))&&n(19)?void 0===(r=function(){return c}.apply(e,[]))||(t.exports=r):window.classNames=c}()},17:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n(23);var o=n(18),i=n(24);function c(t,e){return Object(r.a)(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],c=!0,l=!1;try{for(n=n.call(t);!(c=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{c||null==n.return||n.return()}finally{if(l)throw o}}return i}}(t,e)||Object(o.a)(t,e)||Object(i.a)()}},18:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(11);function o(t,e){if(t){if("string"==typeof t)return Object(r.a)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(t,e):void 0}}},19:function(t,e){(function(e){t.exports=e}).call(this,{})},2:function(t,e){t.exports=window.wp.i18n},20:function(t,e){function n(e){return t.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,n(e)}t.exports=n,t.exports.__esModule=!0,t.exports.default=t.exports},23:function(t,e,n){"use strict";function r(t){if(Array.isArray(t))return t}n.d(e,"a",(function(){return r}))},24:function(t,e,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(e,"a",(function(){return r}))},286:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/column","category":"layout","attributes":{"width":{"type":"integer","default":0},"tabletWidth":{"type":"integer","default":100},"tabletOrder":{"type":"integer","default":100},"mobileWidth":{"type":"integer","default":100},"mobileOrder":{"type":"integer","default":100},"verticalAlignment":{"type":"string"},"templateLock":{"type":"string"}},"parent":["prc-block/columns","prc-block/row"],"usesContext":["prc-block/row-stackable"],"providesContext":{"prc-block/column/width":"width"},"supports":{"html":false,"align":false}}')},3:function(t,e){t.exports=window.wp.components},4:function(t,e){t.exports=window.wp.element},417:function(t,e,n){var r=n(489),o=["","one ","two ","three ","four ","five ","six ","seven ","eight ","nine ","ten ","eleven ","twelve ","thirteen ","fourteen ","fifteen ","sixteen ","seventeen ","eighteen ","nineteen "],i=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],c=/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/,l=function(t){return o[Number(t)]},a=function(t){return i[t[0]]+" "+o[t[1]]};t.exports=function(t){var e=Number(t);if(isNaN(e))return"";if(0===e)return"zero";var n=e.toString();if(n.length>9)throw new Error("overflow");var o=("000000000"+n).substr(-9).match(c),i=r(o,6),u=i[1],s=i[2],d=i[3],p=i[4],f=i[5],b="";return b+=0!=u?(l(u)||a(u))+"crore ":"",b+=0!=s?(l(s)||a(s))+"lakh ":"",b+=0!=d?(l(d)||a(d))+"thousand ":"",b+=0!=p?l(p)+"hundred ":"",b+=0!=f&&""!=b?"and ":"",(b+=0!=f?l(f)||a(f):"").trim()}},418:function(t,e,n){var r=n(20),o=n(495);function i(t){if("number"!=typeof t)throw new TypeError("Expected Number, got "+r(t)+" "+t);return Number.isFinite(t)?t+o(t):t}i.indicator=o,t.exports=i},488:function(t,e,n){n(12),t.exports=n(802)},489:function(t,e,n){var r=n(490),o=n(491),i=n(492),c=n(494);t.exports=function(t,e){return r(t)||o(t,e)||i(t,e)||c()},t.exports.__esModule=!0,t.exports.default=t.exports},490:function(t,e){t.exports=function(t){if(Array.isArray(t))return t},t.exports.__esModule=!0,t.exports.default=t.exports},491:function(t,e){t.exports=function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],c=!0,l=!1;try{for(n=n.call(t);!(c=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{c||null==n.return||n.return()}finally{if(l)throw o}}return i}},t.exports.__esModule=!0,t.exports.default=t.exports},492:function(t,e,n){var r=n(493);t.exports=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}},t.exports.__esModule=!0,t.exports.default=t.exports},493:function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r},t.exports.__esModule=!0,t.exports.default=t.exports},494:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},495:function(t,e){t.exports=function(t){var e=(t=Math.abs(t))%100;if(e>=10&&e<=20)return"th";var n=t%10;return 1===n?"st":2===n?"nd":3===n?"rd":"th"}},496:function(t,e,n){"use strict";var r=n(4),o=n(15),i=Object(r.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(r.createElement)(o.Path,{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM6 17.5c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h3v10H6zm13.5-.5c0 .3-.2.5-.5.5h-3v-10h3c.3 0 .5.2.5.5v9z"}));e.a=i},5:function(t,e){t.exports=window.wp.blockEditor},7:function(t,e){t.exports=window.wp.blocks},8:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return r}))},802:function(t,e,n){"use strict";n.r(e);var r=n(8),o=n(7),i=n(2),c=n(496),l=n(286),a=n(17),u=n(16),s=n.n(u),d=n(417),p=n.n(d),f=n(418),b=n.n(f),m=n(4),h=n(5),y=n(3),v=n(9),w=function(t){var e=t.label,n=t.icon,r=void 0===n?null:n,o=t.width,i=t.setWidth,c=t.min,l=void 0===c?1:c,a=t.disabled;return React.createElement(y.RangeControl,{beforeIcon:r,label:e,value:o,onChange:function(t){var e=0>parseFloat(t)?"0":t;i(e)},min:l,max:16,withInputField:!0,disabled:a,renderTooltipContent:function(t){return"".concat(t,"/16")},type:"stepper"})},g=function(t){var e=t.label,n=void 0===e?"Current Position":e,r=t.icon,o=void 0===r?null:r,i=t.disabled,c=t.position,l=t.max,a=void 0===l?4:l,u=t.setOrder;return React.createElement(y.RangeControl,{beforeIcon:o,label:n,value:c,onChange:function(t){var e=0>parseFloat(t)?"0":t;u(e)},min:0,max:a,disabled:i,renderTooltipContent:function(t){return"Column Will Appear: ".concat(b()(++t))},type:"stepper"})},x=function(t){var e=t.attributes,n=e.verticalAlignment,r=void 0!==n&&n,o=e.width,c=e.tabletOrder,l=e.tabletWidth,u=e.mobileOrder,d=e.mobileWidth,f=e.templateLock,b=void 0!==f&&f,x=t.setAttributes,O=t.className,j=t.clientId,k=t.context,E=Object(m.useState)(16),_=Object(a.a)(E,2),A=_[0],B=_[1],C=Object(v.useDispatch)("core/block-editor").updateBlockAttributes,R=k["prc-block/row-active"],S=Object(v.useSelect)((function(t){var e=t("core/block-editor"),n=e.getBlocks,r=e.getBlockIndex,o=e.getBlockOrder,i=e.getBlockRootClientId,c=e.getBlockAttributes,l=i(j),a=c(l).equal;return{index:r(j,l),isEqual:a,hasChildBlocks:0<o(j).length,otherColumnsInRow:n(l),rootClientId:l}}),[j]),I=S.isEqual,M=S.index,P=S.hasChildBlocks,W=S.otherColumnsInRow,D=S.rootClientId;Object(m.useEffect)((function(){var t;t=[],W.forEach((function(e){var n=e.attributes.width;j===e.clientId&&(n=o),t.push(n)})),t=t.reduce((function(t,e){return t+e}),0),B(16-t)}),[o]),Object(m.useEffect)((function(){I&&x({width:null})}),[I]);var N=Object(h.useBlockProps)({className:s()(O,!0===I?null:"".concat(p()(o)," wide"),"column",function(){if(!1===r)return null;var t=r;return"center"===r&&(t="middle"),"".concat(t," aligned")}())}),T=Object(h.useInnerBlocksProps)(N,{templateLock:b,renderAppender:P?void 0:h.InnerBlocks.ButtonBlockAppender});return React.createElement(m.Fragment,null,React.createElement(h.BlockControls,null,React.createElement(h.BlockVerticalAlignmentToolbar,{onChange:function(t){console.log("updateAlignment",t),x({verticalAlignment:t}),C(D,{verticalAlignment:null})},value:r})),React.createElement(h.InspectorControls,null,React.createElement(y.PanelBody,{title:Object(i.__)("Column settings")},React.createElement(m.Fragment,null,I&&React.createElement(y.Notice,{status:"info",isDismissible:!1},"Columns in this row are set to be equal. Setting column widths has been disabled."),1>=A&&React.createElement(y.Notice,{status:-1===Math.sign(A)?"warning":"info",isDismissible:!1},-1===Math.sign(A)?"Exceeding Grid Width!!":"Attention: Approaching Grid Maximum"),React.createElement("div",{style:{marginBottom:"1em",paddingBottom:"1em",borderBottom:"1px solid lightgray"}},React.createElement(w,{label:Object(i.__)("Desktop Width"),icon:"desktop",disabled:I,width:o,setWidth:function(t){return x({width:t})}})),React.createElement("div",{style:{marginBottom:"1em",paddingBottom:"1em",borderBottom:"1px solid lightgray"}},React.createElement(w,{label:Object(i.__)("Tablet Width"),icon:"tablet",min:0,disabled:I||R,width:100===l?o:l,setWidth:function(t){return x({tabletWidth:t})}}),React.createElement(g,{label:Object(i.__)("Tablet Order"),icon:"tablet",disabled:I||R,position:100===c?M:c,setOrder:function(t){return x({tabletOrder:t})}})),React.createElement("div",null,React.createElement(w,{label:Object(i.__)("Mobile Width"),icon:"smartphone",min:0,disabled:I||R,width:100===d?o:d,setWidth:function(t){return x({mobileWidth:t})}}),React.createElement(g,{label:Object(i.__)("Mobile Order"),icon:"smartphone",disabled:I||R,position:100===u?M:u,setOrder:function(t){return x({mobileOrder:t})}}))))),React.createElement("div",T))},O=function(){return React.createElement(h.InnerBlocks.Content,null)};function j(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function k(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?j(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var E=l.name,_={title:Object(i.__)("DEPRECATED: Column"),description:Object(i.__)("DEPRECATED: A single column within a row."),icon:c.a,edit:x,save:O};Object(o.registerBlockType)(E,k(k({},l),_))},9:function(t,e){t.exports=window.wp.data}},[[488,0]]]);
//# sourceMappingURL=column-d979f4c0.js.map