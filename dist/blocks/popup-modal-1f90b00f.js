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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[32],{1031:function(e,t,n){"use strict";n.r(t);var o=n(14),r=n(2),c=n(9),l=n(400),a=n(21),i=n(18),s=n.n(i),u=n(4),p=n(5),d=n(3),f=n(11),b=n(175),m=function(e){var t=e.attributes,n=e.setAttributes,o=e.isSelected,c=e.clientId,l=t.title,i=t.inverted,m=t.transition,w=t.className,y=Object(f.useSelect)((function(e){return{rootClientId:e("core/block-editor").getBlockRootClientId(c),hasActiveChildren:e("core/block-editor").hasSelectedInnerBlock(c)}})),v=y.rootClientId,O=y.hasActiveChildren,k=Object(u.useState)(!1),g=Object(a.a)(k,2),h=g[0],j=g[1],B="is-style-video"===w,x=Object(p.useBlockProps)({className:s()({"ui modal":h,basic:B,active:h})}),E=Object(p.useInnerBlocksProps)({className:"content"},{orientation:"vertical",templateLock:!1,__experimentalCaptureToolbars:!0}),S=function(){var e=document.getElementById("prc-block-modal-background");null!==e&&(e.classList.remove("active"),j(!1))};return Object(u.useEffect)((function(){var e;(o||O)&&v===window.prcBlocks.modal.isOpen?null!==(e=document.getElementById("prc-block-modal-background"))&&(i?e.classList.add("inverted"):e.classList.remove("inverted"),j(!0),e.classList.add("active")):S()}),[o,O,i,window.prcBlocks.modal.isOpen]),React.createElement(u.Fragment,null,React.createElement(b.a,{controllerClientId:v},React.createElement(p.InspectorControls,null,React.createElement(d.PanelBody,{title:"Modal Settings"},React.createElement("div",null,React.createElement(d.ToggleControl,{label:"Use white background",checked:i,onChange:function(){return n({inverted:!i})}}),React.createElement(d.SelectControl,{label:"Transition",value:m,options:[{label:"Scale",value:"scale"},{label:"Zoom",value:"zoom"},{label:"Fade",value:"fade"},{label:"Fade Up",value:"fade up"},{label:"Drop",value:"drop"},{label:"Fly Up",value:"fly up"}],onChange:function(e){return n({transition:e})}})))),React.createElement("div",x,h&&React.createElement(u.Fragment,null,!0!==B&&React.createElement("div",{class:"header"},React.createElement(p.RichText,{tagName:"h2",value:l,placeholder:Object(r.__)("Modal Title"),multiline:!1,allowedFormats:["core/italic"],onChange:function(e){return n({title:e})}})),React.createElement("div",E)))))},w=function(){return React.createElement(p.InnerBlocks.Content,null)};function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var O=l.name,k={edit:m,save:w};Object(c.registerBlockType)(O,v(v({},l),k))},11:function(e,t){e.exports=window.wp.data},14:function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return o}))},15:function(e,t){function n(t){return e.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,n(t)}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports},175:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var o=n(2),r=n(4),c=n(5),l=n(3),a=n(11);window.hasOwnProperty("prcBlocks")||(window.prcBlocks={}),window.prcBlocks.modal={isOpen:!1,clientId:!1};var i=function(e){var t=e.controllerClientId,n=e.children,i=Object(a.useSelect)((function(e){return{modalClientId:e("core/block-editor").getBlock(t).innerBlocks.filter((function(e){return"prc-block/popup-modal"===e.name})).pop().clientId}})).modalClientId,s=Object(a.useDispatch)("core/block-editor").selectBlock;return React.createElement(r.Fragment,null,React.createElement(c.BlockControls,null,React.createElement(l.ToolbarGroup,null,React.createElement(l.ToolbarButton,{icon:Object(o.sprintf)("editor-%s",i===window.prcBlocks.modal.isOpen?"contract":"expand"),label:Object(o.sprintf)("%s Modal",i===window.prcBlocks.modal.isOpen?"Close":"Open"),onClick:function(){i===window.prcBlocks.modal.isOpen?(window.prcBlocks.modal.isOpen=!1,window.prcBlocks.modal.clientId=!1,s(t)):(window.prcBlocks.modal.isOpen=t,window.prcBlocks.modal.clientId=t,s(i))},isActive:t===window.prcBlocks.modal.isOpen}))),n)}},18:function(e,t,n){var o,r=n(15);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function l(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var a=l.apply(null,n);a&&e.push(a)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var i in n)c.call(n,i)&&n[i]&&e.push(i);else e.push(n.toString())}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):"object"===r(n(20))&&n(20)?void 0===(o=function(){return l}.apply(t,[]))||(e.exports=o):window.classNames=l}()},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t){(function(t){e.exports=t}).call(this,{})},21:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var o=n(31);var r=n(27),c=n(32);function l(e,t){return Object(o.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c=[],l=!0,a=!1;try{for(n=n.call(e);!(l=(o=n.next()).done)&&(c.push(o.value),!t||c.length!==t);l=!0);}catch(e){a=!0,r=e}finally{try{l||null==n.return||n.return()}finally{if(a)throw r}}return c}}(e,t)||Object(r.a)(e,t)||Object(c.a)()}},22:function(e,t,n){"use strict";function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}n.d(t,"a",(function(){return o}))},23:function(e,t,n){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},27:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var o=n(22);function r(e,t){if(e){if("string"==typeof e)return Object(o.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(o.a)(e,t):void 0}}},3:function(e,t){e.exports=window.wp.components},31:function(e,t,n){"use strict";function o(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return o}))},32:function(e,t,n){"use strict";function o(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return o}))},4:function(e,t){e.exports=window.wp.element},400:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/popup-modal","title":"Popup Modal","icon":"playlist-video","description":"Display content in a modal.","category":"media","attributes":{"title":{"type":"string"},"transition":{"type":"string","default":"scale"},"inverted":{"type":"boolean","default":false}},"styles":[{"name":"default","label":"Default","isDefault":true},{"name":"video","label":"Video"}],"supports":{"html":false,"align":false,"inserter":false,"multiple":false},"parent":["prc-block/popup-controller"]}')},5:function(e,t){e.exports=window.wp.blockEditor},9:function(e,t){e.exports=window.wp.blocks},949:function(e,t,n){n(23),e.exports=n(1031)}},[[949,0]]]);
//# sourceMappingURL=popup-modal-1f90b00f.js.map