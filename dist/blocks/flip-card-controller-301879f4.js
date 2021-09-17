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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[10],{10:function(e,t,o){"use strict";function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}o.d(t,"a",(function(){return r}))},108:function(e,t,o){"use strict";var r=o(10),n=o(2),c=o(5),l=o(4),a=o(19),i=Object(l.createElement)(a.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(l.createElement)(a.Path,{d:"M4 6v12c0 1.1.9 2 2 2h3v-1.5H6c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h3V4H6c-1.1 0-2 .9-2 2zm7.2 16h1.5V2h-1.5v20zM15 5.5h1.5V4H15v1.5zm3.5.5H20c0-1.1-.9-2-2-2v1.5c.3 0 .5.2.5.5zm0 10.5H20v-2h-1.5v2zm0-3.5H20v-2h-1.5v2zm-.5 5.5V20c1.1 0 2-.9 2-2h-1.5c0 .3-.2.5-.5.5zM15 20h1.5v-1.5H15V20zm3.5-10.5H20v-2h-1.5v2z"})),s=o(3),u=o(15);function p(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function b(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?p(Object(o),!0).forEach((function(t){Object(r.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):p(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var d=[{name:"Oatmeal",color:"#E2E2E2"},{name:"White",color:"#FFF"}],f=[{name:"Oatmeal",color:"#E2E2E2"},{name:"Oatmeal (dark)",color:"#D5D5CD"},{name:"Gray",color:"#D8D8D8"},{name:"Black",color:"#000"}],m=function(e){Object(u.select)("core/block-editor").getBlock(e).innerBlocks.forEach((function(e){var t=document.querySelector('div[data-block="'.concat(e.clientId,'"]'));"none"===t.style.display?t.style.display="block":t.style.display="none"}))};t.a=function(e){var t=e.clientId,o=Object(u.useSelect)((function(e){var o=e("core/block-editor"),r=o.getBlockName,n=o.getBlockRootClientId,c=o.getBlockAttributes,l=t;return"prc-block/flip-card"!==r(t)&&(l=n(t)),b(b({},c(l)),{},{controllerClientId:l})}),[t]),r=o.width,a=o.height,p=o.borderColor,h=o.bgColor,g=o.controllerClientId,v=Object(u.useDispatch)("core/block-editor").updateBlockAttributes;return React.createElement(l.Fragment,null,React.createElement(c.BlockControls,null,React.createElement(s.ToolbarGroup,null,React.createElement(s.ToolbarButton,{icon:i,label:Object(n.__)("Flip Card Over"),f:!0,onClick:function(){m(g)}}))),React.createElement(c.InspectorControls,null,React.createElement(s.PanelBody,{title:Object(n.__)("Flip Card Options")},React.createElement(s.PanelRow,null,React.createElement(s.Button,{isSecondary:!0,onClick:function(){m(g)}},"Flip Card Over")),React.createElement(s.PanelRow,null,React.createElement(s.TextControl,{label:"Width",value:r,onChange:function(e){return v(g,{width:e})}})),React.createElement(s.PanelRow,null,React.createElement(s.TextControl,{label:"Height",value:a,onChange:function(e){return v(g,{height:e})}})),React.createElement(s.PanelRow,null,React.createElement("div",null,React.createElement("label",{style:{marginBottom:"0.5em",display:"inline-block"}},"Border Color"),React.createElement(s.ColorPalette,{colors:f,value:p,onChange:function(e){return v(g,{borderColor:e})},disableCustomColors:!0}))),React.createElement(s.PanelRow,null,React.createElement("div",null,React.createElement("label",{style:{marginBottom:"0.5em",display:"inline-block"}},"Background Color"),React.createElement(s.ColorPalette,{colors:d,value:h,onChange:function(e){return v(g,{bgColor:e})},disableCustomColors:!0}))))))}},15:function(e,t){e.exports=window.wp.data},16:function(e,t,o){var r,n=o(17);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function l(){for(var e=[],t=0;t<arguments.length;t++){var o=arguments[t];if(o){var r=n(o);if("string"===r||"number"===r)e.push(o);else if(Array.isArray(o)){if(o.length){var a=l.apply(null,o);a&&e.push(a)}}else if("object"===r)if(o.toString===Object.prototype.toString)for(var i in o)c.call(o,i)&&o[i]&&e.push(i);else e.push(o.toString())}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):"object"===n(o(22))&&o(22)?void 0===(r=function(){return l}.apply(t,[]))||(e.exports=r):window.classNames=l}()},17:function(e,t){function o(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=o=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=o=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),o(t)}e.exports=o,e.exports.default=e.exports,e.exports.__esModule=!0},19:function(e,t){e.exports=window.wp.primitives},2:function(e,t){e.exports=window.wp.i18n},22:function(e,t){(function(t){e.exports=t}).call(this,{})},23:function(e,t,o){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},274:function(e){e.exports=JSON.parse('{"name":"prc-block/flip-card","category":"layout","attributes":{"width":{"type":"integer","default":310},"height":{"type":"integer","default":310},"borderColor":{"type":"string"},"bgColor":{"type":"string"},"fluid":{"type":"boolean"}}}')},3:function(e,t){e.exports=window.wp.components},361:function(e,t,o){"use strict";var r=o(4),n=o(19),c=Object(r.createElement)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(r.createElement)(n.Path,{d:"M2 11.2v1.5h20v-1.5H2zM5.5 6c0-.3.2-.5.5-.5h12c.3 0 .5.2.5.5v3H20V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3h1.5V6zm2 14h2v-1.5h-2V20zm3.5 0h2v-1.5h-2V20zm7-1.5V20c1.1 0 2-.9 2-2h-1.5c0 .3-.2.5-.5.5zm.5-2H20V15h-1.5v1.5zM5.5 18H4c0 1.1.9 2 2 2v-1.5c-.3 0-.5-.2-.5-.5zm0-3H4v1.5h1.5V15zm9 5h2v-1.5h-2V20z"}));t.a=c},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},588:function(e,t,o){o(23),e.exports=o(672)},672:function(e,t,o){"use strict";o.r(t);var r=o(10),n=o(9),c=o(2),l=o(361),a=o(274),i=o(16),s=o.n(i),u=o(4),p=o(15),b=o(5),d=o(3),f=o(108),m=["prc-block/flip-card-front","prc-block/flip-card-back"],h=[["prc-block/flip-card-front",{}],["prc-block/flip-card-back",{}]],g=function(e){var t=e.attributes,o=e.className,r=e.setAttributes,n=e.isSelected,c=e.clientId,l=t.width,a=t.height,i=t.borderColor,g=t.bgColor,v=(t.fluid,Object(p.dispatch)("core/block-editor").toggleSelection),w=Object(b.useBlockProps)({className:s()(o)}),y=Object(b.__experimentalUseInnerBlocksProps)({},{allowedBlocks:m,orientation:"vertical",templateLock:!1,template:h,__experimentalCaptureToolbars:!0,renderAppender:!1}),O=Object(p.useSelect)((function(e){var t=e("core/block-editor").getBlockRootClientId(c),o=e("core/block-editor").getBlock(t);return{isFluid:null!==o&&"prc-block/column"===o.name}})).isFluid;return Object(u.useEffect)((function(){n&&(r({fluid:O}),console.log("isFluid?",O))}),[O,n]),O?React.createElement(u.Fragment,null,React.createElement(f.a,{clientId:c}),React.createElement("div",w,React.createElement("div",y))):React.createElement(u.Fragment,null,React.createElement(f.a,{clientId:c}),React.createElement("div",w,React.createElement(d.ResizableBox,{size:{width:l,height:a},minHeight:"200",minWidth:"200",maxWidth:"640",enable:{top:!1,right:n,bottom:n,left:!1,topRight:!1,bottomRight:!1,bottomLeft:!1,topLeft:!1},onResizeStop:function(e,t,o,n){r({width:parseInt(l+n.width,10),height:parseInt(a+n.height,10)}),v(!0)},onResizeStart:function(){v(!1)},style:{borderColor:i,backgroundColor:g}},React.createElement("div",y))))},v=function(e){e.attributes,e.className;return React.createElement(b.InnerBlocks.Content,null)};function w(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function y(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?w(Object(o),!0).forEach((function(t){Object(r.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):w(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var O=a.name,k={title:Object(c.__)("PRC Flip Card"),description:Object(c.__)("An unstyled card that has a front and back"),supports:{align:["left","right"]},icon:l.a,edit:g,save:v};Object(n.registerBlockType)(O,y(y({},a),k))},9:function(e,t){e.exports=window.wp.blocks}},[[588,0]]]);
//# sourceMappingURL=flip-card-controller-301879f4.js.map