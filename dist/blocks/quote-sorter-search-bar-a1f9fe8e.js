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
(window.wpackioprcBlocksLibraryblocksJsonp=window.wpackioprcBlocksLibraryblocksJsonp||[]).push([[52],{1:function(e,t){e.exports=window.React},16:function(e,t,r){var o,n=r(20);
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var c={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=n(r);if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var i=a.apply(null,r);i&&e.push(i)}}else if("object"===o)if(r.toString===Object.prototype.toString)for(var s in r)c.call(r,s)&&r[s]&&e.push(s);else e.push(r.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):"object"===n(r(18))&&r(18)?void 0===(o=function(){return a}.apply(t,[]))||(e.exports=o):window.classNames=a}()},2:function(e,t){e.exports=window.wp.i18n},3:function(e,t){e.exports=window.wp.components},331:function(e){e.exports=JSON.parse('{"apiVersion":2,"name":"prc-block/quote-sorter-search-bar","title":"Quote Sorter – Search Bar","icon":"search","description":"Child block displaying the search bar for the quote sorter block.","category":"layout","attributes":{"placeholder":{"type":"string","default":"Search"}},"supports":{"html":false},"ancestor":["prc-block/quote-sorter"]}')},5:function(e,t){e.exports=window.wp.blockEditor},50:function(e,t){e.exports=window.ReactDOM},7:function(e,t){e.exports=window.wp.blocks},724:function(e,t,r){r(13),e.exports=r(812)},812:function(e,t,r){"use strict";r.r(t);var o=r(8),n=r(2),c=r(7),a=r(331),i=r(16),s=r.n(i),l=r(865),p=r(5),u=r(3),f=[],b=function(e){var t=e.attributes,r=e.className,o=e.setAttributes,c=t.placeholder,a=Object(p.useBlockProps)({className:s()(r,"ui list")}),i=Object(p.useInnerBlocksProps)(a,{allowedBlocks:f,orientation:"vertical",templateLock:!1});return React.createElement("div",i,React.createElement(p.InspectorControls,null,React.createElement(u.PanelBody,{title:Object(n.__)("Filter options")},React.createElement(u.TextareaControl,{label:Object(n.__)("Placeholder text"),value:c,onChange:function(e){return o({placeholder:e})}}))),React.createElement(l.a,{icon:"search",fluid:!0,placeholder:c,onChange:function(e,t){var r=t.value;console.log(r)}}))},w=function(){return React.createElement(p.InnerBlocks.Content,null)};function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach((function(t){Object(o.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var O=a.name,y={edit:b,save:w};Object(c.registerBlockType)(O,d(d({},a),y))}},[[724,0,3]]]);
//# sourceMappingURL=quote-sorter-search-bar-a1f9fe8e.js.map