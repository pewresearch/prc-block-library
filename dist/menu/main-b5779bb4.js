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
(window.wpackioprcBlocksLibrarymenuJsonp=window.wpackioprcBlocksLibrarymenuJsonp||[]).push([[0],[function(e,t){e.exports=wp.i18n},function(e,t){e.exports=wp.element},function(e,t){e.exports=wp.components},function(e,t){e.exports=wp.blockEditor},function(e,t){e.exports=wp.data},function(e,t,n){var r,o=n(14);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)&&n.length){var a=i.apply(null,n);a&&e.push(a)}else if("object"===r)for(var l in n)c.call(n,l)&&n[l]&&e.push(l)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===o(n(9))&&n(9)?void 0===(r=function(){return i}.apply(t,[]))||(e.exports=r):window.classNames=i}()},function(e,t){e.exports=lodash},function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/menu","category":"layout","attributes":{"orientation":{"type":"string"},"itemsJustification":{"type":"string"}},"providesContext":{"prc-block/menu":"className"},"styles":[{"name":"default","label":"Default","isDefault":true},{"name":"secondary","label":"Secondary"},{"name":"text","label":"Text"},{"name":"tabular","label":"Tabular"}],"supports":{"align":["wide","full"],"anchor":true,"html":false,"inserter":true}}')},function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.d(t,"a",(function(){return r}))},function(e,t){(function(t){e.exports=t}).call(this,{})},function(e,t){e.exports=wp.blocks},function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(8);function o(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r.a)(e,t):void 0}}},function(e,t,n){n(13),e.exports=n(15)},function(e,t,n){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n},function(e,t,n){"use strict";n.r(t);var r={};function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.r(r),n.d(r,"justifyLeftIcon",(function(){return B})),n.d(r,"justifyCenterIcon",(function(){return x})),n.d(r,"justifyRightIcon",(function(){return E}));var c=n(0),i=n(1);function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=n(5),s=n.n(l);function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var f=Object(i.createElement)((function(e){var t=e.className,n=e.isPressed,r=p(p({},a(e,["className","isPressed"])),{},{className:s()(t,{"is-pressed":n})||void 0,role:"img","aria-hidden":!0,focusable:!1});return Object(i.createElement)("svg",r)}),{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(i.createElement)((function(e){return Object(i.createElement)("path",e)}),{d:"M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.5c-3.6 0-6.5-2.9-6.5-6.5S8.4 5.5 12 5.5s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5zM9 16l4.5-3L15 8.4l-4.5 3L9 16z"})),b=n(10),m=n(7);var d=n(11);function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,c=void 0;try{for(var i,a=e[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,c=e}finally{try{r||null==a.return||a.return()}finally{if(o)throw c}}return n}}(e,t)||Object(d.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var h=n(6),y=n(3),O=n(4),w=n(2),j=h.flowRight,g=function(e){var t=e.clientId,n=e.__experimentalFeatures,r=Object(O.useSelect)((function(e){var n=e("core/block-editor"),r=n.getSelectedBlockClientId;return{block:(0,n.getBlock)(t),selectedBlockClientId:r()}}),[t]),o=r.block,c=r.selectedBlockClientId,i=Object(O.useDispatch)("core/block-editor").selectBlock;return React.createElement(y.__experimentalBlockNavigationTree,{blocks:o.innerBlocks,selectedBlockClientId:c,selectBlock:i,__experimentalFeatures:n,showNestedBlocks:!0,showAppender:!0,showBlockMovers:!0})},k=React.createElement(w.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"},React.createElement(w.Path,{d:"M13.8 5.2H3v1.5h10.8V5.2zm-3.6 12v1.5H21v-1.5H10.2zm7.2-6H6.6v1.5h10.8v-1.5z"})),_=function(e,t){var n=v(Object(i.useState)(!1),2),r=n[0],o=n[1];return{navigatorToolbarButton:React.createElement(w.ToolbarButton,{className:"components-toolbar__control",label:Object(c.__)("Open block navigator"),onClick:function(){return o(!0)},icon:k}),navigatorModal:r&&React.createElement(w.Modal,{title:Object(c.__)("Block Navigator"),closeLabel:Object(c.__)("Close"),onRequestClose:function(){o(!1)}},React.createElement(g,{clientId:e,__experimentalFeatures:t}))}},B=React.createElement(w.SVG,{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},React.createElement(w.Path,{d:"M11 16v-3h10v-2H11V8l-4 4 4 4zM5 4H3v16h2V4z"})),x=React.createElement(w.SVG,{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},React.createElement(w.Path,{d:"M5 8v3H1v2h4v3l4-4-4-4zm14 8v-3h4v-2h-4V8l-4 4 4 4zM13 4h-2v16h2V4z"})),E=React.createElement(w.SVG,{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},React.createElement(w.Path,{d:"M13 8v3H3v2h10v3l4-4-4-4zm8-4h-2v16h2V4z"})),S=Object(i.forwardRef)((function(e,t){var n=e.onCreate;return React.createElement(w.Placeholder,{label:Object(c.__)("Menu Configuration"),instructions:"Create a new blank menu or select from predefined options below.",ref:t},React.createElement(w.Button,{isPrimary:!0,onClick:function(){n([],!0)}},Object(c.__)("Create Blank Menu")),React.createElement(w.Button,{isSecondary:!0,onClick:function(){n([])}},Object(c.__)("Create Social Toolbar")))})),P=function(e,t){return t.split(" ").includes(e)},C=j([Object(O.withSelect)((function(e,t){var n,r=t.clientId,o=e("core/block-editor").getBlocks(r),c=e("core/block-editor"),i=c.getClientIdsOfDescendants,a=c.hasSelectedInnerBlock,l=c.getSelectedBlockClientId;return{isImmediateParentOfSelectedBlock:a(r,!1),selectedBlockHasDescendants:!!(null===(n=i([l()]))||void 0===n?void 0:n.length),hasExistingNavItems:!!o.length}})),Object(O.withDispatch)((function(e,t){var n=t.clientId;return{updateInnerBlocks:function(t){if(0===(null==t?void 0:t.length))return!1;e("core/block-editor").replaceInnerBlocks(n,t,!0)}}}))])((function(e){var t,n=e.selectedBlockHasDescendants,a=e.attributes,l=e.setAttributes,u=e.clientId,p=e.hasExistingNavItems,f=e.isImmediateParentOfSelectedBlock,b=e.isSelected,m=e.updateInnerBlocks,d=e.className,j=e.hasItemJustificationControls,g=void 0===j||j,k=e.hasListViewModal,C=void 0===k||k,I=v(Object(i.useState)(!p),2),R=I[0],A=I[1],z=Object(O.useDispatch)("core/block-editor").selectBlock,N=Object(y.useBlockProps)({className:s()(d,(t={},o(t,"items-justified-".concat(a.itemsJustification),a.itemsJustification),o(t,"is-vertical","vertical"===a.orientation),t))}),D=_(u),M=D.navigatorToolbarButton,J=D.navigatorModal,T=Object(y.__experimentalUseInnerBlocksProps)({className:s()("ui menu",{secondary:P("is-style-secondary",N.className),tabular:P("is-style-tabular",N.className),text:P("is-style-text",N.className)})},{allowedBlocks:["prc-block/menu-link","core/search","core/social-links"],orientation:a.orientation||"horizontal",renderAppender:!!(f&&!n||b)&&y.InnerBlocks.DefaultAppender,__experimentalAppenderTagName:"div",__experimentalCaptureToolbars:!0,templateLock:!1});if(R)return React.createElement("div",N,React.createElement(S,{onCreate:function(e,t){A(!1),m(e),t&&z(u)}}));var V=function(e){return function(){var t=a.itemsJustification===e?void 0:e;l({itemsJustification:t})}};return React.createElement(i.Fragment,null,React.createElement(y.BlockControls,null,g&&React.createElement(w.ToolbarGroup,{icon:a.itemsJustification?r["justify".concat(Object(h.upperFirst)(a.itemsJustification),"Icon")]:B,label:Object(c.__)("Change items justification"),isCollapsed:!0,controls:[{icon:B,title:Object(c.__)("Justify items left"),isActive:"left"===a.itemsJustification,onClick:V("left")},{icon:x,title:Object(c.__)("Justify items center"),isActive:"center"===a.itemsJustification,onClick:V("center")},{icon:E,title:Object(c.__)("Justify items right"),isActive:"right"===a.itemsJustification,onClick:V("right")}]}),C&&React.createElement(w.ToolbarGroup,null,M)),C&&J,React.createElement("nav",N,React.createElement("div",T)))})),I=function(){return React.createElement(y.InnerBlocks.Content,null)},R=[{name:"horizontal",isDefault:!0,title:Object(c.__)("PRC Menu (horizontal)"),description:Object(c.__)("A horizontal menu, all items will be displayed in a row."),attributes:{orientation:"horizontal"},scope:["inserter","transform"]},{name:"vertical",title:Object(c.__)("PRC Vertical (vertical)"),description:Object(c.__)("A vertical menu, all items will be displayed in a column."),attributes:{orientation:"vertical"},scope:["inserter","transform"]}];function A(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function z(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?A(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):A(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var N=m.name,D={title:Object(c.__)("Menu"),icon:f,description:Object(c.__)("A collection of links as blocks to create menus."),keywords:[Object(c.__)("menu"),Object(c.__)("navigation"),Object(c.__)("links")],variations:R,example:{innerBlocks:[{name:"prc-block/menu-link",attributes:{label:Object(c.__)("Home"),url:"https://make.wordpress.org/"}},{name:"prc-block/menu-link",attributes:{label:Object(c.__)("About"),url:"https://make.wordpress.org/"}},{name:"prc-block/menu-link",attributes:{label:Object(c.__)("Contact"),url:"https://make.wordpress.org/"}}]},edit:C,save:I};Object(b.registerBlockType)(N,z(z({},m),D))}],[[12,1]]]);
//# sourceMappingURL=main-b5779bb4.js.map