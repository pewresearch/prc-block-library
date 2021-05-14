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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[6],{10:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},12:function(e,t){e.exports=wp.blocks},15:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=r=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),r(t)}e.exports=r,e.exports.default=e.exports,e.exports.__esModule=!0},17:function(e,t){e.exports=wp.data},18:function(e,t,r){var n,o=r(15);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)&&r.length){var a=c.apply(null,r);a&&e.push(a)}else if("object"===n)for(var l in r)i.call(r,l)&&r[l]&&e.push(l)}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===o(r(19))&&r(19)?void 0===(n=function(){return c}.apply(t,[]))||(e.exports=n):window.classNames=c}()},185:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"b",(function(){return p}));var n=r(10),o=r(44);var i=r(18),c=r.n(i),a=r(3);function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var s=function(e){return Object(a.createElement)("path",e)},p=function(e){var t=e.className,r=e.isPressed,n=u(u({},function(e,t){if(null==e)return{};var r,n,i=Object(o.a)(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)r=c[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}(e,["className","isPressed"])),{},{className:c()(t,{"is-pressed":r})||void 0,role:"img","aria-hidden":!0,focusable:!1});return Object(a.createElement)("svg",n)}},19:function(e,t){(function(t){e.exports=t}).call(this,{})},198:function(e,t,r){var n=r(232),o=r(233),i=r(199),c=r(234);e.exports=function(e,t){return n(e)||o(e,t)||i(e,t)||c()},e.exports.default=e.exports,e.exports.__esModule=!0},199:function(e,t,r){var n=r(200);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}},e.exports.default=e.exports,e.exports.__esModule=!0},2:function(e,t){e.exports=wp.i18n},200:function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n},e.exports.default=e.exports,e.exports.__esModule=!0},21:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(38);var o=r(28),i=r(39);function c(e,t){return Object(n.a)(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,i=void 0;try{for(var c,a=e[Symbol.iterator]();!(n=(c=a.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==a.return||a.return()}finally{if(o)throw i}}return r}}(e,t)||Object(o.a)(e,t)||Object(i.a)()}},232:function(e,t){e.exports=function(e){if(Array.isArray(e))return e},e.exports.default=e.exports,e.exports.__esModule=!0},233:function(e,t){e.exports=function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,i=void 0;try{for(var c,a=e[Symbol.iterator]();!(n=(c=a.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==a.return||a.return()}finally{if(o)throw i}}return r}},e.exports.default=e.exports,e.exports.__esModule=!0},234:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.default=e.exports,e.exports.__esModule=!0},24:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,"a",(function(){return n}))},25:function(e,t,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},265:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/column","category":"layout","attributes":{"width":{"type":"integer","default":0},"tabletWidth":{"type":"integer","default":100},"tabletOrder":{"type":"integer","default":100},"mobileWidth":{"type":"integer","default":100},"mobileOrder":{"type":"integer","default":100},"verticalAlignment":{"type":"string"},"templateLock":{"type":"string"}},"parent":["prc-block/columns","prc-block/row"],"usesContext":["prc-block/row-stackable"],"supports":{"html":false,"align":false}}')},28:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(24);function o(e,t){if(e){if("string"==typeof e)return Object(n.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(e,t):void 0}}},3:function(e,t){e.exports=wp.element},374:function(e,t,r){var n=r(198),o=["","one ","two ","three ","four ","five ","six ","seven ","eight ","nine ","ten ","eleven ","twelve ","thirteen ","fourteen ","fifteen ","sixteen ","seventeen ","eighteen ","nineteen "],i=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],c=/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/,a=function(e){return o[Number(e)]},l=function(e){return i[e[0]]+" "+o[e[1]]};e.exports=function(e){var t=Number(e);if(isNaN(t))return"";if(0===t)return"zero";var r=t.toString();if(r.length>9)throw new Error("overflow");var o=("000000000"+r).substr(-9).match(c),i=n(o,6),u=i[1],s=i[2],p=i[3],f=i[4],d=i[5],b="";return b+=0!=u?(a(u)||l(u))+"crore ":"",b+=0!=s?(a(s)||l(s))+"lakh ":"",b+=0!=p?(a(p)||l(p))+"thousand ":"",b+=0!=f?a(f)+"hundred ":"",b+=0!=d&&""!=b?"and ":"",(b+=0!=d?a(d)||l(d):"").trim()}},375:function(e,t,r){var n=r(15),o=r(432);function i(e){if("number"!=typeof e)throw new TypeError("Expected Number, got "+n(e)+" "+e);return Number.isFinite(e)?e+o(e):e}i.indicator=o,e.exports=i},38:function(e,t,r){"use strict";function n(e){if(Array.isArray(e))return e}r.d(t,"a",(function(){return n}))},39:function(e,t,r){"use strict";function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}r.d(t,"a",(function(){return n}))},4:function(e,t){e.exports=wp.components},431:function(e,t,r){r(25),e.exports=r(665)},432:function(e,t){e.exports=function(e){var t=(e=Math.abs(e))%100;if(t>=10&&t<=20)return"th";var r=e%10;return 1===r?"st":2===r?"nd":3===r?"rd":"th"}},44:function(e,t,r){"use strict";function n(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}r.d(t,"a",(function(){return n}))},665:function(e,t,r){"use strict";r.r(t);var n=r(10),o=r(12),i=r(2),c=r(3),a=r(185),l=Object(c.createElement)(a.b,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(c.createElement)(a.a,{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM6 17.5c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h3v10H6zm13.5-.5c0 .3-.2.5-.5.5h-3v-10h3c.3 0 .5.2.5.5v9z"})),u=r(265),s=r(21),p=r(18),f=r.n(p),d=r(374),b=r.n(d),m=r(375),y=r.n(m),h=r(7),v=r(4),g=r(17),O=function(e){var t=e.label,r=e.icon,n=void 0===r?null:r,o=e.width,i=e.setWidth,c=e.min,a=void 0===c?1:c,l=e.disabled;return React.createElement(v.RangeControl,{beforeIcon:n,label:t,value:o,onChange:function(e){var t=0>parseFloat(e)?"0":e;i(t)},min:a,max:16,withInputField:!0,disabled:l,renderTooltipContent:function(e){return"".concat(e,"/16")},type:"stepper"})},w=function(e){var t=e.label,r=void 0===t?"Current Position":t,n=e.icon,o=void 0===n?null:n,i=e.disabled,c=e.position,a=e.max,l=void 0===a?4:a,u=e.setOrder;return React.createElement(v.RangeControl,{beforeIcon:o,label:r,value:c,onChange:function(e){var t=0>parseFloat(e)?"0":e;u(t)},min:0,max:l,disabled:i,renderTooltipContent:function(e){return"Column Will Appear: ".concat(y()(++e))},type:"stepper"})},x=function(e){var t=e.attributes,r=t.verticalAlignment,n=void 0!==r&&r,o=t.width,a=t.tabletOrder,l=t.tabletWidth,u=t.mobileOrder,p=t.mobileWidth,d=t.templateLock,m=void 0!==d&&d,y=e.setAttributes,x=e.className,j=e.clientId,k=e.context,E=Object(c.useState)(16),_=Object(s.a)(E,2),A=_[0],B=_[1],S=Object(g.useDispatch)("core/block-editor").updateBlockAttributes,P=k["prc-block/row-active"],C=Object(g.useSelect)((function(e){var t=e("core/block-editor"),r=t.getBlocks,n=t.getBlockIndex,o=t.getBlockOrder,i=t.getBlockRootClientId,c=t.getBlockAttributes,a=i(j),l=c(a).equal;return{index:n(j,a),isEqual:l,hasChildBlocks:0<o(j).length,otherColumnsInRow:r(a),rootClientId:a}}),[j]),R=C.isEqual,I=C.index,M=C.hasChildBlocks,N=C.otherColumnsInRow,W=C.rootClientId;Object(c.useEffect)((function(){var e;e=[],N.forEach((function(t){var r=t.attributes.width;j===t.clientId&&(r=o),e.push(r)})),e=e.reduce((function(e,t){return e+t}),0),B(16-e)}),[o]),Object(c.useEffect)((function(){R&&y({width:null})}),[R]);var D=Object(h.useBlockProps)({className:f()(x,!0===R?null:"".concat(b()(o)," wide"),"column",function(){if(!1===n)return null;var e=n;return"center"===n&&(e="middle"),"".concat(e," aligned")}())}),T=Object(h.__experimentalUseInnerBlocksProps)(D,{templateLock:m,renderAppender:M?void 0:h.InnerBlocks.ButtonBlockAppender});return React.createElement(c.Fragment,null,React.createElement(h.BlockControls,null,React.createElement(h.BlockVerticalAlignmentToolbar,{onChange:function(e){console.log("updateAlignment",e),y({verticalAlignment:e}),S(W,{verticalAlignment:null})},value:n})),React.createElement(h.InspectorControls,null,React.createElement(v.PanelBody,{title:Object(i.__)("Column settings")},React.createElement(c.Fragment,null,R&&React.createElement(v.Notice,{status:"info",isDismissible:!1},"Columns in this row are set to be equal. Setting column widths has been disabled."),1>=A&&React.createElement(v.Notice,{status:-1===Math.sign(A)?"warning":"info",isDismissible:!1},-1===Math.sign(A)?"Exceeding Grid Width!!":"Attention: Approaching Grid Maximum"),React.createElement("div",{style:{marginBottom:"1em",paddingBottom:"1em",borderBottom:"1px solid lightgray"}},React.createElement(O,{label:Object(i.__)("Desktop Width"),icon:"desktop",disabled:R,width:o,setWidth:function(e){return y({width:e})}})),React.createElement("div",{style:{marginBottom:"1em",paddingBottom:"1em",borderBottom:"1px solid lightgray"}},React.createElement(O,{label:Object(i.__)("Tablet Width"),icon:"tablet",min:0,disabled:R||P,width:100===l?o:l,setWidth:function(e){return y({tabletWidth:e})}}),React.createElement(w,{label:Object(i.__)("Tablet Order"),icon:"tablet",disabled:R||P,position:100===a?I:a,setOrder:function(e){return y({tabletOrder:e})}})),React.createElement("div",null,React.createElement(O,{label:Object(i.__)("Mobile Width"),icon:"smartphone",min:0,disabled:R||P,width:100===p?o:p,setWidth:function(e){return y({mobileWidth:e})}}),React.createElement(w,{label:Object(i.__)("Mobile Order"),icon:"smartphone",disabled:R||P,position:100===u?I:u,setOrder:function(e){return y({mobileOrder:e})}}))))),React.createElement("div",T))},j=function(){return React.createElement(h.InnerBlocks.Content,null)};function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var _=u.name,A={title:Object(i.__)("Column"),description:Object(i.__)("A single column within a row."),icon:l,edit:x,save:j};Object(o.registerBlockType)(_,E(E({},u),A))},7:function(e,t){e.exports=wp.blockEditor}},[[431,0]]]);
//# sourceMappingURL=column-133aa413.js.map