/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.24
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[57],{11:function(e,t,o){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}o.d(t,"a",(function(){return n}))},12:function(e,t,o){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(n)]},17:function(e,t,o){"use strict";o.d(t,"a",(function(){return c}));var n=o(11);function c(e,t){if(e){if("string"==typeof e)return Object(n.a)(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?Object(n.a)(e,t):void 0}}},18:function(e,t,o){var n,c=o(20);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var r={}.hasOwnProperty;function l(){for(var e=[],t=0;t<arguments.length;t++){var o=arguments[t];if(o){var n=c(o);if("string"===n||"number"===n)e.push(o);else if(Array.isArray(o)){if(o.length){var i=l.apply(null,o);i&&e.push(i)}}else if("object"===n)if(o.toString===Object.prototype.toString)for(var a in o)r.call(o,a)&&o[a]&&e.push(a);else e.push(o.toString())}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):"object"===c(o(19))&&o(19)?void 0===(n=function(){return l}.apply(t,[]))||(e.exports=n):window.classNames=l}()},19:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t){function o(t){return e.exports=o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,o(t)}e.exports=o,e.exports.__esModule=!0,e.exports.default=e.exports},290:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/row","category":"layout","attributes":{"divided":{"type":"boolean","default":true},"doubling":{"type":"boolean","default":false},"equal":{"type":"boolean","default":false},"padded":{"type":"string","default":"false|true|horizontally|vertically"},"relaxed":{"type":"string","default":"false|true|very"},"stackable":{"type":"boolean","default":true},"textAlign":{"type":"string","default":"left|center|right|justified"},"useCssGrid":{"type":"boolean","default":false}},"parent":["prc-block/grid"],"providesContext":{"prc-block/row-stackable":"stackable","prc-block/row/isEqual":"equal"},"supports":{"html":false,"align":false}}')},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},44:function(e,t,o){"use strict";o.d(t,"a",(function(){return l}));var n=o(11);var c=o(45),r=o(17);function l(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||Object(c.a)(e)||Object(r.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},45:function(e,t,o){"use strict";function n(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}o.d(t,"a",(function(){return n}))},47:function(e,t){e.exports=window.lodash},5:function(e,t){e.exports=window.wp.blockEditor},500:function(e,t,o){o(12),e.exports=o(780)},7:function(e,t){e.exports=window.wp.blocks},780:function(e,t,o){"use strict";o.r(t);var n=o(8),c=o(7),r=o(2),l=o(290),i=o(3),a=[{name:"two-columns-equal",title:Object(r.__)("1/2 | 1/2"),description:Object(r.__)("Two columns; equal split"),icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(i.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z"})),attributes:{equal:!0},innerBlocks:[["prc-block/column"],["prc-block/column"]],scope:["block"]},{name:"two-columns-one-third-two-thirds",title:Object(r.__)("1/3 | 2/3"),description:Object(r.__)("Two columns; one-third, two-thirds split"),icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(i.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z"})),innerBlocks:[["prc-block/column",{width:5}],["prc-block/column",{width:11}]],scope:["block"]},{name:"two-columns-two-thirds-one-third",title:Object(r.__)("2/3 | 1/3"),description:Object(r.__)("Two columns; two-thirds, one-third split"),icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(i.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z"})),innerBlocks:[["prc-block/column",{width:11}],["prc-block/column",{width:5}]],scope:["block"]},{name:"three-columns-equal",title:Object(r.__)("1/3 | 1/3 | 1/3"),description:Object(r.__)("Three columns; equal split"),icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(i.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"})),attributes:{equal:!0},innerBlocks:[["prc-block/column"],["prc-block/column"],["prc-block/column"]],scope:["block"]},{name:"three-columns-wider-center",title:Object(r.__)("1/4 | 1/2 | 1/4"),description:Object(r.__)("Three columns; wide center column"),icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(i.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM31 34H17V14h14v20zm2 0V14h6v20h-6zm-18 0H9V14h6v20z"})),innerBlocks:[["prc-block/column",{width:4}],["prc-block/column",{width:8}],["prc-block/column",{width:4}]],scope:["block"]},{name:"three-columns-two-thirds-one-third-one-third",title:Object(r.__)("2/4 - 1/4 - 1/4"),description:Object(r.__)("Three columns; 2/3 - 1/3 - 1/3"),icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(i.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM31 34H17V14h14v20zm2 0V14h6v20h-6zm-18 0H9V14h6v20z"})),innerBlocks:[["prc-block/column",{width:8}],["prc-block/column",{width:4}],["prc-block/column",{width:4}]],scope:["block"]},{name:"four-columns-equal",title:Object(r.__)("1/4 | 1/4 | 1/4"),description:Object(r.__)("Four columns; equal split"),icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(i.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"})),attributes:{equal:!0},innerBlocks:[["prc-block/column"],["prc-block/column"],["prc-block/column"],["prc-block/column"]],scope:["block"]},{name:"one-large-column",title:Object(r.__)("1"),description:Object(r.__)("One column"),isDefault:!0,icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-hidden":"true",focusable:"false"},React.createElement(i.Path,{"fill-rule":"evenodd","clip-rule":"evenodd",d:"m39.0625 14h-30.0625v20.0938h30.0625zm-30.0625-2c-1.10457 0-2 .8954-2 2v20.0938c0 1.1045.89543 2 2 2h30.0625c1.1046 0 2-.8955 2-2v-20.0938c0-1.1046-.8954-2-2-2z"})),innerBlocks:[["prc-block/column",{width:16}]],scope:["block"]}],u=o(44),s=o(18),d=o.n(s),p=o(47),b=o(4),m=o(5),h=o(9),f=["prc-block/column"],w=Object(h.withDispatch)((function(e,t,o){return{toggleDivided:function(){var e=t.attributes;(0,t.setAttributes)({divided:!e.divided})},toggleEqual:function(){var e=t.attributes;(0,t.setAttributes)({equal:!e.equal})},toggleStackable:function(){var e=t.attributes;(0,t.setAttributes)({stackable:!e.stackable})},updateColumns:function(n,r){var l=t.clientId,i=(t.equal,e("core/block-editor").replaceInnerBlocks),a=(0,o.select("core/block-editor").getBlocks)(l);console.log("updateColumns()",n,r,a);var s=r>n,d=Math.round(16/r);s?(a=a.map((function(e){var t=e;return t.attributes.width=d,t})),a=[].concat(Object(u.a)(a),Object(u.a)(Object(p.times)(r-n,(function(){return Object(c.createBlock)("prc-block/column",{width:d})}))))):a=Object(p.dropRight)(a,n-r),i(l,a)}}}))((function(e){var t=e.attributes,o=e.updateColumns,n=e.toggleDivided,c=e.toggleEqual,l=e.toggleStackable,a=e.clientId,u=t.divided,s=t.equal,p=t.stackable,w=Object(h.useSelect)((function(e){var t=e("core/block-editor").getBlockRootClientId(a);return{count:e("core/block-editor").getBlockCount(a),rowCount:e("core/block-editor").getBlockCount(t)}}),[a]),k=w.count,v=w.rowCount,g=Object(m.useBlockProps)({className:d()({ui:!0,"equal width":s,divided:u,stackable:p,grid:v<=1,row:v>1})}),O=Object(m.useInnerBlocksProps)(g,{allowedBlocks:f,orientation:"horizontal",renderAppender:!1,templateLock:"all"});return React.createElement(b.Fragment,null,React.createElement(m.InspectorControls,null,React.createElement(i.PanelBody,null,React.createElement(i.ToggleControl,{label:u?"Divided":"Not Divided",checked:u,onChange:function(){return n()}}),React.createElement(i.ToggleControl,{label:s?"Equal Width Columns":"Not Equal Width Columns",checked:s,onChange:function(){return c()}}),React.createElement(i.ToggleControl,{label:p?"Stack On Mobile":"Do Not Stack On Mobile",checked:p,onChange:function(){return l()}}),React.createElement(i.RangeControl,{label:Object(r.__)("Columns"),value:k,onChange:function(e){return o(k,e)},min:1,max:Math.max(6,k),withInputField:!0}),5<k&&React.createElement(i.Notice,{status:"warning",isDismissible:!1},Object(r.__)("This column count exceeds the recommended amount and may cause visual breakage.")))),React.createElement("div",O))})),k=function(e){var t=e.clientId,o=e.name,n=e.setAttributes,l=Object(h.useSelect)((function(e){return{blockType:e("core/blocks").getBlockType(o),defaultVariation:e("core/blocks").getDefaultBlockVariation(o,"block"),variations:e("core/blocks").getBlockVariations(o,"block")}}),[o]),i=l.blockType,a=l.defaultVariation,u=l.variations,s=Object(h.useDispatch)("core/block-editor").replaceInnerBlocks,d=Object(m.useBlockProps)({className:"has-placeholder"});return React.createElement("div",d,React.createElement(m.__experimentalBlockVariationPicker,{icon:Object(p.get)(i,["icon","src"]),label:Object(p.get)(i,["title"]),instructions:Object(r.__)('Select a layout to begin. Click "skip" to select the default One Column option.'),variations:u,onSelect:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a;e.attributes&&n(e.attributes),e.innerBlocks&&s(t,Object(c.createBlocksFromInnerBlocksTemplate)(e.innerBlocks),!0)},allowSkip:!0}))},v=function(e){var t=e.clientId,o=Object(h.useSelect)((function(e){return 0<e("core/block-editor").getBlocks(t).length}),[t])?w:k;return React.createElement(o,e)},g=function(){return React.createElement(m.InnerBlocks.Content,null)};function O(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function y(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?O(Object(o),!0).forEach((function(t){Object(n.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):O(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var j=l.name,_={title:Object(r.__)("DEPRECATED: Row"),description:Object(r.__)("DEPRECATED: Add a block that displays content in multiple columns, then add whatever content blocks you’d like."),icon:React.createElement("svg",{width:"24",height:"24",fill:"none","view-box":"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"m3.75 18v-12c0-.69036.55964-1.25 1.25-1.25h14c.6904 0 1.25.55964 1.25 1.25v12c0 .6904-.5596 1.25-1.25 1.25h-14c-.69036 0-1.25-.5596-1.25-1.25z",stroke:"currentColor","stroke-width":"1.5",fill:"none"}),React.createElement("path",{d:"m3 15h6v18h-6z",fill:"currentColor",transform:"matrix(0 -1 1 0 -12 18)"})),variations:a,edit:v,save:g};Object(c.registerBlockType)(j,y(y({},l),_))},8:function(e,t,o){"use strict";function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}o.d(t,"a",(function(){return n}))},9:function(e,t){e.exports=window.wp.data}},[[500,0]]]);
//# sourceMappingURL=row-05e7a78f.js.map