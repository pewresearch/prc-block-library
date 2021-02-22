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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[2],{0:function(e,t){e.exports=wp.element},1:function(e,t){e.exports=wp.i18n},10:function(e,t,r){var n,c=r(12);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var o={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=c(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)&&r.length){var i=a.apply(null,r);i&&e.push(i)}else if("object"===n)for(var l in r)o.call(r,l)&&r[l]&&e.push(l)}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):"object"===c(r(15))&&r(15)?void 0===(n=function(){return a}.apply(t,[]))||(e.exports=n):window.classNames=a}()},11:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(9);function c(e,t){if(e){if("string"==typeof e)return Object(n.a)(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?Object(n.a)(e,t):void 0}}},12:function(e,t){function r(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=r=function(e){return typeof e}:e.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(t)}e.exports=r},136:function(e,t,r){"use strict";r.r(t);var n=r(4),c=r(8),o=r(1),a=r(52),i=r(17),l=r(10),s=r.n(l),u=r(6),p=r(0),b=r(2),f=r(3),d=r(5),m=["prc-block/row"],y=Object(d.withDispatch)((function(e,t,r){return{updateRows:function(n,o){var a=t.clientId,l=e("core/block-editor").replaceInnerBlocks,s=(0,r.select("core/block-editor").getBlocks)(a);l(a,s=o>n?[].concat(Object(i.a)(s),Object(i.a)(Object(u.times)(o-n,(function(){return Object(c.createBlock)("prc-block/row")})))):Object(u.dropRight)(s,n-o))}}}))((function(e){e.attributes;var t=e.className,r=e.updateRows,n=e.clientId,c=Object(d.useSelect)((function(e){return{count:e("core/block-editor").getBlockCount(n)}}),[n]).count,a=Object(f.useBlockProps)({className:s()(t,"ui","stackable","grid")}),i=Object(f.__experimentalUseInnerBlocksProps)(a,{allowedBlocks:m,orientation:"vertical",renderAppender:f.InnerBlocks.ButtonBlockAppender});return React.createElement(p.Fragment,null,React.createElement(f.InspectorControls,null,React.createElement(b.PanelBody,null,React.createElement(b.RangeControl,{label:Object(o.__)("Rows"),value:c,onChange:function(e){return r(c,e)},min:1,max:Math.max(6,c),withInputField:!0}),5<c&&React.createElement(b.Notice,{status:"warning",isDismissible:!1},Object(o.__)("This column count exceeds the recommended amount and may cause visual breakage.")))),React.createElement("div",{className:"ui container"},React.createElement("div",i)))})),v=function(e){return React.createElement(y,e)},O=function(){return React.createElement(f.InnerBlocks.Content,null)},w={title:Object(o.__)("PRC Columns"),description:Object(o.__)("LEGACY, DO NOT USE. USE prc-block/grid, instead"),icon:React.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4.1 1.5v10H10v-10h4.9zM5.5 17V8c0-.3.2-.5.5-.5h2.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2.6v-10H19c.3 0 .5.2.5.5v9z"})),attribues:{equal:{type:"boolean",default:!1}},edit:function(e){var t=e.clientId,r=e.isSelected;return Object(p.useEffect)((function(){var e=Object(d.select)("core/block-editor").getBlock(t),n=e.innerBlocks,o=!1;if(e.attributes.className.split(" ").includes("equal")&&(o=!0),!0===r){var a=Object(c.createBlock)("prc-block/row",{equal:o,className:""},n),i=Object(c.createBlock)("prc-block/grid",{className:""},[a]);console.log("Migrating prc-block/columns->",e,n,i),Object(d.dispatch)("core/block-editor").replaceBlock(t,i)}}),[t]),React.createElement(f.InnerBlocks,null)},save:function(){return React.createElement(f.InnerBlocks.Content,null)},supports:{inserter:!1}};function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function g(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}Object(c.registerBlockType)("prc-block/columns",w);var j=a.name,k={title:Object(o.__)("PRC Grid"),description:Object(o.__)("Add a block that displays content in rows divided by multiple columns."),icon:React.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4.1 1.5v10H10v-10h4.9zM5.5 17V8c0-.3.2-.5.5-.5h2.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2.6v-10H19c.3 0 .5.2.5.5v9z"})),keywords:[Object(o.__)("Columns"),Object(o.__)("Column"),Object(o.__)("Grid")],edit:v,save:O};Object(c.registerBlockType)(j,g(g({},a),k))},14:function(e,t,r){"use strict";var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},15:function(e,t){(function(t){e.exports=t}).call(this,{})},17:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var n=r(9);var c=r(11);function o(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},2:function(e,t){e.exports=wp.components},3:function(e,t){e.exports=wp.blockEditor},4:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},5:function(e,t){e.exports=wp.data},52:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/grid","category":"layout","attributes":{"container":{"type":"boolean","default":true},"padded":{"type":"string","default":"false|true|horizontally|vertically"},"relaxed":{"type":"string","default":"false|true|very"},"stackable":{"type":"boolean","default":true}},"supports":{"html":false,"align":false}}')},6:function(e,t){e.exports=lodash},8:function(e,t){e.exports=wp.blocks},9:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}r.d(t,"a",(function(){return n}))},95:function(e,t,r){r(14),e.exports=r(136)}},[[95,0]]]);
//# sourceMappingURL=grid-b78688f1.js.map