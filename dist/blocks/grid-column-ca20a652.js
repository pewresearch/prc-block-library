/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.28
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[22],{12:function(e,t,n){var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},16:function(e,t){e.exports=window.wp.primitives},18:function(e,t,n){var r,o=n(20);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var a={}.hasOwnProperty;function l(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=o(n);if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)){if(n.length){var c=l.apply(null,n);c&&e.push(c)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var i in n)a.call(n,i)&&n[i]&&e.push(i);else e.push(n.toString())}}return e.join(" ")}e.exports?(l.default=l,e.exports=l):"object"===o(n(19))&&n(19)?void 0===(r=function(){return l}.apply(t,[]))||(e.exports=r):window.classNames=l}()},19:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t){function n(t){return e.exports=n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,n(t)}e.exports=n,e.exports.__esModule=!0,e.exports.default=e.exports},291:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/grid-column","title":"Column","category":"design","parent":["prc-block/grid-controller"],"description":"A single column within a grid block.","textdomain":"default","attributes":{"gridLayout":{"type":"object","default":{"index":0,"desktopSpan":4,"tabletSpan":4,"mobileSpan":4,"desktopStart":1,"tabletStart":1,"mobileStart":1,"desktopRow":1,"tabletRow":1,"mobileRow":1}},"verticalAlignment":{"type":"string"},"allowedBlocks":{"type":"array"},"templateLock":{"type":["string","boolean"],"enum":["all","insert","contentOnly",false],"default":false}},"supports":{"anchor":false,"reusable":false,"inserter":false,"html":false,"color":{"background":true,"text":true},"spacing":{"blockGap":{"__experimentalDefault":"24px","sides":["vertical"]},"padding":true,"__experimentalDefaultControls":{"padding":true}},"__experimentalBorder":{"color":true,"style":true,"width":true,"__experimentalDefaultControls":{"color":true,"style":true,"width":true}},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalDefaultControls":{"fontSize":true,"__experimentalFontFamily":true}},"__experimentalLayout":true},"providesContext":{"prc-block/grid/column/desktop/span":"gridSpan","prc-block/grid/column/desktop/start":"gridStart","prc-block/grid/column/desktop/row":"gridRow","prc-block/grid/column/tablet/span":"tabletGridSpan","prc-block/grid/column/tablet/start":"tabletGridStart","prc-block/grid/column/tablet/row":"tabletGridRow","prc-block/grid/column/mobile/span":"mobileGridSpan","prc-block/grid/column/mobile/start":"mobileGridStart","prc-block/grid/column/mobile/row":"mobileGridRow"}}')},3:function(e,t){e.exports=window.wp.components},4:function(e,t){e.exports=window.wp.element},497:function(e,t,n){"use strict";var r=n(4),o=n(16),a=Object(r.createElement)(o.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},Object(r.createElement)(o.Path,{d:"M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM6 17.5c-.3 0-.5-.2-.5-.5V8c0-.3.2-.5.5-.5h3v10H6zm13.5-.5c0 .3-.2.5-.5.5h-3v-10h3c.3 0 .5.2.5.5v9z"}));t.a=a},5:function(e,t){e.exports=window.wp.blockEditor},500:function(e,t,n){n(12),e.exports=n(768)},7:function(e,t){e.exports=window.wp.blocks},768:function(e,t,n){"use strict";n.r(t);var r=n(8),o=n(7),a=n(497),l=n(291),c=n(18),i=n.n(c),u=n(4),s=n(5),p=n(9),b=(n(2),n(3));function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var f=[{value:1,label:"1"},{value:2,label:"2"},{value:3,label:"3"},{value:4,label:"4"},{value:5,label:"5"},{value:6,label:"6"},{value:7,label:"7"},{value:8,label:"8"},{value:9,label:"9"},{value:10,label:"10"},{value:11,label:"11"},{value:12,label:"12"}];function g(e){var t=e.attributes,n=e.setAttributes,r=e.clientId,o=t.gridLayout,a=t.verticalAlignment,l=o.index,c=o.desktopSpan,i=o.tabletSpan,d=o.mobileSpan,g=o.desktopStart,v=o.tabletStart,w=o.mobileStart,k=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"desktop",r={};r["".concat(t,"Span")]=e,n({gridLayout:m(m({},o),r)})},y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"desktop",r={};r["".concat(t,"Start")]=e,n({gridLayout:m(m({},o),r)})},O=Object(p.useSelect)((function(e){var t=e(s.store),n=t.getBlockRootClientId,o=t.getBlockIndex;return{rootClientId:n(r),blockIndex:o(r)+1}}),[r]),h=O.rootClientId,S=O.blockIndex,x=Object(p.useDispatch)(s.store).updateBlockAttributes;return Object(u.useEffect)((function(){l!==S&&n({gridLayout:m(m({},o),{},{index:S})})}),[S]),React.createElement(u.Fragment,null,React.createElement(s.BlockControls,null,React.createElement(s.BlockVerticalAlignmentToolbar,{onChange:function(e){n({verticalAlignment:e}),x(h,{verticalAlignment:null})},value:a})),React.createElement(s.InspectorControls,null,React.createElement(b.PanelBody,{title:"Grid Span"},React.createElement("div",{className:"css-grid-column-controls"},React.createElement(b.RangeControl,{label:"Desktop Span",value:c,onChange:function(e){k(e,"desktop")},withInputField:!1,min:1,max:12,marks:f}),React.createElement(b.CardDivider,null),React.createElement(b.RangeControl,{label:"Tablet Span",value:i,onChange:function(e){k(e,"tablet")},withInputField:!1,min:1,max:8,marks:f.filter((function(e){return 8>=e.value}))}),React.createElement(b.CardDivider,null),React.createElement(b.RangeControl,{label:"Mobile Span",value:d,onChange:function(e){k(e,"mobile")},withInputField:!1,min:1,max:4,marks:f.filter((function(e){return 4>=e.value}))}))),React.createElement(b.PanelBody,{title:"Grid (Experimental)",initialOpen:!1},React.createElement("div",{className:"css-grid-column-controls"},React.createElement(b.BaseControl,{help:"These controls are experimental and currently a work-in-progress. Use them at your own risk, no support will be provided."},React.createElement(b.RangeControl,{label:"Desktop Start",value:g,onChange:function(e){y(e,"desktop")},withInputField:!1,min:1,max:12,marks:f,initialPosition:0}),React.createElement(b.CardDivider,null),React.createElement(b.RangeControl,{label:"Tablet Start",value:v,onChange:function(e){y(e,"tablet")},withInputField:!1,min:1,max:8,marks:f.filter((function(e){return 8>=e.value})),initialPosition:0}),React.createElement(b.CardDivider,null),React.createElement(b.RangeControl,{label:"Mobile Start",value:w,onChange:function(e){y(e,"mobile")},withInputField:!1,min:1,max:4,marks:f.filter((function(e){return 4>=e.value})),initialPosition:0}))))))}var v=function(e){var t,n=e.attributes,o=e.setAttributes,a=e.clientId,l=n.gridLayout,c=n.allowedBlocks,b=n.templateLock,d=n.verticalAlignment,m=l.index,f=l.desktopSpan,v=l.tabletSpan,w=l.mobileSpan,k=l.desktopStart,y=l.tabletStart,O=l.mobileStart,h=(l.desktopRow,l.tabletRow,l.mobileRow,Object(p.useSelect)((function(e){return{hasChildBlocks:0<(0,e(s.store).getBlockOrder)(a).length}}),[a]).hasChildBlocks),S=Object(s.useBlockProps)({className:i()((t={},Object(r.a)(t,"are-vertically-aligned-".concat(d),d),Object(r.a)(t,"column".concat(m,"-desktop-grid__span-").concat(f),f),Object(r.a)(t,"column".concat(m,"-tablet-grid__span-").concat(v),v),Object(r.a)(t,"column".concat(m,"-mobile-grid__span-").concat(w),w),Object(r.a)(t,"column".concat(m,"-desktop-grid__start-").concat(k),k),Object(r.a)(t,"column".concat(m,"-tablet-grid__start-").concat(y),y),Object(r.a)(t,"column".concat(m,"-mobile-grid__start-").concat(O),O),t))}),x=Object(s.useInnerBlocksProps)(S,{allowedBlocks:c,orientation:"vertical",templateLock:b,renderAppender:h?void 0:s.InnerBlocks.ButtonBlockAppender});return React.createElement(u.Fragment,null,React.createElement(g,{attributes:n,setAttributes:o,clientId:a}),React.createElement("div",x))},w=function(){return React.createElement(s.InnerBlocks.Content,null)};function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var O=l.name,h={icon:a.a,edit:v,save:w};Object(o.registerBlockType)(O,y(y({},l),h))},8:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return r}))},9:function(e,t){e.exports=window.wp.data}},[[500,0]]]);
//# sourceMappingURL=grid-column-ca20a652.js.map