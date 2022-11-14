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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[52],{1:function(e,t){e.exports=window.React},16:function(e,t,r){var o,n=r(20);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var i=a.apply(null,r);i&&e.push(i)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var s in r)c.call(r,s)&&r[s]&&e.push(s);else e.push(r.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):"object"===n(r(19))&&r(19)?void 0===(o=function(){return a}.apply(t,[]))||(e.exports=o):window.classNames=a}()},2:function(e,t){e.exports=window.wp.i18n},3:function(e,t){e.exports=window.wp.components},326:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/quote-sorter-search-bar","title":"Quote Sorter – Search Bar","icon":"search","description":"Child block displaying the search bar for the quote sorter block.","category":"layout","attributes":{"placeholder":{"type":"string","default":"Search"}},"supports":{"html":false},"ancestor":["prc-block/quote-sorter"]}')},5:function(e,t){e.exports=window.wp.blockEditor},50:function(e,t){e.exports=window.ReactDOM},7:function(e,t){e.exports=window.wp.blocks},719:function(e,t,r){r(12),e.exports=r(807)},807:function(e,t,r){"use strict";r.r(t);var o=r(8),n=r(7),c=r(326),a=r(16),i=r.n(a),s=r(860),l=r(2),p=r(5),u=r(3),f=[],b=function(e){var t=e.attributes,r=e.className,o=e.setAttributes,n=t.placeholder,c=Object(p.useBlockProps)({className:i()(r,"ui list")}),a=Object(p.useInnerBlocksProps)(c,{allowedBlocks:f,orientation:"vertical",templateLock:!1});return React.createElement("div",a,React.createElement(p.InspectorControls,null,React.createElement(u.PanelBody,{title:Object(l.__)("Filter options")},React.createElement(u.TextareaControl,{label:Object(l.__)("Placeholder text"),value:n,onChange:function(e){return o({placeholder:e})}}))),React.createElement(s.a,{icon:"search",fluid:!0,placeholder:n,onChange:function(e,t){var r=t.value;console.log(r)}}))},w=function(){return React.createElement(p.InnerBlocks.Content,null)};function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var O=c.name,y={edit:b,save:w};Object(n.registerBlockType)(O,d(d({},c),y))}},[[719,0,3]]]);
//# sourceMappingURL=quote-sorter-search-bar-27cf0373.js.map