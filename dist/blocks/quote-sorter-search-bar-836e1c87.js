/*!
 * 
 * prcBlocksLibrary
 * 
 * @author Seth Rubenstein
 * @version 2.1.17
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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[52],{1:function(e,t){e.exports=window.React},1025:function(e,t,r){"use strict";r.r(t);var o=r(8),n=r(2),c=r(7),i=r(374),a=r(17),s=r.n(a),l=r(1060),p=(r(4),r(5)),u=r(3),f=[],b=function(e){var t=e.attributes,r=e.className,o=e.setAttributes,c=t.placeholder,i=Object(p.useBlockProps)({className:s()(r,"ui list")}),a=Object(p.useInnerBlocksProps)(i,{allowedBlocks:f,orientation:"vertical",templateLock:!1});return React.createElement("div",a,React.createElement(p.InspectorControls,null,React.createElement(u.PanelBody,{title:Object(n.__)("Filter options")},React.createElement(u.TextareaControl,{label:Object(n.__)("Placeholder text"),value:c,onChange:function(e){return o({placeholder:e})}}))),React.createElement(l.a,{icon:"search",fluid:!0,placeholder:c,onChange:function(e,t){var r=t.value;console.log(r)}}))},w=function(){return React.createElement(p.InnerBlocks.Content,null)};function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var O=i.name,y={edit:b,save:w};Object(c.registerBlockType)(O,h(h({},i),y))},17:function(e,t,r){var o,n=r(15);
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var a=i.apply(null,r);a&&e.push(a)}}else if("object"===o){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){e.push(r.toString());continue}for(var s in r)c.call(r,s)&&r[s]&&e.push(s)}}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):"object"===n(r(19))&&r(19)?void 0===(o=function(){return i}.apply(t,[]))||(e.exports=o):window.classNames=i}()},2:function(e,t){e.exports=window.wp.i18n},3:function(e,t){e.exports=window.wp.components},374:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/quote-sorter-search-bar","title":"Quote Sorter – Search Bar","icon":"search","description":"Child block displaying the search bar for the quote sorter block.","category":"layout","attributes":{"placeholder":{"type":"string","default":"Search"}},"supports":{"html":false},"ancestor":["prc-block/quote-sorter"]}')},4:function(e,t){e.exports=window.wp.element},5:function(e,t){e.exports=window.wp.blockEditor},52:function(e,t){e.exports=window.ReactDOM},7:function(e,t){e.exports=window.wp.blocks},937:function(e,t,r){r(12),e.exports=r(1025)}},[[937,0,3]]]);
//# sourceMappingURL=quote-sorter-search-bar-836e1c87.js.map