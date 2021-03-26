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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[17],{0:function(t,e){t.exports=wp.element},1:function(t,e){t.exports=wp.i18n},138:function(t){t.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/tabs-menu-item","category":"layout","attributes":{"slug":{"type":"string"},"title":{"type":"string"},"uuid":{"type":"string","default":null}},"supports":{"html":false,"align":false},"usesContext":["prc-block/tabs-active"],"parent":["prc-block/tabs-menu"]}')},14:function(t,e){function n(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(e)}t.exports=n},15:function(t,e){(function(e){t.exports=e}).call(this,{})},16:function(t,e,n){"use strict";var r="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(r)]},252:function(t,e,n){n(16),t.exports=n(285)},26:function(t,e){t.exports=wp.url},285:function(t,e,n){"use strict";n.r(e);var r=n(5),o=n(6),c=n(1),i=n(138),l=n(8),a=n.n(l),u=n(0),s=n(3),p=n(7),f=n(26),b=function(t){var e=t.attributes,n=t.setAttributes,r=t.className,i=t.clientId,l=t.isSelected,b=t.context,y=e.title,d=e.uuid,m=b["prc-block/tabs-active"],O=Object(p.useDispatch)("core/block-editor"),v=O.insertBlock,g=O.updateBlockAttributes,j=Object(p.useSelect)((function(t){var e=t("core/block-editor"),n=e.getBlockRootClientId,r=e.getAdjacentBlockClientId,o=n(i),c=r(o);return{controllerClientId:n(o),panesClientId:c}}),[i]),k=j.controllerClientId,w=j.panesClientId;Object(u.useEffect)((function(){!function(){if(null===d){console.log("onBlockCreation",d);var t=i;n({uuid:t});var e=Object(o.createBlock)("prc-block/tabs-pane",{uuid:t});v(e,!1,w)}}()}),[]),Object(u.useEffect)((function(){null!==d&&g(k,{active:d})}),[l]);var x=Object(s.useBlockProps)({className:a()(r,"item",{active:d===m})});return React.createElement(u.Fragment,null,React.createElement("div",x,React.createElement(s.RichText,{tagName:"div",value:y,allowedFormats:[],onChange:function(t){return n({title:t,slug:Object(f.cleanForSlug)(t)})},placeholder:Object(c.__)("Tab Pane 1")})))},y=function(){return React.createElement(u.Fragment,null)};function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function m(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var O=i.name,v={title:Object(c.__)("Menu Item"),description:Object(c.__)("Tabs menu item"),edit:b,save:y};Object(o.registerBlockType)(O,m(m({},i),v))},3:function(t,e){t.exports=wp.blockEditor},5:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"a",(function(){return r}))},6:function(t,e){t.exports=wp.blocks},7:function(t,e){t.exports=wp.data},8:function(t,e,n){var r,o=n(14);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var r=o(n);if("string"===r||"number"===r)t.push(n);else if(Array.isArray(n)&&n.length){var l=i.apply(null,n);l&&t.push(l)}else if("object"===r)for(var a in n)c.call(n,a)&&n[a]&&t.push(a)}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):"object"===o(n(15))&&n(15)?void 0===(r=function(){return i}.apply(e,[]))||(t.exports=r):window.classNames=i}()}},[[252,0]]]);
//# sourceMappingURL=tabs-menu-item-fc6bdc0a.js.map