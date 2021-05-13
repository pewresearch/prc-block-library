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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[26],{11:function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return o}))},15:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?(e.exports=n=function(e){return typeof e},e.exports.default=e.exports,e.exports.__esModule=!0):(e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.default=e.exports,e.exports.__esModule=!0),n(t)}e.exports=n,e.exports.default=e.exports,e.exports.__esModule=!0},16:function(e,t){e.exports=wp.blocks},19:function(e,t){e.exports=wp.data},2:function(e,t){e.exports=wp.i18n},20:function(e,t){(function(t){e.exports=t}).call(this,{})},22:function(e,t,n){var o,r=n(15);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)&&n.length){var l=i.apply(null,n);l&&e.push(l)}else if("object"===o)for(var s in n)c.call(n,s)&&n[s]&&e.push(s)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===r(n(20))&&n(20)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},29:function(e,t,n){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},299:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs-menu-item","category":"layout","attributes":{"slug":{"type":"string"},"title":{"type":"string"},"uuid":{"type":"string","default":null}},"supports":{"html":false,"align":false},"usesContext":["prc-block/tabs-active"],"parent":["prc-block/tabs-menu"]}')},4:function(e,t){e.exports=wp.element},60:function(e,t){e.exports=wp.url},640:function(e,t,n){n(29),e.exports=n(678)},678:function(e,t,n){"use strict";n.r(t);var o=n(11),r=n(16),c=n(2),i=n(299),l=n(22),s=n.n(l),u=n(4),a=n(8),p=n(19),f=n(60),b=function(e){var t=e.attributes,n=e.setAttributes,o=e.className,i=e.clientId,l=e.isSelected,b=e.context,d=t.title,y=t.uuid,m=b["prc-block/tabs-active"],v=Object(p.useDispatch)("core/block-editor"),g=v.insertBlock,k=v.updateBlockAttributes,O=v.moveBlockToPosition,x=Object(p.useSelect)((function(e){if(void 0!==i){var t=e("core/block-editor"),n=t.getBlock,o=t.getBlockRootClientId,r=t.getAdjacentBlockClientId,c=t.getBlockIndex,l=o(i),s=o(l),u=r(l),a=n(u),p=!1;if(a.hasOwnProperty("innerBlocks")&&1<=a.innerBlocks.length&&null!==y)console.log("panesBlock as seen from MenuItem",a),p=a.innerBlocks.filter((function(e){return e.attributes.uuid===y}))[0].clientId;var f,b,d,m,v=c(i,l),g=c(p,u);return f=p,m=u,(b=v)!==(d=g)&&-1!==d&&(console.log("movePane",f,b,d,m),O(f,m,m,b)),{controllerClientId:s,panesClientId:u,currentPositionIndex:v,panePositionIndex:g}}}),[i]),j=x.controllerClientId,w=x.panesClientId,h=x.currentPositionIndex;Object(u.useEffect)((function(){!function(){if(null===y){console.log("onBlockInit",y,h);var e=i;n({uuid:e});var t=Object(r.createBlock)("prc-block/tabs-pane",{uuid:e});g(t,h,w)}}()}),[w,h]),Object(u.useEffect)((function(){null!==y&&void 0!==j&&k(j,{active:y})}),[l]);var B=Object(a.useBlockProps)({className:s()(o,"item",{active:y===m})});return React.createElement(u.Fragment,null,React.createElement("div",B,l&&React.createElement(a.RichText,{tagName:"div",value:d,allowedFormats:[],onChange:function(e){return n({title:e,slug:Object(f.cleanForSlug)(e)})},placeholder:Object(c.__)("Tab Pane 1"),style:{textTransform:"none"}}),!l&&React.createElement("div",null,d)))},d=function(){return React.createElement(u.Fragment,null)};function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var v=i.name,g={title:Object(c.__)("Menu Item"),description:Object(c.__)("Tabs menu item"),edit:b,save:d};Object(r.registerBlockType)(v,m(m({},i),g))},8:function(e,t){e.exports=wp.blockEditor}},[[640,0]]]);
//# sourceMappingURL=tabs-menu-item-10788d44.js.map