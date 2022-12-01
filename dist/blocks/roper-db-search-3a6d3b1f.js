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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[56],{12:function(e,t,r){var n="prcBlocksLibrarydist".replace(/[^a-zA-Z0-9_-]/g,"");r.p=window["__wpackIo".concat(n)]},18:function(e,t,r){var n,o=r(20);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var n=o(r);if("string"===n||"number"===n)e.push(r);else if(Array.isArray(r)){if(r.length){var l=a.apply(null,r);l&&e.push(l)}}else if("object"===n)if(r.toString===Object.prototype.toString)for(var i in r)c.call(r,i)&&r[i]&&e.push(i);else e.push(r.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):"object"===o(r(19))&&r(19)?void 0===(n=function(){return a}.apply(t,[]))||(e.exports=n):window.classNames=a}()},19:function(e,t){(function(t){e.exports=t}).call(this,{})},2:function(e,t){e.exports=window.wp.i18n},20:function(e,t){function r(t){return e.exports=r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,r(t)}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports},3:function(e,t){e.exports=window.wp.components},334:function(e){e.exports=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"prc-block/roper-db-search","title":"Roper DB Search","description":"A frontend for the Roper DB Search API","keywords":["database","roper","cornell","search","polling"],"category":"editorial-product","attributes":{"subText":{"type":"string","default":"Use this tool to search our database of polling questions."},"perPage":{"type":"number","default":10},"type":{"type":"string","default":"default"}},"supports":{"html":false}}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},7:function(e,t){e.exports=window.wp.blocks},725:function(e,t,r){r(12),e.exports=r(811)},8:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},811:function(e,t,r){"use strict";r.r(t);var n=r(8),o=r(7),c=r(334),a=r(18),l=r.n(a),i=r(2),s=r(4),p=r(5),u=r(3),b=function(e){var t=e.attributes,r=e.className,n=e.setAttributes,o=t.subText,c=t.perPage,a=t.type,b=Object(p.useBlockProps)({className:l()(r)});return React.createElement(s.Fragment,null,React.createElement(p.InspectorControls,null,React.createElement(u.PanelBody,{title:Object(i.__)("Roper DB Settings")},React.createElement(u.TextControl,{label:Object(i.__)("Sub Text"),value:o,onChange:function(e){return n({subText:e})}}),React.createElement(u.BaseControl,{label:Object(i.__)("Per Page")},React.createElement(u.__experimentalNumberControl,{value:c,min:5,max:20,onChange:function(e){return n({perPage:e})}})),React.createElement(u.SelectControl,{label:Object(i.__)("Type"),value:a,options:[{label:"Default",value:"default"},{label:"Global",value:"global"}],onChange:function(e){return n({type:e})}}))),React.createElement("div",b,React.createElement(u.Placeholder,{icon:"database",label:Object(i.__)(" Roper DB Search"),instructions:Object(i.__)("This block will render the Roper Database search on the frontend. You can edit the settings in the block inspector.")},React.createElement("p",null,"Will render ",React.createElement("pre",{style:{display:"inline"}},a)," Roper Search"))))},f=function(){return React.createElement(s.Fragment,null)};function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m=c.name,w={edit:b,save:f};Object(o.registerBlockType)(m,d(d({},c),w))}},[[725,0]]]);
//# sourceMappingURL=roper-db-search-3a6d3b1f.js.map