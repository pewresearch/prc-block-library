/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.27
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[31],{11:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},12:function(e,t,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},15:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(22);var o=n(17),i=n(23);function c(e,t){return Object(r.a)(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],c=!0,a=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);c=!0);}catch(e){a=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(a)throw o}}return i}}(e,t)||Object(o.a)(e,t)||Object(i.a)()}},16:function(e,t){e.exports=window.wp.primitives},17:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(11);function o(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},18:function(e,t,n){var r,o=n(20);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var i={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)){if(n.length){var a=c.apply(null,n);a&&e.push(a)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var l in n)i.call(n,l)&&n[l]&&e.push(l);else e.push(n.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===o(n(19))&&n(19)?void 0===(r=function(){return c}.apply(t,[]))||(e.exports=r):window.classNames=c}()},185:function(e,t){e.exports=window.wp.compose},19:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t){function n(t){return e.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,n(t)}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports},22:function(e,t,n){"use strict";function r(e){if(Array.isArray(e))return e}n.d(t,"a",(function(){return r}))},23:function(e,t,n){"use strict";function r(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}n.d(t,"a",(function(){return r}))},3:function(e,t){e.exports=window.wp.components},311:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/menu","category":"layout","attributes":{"orientation":{"type":"string"},"size":{"type":"string"},"itemsJustification":{"type":"string"}},"providesContext":{"prc-block/menu":"className"},"styles":[{"name":"default","label":"Default","isDefault":true},{"name":"secondary","label":"Secondary"},{"name":"secondary-pointing","label":"Secondary Pointing"},{"name":"text","label":"Text"},{"name":"tabular","label":"Tabular"}],"supports":{"align":["wide","full"],"anchor":true,"html":false,"inserter":false}}')},4:function(e,t){e.exports=window.wp.element},45:function(e,t){e.exports=window.lodash},5:function(e,t){e.exports=window.wp.blockEditor},698:function(e,t,n){n(12),e.exports=n(759)},699:function(e,t,n){"use strict";var r=n(4),o=n(16),i=Object(r.createElement)(o.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(r.createElement)(o.Path,{d:"M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.5c-3.6 0-6.5-2.9-6.5-6.5S8.4 5.5 12 5.5s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5zM9 16l4.5-3L15 8.4l-4.5 3L9 16z"}));t.a=i},7:function(e,t){e.exports=window.wp.blocks},759:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"justifyLeftIcon",(function(){return g})),n.d(r,"justifyCenterIcon",(function(){return O})),n.d(r,"justifyRightIcon",(function(){return j}));var o=n(8),i=n(2),c=n(699),a=n(7),l=n(311),s=n(15),u=n(45),p=n(18),f=n.n(p),b=n(4),m=n(5),d=n(9),v=n(3),w=n(185),h=function(e){var t=e.clientId,n=e.__experimentalFeatures,r=Object(d.useSelect)((function(e){var n=e("core/block-editor"),r=n.getSelectedBlockClientId;return{block:(0,n.getBlock)(t),selectedBlockClientId:r()}}),[t]),o=r.block,i=r.selectedBlockClientId,c=Object(d.useDispatch)("core/block-editor").selectBlock;return React.createElement(m.__experimentalBlockNavigationTree,{blocks:o.innerBlocks,selectedBlockClientId:i,selectBlock:c,__experimentalFeatures:n,showNestedBlocks:!0,showAppender:!0,showBlockMovers:!0})},y=React.createElement(v.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"},React.createElement(v.Path,{d:"M13.8 5.2H3v1.5h10.8V5.2zm-3.6 12v1.5H21v-1.5H10.2zm7.2-6H6.6v1.5h10.8v-1.5z"})),k=function(e,t){var n=Object(b.useState)(!1),r=Object(s.a)(n,2),o=r[0],c=r[1];return{navigatorToolbarButton:React.createElement(v.ToolbarButton,{className:"components-toolbar__control",label:Object(i.__)("Open block navigator"),onClick:function(){return c(!0)},icon:y}),navigatorModal:o&&React.createElement(v.Modal,{title:Object(i.__)("Block Navigator"),closeLabel:Object(i.__)("Close"),onRequestClose:function(){c(!1)}},React.createElement(h,{clientId:e,__experimentalFeatures:t}))}},g=React.createElement(v.SVG,{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},React.createElement(v.Path,{d:"M11 16v-3h10v-2H11V8l-4 4 4 4zM5 4H3v16h2V4z"})),O=React.createElement(v.SVG,{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},React.createElement(v.Path,{d:"M5 8v3H1v2h4v3l4-4-4-4zm14 8v-3h4v-2h-4V8l-4 4 4 4zM13 4h-2v16h2V4z"})),j=React.createElement(v.SVG,{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},React.createElement(v.Path,{d:"M13 8v3H3v2h10v3l4-4-4-4zm8-4h-2v16h2V4z"})),_=Object(b.forwardRef)((function(e,t){var n=e.onCreate;return React.createElement(v.Placeholder,{label:Object(i.__)("Menu Configuration"),instructions:"Create a new blank menu or select from predefined options below.",ref:t},React.createElement(v.Button,{isPrimary:!0,onClick:function(){n([],!0)}},Object(i.__)("Create Blank Menu")))})),x=function(e,t){return t.split(" ").includes(e)},B=Object(w.compose)([Object(d.withSelect)((function(e,t){var n,r=t.clientId,o=e("core/block-editor").getBlocks(r),i=e("core/block-editor"),c=i.getClientIdsOfDescendants,a=i.hasSelectedInnerBlock,l=i.getSelectedBlockClientId;return{isImmediateParentOfSelectedBlock:a(r,!1),selectedBlockHasDescendants:!(null===(n=c([l()]))||void 0===n||!n.length),hasExistingNavItems:!!o.length}})),Object(d.withDispatch)((function(e,t){var n=t.clientId;return{updateInnerBlocks:function(t){if(0===(null==t?void 0:t.length))return!1;e("core/block-editor").replaceInnerBlocks(n,t,!0)}}}))])((function(e){var t=e.selectedBlockHasDescendants,n=e.attributes,c=e.setAttributes,a=e.clientId,l=e.hasExistingNavItems,p=e.isImmediateParentOfSelectedBlock,w=e.isSelected,h=e.updateInnerBlocks,y=e.className,B=e.hasItemJustificationControls,E=void 0===B||B,S=e.hasListViewModal,C=void 0===S||S,I=n.orientation,R=Object(b.useState)(!l),P=Object(s.a)(R,2),A=P[0],M=P[1],z=Object(d.useDispatch)("core/block-editor").selectBlock,D=Object(m.useBlockProps)({className:f()(y,Object(o.a)({},"items-justified-".concat(n.itemsJustification),n.itemsJustification))}),J=k(a),N=J.navigatorToolbarButton,T=J.navigatorModal,V=Object(m.useInnerBlocksProps)({className:f()("ui menu",{secondary:x("is-style-secondary",D.className),"secondary pointing":x("is-style-secondary-pointing",D.className),tabular:x("is-style-tabular",D.className),text:x("is-style-text",D.className),vertical:"vertical"===I})},{allowedBlocks:["prc-block/menu","prc-block/menu-link","prc-block/social-link","prc-block/post-bylines","core/post-date"],orientation:I||"horizontal",renderAppender:!!(p&&!t||w)&&m.InnerBlocks.DefaultAppender,__experimentalAppenderTagName:"div",__experimentalCaptureToolbars:!1,templateLock:!1});if(A)return React.createElement("div",D,React.createElement(_,{onCreate:function(e,t){M(!1),h(e),t&&z(a)}}));var H=function(e){return function(){var t=n.itemsJustification===e?void 0:e;c({itemsJustification:t})}};return React.createElement(b.Fragment,null,React.createElement(m.BlockControls,null,E&&React.createElement(v.ToolbarGroup,{icon:n.itemsJustification?r["justify".concat(Object(u.upperFirst)(n.itemsJustification),"Icon")]:g,label:Object(i.__)("Change items justification"),isCollapsed:!0,controls:[{icon:g,title:Object(i.__)("Justify items left"),isActive:"left"===n.itemsJustification,onClick:H("left")},{icon:O,title:Object(i.__)("Justify items center"),isActive:"center"===n.itemsJustification,onClick:H("center")},{icon:j,title:Object(i.__)("Justify items right"),isActive:"right"===n.itemsJustification,onClick:H("right")}]}),C&&React.createElement(v.ToolbarGroup,null,N)),C&&T,React.createElement("nav",D,React.createElement("div",V)))})),E=function(){return React.createElement(m.InnerBlocks.Content,null)},S=[{name:"horizontal",isDefault:!0,title:Object(i.__)("PRC Menu (horizontal)"),description:Object(i.__)("A horizontal menu, all items will be displayed in a row."),attributes:{orientation:"horizontal"},scope:["inserter","transform"]},{name:"vertical",title:Object(i.__)("PRC Menu (vertical)"),description:Object(i.__)("A vertical menu, all items will be displayed in a column."),attributes:{orientation:"vertical"},scope:["inserter","transform"]}];function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function I(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var R=l.name,P={title:Object(i.__)("DEPRECATED: Menu"),icon:c.a,description:Object(i.__)("DEPRECATED: Use core/navigation block instead"),keywords:[Object(i.__)("menu"),Object(i.__)("navigation"),Object(i.__)("links")],variations:S,example:{attributes:{orientation:"vertical"},innerBlocks:[{name:"prc-block/menu-link",attributes:{label:Object(i.__)("Home"),url:"https://make.wordpress.org/"}},{name:"prc-block/menu-link",attributes:{label:Object(i.__)("About"),url:"https://make.wordpress.org/"}},{name:"prc-block/menu-link",attributes:{label:Object(i.__)("Contact"),url:"https://make.wordpress.org/"}}]},edit:B,save:E};Object(a.registerBlockType)(R,I(I({},l),P))},8:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},9:function(e,t){e.exports=window.wp.data}},[[698,0]]]);
//# sourceMappingURL=menu-4befe883.js.map