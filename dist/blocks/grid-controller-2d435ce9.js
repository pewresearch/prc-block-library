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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[23],{11:function(e,t,o){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,r=new Array(t);o<t;o++)r[o]=e[o];return r}o.d(t,"a",(function(){return r}))},12:function(e,t,o){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");o.p=window["__wpackIo".concat(r)]},16:function(e,t){e.exports=window.wp.primitives},17:function(e,t,o){"use strict";o.d(t,"a",(function(){return n}));var r=o(11);function n(e,t){if(e){if("string"==typeof e)return Object(r.a)(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?Object(r.a)(e,t):void 0}}},18:function(e,t,o){var r,n=o(20);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var l={}.hasOwnProperty;function c(){for(var e=[],t=0;t<arguments.length;t++){var o=arguments[t];if(o){var r=n(o);if("string"===r||"number"===r)e.push(o);else if(Array.isArray(o)){if(o.length){var a=c.apply(null,o);a&&e.push(a)}}else if("object"===r)if(o.toString===Object.prototype.toString)for(var i in o)l.call(o,i)&&o[i]&&e.push(i);else e.push(o.toString())}}return e.join(" ")}e.exports?(c.default=c,e.exports=c):"object"===n(o(19))&&o(19)?void 0===(r=function(){return c}.apply(t,[]))||(e.exports=r):window.classNames=c}()},19:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t){function o(t){return e.exports=o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,o(t)}e.exports=o,e.exports.__esModule=!0,e.exports.default=e.exports},290:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/grid-controller","title":"Grid","category":"design","description":"Display content in multiple columns using CSS grid with blocks added to each column.","keywords":["grid","columns","css grid","layout"],"textdomain":"default","attributes":{"verticalAlignment":{"type":"string"},"backgroundColor":{"type":"string"},"textColor":{"type":"string"},"dividerColor":{"type":"string","default":"gray"}},"supports":{"anchor":true,"align":["wide","full"],"html":false,"spacing":{"blockGap":{"__experimentalDefault":"24px","sides":["horizontal","vertical"]},"margin":["top","bottom"],"padding":true,"__experimentalDefaultControls":{"padding":true}},"__experimentalBorder":{"color":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"style":true,"width":true}},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}}}}')},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},41:function(e,t,o){"use strict";o.d(t,"a",(function(){return c}));var r=o(11);var n=o(42),l=o(17);function c(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||Object(n.a)(e)||Object(l.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},42:function(e,t,o){"use strict";function r(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}o.d(t,"a",(function(){return r}))},45:function(e,t){e.exports=window.lodash},499:function(e,t,o){o(12),e.exports=o(758)},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},758:function(e,t,o){"use strict";o.r(t);var r=o(8),n=o(7),l=o(4),c=o(16),a=Object(l.createElement)(c.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(l.createElement)(c.Path,{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4.1 1.5v10H10v-10h4.9zM5.5 17V8c0-.3.2-.5.5-.5h2.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2.6v-10H19c.3 0 .5.2.5.5v9z"})),i=o(290),s=o(18),u=o.n(s),p=o(5),d=o(9),b=o(2),m=o(3);function g(e){var t=e.attributes,o=e.setAttributes,r=e.clientId,n=e.colors,c=t.verticalAlignment,a=n.backgroundColor,i=n.textColor,s=n.dividerColor,u=n.setBackgroundColor,g=n.setTextColor,f=n.setDividerColor,k=Object(d.useDispatch)(p.store),v=k.updateBlockAttributes,h=(k.replaceInnerBlocks,Object(d.useSelect)((function(e){return{count:e(p.store).getBlockCount(r),innerBlockClientIds:e(p.store).getBlockOrder(r),innerBlocks:e(p.store).getBlock(r).innerBlocks}}),[r])),w=h.count,y=h.innerBlocks,O=h.innerBlockClientIds;return React.createElement(l.Fragment,null,React.createElement(p.BlockControls,null,React.createElement(p.BlockVerticalAlignmentToolbar,{onChange:function(e){o({verticalAlignment:e}),O.forEach((function(t){v(t,{verticalAlignment:e})}))},value:c})),React.createElement(p.InspectorControls,null,React.createElement(m.PanelBody,null,React.createElement(m.RangeControl,{label:Object(b.__)("Columns"),value:w,onChange:function(e){return function(e,t){var o=y,r=t>e;console.log("updateColumns -> ",o,r,e,t);var n=o.reduce((function(e,t){return e-t.attributes.gridLayout.desktopSpan}),12);0>n&&(n=0);var l=o.reduce((function(e,t){return e-t.attributes.gridLayout.tabletSpan}),8);0>l&&(l=0);var c=o.reduce((function(e,t){return e-t.attributes.gridLayout.mobileSpan}),4);0>c&&(c=0),console.log("Available Spans:",{availableDesktopSpan:n,availableTabletSpan:l,availableMobileSpan:c}),r||(o=o.slice(0,-(e-t))),console.log('"updateColumns" replaceInnerBlocks...',r,e,t,o)}(w,e)},min:1,max:Math.max(6,w)}),6<w&&React.createElement(m.Notice,{status:"warning",isDismissible:!1},Object(b.__)("This column count exceeds the recommended amount and may cause visual breakage."))),React.createElement(p.PanelColorSettings,{__experimentalHasMultipleOrigins:!0,__experimentalIsRenderedInSidebar:!0,title:Object(b.__)("Color"),disableCustomColors:!0,colorSettings:[{value:i.color,onChange:g,label:Object(b.__)("Text")},{value:a.color,onChange:u,label:Object(b.__)("Background")},{value:s.color,onChange:f,label:Object(b.__)("Gutter Divider")}]})))}var f=o(45);function k(e){var t=e.clientId,o=e.setAttributes,r="prc-block/grid-controller",l=Object(d.useSelect)((function(e){var t=e(n.store),o=t.getBlockVariations,l=t.getBlockType,c=t.getDefaultBlockVariation;return{blockType:l(r),defaultVariation:c(r,"block"),variations:o(r,"block")}}),[t]),c=l.blockType,a=l.defaultVariation,i=l.variations,s=Object(d.useDispatch)(p.store).replaceInnerBlocks,u=Object(p.useBlockProps)({className:"is-placeholder"});return React.createElement("div",u,React.createElement(p.__experimentalBlockVariationPicker,{icon:Object(f.get)(c,["icon","src"]),label:Object(f.get)(c,["title"]),variations:i,onSelect:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a;console.log("Variation selected: ",e,a),e.attributes&&o(e.attributes),e.innerBlocks&&s(t,Object(n.createBlocksFromInnerBlocksTemplate)(e.innerBlocks),!0)}}))}var v=["prc-block/grid-column"],h=Object(p.withColors)({textColor:"color"},{backgroundColor:"color"},{dividerColor:"color"})((function(e){var t,o=e.attributes,n=e.setAttributes,c=e.clientId,a=e.className,i=e.textColor,s=e.setTextColor,b=e.backgroundColor,m=e.setBackgroundColor,f=e.dividerColor,h=e.setDividerColor,w=o.verticalAlignment,y=Object(d.useSelect)((function(e){return e(p.store).getBlocks(c).length>0}),[c]),O=Object(p.useBlockProps)({className:u()(a,(t={"has-text-color":!!i.color||!(null==i||!i.class)},Object(r.a)(t,Object(p.getColorClassName)("color",null==i?void 0:i.slug),!(null==i||!i.slug)),Object(r.a)(t,"has-background",!!b.color||b.class),Object(r.a)(t,Object(p.getColorClassName)("background-color",null==b?void 0:b.slug),!(null==b||!b.slug)),Object(r.a)(t,"has-divider",!!f.color||f.class),Object(r.a)(t,Object(p.getColorClassName)("divider-color",null==f?void 0:f.slug),!(null==f||!f.slug)),Object(r.a)(t,"are-vertically-aligned-".concat(w),w),t)),style:{color:!(null!=i&&i.slug)&&(null==i?void 0:i.color),backgroundColor:!(null!=b&&b.slug)&&(null==b?void 0:b.color)}}),j=Object(p.useInnerBlocksProps)(O,{allowedBlocks:v,orientation:"horizontal",renderAppender:!1,templateLock:!1});return y?React.createElement(l.Fragment,null,React.createElement(g,{attributes:o,setAttributes:n,clientId:c,colors:{textColor:i,setTextColor:s,backgroundColor:b,setBackgroundColor:m,dividerColor:f,setDividerColor:h}}),React.createElement("div",j)):React.createElement(k,{attributes:o,setAttributes:n,clientId:c})})),w=function(){return React.createElement(p.InnerBlocks.Content,null)},y=o(41),O=function(e){var t=e.length,o=e.map((function(e,o){var r=e.innerBlocks;return["prc-block/grid-column",{gridLayout:{index:o+1,desktopSpan:Math.floor(12/t),tabletSpan:Math.floor(8/t),mobileSpan:4}},Object(y.a)(r)]}));return Object(n.createBlock)("prc-block/grid-controller",{},Object(n.createBlocksFromInnerBlocksTemplate)(o))},j={from:[{type:"block",blocks:["core/columns"],transform:function(e,t){return!(!Array.isArray(t)||0===t.length)&&O(t)}},{type:"block",blocks:["prc-block/grid"],transform:function(e,t){return!(!Array.isArray(t)||0===t.length)&&(console.log("transform rows...",e,t),O(t[0].innerBlocks))}}],to:[{type:"block",blocks:["core/columns"],transform:function(e,t){if(!Array.isArray(t)||0===t.length)return!1;var o=t.map((function(e,t){var o=e.innerBlocks;return["core/column",{},Object(y.a)(o)]}));return Object(n.createBlock)("core/columns",{},Object(n.createBlocksFromInnerBlocksTemplate)(o))}}]},x=[{name:"two-columns-equal",title:Object(b.__)("6 / 6"),description:Object(b.__)("Two columns; equal split"),icon:React.createElement(m.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(m.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z"})),isDefault:!0,innerBlocks:[["prc-block/grid-column",{gridLayout:{index:1,desktopSpan:6,tabletSpan:4}}],["prc-block/grid-column",{gridLayout:{index:2,desktopSpan:6,tabletSpan:4}}]],scope:["block"]},{name:"two-columns-one-third-two-thirds",title:Object(b.__)("4 / 8"),description:Object(b.__)("Two columns; one-third, two-thirds split"),icon:React.createElement(m.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(m.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z"})),innerBlocks:[["prc-block/grid-column",{gridLayout:{index:1,desktopSpan:4,tabletSpan:3}}],["prc-block/grid-column",{gridLayout:{index:2,desktopSpan:8,tabletSpan:5}}]],scope:["block"]},{name:"two-columns-two-thirds-one-third",title:Object(b.__)("8 / 4"),description:Object(b.__)("Two columns; two-thirds, one-third split"),icon:React.createElement(m.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(m.Path,{fillRule:"evenodd",clipRule:"evenodd",d:"M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z"})),innerBlocks:[["prc-block/grid-column",{gridLayout:{index:1,desktopSpan:8,tabletSpan:5}}],["prc-block/grid-column",{gridLayout:{index:2,desktopSpan:4,tabletSpan:3}}]],scope:["block"]},{name:"three-columns-equal",title:Object(b.__)("4 / 4 / 4"),description:Object(b.__)("Three columns; equal split"),icon:React.createElement(m.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(m.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"})),innerBlocks:[["prc-block/grid-column",{gridLayout:{index:1,desktopSpan:4,tabletSpan:2}}],["prc-block/grid-column",{gridLayout:{index:2,desktopSpan:4,tabletSpan:4}}],["prc-block/grid-column",{gridLayout:{index:3,desktopSpan:4,tabletSpan:2}}]],scope:["block"]},{name:"three-columns-wider-center",title:Object(b.__)("3 / 6 / 3"),description:Object(b.__)("Three columns; wide center column"),icon:React.createElement(m.SVG,{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg"},React.createElement(m.Path,{fillRule:"evenodd",d:"M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM31 34H17V14h14v20zm2 0V14h6v20h-6zm-18 0H9V14h6v20z"})),innerBlocks:[["prc-block/grid-column",{gridLayout:{index:1,desktopSpan:3,tabletSpan:2}}],["prc-block/grid-column",{gridLayout:{index:2,desktopSpan:6,tabletSpan:4}}],["prc-block/grid-column",{gridLayout:{index:3,desktopSpan:3,tabletSpan:2}}]],scope:["block"]}];function C(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function S(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?C(Object(o),!0).forEach((function(t){Object(r.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):C(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var _=i.name,B={icon:a,edit:h,save:w,transforms:j,variations:x};Object(n.registerBlockType)(_,S(S({},i),B))},8:function(e,t,o){"use strict";function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}o.d(t,"a",(function(){return r}))},9:function(e,t){e.exports=window.wp.data}},[[499,0]]]);
//# sourceMappingURL=grid-controller-2d435ce9.js.map