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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[30],{14:function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return o}))},15:function(e,t,n){var o,r=n(16);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var l=i.apply(null,n);l&&e.push(l)}}else if("object"===o)if(n.toString===Object.prototype.toString)for(var s in n)c.call(n,s)&&n[s]&&e.push(s);else e.push(n.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===r(n(19))&&n(19)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},16:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=n=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),n(t)}e.exports=n,e.exports.default=e.exports,e.exports.__esModule=!0},18:function(e,t){e.exports=window.wp.data},19:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},23:function(e,t,n){var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},288:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs-menu-item","category":"layout","attributes":{"slug":{"type":"string"},"title":{"type":"string"},"uuid":{"type":"string","default":null}},"supports":{"html":false,"align":false},"usesContext":["prc-block/tabs-active"],"parent":["prc-block/tabs-menu"]}')},4:function(e,t){e.exports=window.wp.element},47:function(e,t){e.exports=window.wp.url},6:function(e,t){e.exports=window.wp.blockEditor},627:function(e,t,n){n(23),e.exports=n(671)},671:function(e,t,n){"use strict";n.r(t);var o=n(14),r=n(9),c=n(2),i=n(288),l=n(15),s=n.n(l),u=n(4),a=n(6),p=n(18),f=n(47),b=function(e){var t=e.attributes,n=e.setAttributes,o=e.className,i=e.clientId,l=e.isSelected,b=e.context,d=t.title,y=t.uuid,m=b["prc-block/tabs-active"],w=Object(p.useDispatch)("core/block-editor"),g=w.insertBlock,v=w.updateBlockAttributes,O=w.moveBlockToPosition,k=Object(p.useSelect)((function(e){if(void 0!==i){var t=e("core/block-editor"),n=t.getBlock,o=t.getBlockRootClientId,r=t.getAdjacentBlockClientId,c=t.getBlockIndex,l=o(i),s=o(l),u=r(l),a=n(u),p=!1;if(a.hasOwnProperty("innerBlocks")&&1<=a.innerBlocks.length&&null!==y)console.log("panesBlock as seen from MenuItem",a),p=a.innerBlocks.filter((function(e){return e.attributes.uuid===y}))[0].clientId;var f,b,d,m,w=c(i,l),g=c(p,u);return f=p,m=u,(b=w)!==(d=g)&&-1!==d&&(console.log("movePane",f,b,d,m),O(f,m,m,b)),{controllerClientId:s,panesClientId:u,currentPositionIndex:w,panePositionIndex:g}}}),[i]),x=k.controllerClientId,j=k.panesClientId,h=k.currentPositionIndex;Object(u.useEffect)((function(){!function(){if(null===y){console.log("onBlockInit",y,h);var e=i;n({uuid:e});var t=Object(r.createBlock)("prc-block/tabs-pane",{uuid:e});g(t,h,j)}}()}),[j,h]),Object(u.useEffect)((function(){null!==y&&void 0!==x&&v(x,{active:y})}),[l]);var B=Object(a.useBlockProps)({className:s()(o,"item",{active:y===m})});return React.createElement(u.Fragment,null,React.createElement("div",B,l&&React.createElement(a.RichText,{tagName:"div",value:d,allowedFormats:[],onChange:function(e){return n({title:e,slug:Object(f.cleanForSlug)(e)})},placeholder:Object(c.__)("Tab Pane 1"),style:{textTransform:"none"}}),!l&&React.createElement("div",null,d)))},d=function(){return React.createElement(u.Fragment,null)};function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var w=i.name,g={title:Object(c.__)("Menu Item"),description:Object(c.__)("Tabs menu item"),edit:b,save:d};Object(r.registerBlockType)(w,m(m({},i),g))},9:function(e,t){e.exports=window.wp.blocks}},[[627,0]]]);
//# sourceMappingURL=tabs-menu-item-5155be4c.js.map