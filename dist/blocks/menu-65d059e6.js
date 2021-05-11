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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[10],{1:function(e,t){e.exports=wp.element},10:function(e,t){e.exports=lodash},11:function(e,t){e.exports=wp.data},117:function(e,t){e.exports=wp.compose},13:function(e,t,n){var r,o=n(14);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)&&n.length){var a=i.apply(null,n);a&&e.push(a)}else if("object"===r)for(var l in n)c.call(n,l)&&n[l]&&e.push(l)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===o(n(15))&&n(15)?void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r):window.classNames=i}()},130:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return p}));var r=n(6),o=n(31);var c=n(13),i=n.n(c),a=n(1);function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u=function(e){return Object(a.createElement)("path",e)},p=function(e){var t=e.className,n=e.isPressed,r=s(s({},function(e,t){if(null==e)return{};var n,r,c=Object(o.a)(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}(e,["className","isPressed"])),{},{className:i()(t,{"is-pressed":n})||void 0,role:"img","aria-hidden":!0,focusable:!1});return Object(a.createElement)("svg",r)}},14:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=n=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),n(t)}e.exports=n,e.exports.default=e.exports,e.exports.__esModule=!0},15:function(e,t){(function(t){e.exports=t}).call(this,{})},168:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/menu","category":"layout","attributes":{"orientation":{"type":"string"},"itemsJustification":{"type":"string"}},"providesContext":{"prc-block/menu":"className"},"styles":[{"name":"default","label":"Default","isDefault":true},{"name":"secondary","label":"Secondary"},{"name":"secondary-pointing","label":"Secondary Pointing"},{"name":"text","label":"Text"},{"name":"tabular","label":"Tabular"}],"supports":{"align":["wide","full"],"anchor":true,"html":false,"inserter":true}}')},18:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},19:function(e,t,n){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},2:function(e,t){e.exports=wp.i18n},20:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(21);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,c=void 0;try{for(var i,a=e[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,c=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw c}}return n}}(e,t)||Object(r.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},21:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(18);function o(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},261:function(e,t,n){n(19),e.exports=n(326)},3:function(e,t){e.exports=wp.components},31:function(e,t,n){"use strict";function r(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}n.d(t,"a",(function(){return r}))},326:function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"justifyLeftIcon",(function(){return k})),n.d(r,"justifyCenterIcon",(function(){return g})),n.d(r,"justifyRightIcon",(function(){return _}));var o=n(6),c=n(2),i=n(1),a=n(130),l=Object(i.createElement)(a.b,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(i.createElement)(a.a,{d:"M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.5c-3.6 0-6.5-2.9-6.5-6.5S8.4 5.5 12 5.5s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5zM9 16l4.5-3L15 8.4l-4.5 3L9 16z"})),s=n(9),u=n(168),p=n(20),b=n(10),f=n(13),m=n.n(f),d=n(4),v=n(11),y=n(3),O=n(117),h=function(e){var t=e.clientId,n=e.__experimentalFeatures,r=Object(v.useSelect)((function(e){var n=e("core/block-editor"),r=n.getSelectedBlockClientId;return{block:(0,n.getBlock)(t),selectedBlockClientId:r()}}),[t]),o=r.block,c=r.selectedBlockClientId,i=Object(v.useDispatch)("core/block-editor").selectBlock;return React.createElement(d.__experimentalBlockNavigationTree,{blocks:o.innerBlocks,selectedBlockClientId:c,selectBlock:i,__experimentalFeatures:n,showNestedBlocks:!0,showAppender:!0,showBlockMovers:!0})},j=React.createElement(y.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"},React.createElement(y.Path,{d:"M13.8 5.2H3v1.5h10.8V5.2zm-3.6 12v1.5H21v-1.5H10.2zm7.2-6H6.6v1.5h10.8v-1.5z"})),w=function(e,t){var n=Object(i.useState)(!1),r=Object(p.a)(n,2),o=r[0],a=r[1];return{navigatorToolbarButton:React.createElement(y.ToolbarButton,{className:"components-toolbar__control",label:Object(c.__)("Open block navigator"),onClick:function(){return a(!0)},icon:j}),navigatorModal:o&&React.createElement(y.Modal,{title:Object(c.__)("Block Navigator"),closeLabel:Object(c.__)("Close"),onRequestClose:function(){a(!1)}},React.createElement(h,{clientId:e,__experimentalFeatures:t}))}},k=React.createElement(y.SVG,{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},React.createElement(y.Path,{d:"M11 16v-3h10v-2H11V8l-4 4 4 4zM5 4H3v16h2V4z"})),g=React.createElement(y.SVG,{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},React.createElement(y.Path,{d:"M5 8v3H1v2h4v3l4-4-4-4zm14 8v-3h4v-2h-4V8l-4 4 4 4zM13 4h-2v16h2V4z"})),_=React.createElement(y.SVG,{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},React.createElement(y.Path,{d:"M13 8v3H3v2h10v3l4-4-4-4zm8-4h-2v16h2V4z"})),x=Object(i.forwardRef)((function(e,t){var n=e.onCreate;return React.createElement(y.Placeholder,{label:Object(c.__)("Menu Configuration"),instructions:"Create a new blank menu or select from predefined options below.",ref:t},React.createElement(y.Button,{isPrimary:!0,onClick:function(){n([],!0)}},Object(c.__)("Create Blank Menu")))})),B=function(e,t){return t.split(" ").includes(e)},E=Object(O.compose)([Object(v.withSelect)((function(e,t){var n,r=t.clientId,o=e("core/block-editor").getBlocks(r),c=e("core/block-editor"),i=c.getClientIdsOfDescendants,a=c.hasSelectedInnerBlock,l=c.getSelectedBlockClientId;return{isImmediateParentOfSelectedBlock:a(r,!1),selectedBlockHasDescendants:!!(null===(n=i([l()]))||void 0===n?void 0:n.length),hasExistingNavItems:!!o.length}})),Object(v.withDispatch)((function(e,t){var n=t.clientId;return{updateInnerBlocks:function(t){if(0===(null==t?void 0:t.length))return!1;e("core/block-editor").replaceInnerBlocks(n,t,!0)}}}))])((function(e){var t=e.selectedBlockHasDescendants,n=e.attributes,a=e.setAttributes,l=e.clientId,s=e.hasExistingNavItems,u=e.isImmediateParentOfSelectedBlock,f=e.isSelected,O=e.updateInnerBlocks,h=e.className,j=e.hasItemJustificationControls,E=void 0===j||j,P=e.hasListViewModal,S=void 0===P||P,I=n.orientation,C=Object(i.useState)(!s),R=Object(p.a)(C,2),M=R[0],A=R[1],N=Object(v.useDispatch)("core/block-editor").selectBlock,z=Object(d.useBlockProps)({className:m()(h,Object(o.a)({},"items-justified-".concat(n.itemsJustification),n.itemsJustification))}),D=w(l),J=D.navigatorToolbarButton,T=D.navigatorModal,V=Object(d.__experimentalUseInnerBlocksProps)({className:m()("ui menu",{secondary:B("is-style-secondary",z.className),"secondary pointing":B("is-style-secondary-pointing",z.className),tabular:B("is-style-tabular",z.className),text:B("is-style-text",z.className),vertical:"vertical"===I})},{allowedBlocks:["prc-block/menu","prc-block/menu-link","prc-block/social-link","prc-block/post-bylines","prc-block/post-publish-date"],orientation:I||"horizontal",renderAppender:!!(u&&!t||f)&&d.InnerBlocks.DefaultAppender,__experimentalAppenderTagName:"div",__experimentalCaptureToolbars:!1,templateLock:!1});if(M)return React.createElement("div",z,React.createElement(x,{onCreate:function(e,t){A(!1),O(e),t&&N(l)}}));var H=function(e){return function(){var t=n.itemsJustification===e?void 0:e;a({itemsJustification:t})}};return React.createElement(i.Fragment,null,React.createElement(d.BlockControls,null,E&&React.createElement(y.ToolbarGroup,{icon:n.itemsJustification?r["justify".concat(Object(b.upperFirst)(n.itemsJustification),"Icon")]:k,label:Object(c.__)("Change items justification"),isCollapsed:!0,controls:[{icon:k,title:Object(c.__)("Justify items left"),isActive:"left"===n.itemsJustification,onClick:H("left")},{icon:g,title:Object(c.__)("Justify items center"),isActive:"center"===n.itemsJustification,onClick:H("center")},{icon:_,title:Object(c.__)("Justify items right"),isActive:"right"===n.itemsJustification,onClick:H("right")}]}),S&&React.createElement(y.ToolbarGroup,null,J)),S&&T,React.createElement("nav",z,React.createElement("div",V)))})),P=function(){return React.createElement(d.InnerBlocks.Content,null)},S=[{name:"horizontal",isDefault:!0,title:Object(c.__)("PRC Menu (horizontal)"),description:Object(c.__)("A horizontal menu, all items will be displayed in a row."),attributes:{orientation:"horizontal"},scope:["inserter","transform"]},{name:"vertical",title:Object(c.__)("PRC Menu (vertical)"),description:Object(c.__)("A vertical menu, all items will be displayed in a column."),attributes:{orientation:"vertical"},scope:["inserter","transform"]}];function I(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?I(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):I(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var R=u.name,M={title:Object(c.__)("Menu"),icon:l,description:Object(c.__)("A collection of links as blocks to create menus."),keywords:[Object(c.__)("menu"),Object(c.__)("navigation"),Object(c.__)("links")],variations:S,example:{attributes:{orientation:"vertical"},innerBlocks:[{name:"prc-block/menu-link",attributes:{label:Object(c.__)("Home"),url:"https://make.wordpress.org/"}},{name:"prc-block/menu-link",attributes:{label:Object(c.__)("About"),url:"https://make.wordpress.org/"}},{name:"prc-block/menu-link",attributes:{label:Object(c.__)("Contact"),url:"https://make.wordpress.org/"}}]},edit:E,save:P};Object(s.registerBlockType)(R,C(C({},u),M))},4:function(e,t){e.exports=wp.blockEditor},6:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},9:function(e,t){e.exports=wp.blocks}},[[261,0]]]);
//# sourceMappingURL=menu-65d059e6.js.map