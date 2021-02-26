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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[8],{1:function(e,t){e.exports=wp.element},10:function(e,t){e.exports=lodash},11:function(e,t,n){"use strict";function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}n.d(t,"a",(function(){return o}))},119:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/row","category":"layout","attributes":{"divided":{"type":"boolean","default":false},"doubling":{"type":"boolean","default":false},"equal":{"type":"boolean","default":false},"textAlign":{"type":"string","default":"left|center|right|justified"}},"parent":["prc-block/grid"],"supports":{"html":false,"align":false}}')},14:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n},16:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var o=n(11);function c(e,t){if(e){if("string"==typeof e)return Object(o.a)(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(o.a)(e,t):void 0}}},172:function(e,t,n){n(24),e.exports=n(219)},19:function(e,t,n){var o,c=n(14);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var r={}.hasOwnProperty;function l(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=c(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)&&n.length){var i=l.apply(null,n);i&&e.push(i)}else if("object"===o)for(var a in n)r.call(n,a)&&n[a]&&e.push(a)}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):"object"===c(n(20))&&n(20)?void 0===(o=function(){return l}.apply(t,[]))||(e.exports=o):window.classNames=l}()},2:function(e,t){e.exports=wp.i18n},20:function(e,t){(function(t){e.exports=t}).call(this,{})},219:function(e,t,n){"use strict";n.r(t);var o=n(6),c=n(9),r=n(2),l=n(119),i=n(3),a=[{name:"two-columns-equal",title:Object(r.__)("1/2 | 1/2"),description:Object(r.__)("Two columns; equal split"),icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(i.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z"})),attributes:{equal:!0},innerBlocks:[["prc-block/column"],["prc-block/column"]],scope:["block"]},{name:"two-columns-one-third-two-thirds",title:Object(r.__)("1/3 | 2/3"),description:Object(r.__)("Two columns; one-third, two-thirds split"),icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(i.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z"})),innerBlocks:[["prc-block/column",{width:5}],["prc-block/column",{width:11}]],scope:["block"]},{name:"two-columns-two-thirds-one-third",title:Object(r.__)("2/3 | 1/3"),description:Object(r.__)("Two columns; two-thirds, one-third split"),icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(i.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z"})),innerBlocks:[["prc-block/column",{width:11}],["prc-block/column",{width:5}]],scope:["block"]},{name:"three-columns-equal",title:Object(r.__)("1/3 | 1/3 | 1/3"),description:Object(r.__)("Three columns; equal split"),icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(i.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"})),attributes:{equal:!0},innerBlocks:[["prc-block/column"],["prc-block/column"],["prc-block/column"]],scope:["block"]},{name:"three-columns-wider-center",title:Object(r.__)("1/4 | 1/2 | 1/4"),description:Object(r.__)("Three columns; wide center column"),icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(i.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM31 34H17V14h14v20zm2 0V14h6v20h-6zm-18 0H9V14h6v20z"})),innerBlocks:[["prc-block/column",{width:4}],["prc-block/column",{width:8}],["prc-block/column",{width:4}]],scope:["block"]},{name:"three-columns-two-thirds-one-third-one-third",title:Object(r.__)("2/4 - 1/4 - 1/4"),description:Object(r.__)("Three columns; 2/3 - 1/3 - 1/3"),icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(i.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM31 34H17V14h14v20zm2 0V14h6v20h-6zm-18 0H9V14h6v20z"})),innerBlocks:[["prc-block/column",{width:8}],["prc-block/column",{width:4}],["prc-block/column",{width:4}]],scope:["block"]},{name:"four-columns-equal",title:Object(r.__)("1/4 | 1/4 | 1/4"),description:Object(r.__)("Four columns; equal split"),icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(i.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"})),attributes:{equal:!0},innerBlocks:[["prc-block/column"],["prc-block/column"],["prc-block/column"],["prc-block/column"]],scope:["block"]},{name:"one-large-column",title:Object(r.__)("1"),description:Object(r.__)("One column"),isDefault:!0,icon:React.createElement(i.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(i.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z"})),innerBlocks:[["prc-block/column",{width:16}]],scope:["block"]}],u=n(27),s=n(19),d=n.n(s),p=n(10),b=n(1),m=n(4),h=n(7),w=["prc-block/column"],f=Object(h.withDispatch)((function(e,t,n){return{toggleDivided:function(){var e=t.attributes;(0,t.setAttributes)({divided:!e.divided})},toggleEqual:function(){var e=t.attributes;(0,t.setAttributes)({equal:!e.equal})},updateColumns:function(o,r){var l=t.clientId,i=(t.equal,e("core/block-editor").replaceInnerBlocks),a=(0,n.select("core/block-editor").getBlocks)(l);console.log("updateColumns()",o,r,a);var s=r>o,d=Math.round(16/r);s?(a=a.map((function(e){var t=e;return t.attributes.width=d,t})),a=[].concat(Object(u.a)(a),Object(u.a)(Object(p.times)(r-o,(function(){return Object(c.createBlock)("prc-block/column",{width:d})}))))):a=Object(p.dropRight)(a,o-r),i(l,a)}}}))((function(e){var t=e.attributes,n=e.updateColumns,o=e.toggleDivided,c=e.toggleEqual,l=e.clientId,a=t.divided,u=t.equal,s=Object(h.useSelect)((function(e){return{count:e("core/block-editor").getBlockCount(l)}}),[l]).count,p=Object(m.useBlockProps)({className:d()("row",{"equal width":u,divided:a})}),f=Object(m.__experimentalUseInnerBlocksProps)(p,{allowedBlocks:w,orientation:"horizontal",renderAppender:!1,templateLock:"all"});return React.createElement(b.Fragment,null,React.createElement(m.InspectorControls,null,React.createElement(i.PanelBody,null,React.createElement(i.ToggleControl,{label:a?"Divided":"Not Divided",checked:a,onChange:function(){return o()}}),React.createElement(i.ToggleControl,{label:u?"Equal Width Columns":"Not Equal Width Columns",checked:u,onChange:function(){return c()}}),React.createElement(i.RangeControl,{label:Object(r.__)("Columns"),value:s,onChange:function(e){return n(s,e)},min:1,max:Math.max(6,s),withInputField:!0}),5<s&&React.createElement(i.Notice,{status:"warning",isDismissible:!1},Object(r.__)("This column count exceeds the recommended amount and may cause visual breakage.")))),React.createElement("div",f))})),v=function(e){var t=e.clientId,n=e.name,o=e.setAttributes,l=Object(h.useSelect)((function(e){return{blockType:e("core/blocks").getBlockType(n),defaultVariation:e("core/blocks").getDefaultBlockVariation(n,"block"),variations:e("core/blocks").getBlockVariations(n,"block")}}),[n]),i=l.blockType,a=l.defaultVariation,u=l.variations,s=Object(h.useDispatch)("core/block-editor").replaceInnerBlocks,d=Object(m.useBlockProps)();return React.createElement("div",d,React.createElement(m.__experimentalBlockVariationPicker,{icon:Object(p.get)(i,["icon","src"]),label:Object(p.get)(i,["title"]),instructions:Object(r.__)("Select a columns layout to begin."),variations:u,onSelect:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a;e.attributes&&o(e.attributes),e.innerBlocks&&s(t,Object(c.createBlocksFromInnerBlocksTemplate)(e.innerBlocks),!0)},allowSkip:!0}))},k=function(e){var t=e.clientId,n=Object(h.useSelect)((function(e){return 0<e("core/block-editor").getBlocks(t).length}),[t])?f:v;return React.createElement(n,e)},g=function(){return React.createElement(m.InnerBlocks.Content,null)};function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=l.name,V={title:Object(r.__)("Row"),description:Object(r.__)("Add a block that displays content in multiple columns, then add whatever content blocks you’d like."),icon:React.createElement("svg",{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-hidden":"true",focusable:"false"},React.createElement("path",{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4.1 1.5v10H10v-10h4.9zM5.5 17V8c0-.3.2-.5.5-.5h2.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2.6v-10H19c.3 0 .5.2.5.5v9z"})),variations:a,edit:k,save:g};Object(c.registerBlockType)(y,j(j({},l),V))},24:function(e,t,n){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},27:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var o=n(11);var c=n(16);function r(e){return function(e){if(Array.isArray(e))return Object(o.a)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(c.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},3:function(e,t){e.exports=wp.components},4:function(e,t){e.exports=wp.blockEditor},6:function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return o}))},7:function(e,t){e.exports=wp.data},9:function(e,t){e.exports=wp.blocks}},[[172,0]]]);
//# sourceMappingURL=row-f7844746.js.map