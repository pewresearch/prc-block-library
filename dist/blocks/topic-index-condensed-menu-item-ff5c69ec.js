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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[14],{1:function(e,t){e.exports=wp.element},10:function(e,t,n){var o,r=n(9);
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=r(n);if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)&&n.length){var l=i.apply(null,n);l&&e.push(l)}else if("object"===o)for(var u in n)c.call(n,u)&&n[u]&&e.push(u)}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===r(n(12))&&n(12)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},12:function(e,t){(function(t){e.exports=t}).call(this,{})},126:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/topic-index-condensed-menu-item","category":"layout","attributes":{"slug":{"type":"string"},"title":{"type":"string"},"uuid":{"type":"string","default":null}},"supports":{"html":false,"align":false},"usesContext":["prc-block/topic-index-condensed-active"],"parent":["prc-block/topic-index-condensed-menu"]}')},17:function(e,t,n){"use strict";var o="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");n.p=window["__wpackIo".concat(o)]},2:function(e,t){e.exports=wp.i18n},217:function(e,t,n){n(17),e.exports=n(243)},243:function(e,t,n){"use strict";n.r(t);var o=n(5),r=n(6),c=n(2),i=n(126),l=n(74),u=n(10),s=n.n(u),a=n(1),p=n(3),f=n(4),b=n(7),d=n(43);function m(){var e=Object(l.a)(['"menu item settings"']);return m=function(){return e},e}var g=function(e){var t=e.attributes,n=e.setAttributes,o=e.className,i=e.clientId,l=e.isSelected,u=e.context,g=e.onRemove,y=t.title,O=t.uuid,v=Object(b.useDispatch)("core/block-editor"),j=v.insertBlock,k=v.updateBlockAttributes,w=Object(b.useSelect)((function(e){var t=e("core/block-editor"),n=t.getBlock,o=t.getBlockRootClientId,r=t.getAdjacentBlockClientId,c=o(i),l=r(c);return{controllerClientId:o(c),pagesClientId:l,pages:n(l).innerBlocks.map((function(e){return{clientId:e.clientId,uuid:e.attributes.uuid,title:e.attributes.title}}))}}),[i]),x=w.controllerClientId,h=w.pagesClientId,I=w.pages;Object(a.useEffect)((function(){!function(){if(null===O){console.log("onBlockCreation",O);var e=i;n({uuid:e});var t=Object(r.createBlock)("prc-block/topic-index-condensed-page",{uuid:e,title:""});j(t,!1,h)}}(),console.log("onRemove?",g)}),[]),Object(a.useEffect)((function(){!function(e){n({slug:Object(d.cleanForSlug)(e)});var t=I;if(console.log("onTitleUpdate->pages",I),1<=I.length){var o=t.filter((function(e){return e.uuid===O}));if(1<=o.length){var r=o[0].clientId;k(r,{title:e})}}}(y)}),[y]),Object(a.useEffect)((function(){console.log("menu item is selected"),null!==O&&k(x,{active:O})}),[l]);var B=Object(p.useBlockProps)({className:s()(o,"item",{active:O===u["prc-block/topic-index-condensed-active"]})});return React.createElement(a.Fragment,null,React.createElement(p.InspectorControls,null,React.createElement(f.PanelBody,{title:Object(c.__)("Menu Item Settings")},React.createElement(a.Fragment,null,React.createElement("p",null,"Yep, sure looks like ",Object(c.__)(m()))))),React.createElement("div",B,React.createElement(p.RichText,{tagName:"div",value:y,allowedFormats:[],onChange:function(e){return n({title:e})},placeholder:Object(c.__)("Politics")})))},y=function(){return React.createElement(a.Fragment,null)};function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var j=i.name,k={title:Object(c.__)("Menu Item"),description:Object(c.__)("A sub block of Menu block, a sub block of the Topic Index - Condensed View block."),edit:g,save:y};Object(r.registerBlockType)(j,v(v({},i),k))},3:function(e,t){e.exports=wp.blockEditor},4:function(e,t){e.exports=wp.components},43:function(e,t){e.exports=wp.url},5:function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return o}))},6:function(e,t){e.exports=wp.blocks},7:function(e,t){e.exports=wp.data},74:function(e,t,n){"use strict";function o(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}n.d(t,"a",(function(){return o}))},9:function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n}},[[217,0]]]);
//# sourceMappingURL=topic-index-condensed-menu-item-ff5c69ec.js.map